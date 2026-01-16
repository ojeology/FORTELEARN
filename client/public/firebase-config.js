// firebase-config.js
// ====== REPLACE WITH YOUR CONFIG FROM FIREBASE CONSOLE ======
const firebaseConfig = {
  apiKey: "AIzaSyABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
  authDomain: "fortebet-training.firebaseapp.com",
  projectId: "fortebet-training",
  storageBucket: "fortebet-training.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
// ====== END OF CONFIG ======

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = firebase.firestore();

// User ID management
function getOrCreateUserId() {
    let userId = localStorage.getItem('fortebetUserId');
    if (!userId) {
        // Generate unique anonymous ID
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + 
                '_' + Date.now().toString(36);
        localStorage.setItem('fortebetUserId', userId);
        
        // Save basic user info to Firebase
        const userName = localStorage.getItem('playerName') || 'Agent_' + userId.substr(5, 6);
        db.collection('users').doc(userId).set({
            name: userName,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            device: navigator.userAgent.substring(0, 100)
        }, { merge: true });
    }
    return userId;
}

// Save module progress to Firebase
async function saveModuleProgress(moduleName, score, passed) {
    try {
        const userId = getOrCreateUserId();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        
        await db.collection('userProgress').doc(userId).set({
            [moduleName]: {
                completed: passed,
                score: score,
                date: new Date().toLocaleDateString(),
                timestamp: timestamp
            },
            lastUpdated: timestamp
        }, { merge: true });
        
        console.log('Module progress saved to Firebase:', moduleName);
        return true;
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        return false;
    }
}

// Load all user progress from Firebase
async function loadUserProgress() {
    try {
        const userId = getOrCreateUserId();
        const doc = await db.collection('userProgress').doc(userId).get();
        
        if (doc.exists) {
            return doc.data();
        }
        return null;
    } catch (error) {
        console.error('Error loading from Firebase:', error);
        return null;
    }
}

// Save leaderboard score
async function saveLeaderboardScore(name, score, testType) {
    try {
        const userId = getOrCreateUserId();
        
        await db.collection('leaderboard').add({
            userId: userId,
            name: name,
            score: score,
            testType: testType,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        });
        
        console.log('Leaderboard score saved');
        return true;
    } catch (error) {
        console.error('Error saving leaderboard:', error);
        return false;
    }
}

// Load leaderboard
async function loadLeaderboard(limit = 20, filter = 'all') {
    try {
        let query = db.collection('leaderboard').orderBy('score', 'desc').limit(limit);
        
        if (filter === '30') {
            query = query.where('testType', '==', '30Q');
        } else if (filter === '100') {
            query = query.where('testType', '==', '100Q');
        }
        
        const snapshot = await query.get();
        const leaderboard = [];
        
        snapshot.forEach(doc => {
            leaderboard.push(doc.data());
        });
        
        return leaderboard;
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        return [];
    }
}

// Sync local progress with Firebase
async function syncLocalProgress() {
    const localProgress = JSON.parse(localStorage.getItem('fortebetCompletedModules') || '[]');
    const firebaseProgress = await loadUserProgress();
    
    // Merge both
    const allProgress = [...localProgress];
    
    if (firebaseProgress) {
        Object.keys(firebaseProgress).forEach(module => {
            if (firebaseProgress[module].completed && !allProgress.includes(module)) {
                allProgress.push(module);
            }
        });
    }
    
    localStorage.setItem('fortebetCompletedModules', JSON.stringify(allProgress));
    return allProgress;
}

// Check online status
function isOnline() {
    return navigator.onLine;
}

// Queue for offline
const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');

function addToSyncQueue(data) {
    syncQueue.push(data);
    localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
}

async function processSyncQueue() {
    if (!isOnline()) return;
    
    for (const item of syncQueue) {
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
    
    // Clear queue
    localStorage.removeItem('syncQueue');
}

// Auto-sync when online
window.addEventListener('online', processSyncQueue);
