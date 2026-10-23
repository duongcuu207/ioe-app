// IOE App landing — nav scroll, mobile menu, reveal on scroll, copy STK, QR lightbox, toast.
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.querySelector('.nav-burger');
  var menu = document.getElementById('mobile-menu');
  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      burger.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });

  var io = 'IntersectionObserver' in window && new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  if (io) document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  else document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });

  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      function done() { showToast('Đã copy số tài khoản ' + text); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(); });
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); }
        catch (e) { showToast('Số tài khoản: ' + text); }
        document.body.removeChild(ta);
      }
    });
  });

  var lightbox = document.getElementById('qr-lightbox');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var lastFocus;
  function openQR() {
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    closeBtn.focus();
  }
  function closeQR() {
    lightbox.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-qr]').forEach(function (b) { b.addEventListener('click', openQR); });
  closeBtn.addEventListener('click', closeQR);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeQR(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeQR();
  });
})();
