(() => {
  "use strict";

  const ORDER_KEY = "phoebe-knowledge-shelf-order:v1";
  const palette = ["#7d3529", "#31584e", "#b17b32", "#4f5661", "#76536d", "#87533d", "#3d625f", "#8d6b2d"];
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
  const hash = (text) => [...String(text)].reduce((total, char) => total + char.codePointAt(0), 0);

  const readOrders = () => {
    try { return JSON.parse(localStorage.getItem(ORDER_KEY) || "{}"); }
    catch { return {}; }
  };
  const writeOrders = (orders) => {
    try { localStorage.setItem(ORDER_KEY, JSON.stringify(orders)); }
    catch (error) { console.warn("Shelf order could not be saved", error); }
  };
  const orderedBooks = (category) => {
    const saved = readOrders()[category.id];
    if (!Array.isArray(saved)) return category.books;
    const books = new Map(category.books.map((book) => [String(book.bookId), book]));
    const known = saved.map((id) => books.get(String(id))).filter(Boolean);
    const placed = new Set(known.map((book) => String(book.bookId)));
    return [...known, ...category.books.filter((book) => !placed.has(String(book.bookId)))];
  };

  const bookMarkup = (book, index, categoryId) => {
    const seed = hash(book.title);
    const color = palette[seed % palette.length];
    const width = 48 + (seed % 26);
    const height = Math.max(182, 242 - (index * 3));
    const inProgress = book.status === "in-progress";
    const action = inProgress ? "Continue" : "Read";
    const status = inProgress ? `${Number(book.progress || 0)}% READ` : "FINISHED";
    return `<a class="shelf-book ${inProgress ? "shelf-book--in-progress" : "shelf-book--finished"}" href="${escapeHtml(book.deepLink)}" target="_blank" rel="noreferrer" draggable="true" aria-label="${action} ${escapeHtml(book.title)} by ${escapeHtml(book.author)} on WeRead. Drag to rearrange, or press Alt plus an arrow key." aria-keyshortcuts="Alt+ArrowLeft Alt+ArrowRight" data-book-id="${escapeHtml(book.bookId)}" data-category-id="${escapeHtml(categoryId)}" data-title="${escapeHtml(book.title)}" data-author="${escapeHtml(book.author || "Unknown author")}" data-status="${escapeHtml(status)}" data-notes="Personal position saved on this device" style="--book-color:${color};--book-width:${width}px;--book-height:${height}px;--book-delay:${index * 12}ms">
      <span class="shelf-book__top"></span><span class="shelf-book__spine"><small>${escapeHtml(book.author || "Unknown author")}</small><strong>${escapeHtml(book.title)}</strong><i>${inProgress ? `${Number(book.progress || 0)}%` : String(index + 1).padStart(2,"0")}</i></span><span class="shelf-book__pages"></span>
    </a>`;
  };
  const categoryMarkup = (category, index) => {
    const books = orderedBooks(category);
    const reading = category.books.filter((book) => book.status === "in-progress").length;
    return `<section class="collection-shelf" aria-labelledby="shelf-${escapeHtml(category.id)}">
    <header class="collection-shelf__header"><div><span>${String(index + 1).padStart(2,"0")} · PERSONAL ORDER</span><h2 id="shelf-${escapeHtml(category.id)}">${escapeHtml(category.label)}</h2></div><div class="shelf-arrange"><p>${category.books.length} ${category.books.length === 1 ? "book" : "books"}${reading ? ` · ${reading} reading` : ""} · DRAG TO ARRANGE</p><button class="shelf-reset" type="button" data-category-id="${escapeHtml(category.id)}">Reset note order</button></div></header>
    <div class="collection-shelf__well"><button class="shelf-scroll shelf-scroll--left" type="button" aria-label="Scroll ${escapeHtml(category.label)} left">←</button><div class="collection-books" tabindex="0" data-category-id="${escapeHtml(category.id)}">${books.map((book, bookIndex) => bookMarkup(book, bookIndex, category.id)).join("")}</div><button class="shelf-scroll shelf-scroll--right" type="button" aria-label="Scroll ${escapeHtml(category.label)} right">→</button></div>
    <div class="collection-shelf__plank" aria-hidden="true"></div></section>`;
  };

  let shelfData;
  let saveTimer;
  let suppressNextClick = false;
  const announceSaved = (message = "Shelf order saved") => {
    const status = document.querySelector("#shelfSaveStatus");
    status.textContent = message;
    status.classList.add("is-visible");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => status.classList.remove("is-visible"), 1800);
  };
  const updateVisualOrder = (track) => {
    [...track.querySelectorAll(".shelf-book")].forEach((book, index) => {
      book.style.setProperty("--book-height", `${Math.max(182, 242 - (index * 3))}px`);
      if (book.classList.contains("shelf-book--finished")) book.querySelector(".shelf-book__spine i").textContent = String(index + 1).padStart(2, "0");
    });
  };
  const saveTrack = (track) => {
    const orders = readOrders();
    orders[track.dataset.categoryId] = [...track.querySelectorAll(".shelf-book")].map((book) => book.dataset.bookId);
    writeOrders(orders);
    updateVisualOrder(track);
    announceSaved();
  };
  const moveBookNearPointer = (track, dragging, clientX) => {
    const target = [...track.querySelectorAll(".shelf-book:not(.is-dragging)")].find((book) => {
      const rect = book.getBoundingClientRect();
      return clientX < rect.left + rect.width / 2;
    });
    track.insertBefore(dragging, target || null);
    const bounds = track.getBoundingClientRect();
    if (clientX < bounds.left + 54) track.scrollLeft -= 18;
    if (clientX > bounds.right - 54) track.scrollLeft += 18;
  };

  const setupDragAndDrop = () => {
    document.querySelectorAll(".collection-books[data-category-id]").forEach((track) => {
      let dragging = null;
      let changed = false;
      let touch = null;
      track.addEventListener("dragstart", (event) => {
        dragging = event.target.closest(".shelf-book");
        if (!dragging) return;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", dragging.dataset.bookId);
        dragging.classList.add("is-dragging");
        track.classList.add("is-arranging");
      });
      track.addEventListener("dragover", (event) => {
        if (!dragging) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        moveBookNearPointer(track, dragging, event.clientX);
        changed = true;
      });
      track.addEventListener("drop", (event) => event.preventDefault());
      track.addEventListener("dragend", () => {
        if (!dragging) return;
        dragging.classList.remove("is-dragging");
        track.classList.remove("is-arranging");
        if (changed) { suppressNextClick = true; saveTrack(track); }
        dragging = null;
        changed = false;
      });
      track.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse") return;
        const book = event.target.closest(".shelf-book");
        if (!book) return;
        touch = {book, x:event.clientX, active:false, timer:setTimeout(() => {
          touch.active = true;
          book.classList.add("is-dragging", "is-touch-dragging");
          track.classList.add("is-arranging");
          book.setPointerCapture(event.pointerId);
        }, 320)};
      });
      track.addEventListener("pointermove", (event) => {
        if (!touch) return;
        if (!touch.active && Math.abs(event.clientX - touch.x) > 8) { clearTimeout(touch.timer); touch = null; return; }
        if (!touch.active) return;
        event.preventDefault();
        moveBookNearPointer(track, touch.book, event.clientX);
        changed = true;
      }, {passive:false});
      const finishTouch = () => {
        if (!touch) return;
        clearTimeout(touch.timer);
        if (touch.active) {
          touch.book.classList.remove("is-dragging", "is-touch-dragging");
          track.classList.remove("is-arranging");
          suppressNextClick = true;
          if (changed) saveTrack(track);
        }
        touch = null;
        changed = false;
      };
      track.addEventListener("pointerup", finishTouch);
      track.addEventListener("pointercancel", finishTouch);
      track.addEventListener("keydown", (event) => {
        if (!event.altKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        const book = event.target.closest(".shelf-book");
        if (!book) return;
        event.preventDefault();
        const sibling = event.key === "ArrowLeft" ? book.previousElementSibling : book.nextElementSibling;
        if (!sibling) return;
        if (event.key === "ArrowLeft") track.insertBefore(book, sibling);
        else track.insertBefore(sibling, book);
        book.focus();
        saveTrack(track);
      });
    });
  };

  const setupResetControls = () => {
    document.querySelector("#shelfRows").addEventListener("click", (event) => {
      if (suppressNextClick && event.target.closest(".shelf-book")) { event.preventDefault(); suppressNextClick = false; return; }
      const reset = event.target.closest(".shelf-reset");
      if (!reset) return;
      const orders = readOrders();
      delete orders[reset.dataset.categoryId];
      writeOrders(orders);
      renderShelves();
      announceSaved("Note-based order restored");
    });
  };

  const setupScrollControls = () => {
    document.querySelectorAll(".collection-shelf:not(.collection-shelf--featured)").forEach((shelf) => {
      const track = shelf.querySelector(".collection-books");
      shelf.querySelector(".shelf-scroll--left").addEventListener("click", () => track.scrollBy({left:-Math.min(track.clientWidth * .72, 620), behavior:"smooth"}));
      shelf.querySelector(".shelf-scroll--right").addEventListener("click", () => track.scrollBy({left:Math.min(track.clientWidth * .72, 620), behavior:"smooth"}));
    });
  };
  const setupTooltips = () => {
    document.querySelector(".shelf-tooltip")?.remove();
    const tooltip = document.createElement("div");
    tooltip.className = "shelf-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);
    const position = (book) => {
      const rect = book.getBoundingClientRect();
      const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      let left = Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12));
      let top = rect.top - height - 14;
      if (top < 12) top = Math.min(window.innerHeight - height - 12, rect.bottom + 14);
      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.max(12, Math.round(top))}px`;
    };
    const show = (book) => {
      if (book.classList.contains("is-dragging")) return;
      tooltip.innerHTML = `<b>${escapeHtml(book.dataset.title || "Untitled")}</b><em>${escapeHtml(book.dataset.author || "Unknown author")}</em><span>${escapeHtml(book.dataset.notes || "No notes")}</span><small>${escapeHtml(book.dataset.status || "")}</small>`;
      tooltip.classList.add("is-visible");
      tooltip.setAttribute("aria-hidden", "false");
      position(book);
    };
    const hide = () => { tooltip.classList.remove("is-visible"); tooltip.setAttribute("aria-hidden", "true"); };
    document.querySelectorAll(".shelf-book").forEach((book) => {
      book.addEventListener("mouseenter", () => show(book)); book.addEventListener("focus", () => show(book));
      book.addEventListener("mouseleave", hide); book.addEventListener("blur", hide); book.addEventListener("dragstart", hide);
    });
    document.querySelectorAll(".collection-books").forEach((track) => track.addEventListener("scroll", hide, {passive:true}));
  };
  function renderShelves() {
    document.querySelector("#shelfRows").innerHTML = shelfData.categories.map(categoryMarkup).join("");
    setupScrollControls(); setupDragAndDrop(); setupTooltips();
  }
  fetch("books.json")
    .then((response) => { if (!response.ok) throw new Error(`Unable to load shelf data (${response.status})`); return response.json(); })
    .then((data) => {
      shelfData = data;
      document.querySelector("#finishedCount").textContent = data.publicFinishedCount;
      const inProgressCount = Number(data.inProgressCount || 0);
      document.querySelector("#progressCount").textContent = inProgressCount;
      document.querySelector("#progressCountBlock").hidden = inProgressCount === 0;
      document.querySelector("#categoryCount").textContent = `${data.categories.length} CATEGORIES`;
      setupResetControls();
      renderShelves();
    })
    .catch((error) => { document.querySelector("#shelfRows").innerHTML = '<p class="shelf-error">The finished-reading shelf could not load. Please refresh the page.</p>'; console.error(error); });
})();
