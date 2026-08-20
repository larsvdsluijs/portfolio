# Lars van der Sluijs — Portfolio

A cinematic, scroll-driven personal portfolio for Lars van der Sluijs, Fullstack
Software Developer. Bright, editorial and premium: warm off-white paper,
charcoal type, a periwinkle-blue and soft-lilac accent, and three scroll-scrubbed
film clips of a real developer workspace.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## The cinematic layer

Three silent clips carry the film, all trimmed from one continuous camera
move — a wide gallery reveal that pushes in toward the laptop screen:

| Clip        | Section              | Source segment | What happens                                              |
| ----------- | --------------------- | -------------- | ----------------------------------------------------------- |
| Hero orbit  | Hero (pinned)         | 0.0s – 3.5s     | Wide gallery reveal, glass panels floating in                |
| The builder | Chapter II (pinned)   | 3.3s – 6.9s     | Push continues; a wireframe sheet sweeps past the lens       |
| The closer  | Chapter III (pinned)  | 6.7s – 10.0s    | Sheet clears, resolving into the tight final composition     |

Because they're consecutive segments of one shot, the laptop and the room are
identical across the whole film and the camera motion carries straight
through from chapter to chapter.

Each clip ships as MP4 (H.264, universal — including Safari, which has no
WebM decoder) and WebM (VP9, for the Chromium builds that ship without a
licensed H.264 decoder). The `<video>` picks between them itself via native
`<source>` elements, so no format-guessing happens over the network.

### How the scrubbing works

A `<video>` element is not a timeline you can set directly — seeking is
asynchronous, and a browser drops seek requests issued faster than it can
decode. `src/modules/cinema.js` therefore keeps a *target* time updated by
ScrollTrigger and eases the real `currentTime` toward it in a rAF loop,
skipping any seek while the previous one is still in flight. That is the
difference between a jittery scrub and a film.

### Media resolution

Each clip resolves in order: a local file in `public/media/`, then a poster
still if no video format can play. The clips are committed to the repo — there
is no external source to re-fetch them from.

## Structure

```
index.html               markup for every section
src/main.js              boots the modules
src/media.config.js      clip sources (mp4 / webm / poster)
src/styles/main.css      design tokens and all section styling
src/modules/
  scroll.js              Lenis smooth scroll, stepped from the GSAP ticker
  cinema.js              scroll-scrubbed video playback
  hero.js                hero entrance and scroll hand-off
  text.js                masked line reveals, fades, kinetic closing statement
  stats.js               counting statistics strip
  pillars.js             pinned three-pillar sequence
  work.js                project reveals and pointer-tracked highlight
  atmosphere.js          progress rail, auto-hiding nav, trailing cursor
  preloader.js           opening curtain
  utils.js               line/character splitting, motion preferences
public/media/            the committed clips (mp4 + webm) and their posters
```

## Details worth knowing

- **Smooth scroll and ScrollTrigger share a frame.** Lenis is stepped from the
  GSAP ticker; otherwise the pinned sections and the scrubbed video drift apart
  and the whole page feels loose.
- **Display type is capped by viewport height as well as width**, so pinned
  sections cannot outgrow the screen — including when the display font falls
  back.
- **`prefers-reduced-motion` is honoured properly**: pinned runways collapse to
  normal flow, the grain and custom cursor are dropped, clips hold a still
  frame, and smooth scrolling is handed back to the browser.
- **Nothing depends on JavaScript to be readable.** Every animated element is
  hidden from JS, not from CSS, and `html:not(.js)` keeps content visible if the
  module never loads.

## Links

- GitHub — https://github.com/larsvdsluijs
- LinkedIn — https://www.linkedin.com/in/lars-van-der-sluijs-8031361ba/
