const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const live='https://elajmeindia.com';
const links={"/ar/hospitals/fortis-hospital-mulund-mumbai/": ["/ar/doctors/dr-aditya-j-nanavati/"], "/ar/hospitals/gleneagles-hospital-parel-mumbai/": ["/ar/doctors/dr-anurag-shrimal/"], "/ar/hospitals/kokilaben-dhirubhai-ambani-hospital-navi-mumbai/": ["/ar/doctors/dr-pushpak-chirmade/"], "/ar/hospitals/max-super-speciality-hospital-saket/": ["/ar/doctors/dr-rajneesh-malhotra/"], "/ar/treatments/liver-transplant-india/": ["/ar/doctors/dr-aditya-j-nanavati/", "/ar/doctors/dr-anurag-shrimal/"], "/ar/treatments/cancer-treatment-india/": ["/ar/doctors/dr-pushpak-chirmade/"], "/ar/treatments/heart-treatment-india/": ["/ar/doctors/dr-rajneesh-malhotra/"]};
const head='2b98298';
const slug='top-hospitals-in-mumbai-for-international-patients';
const api='https://api.github.com/repos/elajmeindia/Elajme-India/issues/476/comments';
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const result=(data)=>console.log(JSON.stringify(data));
async function preview(){
  for(let i=0;i<12;i++){
    const comments=await fetch(api).then(r=>r.json());
    for(const c of Array.isArray(comments)?comments:[]){
      const url=c.body.match(/https:\/\/[0-9a-f]{8}\.elajme-india\.pages\.dev/);
      if(c.body.includes('<code>'+head+'</code>')&&url) return url[0];
    }
    await delay(4500);
  }
  throw new Error('Cloudflare preview for requested head not found');
}
async function openContext(browser,width,allowed){
  const ctx=await browser.newContext({viewport:{width,height:width===390?844:900},serviceWorkers:'block'});
  await ctx.route('**/*', r=>{
    const url=new URL(r.request().url());
    return (allowed.includes(url.origin)||r.request().resourceType()==='image') &&
      (r.request().method()==='GET'||(url.origin===live&&url.pathname==='/api/blog-views'&&r.request().method()==='POST'))
       ? r.continue():r.abort();
  });
  return ctx;
}
async function layout(page){
  await page.evaluate(()=>document.fonts.ready);
  return page.evaluate(()=>{
    const style=(sel)=>{const n=document.querySelector(sel);if(!n)return null;const s=getComputedStyle(n);return [s.backgroundColor,s.color,s.padding,s.fontFamily,s.direction,s.display];};
    return {direction:getComputedStyle(document.documentElement).direction,overflow:document.documentElement.scrollWidth>innerWidth,
      main:style('main'),hero:style('main .hero'),header:style('header'),footer:style('footer'),
      enquiry:[...document.querySelectorAll('main a[href*="#enquiry"]')].map(a=>a.getAttribute('href'))};
  });
}
async function doctors(browser){
  const host=await preview();
  result({preview:host});
  let failures=0;
  const paths=[...Object.keys(links),...new Set(Object.values(links).flat())];
  for(const width of [390,1440]){
    const ctx=await openContext(browser,width,[host,live]);
    const page=await ctx.newPage();
    const baseline=await ctx.newPage();
    for(const path of paths){
      const entry={width,path};
      try{
        const [a,b]=await Promise.all([page.goto(host+path),baseline.goto(live+path)]);
        assert.equal(a.status(),200);
        assert.equal(b.status(),200);
        assert.equal(await page.locator('html').getAttribute('lang'),'ar');
        assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),live+path);
        const state=await layout(page), base=await layout(baseline);
        assert.equal(state.direction,'rtl');
        assert.equal(state.overflow,false);
        assert.deepEqual(state,base);
        const pictures=await page.locator('main img').evaluateAll(async imgs=>Promise.all(imgs.map(async i=>{
          i.loading='eager';
          await i.decode();
          return [i.getAttribute('src'),i.naturalWidth];
        })));
        const baselineImages=await baseline.locator('main img').evaluateAll(imgs=>imgs.map(i=>i.getAttribute('src')));
        assert.deepEqual(pictures.map(i=>i[0]),baselineImages);
        if(path.includes('/doctors/')) assert.ok(pictures.length>0,'Missing portrait');
        entry.photos=pictures;
        assert.ok(state.enquiry.length>0,'No main enquiry link');
        const target=new URL(state.enquiry[0],host+path);
        assert.equal(target.hash,'#enquiry');
        assert.equal(target.pathname,'/ar/');
        const form=await page.request.get(host+target.pathname+target.search);
        assert.equal(form.status(),200);
        assert.match(await form.text(),/id="patientEnquiryForm"/);
        const destinations=links[path]??[];
        for(const d of destinations){
          const a=page.locator('main a[href="'+d+'"]');
          assert.equal(await a.count(),1);
          assert.ok(await a.isVisible());
          assert.equal(await baseline.locator('main a[href="'+d+'"]').count(),0);
          assert.equal((await page.request.get(host+d)).status(),200);
        }
        if(destinations.length) await page.locator('main a[href="'+destinations[0]+'"]').scrollIntoViewIfNeeded();
        else await page.evaluate(()=>scrollTo(0,0));
        await page.screenshot({path:'evidence/'+path.split('/').at(-2)+'-'+width+'.jpg',type:'jpeg',quality:88});
        if(destinations.length){
          const link=page.locator('main a[href="'+destinations[0]+'"]');
          const [nav]=await Promise.all([page.waitForNavigation(),link.click()]);
          assert.equal(nav.status(),200);
          assert.equal(page.url(),host+destinations[0]);
          assert.equal(await page.locator('html').getAttribute('lang'),'ar');
        }
        entry.links=destinations;
        entry.passed=true;
      }catch(e){entry.passed=false;entry.error=e.message;failures++}
      result(entry);
    }
    await ctx.close();
  }
  return failures;
}
async function blog(browser){
  let failures=0;
  for(const lang of ['en','ar']) for(const width of [390,1440]){
    const entry={productionBlog:lang,width};
    const ctx=await openContext(browser,width,[live]);
    const page=await ctx.newPage();
    const counter=live+'/api/blog-views?slug='+slug+'-'+lang;
    const prefix=lang==='ar'?'/ar':'';
    try{
      const before=await page.request.get(counter);
      assert.equal(before.status(),200);
      const beforeCount=(await before.json()).views;
      assert.ok(Number.isSafeInteger(beforeCount));
      const observed=page.waitForResponse(r=>r.url()===counter&&r.request().method()==='POST');
      assert.equal((await page.goto(live+prefix+'/blog/'+slug+'/')).status(),200);
      const counterPost=await observed;
      assert.equal(counterPost.status(),200);
      const count=(await counterPost.json()).views;
      assert.ok(count>=beforeCount+1);
      assert.equal(await page.locator('#article-view-number').innerText(),new Intl.NumberFormat('en').format(count));
      assert.ok((await ctx.cookies()).some(c=>c.name==='elajme_blog_'+slug+'-'+lang));
      const next=page.waitForResponse(r=>r.url()===counter&&r.request().method()==='POST');
      await page.reload();
      const repeat=await next;
      assert.equal(repeat.status(),200);
      assert.ok(!(await repeat.headerValue('set-cookie')),'Repeat counter write set a new cookie');
      const state=await layout(page);
      assert.equal(state.direction,lang==='ar'?'rtl':'ltr');
      assert.equal(state.overflow,false);
      assert.equal(await page.locator('.blog-faq details').count(),8);
      assert.equal(await page.locator('.article-cta a').getAttribute('href'),prefix+'/contact/');
      await page.locator('.article-body img').evaluateAll(imgs=>Promise.all(imgs.map(async i=>{i.loading='eager'; await i.decode()})));
      await page.locator('#article-view-number').waitFor({state:'visible'});
      await page.screenshot({path:'evidence/production-blog-'+lang+'-'+width+'.jpg',fullPage:true,type:'jpeg',quality:86});
      Object.assign(entry,{before:beforeCount,firstVisit:count,sameBrowserRepeat:(await repeat.json()).views,passed:true});
    }catch(e){entry.passed=false;entry.error=e.message;failures++}
    result(entry);
    await ctx.close();
  }
  return failures;
}
(async()=>{
  fs.mkdirSync('evidence',{recursive:true});
  const browser=await chromium.launch();
  const results=await Promise.allSettled([doctors(browser),blog(browser)]);
  await browser.close();
  for(const x of results){if(x.status==='rejected') throw x.reason; assert.equal(x.value,0);}
})().catch(e=>{console.error(e);process.exit(1)});
