import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA } from '../media.config.js';
import { clamp, prefersReducedMotion } from './utils.js';

/**
 * Scroll-scrubbed film playback.
 *
 * A <video> is not a timeline you can set directly — seeking is asynchronous and
 * a browser will happily drop requests you fire faster than it can decode. So we
 * keep a *target* time updated by ScrollTrigger, and a rAF loop eases the real
 * currentTime toward it, skipping any seek issued while the previous one is
 * still in flight. That is what turns a jittery scrub into a film.
 */
class CinematicClip {
  constructor(root) {
    this.root = root;
    this.video = root.querySelector('[data-cinema-video]');
    this.config = MEDIA[root.dataset.cinema];
    this.progress = 0;
    this.target = 0;
    this.current = 0;
    this.duration = 0;
    this.seeking = false;
    this.ready = false;
    this.raf = null;
  }

  async load() {
    if (!this.video || !this.config?.sources?.length) return;

    // Native <source> children let the browser pick a playable format via
    // canPlayType instead of us guessing and retrying over the network.
    this.config.sources.forEach(({ src, type }) => {
      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      this.video.appendChild(source);
    });

    const ok = await this.trySources();

    if (ok) {
      this.ready = true;
      this.duration = this.video.duration || 0;
      this.root.classList.add('is-ready');
      this.start();
      return;
    }

    this.fallbackToPoster();
  }

  trySources() {
    return new Promise((resolve) => {
      const video = this.video;
      let settled = false;

      const done = (ok) => {
        if (settled) return;
        settled = true;
        video.removeEventListener('loadeddata', onLoaded);
        video.removeEventListener('error', onError);
        clearTimeout(timer);
        resolve(ok);
      };

      const onLoaded = () => done(video.readyState >= 2);
      // Errors on child <source> elements bubble to the <video> itself once
      // every candidate has failed.
      const onError = () => done(false);

      video.addEventListener('loadeddata', onLoaded);
      video.addEventListener('error', onError);

      // A silently stalled request should not hold the whole page hostage.
      const timer = setTimeout(() => done(video.readyState >= 2), 9000);

      video.load();
    });
  }

  fallbackToPoster() {
    if (!this.config?.poster) {
      this.video?.remove();
      return;
    }

    const img = new Image();
    img.alt = '';
    img.decoding = 'async';

    // If even the poster is unreachable, show the empty panel rather than a
    // broken-image glyph.
    img.addEventListener('error', () => img.remove(), { once: true });
    img.addEventListener('load', () => this.root.classList.add('is-ready'), {
      once: true
    });

    this.video?.replaceWith(img);
    img.src = this.config.poster;
  }

  setProgress(progress) {
    this.progress = clamp(progress, 0, 1);
    if (!this.duration) this.duration = this.video?.duration || 0;
    // Stop just shy of the final frame; some browsers blank the last one.
    this.target = this.progress * Math.max(this.duration - 0.05, 0);
  }

  start() {
    if (this.raf) return;

    const tick = () => {
      this.raf = requestAnimationFrame(tick);
      if (!this.ready || this.seeking) return;

      const diff = this.target - this.current;
      if (Math.abs(diff) < 0.004) return;

      this.current += diff * 0.18;
      this.seeking = true;

      try {
        this.video.currentTime = this.current;
      } catch {
        this.seeking = false;
        return;
      }

      // 'seeked' can be missed on some engines; the timeout keeps us honest.
      const release = () => {
        this.seeking = false;
        this.video.removeEventListener('seeked', release);
      };
      this.video.addEventListener('seeked', release, { once: true });
      setTimeout(release, 220);
    };

    this.raf = requestAnimationFrame(tick);
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  }
}

export function initCinema() {
  const clips = new Map();

  document.querySelectorAll('[data-cinema]').forEach((root) => {
    const clip = new CinematicClip(root);
    clips.set(root.dataset.cinema, clip);
    clip.load();
  });

  const reduced = prefersReducedMotion();

  /* ── Hero: the orbit is driven by the pinned hero runway ─────────────── */
  const hero = document.querySelector('[data-hero]');
  const heroClip = clips.get('hero');

  if (hero && heroClip) {
    if (reduced) {
      heroClip.setProgress(0.12);
    } else {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => heroClip.setProgress(self.progress)
      });

      // The frame drifts back very slightly as you scroll — parallax without drama.
      gsap.to(heroClip.root, {
        scale: 1.06,
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }
  }

  /* ── Chapter clips: scrub across their own pinned runway ─────────────── */
  document.querySelectorAll('[data-cinema-section]').forEach((section) => {
    const media = section.querySelector('[data-cinema]');
    const clip = clips.get(media?.dataset.cinema);
    if (!clip) return;

    if (reduced) {
      clip.setProgress(0.35);
      return;
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => clip.setProgress(self.progress)
    });

    // The panel opens from a slightly inset, slightly rounder state.
    gsap.fromTo(
      media,
      { scale: 0.92, borderRadius: 46 },
      {
        scale: 1,
        borderRadius: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      }
    );
  });

  return clips;
}
