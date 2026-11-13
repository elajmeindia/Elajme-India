// Read-only regression test for the QA branch. Run: node tests/language-switch-unit.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const script=fs.readFileSync('assets/js/mobile-header.js','utf8');
function run({path,lang,alternate,expected}){
  const links=[{href:lang==='ar'?'/':'/ar/',getAttribute(k){return this[k]},setAttribute(k,v){this[k]=v}}];
  const metadata=(alternate||[]).map(([hreflang,href])=>({getAttribute(k){return {hreflang,href}[k]}}));
  const document={
    documentElement:{lang},
    readyState:'complete',
    querySelectorAll(selector){
      if(selector==='.master-lang')return links;
      if(selector==='link[rel="alternate"][hreflang]')return metadata;
      if(selector==='.master-site-header')return [];
      return [];
    },
    // The language-only scenarios intentionally skip header and conversion-bar creation.
    querySelector(selector){return selector==='.arabic-mobile-conversion-bar'?{}:null},
    body:{classList:{remove(){},toggle(){}},appendChild(){}},
    createElement(){throw Error('Unexpected element creation')},
    addEventListener(){}
  };
  const location={pathname:path,origin:'https://elajmeindia.com'};
  vm.runInNewContext(script,{document,location,URL}, {timeout:1000});
  assert.equal(links[0].href,expected,lang+' '+path);
}
const cases=[
 ['/oman/treatment-in-india/','en',[['ar','https://elajmeindia.com/ar/oman/treatment-in-india/']],'/ar/oman/treatment-in-india/'],
 ['/ar/oman/treatment-in-india/','ar',[['en','https://elajmeindia.com/oman/treatment-in-india/']],'/oman/treatment-in-india/'],
 ['/doctors/','en',[['ar','https://elajmeindia.com/ar/doctors/']],'/ar/doctors/'],
 ['/ar/hospitals/','ar',[['en','https://elajmeindia.com/hospitals/']],'/hospitals/'],
 ['/doctors/dr-anup-dhir/','en',[['ar','https://elajmeindia.com/ar/doctors/dr-anup-dhir/']],'/ar/doctors/dr-anup-dhir/'],
 ['/ar/doctors/dr-anup-dhir/','ar',[['en','https://elajmeindia.com/doctors/dr-anup-dhir/']],'/doctors/dr-anup-dhir/'],
 ['/blog/','en',[['ar','https://elajmeindia.com/ar/blog/']],'/ar/blog/'],
 ['/ar/blog/','ar',[['en','https://elajmeindia.com/blog/']],'/blog/'],
 ['/contact/','en',[],'/ar/'],
 ['/ar/contact/','ar',[],'/'],
 ['/about/','en',[['ar','https://evil.example/ar/about/']],'/ar/'],
 ['/ar/about/','ar',[['en','http://elajmeindia.com/about/']],'/'],
 ['/about/','en',[['ar','https://elajmeindia.com/ar/about/?test=1']],'/ar/'],
 ['/about/','en',[['ar','https://elajmeindia.com/ar/about/#top']],'/ar/'],
 ['/about/','en',[['ar','https://elajmeindia.com/ar/about/'],['ar','https://elajmeindia.com/ar/contact/']],'/ar/'],
 ['/ar/about/','ar',[['en','https://elajmeindia.com/ar/contact/']],'/']
];
for(const [path,lang,alternate,expected] of cases)run({path,lang,alternate,expected});
console.log('PASS',cases.length,'full-script language-selection scenarios (header absent)');

// Exercise the actual mobile-header construction, not just the language selector.
function mobileScenario(lang,path,alternate,expected){
  const classes=()=>{const state=new Set();return {add(x){state.add(x)},remove(x){state.delete(x)},contains(x){return state.has(x)},toggle(x,on){if(on)state.add(x);else state.delete(x)}}};
  function element(tag){
    return {tag,className:'',href:'',id:'',children:[],attrs:{},classList:classes(),
      setAttribute(k,v){this.attrs[k]=String(v)},getAttribute(k){return this.attrs[k]??null},
      append(...nodes){this.children.push(...nodes)},appendChild(node){this.children.push(node)},
      addEventListener(event,fn){(this.events??={})[event]=fn},
      click(){this.events?.click?.()},
      querySelector(){return null}
    };
  }
  const inner=element('div'),nav=element('nav'),actions=element('div'),header=element('header');
  const desktopLang=element('a');desktopLang.href=lang==='ar'?'/':'/ar/';desktopLang.textContent=lang==='ar'?'English':'العربية';
  desktopLang.getAttribute=function(k){return k==='href'?this.href:null};
  const phone=element('a');phone.href='tel:+917488955154';phone.getAttribute=function(k){return k==='href'?this.href:null};
  const whatsapp=element('a');whatsapp.href='https://wa.me/917488955154';whatsapp.getAttribute=function(k){return k==='href'?this.href:null};
  actions.querySelector=selector=>({'.master-phone':phone,'.master-whatsapp':whatsapp,'.master-lang':desktopLang})[selector]??null;
  header.querySelector=selector=>({'.master-header-inner':inner,'.master-nav':nav,'.master-actions':actions})[selector]??null;
  const metadata=[[lang==='ar'?'en':'ar',alternate]].map(([hreflang,href])=>({getAttribute(k){return {hreflang,href}[k]}}));
  const body=element('body');
  const document={documentElement:{lang},readyState:'complete',body,
    querySelectorAll(selector){
      if(selector==='.master-lang')return [desktopLang];
      if(selector==='link[rel="alternate"][hreflang]')return metadata;
      if(selector==='.master-site-header')return [header];
      if(selector==='.master-site-header.mobile-menu-open')return header.classList.contains('mobile-menu-open')?[header]:[];
      return [];
    },
    querySelector(selector){return null},
    createElement:element,
    addEventListener(event,fn){(this.events??={})[event]=fn}
  };
  vm.runInNewContext(script,{document,location:{pathname:path,origin:'https://elajmeindia.com'},URL},{timeout:1000});
  const controls=inner.children.find(node=>node.className==='master-mobile-controls');
  assert.ok(controls,'mobile controls created');
  const byClass=cls=>controls.children.find(node=>node.className.includes(cls));
  const mobileLang=byClass('master-mobile-lang');
  assert.equal(desktopLang.href,expected,'desktop language destination');
  assert.equal(mobileLang.href,expected,'mobile language destination');
  assert.equal(byClass('master-mobile-call').href,'tel:+917488955154','phone destination');
  assert.equal(byClass('master-mobile-whatsapp').href,'https://wa.me/917488955154','WhatsApp destination');
  const menu=byClass('master-mobile-menu');
  assert.equal(menu.getAttribute('aria-expanded'),'false','menu initially closed');
  menu.click();
  assert.equal(menu.getAttribute('aria-expanded'),'true','menu opens');
  menu.click();
  assert.equal(menu.getAttribute('aria-expanded'),'false','menu closes');
  menu.click();
  document.events?.keydown?.({key:'Escape'});
  assert.equal(menu.getAttribute('aria-expanded'),'false','Escape closes menu');
  menu.click();
  nav.events?.click?.({target:{closest(selector){return selector==='a'?{}:null}}});
  assert.equal(menu.getAttribute('aria-expanded'),'false','navigation closes menu');
  if(lang==='ar'){
    const bar=body.children.find(node=>node.className==='arabic-mobile-conversion-bar');
    assert.ok(bar,'Arabic conversion bar');
    assert.equal(bar.children[0].href,'/ar/#enquiry','Arabic enquiry destination');
    assert.equal(bar.children[1].href,'https://wa.me/917488955154','Arabic conversion WhatsApp');
  }
}
mobileScenario('en','/oman/treatment-in-india/','https://elajmeindia.com/ar/oman/treatment-in-india/','/ar/oman/treatment-in-india/');
mobileScenario('ar','/ar/doctors/dr-anup-dhir/','https://elajmeindia.com/doctors/dr-anup-dhir/','/doctors/dr-anup-dhir/');
console.log('PASS 2 full mobile-header construction scenarios with menu and contact controls');

