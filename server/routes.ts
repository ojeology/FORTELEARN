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
    // Add other sections as needed...
  }

  const existingQuestions = await storage.getQuestionsByLevel(LEVELS[0]);
  if (existingQuestions.length === 0) {
    const beginnerQuestions = [
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
      { question: "State the minimum stake for Aviator.", options: ["50", "100", "200", "500"], correctAnswer: "100", level: "Beginner" },
      { question: "State the maximum stake for Aviator.", options: ["10,000", "50,000", "100,000", "500,000"], correctAnswer: "100,000", level: "Beginner" }
    ];

    for (const q of beginnerQuestions) {
      await storage.createQuizQuestion(q);
    }
  }

  const traineeQuestionsExist = await storage.getQuestionsByLevel(LEVELS[1]);
  if (traineeQuestionsExist.length === 0) {
    const traineeQuestions = [
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
      { question: "What is 'Bet placing'?", options: ["amount a customer wins", "moment bet is registered in central server", "numerical expression of probability", "sum of money paid"], correctAnswer: "moment bet is registered in central server", level: "Trainee" },
      { question: "What is 'Payout'?", options: ["sum of money paid", "amount a customer wins if all selections successful", "numerical expression of probability", "moment bet is registered"], correctAnswer: "amount a customer wins if all selections successful", level: "Trainee" }
    ];

    for (const q of traineeQuestions) {
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
