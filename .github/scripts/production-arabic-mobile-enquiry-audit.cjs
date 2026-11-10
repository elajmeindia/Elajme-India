const { chromium } = require('playwright');
const fs = require('fs');
const base = process.env.BASE_URL || 'https://elajmeindia.com';
const widths = [360,390,768];
const pages = ['/ar/','/ar/doctors/','/ar/doctors/prof-dr-subhash-gupta/','/ar/contact/'];
const out = 'audit-results';
fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser = await chromium.launch({headless:true});
  const report = {base,checkedAt:new Date().toISOString(),checks:[],errors:[]};
  try {
    for (const width of widths) {
      const page = await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
      for (const path of pages) {
        try {
          const response = await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:30000});
          await page.waitForTimeout(700);
          const result = await page.evaluate(()=>{
            const root = document.documentElement;
            return {lang:root.lang,dir:root.dir,documentWidth:root.scrollWidth,viewportWidth:innerWidth,h1:document.querySelector('h1')?.textContent?.trim()||''};
          });
          const pass = !!response && response.status()<400 && result.dir==='rtl' && result.documentWidth<=width+2;
          report.checks.push({width,path,status:response?.status(),...result,pass});
          await page.screenshot({path:`${out}/${width}-${path.replace(/[^a-z0-9]/gi,'-')}.png`,fullPage:true});
          if(!pass)report.errors.push(`${width}px ${path}: HTTP ${response?.status()}, RTL ${result.dir}, width ${result.documentWidth}`);
        }catch(e){report.errors.push(`${width}px ${path}: ${e.message}`);}
      }
      await page.close();
    }
    const page = await browser.newPage({viewport:{width:390,height:850}});
    await page.addInitScript(()=>{window.__auditOpen=[];window.open=(url)=>{window.__auditOpen.push(url);return null;};});
    try {
      const response = await page.goto(base+'/ar/',{waitUntil:'domcontentloaded',timeout:30000});
      if(!response || response.status()>=400)throw Error('Homepage unavailable');
      await page.locator('#patientName').fill('Audit Test');
      await page.locator('#patientCountry').fill('Test Country');
      await page.locator('#patientMobile').fill('+919999999999');
      // The approved privacy-first form collects contact details only; no medical text field.
      await page.locator('#patientEnquiryForm button[type=submit]').click();
      const urls = await page.evaluate(()=>window.__auditOpen||[]);
      const target = urls[0] ? new URL(urls[0]) : null;
      const pass = target?.hostname==='wa.me' && target.pathname==='/917488955154' && target.searchParams.get('text')?.includes('Audit Test');
      report.checks.push({test:'enquiry-intercept-no-message-sent',destination:target?target.origin+target.pathname:null,pass:!!pass});
      if(!pass)report.errors.push('Arabic form did not open the expected Elajme India WhatsApp destination');
      // GA4 event is a handoff intent, never a confirmed patient lead.
      // Inspect the in-page event queue without transmitting or logging patient details.
      const analytics = await page.evaluate(() => {
        const entries = (window.dataLayer || []).filter(item => item && item[0] === 'event' && item[1] === 'whatsapp_handoff_intent');
        return entries.map(item => ({
          event: item[1],
          page_path: item[2]?.page_path,
          language: item[2]?.language,
          lead_source: item[2]?.lead_source,
          keys: Object.keys(item[2] || {})
        }));
      });
      const analyticsPass = analytics.some(item =>
        item.page_path === '/ar/' && item.language === 'ar' &&
        item.lead_source === 'patient_enquiry_form' &&
        item.keys.every(key => ['page_path','language','lead_source'].includes(key))
      );
      report.checks.push({test:'arabic-ga4-handoff-intent-no-patient-data',pass:analyticsPass});
      if(!analyticsPass)report.errors.push('Arabic form did not queue a privacy-safe GA4 handoff-intent event');
    }catch(e){report.errors.push('Arabic enquiry test: '+e.message);}
    await page.close();
    const omanPage = await browser.newPage({viewport:{width:390,height:850}});
    try {
      const response = await omanPage.goto(base+'/ar/oman/treatment-in-india/',{waitUntil:'domcontentloaded',timeout:30000});
      if(!response || response.status()>=400) throw Error('Oman landing page unavailable');
      await omanPage.evaluate(() => {
        document.addEventListener('click', event => {
          if (event.target.closest('a[href^="https://wa.me/"]')) event.preventDefault();
        }, true);
      });
      await omanPage.locator('main a[href^="https://wa.me/917488955154"]:visible').first().click();
      const events = await omanPage.evaluate(() =>
        (window.dataLayer || []).filter(item => item && item[0] === 'event' && item[1] === 'whatsapp_handoff_intent')
          .map(item => ({page_path:item[2]?.page_path,language:item[2]?.language,
            lead_source:item[2]?.lead_source,keys:Object.keys(item[2] || {})}))
      );
      const pass = events.some(item => item.page_path === '/ar/oman/treatment-in-india/' &&
        item.language === 'ar' && item.lead_source === 'oman_landing_whatsapp' &&
        item.keys.every(key => ['page_path','language','lead_source'].includes(key)));
      report.checks.push({test:'oman-arabic-whatsapp-analytics-no-patient-data',pass});
      if(!pass) report.errors.push('Arabic Oman WhatsApp click did not queue the privacy-safe analytics event');
    }catch(e){report.errors.push('Arabic Oman analytics test: '+e.message);}
    await omanPage.close();
  }finally{
    fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));
    await browser.close();
  }
  console.log(JSON.stringify(report,null,2));
  if(report.errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
