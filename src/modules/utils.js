export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = () =>
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Wraps every word of an element in `.split-line > i` so the inner element can
 * be translated out of an overflow-hidden mask. Words are grouped back into
 * their rendered lines after layout, which keeps the reveal honest at any
 * viewport width without depending on a paid SplitText plugin.
 */
export function splitLines(el) {
  const source = el.dataset.splitSource || el.textContent.trim();
  el.dataset.splitSource = source;

  const words = source.split(/\s+/);
  el.textContent = '';

  const spans = words.map((word, i) => {
    const span = document.createElement('span');
    span.className = 'split-word';
    span.style.display = 'inline-block';
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    return span;
  });

  // Group words by their vertical offset — that is what a "line" really is.
  const rows = new Map();
  spans.forEach((span) => {
    const top = Math.round(span.offsetTop);
    if (!rows.has(top)) rows.set(top, []);
    rows.get(top).push(span);
  });

  el.textContent = '';
  const lines = [];

  [...rows.keys()]
    .sort((a, b) => a - b)
    .forEach((top) => {
      const line = document.createElement('span');
      line.className = 'split-line';
      const inner = document.createElement('i');
      inner.textContent = rows
        .get(top)
        .map((span) => span.textContent)
        .join(' ');
      line.appendChild(inner);
      el.appendChild(line);
      lines.push(inner);
    });

  return lines;
}

/** Splits into per-character spans, keeping words unbreakable. */
export function splitChars(el) {
  const source = el.dataset.splitSource || el.textContent.trim();
  el.dataset.splitSource = source;
  el.textContent = '';

  const chars = [];

  source.split(/(\s+)/).forEach((chunk) => {
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(' '));
      return;
    }
    const word = document.createElement('span');
    word.style.display = 'inline-block';
    word.style.whiteSpace = 'nowrap';

    [...chunk].forEach((character) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = character;
      word.appendChild(span);
      chars.push(span);
    });

    el.appendChild(word);
  });

  return chars;
}
