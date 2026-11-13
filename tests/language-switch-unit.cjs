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
    querySelector(){return null},
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
