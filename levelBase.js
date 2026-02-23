// ================================
// Level Base Engine (shared)
// Requires:
//  - window.LEVEL_CONFIG = { id: X }
//  - data/levelXData.js sets window.LEVEL_DATA[X] = { meta:{...}, emails:[...] }
// ================================

// ---- Load level data ----
const levelId = window.LEVEL_CONFIG?.id ?? 1;
const level = window.LEVEL_DATA?.[levelId] ?? null;

if (!level) {
  console.error("No LEVEL_DATA found for level:", levelId);
}

// ---- Derive config from level data (with safe defaults) ----
const meta = level?.meta ?? {};
const minutes = meta.minutes ?? 5;
const levelTitle = meta.title ?? "Level";
const levelObjective = meta.objective ?? "";

const emails = Array.isArray(level?.emails) ? level.emails : [];
const LEVEL_TOTAL_ITEMS = emails.length;

let itemsCompleted = 0;
let score = 0;

// minutes -> seconds
let secondsLeft = Math.max(0, minutes * 60);
let timerInterval = null;

// ---- DOM ----
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const progressTextEl = document.getElementById("progressText");
const progressFillEl = document.getElementById("progressFill");

const countEl = document.getElementById("count");

const emailListContainer = document.querySelector(".email-items");
const readerSubjectEl = document.getElementById("readerSubject");
const readerMetaEl = document.getElementById("readerMeta");
const readerBodyEl = document.getElementById("readerBody");

// Optional HUD title/objective (if you added these in HTML)
const headerTitleEl = document.getElementById("levelTitle");
const headerSubEl = document.querySelector(".hud-subtitle");

// ---- Helpers ----
function formatTime(sec) {
  const s = Math.max(0, sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function setScore(newScore) {
  score = Math.max(0, newScore);
  if (scoreEl) scoreEl.textContent = score;
}

function addScore(delta) {
  setScore(score + delta);
}

function setProgress(done, total) {
  itemsCompleted = Math.max(0, Math.min(done, total));
  if (progressTextEl) progressTextEl.textContent = `${itemsCompleted}/${total}`;

  const pct = total > 0 ? (itemsCompleted / total) * 100 : 0;
  if (progressFillEl) progressFillEl.style.width = `${pct}%`;
}

// ---- Timer ----
function startTimer() {
  if (!timerEl) return;

  const timerPill = document.querySelector(".pill.timer");
  timerEl.textContent = formatTime(secondsLeft);

  // prevent double-start
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    secondsLeft--;
    timerEl.textContent = formatTime(secondsLeft);

    // warning/danger states
    if (timerPill) {
      if (secondsLeft <= 60) {
        timerPill.classList.remove("warning");
        timerPill.classList.add("danger");
      } else if (secondsLeft <= 120) {
        timerPill.classList.add("warning");
      }
    }

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.body.classList.add("timeup");
      console.log("Time up!");
    }
  }, 1000);
}

// ---- Email rendering ----
function loadEmail(email) {
  if (!email) return;

  if (readerSubjectEl) readerSubjectEl.textContent = email.subject ?? "Message";
  if (readerMetaEl) {
    const fromName = email.fromName ?? "Sender";
    const fromEmail = email.fromEmail ?? "";
    readerMetaEl.textContent = fromEmail
      ? `From: ${fromName} <${fromEmail}>`
      : `From: ${fromName}`;
  }
  if (readerBodyEl) readerBodyEl.innerHTML = email.bodyHtml ?? "<p>(No content)</p>";
}

function renderEmails() {
  if (!emailListContainer) return;

  emailListContainer.innerHTML = "";

  // update count in UI
  if (countEl) countEl.textContent = String(emails.length);

  emails.forEach((email, idx) => {
    const btn = document.createElement("button");
    btn.className = "email-item";
    if (idx === 0) btn.classList.add("selected");

    const tag = email.tag ? `<div class="tag ${email.tagType || "neutral"}">${email.tag}</div>` : "";

    btn.innerHTML = `
      <div class="from">${email.fromName ?? "Sender"}</div>
      <div class="subject">${email.subject ?? "Subject"}</div>
      <div class="preview">${email.preview ?? ""}</div>
      ${tag}
    `;

    btn.addEventListener("click", () => {
  document.querySelectorAll(".email-item").forEach(i => i.classList.remove("selected"));
  btn.classList.add("selected");
  loadEmail(email);
  setSelectedEmail(email);
});

    emailListContainer.appendChild(btn);
  });

  // load first email into reader
  if (emails.length > 0) {
  loadEmail(emails[0]);
  setSelectedEmail(emails[0]);
}
}

// ---- Init HUD text ----
if (headerTitleEl) headerTitleEl.textContent = `Level ${levelId} — ${levelTitle}`;
if (headerSubEl && levelObjective) headerSubEl.textContent = `Objective: ${levelObjective}`;

// =====================
// Email Action Handling
// =====================

// Track currently selected email
let selectedEmail = null;

function setSelectedEmail(email) {
  selectedEmail = email;
}

function handleEmailAction(actionName) {
  if (!selectedEmail) return;

  const actions = selectedEmail.actions || {};
  const outcome = actions[actionName];

  if (!outcome) {
    console.warn(`No outcome defined for action "${actionName}"`);
    return;
  }

  // Apply score
  if (typeof outcome.scoreDelta === "number") {
    addScore(outcome.scoreDelta);
  }

  // Apply progress
  if (typeof outcome.progressDelta === "number") {
    setProgress(itemsCompleted + outcome.progressDelta, LEVEL_TOTAL_ITEMS);
  }

  // Show feedback in Fish Coach popup (preferred)
if (outcome.coach && typeof window.showFishCoachCustom === "function") {
  window.showFishCoachCustom(outcome.coach);
} else if (outcome.feedbackTitle || outcome.feedbackHtml) {
  // fallback
  alert(
    `${outcome.feedbackTitle ?? "Result"}\n\n` +
    (outcome.feedbackHtml ?? "").replace(/<[^>]*>/g, "")
  );
}

  // Resolve email if needed
  if (outcome.markResolved) {
    const index = emails.indexOf(selectedEmail);
    if (index !== -1) {
      emails.splice(index, 1);
    }

    selectedEmail = null;
    renderEmails();
  }
}

// Attach click handlers to reader buttons
function wireActionButtons(){
  document.querySelectorAll(".reader-actions [data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      console.log("Clicked action:", action);
      handleEmailAction(action);
    });
  });
}


// ---- Init ----
setScore(0);
setProgress(0, LEVEL_TOTAL_ITEMS);

wireActionButtons();
renderEmails();
// startTimer(); // do not auto-start (modal controls start)

// =====================
// Start Modal logic
// =====================
const startModal = document.getElementById("startModal");
const modalReady = document.getElementById("modalReady");

function fillStartModal() {
  const titleEl = document.getElementById("modalTitle");
  const descEl = document.getElementById("modalDesc");
  const timeEl = document.getElementById("modalTime");
  const countEl2 = document.getElementById("modalCount");

  if (titleEl) titleEl.textContent = `Level ${levelId} — ${levelTitle}`;
  if (descEl) descEl.textContent = levelObjective || "Review the goal, then press Ready to begin.";
  if (timeEl) timeEl.textContent = formatTime(minutes * 60);
  if (countEl2) countEl2.textContent = String(LEVEL_TOTAL_ITEMS);

  // Optional: fill goals/tasks if your modal has these IDs
  const goalsUl = document.getElementById("modalGoals");
  const tasksUl = document.getElementById("modalTasks");

  if (goalsUl && Array.isArray(meta.goals)) {
    goalsUl.innerHTML = meta.goals.map(g => `<li>${g}</li>`).join("");
  }
  if (tasksUl && Array.isArray(meta.tasks)) {
    tasksUl.innerHTML = meta.tasks.map(t => `<li>${t}</li>`).join("");
  }
}

function openStartModal() {
  fillStartModal();
  startModal?.classList.remove("hidden");
}

function closeStartModal() {
  startModal?.classList.add("hidden");
}

// Show modal automatically when level loads
openStartModal();

// Only way forward = Ready
modalReady?.addEventListener("click", () => {
  closeStartModal();
  startTimer();
});

// =====================
// Hook for later gameplay logic
// =====================
function completeOneItem(scoreDelta = 0) {
  addScore(scoreDelta);
  setProgress(itemsCompleted + 1, LEVEL_TOTAL_ITEMS);
}
window.completeOneItem = completeOneItem;