import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

/**
 * The three pillars are revealed one at a time across a pinned runway, then
 * settle together as a row. Below the pin breakpoint they simply stack and
 * fade in, which is the honest behaviour on a phone.
 */
export function initPillars() {
  const section = document.querySelector('[data-pillars]');
  if (!section) return;

  const pin = section.querySelector('[data-pillars-pin]');
  const inner = section.querySelector('.pillars__inner');
  const cards = section.querySelectorAll('[data-pillar]');
  if (!cards.length) return;

  const reduced = prefersReducedMotion();
  const canPin = window.matchMedia('(min-width: 901px)').matches;

  if (reduced || !canPin) {
    gsap.set(cards, { opacity: 0, y: 40 });
    cards.forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to(card, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
      });
    });
    return;
  }

  gsap.set(cards, { opacity: 0, y: 90, scale: 0.96 });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: pin,
      // Starts before the pin locks, so the first card is already arriving by
      // the time the section takes over the screen — no blank pinned frame.
      start: 'top 65%',
      end: 'bottom bottom',
      scrub: 0.7
    }
  });

  cards.forEach((card, i) => {
    timeline.to(
      card,
      { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.8 },
      i * 0.6
    );
  });

  // A last gentle settle so the row lands rather than stops.
  timeline.to(inner, { y: -10, ease: 'none', duration: 0.5 }, '>-0.2');
}
