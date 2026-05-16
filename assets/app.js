/* Food Truck Launchpad — shared client logic
   - Theme persistence
   - Build state (selections, budget) saved to localStorage
   - Toasts
   - Bottom-nav active state
*/

(function () {
  const STORAGE = 'ftl-state-v1';

  const defaultState = {
    theme: 'dark',
    chassis: { name: '18\' Step Van', priceLow: 45000, priceHigh: 80000 },
    paint: {
      body: '#FF6B35',
      accent: '#0A0F1A',
      windowFrame: '#1B2A3A',
      wheels: '#111111',
      pattern: 'solid',
      finish: 'gloss',
      brandName: 'Smoke & Sizzle',
      tagline: 'Slow-cooked. Always.',
      decals: ['bbq', 'flame']
    },
    interior: { flooring: 'rubber', walls: 'stainless', counter: 'quartz' },
    equipment: ['flat-top', 'fryer', 'cooler', 'pos'],
    progress: { concept: 100, chassis: 80, paint: 65, interior: 50, equipment: 40, permits: 33, launch: 20 },
    budget: { spent: 78500, total: 145000 }
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return structuredClone(defaultState);
      const parsed = JSON.parse(raw);
      return Object.assign(structuredClone(defaultState), parsed);
    } catch { return structuredClone(defaultState); }
  }

  function saveState(s) {
    try { localStorage.setItem(STORAGE, JSON.stringify(s)); } catch {}
  }

  const state = loadState();

  // --- Theme --------------------------------------------------
  function applyTheme(t) {
    document.documentElement.classList.toggle('light', t === 'light');
  }
  applyTheme(state.theme);

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    saveState(state);
    applyTheme(state.theme);
  }

  // --- Toast --------------------------------------------------
  let toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  // --- Currency util -----------------------------------------
  function money(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  // --- Bottom nav active state -------------------------------
  function markActiveNav() {
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.bottom-nav a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase().split('/').pop();
      if (href === here) a.classList.add('active');
    });
  }
  document.addEventListener('DOMContentLoaded', markActiveNav);

  // --- Public API --------------------------------------------
  window.FTL = {
    state,
    save: () => saveState(state),
    toast,
    money,
    toggleTheme,
    reset: () => { localStorage.removeItem(STORAGE); location.reload(); }
  };
})();
