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
    const bonuses = await storage.createSection({ title: "BONUSES", slug: "bonuses", displayOrder: 1 });
    await storage.createSubsection({ sectionId: bonuses.id, title: "Welcome Bonus", content: "...", displayOrder: 1 });
    // ... sections restored ...
  }

  const existingQuestions = await storage.getQuestionsByLevel(LEVELS[0]);
  if (existingQuestions.length === 0) {
    const questionsData = [
      // Beginner
      { question: "Welcome Bonus is calculated as ___", options: ["100% of deposit", "200% of deposit", "300% of deposit", "400% of deposit"], correctAnswer: "300% of deposit", level: "Beginner" },
      { question: "Mention eligible bets for welcome Bonus", options: ["prematch and inplay", "virtual only", "aviator only", "casino only"], correctAnswer: "prematch and inplay", level: "Beginner" },
      { question: "What is the maximum welcome bonus amount?", options: ["100,000", "500,000", "1,000,000", "2,000,000"], correctAnswer: "1,000,000", level: "Beginner" },
      { question: "When do welcome bonus expire?", options: ["after 30 days", "after 60 days", "after 90 days of first deposit", "never"], correctAnswer: "after 90 days of first deposit", level: "Beginner" },
      { question: "Minimum stake for Prematch online?", options: ["50", "100", "200", "500"], correctAnswer: "200", level: "Beginner" },
      { question: "Maximum stake for Prematch online?", options: ["100,000", "500,000", "1 million", "5 million"], correctAnswer: "1 million", level: "Beginner" },
      { question: "Where can a customer find his welcome bonus balance?", options: ["profile settings", "main account", "on the welcome bonus page", "transaction history"], correctAnswer: "on the welcome bonus page", level: "Beginner" },
      { question: "Can a registered customer get welcome bonus if he placed a bet at the branch?", options: ["yes", "no", "only on weekends", "only for VIPs"], correctAnswer: "no", level: "Beginner" },
      { question: "Fortebet toll free line?", options: ["0800009009009", "08000000000", "07000000000", "09000000000"], correctAnswer: "0800009009009", level: "Beginner" },
      { question: "Fortebet website?", options: ["www.fortebet.com", "www.fortebet.ng", "www.fortebet.net", "www.fortebet.org"], correctAnswer: "www.fortebet.ng", level: "Beginner" },

      // Trainee
      { question: "Welcome Bonus: Selection of any prematch or in-play with min events and odds?", options: ["1 event, 2.00 odds", "2 events, 1.50 odds", "3 events, 3.00 odds", "5 events, 5.00 odds"], correctAnswer: "3 events, 3.00 odds", level: "Trainee" },
      { question: "Welcome Bonus: Percentage of wagered amount credited to main account?", options: ["1 percent", "2 percent", "5 percent", "10 percent"], correctAnswer: "2 percent", level: "Trainee" },
      { question: "When is expiration date for welcome Bonus starts counting?", options: ["day of registration", "day of first deposit", "day of first bet", "day of verification"], correctAnswer: "day of first deposit", level: "Trainee" },
      { question: "Minimum VIP points for aviator?", options: ["1", "5", "10", "20"], correctAnswer: "1", level: "Trainee" },
      { question: "Minimum VIP points for virtual and prematch online?", options: ["1", "5", "10", "20"], correctAnswer: "20", level: "Trainee" },
      { question: "Can I play aviator for fun at the branch?", options: ["yes", "no", "only if no customers", "only on weekends"], correctAnswer: "no", level: "Trainee" },
      { question: "How many chances are there to place bet on aviator?", options: ["one", "two", "three", "unlimited"], correctAnswer: "two", level: "Trainee" },
      { question: "Mention eligible bet for Cashback bonus.", options: ["prematch only", "inplay only", "prematch and inplay", "virtual only"], correctAnswer: "prematch and inplay", level: "Trainee" },
      { question: "Define 'Stake' in betting.", options: ["amount won", "numerical expression of probability", "sum of money paid at moment of bet placing", "time bet is registered"], correctAnswer: "sum of money paid at moment of bet placing", level: "Trainee" },
      { question: "Who is responsible for 'To collect' at the branch?", options: ["operator", "The cm", "supervisor", "manager"], correctAnswer: "The cm", level: "Trainee" },

      // Easy
      { question: "Cashback Bonus: Odds 75-149.99 means?", options: ["0.5* stake back", "1* stake back", "2* stake back", "3* stake back"], correctAnswer: "1* stake back", level: "Easy" },
      { question: "Cashback Bonus: Odds 150-299.99 means?", options: ["1* stake back", "2* stake back", "3* stake back", "4* stake back"], correctAnswer: "2* stake back", level: "Easy" },
      { question: "Cashback Bonus: 300+ odds means?", options: ["2* stake back", "3* stake back", "4* stake back", "5* stake back"], correctAnswer: "3* stake back", level: "Easy" },
      { question: "Multiple Booster: Minimum and maximum percentage?", options: ["1% - 100%", "5% - 250%", "10% - 200%", "2% - 150%"], correctAnswer: "5% - 250%", level: "Easy" },
      { question: "Multiple Booster: Minimum events?", options: ["3 events", "5 events", "7 events", "10 events"], correctAnswer: "5 events", level: "Easy" },
      { question: "Multiple Booster: Maximum events for max bonus?", options: ["20 events", "30 events", "50 events", "100 events"], correctAnswer: "50 events", level: "Easy" },
      { question: "VIP Points: 110,000 points can be converted to?", options: ["200", "500", "1,000", "10,000"], correctAnswer: "1,000", level: "Easy" },
      { question: "VIP Points: 25,000 points can be converted to?", options: ["100", "200", "300", "500"], correctAnswer: "200", level: "Easy" },
      { question: "VIP Points: 1,000,000 points can be converted to?", options: ["5,000", "10,000", "20,000", "50,000"], correctAnswer: "10,000", level: "Easy" },
      { question: "Which bonus is for both registered and anonymous customers?", options: ["Welcome bonus", "Cashback bonus", "multiple booster bonus", "VIP points"], correctAnswer: "multiple booster bonus", level: "Easy" },

      // Medium
      { question: "What is 'Bet placing'?", options: ["amount a customer wins", "moment bet is registered in central server", "numerical expression of probability", "sum of money paid"], correctAnswer: "moment bet is registered in central server", level: "Medium" },
      { question: "What is 'Payout'?", options: ["sum of money paid", "amount a customer wins if all selections successful", "numerical expression of probability", "moment bet is registered"], correctAnswer: "amount a customer wins if all selections successful", level: "Medium" },
      { question: "What are 'Odds'?", options: ["sum of money paid", "amount a customer wins", "numerical expression of probability", "moment bet is registered"], correctAnswer: "numerical expression of probability", level: "Medium" },
      { question: "Define 'Draw no bet' (DNB).", options: ["betting on home team", "betting on away team", "voids possibility of draw and odd evaluated as 1.00", "advantage in terms of points"], correctAnswer: "voids possibility of draw and odd evaluated as 1.00", level: "Medium" },
      { question: "Define 'Handicap'.", options: ["betting on draws", "giving team advantage or deficit in goals/points", "multiple selections at same time", "voiding a draw"], correctAnswer: "giving team advantage or deficit in goals/points", level: "Medium" },
      { question: "What is an 'Ako bet'?", options: ["one or more betting opportunities at same time", "system bet of two or more akos", "bet on virtual games", "bet on slot machines"], correctAnswer: "one or more betting opportunities at same time", level: "Medium" },
      { question: "What is a 'Combi bet'?", options: ["one event bet", "system bet of two or more ako bets", "bet on virtual games", "bet on slot machines"], correctAnswer: "system bet of two or more ako bets", level: "Medium" },
      { question: "Types of ticket at fortebet branches?", options: ["prematch and virtual", "online and offline", "ako and combi", "single and double"], correctAnswer: "prematch and virtual", level: "Medium" },
      { question: "What is a 'resolution'?", options: ["speed of internet", "level of screen quality in terms of colour and size", "number of slot machines", "time of day shift"], correctAnswer: "level of screen quality in terms of colour and size", level: "Medium" },
      { question: "How many paylines is 'Mad mechanic'?", options: ["1", "3", "5", "10"], correctAnswer: "5", level: "Medium" },

      // Intermediate
      { question: "Resolution setting of NTBs at the branch?", options: ["1024x768", "1366x768", "1600x900", "1920x1080"], correctAnswer: "1600x900", level: "Intermediate" },
      { question: "How do you check resolution of NTB?", options: ["CTR+ALT+DELETE", "CTR+ALT+M", "ALT+F4", "SHIFT+TAB"], correctAnswer: "CTR+ALT+M", level: "Intermediate" },
      { question: "What are paylines on slot?", options: ["number of games", "ways winnings are decided and calculated", "amount of jackpot", "number of spins"], correctAnswer: "ways winnings are decided and calculated", level: "Intermediate" },
      { question: "How do jackpots increase?", options: ["manually by operator", "at fixed intervals", "as customers spins", "daily at 7am"], correctAnswer: "as customers spins", level: "Intermediate" },
      { question: "Which slot game online is NOT found at branch terminals?", options: ["Mad mechanic", "Midnight fruit 27", "Turbo slots", "Joker 81"], correctAnswer: "Midnight fruit 27", level: "Intermediate" },
      { question: "Explain betting option 1/2.", options: ["home win/away win", "home first half/away full time", "draw/home win", "away first half/home full time"], correctAnswer: "home first half/away full time", level: "Intermediate" },
      { question: "Wait time after rebooting router during network failure?", options: ["1 minute", "2 minutes", "5 minutes", "10 minutes"], correctAnswer: "10 minutes", level: "Intermediate" },
      { question: "What to do if virtual ticket doesn't print and event NOT started?", options: ["Call HO", "Cancel last", "Wait for result", "Restart POS"], correctAnswer: "Cancel last", level: "Intermediate" },
      { question: "Who is NOT permitted to place bets at branches?", options: ["women", "elderly", "minors and intoxicated persons", "foreigners"], correctAnswer: "minors and intoxicated persons", level: "Intermediate" },
      { question: "What can a customer change on their account?", options: ["username and phone", "password and email", "name and DOB", "address and bank"], correctAnswer: "password and email", level: "Intermediate" },

      // Hard
      { question: "Welcome Bonus: Customer deposits 2000, plays slot and virtual online. Main balance 0. Welcome bonus balance?", options: ["6000", "2000", "0", "1000"], correctAnswer: "0", level: "Hard" },
      { question: "Cashback Bonus: Cut 1, missing event odds deducted, total odds 255. Stake returned?", options: ["1x", "2x", "3x", "0x"], correctAnswer: "2x", level: "Hard" },
      { question: "Cashback Bonus: Cut 2, total odds 300+. Stake returned?", options: ["1x", "2x", "3x", "0x"], correctAnswer: "0x", level: "Hard" },
      { question: "Multiple Booster: 33 events meeting conditions. Percentage?", options: ["100%", "125%", "150%", "250%"], correctAnswer: "125%", level: "Hard" },
      { question: "Multiple Booster: 150 events all with 1.25 odds. Percentage?", options: ["150%", "200%", "250%", "750%"], correctAnswer: "250%", level: "Hard" },
      { question: "Multiple Booster: Can customer get bonus if they cashed out?", options: ["yes", "no", "only if winning", "only if partially cashed out"], correctAnswer: "no", level: "Hard" },
      { question: "What is a 'Service worker'?", options: ["cleaning staff", "person authorized to place bets/responsible for compliance", "IT support", "manager"], correctAnswer: "person authorized to place bets/responsible for compliance", level: "Hard" },
      { question: "If customer forgets username, what are the steps?", options: ["create new account", "make report", "check ID card", "call supervisor"], correctAnswer: "make report", level: "Hard" },
      { question: "If customer can't remember phone number, what are the steps?", options: ["call network provider", "make report", "guess number", "use another number"], correctAnswer: "make report", level: "Hard" },
      { question: "When do you request for fuel?", options: ["when tank empty", "daily", "snap gen gauge and run hour and request approval", "every Monday"], correctAnswer: "snap gen gauge and run hour and request approval", level: "Hard" },

      // Boss
      { question: "A customer selected 3 events with 3.00 odds each. Total odds?", options: ["9", "27", "81", "3"], correctAnswer: "27", level: "Boss" },
      { question: "Customer selected 3 events with 3.00 odds each. Two events voided. Total odds?", options: ["1", "3", "9", "27"], correctAnswer: "3", level: "Boss" },
      { question: "Customer selected 4 events with 3.00 odds each. Total odds?", options: ["12", "64", "81", "243"], correctAnswer: "81", level: "Boss" },
      { question: "Customer selected 4 events with 3.00 odds each. Two events voided. Total odds?", options: ["3", "6", "9", "12"], correctAnswer: "9", level: "Boss" },
      { question: "Betting option 1/X meaning?", options: ["home win FH / home win FT", "home win FH / draw FT", "draw FH / home win FT", "draw FH / draw FT"], correctAnswer: "home win FH / draw FT", level: "Boss" },
      { question: "Betting option X/1 meaning?", options: ["home win FH / home win FT", "home win FH / draw FT", "draw FH / home win FT", "draw FH / draw FT"], correctAnswer: "draw FH / home win FT", level: "Boss" },
      { question: "Betting option X/X meaning?", options: ["home win FH / home win FT", "home win FH / draw FT", "draw FH / home win FT", "draw FH / draw FT"], correctAnswer: "draw FH / draw FT", level: "Boss" },
      { question: "Betting option 2/X meaning?", options: ["away win FH / home win FT", "away win FH / draw FT", "draw FH / away win FT", "away win FH / away win FT"], correctAnswer: "away win FH / draw FT", level: "Boss" },
      { question: "If supervisor asks to collect 200k, what to do?", options: ["give immediately", "refuse", "make report and ask for approval", "call police"], correctAnswer: "make report and ask for approval", level: "Boss" },
      { question: "What is 'Slot in' on F1 used for?", options: ["withdrawals", "deposit into black or VIP slot cards", "loading tickets", "editing customer info"], correctAnswer: "deposit into black or VIP slot cards", level: "Boss" },

      // Legend
      { question: "Maximum amount a shop cash must not go above without reason?", options: ["100k", "250k", "500k", "1million"], correctAnswer: "250k", level: "Legend" },
      { question: "Time to send 'to collect' details to HO?", options: ["7am to 8am", "6:00 to 7am", "8am to 9am", "5pm to 6pm"], correctAnswer: "6:00 to 7am", level: "Legend" },
      { question: "Days for 'To collect' at the branch?", options: ["Mondays and Fridays", "Tuesdays and Thursdays", "Weekends", "Wednesdays"], correctAnswer: "Mondays and Fridays", level: "Legend" },
      { question: "Shortcut to check ticket that failed to print?", options: ["CTRL+P", "Control + Alt + P", "ALT+F4", "CTR+ALT+M"], correctAnswer: "Control + Alt + P", level: "Legend" },
      { question: "Shortcut to log out?", options: ["ALT+TAB", "ALT+F4", "CTRL+DELETE", "SHIFT+ESC"], correctAnswer: "ALT+F4", level: "Legend" },
      { question: "If virtual ticket fails to print and event STARTED?", options: ["Cancel last", "Report to HO immediately", "Wait for conclusion and report winning tickets on issue group", "Call technician"], correctAnswer: "Wait for conclusion and report winning tickets on issue group", level: "Legend" },
      { question: "Action for network failure: Check cables then?", options: ["call manager", "remove SIM, check balance, reboot router", "buy new router", "wait for 1 hour"], correctAnswer: "remove SIM, check balance, reboot router", level: "Legend" },
      { question: "What happens if eligible bets for Welcome Bonus are voided?", options: ["nothing", "2% already credited will be deducted back", "bonus expires", "account blocked"], correctAnswer: "2% already credited will be deducted back", level: "Legend" },
      { question: "Number of virtual matches per 24 hours?", options: ["100", "200", "288", "500"], correctAnswer: "288", level: "Legend" },
      { question: "What to do when you fund a client into a wrong account?", options: ["tell client to return it", "cancel credit", "make new deposit", "call police"], correctAnswer: "cancel credit", level: "Legend" },

      // World Class
      { question: "Multiple Booster: Two ways it CAN'T be applied?", options: ["events < 5 or odds < 1.25", "events > 50", "online play", "weekend games"], correctAnswer: "events < 5 or odds < 1.25", level: "World Class" },
      { question: "Condition to cash out online tickets regarding VIP points?", options: ["must have 0 points", "must have double points", "must have same number of points received at placing", "points don't matter"], correctAnswer: "must have same number of points received at placing", level: "World Class" },
      { question: "VIP Points conversion for 1,000,000 points?", options: ["10,000 naira", "1,000 naira", "200 naira", "5,000 naira"], correctAnswer: "10,000 naira", level: "World Class" },
      { question: "VIP Points conversion for 110,000 points?", options: ["1,000 naira", "500 naira", "200 naira", "2,000 naira"], correctAnswer: "1,000 naira", level: "World Class" },
      { question: "VIP Points conversion for 25,000 points?", options: ["200 naira", "100 naira", "500 naira", "50 naira"], correctAnswer: "200 naira", level: "World Class" },
      { question: "What is 'Draw no bet' evaluated as in event of a draw?", options: ["0.00", "1.00", "2.00", "lost"], correctAnswer: "1.00", level: "World Class" },
      { question: "Max number of virtual events you can select once online?", options: ["1", "3", "5", "10"], correctAnswer: "3", level: "World Class" },
      { question: "Welcome Bonus max amount?", options: ["500,000", "1,000,000", "1,500,000", "2,000,000"], correctAnswer: "1,000,000", level: "World Class" },
      { question: "What does X/X mean in HT/FT?", options: ["home win FH/home win FT", "away win FH/away win FT", "draw FH/draw FT", "home win FH/away win FT"], correctAnswer: "draw FH/draw FT", level: "World Class" },
      { question: "What does 2/2 mean in HT/FT?", options: ["home win FH/home win FT", "away win FH/away win FT", "draw FH/draw FT", "away win FH/draw FT"], correctAnswer: "away win FH/away win FT", level: "World Class" }
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
