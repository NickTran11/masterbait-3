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
  const creatorProfilePopup = document.getElementById("creatorProfilePopup");
const closeCreatorProfileBtn = document.getElementById("closeCreatorProfileBtn");
const creatorProfileAvatar = document.getElementById("creatorProfileAvatar");
const creatorProfileHandle = document.getElementById("creatorProfileHandle");
const creatorProfileVerified = document.getElementById("creatorProfileVerified");
const creatorProfileDisplayName = document.getElementById("creatorProfileDisplayName");
const creatorPostsCount = document.getElementById("creatorPostsCount");
const creatorFollowersCount = document.getElementById("creatorFollowersCount");
const creatorFollowingCount = document.getElementById("creatorFollowingCount");
const creatorProfileCategory = document.getElementById("creatorProfileCategory");
const creatorProfileBio = document.getElementById("creatorProfileBio");
const creatorProfileLink = document.getElementById("creatorProfileLink");
const creatorProfileGrid = document.getElementById("creatorProfileGrid");
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
const conversationThread = document.getElementById("conversationThread");

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
    bio: "Investigate the creator page and their courses integrity",
    likes: "1.1M",
    commentCount: "14k",
    comments: [
      { avatar: "S", username: "spidey_sink", time: "11h", text: "FAKE😂😂😂", meta: "201 likes   Reply" },
      { avatar: "D", username: "denver29519", time: "9h", text: "Big Fan, sir!🔥", meta: "Reply" },
      { avatar: "K", username: "k.khainaa", time: "9h", text: "Selling courses in big 2026 lol 😭🥀", meta: "1.2k likes   Reply" },
      { avatar: "P", username: "pink3matter", time: "11h", text: "Talent❌ Hardwork✅", meta: "52k likes   Reply" }
    ],
        creatorProfile: {
      avatar: "./images/creator1-avatar.jpg",
      handle: "thorus_canva.official",
      verified: true,
      displayName: "Thorus Canva",
      posts: "24",
      followers: "951K",
      following: "111",
      category: "Entrepreneur",
      bio: "Day one, one day",
      link: "the-thorus-way.com",
      ],
      grid: [
        "./images/creator1-grid1.jpg",
        "./images/creator1-grid2.jpg",
        "./images/creator1-grid3.jpg",
      ]
    }
  },
  {
    type: "video",
    src: "./reel2.mov",
    chip: "INTERACTIVE REEL",
    avatar: "CM",
    accountName: "cute_mootion",
    meta: "53 views · 23h ago",
    caption: "Interact and play with the reel 😝",
    bio: "Investigate the creator page and their reel integrity",
    likes: "10",
    commentCount: "4",
    comments: [
      { avatar: "A", username: "ashley.edittts", time: "7h", text: "This trend is everywhere now", meta: "4 likes   Reply" },
      { avatar: "M", username: "mika.flow", time: "6h", text: "ITS SO FUNNN ❤️", meta: "8 likes   Reply" },
      { avatar: "R", username: "rio_vfx", time: "4h", text: "The account looks copied from other creators", meta: "1 likes   Reply" },
      { avatar: "S", username: "sunniepop", time: "2h", text: "What happened at the end, anyone got that same thing??", meta: "1 likes   Reply" }
    ],
    creatorProfile: {
      avatar: "./images/creator2-avatar.jpg",
      handle: "cute_mootion",
      verified: false,
      displayName: "Cute Mootion",
      posts: "9",
      followers: "32",
      following: "418",
      category: "Video Creator",
      bio: "Short trend edits and viral remix posts ✨",
      link: "cute-mootion-vibes.net",
      ],
      grid: [
        "./images/creator2-grid1.jpg",
        "./images/creator2-grid2.jpg",
        "./images/creator2-grid3.jpg",
      ]
    }
  },
  {
    type: "image",
    src: "./reel3.png",
    chip: "PROMO POST",
    avatar: "BB",
    accountName: "blue_bud",
    meta: "Sponsored post · 16m ago",
    caption: "Limited special offer 🥳 SHOP NOW 🛒",
    bio: "Investigate the creator page, advertisement and product integrity",
    likes: "1k",
    commentCount: "206",
    comments: [
      { avatar: "J", username: "jayyy_lee", time: "5h", text: "What a deal!", meta: "43 likes   Reply" },
      { avatar: "N", username: "nina.codes", time: "4h", text: "That discount is way too extreme", meta: "17 likes   Reply" },
      { avatar: "O", username: "omarxv", time: "3h", text: "Technologia", meta: "2k likes   Reply" },
      { avatar: "L", username: "lulu_draws", time: "1h", text: "I will buy one", meta: "9 likes   Reply" }
    ],
    creatorProfile: {
      avatar: "./images/creator3-avatar.jpg",
      handle: "blue_bud",
      verified: false,
      displayName: "Blue Bud Store",
      posts: "1",
      followers: "8,421",
      following: "12",
      category: "Shopping & Retail",
      bio: "Lifestyle deals, trending picks, daily shop drops.",
      link: "blue-bud-limited-store.com",
      ],
      grid: [
        "./images/creator3-grid1.jpg",
        "./images/creator3-grid2.jpg",
        "./images/creator3-grid3.jpg",
      ]
    }
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

function renderCreatorProfile() {
  const reel = reels[activeReelIndex];
  const profile = reel.creatorProfile;
  if (!profile) return;

  if (creatorProfileAvatar) creatorProfileAvatar.src = profile.avatar;
  if (creatorProfileHandle) creatorProfileHandle.textContent = profile.handle;
  if (creatorProfileVerified) creatorProfileVerified.style.display = profile.verified ? "inline-block" : "none";
  if (creatorProfileDisplayName) creatorProfileDisplayName.textContent = profile.displayName;
  if (creatorPostsCount) creatorPostsCount.textContent = profile.posts;
  if (creatorFollowersCount) creatorFollowersCount.textContent = profile.followers;
  if (creatorFollowingCount) creatorFollowingCount.textContent = profile.following;
  if (creatorProfileCategory) creatorProfileCategory.textContent = profile.category;
  if (creatorProfileBio) creatorProfileBio.textContent = profile.bio;
  if (creatorProfileLink) creatorProfileLink.textContent = profile.link;

  if (creatorProfileGrid) {
    creatorProfileGrid.innerHTML = "";
    (profile.grid || []).forEach((imgSrc) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "Creator post";
      creatorProfileGrid.appendChild(img);
    });
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

    if (postAccountName && creatorProfilePopup) {
  postAccountName.addEventListener("click", () => {
    renderCreatorProfile();
    creatorProfilePopup.classList.remove("hidden");
  });
}

if (closeCreatorProfileBtn && creatorProfilePopup) {
  closeCreatorProfileBtn.addEventListener("click", () => {
    creatorProfilePopup.classList.add("hidden");
  });
}
}

const conversationData = {
  haydude: {
    name: "Best Friend",
    avatar: "BFF",
    messages: [
      { who: "them", text: "Yooo heard of this guy Thorus viral recently?" },
      { who: "me", text: "Huh who?" },
      { who: "them", text: "Lol you will find later" },
      { who: "them", text: "How's your FC Barcel dream going?" },
      { who: "me", text: "Still tryna figure out way to apply, hope they reply to me soon" },
      { who: "them", text: "I got a chat recently from someone named \"I'm just a girl\" tryna rizz me up recently lmao" },
      { who: "me", text: "Whaa tell me more" },
      { who: "them", text: "Bro's a truly NPC, just a troller, I blocked them yea" },
      { who: "me", text: "Hahaha" },
      { who: "me", text: "It's late, let's go to sleep for smarter like me lil bro" },
      { who: "them", text: "Sureee" },
      { who: "them", text: "Thank you bro! 🙌" }
    ]
  },

  david: {
    name: "MrLeast",
    avatar: "ML",
    messages: [
      { who: "them", type: "link", text: "joinmrleast.com" },
      { who: "them", text: "Wanna be in my next video? 👀" }
    ]
  },

  understandable: {
    name: "FC Barcel FanPage",
    avatar: "FB",
    messages: [
      { who: "me", text: "Dear FC Barcel, I am Alexiska Vanz, despite background being an online influencer, I'm secretly discipline football hustler. I've been training in my freetime with one of your side trainer Defiso Jipph, you can discuss with him about my ability. May I have an opportunity for tryout for the team?" },
      { who: "them", text: "Thank you for reaching out. It's a pleasure to talk to you Alexiska Vanz. Here is the link to apply for tryout to our football team this season:" },
      { who: "them", type: "link", text: "applytryout.com" },
      { who: "them", text: "There's a little fee to it, hope to see you soon!" }
    ]
  },

  fortnite: {
    name: "Fortnite Gang",
    avatar: "FG",
    isGroup: true,
    messages: [
      { who: "them", sender: "Cold Snipe", text: "Free V-Bucks drop guys!" },
      { who: "them", sender: "Cold Snipe", type: "link", text: "freevbucks.com" },
      { who: "them", sender: "Messy Ety", text: "Wow where you find this??" },
      { who: "them", sender: "Cold Snipe", text: "There's this guy I met on Fortnite shared it to me" },
      { who: "them", sender: "Headshot100", text: "Idk man that's kinda sus" },
      { who: "them", sender: "Cold Snipe", text: "Scaredy cat haha" },
      { who: "them", sender: "Lebon Jems", text: "JACKPOT FRR!!🤑💲" }
    ]
  },

  girl: {
    name: "I'm just a girl",
    avatar: "G",
    messages: [
      { who: "them", text: "Are you alone right now?" }
    ]
  },

  jada: {
    name: "Realationall",
    avatar: "R",
    messages: [
      { who: "them", text: "I have a Youtube channel" },
      { who: "them", type: "link", text: "https://www.youtube.com/@Realationall" },
      { who: "them", text: "Let's collab a video? 😃🙀" }
    ]
  }
};

function renderConversation(contact) {
  if (!conversationThread) return;

  const selected = conversationData[contact] || conversationData.haydude;

  if (conversationName) conversationName.textContent = selected.name;
  if (conversationAvatar) conversationAvatar.textContent = selected.avatar;

  conversationThread.innerHTML = "";

  selected.messages.forEach((msg) => {
    const row = document.createElement("div");
    row.className = `ig-message-row ${msg.who === "me" ? "me" : "them"}`;

    const bubble = document.createElement("div");
    bubble.className = `ig-message-bubble ${msg.who === "me" ? "me" : "them"}`;

    if (selected.isGroup && msg.sender) {
      const sender = document.createElement("div");
      sender.className = "ig-message-sender";
      sender.textContent = msg.sender;
      bubble.appendChild(sender);
    }

    if (msg.type === "link") {
      const link = document.createElement("a");
      link.className = "ig-message-link";
      link.href = msg.text.startsWith("http") ? msg.text : `https://${msg.text}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = msg.text;
      bubble.appendChild(link);
    } else {
      const text = document.createElement("div");
      text.className = "ig-message-text";
      text.textContent = msg.text;
      bubble.appendChild(text);
    }

    row.appendChild(bubble);
    conversationThread.appendChild(row);
  });

  conversationThread.scrollTop = conversationThread.scrollHeight;
}

function openConversation(contact) {
  if (!conversationPopup || !messagesPopup) return;

  renderConversation(contact);

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
