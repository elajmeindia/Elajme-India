const assert=require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require('playwright');
const origin='https://elajmeindia.com';
const routes=require('./ga461-routes.json');
const alreadyCovered=new Set(['/','/ar/','/ar/oman/treatment-in-india/']);
const recipient='https://wa.me/917488955154';
const measurementId='G-ZEKEN0TB2N';
const eventName='whatsapp_enquiry_click';
const secrets=['SYNTHETIC_MEDICAL_MARKER','2025550100','SYNTHETIC_COUNTRY','SYNTHETIC_QUERY_MARKER'];
const events=page=>page.evaluate(()=>[...(window.dataLayer||[])].filter(x=>x[0]==='event').map(x=>[x[1],x[2]]));
function safe(entries){
 const serialized=JSON.stringify(entries);
 for(const marker of secrets)assert.ok(!serialized.includes(marker));
 assert.ok(!entries.some(([name])=>name==='generate_lead'));
}
function one(entries,name,lang,source){
 safe(entries);
 assert.equal(entries.length,1);
 assert.equal(entries[0][0],name);
 assert.deepEqual(entries[0][1],{
  send_to:measurementId,language:lang,contact_method:'whatsapp',
  lead_source:source,page_location:origin+'/',page_referrer:''
 });
}
(async()=>{
 const browser=await chromium.launch();
 async function setup(path,width=390,optout){
  const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
  if(optout==='gpc')await context.addInitScript(()=>Object.defineProperty(navigator,'globalPrivacyControl',{get:()=>true}));
  if(optout==='flag')await context.addInitScript(()=>{window['ga-disable-G-ZEKEN0TB2N']=true});
  const handoffs=[];
  await context.route('**/*',r=>{
   const u=new URL(r.request().url());
   if(u.hostname==='wa.me'){
    handoffs.push(u);
    return r.fulfill({status:204});
   }
   if(u.origin!==origin||r.request().method()!=='GET')return r.abort();
   const routeFile='candidate'+u.pathname+(u.pathname.endsWith('/')?'index.html':'');
   if(fs.existsSync(routeFile)&&fs.statSync(routeFile).isFile()&&(r.request().isNavigationRequest()||u.pathname.startsWith('/assets/js/'))){
    return r.fulfill({status:200,contentType:r.request().isNavigationRequest()?'text/html; charset=utf-8':'application/javascript; charset=utf-8',body:fs.readFileSync(routeFile)});
   }
   return r.continue();
  });
  const page=await context.newPage();
  const response=await page.goto(origin+path+(alreadyCovered.has(path)?'':'?test=SYNTHETIC_QUERY_MARKER'),{waitUntil:'domcontentloaded'});
  assert.equal(response.status(),200,path);
  return {context,page,handoffs};
 }
 try{
  for(const path of routes){
   const {context,page,handoffs}=await setup(path);
   const link=page.locator('a[href^="'+recipient+'"]:visible').first();
   await link.click();
   await page.waitForTimeout(120);
   const e=await events(page);
   assert.equal(handoffs.length,1,path);
   assert.equal(handoffs[0].pathname,'/917488955154',path);
   if(alreadyCovered.has(path)){
    safe(e);
    assert.equal(e.filter(([n])=>n===eventName).length,1,path);
   }else one(e,eventName,path.startsWith('/ar/')?'ar':'en','direct_link');
   console.log('direct',path,'PASS');
   await context.close();
  }
  for(const width of [390,768,1440])for(const path of ['/faq/','/ar/faq/']){
   const {context,page,handoffs}=await setup(path,width);
   const form=page.locator('#faqEnquiryForm');
   const lang=path.startsWith('/ar/')?'ar':'en';
   await form.locator('[name=name]').fill(secrets[0]);
   await form.locator('[name=country]').fill(secrets[2]);
   await form.locator('[name=phone]').fill('1------');
   await form.evaluate(f=>f.requestSubmit());
   assert.equal((await events(page)).length,0);
   assert.equal(handoffs.length,0);
   await form.locator('[name=phone]').fill('+1 202 555 0100');
   await form.evaluate(f=>{f.requestSubmit();f.requestSubmit()});
   await page.waitForTimeout(400);
   assert.equal(handoffs.length,1);
   const url=handoffs[0];
   assert.equal(url.origin+url.pathname,recipient);
   assert.equal(/[\u0600-\u06ff]/.test(url.searchParams.get('text')),lang==='ar');
   one(await events(page),'whatsapp_handoff_intent',lang,'faq_enquiry_form');
   console.log('faq',path,width,'PASS');
   await context.close();
  }
  for(const path of ['/faq/','/ar/faq/'])for(const optout of ['gpc','flag']){
   const {context,page,handoffs}=await setup(path,390,optout);
   await page.locator('a[href^="'+recipient+'"]:visible').first().click();
   await page.waitForTimeout(120);
   assert.equal(handoffs.length,1);
   assert.equal((await events(page)).length,0);
   assert.equal(await page.locator('script[src*="googletagmanager.com/gtag/js"]').count(),0);
   console.log('opt-out',path,optout,'PASS');
   await context.close();
  }
  const {context,page}=await setup('/faq/');
  await page.addScriptTag({url:origin+'/assets/js/whatsapp-events.js?v=1'});
  await page.evaluate(recipient=>{
   const official=document.createElement('a');
   official.href=recipient;
   const other=document.createElement('a');
   other.href='https://wa.me/12345678900';
   for(const link of [official,other])link.addEventListener('click',event=>event.preventDefault());
   document.body.append(official,other);
   other.click();
   official.dispatchEvent(new MouseEvent('auxclick',{bubbles:true,cancelable:true,button:2}));
   official.dispatchEvent(new MouseEvent('auxclick',{bubbles:true,cancelable:true,button:1}));
  },recipient);
  one(await events(page),eventName,'en','direct_link');
  await context.close();
  console.log('deduplication, ineligible URL, and auxiliary activation PASS');
 }finally{await browser.close()}
})().catch(e=>{console.error(e.message);process.exit(1)});
