const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const fs=require('node:fs');
const owner='https://elajmeindia.com';
const routes=['/','/ar/','/blog/treatment-in-india-for-patients-from-oman/','/ar/blog/treatment-in-india-for-patients-from-oman/'];
(async()=>{
 const browser=await chromium.launch();
 fs.mkdirSync('evidence',{recursive:true});
 for(const width of [390,768,1440])for(const path of process.env.MODE==='arrow'?routes.slice(0,2):routes){
  const page=await browser.newPage({viewport:{width,height:960}});
  await page.route('**/*',route=>new URL(route.request().url()).origin===owner&&route.request().method()==='GET'?route.continue():route.abort());
  await page.route(owner+path,route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:fs.readFileSync('candidate'+path+'index.html')}));
  await page.goto(owner+path,{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  const button=page.locator('.elajme-page-back');
  await button.waitFor();
  if(process.env.MODE==='arrow'){
   const cta=page.locator('.final-cta a[href$="#enquiry"]');
   assert.equal(await cta.locator('svg[aria-hidden=true]').count(),1);
   assert.equal(await cta.evaluate(el=>!!el.getBoundingClientRect().width),true);
   await cta.screenshot({path:'evidence/'+width+(path==='/ar/'?'-ar':'-en')+'.png'});
  }else{
   const clearance=await page.evaluate(()=>{
    const back=document.querySelector('.elajme-page-back').getBoundingClientRect();
    const section=document.querySelector('body > main > :not(.elajme-page-back)');
    return Math.round(section.getBoundingClientRect().top-back.bottom);
   });
   assert.ok(clearance>=3,path+' at '+width+'px clearance '+clearance);
   await page.screenshot({path:'evidence/'+width+'-'+path.replaceAll('/','_')+'.jpg',type:'jpeg'});
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  console.log(process.env.MODE,path,width,'PASS');
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
