document.addEventListener("DOMContentLoaded", () => {
  const data = window.LEVEL4_EMAIL;
  if (!data || !Array.isArray(data.messages) || data.messages.length === 0) {
    console.error("LEVEL4_EMAIL data not found or empty.");
    return;
  }

  const messageList = document.getElementById("messageList");
  const readingSubject = document.getElementById("readingSubject");
  const fromName = document.getElementById("fromName");
  const fromEmail = document.getElementById("fromEmail");
  const toEmail = document.getElementById("toEmail");
  const emailTime = document.getElementById("emailTime");
  const senderAvatar = document.getElementById("senderAvatar");

  const hintList = document.getElementById("hintList");
  const revealHintBtn = document.getElementById("revealHintBtn");
  const clueLog = document.getElementById("clueLog");
  const decisionFeedback = document.getElementById("decisionFeedback");

  const scenarioName = document.getElementById("scenarioName");
  const scenarioTitle = document.getElementById("scenarioTitle");
  const scenarioDescription = document.getElementById("scenarioDescription");
  const scenarioProfile = document.getElementById("scenarioProfile");
  const scenarioHabits = document.getElementById("scenarioHabits");
  const scenarioContext = document.getElementById("scenarioContext");

  let activeMessage = data.messages[0];
  let revealedHintCount = 0;
  const clueSet = new Set();

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function shortTime(fullTime) {
    const parts = String(fullTime).split(" ");
    return parts.slice(-2).join(" ");
  }

  function addClue(text) {
    if (!clueLog || clueSet.has(text)) return;
    clueSet.add(text);

    const empty = clueLog.querySelector(".clue-empty");
    if (empty) clueLog.innerHTML = "";

    const chip = document.createElement("div");
    chip.className = "clue-chip";
    chip.textContent = text;
    clueLog.appendChild(chip);
  }

  function setDecisionFeedback(type, text) {
    if (!decisionFeedback) return;
    decisionFeedback.className = `decision-feedback ${type}`;
    decisionFeedback.textContent = text;
    decisionFeedback.classList.remove("hidden");
  }

  function renderScenario() {
    if (!data.scenario) return;

    if (scenarioName) scenarioName.textContent = data.scenario.codename || "";
    if (scenarioTitle) scenarioTitle.textContent = data.scenario.title || "";
    if (scenarioDescription) scenarioDescription.textContent = data.scenario.description || "";
    if (scenarioContext) scenarioContext.textContent = data.scenario.context || "";

    if (scenarioProfile) {
      scenarioProfile.innerHTML = "";
      (data.scenario.profile || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioProfile.appendChild(li);
      });
    }

    if (scenarioHabits) {
      scenarioHabits.innerHTML = "";
      (data.scenario.habits || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioHabits.appendChild(li);
      });
    }
  }

  function renderReadingPane(msg) {
    if (readingSubject) readingSubject.textContent = msg.subject || "";
    if (fromName) fromName.textContent = msg.fromName || "";
    if (fromEmail) fromEmail.textContent = msg.fromEmail || "";
    if (toEmail) toEmail.textContent = msg.toEmail || "";
    if (emailTime) emailTime.textContent = msg.time || "";
    if (senderAvatar) senderAvatar.textContent = msg.senderInitials || "??";

    const accountLink = document.getElementById("accountLink");
    if (accountLink && msg.inspector?.linkPreview) {
      accountLink.title = msg.inspector.linkPreview;
    }

    const inspectorValues = document.querySelectorAll(".inspector-value");
    if (inspectorValues.length >= 3 && msg.inspector) {
      inspectorValues[0].textContent = msg.inspector.returnPath || "";
      inspectorValues[1].textContent = msg.inspector.replyTo || "";
      inspectorValues[2].textContent = msg.inspector.linkPreview || "";
    }
  }

  function renderMessageList() {
    if (!messageList) return;
    messageList.innerHTML = "";

    data.messages.forEach((msg, index) => {
      const item = document.createElement("div");
      item.className = "message-item" + (index === 0 ? " active" : "");

      item.innerHTML = `
        <div class="message-sender">${escapeHtml(msg.sender)}</div>
        <div class="message-time">${escapeHtml(shortTime(msg.time))}</div>
        <div class="message-subject">${escapeHtml(msg.previewTop)}</div>
        <div class="message-preview ${msg.external ? "external-preview" : ""}">
          ${escapeHtml(msg.previewBottom)}
        </div>
      `;

      item.addEventListener("click", () => {
        document.querySelectorAll(".message-item").forEach(el => {
          el.classList.remove("active");
        });

        item.classList.add("active");
        activeMessage = msg;
        revealedHintCount = 0;
        renderReadingPane(msg);
        renderHints();

        if (decisionFeedback) {
          decisionFeedback.className = "decision-feedback hidden";
          decisionFeedback.textContent = "";
        }
      });

      messageList.appendChild(item);
    });
  }

  function renderHints() {
    if (!hintList || !revealHintBtn) return;

    hintList.innerHTML = "";
    const hints = activeMessage.orderedHints || [];

    hints.forEach((hint, index) => {
      const unlocked = index < revealedHintCount;
      const card = document.createElement("div");
      card.className = "hint-card" + (unlocked ? "" : " locked");

      card.innerHTML = `
        <div class="hint-step">Hint ${index + 1}</div>
        <div class="hint-body">
          ${unlocked ? escapeHtml(hint) : "Locked. Reveal this hint if you need more help."}
        </div>
      `;

      hintList.appendChild(card);
    });

    if (revealedHintCount >= hints.length) {
      revealHintBtn.disabled = true;
      revealHintBtn.textContent = "All hints revealed";
    } else {
      revealHintBtn.disabled = false;
      revealHintBtn.textContent = "Reveal next hint";
    }
  }

  function bindHintButton() {
    if (!revealHintBtn) return;

    revealHintBtn.addEventListener("click", () => {
      const hints = activeMessage.orderedHints || [];
      if (revealedHintCount < hints.length) {
        const nextHint = hints[revealedHintCount];
        revealedHintCount++;
        renderHints();
        addClue(`Hint ${revealedHintCount} revealed: ${nextHint}`);
      }
    });
  }

  function bindActionButtons() {
    document.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;

        if (action === activeMessage.correctAction) {
          setDecisionFeedback("good", "Correct. That is the safest action here.");
          addClue("Correct action chosen.");
        } else if (action === activeMessage.partialAction) {
          setDecisionFeedback("warn", "Safer than clicking, but not the best answer.");
          addClue("Partial credit action chosen.");
        } else {
          setDecisionFeedback("bad", "That action is risky. Re-check sender, urgency, and link.");
          addClue("Risky action chosen.");
        }
      });
    });
  }

  renderScenario();
  renderMessageList();
  renderReadingPane(activeMessage);
  renderHints();
  bindHintButton();
  bindActionButtons();
});
