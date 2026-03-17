(function () {
  const overlay = document.getElementById("fishCoachOverlay");
  const fishText = document.getElementById("fishText");
  const fishTitle = document.getElementById("fishTitle");
  const fishLessons = document.getElementById("fishLessons");
  const fishCloseBtn = document.getElementById("fishCloseBtn");

  if (!overlay || !fishText || !fishTitle || !fishLessons || !fishCloseBtn) return;

  let closeHandler = null;

  async function typeText(text) {
    fishText.textContent = "";
    for (let i = 0; i < text.length; i++) {
      fishText.textContent += text[i];
      await new Promise(r => setTimeout(r, 16));
    }
  }

  async function showFishCoachCustom(payload) {
    if (!payload) return;

    fishTitle.textContent = payload.title || "Feedback";
    fishLessons.innerHTML = Array.isArray(payload.lessons)
      ? payload.lessons.map(x => `• ${escapeHtml(x)}`).join("<br>")
      : "";

    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");

    await typeText(payload.bubble || "...");
  }

  function closeFishCoachCustom() {
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  function setFishCoachCloseHandler(fn) {
    closeHandler = fn;
  }

  fishCloseBtn.addEventListener("click", () => {
    if (typeof closeHandler === "function") {
      closeHandler();
      return;
    }
    window.location.href = "./levelMap.html";
  });

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  window.showFishCoachCustom = showFishCoachCustom;
  window.closeFishCoachCustom = closeFishCoachCustom;
  window.setFishCoachCloseHandler = setFishCoachCloseHandler;
})();
