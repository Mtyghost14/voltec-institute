// Nav: sombra al hacer scroll
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

// Menú móvil
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Aparición de secciones al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document
  .querySelectorAll('.why-card, .detail, .faq__item, .team__text, .team__card, .cta__inner')
  .forEach(el => {
    el.classList.add('sr');
    observer.observe(el);
  });

// Pop-out de preinscripción
const promo = document.getElementById('promo');
if (promo && !sessionStorage.getItem('promoCerrado')) {
  promo.hidden = false;
  document.getElementById('promoClose').addEventListener('click', () => {
    promo.hidden = true;
    sessionStorage.setItem('promoCerrado', '1');
  });
}

// Acordeón de etapas (LEGO Explore / LEGO Challenge / Mecánica / Programación)
const stages = document.querySelectorAll('[data-stage]');
const activateStage = stage => stages.forEach(s => s.classList.toggle('is-active', s === stage));

stages.forEach(stage => {
  stage.addEventListener('click', e => {
    if (stage.classList.contains('is-active') && e.target.closest('a')) return;
    if (!stage.classList.contains('is-active')) e.preventDefault();
    activateStage(stage);
  });
});

const stagesTrack = document.querySelector('.stages');
if (stagesTrack && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  stagesTrack.querySelectorAll('[data-stage]').forEach(stage => {
    stage.addEventListener('mouseenter', () => activateStage(stage));
  });
}
