import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouch, prefersReducedMotion } from './utils.js';

/**
 * Project cards rise as they enter, their artwork animates in once, and the
 * pointer position feeds a soft radial highlight through CSS custom properties.
 */
export function initWork() {
  const projects = document.querySelectorAll('[data-project]');
  if (!projects.length) return;

  const reduced = prefersReducedMotion();

  projects.forEach((project) => {
    const visual = project.querySelector('[data-project-visual]');
    const meta = project.querySelector('.project__meta');
    const bars = project.querySelectorAll('.project__art--data .bar');
    const tiles = project.querySelectorAll('.project__art--grid span');
    const rings = project.querySelectorAll('.project__art--ai .ring');
    const core = project.querySelector('.project__art--ai .core');

    if (reduced) {
      gsap.set([visual, meta], { opacity: 1, y: 0 });
      gsap.set(bars, { scaleY: 1 });
      gsap.set(tiles, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(visual, { opacity: 0, y: 64, scale: 0.97 });
    gsap.set(meta, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: project,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.to(visual, { opacity: 1, y: 0, scale: 1, duration: 1.25 })
          .to(meta, { opacity: 1, y: 0, duration: 1.1 }, '-=0.95');

        if (bars.length) {
          tl.to(
            bars,
            { scaleY: 1, duration: 1.2, ease: 'expo.out', stagger: 0.06 },
            '-=0.9'
          );
        }

        if (tiles.length) {
          tl.to(
            tiles,
            { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.055 },
            '-=0.95'
          );
        }

        if (rings.length) {
          rings.forEach((ring, i) => {
            gsap.to(ring, {
              rotate: `+=${i % 2 === 0 ? 360 : -360}`,
              duration: 46 + i * 14,
              ease: 'none',
              repeat: -1,
              transformOrigin: '50% 50%'
            });
          });
          gsap.to(core, {
            scale: 1.06,
            duration: 3.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });
        }
      }
    });

    // Slow parallax drift keeps the composition alive while scrolling past.
    gsap.to(visual, {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: project,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    /* ── Pointer-tracked highlight ─────────────────────────────────────── */
    if (isTouch()) return;

    const inner = project.querySelector('.project__inner');
    if (!inner || !visual) return;

    inner.addEventListener('pointermove', (event) => {
      const rect = visual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      visual.style.setProperty('--mx', `${x}%`);
      visual.style.setProperty('--my', `${y}%`);
    });
  });
}
