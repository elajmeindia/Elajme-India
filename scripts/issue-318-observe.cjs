const {chromium,firefox}=require('playwright');
const fs=require('node:fs');
const host='https://elajmeindia.com';
const common=['','treatments/','hospitals/','doctors/','contact/','about/','faq/','blog/','privacy','terms','international-patients/mea/','oman/treatment-in-india/','treatments/cancer-treatment-india/'];
const out='evidence';
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const mode=process.env.REVIEW_MODE;
 const browser=await (mode==='firefox'?firefox:chromium).launch();
 for(const w of mode==='firefox'?[390,1440]:[1440,768,390]){
  const h=w===1440?960:w===768?1024:844;
  for(const lang of ['en','ar']){
   const prefix=lang==='ar'?'/ar/':'/';
   const context=await browser.newContext({viewport:{width:w,height:h},serviceWorkers:'block'});
   await context.route('**/*',r=>new URL(r.request().url()).hostname===new URL(host).hostname&&r.request().method()==='GET'?r.continue():r.abort());
   const page=await context.newPage();
   const paths=mode==='pages'?[...common]:[''];
   for(const path of paths){
    const label=lang+'-'+w+'-'+(path.replaceAll('/','-').replace(/-$/,'')||'home');
    try{
     const response=await page.goto(host+prefix+path,{waitUntil:'domcontentloaded',timeout:25000});
     await page.evaluate(()=>document.fonts.ready);
     if(mode==='pages'&&path===''){
      const hrefs=await page.locator('a[href]').evaluateAll((a,p)=>a.map(n=>n.getAttribute('href')).filter(x=>x?.startsWith(p)),prefix);
      for(const type of ['doctors','hospitals','blog']){
       const list=await context.newPage(); await list.goto(host+prefix+type+'/',{waitUntil:'domcontentloaded'});
       const detail=await list.locator('main a[href]').evaluateAll((a,p)=>a.map(n=>new URL(n.href).pathname).find(x=>x.startsWith(p)&&x.replace(/\/$/,'')!==p.replace(/\/$/,'')&&!x.endsWith('.html')),prefix+type+'/');
       if(detail) paths.push(detail.slice(prefix.length));
       await list.close();
      }
     }
     const footer=page.locator('footer.site-footer').first();
     if(mode==='pages') await page.screenshot({path:out+'/'+label+'.jpg',type:'jpeg',quality:70,fullPage:true,timeout:20000});
     else {
      const logo=footer.locator('img').first();
      await logo.scrollIntoViewIfNeeded();
      await logo.evaluate(img=>img.decode(),{timeout:10000});
      await footer.screenshot({path:out+'/'+mode+'-'+label+'.jpg',type:'jpeg',quality:88,timeout:15000,
       style:'.master-site-header,.elajme-bottom-actions {visibility:hidden!important}'});
      await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
      await page.screenshot({path:out+'/'+mode+'-'+label+'-bottom.jpg',type:'jpeg',quality:84,timeout:15000});
      await page.locator('.final-cta a[href$="#enquiry"]').screenshot({path:out+'/'+mode+'-'+label+'-cta.jpg',type:'jpeg',quality:90,timeout:10000});
     }
     const metrics=await page.evaluate(()=>{
      const box=e=>e?e.getBoundingClientRect().toJSON():null;
      const footer=document.querySelector('footer.site-footer');
      const css=(e,p)=>e?getComputedStyle(e)[p]:null;
      const back=[...document.querySelectorAll('button,a')].find(e=>['Back','عودة'].includes(e.textContent.trim())&&e.getClientRects().length);
      const disclaimer=footer?.querySelector('a[href$="/terms"]');
      const main=document.querySelector('main');
      const cta=[...document.querySelectorAll('main a[href$="#enquiry"]')].at(-1);
      return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,lang:document.documentElement.lang,dir:css(document.documentElement,'direction'),footer:{box:box(footer),color:css(footer,'backgroundColor'),direction:css(footer,'direction'),logo:box(footer?.querySelector('img')),logoLoaded:!!footer?.querySelector('img')?.naturalWidth,legalFont:css(disclaimer?.parentElement,'fontSize'),headings:[...footer?.querySelectorAll('h2,h3')||[]].map(e=>[e.textContent.trim(),box(e)]),contacts:[...footer?.querySelectorAll('a[href]')||[]].map(e=>e.href).filter(u=>/^(tel:|mailto:)|wa\.me|facebook\.com|instagram\.com/.test(u))},back:box(back),main:box(main),cta:cta?.textContent.trim()};
     });
     console.log(JSON.stringify({mode,label,status:response?.status(),path:page.url(),...metrics}));
    }catch(e){console.log(JSON.stringify({mode,label,error:e.message.split('\n')[0]})); if(mode!=='pages')process.exitCode=1;}
   }
   await context.close();
  }
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
