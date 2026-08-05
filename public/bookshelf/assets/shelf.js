(() => {
  "use strict";

  const palette = ["#7d3529", "#31584e", "#b17b32", "#4f5661", "#76536d", "#87533d", "#3d625f", "#8d6b2d"];
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
  const hash = (text) => [...String(text)].reduce((total, char) => total + char.codePointAt(0), 0);

  const bookMarkup = (book, index) => {
    const seed = hash(book.title);
    const color = palette[seed % palette.length];
    const width = 48 + (seed % 26);
    const height = 182 + (seed % 58);
    return `<a class="shelf-book" href="${escapeHtml(book.deepLink)}" target="_blank" rel="noreferrer" aria-label="Read ${escapeHtml(book.title)} by ${escapeHtml(book.author)} on WeRead" style="--book-color:${color};--book-width:${width}px;--book-height:${height}px;--book-delay:${index * 12}ms">
      <span class="shelf-book__top"></span><span class="shelf-book__spine"><small>${escapeHtml(book.author || "Unknown author")}</small><strong>${escapeHtml(book.title)}</strong><i>${String(index + 1).padStart(2,"0")}</i></span><span class="shelf-book__pages"></span>
      <span class="shelf-book__meta"><b>${escapeHtml(book.title)}</b><em>${escapeHtml(book.author || "Unknown author")}</em><small>READ ON WEREAD →</small></span>
    </a>`;
  };

  const categoryMarkup = (category, index) => `<section class="collection-shelf" aria-labelledby="shelf-${escapeHtml(category.id)}">
    <header class="collection-shelf__header"><div><span>${String(index + 1).padStart(2,"0")} · FINISHED READING</span><h2 id="shelf-${escapeHtml(category.id)}">${escapeHtml(category.label)}</h2></div><p>${category.books.length} ${category.books.length === 1 ? "book" : "books"}</p></header>
    <div class="collection-shelf__well"><button class="shelf-scroll shelf-scroll--left" type="button" aria-label="Scroll ${escapeHtml(category.label)} left">←</button><div class="collection-books" tabindex="0">${category.books.map(bookMarkup).join("")}</div><button class="shelf-scroll shelf-scroll--right" type="button" aria-label="Scroll ${escapeHtml(category.label)} right">→</button></div>
    <div class="collection-shelf__plank" aria-hidden="true"></div>
  </section>`;

  const setupScrollControls = () => {
    document.querySelectorAll(".collection-shelf:not(.collection-shelf--featured)").forEach((shelf) => {
      const track = shelf.querySelector(".collection-books");
      shelf.querySelector(".shelf-scroll--left").addEventListener("click", () => track.scrollBy({left: -Math.min(track.clientWidth * .72, 620), behavior:"smooth"}));
      shelf.querySelector(".shelf-scroll--right").addEventListener("click", () => track.scrollBy({left: Math.min(track.clientWidth * .72, 620), behavior:"smooth"}));
    });
  };

  fetch("books.json")
    .then((response) => { if (!response.ok) throw new Error(`Unable to load shelf data (${response.status})`); return response.json(); })
    .then((data) => {
      document.querySelector("#finishedCount").textContent = data.publicFinishedCount;
      document.querySelector("#categoryCount").textContent = `${data.categories.length} CATEGORIES`;
      document.querySelector("#shelfRows").innerHTML = data.categories.map(categoryMarkup).join("");
      setupScrollControls();
    })
    .catch((error) => {
      document.querySelector("#shelfRows").innerHTML = '<p class="shelf-error">The finished-reading shelf could not load. Please refresh the page.</p>';
      console.error(error);
    });
})();
