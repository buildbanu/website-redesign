// Mobile navigation remains usable independently of the visual enhancements.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const pageContent = [document.querySelector('main'), document.querySelector('footer')];
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
  navigation.toggleAttribute('data-open', open);
  document.body.classList.toggle('menu-open', open);
  pageContent.forEach(element => { if (element) element.inert = open; });
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') {
    setMenu(false);
    menuButton.focus();
  }
  if (event.key === 'Tab') {
    const last = [...navigation.querySelectorAll('a')].at(-1);
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); menuButton.focus();
    }
  }
});
matchMedia('(min-width: 701px)').addEventListener('change', () => setMenu(false));

// One-time, below-fold reveals. No parallax, looping animation, or scroll hijacking.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
let typeObserver;
const textResets = [];
const revealTargets = [...document.querySelectorAll(
  '.spotlight-drawing, .entry-drawing, .system-flow'
)];

function revealAll() {
  revealObserver?.disconnect();
  typeObserver?.disconnect();
  revealTargets.forEach(element => element.classList.remove('reveal-pending', 'is-revealed'));
  textResets.forEach(reset => reset());
}

if (!motionPreference.matches && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  revealTargets.forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add('reveal-pending');
    revealObserver.observe(element);
  });

  document.addEventListener('focusin', event => {
    const section = event.target.closest('.reveal-pending');
    if (section) {
      section.classList.add('is-revealed');
      revealObserver.unobserve(section);
    }
  });
}

// Art-directed type: preserve the authored lines and the complete accessible name.
// Only the visual copies move. Body paragraphs and navigation labels stay still.
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const entrances = new WeakMap();
  typeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entrances.get(entry.target)?.();
      typeObserver.unobserve(entry.target);
    });
  }, {threshold: 0, rootMargin: '0px 0px -32px 0px'});

  const headlines = document.querySelectorAll(
    'main h1, .company-statement h2, .spotlight-copy h2, .engineering-note h2, ' +
    '.entry-title h2, .portfolio-context h2, .technical-essays h2, .product-purpose h2'
  );

  headlines.forEach(heading => {
    const lines = [''];
    heading.childNodes.forEach(node => {
      if (node.nodeName === 'BR') lines.push('');
      else lines[lines.length - 1] += node.textContent;
    });
    if (!lines.some(line => line.trim())) return;
    heading.setAttribute('aria-label', lines.join(' ').replace(/\s+/g, ' ').trim());
    const masks = lines.map((line, index) => {
      const mask = document.createElement('span');
      const track = document.createElement('span');
      mask.className = 'type-mask';
      mask.setAttribute('aria-hidden', 'true');
      track.className = 'type-track';
      track.style.setProperty('--line-order', index);
      track.textContent = line;
      mask.append(track);
      return mask;
    });
    heading.replaceChildren(...masks);
    heading.classList.add('type-headline', 'type-armed');
    entrances.set(heading, () => heading.classList.add('type-visible'));
    typeObserver.observe(heading);
    textResets.push(() => heading.classList.remove('type-armed', 'type-visible'));
  });

  // A short character resolve is reserved for the small section signposts.
  // The authentic label remains available to assistive technology throughout.
  const labels = document.querySelectorAll(
    '.hero-main>.label, .company-statement>.label, .spotlight-heading>.label, ' +
    '.page-title>.label, .essay-index .label, .example-intro>.label'
  );
  labels.forEach(label => {
    const original = label.textContent;
    const source = document.createElement('span');
    const visual = document.createElement('span');
    source.className = 'visually-hidden';
    source.textContent = original;
    visual.setAttribute('aria-hidden', 'true');
    visual.className = 'decode-visual';
    visual.textContent = original;
    label.replaceChildren(source, visual);
    let frame = 0;
    const reset = () => { cancelAnimationFrame(frame); visual.textContent = original; };
    textResets.push(reset);
    entrances.set(label, () => {
      const started = performance.now();
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      function resolve(now) {
        const progress = Math.min((now - started) / 520, 1);
        const resolved = Math.floor(progress * original.length);
        visual.textContent = [...original].map((letter, index) => {
          if (index < resolved || !/[a-z]/i.test(letter)) return letter;
          return characters[(index * 7 + Math.floor((now - started) / 55)) % characters.length];
        }).join('');
        if (progress < 1) frame = requestAnimationFrame(resolve);
        else visual.textContent = original;
      }
      frame = requestAnimationFrame(resolve);
    });
    typeObserver.observe(label);
  });
}

// Link labels roll once on hover or keyboard focus; arrows keep their own motion.
document.querySelectorAll('.text-link').forEach(link => {
  const textNodes = [...link.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
  const text = textNodes.map(node => node.textContent).join('').trim();
  if (!text) return;
  const label = document.createElement('span');
  const original = document.createElement('span');
  label.className = 'link-label';
  label.dataset.label = text;
  label.setAttribute('aria-hidden', 'true');
  original.className = 'link-label-original';
  original.textContent = text;
  label.append(original);
  link.setAttribute('aria-label', text);
  textNodes[0].replaceWith(label);
  textNodes.slice(1).forEach(node => node.remove());
});

motionPreference.addEventListener('change', event => {
  if (event.matches) revealAll();
});
