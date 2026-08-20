/**
 * Cinematic media sources.
 *
 * Each clip ships as MP4 (H.264) and WebM (VP9) so the browser can pick
 * whichever it actually supports — MP4 is the universal choice (Safari has
 * no WebM decoder at all), WebM covers the Chromium builds that ship without
 * a licensed H.264 decoder. If neither decodes, the poster keeps the
 * composition intact.
 *
 * All three clips are trimmed from one continuous camera move: a wide
 * gallery reveal that pushes in toward the laptop screen. Hero, builder and
 * closer are consecutive segments of that same shot, so the laptop and the
 * room are identical across the whole film and the camera motion carries
 * straight through from chapter to chapter.
 */

// The site deploys under a repo subpath on GitHub Pages (see vite.config.js
// `base`), so plain root-absolute paths like '/media/x.mp4' would 404 there.
// BASE_URL is Vite's own base at runtime — '/' in dev, '/new-portfolio/' in
// that build — so every media path has to go through it.
const asset = (path) => `${import.meta.env.BASE_URL}media/${path}`;

const POSTER_WORKSPACE = asset('poster-workspace.jpg');
const POSTER_GALLERY = asset('poster-gallery.jpg');

export const MEDIA = {
  hero: {
    id: 'hero',
    sources: [
      { src: asset('hero-orbit.mp4'), type: 'video/mp4' },
      { src: asset('hero-orbit.webm'), type: 'video/webm' }
    ],
    poster: POSTER_WORKSPACE,
    label: 'Hero orbit'
  },
  builder: {
    id: 'builder',
    sources: [
      { src: asset('the-builder.mp4'), type: 'video/mp4' },
      { src: asset('the-builder.webm'), type: 'video/webm' }
    ],
    poster: POSTER_WORKSPACE,
    label: 'The builder'
  },
  closer: {
    id: 'closer',
    sources: [
      { src: asset('the-closer.mp4'), type: 'video/mp4' },
      { src: asset('the-closer.webm'), type: 'video/webm' }
    ],
    poster: POSTER_GALLERY,
    label: 'The closer'
  }
};

export const MEDIA_LIST = Object.values(MEDIA);
