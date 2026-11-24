const {chromium}=require('playwright');
const fs=require('fs');
const assert=require('node:assert/strict');
const preview='https://20dec130.elajme-india.pages.dev';
const live='https://elajmeindia.com';
const host=process.env.VERIFY_PRODUCTION==='1'?live:preview;
const slugs=['hematology-blood-disorders-india','bone-marrow-transplant-india'];
(async()=>{
 const b=await chromium.launch();
 let stylingFailures=0;
 fs.mkdirSync('evidence',{recursive:true});
 for(const width of [390,1440])for(const lang of ['en','ar'])for(const [i,slug] of slugs.entries()){
  const prefix=lang==='ar'?'/ar':'';
  const path=prefix+'/treatments/'+slug+'/';
  const dest=prefix+'/treatments/'+slugs[1-i]+'/';
  const ctx=await b.newContext({viewport:{width,height:960},serviceWorkers:'block'});
  await ctx.route('**/*',r=>[host,live].includes(new URL(r.request().url()).origin)&&r.request().method()==='GET'?r.continue():r.abort());
  const page=await ctx.newPage();
  const response=await page.goto(host+path,{waitUntil:'domcontentloaded'});
  assert.equal(response.status(),200,path);
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),live+path);
  const link=page.locator('main a[href="'+dest+'"]');
  assert.equal(await link.count(),1,path);
  await link.scrollIntoViewIfNeeded();
  await page.evaluate(()=>document.fonts.ready);
  const v=await link.evaluate(e=>{
   const s=getComputedStyle(e),p=getComputedStyle(e.parentElement);
   return {text:e.textContent.trim(),decoration:s.textDecorationLine,color:s.color,parentColor:p.color,dir:s.direction,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.ok(v.text&&!v.overflow,path);
  assert.equal(v.dir,lang==='ar'?'rtl':'ltr');
  const distinguishable=v.decoration.includes('underline')||v.color!==v.parentColor;
  if(!distinguishable)stylingFailures++;
  if(lang==='en') assert.ok(v.decoration.includes('underline'),path);
  else {
   assert.equal(v.decoration,'none');
   assert.equal(v.color,'rgb(8, 116, 110)');
  }
  const enquiry=await page.locator('main a[href*="#enquiry"]').first().getAttribute('href');
  assert.ok(enquiry,path);
  const target=new URL(enquiry,host);
  assert.equal(target.origin,host);
  assert.equal(target.pathname,prefix+'/');
  assert.equal(target.hash,'#enquiry');
  assert.equal(target.searchParams.get('treatment'),slug);
  await page.screenshot({path:'evidence/'+lang+'-'+i+'-'+width+'.jpg',type:'jpeg'});
  const [to]=await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}),link.click()]);
  assert.equal(page.url(),host+dest);
  assert.equal(to.status(),200);
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),live+dest);
  console.log(JSON.stringify({width,path,dest,...v,enquiry,distinguishable,status:to.status()}));
  const enquiryPage=await ctx.newPage();
  const formResponse=await enquiryPage.goto(target.href,{waitUntil:'domcontentloaded'});
  assert.equal(formResponse.status(),200);
  assert.equal(await enquiryPage.locator('#enquiry #patientEnquiryForm').count(),1);
  await ctx.close();
 }
 await b.close();
 assert.equal(stylingFailures,0,"Contextual link styling failures");
})().catch(e=>{console.error(e);process.exit(1)});
