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
      await page.locator('#medicalNeed').fill('Automated routing test only. No message sent.');
      await page.locator('#patientEnquiryForm button[type=submit]').click();
      const urls = await page.evaluate(()=>window.__auditOpen||[]);
      const target = urls[0] ? new URL(urls[0]) : null;
      const pass = target?.hostname==='wa.me' && target.pathname==='/917488955154' && target.searchParams.get('text')?.includes('Audit Test');
      report.checks.push({test:'enquiry-intercept-no-message-sent',destination:target?target.origin+target.pathname:null,pass:!!pass});
      if(!pass)report.errors.push('Arabic form did not open the expected Elajme India WhatsApp destination');
    }catch(e){report.errors.push('Arabic enquiry test: '+e.message);}
    await page.close();
  }finally{
    fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));
    await browser.close();
  }
  console.log(JSON.stringify(report,null,2));
  if(report.errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
