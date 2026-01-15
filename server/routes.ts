import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const LEVELS = [
  "Beginner", "Trainee", "Easy", "Medium", "Intermediate", "Hard", "Boss", "Legend", "World Class"
];

async function seedDatabase() {
  const existingSections = await storage.getSections();
  if (existingSections.length > 0) return;

  // 1. BONUSES
  const bonuses = await storage.createSection({ title: "BONUSES", slug: "bonuses", displayOrder: 1 });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Welcome Bonus", 
    content: "Bonus for newly registered customers. 3x (300%) of first deposit.\nEligible bets: Prematch or Inplay.\nRedeem: Min 3 selections, total odds 3.00+. 2% of stake moved from bonus to main account.\nMax: ₦1,000,000. Expires in 90 days.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Multiple Booster Bonus", 
    content: "Online & Branch. Min 5 events, each event odds 1.25+.\nChart:\n5: 5% | 10: 30% | 20: 80% | 50: 250% (Max)\nMax events per ticket: 150.", 
    displayOrder: 2 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Cashback Bonus", 
    content: "Online customers only. Reclaim stake if exactly one event lost.\nOdds (remaining): 75-149.99 (1x stake), 150-299.99 (2x), 300+ (3x).", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Online Virtual Bonus", 
    content: "Online virtual players only. Max 3 events.\n1 event: 1% | 2 events: 2% | 3 events: 3% (Max).", 
    displayOrder: 4 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "VIP Points", 
    content: "Earned by playing online or branch slots with card. 20k points for email verification.\nConversion: 25k=₦200, 110k=₦1k, 1M=₦10k.\nVIP card slot withdrawals need authorization code.", 
    displayOrder: 5 
  });

  // 2. BETTING MARKETS
  const markets = await storage.createSection({ title: "BETTING MARKETS", slug: "markets", displayOrder: 2 });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "1X2 & Basic Variations", 
    content: "1X2 (Match Result): 1=Home, X=Draw, 2=Away. Regular time only.\nDraw No Bet (DNB): Removes draw. Win = payout, Draw = stake returned (push).\nDouble Chance (DC): 1X (Home/Draw), 12 (Home/Away), X2 (Draw/Away). Lower odds but safer.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "Totals (Over/Under)", 
    content: "Full Match: Line e.g. 2.5. Over 2.5 (3+ goals), Under 2.5 (0-2 goals). .5 ensures no tie.\nFirst Half: Same logic but only for first 45 mins.\nBoth Teams To Score (BTTS/GG): Yes (both score), No (at least one fails).", 
    displayOrder: 2 
  });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "Handicap Betting", 
    content: "Asian Handicap: Quarter-goal increments. -0.25 (Win: win, Draw: half loss). -0.75 (Win by 2: full win, Win by 1: half win). -1.5 (Must win by 2+).\nEuropean Handicap: 3-way result after applying whole number handicap. -1 means 1-0 result is a Draw.", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "Combo Bets", 
    content: "Both conditions must happen.\nWin & Over (e.g., 1 & Over 1.5): Team wins AND total goals >= 2.\nWin & GG: Team wins AND both teams score.\nOver & GG: 3+ goals AND both teams score.\nHT/FT Combos: Predict HT/FT result AND another market.", 
    displayOrder: 4 
  });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "Half-Time / Full-Time (HT/FT)", 
    content: "Predict result at HT and FT. 9 combinations: 1/1, 1/X, 1/2, X/1, X/X, X/2, 2/1, 2/X, 2/2.\nExample: X/1 means Draw at HT, Home win at FT.", 
    displayOrder: 5 
  });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "Goal Scorer & Specials", 
    content: "Anytime Goal Scorer: Named player scores 1+ goals. Own goals don't count.\nFirst Goal Scorer: Named player scores first goal. Void if player doesn't start.\nTotal Corners/Cards: Over/Under on total awarded in match.", 
    displayOrder: 6 
  });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "Win Both Halves", 
    content: "Team must outscore opponent in 1st half AND outscore them in 2nd half separately.\nExample: HT 1-0, FT 2-0 means 2nd half score was 1-0 (won both).\nHT 2-0, FT 3-1 means 2nd half score was 1-1 (did NOT win both).", 
    displayOrder: 7 
  });
  await storage.createSubsection({ 
    sectionId: markets.id, 
    title: "Winning Margin", 
    content: "Bet on exact gap of victory. Options like 'Home by exactly 1', 'Away by 2 or more', 'Any team by exactly 2'.", 
    displayOrder: 8 
  });

  // 3. CASHOUT
  const cashout = await storage.createSection({ title: "CASHOUT", slug: "cashout", displayOrder: 3 });
  await storage.createSubsection({ 
    sectionId: cashout.id, 
    title: "Rules & Conditions", 
    content: "Settle bet early. Conditions: All matches must be live, odds must be available for all selections. Only for online tickets.\n\nVIP Points Rule: If you earned points from the bet, you must have that many points in your account to cash out. This prevents exploitation.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: cashout.id, 
    title: "Fair Cashout Calculation", 
    content: "Formula: (Potential Winnings ÷ Total Current Odds) - 1% Fee.\nSuspended if: Void event, Odds > 10.00, or odds haven't changed.", 
    displayOrder: 2 
  });

  // 4. DEPOSITS & WITHDRAWALS
  const dw = await storage.createSection({ title: "DEPOSITS & WITHDRAWALS", slug: "deposits-withdrawals", displayOrder: 4 });
  await storage.createSubsection({ 
    sectionId: dw.id, 
    title: "How to Deposit", 
    content: "1. Branch: 'Client In' with username. Min ₦200.\n2. Card: Secure online payment. Min ₦200, Max ₦250k/tx.\n3. Bank Transfer: First deposit sets account name. Min ₦200.\n4. OPay: Available after first card/transfer deposit. Min ₦100.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: dw.id, 
    title: "How to Withdraw", 
    content: "1. Withdrawal via Bank Transfer\n⚠️ PREREQUISITE: Must have first deposited via Bank Transfer or Bank Card. Withdrawals only to registered name.\nStep 1: Fill bank details, click \"WITHDRAW\"\nStep 2: Enter OTP sent to your registered phone\nStep 3: Confirm all bank details are correct\nStep 4: Request marked pending - amount debited from account\nMinimum: ₦200.00\nMaximum: ₦10,000,000 per 24 hours\nProcessing: Typically 5 minutes (review may take up to 24 hours)\nFees: Only bank charges apply | ForteBet: No fees\nSupport: Call 0800 009 009 009 for guidance\n\n2. Withdrawal at a Branch\nStep 1: Visit any ForteBet branch\nStep 2: Provide username and 4-digit code from SMS\nStep 3: Operator processes \"Client Cash Out\"\nStep 4: Receive your winnings in cash\nMinimum: ₦200.00 per transaction\nMaximum: ₦10,000,000 per transaction", 
    displayOrder: 2 
  });

  // 5. STAKE LIMITS
  const limits = await storage.createSection({ title: "STAKE LIMITS", slug: "limits", displayOrder: 5 });
  await storage.createSubsection({ 
    sectionId: limits.id, 
    title: "Min/Max Stakes", 
    content: "Minimum Stake Amounts:\n· Slot Online: ₦20\n· Slot at Branch: ₦50\n· Aviator: ₦100\n· Prematch at Branch: ₦200\n· In-Play Online: ₦200\n· Prematch Online: ₦200\n· Virtual Games Online: ₦200\n· Virtual Games at Branch: ₦100,000\n\nMaximum Stake Amounts:\n· Aviator: ₦100,000\n· Slot Online: ₦20,000\n· Slot at Branch: ₦8,000\n· Virtual Games Online: ₦1,000,000\n· Virtual Games at Branch: ₦100,000\n· Prematch Online: ₦1,000,000\n· Prematch at Branch: ₦1,000,000", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: limits.id, 
    title: "Maximum Winnings & Payout Rules", 
    content: "· Aviator: ₦50,000,000\n· Prematch at Branch: ₦200,000,000\n· Virtual Games at Branch: ₦200,000,000\n· Slot Games: Overall max ₦200,000,000\n\nImportant Rule on Maximum Payout (₦200 Million):\nThe system will not allow a potential win to exceed ₦200,000,000 on a single bet slip. If your selections create a potential win over this limit:\n1. Your total stake is reduced to an amount that brings the potential payout down to ₦200,000,000.\n2. If reduction makes it lower than minimum stake, you must remove selections.", 
    displayOrder: 2 
  });

  // 6. OPERATIONAL KNOWLEDGE
  const ops = await storage.createSection({ title: "BRANCH OPERATIONS", slug: "operations", displayOrder: 6 });
  await storage.createSubsection({ 
    sectionId: ops.id, 
    title: "POS Knowledge (F-Keys)", 
    content: "F1: Client cash in/out, Slot in/out.\nF2: Payout/Cancel tickets. Scan barcode or enter code. Prematch cancelable within 10 mins if no event started.\nF4: To collect, Cash in/out POS, Transfer between POS, Day report, Show full transactions.\nF12: Finish transactions (clear homepage).", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: ops.id, 
    title: "POS Knowledge (Letters)", 
    content: "I: Load booking number (expires in 1 hr).\nT: Rebet already placed ticket (scan or enter code).\nL: Display last prematch game played.\nN: Enter customer username for deposit/withdrawal.\nK: Enter slot card numbers.", 
    displayOrder: 2 
  });
  await storage.createSubsection({ 
    sectionId: ops.id, 
    title: "Common Issues", 
    content: "OTP not received: Restart phone, check SIM match, check DND, check storage. If still missing, report to CUG group.\nFailed Print: Report to group with Branch, POS ID, Ticket Type, Ticket ID, Reason. Support sends 4-digit code.\nNetwork unstable: Check router receiving network, report to group.", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: ops.id, 
    title: "Work Ethics", 
    content: "· Shift starts 7:00 AM. Branch tidy and online by 7:30 AM.\n· Slots online by 7:30 AM.\n· No customers sleeping inside.\n· Request fuel when tank is half and no reserve.\n· Playing games or betting while on duty is PROHIBITED.\n· Shop cash must not go above 250k without valid reason.\n· Seek approval before cashing out on POS.\n· Operations close at/after 11:30 PM.\n· CUG phone stays in branch.", 
    displayOrder: 4 
  });
  await storage.createSubsection({ 
    sectionId: ops.id, 
    title: "Slot Machine Troubleshooting", 
    content: "Power Failure: Bonus round winnings calculated and paid. Credits refunded to card if machine goes offline.\nDisputes: Use slot keys to check Financial Transaction log and Game History log.\nFaulty Machine: Report to group with Branch, Slot ID, Photo, and Description.", 
    displayOrder: 5 
  });

  const allQuestions = [
    // Beginner
    { question: "How is the Welcome Bonus initially calculated?", options: ["200% of the first deposit", "150% of the total deposits", "300% of the first deposit", "A fixed amount of 500,000"], correctAnswer: "300% of the first deposit", level: "Beginner" },
    { question: "What is the maximum Welcome Bonus amount a customer can receive?", options: ["500,000", "750,000", "1,000,000", "2,000,000"], correctAnswer: "1,000,000", level: "Beginner" },
    { question: "What is the minimum stake for Prematch at the branch?", options: ["₦100", "₦200", "₦500", "₦1,000"], correctAnswer: "₦200", level: "Beginner" },
    { question: "What is Fortebet's toll-free customer line?", options: ["0800 009 009 009", "0700 123 456", "0800 111 222", "0900 888 777"], correctAnswer: "0800 009 009 009", level: "Beginner" },
    
    // Trainee
    { question: "What percentage of the stake is moved from the Welcome Bonus per qualifying bet?", options: ["1%", "2%", "5%", "10%"], correctAnswer: "2%", level: "Trainee" },
    { question: "When does the Welcome Bonus expire?", options: ["30 days", "60 days", "90 days", "120 days"], correctAnswer: "90 days", level: "Trainee" },
    { question: "What is the minimum requirement for the Multiple Booster Bonus?", options: ["3 events, 1.25 odds", "5 events, 1.25 odds", "5 events, 1.50 odds", "10 events, 1.20 odds"], correctAnswer: "5 events, 1.25 odds", level: "Trainee" },

    // Easy
    { question: "What is the maximum win on a single bet slip?", options: ["₦10M", "₦50M", "₦100M", "₦200M"], correctAnswer: "₦200M", level: "Easy" },
    { question: "What happens if a Draw No Bet ends in a draw?", options: ["Ticket loses", "Half stake returned", "Full stake returned (push)", "Ticket is void"], correctAnswer: "Full stake returned (push)", level: "Easy" },
    { question: "What is the minimum OPay deposit?", options: ["₦50", "₦100", "₦200", "₦500"], correctAnswer: "₦100", level: "Easy" },

    // Medium
    { question: "What is the maximum Multiple Booster bonus percentage?", options: ["100%", "200%", "250%", "300%"], correctAnswer: "250%", level: "Medium" },
    { question: "How many events must meet requirements for 250% booster?", options: ["25", "30", "50", "100"], correctAnswer: "50", level: "Medium" },
    { question: "What is the minimum stake for Slot online?", options: ["₦10", "₦20", "₦50", "₦100"], correctAnswer: "₦20", level: "Medium" },

    // Intermediate
    { question: "How many virtual games are played in 24 hours?", options: ["100", "240", "288", "300"], correctAnswer: "288", level: "Intermediate" },
    { question: "In 'Win Both Halves', if HT is 2-0 and FT is 3-1, did the team win both halves?", options: ["Yes", "No", "Only if it was a derby", "Depends on VAR"], correctAnswer: "No", level: "Intermediate" },
    { question: "What is the maximum Online Virtual Bonus?", options: ["1%", "3%", "5%", "10%"], correctAnswer: "3%", level: "Intermediate" },

    // Hard
    { question: "What is the formula for Fair Cashout?", options: ["Winnings - Stake", "Winnings / Total Current Odds - 1% Fee", "Winnings * Current Odds", "Stake * 2"], correctAnswer: "Winnings / Total Current Odds - 1% Fee", level: "Hard" },
    { question: "What happens to cashout if one event is settled as void?", options: ["Available immediately", "Available with 50% value", "Suspended until recalibration", "Ticket is lost"], correctAnswer: "Suspended until recalibration", level: "Hard" },
    { question: "What is the maximum deposit via card per 24 hours?", options: ["₦100,000", "₦250,000", "₦500,000", "₦1,000,000"], correctAnswer: "₦1,000,000", level: "Hard" },

    // Boss
    { question: "What POS key is used for payout/cancel?", options: ["F1", "F2", "F4", "F12"], correctAnswer: "F2", level: "Boss" },
    { question: "What POS key is used for 'To Collect'?", options: ["F1", "F2", "F4", "F10"], correctAnswer: "F4", level: "Boss" },
    { question: "What letter is used to rebet a ticket?", options: ["N", "K", "T", "I"], correctAnswer: "T", level: "Boss" },

    // Legend
    { question: "How many paylines does 'Mad Mechanic' have?", options: ["3", "5", "10", "20"], correctAnswer: "5", level: "Legend" },
    { question: "What is the reset value for Gold Jackpot?", options: ["₦10,000", "₦50,000", "₦100,000", "₦1,000,000"], correctAnswer: "₦100,000", level: "Legend" },
    { question: "How many times can you double winnings in Risk feature?", options: ["3", "5", "7", "10"], correctAnswer: "5", level: "Legend" },

    // World Class
    { question: "What is the exact requirement for Cashback 3x?", options: ["Remaining odds 150+", "Remaining odds 300+", "Exactly 2 events lost", "Total odds 1000+"], correctAnswer: "Remaining odds 300+", level: "World Class" },
    { question: "If a player confirmation code is missing, what should be checked first?", options: ["Network", "SIM card matches registered number", "Phone storage", "All of the above"], correctAnswer: "All of the above", level: "World Class" },
    { question: "What is the second half score if HT is 1-0 and FT is 2-0?", options: ["1-0", "2-0", "0-0", "0-1"], correctAnswer: "1-0", level: "World Class" }
  ];

  for (const q of allQuestions) {
    await storage.createQuizQuestion(q);
  }
}

export function registerRoutes(app: Express): Server {
  seedDatabase().catch(console.error);

  app.get("/api/sections", async (_req, res) => {
    const sections = await storage.getSectionsWithSubsections();
    res.json(sections);
  });

  app.get("/api/sections/:slug", async (req, res) => {
    const section = await storage.getSectionBySlug(req.params.slug);
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.json(section);
  });

  app.get("/api/quiz/questions", async (req, res) => {
    const level = req.query.level as string;
    if (!level) return res.status(400).json({ message: "Level is required" });
    const questions = await storage.getQuestionsByLevel(level);
    res.json(questions);
  });

  app.get("/api/leaderboard", async (_req, res) => {
    const entries = await storage.getLeaderboard();
    res.json(entries);
  });

  app.post("/api/leaderboard", async (req, res) => {
    const parsed = api.leaderboard.post.body.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid body" });
    const entry = await storage.addToLeaderboard(parsed.data);
    res.json(entry);
  });

  // httpServer is handled in server/index.ts, just returning a placeholder here
  // or rather, the template expects registerRoutes to NOT start the server itself
  // but to define routes. Let's fix the signature to match index.ts call.
  return {} as Server;
}

export function registerRoutesWithServer(server: Server, app: Express) {
  seedDatabase().catch(console.error);

  app.get("/api/sections", async (_req, res) => {
    const sections = await storage.getSectionsWithSubsections();
    res.json(sections);
  });

  app.get("/api/sections/:slug", async (req, res) => {
    const section = await storage.getSectionBySlug(req.params.slug);
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.json(section);
  });

  app.get("/api/quiz/questions", async (req, res) => {
    const level = req.query.level as string;
    if (!level) return res.status(400).json({ message: "Level is required" });
    const questions = await storage.getQuestionsByLevel(level);
    res.json(questions);
  });

  app.get("/api/leaderboard", async (_req, res) => {
    const entries = await storage.getLeaderboard();
    res.json(entries);
  });

  app.post("/api/leaderboard", async (req, res) => {
    const parsed = api.leaderboard.post.body.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid body" });
    const entry = await storage.addToLeaderboard(parsed.data);
    res.json(entry);
  });
}
