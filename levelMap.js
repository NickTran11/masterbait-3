// ---------- Level data (edit text anytime) ----------
const LEVELS = {
  "1": {
    title: "Level 1 — Tutorial",
    objectives: [
      "Learn the inbox controls (open, report, delete)",
      "Understand Security vs Work score"
    ],
    unlocked: true
  },
  "2": {
    title: "Level 2 — Authority & Urgency",
    objectives: [
      "Spot authority/urgency manipulation",
      "Use Verify Sender when unsure"
    ],
    unlocked: true
  },
  "3": {
    title: "Level 3 — Smishing",
    objectives: [
      "Identify phishing attempts via text messages",
      "Recognize shortened and suspicious links"
    ],
    unlocked: false
  },
  "4": {
    title: "Level 4 — Clone Phishing",
    objectives: [
      "Compare similar emails for subtle differences",
      "Catch swapped links/attachments"
    ],
    unlocked: false
  },
  "5": {
    title: "Level 5 — Final Scenario",
    objectives: [
      "Apply skills across multiple messages",
      "Make safe choices under pressure"
    ],
    unlocked: false
  }
};

// ---------- Placement on path ----------
function placeNodesOnPath() {
  const map = document.getElementById("map");
  const path = document.getElementById("route");

  if (!map || !path) {
    console.error("Missing #map or #route in HTML");
    return;
  }

  const nodes = [...map.querySelectorAll(".level-node")];
  const labels = [...map.querySelectorAll(".level-label")];
  const ratings = [...map.querySelectorAll(".level-rating")];

  const total = path.getTotalLength();

  // Positions along the path (0..1). Tweak if you want spacing changes.
  const t = [0.03, 0.22, 0.48, 0.70, 0.92];

  nodes.forEach((node, i) => {
    const p = path.getPointAtLength(total * t[i]);

    // Convert to percentages based on viewBox 1000x500
    const xPct = (p.x / 1000) * 100;
    const yPct = (p.y / 500) * 100;

    node.style.left = `${xPct}%`;
    node.style.top = `${yPct}%`;

    // Find matching label by data-level and place it under the node
    const level = node.dataset.level;
    const label = labels.find(l => l.dataset.level === level);
    if (label) {
      label.style.left = `${xPct}%`;
      label.style.top = `calc(${yPct}% + 52px)`;
    }
    const rating = ratings.find(r => r.dataset.level === level);
if (rating) {
  rating.style.left = `${xPct}%`;
  rating.style.top  = `calc(${yPct}% - 50px)`; // above node
}
  });
}

// ---------- UI update helpers ----------
function setObjectives(ulEl, objectives) {
  ulEl.innerHTML = "";
  objectives.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ulEl.appendChild(li);
  });
}

function isLocked(node) {
  return node.classList.contains("locked");
}

function updateSidePanel(levelId) {
  const panel = document.querySelector(".level-info");
  const titleEl = panel?.querySelector("h2");
  const ulEl = panel?.querySelector("ul");
  const startBtn = panel?.querySelector(".start-btn");

  if (!titleEl || !ulEl || !startBtn) {
    console.error("Missing .level-info h2/ul/.start-btn in HTML");
    return;
  }

  const data = LEVELS[levelId];
  if (!data) return;

  titleEl.textContent = data.title;
  setObjectives(ulEl, data.objectives);

  // Enable Start only if unlocked (and not locked visually)
  if (data.unlocked) {
    startBtn.disabled = false;
    startBtn.style.opacity = "1";
    startBtn.style.cursor = "pointer";
  } else {
    startBtn.disabled = true;
    startBtn.style.opacity = "0.55";
    startBtn.style.cursor = "not-allowed";
  }

  // Store selected level on the button so you can use it later
  startBtn.dataset.level = levelId;
}

function moveSelectedGlow(clickedNode) {
  const allNodes = document.querySelectorAll(".level-node");
  allNodes.forEach(n => n.classList.remove("selected"));
  clickedNode.classList.add("selected");
}

function applyLockStatesFromData() {
  // Sync your node classes with LEVELS[].unlocked
  const nodes = document.querySelectorAll(".level-node");
  nodes.forEach(node => {
    const id = node.dataset.level;
    const data = LEVELS[id];
    if (!data) return;

    if (data.unlocked) {
      node.classList.remove("locked");
      // If you want unlocked-but-not-current to be "available":
      if (!node.classList.contains("current") && !node.classList.contains("completed")) {
        node.classList.add("available");
      }
    } else {
      node.classList.add("locked");
      node.classList.remove("available");
      node.classList.remove("current");
      node.classList.remove("completed");
    }
  });
}

function unlockLevel(levelId) {
  const node = document.querySelector(`.level-node[data-level="${levelId}"]`);
  if (!node) return;

  // Update data model
  if (!LEVELS[levelId]) return;
  LEVELS[levelId].unlocked = true;

  // Play animation on node (even if it currently has locked class)
  node.classList.add("unlocking");

  // After sparkle, switch to available and remove locked visuals
  setTimeout(() => {
    node.classList.remove("unlocking");
    applyLockStatesFromData(); // sync classes based on LEVELS
  }, 520);
}

// ---------- Click handling ----------
function wireLevelClicks() {
  const nodes = document.querySelectorAll(".level-node");
  const startBtn = document.querySelector(".start-btn");

  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const levelId = node.dataset.level;

      // If locked, demo-unlock it (REMOVE later if you want strict locking)
if (!LEVELS[levelId]?.unlocked || isLocked(node)) {
  unlockLevel(levelId);
  return;
}

      moveSelectedGlow(node);
      updateSidePanel(levelId);
    });
  });

  // Optional: Start button action (for now just logs / placeholder)
  startBtn?.addEventListener("click", () => {
  const levelId = startBtn.dataset.level;
  if (!levelId) return;

  const data = LEVELS[levelId];
  if (!data?.unlocked) return;

  const selectedNode = document.querySelector(".level-node.selected");
  if (!selectedNode) {
    // Fallback: navigate immediately if somehow no node is selected
    window.location.href = `level${levelId}.html`;
    return;
  }

  // Trigger launch animation
  document.body.classList.add("launching");
  selectedNode.classList.add("launching");

  // Navigate after animation finishes
  setTimeout(() => {
    window.location.href = `level${levelId}.html`;
  }, 450);
});
}
function setRodRating(levelId, earned) {
  const container = document.querySelector(`.level-rating[data-level="${levelId}"]`);
  if (!container) return;

  const slots = [...container.querySelectorAll(".rod-slot")];
  slots.forEach((slot, idx) => {
    slot.classList.toggle("filled", idx < earned);
  });
}

function initParallax(){
  const map = document.getElementById("map");
  if (!map) return;

  const nebula = map.querySelector(".map-nebula");
  const particles = map.querySelector(".map-particles");
  const nodes = [...map.querySelectorAll(".level-node")];

  let targetX = 0, targetY = 0;
  let curX = 0, curY = 0;
  let raf = null;

  function tick(){
    raf = null;

    // Smooth follow
    curX += (targetX - curX) * 0.12;
    curY += (targetY - curY) * 0.12;

    // Background layers move more
    if (nebula) nebula.style.transform = `translate3d(${curX * 22}px, ${curY * 14}px, 0)`;
    if (particles) particles.style.transform = `translate3d(${curX * 14}px, ${curY * 10}px, 0)`;

    // Nodes move tiny (1–2px range)
    nodes.forEach((n, idx) => {
      const depth = 0.8 + (idx % 3) * 0.2; // subtle variance
      n.style.setProperty("--parX", `${curX * 4 * depth}px`);
      n.style.setProperty("--parY", `${curY * 4 * depth}px`);
    });
  }

  function schedule(){
    if (raf) return;
    raf = requestAnimationFrame(tick);
  }

  map.addEventListener("mousemove", (e) => {
    const r = map.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;   // 0..1
    const ny = (e.clientY - r.top) / r.height;  // 0..1
    targetX = (nx - 0.5); // -0.5..0.5
    targetY = (ny - 0.5);
    schedule();
  });

  map.addEventListener("mouseleave", () => {
    targetX = 0; targetY = 0;
    schedule();
  });
}

// ---------- Init ----------
function initLevelMap() {
  placeNodesOnPath();
  applyLockStatesFromData();
  // DELETE LATER!! Demo ratings (0-3). Replace with localStorage later.
setRodRating("1", 2);
setRodRating("2", 0);
setRodRating("3", 0);
setRodRating("4", 0);
setRodRating("5", 0);
  wireLevelClicks();
  initParallax();

  // Default selection (pick the first unlocked level)
  const firstUnlocked = Object.keys(LEVELS).find(id => LEVELS[id].unlocked);
  if (firstUnlocked) {
    const node = document.querySelector(`.level-node[data-level="${firstUnlocked}"]`);
    if (node) {
      moveSelectedGlow(node);
      updateSidePanel(firstUnlocked);
    }
  }
}

window.addEventListener("load", initLevelMap);
window.addEventListener("resize", placeNodesOnPath);