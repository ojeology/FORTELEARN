import { 
  sections, subsections, quizQuestions, leaderboard,
  type Section, type InsertSection, 
  type Subsection, type InsertSubsection, 
  type SectionWithSubsections,
  type QuizQuestion, type InsertQuizQuestion,
  type LeaderboardEntry, type InsertLeaderboardEntry
} from "@shared/schema";
import { db } from "./db";
import { eq, asc, desc, sql } from "drizzle-orm";

export interface IStorage {
  getSections(): Promise<Section[]>;
  getSectionBySlug(slug: string): Promise<SectionWithSubsections | undefined>;
  getSectionsWithSubsections(): Promise<SectionWithSubsections[]>;
  createSection(section: InsertSection): Promise<Section>;
  createSubsection(subsection: InsertSubsection): Promise<Subsection>;
  clearData(): Promise<void>;
  
  // Quiz
  getQuestionsByLevel(level: string): Promise<QuizQuestion[]>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  getLeaderboard(): Promise<LeaderboardEntry[]>;
  addToLeaderboard(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
}

export class DatabaseStorage implements IStorage {
  async getSections(): Promise<Section[]> {
    return await db.select().from(sections).orderBy(asc(sections.displayOrder));
  }

  async getSectionBySlug(slug: string): Promise<SectionWithSubsections | undefined> {
    const [section] = await db.select().from(sections).where(eq(sections.slug, slug));
    if (!section) return undefined;

    const subs = await db.select().from(subsections).where(eq(subsections.sectionId, section.id)).orderBy(asc(subsections.displayOrder));
    
    return {
      ...section,
      subsections: subs
    };
  }

  async getSectionsWithSubsections(): Promise<SectionWithSubsections[]> {
    const allSections = await db.select().from(sections).orderBy(asc(sections.displayOrder));
    const allSubsections = await db.select().from(subsections).orderBy(asc(subsections.displayOrder));
    
    return allSections.map(section => ({
      ...section,
      subsections: allSubsections.filter(sub => sub.sectionId === section.id)
    }));
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const [section] = await db.insert(sections).values(insertSection).returning();
    return section;
  }

  async createSubsection(insertSubsection: InsertSubsection): Promise<Subsection> {
    const [subsection] = await db.insert(subsections).values(insertSubsection).returning();
    return subsection;
  }

  async clearData(): Promise<void> {
    await db.delete(subsections);
    await db.delete(sections);
    await db.delete(quizQuestions);
  }

  async getQuestionsByLevel(level: string): Promise<QuizQuestion[]> {
    return await db.select().from(quizQuestions).where(eq(quizQuestions.level, level)).orderBy(sql`RANDOM()`);
  }

  async createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion> {
    const [res] = await db.insert(quizQuestions).values(question).returning();
    return res;
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    return await db.select().from(leaderboard).orderBy(desc(leaderboard.score)).limit(10);
  }

  async addToLeaderboard(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const [res] = await db.insert(leaderboard).values(entry).returning();
    return res;
  }
}

export const storage = new DatabaseStorage();
