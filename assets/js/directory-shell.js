document.addEventListener('DOMContentLoaded',()=>{
  const path=location.pathname;
  const isHosp=path.startsWith('/hospitals/');
  const isDocs=path.startsWith('/doctors/');
  if(!isHosp&&!isDocs)return;

  /* The English Home header is the immutable master header.
     This legacy directory helper must never replace or restyle it. */

  if(path==='/doctors/'||path==='/doctors/index.html'){
    const verifiedPortraits={
      'Dr. Abhideep Chaudhary':'https://d35oenyzp35321.cloudfront.net/Dr_Abhideep_Chaudhary_9f61965dec.jpg',
      'Dr. Anil Mandhani':'https://www.fortishealthcare.com/drupal-data/doctors/dr-anil--mandhani-1879.jpg',
      'Prof. Dr. Subhash Gupta':'https://d35oenyzp35321.cloudfront.net/Dr_SG_da91d515bc.jpg'
    };
    document.querySelectorAll('#grid img.photo').forEach(img=>{
      img.loading='lazy';
      img.decoding='async';
      const src=verifiedPortraits[img.alt];
      if(src){
        img.src=src;
        img.referrerPolicy='no-referrer';
        img.onerror=()=>{
          img.onerror=null;
          img.removeAttribute('referrerpolicy');
          img.src='/assets/images/doctors/doctor-placeholder.svg';
        };
      }
    });
  }

  /* Footer markup is already present in the page and protected by the approved
     footer stylesheet. Do not rewrite header or footer DOM from JavaScript. */
});
