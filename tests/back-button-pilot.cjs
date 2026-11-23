const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = 'http://127.0.0.1:8765';
(async () => {
  const browser = await chromium.launch({headless:true});
  try {
    for (const [path,home,label,dir] of [['/treatments/','/','Back','ltr'],['/ar/treatments/','/ar/','عودة','rtl']]) {
      const context = await browser.newContext({viewport:{width:390,height:844}});
      const page = await context.newPage();
      await page.goto(base+path);
      const back = page.locator('.elajme-page-back');
      await back.waitFor();
      assert.equal(await back.innerText(),label);
      assert.equal(await page.locator('html').getAttribute('dir'),dir);
      assert.ok((await back.boundingBox()).height >= 44);
      await page.keyboard.press('Tab');
      await back.focus();
      assert.equal(await back.evaluate(el => document.activeElement === el),true);
      await page.keyboard.press('Enter');
      await page.waitForURL(base+home);
      await page.goto(base+home);
      await page.evaluate(target => location.assign(target),base+path);
      await back.click();
      await page.waitForURL(base+home);
      await page.evaluate(target => location.assign(target),base+path);
      await back.focus();
      await page.keyboard.press('Space');
      await page.waitForURL(base+home);
      await context.close();
      console.log('PASS',path,'direct, internal, keyboard, label, size');
    }
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
