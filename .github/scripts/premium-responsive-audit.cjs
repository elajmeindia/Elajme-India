/* Read-only production/candidate audit. All enquiry and analytics transport blocked. */
const {chromium}=require('playwright'),fs=require('fs'),assert=require('node:assert/strict');
const widths=[[320,700],[360,800],[375,812],[390,844],[430,932],[650,900],[651,900],[768,1024],[900,1024],[901,1024],[1024,768],[1363,936],[1440,936]];
const types=['','treatments/','treatments/cancer-treatment-india/','doctors/','doctors/dr-aditya-j-nanavati/','hospitals/','hospitals/indraprastha-apollo-hospital-delhi/','international-patients/mea/','oman/treatment-in-india/','faq/','about/','blog/','blog/preparing-for-medical-travel-to-india/','contact/','privacy.html','terms.html'];
const output='qa-artifacts/premium-audit';fs.mkdirSync(output,{recursive:true});
const origin=process.env.AUDIT_ORIGIN||'https://elajmeindia.com';
(async()=>{
 const crypto=require('crypto'),delivery=[];
 for(const asset of ['script.js?v=172','script.js?v=173','assets/js/mobile-header.js?v=3','assets/js/mobile-header.js?v=4']){try{const response=await fetch(origin+'/'+asset),body=Buffer.from(await response.arrayBuffer());delivery.push({asset,status:response.status,bytes:body.length,sha256:crypto.createHash('sha256').update(body).digest('hex'),cacheControl:response.headers.get('cache-control'),etag:response.headers.get('etag'),age:response.headers.get('age'),cacheStatus:response.headers.get('cf-cache-status')})}catch(e){delivery.push({asset,error:e.message})}}
 fs.writeFileSync(output+'/asset-delivery.json',JSON.stringify(delivery,null,2));
 const browser=await chromium.launch({headless:true}),results=[],tasks=[];
 for(const [width,height]of widths)for(const lang of ['en','ar'])for(const suffix of types)tasks.push({width,height,lang,suffix});
 async function worker(){while(tasks.length){const t=tasks.shift(),{width,height,lang,suffix}=t,path=(lang==='ar'?'/ar/':'/')+suffix,id=lang+'-'+width+'-'+(suffix.replaceAll('/','_')||'home'),r={...t,path,id,errors:[],observations:[]};results.push(r);
  const context=await browser.newContext({viewport:{width,height},isMobile:width<=430,hasTouch:width<=900,serviceWorkers:'block'});
  await context.route('**/*',route=>{const q=route.request(),u=new URL(q.url());if(!['GET','HEAD'].includes(q.method())||/google-analytics|googletagmanager|doubleclick|cloudflareinsights|(^|\.)wa\.me$|(^|\.)whatsapp\.com$|embed.tawk.to/.test(u.hostname))return route.abort();return route.continue()});
  const page=await context.newPage();await page.addInitScript(()=>{window.__qaCLS=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__qaCLS.push({value:e.value,time:e.startTime,nodes:e.sources?.map(s=>s.node?.tagName+'#'+s.node?.id+'.'+s.node?.className)})})).observe({type:'layout-shift',buffered:true})});
  try{
   const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:25000});if(response.status()!==200)r.errors.push('HTTP '+response.status());
   await page.locator('.elajme-bottom-actions').waitFor({state:'attached',timeout:10000});await page.locator('.elajme-v2').waitFor({state:'attached',timeout:10000});
   await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]));await page.waitForTimeout(250);
   r.dom=await page.evaluate(()=>{const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,bottom:r.bottom}},style=e=>{const s=getComputedStyle(e);return{direction:s.direction,font:s.fontSize,lineHeight:s.lineHeight,color:s.color,bg:s.backgroundColor,paddingLeft:s.paddingLeft,paddingRight:s.paddingRight}},bar=document.querySelector('.elajme-bottom-actions'),hero=document.querySelector('#home .hero-copy'),footer=document.querySelector('.elajme-v2-main');return{
    width:innerWidth,docWidth:document.documentElement.scrollWidth,lang:document.documentElement.lang,dir:document.documentElement.dir,
    bars:[...document.querySelectorAll('.elajme-bottom-actions,.mobile-conversion-bar,.arabic-mobile-conversion-bar')].map(e=>({class:e.className,rect:rect(e),display:getComputedStyle(e).display,text:e.textContent})),
    h1:[...document.querySelectorAll('h1')].map(e=>e.innerText),hero:hero?{rect:rect(hero),style:style(hero),marker:rect(hero.querySelector('.eyebrow-dot'))}:null,
    main:rect(document.querySelector('main')||document.body),footer:footer?{rect:rect(footer),style:style(footer),columns:getComputedStyle(footer).gridTemplateColumns}:null,
    clipped:[...document.querySelectorAll('h1,h2,h3,p,a,button,input,select,label,summary')].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&(r.left< -1||r.right>innerWidth+1)}).slice(0,20).map(e=>({tag:e.tagName,class:e.className,text:e.innerText?.slice(0,70),rect:rect(e)})),
    socials:[...document.querySelectorAll('.elajme-footer-socials a')].map(e=>({label:e.getAttribute('aria-label'),rect:rect(e),svg:e.querySelector('svg')?rect(e.querySelector('svg')):null})),
    canonical:document.querySelector('link[rel="canonical"]')?.href,alternates:[...document.querySelectorAll('link[hreflang]')].map(e=>({lang:e.hreflang,url:e.href})),description:document.querySelector('meta[name="description"]')?.content,
    structured:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>{try{return JSON.parse(e.textContent)}catch{return{invalid:true}}}),
    form:[...document.querySelectorAll('#patientEnquiryForm input,#patientEnquiryForm select')].map(e=>({id:e.id,type:e.type,required:e.required,dir:getComputedStyle(e).direction,inputmode:e.inputMode,autocomplete:e.autocomplete,rect:rect(e)})),
    wa:[...document.querySelectorAll('a[href*="wa.me/"]')].map(e=>({href:e.href,label:e.getAttribute('aria-label')})),
    broken:[...document.images].filter(e=>e.complete&&!e.naturalWidth&&e.getBoundingClientRect().width>0).map(e=>e.getAttribute('src')),cls:window.__qaCLS};});
   if(r.dom.docWidth>width+1)r.errors.push('Horizontal overflow');if(r.dom.bars.length!==1)r.errors.push('Duplicate/missing contact component');
   const visible=r.dom.bars.filter(x=>x.display!=='none'&&x.rect.h>0);if(visible.length!==(width<=900?1:0))r.errors.push('Incorrect sticky bar visibility');
   if(r.dom.clipped.length)r.observations.push('Patient-facing rectangles outside viewport');if(r.dom.h1.length!==1)r.observations.push('H1 count '+r.dom.h1.length);
   if(lang==='ar'&&r.dom.dir!=='rtl')r.errors.push('RTL absent');if(!r.dom.canonical||!r.dom.description)r.errors.push('SEO metadata missing');
   if(r.dom.broken.length)r.errors.push('Broken rendered image');if(r.dom.wa.some(a=>!/^https:\/\/wa.me\/917488955154(?:[/?#]|$)/.test(a.href)))r.errors.push('Wrong WhatsApp destination');
   if(width<=900){const menu=page.locator('.master-mobile-menu');await menu.click();if(await menu.getAttribute('aria-expanded')!=='true')r.errors.push('Menu not open');if(await page.locator('.master-nav a').count()!==8)r.errors.push('Navigation not eight items');await menu.click();if(await menu.getAttribute('aria-expanded')!=='false')r.errors.push('Menu not closed')}
   if(!suffix){
    await page.screenshot({path:output+'/'+id+'-hero.png'});
    const form=page.locator('#patientEnquiryForm');r.validation={blank:await form.evaluate(f=>f.checkValidity())};
    await form.locator('#patientName').fill('Synthetic QA');await form.locator('#patientCountry').fill('Oman');await form.locator('#patientMobile').fill('+96890000000');r.validation.valid=await form.evaluate(f=>f.checkValidity());
    await form.locator('#patientMobile').fill('invalid');r.validation.invalidPhone=await form.evaluate(f=>f.checkValidity());
    await form.locator('#patientMobile').fill('');await form.locator('#patientCountry').fill('');await form.locator('#patientName').fill('');
    await form.screenshot({path:output+'/'+id+'-form.png'});
    await page.addScriptTag({path:require.resolve('axe-core')});r.axe=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,12)}))});
    r.text=await page.locator('main').innerText();
   }
   await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';scrollTo(0,document.documentElement.scrollHeight)});await page.waitForTimeout(80);
   r.tail=await page.evaluate(()=>{const c=document.querySelector('.elajme-v2-copyright'),b=document.querySelector('.elajme-bottom-actions'),br=b.getBoundingClientRect(),cr=c.getBoundingClientRect();return{copyrightBottom:cr.bottom,barTop:br.top,bodyPadding:getComputedStyle(document.body).paddingBottom,barHeight:br.height,barVisible:getComputedStyle(b).display!=='none'}});
   if(r.tail.barVisible&&r.tail.copyrightBottom>r.tail.barTop+1)r.errors.push('Copyright blocked at maximum scroll');
   if(!suffix||r.errors.length||r.dom.clipped.length)await page.screenshot({path:output+'/'+id+'-footer.png'});
   if([390,768,1440].includes(width)&&!suffix)await page.screenshot({path:output+'/'+id+'-full.png',fullPage:true});
  }catch(e){r.errors.push(e.message);await page.screenshot({path:output+'/'+id+'-failure.png'}).catch(()=>{})}
  console.log(JSON.stringify({id:r.id,errors:r.errors,observations:r.observations}));await context.close();fs.writeFileSync(output+'/results.json',JSON.stringify(results,null,2));
 }}
 await Promise.all([worker(),worker(),worker(),worker()]);await browser.close();
 const summary={origin,cases:results.length,failures:results.filter(r=>r.errors.length).map(r=>({id:r.id,errors:r.errors})),observations:results.filter(r=>r.observations.length).map(r=>({id:r.id,observations:r.observations})),axe:results.filter(r=>r.axe?.length).map(r=>({id:r.id,violations:r.axe}))};fs.writeFileSync(output+'/summary.json',JSON.stringify(summary,null,2));console.log(JSON.stringify(summary));
 // Discovery audit preserves every observation; findings are reviewed before production changes.
})();
