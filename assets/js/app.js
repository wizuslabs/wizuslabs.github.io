/* size budget: 4096 bytes gzipped */
/* WizusLabs site — shared client JS. Vanilla ES2020+. No deps.
   Responsibilities (each degrades gracefully if its DOM is absent):
   - theme toggle (auto/light/dark) persisted to localStorage
   - IntersectionObserver reveal-on-scroll
   - mobile nav focus trap + open/close
   - nav condense on scroll (rAF-debounced)
*/
(function () {
  "use strict";

  var THEME_KEY = "wizuslabs:theme";
  var root = document.documentElement;

  /* ---------- Safe localStorage wrapper ---------- */
  var storage = (function () {
    try {
      var k = "__wl_test__";
      window.localStorage.setItem(k, k);
      window.localStorage.removeItem(k);
      return window.localStorage;
    } catch (e) {
      var mem = {};
      return {
        getItem: function (k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
        setItem: function (k, v) { mem[k] = String(v); },
        removeItem: function (k) { delete mem[k]; }
      };
    }
  })();

  /* ---------- Theme toggle ---------- */
  var THEMES = ["auto", "light", "dark"];
  var live = document.querySelector("[data-theme-live]");

  function readTheme() {
    var v = storage.getItem(THEME_KEY);
    return THEMES.indexOf(v) > -1 ? v : "auto";
  }

  function applyTheme(t) {
    if (t === "light" || t === "dark") {
      root.setAttribute("data-theme", t);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function updateToggleUi(btn, t) {
    if (!btn) return;
    btn.setAttribute("data-state", t);
    btn.setAttribute("aria-label", "Theme: " + t);
    btn.setAttribute("aria-pressed", t !== "auto" ? "true" : "false");
    var lbl = btn.querySelector(".theme-toggle__label");
    if (lbl) lbl.textContent = "Theme: " + t;
  }

  function announce(msg) {
    if (!live) return;
    live.textContent = "";
    /* tiny delay lets SR detect the change */
    setTimeout(function () { live.textContent = msg; }, 40);
  }

  function initTheme() {
    var btn = document.querySelector("[data-theme-toggle]");
    var t = readTheme();
    applyTheme(t);
    updateToggleUi(btn, t);
    if (!btn) return;
    btn.addEventListener("click", function () {
      var current = readTheme();
      var next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
      storage.setItem(THEME_KEY, next);
      applyTheme(next);
      updateToggleUi(btn, next);
      announce("Theme set to " + next);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal-on-scroll");
    if (!els.length) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      for (var i = 0; i < els.length; i++) els[i].classList.add("is-visible");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Mobile nav (open/close + focus trap) ---------- */
  function initNav() {
    var openBtn = document.querySelector("[data-nav-open-btn]");
    var closeBtn = document.querySelector("[data-nav-close-btn]");
    var panel = document.querySelector("[data-nav-panel]");
    if (!openBtn || !panel) return;

    var lastFocus = null;

    function focusable() {
      return panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    }

    function open() {
      lastFocus = document.activeElement;
      root.setAttribute("data-nav-open", "true");
      openBtn.setAttribute("aria-expanded", "true");
      var f = focusable();
      if (f.length) f[0].focus();
      document.addEventListener("keydown", onKey);
    }

    function close() {
      root.removeAttribute("data-nav-open");
      openBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", onKey);
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    }

    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      var f = focusable();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);

    /* close on any link click inside the panel */
    panel.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.closest && t.closest("a")) close();
    });
  }

  /* ---------- Nav condense (rAF-debounced) ---------- */
  function initScroll() {
    if (!document.querySelector(".nav")) return;
    var ticking = false;
    function update() {
      if (window.scrollY > 120) root.setAttribute("data-nav-scrolled", "true");
      else root.removeAttribute("data-nav-scrolled");
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* ---------- Model diagram hairlines (motion #7) ---------- */
  function initDiagram() {
    var diagram = document.querySelector(".model-diagram");
    if (!diagram) return;
    var nodes = diagram.querySelectorAll(".node--crew");
    nodes.forEach(function (node) {
      var slug = node.getAttribute("data-from") ||
        (node.getAttribute("href") || "").split("#")[1] || "";
      var line = diagram.querySelector('.line[data-from="' + slug + '"]');
      if (!line) return;
      var on = function () { line.classList.add("is-active"); };
      var off = function () { line.classList.remove("is-active"); };
      node.addEventListener("mouseenter", on);
      node.addEventListener("mouseleave", off);
      node.addEventListener("focus", on, true);
      node.addEventListener("blur", off, true);
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    initTheme();
    initReveal();
    initNav();
    initScroll();
    initDiagram();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
