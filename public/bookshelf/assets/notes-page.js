(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (v) => String(v).replace(/[&<>'"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);
  const nf = new Intl.NumberFormat("zh-CN");
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── reveal on scroll ─────────────────────────────── */
  const revealer = REDUCED ? null : new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); revealer.unobserve(e.target); } });
  }, {rootMargin: "0px 0px -8% 0px", threshold: .08});

  const watchReveals = (root = document) => {
    const targets = $$("[data-reveal]", root);
    if (!revealer || !("IntersectionObserver" in window)) { targets.forEach((el) => el.classList.add("is-in")); return; }
    // Opt in to the hidden start state only now that we know we can undo it.
    document.documentElement.classList.add("js-reveal");
    targets.forEach((el, i) => {
      if (!el.style.getPropertyValue("--delay")) el.style.setProperty("--delay", `${Math.min(i, 6) * 70}ms`);
      revealer.observe(el);
    });
    // Backstop: if the observer never delivers (paused/background tab), show everything.
    setTimeout(() => targets.forEach((el) => el.classList.add("is-in")), 2500);
  };

  /* ── count-up numbers ─────────────────────────────── */
  const countUp = (el, target, suffix = "") => {
    const final = nf.format(target) + suffix;
    if (REDUCED || target > 5000) { el.textContent = final; return; }
    const dur = 900, start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = nf.format(Math.round(target * eased)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // Safety net: rAF is paused in background tabs, so an interrupted run could leave a
    // partial number on screen forever. setTimeout still fires, so the value always settles.
    setTimeout(() => { el.textContent = final; }, dur + 250);
  };

  /* ── hero ─────────────────────────────────────────── */
  const renderHero = (data) => {
    const b = data.book;
    const img = $("#coverImg");
    img.src = b.cover;
    img.alt = `《${b.title}》封面`;
    img.addEventListener("error", () => { img.closest(".np-cover").classList.add("is-fallback"); img.remove(); }, {once: true});

    $("#finishedOn").textContent = b.finished;
    $("#byline").textContent = `${b.author} · ${b.publisher} · ${b.category}`;
    document.title = `${b.title} · 读书笔记`;
    $$("#wereadTop, #wereadFoot").forEach((a) => { a.href = b.deepLink; });

    const total = data.chapters.reduce((s, c) => s + c.highlights.length, 0);
    const metrics = [
      {v: total, label: "我的划线", n: true},
      {v: data.chapters.length, label: `章节 / 共 ${b.chapterCount} 章`, n: true},
      {v: b.rating, label: `微信读书评分 · ${nf.format(b.ratingCount)} 人`, n: false},
      {v: data.reading.popularTotal, label: "全书热门划线", n: true}
    ];
    // The final value is what ships in the markup — the count-up is a pure enhancement that
    // replays it. If the observer never fires (background tab, no IO support), the numbers
    // are still correct rather than stuck at zero.
    $("#metrics").innerHTML = metrics.map((m) => `<li><b${m.n ? ` data-target="${m.v}"` : ""}>${m.n ? nf.format(m.v) : esc(m.v)}</b><span>${esc(m.label)}</span></li>`).join("");
    if (REDUCED || !("IntersectionObserver" in window)) return;

    const strip = $("#metrics");
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        $$("b[data-target]", strip).forEach((el) => { const t = Number(el.dataset.target); if (t) countUp(el, t); });
      });
    }, {threshold: .4});
    io.observe(strip);
  };

  /* ── cover tilt (pointer) + parallax (scroll) ─────── */
  const setupCover = () => {
    if (REDUCED) return;
    const wrap = $("#coverTilt"), card = $(".np-cover", wrap);
    if (!wrap || !card) return;
    let raf = null, tx = 0, ty = 0;
    const apply = () => { card.style.transform = `rotateY(${tx}deg) rotateX(${ty}deg)`; raf = null; };
    wrap.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const r = wrap.getBoundingClientRect();
      tx = (((e.clientX - r.left) / r.width) - .5) * 16;
      ty = (.5 - ((e.clientY - r.top) / r.height)) * 16;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    wrap.addEventListener("pointerleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });
  };

  /* ── crowd: podium + heat list ────────────────────── */
  const renderCrowd = (data) => {
    const items = [...data.popular].sort((a, b) => b.readers - a.readers);
    const peak = Math.max(...items.map((i) => i.readers), 1);
    const top = items.slice(0, 3), rest = items.slice(3);

    $("#podium").innerHTML = top.map((it, i) => `<article class="np-card" data-reveal style="--heat:${(it.readers / peak).toFixed(3)}">
      <div class="np-card__rank">${String(i + 1).padStart(2, "0")}</div>
      <p class="np-card__text">${esc(it.text)}</p>
      <div class="np-card__foot">
        <span class="np-card__readers">${nf.format(it.readers)} 人划线</span>
        ${it.alsoMine ? '<span class="np-card__mine">我也划了</span>' : ""}
        <span class="np-card__chapter">${esc(it.chapter)}</span>
      </div>
    </article>`).join("");

    $("#heatList").innerHTML = rest.map((it, i) => `<li class="${it.alsoMine ? "is-mine" : ""}" style="--heat:${(it.readers / peak).toFixed(3)}">
      <span class="np-heat__rank">${String(i + 4).padStart(2, "0")}</span>
      <p class="np-heat__text">${esc(it.text)}</p>
      <span class="np-heat__meta"><b class="np-heat__readers">${nf.format(it.readers)}</b> 人划线</span>
    </li>`).join("");

    if (REDUCED) { $$("#heatList li").forEach((li) => li.classList.add("is-in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), {threshold: .3});
    $$("#heatList li").forEach((li) => io.observe(li));
  };

  /* ── my highlights: chapters + TOC + search ───────── */
  let chapterData = [];
  let readerBy = new Map();

  const chapterMarkup = (chapter, index, query) => {
    const densest = Math.max(...chapterData.map((c) => c.highlights.length), 1);
    const hits = chapter.highlights.filter((h) => !query || h.toLowerCase().includes(query));
    if (query && !hits.length) return "";
    const items = (query ? hits : chapter.highlights).map((text) => {
      const readers = readerBy.get(text);
      let body = esc(text);
      if (query) {
        const i = text.toLowerCase().indexOf(query);
        if (i > -1) body = `${esc(text.slice(0, i))}<mark>${esc(text.slice(i, i + query.length))}</mark>${esc(text.slice(i + query.length))}`;
      }
      return `<li>${body}${readers ? `<span class="np-shared">★ ${nf.format(readers)} 人</span>` : ""}</li>`;
    }).join("");
    return `<details class="np-ch" id="ch-${index}" data-index="${index}"${query || index === 0 ? " open" : ""}>
      <summary>
        <span class="np-ch__n">${String(index + 1).padStart(2, "0")}</span>
        <span class="np-ch__t">${esc(chapter.title)}</span>
        <span class="np-ch__bar" aria-hidden="true" style="--d:${(chapter.highlights.length / densest).toFixed(3)}"><i></i></span>
        <span class="np-ch__c">${query ? `${hits.length}/${chapter.highlights.length}` : chapter.highlights.length}</span>
        <span class="np-ch__chev" aria-hidden="true">⌄</span>
      </summary>
      <div class="np-ch__body"><ol>${items}</ol></div>
    </details>`;
  };

  const renderChapters = (query = "") => {
    const q = query.trim().toLowerCase();
    const html = chapterData.map((c, i) => chapterMarkup(c, i, q)).join("");
    const list = $("#chapterList");
    list.innerHTML = html || `<p class="np-empty">没有找到包含「${esc(query)}」的划线。</p>`;

    const matched = q ? chapterData.reduce((s, c) => s + c.highlights.filter((h) => h.toLowerCase().includes(q)).length, 0) : 0;
    $("#searchStatus").textContent = q ? `${matched} 条划线 · ${$$(".np-ch", list).length} 章` : "";
    $("#searchClear").hidden = !q;
    buildToc(q);
    syncTocSpy();
  };

  const buildToc = (query) => {
    const visible = $$(".np-ch").map((el) => Number(el.dataset.index));
    $("#tocList").innerHTML = chapterData.map((c, i) => {
      if (query && !visible.includes(i)) return "";
      return `<li><button type="button" data-goto="${i}"><span>${esc(c.title)}</span><span class="np-toc__n">${c.highlights.length}</span></button></li>`;
    }).join("");
  };

  const syncTocSpy = () => {
    if (spy) spy.disconnect();
    if (REDUCED) return;
    spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const idx = e.target.dataset.index;
        $$("#tocList button").forEach((b) => b.classList.toggle("is-active", b.dataset.goto === idx));
      });
    }, {rootMargin: "-80px 0px -60% 0px", threshold: 0});
    $$(".np-ch").forEach((el) => spy.observe(el));
  };
  let spy = null;

  const setupMineControls = () => {
    const input = $("#searchInput");
    let t = null;
    input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => renderChapters(input.value), 140); });
    $("#searchClear").addEventListener("click", () => { input.value = ""; renderChapters(""); input.focus(); });

    $("#tocList").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-goto]");
      if (!btn) return;
      const target = $(`#ch-${btn.dataset.goto}`);
      if (!target) return;
      target.open = true;
      const y = target.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({top: y, behavior: REDUCED ? "auto" : "smooth"});
    });

    const toggle = $("#expandAll");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-pressed") !== "true";
      $$(".np-ch").forEach((d) => { d.open = open; });
      toggle.setAttribute("aria-pressed", String(open));
      toggle.textContent = open ? "收起全部章节" : "展开全部章节";
    });
  };

  /* ── sticky bar, progress, section spy ────────────── */
  const setupChrome = () => {
    const bar = $("#topBar"), fill = $("#progressBar");
    // Deliberately not rAF-batched: this is two style writes, and an rAF guard
    // deadlocks if the first frame never arrives (a page loaded in a background tab).
    const onScroll = () => {
      const y = window.scrollY;
      bar.classList.toggle("is-stuck", y > 120);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = `${max > 0 ? Math.min((y / max) * 100, 100) : 0}%`;
    };
    window.addEventListener("scroll", onScroll, {passive: true});
    onScroll();

    const links = $$(".np-bar__nav a");
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
      });
    }, {rootMargin: "-45% 0px -50% 0px", threshold: 0});
    sections.forEach((s) => io.observe(s));
  };

  /* ── boot ─────────────────────────────────────────── */
  fetch("book-data.json")
    .then((r) => { if (!r.ok) throw new Error(`book-data.json ${r.status}`); return r.json(); })
    .then((data) => {
      chapterData = data.chapters;
      readerBy = new Map(data.popular.map((p) => [p.text, p.readers]));
      renderHero(data);
      setupCover();
      renderCrowd(data);
      renderChapters("");
      setupMineControls();
      setupChrome();
      watchReveals();
    })
    .catch((err) => {
      $("#chapterList").innerHTML = '<p class="np-empty">读书笔记加载失败，请刷新页面。</p>';
      console.error(err);
    });
})();
