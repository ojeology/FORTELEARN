import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type SectionWithSubsections } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  subTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export default function Quiz() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const { data: sections } = useQuery<SectionWithSubsections[]>({
    queryKey: ["/api/sections/full"], // Custom endpoint for all data
    queryFn: async () => {
      const res = await fetch("/api/sections");
      const list = await res.json();
      const full = await Promise.all(list.map(async (s: any) => {
        const detail = await fetch(`/api/sections/${s.slug}`);
        return detail.json();
      }));
      return full;
    }
  });

  useEffect(() => {
    if (sections) {
      const allQuestions: Question[] = [];
      sections.forEach(section => {
        section.subsections.forEach(sub => {
          allQuestions.push({
            id: Math.random(),
            subTitle: sub.title,
            question: `Which of these is correct about ${sub.title}?`,
            options: ["Option A", "Option B", "Option C"],
            correctIndex: Math.floor(Math.random() * 3)
          });
        });
      });
      setQuestions(allQuestions.sort(() => Math.random() - 0.5).slice(0, 10));
    }
  }, [sections]);

  const handleAnswer = (index: number) => {
    const isCorrect = index === questions[currentIndex].correctIndex;
    if (isCorrect) setScore(s => s + 1);

    toast({
      title: isCorrect ? "Correct ✅" : "Wrong ❌",
      variant: isCorrect ? "default" : "destructive",
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto space-y-12 pt-12">
        <header className="flex items-center justify-between">
          <Link href="/">
            <a className="inline-flex items-center text-neutral-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ChevronLeft className="w-4 h-4 mr-1" /> Quit
            </a>
          </Link>
          <div className="text-xs font-black tracking-widest text-neutral-500 uppercase">
            Question {currentIndex + 1} / {questions.length}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="text-xs font-bold text-orange-500 uppercase tracking-tighter">
                  {questions[currentIndex].subTitle}
                </div>
                <h2 className="text-3xl font-black tracking-tight leading-tight uppercase">
                  {questions[currentIndex].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentIndex].options.map((opt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => handleAnswer(i)}
                    className="h-16 border-neutral-800 bg-neutral-900/50 rounded-2xl hover:bg-neutral-800 transition-all font-bold uppercase tracking-widest text-xs justify-between px-6 group"
                  >
                    {opt}
                    <div className="w-6 h-6 rounded-full border border-neutral-700 group-hover:border-primary transition-colors" />
                  </Button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-12"
            >
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter uppercase">Test Complete</h2>
                <p className="text-neutral-500 font-bold uppercase tracking-widest">Your Score</p>
                <div className="text-8xl font-black text-orange-500">{score}/{questions.length}</div>
              </div>
              <Button asChild className="w-full h-16 rounded-full bg-orange-600 hover:bg-orange-500 font-black uppercase tracking-widest text-lg">
                <Link href="/">Back to Home</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
