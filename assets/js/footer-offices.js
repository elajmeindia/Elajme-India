(()=>{'use strict';
const icons={
pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.25a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.68A2 2 0 0 1 22 16.92Z"/>',
mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>'};
const icon=name=>{const span=document.createElement('span');span.className='elajme-contact-icon';span.setAttribute('aria-hidden','true');span.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+icons[name]+'</svg>';return span};
const line=(kind,value,href)=>{const p=document.createElement('p');p.className='elajme-office-contact-line';const a=document.createElement('a');a.href=href;a.dir='ltr';a.textContent=value;p.append(icon(kind),a);return p};
const init=()=>{document.querySelectorAll('footer.site-footer').forEach(footer=>{if(footer.querySelector('.elajme-office-contacts'))return;const wrap=footer.querySelector('.footer-wrap'),bottom=wrap?.querySelector('.footer-bottom');if(!wrap||!bottom)return;const ar=document.documentElement.lang.toLowerCase().startsWith('ar');const offices=[{name:ar?'عنوان المكتب في دلهي':'Delhi Office',address:ar?'سي-67، ملتاني دهاندا، طريق أراكاشان، باهارغانج، نيودلهي – 110055، الهند':'C-67, Multani Dhanda, Arakashan Road, Paharganj, New Delhi – 110055, India'},{name:ar?'عنوان المكتب في مومباي':'Mumbai Office',address:ar?'سي-3، الطابق الأول، ألفريد هاوس، بجوار مسرح ألفريد، مقابل مطعم دلهي دربار، غرانت رود، مومباي – 400004، الهند':'C-3, First Floor, Alfred House, Next to Alfred Theater, Opposite Delhi Darbar Restaurant, Grant Road, Mumbai – 400004, India'}];const section=document.createElement('section');section.className='elajme-office-contacts';section.setAttribute('aria-label',ar?'مكاتب علاج مي إنديا':'Elajme India offices');const grid=document.createElement('div');grid.className='elajme-office-grid';offices.forEach(office=>{const card=document.createElement('div');card.className='elajme-office-card';const title=document.createElement('h2');title.append(icon('pin'),document.createTextNode(office.name));const address=document.createElement('p');address.className='elajme-office-address';address.textContent=office.address;card.append(title,address);grid.append(card)});const website=line('globe','www.elajmeindia.com','https://elajmeindia.com/');website.classList.add('elajme-office-website');section.append(grid,website);const socials=document.createElement('nav');socials.className='elajme-footer-socials';socials.setAttribute('aria-label',ar?'تابعونا على وسائل التواصل الاجتماعي':'Follow Elajme India');const waMessage=ar?'مرحبا، أود الاستفسار عن خدمات تنسيق العلاج في الهند. يرجى التواصل معي.':'Hello, I would like to enquire about treatment assistance in India. Please contact me.';const socialItems=[{name:'WhatsApp',href:'https://wa.me/917488955154?text='+encodeURIComponent(waMessage),svg:'<path d="M20.5 11.6a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.4-5.1A8.5 8.5 0 1 1 20.5 11.6Z"/><path d="M8.5 7.7c-.3-.5-.6-.5-.9-.5-.3 0-.7.1-.9.4-.4.4-.8 1-.8 1.9 0 1 .8 2.2 1 2.5.2.3 1.7 2.7 4.2 3.7 2.1.8 2.5.6 3 .6.5-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.1-1.3-.1-.2-.5-.3-1-.6l-1.4-.7c-.2-.1-.4-.2-.6.2-.2.3-.7.9-.9 1-.2.1-.4.1-.7 0-.3-.2-1.2-.5-2.2-1.4-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.5.1-.7l.5-.6c.1-.2.2-.4.3-.6.1-.2 0-.4-.1-.6Z"/>'},{name:'Facebook',href:'https://www.facebook.com/profile.php?id=61596054583253',svg:'<path d="M14 21v-8h3l.5-4H14V7c0-1.1.3-2 2-2h2V1.4A25 25 0 0 0 15.1 1C12.1 1 10 2.8 10 6.1V9H7v4h3v8z"/>'},{name:'Instagram',href:'https://www.instagram.com/elajmeindia/',svg:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>'}];socialItems.forEach(item=>{const a=document.createElement('a');a.href=item.href;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',item.name);a.classList.add('elajme-social-'+item.name.toLowerCase());a.title=item.name;a.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+item.svg+'</svg>';socials.append(a)});const top=wrap.querySelector('.footer-top'),brand=top?.querySelector('.footer-brand'),links=top?.querySelector('.footer-links');if(!top||!brand||!links)return;
const navLinks=[...links.querySelectorAll('a')];
const shell=document.createElement('div');shell.className='elajme-v2';shell.dir=ar?'rtl':'ltr';
const main=document.createElement('div');main.className='elajme-v2-main';
const makeCol=(cls,title)=>{const col=document.createElement('section');col.className='elajme-v2-col '+cls;if(title){const h=document.createElement('h2');h.textContent=title;col.append(h)}return col};
const branding=makeCol('elajme-v2-brand');branding.append(brand);
const intro=document.createElement('p');intro.textContent=ar?'تلتزم علاج مي إنديا بمساعدة المرضى الدوليين على استكشاف خيارات العلاج في الهند، والتواصل مع المستشفيات، وتنظيم رحلتهم العلاجية باهتمام ووضوح وثقة.':'Elajme India is dedicated to helping international patients explore treatment options in India, connect with hospitals, and navigate their medical journey with care and confidence.';intro.classList.add('elajme-footer-intro');intro.setAttribute('dir',ar?'rtl':'ltr');if(window.matchMedia('(max-width:900px)').matches){intro.style.setProperty('text-align',ar?'right':'left','important');intro.style.setProperty('direction',ar?'rtl':'ltr','important');intro.style.setProperty('width','100%','important');intro.style.setProperty('max-width','none','important');intro.style.setProperty('margin','10px 0 0','important')}branding.append(intro);
const services=makeCol('elajme-v2-services',ar?'خدماتنا':'Services');
const useful=makeCol('elajme-v2-useful',ar?'روابط مفيدة':'Useful links');
const navA=document.createElement('nav'),navB=document.createElement('nav');
navA.setAttribute('aria-label',ar?'خدماتنا':'Services');navB.setAttribute('aria-label',ar?'روابط مفيدة':'Useful links');
navLinks.slice(0,4).forEach(a=>navA.append(a));
const patientsLink=document.createElement('a');patientsLink.href=ar?'/ar/international-patients/mea/':'/international-patients/mea/';patientsLink.textContent=ar?'المرضى الدوليون':'International Patients';navA.append(patientsLink);
const usefulEntries=ar?[
 ['من نحن','/ar/about/'],['الأسئلة الشائعة','/ar/faq/'],['المدونة','/ar/blog/'],['سياسة الخصوصية','/ar/privacy.html'],['الشروط وإخلاء المسؤولية الطبية','/ar/terms.html']
]:[
 ['About Us','/about/'],['FAQs','/faq/'],['Blog','/blog/'],['Privacy Policy','/privacy.html'],['Terms & Medical Disclaimer','/terms.html']
];
usefulEntries.forEach(([label,href])=>{const a=document.createElement('a');a.href=href;a.textContent=label;navB.append(a)});
services.append(navA);useful.append(navB);
const contact=makeCol('elajme-v2-contact',ar?'تواصل معنا':'Contact us');
contact.append(line('phone','+91 74889 55154','tel:+917488955154'),line('mail','care@elajmeindia.com','mailto:care@elajmeindia.com'),socials);
const officesCol=makeCol('elajme-v2-offices',ar?'مكاتبنا':'Our offices');officesCol.append(grid);
main.append(branding,services,useful,contact,officesCol);
const lower=document.createElement('div');lower.className='elajme-v2-lower';
lower.append(website);
const benefits=document.createElement('div');benefits.className='elajme-v2-benefits';
const trustItems=ar?[
 ['اهتمام شخصي بكل مريض','heart'],['تواصل واضح ومباشر','message'],['تنسيق منظم للترتيبات','list'],['احترام خصوصية المرضى','shield']
]:[['Personal attention','heart'],['Clear communication','message'],['Organised arrangements','list'],['Respect for patient privacy','shield']];
const trustIcons={
 heart:'<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>',
 message:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z"/><path d="M8 11h9M8 14h6"/>',
 list:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>'
};
trustItems.forEach(([label,key])=>{const item=document.createElement('span');item.className='elajme-v2-benefit';const svg=document.createElement('span');svg.className='elajme-v2-benefit-icon';svg.setAttribute('aria-hidden','true');svg.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+trustIcons[key]+'</svg>';const caption=document.createElement('span');caption.textContent=label;item.append(svg,caption);benefits.append(item)});
lower.append(benefits);
const medical=document.createElement('p');medical.className='elajme-v2-medical-note';
const strong=document.createElement('strong');strong.textContent=ar?'معلومات طبية مهمة: ':'Medical Information: ';
const medicalCopy=document.createTextNode(ar?'تقدم علاج مي إنديا خدمات تنسيق شؤون المرضى الدوليين، ولا تقدم العلاج الطبي. ويتولى الأطباء المؤهلون إجراء التقييمات الطبية واتخاذ القرارات العلاجية. ولا تُغني المعلومات المنشورة على هذا الموقع عن الاستشارة الطبية المتخصصة. ':'Elajme India provides international patient coordination services, not medical treatment. Qualified healthcare professionals make all clinical assessments and treatment decisions. Website information does not replace professional medical advice. ');
const details=document.createElement('a');details.href=ar?'/ar/terms':'/terms';details.textContent=ar?'اقرأ إخلاء المسؤولية الطبية':'Read our medical disclaimer';
medical.append(strong,medicalCopy,details);lower.append(medical);
const copyright=document.createElement('div');copyright.className='elajme-v2-copyright';
copyright.textContent=ar?'© 2026 علاج مي إنديا. جميع الحقوق محفوظة. يخضع المحتوى الأصلي والهوية البصرية للحماية بموجب قوانين الملكية الفكرية المعمول بها.':'© 2026 Elajme India. All rights reserved. Original content and branding are protected under applicable intellectual property laws.';
shell.append(main,lower,copyright);
footer.insertBefore(shell,wrap);wrap.remove();
if(!document.querySelector('link[href="/assets/css/footer-offices.css?v=37"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/css/footer-offices.css?v=37';document.head.append(link)}
})};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init()})();
