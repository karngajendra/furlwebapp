/* Furl site interactions — reveal on scroll, nav state, hero loop control */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky nav hairline
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Share-sheet loop: play only while visible
  var ss = document.querySelector('.ss');
  if (ss) {
    if (!reduceMotion && 'IntersectionObserver' in window) {
      var ssIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          ss.classList.toggle('play', e.isIntersecting);
        });
      }, { threshold: 0.25 });
      ssIo.observe(ss);
    }
  }

  // Gentle hero parallax on the back phone
  var back = document.querySelector('.stage .phone-back');
  if (back && !reduceMotion) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < 900) {
        back.style.translate = '0 ' + (y * 0.06) + 'px';
      }
    }, { passive: true });
  }

  // Current year in footer
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
