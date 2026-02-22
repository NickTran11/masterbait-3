const levels = [
    { id: 1, title: "The Puddle", status: 'completed', yOffset: 0 },
    { id: 2, title: "Local Pond", status: 'completed', yOffset: -60 },
    { id: 3, title: "Rushing River", status: 'current', yOffset: 60 },
    { id: 4, title: "Misty Lake", status: 'locked', yOffset: -30 },
    { id: 5, title: "Deep Ocean", status: 'locked', yOffset: 0 },
];

const state = {
    isSettingsOpen: false,
    view: 'landing' // 'landing' | 'dashboard'
};

// DOM Elements
const landingView = document.getElementById('landing-view');
const dashboardView = document.getElementById('dashboard-view');
const settingsOverlay = document.getElementById('settings-overlay');
const settingsBackdrop = document.getElementById('settings-backdrop');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const settingsCloseFooter = document.getElementById('settings-close-footer');
const headerSettingsBtn = document.getElementById('header-settings-btn');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('dashboard-back-btn');
const dashboardContent = document.getElementById('dashboard-content');

// Event Listeners
headerSettingsBtn.addEventListener('click', toggleSettings);
settingsBackdrop.addEventListener('click', toggleSettings);
settingsCloseBtn.addEventListener('click', toggleSettings);
settingsCloseFooter.addEventListener('click', toggleSettings);
startBtn.addEventListener('click', () => setView('dashboard'));
backBtn.addEventListener('click', () => setView('landing'));

// Functions
function toggleSettings() {
    state.isSettingsOpen = !state.isSettingsOpen;
    if (state.isSettingsOpen) {
        settingsOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        settingsOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function setView(viewName) {
    state.view = viewName;
    if (viewName === 'landing') {
        landingView.classList.remove('hidden');
        dashboardView.classList.add('hidden');
    } else {
        landingView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        renderDashboard();
    }
}

function renderDashboard() {
    // Configuration for layout
    const levelSpacing = 220;
    const startX = 150;
    const containerHeight = 500;
    const centerY = containerHeight / 2;
    
    const totalWidth = startX + ((levels.length - 1) * levelSpacing) + startX;

    const getCoords = (level, index) => {
        return {
            x: startX + index * levelSpacing,
            y: centerY + level.yOffset
        };
    };

    // Generate SVG Path
    let pathD = `M ${startX} ${centerY + levels[0].yOffset}`;
    for (let i = 0; i < levels.length - 1; i++) {
        const start = getCoords(levels[i], i);
        const end = getCoords(levels[i + 1], i + 1);
        
        const cp1 = { x: start.x + levelSpacing * 0.5, y: start.y };
        const cp2 = { x: end.x - levelSpacing * 0.5, y: end.y };
        
        pathD += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
    }

    // Render Dashboard Content
    // We need to construct the inner HTML for the dashboard content
    // This includes the SVG and the Level Nodes
    
    let html = `
        <div class="dashboard-map-container" style="width: ${totalWidth}px; height: ${containerHeight}px;">
            <svg 
                class="dashboard-svg-layer"
                viewBox="0 0 ${totalWidth} ${containerHeight}"
                preserveAspectRatio="none" 
            >
                <path 
                    d="${pathD}" 
                    fill="none" 
                    stroke="#a855f7" 
                    stroke-width="12" 
                    stroke-opacity="0.1" 
                    stroke-linecap="round"
                    vector-effect="non-scaling-stroke"
                />
                <path 
                    d="${pathD}" 
                    fill="none" 
                    stroke="#d8b4fe" 
                    stroke-width="4" 
                    stroke-dasharray="12 8" 
                    stroke-linecap="round" 
                    class="dashboard-path-secondary"
                    vector-effect="non-scaling-stroke"
                />
            </svg>
    `;

    levels.forEach((level, index) => {
        const coords = getCoords(level, index);
        const isLocked = level.status === 'locked';
        const isCurrent = level.status === 'current';
        const isCompleted = level.status === 'completed';

        let circleClasses = "level-node ";
        if (isLocked) {
            circleClasses += "locked";
        } else if (isCurrent) {
            circleClasses += "current";
        } else {
            circleClasses += "completed";
        }

        // Custom Water Body SVGs
        let waterSvg = '';
        switch(level.id) {
            case 1: // Puddle
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><path d="M50 15 C 20 15 5 35 15 60 C 25 85 50 95 75 85 C 95 75 95 45 75 25 C 65 15 50 15 50 15 Z" fill="#60a5fa" stroke="#93c5fd" stroke-width="3" /></svg>`;
                break;
            case 2: // Pond
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><circle cx="50" cy="50" r="45" fill="#3b82f6" stroke="#93c5fd" stroke-width="3" /><path d="M65 65 Q 75 55 85 65" stroke="#86efac" stroke-width="2" fill="none" /><circle cx="70" cy="60" r="8" fill="#4ade80" /></svg>`;
                break;
            case 3: // River
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><circle cx="50" cy="50" r="45" fill="#2563eb" stroke="#60a5fa" stroke-width="3" /><path d="M15 45 Q 35 25 55 45 T 90 45" stroke="white" stroke-width="4" fill="none" opacity="0.6" /><path d="M10 65 Q 30 45 50 65 T 85 65" stroke="white" stroke-width="4" fill="none" opacity="0.6" /></svg>`;
                break;
            case 4: // Lake
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><ellipse cx="50" cy="50" rx="48" ry="42" fill="#1d4ed8" stroke="#3b82f6" stroke-width="3" /><path d="M25 35 H75" stroke="white" stroke-width="2" stroke-dasharray="8 6" opacity="0.3" /><path d="M35 65 H65" stroke="white" stroke-width="2" stroke-dasharray="8 6" opacity="0.3" /></svg>`;
                break;
            case 5: // Ocean
                waterSvg = `<svg viewBox="0 0 100 100" overflow="visible"><circle cx="50" cy="50" r="45" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="3" /><path d="M5 55 Q 25 35 50 55 T 95 55 V 90 A 45 45 0 0 1 5 55 Z" fill="#172554" /></svg>`;
                break;
        }

        let overlayContent = '';
        if (isLocked) {
            overlayContent = `<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;"><svg style="width: 24px; height: 24px; color: #d1d5db;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>`;
        } else if (isCompleted) {
             overlayContent = `<div style="position: absolute; top: -15px; width: 100%; display: flex; justify-content: center; gap: 2px;"><div style="color: #facc15; font-size: 1.25rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">★</div><div style="color: #facc15; font-size: 1.5rem; margin-top: -6px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">★</div><div style="color: #facc15; font-size: 1.25rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">★</div></div>`;
        } else if (isCurrent) {
             // Add a subtle pulse overlay or marker for current
             overlayContent = `<div style="position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(255,255,255,0.5); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; pointer-events: none;"></div>`;
        }

        let tooltipClasses = "level-tooltip ";
        if (isCurrent) {
            tooltipClasses += "current";
        }

        html += `
            <div 
                class="level-node-container"
                style="left: ${coords.x}px; top: ${coords.y}px;"
            >
                <div class="${circleClasses}">
                    ${waterSvg}
                    ${overlayContent}
                </div>
                <div class="${tooltipClasses}">
                    <span style="color: #9ca3af; margin-right: 8px; text-transform: uppercase; font-size: 0.625rem; letter-spacing: 0.05em;">Lvl ${level.id}</span>
                    ${level.title}
                </div>
            </div>
        `;
    });

    html += `</div>`;
    dashboardContent.innerHTML = html;
}
