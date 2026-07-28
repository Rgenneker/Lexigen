import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetDailyWord,
  useGetStreak,
  useListBadges,
  useListJournalEntries,
  useCreateJournalEntry,
  useDeleteJournalEntry,
  useGetStatsSummary,
  useGetArchetype,
  useCheckIn,
  getListJournalEntriesQueryKey,
  getGetStreakQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Flame, Star, Trophy, BookOpen, Gamepad2, Trash2, Zap, Calendar, Brain, ChevronRight } from "lucide-react";

const LANGUAGE_CODES: Record<string, string> = {
  English: "en", Spanish: "es", Portuguese: "pt", French: "fr", German: "de",
  Dutch: "nl", Italian: "it", Arabic: "ar", Afrikaans: "af", Zulu: "zu",
  Xhosa: "xh", Farsi: "fa", Russian: "ru", "Bahasa Malay": "ms",
  Vietnamese: "vi", Tagalog: "tl", Japanese: "ja", Cantonese: "yue", "Chinese (Mandarin)": "zh"
};

const MOODS = ["determined", "curious", "hopeful", "reflective", "energetic", "calm", "playful"];

const WRONG_DEFS = [
  "To move quickly in an unexpected or erratic direction",
  "A type of tool used for measuring or cutting precise angles",
  "The quality of being extremely loud or difficult to ignore",
  "To express strong disagreement with an official decision",
  "Something that is very small or of little practical value",
  "The process of making something unnecessarily complicated",
  "A feeling of extreme sadness following a major loss",
  "To collect or gather scattered objects in one place",
  "A formal agreement between two parties to exchange services",
  "The state of being completely isolated from outside influence",
];

function DailyQuiz({ word, definition, partOfSpeech }: {
  word: string;
  definition: string;
  partOfSpeech: string;
}) {
  const todayKey = new Date().toISOString().split("T")[0];
  const storageKey = `lexigenz_quiz_${todayKey}`;
  const totalKey = "lexigenz_quizzes_total";

  type QuizState = {
    q1Answer: string | null;
    q2Answer: string | null;
    q3Text: string;
    q3SelfMark: boolean | null;
    completed: boolean;
    score: number;
  };

  const [quiz, setQuiz] = useState<QuizState>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : { q1Answer: null, q2Answer: null, q3Text: "", q3SelfMark: null, completed: false, score: 0 };
    } catch {
      return { q1Answer: null, q2Answer: null, q3Text: "", q3SelfMark: null, completed: false, score: 0 };
    }
  });

  const wrongDefs = useMemo(() => {
    return [...WRONG_DEFS].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [word]);

  const q1Options = useMemo(() => {
    const opts = [{ text: definition, correct: true }, ...wrongDefs.map(d => ({ text: d, correct: false }))];
    return opts.sort(() => Math.random() - 0.5);
  }, [definition, wrongDefs]);

  const actualPos = partOfSpeech.toLowerCase().split(/[\s,/]/)[0];
  const allPos = ["noun", "verb", "adjective", "adverb"];
  const q2Options = useMemo(() => {
    const correct = allPos.includes(actualPos) ? actualPos : "noun";
    const wrong = allPos.filter(p => p !== correct);
    return [correct, ...wrong].sort(() => Math.random() - 0.5);
  }, [actualPos]);

  const save = (newState: QuizState) => {
    setQuiz(newState);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  };

  const handleQ1 = (text: string) => {
    if (quiz.q1Answer !== null) return;
    save({ ...quiz, q1Answer: text });
  };

  const handleQ2 = (answer: string) => {
    if (quiz.q2Answer !== null) return;
    save({ ...quiz, q2Answer: answer });
  };

  const handleComplete = (selfMark: boolean) => {
    const correctPos = allPos.includes(actualPos) ? actualPos : "noun";
    const q1Score = quiz.q1Answer === definition ? 1 : 0;
    const q2Score = quiz.q2Answer === correctPos ? 1 : 0;
    const q3Score = selfMark ? 1 : 0;
    const total = q1Score + q2Score + q3Score;
    const newState: QuizState = { ...quiz, q3SelfMark: selfMark, completed: true, score: total };
    save(newState);
    const prev = parseInt(localStorage.getItem(totalKey) || "0", 10);
    localStorage.setItem(totalKey, String(prev + 1));
    window.dispatchEvent(new Event("lexigenz_quizzes_updated"));
  };

  if (quiz.completed) {
    const emoji = quiz.score === 3 ? "🎯" : quiz.score === 2 ? "✅" : quiz.score === 1 ? "📖" : "💡";
    const msg = quiz.score === 3 ? "Perfect score!" : quiz.score >= 2 ? "Great job!" : "Good effort - come back tomorrow!";
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-3">
        <div className="text-5xl">{emoji}</div>
        <p className="font-black text-xl">{quiz.score}/3 - {msg}</p>
        <p className="text-sm text-muted-foreground">New word quiz available tomorrow.</p>
        <div className="flex justify-center gap-2 pt-1">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
              i === 0 ? (quiz.q1Answer === definition ? "border-green-500 bg-green-500/10 text-green-600" : "border-destructive bg-destructive/10 text-destructive")
              : i === 1 ? (quiz.q2Answer === (allPos.includes(actualPos) ? actualPos : "noun") ? "border-green-500 bg-green-500/10 text-green-600" : "border-destructive bg-destructive/10 text-destructive")
              : (quiz.q3SelfMark ? "border-green-500 bg-green-500/10 text-green-600" : "border-destructive bg-destructive/10 text-destructive")
            }`}>
              {(i === 0 ? quiz.q1Answer === definition : i === 1 ? quiz.q2Answer === (allPos.includes(actualPos) ? actualPos : "noun") : quiz.q3SelfMark) ? "✓" : "✗"}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Q1: Definition */}
      <div className="space-y-3">
        <p className="text-sm font-bold">
          Q1. What does <span className="text-primary font-black">{word}</span> mean?
        </p>
        <div className="space-y-2">
          {q1Options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleQ1(opt.text)}
              disabled={quiz.q1Answer !== null}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-all leading-snug ${
                quiz.q1Answer !== null
                  ? opt.correct
                    ? "border-green-500 bg-green-500/10 text-green-700 font-medium"
                    : opt.text === quiz.q1Answer
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border opacity-40"
                  : "border-border hover:border-primary/40 hover:bg-primary/5 cursor-pointer"
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Part of speech - unlocks after Q1 */}
      <AnimatePresence>
        {quiz.q1Answer !== null && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-sm font-bold">
              Q2. What part of speech is <span className="text-primary font-black">{word}</span>?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {q2Options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleQ2(opt)}
                  disabled={quiz.q2Answer !== null}
                  className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                    quiz.q2Answer !== null
                      ? opt === (allPos.includes(actualPos) ? actualPos : "noun")
                        ? "border-green-500 bg-green-500/10 text-green-700"
                        : opt === quiz.q2Answer
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-border opacity-40"
                      : "border-border hover:border-primary/40 hover:bg-primary/5 cursor-pointer"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Q3: Use in sentence - unlocks after Q2 */}
      <AnimatePresence>
        {quiz.q2Answer !== null && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-sm font-bold">
              Q3. Use <span className="text-primary font-black">{word}</span> in your own sentence.
            </p>
            <textarea
              value={quiz.q3Text}
              onChange={e => save({ ...quiz, q3Text: e.target.value })}
              placeholder={`Write a sentence using "${word}"…`}
              className="w-full rounded-xl border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none min-h-[80px]"
            />
            {quiz.q3Text.trim().length >= 5 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Does your sentence use <strong>{word}</strong> correctly?</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleComplete(true)} className="rounded-full bg-green-600 hover:bg-green-700 font-bold text-xs">
                    ✅ Yes, it works
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleComplete(false)} className="rounded-full border-destructive text-destructive hover:bg-destructive/10 font-bold text-xs">
                    ❌ Not quite
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AppPage() {
  const [sentence, setSentence] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();
  const langCode = LANGUAGE_CODES[language] || "en";

  const birthDate = "1998-06-15";

  const [quizzesTaken, setQuizzesTaken] = useState(() =>
    parseInt(localStorage.getItem("lexigenz_quizzes_total") || "0", 10)
  );

  // Listen for quiz completions to update the stat live
  useState(() => {
    const handler = () => setQuizzesTaken(parseInt(localStorage.getItem("lexigenz_quizzes_total") || "0", 10));
    window.addEventListener("lexigenz_quizzes_updated", handler);
    return () => window.removeEventListener("lexigenz_quizzes_updated", handler);
  });

  const { data: dailyWord, isLoading: wordLoading } = useGetDailyWord(
    { language: langCode },
    { query: { queryKey: ["daily-word", langCode] } }
  );
  const { data: streak, isLoading: streakLoading } = useGetStreak();
  const { data: badges } = useListBadges();
  const { data: journalEntries } = useListJournalEntries();
  const { data: stats } = useGetStatsSummary();
  const { data: archetype } = useGetArchetype(
    { birthDate },
    { query: { queryKey: ["archetype", birthDate], enabled: true } }
  );

  const createEntry = useCreateJournalEntry();
  const deleteEntry = useDeleteJournalEntry();
  const checkIn = useCheckIn();

  const handleSaveEntry = () => {
    if (!sentence.trim() || !dailyWord?.word?.word) return;
    createEntry.mutate(
      { data: { word: dailyWord.word.word, sentence, mood: selectedMood || undefined } },
      {
        onSuccess: () => {
          setSentence("");
          setSelectedMood("");
          queryClient.invalidateQueries({ queryKey: getListJournalEntriesQueryKey() });
          toast({ title: "Saved to journal!", description: "Your sentence has been added." });
        },
      }
    );
  };

  const handleCheckIn = () => {
    checkIn.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetStreakQueryKey() });
        toast({ title: "Checked in!", description: "Your streak has been updated." });
      },
    });
  };

  const handleDeleteEntry = (id: number) => {
    deleteEntry.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListJournalEntriesQueryKey() });
        toast({ title: "Entry deleted." });
      },
    });
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
            <h1 className="text-4xl font-bold tracking-tighter mt-1">Your Daily Word</h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-lg">
              Learn the word · take today's quiz · write a sentence · play games. One word a day builds a vocabulary for life.
            </p>
          </div>
          <Button
            onClick={handleCheckIn}
            disabled={checkIn.isPending}
            className="rounded-full bg-accent hover:bg-accent/90 font-bold px-6 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            data-testid="button-check-in"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {checkIn.isPending ? "Checking in..." : "Check In Today"}
          </Button>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: "Streak",          value: stats?.currentStreak ?? "-",   icon: Flame,    color: "text-orange-400" },
            { label: "Words Learned",   value: stats?.wordsLearned ?? "-",    icon: BookOpen, color: "text-primary" },
            { label: "Badges",          value: stats?.badgesEarned ?? "-",    icon: Star,     color: "text-yellow-400" },
            { label: "Games Played",    value: stats?.gamesPlayed ?? "-",     icon: Gamepad2, color: "text-accent" },
            { label: "Journal Entries", value: stats?.journalEntries ?? "-",  icon: Zap,      color: "text-green-400" },
            { label: "Quizzes Taken",   value: quizzesTaken,                  icon: Brain,    color: "text-blue-400" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="p-4 rounded-2xl border border-border bg-card text-center"
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <s.icon className={`h-5 w-5 mx-auto mb-2 ${s.color}`} />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* World Championship promo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Link href="/bee/world-championship">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e0640] via-[#2d0a5e] to-[#130d3d] text-white px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:shadow-lg hover:shadow-violet-500/20 transition-all">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-fuchsia-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative flex items-center gap-4 min-w-0">
                <span className="text-3xl shrink-0">🌍</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80">World Championship 2027</p>
                  <p className="font-bold text-sm truncate">Global Spelling Bee · June 19 · 12:00 UTC</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    {Math.ceil((new Date("2027-06-19T12:00:00Z").getTime() - Date.now()) / 86400000)} days away · Registration open now
                  </p>
                </div>
              </div>
              <div className="relative shrink-0 bg-violet-500 hover:bg-violet-400 transition-colors rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap flex items-center gap-1.5">
                Register <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Word Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
          >
            {wordLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : dailyWord ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold uppercase tracking-widest mb-3">
                      Word of the Day
                    </Badge>
                    <h2
                      className="text-5xl md:text-6xl font-bold tracking-tighter"
                      data-testid="text-daily-word"
                    >
                      {dailyWord.word.word}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 font-mono">{dailyWord.word.partOfSpeech} · {dailyWord.word.difficulty}</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed" data-testid="text-definition">
                  {dailyWord.word.definition}
                </p>
                <blockquote className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
                  "{dailyWord.word.exampleSentence}"
                </blockquote>
              </div>
            ) : (
              <p className="text-muted-foreground">No word available today.</p>
            )}
          </motion.div>

          {/* Archetype Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl border border-border bg-card space-y-4"
          >
            <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/30 text-xs font-bold uppercase tracking-widest">
              Your Archetype
            </Badge>
            {archetype ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{archetype.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg leading-tight" data-testid="text-archetype-name">{archetype.name}</h3>
                    <div className="w-16 h-1 rounded-full mt-1" style={{ backgroundColor: archetype.color }} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{archetype.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Strengths</p>
                  <div className="flex flex-wrap gap-1.5">
                    {archetype.strengths.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Daily Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-blue-500/5 to-primary/5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-blue-400" />
            <h3 className="font-bold text-xl">Daily Quiz</h3>
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-400/30 text-[10px] font-bold uppercase tracking-widest ml-1">
              Today
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Three quick questions on <strong className="text-foreground">{dailyWord?.word?.word ?? "today's word"}</strong>.
            Quiz resets with each new daily word.
          </p>
          {wordLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : dailyWord ? (
            <DailyQuiz
              word={dailyWord.word.word}
              definition={dailyWord.word.definition}
              partOfSpeech={dailyWord.word.partOfSpeech}
            />
          ) : (
            <p className="text-sm text-muted-foreground">No word available for quiz today.</p>
          )}
        </motion.div>

        {/* Streak + Badges Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-orange-400" />
              <h3 className="font-bold text-lg">Streak</h3>
            </div>
            {streakLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : streak ? (
              <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold" data-testid="text-streak-count">{streak.currentStreak}</span>
                  <span className="text-muted-foreground mb-1.5">days</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((streak.currentStreak / streak.nextMilestone) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-orange-400 to-primary rounded-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {streak.currentStreak} / {streak.nextMilestone} days to next milestone · Longest: {streak.longestStreak} days
                </p>
              </div>
            ) : null}
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <h3 className="font-bold text-lg">Badges</h3>
            </div>
            {badges && badges.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {badges.map(badge => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/30"
                    title={badge.description}
                    data-testid={`badge-${badge.id}`}
                  >
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs font-semibold">{badge.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Check in daily to earn your first badge.</p>
            )}
          </motion.div>
        </div>

        {/* Sentence Builder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-8 rounded-3xl border border-border bg-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-xl">Sentence Builder</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Write a sentence using{" "}
            <strong className="text-foreground">{dailyWord?.word?.word ?? "today's word"}</strong>.
            This is the most powerful way to make a word yours.
          </p>

          {/* Mood selector */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">How are you feeling today?</p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map(mood => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood === selectedMood ? "" : mood)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedMood === mood
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-accent/30"
                  }`}
                  data-testid={`mood-${mood}`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder={`Use "${dailyWord?.word?.word ?? "the word"}" in a sentence that means something to you...`}
            value={sentence}
            onChange={e => setSentence(e.target.value)}
            className="rounded-xl mb-4 resize-none min-h-[100px]"
            data-testid="textarea-sentence"
          />
          <Button
            onClick={handleSaveEntry}
            disabled={!sentence.trim() || createEntry.isPending}
            className="rounded-full bg-primary hover:bg-primary/90 font-bold px-6"
            data-testid="button-save-sentence"
          >
            {createEntry.isPending ? "Saving..." : "Save to Journal"}
          </Button>
        </motion.div>

        {/* Journal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl border border-border bg-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-xl">Word Journal</h3>
          </div>
          {journalEntries && journalEntries.length > 0 ? (
            <div className="space-y-4">
              {journalEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-2xl border border-border hover:border-primary/30 transition-all group"
                  data-testid={`journal-entry-${entry.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">{entry.word}</span>
                        {entry.mood && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">{entry.mood}</span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">"{entry.sentence}"</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all flex-shrink-0"
                      data-testid={`button-delete-journal-${entry.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Your journal is empty.</p>
              <p className="text-sm mt-1">Write your first sentence above to start tracking your growth.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
