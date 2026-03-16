(function () {
  const data = window.LEVEL1_EMAIL;
  if (!data || !data.messages || !data.messages.length) return;

  const messageList = document.getElementById("messageList");
  const clueLog = document.getElementById("clueLog");

  const fromNameEl = document.getElementById("fromName");
  const fromEmailEl = document.getElementById("fromEmail");
  const toEmailEl = document.getElementById("toEmail");
  const emailTimeEl = document.getElementById("emailTime");
  const readingSubjectEl = document.getElementById("readingSubject");
  const senderAvatarEl = document.getElementById("senderAvatar");
  const accountLinkEl = document.getElementById("accountLink");

  const clueSet = new Set();
  let activeMessage = data.messages[0];

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
        renderReadingPane(msg);
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

  function shortTime(fullTime) {
    const parts = fullTime.split(" ");
    return parts.slice(-2).join(" ");
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

  function bindHintables() {
    document.querySelectorAll(".hintable").forEach(el => {
      el.addEventListener("mouseenter", () => {
        const hint = el.dataset.hint;
        if (hint) addClue(hint);
      });
    });
  }

  function handleAction(action) {
    if (!activeMessage) return;

    const isCorrect = action === activeMessage.correctAction;
    const isGood = action === activeMessage.goodAction;

    // add built-in clues after choice
    activeMessage.clues.forEach(addClue);

    if (typeof window.showFishCoach === "function") {
      if (isCorrect) {
        window.showFishCoach("perfect");
      } else if (isGood) {
        window.showFishCoach("good");
      } else {
        window.showFishCoach("bad");
      }
    } else {
      if (isCorrect) {
        alert("Correct: Reporting is the safest action here.");
      } else if (isGood) {
        alert("Good: Verifying through an official channel is safer than clicking.");
      } else {
        alert("Risky: This action could expose the player to phishing.");
      }
    }
  }

  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      handleAction(btn.dataset.action);
    });
  });

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  renderMessageList();
  renderReadingPane(activeMessage);
  bindHintables();
})();
