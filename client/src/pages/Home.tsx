import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
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
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 selection:bg-primary selection:text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center py-12 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-white">
              WELCOME TO <span className="text-primary">FORTEBET</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-medium tracking-wide uppercase">
              The Professional Knowledge Base
            </p>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
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
                <a className="group relative block p-8 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-[0.98]">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="p-3 bg-neutral-800 rounded-xl group-hover:bg-primary group-hover:text-black transition-colors duration-300 w-fit">
                        {getIcon(section.title)}
                      </div>
                      <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">
                        {section.title}
                      </h2>
                    </div>
                    <ArrowRight className="w-6 h-6 text-neutral-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </main>

        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center">
            <span className="w-2 h-6 bg-primary mr-3 rounded-full"></span>
            OPERATIONAL SHORTCUTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl border border-neutral-800">
              <span className="font-bold text-neutral-400 uppercase text-sm">Check failed print</span>
              <kbd className="px-3 py-1.5 bg-neutral-800 rounded-lg text-primary font-mono text-sm border border-neutral-700 shadow-inner">Ctrl + Alt + P</kbd>
            </div>
            <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl border border-neutral-800">
              <span className="font-bold text-neutral-400 uppercase text-sm">How to log out</span>
              <kbd className="px-3 py-1.5 bg-neutral-800 rounded-lg text-primary font-mono text-sm border border-neutral-700 shadow-inner">Alt + F4</kbd>
            </div>
          </div>
        </section>

        <footer className="text-center py-12 border-t border-neutral-900">
          <p className="text-neutral-600 text-sm font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} FORTEBET INTERNAL • PROPRIETARY INFORMATION
          </p>
        </footer>
      </div>
    </div>
  );
}
