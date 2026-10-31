/* Elajme India Arabic mobile hamburger + conversion bar. Footer untouched. */
(function(){
  'use strict';
  if(document.documentElement.lang!=='ar'||!window.matchMedia||!window.matchMedia('(max-width:900px)').matches)return;
  function init(){
    var header=document.querySelector('.shell-header');
    var nav=header&&header.querySelector('.shell-links');
    var actions=header&&header.querySelector('.shell-actions');
    if(!header||!nav||!actions)return;

    var btn=header.querySelector('.arabic-mobile-menu-toggle');
    if(!btn){
      btn=document.createElement('button');
      btn.type='button';
      btn.className='arabic-mobile-menu-toggle';
      btn.setAttribute('aria-label','فتح القائمة');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-controls','elajme-ar-mobile-nav');
      btn.innerHTML='<span></span><span></span><span></span>';
      nav.id='elajme-ar-mobile-nav';
      actions.appendChild(btn);
      function setOpen(open){
        header.classList.toggle('arabic-mobile-menu-open',open);
        btn.setAttribute('aria-expanded',open?'true':'false');
        btn.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');
      }
      btn.addEventListener('click',function(){setOpen(!header.classList.contains('arabic-mobile-menu-open'));});
      nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
      document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
      document.addEventListener('click',function(e){if(header.classList.contains('arabic-mobile-menu-open')&&!header.contains(e.target))setOpen(false);});
    }

    if(!document.querySelector('.arabic-mobile-conversion-bar')){
      var bar=document.createElement('div');
      bar.className='arabic-mobile-conversion-bar';
      bar.setAttribute('aria-label','خيارات التواصل السريع');
      bar.innerHTML='<a class="arabic-mobile-case-cta" href="/ar/#enquiry"><span aria-hidden="true">＋</span><span>ابدأ استفسارك</span></a><a class="arabic-mobile-wa-cta" href="https://wa.me/917488955154?text='+encodeURIComponent('السلام عليكم علاج مي إنديا، أبحث عن العلاج في الهند وأود الحصول على مساعدتكم. يرجى إرشادي إلى الخطوات التالية وكيف يمكنني مشاركة تقاريري الطبية للمراجعة.')+'" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span>واتساب</span></a>';
      document.body.appendChild(bar);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
