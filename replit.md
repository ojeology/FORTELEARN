# ForteBet Training Pro

## Overview

ForteBet Training Pro is a static educational web application designed to train betting shop operators on ForteBet's products, procedures, and policies. The application serves as a comprehensive reference guide covering betting markets, bonus systems, POS/terminal operations, slot machines, virtual betting, deposits/withdrawals, and workplace ethics.

The project is a simple client-side application with no backend - it consists of a single HTML file that displays training content stored in text files within a `data/` directory structure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Single-page HTML application**: The entire UI is contained in `index.html` with embedded CSS styles
- **No JavaScript framework**: Pure vanilla HTML/CSS with inline styling
- **Card-based navigation**: Training topics are displayed as clickable cards in a responsive grid layout
- **Content viewer pattern**: Users click topic cards to view detailed training content

### Content Management

- **File-based content storage**: Training materials are stored as plain text files in the `data/` directory
- **Hierarchical organization**: Content is organized into subdirectories by category:
  - `data/bonuses/` - Bonus types (welcome, cashback, VIP points, multiple booster, online virtual)
  - `data/markets/` - Betting market explanations (1X2, handicaps, totals, etc.)
  - `data/operations/` - Branch operational procedures
  - `data/slot-machines/` - Slot machine knowledge
  - `data/virtual-betting/` - Virtual sports information
  - `data/deposits-withdrawals/` - Payment procedures
  - `data/work-ethics/` - Employee conduct guidelines
  - `data/limits/` - Stake and payout limits
  - `data/cashout-complete-guide/` - Cashout feature documentation

### Design Decisions

1. **Static file approach**: Chosen for simplicity and offline capability - operators can access training materials without internet connectivity
2. **No database required**: All content lives in text files, making updates straightforward without backend changes
3. **Responsive grid layout**: Cards adapt to screen size for mobile/tablet use at betting branches
4. **Professional betting theme**: Blue gradient color scheme with gold accents matching ForteBet branding

## External Dependencies

### Current State
- **None**: The application has zero external dependencies - no npm packages, no CDN libraries, no APIs, no database connections
- **Self-contained**: Everything runs from static files that can be served by any web server or opened directly in a browser

### Content Sources
- Training content is manually authored and stored in `.txt` files
- `attached_assets/` directory contains source/reference materials used to create the training content

### Potential Future Integrations (Referenced in attached assets)
- Firebase integration was planned for cloud-based leaderboard storage (see `Pasted-Step-10-Update-quiz-game-html-Save-Function-javascript_*.txt`)
- LocalStorage is mentioned for offline score tracking
- These features are not currently implemented in the codebase