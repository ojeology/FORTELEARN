import type { Express } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { syncFilesToDb } from "./sync";

async function seedDatabase() {
  await storage.clearData();
  await syncFilesToDb().catch(console.error);
}

export async function registerRoutes(app: Express): Promise<void> {
  // Seed the database
  await seedDatabase();

  app.get(api.sections.list.path, async (_req, res) => {
    try {
      const sections = await storage.getSections();
      res.json(sections);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get(api.sections.get.path, async (req, res) => {
    try {
      const section = await storage.getSectionBySlug(req.params.slug);
      if (!section) {
        res.status(404).json({ message: "Section not found" });
        return;
      }
      res.json(section);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Basic routes for quiz and leaderboard without using missing shared definitions
  app.get("/api/leaderboard", async (_req, res) => {
    try {
      const entries = await storage.getLeaderboard();
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/leaderboard", async (req, res) => {
    try {
      const entry = await storage.addToLeaderboard(req.body);
      res.json(entry);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/quiz/questions", async (req, res) => {
    try {
      const level = req.query.level as string;
      const questions = await storage.getQuestionsByLevel(level);
      res.json(questions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}
