// List of your 11 training cards - UPDATE THESE NAMES to match your actual files
const trainingCards = [
    { id: 1, name: "Welcome Bonus", file: "welcome-bonus.txt", icon: "💰" },
    { id: 2, name: "Slot Machines", file: "slot-machine-basics.txt", icon: "🎰" },
    { id: 3, name: "Virtual Sports", file: "virtual-sports-betting.txt", icon: "⚽" },
    { id: 4, name: "Betting Markets", file: "betting-options.txt", icon: "📊" },
    { id: 5, name: "VIP System", file: "vip-points.txt", icon: "⭐" },
    { id: 6, name: "Cashback Bonus", file: "cashback-bonus.txt", icon: "💸" },
    { id: 7, name: "Multiple Boosters", file: "multiple-booster-bonus.txt", icon: "🚀" },
    { id: 8, name: "Cashout Guide", file: "cashout-complete-guide.txt", icon: "💵" },
    { id: 9, name: "Stakes & Limits", file: "minimum-and-maximum-stakes.txt", icon: "🏆" },
    { id: 10, name: "POS Knowledge", file: "pos-and-terminal-knowledge.txt", icon: "👨‍💼" },
    { id: 11, name: "Work Ethics", file: "work-ethics-guidelines.txt", icon: "📜" }
];

// Function to display all cards on homepage
function displayAllCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    trainingCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <h3>${card.icon} ${card.name}</h3>
            <p>Click to read the complete guide and master this topic.</p>
            <button class="btn-read" onclick="loadCardDetail('${card.file}', '${card.name}')">
                Read This Module →
            </button>
        `;
        container.appendChild(cardElement);
    });
}

// Function to load and display a single card's content
async function loadCardDetail(filename, cardTitle) {
    try {
        // Show loading state
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2>Loading ${cardTitle}...</h2>
                <p>Please wait while we fetch the content.</p>
            </div>
        `;
        
        // Find the section slug by looking at the filename or mapping
        // In this app, we need to know which directory the file is in.
        // We'll try to find it by fetching from a known path or mapping.
        // For simplicity, I'll use a mapping or search.
        const fileToSection = {
            "welcome-bonus.txt": "bonuses",
            "slot-machine-basics.txt": "slot-machines",
            "virtual-sports-betting.txt": "virtual-betting",
            "betting-options.txt": "markets",
            "vip-points.txt": "bonuses",
            "cashback-bonus.txt": "bonuses",
            "multiple-booster-bonus.txt": "bonuses",
            "cashout-complete-guide.txt": "cashout-complete-guide",
            "minimum-and-maximum-stakes.txt": "limits",
            "pos-and-terminal-knowledge.txt": "operations",
            "work-ethics-guidelines.txt": "work-ethics"
        };

        const section = fileToSection[filename] || "markets";
        const response = await fetch(`data/${section}/${filename}`);
        
        if (!response.ok) {
            throw new Error(`File not found: ${filename}`);
        }
        
        const content = await response.text();
        
        // Create the card detail page
        document.body.innerHTML = `
            <div class="container">
                <header>
                    <a href="index.html" class="back-btn" id="backHomeBtn">← Back to Home</a>
                    <h1>${cardTitle}</h1>
                    
                    <!-- Top Ad -->
                    <div class="ad-container">
                        <div id="card-top-ad"></div>
                    </div>
                </header>
                
                <main class="card-detail">
                    <div class="content-display">
                        ${content.replace(/\n/g, '<br>')}
                    </div>
                    
                    <div style="text-align: center; margin: 40px 0;">
                        <button class="btn-primary" onclick="takeQuiz('${cardTitle}')">
                            Take Quiz on ${cardTitle} →
                        </button>
                    </div>
                </main>
                
                <footer>
                    <!-- Bottom Ad -->
                    <div class="ad-container">
                        <div id="card-bottom-ad"></div>
                    </div>
                    <p>ForteBet Training | ${cardTitle} Guide</p>
                </footer>
            </div>
        `;
        
        // Add pop-under trigger to the back button
        document.getElementById('backHomeBtn').addEventListener('click', function(e) {
            // Trigger pop-under ad when returning to homepage
            triggerPopUnderAd();
        });
        
        // Load Adsterra ads for this page
        loadCardPageAds();
        
    } catch (error) {
        console.error('Error loading card:', error);
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2>Error Loading Content</h2>
                <p>Could not load ${cardTitle}. Please try again.</p>
                <a href="index.html" class="btn-primary">Return to Home</a>
            </div>
        `;
    }
}

// Function to trigger a quiz (for your quiz system)
function takeQuiz(cardTitle) {
    // Trigger pop-under when starting quiz
    triggerPopUnderAd();
    
    // In the future, link to your actual quiz page
    alert(`Quiz for ${cardTitle} would launch here! This is where you'll integrate your question formats.`);
    
    // For now, redirect to a quiz page (you'll create this later)
    // window.location.href = `quiz.html?topic=${encodeURIComponent(cardTitle)}`;
}

// Function to trigger pop-under ads
function triggerPopUnderAd() {
    // REPLACE THIS with your actual Adsterra pop-under code
    console.log('Pop-under ad triggered');
    // Example: pushort.pushunder().show();
}

// Function to load ads on card detail pages
function loadCardPageAds() {
    // You'll paste your Adsterra banner codes here for card pages
    console.log('Loading ads on card detail page');
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on homepage or card detail page
    if (document.getElementById('cardsContainer')) {
        displayAllCards();
    }
    
    // Initialize any ad scripts that need to run
    initializeAds();
});

function initializeAds() {
    // Initialize your Adsterra ads here
    console.log('Ad system initialized');
}
