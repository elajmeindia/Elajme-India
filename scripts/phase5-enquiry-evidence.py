import asyncio, re, json, os, urllib.parse, subprocess
from pathlib import Path
from playwright.async_api import async_playwright
BASE='https://elajmeindia.com'
CACHE={}
LIMIT=asyncio.Semaphore(20)
async def fetch(url):
 async with LIMIT:
  if url in CACHE:return CACHE[url]
  def run():
   p=subprocess.run(['curl','-LsS','--max-time','22','-w','\n%{http_code} %{content_type}',url],capture_output=True)
   body,_,meta=p.stdout.rpartition(b'\n')
   status,_,mime=meta.decode(errors='replace').partition(' ')
   return int(status) if status.isdigit() and int(status) else 502,mime or 'text/plain',body
  result=await asyncio.to_thread(run)
  if result[0]==200:CACHE[url]=result
  return result
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
   for number in ['1------','1234567','+٩٦٨ ٩١٢٣٤٥٦٧','+1 202 555 0100']:
    await page.locator(phone).fill(number)
    before=await events(); initial=len(hits)
    await f.evaluate('f=>{f.requestSubmit();f.requestSubmit()}'); await page.wait_for_timeout(200)
    result[number]=[len(hits)-initial,(await events())[len(before):]]
 await context.close()
 return result
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(args=['--no-sandbox'])
  for mode,paths in [(True,['/','/ar/','/faq/','/ar/faq/']),(False,['/international-patients/mea/','/treatments/','/hospitals/','/doctors/','/contact/']+[f'/{s}/treatment-in-india/' for s in 'saudi-arabia nigeria oman uae qatar kuwait bahrain chad algeria ghana tanzania mauritius liberia mauritania fiji democratic-republic-of-the-congo republic-of-the-congo'.split()])]:
   if not mode:paths += ['/ar'+x for x in paths]
   if os.environ['AUDIT_MODE'] != ('forms' if mode else 'links'):continue
   for width in [390,768,1366]:
    for i in range(0,len(paths),8):
     group=paths[i:i+8]
     results=await asyncio.gather(*(test(b,path,width,mode) for path in group),return_exceptions=True)
     for path,r in zip(group,results): print(json.dumps([path,width,r if isinstance(r,dict) else str(r)],ensure_ascii=False),flush=True)
  await b.close()
asyncio.run(main())
