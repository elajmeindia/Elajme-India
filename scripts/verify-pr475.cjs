const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const host = 'https://ead730cf.elajme-india.pages.dev';
const canonicalHost = 'https://elajmeindia.com';
const slug = 'top-hospitals-in-mumbai-for-international-patients';
const reference = 'how-to-choose-a-hospital-in-india';
const route = lang => (lang === 'ar' ? '/ar' : '') + '/blog/' + slug + '/';
const title = { en:'Top Hospitals in Mumbai for International Patients', ar:'أفضل المستشفيات في مومباي للمرضى الدوليين' };

(async () => {
  fs.mkdirSync('evidence', { recursive: true });
  const browser = await chromium.launch();
  let failed = 0;
  for (const lang of ['en','ar']) for (const width of [390,1440]) {
    const prefix = lang === 'ar' ? '/ar' : '';
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, serviceWorkers: 'block' });
    let countCalls = 0;
    await context.route('**/*', r => {
      const req = r.request();
      const u = new URL(req.url());
      if (u.origin !== host) return r.abort();
      if (u.pathname === '/api/blog-views' && req.method() === 'POST') {
        if (u.searchParams.get('slug') === slug + '-' + lang) countCalls++;
        return r.fulfill({ json: { views: 42 } });
      }
      return req.method() === 'GET' ? r.continue() : r.abort();
    });
    const page = await context.newPage();
    const result = { lang, width };
    try {
      const response = await page.goto(host + route(lang));
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('h1').innerText(), title[lang]);
      assert.equal(await page.locator('html').getAttribute('lang'), lang);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonicalHost + route(lang));
      for (const pair of ['en','ar','x-default']) assert.equal(await page.locator('link[hreflang="' + pair + '"]').getAttribute('href'),canonicalHost + route(pair === 'ar' ? 'ar' : 'en'));
      for (const field of ['og:title','og:description','og:image','og:url','og:type']) assert.ok(await page.locator('meta[property="' + field + '"]').getAttribute('content'));
      assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'), 'summary_large_image');
      assert.equal(await page.locator('.blog-lang').getAttribute('href'), route(lang === 'ar' ? 'en' : 'ar'));
      const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n=>JSON.parse(n.textContent)));
      assert.equal(schemas.find(s=>s['@type']==='BlogPosting').headline,title[lang]);
      const faq = page.locator('.blog-faq details');
      assert.equal(await faq.count(),8);
      const publishedFaqs = await faq.evaluateAll(nodes=>nodes.map(n=>[n.querySelector('summary').textContent,n.querySelector('p').textContent]));
      assert.deepEqual(schemas.find(s=>s['@type']==='FAQPage').mainEntity.map(x=>[x.name,x.acceptedAnswer.text]),publishedFaqs);
      await faq.first().locator('summary').click();
      assert.equal(await faq.first().getAttribute('open'),'');
      await faq.first().locator('summary').click();
      const photos = await page.locator('.article-body img').evaluateAll(async images => Promise.all(images.map(async img=>{
        img.loading='eager';
        await img.decode();
        return {src:img.getAttribute('src'),width:img.naturalWidth};
      })));
      assert.equal(new Set(photos.map(p=>p.src)).size,5);
      assert.ok(photos.every(p=>p.width>0));
      result.photos=photos;
      const links=await page.locator('.blog-step a[href^="/"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
      assert.equal(links.length,5);
      result.profileStatuses=await Promise.all(links.map(async path=>{
        assert.ok(path.startsWith(prefix+'/hospitals/'));
        const r=await page.request.get(host+path);
        assert.equal(r.status(),200);
        return r.status();
      }));
      await page.locator('#article-view-number').waitFor({state:'visible'});
      assert.equal(await page.locator('#article-view-number').innerText(),'42');
      assert.equal(countCalls,1);
      const counter=await page.request.get(host+'/api/blog-views?slug='+slug+'-'+lang);
      result.counterRead=counter.status();
      if(counter.ok()) assert.ok(Number.isSafeInteger((await counter.json()).views));
      const measure=()=>page.evaluate(()=>({
        direction:getComputedStyle(document.documentElement).direction,
        overflow:document.documentElement.scrollWidth>innerWidth,
        intro:getComputedStyle(document.querySelector('main .intro')).backgroundImage,
        introPadding:getComputedStyle(document.querySelector('main .intro')).paddingTop,
        bodyWidth:getComputedStyle(document.querySelector('.article-body')).maxWidth,
        footer:getComputedStyle(document.querySelector('footer')).backgroundImage
      }));
      await page.evaluate(()=>document.fonts.ready);
      const actual=await measure();
      assert.equal(actual.direction,lang==='ar'?'rtl':'ltr');
      assert.equal(actual.overflow,false);
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:'evidence/'+lang+'-'+width+'.jpg',type:'jpeg',fullPage:true,quality:85});
      const cta=page.locator('.article-cta a');
      assert.equal(await cta.getAttribute('href'), prefix+'/contact/');
      const [contact] = await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}),cta.click()]);
      assert.equal(contact.status(),200);
      assert.equal(await page.locator('html').getAttribute('lang'),lang);
      const dir=await page.goto(host+prefix+'/blog/');
      assert.equal(dir.status(),200);
      assert.equal(await page.locator('.cards a[href="'+route(lang)+'"]').count(),1);
      await page.goto(host+prefix+'/blog/'+reference+'/');
      const baseline=await measure();
      for(const key of ['intro','introPadding','bodyWidth','footer']) assert.equal(actual[key],baseline[key],key);
      result.passed=true;
    } catch(e) { result.error=e.message; result.passed=false; failed++; }
    console.log(JSON.stringify(result));
    await context.close();
  }
  const sitemap=await fetch(host+'/sitemap.xml').then(r=>r.text());
  for(const lang of ['en','ar']) assert.ok(sitemap.includes('<loc>'+canonicalHost+route(lang)+'</loc>'));
  await browser.close();
  assert.equal(failed,0);
})().catch(e=>{console.error(e);process.exit(1);});
