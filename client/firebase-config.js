// firebase-config.js - FORTEBET TRAINING
// Your Firebase Configuration (already correct)
const firebaseConfig = {
  apiKey: "AIzaSyCjvmpMoOPefyz70ut2FOnRXR7nnk2YlUU",
  authDomain: "fortebetguide.firebaseapp.com",
  projectId: "fortebetguide",
  storageBucket: "fortebetguide.firebasestorage.app",
  messagingSenderId: "419624573510",
  appId: "1:419624573510:web:2f201f9c5d2a3fc72c0847"
};

// Initialize Firebase
try {
  // Check if Firebase is already loaded
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
  } else {
    console.log("⚠️ Firebase not loaded yet");
  }
} catch (error) {
  console.error("❌ Firebase error:", error);
}

// Simple function to save quiz progress
function saveQuizProgress(moduleName, score, passed) {
  // For now, just save to localStorage
  // We'll add Firebase saving later
  let completed = JSON.parse(localStorage.getItem('completedModules') || '[]');
  
  if (passed && !completed.includes(moduleName)) {
    completed.push(moduleName);
    localStorage.setItem('completedModules', JSON.stringify(completed));
    console.log(`✅ Saved: ${moduleName} to localStorage`);
    return true;
  }
  return false;
}

// Simple function to update progress bar
function updateProgressBar() {
  const completed = JSON.parse(localStorage.getItem('completedModules') || '[]');
  const total = 6; // 6 training modules
  const percent = Math.round((completed.length / total) * 100);
  
  // Update progress circle if exists
  const progressCircle = document.querySelector('.circle');
  if (progressCircle) {
    progressCircle.style.background = `conic-gradient(#27ae60 ${percent}%, #e0e0e0 ${percent}%)`;
  }
  
  // Update progress text
  const progressText = document.querySelector('.progress-value');
  if (progressText) {
    progressText.textContent = `${percent}%`;
  }
  
  return percent;
}

// Call this when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateProgressBar();
  console.log("✅ Progress bar updated:", 
    JSON.parse(localStorage.getItem('completedModules') || '[]').length, 
    "modules completed");
});
