import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  displayOrder: integer("display_order").notNull(),
});

export const subsections = pgTable("subsections", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  displayOrder: integer("display_order").notNull(),
});

export const insertSectionSchema = createInsertSchema(sections).omit({ id: true });
export const insertSubsectionSchema = createInsertSchema(subsections).omit({ id: true });

export type Section = typeof sections.$inferSelect;
export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Subsection = typeof subsections.$inferSelect;
export type InsertSubsection = z.infer<typeof insertSubsectionSchema>;

export type SectionWithSubsections = Section & {
  subsections: Subsection[];
};
