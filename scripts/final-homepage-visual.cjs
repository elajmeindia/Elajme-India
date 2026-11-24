const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const base='https://elajmeindia.com';
const paths=['/','/ar/'];
(async()=>{
 fs.mkdirSync('evidence',{recursive:true});
 const browser=await chromium.launch();
 for(const width of [390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900}});
  await context.route('**/*',r=>new URL(r.request().url()).origin===base&&r.request().method()==='GET'?r.continue():r.abort());
  for(const [i,path] of paths.entries()){
   const page=await context.newPage();
   const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(response.status(),200,path);
   const button=page.locator('.elajme-page-back');
   await button.waitFor();
   await page.evaluate(()=>document.fonts.ready);
   const observed=await page.evaluate(()=>{
    const back=document.querySelector('.elajme-page-back');
    const body=document.querySelector('body > main');
    const first=[...body.children].find(n=>n!==back&&n.getBoundingClientRect().height>0);
    const box=back.getBoundingClientRect();
    return {label:back.textContent.trim(),dir:document.documentElement.dir,
     gap:Math.round(first.getBoundingClientRect().top-box.bottom),
     left:Math.round(box.left),right:Math.round(innerWidth-box.right),
     overflow:document.documentElement.scrollWidth>innerWidth,style:!!document.getElementById('page-back-clearance')};
   });
   console.log(JSON.stringify({width,path,...observed}));
   assert.equal(observed.label,path.startsWith('/ar/')?'عودة':'Back');
   assert.ok(observed.style&&observed.gap>=3&&!observed.overflow);
   assert.equal(path.startsWith('/ar/')?observed.right:observed.left,16);
   await page.screenshot({path:'evidence/'+width+'-'+i+'.jpg',type:'jpeg',clip:{x:0,y:0,width,height:320}});
   const cta=page.locator('.final-cta a[href="#enquiry"]');
   assert.equal(await cta.locator('svg[aria-hidden="true"][focusable="false"]').count(),1);
   assert.equal(await cta.evaluate(el=>el.getAttribute('href')),'#enquiry');
   assert.equal(await cta.evaluate(el=>el.textContent.includes('↗')),false);
   await cta.screenshot({path:'evidence/'+width+'-'+i+'-arrow.jpg',type:'jpeg'});
   await page.close();
  }
  await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
