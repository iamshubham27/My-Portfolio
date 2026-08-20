// ============================================================
// SHARED SITE SCRIPT
// ============================================================

// Theme toggle (dark / light)
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
if(themeToggle){
  const root = document.documentElement;
  const colors = {dark:'#141412', light:'#f7f5ef'};
  const setPressed = () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', current === 'light');
    if(themeColorMeta) themeColorMeta.setAttribute('content', colors[current]);
  };
  setPressed();
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    try{ localStorage.setItem('theme', next); }catch(e){}
    setPressed();
  });
}

// Nav scroll state
const nav = document.getElementById('nav');
if(nav){
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});
}

// Mobile menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if(burger && mobileMenu){
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Hero parallax blobs
const b1 = document.getElementById('hhBlob1');
const b2 = document.getElementById('hhBlob2');
if(b1 || b2){
  let ticking = false;
  window.addEventListener('scroll', () => {
    if(!ticking){
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if(b1) b1.style.transform = `translateY(${y * 0.22}px)`;
        if(b2) b2.style.transform = `translateY(${y * 0.14}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
}

// Work card cursor-follow glow
document.querySelectorAll('[data-glow]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

// Terminal type-on effect (home hero signature widget)
const terminalBody = document.getElementById('terminalBody');
if(terminalBody){
  const lines = [
    {html:'<span class="prompt">$</span> whoami', delay:200},
    {html:'shubham-biswas &middot; b.tech cse &middot; gec jhalawar', delay:650},
    {html:'<span class="prompt">$</span> git log --oneline -3', delay:1500},
    {html:'<span class="ok">a1c92f</span> fix supabase api key format', delay:1950},
    {html:'<span class="ok">7e40b1</span> resolve BoxDecoration incompat. (flet 0.24.1)', delay:2350},
    {html:'<span class="ok">2d19aa</span> ship call break scoring flow', delay:2750},
    {html:'<span class="prompt">$</span> status: <span class="ok">building.</span><span class="terminal-cursor"></span>', delay:3300},
  ];
  lines.forEach(line => {
    const el = document.createElement('div');
    el.className = 'terminal-line';
    el.innerHTML = line.html;
    terminalBody.appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity .5s ease'; el.style.opacity = 1; }, line.delay);
  });
}
