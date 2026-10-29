/* Elajme India mobile Tawk launcher. Keeps native Tawk off the mobile header and opens chat from a controlled button. */
(function () {
  'use strict';
  if (!window.matchMedia || !window.matchMedia('(max-width: 900px)').matches) return;

  function ensureLauncher() {
    if (document.querySelector('.elajme-mobile-chat')) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'elajme-mobile-chat';
    button.setAttribute('aria-label', document.documentElement.lang === 'ar' ? 'فتح المحادثة' : 'Open chat');
    button.innerHTML = '<span aria-hidden="true">●</span>';
    button.addEventListener('click', function () {
      if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') window.Tawk_API.maximize();
    });
    document.body.appendChild(button);
  }

  function hideNative() {
    if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
      try { window.Tawk_API.hideWidget(); } catch (e) {}
    }
  }

  ensureLauncher();
  var attempts = 0;
  var timer = window.setInterval(function () {
    hideNative();
    attempts += 1;
    if (attempts >= 40) window.clearInterval(timer);
  }, 250);

  window.addEventListener('load', hideNative);
})();
