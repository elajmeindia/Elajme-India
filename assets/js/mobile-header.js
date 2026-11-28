(()=>{const init=()=>{const path=location.pathname;const arabicPage=document.documentElement.lang.toLowerCase().startsWith('ar');const arabicWhatsAppUrl='https://wa.me/917488955154?text='+encodeURIComponent('مرحبا، أود الاستفسار عن خدمات تنسيق العلاج في الهند. يرجى التواصل معي.');if(arabicPage){document.querySelectorAll('a[href="https://wa.me/917488955154"]').forEach(a=>a.setAttribute('href',arabicWhatsAppUrl));}const directoryLanguageTargets={'/doctors/':'/ar/doctors/','/ar/doctors/':'/doctors/','/hospitals/':'/ar/hospitals/','/ar/hospitals/':'/hospitals/'};const directoryTarget=directoryLanguageTargets[path];if(directoryTarget)document.querySelectorAll('.master-lang').forEach(link=>link.setAttribute('href',directoryTarget));const targetLanguage=document.documentElement.lang.toLowerCase().startsWith('ar')?'en':'ar';const alternates=[...document.querySelectorAll('link[rel="alternate"][hreflang]')].filter(link=>link.getAttribute('hreflang')?.toLowerCase()===targetLanguage);if(alternates.length===1){try{const url=new URL(alternates[0].getAttribute('href'),location.origin);if(url.protocol==='https:'&&url.hostname==='elajmeindia.com'&&!url.username&&!url.password&&!url.port&&!url.search&&!url.hash&&url.pathname!==location.pathname&&(targetLanguage==='ar'?url.pathname.startsWith('/ar/'):!url.pathname.startsWith('/ar/')))document.querySelectorAll('.master-lang').forEach(link=>link.setAttribute('href',url.pathname));}catch(_){}}document.querySelectorAll('.master-site-header .master-nav').forEach(nav=>{const href=arabicPage?'/ar/blog/':'/blog/';if(!nav.querySelector('a[href="'+href+'"]')){const link=document.createElement('a');link.href=href;link.textContent=arabicPage?'المدونة':'Blog';if(location.pathname===href)link.setAttribute('aria-current','page');nav.append(link)}});document.querySelectorAll('.master-site-header').forEach((header,i)=>{if(!document.documentElement.lang.toLowerCase().startsWith('ar'))header.querySelectorAll('.master-nav a[href="/contact/"]').forEach(link=>{if(link.textContent.trim()==='Contact')link.textContent='Contact Us'});if(!header.querySelector('.master-email-strip')){const strip=document.createElement('div');strip.className='master-email-strip';const email=document.createElement('a');email.className='master-email-link';email.href='mailto:care@elajmeindia.com';email.dir='ltr';email.setAttribute('aria-label',document.documentElement.lang.toLowerCase().startsWith('ar')?'مراسلة علاج مي إنديا: care@elajmeindia.com':'Email Elajme India: care@elajmeindia.com');email.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><span>care@elajmeindia.com</span>';const contact=document.createElement('div');contact.className='master-contact-actions';const phoneLink=document.createElement('a');phoneLink.className='master-contact-phone';phoneLink.href='tel:+917488955154';phoneLink.dir='ltr';phoneLink.setAttribute('aria-label',document.documentElement.lang.toLowerCase().startsWith('ar')?'اتصل بعلاج مي إنديا: +91 7488 955 154':'Call Elajme India: +91 7488 955 154');phoneLink.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"></path></svg>';const whatsappLink=document.createElement('a');whatsappLink.className='master-contact-whatsapp';whatsappLink.href=arabicPage?arabicWhatsAppUrl:'https://wa.me/917488955154';whatsappLink.target='_blank';whatsappLink.rel='noopener noreferrer';whatsappLink.setAttribute('aria-label',document.documentElement.lang.toLowerCase().startsWith('ar')?'واتساب علاج مي إنديا':'WhatsApp Elajme India');whatsappLink.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"></path><path d="M9 8.5c1 3 3.5 5.5 6.5 6.5"></path></svg>';const number=document.createElement('span');number.className='master-contact-number';number.dir='ltr';number.textContent='+91 7488 955 154';phoneLink.append(number);whatsappLink.append(document.createTextNode(document.documentElement.lang.toLowerCase().startsWith('ar')?'واتساب':'WhatsApp Us'));contact.append(phoneLink,whatsappLink);const existingCta=header.querySelector('.master-actions .master-cta');if(existingCta){existingCta.classList.add('master-contact-enquiry');existingCta.textContent=document.documentElement.lang.toLowerCase().startsWith('ar')?'ابدأ استفسارك':'Start Your Enquiry';strip.append(email,contact,existingCta)}else{strip.append(email,contact)};header.prepend(strip)}if(header.querySelector('.master-mobile-controls'))return;const inner=header.querySelector('.master-header-inner'),nav=header.querySelector('.master-nav'),actions=header.querySelector('.master-actions');if(!inner||!nav||!actions)return;const ar=document.documentElement.lang.toLowerCase().startsWith('ar');const phone=actions.querySelector('.master-phone')?.getAttribute('href')||'tel:+917488955154';const wa=actions.querySelector('.master-whatsapp')?.getAttribute('href')||(ar?'https://wa.me/917488955154?text='+encodeURIComponent('مرحبا، أود الاستفسار عن خدمات تنسيق العلاج في الهند. يرجى التواصل معي.'):'https://wa.me/917488955154');const lang=actions.querySelector('.master-lang');actions.querySelector('.master-phone')?.remove();actions.querySelector('.master-whatsapp')?.remove();const controls=document.createElement('div');controls.className='master-mobile-controls';const call=document.createElement('a');call.className='master-mobile-control master-mobile-call';call.href=phone;call.setAttribute('aria-label',ar?'اتصل بعلاج مي إنديا':'Call Elajme India');call.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/></svg>';const whats=document.createElement('a');whats.className='master-mobile-control master-mobile-whatsapp';whats.href=wa;whats.target='_blank';whats.rel='noopener';whats.setAttribute('aria-label',ar?'واتساب علاج مي إنديا':'WhatsApp Elajme India');whats.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3h.5a8.48 8.48 0 0 1 8 8z"/><path d="M9.2 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.5 1 1.3 1.8 2.3 2.3.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .3-.1 1.4-.7 1.9-.5.5-1.3.8-2.1.7-1.1-.1-2.5-.5-4.2-2-2-1.8-3.2-4-3.3-5.3 0-.7.2-1.2.5-1.5z"/></svg>';const language=document.createElement('a');language.className='master-mobile-control master-mobile-lang';language.href=lang?.getAttribute('href')||(ar?'/':'/ar/');language.textContent=lang?.textContent.trim()||(ar?'English':'العربية');const menu=document.createElement('button');menu.type='button';menu.className='master-mobile-control master-mobile-menu';menu.setAttribute('aria-label',ar?'فتح القائمة':'Open menu');menu.setAttribute('aria-expanded','false');const navId=nav.id||`master-mobile-nav-${i}`;nav.id=navId;menu.setAttribute('aria-controls',navId);menu.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';const close=()=>{header.classList.remove('mobile-menu-open');document.body.classList.remove('mobile-menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',ar?'فتح القائمة':'Open menu');menu.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'};menu.addEventListener('click',()=>{const open=!header.classList.contains('mobile-menu-open');document.querySelectorAll('.master-site-header.mobile-menu-open').forEach(h=>h!==header&&h.classList.remove('mobile-menu-open'));header.classList.toggle('mobile-menu-open',open);document.body.classList.toggle('mobile-menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?(ar?'إغلاق القائمة':'Close menu'):(ar?'فتح القائمة':'Open menu'));menu.innerHTML=open?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'});nav.addEventListener('click',e=>{if(e.target.closest('a'))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});controls.append(call,whats,language,menu);inner.appendChild(controls)});// One shared contact bar owns both languages; reuse homepage markup.
let sheet=document.querySelector('link[href*="mobile-bottom-actions.css"]');if(!sheet){sheet=document.createElement('link');sheet.rel='stylesheet';document.head.appendChild(sheet)}sheet.href='/assets/css/mobile-bottom-actions.css?v=2';
let bar=document.querySelector('.elajme-bottom-actions');
if(!bar){bar=document.createElement('nav');bar.className='elajme-bottom-actions';document.body.appendChild(bar)}
bar.setAttribute('aria-label',arabicPage?'خيارات التواصل السريع':'Quick patient contact');bar.dir=arabicPage?'rtl':'ltr';
let enquiry=bar.querySelector('.elajme-bottom-enquiry');if(!enquiry){enquiry=document.createElement('a');enquiry.className='elajme-bottom-enquiry';enquiry.href=arabicPage?'/ar/#enquiry':'/#enquiry'}
enquiry.textContent=arabicPage?'أرسل استفسارك':'Enquire Now';
let whatsapp=bar.querySelector('.elajme-bottom-wa');if(!whatsapp){whatsapp=document.createElement('a');whatsapp.className='elajme-bottom-wa';whatsapp.href=arabicPage?arabicWhatsAppUrl:'https://wa.me/917488955154'}
whatsapp.target='_blank';whatsapp.rel='noopener noreferrer';whatsapp.setAttribute('aria-label',arabicPage?'واتساب علاج مي إنديا':'Chat with Elajme India on WhatsApp');whatsapp.textContent=arabicPage?'واتساب':'WhatsApp';
bar.append(enquiry,whatsapp)};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init()})();
;(()=>{if(document.querySelector('script[data-elajme-footer-offices]'))return;const s=document.createElement('script');s.src='/assets/js/footer-offices.js?v=2';s.defer=true;s.dataset.elajmeFooterOffices='true';document.head.appendChild(s)})();

;(()=>{if(document.querySelector('script[data-elajme-compact-header]'))return;
 const css=document.createElement('link');css.rel='stylesheet';
 css.href='/assets/css/compact-scroll-header.css?v=1';document.head.appendChild(css);
 const script=document.createElement('script');script.src='/assets/js/compact-scroll-header.js?v=1';
 script.defer=true;script.dataset.elajmeCompactHeader='true';document.head.appendChild(script);
})();

/* Shared bilingual greeting for direct WhatsApp links. */
function elajmeDirectWhatsAppUrl(language) {
  const greeting = language === 'ar'
    ? 'مرحبًا، أود الاستفسار عن تنسيق العلاج في الهند.'
    : 'Hello, I would like help with a treatment enquiry in India.';
  return 'https://wa.me/917488955154?text=' + encodeURIComponent(greeting);
}

(() => {
  const selector = 'a[href^="https://wa.me/917488955154"]';
  function localize(link) {
    if (!link || link.closest('[data-enquiry-review]')) return;
    const url = new URL(link.href);
    if (url.origin !== 'https://wa.me' || url.pathname.replace(/\/$/, '') !== '/917488955154') return;
    const language = document.documentElement.lang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    link.href = elajmeDirectWhatsAppUrl(language);
    link.referrerPolicy = 'no-referrer';
  }

  function localizeLinks() {
    document.querySelectorAll(selector).forEach(localize);
  }

  document.addEventListener('DOMContentLoaded', localizeLinks);
  window.addEventListener('load', localizeLinks);
  function localizeActivatedLink(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    localize(event.target.closest?.(selector));
  }
  document.addEventListener('click', localizeActivatedLink, true);
  document.addEventListener('auxclick', localizeActivatedLink, true);
})();

/* Optional enquiry context. Only published directory IDs cross page boundaries. */
(() => {
  const treatments = {"neurosurgery-india":{en:"Neurosurgery",ar:"جراحة الأعصاب"},"nephrology-kidney-care-india":{en:"Nephrology and Kidney Care",ar:"أمراض الكلى ورعايتها"},"cancer-treatment-india":{en:"Cancer Care",ar:"علاج السرطان"},"heart-treatment-india":{en:"Heart Treatment",ar:"علاج أمراض القلب"},"knee-replacement-india":{en:"Knee Replacement",ar:"استبدال مفصل الركبة"},"gastroenterology-treatment-india":{en:"Gastroenterology",ar:"أمراض الجهاز الهضمي"},"urology-treatment-india":{en:"Urology",ar:"المسالك البولية"},"spine-surgery-india":{en:"Spine Surgery",ar:"جراحة العمود الفقري"},"transplant-medicine-follow-up-india":{en:"Transplant Medicine and Follow-up Care",ar:"طب زراعة الأعضاء ورعاية المتابعة"},"sports-medicine-india":{en:"Sports Medicine",ar:"الطب الرياضي"},"nuclear-medicine-india":{en:"Nuclear Medicine",ar:"الطب النووي"},"allergy-clinical-immunology-india":{en:"Allergy and Clinical Immunology",ar:"الحساسية والمناعة السريرية"},"podiatry-foot-ankle-care-india":{en:"Podiatry and Foot and Ankle Care",ar:"طب القدم ورعاية القدم والكاحل"},"occupational-medicine-india":{en:"Occupational Medicine",ar:"طب العمل"},"wound-care-hyperbaric-medicine-india":{en:"Wound Care and Hyperbaric Medicine",ar:"العناية بالجروح والعلاج بالأكسجين عالي الضغط"},"oral-maxillofacial-surgery-india":{en:"Oral and Maxillofacial Surgery",ar:"جراحة الفم والوجه والفكين"},"breast-surgery-care-india":{en:"Breast Surgery and Care",ar:"جراحة الثدي ورعايته"},"hand-microsurgery-india":{en:"Hand and Microsurgery",ar:"جراحة اليد والجراحة المجهرية"},"sleep-medicine-india":{en:"Sleep Medicine",ar:"طب النوم"},"clinical-genetics-genomic-medicine-india":{en:"Clinical Genetics and Genomic Medicine",ar:"الوراثة السريرية والطب الجينومي"},"pain-management-treatment-india":{en:"Pain Management",ar:"علاج الألم"},"geriatric-medicine-india":{en:"Geriatric Medicine",ar:"طب الشيخوخة"},"interventional-radiology-treatment-india":{en:"Interventional Radiology",ar:"الأشعة التداخلية"},"thoracic-chest-surgery-india":{en:"Thoracic and Chest Surgery",ar:"جراحة الصدر"},"colorectal-surgery-india":{en:"Colorectal Surgery",ar:"جراحة القولون والمستقيم"},"rheumatology-autoimmune-care-india":{en:"Rheumatology and Autoimmune Care",ar:"أمراض الروماتيزم والمناعة الذاتية"},"hematology-blood-disorders-india":{en:"Hematology and Blood Disorders",ar:"أمراض الدم"},"vascular-surgery-india":{en:"Vascular Surgery",ar:"جراحة الأوعية الدموية"},"physical-medicine-rehabilitation-india":{en:"Physical Medicine and Rehabilitation",ar:"الطب الطبيعي وإعادة التأهيل"},"infectious-diseases-treatment-india":{en:"Infectious Diseases",ar:"الأمراض المعدية"},"ent-treatment-india":{en:"ENT (Ear, Nose and Throat)",ar:"الأنف والأذن والحنجرة"},"pulmonology-lung-treatment-india":{en:"Pulmonology and Lung Care",ar:"أمراض الصدر والرئة"},"dermatology-skin-treatment-india":{en:"Dermatology and Skin Care",ar:"الأمراض الجلدية"},"endocrinology-diabetes-care-india":{en:"Endocrinology and Diabetes Care",ar:"الغدد الصماء والسكري"},"pediatrics-child-health-india":{en:"Pediatrics and Child Health",ar:"طب الأطفال وصحة الطفل"},"cosmetic-surgery-india":{en:"Cosmetic and Reconstructive Surgery",ar:"جراحة التجميل والترميم"},"bone-marrow-transplant-india":{en:"Bone Marrow Transplant",ar:"زراعة نخاع العظم"},"bariatric-weight-loss-surgery-india":{en:"Bariatric and Weight Loss Surgery",ar:"جراحة السمنة وإنقاص الوزن"},"neurology-treatment-india":{en:"Neurology",ar:"طب الأعصاب"},"womens-health-gynaecology-india":{en:"Women's Health and Gynaecology",ar:"صحة المرأة وأمراض النساء"},"kidney-transplant-india":{en:"Kidney Transplant",ar:"زراعة الكلى"},"liver-transplant-india":{en:"Liver Transplant",ar:"زراعة الكبد"},"fertility-ivf-treatment-india":{en:"Fertility and IVF Treatment",ar:"علاج العقم وأطفال الأنابيب"},"palliative-supportive-care-india":{en:"Palliative and Supportive Care",ar:"الرعاية التلطيفية والداعمة"},"dental-treatment-india":{en:"Dental Treatment",ar:"علاج الأسنان"},"eye-treatment-india":{en:"Eye Treatment",ar:"علاج العيون"},"psychiatry-mental-health-india":{en:"Psychiatry and Mental Health",ar:"الطب النفسي والصحة النفسية"},"spine-surgery-india":{en:"Spine Surgery",ar:"جراحة العمود الفقري"}};
  const hospitals = {"apollo-hospitals-navi-mumbai":{"en":"Apollo Hospitals, Navi Mumbai","ar":"مستشفيات أبولو، نافي مومباي"},"artemis-hospital-gurugram":{"en":"Artemis Hospital, Gurugram","ar":"مستشفى أرتيمس، غوروغرام"},"blk-max-super-speciality-hospital-delhi":{"en":"BLK-Max Super Speciality Hospital","ar":"مستشفى BLK-Max التخصصي الفائق"},"fortis-escorts-heart-institute-delhi":{"en":"Fortis Escorts Heart Institute","ar":"معهد فورتيس إسكورتس للقلب، نيودلهي"},"fortis-hospital-mulund-mumbai":{"en":"Fortis Hospital, Mulund","ar":"مستشفى فورتيس، مولوند"},"fortis-hospital-noida":{"en":"Fortis Hospital, Noida","ar":"مستشفى فورتيس، نويدا"},"fortis-memorial-research-institute-gurugram":{"en":"Fortis Memorial Research Institute, Gurugram","ar":"مستشفى فورتيس ميموريال للأبحاث، جوروجرام"},"gleneagles-hospital-parel-mumbai":{"en":"Gleneagles Hospital, Parel, Mumbai","ar":"مستشفى غلين إيغلز، باريـل، مومباي"},"indraprastha-apollo-hospital-delhi":{"en":"Indraprastha Apollo Hospital, New Delhi","ar":"مستشفى إندرابراستا أبولو، نيودلهي"},"jaslok-hospital-mumbai":{"en":"Jaslok Hospital & Research Centre","ar":"مستشفى جاسلوك ومركز الأبحاث، مومباي"},"kokilaben-dhirubhai-ambani-hospital-mumbai":{"en":"Kokilaben Dhirubhai Ambani Hospital, Mumbai","ar":"مستشفى كوكيلابين ديروباي أمباني، مومباي"},"kokilaben-dhirubhai-ambani-hospital-navi-mumbai":{"en":"Kokilaben Dhirubhai Ambani Hospital, Navi Mumbai","ar":"مستشفى كوكيلابين ديروباي أمباني، نافي مومباي"},"max-super-speciality-hospital-noida":{"en":"Max Super Speciality Hospital, Noida","ar":"مستشفى ماكس التخصصي الفائق، نويدا"},"max-super-speciality-hospital-saket":{"en":"Max Super Speciality Hospital, Saket, Delhi","ar":"مستشفى ماكس سوبر التخصصي، ساكيت، دلهي"},"medanta-super-speciality-hospital-noida":{"en":"Medanta Noida","ar":"مستشفى ميدانتا، نويدا"},"medanta-the-medicity-gurugram":{"en":"Medanta – The Medicity, Gurugram","ar":"ميدانتا – ذا ميديسيتي، غوروغرام"},"nanavati-max-super-speciality-hospital-mumbai":{"en":"Nanavati Max Super Speciality Hospital, Mumbai","ar":"مستشفى نانافاتي ماكس التخصصي، مومباي"},"sir-hn-reliance-foundation-hospital-mumbai":{"en":"Sir H. N. Reliance Foundation Hospital and Research Centre","ar":"مستشفى سير إتش إن ريلاينس فاونديشن ومركز الأبحاث"},"sl-raheja-hospital-mumbai":{"en":"S.L. Raheja Hospital – A Fortis Associate, Mumbai","ar":"مستشفى إس إل راهيجا – أحد مستشفيات فورتيس، مومباي"},"wockhardt-hospital-mumbai-central":{"en":"Wockhardt Hospital Mumbai Central","ar":"مستشفى ووكهارت مومباي سنترال"}};
  const key = 'elajme_enquiry_selection';
  const ttl = 10 * 60 * 1000;
  const home = /^\/(?:ar\/)?$/;
  const profile = /^\/(?:ar\/)?hospitals\/([a-z0-9-]+)\/$/;
  const treatmentPage = /^\/(?:ar\/)?treatments\/([a-z0-9-]+)\/$/;
  const has = (map, id) => typeof id === 'string' && Object.hasOwn(map, id);

  function clear() {
    try { sessionStorage.removeItem(key); } catch (_) {}
  }

  function read(target) {
    try {
      const data = JSON.parse(sessionStorage.getItem(key));
      if (!data) return null;
      if (!Number.isFinite(data.expires) || data.expires <= Date.now() || data.expires > Date.now() + ttl) {
        clear();
        return null;
      }
      if (data.target !== target) return null;
      return {
        target,
        expires: data.expires,
        hospital: has(hospitals, data.hospital) ? data.hospital : null,
        treatment: has(treatments, data.treatment) ? data.treatment : null
      };
    } catch (_) {
      clear();
      return null;
    }
  }

  let current = null;
  const arriving = read(location.pathname);
  if (home.test(location.pathname) && location.hash === '#enquiry') {
    current = arriving;
    clear();
  } else if (arriving) {
    setTimeout(() => read(location.pathname), Math.max(0, arriving.expires - Date.now()) + 5);
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.search) return;
    const toProfile = url.pathname.match(profile)?.[1];
    const onProfile = location.pathname.match(profile)?.[1];
    let hospital = null;
    let treatment = null;
    let expires = Date.now() + ttl;

    if (has(hospitals, toProfile) && link.closest('main')) {
      const selected = location.pathname.match(treatmentPage)?.[1];
      if (!has(treatments, selected)) {
        clear();
        return;
      }
      hospital = toProfile;
      treatment = selected;
    } else if (home.test(url.pathname) && url.hash === '#enquiry') {
      if (home.test(location.pathname) && url.pathname === location.pathname) return;
      const forwarded = onProfile ? read(location.pathname) : null;
      const selected = link.dataset.enquiryTreatment;
      hospital = has(hospitals, onProfile) ? onProfile : null;
      treatment = has(treatments, selected) ? selected : forwarded?.treatment || null;
      if (forwarded) expires = forwarded.expires;
    } else {
      return;
    }

    // Never leave another page's selection waiting for a later enquiry.
    clear();
    if (!hospital && !treatment) return;
    try {
      sessionStorage.setItem(key, JSON.stringify({ hospital, treatment, target: url.pathname, expires }));
    } catch (_) {}
  });

  window.ElajmeEnquirySelection = {
    describe(language) {
      if (!current || current.expires <= Date.now()) {
        current = null;
        return '';
      }
      const ar = language === 'ar';
      const hospital = hospitals[current.hospital]?.[language];
      const treatment = treatments[current.treatment]?.[language];
      return [
        hospital ? (ar ? 'المستشفى المختار: ' : 'Selected hospital: ') + hospital : '',
        treatment ? (ar ? 'التخصص المطلوب: ' : 'Treatment interest: ') + treatment : ''
      ].filter(Boolean).join('\n');
    },
    finish() {
      current = null;
      clear();
    }
  };
})();
