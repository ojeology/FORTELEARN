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
    if (t.includes("bonus")) return <Banknote className="w-10 h-10 text-white" />;
    if (t.includes("terminal") || t.includes("pos")) return <Terminal className="w-10 h-10 text-white" />;
    if (t.includes("ethics")) return <ShieldCheck className="w-10 h-10 text-white" />;
    if (t.includes("issues")) return <AlertCircle className="w-10 h-10 text-white" />;
    return <Banknote className="w-10 h-10 text-white" />;
  };

  const getIconBg = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bonus")) return "bg-orange-600";
    if (t.includes("terminal") || t.includes("pos")) return "bg-blue-600";
    if (t.includes("ethics")) return "bg-green-600";
    if (t.includes("issues")) return "bg-red-600";
    return "bg-primary";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!section) return <div>Not found</div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <div className="max-w-xl mx-auto p-6 space-y-12">
        <header className="space-y-6">
          <Link href="/">
            <a className="inline-flex items-center text-neutral-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </a>
          </Link>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ${getIconBg(section.title)}`}>
              {getIcon(section.title)}
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              {section.title}
            </h1>
          </motion.div>
        </header>

        <main className="pb-32">
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
                  className="border border-neutral-800 rounded-3xl bg-neutral-900/50 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-neutral-800 transition-all text-left">
                    <span className="text-lg font-black tracking-tight uppercase">
                      {sub.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="text-neutral-400 text-sm leading-relaxed whitespace-pre-wrap font-medium">
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
