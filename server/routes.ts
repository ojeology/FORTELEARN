import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

const LEVELS = [
  "Beginner", "Trainee", "Easy", "Medium", "Intermediate", "Hard", "Boss", "Legend", "World Class"
];

async function seedDatabase() {
  const existingSections = await storage.getSections();
  if (existingSections.length === 0) {
    // SECTION: BONUSES
    const bonuses = await storage.createSection({ title: "BONUSES", slug: "bonuses", displayOrder: 1 });
    
    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Welcome Bonus", 
      content: "Welcome bonus is a bonus given to newly registered customers of fortebet.\n\nIt is 3x their total deposit or 300 percent of their account balance at the moment of placing their first eligible bet. A customer first eligible bet is either a prematch game or I play(live) game...\n\nOnce this is met the customers are given 3x of their deposits which is stored inside their fortebet welcome bonus account which is not redeemable yet.\n\nFor a customer to redeem this bonus, the customers needs to play a prematch or I play game with a minimum of three selections and total odds of 3.00 or more.\n\nWhenever a customer does this (2) percent of the customers stake is deducted from the customer welcome bonus balance and credited to the customer main account balance which the customer can withdraw, or used to place bets...\n\nNOTE the maximum a customer can get on his welcome bonus account is 1million naira. meaning no matter the amount the customer deposit he will not be getting more than 1million naira.\n\nLastly welcome bonus lasts for 90days starting from the day the customer made his first deposit...", 
      displayOrder: 1 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Multiple Booster Bonus", 
      content: "This is a bonus given to all customers of fortebet (registered online and regular customers who play at the branch) who plays prematch and Inplay games, it increases their chances of winning big.\n\nTo get multiple booster bonus a customer must select a minimum of five events and each event must have odds of 1.25 or more.\n\nOnce this requirements is met the customers get a (5) percent multiple booster bonus..and for a maximum of events (the maximum number of events on a single ticket is 150) but once you have 50 events on your ticket with odds of 1.25 you will get the maximum multiple booster bonus which is 250 percent and that's the maximum.\n\nNOTE even if all your 150 events have odds of 1.25 or more you will still be getting 250 percent multiple booster bonus.\n\nHERE IS THE CHART OF THE MULTIPLE BOOSTER BONUS:\n\n• 5 EVENTS – 5 PERCENT BOOSTER BONUS\n• 6 EVENTS\n• 8 EVENTS\n• 9 EVENTS\n• 10 EVENTS\n• 12 EVENTS\n• 14 EVENTS\n• 16 EVENTS\n• 18 EVENTS\n• 20 EVENTS\n• 25 EVENTS\n• 30 EVENTS\n• 35 EVENTS\n• 40 EVENTS\n• 45 EVENTS\n• 50 EVENTS", 
      displayOrder: 2 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Cashback Bonus", 
      content: "This is a bonus given to only registered customers of fortebet (customer who have an account and plays prematch and Inplay online).\n\nThis bonus allows customers to reclaim up to 3x of their stake after final evaluation of their bets with only one selection lost.\n\nFor a customer to be eligible for cash back bonus, the customer must select a minimum of two events or more, exactly One event must be lost and the odds of the remaining events must fall into the range below:\n\n• 0 - 74.99 – no cash back\n• 75 - 149.99 – 1x stake back\n• 150-299.99 – 2x stake back\n• 300+ – 3x stake back (highest cashback)", 
      displayOrder: 3 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Online Virtual Bonus", 
      content: "This is a bonus given to only registered customers of fortebet (customer that have accounts with fortebet and plays virtual online). It increases their chances of winning big as it adds to their total payout.\n\nFor one event selected and staked on customer get one percent online virtual bonus.\n\nFor two events selected customers get two percent online virtual bonus.\n\nFor three events selected customers get three percent online virtual bonus which is the maximum.\n\nNOTE, the maximum number of virtual events you can select once is three events and each event starts five minutes after the each one.\n\n288 virtual matches per 24 hours.", 
      displayOrder: 4 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "VIP Points", 
      content: "These are bonus points given to only registered customers of fortebet (customers with an account with fortebet and plays online) who plays all games online (Prematch, Inplay, aviator, slots).\n\nCustomers who plays slot at the branch with their VIP cards, and customers who register an account and verify their email address also get VIP points. An instant 20,000 VIP points is given to customers who verify their email address.\n\nVIP points conversion:\n\n• 25,000 points = 200 naira\n• 110,000 points = 1,000 naira\n• 1,000,000 points = 10,000 naira\n\nVIP points can be converted to cash that can be used to play bets or withdrawn.", 
      displayOrder: 5 
    });

    // SECTION: POS / TERMINAL KNOWLEDGE
    const pos = await storage.createSection({ title: "POS / TERMINAL KNOWLEDGE", slug: "pos-terminal-knowledge", displayOrder: 2 });
    
    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F1 🔘", 
      content: "Client cash in: This is used to deposit money into clients (Fortebet customer with an account) Fortebet account.\n\nClient cash out: This is used to withdraw from clients Fortebet account after the customer has initiated a withdrawal and brought the four digits authorization code to the counter for withdrawal.\n\nSlot in: This is used to deposit into the black or VIP slot cards. The black cards are regular cards any customer (registered or unregistered) can use at the branch. The VIP card is unique, assigned to a particular customer, given to registered customers only, and more secure 🔐 (fund cannot be withdrawn without authorization code).\n\nLoad (I) ticket: Used to load the booking number of already booked prematch games. Customer is given a code number (expires in 1 hour) which the operator inserts using \"I\" to display the selection.\n\nLoad (T) ticket: Used to rebet already placed prematch games. Operator presses \"T\" and scans the former ticket or inserts code manually.\n\nLast (L) ticket: Displays the last prematch game played on the terminal/POS.\n\nF12 finish transactions: Clears all transactions on the homepage.\n\nEdit: View customer info and assign VIP cards.\n\nLetter N: Enter customer username to make deposit, withdrawal, or check info.\n\nLetter K: Enter slot card numbers.\n\nNOTE: You can never know a customer account balance from the POS/terminal, only VIP points balance and slot account balance.", 
      displayOrder: 1 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F2 🔘 (PAYOUT / CANCEL TICKETS)", 
      content: "Used to pay out winning tickets and cancel both prematch and virtual tickets. Operator can scan barcode or enter code manually. After confirming, a popup shows successful payout/cancel.\n\nPrematch ticket: Can only be cancelled within 10 minutes of placing the bet; once an event starts it can no longer be cancelled.\n\nVirtual ticket: Can be cancelled anytime as long as none of the events have started.\n\nMethods to cancel:\n• Prematch: Scan and cancel, or enter code manually.\n• Virtual: Scan and cancel, enter code manually, or cancel last.\n\nPaid out and cancelled tickets must be trashed and not returned to customers.", 
      displayOrder: 2 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F4 🔘", 
      content: "To collect: Shows total balance in shop and used for collection reports.\n\nCash in POS: Receive money from head office or company sources.\n\nCash out POS: Send reports and money to head office.\n\nTransfer: Send money between POS at branch.\n\nDay report: Shows highlighted summary of POS transactions and POS balance.\n\nShow: Displays full transactions done on POS.", 
      displayOrder: 3 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F6 Virtual 🔘", 
      content: "Coming soon", 
      displayOrder: 4 
    });

    // SECTION: WORK ETHICS
    const ethics = await storage.createSection({ title: "WORK ETHICS", slug: "work-ethics", displayOrder: 3 });
    await storage.createSubsection({
      sectionId: ethics.id,
      title: "Guidelines",
      content: "DAY SHIFT OPERATORS ARE EXPECTED TO BE IN THE BRANCH AS EARLY AS 7:00AM.\nBRANCH SHOULD BE CLEAN, TIDY AND ONLINE AS AT 7:30AM.\nALL EQUIPMENTS MUST BE CHECKED DURING DAYBREAK INCLUDING INTERIOR AND EXTERIOR EQUIPMENTS.\nYOUR SLOTS MACHINES SHOULD BE ONLINE AS EARLY AS POSSIBLE, BEST AT 7:30.\nCASHING OUT YOUR PRESENCE SHOULD BE DONE BEFORE 7:30AM.\nON NO ACCOUNT SHOULD A CUSTOMER BE FOUND SLEEPING INSIDE THE VIEWING CENTER.\nTHE DAY SHIFT OPERATORS REQUEST FOR FUEL WHEN THE GEN IS HALF TANK AND THERE'S NO RESERVE.\nPLAYING VIRTUAL OR ANY GAMES AS AN OPERATOR ON DUTY IS PROHIBITED 🚫.\nSLEEPING/FIGHTING AT THE BRANCH IS STRICTLY PROHIBITED.\nDISRESPECTFUL ACTS TOWARDS COLLEAGUES, MANAGERS AND SUPERVISORS IS PROHIBITED.\nIF COLLEAGUES/SUPERIORS ARE IN THE WRONG, REACH OUT TO CUSTOMER SUPPORT: 0800 009 009 009.\nTHE SHOP CASH MUST NOT GO ABOVE 250K UNLESS VALID REASON EXISTS.\nBEFORE CASHING OUT MONEY ON POS, SEEK APPROVAL.\nBRANCH OPERATIONS CLOSED AT OR AFTER 11:30.\nCUG PHONE LINE MUST NEVER LEAVE THE BRANCH.\nMISUSE OR NEGLIGENCE OF COMPANY EQUIPMENTS IS A SERIOUS OFFENCE.\nPOS AND LOCKER BALANCE MUST BE CHECKED AND BALANCED AT ALL TIMES.\nFUNDS ONLY COUNT AS DEPOSIT WHEN SUCCESSFULLY CREDITED TO OPAY DEVICE.",
      displayOrder: 1
    });

    // SECTION: COMMON BRANCH ISSUES
    const issues = await storage.createSection({ title: "COMMON BRANCH ISSUES", slug: "branch-issues", displayOrder: 4 });
    await storage.createSubsection({
      sectionId: issues.id,
      title: "Troubleshooting",
      content: "When a customer is not receiving OTP:\n• Restart phone.\n• Check if SIM matches account number.\n• Check phone is not on DND.\n• Check phone storage is not full.\n• If still not receiving OTP, pick up CUG phone and report in issue group:\n  - Branch name\n  - Customer phone number\n  - Customer service provider\n  - Customer username\n  Then describe the issue.\n\nWhen a ticket failed to print completely:\nReport with:\n• Branch name\n• POS ID\n• Type of ticket (prematch/virtual)\n• Ticket ID\n• Reason (e.g., network 🛜 glitch)\n\nWhen network 🛜 at the branch is not stable:\nReport with:\n• Branch name\n• State the issue (e.g., router not receiving network)\n\nWhen a new item is purchased at the branch:\nTake picture of item and receipt (if available) and post in problem group with description.\n\nHow to send to collect:\nOperator on main terminal prints collection and sends report of total cash, OPAY balance, and total shop balance to manager group.\n\nHow to check ticket that failed to print:\nPress Control + Alt + P\n\nHow to log out:\nPress Alt + F4",
      displayOrder: 1
    });
  }

  const existingQuestions = await storage.getQuestionsByLevel(LEVELS[0]);
  if (existingQuestions.length === 0) {
    const questionsData = [
      {
        question: "State the minimum and maximum stake for Prematch online.",
        options: ["100-500,000", "200-1million", "50-10,000", "1,000-5million"],
        correctAnswer: "200-1million",
        level: "Beginner"
      },
      {
        question: "State the minimum and maximum stake for Aviator.",
        options: ["50-50,000", "100-100,000", "200-200,000", "500-500,000"],
        correctAnswer: "100-100,000",
        level: "Beginner"
      },
      {
        question: "What is the maximum win for Prematch online?",
        options: ["50 million", "100 million", "200 million", "500 million"],
        correctAnswer: "200 million",
        level: "Trainee"
      },
      {
        question: "What is the maximum win for Aviator?",
        options: ["10 million", "20 million", "50 million", "100 million"],
        correctAnswer: "50 million",
        level: "Trainee"
      },
      {
        question: "What is the Fortebet toll free line?",
        options: ["0800009009009", "08000000000", "07000000000", "09000000000"],
        correctAnswer: "0800009009009",
        level: "Easy"
      },
      {
        question: "What is the Fortebet website?",
        options: ["www.fortebet.com", "www.fortebet.ng", "www.fortebet.net", "www.fortebet.org"],
        correctAnswer: "www.fortebet.ng",
        level: "Easy"
      },
      {
        question: "Define 'Stake' in betting.",
        options: ["The amount won", "The sum of money paid at bet placing", "Numerical expression of probability", "The time bet is registered"],
        correctAnswer: "The sum of money paid at bet placing",
        level: "Medium"
      },
      {
        question: "Define 'Odds' in betting.",
        options: ["The money paid", "Numerical expression of probability", "The amount won", "A draw no bet"],
        correctAnswer: "Numerical expression of probability",
        level: "Medium"
      },
      {
        question: "Define 'Draw No Bet' (DNB).",
        options: ["Bet on home team", "Bet on away team", "Voids draw, odd evaluated as 1.00", "Advantage in terms of goals"],
        correctAnswer: "Voids draw, odd evaluated as 1.00",
        level: "Intermediate"
      },
      {
        question: "Define 'Handicap' in betting.",
        options: ["Winning without goals", "Advantage or deficit in goals/points", "Betting on draws", "Multiple selections"],
        correctAnswer: "Advantage or deficit in goals/points",
        level: "Intermediate"
      },
      {
        question: "State and explain 'Ako bet'.",
        options: ["Single event bet", "Consists of one or more events", "System bet of multiple akos", "Virtual event bet"],
        correctAnswer: "Consists of one or more events",
        level: "Hard"
      },
      {
        question: "State and explain 'Combi bet'.",
        options: ["Single event bet", "Consists of two or more ako bets", "Consists of one event", "Bet on slot machines"],
        correctAnswer: "Consists of two or more ako bets",
        level: "Hard"
      },
      {
        question: "What is the resolution of NTBs at the branch?",
        options: ["1024x768", "1600x900", "1920x1080", "1280x720"],
        correctAnswer: "1600x900",
        level: "Boss"
      },
      {
        question: "How do you check NTB resolution?",
        options: ["CTRL+ALT+DELETE", "CTR+ALT+M", "ALT+F4", "SHIFT+ENTER"],
        correctAnswer: "CTR+ALT+M",
        level: "Boss"
      },
      {
        question: "What are the two items a customer can change in their account?",
        options: ["Name and Phone", "Password and Email", "Address and DOB", "Username and ID"],
        correctAnswer: "Password and Email",
        level: "Legend"
      },
      {
        question: "What should an operator do if a virtual ticket doesn't print?",
        options: ["Call manager", "Cancel last", "Reboot router", "Ignore it"],
        correctAnswer: "Cancel last",
        level: "Legend"
      },
      {
        question: "Who is NOT permitted to place bets at Fortebet branches?",
        options: ["Staff and family", "Minors and intoxicated persons", "Foreigners", "Elderly people"],
        correctAnswer: "Minors and intoxicated persons",
        level: "World Class"
      },
      {
        question: "What is a 'Service worker' in Fortebet terms?",
        options: ["A cleaning person", "Person authorized to place bets/responsible for T&Cs", "Security guard", "Customer support agent"],
        correctAnswer: "Person authorized to place bets/responsible for T&Cs",
        level: "World Class"
      }
    ];

    for (const q of questionsData) {
      await storage.createQuizQuestion(q);
    }
  }
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  await seedDatabase();

  app.get("/api/sections", async (_req, res) => {
    const data = await storage.getSections();
    res.json(data);
  });

  app.get("/api/sections/:slug", async (req, res) => {
    const data = await storage.getSectionBySlug(req.params.slug);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  });

  app.get("/api/quiz/questions/:level", async (req, res) => {
    const data = await storage.getQuestionsByLevel(req.params.level);
    res.json(data);
  });

  app.get("/api/quiz/leaderboard", async (_req, res) => {
    const data = await storage.getLeaderboard();
    res.json(data);
  });

  app.post("/api/quiz/leaderboard", async (req, res) => {
    const data = await storage.addToLeaderboard(req.body);
    res.json(data);
  });

  return httpServer;
}
