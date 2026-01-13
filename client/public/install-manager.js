// install-manager.js - Smart PWA Installation Helper
let deferredPrompt;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
let isStandalone = window.matchMedia('(display-mode: standalone)').matches;

console.log('Install Manager: Initialized', { isIOS, isStandalone });

// Check if user has permanently dismissed the install prompt
const isPermanentlyDismissed = () => localStorage.getItem('installPermanentlyDismissed') === 'true';

// 1. Capture browser's install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Install Manager: beforeinstallprompt triggered');
  e.preventDefault();
  deferredPrompt = e;
  
  if (!isStandalone && !isPermanentlyDismissed()) {
    showInstallButton();
  }
});

// Force visibility check on load and refresh
window.addEventListener('load', () => {
  console.log('Install Manager: Page loaded, checking visibility');
  if (!isStandalone && !isPermanentlyDismissed()) {
    // Small delay to ensure DOM is ready and beforeinstallprompt has a chance to fire
    setTimeout(showInstallButton, 1000);
  }
});

// 2. Show floating button
function showInstallButton() {
  if (isStandalone || isPermanentlyDismissed()) return;

  console.log('Install Manager: Showing button');
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.setProperty('display', 'flex', 'important');
    installBtn.style.setProperty('opacity', '1', 'important');
    installBtn.style.setProperty('visibility', 'visible', 'important');
    installBtn.style.setProperty('z-index', '2147483647', 'important');
    installBtn.onclick = showInstallModal;
  } else {
    console.error('Install Manager: installBtn element not found');
  }
}

function hideInstallButton() {
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.setProperty('display', 'none', 'important');
}

// 3. Show modal with instructions
function showInstallModal() {
  const modal = document.getElementById('installModal');
  const stepsDiv = document.getElementById('installSteps');
  const installNowBtn = document.getElementById('installNowBtn');
  
  if (isIOS) {
    stepsDiv.innerHTML = `<strong style="color: #667eea;">For iPhone/iPad:</strong><ol style="margin: 10px 0 0 15px;"><li>Tap the <strong>Share button</strong> (📤) at bottom</li><li>Select <strong>"Add to Home Screen"</strong></li><li>Tap <strong>"Add"</strong> in top right</li></ol>`;
    installNowBtn.textContent = "Show Me How";
    installNowBtn.onclick = () => {
      alert("Look for the Share button (📤) at the bottom of Safari!");
    };
  } else if (deferredPrompt) {
    stepsDiv.innerHTML = `<strong style="color: #667eea;">For Android/Chrome:</strong><p style="margin: 10px 0;">Click "Install Now" below to add to home screen.</p>`;
    installNowBtn.textContent = "Install Now";
    installNowBtn.onclick = triggerNativeInstall;
  } else {
    stepsDiv.innerHTML = `<strong style="color: #667eea;">Manual Installation:</strong><p style="margin: 10px 0;">Look for "Add to Home Screen" in browser menu (⋮).</p>`;
    installNowBtn.textContent = "Got It";
    installNowBtn.onclick = () => {
      modal.style.display = 'none';
    };
  }
  
  modal.style.display = 'flex';
}

// 4. Trigger native install prompt
function triggerNativeInstall() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      hideInstallButton();
      localStorage.setItem('installPermanentlyDismissed', 'true');
      console.log('✅ User installed the PWA');
    }
    deferredPrompt = null;
    document.getElementById('installModal').style.display = 'none';
  });
}

// 5. Dismiss logic - only if they explicitly choose to hide it forever
function permanentlyDismiss() {
  if (confirm("Would you like to hide the install button forever? You can still install from your browser menu.")) {
    hideInstallButton();
    localStorage.setItem('installPermanentlyDismissed', 'true');
    document.getElementById('installModal').style.display = 'none';
  }
}
