const fs=require('node:fs');const assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const directory=read('ar/doctors/index.html');
const cards=[...directory.matchAll(/<article class="card">([\s\S]*?)<\/article>/g)].map(x=>x[1]);
assert.equal(cards.length,60,'Expected 60 Arabic doctor cards');
const links=cards.map((c,i)=>{const m=c.match(/href="(\/ar\/doctors\/[^"]+\/)"\s*/);assert.ok(m,'Missing profile link in card '+(i+1));return m[1];});
assert.equal(new Set(links).size,60,'Arabic doctor cards should link to 60 distinct profiles');
for(const link of links){const path=link.slice(1)+'index.html';assert.ok(fs.existsSync(path),'Missing doctor profile '+path);const html=read(path);assert.match(html,/<html[^>]*dir="rtl"/i,'Missing RTL '+path);const h=html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'';assert.ok(/[\u0600-\u06FF]/.test(h),'Missing Arabic H1 '+path);}
const alts=[...directory.matchAll(/<img\b[^>]*alt="([^"]*)"/gi)].map(x=>x[1]);
assert.ok(alts.length>=60,'Doctor image descriptions missing');
assert.ok(alts.every(x=>!/[A-Za-z]{3}/.test(x)),'English text found in Arabic image descriptions');
const home=read('ar/index.html');
assert.match(home,/id="patientEnquiryForm"/,'Arabic enquiry form missing');
assert.match(home,/wa\.me\/917488955154\?text=/,'Arabic enquiry WhatsApp routing missing');
for(const path of ['ar/index.html','ar/doctors/index.html','ar/contact/index.html']){const html=read(path);assert.match(html,/name="viewport"/,'Mobile viewport missing '+path);assert.match(html,/<html[^>]*dir="rtl"/i,'Arabic RTL missing '+path);}
console.log('PASS: 60 unique Arabic doctor cards and profile files, RTL H1, localized image alt text, mobile viewport and Elajme enquiry routing');
