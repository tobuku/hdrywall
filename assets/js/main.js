/* GSAP animations (GitHub Pages friendly)
   - Page-load hero reveal on Home
   - Scroll reveals for sections on all pages (ScrollTrigger)
   - Respects prefers-reduced-motion
*/
(() => {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  if (!window.gsap) return;

  const gsap = window.gsap;

  const hasScrollTrigger = !!window.ScrollTrigger;
  if (hasScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // HOME hero reveal (only if the elements exist)
  const hero = q(".hero");
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(q("header"), { y: -10, opacity: 0, duration: 0.5 }, 0);

    const heroBits = [
      q(".hero h1", hero),
      q(".hero p", hero),
      q(".hero .btn", hero),
      ...qa(".hero-card", hero)
    ].filter(Boolean);

    if (heroBits.length) {
      tl.from(heroBits, { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.1);
    }
  } else {
    // Non-home pages: just bring the header in a touch
    const header = q("header");
    if (header) gsap.from(header, { y: -10, opacity: 0, duration: 0.5, ease: "power2.out" });
  }

  // Scroll reveals (all pages)
  const targets = [
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
  ].filter(Boolean);

  // Deduplicate nodes
  const unique = Array.from(new Set(targets));

  if (!unique.length) return;

  if (hasScrollTrigger) {
    unique.forEach((el) => {
      gsap.from(el, {
        y: 14,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        }
      });
    });
  } else {
    gsap.from(unique, {
      y: 14,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05
    });
  }
})();
