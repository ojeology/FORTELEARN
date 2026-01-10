import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingSections = await storage.getSections();
  if (existingSections.length === 0) {
    const sections = [
      {
        title: "BONUSES",
        content: "Details about current bonus schemes, eligibility criteria, and how to claim them. Check daily for new offers.",
        displayOrder: 1,
      },
      {
        title: "POS / TERMINAL KNOWLEDGE",
        content: "Instructions on operating the POS terminal, troubleshooting connection errors, and processing tickets efficiently.",
        displayOrder: 2,
      },
      {
        title: "WORK ETHICS",
        content: "Company code of conduct, punctuality requirements, dress code policy, and customer service guidelines.",
        displayOrder: 3,
      },
      {
        title: "COMMON BRANCH ISSUES",
        content: "Solutions for printer jams, network outages, cash handling discrepancies, and reporting maintenance requests.",
        displayOrder: 4,
      },
    ];

    for (const section of sections) {
      await storage.createSection(section);
    }
    console.log("Database seeded with default sections");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database on startup
  await seedDatabase();

  app.get(api.sections.list.path, async (_req, res) => {
    const sections = await storage.getSections();
    res.json(sections);
  });

  return httpServer;
}
