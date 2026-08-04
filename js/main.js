document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("header");
  var toggle = document.getElementById("header-toggle");
  var nav = document.getElementById("header-nav");

  function updateHeaderState() {
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState);

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  var fadeTargets = document.querySelectorAll(
    ".worries, .concept, .reason__card, .service__item, .voice__card, .access__content"
  );

  fadeTargets.forEach(function (el) {
    el.classList.add("fade-in");
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px 100px 0px" }
  );

  fadeTargets.forEach(function (el) {
    observer.observe(el);
  });

  // セーフティネット：何らかの理由でIntersectionObserverが発火しない場合に
  // コンテンツが非表示のまま残らないようにする
  window.addEventListener("load", function () {
    setTimeout(function () {
      fadeTargets.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 4000);
  });
});
