import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetWordleWord, useGetLexigenWord, useListGameScores, useSubmitGameScore, getListGameScoresQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Timer, Gamepad2, RotateCcw, Volume2, Star, Crown, Lock, BookOpen, Info, LogOut, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";
import { InteractiveCategoryBrowser } from "@/components/InteractiveCategoryBrowser";
import { WORDLE_WORDS, SPELLING_BEE_WORDS, SPELLING_BEE_ADVANCED_WORDS, SPELLING_BEE_BEGINNER_WORDS, SPELLING_BEE_LOWER_INTERMEDIATE_WORDS } from "@/data/wordBank";
import { ScrabbleGame } from "@/components/games/ScrabbleGame";
import { CrosswordGame } from "@/components/games/CrosswordGame";
import { WordGridGame } from "@/components/games/WordGridGame";
import { PaymentModal } from "@/components/PaymentModal";

const BROWSE_CATEGORIES = [
  {
    id: "emotions",
    labelKey: "play.categoryEmotions",
    label: "Emotion vocabulary",
    words: ["joy","sorrow","anger","fear","surprise","disgust","trust","anticipation","melancholy","elated","anxious","serene","frustrated","euphoric","despondent","apprehensive","jubilant","forlorn","exhilarated","dejected","resentful","compassion","empathy","nostalgia","gratitude","remorse","envy","pride","shame","awe","contempt","longing","tranquil","agitated","ecstatic","wistful","indignant","content","bewildered","optimistic","grief","admiration","regret","tenderness","anguish","serenity","elation","dread","hope","affection"],
  },
  {
    id: "business",
    labelKey: "play.categoryBusiness",
    label: "Business vocabulary",
    words: ["accountability","acquisition","agility","analytics","benchmark","capital","catalyst","collaborate","competitive","compliance","deliverable","differentiation","disruptive","ecosystem","efficiency","engagement","entrepreneur","equity","execution","forecast","framework","governance","growth","implementation","incentive","innovation","leadership","leverage","margin","metrics","milestone","monetize","negotiation","optimization","performance","pipeline","portfolio","productivity","profitability","revenue","roadmap","scalability","stakeholder","strategy","sustainability","synergy","traction","transformation","transparency","venture"],
  },
  {
    id: "academic",
    labelKey: "play.categoryAcademic",
    label: "Academic words",
    words: ["abstract","analysis","annotation","argument","assertion","bibliography","causation","citation","classification","coherence","commentary","conceptual","conclusion","contradiction","critical","critique","deduction","dialectic","discourse","empirical","epistemology","evaluate","evidence","exemplify","extrapolate","fallacy","generalization","hypothesis","implication","inductive","inference","interpretation","juxtaposition","methodology","narrative","ontology","paradigm","pedagogy","perspective","phenomenon","philosophy","premise","rationale","refute","rhetoric","synthesis","theoretical","thesis","variable","verification"],
  },
  {
    id: "advanced",
    labelKey: "play.categoryAdvanced",
    label: "Advanced English",
    words: ["aberrant","abeyance","abstruse","acrimony","acumen","alacrity","ameliorate","anomalous","apathy","aplomb","arduous","astute","austere","belligerent","byzantine","callous","capricious","cogent","convoluted","copious","corroborate","culpable","cynical","dearth","debilitate","diligent","discern","disparate","equanimity","erudite","esoteric","fastidious","fortitude","garrulous","grandiloquent","hapless","hegemony","hubris","iconoclast","immutable","implacable","indefatigable","insidious","intractable","laconic","loquacious","magnanimous","mendacity","mercurial","meticulous","obtuse","onerous","ostracize","parsimony","pedantic","perspicacious","pragmatic","querulous","recalcitrant","reticent","sagacious","sardonic","sycophant","taciturn","tenacious","ubiquitous","vacillate","vehement","venerable","verbose"],
  },
];

function getLetterColor(letter: string, position: number, answer: string, guess: string): "correct" | "present" | "absent" {
  if (answer[position] === letter) return "correct";
  if (answer.includes(letter)) return "present";
  return "absent";
}

function WordleGame({ onScore }: { onScore: (score: number) => void }) {
  const { t } = useTranslation();
  const [wordEntry] = useState(() => WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)]);
  const answer = wordEntry.word;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const MAX = 6;

  const handleKey = (key: string) => {
    if (gameState !== "playing") return;
    if (key === "ENTER") {
      if (current.length !== 5) return;
      const newGuesses = [...guesses, current];
      setGuesses(newGuesses);
      if (current === answer) {
        setGameState("won");
        const score = Math.max(100, 600 - newGuesses.length * 100);
        onScore(score);
      } else if (newGuesses.length >= MAX) {
        setGameState("lost");
      }
      setCurrent("");
    } else if (key === "BACKSPACE") {
      setCurrent(c => c.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && current.length < 5) {
      setCurrent(c => c + key);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKey(e.key.toUpperCase());
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, guesses, gameState]);

  const KEYBOARD = [["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["ENTER","Z","X","C","V","B","N","M","BACKSPACE"]];

  const usedLetters: Record<string, string> = {};
  guesses.forEach(g => g.split("").forEach((l, i) => {
    const status = getLetterColor(l, i, answer, g);
    if (!usedLetters[l] || status === "correct") usedLetters[l] = status;
  }));

  return (
    <div className="space-y-4">
      <div className="grid gap-1.5 justify-center">
        {Array.from({ length: MAX }).map((_, row) => {
          const guess = row < guesses.length ? guesses[row] : row === guesses.length ? current : "";
          return (
            <div key={row} className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, col) => {
                const letter = guess[col] || "";
                const isRevealed = row < guesses.length;
                const color = isRevealed ? getLetterColor(letter, col, answer, guess) : null;
                return (
                  <motion.div
                    key={col}
                    animate={isRevealed ? { rotateX: [0, 90, 0] } : {}}
                    transition={{ delay: col * 0.08 }}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-lg font-mono transition-all ${
                      color === "correct" ? "bg-green-500 border-green-500 text-white"
                      : color === "present" ? "bg-yellow-500 border-yellow-500 text-white"
                      : color === "absent" ? "bg-muted border-muted text-muted-foreground"
                      : letter ? "border-primary/50 bg-card" : "border-border bg-card"
                    }`}
                    data-testid={`wordle-cell-${row}-${col}`}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {gameState !== "playing" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className={`text-center font-bold py-3 rounded-xl ${gameState === "won" ? "bg-green-500/10 text-green-500 border border-green-500/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}>
              {gameState === "won" ? `${t("play.brilliant")} ${t("play.answer")} ${answer}` : `${t("play.answer")} ${answer}`}
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wide">
                <BookOpen className="w-3.5 h-3.5" /> {answer}
              </div>
              <p className="text-sm text-foreground font-medium">{wordEntry.meaning}</p>
              <p className="text-xs text-muted-foreground italic">"{wordEntry.usage}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="space-y-1.5">
        {KEYBOARD.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map(key => (
              <button key={key === "ENTER" ? t("play.keyEnter") : key === "BACKSPACE" ? t("play.keyBackspace") : key} onClick={() => handleKey(key)} className={`h-10 rounded-lg font-bold text-xs font-mono transition-colors ${key.length > 1 ? "px-3" : "w-8"} ${usedLetters[key] === "correct" ? "bg-green-500 text-white" : usedLetters[key] === "present" ? "bg-yellow-500 text-white" : usedLetters[key] === "absent" ? "bg-muted text-muted-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`} data-testid={`wordle-key-${key === "ENTER" ? t("play.keyEnter") : key === "BACKSPACE" ? t("play.keyBackspace") : key}`}>
                {key === "ENTER" ? t("play.keyEnter") : key === "BACKSPACE" ? t("play.keyBackspace") : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEXIGENZ GAME ────────────────────────────────────────────
function LexigenGame({ onScore }: { onScore: (score: number) => void }) {
  const { t } = useTranslation();
  const { data: gameData, isLoading } = useGetLexigenWord();
  const [letters, setLetters] = useState<{ char: string; used: boolean }[]>([]);
  const [formed, setFormed] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (gameData && gameState === "playing") {
      setLetters(gameData.letters.map(c => ({ char: c, used: false })));
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current!); setGameState("lost"); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameData]);

  const handlePickLetter = (idx: number) => {
    if (gameState !== "playing" || letters[idx].used) return;
    const newLetters = [...letters];
    newLetters[idx] = { ...newLetters[idx], used: true };
    setLetters(newLetters);
    const newFormed = [...formed, letters[idx].char];
    setFormed(newFormed);
    if (gameData && newFormed.join("") === gameData.targetWord) {
      clearInterval(timerRef.current!);
      setGameState("won");
      onScore(Math.floor(timeLeft * 10));
    }
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (gameData) setLetters(gameData.letters.map(c => ({ char: c, used: false })));
    setFormed([]);
  };

  if (isLoading) return <div className="text-center py-8 text-muted-foreground">{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className={`font-mono font-bold text-lg ${timeLeft < 5 ? "text-destructive" : ""}`}>
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
        <button onClick={handleReset} className="text-muted-foreground hover:text-foreground transition-colors">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{t("play.spellTheWord")}</p>
        <div className="flex justify-center gap-2">
          {Array.from({ length: gameData?.targetWord.length ?? 7 }).map((_, i) => (
            <div key={i} className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg font-mono transition-all ${formed[i] ? gameState === "won" ? "border-green-500 bg-green-500/10 text-green-500" : "border-primary bg-primary/10 text-primary" : "border-border"}`} data-testid={`lexigen-slot-${i}`}>
              {formed[i] || ""}
            </div>
          ))}
        </div>
        {gameData?.hint && <p className="text-xs text-muted-foreground mt-2">{t("play.hint")} {gameData.hint}</p>}
      </div>
      <div className="flex justify-center flex-wrap gap-2">
        {letters.map((l, i) => (
          <button key={i} onClick={() => handlePickLetter(i)} disabled={l.used || gameState !== "playing"} className={`w-12 h-12 rounded-xl border-2 font-bold text-lg font-mono transition-all ${l.used ? "border-border bg-muted text-muted-foreground opacity-30" : "border-primary/40 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary hover:scale-105 active:scale-95"}`} data-testid={`lexigen-tile-${i}`}>
            {l.char}
          </button>
        ))}
      </div>
      {formed.length > 0 && gameState === "playing" && (
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => {
            const last = formed[formed.length - 1];
            const li = letters.map((l, i) => l.used && l.char === last ? i : -1).filter(i => i >= 0).pop();
            if (li !== undefined && li >= 0) { const nl = [...letters]; nl[li] = { ...nl[li], used: false }; setLetters(nl); }
            setFormed(f => f.slice(0, -1));
          }}>{t("play.undo")}</Button>
        </div>
      )}
      <AnimatePresence>
        {gameState !== "playing" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`text-center py-4 rounded-xl font-bold ${gameState === "won" ? "bg-green-500/10 text-green-500 border border-green-500/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}>
            {gameState === "won" ? t("play.nailedIt", { seconds: 15 - timeLeft }) : `${t("play.answer")} ${gameData?.targetWord}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SPELLING BEE TYPES ────────────────────────────────────────
type BadgeMilestone = { streak: number; name: string; nameKey: string; emoji: string; color: string };
type WordEntry = { word: string; meaning: string; usage: string };

// ─── SPELLING BEE LEVELS ──────────────────────────────────────
const SPELLING_BEE_LEVELS = [
  {
    id: "beginner",
    name: "Beginner",
    emoji: "🌱",
    tag: "Grade 1–5",
    tagline: "Simple, everyday vocabulary for young learners",
    timerSeconds: 45,
    targetWords: 100,
    premium: false,
    certificateLabel: "Beginner Spelling Bee",
    wordPool: SPELLING_BEE_BEGINNER_WORDS,
    badges: [
      { streak: 5,  name: "Word Seedling", nameKey: "play.beeBadge.wordSeedling",      emoji: "🌱🐝", color: "text-green-600 bg-green-500/10 border-green-400/30" },
      { streak: 10, name: "Word Sprout", nameKey: "play.beeBadge.wordSprout",         emoji: "🌿🐝", color: "text-emerald-600 bg-emerald-500/10 border-emerald-400/30" },
      { streak: 15, name: "Word Grower", nameKey: "play.beeBadge.wordGrower",         emoji: "🌻🐝", color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 20, name: "Word Bloomer", nameKey: "play.beeBadge.wordBloomer",        emoji: "🌸🐝", color: "text-pink-600 bg-pink-500/10 border-pink-400/30" },
      { streak: 25, name: "Word Blossomer", nameKey: "play.beeBadge.wordBlossomer",      emoji: "🏅🐝", color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 30, name: "Young Bee Champion", nameKey: "play.beeBadge.youngBeeChampion",  emoji: "🏆🐝", color: "text-amber-600 bg-amber-500/10 border-amber-400/30" },
    ] as BadgeMilestone[],
  },
  {
    id: "lower-intermediate",
    name: "Lower Intermediate",
    emoji: "📘",
    tag: "Grade 6–10",
    tagline: "Expanding vocabulary for middle and high school learners",
    timerSeconds: 35,
    targetWords: 100,
    premium: false,
    certificateLabel: "Lower Intermediate Spelling Bee",
    wordPool: SPELLING_BEE_LOWER_INTERMEDIATE_WORDS,
    badges: [
      { streak: 5,  name: "Bee Apprentice", nameKey: "play.beeBadge.beeApprentice", emoji: "🐝",    color: "text-amber-600 bg-amber-500/10 border-amber-400/30" },
      { streak: 10, name: "Bee Scholar", nameKey: "play.beeBadge.beeScholar",    emoji: "📚🐝",  color: "text-blue-600 bg-blue-500/10 border-blue-400/30" },
      { streak: 15, name: "Bee Expert", nameKey: "play.beeBadge.beeExpert",     emoji: "🌟🐝",  color: "text-purple-600 bg-purple-500/10 border-purple-400/30" },
      { streak: 20, name: "Bee Master", nameKey: "play.beeBadge.beeMaster",     emoji: "🏆🐝",  color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 25, name: "Bee Legend", nameKey: "play.beeBadge.beeLegend",     emoji: "👑🐝",  color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 30, name: "Bee Supreme", nameKey: "play.beeBadge.beeSupreme",    emoji: "⚡🐝",  color: "text-rose-600 bg-rose-500/10 border-rose-400/30" },
    ] as BadgeMilestone[],
  },
  {
    id: "upper-intermediate",
    name: "Upper Intermediate",
    emoji: "📗",
    tag: "Grade 11–12",
    tagline: "Advanced vocabulary for senior learners and Matric preparation",
    timerSeconds: 30,
    targetWords: 100,
    premium: true,
    certificateLabel: "Upper Intermediate Spelling Bee",
    wordPool: SPELLING_BEE_WORDS,
    badges: [
      { streak: 5,  name: "Bee Apprentice", nameKey: "play.beeBadge.beeApprentice", emoji: "🐝",    color: "text-amber-600 bg-amber-500/10 border-amber-400/30" },
      { streak: 10, name: "Bee Scholar", nameKey: "play.beeBadge.beeScholar",    emoji: "📚🐝",  color: "text-blue-600 bg-blue-500/10 border-blue-400/30" },
      { streak: 15, name: "Bee Expert", nameKey: "play.beeBadge.beeExpert",     emoji: "🌟🐝",  color: "text-purple-600 bg-purple-500/10 border-purple-400/30" },
      { streak: 20, name: "Bee Master", nameKey: "play.beeBadge.beeMaster",     emoji: "🏆🐝",  color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 25, name: "Bee Legend", nameKey: "play.beeBadge.beeLegend",     emoji: "👑🐝",  color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 30, name: "Bee Supreme", nameKey: "play.beeBadge.beeSupreme",    emoji: "⚡🐝",  color: "text-rose-600 bg-rose-500/10 border-rose-400/30" },
    ] as BadgeMilestone[],
  },
  {
    id: "proficient",
    name: "Proficient",
    emoji: "🎓",
    tag: "College & University",
    tagline: "Rare, sophisticated vocabulary for advanced learners",
    timerSeconds: 25,
    targetWords: 50,
    premium: true,
    certificateLabel: "Proficient Spelling Bee",
    wordPool: SPELLING_BEE_ADVANCED_WORDS,
    badges: [
      { streak: 5,  name: "Lexicographer I", nameKey: "play.beeBadge.lexicographerI",   emoji: "🔬🐝", color: "text-teal-600 bg-teal-500/10 border-teal-400/30" },
      { streak: 10, name: "Lexicographer II", nameKey: "play.beeBadge.lexicographerII",  emoji: "📖🐝", color: "text-indigo-600 bg-indigo-500/10 border-indigo-400/30" },
      { streak: 15, name: "Lexicographer III", nameKey: "play.beeBadge.lexicographerIII", emoji: "🎓🐝", color: "text-purple-600 bg-purple-500/10 border-purple-400/30" },
      { streak: 20, name: "Word Architect", nameKey: "play.beeBadge.wordArchitect",    emoji: "🏛️🐝", color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 25, name: "Grand Lexicon", nameKey: "play.beeBadge.grandLexicon",     emoji: "👑🐝", color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 30, name: "Etymologist Rex", nameKey: "play.beeBadge.etymologistRex",   emoji: "⚡🐝", color: "text-rose-600 bg-rose-500/10 border-rose-400/30" },
    ] as BadgeMilestone[],
  },
];

function Row({ label, value, bad }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={bad ? "text-destructive font-semibold" : "text-foreground"}>{value}</span>
    </div>
  );
}

// ─── SPELLING BEE CORE ────────────────────────────────────────
function SpellingBeeCore({
  wordPool,
  levelName,
  levelEmoji,
  timerSeconds,
  targetWords,
  badges,
  certificateLabel,
  onScore,
  onExit,
}: {
  wordPool: WordEntry[];
  levelName: string;
  levelEmoji: string;
  timerSeconds: number;
  targetWords: number;
  badges: BadgeMilestone[];
  certificateLabel: string;
  onScore: (score: number) => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const [shuffled] = useState(() => [...wordPool].sort(() => Math.random() - 0.5));
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [timerStarted, setTimerStarted] = useState(false);
  const [phase, setPhase] = useState<"ready" | "active" | "result">("ready");
  const [result, setResult] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [earnedStreaks, setEarnedStreaks] = useState<number[]>([]);
  const [newBadge, setNewBadge] = useState<BadgeMilestone | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showDiag, setShowDiag] = useState(false);
  const [diagVoices, setDiagVoices] = useState<SpeechSynthesisVoice[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Populate available TTS voices (browsers load them async)
  useEffect(() => {
    const load = () => setDiagVoices(window.speechSynthesis?.getVoices() ?? []);
    load();
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  const currentWord = shuffled[wordIdx % shuffled.length];
  const earnedBadges = badges.filter(m => earnedStreaks.includes(m.streak));

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    return () => { stopTimer(); window.speechSynthesis?.cancel(); };
  }, [stopTimer]);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    setTimerStarted(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { stopTimer(); setResult("timeout"); setPhase("result"); setStreak(0); return 0; }
        return t - 1;
      });
    }, 1000);
  }, [stopTimer]);

  // AudioContext ref - unlocking it on gesture satisfies mobile autoplay policy
  const audioCtxRef = useRef<AudioContext | undefined>(undefined);
  const [audioBlocked, setAudioBlocked] = useState(false);

  const unlockAudioContext = useCallback(() => {
    if (typeof AudioContext === "undefined") return;
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") void ctx.resume();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  }, []);

  // Advance the game phase after audio has played (or failed)
  const advanceAfterAudio = useCallback(() => {
    setIsSpeaking(false);
    setPhase("active");
    startTimer();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [startTimer]);

  // Fallback: speechSynthesis when HTML5 Audio fails
  const speakWithSynthesis = useCallback(() => {
    if (!window.speechSynthesis) { advanceAfterAudio(); return; }
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    const utterance = new SpeechSynthesisUtterance(currentWord.word.toLowerCase());
    utterance.rate = 0.75;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    const fallback = setTimeout(advanceAfterAudio, Math.max(2000, currentWord.word.length * 200));
    utterance.onend = () => { clearTimeout(fallback); advanceAfterAudio(); };
    utterance.onerror = () => { clearTimeout(fallback); advanceAfterAudio(); };
    window.speechSynthesis.speak(utterance);
  }, [currentWord.word, advanceAfterAudio]);

  const playWord = useCallback(() => {
    if (isSpeaking || phase === "result") return;

    // Unlock AudioContext synchronously inside the user gesture
    unlockAudioContext();
    setAudioBlocked(false);
    setIsSpeaking(true);

    // Primary: HTML5 Audio via server-proxied TTS (works on all mobile browsers)
    const audio = new Audio(`/api/tts?word=${encodeURIComponent(currentWord.word.toLowerCase())}`);
    audio.preload = "auto";

    audio.play()
      .then(() => {
        console.log("Audio playing successfully!");
        audio.onended = advanceAfterAudio;
        // Safety fallback if onended never fires (e.g. very short clip)
        const guard = setTimeout(advanceAfterAudio, Math.max(3000, currentWord.word.length * 250));
        audio.onended = () => { clearTimeout(guard); advanceAfterAudio(); };
      })
      .catch(() => {
        // Autoplay blocked - show unmute overlay and try speechSynthesis
        setAudioBlocked(true);
        setIsSpeaking(false);
        speakWithSynthesis();
      });
  }, [currentWord.word, isSpeaking, phase, unlockAudioContext, advanceAfterAudio, speakWithSynthesis]);

  const handleSubmit = useCallback(() => {
    if (phase !== "active" || !timerStarted) return;
    const answer = typed.trim().toUpperCase();
    if (!answer) return;
    stopTimer();
    const isCorrect = answer === currentWord.word;
    if (isCorrect) {
      const newStreak = streak + 1;
      const newTotal = totalCorrect + 1;
      setStreak(newStreak);
      setTotalCorrect(newTotal);
      setResult("correct");
      onScore(10 + timeLeft);
      const milestone = badges.find(m => m.streak === newStreak && !earnedStreaks.includes(m.streak));
      if (milestone) { setEarnedStreaks(prev => [...prev, milestone.streak]); setNewBadge(milestone); }
      if (newTotal === targetWords) setShowCertificate(true);
    } else {
      setStreak(0);
      setResult("wrong");
    }
    setPhase("result");
  }, [phase, timerStarted, typed, currentWord.word, streak, totalCorrect, timeLeft, stopTimer, onScore, earnedStreaks, badges, targetWords]);

  const nextWord = useCallback(() => {
    stopTimer();
    window.speechSynthesis?.cancel();
    setWordIdx(i => i + 1);
    setTyped("");
    setTimeLeft(timerSeconds);
    setTimerStarted(false);
    setPhase("ready");
    setResult(null);
    setNewBadge(null);
    setIsSpeaking(false);
  }, [stopTimer, timerSeconds]);

  useEffect(() => {
    if (phase === "result" && !showCertificate && !newBadge) {
      const t = setTimeout(nextWord, 2800);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, showCertificate, newBadge, nextWord]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Enter") handleSubmit(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSubmit]);

  const letterSlots = Array.from({ length: currentWord.word.length }, (_, i) => typed[i]?.toUpperCase() ?? "");

  return (
    <div className="space-y-5">
      {/* Level + exit bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground">{levelEmoji} {levelName}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDiag(d => !d)}
            className="text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-2"
          >
            {showDiag ? t("play.hideDiag") : t("play.audioDiag")}
          </button>
          <button onClick={onExit} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-3.5 w-3.5" /> {t("play.changeLevel")}
          </button>
        </div>
      </div>

      {/* Audio diagnostics panel */}
      {showDiag && (() => {
        const ua = navigator.userAgent;
        const isIOS = /iPhone|iPad|iPod/i.test(ua);
        const isAndroid = /Android/i.test(ua);
        const isSafari = /Safari/i.test(ua) && !/Chrome/i.test(ua);
        const isChrome = /Chrome/i.test(ua);
        const synthSupported = "speechSynthesis" in window;
        const audioCtxSupported = "AudioContext" in window || "webkitAudioContext" in window;
        const ctxState = audioCtxRef.current?.state ?? "not created yet";
        const enVoices = diagVoices.filter(v => v.lang.startsWith("en"));

        return (
          <div className="rounded-xl border border-border bg-muted/30 p-3 text-[11px] space-y-1.5 font-mono">
            <p className="font-sans font-bold text-xs text-foreground mb-2">{t("play.audioDiagnostics")}</p>
            <Row label={t("play.diagOS")} value={isIOS ? t("play.diagOSiOS") : isAndroid ? t("play.diagOSAndroid") : t("play.diagOSOther")} />
            <Row label={t("play.diagBrowser")} value={isSafari ? t("play.diagBrowserSafari") : isChrome ? t("play.diagBrowserChrome") : t("play.diagBrowserOther")} />
            <Row label={t("play.diagSynth")} value={synthSupported ? t("play.diagSupported") : t("play.diagNotSupported")} bad={!synthSupported} />
            <Row label={t("play.diagAudioCtx")} value={audioCtxSupported ? t("play.diagSupported") : t("play.diagNotSupported")} bad={!audioCtxSupported} />
            <Row label={t("play.diagAudioCtxState")} value={ctxState === "not created yet" ? t("play.diagCtxNotCreated") : ctxState} bad={ctxState === "suspended"} />
            <Row label={t("play.diagTotalVoices")} value={String(diagVoices.length)} bad={diagVoices.length === 0} />
            <Row label={t("play.diagEnVoices")} value={String(enVoices.length)} bad={enVoices.length === 0} />
            {enVoices.length > 0 && (
              <Row label={t("play.diagDefaultVoice")} value={enVoices[0]?.name ?? "-"} />
            )}
            {diagVoices.length === 0 && (
              <p className="text-destructive font-sans mt-1">{t("play.audioNoVoices")}</p>
            )}
          </div>
        );
      })()}

      {/* Stats bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🔥</span>
            <span className="font-bold text-orange-500 text-sm">{streak}</span>
            <span className="text-xs text-muted-foreground">{t("play.streak")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">✅</span>
            <span className="font-bold text-green-600 text-sm">{totalCorrect}</span>
            <span className="text-xs text-muted-foreground">/ {targetWords}</span>
          </div>
        </div>
        <div className={`flex items-center gap-2 transition-colors ${!timerStarted ? "opacity-40" : timeLeft <= 8 ? "text-destructive" : ""}`}>
          <Timer className="h-4 w-4" />
          <span className="font-mono font-bold text-lg">00:{String(timeLeft).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${Math.min((totalCorrect / targetWords) * 100, 100)}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-right text-[10px] text-muted-foreground">{t("play.beeCertProgress", { count: totalCorrect, total: targetWords, level: levelName })}</p>
      </div>

      {/* Earned badges */}
      {earnedBadges.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {earnedBadges.map(b => (
            <span key={b.name} className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${b.color}`}>
              {b.emoji} {b.name}
            </span>
          ))}
        </div>
      )}

      {/* Word info */}
      <div className="text-center space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          {phase === "ready" ? t("play.clickSpeaker") : phase === "active" ? t("play.spellTheWord") : ""}
        </p>
        <p className="text-xs text-muted-foreground">{currentWord.word.length} {t("play.lettersLabel")} · <em>{currentWord.meaning}</em></p>
      </div>

      {/* Letter slots */}
      <div className="flex justify-center flex-wrap gap-1.5">
        {letterSlots.map((letter, i) => (
          <div
            key={i}
            className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg font-mono transition-all ${
              result === "correct" ? "border-green-500 bg-green-500/10 text-green-600"
              : result === "wrong" ? letter ? "border-destructive bg-destructive/10 text-destructive" : "border-border bg-muted/30"
              : result === "timeout" ? "border-border bg-muted/30"
              : letter ? "border-primary bg-primary/10 text-primary"
              : timerStarted ? "border-border bg-card animate-pulse"
              : "border-border bg-card opacity-50"
            }`}
          >
            {result === "wrong" && !letter ? currentWord.word[i] : letter}
          </div>
        ))}
      </div>

      {/* Speaker button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={playWord}
          onTouchStart={(e) => { e.preventDefault(); playWord(); }}
          disabled={isSpeaking || phase === "result"}
          title={timerStarted ? t("play.beeHearAgain") : t("play.beeHearFirst")}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all border-2 ${
            isSpeaking ? "border-primary bg-primary/20 text-primary animate-pulse scale-110"
            : phase === "result" ? "border-border bg-muted text-muted-foreground opacity-40 cursor-not-allowed"
            : timerStarted ? "border-primary/60 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary hover:scale-110 active:scale-95"
            : "border-amber-500/60 bg-amber-500/5 text-amber-600 hover:bg-amber-500/20 hover:border-amber-500 hover:scale-110 active:scale-95"
          }`}
        >
          <Volume2 className="h-7 w-7" />
          {isSpeaking && <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40" />}
        </button>
        <p className="text-[11px] text-muted-foreground text-center">
          {isSpeaking ? t("play.beeListening") : timerStarted ? t("play.beeHearAgainTimer") : t("play.beeHearStart")}
        </p>

        {/* Unmute overlay - shown when autoplay was blocked */}
        {audioBlocked && (
          <button
            onClick={playWord}
            onTouchStart={(e) => { e.preventDefault(); playWord(); }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg animate-bounce"
          >
            <Volume2 className="h-3.5 w-3.5" />
            {t("play.tapToUnmute")}
          </button>
        )}
      </div>

      {/* Typing input */}
      <AnimatePresence>
        {phase === "active" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={typed}
              onChange={e => setTyped(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, currentWord.word.length))}
              placeholder={t("play.typingPlaceholder")}
              className="w-full h-12 rounded-xl border border-input bg-background px-4 font-mono text-center text-lg tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false}
            />
            <Button onClick={handleSubmit} className="w-full h-11 rounded-xl bg-primary font-bold" disabled={!typed.trim()}>
              {t("play.submitSpelling")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result message */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            <div className={`text-center py-3 px-4 rounded-xl font-bold text-sm ${result === "correct" ? "bg-green-500/10 text-green-600 border border-green-500/30" : result === "timeout" ? "bg-amber-500/10 text-amber-600 border border-amber-400/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}>
              {result === "correct" && t("play.beeResultCorrect", { word: currentWord.word })}
              {result === "timeout" && t("play.beeResultTimeout", { word: currentWord.word })}
              {result === "wrong" && t("play.beeResultWrong", { word: currentWord.word })}
            </div>
            {(result === "timeout" || result === "wrong") && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-1.5 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wide">
                  <BookOpen className="w-3.5 h-3.5" /> {currentWord.word}
                </div>
                <p className="text-xs text-foreground font-medium">{currentWord.meaning}</p>
                <p className="text-xs text-muted-foreground italic">"{currentWord.usage}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge announcement */}
      <AnimatePresence>
        {newBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`text-center py-5 rounded-2xl border space-y-2 ${newBadge.color}`}
          >
            <p className="text-3xl">{newBadge.emoji}</p>
            <p className="font-black text-base">{t("play.beeBadgeEarned", { name: newBadge.name })}</p>
            <p className="text-xs opacity-70">{t("play.beeBadgeStreakRow", { count: newBadge.streak })}</p>
            <Button size="sm" variant="outline" className="rounded-full mt-2 text-xs" onClick={() => { setNewBadge(null); nextWord(); }}>
              {t("play.keepSpelling")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background border-2 border-primary rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl"
            >
              <div className="text-6xl">🏆</div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">{t("play.beeCertIssuer")}</p>
                <h2 className="text-2xl font-black mt-1 leading-tight">{certificateLabel}<br />{t("play.beeCertLabel")}</h2>
              </div>
              <div className="py-4 border-y border-border/60 space-y-2">
                <p className="text-sm text-muted-foreground">{t("play.beeCertText")}</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <p className="text-4xl font-black text-primary">{targetWords}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground">{t("play.beeCertCorrectWords")}<br /><strong>{t("play.beeCertTitle", { level: levelName })}</strong></p>
              </div>
              {earnedBadges.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {earnedBadges.map(b => (
                    <span key={b.name} className={`text-[10px] font-bold px-2 py-1 rounded-full border ${b.color}`}>{b.emoji} {b.name}</span>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground">{t("play.beeCertIssuedBy", { level: levelName })}</p>
              <Button size="lg" className="w-full rounded-2xl bg-primary font-bold" onClick={() => { setShowCertificate(false); nextWord(); }}>
                {t("play.beeContinue")}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SPELLING BEE WITH LEVEL PICKER ───────────────────────────
function SpellingBeeWithLevels({ onScore, isPremium, onUpgrade }: { onScore: (score: number) => void; isPremium: boolean; onUpgrade?: () => void }) {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState<typeof SPELLING_BEE_LEVELS[0] | null>(null);
  const [openInfo, setOpenInfo] = useState<string | null>(null);

  const BEE_KEY_MAP: Record<string, string> = {
    "beginner": "beginner",
    "lower-intermediate": "lowerIntermediate",
    "upper-intermediate": "upperIntermediate",
    "proficient": "proficient",
  };

  const translatedLevels = SPELLING_BEE_LEVELS.map(l => ({
    ...l,
    name: t(`play.beeLevel.${BEE_KEY_MAP[l.id]}.name`),
    tag: t(`play.beeLevel.${BEE_KEY_MAP[l.id]}.tag`),
    tagline: t(`play.beeLevel.${BEE_KEY_MAP[l.id]}.tagline`),
    certificateLabel: t(`play.beeLevel.${BEE_KEY_MAP[l.id]}.certificate`),
    badges: l.badges.map(b => ({ ...b, name: t(b.nameKey) })),
  }));

  if (selectedLevel) {
    return (
      <SpellingBeeCore
        wordPool={selectedLevel.wordPool}
        levelName={selectedLevel.name}
        levelEmoji={selectedLevel.emoji}
        timerSeconds={selectedLevel.timerSeconds}
        targetWords={selectedLevel.targetWords}
        badges={selectedLevel.badges}
        certificateLabel={selectedLevel.certificateLabel}
        onScore={onScore}
        onExit={() => setSelectedLevel(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1.5">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{t("play.chooseLevel")}</p>
        <p className="text-sm text-muted-foreground">{t("play.hearAndSpell")}</p>
      </div>
      <div className="space-y-3">
        {translatedLevels.map(level => {
          const locked = level.premium && !isPremium;
          return (
            <div key={level.id}>
              <div
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  locked
                    ? "border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 cursor-default"
                    : "border-border hover:border-primary hover:bg-primary/5 cursor-pointer active:scale-[0.99]"
                }`}
                onClick={() => !locked && setSelectedLevel(level)}
                role={locked ? undefined : "button"}
                tabIndex={locked ? undefined : 0}
                onKeyDown={e => { if (!locked && (e.key === "Enter" || e.key === " ")) setSelectedLevel(level); }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{level.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base">{level.name}</span>
                      {locked && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-white">
                          <Crown className="h-2.5 w-2.5" /> {t("common.premium")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{level.tagline}</p>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={e => { e.stopPropagation(); setOpenInfo(openInfo === level.id ? null : level.id); }}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); setOpenInfo(openInfo === level.id ? null : level.id); } }}
                    className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 cursor-pointer"
                    aria-label={`Info about ${level.name}`}
                  >
                    <Info className="h-4 w-4" />
                  </div>
                </div>
                <AnimatePresence>
                  {openInfo === level.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-border/60 text-xs text-muted-foreground space-y-1 overflow-hidden"
                    >
                      <p><span className="font-semibold text-foreground">{t("play.beeWhoFor")}</span> {level.tag} {t("play.beeLearners")}</p>
                      <p><span className="font-semibold text-foreground">{t("play.beeTimer")}</span> {level.timerSeconds} {t("play.beeSecondsPerWord")}</p>
                      <p><span className="font-semibold text-foreground">{t("play.beeCertificate")}</span> {t("play.beeAwardedAt", { count: level.targetWords })}</p>
                      {level.premium && <p className="text-primary font-semibold">{t("play.beePremiumRequired")}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {locked && (
                <div className="mt-1.5">
                  <Button size="sm" className="w-full rounded-xl font-bold bg-primary text-xs h-9" onClick={onUpgrade}>
                    <Crown className="h-3.5 w-3.5 mr-1.5" /> {t("common.upgrade")} - $8
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── GAMES REGISTRY ────────────────────────────────────────────
const GAME_META = [
  { id: "wordle",        tKey: "wordle",      status: "live", emoji: "🟩", premium: true  },
  { id: "lexigen-game",  tKey: "lexigenGame", status: "live", emoji: "⚡"                  },
  { id: "spelling-bee",  tKey: "spellingBee", status: "live", emoji: "🐝"                  },
  { id: "scrabble",      tKey: "scrabble",    status: "live", emoji: "🎯", premium: true  },
  { id: "crossword",     tKey: "crossword",   status: "live", emoji: "📝", premium: true  },
  { id: "word-grid",     tKey: "wordGrid",    status: "live", emoji: "🔤", premium: true  },
];

// ─── MAIN PLAY PAGE ────────────────────────────────────────────
export default function Play() {
  const { t } = useTranslation();
  const GAMES = GAME_META.map(g => ({
    ...g,
    name: t(`play.games.${g.tKey}.name`),
    tag: t(`play.games.${g.tKey}.tag`),
    desc: t(`play.games.${g.tKey}.desc`),
    howToPlay: t(`play.games.${g.tKey}.howToPlay`),
  }));
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [helpGame, setHelpGame] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, logout, setPremium } = useAuth();
  const isPremium = user?.plan === "premium";
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const queryClient = useQueryClient();
  const submitScore = useSubmitGameScore();
  const { data: scores } = useListGameScores();

  const handleScore = (gameName: string, score: number) => {
    submitScore.mutate(
      { data: { game: gameName, score } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListGameScoresQueryKey() });
          toast({ title: `${t("play.score")}: ${score} pts`, description: t("play.checkLeaderboard") });
        },
      }
    );
  };

  const helpGameData = GAMES.find(g => g.id === helpGame);

  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
        <div className="container mx-auto max-w-6xl">

          {/* Page header with user bar */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-10">
            {/* User bar */}
            <div className="flex items-center justify-between">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                {t("play.heading")}
              </span>
              {user && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {t("play.loggedInAs", { name: user.name?.split(" ")[0] })}
                    {isPremium && <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600"><Crown className="h-3 w-3" /> {t("common.premium")}</span>}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-3 py-1.5 hover:border-primary/30"
                  >
                    <LogOut className="h-3.5 w-3.5" /> {t("common.signOut")}
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              {t("play.heroHeading")}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t("play.heroHighlight")}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              {t("play.subtitle")}
            </p>
          </motion.div>

          {/* Game Cards Grid */}
          {!activeGame && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GAMES.map((game, i) => {
                const topScore = scores?.filter(s => s.game === game.name)[0];
                const isComingSoon = game.status === "coming";
                const isLocked = !!(game as any).premium && !isPremium;
                const isClickable = game.status === "live" && !isComingSoon;
                return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`relative p-6 rounded-2xl border bg-card transition-all group ${
                      isLocked
                        ? "border-border/60 cursor-pointer hover:border-primary/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]"
                        : isClickable
                          ? "border-primary/30 hover:border-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] cursor-pointer"
                          : "border-border opacity-70"
                    }`}
                    onClick={() => isLocked ? setShowPaymentModal(true) : isClickable ? setActiveGame(game.id) : undefined}
                    data-testid={`game-card-${game.id}`}
                  >
                    {/* Lock overlay for premium-gated games */}
                    {isLocked && (
                      <div className="absolute inset-0 rounded-2xl bg-background/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 gap-2">
                        <div className="flex items-center gap-2 bg-background/90 border border-primary/30 rounded-full px-4 py-2 shadow-sm">
                          <Lock className="h-4 w-4 text-primary" />
                          <span className="text-xs font-bold text-primary">{t("play.locked")}</span>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); setShowPaymentModal(true); }}
                          className="text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
                        >
                          {t("common.upgrade")} →
                        </button>
                      </div>
                    )}

                    {/* Coming soon overlay */}
                    {isComingSoon && !isPremium && (
                      <div className="absolute inset-0 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                        <Badge className="font-bold bg-muted text-muted-foreground border-border shadow-sm">{t("play.comingSoon")}</Badge>
                      </div>
                    )}
                    {isComingSoon && isPremium && (
                      <div className="absolute top-3 right-10 z-10">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-400/30">
                          <Crown className="h-2.5 w-2.5" /> {t("play.earlyAccess")}
                        </span>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs font-bold ${
                          game.id === "spelling-bee" ? "bg-amber-500/10 text-amber-600 border-amber-400/30"
                          : "bg-primary/10 text-primary border-primary/20"
                        }`}>
                          {game.tag}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setHelpGame(game.id); }}
                            className="text-muted-foreground hover:text-foreground transition-colors opacity-60 group-hover:opacity-100"
                            aria-label={`How to play ${game.name}`}
                          >
                            <Info className="h-4 w-4" />
                          </button>
                          {!isLocked && isClickable && (
                            game.id === "spelling-bee"
                              ? <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">🐝</span>
                              : <Gamepad2 className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{game.emoji}</span>
                        <h3 className="text-xl font-bold">{game.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{game.desc}</p>
                      {topScore && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Trophy className="h-3 w-3 text-yellow-400" />
                          <span>{t("play.myBestScore")} <strong className="text-foreground">{topScore.score}</strong> by {topScore.username}</span>
                        </div>
                      )}
                      {isLocked ? (
                        <Button
                          size="sm"
                          className="w-full rounded-full mt-2 font-bold bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white"
                          onClick={e => { e.stopPropagation(); setShowPaymentModal(true); }}
                          data-testid={`button-unlock-${game.id}`}
                        >
                          <Crown className="h-3.5 w-3.5 mr-1.5" /> {t("common.upgrade")}
                        </Button>
                      ) : isClickable ? (
                        <Button
                          size="sm"
                          className={`w-full rounded-full mt-2 font-bold ${game.id === "spelling-bee" ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-primary hover:bg-primary/90"}`}
                          data-testid={`button-play-${game.id}`}
                        >
                          {game.id === "spelling-bee" ? t("play.playSpellingBee") : t("play.playNow")}
                        </Button>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Wordshuffl promo */}
          {!activeGame && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-center"
            >
              <a
                href="https://wordshuffl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-sm"
              >
                <span className="text-xl">🔀</span>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {t("play.wordshufflPromoText")}{" "}
                  <span className="font-bold text-primary underline underline-offset-2">{t("play.wordshufflPromoLink")}</span>
                  <span className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                </span>
              </a>
            </motion.div>
          )}

          {/* Active Game Panel */}
          <AnimatePresence>
            {activeGame && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-lg mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span>{GAMES.find(g => g.id === activeGame)?.emoji}</span>
                    {GAMES.find(g => g.id === activeGame)?.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHelpGame(activeGame)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
                      title={t("play.howToPlayTitle")}
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Wordshuffl promo - above All Games button */}
                <a
                  href="https://wordshuffl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 w-full px-4 py-3 mb-4 rounded-xl border border-border bg-muted/40 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm"
                >
                  <span className="text-lg flex-shrink-0">🔀</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                    {t("play.wordshufflPromoText")}{" "}
                    <span className="font-bold text-primary underline underline-offset-2">{t("play.wordshufflPromoLink")}</span>
                    <span className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </a>

                <div className="flex justify-end mb-6">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setActiveGame(null)} data-testid="button-back-to-games">
                    {t("play.allGames")}
                  </Button>
                </div>

                <div className={`p-6 rounded-2xl border bg-card shadow-[0_0_40px_rgba(139,92,246,0.1)] ${
                  activeGame === "spelling-bee" ? "border-amber-400/30" : "border-primary/30"
                }`}>
                  {activeGame === "wordle" && <WordleGame onScore={(s) => handleScore("Wordle", s)} />}
                  {activeGame === "lexigen-game" && <LexigenGame onScore={(s) => handleScore("Lexigenz Game", s)} />}
                  {activeGame === "spelling-bee" && (
                    <SpellingBeeWithLevels
                      onScore={(s) => handleScore("Spelling Bee", s)}
                      isPremium={isPremium}
                      onUpgrade={() => setShowPaymentModal(true)}
                    />
                  )}
                  {activeGame === "scrabble" && (
                    <ScrabbleGame onScore={(s) => handleScore("Scrabble", s)} />
                  )}
                  {activeGame === "crossword" && (
                    <CrosswordGame onScore={(s) => handleScore("Crossword", s)} />
                  )}
                  {activeGame === "word-grid" && (
                    <WordGridGame onScore={(s) => handleScore("Word Grid", s)} />
                  )}
                </div>

                {/* Leaderboard */}
                {scores && scores.filter(s => s.game === GAMES.find(g => g.id === activeGame)?.name).length > 0 && (
                  <div className="mt-6 p-5 rounded-2xl border border-border bg-card">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <h4 className="font-bold text-sm">{t("play.topScores")}</h4>
                    </div>
                    {scores.filter(s => s.game === GAMES.find(g => g.id === activeGame)?.name).slice(0, 5).map((score, i) => (
                      <div key={score.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                          <span className="text-sm font-medium">{score.username}</span>
                        </div>
                        <span className="text-sm font-bold text-primary">{score.score}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Word Tools & Resources */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">{t("play.wordToolsTitle")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("play.wordToolsDesc")}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { href: "/vocabulary", emoji: "📚", labelKey: "play.wordToolVocabHub" },
              { href: "/wordle-words", emoji: "🟩", labelKey: "play.wordToolWordle" },
              { href: "/scrabble-words", emoji: "🎯", labelKey: "play.wordToolScrabble" },
              { href: "/spelling-bee-words", emoji: "🐝", labelKey: "play.wordToolSpellingBee" },
              { href: "/crossword-words", emoji: "✏️", labelKey: "play.wordToolCrossword" },
              { href: "/synonym-finder", emoji: "🔀", labelKey: "play.wordToolSynonym" },
              { href: "/word-finder", emoji: "🔍", labelKey: "play.wordToolWordFinder" },
              { href: "/anagram-solver", emoji: "🔤", labelKey: "play.wordToolAnagram" },
              { href: "/dictionary", emoji: "📖", labelKey: "play.wordToolDictionary" },
              { href: "/word-of-the-day", emoji: "⭐", labelKey: "play.wordToolWotd" },
            ].map(({ href, emoji, labelKey }) => (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-center"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs font-bold leading-tight">{t(labelKey)}</span>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-3">{t("play.browseByCategory")}</p>
            <InteractiveCategoryBrowser categories={BROWSE_CATEGORIES.map(c => ({ ...c, label: t(c.labelKey) }))} wordCount={15} />
          </div>
        </div>
      </section>

      {/* How to Play modal */}
      <AnimatePresence>
        {helpGame && helpGameData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
            onClick={() => setHelpGame(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border border-border rounded-3xl p-8 max-w-sm w-full space-y-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{helpGameData.emoji}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{t("play.howToPlay")}</p>
                    <h3 className="font-black text-lg leading-tight">{helpGameData.name}</h3>
                  </div>
                </div>
                <button onClick={() => setHelpGame(null)} className="text-muted-foreground hover:text-foreground transition-colors mt-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{helpGameData.howToPlay}</p>
              <Button className="w-full rounded-2xl font-bold" onClick={() => setHelpGame(null)}>
                {t("play.gotIt")}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium payment modal */}
      <AnimatePresence>
        {showPaymentModal && user && (
          <PaymentModal
            onClose={() => setShowPaymentModal(false)}
            onSuccess={() => { setPremium(); setShowPaymentModal(false); }}
            userEmail={user.email}
            userName={user.name}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
