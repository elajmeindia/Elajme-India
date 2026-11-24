const assert = require('node:assert/strict');
const fs=require('node:fs');
const {chromium}=require('playwright');
const base='https://elajmeindia.com';
const number='917488955154';
const id='G-ZEKEN0TB2N';
const marker='SYNTHETIC_PRIVATE_VALUE';
const pages=['/faq/','/ar/faq/'];
(async()=>{
 const browser=await chromium.launch();
 for(const path of pages)for(const action of ['click','form']){
  const ctx=await browser.newContext({serviceWorkers:'block'});
  const hits=[];
  const endpoints=new Set();
  await ctx.route('**/*',r=>{
   const request=r.request();
   const u=new URL(request.url());
   if(u.hostname==='wa.me')return r.fulfill({status:204});
   if (u.origin!==base) endpoints.add(u.hostname+u.pathname);
   if(u.origin!==base&&u.pathname.endsWith('/collect')){
    const lines=(request.postData()||'').split('\n');
    for(const line of lines)hits.push(new URLSearchParams(u.search.slice(1)+'&'+line));
    return r.fulfill({status:204});
   }
   if(u.origin==='https://www.googletagmanager.com'&&['/gtag/js','/gtag/destination'].includes(u.pathname)&&u.searchParams.get('id')===id&&request.method()==='GET')return r.continue({headers:{...request.headers(),referer:''}});
   if(u.origin!==base||request.method()!=='GET')return r.abort();
   const file='candidate'+u.pathname+(u.pathname.endsWith('/')?'index.html':'');
   if(fs.existsSync(file)&&fs.statSync(file).isFile()&&(request.isNavigationRequest()||u.pathname.startsWith('/assets/js/')))return r.fulfill({status:200,contentType:request.isNavigationRequest()?'text/html; charset=utf-8':'application/javascript; charset=utf-8',body:fs.readFileSync(file)});
   if(request.url().includes(marker))return r.abort();
   return r.continue();
  });
  const page=await ctx.newPage();
  await page.goto(base+path+'?private='+marker,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.google_tag_manager?.['G-ZEKEN0TB2N'],null,{timeout:20000});
  if(action==='click'){
   await page.locator('a[href^="https://wa.me/'+number+'"]:visible').first().click();
  }else{
   const f=page.locator('#faqEnquiryForm');
   await f.locator('[name=name]').fill(marker);
   await f.locator('[name=country]').fill(marker);
   await f.locator('[name=phone]').fill('+1 202 555 0100');
   await f.evaluate(el=>el.requestSubmit());
  }
  await page.waitForTimeout(6000);
  const expected=action==='click'?'whatsapp_enquiry_click':'whatsapp_handoff_intent';
  console.log(JSON.stringify({path,action,endpoints:[...endpoints],events:hits.map(q=>q.get('en')),hasOutboundMessage:hits.some(q=>{const l=q.get('ep.link_url');return l?.startsWith('https://wa.me/')&&new URL(l).searchParams.has('text')})}));
  assert.equal(hits.filter(x=>x.get('en')===expected).length,1);
  for(const hit of hits){
   const data=[...hit.values()].join(' ');
   assert.ok(!data.includes(marker));
   assert.ok(!data.includes('2025550100'));
   assert.notEqual(hit.get('en'),'generate_lead');
   const url=hit.get('ep.link_url');
   if(url?.startsWith('https://wa.me/'))assert.ok(!new URL(url).searchParams.has('text'),'Enhanced outbound click includes WhatsApp message text');
  }
  await ctx.close();
 }
 await browser.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
