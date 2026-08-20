import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

/**
 * The hero opens itself, then hands over to the scroll: the name lifts away
 * while the supporting copy settles, so the pinned orbit is left alone on
 * screen before the page releases into the stats strip.
 */
export function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const words = hero.querySelectorAll('[data-kinetic]');
  const eyebrow = hero.querySelector('.hero__eyebrow');
  const aside = hero.querySelector('.hero__aside');
  const scrollHint = hero.querySelector('.hero__scroll');
  const reduced = prefersReducedMotion();

  if (reduced) {
    gsap.set([words, eyebrow, aside, scrollHint], { opacity: 1, yPercent: 0, y: 0 });
    return;
  }

  gsap.set(words, { yPercent: 118 });
  gsap.set([eyebrow, scrollHint], { opacity: 0, y: 16 });
  gsap.set(aside, { opacity: 0, y: 26 });

  /* ── Entrance ────────────────────────────────────────────────────────── */
  const intro = gsap.timeline({
    delay: 0.15,
    defaults: { ease: 'expo.out' }
  });

  intro
    .to(eyebrow, { opacity: 1, y: 0, duration: 1 })
    .to(words, { yPercent: 0, duration: 1.45, stagger: 0.1 }, '-=0.75')
    .to(aside, { opacity: 1, y: 0, duration: 1.2 }, '-=0.95')
    .to(scrollHint, { opacity: 1, y: 0, duration: 0.9 }, '-=0.8');

  /* ── Scroll hand-off ─────────────────────────────────────────────────── */
  gsap
    .timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '55% bottom',
        scrub: 0.6
      }
    })
    .to(
      hero.querySelectorAll('.hero__title .line'),
      { yPercent: -34, opacity: 0, stagger: 0.06, ease: 'none' },
      0
    )
    .to(aside, { y: -50, opacity: 0, ease: 'none' }, 0.05)
    .to(eyebrow, { opacity: 0, ease: 'none' }, 0)
    .to(scrollHint, { opacity: 0, ease: 'none' }, 0);

  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom bottom',
    onLeave: () => gsap.set(scrollHint, { opacity: 0 })
  });
}
