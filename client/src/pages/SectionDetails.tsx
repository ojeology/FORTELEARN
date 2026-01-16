import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type SectionWithSubsections } from "@shared/schema";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Banknote, Terminal, ShieldCheck, AlertCircle, Clock, Lightbulb, PlayCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SectionDetails() {
  const { slug } = useParams();
  const { data: section, isLoading } = useQuery<SectionWithSubsections>({
    queryKey: [buildUrl(api.sections.get.path, { slug: slug! })],
  });

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bonus")) return <Banknote className="w-8 h-8 text-white" />;
    if (t.includes("terminal") || t.includes("pos")) return <Terminal className="w-8 h-8 text-white" />;
    if (t.includes("ethics")) return <ShieldCheck className="w-8 h-8 text-white" />;
    if (t.includes("issues")) return <AlertCircle className="w-8 h-8 text-white" />;
    return <Banknote className="w-8 h-8 text-white" />;
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
      {/* Navigation Header */}
      <header className="border-b border-neutral-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-xl mx-auto p-6 flex items-center justify-between gap-4">
          <Link href="/">
            <a className="inline-flex items-center text-neutral-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs" data-testid="link-back">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Training
            </a>
          </Link>
          <div className="text-right">
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none flex items-center justify-end gap-2" data-testid="text-module-title">
              <span className={`p-1.5 rounded-lg ${getIconBg(section.title)}`}>
                {getIcon(section.title)}
              </span>
              {section.title}
            </h1>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" /> Estimated time: 15 minutes
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6 space-y-12 pb-32">
        <div className="space-y-8">
          {section.subsections.map((sub, index) => (
            <motion.section
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-black tracking-tight uppercase border-l-4 border-primary pl-4" data-testid={`text-subsection-title-${sub.id}`}>
                {sub.title}
              </h2>
              <div className="text-neutral-400 text-base leading-relaxed whitespace-pre-wrap font-medium overflow-visible" data-testid={`text-subsection-content-${sub.id}`}>
                {sub.content}
              </div>

              {index === 0 && (
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex gap-4 items-start" data-testid="container-pro-tip">
                  <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div className="text-sm">
                    <strong className="text-primary uppercase tracking-wider block mb-1">Pro Tip</strong>
                    <p className="text-neutral-300">Always explain training details clearly to build trust with customers.</p>
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>

        {/* Quiz Section */}
        <div className="border border-neutral-800 rounded-3xl p-8 bg-neutral-900/50 text-center space-y-6" data-testid="section-quiz">
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase tracking-tight">Ready to Test Your Knowledge?</h3>
            <p className="text-neutral-500 text-sm">Complete this quiz to earn your completion certificate!</p>
          </div>
          <Link href="/quiz">
            <a className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary rounded-full hover:bg-primary/90 transition-all group w-full sm:w-auto" data-testid="link-take-quiz">
              <PlayCircle className="w-6 h-6" />
              <span className="text-lg font-black uppercase tracking-widest">Take Module Quiz</span>
            </a>
          </Link>
        </div>
      </main>

      <footer className="text-center py-12 border-t border-neutral-900">
        <p className="text-neutral-700 text-[10px] font-black tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} FORTEBET TRAINING PORTAL • PROPRIETARY
        </p>
      </footer>
    </div>
  );
}
