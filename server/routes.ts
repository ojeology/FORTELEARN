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
    const questionnaire = [
      { q: "Welcome Bonus is calculated as ___", a: "300% of deposit", lvl: "Beginner", opts: ["100% of deposit", "200% of deposit", "300% of deposit", "400% of deposit"] },
      { q: "Mention eligible bets for welcome Bonus", a: "prematch and inplay", lvl: "Beginner", opts: ["prematch only", "inplay only", "prematch and inplay", "virtual only"] },
      { q: "What is the maximum welcome bonus amount?", a: "1,000,000", lvl: "Trainee", opts: ["100,000", "500,000", "1,000,000", "2,000,000"] },
      { q: "When do welcome bonus expire?", a: "after 90 days of first deposit", lvl: "Trainee", opts: ["after 30 days", "after 60 days", "after 90 days of first deposit", "never"] },
      { q: "Selection of any prematch or in-play with min 3 events and min 3.00 odds is to what bonus?", a: "Welcome bonus", lvl: "Easy", opts: ["Cashback bonus", "Multiple booster", "Welcome bonus", "Online virtual bonus"] },
      { q: "Condition for welcome bonus: percentage of wagered amount credited to main account?", a: "2 percent", lvl: "Easy", opts: ["1 percent", "2 percent", "5 percent", "10 percent"] },
      { q: "Where can a customer find his welcome bonus balance?", a: "on the welcome bonus page", lvl: "Medium", opts: ["main account", "bonus account", "on the welcome bonus page", "profile settings"] },
      { q: "Odds 75-149.99 means what on CASHBACK BONUS?", a: "1*customer stake", lvl: "Medium", opts: ["0.5*stake", "1*customer stake", "2*stake", "3*stake"] },
      { q: "Odds 150-299.99 means what on cash back bonus?", a: "2* customer stake", lvl: "Intermediate", opts: ["1*stake", "2* customer stake", "3*stake", "4*stake"] },
      { q: "300+ odds means what on cash back bonus?", a: "3*customer stake", lvl: "Intermediate", opts: ["1*stake", "2*stake", "3*customer stake", "5*stake"] },
      { q: "Minimum percentage for multiple boosters?", a: "5 percent", lvl: "Hard", opts: ["1 percent", "2 percent", "5 percent", "10 percent"] },
      { q: "Maximum percentage for multiple boosters?", a: "250 percent", lvl: "Hard", opts: ["100 percent", "200 percent", "250 percent", "300 percent"] },
      { q: "Minimum events for multiple boosters?", a: "5 events", lvl: "Boss", opts: ["3 events", "5 events", "10 events", "15 events"] },
      { q: "Maximum events for multiple boosters?", a: "50 events", lvl: "Boss", opts: ["20 events", "30 events", "50 events", "100 events"] },
      { q: "110,000 VIP points can be converted how much?", a: "1,000", lvl: "Legend", opts: ["200", "500", "1,000", "10,000"] },
      { q: "Minimum VIP points for virtual and prematch online?", a: "20", lvl: "Legend", opts: ["1", "5", "10", "20"] },
      { q: "Who is responsible for 'To collect' at the branch?", a: "The cm", lvl: "World Class", opts: ["The operator", "The cm", "The supervisor", "The manager"] },
      { q: "Which days are for 'To collect'?", a: "Mondays and Fridays", lvl: "World Class", opts: ["Weekends", "Mondays and Fridays", "Everyday", "First day of month"] }
    ];

    for (const item of questionnaire) {
      await storage.createQuizQuestion({
        question: item.q,
        options: item.opts,
        correctAnswer: item.a,
        level: item.lvl
      });
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
