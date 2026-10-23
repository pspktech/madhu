(() => {
  const base = document.body.dataset.base || './';
  const page = document.body.dataset.page || '';
  const loadPartial = (id, file) => fetch(`${base}partials/${file}`).then(r => r.text()).then(html => {
    document.getElementById(id).innerHTML = html.replaceAll('{{BASE}}', base);
  });
  Promise.all([loadPartial('navbar', 'navbar.html'), loadPartial('footer', 'footer.html')]).then(() => {
    const nav = document.getElementById('nav');
    document.querySelectorAll(`[data-page="${page}"]`).forEach(link => link.classList.add('active'));
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (toggle && menu) toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open'); toggle.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open);
    });
    menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('open'); toggle?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }));
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  });

  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const words = ['Web Developer','App Builder','Bot Creator','Automation Nerd','Gamer','Traveller']; let w = 0, c = 0, deleting = false;
    const loop = () => { const word = words[w]; c += deleting ? -1 : 1; typedEl.textContent = word.slice(0, c); if (!deleting && c === word.length) { deleting = true; return setTimeout(loop, 1400); } if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; } setTimeout(loop, deleting ? 45 : 90); }; loop();
  }

  const editorBody = document.getElementById('editorBody');
  if (editorBody) {
    const lines = ['// madhu.js — who I am','const madhu = {','  role:     "Developer"','  stack:    ["Node","Express"]','  loves:    ["code","gaming","travel"]','  motto:    "build > talk"','  online:   true','}','','madhu.ship("idea")  // → production']; let i = 0;
    const render = () => { if (i >= lines.length) return setTimeout(() => { editorBody.innerHTML = ''; i = 0; render(); }, 3200); const el = document.createElement('div'); el.className = 'line'; el.innerHTML = `<span class="gutter">${String(i + 1).padStart(2, '0')}</span><span class="code">${lines[i].replace(/(const|true)/g,'<span class="c-key">$1</span>').replace(/(\/\/.*)/g,'<span class="c-cmt">$1</span>')}</span>`; editorBody.appendChild(el); i++; setTimeout(render, 120); }; render();
  }

  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) document.querySelectorAll('.tilt').forEach(card => { card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(); const x = (e.clientX-r.left)/r.width-.5, y = (e.clientY-r.top)/r.height-.5; card.style.transform = `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-6px)`; }); card.addEventListener('mouseleave', () => card.style.transform = ''); });
})();

document.addEventListener("DOMContentLoaded", () => {
  const navMount = document.getElementById("navbar");
  if (navMount) {
    fetch("partials/navbar.html")
      .then(res => res.text())
      .then(html => { navMount.innerHTML = html; });
  }

  const footMount = document.getElementById("footer");
  if (footMount) {
    fetch("partials/footer.html")
      .then(res => res.text())
      .then(html => { footMount.innerHTML = html; });
  }
});
