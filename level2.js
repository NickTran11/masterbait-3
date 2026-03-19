document.addEventListener("DOMContentLoaded", () => {
  const data =
    window.LEVEL2_EMAIL ||
    window.LEVEL1_EMAIL ||
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

  const reelSlide = document.getElementById("reelSlide");
const reelChip = document.getElementById("reelChip");
const reelAvatar = document.getElementById("reelAvatar");
const postAccountName = document.getElementById("postAccountName");
const postMeta = document.getElementById("postMeta");
const postCaption = document.getElementById("postCaption");
const bioPreview = document.getElementById("bioPreview");
const dmMessage = document.getElementById("dmMessage");
const dmLink = document.getElementById("dmLink");

const likeCount = document.getElementById("likeCount");
const commentCount = document.getElementById("commentCount");
const openCommentsBtn = document.getElementById("openCommentsBtn");

const reelPrevBtn = document.getElementById("reelPrevBtn");
const reelNextBtn = document.getElementById("reelNextBtn");

const inspectorUser = document.getElementById("inspectorUser");
const inspectorAge = document.getElementById("inspectorAge");
const inspectorLink = document.getElementById("inspectorLink");

const hintList = document.getElementById("hintList");
const revealHintBtn = document.getElementById("revealHintBtn");
const decisionFeedback = document.getElementById("decisionFeedback");
const clueLog = document.getElementById("clueLog");

const messagesBubble = document.getElementById("messagesBubble");
const messagesPopup = document.getElementById("messagesPopup");

const commentsPopup = document.getElementById("commentsPopup");
const commentsList = document.getElementById("commentsList");
const closeCommentsPopupBtn = document.getElementById("closeCommentsPopupBtn");

const conversationPopup = document.getElementById("conversationPopup");
const contactsList = document.getElementById("contactsList");
const backToContactsBtn = document.getElementById("backToContactsBtn");
const closeConversationBtn = document.getElementById("closeConversationBtn");
const closeMessagesPopupBtn = document.getElementById("closeMessagesPopupBtn");

const conversationName = document.getElementById("conversationName");
const conversationAvatar = document.getElementById("conversationAvatar");

  const proofBox = document.getElementById("proofBox");
  const verificationPrompt = document.getElementById("verificationPrompt");
  const verificationInput = document.getElementById("verificationInput");
  const verificationHelp = document.getElementById("verificationHelp");
  const verificationResult = document.getElementById("verificationResult");
  const verifySubmitBtn = document.getElementById("verifySubmitBtn");

  const clueSet = new Set();
  let activeMessage = data.messages[0];
let activeReelIndex = 0;

const reels = [
  {
    type: "video",
    src: "./reel1.mov",
    chip: "CREATOR DROP",
    avatar: "TC",
    accountName: "thorus_canva.official",
    meta: "1.3M views · Mar 16, 2026",
    caption: "All my courses are 25% OFF this week 🔥 BUY NOW BEFORE SOLD OUT 🎯",
    bio: "Investigate the creator page and their courses integrity"
    likes: "1.1M",
    commentCount: "14k",
    comments: [
      { avatar: "y", username: "yahya_lmkadmi", time: "11h", text: "Ragebait final boss", meta: "361 likes   Reply" },
      { avatar: "d", username: "denver29519", time: "9h", text: "Explain?", meta: "Reply" },
      { avatar: "k", username: "k.khainaa", time: "9h", text: "THE QUEEN HERSELF", meta: "127 likes   Reply" },
      { avatar: "p", username: "pink3matter", time: "11h", text: "What is she doing rn does anyone know", meta: "52 likes   Reply" }
    ]
  },
  {
    type: "video",
    src: "./reel2.mov",
    chip: "INTERACTIVE REEL",
    avatar: "CM",
    accountName: "cute_mootion",
    meta: "53 views · 23h ago",
    caption: "Interact and play with the reel 😝",
    bio: "Investigate the creator page and their reel integrity"
    likes: "10",
    commentCount: "4",
    comments: [
      { avatar: "a", username: "ashley.edittts", time: "7h", text: "This trend is everywhere now", meta: "41 likes   Reply" },
      { avatar: "m", username: "mika.flow", time: "6h", text: "Why does the page keep asking people to click out?", meta: "19 likes   Reply" },
      { avatar: "r", username: "rio_vfx", time: "4h", text: "The account looks copied from other creators", meta: "28 likes   Reply" },
      { avatar: "s", username: "sunniepop", time: "2h", text: "Something feels off about this reel", meta: "12 likes   Reply" }
    ]
  },
  {
    type: "image",
    src: "./reel3.png",
    chip: "PROMO POST",
    avatar: "BB",
    accountName: "blue_bud",
    meta: "Sponsored post · 16m ago",
    caption: "Limited special offer 🥳 SHOP NOW 🛒",
    bio: "Investigate the creator page, advertisement and product integrity"
    likes: "1k",
    commentCount: "206",
    comments: [
      { avatar: "j", username: "jayyy_lee", time: "5h", text: "Is this even a real store?", meta: "23 likes   Reply" },
      { avatar: "n", username: "nina.codes", time: "4h", text: "That discount is way too extreme", meta: "17 likes   Reply" },
      { avatar: "o", username: "omarxv", time: "3h", text: "The website URL looks suspicious", meta: "31 likes   Reply" },
      { avatar: "l", username: "lulu_draws", time: "1h", text: "I would not trust that ad", meta: "9 likes   Reply" }
    ]
  }
];
  let revealedHintCount = 0;
  let retryCount = 0;
  let waitingForProof = false;

  init();

  function init() {
    renderScenario();
    renderFeed();
    renderHints();
    bindScenarioButtons();
    bindFeedButtons();
    bindActions();
    bindProof();
  }

  function renderScenario() {
    const s = data.scenario || {};
    if (scenarioName) scenarioName.textContent = s.codename || "PLAYER";
    if (scenarioTitle) scenarioTitle.textContent = s.title || "";
    if (scenarioDescription) scenarioDescription.textContent = s.description || "";
    if (scenarioContext) scenarioContext.textContent = s.context || "";

    if (scenarioStrengths) {
      scenarioStrengths.innerHTML = "";
      (s.profile || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioStrengths.appendChild(li);
      });
    }

    if (scenarioWeaknesses) {
      scenarioWeaknesses.innerHTML = "";
      (s.habits || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioWeaknesses.appendChild(li);
      });
    }
  }

  function renderFeed() {
  const reel = reels[activeReelIndex];

  if (reelSlide) {
    reelSlide.innerHTML = "";

    const counter = document.createElement("div");
    counter.className = "reel-counter";
    counter.textContent = `${activeReelIndex + 1}/${reels.length}`;
    reelSlide.appendChild(counter);

    if (reel.type === "video") {
      const video = document.createElement("video");
      video.className = "reel-asset reel-video";
      video.src = reel.src;
      video.autoplay = true;
      video.muted = true;
video.loop = true;
video.playsInline = true;
video.preload = "auto";
video.setAttribute("webkit-playsinline", "true");
video.setAttribute("playsinline", "true");

video.src = reel.src
      
      const soundBtn = document.createElement("button");
      soundBtn.className = "reel-sound-btn";
      soundBtn.type = "button";
      soundBtn.textContent = "🔇";

      soundBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        soundBtn.textContent = video.muted ? "🔇" : "🔊";
      });

      video.addEventListener("loadeddata", () => {
        // keep reel visible once first frame loads
      });

      video.addEventListener("error", () => {
        console.error("Video failed to load:", reel.src);
        const fallback = document.createElement("div");
        fallback.className = "reel-loading";
        fallback.textContent = "Video could not load";
        reelSlide.appendChild(fallback);
      });

      reelSlide.appendChild(video);
      reelSlide.appendChild(soundBtn);

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked or failed:", err);
          // keep video visible; user can still tap sound button later
        });
      }
    } else {
      const img = document.createElement("img");
      img.className = "reel-asset reel-image";
      img.src = reel.src;
      img.alt = "Social media reel";
      reelSlide.appendChild(img);
    }
  }

  if (reelChip) reelChip.textContent = reel.chip;
  if (reelAvatar) reelAvatar.textContent = reel.avatar;
  if (postAccountName) postAccountName.textContent = reel.accountName;
  if (postMeta) postMeta.textContent = reel.meta;
  if (postCaption) postCaption.textContent = reel.caption;
  if (bioPreview) bioPreview.textContent = reel.bio;

if (dmMessage) dmMessage.textContent = activeMessage.dmMessage;
if (dmLink) dmLink.textContent = activeMessage.dmLink;

if (likeCount) likeCount.textContent = reel.likes;
if (commentCount) commentCount.textContent = reel.commentCount;

if (inspectorUser) inspectorUser.textContent = activeMessage.inspector.username;
if (inspectorAge) inspectorAge.textContent = activeMessage.inspector.profileAge;
if (inspectorLink) inspectorLink.textContent = activeMessage.inspector.linkInBio;

renderCommentsPopup();
}

function renderCommentsPopup() {
  if (!commentsList) return;

  const reel = reels[activeReelIndex];
  commentsList.innerHTML = "";

  (reel.comments || []).forEach((comment) => {
    const item = document.createElement("div");
    item.className = "comment-row";

    item.innerHTML = `
      <div class="comment-avatar">${comment.avatar}</div>
      <div class="comment-main">
        <div class="comment-top">
          <span class="comment-username">${comment.username}</span>
          <span class="comment-time">${comment.time}</span>
        </div>
        <div class="comment-text">${comment.text}</div>
        <div class="comment-meta">${comment.meta}</div>
      </div>
      <button class="comment-like-btn" type="button">♡</button>
    `;

    commentsList.appendChild(item);
  });
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

  function bindScenarioButtons() {
    if (beginMissionBtn && scenarioOverlay) {
      beginMissionBtn.addEventListener("click", () => {
        beginLevel2Mission();
      });
    }

    if (openDossierBtn && scenarioOverlay) {
      openDossierBtn.addEventListener("click", () => {
        openLevel2Dossier();
      });
    }
  }
  
  function bindFeedButtons() {
      if (reelPrevBtn) {
    reelPrevBtn.addEventListener("click", () => {
      activeReelIndex = (activeReelIndex - 1 + reels.length) % reels.length;
      renderFeed();
    });
  }

  if (reelNextBtn) {
    reelNextBtn.addEventListener("click", () => {
      activeReelIndex = (activeReelIndex + 1) % reels.length;
      renderFeed();
    });
  }
    
  if (messagesBubble && messagesPopup) {
    messagesBubble.addEventListener("click", () => {
      messagesPopup.classList.remove("hidden");
      conversationPopup && conversationPopup.classList.add("hidden");
    });
  }

  if (openCommentsBtn && commentsPopup) {
  openCommentsBtn.addEventListener("click", () => {
    renderCommentsPopup();
    commentsPopup.classList.remove("hidden");
    messagesPopup && messagesPopup.classList.add("hidden");
    conversationPopup && conversationPopup.classList.add("hidden");
  });
}

if (closeCommentsPopupBtn && commentsPopup) {
  closeCommentsPopupBtn.addEventListener("click", () => {
    commentsPopup.classList.add("hidden");
  });
}

  if (closeMessagesPopupBtn && messagesPopup) {
    closeMessagesPopupBtn.addEventListener("click", () => {
      messagesPopup.classList.add("hidden");
    });
  }

  if (contactsList) {
    contactsList.querySelectorAll(".contact-row").forEach(row => {
      row.addEventListener("click", () => {
        const contact = row.dataset.contact || "";
        openConversation(contact);
      });
    });
  }

  if (backToContactsBtn) {
    backToContactsBtn.addEventListener("click", () => {
      conversationPopup && conversationPopup.classList.add("hidden");
      messagesPopup && messagesPopup.classList.remove("hidden");
    });
  }

  if (closeConversationBtn) {
    closeConversationBtn.addEventListener("click", () => {
      conversationPopup && conversationPopup.classList.add("hidden");
    });
  }
}

  function openConversation(contact) {
  if (!conversationPopup || !messagesPopup) return;

  const contactMap = {
    haydude: { name: "BestFriend", avatar: "BFF" },
    david: { name: "MrLeast", avatar: "ML" },
    understandable: { name: "FC Barcel", avatar: "B" },
    fortnite: { name: "Fortnite Gang", avatar: "F" },
    girl: { name: "I'm just a girl 💅", avatar: "G" },
    jada: { name: "Mia Foxx", avatar: "MF" }
  };

  const selected = contactMap[contact] || contactMap.understandable;

  if (conversationName) conversationName.textContent = selected.name;
  if (conversationAvatar) conversationAvatar.textContent = selected.avatar;

  messagesPopup.classList.add("hidden");
  conversationPopup.classList.remove("hidden");
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
    const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;

    if (isCorrect) {
      addClue("Correct action chosen: Report suspicious social content.");
      setDecisionFeedback("good", "Correct. Reporting the suspicious account is the safest action here.");
      showCoach("perfect", true);
      return;
    }

    if (isPartial) {
      addClue("Partial credit: verifying the real creator is safer than tapping the suspicious links.");
      setDecisionFeedback(
        "warn",
        "Good instinct. Verifying is safer than clicking, but reporting the scam content is the strongest action."
      );
      showCoach("good", false);
      return;
    }

    addClue("Incorrect action chosen. Re-check the account age, bio link, and the DM bait.");
    setDecisionFeedback(
      "bad",
      "That action is risky. This social giveaway is trying to rush you into an unsafe link."
    );
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
    if (verificationHelp) verificationHelp.textContent = "Think about how to verify a real creator safely.";
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
      .replace(/^www\./, "")
      .replace(/\/+$/, "");
  }

  function submitVerificationAnswer() {
    const raw = verificationInput ? verificationInput.value : "";
    const answer = normalizeAnswer(raw);
    const accepted = activeMessage.verification.acceptedAnswers.map(normalizeAnswer);

    if (accepted.includes(answer)) {
      if (verificationResult) {
        verificationResult.textContent = "Correct. Verify the real creator through a verified official account or official website.";
        verificationResult.className = "proof-result good";
      }
      if (verificationHelp) verificationHelp.textContent = "Nice work. You chose the safe verification path.";
      addClue("Player correctly identified the safe way to verify a social media giveaway.");

      waitingForProof = false;
      setDecisionFeedback(
        "good",
        "Excellent. You avoided the bait and identified the safe verification method."
      );

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

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
});
