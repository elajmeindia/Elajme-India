const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const host='https://9a53b80b.elajme-india.pages.dev';
const live='https://elajmeindia.com';
const slug='clinical-genetics-genomic-medicine-india';
(async()=>{
 const browser=await chromium.launch();
 fs.mkdirSync('evidence',{recursive:true});
 let failed=0;
 for(const width of [390,1440])for(const lang of ['en','ar'])for(const type of ['doctor','treatment']){
  const ar=lang==='ar',prefix=ar?'/ar':'';
  const treatment=prefix+'/treatments/'+slug+'/';
  const path=type==='doctor'?prefix+'/doctors/dr-prof-dhavendra-kumar/':treatment;
  const context=await browser.newContext({viewport:{width,height:960},serviceWorkers:'block'});
  await context.route('**/*',r=>{
   const url=new URL(r.request().url());
   return [host,live,'https://www.spirehealthcare.com'].includes(url.origin)&&r.request().method()==='GET'?r.continue():r.abort();
  });
  const page=await context.newPage();
  const result={width,lang,type,path};
  try{
   const response=await page.goto(host+path,{waitUntil:'domcontentloaded'});
   result.status=response.status();
   assert.equal(result.status,200);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),live+path);
   const link=page.locator('main a[href="'+treatment+'"]');
   if(type==='doctor'){
    const photo=page.locator('img[src*="kumar-dhavendra.jpg"]');
    assert.equal(await photo.count(),1);
    await photo.evaluate(e=>e.loading='eager');
    await photo.evaluate(e=>e.decode()).catch(()=>{});
    result.photo=await photo.evaluate(e=>({loaded:e.naturalWidth>0,visible:!!e.getClientRects().length,source:new URL(e.src).hostname}));
    await link.scrollIntoViewIfNeeded();
    await page.evaluate(()=>document.fonts.ready);
    result.link=await link.evaluate(e=>({text:e.textContent.trim(),underline:getComputedStyle(e).textDecorationLine,color:getComputedStyle(e).color}));
   }
   Object.assign(result,await page.evaluate(()=>({direction:getComputedStyle(document.documentElement).direction,overflow:document.documentElement.scrollWidth>innerWidth})));
   await page.screenshot({path:'evidence/'+lang+'-'+type+'-'+width+'.jpg',type:'jpeg'});
   assert.equal(result.direction,ar?'rtl':'ltr');
   assert.equal(result.overflow,false);
   const cta=page.locator('main a[href*="#enquiry"]').first();
   const url=new URL(await cta.getAttribute('href'),host);
   assert.equal(url.origin,host);
   assert.equal(url.pathname,prefix+'/');
   assert.equal(url.hash,'#enquiry');
   if(type==='treatment') assert.equal(url.searchParams.get('treatment'),slug);
   if(type==='doctor'){
    assert.ok(result.link.underline.includes('underline'));
    const [to]=await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}),link.click()]);
    result.destinationStatus=to.status();
    assert.equal(result.destinationStatus,200);
    assert.equal(page.url(),host+treatment);
   }
   const form=await context.newPage();
   result.enquiryStatus=(await form.goto(url.href,{waitUntil:'domcontentloaded'})).status();
   assert.equal(result.enquiryStatus,200);
   assert.equal(await form.locator('#enquiry #patientEnquiryForm').count(),1);
   assert.equal(await form.locator('html').getAttribute('lang'),lang);
   if(type==='doctor') assert.ok(result.photo.loaded&&result.photo.visible,'Doctor photo did not render');
   result.passed=true;
  }catch(e){failed++;result.error=e.message;result.passed=false}
  console.log(JSON.stringify(result));
  await context.close();
 }
 await browser.close();
 assert.equal(failed,0,'Failed responsive cases');
})().catch(e=>{console.error(e);process.exit(1)});
