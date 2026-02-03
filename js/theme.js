/*
  Theme switcher (3 CSS themes)
  - Updates the <link id="themeStylesheet"> href
  - Persists selection in localStorage
  - No frameworks / build tools

  Theme keys:
    - zip-modern  (default)
    - card
    - ontario
*/

(() => {
  const STORAGE_KEY = "freedom_laser_theme";
  const DEFAULT_THEME = "zip-modern";

  const themeToHref = {
    "zip-modern": "css/theme-zip-modern.css",
    "card": "css/theme-card.css",
    "ontario": "css/theme-ontario.css"
  };

  function safeGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  }

  function normalizeTheme(themeKey) {
    return themeToHref[themeKey] ? themeKey : DEFAULT_THEME;
  }

  function applyTheme(themeKey, { persist = true } = {}) {
    const theme = normalizeTheme(themeKey);

    const linkEl = document.getElementById("themeStylesheet");
    if (linkEl) linkEl.setAttribute("href", themeToHref[theme]);

    // Handy for optional per-theme tweaks; not required for switching
    document.documentElement.dataset.theme = theme;

    // Sync UI
    const radio = document.querySelector(`input[name="theme"][value="${theme}"]`);
    if (radio && !radio.checked) radio.checked = true;

    if (persist) safeSet(STORAGE_KEY, theme);
  }

  // Initialize
  const initial = safeGet(STORAGE_KEY) || DEFAULT_THEME;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyTheme(initial, { persist: false }));
  } else {
    applyTheme(initial, { persist: false });
  }

  // Listen for changes
  document.addEventListener("change", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.name !== "theme") return;

    applyTheme(target.value, { persist: true });
  });
})();
