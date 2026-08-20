import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouch, lerp, prefersReducedMotion } from './utils.js';

/** Scroll progress rail, auto-hiding nav, and the soft trailing cursor. */
export function initAtmosphere() {
  const reduced = prefersReducedMotion();

  /* ── Progress rail ───────────────────────────────────────────────────── */
  const bar = document.querySelector('[data-progress]');
  if (bar) {
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });
  }

  /* ── Nav: solid once you leave the hero, hidden while scrolling down ─── */
  const nav = document.querySelector('[data-nav]');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      end: 'max',
      onUpdate: (self) => {
        nav.classList.toggle('is-solid', self.scroll() > 80);

        if (reduced) return;
        const goingDown = self.direction === 1 && self.scroll() > 320;
        gsap.to(nav, {
          yPercent: goingDown ? -140 : 0,
          duration: 0.6,
          ease: 'expo.out',
          overwrite: true
        });
      }
    });
  }

  /* ── Cursor ──────────────────────────────────────────────────────────── */
  const cursor = document.querySelector('[data-cursor]');
  if (cursor && !isTouch() && !reduced) {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let visible = false;

    window.addEventListener('pointermove', (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.4 });
      }
    });

    document.addEventListener('pointerleave', () => {
      visible = false;
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });

    document.querySelectorAll('[data-hover]').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
    });

    gsap.ticker.add(() => {
      pos.x = lerp(pos.x, target.x, 0.16);
      pos.y = lerp(pos.y, target.y, 0.16);
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    });
  } else if (cursor) {
    cursor.remove();
  }

  /* ── Footer year ─────────────────────────────────────────────────────── */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}
