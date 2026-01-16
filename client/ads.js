// ads.js - Fortebet Ad Manager
console.log("Ads.js file is loaded!");

// Actual App ID
let myAppId = "200774828";

// Function to start Start.io
function initStartApp() {
  console.log("initStartApp called");
  
  // Check if we already have the status element
  const adStatus = document.getElementById('ad-status');
  if (adStatus && adStatus.textContent.includes('✅')) return;

  if (typeof startapp !== 'undefined') {
    console.log("startapp is available, initializing with appId: " + myAppId);
    try {
      startapp.init({
        appId: myAppId
      }, function() {
        console.log("✅ Start.io initialization successful");
        if (adStatus) {
          adStatus.style.color = 'green';
          adStatus.textContent = '✅ Ads Ready';
        }
        loadBannerAd(); 
      }, function(error) {
        console.error("❌ Start.io error: ", error);
        if (adStatus) {
          adStatus.style.color = 'orange';
          adStatus.textContent = '⚠️ Ads limited by provider.';
        }
        loadBannerAd(); // Load placeholder on error
      });
    } catch (e) {
      console.error("❌ Exception during init: ", e);
      loadBannerAd();
    }
  } else {
    console.log("Waiting for script...");
    setTimeout(initStartApp, 1000); 
  }
}

function loadBannerAd() {
  console.log("Loading banner...");
  if (typeof startapp !== 'undefined' && startapp.banner) {
    try {
        startapp.banner.display({
          containerId: 'ad-banner-container',
          width: 320,
          height: 50
        });
    } catch (e) {
        console.error("Error displaying banner:", e);
    }
  }
}

// Manual retry function
function retryAds() {
    const adStatus = document.getElementById('ad-status');
    if (adStatus) adStatus.textContent = 'Retrying...';
    
    // Inject script again just in case
    const s = document.createElement('script');
    s.src = "https://cdn.startapp.com/sdk/init.js";
    document.head.appendChild(s);
    
    setTimeout(initStartApp, 1000);
}

// Start the process when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStartApp);
} else {
  initStartApp();
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
