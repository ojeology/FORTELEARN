import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type SectionWithSubsections } from "@shared/schema";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Banknote, Terminal, ShieldCheck, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SectionDetails() {
  const { slug } = useParams();
  const { data: section, isLoading } = useQuery<SectionWithSubsections>({
    queryKey: [buildUrl(api.sections.get.path, { slug: slug! })],
  });

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bonus")) return <Banknote className="w-10 h-10 text-primary" />;
    if (t.includes("terminal") || t.includes("pos")) return <Terminal className="w-10 h-10 text-primary" />;
    if (t.includes("ethics")) return <ShieldCheck className="w-10 h-10 text-primary" />;
    if (t.includes("issues")) return <AlertCircle className="w-10 h-10 text-primary" />;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!section) return <div>Not found</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary selection:text-black">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12">
        <header className="space-y-6">
          <Link href="/">
            <a className="inline-flex items-center text-neutral-400 hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back to Portal
            </a>
          </Link>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl">
              {getIcon(section.title)}
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                {section.title}
              </h1>
              <div className="h-1.5 w-24 bg-primary mt-2 rounded-full"></div>
            </div>
          </motion.div>
        </header>

        <main className="pb-24">
          <Accordion type="multiple" className="w-full space-y-4">
            {section.subsections.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`sub-${sub.id}`}
                  className="border border-neutral-800 rounded-2xl bg-neutral-900 overflow-visible"
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-neutral-800/50 transition-all text-left">
                    <span className="text-xl md:text-2xl font-black tracking-tight uppercase">
                      {sub.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-8">
                    <div className="text-neutral-400 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                      {sub.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </main>
      </div>
    </div>
  );
}
