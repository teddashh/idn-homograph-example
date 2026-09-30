(function () {
  "use strict";
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-language]");
  var description = document.querySelector('meta[name="description"]');

  function apply(lang, updateUrl) {
    var next = lang === "zh" ? "zh" : "en";
    root.setAttribute("data-lang", next);
    root.lang = next === "zh" ? "zh-Hant" : "en";
    var title = root.getAttribute("data-title-" + next);
    var desc = root.getAttribute("data-desc-" + next);
    if (title) document.title = title;
    if (desc && description) description.setAttribute("content", desc);
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-language") === next));
    });
    try { window.localStorage.setItem("tedh-project-lang", next); } catch (e) {}
    if (updateUrl && window.history && window.URL) {
      var url = new URL(window.location.href);
      if (next === "zh") url.searchParams.set("lang", "zh-TW");
      else url.searchParams.delete("lang");
      window.history.replaceState({}, "", url);
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () { apply(button.getAttribute("data-language"), true); });
  });
  apply(root.getAttribute("data-lang"), false);

  var menu = document.querySelector(".menu-button");
  var nav = document.querySelector(".site-nav");
  if (menu && nav) {
    menu.addEventListener("click", function () {
      var open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        menu.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        menu.focus();
      }
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-copy"));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.innerText.replace(/\n$/, "")).then(function () {
        button.classList.add("is-done");
        setTimeout(function () { button.classList.remove("is-done"); }, 1600);
      });
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
