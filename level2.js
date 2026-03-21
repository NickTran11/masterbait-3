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
const openMessagesFromRailBtn = document.getElementById("openMessagesFromRailBtn");
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

const tasksLauncherBtn = document.getElementById("tasksLauncherBtn");
const tasksOverlay = document.getElementById("tasksOverlay");
const closeTasksBtn = document.getElementById("closeTasksBtn");
const exitTasksBtn = document.getElementById("exitTasksBtn");
const nextTaskBtn = document.getElementById("nextTaskBtn");
const revealTaskHintBtn = document.getElementById("revealTaskHintBtn");
const taskQuestionNumber = document.getElementById("taskQuestionNumber");
const taskQuestionText = document.getElementById("taskQuestionText");
const taskHintBox = document.getElementById("taskHintBox");
const taskOptions = document.getElementById("taskOptions");
const taskFeedback = document.getElementById("taskFeedback");
const tasksProgressText = document.getElementById("tasksProgressText");
const tasksProgressFill = document.getElementById("tasksProgressFill");
const tasksTopBadge = document.getElementById("tasksTopBadge");
  
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
      avatar: "./thorusavatar.jpeg",
      handle: "thorus_canva.official",
      verified: true,
      displayName: "Thorus Canva",
      posts: "24",
      followers: "951K",
      following: "111",
      category: "Entrepreneur",
      bio: "Day one, one day",
      link: "the-thorus-way.com",
      grid: [
        "./thoruspost1.mov",
        "./thoruspost2.jpeg",
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
      avatar: "./cutemootionavatar.png",
      handle: "cute_mootion",
      verified: false,
      displayName: "Cute Mootion",
      posts: "9",
      followers: "32",
      following: "418",
      category: "Video Creator",
      bio: "Short trend edits and viral remix posts ✨",
      link: "cute-mootion-vibes.net",
      grid: [
        "./cutemootionpost1.jpeg",
        "./cutemootionpost2.jpeg",
        "./cutemootionpost3.jpeg",
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
      avatar: "./bluebudavatar.png",
      handle: "blue_bud",
      verified: false,
      displayName: "Blue Bud Store",
      posts: "1",
      followers: "8,421",
      following: "12",
      category: "Shopping & Retail",
      bio: "Lifestyle deals, trending picks, daily shop drops.",
      link: "blue-bud-limited-store.com",
      grid: [
        "./reel3.png",
        "./images/creator3-grid2.jpg",
        "./images/creator3-grid3.jpg",
      ]
    }
  }
];
  let revealedHintCount = 0;
  let retryCount = 0;
  let waitingForProof = false;
let finalScore = 0;

const level2Tasks = [
  {
    question: "Look at the thorus_canva.official creator page. Can we trust him based only on a high number of followers and a verified badge?",
    hint: "Social media… hmm…",
    options: [
      "a. Yes",
      "b. No"
    ],
    correctIndex: 1,
    feedback: "A verified badge and many followers on social media can be bought or generated by bots."
  },
  {
    question: "Check out Reel#1 from thorus_canva.official and visit his creator page. Is his course  trustworthy?",
    hint: "Look beyond numbers, real-world evidence matters.",
    options: [
      "a. No, all online courses are scams.",
      "b. No, because there is no proof of successful students",
      "c. Yes, because he explains how he created his courses and shows a luxury lifestyle.",
      "d. Yes, because his name is on the news about his success."
    ],
    correctIndex: 3,
    feedback: "Messages from Best Friend reveal that his name “Thorus Canva” is appearing in real news. News sources are generally more trustworthy than social media alone."
  },
  {
    question: "Check Post#2 on the Thorus Canva creator page. How can you verify that the post is real?",
    hint: "",
    options: [
      "a. Look closely for signs of editing, Photoshop, or AI.",
      "b. Check when the post was published.",
      "c. Search for external articles or sources showing Thorus working with those billionaires.",
      "d. Message him directly to ask."
    ],
    correctIndex: 2,
    feedback: "Social media alone is not reliable. Always verify using trustworthy external sources."
  },
  {
    question: "Check out Reel#2 from cute_mootion and visit their creator page. Is Reel#2 legit or phishing?",
    hint: "Look at sunniepop comment.",
    options: [
      "a. Legit",
      "b. Phishing"
    ],
    correctIndex: 1,
    feedback: "This is an interactive reel hiding a malicious link. When users click, it redirects them to a phishing site."
  },
  {
    question: "Look at the \"Shop Now\" button in Reel#3. What is the main risk?",
    hint: "Check where the button redirects.",
    options: [
      "a. It loads slowly",
      "b. It may redirect to a phishing site",
      "c. It has animation",
      "d. It is colorful"
    ],
    correctIndex: 1,
    feedback: "Attackers often hide malicious links behind buttons. Always check destination URL."
  },
  {
    question: "Reel#3 is a scam and the product does not exists, but 90% of the comments say they bought it and like it. Why is this likely happening?",
    hint: "Anyone can comment",
    options: [
      "a. Fake comments, spam or bots",
      "b. People mixed up the product from other store.",
      "c. Social media glitch",
      "d. People genuinely like it"
    ],
    correctIndex: 0,
    feedback: "Comments are easy to fake. Scammers may buy comments or post them themselves to create false trust."
  },
  {
    question: "What is best source to verify information?",
    hint: "",
    options: [
      "a. Social media pages",
      "b. Recommendations from many people",
      "c. Official website"
    ],
    correctIndex: 2,
    feedback: "Social media is not always reliable. Official sources are more trustworthy."
  },
  {
    question: "Check message from MrLeast. Is it legit or phishing?",
    hint: "Look at the link",
    options: [
      "a. Legit",
      "b. Phishing"
    ],
    correctIndex: 1,
    feedback: "The link \"linuxsecurityupdate\" is unrelated to the message context, which is a red flag."
  },
  {
    question: "Check message from FC Barcel FanPage. Can we trust their reply and offer?",
    hint: "Verify from the original source.",
    options: [
      "a. Yes, because their reply sounds professional and welcome",
      "b. Yes, because they look forward to meet up with me soon.",
      "c. No, because it is a fanpage, not the official club page.",
      "d. No, because they demand fee for the tryout."
    ],
    correctIndex: 2,
    feedback: "Always verify information using the official FC Barcel page, not a fan page"
  },
  {
    question: "Check message from Fortnite Gang. Who is correct about the QR code?",
    hint: "Trick or treat?",
    options: [
      "a. Cold Snipe",
      "b. Headshot100"
    ],
    correctIndex: 1,
    feedback: "Nothing is truly free without verification. Always confirm the source first."
  },
  {
    question: "Check message from \"I'm just a girl\". What is the best action?",
    hint: "Background context helps.",
    options: [
      "a. Block them",
      "b. Reply and make friend",
      "c. Report phishing",
      "d. Report to IT security"
    ],
    correctIndex: 0,
    feedback: "Messages from Best Friend suggest this account is just trolling. Reporting would be unnecessary. Blocking is the best option."
  },
  {
    question: "Check message from Realationall. Should you collaborate with them?",
    hint: "Your choice 😄",
    options: [
      "a. Yes",
      "b. Yes"
    ],
    correctIndex: [0,1],
    feedback: "This one is just for fun - it’s actually a real YouTube account."
  },
  {
    question: "Messages from Best Friend have been useful so far. Should we always trust them?",
    hint: "Message are just text.",
    options: [
      "a. Yes",
      "b. No"
    ],
    correctIndex: 1,
    feedback: "You don’t always know who is behind a message. Accounts can be hacked. For important matters, verify through a call, meet in-person or another method."
  },
  {
  type: "counter",
  question: "Be honest, how many times have you got baited?",
  hint: "",
  min: 0,
  max: 99,
  startValue: 0,
  feedbackZero: "Perfect! You are genius",
  feedbackLow: "Uh oh! One bait is enough to harm your device, be more cautious!",
  feedbackHigh: "Oh no! Check and verify all sources before enter any link, your device needs to be safe!"
}
];
  let taskAnswers = new Array(level2Tasks.length).fill(null);

let currentTaskIndex = 0;
const answeredTaskIndexes = new Set();
  
  init();

  function init() {
    renderScenario();
    renderFeed();
    renderHints();
    renderTaskQuestion();
    bindScenarioButtons();
    bindFeedButtons();
    bindActions();
    bindProof();
    bindTaskButtons();
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

  // Reel 2: clicking the reel sends player to hacked page
  if (activeReelIndex === 1) {
    video.style.cursor = "pointer";
    video.addEventListener("click", () => {
      window.location.href = "https://nicktran11.github.io/youjustgothacked/index.html";
    });
  }

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

  // Reel 3 clickable SHOP NOW circle
  if (activeReelIndex === 2) {
    const shopBtn = document.createElement("a");
    shopBtn.className = "reel-shop-now-btn";
    shopBtn.href = "https://nicktran11.github.io/youjustgothacked/index.html";
    shopBtn.target = "_blank";
    shopBtn.rel = "noopener noreferrer";
    shopBtn.textContent = "SHOP NOW";

    reelSlide.appendChild(shopBtn);
  }
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

  if (profile.handle === "thorus_canva.official") {
    creatorProfileGrid.classList.add("thorus-grid");
  } else {
    creatorProfileGrid.classList.remove("thorus-grid");
  }

  profile.grid.forEach((src, index) => {
    let element;

    if (src.endsWith(".mov") || src.endsWith(".mp4")) {
      element = document.createElement("video");
      element.src = src;
      element.autoplay = true;
      element.loop = true;
      element.playsInline = true;
      element.controls = true;

      // Thorus post 1 should have sound
      if (profile.handle === "thorus_canva.official" && index === 0) {
        element.muted = false;
      } else {
        element.muted = true;
      }
    } else {
      element = document.createElement("img");
      element.src = src;
      element.alt = "Creator post";
    }

    element.className = "creator-grid-item";
    creatorProfileGrid.appendChild(element);
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

function updateTasksBadge() {
  if (!tasksTopBadge) return;
  const remaining = Math.max(level2Tasks.length - answeredTaskIndexes.size, 0);
  tasksTopBadge.textContent = remaining;
}

function openTasksPanel(index = currentTaskIndex) {
  if (!tasksOverlay) return;
  currentTaskIndex = Math.max(0, Math.min(index, level2Tasks.length - 1));
  renderTaskQuestion();
  tasksOverlay.classList.remove("hidden");
  tasksOverlay.setAttribute("aria-hidden", "false");
}

function closeTasksPanel() {
  if (!tasksOverlay) return;
  tasksOverlay.classList.add("hidden");
  tasksOverlay.setAttribute("aria-hidden", "true");
}

function renderTaskQuestion() {
  const tasksHeader = document.querySelector(".tasks-header");
const tasksIntro = document.querySelector(".tasks-intro");
const tasksProgress = document.querySelector(".tasks-progress");
const tasksFooter = document.querySelector(".tasks-footer");
const backToFeedBtn = document.getElementById("exitTasksBtn");

if (tasksHeader) tasksHeader.classList.remove("hidden");
if (tasksIntro) tasksIntro.classList.remove("hidden");
if (tasksProgress) tasksProgress.classList.remove("hidden");
if (tasksFooter) tasksFooter.classList.remove("hidden");
if (backToFeedBtn) backToFeedBtn.classList.remove("hidden");
  nextTaskBtn.onclick = null;
  if (!taskQuestionText || !taskOptions || !taskQuestionNumber || !tasksProgressText || !tasksProgressFill) return;

  const task = level2Tasks[currentTaskIndex];
  const answered = answeredTaskIndexes.has(currentTaskIndex);

  taskQuestionNumber.textContent = `Question ${currentTaskIndex + 1} / ${level2Tasks.length}`;
  tasksProgressText.textContent = `Question ${currentTaskIndex + 1} of ${level2Tasks.length}`;
  tasksProgressFill.style.width = `${((currentTaskIndex + 1) / level2Tasks.length) * 100}%`;

  taskQuestionText.textContent = task.question;

  if (task.hint && task.hint.trim()) {
    revealTaskHintBtn.classList.remove("hidden");
    revealTaskHintBtn.disabled = false;
    revealTaskHintBtn.textContent = "Reveal Hint";
  } else {
    revealTaskHintBtn.classList.add("hidden");
  }

  taskHintBox.classList.add("hidden");
  taskHintBox.textContent = task.hint || "";

  taskFeedback.classList.add("hidden");
  taskFeedback.classList.remove("correct", "wrong");
  taskFeedback.textContent = "";

  nextTaskBtn.classList.add("hidden");
  taskOptions.innerHTML = "";

if (task.type === "counter") {
  const min = Number.isFinite(task.min) ? task.min : 0;
  const max = Number.isFinite(task.max) ? task.max : 99;
  const startValue = Number.isFinite(task.startValue) ? task.startValue : min;

  taskOptions.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:16px;">
      <button type="button" class="task-option-btn" data-counter-action="decrease">-</button>
      <div id="taskCounterValue" style="min-width:88px; text-align:center; font-size:2rem; font-weight:800; padding:12px 16px; border-radius:16px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14);">
        ${startValue}
      </div>
      <button type="button" class="task-option-btn" data-counter-action="increase">+</button>
    </div>

    <button type="button" class="task-option-btn" id="taskCounterSubmit">Submit Answer</button>
  `;

  const counterValueEl = taskOptions.querySelector("#taskCounterValue");
  const decreaseBtn = taskOptions.querySelector('[data-counter-action="decrease"]');
  const increaseBtn = taskOptions.querySelector('[data-counter-action="increase"]');
  const submitBtn = taskOptions.querySelector("#taskCounterSubmit");

  let currentValue = startValue;

  const paintCounterValue = () => {
    counterValueEl.textContent = currentValue;
  };

  decreaseBtn.addEventListener("click", () => {
    currentValue = Math.max(min, currentValue - 1);
    paintCounterValue();
  });

  increaseBtn.addEventListener("click", () => {
    currentValue = Math.min(max, currentValue + 1);
    paintCounterValue();
  });

  submitBtn.addEventListener("click", () => {
    handleCounterTaskAnswer(currentValue);
  });

} else {
  task.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "task-option-btn";
    btn.textContent = optionText;
    btn.addEventListener("click", () => handleTaskAnswer(index));
    taskOptions.appendChild(btn);
  });
}

if (answered) {
  lockTaskOptions();
}

  updateTasksBadge();
}

function lockTaskOptions() {
  taskOptions.querySelectorAll("button").forEach(btn => {
    btn.classList.add("is-disabled");
    btn.disabled = true;
  });
}

function handleTaskAnswer(selectedIndex) {
  const task = level2Tasks[currentTaskIndex];
  const optionButtons = [...taskOptions.querySelectorAll(".task-option-btn")];
  const correctIndexes = Array.isArray(task.correctIndex) ? task.correctIndex : [task.correctIndex];
const isCorrect = correctIndexes.includes(selectedIndex);

  optionButtons.forEach((btn, index) => {
    btn.disabled = true;
    btn.classList.add("is-disabled");

    if (correctIndexes.includes(index)) {
  btn.classList.add("is-correct");
}
if (index === selectedIndex && !correctIndexes.includes(index)) {
  btn.classList.add("is-wrong");
}
  });

  taskFeedback.classList.remove("hidden");
  taskFeedback.classList.remove("correct", "wrong");
  taskFeedback.classList.add(isCorrect ? "correct" : "wrong");
  taskFeedback.textContent = `${isCorrect ? "Correct ✅" : "Incorrect ❌"} ${task.feedback}`;

taskAnswers[currentTaskIndex] = selectedIndex;
  
  answeredTaskIndexes.add(currentTaskIndex);
  updateTasksBadge();

  if (currentTaskIndex < level2Tasks.length - 1) {
    nextTaskBtn.classList.remove("hidden");
    nextTaskBtn.textContent = "Next Question";
  } else {
    nextTaskBtn.classList.remove("hidden");
    nextTaskBtn.textContent = "See Scores";
  }
}

function handleCounterTaskAnswer(selectedValue) {
  const task = level2Tasks[currentTaskIndex];

  lockTaskOptions();

  taskFeedback.classList.remove("hidden");
  taskFeedback.classList.remove("correct", "wrong");

  let feedbackText = "";

  if (selectedValue === 0) {
    taskFeedback.classList.add("correct");
    feedbackText = `0 - ${task.feedbackZero}`;
  } else if (selectedValue >= 1 && selectedValue <= 3) {
    taskFeedback.classList.add("wrong");
    feedbackText = `${selectedValue} - ${task.feedbackLow}`;
  } else {
    taskFeedback.classList.add("wrong");
    feedbackText = `${selectedValue} - ${task.feedbackHigh}`;
  }

  taskFeedback.textContent = feedbackText;

taskAnswers[currentTaskIndex] = selectedValue;
  
  answeredTaskIndexes.add(currentTaskIndex);
  updateTasksBadge();

  if (currentTaskIndex < level2Tasks.length - 1) {
    nextTaskBtn.classList.remove("hidden");
    nextTaskBtn.textContent = "Next Question";
  } else {
    nextTaskBtn.classList.remove("hidden");
    nextTaskBtn.textContent = "See Scores";
  }
}
  
function goToNextTask() {
  if (currentTaskIndex < level2Tasks.length - 1) {
    currentTaskIndex += 1;
    renderTaskQuestion();
  } else {
    renderScoreSummary();
  }
}

function bindTaskButtons() {
  if (tasksLauncherBtn) {
    tasksLauncherBtn.addEventListener("click", () => {
      openTasksPanel(currentTaskIndex);
    });
  }

  if (closeTasksBtn) {
    closeTasksBtn.addEventListener("click", closeTasksPanel);
  }

  if (exitTasksBtn) {
    exitTasksBtn.addEventListener("click", closeTasksPanel);
  }

  if (nextTaskBtn) {
    nextTaskBtn.addEventListener("click", goToNextTask);
  }

  if (revealTaskHintBtn) {
    revealTaskHintBtn.addEventListener("click", () => {
      const task = level2Tasks[currentTaskIndex];
      if (!task.hint || !task.hint.trim()) return;

      taskHintBox.textContent = `Hint: ${task.hint}`;
      taskHintBox.classList.remove("hidden");
      revealTaskHintBtn.disabled = true;
      revealTaskHintBtn.textContent = "Hint Revealed";
    });
  }
}

function calculateFinalScore() {
  let score = 0;

  for (let i = 0; i < 13; i++) {
  const task = level2Tasks[i];
  const correctIndexes = Array.isArray(task.correctIndex) ? task.correctIndex : [task.correctIndex];

  if (correctIndexes.includes(taskAnswers[i])) {
    score += 1;
  }
}

  const q14 = Number(taskAnswers[13] ?? 0);

  if (q14 === 0) score += 3;
  else if (q14 >= 1 && q14 <= 3) score += 1;
  else score += 0;

  finalScore = score;
  return score;
}

function getQuestion14ScoreText() {
  const q14 = Number(taskAnswers[13] ?? 0);

  if (q14 === 0) return "Q14: 0 bait → 3 points";
  if (q14 >= 1 && q14 <= 3) return "Q14: 1–3 bait → 1 point";
  return "Q14: 4 or more baits → 0 point";
}

function getStarsFromScore(score) {
  if (score <= 3) return 0;
  if (score <= 9) return 1;
  if (score <= 15) return 2;
  return 3;
}

function renderScoreSummary() {
  const score = calculateFinalScore();

  taskQuestionNumber.textContent = "Mission Complete";
  taskQuestionText.textContent = `Your score: ${score} / 16`;

  taskHintBox.classList.remove("hidden");
  taskHintBox.innerHTML = `
    ${level2Tasks.slice(0,13).map((t,i)=>{
  const correctIndexes = Array.isArray(t.correctIndex) ? t.correctIndex : [t.correctIndex];
  return `Q${i+1}: ${correctIndexes.includes(taskAnswers[i]) ? "Correct ✅" : "Wrong ❌"}`
}).join("<br>")}
    <br><br>${getQuestion14ScoreText()}
  `;

  taskOptions.innerHTML = `
    <div class="score-card score-card-enter">
      <div class="score-big">${score}<span>/16</span></div>
      <div class="score-sub">Mission complete</div>
    </div>
  `;

  nextTaskBtn.textContent = "See Feedback";
  nextTaskBtn.onclick = showScoreFishCoachFeedback;
}

function getScoreFeedbackPayload(score) {
  if (score <= 3) {
    return {
      title: "Fish Coach Feedback",
      body: "Whoa… you got baited a lot. Don’t worry — this is how we learn. Slow down before clicking anything online.",
      tips: [
        "Pause before clicking links in DMs, comments, or reels.",
        "Do not trust messages just because they sound friendly or urgent.",
        "Watch for red flags like weird usernames, pressure, and fake rewards.",
        "Never type your password or personal info into random links.",
        "If you are not sure, verify first from an official source."
      ],
      mood: "bad"
    };
  }

  if (score <= 9) {
    return {
      title: "Fish Coach Feedback",
      body: "Nice try! You caught some traps, but a few still slipped through. Let’s sharpen your scam radar.",
      tips: [
        "Double-check links before opening them.",
        "Be careful with giveaways, free rewards, and collab offers.",
        "Even messages from friends can be fake if their account was hacked.",
        "Do not trust random comments or influencer hype alone.",
        "When something feels suspicious, stop and verify."
      ],
      mood: "warn"
    };
  }

  if (score <= 15) {
    return {
      title: "Fish Coach Feedback",
      body: "Great job! You are thinking carefully and spotting most traps. Keep building safe habits.",
      tips: [
        "Verify accounts through official websites or trusted pages.",
        "Check usernames, links, and comment patterns for clues.",
        "Do not let fear of missing out rush your decisions.",
        "Be cautious with shortened links and fake login pages.",
        "Smart users verify before they trust."
      ],
      mood: "good"
    };
  }

  return {
    title: "Fish Coach Feedback",
    body: "Perfect! You stayed sharp and avoided every bait. You are thinking like a real scam detector.",
    tips: [
      "Keep verifying links and profiles before trusting them.",
      "Stay alert because scams keep changing.",
      "Help friends and family spot phishing and fake social media tricks.",
      "Do not rely only on badges, followers, or comments.",
      "Safe habits beat social engineering."
    ],
    mood: "great"
  };
}

function showScoreFishCoachFeedback() {
  const score = finalScore;
  const payload = getScoreFeedbackPayload(score);

if (window.showFishCoachCustom) {
  window.showFishCoachCustom({
    title: payload.title,
    body: `${payload.body}\n\n• ${payload.tips.join("\n• ")}`
  });
}

  if (window.setFishCoachCloseHandler) {
    window.setFishCoachCloseHandler(() => {
      renderStarsScreen();
    });
  }
}
  
function renderStarsScreen() {
  const stars = getStarsFromScore(finalScore);

  let starsHtml = "";
  for (let i = 0; i < 3; i++) {
    starsHtml += `
      <img
        class="result-star-img ${i < stars ? "filled" : "empty"}"
        src="${i < stars ? "./star-filled.png" : "./star-empty.png"}"
        alt="star"
      />
    `;
  }

  let message = "";
  let themeClass = "";

  if (stars === 0) {
    message = "0 star - We Learn New Things Everyday";
    themeClass = "stars-theme-0";
  } else if (stars === 1) {
    message = "1 star - Good Job!";
    themeClass = "stars-theme-1";
  } else if (stars === 2) {
    message = "2 stars - Excellent!";
    themeClass = "stars-theme-2";
  } else {
    message = "3 stars - Perfect!";
    themeClass = "stars-theme-3";
  }

  taskQuestionNumber.textContent = "Stars";
  taskQuestionText.textContent = "Mission Result";

  taskHintBox.classList.add("hidden");
  taskFeedback.classList.add("hidden");

const tasksCardHeader = document.querySelector(".tasks-card-header");
const tasksProgressBar = document.querySelector(".tasks-progress-bar");
const tasksIntroNote = document.querySelector(".tasks-intro-note");
const tasksFooter = document.querySelector(".tasks-footer");
const taskQuestionShell = document.querySelector(".task-question-shell");
const tasksBody = document.querySelector(".tasks-body");

if (tasksCardHeader) tasksCardHeader.classList.add("hidden");
if (tasksProgressBar) tasksProgressBar.classList.add("hidden");
if (tasksIntroNote) tasksIntroNote.classList.add("hidden");
if (tasksFooter) tasksFooter.classList.add("hidden");

if (taskQuestionShell) {
  taskQuestionShell.classList.add("stars-only-shell");
}

if (tasksBody) {
  tasksBody.classList.add("stars-only-body");
}

  taskOptions.innerHTML = `
    <div class="stars-final-screen ${themeClass}">
      <div class="stars-final-wrap stars-screen-enter">
        <div class="stars-final-row">
          ${starsHtml}
        </div>

        <div class="stars-final-message">${message}</div>

        <div class="stars-final-buttons">
          <button type="button" class="stars-action-btn" id="tryAgainBtn">Try Again</button>
          <button type="button" class="stars-action-btn primary" id="backToLevelMapBtn">Go Back to Level Map</button>
        </div>
      </div>
    </div>
  `;

  nextTaskBtn.classList.add("hidden");

  const tryAgainBtn = document.getElementById("tryAgainBtn");
  const backToLevelMapBtn = document.getElementById("backToLevelMapBtn");

  if (tryAgainBtn) {
    tryAgainBtn.addEventListener("click", () => {
      resetLevel2TasksProgress();
      openTasksPanel(0);
    });
  }

  if (backToLevelMapBtn) {
    backToLevelMapBtn.addEventListener("click", () => {
      window.location.href = "https://nicktran11.github.io/masterbait-3/levelMap.html";
    });
  }
}

function beginLevel2Mission() {
  if (!scenarioOverlay) return;
  scenarioOverlay.classList.add("hidden");
  scenarioOverlay.setAttribute("aria-hidden", "true");
}

function openLevel2Dossier() {
  if (!scenarioOverlay) return;
  scenarioOverlay.classList.remove("hidden");
  scenarioOverlay.setAttribute("aria-hidden", "false");
}

function resetLevel2TasksProgress() {
  currentTaskIndex = 0;
  answeredTaskIndexes.clear();
  taskAnswers = new Array(level2Tasks.length).fill(null);
  finalScore = 0;

  level2Tasks.forEach((task) => {
    if (task.type === "counter") {
      task.currentValue = Number.isFinite(task.startValue) ? task.startValue : 0;
    }
  });

  updateTasksBadge();
  renderTaskQuestion();
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

    if (openMessagesFromRailBtn && messagesPopup) {
  openMessagesFromRailBtn.addEventListener("click", () => {
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
  bestfriend: {
    name: "Best Friend",
    avatar: "BFF",
    messages: [
      { who: "them", text: "Yooo heard of this guy Thorus viral recently on the news?" },
      { who: "me", text: "Huh who?" },
      { who: "them", text: "Lol you will find out soon, he's popping up right now!" },
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

  mrleast: {
    name: "MrLeast",
    avatar: "ML",
    messages: [
      { who: "them", type: "link", text: "https://nicktran11.github.io/linuxsecurityupdate/" },
      { who: "them", text: "Wanna be in my next video? 👀" }
    ]
  },

  fcbarcel: {
    name: "FC Barcel FanPage",
    avatar: "FB",
    messages: [
      { who: "me", text: "Dear FC Barcel, I am Alexiska Vanz, despite background being an online influencer, I'm secretly discipline football hustler. I've been training in my freetime with one of your side trainer Defiso Jipph, you can discuss with him about my ability. May I have an opportunity for tryout for the team?" },
      { who: "them", text: "Thank you for reaching out. It's a pleasure to talk to you Alexiska Vanz. Here is the link to apply for tryout to our football team this season:" },
      {
  who: "them",
  type: "imageLink",
  imageSrc: "./fcbarcelposter.png",
  href: "https://tinyurl.com/fcbarcelapplytryout",
  alt: "FC Barcel tryout poster"
},
      { who: "them", text: "There's a little fee to it, hope to see you soon!" }
    ]
  },

  fortnite: {
    name: "Fortnite Gang",
    avatar: "FG",
    isGroup: true,
    messages: [
      { who: "them", sender: "Cold Snipe", text: "Free V-Bucks drop guys!" },
      {
  who: "them",
  sender: "Cold Snipe",
  type: "imageLink",
  imageSrc: "./fortnite-qr.png",
  href: "https://tinyurl.com/fcbarcelapplytryout",
  alt: "Fortnite free V-Bucks QR code"
},
      { who: "them", sender: "Messy Ety", text: "Wow where you find this??" },
      { who: "them", sender: "Cold Snipe", text: "There's this guy I met on Fortnite shared it to me" },
      { who: "them", sender: "Headshot100", text: "Idk man that's kinda sus" },
      { who: "them", sender: "Cold Snipe", text: "Scaredy cat haha" },
      { who: "them", sender: "Lebon Jems", text: "JACKPOT FRR!!🤑💲" }
    ]
  },

  girl: {
    name: "I'm just a girl 💅",
    avatar: "G",
    messages: [
      { who: "them", text: "Are you alone right now?" }
    ]
  },

  realationall: {
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

  const selected = conversationData[contact] || conversationData.bestfriend;

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

    if (msg.type === "imageLink") {
  const link = document.createElement("a");
  link.className = "ig-message-image-link";
  link.href = msg.href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const img = document.createElement("img");
  img.className = "ig-message-image";
  img.src = msg.imageSrc;
  img.alt = msg.alt || "Linked image";

  link.appendChild(img);
  bubble.appendChild(link);
} else if (msg.type === "link") {
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

window.openTasksPanel = openTasksPanel;
