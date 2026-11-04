const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'https://elajmeindia.com';
const pages = [
  ['/', 'en'], ['/ar/', 'ar'],
  ['/privacy.html', 'en'], ['/ar/privacy.html', 'ar'],
  ['/terms.html', 'en'], ['/ar/terms.html', 'ar'],
  ['/contact/', 'en'], ['/ar/contact/', 'ar']
];
const errors = [], results = [];
(async () => {
  for (const [path, lang] of pages) {
    try {
      const response = await fetch(base + path, { signal: AbortSignal.timeout(20000) });
      const html = await response.text();
      const failures = [];
      if (!response.ok) failures.push('HTTP ' + response.status);
      if (!html.toLowerCase().includes('lang="' + lang + '"') && !html.toLowerCase().includes("lang='" + lang + "'")) failures.push('wrong HTML language');
      if (!/<meta[^>]+name=["']viewport["']/i.test(html)) failures.push('missing mobile viewport');
      if (!/<link[^>]+rel=["']canonical["']/i.test(html)) failures.push('missing canonical');
      if (!/<link[^>]+hreflang=["']en["']/i.test(html) || !/<link[^>]+hreflang=["']ar["']/i.test(html)) failures.push('missing bilingual alternate');
      if (!/<h1[\\s>]/i.test(html)) failures.push('missing H1');
      results.push({ path, status: response.status, failures });
      for (const failure of failures) errors.push(path + ': ' + failure);
    } catch (e) { errors.push(path + ': ' + e.message); }
  }
  for (const [path, expected] of [['/robots.txt', 'sitemap.xml'], ['/sitemap.xml', '<urlset']]) {
    try {
      const response = await fetch(base + path, { signal: AbortSignal.timeout(20000) });
      const body = await response.text();
      const pass = response.ok && body.includes(expected);
      results.push({ path, status: response.status, pass });
      if (!pass) errors.push(path + ': missing or invalid');
    } catch (e) { errors.push(path + ': ' + e.message); }
  }
  try {
    const response = await fetch(base + '/', { signal: AbortSignal.timeout(20000) });
    const headers = Object.fromEntries(response.headers);
    const required = ['x-content-type-options', 'referrer-policy', 'x-frame-options', 'permissions-policy'];
    const missing = required.filter(name => !headers[name]);
    results.push({ test: 'security-headers', missing });
    for (const name of missing) errors.push('Missing security header: ' + name);
  } catch (e) { errors.push('Security headers: ' + e.message); }
  const report = { checkedAt: new Date().toISOString(), base, results, errors };
  fs.mkdirSync('audit-results', { recursive: true });
  fs.writeFileSync('audit-results/launch-essentials.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (errors.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
