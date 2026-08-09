(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
  const nf = new Intl.NumberFormat("en-US");

  const renderHero = (data) => {
    const book = data.book;
    $("#heroAuthor").textContent = book.author;
    $("#heroTitle").textContent = book.title;
    $("#heroByline").textContent = `${book.author} · ${book.publisher}`;
    document.querySelectorAll("#wereadTop, #wereadHero, #wereadFoot").forEach((link) => { link.href = book.deepLink; });

    const total = data.chapters.reduce((sum, chapter) => sum + chapter.highlights.length, 0);
    const stats = [
      ["Finished", book.finished],
      ["My highlights", nf.format(total)],
      ["Chapters marked", `${data.reading.chaptersHighlighted} of ${book.chapterCount}`],
      ["WeRead rating", `${book.rating} · ${nf.format(book.ratingCount)} raters`],
      ["Highlighted over", `${data.reading.firstHighlight} → ${data.reading.lastHighlight}`]
    ];
    $("#notesStats").innerHTML = stats.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
  };

  const renderCrowd = (data) => {
    const peak = Math.max(...data.popular.map((item) => item.readers), 1);
    $("#crowdList").innerHTML = data.popular.map((item, index) => `<li class="crowd-item${item.alsoMine ? " crowd-item--mine" : ""}">
      <div class="crowd-item__rank">${String(index + 1).padStart(2, "0")}</div>
      <div class="crowd-item__body">
        <p class="crowd-item__text">${escapeHtml(item.text)}</p>
        <div class="crowd-item__meta">
          <span class="crowd-item__bar" aria-hidden="true"><i style="--fill:${Math.round((item.readers / peak) * 100)}%"></i></span>
          <span class="crowd-item__count">${nf.format(item.readers)} readers</span>
          ${item.alsoMine ? '<span class="crowd-item__flag">★ I underlined this too</span>' : ""}
          <span class="crowd-item__chapter">${escapeHtml(item.chapter)}</span>
        </div>
      </div>
    </li>`).join("");
  };

  const renderChapters = (data) => {
    // A highlight that the crowd also marked earns its reader count inline.
    const readerCount = new Map(data.popular.map((item) => [item.text, item.readers]));
    const total = data.chapters.reduce((sum, chapter) => sum + chapter.highlights.length, 0);
    $("#mineCount").textContent = `${nf.format(total)} highlights · ${data.chapters.length} chapters`;

    $("#chapterList").innerHTML = data.chapters.map((chapter, index) => {
      const items = chapter.highlights.map((text) => {
        const readers = readerCount.get(text);
        return `<li>${escapeHtml(text)}${readers ? `<span class="note-shared">★ ${nf.format(readers)} readers</span>` : ""}</li>`;
      }).join("");
      return `<details class="chapter-note"${index === 0 ? " open" : ""}>
        <summary><span class="chapter-note__idx">${String(index + 1).padStart(2, "0")}</span><span class="chapter-note__title">${escapeHtml(chapter.title)}</span><span class="chapter-note__count">${chapter.highlights.length}</span></summary>
        <ul class="chapter-note__list">${items}</ul>
      </details>`;
    }).join("");
  };

  const setupExpandAll = () => {
    const button = $("#expandAll");
    button.addEventListener("click", () => {
      const expand = button.getAttribute("aria-pressed") !== "true";
      document.querySelectorAll(".chapter-note").forEach((node) => { node.open = expand; });
      button.setAttribute("aria-pressed", String(expand));
      button.textContent = expand ? "Collapse all chapters" : "Expand all chapters";
    });
  };

  fetch("book-data.json")
    .then((response) => { if (!response.ok) throw new Error(`Unable to load book data (${response.status})`); return response.json(); })
    .then((data) => { renderHero(data); renderCrowd(data); renderChapters(data); setupExpandAll(); })
    .catch((error) => { $("#chapterList").innerHTML = '<p class="shelf-error">These reading notes could not load. Please refresh the page.</p>'; console.error(error); });
})();
