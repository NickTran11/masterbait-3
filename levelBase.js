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

  // Fish coach overlay elements
  const fishOverlay = document.getElementById("fishCoachOverlay");
  const fishText = document.getElementById("fishText");
  const fishTitle = document.getElementById("fishTitle");
  const fishLessons = document.getElementById("fishLessons");
  const fishCloseBtn = document.getElementById("fishCloseBtn");

  // proof challenge inside fish panel
  const proofBox = document.getElementById("proofBox");
  const verificationPrompt = document.getElementById("verificationPrompt");
  const verificationInput = document.getElementById("verificationInput");
  const verificationHelp = document.getElementById("verificationHelp");
  const verificationResult = document.getElementById("verificationResult");
  const verifySubmitBtn = document.getElementById("verifySubmitBtn");

  const clueSet = new Set();
  let activeMessage = data.messages[0];
  let revealedHintCount = 0;
  let retryCount = 0;
  let waitingForProof = false;

  function init() {
    renderMessageList();
    renderReadingPane(activeMessage);
    renderHints();
    bindActions();
    bindFishCoach();
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
        waitingForProof = false;
        clearDecisionFeedback();
        closeFishCoach();
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

  function bindActions() {
    revealHintBtn.addEventListener("click", () => {
      if (revealedHintCount < activeMessage.orderedHints.length) {
        const nextHint = activeMessage.orderedHints[revealedHintCount];
        revealedHintCount += 1;
        renderHints();
        addClue(`Hint ${revealedHintCount} revealed: ${nextHint}`);
      }
    });

    document.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        handleAction(btn.dataset.action);
      });
    });
  }

  function bindFishCoach() {
    fishCloseBtn.addEventListener("click", () => {
      if (waitingForProof) return;
      closeFishCoach();
    });

    verifySubmitBtn.addEventListener("click", submitVerificationAnswer);
    verificationInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitVerificationAnswer();
    });
  }

  function handleAction(action) {
    if (!activeMessage) return;

    const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;

    if (isCorrect) {
      addClue("Correct action chosen: Report phishing.");
      showFishCoach("perfect", true);
      return;
    }

    if (isPartial) {
      setDecisionFeedback(
        "warn",
        "Safer than clicking, but not the best answer for this workplace scenario. If this is phishing, it should be reported. You can reveal another hint and try again."
      );
      addClue("Partial credit: verifying officially is safer than clicking, but reporting is the best action here.");
      showFishCoach("good", false);
      return;
    }

    setDecisionFeedback(
      "bad",
      "That action is risky. This email uses reward bait, pressure wording, and suspicious sender details. Reveal another hint and try again."
    );
    addClue("Incorrect action chosen. Re-check sender details, urgency language, and the previewed link.");
    showFishCoach("bad", false);
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

  function showFishCoach(mode, withProof) {
    const coach = activeMessage.coach[mode];
    fishTitle.textContent = coach.title;
    fishLessons.innerHTML = coach.lessons.map(x => `• ${escapeHtml(x)}`).join("<br>");
    typeFishBubble(coach.bubble);

    if (withProof) {
      waitingForProof = true;
      proofBox.classList.remove("hidden");
      verificationPrompt.textContent = activeMessage.verification.prompt;
      verificationInput.value = "";
      verificationHelp.textContent = "Type the real official domain only.";
      verificationResult.textContent = "";
      verificationResult.className = "proof-result";
      setTimeout(() => verificationInput.focus(), 50);
    } else {
      waitingForProof = false;
      proofBox.classList.add("hidden");
    }

    fishOverlay.classList.remove("hidden");
    fishOverlay.setAttribute("aria-hidden", "false");
  }

  function closeFishCoach() {
    fishOverlay.classList.add("hidden");
    fishOverlay.setAttribute("aria-hidden", "true");
    proofBox.classList.add("hidden");
    waitingForProof = false;
  }

  async function typeFishBubble(text) {
    fishText.textContent = "";
    for (let i = 0; i < text.length; i++) {
      fishText.textContent += text[i];
      await new Promise(r => setTimeout(r, 18));
    }
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
      verificationResult.className = "proof-result good";
      verificationHelp.textContent = "Nice work. You identified the trusted domain.";
      addClue("Player correctly identified the official Amazon domain to visit manually.");

      waitingForProof = false;
      setDecisionFeedback(
        "good",
        "Excellent. You reported the phish and correctly identified the official site to visit manually."
      );

      setTimeout(() => {
        closeFishCoach();
      }, 1200);

      return;
    }

    const guidanceList = activeMessage.verification.retryGuidance || [];
    const guidance = guidanceList[Math.min(retryCount, guidanceList.length - 1)] || "Try again.";
    retryCount += 1;

    verificationResult.textContent = "Not correct yet. Try again.";
    verificationResult.className = "proof-result bad";
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
