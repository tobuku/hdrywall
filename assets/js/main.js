/* GSAP animations for H Drywall (GitHub Pages friendly)
   - Lightweight page-load reveals
   - Optional scroll reveals via ScrollTrigger
   - Respects prefers-reduced-motion
*/

(() => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  // Guard: if GSAP didn't load for any reason, do nothing.
  if (!window.gsap) return;

  const gsap = window.gsap;

  // ScrollTrigger is optional. If it's present, we use it for scroll reveals.
  const hasScrollTrigger = !!window.ScrollTrigger;
  if (hasScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  // Helpers
  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const ease = "power2.out";
  const baseDuration = 0.7;

  // Header: subtle drop-in
  const headerContainer = q("header .container");
  if (headerContainer) {
    gsap.from(headerContainer, {
      y: -10,
      opacity: 0,
      duration: 0.6,
      ease
    });
  }

  // Page-load hero animations (Home page)
  const hero = q(".hero");
  if (hero) {
    const heroTitle = q(".hero h2", hero);
    const heroText = qa(".hero p", hero);
    const heroBtn = q(".hero .btn", hero);
    const heroCards = qa(".hero-card", hero);

    const tl = gsap.timeline({ defaults: { ease } });

    if (heroTitle) tl.from(heroTitle, { y: 18, opacity: 0, duration: baseDuration }, 0.05);
    if (heroText.length) tl.from(heroText, { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.18);
    if (heroBtn) tl.from(heroBtn, { y: 10, opacity: 0, duration: 0.55 }, 0.28);
    if (heroCards.length) tl.from(heroCards, { y: 14, opacity: 0, duration: 0.55, stagger: 0.08 }, 0.35);
  }

  // Generic reveals (all pages)
  const revealTargets = [
    ...qa(".page-section .container"),
    ...qa(".page-section h2"),
    ...qa(".page-section p"),
    ...qa(".page-section li"),
    ...qa(".contact-form label"),
    ...qa(".contact-form .btn"),
    ...qa(".cta .container"),
    ...qa(".cta h2"),
    ...qa(".cta p"),
    ...qa(".cta .btn"),
    ...qa("footer")
  ].filter((el) => el && el.offsetParent !== null);

  // De-dupe while keeping order
  const seen = new Set();
  const uniqueTargets = revealTargets.filter((el) => {
    if (seen.has(el)) return false;
    seen.add(el);
    return true;
  });

  if (!uniqueTargets.length) return;

  // If ScrollTrigger exists, reveal on scroll. Otherwise, do a simple staggered load.
  if (hasScrollTrigger) {
    uniqueTargets.forEach((el) => {
      gsap.from(el, {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        }
      });
    });
  } else {
    gsap.from(uniqueTargets, {
      y: 14,
      opacity: 0,
      duration: 0.6,
      ease,
      stagger: 0.05
    });
  }
})();
