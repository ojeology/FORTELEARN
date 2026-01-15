import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { syncFilesToDb } from "./sync";

const LEVELS = [
  "Beginner", "Trainee", "Easy", "Medium", "Intermediate", "Hard", "Boss", "Legend", "World Class"
];

async function seedDatabase() {
  await syncFilesToDb().catch(console.error);
  const existingSections = await storage.getSections();
  if (existingSections.length > 0) return;

  // 1. BONUSES
  const bonuses = await storage.createSection({ title: "BONUSES", slug: "bonuses", displayOrder: 1 });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Welcome Bonus", 
    content: "Welcome bonus is a bonus given to newly registered customers of fortebet.\n\nIt is 3x their total deposit or 300 percent of their account balance at the moment of placing their first eligible bet. A customer first eligible bet is either a prematch game or I play(live) game. Once this is met the customers are given 3x of their deposits which is stored inside their fortebet welcome bonus account which is not redeemable yet.\n\nFor a customer to redeem this bonus, the customers needs to play a prematch or I play game with a minimum of three selections and total odds of 3.00 or more.\n\nWhenever a customer does this (2) percent of the customers stake is deducted from the customer welcome bonus balance and credited to the customer main account balance which the customer can withdraw, or used to place bets.\n\nNOTE: the maximum a customer can get on his welcome bonus account is 1 million naira. meaning no matter the amount the customer deposit he will not be getting more than 1 million naira.\n\nLastly welcome bonus lasts for 90 days starting from the day the customer made his first deposit.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Multiple Booster Bonus", 
    content: "This is a bonus given to all customers of fortebet (registered online and regular customers who play at the branch) who plays prematch and inplay games, it increases their chances of winning big.\n\nTo get multiple booster bonus a customer must select a minimum of five events and each event must have odds of 1.25 or more. Once this requirements is met the customers get a (5) percent multiple booster bonus.\n\nThe maximum number of events on a single ticket is 150. But once you have 50 events on your ticket with odds of 1.25 you will get the maximum multiple booster bonus which is 250 percent and that's the maximum.\n\nNOTE: even if all your 150 events have odds of 1.25 or more you will still be getting 250 percent multiple booster bonus.\n\nCHART OF MULTIPLE BOOSTER BONUS:\n5 EVENTS: 5 PERCENT\n6 EVENTS: 10\n7 EVENTS: 15\n8 EVENTS: 20\n9 EVENTS: 25\n10 EVENTS: 30\n12 EVENTS: 40\n14 EVENTS: 50\n16 EVENTS: 60\n18 EVENTS: 70\n20 EVENTS: 80\n25 EVENTS: 100\n30 EVENTS: 125\n35 EVENTS: 150\n40 EVENTS: 175\n45 EVENTS: 200\n50 EVENTS: 250", 
    displayOrder: 2 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Cashback Bonus", 
    content: "This is a bonus given to only registered customers of fortebet (customer who have an account and plays prematch and inplay online).\n\nThis bonus allows customers to reclaim up to 3x of their stake after final evaluation of their bets with only one selection lost. For a customer to be eligible for cash back bonus, the customer must select a minimum of two events or more, exactly One event must be lost and the odds of the remaining events must fall into the range below:\n\n0 - 74.99: No cashback\n75 - 149.99: 1x stake back\n150 - 299.99: 2x stake back\n300 and above: 3x stake back", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Online Virtual Bonus", 
    content: "This is a bonus given to only registered customers of fortebet (customer that have accounts with fortebet and plays virtual online) it also increases their chances of winning big as it adds to total payout.\n\nFor one event selected and staked on: 1% online virtual bonus\nFor two events selected: 2% online virtual bonus\nFor three events selected: 3% online virtual bonus (maximum).\n\nNOTE: the maximum number of virtual events you can select once is three events and each event starts five minutes after each one. 288 virtual matches per 24 hours.", 
    displayOrder: 4 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "VIP Points", 
    content: "These are bonus points given to only registered customers of fortebet who play all games online (Prematch, Inplay, Aviator, Slots).\n\nCustomers who plays slot at the branch with their vip cards, and customer who registered an account with and verify their email adress also get vip points. (An instant 20,000 vip points is given to customers who verify their email adress.)\n\nVIP Points Conversion:\n25,000 = 200 naira\n110,000 = 1,000 naira\n1,000,000 = 10,000 naira\n\nVIP points can be converted to cash that can be used to play bets or withdrawn.", 
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
    title: "What is Cashout?", 
    content: "Cashout is a dynamic betting feature that allows you to settle your bet before all events on your ticket are completed. Instead of waiting for the final outcomes, you can lock in a profit or minimize losses based on live match situations and current odds.\n\nKey Benefits:\n· Risk Management: Secure guaranteed returns when your bet is winning\n· Loss Reduction: Cut potential losses when games aren't going as predicted\n· Strategic Flexibility: React to live match developments (red cards, injuries, weather changes)\n· Instant Access: Receive funds immediately rather than waiting for event completion", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: cashout.id, 
    title: "When Can I Cash Out?", 
    content: "Cashout availability depends on specific conditions being met simultaneously:\n\n1. All Matches Must Have Official Live Status\n· Each event on your ticket must be in-play (game has started but not finished)\n· Pre-match or postponed events will disable cashout\n· Events must be officially recognized as 'live' by our trading team\n· Note: Some events may be live but cashout-suspended due to critical moments (penalties, last minutes, etc.)\n\n2. Current Odds Must Be Available for All Selections\n· Our trading team must be actively pricing each selection\n· If odds aren't being updated for any selection, cashout becomes unavailable\n· This ensures fair, market-reflective cashout values\n\n3. Dynamic Availability\n· Cashout availability changes throughout events\n· May become temporarily unavailable during: Goals being reviewed by VAR, Penalty situations, Last 5 minutes of close matches, Technical issues with data feeds", 
    displayOrder: 2 
  });
  await storage.createSubsection({ 
    sectionId: cashout.id, 
    title: "Important Rule: VIP Points System", 
    content: "The Rule: If you received VIP points for placing a bet, you must maintain the same number of VIP points in your account to cash out that bet.\n\nWhy This Exists:\n· Prevents Point Farming: Stops users from placing bets, earning VIP points, then immediately cashing out without risk\n· Ensures Fair Play: Maintains integrity of our VIP rewards program\n· Encourages Genuine Betting: Rewards users who let bets run to completion\n\nHow It Works:\n1. You place a ₦10,000 bet and receive 100 VIP points as a reward\n2. You use 50 VIP points on other rewards, leaving 50 in your account\n3. You cannot cash out the ₦10,000 bet until you restore your VIP points to 100\n4. Once you earn/gain back the 50 missing points, cashout becomes available", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: cashout.id, 
    title: "Fair Cashout: Transparent Calculation", 
    content: "Calculation Formula:\nCashout Value = (Potential Winnings ÷ Total Current Odds) - 1% Processing Fee\n\nUnderstanding Components:\n· Potential Winnings: Your total return if all remaining selections win\n· Total Current Odds: Live combined odds of all remaining selections\n· 1% Processing Fee: Small charge for instant settlement service\n\nExample Walkthrough:\nOriginal Bet: ₦1,000 on 3 matches @ 10.80 odds (₦10,800 potential win)\nCurrent Total Odds for remaining matches: 1.80\nCalculation: (₦10,800 ÷ 1.80) = ₦6,000\nMinus 1% Fee: ₦6,000 - ₦60 = ₦5,940\nYour Cashout Offer: ₦5,940", 
    displayOrder: 4 
  });
  await storage.createSubsection({ 
    sectionId: cashout.id, 
    title: "Fair Cashout Suspension Rules", 
    content: "Cashout is temporarily suspended in these specific scenarios:\n\n1. Any Event Settled as Void: System recalibrates the entire ticket. Cashout remains suspended until void event is officially resolved and new odds are calculated.\n\n2. Current Odds Exceed 10.00: Extreme odds indicate highly volatile or unusual match situations. Protects both users and ForteBet from market anomalies.\n\n3. All Odds Unchanged from Original: Indicates no significant match developments. Cashout becomes available when at least one selection's odds change.", 
    displayOrder: 5 
  });

  // 4. DEPOSITS & WITHDRAWALS
  const dw = await storage.createSection({ title: "DEPOSITS & WITHDRAWALS", slug: "deposits-withdrawals", displayOrder: 4 });
  await storage.createSubsection({ 
    sectionId: dw.id, 
    title: "How to Deposit", 
    content: "There are four ways to deposit money into your ForteBet account.\n\n1. Deposit at a Branch\nProcess:\n1. Visit any ForteBet branch.\n2. Inform the operator you wish to make a 'Client In' deposit.\n3. Provide your registered username and the cash amount.\n4. Your online account will be credited instantly.\n5. You will receive a transaction slip; please verify all details are correct.\n\nCorrection Window: Transactions can be cancelled within 10 minutes in case of an error.\n\nLimits:\n· Minimum: ₦200.00 per transaction.\n· Maximum: Unlimited.\n\n2. Deposit via Credit/Debit Card\nProcess:\n1. Select ‘DEPOSIT WITH A NEW CARD’ and enter your card details, or choose a previously saved card.\n2. Specify the deposit amount and click 'TOP UP NOW'.\n3. Complete the secure payment form.\n4. You may need to authenticate the transaction via a One-Time Password (OTP) sent to your phone by your bank.\n5. Upon successful processing, funds are credited to your account instantly.\n\nSupport: If your account is debited but not credited, contact us immediately at 0800 009 009 009 or info@fortebet.ng.\n\nLimits & Fees:\n· Minimum: ₦200.00\n· Maximum: ₦250,000.00 per transaction / ₦1,000,000.00 per 24 hours.\n· Processing Time: Instant.\n· Fees: Only your bank's standard charges apply. No fees from ForteBet.\n\n3. Deposit via Instant Bank Transfer\nImportant: The name on the bank account used for your first transfer deposit will become your official ForteBet account name. Withdrawals can only be processed to this designated name.\n\nProcess:\n1. Specify the deposit amount and click 'TOP UP NOW'.\n2. You will receive a temporary bank account number, valid for 30 minutes.\n3. Use your online banking or USSD to transfer the exact amount to this account.\n4. You will be redirected back to ForteBet, and your account will be credited instantly.\n\nSupport: If your account is debited but not credited, contact us immediately at 0800 009 009 009 or info@fortebet.ng.\n\nLimits & Fees:\n· Minimum: ₦200.00\n· Maximum: ₦500,000.00 per transaction / ₦1,000,000.00 per 24 hours.\n· Processing Time: Instant.\n· Fees: Only your bank's standard charges apply. No fees from ForteBet.\n\n4. Deposit via OPay Wallet\nNote: OPay deposit methods are accessible only after your first deposit has been made via Bank Transfer or Bank Card.\n\nProcess:\n1. Select your preferred OPay Wallet method, specify the amount, and click 'TOP UP NOW'.\n2. The OPay interface will open for you to confirm the transaction.\n3. Upon successful processing, you will be redirected back, and your account will be credited instantly.\n\nSupport: If your account is debited but not credited, contact us immediately at 0800 009 009 009 or info@fortebet.ng.\n\nLimits & Fees:\n· Minimum: ₦100.00\n· Maximum: Limited by your personal OPay wallet limits.\n· Processing Time: Instant.\n· Fees: Only applicable wallet/bank fees apply. No fees from ForteBet.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: dw.id, 
    title: "How to Withdraw", 
    content: "1. Withdrawal via Bank Transfer\nPrerequisite: You must have first deposited using Bank Transfer or Bank Card. Withdrawals can only be processed to this designated name.\n\nProcess:\n1. Fill in the withdrawal form with your bank account details and click 'WITHDRAW'.\n2. An OTP will be sent to your registered mobile number to authorize the request.\n3. Confirm all bank details are correct to initiate the withdrawal.\n4. The requested amount will be debited from your ForteBet account, and the request will be marked as pending.\n\nImportant: All withdrawals are subject to approval. Processing should not exceed 24 hours.\n\nSupport: For guidance, call 0800 009 009 009.\n\nLimits & Fees:\n· Minimum: ₦200.00\n· Maximum: ₦10,000,000.00 per 24 hours.\n· Processing Time: Typically within 5 minutes, but we reserve the right to review transactions within 24 hours.\n· Fees: Only your bank's standard charges apply. No fees from ForteBet.\n\n2. Withdrawal at a Branch\nProcess:\n1. Visit any ForteBet branch.\n2. Provide the operator with your registered username and the 4-digit authorization code sent to your registered phone number.\n3. The operator will process the 'Client Cash Out' and ask for the code.\n4. You will receive your winnings in cash.\n\nLimits:\n· Minimum: ₦200.00 per transaction.\n· Maximum: ₦10,000,000.00 per transaction.", 
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
    title: "Common Branch Issues", 
    content: "1. WHEN A CUSTOMER IS NOT RECEIVING OTP:\n· Restart the phone\n· Check if the SIM card number matches the number on the account.\n· Check if the phone isn't on DND\n· Check if the phone storage isn't full\n· If all above has been done, use the CUG (company phone) to report in the issue group with: Branch Name, Customer Phone Number, Service Provider, Customer Username, and Issue Description.\n\n2. WHEN A TICKET FAILED TO PRINT OUT COMPLETELY:\nReport to group with: Branch Name, POS ID, Type (prematch/virtual), Ticket ID, and Reason (e.g., Network glitch).\n\n3. WHEN THE NETWORK AT THE BRANCH IS NOT STABLE:\nReport with: Branch Name and Issue (e.g., Router not receiving network).\n\n4. WHEN A NEW ITEM IS PURCHASED AT THE BRANCH:\nTake a picture of item and receipt, post in problem group with description.\n\n5. HOW TO CHECK TICKET THAT FAILED TO PRINT OUT:\nUse 'Control + alternate + p'.", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: ops.id, 
    title: "Administrative Procedures", 
    content: "HOW TO SEND TO COLLECT:\nThe operator on the main terminal prints the collection by going to 'To collect', prints it out, and sends a report of total cash, opay balance, and total balance available to the manager who sends it to the manager group.", 
    displayOrder: 6 
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

export async function registerRoutes(app: Express): Promise<Server> {
  await seedDatabase().catch(console.error);

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
    const entry = await storage.addToLeaderboard(req.body);
    res.json(entry);
  });

  return {} as Server;
}
