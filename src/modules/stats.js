import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

/** Numbers count up once, word values rise into place beside them. */
export function initStats() {
  const grid = document.querySelector('[data-stats]');
  if (!grid) return;

  const items = grid.querySelectorAll('.stat');
  const reduced = prefersReducedMotion();

  // Write the final value up front so the strip is never wrong without JS.
  grid.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduced) el.textContent = `${target}${suffix}`;
  });

  if (reduced) {
    gsap.set(items, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(items, { opacity: 0, y: 34 });

  ScrollTrigger.create({
    trigger: grid,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.09
      });

      grid.querySelectorAll('[data-count]').forEach((el, i) => {
        const target = Number(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || '';
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.8,
          delay: 0.15 + i * 0.09,
          ease: 'expo.out',
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          }
        });
      });
    }
  });
}
