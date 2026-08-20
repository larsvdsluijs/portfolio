import { gsap } from 'gsap';

/**
 * A short, honest opening: the counter tracks real document progress and the
 * curtain always lifts, even if a font or a clip never arrives.
 */
export function initPreloader() {
  const root = document.querySelector('[data-preloader]');
  if (!root) return Promise.resolve();

  const count = root.querySelector('[data-preloader-count]');
  const bar = root.querySelector('[data-preloader-bar]');
  const state = { value: 0 };

  const render = () => {
    const v = Math.round(state.value);
    if (count) count.textContent = String(v).padStart(2, '0');
    if (bar) gsap.set(bar, { scaleX: state.value / 100 });
  };

  return new Promise((resolve) => {
    const finish = () => {
      gsap
        .timeline({
          onComplete: () => {
            root.remove();
            document.body.classList.add('is-ready');
            resolve();
          }
        })
        .to(state, {
          value: 100,
          duration: 0.5,
          ease: 'power2.out',
          onUpdate: render
        })
        .to(root.querySelector('.preloader__inner'), {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'expo.in'
        })
        .to(
          root,
          { yPercent: -100, duration: 1.05, ease: 'expo.inOut' },
          '-=0.25'
        );
    };

    // Creep toward 92% while the page loads; the load event closes the gap.
    gsap.to(state, {
      value: 92,
      duration: 2.4,
      ease: 'power1.out',
      onUpdate: render
    });

    if (document.readyState === 'complete') {
      gsap.delayedCall(0.45, finish);
    } else {
      window.addEventListener('load', () => gsap.delayedCall(0.25, finish), {
        once: true
      });
      // Never let a hanging asset trap the visitor behind the curtain.
      gsap.delayedCall(4.5, finish);
    }
  });
}
