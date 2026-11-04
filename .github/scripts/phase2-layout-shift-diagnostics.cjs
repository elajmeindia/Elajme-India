/* Diagnostic-only: identify real layout-shift sources and small mobile targets.
   This script never submits patient data or modifies production pages. */
const fs=require('node:fs');
const {chromium}=require('playwright');
const base=process.env.BASE_URL||'https://elajmeindia.com';
(async()=>{
 const browser=await chromium.launch({headless:true});
 const results=[];
 try{
  for(const route of ['/','/ar/']){
   const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1});
   await context.addInitScript(()=>{
    window.__elajmeShifts=[];
    new PerformanceObserver(list=>{
     for(const e of list.getEntries()){
      if(e.hadRecentInput)continue;
      window.__elajmeShifts.push({value:e.value,atMs:Math.round(e.startTime),sources:(e.sources||[]).map(s=>({node:s.node?.tagName?.toLowerCase()||null,selector:s.node?.id?'#'+s.node.id:s.node?.className&&typeof s.node.className==='string'?'.'+s.node.className.trim().split(/\s+/).slice(0,3).join('.'):null,previousRect:s.previousRect,currentRect:s.currentRect}))});
     }
    }).observe({type:'layout-shift',buffered:true});
   });
   const page=await context.newPage();
   const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:45000});
   await page.waitForTimeout(1500);
   const data=await page.evaluate(()=>{
    const smallTargets=[...document.querySelectorAll('a,button,input,select,textarea')].filter(e=>{
     const r=e.getBoundingClientRect(),st=getComputedStyle(e);
     return r.width>0&&r.height>0&&st.visibility!=='hidden'&&st.display!=='none'&&(r.width<24||r.height<24);
    }).slice(0,35).map(e=>({tag:e.tagName.toLowerCase(),text:(e.getAttribute('aria-label')||e.textContent||'').trim().slice(0,65),width:Math.round(e.getBoundingClientRect().width),height:Math.round(e.getBoundingClientRect().height),className:typeof e.className==='string'?e.className.slice(0,100):''}));
    return {shifts:window.__elajmeShifts||[],smallTargets};
   });
   results.push({route,status:response?.status(),...data,totalObservedShift:Math.round(data.shifts.reduce((a,e)=>a+e.value,0)*10000)/10000});
   await context.close();
  }
 }finally{await browser.close();}
 fs.mkdirSync('audit-results',{recursive:true});
 fs.writeFileSync('audit-results/phase2-layout-shift-touch-targets.json',JSON.stringify({checkedAt:new Date().toISOString(),note:'Diagnostic only. Lab shifts and targets are not equivalent to Lighthouse scoring; inspect sources before changing locked UI.',results},null,2));
 console.log(JSON.stringify(results.map(r=>({route:r.route,shift:r.totalObservedShift,events:r.shifts.length,smallTargets:r.smallTargets.length,topSources:r.shifts.slice().sort((a,b)=>b.value-a.value).slice(0,4)})),null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
