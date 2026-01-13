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
        const adContainer = document.getElementById('ad-banner-container');
        if (adContainer) {
          adContainer.innerHTML = '<p style="color:green">✅ Start.io ready, loading ad...</p>';
        }
        loadBannerAd(); // Try to load a banner
      }, function(error) {
        console.error("❌ Start.io failed callback: ", error);
        const adContainer = document.getElementById('ad-banner-container');
        if (adContainer) {
          adContainer.innerHTML = '<p style="color:red">❌ Start.io failed to initialize: ' + JSON.stringify(error) + '</p>';
        }
      });
    } catch (e) {
      console.error("❌ Start.io init exception: ", e);
      const adContainer = document.getElementById('ad-banner-container');
      if (adContainer) {
        adContainer.innerHTML = '<p style="color:red">❌ Start.io init exception: ' + e.message + '</p>';
      }
    }
  } else {
    console.log("Waiting for Start.io script to load...");
    // Check for script tag
    const existingScript = document.querySelector('script[src*="cdn.startapp.com"]');
    if (!existingScript) {
      console.log("Script tag missing in head, injecting...");
      var script = document.createElement('script');
      script.src = "https://cdn.startapp.com/sdk/init.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = function() {
        console.log("SDK script onload triggered");
      };
      script.onerror = function(err) {
        console.error("Failed to load Start.io script from CDN", err);
        const adContainer = document.getElementById('ad-banner-container');
        if (adContainer) {
          adContainer.innerHTML = '<p style="color:red">❌ Failed to load ad script from CDN. Please check your internet or ad-blocker.</p>';
        }
      };
      document.head.appendChild(script);
    }
    setTimeout(initStartApp, 1000); // Check again in a second
  }
}

function loadBannerAd() {
  console.log("Trying to load banner ad for container: ad-banner-container");
  if (typeof startapp !== 'undefined' && startapp.banner) {
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
