import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitChars, splitLines, prefersReducedMotion } from './utils.js';

/**
 * Editorial reveals: masked lines rise into place, fades drift up, and the
 * closing statement resolves character by character. Everything is set from
 * JS so nothing can be left invisible if the module never runs.
 */
export function initText() {
  const reduced = prefersReducedMotion();

  /* ── Masked line reveals ─────────────────────────────────────────────── */
  document.querySelectorAll('[data-lines]').forEach((el) => {
    const lines = splitLines(el);
    if (!lines.length) return;

    if (reduced) {
      gsap.set(lines, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(lines, { yPercent: 108, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.075
        })
    });
  });

  /* ── Soft fades ──────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-fade]').forEach((el) => {
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y: 22 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.05 })
    });
  });

  /* ── Closing statement, character by character ───────────────────────── */
  const block = document.querySelector('[data-kinetic-block]');
  if (block) {
    const chars = splitChars(block);

    if (reduced) {
      gsap.set(chars, { opacity: 1, yPercent: 0 });
    } else {
      gsap.set(chars, { opacity: 0, yPercent: 60, rotate: 3 });

      ScrollTrigger.create({
        trigger: block,
        start: 'top 80%',
        once: true,
        onEnter: () =>
          gsap.to(chars, {
            opacity: 1,
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.016
          })
      });
    }
  }
}
