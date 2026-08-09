(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);

  const cardDetails = {
    "Behavior comes from structure": "Step back from a single incident. Track the pattern across time, then identify the stocks, loops, delays, rules, and goals that keep reproducing it.",
    "Elements are not the system": "People and objects are easy to see, yet interconnections and purpose do more to determine behavior. The true goal is revealed by what the system consistently does.",
    "Change the accumulation through its rates": "A stock records the system's condition. Inflows raise it, outflows lower it, and its size determines how quickly intervention can become visible.",
    "The result returns to change the cause": "Reinforcing loops compound movement; balancing loops compare reality with a target. Most complex behavior is a contest among several loops.",
    "The signal arrives after the decision": "When feedback is delayed, decision-makers act on an obsolete picture and often overcorrect. Nonlinearity and hidden limits make the error larger.",
    "Name the trap before choosing the fix": "Policy resistance, escalation, dependence, and metric gaming are not isolated mistakes. They are repeatable structures with repeatable countermoves.",
    "Move from numbers toward intent": "Parameters are visible but weak. Information, rules, self-organization, goals, and paradigms progressively change why the system behaves as it does.",
    "Dance with the system": "Observe first, expose assumptions, test small interventions, monitor consequences, protect what the system already does well, and stay ready to change direction."
  };

  const renderBranch = (branch) => {
    const panel = $("#branchDetail");
    $(".branch-detail__chapter", panel).textContent = branch.chapter;
    $("h3", panel).textContent = branch.label;
    $(".branch-detail__summary", panel).textContent = branch.summary;
    $("ul", panel).innerHTML = branch.notes.map((note) => `<li><div><strong>${escapeHtml(note.title)}</strong><p>${escapeHtml(note.body)}</p></div><small>${escapeHtml(note.cue)}</small></li>`).join("");
    $(".branch-detail__question", panel).innerHTML = `<span>RECALL PROMPT</span>${escapeHtml(branch.question)}`;
  };

  const setupMindmap = (data) => {
    const positions = ["left-top", "left-mid", "left-bottom", "right-top", "right-mid", "right-bottom"];
    const root = $("#mindmapNodes");
    root.innerHTML = data.branches.map((branch, index) => `<button class="pro-node pro-node--${positions[index]}" type="button" data-branch="${escapeHtml(branch.id)}" style="--branch:${escapeHtml(branch.color)}"><span>${String(index + 1).padStart(2,"0")}</span><strong>${escapeHtml(branch.label)}</strong><small>${escapeHtml(branch.notes.map((note) => note.title).slice(0,3).join(" · "))}</small></button>`).join("");
    const branches = new Map(data.branches.map((branch) => [branch.id, branch]));
    const nodes = [...document.querySelectorAll(".pro-node")];
    const activate = (node) => {
      nodes.forEach((item) => item.setAttribute("aria-pressed", "false"));
      node.setAttribute("aria-pressed", "true");
      renderBranch(branches.get(node.dataset.branch));
    };
    nodes.forEach((node) => node.addEventListener("click", () => activate(node)));
    activate(nodes[1]);
  };

  const renderChain = (data) => {
    $("#quoteChain").innerHTML = data.quoteChain.map((item, index) => `<li class="${index === 3 ? "chain__quote" : ""}"><span class="chain__index">${String(index + 1).padStart(2,"0")}</span><div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.text)}</p></div></li>`).join("");
  };

  const renderProperties = (data) => {
    $("#systemProperties").innerHTML = data.systemProperties.map((item, index) => `<article><span>0${index + 1}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.definition)}</p><aside><strong>DESIGN RISK</strong>${escapeHtml(item.risk)}</aside></article>`).join("");
  };

  const renderSurprises = (data) => {
    $("#surprises").innerHTML = data.surprises.map((item, index) => `<article><span>${String(index + 1).padStart(2,"0")}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.explanation)}</p><small><b>TRY</b>${escapeHtml(item.practice)}</small></article>`).join("");
  };

  const renderTraps = (data) => {
    $("#trapsGrid").innerHTML = data.traps.map((trap, index) => `<article class="trap-card"><div class="trap-card__top"><span>${String(index + 1).padStart(2,"0")}</span><h3>${escapeHtml(trap.name)}</h3></div><dl><dt>STRUCTURE</dt><dd>${escapeHtml(trap.pattern)}</dd><dt>VISIBLE SYMPTOM</dt><dd>${escapeHtml(trap.symptom)}</dd><dt>STRUCTURAL MOVE</dt><dd>${escapeHtml(trap.countermove)}</dd></dl></article>`).join("");
  };

  const renderLeverage = (data) => {
    $("#leverageList").innerHTML = data.leveragePoints.map((item) => `<li><span>${String(item.rank).padStart(2,"0")}</span><div><small>${escapeHtml(item.power)} LEVERAGE</small><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.idea)}</p></div></li>`).join("");
  };

  const renderChapters = (data) => {
    $("#chapterGuide").innerHTML = data.chapterGuide.map((item) => `<article><span>${escapeHtml(item.part)}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.learn)}</p><small>${escapeHtml(item.question)}</small></div></article>`).join("");
  };

  const renderPractices = (data) => {
    $("#practiceList").innerHTML = data.practices.map((practice, index) => `<li><span>${String(index + 1).padStart(2,"0")}</span><p>${escapeHtml(practice)}</p></li>`).join("");
  };

  const renderToolkit = (data) => {
    $("#toolkit").innerHTML = data.toolkit.map((item) => `<article><span>${escapeHtml(item.step)}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.prompt)}</p></article>`).join("");
  };

  const renderGlossary = (data) => {
    $("#glossary").innerHTML = data.glossary.map((item) => `<div><dt>${escapeHtml(item.term)}</dt><dd>${escapeHtml(item.meaning)}</dd></div>`).join("");
  };

  const renderCards = (data) => {
    const root = $("#knowledgeCards");
    root.innerHTML = data.cards.map((card) => `<article class="knowledge-card" tabindex="0" role="button" aria-expanded="false"><span class="knowledge-card__number">${escapeHtml(card.id)}</span><span class="knowledge-card__kicker">${escapeHtml(card.kicker)}</span><h3>${escapeHtml(card.title)}</h3><p class="knowledge-card__subtitle">${escapeHtml(card.subtitle)}</p><p class="knowledge-card__detail">${escapeHtml(cardDetails[card.title] || card.takeaway)}</p><p class="knowledge-card__takeaway">${escapeHtml(card.takeaway)}</p></article>`).join("");
    root.querySelectorAll(".knowledge-card").forEach((card) => {
      const toggle = () => card.setAttribute("aria-expanded", String(card.getAttribute("aria-expanded") !== "true"));
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggle(); } });
    });
  };

  const renderComparison = (data) => {
    const c = data.comparison;
    $("#comparisonGrid").innerHTML = `<article><span>DEFAULT MODE</span><h3>${escapeHtml(c.left.label)}</h3><ul>${c.left.traits.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></article><div class="comparison-arrow" aria-hidden="true">→</div><article class="comparison-grid__system"><span>STRUCTURAL MODE</span><h3>${escapeHtml(c.right.label)}</h3><ul>${c.right.traits.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></article><p class="comparison-conclusion">${escapeHtml(c.conclusion)}</p>`;
  };

  const renderRecall = (data) => {
    const root = $("#recallList");
    root.innerHTML = data.memoryPrompts.map((item, index) => `<article class="recall-item"><button type="button" aria-expanded="false"><span>${String(index + 1).padStart(2,"0")}</span><strong>${escapeHtml(item.question)}</strong><i aria-hidden="true">＋</i></button><div class="recall-answer">${escapeHtml(item.answer)}</div></article>`).join("");
    root.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => button.setAttribute("aria-expanded", String(button.getAttribute("aria-expanded") !== "true"))));
  };

  // POSTER 01 — the leverage staircase.
  // Step width encodes how easy an intervention is, step height how much it actually changes.
  // The two run in opposite directions, which is the whole argument.
  const SAND = [232, 213, 176];
  const RUST = [125, 47, 29];
  const INK_DARK = [36, 19, 9];
  const INK_LIGHT = [253, 246, 233];
  const mix = (from, to, t) => from.map((channel, index) => Math.round(channel + (to[index] - channel) * t));
  const toHex = (rgb) => `#${rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  const luminance = (rgb) => {
    const parts = rgb.map((channel) => {
      const v = channel / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * parts[0] + 0.7152 * parts[1] + 0.0722 * parts[2];
  };
  const contrast = (a, b) => {
    const [hi, lo] = luminance(a) > luminance(b) ? [luminance(a), luminance(b)] : [luminance(b), luminance(a)];
    return (hi + 0.05) / (lo + 0.05);
  };
  // Pick whichever ink actually reads better on this step, rather than guessing a threshold.
  const inkFor = (background) => (contrast(INK_DARK, background) >= contrast(INK_LIGHT, background) ? INK_DARK : INK_LIGHT);

  const renderStaircase = (data) => {
    const points = [...data.leveragePoints].sort((a, b) => b.rank - a.rank); // 12 (weakest) → 1 (strongest)
    const W = 1180, H = 620, base = H - 78, top = 74;
    const gap = 6;
    const widthUnits = points.reduce((total, item) => total + item.rank + 8, 0);
    const usable = W - 96 - (gap * (points.length - 1));
    let x = 78;

    const steps = points.map((item) => {
      const t = Math.pow((13 - item.rank) / 12, 1.4);          // leverage, nonlinear
      const width = ((item.rank + 8) / widthUnits) * usable;    // ease of intervention
      const height = 34 + t * (base - top - 34);
      const swatch = mix(SAND, RUST, t);
      const fill = toHex(swatch);
      const ink = toHex(inkFor(swatch));
      const y = base - height;
      const cx = x + width / 2;
      // A rotated label sits inside its step only when the step is tall enough AND the best
      // available ink clears WCAG AA there. Mid-ramp swatches fail that test, so those labels
      // rise into the empty space above the step, where light ink on the dark ground is safe.
      const needed = item.name.length * 7.6 + 22;
      const fitsAbove = y - 12 - needed > 4; // stays inside the viewBox
      const inside = needed <= height && (contrast(inkFor(swatch), swatch) >= 4.5 || !fitsAbove);
      const anchorY = inside ? base - 14 : y - 12;
      const labelInk = inside ? ink : toHex(INK_LIGHT);
      const label = `<text class="poster-step__name" x="${cx.toFixed(1)}" y="${anchorY.toFixed(1)}" fill="${labelInk}" transform="rotate(-90 ${cx.toFixed(1)} ${anchorY.toFixed(1)})">${escapeHtml(item.name)}</text>`;
      const markup = `<g class="poster-step">
        <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${width.toFixed(1)}" height="${height.toFixed(1)}" fill="${fill}" rx="2" />
        <text class="poster-step__rank" x="${cx.toFixed(1)}" y="${(base + 26).toFixed(1)}" fill="#cba36a">${String(item.rank).padStart(2, "0")}</text>
        ${label}
      </g>`;
      x += width + gap;
      return markup;
    }).join("");

    const fallback = points.map((item) => `<li>${String(item.rank).padStart(2, "0")} · ${escapeHtml(item.name)} — ${escapeHtml(item.power)} leverage. ${escapeHtml(item.idea)}</li>`).join("");

    $("#leverageStaircase").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="staircase-svg-title staircase-svg-desc" preserveAspectRatio="xMidYMid meet">
        <title id="staircase-svg-title">The twelve leverage points, ranked by how much they change a system</title>
        <desc id="staircase-svg-desc">A stepped chart rising from left to right. Each step is one leverage point. Step width shows how easy the intervention is to make; step height shows how much it changes the system. The widest, shortest step is number twelve, constants and parameters. The narrowest, tallest step is number one, transcending paradigms.</desc>
        <line x1="60" y1="${base}" x2="${W - 30}" y2="${base}" stroke="rgba(240,222,193,.28)" stroke-width="1" />
        <text class="poster-axis" x="60" y="${base + 52}" fill="rgba(240,222,193,.5)">EASIEST TO CHANGE · LEAST EFFECT</text>
        <text class="poster-axis poster-axis--end" x="${W - 30}" y="${base + 52}" fill="rgba(240,222,193,.5)">HARDEST TO CHANGE · MOST EFFECT</text>
        <text class="poster-axis" x="60" y="${top - 28}" fill="rgba(240,222,193,.5)">LEVERAGE ↑</text>
        ${steps}
      </svg>
      <ol class="visually-hidden">${fallback}</ol>`;
  };

  // POSTER 02 — the eight traps as hazard placards.
  // Each sparkline is that trap's characteristic behavior-over-time curve.
  const trapCurves = {
    "Policy resistance": {paths: [{d: "M3 21 L16 11 L29 31 L42 12 L55 29 L68 13 L81 27 L94 15 L107 24 L117 20"}], caption: "Effort spikes; the stock barely moves."},
    "Tragedy of the commons": {paths: [{d: "M3 34 C31 30 47 7 63 9 C79 11 85 31 117 38"}], caption: "Shared stock rises, then collapses."},
    "Drift to low performance": {paths: [{d: "M3 8 L21 8 L21 15 L43 15 L43 22 L65 22 L65 29 L87 29 L87 35 L117 35"}], caption: "Each new normal is lower than the last."},
    "Escalation": {paths: [{d: "M3 37 L117 5"}, {d: "M3 35 L117 11", dashed: true}], caption: "Two parties race each other upward."},
    "Success to the successful": {paths: [{d: "M3 20 C41 18 71 10 117 4"}, {d: "M3 20 C41 22 71 31 117 37", dashed: true}], caption: "Winners compound; losers starve."},
    "Shifting the burden": {paths: [{d: "M3 12 L18 10 L22 21 L35 19 L39 28 L51 26 L55 34 L67 32 L71 38 L117 39"}], caption: "Each rescue leaves the system weaker."},
    "Rule beating": {paths: [{d: "M3 31 C31 12 45 8 61 8 L117 8"}, {d: "M3 29 C41 31 71 35 117 38", dashed: true}], caption: "The target is met; the outcome is not."},
    "Seeking the wrong goal": {paths: [{d: "M3 33 C41 27 71 13 117 6"}, {d: "M3 12 C41 18 71 31 117 37", dashed: true}], caption: "The metric improves while reality worsens."}
  };
  const fallbackCurve = {paths: [{d: "M3 20 L117 20"}], caption: "Behavior over time."};

  const renderPlacards = (data) => {
    $("#trapPlacards").innerHTML = data.traps.map((trap, index) => {
      const curve = trapCurves[trap.name] || fallbackCurve;
      const lines = curve.paths.map((path) => `<path d="${path.d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${path.dashed ? ' stroke-dasharray="4 3" opacity=".62"' : ""} />`).join("");
      return `<article class="placard">
        <div class="placard__head">
          <svg class="placard__hazard" viewBox="0 0 24 22" aria-hidden="true"><path d="M12 2 L23 20 H1 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 8 V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1.2" fill="currentColor"/></svg>
          <span class="placard__number">TRAP ${String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 class="placard__name">${escapeHtml(trap.name)}</h3>
        <figure class="placard__chart">
          <svg viewBox="0 0 120 42" role="img" aria-label="Behavior over time: ${escapeHtml(curve.caption)}" preserveAspectRatio="none">${lines}</svg>
          <figcaption>${escapeHtml(curve.caption)}</figcaption>
        </figure>
        <dl class="placard__body">
          <dt>SYMPTOM</dt><dd>${escapeHtml(trap.symptom)}</dd>
          <dt>THE WAY OUT</dt><dd>${escapeHtml(trap.countermove)}</dd>
        </dl>
      </article>`;
    }).join("");
  };

  fetch("book-map.json")
    .then((response) => { if (!response.ok) throw new Error(`Unable to load book data (${response.status})`); return response.json(); })
    .then((data) => {
      renderChain(data); setupMindmap(data); renderProperties(data); renderSurprises(data); renderTraps(data); renderLeverage(data); renderChapters(data); renderPractices(data); renderToolkit(data); renderGlossary(data); renderCards(data); renderComparison(data); renderRecall(data); renderStaircase(data); renderPlacards(data);
    })
    .catch((error) => { $("#knowledgeCards").innerHTML = `<p class="load-error">The knowledge atlas could not load. Please refresh the page.</p>`; console.error(error); });
})();
