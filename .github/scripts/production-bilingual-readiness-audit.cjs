const { chromium } = require('playwright');
const fs = require('node:fs');
const base = process.env.BASE_URL || 'https://elajmeindia.com';
const routes = ['/', '/doctors/', '/hospitals/', '/contact/', '/ar/', '/ar/doctors/', '/ar/hospitals/', '/ar/contact/'];
const widths = [390, 768, 1366];
const output = 'audit-results/bilingual-readiness.json';
(async () => {
  fs.mkdirSync('audit-results', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [], errors = [];
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      for (const path of routes) {
        try {
          const response = await page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForTimeout(450);
          const data = await page.evaluate(() => {
            const root = document.documentElement;
            const images = [...document.images];
            return {
              lang: root.lang, dir: root.dir,
              documentWidth: root.scrollWidth, viewportWidth: innerWidth,
              title: document.title,
              h1: !!document.querySelector('h1'),
              imageCount: images.length,
              brokenImages: images.filter(img => img.complete && img.naturalWidth === 0 && img.getAttribute('src')).map(img => img.getAttribute('src')).slice(0, 15),
              englishLink: !!document.querySelector('a[href="/"],a[href="https://elajmeindia.com/"]'),
              arabicLink: !!document.querySelector('a[href="/ar/"],a[href="https://elajmeindia.com/ar/"]')
            };
          });
          const expectedArabic = path.startsWith('/ar/');
          const problems = [];
          if (!response || response.status() >= 400) problems.push('HTTP ' + response?.status());
          if (data.lang !== (expectedArabic ? 'ar' : 'en')) problems.push('wrong language');
          if (data.dir && data.dir !== (expectedArabic ? 'rtl' : 'ltr')) problems.push('wrong text direction');
          if (data.documentWidth > width + 2) problems.push('horizontal overflow');
          if (!data.h1) problems.push('missing H1');
          if (!data.title) problems.push('missing title');
          if (!data.englishLink || !data.arabicLink) problems.push('missing bilingual home navigation');
          if (data.brokenImages.length) problems.push('broken loaded images: ' + data.brokenImages.join(', '));
          results.push({ path, width, status: response?.status(), ...data, problems });
          for (const problem of problems) errors.push(width + 'px ' + path + ': ' + problem);
        } catch (e) { errors.push(width + 'px ' + path + ': ' + e.message); }
      }
      await page.close();
    }
  } finally {
    await browser.close();
    fs.writeFileSync(output, JSON.stringify({ checkedAt: new Date().toISOString(), base, results, errors }, null, 2));
  }
  console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
