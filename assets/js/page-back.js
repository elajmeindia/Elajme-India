(() => {
  document.addEventListener('DOMContentLoaded', () => {
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
    style.textContent = '.elajme-page-back{display:inline-flex;align-items:center;justify-content:center;min-height:44px;margin:16px 0 8px;padding:8px 18px;border:1px solid #147b83;border-radius:8px;background:#fff;color:#07565d;font:inherit;font-weight:600;cursor:pointer}.elajme-page-back:hover{background:#edf8f8}.elajme-page-back:focus-visible{outline:3px solid #147b83;outline-offset:3px}';
    document.head.append(style);
    main.prepend(button);
  }, { once: true });
})();
