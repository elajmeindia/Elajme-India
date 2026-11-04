const fs = require('node:fs');
const { chromium } = require('playwright');
const base = process.env.BASE_URL || 'https://elajmeindia.com';
const routes = ['/', '/ar/', '/contact/', '/ar/contact/', '/privacy.html', '/ar/privacy.html', '/terms.html', '/ar/terms.html'];
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [], errors = [];
  try {
    for (const width of [390, 1366]) {
      const context = await browser.newContext({ viewport: { width, height: 850 }, deviceScaleFactor: 1 });
      for (const route of routes) {
        const page = await context.newPage();
        const failures = [];
        page.on('pageerror', e => failures.push(e.message.slice(0, 250)));
        try {
          const start = Date.now();
          const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForTimeout(600);
          const metrics = await page.evaluate(() => {
            const nav = performance.getEntriesByType('navigation')[0];
            const resources = performance.getEntriesByType('resource');
            return {
              domContentLoadedMs: Math.round(nav?.domContentLoadedEventEnd || 0),
              transferBytes: resources.reduce((n, r) => n + (r.transferSize || 0), 0),
              resourceCount: resources.length,
              horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
              title: document.title
            };
          });
          if (!response?.ok()) errors.push(width + 'px ' + route + ': HTTP ' + response?.status());
          if (metrics.horizontalOverflow) errors.push(width + 'px ' + route + ': horizontal overflow');
          for (const error of failures) errors.push(width + 'px ' + route + ': JavaScript error: ' + error);
          results.push({ route, width, httpStatus: response?.status(), elapsedMs: Date.now() - start, ...metrics, pageErrors: failures });
        } catch (e) { errors.push(width + 'px ' + route + ': ' + e.message); }
        finally { await page.close(); }
      }
      await context.close();
    }
  } finally { await browser.close(); }
  const report = { checkedAt: new Date().toISOString(), note: 'Navigation and transfer measurements are CI diagnostics, not Lighthouse/Core Web Vitals scores. No patient data is collected.', results, errors };
  fs.mkdirSync('audit-results', { recursive: true });
  fs.writeFileSync('audit-results/phase2-performance-baseline.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ checks: results.length, errors, slowest: results.slice().sort((a,b) => b.elapsedMs - a.elapsedMs).slice(0, 5).map(x => ({ route:x.route, width:x.width, elapsedMs:x.elapsedMs })) }, null, 2));
  if (errors.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
