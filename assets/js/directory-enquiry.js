/* Elajme India directory enquiry routing */
(function(){
  const enquiryUrl='/#enquiry';
  document.querySelectorAll('a[href^="https://wa.me/917488955154"]').forEach(function(link){
    link.href=enquiryUrl;
    link.removeAttribute('target');
    link.removeAttribute('rel');
    if (/^(Enquire|Request Consultation)$/i.test(link.textContent.trim())) link.textContent='Enquire through Elajme India';
  });
})();
