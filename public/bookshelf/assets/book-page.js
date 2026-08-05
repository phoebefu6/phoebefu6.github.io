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

  fetch("book-map.json")
    .then((response) => { if (!response.ok) throw new Error(`Unable to load book data (${response.status})`); return response.json(); })
    .then((data) => {
      renderChain(data); setupMindmap(data); renderProperties(data); renderSurprises(data); renderTraps(data); renderLeverage(data); renderChapters(data); renderPractices(data); renderToolkit(data); renderGlossary(data); renderCards(data); renderComparison(data); renderRecall(data);
    })
    .catch((error) => { $("#knowledgeCards").innerHTML = `<p class="load-error">The knowledge atlas could not load. Please refresh the page.</p>`; console.error(error); });
})();
