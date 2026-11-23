import asyncio, re, json, os, urllib.parse, subprocess
from pathlib import Path
from playwright.async_api import async_playwright
BASE='https://elajmeindia.com'
CANDIDATE=os.environ.get('AUDIT_CANDIDATE','')
FORM_PATHS={'/':'index.html','/ar/':'ar/index.html','/faq/':'faq/index.html','/ar/faq/':'ar/faq/index.html'}
FORM_SCRIPTS={'/script.js','/assets/js/enquiry-phone.js','/assets/js/faq-enquiry.js','/assets/js/arabic-enquiry-analytics.js'}
async def test(browser,path,width,form=False):
 ar=path.startswith('/ar/')
 height={390:844,768:1024,1366:900}[width]
 context=await browser.new_context(viewport={'width':width,'height':height},service_workers='block')
 hits=[]
 async def route(r):
  request=r.request; u=urllib.parse.urlsplit(request.url)
  if u.hostname in ('wa.me','api.whatsapp.com','web.whatsapp.com'):
   hits.append(request.url); return await r.fulfill(status=204)
  if u.hostname!='elajmeindia.com' or request.method!='GET' or u.path.startswith('/api/'):return await r.abort()
  if CANDIDATE=='forms' and (u.path in FORM_PATHS or u.path in FORM_SCRIPTS):
   file=Path('candidate-forms') / FORM_PATHS.get(u.path,u.path.lstrip('/'))
   if file.is_file():
    return await r.fulfill(status=200,content_type='text/html; charset=utf-8' if file.suffix=='.html' else 'application/javascript; charset=utf-8',body=file.read_bytes())
  if CANDIDATE=='links' and u.path=='/assets/js/mobile-header.js':
   return await r.fulfill(status=200,content_type='application/javascript; charset=utf-8',body=Path('candidate-links/assets/js/mobile-header.js').read_bytes())
  await r.continue_()
 await context.route('**/*',route)
 page=await context.new_page()
 await page.goto(BASE+path,wait_until='domcontentloaded',timeout=100000)
 await page.wait_for_timeout(350)
 result=await page.evaluate('''() => {
 const vis=e=> !!e.getClientRects().length && getComputedStyle(e).visibility==='visible';
 const wa=[...document.querySelectorAll('a[href]')].filter(a=>/wa\\.me|whatsapp\\.com/.test(a.href)&&vis(a)).map(a=>[a.href,a.textContent.trim(),a.className]);
 return {wa, bars:[...document.querySelectorAll('.mobile-sticky-actions')].filter(vis).length, forms:[...document.forms].map(f=>f.id), menus:[...document.querySelectorAll('button[aria-expanded]')].filter(vis).slice(0,5).map(e=>[e.id,e.className,e.getAttribute('aria-controls')]), faqs:[...document.querySelectorAll('details>summary')].filter(vis).length};}''')
 wa=result.pop('wa')
 result.update(links=len(wa), wrong=sum('917488955154' not in u for u,_,_ in wa), wrongLanguage=[i for i,(u,_,_) in enumerate(wa) if bool(re.search('[\u0600-\u06ff]',urllib.parse.parse_qs(urllib.parse.urlsplit(u).query).get('text',[''])[0]))!=ar], missingText=sum('text=' not in u for u,_,_ in wa))
 async def events():
  return await page.evaluate("""() => (window.dataLayer||[]).filter(x=>x[0]==='event').map(x=>x[1])""")
 if wa:
  link=page.locator('a[href]').filter(visible=True)
  try:
   old=await events()
   await page.locator('a[href='+json.dumps(wa[0][0])+']:visible').first.click(timeout=2500)
   await page.wait_for_timeout(250)
   result['direct']=[len(hits),(await events())[len(old):]]
  except Exception:result['direct']='not clicked'
 if form:
  name='#patientName' if path in ('/','/ar/') else '#faqEnquiryForm [name=name]'
  if await page.locator(name).count():
   f=page.locator('#patientEnquiryForm,#faqEnquiryForm')
   submit=f.locator('button[type=submit]')
   await submit.click(timeout=5000)
   result['empty']=[await f.evaluate('f=>f.checkValidity()'),len(hits)]
   if 'faq' in path: country,phone='#faqEnquiryForm [name=country]','#faqEnquiryForm [name=phone]'
   else:country,phone='#patientCountry','#patientMobile'
   for sel,val in [(name,'QA Synthetic'),(country,'Oman'),(phone,'abcdefg')]:await page.locator(sel).fill(val)
   await submit.click(timeout=5000); result['invalid']=[len(hits),await page.locator(phone).evaluate('e=>[e.validationMessage,document.activeElement===e]')]
   await page.locator(phone).fill('+1 202 555 0100')
   before=await events(); initial=len(hits)
   await submit.click(timeout=5000); await page.wait_for_timeout(200)
   result['valid']=[len(hits)-initial,(await events())[len(before):],bool(hits and 'QA Synthetic' in urllib.parse.unquote(hits[-1])),bool(hits and re.search('[\u0600-\u06ff]',urllib.parse.unquote(hits[-1])))]
   if CANDIDATE=='forms':await page.wait_for_timeout(1060)
   for number in ['1------','1234567','+٩٦٨ ٩١٢٣٤٥٦٧','+1 202 555 0100']:
    await page.locator(phone).fill(number)
    before=await events(); initial=len(hits)
    await f.evaluate('f=>{f.requestSubmit();f.requestSubmit()}'); await page.wait_for_timeout(200)
    result[number]=[len(hits)-initial,(await events())[len(before):]]
    if CANDIDATE=='forms':await page.wait_for_timeout(1050)
 if not form:
  result['interaction']=await page.evaluate("""() => {
    const bar=document.querySelector('.elajme-bottom-actions');
    const visible=e=>e && !!e.getClientRects().length;
    const active=visible(bar);
    const footer=document.querySelector('footer');
    const language=[...document.querySelectorAll('a[href]')].filter(a=>visible(a)&&
      (a.matches('.master-mobile-language,.master-lang,.master-language,.lang-toggle') || ['English','العربية'].includes(a.textContent.trim())));
    return {bars:[...document.querySelectorAll('.elajme-bottom-actions')].filter(visible).length,
      targets:active?[...bar.querySelectorAll('a')].map(a=>[a.getBoundingClientRect().width,a.getBoundingClientRect().height,a.getAttribute('aria-label')||a.textContent.trim()]):[],
      languageLinks:language.map(a=>new URL(a.href).pathname).slice(0,5),
      footerClearance:active&&footer?Math.round(document.documentElement.scrollHeight-footer.getBoundingClientRect().bottom-window.scrollY):null};
  }""")
  if result['interaction']['bars']:
   bar=page.locator('.elajme-bottom-wa:visible').first
   tick=len(hits)
   snapshot=await events()
   try:
    await bar.focus(); await page.keyboard.press('Enter')
    await page.wait_for_timeout(150)
    result['sticky']=[len(hits)-tick,(await events())[len(snapshot):]]
   except Exception:result['sticky']='not activated'
  if width<1000 and await page.locator('.master-mobile-menu:visible').count():
   menu=page.locator('.master-mobile-menu:visible').first
   await menu.focus(); await page.keyboard.press('Enter')
   target=await menu.get_attribute('aria-controls')
   result['keyboardMenu']=[await menu.get_attribute('aria-expanded'),await page.locator('#'+target).is_visible()]
   await page.keyboard.press('Escape')
   result['keyboardMenu'] += [await menu.get_attribute('aria-expanded')]
  if result['faqs']:
   summary=page.locator('details>summary:visible').first
   await summary.focus(); await page.keyboard.press('Enter')
   result['keyboardFaq']=await summary.evaluate('e=>e.parentElement.open')
 await context.close()
 return result
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(args=['--no-sandbox'])
  failures=[]
  for mode,paths in [(True,['/','/ar/','/faq/','/ar/faq/']),(False,['/international-patients/mea/','/treatments/','/hospitals/','/doctors/','/contact/']+[f'/{s}/treatment-in-india/' for s in 'saudi-arabia nigeria oman uae qatar kuwait bahrain chad algeria ghana tanzania mauritius liberia mauritania fiji democratic-republic-of-the-congo republic-of-the-congo'.split()])]:
   if not mode:paths += ['/faq/','/']
   if not mode:paths += ['/ar'+x for x in paths]
   if os.environ['AUDIT_MODE'] != ('forms' if mode else 'links'):continue
   for width in [390,768,1366]:
    for i in range(0,len(paths),8):
     group=paths[i:i+8]
     results=await asyncio.gather(*(test(b,path,width,mode) for path in group),return_exceptions=True)
     for path,r in zip(group,results):
      print(json.dumps([path,width,r if isinstance(r,dict) else str(r)],ensure_ascii=False),flush=True)
      if not isinstance(r,dict):
       failures.append([path,width,'test error'])
      elif CANDIDATE=='forms':
       if r['valid'][0]!=1 or r['1------'][0]!=0 or r['1234567'][0]!=0 or r['+٩٦٨ ٩١٢٣٤٥٦٧'][0]!=1 or r['+1 202 555 0100'][0]!=1:
        failures.append([path,width,'handoff regression'])
       if path in ('/','/ar/') and any(len(r[n][1])!=2 for n in ('+٩٦٨ ٩١٢٣٤٥٦٧','+1 202 555 0100')):
        failures.append([path,width,'event duplication'])
      elif CANDIDATE=='links' and (r['wrong'] or r['wrongLanguage'] or r['missingText'] or not isinstance(r.get('direct'),list) or r['direct'][0]!=1):
       failures.append([path,width,'WhatsApp route or message regression'])
  await b.close()
  if failures:raise SystemExit(json.dumps(failures))
asyncio.run(main())
