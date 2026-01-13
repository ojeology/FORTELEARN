// install-manager.js - Smart PWA Installation Helper
let deferredPrompt;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
let isStandalone = window.matchMedia('(display-mode: standalone)').matches;

// 1. Capture browser's install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => {
    if (!isStandalone && !localStorage.getItem('installDismissed')) {
      showInstallButton();
    }
  }, 5000);
});

// 2. Show floating button
function showInstallButton() {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'block';
    installBtn.onclick = showInstallModal;
  }
}

function hideInstallButton() {
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'none';
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
      hideInstallModal();
      alert("Look for the Share button (📤) at the bottom of Safari!");
    };
  } else if (deferredPrompt) {
    stepsDiv.innerHTML = `<strong style="color: #667eea;">For Android/Chrome:</strong><p style="margin: 10px 0;">Click "Install Now" below to add to home screen.</p>`;
    installNowBtn.textContent = "Install Now";
    installNowBtn.onclick = triggerNativeInstall;
  } else {
    stepsDiv.innerHTML = `<strong style="color: #667eea;">Manual Installation:</strong><p style="margin: 10px 0;">Look for "Add to Home Screen" in browser menu (⋮).</p>`;
    installNowBtn.textContent = "Got It";
    installNowBtn.onclick = hideInstallModal;
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
      console.log('✅ User installed the PWA');
    }
    deferredPrompt = null;
    hideInstallModal();
  });
}

// 5. Close modal
function hideInstallModal() {
  document.getElementById('installModal').style.display = 'none';
  localStorage.setItem('installDismissed', 'true');
}

// 6. Auto-show for iOS users
if (isIOS && !isStandalone && !localStorage.getItem('iosPromptShown')) {
  setTimeout(() => {
    showInstallModal();
    localStorage.setItem('iosPromptShown', 'true');
  }, 8000);
}

// 7. Hide if already installed
if (isStandalone) {
  hideInstallButton();
}
