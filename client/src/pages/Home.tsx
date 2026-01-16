import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type Section } from "@shared/schema";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Banknote, Terminal, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const { data: sections, isLoading } = useQuery<Section[]>({
    queryKey: [api.sections.list.path],
  });

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bonus")) return <Banknote className="w-6 h-6 text-white" />;
    if (t.includes("terminal") || t.includes("pos")) return <Terminal className="w-6 h-6 text-white" />;
    if (t.includes("ethics")) return <ShieldCheck className="w-6 h-6 text-white" />;
    if (t.includes("issues")) return <AlertCircle className="w-6 h-6 text-white" />;
    return <Banknote className="w-6 h-6 text-white" />;
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

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans selection:bg-primary selection:text-black">
      <div className="max-w-xl mx-auto space-y-12 pt-12">
        <header className="space-y-4">
          <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
            Understand our bonuses, rules, and work ethics to become a better agent.
          </p>
          <h1 className="text-4xl font-black tracking-tight leading-none uppercase">
            FORTEBET<br />BONUSES
          </h1>
        </header>

        <main className="space-y-4">
          {sections?.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/section/${section.slug}`}>
                <a className="group block p-6 bg-neutral-900/50 border border-neutral-800 rounded-3xl hover:bg-neutral-800 transition-all active:scale-[0.98]">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${getIconBg(section.title)}`}>
                      {getIcon(section.title)}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-black uppercase tracking-tight">
                        {section.title}
                      </h2>
                      <p className="text-neutral-500 text-sm font-medium line-clamp-2">
                        View details and training material for {section.title.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </main>

        <div className="fixed bottom-12 left-0 right-0 px-6 max-w-xl mx-auto pointer-events-none">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="pointer-events-auto"
          >
            <Link href="/quiz">
              <a className="flex items-center justify-center gap-3 w-full py-5 bg-orange-600 rounded-full shadow-[0_0_30px_rgba(234,88,12,0.5)] hover:shadow-[0_0_40px_rgba(234,88,12,0.7)] hover:bg-orange-500 transition-all duration-300 group">
                <span className="text-lg font-black uppercase tracking-widest">Take the Test</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </motion.div>
        </div>

        <footer className="text-center pt-12 pb-32 border-t border-neutral-900">
          <p className="text-neutral-700 text-[10px] font-black tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} FORTEBET INTERNAL • PROPRIETARY
          </p>
        </footer>
      </div>
    </div>
  );
}
