(() => {
  const initialize = () => {
    const main = document.querySelector('main');
    if (!main || document.querySelector('.elajme-page-back')) return;
    const arabic = document.documentElement.lang.toLowerCase().startsWith('ar');
    const fallback = arabic ? '/ar/' : '/';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'elajme-page-back';
    button.textContent = arabic ? 'عودة' : 'Back';
    button.setAttribute('aria-label', arabic ? 'العودة إلى الصفحة السابقة' : 'Go back to the previous page');
    button.addEventListener('click', () => {
      let internalReferrer = false;
      try {
        const referrer = new URL(document.referrer);
        internalReferrer = referrer.origin === location.origin && referrer.href !== location.href;
      } catch (_) { /* Direct visit or invalid referrer: use language home. */ }
      if (internalReferrer && history.length > 1) history.back();
      else location.assign(fallback);
    });
    const style = document.createElement('style');
    style.textContent = 'main{position:relative}.elajme-page-back{position:absolute;z-index:2;top:8px;inset-inline-start:16px;display:inline-flex;align-items:center;justify-content:center;min-height:44px;margin:0;padding:8px 18px;box-sizing:border-box;max-width:calc(100% - 32px);border:1px solid #147b83;border-radius:8px;background:#fff;color:#07565d;font:inherit;font-weight:600;cursor:pointer}.elajme-page-back:hover{background:#edf8f8}.elajme-page-back:focus-visible{outline:3px solid #147b83;outline-offset:3px}';
    document.head.append(style);
    main.prepend(button);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', localizeLinks, { once: true });
  } else {
    localizeLinks();
  }
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
  } else {
    clear();
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
