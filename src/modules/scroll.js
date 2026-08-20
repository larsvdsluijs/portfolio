import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

/**
 * Smooth scrolling driven from the GSAP ticker, so Lenis and ScrollTrigger
 * resolve inside the same frame. Without this the pinned sections and the
 * scrubbed video drift a frame apart and the whole thing feels loose.
 */
export function initScroll() {
  if (prefersReducedMotion()) {
    document.documentElement.style.scrollBehavior = 'smooth';
    return null;
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
    wheelMultiplier: 1
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links have to go through Lenis or they fight the smooth scroller.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    });
  });

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}
