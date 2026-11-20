/* PR #330: candidate preview acceptance, with non-sending browser evidence. */
const { chromium } = require('playwright');
const fs = require('fs');
const assert = require('node:assert/strict');
(async () => {
  const origin = process.env.HEADER_PREVIEW;
  assert(origin, 'Matching candidate preview is required');
  const output = 'qa-artifacts/contact-footer';
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({headless:true});
  const results = [];
  const selectors = '.elajme-bottom-actions,.mobile-conversion-bar,.arabic-mobile-conversion-bar';
  for (const width of [390,768,1440]) for (const lang of ['en','ar']) {
    const height = width===390?844:width===768?1024:936;
    const context = await browser.newContext({viewport:{width,height},isMobile:width===390,hasTouch:width<1440,serviceWorkers:'block'});
    await context.route('**/*', route => {
      const u = new URL(route.request().url());
      if (!['GET','HEAD'].includes(route.request().method()) || /google-analytics|googletagmanager|doubleclick|cloudflareinsights|(^|\.)wa\.me$|(^|\.)whatsapp\.com$/.test(u.hostname)) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    const prefix = lang==='ar'?'/ar/':'/';
    // Retain the production before screenshots at the identical viewport.
    await page.goto('https://elajmeindia.com'+prefix,{waitUntil:'networkidle'});
    await page.locator('footer .elajme-v2').waitFor();
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.screenshot({path:`${output}/${lang}-${width}-before-footer.png`,fullPage:true});
    for (const suffix of ['', 'doctors/', 'hospitals/', 'treatments/', 'contact/']) {
      const id=lang+'-'+width+'-'+(suffix.replace('/','')||'home');
      const r={id,width,height,path:prefix+suffix,errors:[]};
      results.push(r);
      const check=(ok,message)=>{if(!ok)r.errors.push(message)};
      try {
        const response=await page.goto(origin+prefix+suffix,{waitUntil:'networkidle'});
        check(response.status()===200,'Page must return HTTP 200');
        await page.locator('.elajme-bottom-actions').waitFor({state:'attached'});
        check(await page.locator(selectors).count()===1,'Exactly one contact-bar component in DOM, not CSS-hidden duplicates');
        const bar=page.locator('.elajme-bottom-actions');
        const visible=await bar.isVisible();
        check(visible===(width<=900),'Contact bar visible only at mobile/tablet widths');
        check(await bar.locator('a').allTextContents().then(t=>JSON.stringify(t.map(x=>x.trim())))===JSON.stringify(lang==='ar'?['أرسل استفسارك','واتساب']:['Enquire Now','WhatsApp']),'Exact labels and source order');
        check(await bar.locator('.elajme-bottom-enquiry').getAttribute('href')===prefix+'#enquiry','Enquiry remains at Elajme India');
        const wa=bar.locator('.elajme-bottom-wa'),href=await wa.getAttribute('href');
        check(/^https:\/\/wa\.me\/917488955154(?:[?#/]|$)/.test(href),'Official WhatsApp number');
        if(lang==='ar')check(/[\u0600-\u06ff]/.test(new URL(href).searchParams.get('text')||''),'Arabic WhatsApp prefilled message retained');
        check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow');
        if(visible){
          r.bar=await bar.evaluate(e=>{const b=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:b.x,y:b.y,width:b.width,height:b.height,paddingBottom:s.paddingBottom,direction:s.direction,bodyPadding:getComputedStyle(document.body).paddingBottom}});
          check(r.bar.y>=0 && r.bar.x>=0 && r.bar.x+r.bar.width<=width+1,'Bar fits viewport');
          check(parseFloat(r.bar.bodyPadding)>=r.bar.height,'Content clearance reserves contact-bar height');
          for(const a of await bar.locator('a').all())check(await a.evaluate(e=>{const r=e.getBoundingClientRect();return r.width>=44&&r.height>=44}),'44px contact target');
          const menu=page.locator('.master-mobile-menu');
          await menu.click();check(await menu.getAttribute('aria-expanded')==='true','Menu opens');
          await menu.click();check(await menu.getAttribute('aria-expanded')==='false','Menu closes');
        }
        if(!suffix){
          await page.screenshot({path:`${output}/${id}-after-top.png`});
          const form=page.locator('#patientEnquiryForm');
          check(await form.evaluate(f=>!f.checkValidity()),'Blank enquiry validation');
          await form.locator('#patientName').fill('Synthetic QA');
          await form.locator('#patientCountry').fill('Oman');
          await form.locator('#patientMobile').fill('+96890000000');
          check(await form.evaluate(f=>f.checkValidity()),'Synthetic enquiry fields accepted without sending');
          await form.locator('#patientName').fill('');await form.locator('#patientCountry').fill('');await form.locator('#patientMobile').fill('');
          // Click WhatsApp only into an intercepted/aborted popup and inspect the local queue.
          if(visible){
            const prior=await page.evaluate(()=>Array.from(window.dataLayer||[]).filter(x=>x[0]==='event'&&x[1]==='whatsapp_enquiry_click').length);
            await wa.click();
            const after=await page.evaluate(()=>Array.from(window.dataLayer||[]).filter(x=>x[0]==='event'&&x[1]==='whatsapp_enquiry_click').length);
            check(after-prior===1,'One GA4 WhatsApp click event, with transport blocked');
          }
          await page.locator('footer .elajme-v2').waitFor();
          await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,document.documentElement.scrollHeight)});
          await page.waitForTimeout(100);
          r.footer=await page.locator('.elajme-v2-main').evaluate(e=>({direction:getComputedStyle(e).direction,columns:getComputedStyle(e).gridTemplateColumns}));
          check(r.footer.direction===(lang==='ar'?'rtl':'ltr'),'Footer direction');
          if(width===1440)check(r.footer.columns.split(' ').length===5,'Five desktop footer columns');
          const copyright=page.locator('.elajme-v2-copyright');
          if(await copyright.count() && visible)check(await copyright.evaluate((e,y)=>e.getBoundingClientRect().bottom<=y+1,r.bar.y),'Footer copyright can scroll clear of action bar');
          for(const social of await page.locator('footer .elajme-footer-socials a').all()){
            const g=await social.evaluate(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height,svg:e.querySelector('svg')?.getBoundingClientRect().width}));
            check(g.w>=44&&g.h>=44,'44px social targets');if(width===390)check(g.svg===20,'Compact 20px social artwork');
          }
          await page.screenshot({path:`${output}/${id}-after-footer.png`});
          await page.screenshot({path:`${output}/${id}-after-full.png`,fullPage:true});
        }
      } catch(e){r.errors.push(e.message);await page.screenshot({path:`${output}/${id}-failure.png`}).catch(()=>{});}
      console.log(JSON.stringify(r));
    }
    await context.close();
  }
  fs.writeFileSync(output+'/results.json',JSON.stringify(results,null,2));
  await browser.close();
  assert(!results.some(r=>r.errors.length),'Contact/footer acceptance failed; inspect retained evidence');
})();
