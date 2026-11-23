(() => {
  'use strict';
  const form = document.getElementById('faqEnquiryForm');
  if (!form) return;

  const arabic = document.documentElement.lang.toLowerCase().startsWith('ar');
  const phone = form.elements.namedItem('phone');
  const submit = form.querySelector('button[type="submit"]');
  const status = document.getElementById('faqEnquiryStatus');
  let handoffPending = false;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (handoffPending || !form.reportValidity()) return;

    const number = window.normalizeEnquiryPhone(phone.value);
    if (!number) {
      status.textContent = arabic ? 'يرجى إدخال رقم صحيح مع رمز الدولة.' : 'Enter a valid number with country code.';
      phone.focus();
      return;
    }

    const name = form.elements.namedItem('name').value.trim();
    const country = form.elements.namedItem('country').value.trim();
    if (!name || !country) return;

    const message = arabic
      ? 'مرحباً، أود الاستفسار عن خدمات تنسيق العلاج في الهند.\nالاسم: ' + name + '\nالدولة: ' + country + '\nرقم التواصل: ' + number
      : 'Hello, I would like assistance with a hospital enquiry in India.\nName: ' + name + '\nCountry: ' + country + '\nContact number: ' + number;

    handoffPending = true;
    submit.disabled = true;
    if (typeof window.gtag === 'function') {
      const properties = { lead_source: 'faq_enquiry_form', language: arabic ? 'ar' : 'en', page_path: location.pathname };
      window.gtag('event', 'whatsapp_handoff_intent', properties);
      window.gtag('event', 'whatsapp_enquiry_click', { ...properties, contact_method: 'whatsapp' });
    }
    status.textContent = arabic
      ? 'سيُفتح واتساب برسالة جاهزة. يرجى مراجعتها وإرسالها بنفسك.'
      : 'WhatsApp will open with a prepared message. Please review and send it yourself.';
    window.location.assign('https://wa.me/917488955154?text=' + encodeURIComponent(message));
    setTimeout(() => {
      handoffPending = false;
      submit.disabled = false;
    }, 1200);
  });
})();
