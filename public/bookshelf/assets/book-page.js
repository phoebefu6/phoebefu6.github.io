(() => {
  "use strict";

  const detailCopy = {
    "不要修理事件": "从单次事件退后一步，先寻找重复模式，再追问是什么反馈、规则与目标持续生成这些模式。",
    "系统不是一堆东西": "要素最显眼，却往往不是最强杠杆。相互连接决定信息与资源如何移动，目标决定整个系统朝哪里走。",
    "改变存量，要改流量": "存量记录系统的状态。流入增加它，流出减少它；想改变积累，必须找到能长期改变入口或出口的动作。",
    "结果会回头改写原因": "增强回路会自我放大，调节回路会缩小现实与目标之间的差距。复杂行为通常来自多个回路的竞争。",
    "反馈太晚，行动就会过量": "当行动和结果相隔很久，我们容易误判行动无效并持续加码，等反馈抵达时，系统已经越过目标。",
    "事件 → 模式 → 结构": "事件告诉你发生了什么，模式告诉你它如何反复，结构解释为什么它会持续。干预越靠近结构，效果越持久。",
    "越接近范式，杠杆越大": "参数容易调整但影响有限；信息、规则、目标和范式逐层改变系统为何行动，因此杠杆更大、阻力也更强。",
    "少一点控制，多一点学习": "复杂系统无法被精确预测或完全控制。保持谦逊，用小实验、快速反馈和持续重构与系统共舞。"
  };

  const recallAnswers = [
    "要素、相互连接与目标。目标常最难被直接看见，要从持续行为中推断。",
    "存量能吸收短期冲击，但存量越大，改变它需要的时间与流量通常也越多。",
    "增强回路放大变化；调节回路比较现实与目标，并尝试缩小差距。",
    "反馈未抵达时，人容易认为行动不足而继续加码，最终造成过度修正。",
    "观察它长期奖励什么、牺牲什么，以及哪些行为会稳定重复。",
    "高层杠杆会改变规则、目标或范式，也会威胁既有利益与身份，因此阻力更大。",
    "先写出重复事件，再画出可能的因果箭头，标出增强或调节关系以及延迟。"
  ];

  const branchDetail = document.querySelector("#branchDetail");
  const cardsRoot = document.querySelector("#knowledgeCards");
  const recallRoot = document.querySelector("#recallList");

  const escapeHtml = (value) =>
    String(value).replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[char]);

  const renderBranch = (branch) => {
    branchDetail.querySelector(".branch-detail__chapter").textContent = branch.chapter;
    branchDetail.querySelector("h3").textContent = branch.label;
    branchDetail.querySelector(".branch-detail__summary").textContent = branch.summary;
    branchDetail.querySelector("ul").innerHTML = branch.notes
      .map((note) => `<li><strong>${escapeHtml(note.title)}</strong>${escapeHtml(note.body)}<br><small>记忆线索：${escapeHtml(note.cue)}</small></li>`)
      .join("");
    branchDetail.querySelector(".branch-detail__question").textContent = `想一想：${branch.question}`;
  };

  const setupMindmap = (data) => {
    const branches = new Map(data.branches.map((branch) => [branch.id, branch]));
    const nodes = [...document.querySelectorAll(".mind-node")];
    nodes.forEach((node) => {
      node.setAttribute("aria-pressed", "false");
      node.addEventListener("click", () => {
        nodes.forEach((candidate) => candidate.setAttribute("aria-pressed", "false"));
        node.setAttribute("aria-pressed", "true");
        renderBranch(branches.get(node.dataset.branch));
      });
    });
    nodes[0].setAttribute("aria-pressed", "true");
    renderBranch(branches.get("system-anatomy"));
  };

  const renderCards = (data) => {
    cardsRoot.innerHTML = data.cards.map((card) => `
      <article class="knowledge-card" tabindex="0" role="button" aria-expanded="false">
        <span class="knowledge-card__number">${escapeHtml(card.id)}</span>
        <span class="knowledge-card__kicker">${escapeHtml(card.kicker)}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p class="knowledge-card__subtitle">${escapeHtml(card.subtitle)}</p>
        <p class="knowledge-card__detail">${escapeHtml(detailCopy[card.title] || card.takeaway)}</p>
        <p class="knowledge-card__takeaway">${escapeHtml(card.takeaway)}</p>
      </article>`).join("");

    cardsRoot.querySelectorAll(".knowledge-card").forEach((card) => {
      const toggle = () => card.setAttribute("aria-expanded", String(card.getAttribute("aria-expanded") !== "true"));
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });
  };

  const renderRecall = (data) => {
    recallRoot.innerHTML = data.memoryPrompts.map((question, index) => `
      <article class="recall-item">
        <button type="button" aria-expanded="false">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(question)}</strong>
          <span aria-hidden="true">＋</span>
        </button>
        <div class="recall-answer">${escapeHtml(recallAnswers[index])}</div>
      </article>`).join("");
    recallRoot.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => button.setAttribute("aria-expanded", String(button.getAttribute("aria-expanded") !== "true")));
    });
  };

  fetch("book-map.json")
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to load book data (${response.status})`);
      return response.json();
    })
    .then((data) => {
      setupMindmap(data);
      renderCards(data);
      renderRecall(data);
    })
    .catch(() => {
      cardsRoot.innerHTML = "<p>知识卡数据暂时无法载入，请刷新页面。</p>";
    });
})();
