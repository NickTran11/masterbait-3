const overlay = document.getElementById("fishCoachOverlay");
const fishText = document.getElementById("fishText");
const fishLessons = document.getElementById("fishLessons");
const fishTitle = document.getElementById("fishTitle");
const closeBtn = document.getElementById("fishCloseBtn");

const xpEl = document.getElementById("xp");
const streakEl = document.getElementById("streak");

let XP = 0;
let STREAK = 0;

// ===================== Audio =====================
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

/* ✅ Winning sound (quick “cheer” chord) */
function winSound(){
  const t = audioCtx.currentTime;
  const freqs = [523.25, 659.25, 783.99]; // C5 E5 G5
  freqs.forEach((f, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(f, t);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.08 - i*0.02, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  });

  // little “sparkle” beep
  const osc2 = audioCtx.createOscillator();
  const g2 = audioCtx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(1200, t + 0.02);
  osc2.frequency.exponentialRampToValueAtTime(1800, t + 0.12);
  g2.gain.setValueAtTime(0.001, t);
  g2.gain.exponentialRampToValueAtTime(0.04, t + 0.03);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
  osc2.connect(g2);
  g2.connect(audioCtx.destination);
  osc2.start(t);
  osc2.stop(t + 0.18);
}

/* ✅ Losing sound (sad drop) */
function loseSound(){
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(320, t);
  osc.frequency.exponentialRampToValueAtTime(140, t + 0.35);

  gain.gain.setValueAtTime(0.001, t);
  gain.gain.exponentialRampToValueAtTime(0.10, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.40);
}

// ===================== Typing effect =====================
async function typeText(text){
  fishText.textContent = "";
  for(let i=0; i<text.length; i++){
    const ch = text[i];
    fishText.textContent += ch;
    if(ch !== " " && ch !== "\n") tickSound();
    await new Promise(r => setTimeout(r, 18));
  }
}

// ===================== Feedback packs =====================
function getPack(result){
  if(result === "perfect"){
    return {
      title: "Perfect! 🎉",
      message: "Well done.\nYou passed this level.",
      xpGain: 40,
      streakDelta: +1,
      win: true,
      lessons: [
        "Urgency + threat is bait (pressure tactics).",
        "Suspicious domain (look for 0 vs o, extra words).",
        "Safest move: report it or contact IT."
      ]
    };
  }

  if(result === "good"){
    return {
      title: "Good choice! ✅",
      message: "Nice.\nYou reduced risk.",
      xpGain: 25,
      streakDelta: +1,
      win: true,
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
    win: false,
    lessons: [
      "Attackers want a fast click, not careful thinking.",
      "Never enter passwords from message links.",
      "If you clicked: close it, change password, report."
    ]
  };
}

// ===================== Overlay control =====================
function openOverlay(){
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
}
function closeOverlay(){
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
}

// ✅ Main function
async function showFishCoach(result){
  ensureAudio();

  const pack = getPack(result);

  fishTitle.textContent = pack.title;
  fishLessons.innerHTML = pack.lessons.map(x => `• ${x}`).join("<br>");

  // HUD update
  if(xpEl && streakEl){
    XP += pack.xpGain;
    STREAK = Math.max(0, STREAK + pack.streakDelta);
    xpEl.textContent = String(XP);
    streakEl.textContent = String(STREAK);
  }

  // ✅ win/lose sound
  if(pack.win) winSound();
  else loseSound();

  openOverlay();
  await typeText(pack.message);
}

closeBtn.addEventListener("click", closeOverlay);

// Close overlay if click outside right panel / image
overlay.addEventListener("click", (e) => {
  if(e.target === overlay) closeOverlay();
});

window.showFishCoach = showFishCoach;
