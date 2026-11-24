const assert = require('node:assert/strict');
const {chromium}=require('playwright');
const base='https://elajmeindia.com';
const number='917488955154';
const id='G-ZEKEN0TB2N';
const marker='SYNTHETIC_PRIVATE_VALUE';
const referrerMarker='SYNTHETIC_REFERRER_VALUE';
const nameMarker='SYNTHETIC_PATIENT_NAME';
const countryMarker='SYNTHETIC_PATIENT_COUNTRY';
const privateValues=[marker,referrerMarker,nameMarker,countryMarker,'2025550100'];
let failures=0;
const pages=['/faq/','/ar/faq/'];
(async()=>{
 const browser=await chromium.launch();
 for(const path of pages)for(const action of ['click','form']){
  const ctx=await browser.newContext({serviceWorkers:'block'});
  const hits=[];
  const handoffs=[];
  const endpoints=new Set();
  await ctx.route('**/*',r=>{
   const request=r.request();
   const u=new URL(request.url());
   if(u.hostname==='wa.me'){
    handoffs.push(u.origin+u.pathname);
    return r.fulfill({status:204});
   }
   if (u.origin!==base) endpoints.add(u.hostname+u.pathname);
   if(u.origin!==base&&u.pathname.endsWith('/collect')){
    const lines=(request.postData()||'').split('\n');
    for(const line of lines)hits.push(new URLSearchParams(u.search.slice(1)+'&'+line));
    return r.fulfill({status:204});
   }
   if(u.origin==='https://www.googletagmanager.com'&&['/gtag/js','/gtag/destination'].includes(u.pathname)&&u.searchParams.get('id')===id&&request.method()==='GET')return r.continue({headers:{...request.headers(),referer:''}});
   if(u.origin!==base||request.method()!=='GET')return r.abort();
   if(request.isNavigationRequest()&&u.pathname===path){
    return r.fetch({url:base+path,headers:{...request.headers(),referer:''},maxRedirects:0}).then(response=>{
     assert.equal(response.status(),200);
     return r.fulfill({response});
    });
   }
   if(privateValues.some(value=>u.href.includes(value)))return r.abort();
   return r.continue({headers:{...request.headers(),referer:''}});
  });
  const page=await ctx.newPage();
  await page.goto(base+path+'?private='+marker,{waitUntil:'domcontentloaded',referer:base+'/?private='+referrerMarker});
  assert.equal(await page.locator('script[src*="whatsapp-events.js"]').count(),1);
  await page.waitForFunction(()=>window.google_tag_manager?.['G-ZEKEN0TB2N'],null,{timeout:20000});
  if(action==='click'){
   const links=page.locator('a[href^="https://wa.me/'+number+'"]:visible');
   const prefilled=page.locator('a[href^="https://wa.me/'+number+'"][href*="text="]:visible');
   await (await prefilled.count()?prefilled:links).first().click();
  }else{
   const f=page.locator('#faqEnquiryForm');
   await f.locator('[name=name]').fill(nameMarker);
   await f.locator('[name=country]').fill(countryMarker);
   await f.locator('[name=phone]').fill('+1 202 555 0100');
   await f.evaluate(el=>{el.requestSubmit();el.requestSubmit();});
  }
  await page.waitForTimeout(6000);
  const expected=action==='click'?'whatsapp_enquiry_click':'whatsapp_handoff_intent';
  const automatic=new Set(['click','form_start','form_submit']);
  const findings=hits.flatMap(hit=>{
   const event=hit.get('en');
   return [...hit].flatMap(([key,value])=>{
    const compact=value.replace(/[ ()+-]/g,'');
    return privateValues.some(secret=>value.includes(secret)||compact.includes(secret))
      || (key==='ep.link_url'&&value.startsWith('https://wa.me/')&&new URL(value).searchParams.has('text'))
      ? [{event,key}] : [];
   });
  });
  const expectedCount=hits.filter(hit=>hit.get('en')===expected).length;
  const eventNames=hits.map(hit=>hit.get('en')).filter(Boolean);
  // Playwright can scroll to a footer link before clicking. The stream's
  // scroll feature is independent of the click and handoff events under test.
  const interactionEvents=eventNames.filter(name=>name!=='scroll');
  const passed=expectedCount===1&&interactionEvents.length===1&&handoffs.length===1&&handoffs[0]==='https://wa.me/'+number&&findings.length===0&&!eventNames.some(name=>automatic.has(name)||name==='generate_lead');
  console.log(JSON.stringify({path,action,expectedCount,eventNames,handoffs:handoffs.length,findings,passed}));
  if(!passed)failures++;
  await ctx.close();
 }
 await browser.close();
 assert.equal(failures,0,"Wire-level privacy failures");
})().catch(e=>{console.error(e.message);process.exit(1)});
