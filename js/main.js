/*
  DOM binding for window.SITE_CONFIG
  - Text injection:   [data-bind="..."]
  - Href injection:   [data-bind-href="tel"|"mailto"]

  Examples:
    <span data-bind="phoneDisplay"></span>
    <a data-bind-href="tel">Call</a>
    <span data-bind="prices.quitSmoking"></span>

  Computed:
    data-bind="currentYear"
*/

(() => {
  function getValueByPath(obj, path) {
    if (!obj || !path) return undefined;

    if (path === "currentYear") {
      return new Date().getFullYear();
    }

    const parts = path.split(".");
    let cur = obj;
    for (const part of parts) {
      if (cur && typeof cur === "object" && part in cur) {
        cur = cur[part];
      } else {
        return undefined;
      }
    }
    return cur;
  }

  function bindText(config) {
    const nodes = document.querySelectorAll("[data-bind]");
    nodes.forEach((el) => {
      const key = el.getAttribute("data-bind");
      if (!key) return;

      const value = getValueByPath(config, key);
      if (value === undefined || value === null || value === "") return;

      el.textContent = String(value);
    });
  }

  function bindHrefs(config) {
    const nodes = document.querySelectorAll("[data-bind-href]");
    nodes.forEach((el) => {
      const bind = el.getAttribute("data-bind-href");
      if (!bind) return;

      if (bind === "tel") {
        const phone = config?.phoneE164 || "";
        if (!phone) return;
        el.setAttribute("href", `tel:${phone}`);
      }

      if (bind === "mailto") {
        const email = config?.email || "";
        if (!email) return;
        el.setAttribute("href", `mailto:${email}`);
      }
    });
  }

  function init() {
    const config = window.SITE_CONFIG || {};
    bindText(config);
    bindHrefs(config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
