import './styles/main.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initPreloader } from './modules/preloader.js';
import { initScroll, refreshScroll } from './modules/scroll.js';
import { initAtmosphere } from './modules/atmosphere.js';
import { initHero } from './modules/hero.js';
import { initText } from './modules/text.js';
import { initStats } from './modules/stats.js';
import { initPillars } from './modules/pillars.js';
import { initWork } from './modules/work.js';
import { initCinema } from './modules/cinema.js';

gsap.registerPlugin(ScrollTrigger);

document.documentElement.classList.add('js');

function boot() {
  initScroll();
  initAtmosphere();
  initCinema();
  initText();
  initStats();
  initPillars();
  initWork();
  initHero();

  // Line splitting depends on the real display font, not the fallback.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => refreshScroll());
  }

  // Recompute pinned runways after an orientation change or resize settles.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshScroll, 220);
  });
}

initPreloader();
boot();
