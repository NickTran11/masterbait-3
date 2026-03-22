document.addEventListener("DOMContentLoaded", () => {
  const data =
  window.LEVEL1_EMAIL ||
  window.LEVEL2_EMAIL ||
  window.LEVEL3_EMAIL ||
  window.LEVEL4_EMAIL ||
  window.LEVEL5_EMAIL;
  if (!data || !data.messages || !data.messages.length) return;

  const scenarioOverlay = document.getElementById("scenarioOverlay");
  const beginMissionBtn = document.getElementById("beginMissionBtn");
  const openDossierBtn = document.getElementById("openDossierBtn");

  const scenarioName = document.getElementById("scenarioName");
  const scenarioTitle = document.getElementById("scenarioTitle");
  const scenarioDescription = document.getElementById("scenarioDescription");
  const scenarioStrengths = document.getElementById("scenarioStrengths");
  const scenarioWeaknesses = document.getElementById("scenarioWeaknesses");
  const scenarioContext = document.getElementById("scenarioContext");
  const scenarioPhoto = document.getElementById("scenarioPhoto");

  const messageList = document.getElementById("messageList");
  const clueLog = document.getElementById("clueLog");
  const hintList = document.getElementById("hintList");
  const revealHintBtn = document.getElementById("revealHintBtn");
  const decisionFeedback = document.getElementById("decisionFeedback");

  const fromNameEl = document.getElementById("fromName");
  const fromEmailEl = document.getElementById("fromEmail");
  const toEmailEl = document.getElementById("toEmail");
  const emailTimeEl = document.getElementById("emailTime");
  const readingSubjectEl = document.getElementById("readingSubject");
  const senderAvatarEl = document.getElementById("senderAvatar");
  const accountLinkEl = document.getElementById("accountLink");

  const emailBodyEl = document.getElementById("emailBody");

  const proofBox = document.getElementById("proofBox");
  const verificationPrompt = document.getElementById("verificationPrompt");
  const verificationInput = document.getElementById("verificationInput");
  const verificationHelp = document.getElementById("verificationHelp");
  const verificationResult = document.getElementById("verificationResult");
  const starsOverlay = document.getElementById("starsOverlay");
const starsRow = document.getElementById("starsRow");
const starsText = document.getElementById("starsText");
const starsContinueBtn = document.getElementById("starsContinueBtn");
  const verifySubmitBtn = document.getElementById("verifySubmitBtn");

  const clueSet = new Set();
  let activeMessage = data.messages[0];
  let revealedHintCount = 0;
  let retryCount = 0;
  let waitingForProof = false;
  let selectedAction = null;

  function init() {
    renderScenario();
    renderMessageList();
    renderReadingPane(activeMessage);
    renderHints();
    bindActions();
    bindProof();
    bindScenarioButtons();
  }

  function renderScenario() {
    if (!data.scenario) return;

    if (scenarioName) scenarioName.textContent = data.scenario.codename || "PLAYER";
    if (scenarioTitle) scenarioTitle.textContent = data.scenario.title || "";
    if (scenarioDescription) scenarioDescription.textContent = data.scenario.description || "";
    if (scenarioContext) scenarioContext.textContent = data.scenario.context || "";
    if (scenarioPhoto) scenarioPhoto.textContent = data.scenario.initials || "P";

    if (scenarioStrengths) {
      scenarioStrengths.innerHTML = "";
      (data.scenario.strengths || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioStrengths.appendChild(li);
      });
    }

    if (scenarioWeaknesses) {
      scenarioWeaknesses.innerHTML = "";
      (data.scenario.weaknesses || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioWeaknesses.appendChild(li);
      });
    }
  }

  function bindScenarioButtons() {
    if (beginMissionBtn && scenarioOverlay) {
      beginMissionBtn.addEventListener("click", () => {
        scenarioOverlay.style.opacity = "0";
        scenarioOverlay.style.transition = "opacity 0.25s ease";

        setTimeout(() => {
          scenarioOverlay.style.display = "none";
          scenarioOverlay.setAttribute("aria-hidden", "true");
        }, 250);
      });
    }

    if (openDossierBtn && scenarioOverlay) {
      openDossierBtn.addEventListener("click", () => {
        scenarioOverlay.style.display = "grid";
        scenarioOverlay.style.opacity = "1";
        scenarioOverlay.setAttribute("aria-hidden", "false");
      });
    }
  }

  function renderMessageList() {
    if (!messageList) return;
    messageList.innerHTML = "";

    data.messages.forEach((msg, index) => {
      const item = document.createElement("div");
      item.className = "message-item" + (index === 0 ? " active" : "");
      item.dataset.id = msg.id;

      item.innerHTML = `
        <div class="message-sender">${escapeHtml(msg.sender)}</div>
        <div class="message-time">${escapeHtml(shortTime(msg.time))}</div>
        <div class="message-subject">${escapeHtml(msg.previewTop)}</div>
        <div class="message-preview ${msg.external ? "external-preview" : ""}">
          ${escapeHtml(msg.previewBottom)}
        </div>
      `;

      item.addEventListener("click", () => {
        document.querySelectorAll(".message-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        activeMessage = msg;
        revealedHintCount = 0;
        retryCount = 0;
        waitingForProof = false;
        clearDecisionFeedback();
        hideProofBox();
        if (window.closeFishCoachCustom) window.closeFishCoachCustom();
        renderReadingPane(msg);
        renderHints();
      });

      messageList.appendChild(item);
    });
  }

  function renderReadingPane(msg) {
    if (readingSubjectEl) readingSubjectEl.textContent = msg.subject;
    if (fromNameEl) fromNameEl.textContent = msg.fromName;
    if (fromEmailEl) fromEmailEl.textContent = msg.fromEmail;
    if (toEmailEl) toEmailEl.textContent = msg.toEmail;
    if (emailTimeEl) emailTimeEl.textContent = msg.time;
    if (senderAvatarEl) senderAvatarEl.textContent = msg.senderInitials;
    if (accountLinkEl) accountLinkEl.setAttribute("title", msg.inspector.linkPreview);

    // NEW: Render email body if provided
  if (emailBodyEl && msg.bodyHtml) {
    emailBodyEl.innerHTML = `
      <div class="email-logo">PhisherBait Mail</div>
      ${msg.bodyHtml}
    `;
  }
  }

  function renderHints() {
    if (!hintList || !revealHintBtn) return;

    hintList.innerHTML = "";
    const hints = activeMessage.orderedHints || [];

    hints.forEach((hint, index) => {
      const card = document.createElement("div");
      const unlocked = index < revealedHintCount;
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
      revealHintBtn.style.opacity = "0.65";
      revealHintBtn.style.cursor = "not-allowed";
    } else {
      revealHintBtn.disabled = false;
      revealHintBtn.textContent = "Reveal next hint";
      revealHintBtn.style.opacity = "1";
      revealHintBtn.style.cursor = "pointer";
    }
  }

  function bindActions() {
    if (revealHintBtn) {
      revealHintBtn.addEventListener("click", () => {
        if (revealedHintCount < activeMessage.orderedHints.length) {
          const nextHint = activeMessage.orderedHints[revealedHintCount];
          revealedHintCount += 1;
          renderHints();
          addClue(`Hint ${revealedHintCount} revealed: ${nextHint}`);
        }
      });
    }

    document.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleAction(btn.dataset.action);
      });
    });
  }

function getActionStars(action) {
  if (action === "report") return 3;
  if (action === "callit") return 2;
  if (action === "reply") return 1;
  return 0; // click or anything else
}

function getStarsMessage(stars) {
  if (stars === 3) return "Excellent job. You chose the safest action and earned 3 stars.";
  if (stars === 2) return "Good job. Verifying officially was safer, so you earned 2 stars.";
  if (stars === 1) return "Replying was not the safest move. You earned 1 star.";
  return "That was risky. Clicking the link earns 0 stars.";
}

function hideStarsOverlay() {
  if (!starsOverlay) return;
  starsOverlay.classList.add("hidden");
  starsOverlay.setAttribute("aria-hidden", "true");
}

function showStarsOverlay(action = selectedAction) {
  if (!starsOverlay || !starsRow || !starsText) {
    window.location.href = "./levelMap.html";
    return;
  }

  const stars = getActionStars(action);

  starsRow.innerHTML = Array.from({ length: 3 }, (_, i) => {
    const src = i < stars ? "./star-filled.png" : "./star-empty.png";
    const alt = i < stars ? "Filled star" : "Empty star";
    return `<img src="${src}" alt="${alt}" class="star-result-icon">`;
  }).join("");

  starsText.textContent = getStarsMessage(stars);

  starsOverlay.classList.remove("hidden");
  starsOverlay.setAttribute("aria-hidden", "false");
}

if (starsContinueBtn) {
  starsContinueBtn.addEventListener("click", () => {
    hideStarsOverlay();
    window.location.href = "./levelMap.html";
  });
}
  
  function bindProof() {
    if (verifySubmitBtn) {
      verifySubmitBtn.addEventListener("click", submitVerificationAnswer);
    }
    if (verificationInput) {
      verificationInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitVerificationAnswer();
      });
    }
  }

function handleAction(action) {
  selectedAction = action;

  const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;

    if (isCorrect) {
      addClue("Correct action chosen.");
      setDecisionFeedback("good", "Correct. That is the best action here.");
      showCoach("perfect", true);
      return;
    }

    if (isPartial) {
      addClue("Partial credit: safer than clicking, but not the best answer.");
      setDecisionFeedback("warn", "Safer than clicking, but not the best answer for this scenario.");
      showCoach("good", false);
      return;
    }

    addClue("Incorrect action chosen. Re-check sender details, urgency language, and the previewed link.");
    setDecisionFeedback("bad", "That action is risky. Reveal another hint and try again.");
    showCoach("bad", false);
  }

  function showCoach(mode, withProof) {
    if (!window.showFishCoachCustom) {
      console.error("fishCoach.js is not loaded.");
      return;
    }

    const coachPayload = activeMessage.coach[mode];
    window.showFishCoachCustom(coachPayload);

    if (window.setFishCoachCloseHandler) {
      window.setFishCoachCloseHandler(() => {
        if (waitingForProof) return;
        window.location.href = "./levelMap.html";
      });
    }

    if (withProof) {
      waitingForProof = true;
      showProofBox();
    } else {
      waitingForProof = false;
      hideProofBox();
    }
  }

  function showProofBox() {
    if (!proofBox) return;
    proofBox.classList.remove("hidden");
    if (verificationPrompt) verificationPrompt.textContent = activeMessage.verification.prompt;
    if (verificationInput) verificationInput.value = "";
    if (verificationHelp) verificationHelp.textContent = "Type the real official domain only.";
    if (verificationResult) {
      verificationResult.textContent = "";
      verificationResult.className = "proof-result";
    }
    setTimeout(() => verificationInput && verificationInput.focus(), 60);
  }

  function hideProofBox() {
    if (proofBox) proofBox.classList.add("hidden");
    waitingForProof = false;
  }

  function normalizeAnswer(value) {
    return value
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "www.")
      .replace(/\/+$/, "");
  }

  function submitVerificationAnswer() {
    const raw = verificationInput ? verificationInput.value : "";
    const answer = normalizeAnswer(raw);
    const accepted = activeMessage.verification.acceptedAnswers.map(normalizeAnswer);

    if (accepted.includes(answer)) {
      if (verificationResult) {
        verificationResult.textContent = "Correct. The safe behavior is to manually type the official site instead of clicking the email link.";
        verificationResult.className = "proof-result good";
      }
      if (verificationHelp) verificationHelp.textContent = "Nice work. You identified the trusted domain.";
      addClue("Player correctly identified the official domain to visit manually.");

      waitingForProof = false;
      setDecisionFeedback("good", "Excellent. You chose the safest action and identified the correct official website.");

      if (window.setFishCoachCloseHandler) {
        window.setFishCoachCloseHandler(() => {
          window.location.href = "./levelMap.html";
        });
      }

      return;
    }

    const guidanceList = activeMessage.verification.retryGuidance || [];
    const guidance = guidanceList[Math.min(retryCount, guidanceList.length - 1)] || "Try again.";
    retryCount += 1;

    if (verificationResult) {
      verificationResult.textContent = "Not correct yet. Try again.";
      verificationResult.className = "proof-result bad";
    }
    if (verificationHelp) verificationHelp.textContent = guidance;
    if (verificationInput) {
      verificationInput.focus();
      verificationInput.select();
    }
  }

  function setDecisionFeedback(type, text) {
    if (!decisionFeedback) return;
    decisionFeedback.className = `decision-feedback ${type}`;
    decisionFeedback.textContent = text;
    decisionFeedback.classList.remove("hidden");
  }

  function clearDecisionFeedback() {
    if (!decisionFeedback) return;
    decisionFeedback.textContent = "";
    decisionFeedback.className = "decision-feedback hidden";
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

  function shortTime(fullTime) {
    const parts = fullTime.split(" ");
    return parts.slice(-2).join(" ");
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  init();
});
