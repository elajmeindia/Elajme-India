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
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.9 3 3 6.5 3 10.9c0 2.5 1.3 4.8 3.5 6.3L5.7 21l4.2-2c.7.1 1.4.2 2.1.2 5.1 0 9-3.5 9-8.2S17.1 3 12 3Zm-4 9.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z"/></svg>';
    button.addEventListener('click', function () {
      if (window.Tawk_API && typeof window.Tawk_API.showWidget === 'function') { try { window.Tawk_API.showWidget(); } catch (e) {} }
      if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') window.Tawk_API.maximize();
    });
    document.body.appendChild(button);
  }

  function hideNative() {
    if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') { try { window.Tawk_API.hideWidget(); } catch (e) {} }
  }

  ensureLauncher();
  var attempts = 0;
  var timer = window.setInterval(function () {
    hideNative();
    attempts += 1;
    if (attempts >= 80) window.clearInterval(timer);
  }, 250);
  window.addEventListener('load', hideNative);
})();
