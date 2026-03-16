(function () {
  const data = window.LEVEL1_EMAIL;
  if (!data || !data.messages || !data.messages.length) return;

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

  const verificationModal = document.getElementById("verificationModal");
  const verificationPrompt = document.getElementById("verificationPrompt");
  const verificationInput = document.getElementById("verificationInput");
  const verificationHelp = document.getElementById("verificationHelp");
  const verificationResult = document.getElementById("verificationResult");
  const verifySubmitBtn = document.getElementById("verifySubmitBtn");
  const verifyCancelBtn = document.getElementById("verifyCancelBtn");

  const clueSet = new Set();
  let activeMessage = data.messages[0];
  let revealedHintCount = 0;
  let retryCount = 0;

  function init() {
    renderMessageList();
    renderReadingPane(activeMessage);
    renderHints();
    bindHintables();
    bindActions();
    bindVerification();
  }

  function renderMessageList() {
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
        clearDecisionFeedback();
        renderReadingPane(msg);
        renderHints();
      });

      messageList.appendChild(item);
    });
  }

  function renderReadingPane(msg) {
    readingSubjectEl.textContent = msg.subject;
    fromNameEl.textContent = msg.fromName;
    fromEmailEl.textContent = msg.fromEmail;
    toEmailEl.textContent = msg.toEmail;
    emailTimeEl.textContent = msg.time;
    senderAvatarEl.textContent = msg.senderInitials;
    accountLinkEl.setAttribute("title", msg.inspector.linkPreview);
  }

  function renderHints() {
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

  function bindHintables() {
    document.querySelectorAll(".hintable").forEach((el, idx) => {
      el.addEventListener("mouseenter", () => {
        const hint = el.dataset.hint;
        if (hint) addClue(hint);
      });
    });

    revealHintBtn.addEventListener("click", () => {
      if (revealedHintCount < activeMessage.orderedHints.length) {
        const nextHint = activeMessage.orderedHints[revealedHintCount];
        revealedHintCount += 1;
        renderHints();
        addClue(`Hint ${revealedHintCount} revealed: ${nextHint}`);
      }
    });
  }

  function bindActions() {
    document.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleAction(btn.dataset.action);
      });
    });
  }

  function handleAction(action) {
    if (!activeMessage) return;

    const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;

    if (isCorrect) {
      setDecisionFeedback(
        "good",
        "Correct. Reporting phishing is the best action here. Now prove your understanding."
      );

      if (typeof window.showFishCoach === "function") {
        window.showFishCoach("perfect");
        setTimeout(() => {
          openVerificationChallenge();
        }, 1400);
      } else {
        openVerificationChallenge();
      }

      return;
    }

    if (isPartial) {
      setDecisionFeedback(
        "warn",
        "Safer than clicking, but not the best answer for this workplace scenario. If this is phishing, it should be reported. You can reveal another hint and try again."
      );
      addClue("Partial credit: verifying officially is safer than clicking, but reporting is the best action here.");
      return;
    }

    setDecisionFeedback(
      "bad",
      "That action is risky. This email uses reward bait, pressure wording, and suspicious sender details. Reveal another hint and try again."
    );

    if (typeof window.showFishCoach === "function") {
      window.showFishCoach("bad");
    }

    addClue("Incorrect action chosen. Re-check sender details, urgency language, and the previewed link.");
  }

  function setDecisionFeedback(type, text) {
    decisionFeedback.className = `decision-feedback ${type}`;
    decisionFeedback.textContent = text;
    decisionFeedback.classList.remove("hidden");
  }

  function clearDecisionFeedback() {
    decisionFeedback.textContent = "";
    decisionFeedback.className = "decision-feedback hidden";
  }

  function bindVerification() {
    verifySubmitBtn.addEventListener("click", submitVerificationAnswer);
    verifyCancelBtn.addEventListener("click", closeVerificationModal);
    verificationInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        submitVerificationAnswer();
      }
    });
  }

  function openVerificationChallenge() {
    retryCount = 0;
    verificationPrompt.textContent = activeMessage.verification.prompt;
    verificationInput.value = "";
    verificationHelp.textContent = "Type the real official domain only.";
    verificationResult.textContent = "";
    verificationResult.className = "verify-result";
    verificationModal.classList.remove("hidden");
    verificationModal.setAttribute("aria-hidden", "false");
    setTimeout(() => verificationInput.focus(), 20);
  }

  function closeVerificationModal() {
    verificationModal.classList.add("hidden");
    verificationModal.setAttribute("aria-hidden", "true");
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
    const raw = verificationInput.value;
    const answer = normalizeAnswer(raw);
    const accepted = activeMessage.verification.acceptedAnswers.map(normalizeAnswer);

    if (accepted.includes(answer)) {
      verificationResult.textContent = "Correct. The safe behavior is to manually type the official Amazon site instead of clicking the email link.";
      verificationResult.className = "verify-result good";
      verificationHelp.textContent = "Nice work. You identified the trusted domain.";

      addClue("Player correctly identified the official Amazon domain to visit manually.");

      setTimeout(() => {
        closeVerificationModal();
        setDecisionFeedback(
          "good",
          "Excellent. You reported the phish and correctly identified the official site to visit manually."
        );
      }, 1100);

      return;
    }

    const guidanceList = activeMessage.verification.retryGuidance || [];
    const guidance = guidanceList[Math.min(retryCount, guidanceList.length - 1)] || "Try again.";
    retryCount += 1;

    verificationResult.textContent = "Not correct yet. Try again.";
    verificationResult.className = "verify-result bad";
    verificationHelp.textContent = guidance;
    verificationInput.focus();
    verificationInput.select();
  }

  function addClue(text) {
    if (clueSet.has(text)) return;
    clueSet.add(text);

    if (clueLog.querySelector(".clue-empty")) {
      clueLog.innerHTML = "";
    }

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
})();
