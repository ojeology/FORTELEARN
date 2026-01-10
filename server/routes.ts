import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  await storage.clearData();
  
  // Section: BONUSES
  const bonuses = await storage.createSection({ title: "BONUSES", displayOrder: 1 });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Welcome Bonus", 
    content: "Welcome Bonus: 100% bonus on your first deposit up to 100,000 UGX. To activate, deposit at least 5,000 UGX and place bets equal to 5x the deposit amount.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Multiple Booster Bonus", 
    content: "Multiple Booster Bonus: Increase your winnings by up to 1,000% when you place multiple bets. The more games you add, the higher the percentage bonus on your potential return.", 
    displayOrder: 2 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Cashback Bonus", 
    content: "Cashback Bonus: Get 10% of your lost bets back every Monday. Minimum total losses must exceed 20,000 UGX within the week to qualify.", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Online Virtual Bonus", 
    content: "Online Virtual Bonus: Special rewards for betting on virtual football, tennis, and racing. Receive 500 UGX bonus for every 5 virtual bets placed above 1,000 UGX each.", 
    displayOrder: 4 
  });
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "VIP Points", 
    content: "VIP Points: Earn points for every bet placed. 1,000 UGX bet = 1 VIP point. Points can be exchanged for free bets or cash at a rate of 100 points = 1,000 UGX.", 
    displayOrder: 5 
  });

  // Section: POS / TERMINAL KNOWLEDGE
  const pos = await storage.createSection({ title: "POS / TERMINAL KNOWLEDGE", displayOrder: 2 });
  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F1", 
    content: "F1: Bet Ticket Printing. Use this key to quickly print the currently selected bet ticket after confirmation.", 
    displayOrder: 1 
  });
  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F2", 
    content: "F2: Results Inquiry. Check the outcomes of recent matches and virtual games directly on the terminal screen.", 
    displayOrder: 2 
  });
  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F4", 
    content: "F4: Cancel Last Bet. Allows for the immediate cancellation of the last placed ticket if requested within the 2-minute grace period.", 
    displayOrder: 3 
  });
  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F6", 
    content: "F6: Daily Financial Report. Generates a summary of all sales, payouts, and net balances for the current shift.", 
    displayOrder: 4 
  });

  // Section: WORK ETHICS
  const ethics = await storage.createSection({ title: "WORK ETHICS", displayOrder: 3 });
  await storage.createSubsection({
    sectionId: ethics.id,
    title: "General Guidelines",
    content: "Employees must maintain professional conduct at all times. Punctuality is mandatory. Dress code: Official Fortebet branded uniforms must be clean and worn properly during all working hours.",
    displayOrder: 1
  });

  // Section: COMMON BRANCH ISSUES
  const issues = await storage.createSection({ title: "COMMON BRANCH ISSUES", displayOrder: 4 });
  await storage.createSubsection({
    sectionId: issues.id,
    title: "Technical Support",
    content: "For printer jams: Power off, open the top cover, gently remove obstructed paper. For network outages: Check LAN cable connection and restart the router. Report persistent issues to IT immediately.",
    displayOrder: 1
  });
  
  console.log("Database seeded with exact sections and content");
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
