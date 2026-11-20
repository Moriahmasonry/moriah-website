const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
const compactNav = window.matchMedia('(max-width: 1050px)');
const setMenuOpen = open => {
 menu.setAttribute('aria-expanded', String(open));
 nav.classList.toggle('open', open);
};
menu.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => {
 if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
  setMenuOpen(false);
  menu.focus();
 }
});
compactNav.addEventListener('change', () => {
 const focusWasInsideNav = nav.contains(document.activeElement);
 setMenuOpen(false);
 if (compactNav.matches && focusWasInsideNav) menu.focus();
});
const FORM_ENDPOINT = 'https://formspree.io/f/xjywodyv';
const form = document.querySelector('#estimate');
form?.addEventListener('submit', async e => {
 e.preventDefault();
 const status=document.querySelector('#formstatus'),button=form.querySelector('button[type="submit"]');
 if(!form.reportValidity()) return;
 if(!form.querySelector('input[name="service"]:checked')){status.textContent='Please select a service, or choose Not sure / Other.';form.querySelector('[name="service"]').focus();return;}
 const fields=new FormData(form);
 const payload={name:fields.get('name'),email:fields.get('email'),phone:fields.get('phone'),address:fields.get('address'),services:fields.getAll('service').join(', '),_subject:'New estimate request — Moriah Masonry Works'};
 button.disabled=true;button.textContent='Sending…';form.setAttribute('aria-busy','true');status.textContent='Sending your estimate request…';
 try{
 const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(payload)});
 if(!r.ok) throw new Error('Not accepted');
 form.reset();status.textContent='Thank you! Your estimate request has been submitted. Our team will contact you to discuss your project.';
 }catch(error){status.textContent='We could not confirm submission. Your information is still here. Please try again or call (774) 249-9188.';}
 finally{button.disabled=false;button.textContent='Request an Estimate';form.removeAttribute('aria-busy');}
});
