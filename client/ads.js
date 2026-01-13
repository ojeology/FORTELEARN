// ads.js - Fortebet Ad Manager
console.log("Ads.js file is loaded!");

// Actual App ID
let myAppId = "200774828";

// Function to start Start.io
function initStartApp() {
  console.log("initStartApp called");
  if (typeof startapp !== 'undefined') {
    console.log("startapp is defined, initializing with appId: " + myAppId);
    try {
      startapp.init({
        appId: myAppId
      }, function() {
        console.log("✅ Start.io is ready!");
        const adStatus = document.getElementById('ad-status');
        if (adStatus) {
          adStatus.style.color = 'green';
          adStatus.textContent = '✅ Start.io ready, loading ad...';
        }
        loadBannerAd(); // Try to load a banner
      }, function(error) {
        console.error("❌ Start.io failed callback: ", error);
        const adStatus = document.getElementById('ad-status');
        if (adStatus) {
          adStatus.style.color = 'red';
          adStatus.textContent = '❌ Start.io failed to initialize. If you are using an ad-blocker, please disable it.';
        }
      });
    } catch (e) {
      console.error("❌ Start.io init exception: ", e);
    }
  } else {
    console.log("Waiting for Start.io script to load...");
    setTimeout(initStartApp, 1000); 
  }
}

function loadBannerAd() {
  console.log("Trying to load banner ad for container: ad-banner-container");
  if (typeof startapp !== 'undefined' && startapp.banner) {
    try {
        startapp.banner.display({
          containerId: 'ad-banner-container',
          width: 320,
          height: 50
        });
        console.log("Banner ad display function called.");
        
        // Check if banner was actually injected
        setTimeout(function() {
          const container = document.getElementById('ad-banner-container');
          if (container && container.children.length > 1) { 
            console.log("✅ Banner container has content");
          } else {
            console.log("⚠️ Banner container still only has placeholder text or is empty");
          }
        }, 3000);
    } catch (e) {
        console.error("Error displaying banner:", e);
    }
  } else {
    console.error("startapp.banner is not defined");
  }
}

// Start the process when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStartApp);
} else {
  initStartApp();
}
