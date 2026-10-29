/* Elajme India mobile hamburger menu — homepage only, footer untouched. */
(function(){
  'use strict';
  if(!window.matchMedia||!window.matchMedia('(max-width:900px)').matches)return;
  function init(){
    var header=document.querySelector('.site-header');
    var nav=header&&header.querySelector('.desktop-nav');
    var actions=header&&header.querySelector('.nav-actions');
    if(!header||!nav||!actions||header.querySelector('.mobile-menu-toggle'))return;

    /* Arabic homepage legacy CSS can add generated labels to About/Contact.
       Mark those links so the mobile stylesheet can suppress only those generated copies. */
    if(document.documentElement.lang==='ar'){
      Array.prototype.forEach.call(nav.querySelectorAll('a'),function(link){
        var href=link.getAttribute('href')||'';
        var dataEn=(link.getAttribute('data-en')||'').toLowerCase();
        if(dataEn==='about us'||/\/about\/?(?:#.*)?$/.test(href))link.classList.add('mobile-ar-about');
        if(dataEn==='contact'||/\/contact\/?(?:#.*)?$/.test(href))link.classList.add('mobile-ar-contact');
      });
    }

    var btn=document.createElement('button');
    btn.type='button';
    btn.className='mobile-menu-toggle';
    btn.setAttribute('aria-label',document.documentElement.lang==='ar'?'فتح القائمة':'Open menu');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls','elajme-mobile-nav');
    btn.innerHTML='<span></span><span></span><span></span>';
    nav.id='elajme-mobile-nav';
    actions.appendChild(btn);
    function setOpen(open){
      header.classList.toggle('mobile-menu-open',open);
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.setAttribute('aria-label',open?(document.documentElement.lang==='ar'?'إغلاق القائمة':'Close menu'):(document.documentElement.lang==='ar'?'فتح القائمة':'Open menu'));
    }
    btn.addEventListener('click',function(){setOpen(!header.classList.contains('mobile-menu-open'));});
    nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
    document.addEventListener('click',function(e){if(header.classList.contains('mobile-menu-open')&&!header.contains(e.target))setOpen(false);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
