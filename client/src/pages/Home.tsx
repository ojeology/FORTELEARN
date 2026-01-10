import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type SectionWithSubsections } from "@shared/schema";
import { motion } from "framer-motion";

export default function Home() {
  const { data: sections, isLoading } = useQuery<SectionWithSubsections[]>({
    queryKey: [api.sections.list.path],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center py-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-2"
          >
            WELCOME TO FORTEBET
          </motion.h1>
          <div className="h-2 w-24 bg-primary mx-auto rounded-full"></div>
        </header>

        <main className="space-y-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {sections?.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={`section-${section.id}`}
                className="border rounded-lg bg-card overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <span className="text-xl md:text-2xl font-bold text-left uppercase">{section.title}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {section.subsections && section.subsections.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-2 mt-2">
                      {section.subsections.map((sub) => (
                        <AccordionItem 
                          key={sub.id} 
                          value={`sub-${sub.id}`}
                          className="border rounded-md"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors">
                            <span className="text-lg font-semibold text-left">{sub.title}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <ScrollArea className="h-fit max-h-[60vh] pr-4">
                              <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                {sub.content}
                              </div>
                            </ScrollArea>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="py-4 text-muted-foreground italic text-center">
                      Content coming soon...
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <section className="bg-neutral-900 text-white rounded-lg p-6 shadow-xl border border-neutral-800">
            <h2 className="text-2xl font-black mb-4 tracking-tighter uppercase border-b border-neutral-700 pb-2 flex items-center">
              <span className="w-2 h-6 bg-primary mr-3 rounded-full"></span>
              Shortcuts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-md border border-neutral-700">
                <span className="font-bold text-neutral-400">Check failed print</span>
                <kbd className="px-2 py-1 bg-neutral-700 rounded text-primary font-mono text-sm">Ctrl + Alt + P</kbd>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-md border border-neutral-700">
                <span className="font-bold text-neutral-400">Logout</span>
                <kbd className="px-2 py-1 bg-neutral-700 rounded text-primary font-mono text-sm">Alt + F4</kbd>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center py-12 text-muted-foreground text-sm font-medium">
          &copy; {new Date().getFullYear()} FORTEBET. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
