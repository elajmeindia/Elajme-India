(() => {
  'use strict';

  const number = 'https://wa.me/917488955154';
  const copy = {
    en: {
      heading: 'Review your enquiry',
      instructions: 'Check your details, then copy them and open WhatsApp. Paste your details into the chat and send when ready.',
      copyAndOpen: 'Copy and open WhatsApp',
      open: 'Open WhatsApp',
      close: 'Back to form',
      manual: 'Could not copy automatically. Select and copy the summary, then open WhatsApp and paste it into the chat.',
      greeting: 'Hello, I would like help with a treatment enquiry in India.'
    },
    ar: {
      heading: 'راجع استفسارك',
      instructions: 'راجع بياناتك، ثم انسخها وافتح واتساب. الصق بياناتك في المحادثة وأرسلها عندما تكون جاهزًا.',
      copyAndOpen: 'انسخ وافتح واتساب',
      open: 'افتح واتساب',
      close: 'العودة إلى النموذج',
      manual: 'تعذّر النسخ التلقائي. حدّد الملخص وانسخه، ثم افتح واتساب والصقه في المحادثة.',
      greeting: 'مرحبًا، أود الاستفسار عن تنسيق العلاج في الهند.'
    }
  };

  function destination(language) {
    return number + '?text=' + encodeURIComponent(copy[language === 'ar' ? 'ar' : 'en'].greeting);
  }

  function review(message, interfaceLanguage, messageLanguage, onHandoff) {
    if (document.querySelector('[data-enquiry-review]')) return;

    const locale = interfaceLanguage === 'ar' ? 'ar' : 'en';
    const labels = copy[locale];
    const url = destination(messageLanguage);
    const origin = document.activeElement;
    const dialog = document.createElement('dialog');
    dialog.dataset.enquiryReview = '';
    dialog.lang = locale;
    dialog.dir = locale === 'ar' ? 'rtl' : 'ltr';
    dialog.setAttribute('aria-labelledby', 'enquiry-review-heading');
    dialog.setAttribute('aria-describedby', 'enquiry-review-instructions');

    const heading = document.createElement('h2');
    heading.id = 'enquiry-review-heading';
    heading.textContent = labels.heading;

    const instructions = document.createElement('label');
    instructions.id = 'enquiry-review-instructions';
    instructions.htmlFor = 'enquiry-review-summary';
    instructions.textContent = labels.instructions;

    const summary = document.createElement('textarea');
    summary.id = 'enquiry-review-summary';
    summary.readOnly = true;
    summary.dir = messageLanguage === 'ar' ? 'rtl' : 'ltr';
    summary.rows = 7;
    summary.value = message;

    const status = document.createElement('p');
    status.setAttribute('role', 'status');

    const actions = document.createElement('div');
    actions.className = 'enquiry-review-actions';

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.textContent = labels.copyAndOpen;

    const open = document.createElement('a');
    open.href = url;
    open.target = '_blank';
    open.rel = 'noopener noreferrer';
    open.textContent = labels.open;
    open.hidden = true;

    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = labels.close;

    let recorded = false;
    function record() {
      if (recorded) return;
      recorded = true;
      onHandoff();
    }

    function manualCopy() {
      copyButton.disabled = false;
      open.hidden = false;
      status.textContent = labels.manual;
      summary.focus();
      summary.select();
    }

    copyButton.addEventListener('click', async () => {
      copyButton.disabled = true;
      try {
        await navigator.clipboard.writeText(summary.value);
      } catch (_) {
        if (dialog.open) manualCopy();
        return;
      }
      if (!dialog.open) return;
      record();
      // Keep the original form in this tab. If a browser blocks the new tab,
      // the visible link remains a keyboard-accessible fallback.
      open.hidden = false;
      status.textContent = locale === 'ar' ? 'تم النسخ. الصق الملخص في واتساب.' : 'Copied. Paste your summary into WhatsApp.';
      open.click();
    });

    open.addEventListener('click', record);
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      summary.value = '';
      dialog.remove();
      if (origin instanceof HTMLElement) origin.focus();
    }, { once: true });

    actions.append(copyButton, open, close);
    dialog.append(heading, instructions, summary, status, actions);
    document.body.append(dialog);
    dialog.showModal();
    copyButton.focus();
  }

  window.ElajmeEnquiry = { destination, review };
})();
