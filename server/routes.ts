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
    await storage.createSubsection({ sectionId: bonuses.id, title: "Welcome Bonus", content: "Welcome bonus is a bonus given to newly registered customers of fortebet...", displayOrder: 1 });
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

      // Level 2: Trainee
      { question: "Once Welcome Bonus conditions are met, what percentage of the wagered amount is moved to the main account?", options: ["1%", "2%", "5%", "10%"], correctAnswer: "2%", level: "Trainee" },
      { question: "A customer deposits ₦2000 and loses it all on Slots and Virtual games. What is their Welcome Bonus balance?", options: ["₦6000", "₦2000", "₦0", "₦1000"], correctAnswer: "₦0", level: "Trainee" },
      { question: "If a qualifying bet is voided, what happens to the 2% already credited from the Welcome Bonus?", options: ["It is doubled.", "It remains in the account.", "It is deducted back.", "It is converted to VIP points."], correctAnswer: "It is deducted back.", level: "Trainee" },
      { question: "Can a customer earn the Welcome Bonus on a losing online bet?", options: ["No, only winning bets qualify.", "Yes, if the bet meets the event and odds conditions.", "Only if they are a VIP.", "Only on their first bet."], correctAnswer: "Yes, if the bet meets the event and odds conditions.", level: "Trainee" },
      { question: "When does the Welcome Bonus expiry period start?", options: ["On the day of registration", "On the day of the first deposit", "On the day the first bet is placed", "After the first withdrawal"], correctAnswer: "On the day of the first deposit", level: "Trainee" },
      { question: "When is the 2% from the Welcome Bonus credited to the customer's main account?", options: ["Immediately after deposit", "After placing any bet", "After placing a qualifying bet (min. 3 events, odds 3.00+)", "After 7 days"], correctAnswer: "After placing a qualifying bet (min. 3 events, odds 3.00+)", level: "Trainee" },

      // Level 3: Easy
      { question: "For Cashback Bonus, what does an odds range of 75.00 - 149.99 yield?", options: ["0.5 x Customer Stake", "1 x Customer Stake", "2 x Customer Stake", "3 x Customer Stake"], correctAnswer: "1 x Customer Stake", level: "Easy" },
      { question: "For Cashback Bonus, what does an odds range of 150.00 - 299.99 yield?", options: ["1 x Customer Stake", "2 x Customer Stake", "3 x Customer Stake", "5 x Customer Stake"], correctAnswer: "2 x Customer Stake", level: "Easy" },
      { question: "What bets are eligible for the Cashback Bonus?", options: ["Only Aviator games", "Only Prematch bets", "Only Slot games", "Both Prematch and Inplay bets"], correctAnswer: "Both Prematch and Inplay bets", level: "Easy" },
      { question: "For Cashback Bonus, what does an odds of 300+ yield?", options: ["1 x Customer Stake", "2 x Customer Stake", "3 x Customer Stake", "5 x Customer Stake"], correctAnswer: "3 x Customer Stake", level: "Easy" },
      { question: "After a cut-one (one voided event), a customer's remaining total odds are 255. How many times their stake will be returned as Cashback?", options: ["0 times", "1 time", "2 times", "3 times"], correctAnswer: "2 times", level: "Easy" },
      { question: "Which bonus is available to both registered and anonymous customers?", options: ["Welcome Bonus", "Cashback Bonus", "Multiple Booster Bonus", "Online Bonus"], correctAnswer: "Multiple Booster Bonus", level: "Easy" },

      // Level 4: Medium
      { question: "What is the range for the Multiple Booster percentage increase?", options: ["1% min, 100% max", "5% min, 250% max", "10% min, 500% max", "2% min, 200% max"], correctAnswer: "5% min, 250% max", level: "Medium" },
      { question: "What is the minimum and maximum number of events for a Multiple Booster bet?", options: ["Min 3, Max 25", "Min 5, Max 50", "Min 1, Max 20", "Min 10, Max 100"], correctAnswer: "Min 5, Max 50", level: "Medium" },
      { question: "After a cut-two (two voided events), a customer's remaining total odds are 300+. What is their Cashback?", options: ["1 x Stake", "2 x Stake", "3 x Stake", "0 x Stake (No Cashback for 300+ after cuts)"], correctAnswer: "0 x Stake (No Cashback for 300+ after cuts)", level: "Medium" },
      { question: "A customer selects 33 events, all meeting Multiple Booster conditions. What is their bonus percentage?", options: ["50%", "100%", "125%", "200%"], correctAnswer: "125%", level: "Medium" },
      { question: "What bets are eligible for the Multiple Booster Bonus?", options: ["Only Slot games", "Only Aviator", "Both Prematch and Inplay bets", "Only Virtual games"], correctAnswer: "Both Prematch and Inplay bets", level: "Medium" },
      { question: "A bet with 5 selections, each at odds of 1.25+, qualifies for what?", options: ["5% Multiple Booster Bonus", "2% Welcome Bonus", "1x Stake Cashback", "20 VIP Points"], correctAnswer: "5% Multiple Booster Bonus", level: "Medium" },

      // Level 5: Intermediate
      { question: "Can a customer get the Multiple Booster Bonus if they cash out their bet?", options: ["Yes", "No", "Only if winning", "Only if partially cashed out"], correctAnswer: "No", level: "Intermediate" },
      { question: "A customer places a prematch ticket with 150 events, each at 1.25 odds. What is their Multiple Booster percentage?", options: ["150%", "200%", "250% (the maximum)", "300%"], correctAnswer: "250% (the maximum)", level: "Intermediate" },
      { question: "Do customers earn VIP points for playing Aviator?", options: ["Yes", "No", "Only on weekends", "Only if they lose"], correctAnswer: "Yes", level: "Intermediate" },
      { question: "Do customers earn VIP points for playing Slots online?", options: ["Yes", "No", "Only on weekends", "Only if they lose"], correctAnswer: "Yes", level: "Intermediate" },
      { question: "How many VIP points are earned for Slot games played at a branch?", options: ["10 points", "5 points", "1 point", "0 points"], correctAnswer: "0 points", level: "Intermediate" },
      { question: "What is the minimum VIP points earned for a Virtual or Prematch online bet?", options: ["1 point", "5 points", "10 points", "20 points"], correctAnswer: "20 points", level: "Intermediate" },

      // Level 6: Hard
      { question: "What is the minimum VIP points earned for an Aviator game?", options: ["0 points", "1 point", "5 points", "10 points"], correctAnswer: "1 point", level: "Hard" },
      { question: "How many VIP points are earned for a bet with 1-2 prematch selections?", options: ["10 points", "20 points", "50 points", "100 points"], correctAnswer: "20 points", level: "Hard" },
      { question: "How many VIP points are earned for a bet with 8-11 selections?", options: ["50 points", "80 points", "120 points", "200 points"], correctAnswer: "120 points", level: "Hard" },
      { question: "How many VIP points are earned for a bet with 23+ selections?", options: ["200 points", "350 points", "500 points", "750 points"], correctAnswer: "500 points", level: "Hard" },
      { question: "How much cash can 110,000 VIP points be converted to?", options: ["₦500", "₦1,000", "₦2,000", "₦5,000"], correctAnswer: "₦1,000", level: "Hard" },
      { question: "Where does a customer go to convert VIP points to cash?", options: ["The Transfer Menu", "The VIP Point Money Back Shop", "The Branch Terminal", "The Welcome Bonus page"], correctAnswer: "The VIP Point Money Back Shop", level: "Hard" },

      // Level 7: Boss
      { question: "What should you do if you credit a customer's deposit to the wrong account?", options: ["Ignore it, it will auto-correct.", "Cancel the credit transaction.", "Ask the customer to make a new deposit.", "Transfer it manually via F4."], correctAnswer: "Cancel the credit transaction.", level: "Boss" },
      { question: "How do you send money from your terminal to another branch terminal?", options: ["Using the Cancel Credit function", "Using the Transfer function on F4", "By creating a 'To Collect' ticket", "You cannot send money between terminals"], correctAnswer: "Using the Transfer function on F4", level: "Boss" },
      { question: "What is the minimum and maximum stake for a Prematch online bet?", options: ["Min 100, Max 500,000", "Min 200, Max 1,000,000", "Min 500, Max 5,000,000", "Min 1000, Max 10,000,000"], correctAnswer: "Min 200, Max 1,000,000", level: "Boss" },
      { question: "How many chances does a player have per round in Aviator?", options: ["One", "Two", "Three", "Unlimited"], correctAnswer: "Two", level: "Boss" },
      { question: "Can Aviator be played for fun ('demo mode') at a branch?", options: ["Yes", "No", "Only if no customers", "Only on weekends"], correctAnswer: "No", level: "Boss" },
      { question: "What is the 'Online Bonus'?", options: ["A bonus for branch customers", "A bonus given to anonymous customers", "A bonus for registered customers who play Virtual games online", "A sign-up bonus for new branches"], correctAnswer: "A bonus for registered customers who play Virtual games online", level: "Boss" },

      // Level 8: Legend
      { question: "For a three-event selection bet, what is the Online Bonus percentage?", options: ["1%", "2%", "3%", "5%"], correctAnswer: "3%", level: "Legend" },
      { question: "How is the Multiple Booster percentage calculated?", options: ["From the total stake amount", "From the total odds of the ticket", "From the total number of events that meet the requirements", "From the net profit of the bet"], correctAnswer: "From the total number of events that meet the requirements", level: "Legend" },
      { question: "Who is responsible for preparing the 'To Collect' at the branch?", options: ["The Customer", "The Cashier (CM)", "The Security Guard", "The Head Office"], correctAnswer: "The Cashier (CM)", level: "Legend" },
      { question: "On which days is 'To Collect' typically processed?", options: ["Tuesdays and Thursdays", "Mondays and Fridays", "Wednesdays and Saturdays", "Every day"], correctAnswer: "Mondays and Fridays", level: "Legend" },
      { question: "When should 'To Collect' details be sent to Head Office?", options: ["12:00 PM to 1:00 PM", "8:00 AM to 9:00 AM", "6:00 AM to 7:00 AM", "Anytime before close of business"], correctAnswer: "6:00 AM to 7:00 AM", level: "Legend" },
      { question: "How many paylines does the 'Mad Mechanic' slot game have?", options: ["3 paylines", "5 paylines", "10 paylines", "25 paylines"], correctAnswer: "5 paylines", level: "Legend" },

      // Level 9: World Class
      { question: "What is a 'payline' in a slot game?", options: ["The line to pay the cashier", "The ways winnings are decided and calculated", "The bonus round activation line", "The bet multiplier"], correctAnswer: "The ways winnings are decided and calculated", level: "World Class" },
      { question: "How do progressive jackpots on slots increase?", options: ["Randomly by the system", "Only on weekends", "As customers play (spin) the game", "They are fixed amounts"], correctAnswer: "As customers play (spin) the game", level: "World Class" },
      { question: "Which of these is an online slot game NOT found on branch terminals?", options: ["Book of Ra", "Midnight Fruit 27", "Lucky Ladys Charm", "Dolphins Pearl"], correctAnswer: "Midnight Fruit 27", level: "World Class" },
      { question: "What does the betting option '1/2' (Home First Half / Away Full Time) mean?", options: ["Bet on Home team to win the 1st half AND the Away team to win the match.", "Bet on a draw at both half-time and full-time.", "A combined bet on the first half and second half results.", "An accumulator bet type."], correctAnswer: "Bet on Home team to win the 1st half AND the Away team to win the match.", level: "World Class" },
      { question: "What should you do if a supervisor arrives and asks to collect ₦200,000 from the shop?", options: ["Hand it over immediately.", "Make a report and ask for proper approval.", "Ask another customer to verify.", "Refuse and call security."], correctAnswer: "Make a report and ask for proper approval.", level: "World Class" },
      { question: "What are the first steps if a customer forgets their username?", options: ["Create a new account for them.", "Make a report to the appropriate department/team.", "Give them your terminal to log in.", "Ask them to guess."], correctAnswer: "Make a report to the appropriate department/team.", level: "World Class" },
      { question: "What are the first steps if a customer can't remember their registered phone number?", options: ["Use any number they provide.", "Make a report to the appropriate department/team.", "Check the phone of the last customer.", "It is not recoverable."], correctAnswer: "Make a report to the appropriate department/team.", level: "World Class" },
      { question: "When should you request fuel for the generator?", options: ["When the supervisor visits.", "Every Monday morning.", "When the tank is half full.", "You snap the generator gauge and run-hour meter, then request approval."], correctAnswer: "You snap the generator gauge and run-hour meter, then request approval.", level: "World Class" }
    ];

    for (const q of allQuestions) {
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
