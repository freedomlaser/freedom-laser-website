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

    document.documentElement.dataset.theme = theme;

    // Sync all matching radios
    document.querySelectorAll(`input[name="theme"][value="${theme}"]`).forEach((r) => {
      if (!r.checked) r.checked = true;
    });

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

  // Floating widget panel toggle
  function initWidget() {
    const toggle = document.querySelector(".theme-widget-toggle");
    const panel = document.getElementById("theme-widget-panel");
    if (!toggle || !panel) return;

    function openPanel() {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    function closePanel() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", () => {
      const open = panel.classList.contains("is-open");
      if (open) closePanel(); else openPanel();
    });

    // Escape closes panel
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        closePanel();
        toggle.focus();
      }
    });

    // Click outside closes panel
    document.addEventListener("click", (e) => {
      if (!panel.classList.contains("is-open")) return;
      const widget = document.querySelector(".theme-widget");
      if (widget && !widget.contains(e.target)) closePanel();
    });
  }

  // Sticky header: transparent at top, solid on scroll
  // Theme widget: hidden at top, visible on scroll
  function initStickyHeader() {
    const header = document.querySelector(".site-header");
    const widget = document.querySelector(".theme-widget");
    if (!header) return;

    function update() {
      const scrolled = window.scrollY > 40;
      header.classList.toggle("is-scrolled", scrolled);
      if (widget) widget.classList.toggle("is-visible", scrolled);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { initWidget(); initStickyHeader(); });
  } else {
    initWidget();
    initStickyHeader();
  }
})();
