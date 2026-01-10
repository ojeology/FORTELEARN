import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingSections = await storage.getSectionsWithSubsections();
  if (existingSections.length === 0) {
    // Section: BONUSES
    const bonuses = await storage.createSection({ title: "BONUSES", displayOrder: 1 });
    await storage.createSubsection({ sectionId: bonuses.id, title: "Welcome Bonus", content: "Details about the Welcome Bonus scheme.", displayOrder: 1 });
    await storage.createSubsection({ sectionId: bonuses.id, title: "Multiple Booster Bonus", content: "Details about the Multiple Booster Bonus scheme.", displayOrder: 2 });
    await storage.createSubsection({ sectionId: bonuses.id, title: "Cashback Bonus", content: "Details about the Cashback Bonus scheme.", displayOrder: 3 });
    await storage.createSubsection({ sectionId: bonuses.id, title: "Online Virtual Bonus", content: "Details about the Online Virtual Bonus scheme.", displayOrder: 4 });
    await storage.createSubsection({ sectionId: bonuses.id, title: "VIP Points", content: "Details about the VIP Points scheme.", displayOrder: 5 });

    // Section: POS / TERMINAL KNOWLEDGE
    const pos = await storage.createSection({ title: "POS / TERMINAL KNOWLEDGE", displayOrder: 2 });
    await storage.createSubsection({ sectionId: pos.id, title: "F1", content: "Details about F1 function.", displayOrder: 1 });
    await storage.createSubsection({ sectionId: pos.id, title: "F2", content: "Details about F2 function.", displayOrder: 2 });
    await storage.createSubsection({ sectionId: pos.id, title: "F4", content: "Details about F4 function.", displayOrder: 3 });
    await storage.createSubsection({ sectionId: pos.id, title: "F6", content: "Details about F6 function.", displayOrder: 4 });

    // Section: WORK ETHICS
    await storage.createSection({ title: "WORK ETHICS", displayOrder: 3 });

    // Section: COMMON BRANCH ISSUES
    await storage.createSection({ title: "COMMON BRANCH ISSUES", displayOrder: 4 });
    
    console.log("Database seeded with exact sections and placeholders for content");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seedDatabase();

  app.get(api.sections.list.path, async (_req, res) => {
    const data = await storage.getSectionsWithSubsections();
    res.json(data);
  });

  return httpServer;
}
