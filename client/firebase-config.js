// firebase-config.js - FORTEBET TRAINING
// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjvmpMoOPefyz70ut2FOnRXR7nnk2YlUU",
  authDomain: "fortebetguide.firebaseapp.com",
  projectId: "fortebetguide",
  storageBucket: "fortebetguide.firebasestorage.app",
  messagingSenderId: "419624573510",
  appId: "1:419624573510:web:2f201f9c5d2a3fc72c0847"
};

// Initialize Firebase
let db;
try {
  if (typeof firebase !== 'undefined') {
    const app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    
    // Simple initialization without complex settings first
    console.log("✅ Firebase initialized successfully");
    
    // Enable persistence if possible
    db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
        console.warn("Firestore persistence notice:", err.code);
    });
  }
} catch (error) {
  console.error("❌ Firebase error:", error);
}

// Check online status
function isOnline() {
  return navigator.onLine;
}

// User ID - for this simple app, we'll use a local ID or "guest"
function getUserId() {
  let userId = localStorage.getItem('fortebet_userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('fortebet_userId', userId);
  }
  return userId;
}

// Save Module Progress to Firestore
async function saveModuleProgress(moduleName, score, passed) {
  // Update local storage first
  let completed = JSON.parse(localStorage.getItem('fortebetCompletedModules') || '[]');
  if (passed && !completed.includes(moduleName)) {
    completed.push(moduleName);
    localStorage.setItem('fortebetCompletedModules', JSON.stringify(completed));
  }

  // Update progress map for UI highlights
  let progressMap = JSON.parse(localStorage.getItem('fortebetModuleProgress') || '{}');
  progressMap[moduleName] = { score, passed, timestamp: new Date().toISOString() };
  localStorage.setItem('fortebetModuleProgress', JSON.stringify(progressMap));

  if (isOnline() && db) {
    try {
      await db.collection('users').doc(getUserId()).set({
        completedModules: completed,
        moduleDetails: progressMap,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      console.log(`✅ Synced ${moduleName} to Firebase`);
    } catch (e) {
      console.error("❌ Error syncing to Firebase:", e);
      addToSyncQueue({ type: 'progress', module: moduleName, score, passed });
    }
  } else {
    addToSyncQueue({ type: 'progress', module: moduleName, score, passed });
  }
  
  if (typeof updateProgressBar === 'function') updateProgressBar();
}

// Load User Progress from Firebase
async function loadUserProgress() {
  if (isOnline() && db) {
    try {
      const doc = await db.collection('users').doc(getUserId()).get();
      if (doc.exists) {
        return doc.data();
      }
    } catch (e) {
      console.error("❌ Error loading progress:", e);
    }
  }
  return null;
}

// Sync local progress with Firebase
async function syncLocalProgress() {
  const firebaseData = await loadUserProgress();
  let localModules = JSON.parse(localStorage.getItem('fortebetCompletedModules') || '[]');
  let localDetails = JSON.parse(localStorage.getItem('fortebetModuleProgress') || '{}');

  if (firebaseData) {
    const fbModules = firebaseData.completedModules || [];
    const fbDetails = firebaseData.moduleDetails || {};
    
    // Merge: combine both, set handles uniqueness
    const mergedModules = Array.from(new Set([...localModules, ...fbModules]));
    const mergedDetails = { ...localDetails, ...fbDetails };
    
    localStorage.setItem('fortebetCompletedModules', JSON.stringify(mergedModules));
    localStorage.setItem('fortebetModuleProgress', JSON.stringify(mergedDetails));
    
    // Update Firebase if local had more
    if (mergedModules.length > fbModules.length) {
       await db.collection('users').doc(getUserId()).set({
        completedModules: mergedModules,
        moduleDetails: mergedDetails,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
    
    return mergedModules;
  }
  return localModules;
}

// Save Score to Leaderboard
async function saveLeaderboardScore(name, score, testType) {
  if (isOnline() && db) {
    try {
      await db.collection('leaderboard').add({
        name,
        score,
        testType, // '30-questions' or '100-questions'
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("✅ Score saved to leaderboard");
    } catch (e) {
      console.error("❌ Leaderboard sync error:", e);
      addToSyncQueue({ type: 'leaderboard', name, score, testType });
    }
  } else {
    addToSyncQueue({ type: 'leaderboard', name, score, testType });
  }
}

// Load Leaderboard
async function loadLeaderboard(testType = '100-questions') {
  if (isOnline() && db) {
    try {
      const snapshot = await db.collection('leaderboard')
        .where('testType', '==', testType)
        .orderBy('score', 'desc')
        .limit(10)
        .get();
      
      let scores = [];
      snapshot.forEach(doc => scores.push(doc.data()));
      return scores;
    } catch (e) {
      console.error("❌ Error loading leaderboard:", e);
    }
  }
  return [];
}

// Queue for offline sync
const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');

function addToSyncQueue(data) {
  syncQueue.push(data);
  localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
}

async function processSyncQueue() {
  if (!isOnline() || !db) return;
  
  const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
  if (queue.length === 0) return;

  console.log("🔄 Processing offline sync queue...");
  for (const item of queue) {
    try {
      if (item.type === 'progress') {
        await saveModuleProgress(item.module, item.score, item.passed);
      } else if (item.type === 'leaderboard') {
        await saveLeaderboardScore(item.name, item.score, item.testType);
      }
    } catch (error) {
      console.error('Failed to sync item:', item, error);
    }
  }
  
  localStorage.removeItem('syncQueue');
}

// Progress Bar Helper
function updateProgressBar() {
  const completed = JSON.parse(localStorage.getItem('fortebetCompletedModules') || '[]');
  const total = 6;
  const percent = Math.round((completed.length / total) * 100);
  
  const progressCircle = document.querySelector('.circle');
  if (progressCircle) {
    progressCircle.style.background = `conic-gradient(#27ae60 ${percent}%, #e0e0e0 ${percent}%)`;
  }
  
  const progressText = document.querySelector('.progress-value');
  if (progressText) {
    progressText.textContent = `${percent}%`;
  }
  
  return percent;
}

// Auto-sync when online
window.addEventListener('online', processSyncQueue);

// Initial Load
document.addEventListener('DOMContentLoaded', async () => {
  updateProgressBar();
  if (isOnline()) {
    await processSyncQueue();
    await syncLocalProgress();
  }
});
