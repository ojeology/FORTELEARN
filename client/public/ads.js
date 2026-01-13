// ads.js - Unified Ad Manager with Placeholders
window.startapp = window.startapp || {};

// Mock SDK behavior if not loaded
if (!window.startapp.init) {
    window.startapp.init = (config, success) => {
        console.log("Start.io Mock: Init", config);
        if (success) setTimeout(success, 500);
    };
}

let bannerAdTop, bannerAdBottom, interstitialAd, rewardedAd;

function initializeAds() {
    console.log("Initializing Ad System...");
    
    // In a real environment, these would be SDK objects
    // Here we define them to use our placeholder system
    bannerAdTop = {
        loadAd: (w, h) => console.log(`Banner Top Loaded: ${w}x${h}`),
        showBanner: (id) => createPlaceholder(id, 'Top Banner', 'Exclusive Rewards')
    };
    
    bannerAdBottom = {
        loadAd: (w, h) => console.log(`Banner Bottom Loaded: ${w}x${h}`),
        showBanner: (id) => createPlaceholder(id, 'Bottom Banner', 'Agent Training Tips')
    };
    
    interstitialAd = {
        loadAd: () => console.log("Interstitial Loaded"),
        showAd: (listener) => {
            console.log("Showing Interstitial Placeholder");
            showFullscreenPlaceholder('FULLSCREEN AD', 'Click to continue to module', () => {
                if (listener && listener.adHidden) listener.adHidden();
            });
        }
    };
    
    rewardedAd = {
        loadAd: () => console.log("Rewarded Ad Loaded"),
        showAd: (listener) => {
            console.log("Showing Rewarded Placeholder");
            showFullscreenPlaceholder('WATCH & CONTINUE', 'Wait 5 seconds to get a lifeline...', () => {
                if (listener && listener.adHidden) listener.adHidden();
            }, 5000);
        }
    };
}

function createPlaceholder(containerId, title, subtitle) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const adUnit = document.createElement('div');
    adUnit.className = 'fortebet-ad-unit';
    adUnit.style.cssText = `
        width: 100%;
        max-width: 320px;
        height: 50px;
        background: linear-gradient(90deg, #d35400, #e67e22);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        margin: 5px auto;
        cursor: pointer;
        font-family: sans-serif;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;
    
    adUnit.innerHTML = `
        <div style="font-weight: bold; font-size: 14px;">${title}</div>
        <div style="font-size: 10px; opacity: 0.9;">${subtitle}</div>
    `;
    
    adUnit.onclick = () => window.open('https://www.fortebet.ug', '_blank');
    container.innerHTML = '';
    container.appendChild(adUnit);
}

function showFullscreenPlaceholder(title, msg, onComplete, duration = 2000) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 1000000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        text-align: center;
    `;
    
    overlay.innerHTML = `
        <div style="background: #e67e22; padding: 20px; border-radius: 10px; width: 80%; max-width: 400px;">
            <h1 style="margin: 0;">${title}</h1>
            <p style="margin: 20px 0;">${msg}</p>
            <div id="ad-timer" style="font-size: 24px; font-weight: bold;">${duration/1000}s</div>
            <button id="close-ad-btn" style="display: none; margin-top: 20px; padding: 10px 20px; background: white; color: #e67e22; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">CLOSE AD</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    let timeLeft = duration / 1000;
    const timer = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById('ad-timer');
        if (timerEl) timerEl.textContent = timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            const btn = document.getElementById('close-ad-btn');
            if (btn) {
                btn.style.display = 'block';
                btn.onclick = () => {
                    document.body.removeChild(overlay);
                    if (onComplete) onComplete();
                };
            }
        }
    }, 1000);
}

// Global exposure
window.loadPageBanners = () => {
    if (bannerAdTop) bannerAdTop.showBanner('banner-container-top');
    if (bannerAdBottom) bannerAdBottom.showBanner('banner-container-bottom');
};

window.triggerInterstitial = (onComplete) => {
    if (interstitialAd) interstitialAd.showAd({ adHidden: onComplete });
    else if (onComplete) onComplete();
};

window.triggerRewarded = (onComplete) => {
    if (rewardedAd) rewardedAd.showAd({ adHidden: onComplete });
    else if (onComplete) onComplete();
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    initializeAds();
    window.loadPageBanners();
});
