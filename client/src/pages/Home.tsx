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

  const getSectionColor = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bonus")) return "border-green-500/50 hover:bg-green-500/10 text-green-500";
    if (t.includes("terminal") || t.includes("pos")) return "border-blue-500/50 hover:bg-blue-500/10 text-blue-500";
    if (t.includes("ethics")) return "border-orange-500/50 hover:bg-orange-500/10 text-orange-500";
    if (t.includes("issues")) return "border-red-500/50 hover:bg-red-500/10 text-red-500";
    return "border-neutral-800 text-white";
  };

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bonus")) return <Banknote className="w-8 h-8" />;
    if (t.includes("terminal") || t.includes("pos")) return <Terminal className="w-8 h-8" />;
    if (t.includes("ethics")) return <ShieldCheck className="w-8 h-8" />;
    if (t.includes("issues")) return <AlertCircle className="w-8 h-8" />;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-neutral-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-neutral-900">
              FORTEBET <span className="text-primary">TRAINING</span>
            </h1>
            <p className="text-neutral-500 text-lg md:text-xl font-bold tracking-widest uppercase">
              Operational Excellence Portal
            </p>
          </motion.div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections?.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/section/${section.slug}`}>
                <a className={`group relative block p-8 bg-white border-2 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl active:scale-[0.98] ${getSectionColor(section.title)}`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className={`p-3 bg-neutral-100 rounded-xl group-hover:scale-110 transition-transform duration-300 w-fit`}>
                        {getIcon(section.title)}
                      </div>
                      <h2 className="text-3xl font-black tracking-tighter uppercase leading-none text-neutral-900">
                        {section.title}
                      </h2>
                    </div>
                    <ArrowRight className="w-6 h-6 text-neutral-300 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </main>

        <section className="bg-white border border-neutral-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center text-neutral-900">
            <span className="w-2 h-6 bg-primary mr-3 rounded-full"></span>
            OPERATIONAL SHORTCUTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="font-bold text-neutral-500 uppercase text-xs">Check failed print</span>
              <kbd className="px-3 py-1.5 bg-white rounded-lg text-primary font-mono text-xs border border-neutral-200 shadow-sm">Ctrl + Alt + P</kbd>
            </div>
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="font-bold text-neutral-500 uppercase text-xs">How to log out</span>
              <kbd className="px-3 py-1.5 bg-white rounded-lg text-primary font-mono text-xs border border-neutral-200 shadow-sm">Alt + F4</kbd>
            </div>
          </div>
        </section>

        <footer className="text-center py-12 border-t border-neutral-200">
          <p className="text-neutral-400 text-xs font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} FORTEBET INTERNAL • PROPRIETARY TRAINING MATERIAL
          </p>
        </footer>
      </div>
    </div>
  );
}
