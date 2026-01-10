import { sections, type Section, type InsertSection } from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  getSections(): Promise<Section[]>;
  createSection(section: InsertSection): Promise<Section>;
}

export class DatabaseStorage implements IStorage {
  async getSections(): Promise<Section[]> {
    return await db.select().from(sections).orderBy(asc(sections.displayOrder));
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const [section] = await db
      .insert(sections)
      .values(insertSection)
      .returning();
    return section;
  }
}

export const storage = new DatabaseStorage();
