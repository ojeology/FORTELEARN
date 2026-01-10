import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  await storage.clearData();
  
  // SECTION: BONUSES
  const bonuses = await storage.createSection({ title: "BONUSES", displayOrder: 1 });
  
  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Welcome Bonus", 
    content: "Welcome bonus is a bonus given to newly registered customers of Fortebet.\nIt is 3× their total deposit (300 percent of their account balance) at the moment of placing their first eligible bet.\nA customer’s first eligible bet is either:\nA prematch game, or\nAn I-Play (live) game.\nOnce this is met, the customer is given 3× their deposit, which is stored inside their Fortebet Welcome Bonus account.\nThis bonus is not redeemable immediately.\nTo redeem this bonus, the customer must:\nPlay a prematch or I-Play game\nWith a minimum of three selections\nAnd total odds of 3.00 or more\nWhenever a customer does this:\n2% of the customer’s stake is deducted from the Welcome Bonus balance\nThat amount is credited to the customer’s main account\nThe credited amount can be withdrawn or used to place bets\nNOTE:\nThe maximum Welcome Bonus a customer can get is ₦1,000,000\nNo matter the deposit amount, the bonus cannot exceed ₦1,000,000\nThe Welcome Bonus lasts for 90 days starting from the day of first deposit", 
    displayOrder: 1 
  });

  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Multiple Booster Bonus", 
    content: "This is a bonus given to all Fortebet customers, both:\nRegistered online customers\nRegular customers who play at the branch\nIt applies to prematch and in-play games and increases the chances of winning big.\nTo qualify:\nA customer must select a minimum of five events\nEach event must have odds of 1.25 or more\nOnce this requirement is met, the customer gets a 5% Multiple Booster Bonus.\nMaximum number of events per ticket: 150\nOnce a customer reaches 50 events with odds of 1.25 or more, they receive the maximum booster of 250%\nEven if all 150 events meet the odds requirement, the booster remains 250% maximum\nMultiple Booster Chart:\n5 events → 5%\n6 events\n8 events\n9 events\n10 events\n12 events\n14 events\n16 events\n18 events\n20 events\n25 events\n30 events\n35 events\n40 events\n45 events\n50 events → 250% (Maximum)", 
    displayOrder: 2 
  });

  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Cashback Bonus", 
    content: "This bonus is given only to registered Fortebet customers who play prematch and in-play games online.\nIt allows customers to reclaim up to 3× their stake after final evaluation of their bets with only one selection lost.\nTo qualify:\nCustomer must select a minimum of two events\nExactly one event must be lost\nThe odds of the remaining events must fall within the ranges below:\n0 – 74.99 → No cashback\n75 – 149.99 → 1× stake back\n150 – 299.99 → 2× stake back\n300 and above → 3× stake back (maximum cashback)", 
    displayOrder: 3 
  });

  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "Online Virtual Bonus", 
    content: "This bonus is given to registered Fortebet customers who play virtual games online.\nBonus structure:\n1 event → 1% bonus\n2 events → 2% bonus\n3 events → 3% bonus (maximum)\nNOTE:\nMaximum number of virtual events selectable is three\nEach event starts five minutes apart\nThere are 288 virtual matches every 24 hours", 
    displayOrder: 4 
  });

  await storage.createSubsection({ 
    sectionId: bonuses.id, 
    title: "VIP Points", 
    content: "VIP points are given to registered Fortebet customers who play online games including:\nPrematch\nIn-play\nAviator\nSlots\nCustomers who:\nPlay slots at the branch using VIP cards, or\nVerify their email address\nalso receive VIP points.\nEmail verification reward:\nInstant 20,000 VIP points\nVIP Points Conversion:\n25,000 → ₦200\n110,000 → ₦1,000\n1,000,000 → ₦10,000\nVIP points can be converted to cash, used to place bets, or withdrawn.", 
    displayOrder: 5 
  });

  // SECTION: POS / TERMINAL KNOWLEDGE
  const pos = await storage.createSection({ title: "POS / TERMINAL KNOWLEDGE", displayOrder: 2 });
  
  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F1", 
    content: "Client Cash In\nUsed to deposit money into a customer’s Fortebet account.\nClient Cash Out\nUsed to withdraw money after the customer provides the four-digit authorization code.\nSlot In\nUsed to deposit into:\nBlack slot cards (regular cards for any customer)\nVIP slot cards (unique cards assigned to registered customers)\nVIP cards are more secure and funds cannot be withdrawn without an authorization code sent to the customer’s phone.", 
    displayOrder: 1 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "Load (I) Ticket", 
    content: "Used to load booking numbers of already booked prematch games.\nCustomers can book games from:\nPersonal devices\nBranch NTBS laptops\nThe booking number expires in one hour.", 
    displayOrder: 2 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "Load (T) Ticket", 
    content: "Used to rebet already played prematch games.\nThe operator scans or enters the old ticket code and all selections appear automatically.", 
    displayOrder: 3 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "Last (L) Ticket", 
    content: "Displays the last prematch ticket played on the terminal.", 
    displayOrder: 4 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F12", 
    content: "Used to finish and clear all transactions.", 
    displayOrder: 5 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "Edit", 
    content: "Used to view customer information and assign VIP cards.", 
    displayOrder: 6 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "Letter N", 
    content: "Used to enter customer usernames for deposits or withdrawals.", 
    displayOrder: 7 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "Letter K", 
    content: "Used to enter slot card numbers.\nNOTE:\nCustomer account balance cannot be viewed on POS — only VIP points and slot balances.", 
    displayOrder: 8 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F2 (Payout / Cancel Tickets)", 
    content: "Used to pay out or cancel prematch and virtual tickets.\nPrematch tickets:\nCan only be cancelled within 10 minutes\nCannot be cancelled if any event has started\nVirtual tickets:\nCan be cancelled anytime before events start\nPaid and cancelled tickets must be trashed.", 
    displayOrder: 9 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F4", 
    content: "To Collect\nCash In POS\nCash Out POS\nTransfer between POS\nDay Report\nShow full transactions", 
    displayOrder: 10 
  });

  await storage.createSubsection({ 
    sectionId: pos.id, 
    title: "F6 Virtual", 
    content: "Coming soon.", 
    displayOrder: 11 
  });

  // SECTION: WORK ETHICS
  const ethics = await storage.createSection({ title: "WORK ETHICS", displayOrder: 3 });
  await storage.createSubsection({
    sectionId: ethics.id,
    title: "General Guidelines",
    content: "Employees must maintain professional conduct at all times. Punctuality is mandatory. Dress code: Official Fortebet branded uniforms must be clean and worn properly during all working hours.",
    displayOrder: 1
  });

  // SECTION: COMMON BRANCH ISSUES
  const issues = await storage.createSection({ title: "COMMON BRANCH ISSUES", displayOrder: 4 });
  await storage.createSubsection({
    sectionId: issues.id,
    title: "Technical Support",
    content: "For printer jams: Power off, open the top cover, gently remove obstructed paper. For network outages: Check LAN cable connection and restart the router. Report persistent issues to IT immediately.",
    displayOrder: 1
  });
  
  console.log("Database seeded with full Fortebet content");
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
