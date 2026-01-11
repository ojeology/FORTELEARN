import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type QuizQuestion, type LeaderboardEntry } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, Trophy, Timer, User, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const LEVELS = ["Beginner", "Trainee", "Easy", "Medium", "Intermediate", "Hard", "Boss", "Legend", "World Class"];

export default function Quiz() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [revived, setRevived] = useState(false);

  const { data: leaderboard } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/quiz/leaderboard"],
  });

  const { data: questions, refetch: fetchQuestion } = useQuery<QuizQuestion[]>({
    queryKey: ["/api/quiz/questions", LEVELS[currentLevelIndex]],
    queryFn: async () => {
      const res = await fetch(`/api/quiz/questions/${LEVELS[currentLevelIndex]}`);
      return res.json();
    },
    enabled: gameStarted && !gameOver,
  });

  useEffect(() => {
    if (questions && questions.length > 0) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions]);

  const leaderboardMutation = useMutation({
    mutationFn: async (entry: { username: string; levelReached: string; score: number }) => {
      await apiRequest("POST", "/api/quiz/leaderboard", entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quiz/leaderboard"] });
    },
  });

  const handleStart = () => {
    if (!username.trim()) {
      toast({ title: "Please enter a username", variant: "destructive" });
      return;
    }
    setGameStarted(true);
  };

  const handleAnswer = (option: string) => {
    if (!currentQuestion) return;

    if (option === currentQuestion.correctAnswer) {
      toast({ title: "Correct!", variant: "default" });
      if (currentLevelIndex === LEVELS.length - 1) {
        finishGame(true);
      } else {
        setCurrentLevelIndex(prev => prev + 1);
      }
    } else {
      finishGame(false);
    }
  };

  const finishGame = (won: boolean) => {
    setGameOver(true);
    leaderboardMutation.mutate({
      username,
      levelReached: LEVELS[currentLevelIndex],
      score: currentLevelIndex + (won ? 1 : 0),
    });
  };

  const handleRevive = () => {
    setRevived(true);
    setGameOver(false);
    // Logic: restore progress by one level or stay at current
    toast({ title: "Revived! Continuing from " + LEVELS[currentLevelIndex] });
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-white p-6 flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-[#00B140] italic tracking-tighter">FORTEBET QUIZ</h1>
            <p className="text-neutral-400 uppercase tracking-widest text-sm">Millionaire Edition</p>
          </div>

          <div className="bg-[#2A2A2A] p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div className="flex items-center space-x-2 text-neutral-400 mb-2">
              <User className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Enter Contestant Name</span>
            </div>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="YOUR USERNAME"
              className="bg-black border-neutral-700 h-12 text-center font-bold uppercase tracking-widest"
            />
            <Button onClick={handleStart} className="w-full h-12 bg-[#00B140] hover:bg-[#009636] font-black uppercase tracking-widest rounded-xl shadow-lg">
              <Play className="w-4 h-4 mr-2" /> Start Quiz
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center justify-center">
              <Trophy className="w-3 h-3 mr-2" /> Hall of Fame
            </h2>
            <div className="bg-black/40 rounded-2xl border border-neutral-800 overflow-hidden">
              {leaderboard?.map((entry, i) => (
                <div key={entry.id} className="flex items-center justify-between p-3 border-b border-neutral-900 last:border-0">
                  <span className="text-neutral-500 font-bold w-6">{i + 1}</span>
                  <span className="flex-1 text-left font-bold uppercase text-sm truncate px-2">{entry.username}</span>
                  <span className="text-[#00B140] font-black text-xs uppercase">{entry.levelReached}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-6xl font-black text-red-600 italic">GAME OVER</h2>
            <p className="text-neutral-400 font-bold uppercase tracking-widest">You reached level</p>
            <div className="text-4xl font-black text-[#00B140]">{LEVELS[currentLevelIndex]}</div>
          </div>
          
          {!revived && (
            <Button onClick={handleRevive} variant="outline" className="w-full h-16 border-neutral-800 bg-neutral-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#00B140] transition-all">
              Watch Ad to Revive (Coming Soon)
            </Button>
          )}

          <Button asChild className="w-full h-16 bg-white text-black hover:bg-neutral-200 rounded-2xl font-black uppercase tracking-widest text-xs">
            <Link href="/"><RotateCcw className="w-4 h-4 mr-2" /> Main Menu</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex">
      {/* Level Ladder - Hidden on mobile */}
      <div className="hidden lg:flex flex-col w-64 bg-black/50 border-r border-neutral-800 p-8 space-y-2">
        {LEVELS.slice().reverse().map((lvl, i) => {
          const index = LEVELS.length - 1 - i;
          const isActive = index === currentLevelIndex;
          const isCompleted = index < currentLevelIndex;
          return (
            <div key={lvl} className={`p-3 rounded-lg font-bold uppercase text-xs transition-all ${isActive ? 'bg-[#00B140] text-white shadow-[0_0_20px_rgba(0,177,64,0.3)]' : isCompleted ? 'text-neutral-500' : 'text-neutral-700'}`}>
              {LEVELS.length - i}. {lvl}
            </div>
          );
        })}
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <header className="flex items-center justify-between mb-12">
          <Link href="/">
            <a className="text-neutral-500 hover:text-white transition-colors uppercase font-black tracking-widest text-[10px] flex items-center">
              <ChevronLeft className="w-3 h-3 mr-1" /> Quit Game
            </a>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-neutral-400 font-bold uppercase text-[10px] tracking-widest">
              <Timer className="w-3 h-3 mr-1" /> 00:30
            </div>
            <div className="bg-[#00B140] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {LEVELS[currentLevelIndex]}
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {currentQuestion ? (
              <motion.div key={currentQuestion.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full space-y-12">
                <h2 className="text-3xl md:text-4xl font-black text-center leading-tight uppercase italic">
                  {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((opt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => handleAnswer(opt)}
                      className="h-20 border-neutral-800 bg-[#2A2A2A] rounded-xl hover:border-[#00B140] hover:bg-[#00B140]/10 transition-all font-bold uppercase tracking-widest text-xs justify-start px-8 group relative overflow-hidden"
                    >
                      <span className="text-[#00B140] mr-4 font-black">{String.fromCharCode(65 + i)}:</span>
                      {opt}
                    </Button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-8 w-64 bg-neutral-800 rounded mx-auto" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-neutral-800 rounded-xl" />
                  <div className="h-20 bg-neutral-800 rounded-xl" />
                </div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
