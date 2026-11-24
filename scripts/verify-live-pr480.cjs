const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const host='https://elajmeindia.com';
(async()=>{
 const b=await chromium.launch();
 let failures=0;
 for(const width of [390,1440]) for(const prefix of ['', '/ar']) for(const kind of ['hospitals','doctors']){
  const route=prefix+'/'+kind+'/';
  const ctx=await b.newContext({viewport:{width,height:width===390?844:900},serviceWorkers:'block'});
  await ctx.route('**/*',r=>new URL(r.request().url()).origin===host&&r.request().method()==='GET'?r.continue():r.abort());
  const p=await ctx.newPage();
  try{
   assert.equal((await p.goto(host+route)).status(),200);
   const cards=p.locator('article.card[data-city]:visible');
   const total=await cards.count();
   assert.ok(total>1);
   const search=p.locator('#q');
   await search.fill('qa-unmatched-provider-9876');
   await p.waitForFunction(()=>[...document.querySelectorAll('article.card[data-city]')].every(e=>!e.getClientRects().length));
   await search.fill('');
   const city=p.locator('#city');
   await city.selectOption('Mumbai');
   await p.waitForFunction(()=>{const x=[...document.querySelectorAll('article.card[data-city]')].filter(e=>e.getClientRects().length);return x.length&&x.every(e=>e.dataset.city==='Mumbai')});
   const matched=await cards.count();
   assert.ok(matched>0&&matched<total);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.equal(await p.evaluate(()=>getComputedStyle(document.documentElement).direction),prefix?'rtl':'ltr');
   const a=cards.locator('a[href]').filter({hasText:/./});
   const idx=await a.evaluateAll((ls,route)=>ls.findIndex(x=>x.pathname.startsWith(route)&&x.pathname!==route),route);
   assert.ok(idx>=0);
   const [nav]=await Promise.all([p.waitForNavigation({waitUntil:'domcontentloaded'}),a.nth(idx).click()]);
   assert.equal(nav.status(),200);
   const lang=prefix?'ar':'en';
   assert.equal(await p.locator('html').getAttribute('lang'),lang);
   assert.ok(await p.locator('main a[href*="#enquiry"]').count());
   console.log(JSON.stringify({route,width,total,mumbai:matched,profile:p.url(),status:200}));
  }catch(e){failures++;console.error(route,width,e.message)}
  await ctx.close();
 }
 await b.close();
 assert.equal(failures,0);
})().catch(e=>{console.error(e);process.exit(1)});
