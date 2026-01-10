import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

async function seedDatabase() {
  const existingSections = await storage.getSections();
  if (existingSections.length === 0) {
    // SECTION: BONUSES
    const bonuses = await storage.createSection({ title: "BONUSES", slug: "bonuses", displayOrder: 1 });
    
    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Welcome Bonus", 
      content: "Welcome bonus is a bonus given to newly registered customers of fortebet.\nIt is 3x their total deposit or 300 percent of their account balance at the moment of placing their first eligible bet.\nA customer first eligible bet is either a prematch game or I play(live) game...\nOnce this is met the customers are given 3x of their deposits which is stored inside their fortebet welcome bonus account which is not redeemable yet.\nFor a customer to redeem this bonus, the customers needs to play a prematch or I play game with a minimum of three selections and total odds of 3.00 or more,\nWhenever a customer does this (2) percent of the customers stake is deducted from the customer welcome bonus balance and credited to the customer main account balance which the customer can withdraw, or used to place bets...\nNOTE the maximum a customer can get on his welcome bonus account is 1million naira.\nmeaning no matter the amount the customer deposit he will not be getting more than 1million naira.\nLastly welcome bonus lasts for 90days starting from the day the customer made his first deposit...", 
      displayOrder: 1 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Multiple Booster Bonus", 
      content: "this is a bonus given to all customers of fortebet (registered online and regular customers who play at the branch)who plays prematch and Inplay games, it increases their chances of winning big..\nTo get multiple booster bonus a customer must select a minimum of five events and each event must have odds of 1.25 or more \nOnce this requirements is met the customers get a (5) percent multiple booster bonus..and for a maximum of events \n(the maximum number of events on a single ticket is (150))\n but once you have 50 events on your ticket with odds of 1.25 you will get the maximum multiple booster bonus which is 250 percent and that's the maximum.\nNOTE even if all your 150 events have odds of 1.25 or more you will still be getting 250 percent multiple booster bonus.\n\nHERE IS THE CHART OF THE MULTIPLE BOOSTER BONUSE\n\n5 EVENTS    5 PERCENT BOOSTER BONUS\n6 \n8\n9\n10\n12\n14\n16\n18\n20\n25\n30\n35\n40\n45\n50", 
      displayOrder: 2 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Cashback Bonus", 
      content: "This is a bonus given to only registered customers of fortebet (customer who have an account and plays prematch and Inplay online).\nThis bonus allows customers to reclaim up to 3x of their stake after final evaluation of their bets with only one selection lost.\nFor a customer to be eligible for cash back bonus, the customer must select a minimum of two events or more, exactly One event must be lost and the odds of the remaining events must fall into the range below 👇 \n0 - 74.99 the customer isn't getting any cash back\n75 - 149.99 the customer gets 1x his stake(bet) amount back.\n150-299.99 the customer gets 2x his\nStake amount back.\n300 and above the customer get 3x his stake back and that the highest amount of CASHBACK BONUS...", 
      displayOrder: 3 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "Online Virtual Bonus", 
      content: "This is a bonus given to only registered customers of fortebet (customer that have accounts with fortebet and plays virtual online)it also increases their chances of winning big as it adds to their total payout..\n\nFor one event selected and staked on customer get one percent online virtual bonus \nFor two events selected customers get two percent online virtual bonus\nFor three events selected customers get three percent online virtual bonus which is the maximum.\n\nNOTE, the maximum number of virtual events you can select once is three events and each event starts five minutes after the each one.\n288 virtual matches per 24hours.", 
      displayOrder: 4 
    });

    await storage.createSubsection({ 
      sectionId: bonuses.id, 
      title: "VIP Points", 
      content: "These are bonus points given to only registered customers of fortebet (customers with an account with fortebet and plays online) who plays all games online.(Prematch,Inplay, aviator,slots)\nCustomers who plays slot at the branch with their vip cards,and customer who registered an account with and verify their email adress also get vip points.(An instant 20,000 vip points is given to customers who verify their email adress.)\n\nVip points conversion \n\n25,000 can be converted to 200 naira\n\n110,000 can be converted to 1,000\n\n1,000,000 vip points can be converted to 10,000 naira \n\nVip points can be converted to cash that can be used to play bets or withdrawn.", 
      displayOrder: 5 
    });

    // SECTION: POS / TERMINAL KNOWLEDGE
    const pos = await storage.createSection({ title: "POS / TERMINAL KNOWLEDGE", slug: "pos-terminal-knowledge", displayOrder: 2 });
    
    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F1", 
      content: "Client cash in\nThis is used to deposit money into clients(fortebet customer with an account)\nFortebets account.\n\nClient cash out\nThis is used to withdraw from clients fortebet account after the customer has initiated a withdrawal and brought the four digits authorization code to the counter for withdrawal.\n\nSlot in\nThis is used to deposit into the black or vip slot cards...\nThe black cards are regular cards any customer registered or unregistered customers can use it to play slots at the branch.\nThe vip card are unique card assigned to a particular customer, this card is given to only registered customers and it's only one per account.\nThe vip cards are more secure 🔐 meaning fund cannot be withdrawn without the authorization code sent to the owner of the account phone number.", 
      displayOrder: 1 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "Load (I) ticket", 
      content: "This is used to load the booking number of already booked prematch games...\nCustomer can make selections from their personal device or the company Ntbs(the laptops inside the branch),after doing so they are given a number that expires in one hour,the customer are to give you the code number i.e 14 which the operator press the I and insert the number and the selection are displayed on the terminal screen..", 
      displayOrder: 2 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "Load (T) ticket", 
      content: "This is used to Rebet already bet prematch games.\nIn a scenario whereby a customer has already placed a bet at the counter but for some reasons the customer wants to play the same game the operator or the customer doesn't need to go to the trouble of selecting each option again as he or she can just hand over the formerly place bet to the operator, the operator press the letter T scans the former ticket or insert the code manually and all selection will be shown on the terminal which the operator can now proceed to bet the game.", 
      displayOrder: 3 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "Last (l) ticket", 
      content: "This is used to display the last prematch game played on the terminal/POS.\nthis shows the last prematch tickets played on that particular terminal.", 
      displayOrder: 4 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F12 finish transactions", 
      content: "This is used to clear all transactions done on the homepage.", 
      displayOrder: 5 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "Edit", 
      content: "This is used to view customers information and assign vip cards to customers", 
      displayOrder: 6 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "Letter N", 
      content: "this is used to enter customers username in case the customer wants to make a deposit or withdrawal at the branch.\nThe operator starts by entering the letter N \nThen he inserts the customer username and clicks on enter after then the customer information is displayed then he can now ask what the customer wants if it's a deposit, withdrawal or information check and edit.", 
      displayOrder: 7 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "LETTER K", 
      content: "this is used to enter slot cards numbers.\n\nNOTE you can never know a customer account balance from the POS/ terminal \nYou can only know a customer vip points balance and slot account balance...", 
      displayOrder: 8 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F2 BUTTON 🔘 ( PAYOUT/CANCEL TICKETS)", 
      content: "This is used to pay out winning tickets and cancel both prematch and virtual tickets..\nthe operator can payout/cancel a ticket by either scanning the barcode on the ticket or entering the code manually.\nOnce he enters the code and clicks on enters the operator then proceeds to click on the space bar then a little confirmation message popups to show that the ticket has been paid out/cancel successfully.\n\nA prematch ticked can only be cancelled within ten minutes of placing the bet,after 10 minutes it can no longer be cancelled.\nAnd even within that ten minutes if any events starts the ticket can no longer be cancelled..\nA virtual ticket can be cancelled anytime as long as none of the events on the ticket has started..\n\nA prematch ticket can be cancelled in two ways.\nScan and cancel\nEnter the code manually on f2\nA virtual ticket can be cancelled in three ways\nScan and cancel \nEnter code manually \nCancel last..\n\nPaid out tickets and cancelled tickets are expected to be trashed and not returned to customers..", 
      displayOrder: 9 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F4 BUTTON 🔘", 
      content: "To collect \nthis shows the total balance available in the shop and it's also used for the collection of reports.\n\nCash in pos..\nThis is used to receive money from the head office and other sources that concern the company...\n\nCash out POS\nThis is used to send reports, and also send money to the head office..\n\nTransfer \nThis is used to send money in-between POS at the branch \n\nDay report\nThis show the highlighted summary of transactions done on the POS and it's also shows the POS balance.\n\nShow \nThis displays the full transaction Done on the POS.", 
      displayOrder: 10 
    });

    await storage.createSubsection({ 
      sectionId: pos.id, 
      title: "F6 virtual 🔘", 
      content: "Coming soon", 
      displayOrder: 11 
    });

    // SECTION: WORK ETHICS
    const ethics = await storage.createSection({ title: "WORK ETHICS", slug: "work-ethics", displayOrder: 3 });
    await storage.createSubsection({
      sectionId: ethics.id,
      title: "Guidelines",
      content: "DAY SHIFT OPERATORS ARE EXPECTED TO BE IN THE BRANCH AS EARKY AS 7:00AM\nBRANCH SHOULD BE CLEAN,TIDY AND ONLINE AS AT 7:30AM.\nALL EQUIPMENTS MUST BE CHECKED DURING DAYBREAK INCLUDING THE INTERIORS AND EXTERIOR EQUIPMENTS.\nYOUR SLOTS MANCHINES SHOULD BE ONLINE AS EARLY AS POSSIBLE, BEST AT 7:30..\nCASHING OUT YOUR PRESENCE SHOULD BE DONE BEFORE 7:30 AM\nON NO ACCOUNT SHOULD A CUSTOMER BE FOUND SLEEPING INSIDE THE VIEWING CENTER..\nTHE DAY SHIFT OPERATORS REQUEST FOR FUEL WHEN THE GEN IS HALF TANK AND THERE'S NO RESERVE.\nPLAYING VIRTUAL,OR ANY GAMES AS AN OPERATOR ON DUTY IS PROHIBITED 🚫 \nSLEEPING/FIGHTING AT THE BRANCH IS STRICTLY PROHIBITED..\nDISRESPECTFUL ACTS TOWARDS YOUR COLLEAGUES,MANAGERS AND SUPERVISORS IS PROHIBITED.\nIF YOUR COLLEAGUES/SUPERIORS IS IN THE WRONG OR DOING SOMETHING BAD KINDLY REACH OUT TO THE CUSTOMER SUPPORT LINE 0800 009 009 009 FOR ASSISTANCE..\nTHE SHOP CASH MUST NOT GO ABOVE 250K UNLESS THERE'S A VALID REASON WHY.\nBEFORE CASHING OUT ANY MONEY ON THE POS, YOU MUST FIRST SEEK APPROVAL..\nBRANCH OPERATIONS CLOSED AT OR AFTER 11:30...\nTHE CUG PHONE LINE MUST NEVER LEAVE THE BRANCH...\nMISUSE OF COMPANY EQUIPMENTS IS A SERIOUS OFFENCE..\nNEGLIGENCE OF COMPANY EQUIPMENTS IS A SERIOUS OFFENCE..\nYOUR BALANCE ON YOUR POS AND INSIDE YOUR LOCKER MUST BE BALANCED AT ALL TIMES..\nANY MONEY SENT BUT NOT RECEIVED INTO THE POS IS NOT A DEPOSIT YET, so ONLY FUNDS SUCCESSFULLY CREDITED INTO THE OPAY DEVICE ARE TO BE PLAYED FOR CUSTOMERS.",
      displayOrder: 1
    });

    // SECTION: COMMON BRANCH ISSUES
    const issues = await storage.createSection({ title: "COMMON BRANCH ISSUES", slug: "branch-issues", displayOrder: 4 });
    await storage.createSubsection({
      sectionId: issues.id,
      title: "Troubleshooting",
      content: "WHEN A CUSTOMER IS NOT RECEIVING OTP.\nRestart the phone\nCheck if the SIM card number matches the number on the number on the account.\nCheck if the phone isn't on DND\nCheck if the phone storage isn't full\nIf all above process has been done and customer isn't receiving otp then you out pick up the CUG(the company phone inside the branch)and make report in the issue group.\n\nYou make a report like this\n\nFirst your branch name\nThe customer phone number \nThe customer service provider \nThe customer username \n\nThen state the issue.\n\n\nWHEN A TICKET FAILED TO PRINT OUT COMPLETELY ...\n\nYou make a report like this\nThe branch name\nThe POS id\nThe type of ticket (prematch or virtual)\nThe ticket id\nThe reason why the ticket failed to print out completely.(Pre match ticket failed to print out completely due to network 🛜 glitch kindly assist).\n\n\nWHEN THE NETWORK 🛜 AT THE BRANCH IS NOT STABLE \n\nYou make a report like this\nThe branch name\n\nThen you state the issue.(Branch is currently offline because the router at the branch isn't receiving network)\nKindly assist.\n\n\nWHEN A NEW ITEM IS PURCHASED AT THR BRANCH.\nYou take a picture of the purchasee item and the receipt if available and post it with description in the problem group.\n\n\nHOW TO SEND TO COLLECT\nThe operator on the main terminal prints out the collection by going to the To collect print it's out and send a report of the total cash, opay balance, and total balance available in the shop to his manager who sent it to the manager group.\n\n\nHOW TO CHECK TICKET THAT FAILED TO PRINT OUT..\n\n\nControl + alternate+p\n\n\nHOW TO LOG OUT\n\n\nAlternate+ F4",
      displayOrder: 1
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seedDatabase();

  app.get(api.sections.list.path, async (_req, res) => {
    const data = await storage.getSections();
    res.json(data);
  });

  app.get(api.sections.get.path, async (req, res) => {
    const data = await storage.getSectionBySlug(req.params.slug);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  });

  return httpServer;
}
