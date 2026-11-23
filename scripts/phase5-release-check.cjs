const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const paths = require('./phase5-release-routes.json');
const mode = process.env.AUDIT_MODE;
const production = mode === 'production-458';
const origin = production ? 'https://elajmeindia.com' : 'http://127.0.0.1:8765';
const destination = '/917488955154';

(async () => {
  const browser = await chromium.launch();
  const forms = mode === 'privacy' ? ['/', '/ar/'] : ['/faq/', '/ar/faq/'];
  const checked = production ? ['/', '/ar/', '/faq/', '/ar/faq/'] : mode === 'privacy' ? forms : paths;
  const sizes = mode === 'analytics' ? [[390,844]] : [[390,844],[768,1024],[1366,900]];
  for (const [width,height] of sizes) {
    for (const path of checked) {
      const context = await browser.newContext({viewport:{width,height},serviceWorkers:'block'});
      const handoffs = [];
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.hostname === 'wa.me') {
          assert.equal(url.pathname,destination);
          handoffs.push(url);
          return route.fulfill({status:204});
        }
        return url.origin === origin && route.request().method() === 'GET' ? route.continue() : route.abort();
      });
      const page = await context.newPage();
      const pageUrl = origin + path;
      if (production) {
        let ready = false;
        for (let attempt=0; attempt<12; attempt++) {
          const response = await page.goto(pageUrl,{waitUntil:'domcontentloaded', timeout:20000});
          ready = response.status() === 200 && await page.locator('script[src*="/assets/js/enquiry-phone.js?v=1"]').count() === 1
            && await page.evaluate(() => typeof window.normalizeEnquiryPhone === 'function');
          if (ready) break;
          await page.waitForTimeout(5000);
        }
        assert.ok(ready,'Expected #458 production scripts on '+path);
      } else {
        await page.goto(pageUrl, {waitUntil:'domcontentloaded'});
      }
      const ar = path.startsWith('/ar/');
      const links = page.locator('a[href^="https://wa.me/917488955154"]:visible');
      const events = () => page.evaluate(() => (window.dataLayer || []).filter(item => item[0] === 'event').map(item => [item[1],item[2]]));
      if (mode === 'links') {
        const values = await links.evaluateAll(nodes => nodes.filter(a => !a.closest('.master-site-header')).map(a => a.href));
        assert.ok(await links.count(), path);
        if (width <= 900) assert.ok(values.length,path);
        for (const value of values) {
          const url = new URL(value);
          const message = url.searchParams.get('text');
          assert.equal(url.pathname,destination);
          assert.ok(message,path);
          assert.equal(/[\u0600-\u06ff]/.test(message),ar,path);
        }
        const sticky = page.locator('.elajme-bottom-wa:visible');
        if (width <= 900 && path.endsWith('/treatment-in-india/')) {
          const message = await sticky.getAttribute('href');
          const main = await page.locator('main a[href^="https://wa.me/917488955154?"]').evaluateAll(nodes => nodes.map(a => a.href));
          assert.ok(main.includes(message),path);
        }
      }
      if (mode === 'analytics') {
        const missing = !['/','/ar/','/ar/oman/treatment-in-india/'].includes(path);
        const start = (await events()).length;
        await links.first().click();
        const recorded = (await events()).slice(start);
        const canonical = recorded.filter(([name]) => name === 'whatsapp_enquiry_click');
        assert.equal(canonical.length,1,path);
        if (missing) {
          const payload = canonical[0][1];
          assert.deepEqual(Object.keys(payload).sort(), ['contact_method','language','lead_source','page_location','page_referrer','send_to'].sort());
          assert.equal(payload.page_location,'https://elajmeindia.com/');
          assert.equal(payload.language,ar?'ar':'en');
        }
      }
      if (production) {
        const home = path === '/' || path === '/ar/';
        const form = page.locator(home ? '#patientEnquiryForm' : '#faqEnquiryForm');
        const phone = form.locator(home ? '#patientMobile' : '[name=phone]');
        const submitTwice = () => form.evaluate(node => {node.requestSubmit();node.requestSubmit();});
        await submitTwice();
        assert.equal(handoffs.length,0,path);
        await form.locator(home ? '#patientName' : '[name=name]').fill('Synthetic QA');
        await form.locator(home ? '#patientCountry' : '[name=country]').fill('Oman');
        await phone.fill('1------');
        await submitTwice();
        await page.waitForTimeout(150);
        assert.equal(handoffs.length,0,path);
        await phone.fill('+٩٦٨ ٩١٢٣٤٥٦٧');
        if (home) await form.locator('#preferredLanguage').selectOption(ar ? 'English' : 'Arabic');
        const start = (await events()).length;
        await submitTwice();
        await page.waitForTimeout(400);
        assert.equal(handoffs.length,1,path);
        const message = handoffs[0].searchParams.get('text');
        assert.ok(message.includes('QA') && message.includes('Oman') && message.includes('+96891234567'),path);
        assert.equal(/[\u0600-\u06ff]/.test(message),home ? !ar : ar,path);
        const emitted = (await events()).slice(start);
        assert.equal(emitted.filter(([name])=>name==='whatsapp_handoff_intent').length,home?1:0,path);
        assert.equal(emitted.filter(([name])=>name==='whatsapp_enquiry_click').length,home?1:0,path);
        assert.ok(!JSON.stringify(emitted).includes('Synthetic QA') && !emitted.some(([name])=>name==='generate_lead'));
      }
      if (!production && mode !== 'links' && forms.includes(path)) {
        const home = mode === 'privacy';
        const form = page.locator(home ? '#patientEnquiryForm' : '#faqEnquiryForm');
        await form.locator(home?'#patientName':'[name=name]').fill('Synthetic QA');
        await form.locator(home?'#patientCountry':'[name=country]').fill('Oman');
        await form.locator(home?'#patientMobile':'[name=phone]').fill('+1 202 555 0100');
        const start = (await events()).length;
        const prior = handoffs.length;
        if (home) {
          assert.equal(await page.locator('#patientCondition').count(),0);
          await form.evaluate(node => {
            const input = document.createElement('textarea');
            input.id = 'patientCondition';
            input.value = 'SYNTHETIC_MEDICAL_MARKER';
            node.append(input);
          });
        }
        await form.evaluate(node => {node.requestSubmit();node.requestSubmit();});
        await page.waitForFunction(() => !!document.querySelector('form button:disabled'));
        await page.waitForTimeout(250);
        assert.equal(handoffs.length-prior,1,path);
        const message = handoffs.at(-1).searchParams.get('text');
        assert.ok(message.includes('Synthetic QA'));
        assert.equal(/[\u0600-\u06ff]/.test(message),ar,path);
        assert.ok(!message.includes('SYNTHETIC_MEDICAL_MARKER'));
        const recorded = (await events()).slice(start);
        assert.equal(recorded.filter(([name]) => name === 'whatsapp_handoff_intent').length,1,path);
        assert.ok(!JSON.stringify(recorded).includes('Synthetic QA'));
        assert.ok(!recorded.some(([name]) => name === 'generate_lead'));
        if (!home) assert.equal(recorded.length,1,path);
      }
      await context.close();
      console.log(mode,path,width,height,'PASS');
    }
  }
  await browser.close();
})().catch(error => {console.error(error.message);process.exit(1);});
