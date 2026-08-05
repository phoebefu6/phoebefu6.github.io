(() => {
  "use strict";

  const palette = ["#7d3529", "#31584e", "#b17b32", "#4f5661", "#76536d", "#87533d", "#3d625f", "#8d6b2d"];
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
  const hash = (text) => [...String(text)].reduce((total, char) => total + char.codePointAt(0), 0);

  const bookMarkup = (book, index) => {
    const seed = hash(book.title);
    const color = palette[seed % palette.length];
    const width = 48 + (seed % 26);
    const height = Math.max(182, 242 - (index * 3));
    const inProgress = book.status === "in-progress";
    const action = inProgress ? "Continue" : "Read";
    const status = inProgress ? `${Number(book.progress || 0)}% READ` : "FINISHED";
    const notes = Number(book.noteCount || 0);
    const noteDetail = `${notes} total notes · ${Number(book.highlightCount || 0)} highlights · ${Number(book.reviewCount || 0)} thoughts · ${Number(book.bookmarkCount || 0)} bookmarks`;
    return `<a class="shelf-book ${inProgress ? "shelf-book--in-progress" : "shelf-book--finished"}" href="${escapeHtml(book.deepLink)}" target="_blank" rel="noreferrer" aria-label="${action} ${escapeHtml(book.title)} by ${escapeHtml(book.author)} on WeRead" data-title="${escapeHtml(book.title)}" data-author="${escapeHtml(book.author || "Unknown author")}" data-status="${escapeHtml(status)}" data-notes="${escapeHtml(noteDetail)}" style="--book-color:${color};--book-width:${width}px;--book-height:${height}px;--book-delay:${index * 12}ms">
      <span class="shelf-book__top"></span><span class="shelf-book__spine"><small>${escapeHtml(book.author || "Unknown author")}</small><strong>${escapeHtml(book.title)}</strong><i>${inProgress ? `${Number(book.progress || 0)}%` : String(index + 1).padStart(2,"0")}</i></span><span class="shelf-book__pages"></span>
    </a>`;
  };

  const categoryMarkup = (category, index) => {
    const reading = category.books.filter((book) => book.status === "in-progress").length;
    return `<section class="collection-shelf" aria-labelledby="shelf-${escapeHtml(category.id)}">
    <header class="collection-shelf__header"><div><span>${String(index + 1).padStart(2,"0")} · SORTED BY NOTES ↓</span><h2 id="shelf-${escapeHtml(category.id)}">${escapeHtml(category.label)}</h2></div><p>${category.books.length} ${category.books.length === 1 ? "book" : "books"}${reading ? ` · ${reading} reading` : ""}</p></header>
    <div class="collection-shelf__well"><button class="shelf-scroll shelf-scroll--left" type="button" aria-label="Scroll ${escapeHtml(category.label)} left">←</button><div class="collection-books" tabindex="0">${category.books.map(bookMarkup).join("")}</div><button class="shelf-scroll shelf-scroll--right" type="button" aria-label="Scroll ${escapeHtml(category.label)} right">→</button></div>
    <div class="collection-shelf__plank" aria-hidden="true"></div>
  </section>`;
  };

  const setupScrollControls = () => {
    document.querySelectorAll(".collection-shelf:not(.collection-shelf--featured)").forEach((shelf) => {
      const track = shelf.querySelector(".collection-books");
      shelf.querySelector(".shelf-scroll--left").addEventListener("click", () => track.scrollBy({left: -Math.min(track.clientWidth * .72, 620), behavior:"smooth"}));
      shelf.querySelector(".shelf-scroll--right").addEventListener("click", () => track.scrollBy({left: Math.min(track.clientWidth * .72, 620), behavior:"smooth"}));
    });
  };

  const setupTooltips = () => {
    const tooltip = document.createElement("div");
    tooltip.className = "shelf-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);

    const position = (book) => {
      const rect = book.getBoundingClientRect();
      const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      let left = rect.left + (rect.width / 2) - (width / 2);
      left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
      let top = rect.top - height - 14;
      if (top < 12) top = Math.min(window.innerHeight - height - 12, rect.bottom + 14);
      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.max(12, Math.round(top))}px`;
    };

    const show = (book) => {
      tooltip.innerHTML = `<b>${escapeHtml(book.dataset.title || "Untitled")}</b><em>${escapeHtml(book.dataset.author || "Unknown author")}</em><span>${escapeHtml(book.dataset.notes || "No notes")}</span><small>${escapeHtml(book.dataset.status || "")}</small>`;
      tooltip.classList.add("is-visible");
      tooltip.setAttribute("aria-hidden", "false");
      position(book);
    };
    const hide = () => { tooltip.classList.remove("is-visible"); tooltip.setAttribute("aria-hidden", "true"); };

    document.querySelectorAll(".shelf-book").forEach((book) => {
      book.addEventListener("mouseenter", () => show(book));
      book.addEventListener("focus", () => show(book));
      book.addEventListener("mouseleave", hide);
      book.addEventListener("blur", hide);
    });
    document.querySelectorAll(".collection-books").forEach((track) => track.addEventListener("scroll", hide, {passive:true}));
    window.addEventListener("resize", hide, {passive:true});
  };

  fetch("books.json")
    .then((response) => { if (!response.ok) throw new Error(`Unable to load shelf data (${response.status})`); return response.json(); })
    .then((data) => {
      document.querySelector("#finishedCount").textContent = data.publicFinishedCount;
      const inProgressCount = Number(data.inProgressCount || 0);
      document.querySelector("#progressCount").textContent = inProgressCount;
      document.querySelector("#progressCountBlock").hidden = inProgressCount === 0;
      document.querySelector("#categoryCount").textContent = `${data.categories.length} CATEGORIES`;
      document.querySelector("#shelfRows").innerHTML = data.categories.map(categoryMarkup).join("");
      setupScrollControls();
      setupTooltips();
    })
    .catch((error) => {
      document.querySelector("#shelfRows").innerHTML = '<p class="shelf-error">The finished-reading shelf could not load. Please refresh the page.</p>';
      console.error(error);
    });
})();
