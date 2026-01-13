// ads.js - Fortebet Ad Manager
console.log("Ads.js file is loaded!");

// Actual App ID
let myAppId = "200774828";

// Function to start Start.io
function initStartApp() {
  console.log("initStartApp called");
  if (typeof startapp !== 'undefined') {
    console.log("startapp is defined, initializing...");
    startapp.init({
      appId: myAppId
    }, function() {
      console.log("✅ Start.io is ready!");
      loadBannerAd(); // Try to load a banner
    }, function(error) {
      console.error("❌ Start.io failed: ", error);
    });
  } else {
    console.log("Waiting for Start.io script to load...");
    // Inject script if not present
    if (!document.querySelector('script[src*="cdn.startapp.com"]')) {
      console.log("Script tag missing, injecting...");
      var script = document.createElement('script');
      script.src = "https://cdn.startapp.com/sdk/init.js";
      script.type = "text/javascript";
      document.head.appendChild(script);
    }
    setTimeout(initStartApp, 500); // Check again in half a second
  }
}

function loadBannerAd() {
  console.log("Trying to load banner ad...");
  if (typeof startapp !== 'undefined') {
    startapp.banner.display({
      containerId: 'ad-banner-container',
      width: 320,
      height: 50
    });
    console.log("Banner ad function called.");
  }
}

// Start the process when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStartApp);
} else {
  initStartApp();
}
