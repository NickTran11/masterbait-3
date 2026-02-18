// Fish Coach: overlay + robot typing tick sound (WebAudio)
const overlay = document.getElementById("fishCoachOverlay");
const fishText = document.getElementById("fishText");
const fishLessons = document.getElementById("fishLessons");
const fishTitle = document.getElementById("fishTitle");
const closeBtn = document.getElementById("fishCloseBtn");

const xpEl = document.getElementById("xp");
const streakEl = document.getElementById("streak");

let XP = 0;
let STREAK = 0;

// ===== Audio (must start after user click) =====
let audioCtx;

function ensureAudio(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if(audioCtx.state === "suspended") audioCtx.resume();
}

function tickSound(){
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.value = 1750;
  gain.gain.value = 0.028;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const t = audioCtx.currentTime;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.028, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

  osc.start(t);
  osc.stop(t + 0.035);
}

// ===== Typing effect =====
async function typeText(text){
  fishText.textContent = "";
  for(let i=0; i<text.length; i++){
    const ch = text[i];
    fishText.textContent += ch;
    if(ch !== " " && ch !== "\n") tickSound();
    await new Promise(r => setTimeout(r, 18));
  }
}

// ===== Feedback packs =====
function getPack(result){
  if(result === "perfect"){
    return {
      title: "Perfect!",
      message: "Well done.\nYou passed this level.",
      xpGain: 40,
      streakDelta: +1,
      lessons: [
        "Urgency + threat is bait (pressure tactics).",
        "Suspicious domain (look for 0 vs o, extra words).",
        "Safest move: report it or contact IT."
      ]
    };
  }

  if(result === "good"){
    return {
      title: "Good choice!",
      message: "Nice.\nYou reduced risk.",
      xpGain: 25,
      streakDelta: +1,
      lessons: [
        "When unsure, verify using official channels.",
        "Never trust links just because they look familiar.",
        "Slow down: stop → check → decide."
      ]
    };
  }

  return {
    title: "Got baited 😬",
    message: "Oof…\nThat link was bait.",
    xpGain: 10,
    streakDelta: -1,
    lessons: [
      "Attackers want a fast click, not careful thinking.",
      "Never enter passwords from message links.",
      "If you clicked: close it, change password, report."
    ]
  };
}

function openOverlay(){
  overlay.classList.remove("hidden");
}

function closeOverlay(){
  overlay.classList.add("hidden");
}

// ===== Main function called from gamesketch.html =====
async function showFishCoach(result){
  ensureAudio();

  const pack = getPack(result);

  fishTitle.textContent = pack.title;

  fishLessons.innerHTML = pack.lessons.map(x => `• ${x}`).join("<br>");

  // Update HUD if exists
  if(xpEl && streakEl){
    XP += pack.xpGain;
    STREAK = Math.max(0, STREAK + pack.streakDelta);
    xpEl.textContent = String(XP);
    streakEl.textContent = String(STREAK);
  }

  openOverlay();
  await typeText(pack.message);
}

closeBtn.addEventListener("click", closeOverlay);

// Export globally so gamesketch can call it
window.showFishCoach = showFishCoach;
