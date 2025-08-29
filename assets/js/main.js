(function(){
  const root = document.documentElement;
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if(navToggle && navMenu){
    navToggle.addEventListener('click',()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });
  }

  // Theme toggle with persistence
  const storedTheme = localStorage.getItem('theme');
  if(storedTheme === 'light'){ root.classList.add('light'); }
  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });
  }

  // Smooth scroll for internal links on home
  document.querySelectorAll('.js-scroll').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
      }
    });
  });

  // Reveal on scroll (IntersectionObserver)
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.15, rootMargin: '0px 0px -10% 0px'});
  revealEls.forEach(el=>observer.observe(el));

  // Contact form validation and modal
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('modal');
  const closeModal = () => {
    if(modal){
      modal.setAttribute('aria-hidden','true');
    }
  };
  const openModal = () => {
    if(modal){
      modal.setAttribute('aria-hidden','false');
      const btn = modal.querySelector('[data-close]');
      if(btn){ btn.focus(); }
    }
  };
  if(modal){
    modal.addEventListener('click', (e)=>{
      const target = e.target;
      if(target instanceof HTMLElement && target.hasAttribute('data-close')){
        closeModal();
      }
    });
  }
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fields = ['name','email','subject','message'];
      let valid = true;
      fields.forEach(id=>{
        const input = document.getElementById(id);
        const row = input ? input.closest('.form-row') : null;
        const error = row ? row.querySelector('.error') : null;
        if(error){ error.textContent = ''; }
        if(!input) return;
        const value = (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) ? input.value.trim() : '';
        if(value.length === 0){
          valid = false;
          if(error){ error.textContent = 'This field is required.'; }
        } else if(id === 'email' && !/^\S+@\S+\.\S+$/.test(value)){
          valid = false;
          if(error){ error.textContent = 'Enter a valid email address.'; }
        }
      });
      if(valid){
        form.reset();
        openModal();
      }
    });
  }
})();


