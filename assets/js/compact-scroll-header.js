/* Desktop-only sticky navigation. Mobile retains its approved header behavior. */
(()=>{const init=()=>{
 const headers=[...document.querySelectorAll('.master-site-header')];
 if(!headers.length)return;
 const desktop=window.matchMedia('(min-width:901px)');
 let last=window.scrollY,raf=false;
 const apply=()=>{
  raf=false;
  const y=window.scrollY;
  if(!desktop.matches){headers.forEach(h=>h.classList.remove('elajme-header-condensed'));last=y;return}
  const up=y<last-3,nearTop=y<36;
  headers.forEach(h=>{
   if(nearTop||up)h.classList.remove('elajme-header-condensed');
   else if(y>120)h.classList.add('elajme-header-condensed');
  });
  last=y;
 };
 window.addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(apply)}},{passive:true});
 window.addEventListener('resize',apply,{passive:true});
 apply();
};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init()})();
