const overlay = document.getElementById("fishCoachOverlay");
const fishText = document.getElementById("fishText");
const fishLessons = document.getElementById("fishLessons");
const closeBtn = document.getElementById("fishCloseBtn");

/* ===== Robot typing sound ===== */
let audioCtx;

function initAudio(){
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function tickSound(){
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.value = 1800;

  gain.gain.value = 0.03;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.03);
}

/* ===== Typing Effect ===== */
async function typeText(text){
  fishText.innerHTML = "";
  for(let i=0;i<text.length;i++){
    fishText.innerHTML += text[i];
    if(text[i] !== " "){
      tickSound();
    }
    await new Promise(r=>setTimeout(r,20));
  }
}

/* ===== Show Coach ===== */
async function showFishCoach(result){

  initAudio();

  overlay.classList.remove("hidden");

  let message;
  let lessons;

  if(result === "perfect"){
    message = "Well done, you passed this level.";
    lessons = `
      ✔ Urgency + threat = red flag.<br>
      ✔ Always verify sender domain.<br>
      ✔ Report suspicious emails.
    `;
  }
  else if(result === "good"){
    message = "Good thinking. Stay alert.";
    lessons = `
      ✔ Double-check links before clicking.<br>
      ✔ Contact IT when unsure.
    `;
  }
  else{
    message = "Careful. That was phishing bait.";
    lessons = `
      ✔ Never click unknown links.<br>
      ✔ Stop. Think. Verify.
    `;
  }

  fishLessons.innerHTML = lessons;

  await typeText(message);
}

/* ===== Close ===== */
closeBtn.addEventListener("click", ()=>{
  overlay.classList.add("hidden");
});

/* ===== Export to main index ===== */
window.showFishCoach = showFishCoach;
