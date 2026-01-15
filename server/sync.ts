import fs from "fs";
import path from "path";
import { storage } from "./storage";

async function syncFilesToDb() {
  const dataDir = path.resolve(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) return;

  const sections = fs.readdirSync(dataDir);

  for (const sectionSlug of sections) {
    const sectionPath = path.join(dataDir, sectionSlug);
    if (!fs.statSync(sectionPath).isDirectory()) continue;

    let section = await storage.getSectionBySlug(sectionSlug);
    if (!section) {
      section = await storage.createSection({
        title: sectionSlug.toUpperCase().replace(/-/g, " "),
        slug: sectionSlug,
        displayOrder: 1,
      });
    }

    const files = fs.readdirSync(sectionPath);
    for (const fileName of files) {
      if (!fileName.endsWith(".txt")) continue;

      const title = fileName.replace(".txt", "").replace(/-/g, " ");
      const content = fs.readFileSync(path.join(sectionPath, fileName), "utf-8");

      // Check if subsection already exists to update or create
      const sectionWithSubs = await storage.getSectionBySlug(sectionSlug);
      const existingSub = sectionWithSubs?.subsections?.find(s => s.title.toLowerCase() === title.toLowerCase());

      if (existingSub) {
        await storage.updateSubsection(existingSub.id, {
          content: content,
        });
      } else {
        await storage.createSubsection({
          sectionId: section!.id,
          title: title.charAt(0).toUpperCase() + title.slice(1),
          content: content,
          displayOrder: 1,
        });
      }
    }
  }
}

export { syncFilesToDb };
