import { useSections } from "@/hooks/use-sections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, AlertCircle, ShieldCheck, Banknote, Terminal, BookOpen, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: sections, isLoading, error } = useSections();

  // Helper to get icon based on title (simple heuristic)
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bonus")) return <Banknote className="w-6 h-6 mr-3 text-primary" />;
    if (t.includes("terminal") || t.includes("pos")) return <Terminal className="w-6 h-6 mr-3 text-primary" />;
    if (t.includes("ethics")) return <ShieldCheck className="w-6 h-6 mr-3 text-primary" />;
    if (t.includes("issues")) return <AlertCircle className="w-6 h-6 mr-3 text-primary" />;
    return <BookOpen className="w-6 h-6 mr-3 text-primary" />;
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full bg-gradient-to-r from-neutral-900 to-neutral-800 text-white shadow-xl">
        <div className="w-full max-w-lg mx-auto px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-primary px-3 py-1 rounded text-xs font-bold tracking-widest mb-4 shadow-lg shadow-primary/30">
              INTERNAL PORTAL
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-lg">
              Welcome to <span className="text-primary">Fortebet</span>
            </h1>
            <p className="mt-4 text-neutral-400 text-lg font-light tracking-wide max-w-sm mx-auto">
              Access your operational guidelines and branch resources.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto p-4 -mt-8">
        
        {/* State: Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg border border-neutral-100">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-neutral-500 font-medium animate-pulse">Loading resources...</p>
          </div>
        )}

        {/* State: Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-red-800 font-bold">Connection Error</h3>
                <p className="text-red-600 text-sm mt-1">
                  Unable to load sections. Please check your connection and try again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* State: Success */}
        {!isLoading && !error && sections && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {sections.length > 0 ? (
                sections
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <AccordionItem 
                        value={`item-${section.id}`} 
                        className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 overflow-hidden group"
                      >
                        <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-neutral-50/50">
                          <div className="flex items-center text-left">
                            <span className="bg-neutral-100 p-2 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                              {getIcon(section.title)}
                            </span>
                            <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-neutral-800 ml-2 group-hover:text-primary transition-colors">
                              {section.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 bg-neutral-50/30">
                          <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed text-base pt-2 border-t border-dashed border-neutral-200">
                            {section.content.split('\n').map((paragraph, i) => (
                              <p key={i} className="mb-2 last:mb-0">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-300">
                  <HelpCircle className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500 font-medium">No sections found.</p>
                </div>
              )}
            </Accordion>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-neutral-400 text-sm font-medium mt-auto border-t border-neutral-200 bg-white">
        <p>© {new Date().getFullYear()} Fortebet Internal. All rights reserved.</p>
      </footer>
    </div>
  );
}
