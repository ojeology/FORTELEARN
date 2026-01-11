import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { createServer } from "http";

const LEVELS = [
  "Beginner", "Trainee", "Easy", "Medium", "Intermediate", "Hard", "Boss", "Legend", "World Class"
];

async function seedDatabase() {
  const existingSections = await storage.getSections();
  if (existingSections.length === 0) {
    const bonuses = await storage.createSection({ title: "BONUSES", slug: "bonuses", displayOrder: 1 });
    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Welcome Bonus", 
      content: "Welcome Bonus is calculated as 300% of the first deposit for new registered customers. This means if you deposit ₦1,000, you get a bonus of ₦3,000. Maximum welcome bonus amount is ₦1,000,000. It expires after exactly 90 days of the first deposit. To qualify for the Welcome Bonus credit, a customer's bet must include at least 3 events with total odds of 3.00 or more. Once conditions are met, 2% of the wagered amount is moved to the main account. Customers can find their welcome bonus balance on the dedicated Welcome Bonus page. Note that bets placed at branches do not qualify for this online bonus. Only bets placed online using a registered account are eligible for this promotion. If you deposit ₦500, you get ₦1,500 bonus. If you deposit ₦10,000, you get ₦30,000 bonus. The 2% move happens every time you place a qualifying bet until the bonus is exhausted or expires.", 
      displayOrder: 1 
    });
    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Cashback Bonus", 
      content: "Cashback Bonus returns a multiple of the stake if exactly one selection loses on a multi-bet ticket. Eligibility includes both Prematch and Inplay bets. The payout depends on the remaining total odds (after removing the lost event and any voided events). The scale is as follows: 75.00 - 149.99 yields 1x Stake, 150.00 - 299.99 yields 2x Stake, and 300+ yields 3x Stake back to your account. If multiple events are voided/cut, the cashback may be suspended or recalculated based on the remaining active odds. This bonus ensures that even if one game lets you down, you don't lose your entire stake. For example, if you staked ₦1,000 and your remaining odds are 200, you get ₦2,000 back.", 
      displayOrder: 2 
    });
    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Multiple Booster", 
      content: "The Multiple Booster Bonus is available to both registered and anonymous customers for Prematch and Inplay bets. It requires a minimum of 5 events, each with odds of at least 1.25. The bonus ranges from a 5% increase (for 5 events) up to a maximum of 250% (for 50+ events). It is not applicable if the bet includes virtual sports or if the customer cashes out the ticket. The more events you add to your ticket that meet the 1.25 odds criteria, the higher the percentage of bonus winnings you will receive upon a successful bet. 5-9 events = 5% to 25%, 10-14 events = 30% to 50%, 40+ events = 200%+, up to 250% for 50 events.", 
      displayOrder: 3 
    });

    const terminal = await storage.createSection({ title: "TERMINAL KNOWLEDGE", slug: "terminal", displayOrder: 2 });
    await storage.createSubsection({ 
      sectionId: terminal.id, 
      title: "Operations & VIP Points", 
      content: "Operators are responsible for branch transactions. VIP points are earned by playing slots at the branch with a VIP card and all games online. Minimum points vary: 1 point for Aviator, 20 points for Virtual/Prematch online. Points can be converted to cash at the VIP Point Money Back Shop (e.g., 110,000 points = ₦1,000). If a deposit is credited to the wrong account, the transaction must be cancelled immediately. Stake refers to the sum of money paid at the moment of placing a bet. Payout is the real money winnings if all selections are successful. Branch staff must ensure all customers are treated fairly and transactions are recorded accurately.", 
      displayOrder: 1 
    });

    const ethics = await storage.createSection({ title: "WORK ETHICS", slug: "ethics", displayOrder: 3 });
    await storage.createSubsection({ 
      sectionId: ethics.id, 
      title: "Rules & Compliance", 
      content: "General rules and behavior at the branch are strictly enforced. Minors (under 18) and intoxicated persons are not permitted to place bets. Service Workers are authorized staff who ensure compliance with all company regulations. Faulty slot machines must be reported via WhatsApp with photos and descriptions to the technical support team. Integrity and professionalism are expected from all staff members at all times. Staff should not gamble while on duty and must maintain a clean and welcoming environment for all customers.", 
      displayOrder: 1 
    });

    const issues = await storage.createSection({ title: "COMMON ISSUES", slug: "issues", displayOrder: 4 });
    await storage.createSubsection({ 
      sectionId: issues.id, 
      title: "Troubleshooting & Support", 
      content: "For network failures, check router cables first before reporting. If a virtual ticket doesn't print but the event started, wait for the result before reporting for a secure code. If a customer forgets their username or phone number, make a report to the appropriate department. For authorization code issues, ask the customer to confirm their registered number is active and in their phone. If a terminal freezes, restart the application or the device. Always keep the customer informed about the progress of any technical resolution.", 
      displayOrder: 1 
    });

    const cashout = await storage.createSection({ title: "CASHOUT FEATURE", slug: "cashout", displayOrder: 5 });
    await storage.createSubsection({ 
      sectionId: cashout.id, 
      title: "What is Cashout?", 
      content: "Cashout allows you to settle your bet early, before all events on your ticket are finished. You can cash out only when all matches on your ticket have official live results and current odds are available for every selection you picked. Cashout is available only for online tickets and allows for greater control over your betting experience by locking in profit or reducing losses. It is the perfect tool for managing risk and securing winnings before an unpredictable event occurs.", 
      displayOrder: 1 
    });
    await storage.createSubsection({ 
      sectionId: cashout.id, 
      title: "Important VIP Points Rule", 
      content: "If you received VIP points for placing the bet, you must still have the same number of VIP points in your account when cashing out. This prevents earning VIP points without risk by cashing out early. VIP points will be deducted when you cash out. Example: If you received 1,000 VIP points for a bet, you must have at least 1,000 points available to cash out later. If your points balance is lower than what was awarded for the ticket, cashout will be disabled. This rule is absolute and applies to all cashed-out tickets.", 
      displayOrder: 2 
    });
    await storage.createSubsection({ 
      sectionId: cashout.id, 
      title: "Fair Cashout System & Suspension", 
      content: "Our transparent cashout shows exactly how your amount is calculated: (Potential Winnings ÷ Total Current Odds) - 1% Fee. Cashout will be temporarily unavailable if any event on the ticket is settled as void, current odds for any event exceed 10.00, or all odds remain unchanged from the original bet. This system ensures fairness for both the customer and the company. Always check the current live odds to verify your cashout offer.", 
      displayOrder: 3 
    });

    const money = await storage.createSection({ title: "DEPOSITS & WITHDRAWALS", slug: "money", displayOrder: 6 });
    await storage.createSubsection({ 
      sectionId: money.id, 
      title: "How to Deposit", 
      content: "1. Deposit at a Branch: Tell operator 'Client In', provide username and cash. Min ₦200. Instant credit to your account. 2. Credit/Debit Card: Top up via secure payment form online. Min ₦200, Max ₦1M/day. Secure and instant. 3. Instant Bank Transfer: Transfer exact amount to temporary account. Min ₦200, Max ₦1M/day. The name on the first transfer becomes official account name. 4. OPay Wallet: Available after first bank transfer or card deposit. Min ₦100. Always ensure you are using the official Fortebet payment channels to avoid any delays or issues.", 
      displayOrder: 1 
    });
    await storage.createSubsection({ 
      sectionId: money.id, 
      title: "How to Withdraw", 
      content: "1. Withdrawal via Bank Transfer: Must have first deposited via Bank Transfer or Card. Min ₦200, Max ₦10M per 24 hours. Withdrawals only to registered name. 2. Withdrawal at a Branch: Provide username and 4-digit code from SMS. Min ₦200 per transaction, Max ₦10,000,000. Branch staff will verify the code before releasing funds. Ensure your phone number is correct to receive the necessary authorization codes for branch withdrawals.", 
      displayOrder: 2 
    });
  }

  const existingQuestions = await storage.getQuestionsByLevel(LEVELS[0]);
  if (existingQuestions.length === 0) {
    const allQuestions = [
      // Level 1: Beginner
      { question: "How is the Welcome Bonus initially calculated?", options: ["200% of the first deposit", "150% of the total deposits", "300% of the first deposit", "A fixed amount of 500,000"], correctAnswer: "300% of the first deposit", level: "Beginner" },
      { question: "What types of bets are eligible for the Welcome Bonus?", options: ["Only Prematch bets", "Only Inplay bets", "Both Prematch and Inplay bets", "Only Virtual sports bets"], correctAnswer: "Both Prematch and Inplay bets", level: "Beginner" },
      { question: "What is the maximum Welcome Bonus amount a customer can receive?", options: ["500,000", "750,000", "1,000,000", "2,000,000"], correctAnswer: "1,000,000", level: "Beginner" },
      { question: "How long does a customer have to use their Welcome Bonus before it expires?", options: ["After 30 days of registration", "After 60 days of first deposit", "After 90 days of first deposit", "It never expires"], correctAnswer: "After 90 days of first deposit", level: "Beginner" },
      { question: "To qualify for the Welcome Bonus credit, what must a customer's bet include?", options: ["A single event with odds of 10.00", "At least 3 events with a total odds of 3.00 or more", "At least 5 events with minimum odds of 1.25 each", "Any losing bet"], correctAnswer: "At least 3 events with a total odds of 3.00 or more", level: "Beginner" },
      { question: "Where can a customer check their Welcome Bonus balance?", options: ["On their main account statement", "On the VIP Points page", "On the Welcome Bonus page", "At the branch terminal"], correctAnswer: "On the Welcome Bonus page", level: "Beginner" },
      { question: "Can a customer earn the Welcome Bonus on bets placed at a branch?", options: ["Yes", "No", "Only on weekends", "Only for VIPs"], correctAnswer: "No", level: "Beginner" },
      { question: "What is the Fortebet Welcome Bonus?", options: ["A cash gift for all customers who lose their first bet.", "A 300% bonus on the first deposit for new registered customers.", "A fixed ₦500 bonus for online registration.", "A bonus earned only by playing slot games."], correctAnswer: "A 300% bonus on the first deposit for new registered customers.", level: "Beginner" },
      { question: "What is the maximum Welcome Bonus amount?", options: ["₦500,000", "₦750,000", "₦1,000,000", "Unlimited"], correctAnswer: "₦1,000,000", level: "Beginner" },
      { question: "What is Fortebet's toll-free customer line?", options: ["0800009009009", "0700FORTEBET", "09030000000", "0800FORTEBET"], correctAnswer: "0800009009009", level: "Beginner" },
      { question: "What is the minimum stake for Prematch at the branch?", options: ["₦100", "₦200", "₦500", "₦1,000"], correctAnswer: "₦200", level: "Beginner" },

      // Level 2: Trainee
      { question: "Once Welcome Bonus conditions are met, what percentage of the wagered amount is moved to the main account?", options: ["1%", "2%", "5%", "10%"], correctAnswer: "2%", level: "Trainee" },
      { question: "A customer deposits ₦2000 and loses it all on Slots and Virtual games. What is their Welcome Bonus balance?", options: ["₦6000", "₦2000", "₦0", "₦1000"], correctAnswer: "₦0", level: "Trainee" },
      { question: "If a qualifying bet is voided, what happens to the 2% already credited from the Welcome Bonus?", options: ["It is doubled.", "It remains in the account.", "It is deducted back.", "It is converted to VIP points."], correctAnswer: "It is deducted back.", level: "Trainee" },
      { question: "Can a customer earn the Welcome Bonus on a losing online bet?", options: ["No, only winning bets qualify.", "Yes, if the bet meets the event and odds conditions.", "Only if they are a VIP.", "Only on their first bet."], correctAnswer: "Yes, if the bet meets the event and odds conditions.", level: "Trainee" },
      { question: "When does the Welcome Bonus expiry period start?", options: ["On the day of registration", "On the day of the first deposit", "On the day the first bet is placed", "After the first withdrawal"], correctAnswer: "On the day of the first deposit", level: "Trainee" },
      { question: "When is the 2% from the Welcome Bonus credited to the customer's main account?", options: ["Immediately after deposit", "After placing any bet", "After placing a qualifying bet (min. 3 events, odds 3.00+)", "After 7 days"], correctAnswer: "After placing a qualifying bet (min. 3 events, odds 3.00+)", level: "Trainee" },
      { question: "To withdraw from the Welcome Bonus, what must a bet have?", options: ["1 event with odds of 10.00", "2 events with total odds of 2.00", "3 events with total odds of 3.00", "5 events with minimum odds of 1.25 each"], correctAnswer: "3 events with total odds of 3.00", level: "Trainee" },
      { question: "How much is moved from the Welcome Bonus account per qualifying bet?", options: ["1% of the stake", "2% of the stake", "5% of the stake", "10% of the winnings"], correctAnswer: "2% of the stake", level: "Trainee" },
      { question: "When does the Welcome Bonus expire?", options: ["30 days after registration", "60 days after first bet", "90 days after first deposit", "It does not expire"], correctAnswer: "90 days after first deposit", level: "Trainee" },
      { question: "What is the Cashback Bonus designed for?", options: ["Refunding lost bets on virtual games.", "Giving a bonus on winning accumulator tickets.", "Returning a multiple of the stake if one selection loses on a ticket.", "A monthly reward for VIP customers."], correctAnswer: "Returning a multiple of the stake if one selection loses on a ticket.", level: "Trainee" },
      { question: "Which of these is a way a customer CANNOT deposit money?", options: ["At the branch", "Via instant bank transfer", "Using credit/debit card", "Through Western Union"], correctAnswer: "Through Western Union", level: "Trainee" },

      // Level 3: Easy
      { question: "For Cashback Bonus, what does an odds range of 75.00 - 149.99 yield?", options: ["0.5 x Customer Stake", "1 x Customer Stake", "2 x Customer Stake", "3 x Customer Stake"], correctAnswer: "1 x Customer Stake", level: "Easy" },
      { question: "For Cashback Bonus, what does an odds range of 150.00 - 299.99 yield?", options: ["1 x Customer Stake", "2 x Customer Stake", "3 x Customer Stake", "5 x Customer Stake"], correctAnswer: "2 x Customer Stake", level: "Easy" },
      { question: "What bets are eligible for the Cashback Bonus?", options: ["Only Aviator games", "Only Prematch bets", "Only Slot games", "Both Prematch and Inplay bets"], correctAnswer: "Both Prematch and Inplay bets", level: "Easy" },
      { question: "For Cashback Bonus, what does an odds of 300+ yield?", options: ["1 x Customer Stake", "2 x Customer Stake", "3 x Customer Stake", "5 x Customer Stake"], correctAnswer: "3 x Customer Stake", level: "Easy" },
      { question: "After a cut-one (one voided event), a customer's remaining total odds are 255. How many times their stake will be returned as Cashback?", options: ["0 times", "1 time", "2 times", "3 times"], correctAnswer: "2 times", level: "Easy" },
      { question: "Which bonus is available to both registered and anonymous customers?", options: ["Welcome Bonus", "Cashback Bonus", "Multiple Booster Bonus", "Online Bonus"], correctAnswer: "Multiple Booster Bonus", level: "Easy" },
      { question: "For Cashback, if one selection loses and the remaining total odds are 120, what does the customer get?", options: ["0.5 x Stake", "1 x Stake", "2 x Stake", "3 x Stake"], correctAnswer: "1 x Stake", level: "Easy" },
      { question: "For Cashback, what does 'removing odds of the lost event' mean?", options: ["Subtracting the odds from the total.", "Setting the odds to 1.00.", "Dividing the total odds by the lost event's odds.", "Ignoring the lost event completely."], correctAnswer: "Dividing the total odds by the lost event's odds.", level: "Easy" },
      { question: "Who is eligible for the Multiple Booster Bonus?", options: ["Only registered customers online", "Only customers at the branch", "Both registered and unregistered customers", "Only VIP members"], correctAnswer: "Both registered and unregistered customers", level: "Easy" },
      { question: "What is the minimum requirement to trigger the Multiple Booster?", options: ["2 events, each at 2.00 odds", "3 events, total odds 3.00", "5 events, each at 1.25 odds", "10 events, each at 1.10 odds"], correctAnswer: "5 events, each at 1.25 odds", level: "Easy" },
      { question: "What is the minimum stake for Slot games online?", options: ["₦20", "₦50", "₦100", "₦200"], correctAnswer: "₦20", level: "Easy" },

      // Level 4: Medium
      { question: "What is the range for the Multiple Booster percentage increase?", options: ["1% min, 100% max", "5% min, 250% max", "10% min, 500% max", "2% min, 200% max"], correctAnswer: "5% min, 250% max", level: "Medium" },
      { question: "What is the minimum and maximum number of events for a Multiple Booster bet?", options: ["Min 3, Max 25", "Min 5, Max 50", "Min 1, Max 20", "Min 10, Max 100"], correctAnswer: "Min 5, Max 50", level: "Medium" },
      { question: "After a cut-two (two voided events), a customer's remaining total odds are 300+. What is their Cashback?", options: ["1 x Stake", "2 x Stake", "3 x Stake", "0 x Stake (No Cashback for 300+ after cuts)"], correctAnswer: "0 x Stake (No Cashback for 300+ after cuts)", level: "Medium" },
      { question: "A customer selects 33 events, all meeting Multiple Booster conditions. What is their bonus percentage?", options: ["50%", "100%", "125%", "200%"], correctAnswer: "125%", level: "Medium" },
      { question: "What bets are eligible for the Multiple Booster Bonus?", options: ["Only Slot games", "Only Aviator", "Both Prematch and Inplay bets", "Only Virtual games"], correctAnswer: "Both Prematch and Inplay bets", level: "Medium" },
      { question: "A bet with 5 selections, each at odds of 1.25+, qualifies for what?", options: ["5% Multiple Booster Bonus", "2% Welcome Bonus", "1x Stake Cashback", "20 VIP Points"], correctAnswer: "5% Multiple Booster Bonus", level: "Medium" },
      { question: "What is the maximum Multiple Booster percentage for 50+ events?", options: ["100%", "150%", "200%", "250%"], correctAnswer: "250%", level: "Medium" },
      { question: "How are VIP points primarily earned?", options: ["Only by depositing money.", "By playing slots at the branch with a VIP card and all games online.", "Only by referring new customers.", "By cashing out bets."], correctAnswer: "By playing slots at the branch with a VIP card and all games online.", level: "Medium" },
      { question: "What do new customers get for confirming their email?", options: ["₦200 cash bonus", "20,000 VIP points", "A free bet ticket", "10% deposit bonus"], correctAnswer: "20,000 VIP points", level: "Medium" },
      { question: "How much cash can 110,000 VIP points be converted to?", options: ["₦200", "₦500", "₦1,000", "₦10,000"], correctAnswer: "₦1,000", level: "Medium" },
      { question: "What is the maximum win for Aviator?", options: ["₦10 Million", "₦20 Million", "₦50 Million", "Undefined"], correctAnswer: "₦20 Million", level: "Medium" },

      // Level 5: Intermediate
      { question: "Can a customer get the Multiple Booster Bonus if they cash out their bet?", options: ["Yes", "No", "Only if winning", "Only if partially cashed out"], correctAnswer: "No", level: "Intermediate" },
      { question: "A customer places a prematch ticket with 150 events, each at 1.25 odds. What is their Multiple Booster percentage?", options: ["150%", "200%", "250% (the maximum)", "300%"], correctAnswer: "250% (the maximum)", level: "Intermediate" },
      { question: "Do customers earn VIP points for playing Aviator?", options: ["Yes", "No", "Only on weekends", "Only if they lose"], correctAnswer: "Yes", level: "Intermediate" },
      { question: "Do customers earn VIP points for playing Slots online?", options: ["Yes", "No", "Only on weekends", "Only if they lose"], correctAnswer: "Yes", level: "Intermediate" },
      { question: "How many VIP points are earned for Slot games played at a branch?", options: ["10 points", "5 points", "1 point", "0 points"], correctAnswer: "0 points", level: "Intermediate" },
      { question: "What is the minimum VIP points earned for a Virtual or Prematch online bet?", options: ["1 point", "5 points", "10 points", "20 points"], correctAnswer: "20 points", level: "Intermediate" },
      { question: "What is the minimum VIP points earned on an online Prematch ticket?", options: ["1 point", "5 points", "10 points", "20 points"], correctAnswer: "20 points", level: "Intermediate" },
      { question: "What is the Online Virtual Bonus?", options: ["A 1% bonus per event (max 3%) added to possible winnings.", "A cashback on losing virtual bets.", "Double VIP points on virtual games.", "A free spin on virtual slots."], correctAnswer: "A 1% bonus per event (max 3%) added to possible winnings.", level: "Intermediate" },
      { question: "Which customers can use the Cashout feature?", options: ["All customers at the branch.", "Registered customers for online Prematch/Inplay bets.", "Anonymous customers.", "Only customers playing Aviator."], correctAnswer: "Registered customers for online Prematch/Inplay bets.", level: "Intermediate" },
      { question: "What happens to VIP points when a bet is cashed out?", options: ["They are doubled.", "They are lost (reversed).", "They are converted to cash.", "Nothing, they remain."], correctAnswer: "They are lost (reversed).", level: "Intermediate" },
      { question: "If a customer selects 'X/X' and the match ends 2-0, what is the outcome?", options: ["Ticket is won.", "Ticket is void.", "Ticket is lost.", "Odds are recalculated."], correctAnswer: "Ticket is lost.", level: "Intermediate" },

      // Level 6: Hard
      { question: "What is the minimum VIP points earned for an Aviator game?", options: ["0 points", "1 point", "5 points", "10 points"], correctAnswer: "1 point", level: "Hard" },
      { question: "How many VIP points are earned for a bet with 1-2 prematch selections?", options: ["10 points", "20 points", "50 points", "100 points"], correctAnswer: "20 points", level: "Hard" },
      { question: "How many VIP points are earned for a bet with 8-11 selections?", options: ["50 points", "80 points", "120 points", "200 points"], correctAnswer: "120 points", level: "Hard" },
      { question: "How many VIP points are earned for a bet with 23+ selections?", options: ["200 points", "350 points", "500 points", "750 points"], correctAnswer: "500 points", level: "Hard" },
      { question: "How much cash can 110,000 VIP points be converted to?", options: ["₦500", "₦1,000", "₦2,000", "₦5,000"], correctAnswer: "₦1,000", level: "Hard" },
      { question: "Where does a customer go to convert VIP points to cash?", options: ["The Transfer Menu", "The VIP Point Money Back Shop", "The Branch Terminal", "The Welcome Bonus page"], correctAnswer: "The VIP Point Money Back Shop", level: "Hard" },
      { question: "What is a primary step if a customer cannot receive an authorization code?", options: ["Tell them to create a new account.", "Ask them to confirm the registered number is in their phone.", "Immediately make a report to HQ.", "Advise them to visit the bank."], correctAnswer: "Ask them to confirm the registered number is in their phone.", level: "Hard" },
      { question: "What should an operator do first during a network failure?", options: ["Immediately report to the WhatsApp group.", "Check if the router cables are properly connected.", "Restart all the laptops (NTBs).", "Call the internet service provider."], correctAnswer: "Check if the router cables are properly connected.", level: "Hard" },
      { question: "If a virtual ticket doesn't print and the event HAS STARTED, what should you do?", options: ["Cancel the ticket immediately.", "Place the same bet again.", "Wait for the event to end; if it wins, report it for a secure code.", "Refund the customer from the cash drawer."], correctAnswer: "Wait for the event to end; if it wins, report it for a secure code.", level: "Hard" },
      { question: "Who is NOT permitted to place bets at a Fortebet branch?", options: ["Elderly people", "Minors (under 18) and intoxicated persons", "People without a VIP card", "New customers"], correctAnswer: "Minors (under 18) and intoxicated persons", level: "Hard" },
      { question: "If a customer stakes ₦1,000 on an event with 9.50 odds. What is the expected win?", options: ["₦9,500", "₦10,500", "₦8,500", "₦1,095"], correctAnswer: "₦9,500", level: "Hard" },

      // Level 7: Boss
      { question: "What should you do if you credit a customer's deposit to the wrong account?", options: ["Ignore it, it will auto-correct.", "Cancel the credit transaction.", "Ask the customer to make a new deposit.", "Transfer it manually via F4."], correctAnswer: "Cancel the credit transaction.", level: "Boss" },
      { question: "How do you send money from your terminal to another branch terminal?", options: ["Using the Cancel Credit function", "Using the Transfer function on F4", "By creating a 'To Collect' ticket", "You cannot send money between terminals"], correctAnswer: "Using the Transfer function on F4", level: "Boss" },
      { question: "What is the minimum and maximum stake for a Prematch online bet?", options: ["Min 100, Max 500,000", "Min 200, Max 1,000,000", "Min 500, Max 5,000,000", "Min 1000, Max 10,000,000"], correctAnswer: "Min 200, Max 1,000,000", level: "Boss" },
      { question: "How many chances does a player have per round in Aviator?", options: ["One", "Two", "Three", "Unlimited"], correctAnswer: "Two", level: "Boss" },
      { question: "Can Aviator be played for fun ('demo mode') at a branch?", options: ["Yes", "No", "Only if no customers", "Only on weekends"], correctAnswer: "No", level: "Boss" },
      { question: "What is the 'Online Bonus'?", options: ["A bonus for branch customers", "A bonus given to anonymous customers", "A bonus for registered customers who play Virtual games online", "A sign-up bonus for new branches"], correctAnswer: "A bonus for registered customers who play Virtual games online", level: "Boss" },
      { question: "What is a 'Service Worker'?", options: ["A customer who places bets.", "An authorized branch staff who places bets and ensures compliance.", "A technician who fixes slot machines.", "A Head Office supervisor."], correctAnswer: "An authorized branch staff who ensures compliance.", level: "Boss" },
      { question: "If three events with 3.00 odds each are selected, and two are voided, what is the new total odds?", options: ["1.00", "3.00", "9.00", "27.00"], correctAnswer: "3.00", level: "Boss" },
      { question: "What does the betting option '1/X' (Half Time/Full Time) mean?", options: ["Home team wins first half, Home team wins match.", "Home team wins first half, match ends in a draw.", "Draw at half time, Home team wins match.", "Away team wins first half, match ends in a draw."], correctAnswer: "Home team wins first half, match ends in a draw.", level: "Boss" },
      { question: "What is the correct resolution setting for branch NTB laptops?", options: ["1024x768", "1280x720", "1600x900", "1920x1080"], correctAnswer: "1280x720", level: "Boss" },
      { question: "What are the two main types of tickets at Fortebet branches?", options: ["Prematch Ticket and Virtual Ticket", "Online Ticket and SMS Ticket", "Cash Ticket and Credit Ticket", "Winning Ticket and Losing Ticket"], correctAnswer: "Prematch Ticket and Virtual Ticket", level: "Boss" },

      // Level 8: Legend
      { question: "For a three-event selection bet, what is the Online Bonus percentage?", options: ["1%", "2%", "3%", "5%"], correctAnswer: "3%", level: "Legend" },
      { question: "How is the Multiple Booster percentage calculated?", options: ["From the total stake amount", "From the total odds of the ticket", "From the total number of events that meet the requirements", "From the net profit of the bet"], correctAnswer: "From the total number of events that meet the requirements", level: "Legend" },
      { question: "Who is responsible for preparing the 'To Collect' at the branch?", options: ["The Customer", "The Cashier (CM)", "The Security Guard", "The Head Office"], correctAnswer: "The Cashier (CM)", level: "Legend" },
      { question: "On which days is 'To Collect' typically processed?", options: ["Tuesdays and Thursdays", "Mondays and Fridays", "Wednesdays and Saturdays", "Every day"], correctAnswer: "Mondays and Fridays", level: "Legend" },
      { question: "When should 'To Collect' details be sent to Head Office?", options: ["12:00 PM to 1:00 PM", "8:00 AM to 9:00 AM", "6:00 AM to 7:00 AM", "Anytime before close of business"], correctAnswer: "6:00 AM to 7:00 AM", level: "Legend" },
      { question: "How many paylines does the 'Mad Mechanic' slot game have?", options: ["3 paylines", "5 paylines", "10 paylines", "25 paylines"], correctAnswer: "5 paylines", level: "Legend" },
      { question: "How should a faulty slot machine be reported?", options: ["Verbally tell the supervisor.", "Take a picture of the error and report via WhatsApp with branch name, slot ID, and description.", "Put an 'Out of Order' sign on it.", "Send an email at the end of the day."], correctAnswer: "Take a picture of the error and report via WhatsApp with branch name, slot ID, and description.", level: "Legend" },
      { question: "What two pieces of information can a customer change on their Fortebet account?", options: ["Username and Phone Number", "Password and Email", "Date of Birth and Address", "Bank Details and Password"], correctAnswer: "Password and Email", level: "Legend" },
      { question: "What does the term 'Stake' mean?", options: ["The total amount a customer wins.", "The odds of a selected event.", "The sum of money paid at the moment of placing a bet.", "The company's profit margin."], correctAnswer: "The sum of money paid at the moment of placing a bet.", level: "Legend" },
      { question: "What does 'Payout' mean?", options: ["The amount the customer stakes.", "The real money winnings if all selections are successful.", "The bonus percentage added.", "The fee for placing a bet."], correctAnswer: "The real money winnings if all selections are successful.", level: "Legend" },
      { question: "What is the key condition for VIP points when cashing out a bet?", options: ["You must have zero VIP points.", "You must have at least the number of VIP points awarded for that ticket available.", "VIP points are irrelevant to cashout.", "Your VIP points balance will be doubled."], correctAnswer: "You must have at least the number of VIP points awarded for that ticket available.", level: "Legend" },

      // Level 9: World Class
      { question: "What is a 'payline' in a slot game?", options: ["The line to pay the cashier", "The ways winnings are decided and calculated", "The bonus round activation line", "The bet multiplier"], correctAnswer: "The ways winnings are decided and calculated", level: "World Class" },
      { question: "How do progressive jackpots on slots increase?", options: ["Randomly by the system", "Only on weekends", "As customers play (spin) the game", "They are fixed amounts"], correctAnswer: "As customers play (spin) the game", level: "World Class" },
      { question: "Which of these is an online slot game NOT found on branch terminals?", options: ["Book of Ra", "Midnight Fruit 27", "Lucky Ladys Charm", "Dolphins Pearl"], correctAnswer: "Midnight Fruit 27", level: "World Class" },
      { question: "What does the betting option '1/2' (Home First Half / Away Full Time) mean?", options: ["Bet on Home team to win the 1st half AND the Away team to win the match.", "Bet on a draw at both half-time and full-time.", "A combined bet on the first half and second half results.", "Bet on Away team to win the match regardless of first half."], correctAnswer: "Bet on Home team to win the 1st half AND the Away team to win the match.", level: "World Class" },
      { question: "What is a 'Service Worker'?", options: ["A Head Office staff member", "An authorized branch staff member who can place bets and ensure compliance", "A customer who cleans the branch", "A bank official"], correctAnswer: "An authorized branch staff member who ensure compliance", level: "World Class" },
      { question: "How should a cashier handle a customer who is consistently rude or abusive?", options: ["Argue back and defend themselves.", "Ignore the customer and continue working.", "Politely ask the customer to leave and report the incident to their supervisor.", "Ask for proper approval."], correctAnswer: "Politely ask the customer to leave and report the incident to their supervisor.", level: "World Class" },
      { question: "What is the primary goal of the Fortebet customer service team?", options: ["To make as much money as possible.", "To provide a fun and fair betting experience for all customers.", "To ensure all customers win their bets.", "To manage the company's social media accounts."], correctAnswer: "To provide a fun and fair betting experience for all customers.", level: "World Class" },
      { question: "Which of these is a prohibited item inside a Fortebet branch?", options: ["A mobile phone", "A betting slip", "A weapon or illegal substance", "A VIP card"], correctAnswer: "A weapon or illegal substance", level: "World Class" },
      { question: "If a customer believes their ticket was settled incorrectly, what is the first step?", options: ["Tell them they are wrong and to leave.", "Ask them to provide their ticket ID and contact customer support for verification.", "Ask for proper approval.", "Refund their stake immediately."], correctAnswer: "Ask them to provide their ticket ID and contact customer support for verification.", level: "World Class" },
      { question: "What does the 'Odds' represent in sports betting?", options: ["The total amount of money wagered on an event.", "The probability of an outcome occurring, determined by the bookmaker.", "The amount of time left in a match.", "The number of players on a team."], correctAnswer: "The probability of an outcome occurring, determined by the bookmaker.", level: "World Class" },
      { question: "What is 'Inplay' betting?", options: ["Placing bets before a match starts.", "Placing bets while a match is currently in progress.", "Betting on virtual sports only.", "Betting on historical matches."], correctAnswer: "Placing bets while a match is currently in progress.", level: "World Class" },
    ];

    for (const q of allQuestions) {
      await storage.createQuestion(q);
    }
  }
}

export function registerRoutes(app: Express): Server {
  seedDatabase().catch(console.error);

  app.get("/api/sections", async (_req, res) => {
    const sections = await storage.getSections();
    res.json(sections);
  });

  app.get("/api/sections/:slug", async (req, res) => {
    const section = await storage.getSectionBySlug(req.params.slug);
    if (!section) return res.status(404).send("Section not found");
    const subsections = await storage.getSubsections(section.id);
    res.json({ ...section, subsections });
  });

  app.get("/api/questions/:level", async (req, res) => {
    const questions = await storage.getQuestionsByLevel(req.params.level);
    res.json(questions);
  });

  app.post("/api/scores", async (req, res) => {
    const score = await storage.createScore(req.body);
    res.json(score);
  });

  app.get("/api/leaderboard", async (_req, res) => {
    const scores = await storage.getTopScores(10);
    res.json(scores);
  });

  const httpServer = createServer(app);
  return httpServer;
}
