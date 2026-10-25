(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  var LINKEDIN = "https://www.linkedin.com/in/parag-patil-824b52253/";
  var LINKEDIN_ACTIVITY = LINKEDIN + "recent-activity/all/";
  var GITHUB = "https://github.com/paragpatil51";
  var RESUME = "assets/Parag-Patil-Resume.pdf";
  var PHOTO = "assets/img/parag-patil.jpg";
  var isMobile = function () { return window.matchMedia("(max-width: 640px)").matches; };

  /* ---------- Small helpers ---------- */
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { toastEl.classList.remove("is-on"); }, 1800);
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(iso) { var p = iso.split("-"); return +p[2] + " " + MONTHS[+p[1] - 1] + " " + p[0]; }
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }
  // Body scroll lock shared by overlays
  var locks = 0;
  function lock(on) { locks = Math.max(0, locks + (on ? 1 : -1)); document.body.style.overflow = locks ? "hidden" : ""; }

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Theme ---------- */
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store("theme", next);
    if (field) field.recolor();
  }
  $("#themeToggle").addEventListener("click", toggleTheme);

  /* ---------- Nav: scrolled state, progress, mobile menu ---------- */
  var nav = $(".nav"), bar = $(".progress span");
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle("is-scrolled", y > 8);
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = $("#menuBtn"), menu = $("#mobileMenu");
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () { setMenu(menu.hidden); });
  $$("a, button", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  var links = $$(".nav__links a");
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        // The hero (and the model strip below it) has no tab, so it clears the highlight
        var id = e.target.id ? "#" + e.target.id : "";
        links.forEach(function (l) { l.classList.toggle("is-active", !!id && l.getAttribute("href") === id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) { var s = $(l.getAttribute("href")); if (s) secObs.observe(s); });
    $$(".hero, .strip").forEach(function (s) { secObs.observe(s); });
  }

  /* ---------- Writing: article cards + feed posts (rendered before reveal observer) ---------- */
  var ARTICLES = window.ARTICLES || [];
  function figSrc(a, i) { return "assets/img/writing/" + a.slug + "/" + (i < 10 ? "0" : "") + i + ".jpg"; }
  var ICON_IMG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></svg>';
  (function renderWriting() {
    var grid = $("#writingGrid");
    if (grid) {
      grid.innerHTML = ARTICLES.map(function (a, idx) {
        return '<a class="post-card reveal' + (a.featured ? " post-card--featured" : "") + '" href="' + a.url + '" data-article="' + idx + '">' +
          '<span class="post-card__media"><img src="' + figSrc(a, 0) + '" alt="" loading="lazy">' +
          '<span class="post-card__figs">' + ICON_IMG + a.figures.length + " figures</span></span>" +
          '<span class="post-card__body">' +
            '<span class="post-card__meta">' + (a.featured ? '<span class="featured-badge">★ Latest</span>' : "") + '<span class="tag">' + a.tag + "</span>" + fmtDate(a.date) + " · " + a.read + "</span>" +
            '<span class="post-card__title">' + escapeHtml(a.title) + "</span>" +
            '<span class="post-card__excerpt">' + escapeHtml(a.excerpt) + "</span>" +
            '<span class="post-card__more">Read summary &amp; figures →</span>' +
          "</span></a>";
      }).join("") +
        '<a class="follow-card reveal" href="' + LINKEDIN + 'recent-activity/articles/" target="_blank" rel="noopener">' +
          '<img src="' + PHOTO + '" alt="" loading="lazy">' +
          '<span class="follow-card__k">870+ followers</span>' +
          '<span class="follow-card__t">More writing on AI engineering, every few weeks.</span>' +
          '<span class="btn btn--accent btn--small">Follow on LinkedIn ↗</span>' +
        "</a>";
      grid.addEventListener("click", function (e) {
        var card = e.target.closest("[data-article]");
        if (!card || e.metaKey || e.ctrlKey || e.shiftKey) return; // let modified clicks open LinkedIn
        e.preventDefault();
        openReader(+card.getAttribute("data-article"), card);
      });
    }
    var posts = $("#postsGrid");
    if (posts) {
      posts.innerHTML = (window.POSTS || []).map(function (p) {
        return '<article class="thought spot">' +
          '<div class="thought__head"><img src="' + PHOTO + '" alt="" loading="lazy"><div><b>Parag Patil</b><span>' + (p.date ? fmtDate(p.date) : p.label) + " · LinkedIn</span></div></div>" +
          "<h4>" + escapeHtml(p.title) + "</h4><p>" + escapeHtml(p.text) + "</p>" +
          '<a class="thought__link" href="' + (p.url || LINKEDIN_ACTIVITY) + '" target="_blank" rel="noopener">See the conversation ↗</a></article>';
      }).join("");
    }
  })();

  /* ---------- Article reader ---------- */
  var reader = $("#reader"), readerBody = $("#readerBody"), readerReturn = null, readerIdx = -1;
  function openReader(i, from) {
    var a = ARTICLES[i]; if (!a) return;
    readerIdx = i;
    readerReturn = from || document.activeElement;
    readerBody.innerHTML =
      '<div class="reader__cover"><img src="' + figSrc(a, 0) + '" alt=""></div>' +
      '<div class="reader__content">' +
        '<p class="reader__meta"><span class="tag tag--accent">' + a.tag + "</span>" + fmtDate(a.date) + " · " + a.read + " · " + a.figures.length + " figures</p>" +
        '<h2 class="reader__title" id="readerTitle">' + escapeHtml(a.title) + "</h2>" +
        '<p class="reader__byline"><img src="' + PHOTO + '" alt="">By Parag Patil · published on LinkedIn</p>' +
        '<div class="reader__summary">' + a.summary.map(function (s) { return "<p>" + escapeHtml(s) + "</p>"; }).join("") + "</div>" +
        "<h3>Key ideas</h3>" +
        '<ol class="reader__takeaways">' + a.takeaways.map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; }).join("") + "</ol>" +
        "<h3>Figures from the article</h3>" +
        '<div class="reader__figs">' + a.figures.map(function (cap, k) {
          return '<button class="reader__fig" type="button" data-fig="' + k + '"><span class="img"><img src="' + figSrc(a, k) + '" alt="' + escapeHtml(cap) + '" loading="lazy"></span><small>' + escapeHtml(cap) + "</small></button>";
        }).join("") + "</div>" +
        '<div class="reader__cta"><a class="btn btn--accent" href="' + a.url + '" target="_blank" rel="noopener">Read the full article on LinkedIn ↗</a>' +
        (ARTICLES[i + 1] ? '<button class="btn btn--ghost" type="button" data-next-article>Next: ' + escapeHtml(ARTICLES[i + 1].title.split(":")[0]) + " →</button>" : "") + "</div>" +
      "</div>";
    readerBody.scrollTop = 0;
    if (reader.hidden) { reader.hidden = false; lock(true); }
    setTimeout(function () { $(".reader__close", reader).focus(); }, 30);
  }
  function closeReader() {
    if (reader.hidden) return;
    reader.hidden = true; lock(false);
    if (readerReturn && readerReturn.focus) readerReturn.focus();
  }
  reader.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-reader]")) return closeReader();
    var f = e.target.closest("[data-fig]");
    if (f) return openLightbox(ARTICLES[readerIdx], +f.getAttribute("data-fig"));
    if (e.target.closest("[data-next-article]")) openReader(readerIdx + 1, readerReturn);
  });

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap"), lbArticle = null, lbIdx = 0;
  function showFig() {
    lbImg.src = figSrc(lbArticle, lbIdx);
    lbImg.alt = lbArticle.figures[lbIdx];
    lbCap.textContent = (lbIdx + 1) + " / " + lbArticle.figures.length + " · " + lbArticle.figures[lbIdx];
  }
  function openLightbox(a, i) { lbArticle = a; lbIdx = i; showFig(); lb.hidden = false; $(".lightbox__close", lb).focus(); }
  function closeLightbox() { lb.hidden = true; var f = $('[data-fig="' + lbIdx + '"]', reader); if (f) f.focus(); }
  function stepFig(d) { lbIdx = (lbIdx + d + lbArticle.figures.length) % lbArticle.figures.length; showFig(); }
  lb.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lb]");
    if (b) { var k = b.getAttribute("data-lb"); if (k === "close") closeLightbox(); else stepFig(k === "next" ? 1 : -1); }
    else if (e.target === lb) closeLightbox();
  });

  /* ---------- Reveal on scroll + count-up ---------- */
  function countUp(el) {
    var target = +el.getAttribute("data-count");
    if (reduceMotion) { el.textContent = target.toLocaleString("en-US"); return; }
    var start = performance.now(), dur = 1600;
    (function tick(now) {
      var p = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  if ("IntersectionObserver" in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var sibs = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
        var i = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
        el.classList.add("is-in");
        $$("[data-count]", el).forEach(countUp);
        revObs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal, .funnel").forEach(function (el) { revObs.observe(el); });
  } else {
    $$(".reveal, .funnel").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Spotlight hover ---------- */
  document.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest(".spot");
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* ---------- Tabs ---------- */
  $$(".tabs").forEach(function (list) {
    var tabs = $$("[role=tab]", list);
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        var n = tabs[(i + d + tabs.length) % tabs.length];
        select(n); n.focus();
      });
    });
  });

  /* ---------- Hero: stream a `whoami` JSON over the portrait ---------- */
  var PROFILE = [
    ["name", "Parag Patil"],
    ["role", "GenAI / LLM Engineer"],
    ["status", "open_to_work"],
    ["notice_days", 0]
  ];
  function chunk(str, cls, out) {
    var i = 0;
    while (i < str.length) { var n = 2 + Math.floor(Math.random() * 4); out.push([str.slice(i, i + n), cls]); i += n; }
  }
  function buildTokens() {
    var t = [["{", "c-mute"], ["\n", ""]];
    PROFILE.forEach(function (pair, idx) {
      t.push(["  ", ""]);
      chunk('"' + pair[0] + '"', "c-key", t);
      t.push([": ", "c-mute"]);
      if (typeof pair[1] === "number") t.push([String(pair[1]), "c-num"]);
      else chunk('"' + pair[1] + '"', "c-str", t);
      if (idx < PROFILE.length - 1) t.push([",", "c-mute"]);
      t.push(["\n", ""]);
    });
    t.push(["}", "c-mute"]);
    return t;
  }
  var streamEl = $("#stream"), streamTimer;
  function runStream() {
    clearTimeout(streamTimer);
    var tokens = buildTokens(), i = 0;
    streamEl.innerHTML = "";
    var caret = document.createElement("span"); caret.className = "caret";
    streamEl.appendChild(caret);
    function add(tk) { var s = document.createElement("span"); if (tk[1]) s.className = tk[1]; s.textContent = tk[0]; streamEl.insertBefore(s, caret); }
    if (reduceMotion) { tokens.forEach(add); caret.remove(); return; }
    (function step() {
      if (i >= tokens.length) { streamTimer = setTimeout(function () { caret.remove(); }, 1400); return; }
      add(tokens[i++]);
      streamTimer = setTimeout(step, tokens[i - 1][0] === "\n" ? 90 : 22 + Math.random() * 40);
    })();
  }
  setTimeout(runStream, reduceMotion ? 0 : 900);
  $("#replay").addEventListener("click", runStream);

  /* ---------- Hero slider: portrait, then the campus-hiring story ---------- */
  (function () {
    var slider = $("#heroSlider"); if (!slider) return;
    var slides = $$(".slide", slider), bars = $$(".story-bars button", slider);
    var cmd = $("#panelCmd"), count = $("#panelCount"), story = $("#story"), sTitle = $("#storyTitle"), sText = $("#storyText");
    var replay = $("#replay"), pauseBtn = $("#slidePause");
    var DUR = [8000, 6500, 6500, 7000];   // the portrait stays a little longer
    var idx = 0, userPaused = false, hovering = false, focused = false, inView = true, started = false;

    function syncPaused() {
      slider.classList.toggle("is-paused", reduceMotion || userPaused || hovering || focused || !inView || document.hidden);
    }
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === idx); s.setAttribute("aria-hidden", String(k !== idx)); });
      bars.forEach(function (b, k) {
        b.classList.remove("is-active");
        b.classList.toggle("is-done", k < idx);
        b.setAttribute("aria-selected", String(k === idx));
        b.querySelector("i").style.setProperty("--dur", DUR[k] + "ms");
      });
      void bars[idx].offsetWidth;          // restart the fill animation even when re-selecting
      bars[idx].classList.add("is-active");
      slider.setAttribute("data-slide", idx);
      count.textContent = (idx + 1) + "/" + slides.length;
      if (idx === 0) {
        cmd.textContent = "whoami"; story.hidden = true; streamEl.hidden = false; replay.hidden = false;
        if (started) runStream();
      } else {
        var s = slides[idx];
        cmd.textContent = "cat campus_hiring.md";
        streamEl.hidden = true; replay.hidden = true; story.hidden = false;
        sTitle.textContent = s.getAttribute("data-title");
        sText.textContent = s.getAttribute("data-text");
        story.style.animation = "none"; void story.offsetWidth; story.style.animation = "";
      }
      started = true;
    }
    // Auto-advance when the active bar finishes filling
    slider.addEventListener("animationend", function (e) {
      if (reduceMotion || e.animationName !== "barfill") return;
      if (e.target.parentElement === bars[idx]) go(idx + 1);
    });
    bars.forEach(function (b, k) { b.addEventListener("click", function () { go(k); }); });
    $$("[data-slide-step]", slider).forEach(function (b) { b.addEventListener("click", function () { go(idx + +b.getAttribute("data-slide-step")); }); });
    pauseBtn.addEventListener("click", function () {
      userPaused = !userPaused;
      pauseBtn.setAttribute("aria-pressed", String(userPaused));
      pauseBtn.setAttribute("aria-label", userPaused ? "Play slideshow" : "Pause slideshow");
      syncPaused();
    });
    slider.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { hovering = true; syncPaused(); } });
    slider.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") { hovering = false; syncPaused(); } });
    slider.addEventListener("focusin", function () { focused = true; syncPaused(); });
    slider.addEventListener("focusout", function () { focused = false; syncPaused(); });
    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
    });
    // Swipe on touch screens
    var startX = null;
    slider.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") startX = e.clientX; });
    slider.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX; startX = null;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { inView = es[0].isIntersecting; syncPaused(); }, { threshold: 0.25 }).observe(slider);
    }
    document.addEventListener("visibilitychange", syncPaused);
    go(0);
    syncPaused();
  })();

  /* ---------- Hero field: drifting "embedding space" ---------- */
  var field = (function () {
    var canvas = $("#field");
    if (!canvas || !canvas.getContext) return null;
    var ctx = canvas.getContext("2d"), pts = [], w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    var mouse = { x: -9999, y: -9999 }, colors = {};
    function readColors() {
      var cs = getComputedStyle(root);
      colors.dot = cs.getPropertyValue("--faint").trim() || "#6b6e77";
      colors.accent = cs.getPropertyValue("--accent").trim() || "#7ef0b4";
    }
    function hexA(hex, a) {
      var m = hex.replace("#", "");
      if (m.length === 3) m = m.split("").map(function (c) { return c + c; }).join("");
      var n = parseInt(m, 16);
      return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
    }
    function resize() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(90, Math.round((w * h) / 15000));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: Math.random() * 1.4 + 0.6, hot: Math.random() < 0.12 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      var link = 118, i, j, p, q, dx, dy, d;
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        if (!reduceMotion) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (j = i + 1; j < pts.length; j++) {
          q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; d = dx * dx + dy * dy;
          if (d < link * link) {
            ctx.strokeStyle = hexA(colors.dot, 0.16 * (1 - Math.sqrt(d) / link));
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        dx = p.x - mouse.x; dy = p.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 170) {
          ctx.strokeStyle = hexA(colors.accent, 0.45 * (1 - d / 170));
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = p.hot || d < 170 ? hexA(colors.accent, 0.9) : hexA(colors.dot, 0.55);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    function loop() {
      draw();
      if (!reduceMotion && visible && !document.hidden) raf = requestAnimationFrame(loop);
      else raf = 0;
    }
    function start() { if (!raf) raf = requestAnimationFrame(loop); }
    readColors(); resize(); start();
    window.addEventListener("resize", function () { clearTimeout(resize.t); resize.t = setTimeout(function () { resize(); start(); }, 150); });
    var hero = canvas.parentElement;
    hero.addEventListener("pointermove", function (e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; if (reduceMotion) draw(); });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; if (reduceMotion) draw(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () { readColors(); draw(); });
    return { recolor: function () { readColors(); draw(); } };
  })();

  /* ---------- Markdown workspace ---------- */
  var ide = (function () {
    var FILES = window.WORKSPACE || {}, names = Object.keys(FILES);
    var body = $("#ideBody"), tabsEl = $("#ideTabs");
    if (!body || !names.length) return null;
    var state = { file: names[0], view: "raw" };

    function inlineRaw(s) {
      return escapeHtml(s)
        .replace(/`([^`]+)`/g, '<span class="md-code"><span class="md-mark">`</span>$1<span class="md-mark">`</span></span>')
        .replace(/\*\*([^*]+)\*\*/g, '<span class="md-b"><span class="md-mark">**</span>$1<span class="md-mark">**</span></span>')
        .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<span class="md-i"><span class="md-mark">*</span>$2<span class="md-mark">*</span></span>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="md-mark">[</span><span class="md-link">$1</span><span class="md-mark">](</span><span class="md-url">$2</span><span class="md-mark">)</span>');
    }
    function renderRaw(src) {
      var lines = src.split("\n"), out = [], inFm = false, inFence = false;
      lines.forEach(function (l, i) {
        var h;
        if (l === "---" && (i === 0 || inFm)) { inFm = i === 0; h = '<span class="md-fm">---</span>'; }
        else if (inFm) { var m = l.match(/^([\w_]+):(.*)$/); h = m ? '<span class="md-fm"><span class="k">' + m[1] + '</span>:<span class="v">' + escapeHtml(m[2]) + "</span></span>" : escapeHtml(l); }
        else if (/^```/.test(l)) { inFence = !inFence; h = '<span class="md-fence">' + escapeHtml(l) + "</span>"; }
        else if (inFence) { h = '<span class="md-pre">' + escapeHtml(l) + "</span>"; }
        else if (/^#{1,6} /.test(l)) { var hm = l.match(/^(#{1,6} )(.*)$/); h = '<span class="md-h"><span class="md-mark">' + hm[1] + "</span>" + inlineRaw(hm[2]) + "</span>"; }
        else if (/^> /.test(l)) { h = '<span class="md-q"><span class="md-mark">&gt; </span>' + inlineRaw(l.slice(2)) + "</span>"; }
        else if (/^\|/.test(l)) { h = '<span class="md-tbl">' + escapeHtml(l).replace(/\|/g, '<span class="md-mark">|</span>') + "</span>"; }
        else if (/^- /.test(l)) { h = '<span class="md-mark">- </span>' + inlineRaw(l.slice(2)); }
        else if (l === "---") { h = '<span class="md-mark">---</span>'; }
        else { h = inlineRaw(l); }
        out.push('<span class="ln">' + (h || "") + "</span>");
      });
      return '<pre class="md-raw">' + out.join("") + "</pre>";
    }

    function inlinePrev(s) {
      return escapeHtml(s)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, t, u) {
          var ext = /^https?:/.test(u) || /\.pdf$/.test(u);
          return '<a href="' + u + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + t + "</a>";
        });
    }
    function renderPreview(src) {
      var lines = src.split("\n"), html = [], i = 0, para = [];
      function flush() { if (para.length) { html.push("<p>" + inlinePrev(para.join(" ")) + "</p>"); para = []; } }
      if (lines[0] === "---") {
        var fm = [];
        for (i = 1; i < lines.length && lines[i] !== "---"; i++) {
          var m = lines[i].match(/^([\w_]+):\s*(.*)$/);
          if (m) fm.push("<span><b>" + m[1] + "</b>" + escapeHtml(m[2]) + "</span>");
        }
        html.push('<div class="fm">' + fm.join("") + "</div>");
        i++;
      }
      for (; i < lines.length; i++) {
        var l = lines[i];
        if (/^```/.test(l)) {
          flush(); var code = [];
          for (i++; i < lines.length && !/^```/.test(lines[i]); i++) code.push(lines[i]);
          html.push("<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
        } else if (/^#{1,6} /.test(l)) {
          flush(); var n = l.match(/^#+/)[0].length;
          html.push("<h" + n + ">" + inlinePrev(l.slice(n + 1)) + "</h" + n + ">");
        } else if (/^> /.test(l)) {
          flush(); html.push("<blockquote>" + inlinePrev(l.slice(2)) + "</blockquote>");
        } else if (/^\|/.test(l)) {
          flush(); var rows = [];
          for (; i < lines.length && /^\|/.test(lines[i]); i++) rows.push(lines[i]);
          i--;
          var cells = function (r) { return r.replace(/^\||\|$/g, "").split("|").map(function (c) { return c.trim(); }); };
          var head = cells(rows[0]), bodyRows = rows.slice(2);
          html.push("<table><thead><tr>" + head.map(function (c) { return "<th>" + inlinePrev(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
            bodyRows.map(function (r) { return "<tr>" + cells(r).map(function (c) { return "<td>" + inlinePrev(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>");
        } else if (/^- /.test(l)) {
          flush(); var items = [];
          for (; i < lines.length && /^- /.test(lines[i]); i++) items.push("<li>" + inlinePrev(lines[i].slice(2)) + "</li>");
          i--;
          html.push("<ul>" + items.join("") + "</ul>");
        } else if (l === "---") {
          flush(); html.push("<hr>");
        } else if (!l.trim()) {
          flush();
        } else {
          para.push(l);
        }
      }
      flush();
      return '<div class="md-prev">' + html.join("") + "</div>";
    }

    function render() {
      var src = FILES[state.file];
      body.innerHTML = state.view === "raw" ? renderRaw(src) : renderPreview(src);
      body.scrollTop = 0;
      tabsEl.innerHTML = names.map(function (n) {
        return '<button class="ide__tab" type="button" role="tab" aria-selected="' + (n === state.file) + '" data-file="' + n + '"><b class="ft ft--md">M↓</b>' + n + "</button>";
      }).join("");
      $$(".ide__tree [data-file]").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-file") === state.file); });
      $$(".seg button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === state.view)); });
      $("#ideLines").textContent = src.split("\n").length + " lines";
      $("#ideTokens").textContent = "~" + Math.round(src.length / 4).toLocaleString("en-US") + " tokens";
    }
    function open(file) { if (FILES[file]) { state.file = file; render(); } }
    $("#ide").addEventListener("click", function (e) {
      var f = e.target.closest("[data-file]");
      if (f) { open(f.getAttribute("data-file")); return; }
      var v = e.target.closest("[data-view]");
      if (v) { state.view = v.getAttribute("data-view"); render(); }
    });
    render();
    return { open: open };
  })();

  /* ---------- Context-window meter (reading progress) ---------- */
  (function () {
    var ctxEl = $("#ctx"); if (!ctxEl) return;
    var fill = $(".ctx__bar i", ctxEl), used = $("#ctxUsed"), totalEl = $("#ctxTotal");
    var total = Math.round(($("#main").innerText || "").length / 4);
    function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n); }
    totalEl.textContent = fmt(total) + " tokens";
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      ctxEl.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.6);
      fill.style.width = (p * 100).toFixed(1) + "%";
      used.textContent = fmt(Math.round(total * p));
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  })();

  /* ---------- AI assistant: BM25 retrieval + grounded streaming ---------- */
  var KB = window.KNOWLEDGE || [];
  var STOP = "a an the is are was were be been do does did of to in on for with and or at by from as it its this that he his him she her they them their you your i me my we our what which who whom how when where why can could would should will about tell any has have had into than then so if just there here please".split(" ");
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });
  function stem(w) {
    if (w.length > 5 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 4 && /ed$/.test(w)) return w.slice(0, -2);
    if (w.length > 4 && /ies$/.test(w)) return w.slice(0, -3) + "y";
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function tokenize(s) {
    return s.toLowerCase().replace(/<[^>]+>/g, " ").replace(/[^a-z0-9+#.\- ]+/g, " ").split(/\s+/)
      .map(function (w) { return w.replace(/^[.\-]+|[.\-]+$/g, ""); })
      .filter(function (w) { return w && !STOPSET[w]; }).map(stem);
  }
  // Title + keywords count twice as much as body text
  var docs = KB.map(function (d) {
    var toks = tokenize(d.title + " " + d.k).concat(tokenize(d.title + " " + d.k), tokenize(d.text));
    var tf = {}; toks.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; });
    return { d: d, tf: tf, len: toks.length };
  });
  var avgdl = docs.reduce(function (a, x) { return a + x.len; }, 0) / Math.max(1, docs.length);
  var df = {};
  docs.forEach(function (x) { Object.keys(x.tf).forEach(function (t) { df[t] = (df[t] || 0) + 1; }); });
  // Words too generic to count as evidence on their own ("experience with X" should match on X)
  var GENERIC = { experience: 1, know: 1, knowledge: 1, work: 1, worked: 1, build: 1, built: 1, use: 1, used: 1, done: 1, good: 1, parag: 1, ai: 1 };
  function bm25(query) {
    var q = tokenize(query).filter(function (t) { return !GENERIC[t]; }), k1 = 1.4, b = 0.75, N = docs.length;
    return docs.map(function (x) {
      var s = 0;
      q.forEach(function (t) {
        var f = x.tf[t]; if (!f) return;
        var idf = Math.log(1 + (N - df[t] + 0.5) / (df[t] + 0.5));
        s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * x.len / avgdl));
      });
      return { d: x.d, s: s };
    }).sort(function (a, b) { return b.s - a.s; });
  }

  var WELCOME_QS = ["What did he build at his last job?", "Has he built RAG pipelines?", "What has he written?", "How does he reduce LLM cost?", "Tell me about QDetect", "When can he join?"];
  var chat = $("#chat"), fab = $("#askFab"), log = $("#chatLog"), form = $("#chatForm"), input = $("#chatInput"), send = $(".chat__send"), busy = false, asked = {};
  // The hero already has an "Ask my AI" button, so the floating one appears once the visitor scrolls past it
  function syncFab() { fab.classList.toggle("is-hidden", !chat.hidden || window.scrollY < window.innerHeight * 0.55); }
  window.addEventListener("scroll", syncFab, { passive: true });
  syncFab();
  function scrollLog() { log.scrollTop = log.scrollHeight; }
  function botShell() {
    var m = document.createElement("div"); m.className = "msg msg--bot";
    m.innerHTML = '<img class="msg__avatar" src="' + PHOTO + '" alt=""><div class="msg__bubble"><div class="ans"></div></div>';
    log.appendChild(m); return m;
  }
  function addSuggest(qs, welcome) {
    if (!qs.length) return;
    var s = document.createElement("div");
    s.className = "suggest" + (welcome ? " suggest--welcome" : "");
    qs.forEach(function (q) { var b = document.createElement("button"); b.type = "button"; b.textContent = q; s.appendChild(b); });
    log.appendChild(s); scrollLog();
  }
  function welcome() {
    log.innerHTML = ""; asked = {};
    var m = botShell();
    $(".ans", m).innerHTML = "<p>Hi! I'm Parag's portfolio assistant. Ask me about his projects, RAG and agent work, writing, skills or availability.</p><p>I only answer from what's on this site, and I'll tell you if I don't know.</p>";
    addSuggest(WELCOME_QS, true);
  }
  function openChat() {
    if (chat.hidden) {
      chat.hidden = false; syncFab();
      if (!log.children.length) welcome();
      if (isMobile()) lock(true);
    }
    setTimeout(function () { input.focus({ preventScroll: true }); }, 60);
  }
  function closeChat() {
    if (chat.hidden) return;
    chat.hidden = true; syncFab();
    if (isMobile()) lock(false);
    if (!fab.classList.contains("is-hidden")) fab.focus({ preventScroll: true });
  }
  $$("[data-open-chat]").forEach(function (b) { b.addEventListener("click", openChat); });
  $("#chatClose").addEventListener("click", closeChat);
  $("#chatReset").addEventListener("click", function () { if (!busy) { welcome(); input.focus(); } });

  function streamInto(el, html, done) {
    // Stream plain words, then swap in the final HTML so links stay intact
    var plain = html.replace(/<\/p><p>/g, "\n\n").replace(/<[^>]+>/g, ""), words = plain.split(/(\s+)/), i = 0;
    if (reduceMotion) { el.innerHTML = html; return done(); }
    var caret = '<span class="caret"></span>';
    (function step() {
      i += 2;
      el.innerHTML = "<p>" + escapeHtml(words.slice(0, i).join("")).replace(/\n\n/g, "</p><p>") + caret + "</p>";
      scrollLog();
      if (i < words.length) setTimeout(step, 14 + Math.random() * 26);
      else { el.innerHTML = html; done(); }
    })();
  }
  function answer(q) {
    q = (q || "").trim();
    if (busy || !q) return;
    busy = true; send.disabled = true; asked[q] = 1;
    $$(".suggest", log).forEach(function (s) { s.remove(); });
    var u = document.createElement("div"); u.className = "msg msg--user";
    u.innerHTML = '<div class="msg__bubble"></div>'; $(".msg__bubble", u).textContent = q;
    log.appendChild(u);
    var m = botShell(), ans = $(".ans", m);
    ans.innerHTML = '<span class="thinking"><i></i><i></i><i></i>searching ' + KB.length + " passages</span>";
    scrollLog();

    var ranked = bm25(q), top = ranked[0], html, used = [], follow = [];
    var greet = /^\s*(hi|hello|hey|yo|namaste|good (morning|evening|afternoon))\b/i.test(q) && tokenize(q).length <= 2;
    var thanks = /^\s*(thanks|thank you|thx|great|cool|nice)\b/i.test(q) && tokenize(q).length <= 3;
    if (greet || thanks) {
      html = greet ? "<p>Hello! What would you like to know about Parag?</p>" : "<p>Glad that helped. Anything else? You can also reach Parag directly on <a href=\"" + LINKEDIN + "\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>.</p>";
      follow = WELCOME_QS.slice(0, 3);
    } else if (!top || top.s < 1.6) {
      html = "<p>I couldn't find anything on this site that answers that, and I'd rather say so than guess.</p><p>Try asking about his projects, RAG, agents, writing or availability, or ask Parag directly on <a href=\"" + LINKEDIN + "\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>.</p>";
      follow = ["What are his core skills?", "What did he build at his last job?", "When can he join?"];
    } else {
      used = ranked.filter(function (r) { return r.s >= top.s * 0.72; }).slice(0, 2);
      html = used.map(function (r) { return "<p>" + r.d.text + "</p>"; }).join("");
      used.forEach(function (r) { (r.d.next || []).forEach(function (n) { if (!asked[n] && follow.indexOf(n) < 0) follow.push(n); }); });
      follow = follow.slice(0, 3);
    }
    setTimeout(function () {
      streamInto(ans, html, function () {
        if (used.length) {
          var src = document.createElement("div"); src.className = "msg__sources";
          src.innerHTML = "<span>Sources</span>" + used.map(function (r) {
            return '<a class="src" href="' + (r.d.href || "#top") + '" data-src><b>' + r.s.toFixed(1) + "</b>" + escapeHtml(r.d.title) + "</a>";
          }).join("");
          $(".msg__bubble", m).appendChild(src);
        }
        addSuggest(follow);
        scrollLog();
        busy = false; send.disabled = false;
        input.focus({ preventScroll: true });
      });
    }, reduceMotion ? 0 : 420);
  }
  form.addEventListener("submit", function (e) { e.preventDefault(); var q = input.value; input.value = ""; answer(q); });
  log.addEventListener("click", function (e) {
    var b = e.target.closest(".suggest button");
    if (b) return answer(b.textContent);
    var s = e.target.closest("[data-src]");
    if (s) {
      var href = s.getAttribute("href");
      if (href.charAt(0) === "#") {
        e.preventDefault();
        if (isMobile()) closeChat();
        scrollToId(href.slice(1));
      }
    }
  });

  /* ---------- Command palette ---------- */
  var ICON = {
    go: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    file: '<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    theme: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>'
  };
  function goTo(id) { return function () { scrollToId(id); }; }
  function openUrl(u) { return function () { window.open(u, "_blank", "noopener"); }; }
  function openFile(name) { return function () { scrollToId("about"); if (ide) ide.open(name); }; }
  var COMMANDS = [
    { g: "Actions", t: "Ask my AI assistant", i: "chat", run: openChat, kw: "chat question rag bot" },
    { g: "Navigate", t: "Selected work", i: "go", run: goTo("work"), kw: "projects portfolio" },
    { g: "Navigate", t: "QPulse · LLM threat intelligence", i: "go", run: goTo("qpulse"), kw: "gemma news" },
    { g: "Navigate", t: "QStellar · Agents & RAG", i: "go", run: goTo("qstellar"), kw: "rag agents chromadb" },
    { g: "Navigate", t: "QDetect · ML alert triage", i: "go", run: goTo("qdetect"), kw: "ml wazuh siem" },
    { g: "Navigate", t: "Experience & education", i: "go", run: goTo("experience"), kw: "job previous company timeline cgpa" },
    { g: "Navigate", t: "Writing", i: "go", run: goTo("writing"), kw: "articles blog posts linkedin" },
    { g: "Navigate", t: "Skills & certifications", i: "go", run: goTo("skills"), kw: "stack tools certificates" },
    { g: "Navigate", t: "Contact", i: "go", run: goTo("contact"), kw: "hire reach" }
  ];
  ARTICLES.forEach(function (a, i) {
    COMMANDS.push({ g: "Articles", t: a.title.split(":")[0], i: "doc", hint: a.tag, kw: a.title + " " + a.tag, run: function () { scrollToId("writing"); setTimeout(function () { openReader(i); }, reduceMotion ? 0 : 350); } });
  });
  COMMANDS.push(
    { g: "Files", t: "README.md", i: "doc", run: openFile("README.md"), hint: "about", kw: "about me markdown" },
    { g: "Files", t: "MODEL_CARD.md", i: "doc", run: openFile("MODEL_CARD.md"), hint: "model card", kw: "evaluation benchmarks limitations" },
    { g: "Files", t: "AGENTS.md", i: "doc", run: openFile("AGENTS.md"), hint: "working style", kw: "conventions agents" },
    { g: "Links", t: "Message me on LinkedIn", i: "ext", run: openUrl(LINKEDIN), hint: "linkedin.com", kw: "contact hire" },
    { g: "Links", t: "View GitHub", i: "ext", run: openUrl(GITHUB), hint: "github.com", kw: "code repos" },
    { g: "Links", t: "Download résumé (PDF)", i: "file", run: openUrl(RESUME), kw: "resume cv pdf" },
    { g: "Links", t: "Toggle light / dark theme", i: "theme", run: toggleTheme, kw: "dark light mode" },
    { g: "Links", t: "Copy link to this portfolio", i: "copy", run: function () {
        var url = location.href.split("#")[0];
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast("Link copied"); }, function () { toast(url); });
        else toast(url);
      }, kw: "share url" }
  );
  var palette = $("#palette"), pInput = $("#paletteInput"), pList = $("#paletteList");
  var filtered = [], sel = 0, lastFocus = null;
  function renderPalette() {
    var q = pInput.value.trim().toLowerCase();
    filtered = COMMANDS.filter(function (c) { return !q || (c.t + " " + c.g + " " + (c.kw || "")).toLowerCase().indexOf(q) > -1; });
    sel = Math.min(sel, Math.max(0, filtered.length - 1));
    if (!filtered.length) { pList.innerHTML = '<li class="palette__empty">No results. Try "RAG", "LoRA" or "résumé".</li>'; return; }
    var html = "", group = "";
    filtered.forEach(function (c, i) {
      if (c.g !== group) { group = c.g; html += '<li class="palette__group" role="presentation">' + group + "</li>"; }
      html += '<li class="palette__item" role="option" id="pi-' + i + '" data-i="' + i + '" aria-selected="' + (i === sel) + '">' + ICON[c.i] + "<span>" + escapeHtml(c.t) + "</span>" + (c.hint ? '<span class="hint">' + c.hint + "</span>" : "") + "</li>";
    });
    pList.innerHTML = html;
    pInput.setAttribute("aria-activedescendant", "pi-" + sel);
    var cur = $("#pi-" + sel); if (cur) cur.scrollIntoView({ block: "nearest" });
  }
  function openPalette() {
    lastFocus = document.activeElement;
    palette.hidden = false; pInput.value = ""; sel = 0; renderPalette();
    lock(true);
    setTimeout(function () { pInput.focus(); }, 10);
  }
  function closePalette(restore) {
    if (palette.hidden) return;
    palette.hidden = true; lock(false);
    if (restore !== false && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function runSel() { var c = filtered[sel]; if (!c) return; closePalette(false); c.run(); }
  $$("[data-open-palette]").forEach(function (b) { b.addEventListener("click", openPalette); });
  $$("[data-close-palette]").forEach(function (b) { b.addEventListener("click", function () { closePalette(); }); });
  pInput.addEventListener("input", function () { sel = 0; renderPalette(); });
  pList.addEventListener("click", function (e) { var it = e.target.closest(".palette__item"); if (it) { sel = +it.getAttribute("data-i"); runSel(); } });
  pList.addEventListener("pointermove", function (e) {
    var it = e.target.closest(".palette__item"); if (!it) return;
    var i = +it.getAttribute("data-i"); if (i !== sel) { sel = i; renderPalette(); }
  });

  /* ---------- Global keyboard (topmost overlay wins) ---------- */
  document.addEventListener("keydown", function (e) {
    if (!lb.hidden) {
      if (e.key === "Escape") { e.preventDefault(); closeLightbox(); }
      else if (e.key === "ArrowRight") stepFig(1);
      else if (e.key === "ArrowLeft") stepFig(-1);
      return;
    }
    if (!reader.hidden && e.key === "Escape") { e.preventDefault(); closeReader(); return; }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); palette.hidden ? openPalette() : closePalette(); return; }
    if (!palette.hidden) {
      if (e.key === "Escape") { e.preventDefault(); closePalette(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, filtered.length); renderPalette(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + filtered.length) % Math.max(1, filtered.length); renderPalette(); }
      else if (e.key === "Enter") { e.preventDefault(); runSel(); }
      else if (e.key === "Tab") { e.preventDefault(); pInput.focus(); }
      return;
    }
    if (!chat.hidden && e.key === "Escape") { e.preventDefault(); closeChat(); return; }
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); }
  });
})();
