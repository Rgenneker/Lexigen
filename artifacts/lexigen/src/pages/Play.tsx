import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
    label: "Emotion vocabulary",
    words: ["joy","sorrow","anger","fear","surprise","disgust","trust","anticipation","melancholy","elated","anxious","serene","frustrated","euphoric","despondent","apprehensive","jubilant","forlorn","exhilarated","dejected","resentful","compassion","empathy","nostalgia","gratitude","remorse","envy","pride","shame","awe","contempt","longing","tranquil","agitated","ecstatic","wistful","indignant","content","bewildered","optimistic","grief","admiration","regret","tenderness","anguish","serenity","elation","dread","hope","affection"],
  },
  {
    id: "business",
    label: "Business vocabulary",
    words: ["accountability","acquisition","agility","analytics","benchmark","capital","catalyst","collaborate","competitive","compliance","deliverable","differentiation","disruptive","ecosystem","efficiency","engagement","entrepreneur","equity","execution","forecast","framework","governance","growth","implementation","incentive","innovation","leadership","leverage","margin","metrics","milestone","monetize","negotiation","optimization","performance","pipeline","portfolio","productivity","profitability","revenue","roadmap","scalability","stakeholder","strategy","sustainability","synergy","traction","transformation","transparency","venture"],
  },
  {
    id: "academic",
    label: "Academic words",
    words: ["abstract","analysis","annotation","argument","assertion","bibliography","causation","citation","classification","coherence","commentary","conceptual","conclusion","contradiction","critical","critique","deduction","dialectic","discourse","empirical","epistemology","evaluate","evidence","exemplify","extrapolate","fallacy","generalization","hypothesis","implication","inductive","inference","interpretation","juxtaposition","methodology","narrative","ontology","paradigm","pedagogy","perspective","phenomenon","philosophy","premise","rationale","refute","rhetoric","synthesis","theoretical","thesis","variable","verification"],
  },
  {
    id: "advanced",
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
              {gameState === "won" ? `Brilliant! The word was ${answer}` : `The word was ${answer}`}
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
              <button key={key} onClick={() => handleKey(key)} className={`h-10 rounded-lg font-bold text-xs font-mono transition-colors ${key.length > 1 ? "px-3" : "w-8"} ${usedLetters[key] === "correct" ? "bg-green-500 text-white" : usedLetters[key] === "present" ? "bg-yellow-500 text-white" : usedLetters[key] === "absent" ? "bg-muted text-muted-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`} data-testid={`wordle-key-${key}`}>
                {key}
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

  if (isLoading) return <div className="text-center py-8 text-muted-foreground">Loading game...</div>;

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
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Spell the word</p>
        <div className="flex justify-center gap-2">
          {Array.from({ length: gameData?.targetWord.length ?? 7 }).map((_, i) => (
            <div key={i} className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg font-mono transition-all ${formed[i] ? gameState === "won" ? "border-green-500 bg-green-500/10 text-green-500" : "border-primary bg-primary/10 text-primary" : "border-border"}`} data-testid={`lexigen-slot-${i}`}>
              {formed[i] || ""}
            </div>
          ))}
        </div>
        {gameData?.hint && <p className="text-xs text-muted-foreground mt-2">Hint: {gameData.hint}</p>}
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
          }}>Undo</Button>
        </div>
      )}
      <AnimatePresence>
        {gameState !== "playing" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`text-center py-4 rounded-xl font-bold ${gameState === "won" ? "bg-green-500/10 text-green-500 border border-green-500/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}>
            {gameState === "won" ? `Nailed it! LEXIGENZ spelled in ${15 - timeLeft}s` : `Time's up! The word was ${gameData?.targetWord}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SPELLING BEE TYPES ────────────────────────────────────────
type BadgeMilestone = { streak: number; name: string; emoji: string; color: string };
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
      { streak: 5,  name: "Word Seedling",      emoji: "🌱🐝", color: "text-green-600 bg-green-500/10 border-green-400/30" },
      { streak: 10, name: "Word Sprout",         emoji: "🌿🐝", color: "text-emerald-600 bg-emerald-500/10 border-emerald-400/30" },
      { streak: 15, name: "Word Grower",         emoji: "🌻🐝", color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 20, name: "Word Bloomer",        emoji: "🌸🐝", color: "text-pink-600 bg-pink-500/10 border-pink-400/30" },
      { streak: 25, name: "Word Blossomer",      emoji: "🏅🐝", color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 30, name: "Young Bee Champion",  emoji: "🏆🐝", color: "text-amber-600 bg-amber-500/10 border-amber-400/30" },
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
      { streak: 5,  name: "Bee Apprentice", emoji: "🐝",    color: "text-amber-600 bg-amber-500/10 border-amber-400/30" },
      { streak: 10, name: "Bee Scholar",    emoji: "📚🐝",  color: "text-blue-600 bg-blue-500/10 border-blue-400/30" },
      { streak: 15, name: "Bee Expert",     emoji: "🌟🐝",  color: "text-purple-600 bg-purple-500/10 border-purple-400/30" },
      { streak: 20, name: "Bee Master",     emoji: "🏆🐝",  color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 25, name: "Bee Legend",     emoji: "👑🐝",  color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 30, name: "Bee Supreme",    emoji: "⚡🐝",  color: "text-rose-600 bg-rose-500/10 border-rose-400/30" },
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
      { streak: 5,  name: "Bee Apprentice", emoji: "🐝",    color: "text-amber-600 bg-amber-500/10 border-amber-400/30" },
      { streak: 10, name: "Bee Scholar",    emoji: "📚🐝",  color: "text-blue-600 bg-blue-500/10 border-blue-400/30" },
      { streak: 15, name: "Bee Expert",     emoji: "🌟🐝",  color: "text-purple-600 bg-purple-500/10 border-purple-400/30" },
      { streak: 20, name: "Bee Master",     emoji: "🏆🐝",  color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 25, name: "Bee Legend",     emoji: "👑🐝",  color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 30, name: "Bee Supreme",    emoji: "⚡🐝",  color: "text-rose-600 bg-rose-500/10 border-rose-400/30" },
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
      { streak: 5,  name: "Lexicographer I",   emoji: "🔬🐝", color: "text-teal-600 bg-teal-500/10 border-teal-400/30" },
      { streak: 10, name: "Lexicographer II",  emoji: "📖🐝", color: "text-indigo-600 bg-indigo-500/10 border-indigo-400/30" },
      { streak: 15, name: "Lexicographer III", emoji: "🎓🐝", color: "text-purple-600 bg-purple-500/10 border-purple-400/30" },
      { streak: 20, name: "Word Architect",    emoji: "🏛️🐝", color: "text-primary bg-primary/10 border-primary/30" },
      { streak: 25, name: "Grand Lexicon",     emoji: "👑🐝", color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
      { streak: 30, name: "Etymologist Rex",   emoji: "⚡🐝", color: "text-rose-600 bg-rose-500/10 border-rose-400/30" },
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
            {showDiag ? "hide diagnostics" : "audio diagnostics"}
          </button>
          <button onClick={onExit} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-3.5 w-3.5" /> Change level
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
            <p className="font-sans font-bold text-xs text-foreground mb-2">🔍 Audio Diagnostics</p>
            <Row label="OS" value={isIOS ? "iOS" : isAndroid ? "Android" : "Desktop/Other"} />
            <Row label="Browser" value={isSafari ? "Safari" : isChrome ? "Chrome" : "Other"} />
            <Row label="speechSynthesis" value={synthSupported ? "✅ supported" : "❌ not supported"} bad={!synthSupported} />
            <Row label="AudioContext" value={audioCtxSupported ? "✅ supported" : "❌ not supported"} bad={!audioCtxSupported} />
            <Row label="AudioContext state" value={ctxState} bad={ctxState === "suspended"} />
            <Row label="Total TTS voices" value={String(diagVoices.length)} bad={diagVoices.length === 0} />
            <Row label="English voices" value={String(enVoices.length)} bad={enVoices.length === 0} />
            {enVoices.length > 0 && (
              <Row label="Default EN voice" value={enVoices[0]?.name ?? "-"} />
            )}
            {diagVoices.length === 0 && (
              <p className="text-destructive font-sans mt-1">⚠️ No voices found - device TTS engine may be disabled. Check Settings → Accessibility → Text to Speech.</p>
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
            <span className="text-xs text-muted-foreground">streak</span>
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
        <p className="text-right text-[10px] text-muted-foreground">{totalCorrect}/{targetWords} toward {levelName} Certificate</p>
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
          {phase === "ready" ? "🐝 Click the speaker to hear your word" : phase === "active" ? "Spell the word" : ""}
        </p>
        <p className="text-xs text-muted-foreground">{currentWord.word.length} letters · <em>{currentWord.meaning}</em></p>
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
          title={timerStarted ? "Tap to hear the word again" : "Tap to hear your word - timer starts on first play"}
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
          {isSpeaking ? "Listening…" : timerStarted ? "Tap to hear again · Timer running" : "Tap 🔊 - timer starts when word plays"}
        </p>

        {/* Unmute overlay - shown when autoplay was blocked */}
        {audioBlocked && (
          <button
            onClick={playWord}
            onTouchStart={(e) => { e.preventDefault(); playWord(); }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg animate-bounce"
          >
            <Volume2 className="h-3.5 w-3.5" />
            Tap to unmute
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
              placeholder="Type your spelling…"
              className="w-full h-12 rounded-xl border border-input bg-background px-4 font-mono text-center text-lg tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false}
            />
            <Button onClick={handleSubmit} className="w-full h-11 rounded-xl bg-primary font-bold" disabled={!typed.trim()}>
              Submit Spelling ↵
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result message */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            <div className={`text-center py-3 px-4 rounded-xl font-bold text-sm ${result === "correct" ? "bg-green-500/10 text-green-600 border border-green-500/30" : result === "timeout" ? "bg-amber-500/10 text-amber-600 border border-amber-400/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}>
              {result === "correct" && `✅ Correct! "${currentWord.word}" - next word coming…`}
              {result === "timeout" && `⏰ Time's up! The word was "${currentWord.word}"`}
              {result === "wrong" && `❌ It's "${currentWord.word}" - keep going!`}
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
            <p className="font-black text-base">Badge Earned: {newBadge.name}!</p>
            <p className="text-xs opacity-70">{newBadge.streak} words correct in a row</p>
            <Button size="sm" variant="outline" className="rounded-full mt-2 text-xs" onClick={() => { setNewBadge(null); nextWord(); }}>
              Keep spelling →
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
                <p className="text-xs font-black uppercase tracking-widest text-primary">Lexigenz Trading</p>
                <h2 className="text-2xl font-black mt-1 leading-tight">{certificateLabel}<br />Certificate</h2>
              </div>
              <div className="py-4 border-y border-border/60 space-y-2">
                <p className="text-sm text-muted-foreground">This certifies the achievement of</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <p className="text-4xl font-black text-primary">{targetWords}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground">correctly spelled words in the<br /><strong>Lexigenz Spelling Bee - {levelName}</strong></p>
              </div>
              {earnedBadges.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {earnedBadges.map(b => (
                    <span key={b.name} className={`text-[10px] font-bold px-2 py-1 rounded-full border ${b.color}`}>{b.emoji} {b.name}</span>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground">Issued by Lexigenz Trading · Spelling Bee {levelName}</p>
              <Button size="lg" className="w-full rounded-2xl bg-primary font-bold" onClick={() => { setShowCertificate(false); nextWord(); }}>
                Continue Playing 🐝
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
  const [selectedLevel, setSelectedLevel] = useState<typeof SPELLING_BEE_LEVELS[0] | null>(null);
  const [openInfo, setOpenInfo] = useState<string | null>(null);

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
        <p className="text-xs font-bold uppercase tracking-widest text-primary">🐝 Choose Your Level</p>
        <p className="text-sm text-muted-foreground">Hear the word, spell it correctly. Timer starts when the word plays.</p>
      </div>
      <div className="space-y-3">
        {SPELLING_BEE_LEVELS.map(level => {
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
                          <Crown className="h-2.5 w-2.5" /> Premium
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
                      <p><span className="font-semibold text-foreground">Who it's for:</span> {level.tag} learners</p>
                      <p><span className="font-semibold text-foreground">Timer:</span> {level.timerSeconds} seconds per word</p>
                      <p><span className="font-semibold text-foreground">Certificate:</span> Awarded at {level.targetWords} correct words</p>
                      {level.premium && <p className="text-primary font-semibold">🔒 Requires Premium membership - $8 lifetime</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {locked && (
                <div className="mt-1.5">
                  <Button size="sm" className="w-full rounded-xl font-bold bg-primary text-xs h-9" onClick={onUpgrade}>
                    <Crown className="h-3.5 w-3.5 mr-1.5" /> Unlock with Premium - $8 lifetime
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
const GAMES = [
  {
    id: "wordle",
    name: "Wordle",
    tag: "Lexigenz Edition",
    desc: "Guess the 5-letter word in 6 attempts. Green = correct spot. Yellow = wrong spot.",
    status: "live",
    emoji: "🟩",
    premium: true,
    howToPlay: "You have 6 tries to guess the secret 5-letter word. After each guess, tiles change colour - 🟩 Green means the letter is correct and in the right spot. 🟨 Yellow means the letter is in the word but wrong spot. ⬜ Grey means the letter is not in the word.",
  },
  {
    id: "lexigen-game",
    name: "Lexigenz Game",
    tag: "Signature",
    desc: "Race to unscramble 7 letters into LEXIGENZ before the 15-second timer runs out.",
    status: "live",
    emoji: "⚡",
    howToPlay: "7 scrambled letters are shown. Tap them in the correct order to spell 'LEXIGENZ' before the 15-second timer expires. Use the Undo button to remove the last letter you placed. Speed is everything.",
  },
  {
    id: "spelling-bee",
    name: "Spelling Bee",
    tag: "4 Levels",
    desc: "Hear the word, then spell it correctly. Four levels from Beginner to Proficient. Earn badges and a certificate.",
    status: "live",
    emoji: "🐝",
    howToPlay: "Choose your level (Beginner → Proficient), then click 🔊 to hear your word. The timer starts when the word plays. Type the correct spelling and hit Submit. Earn streak badges and a Certificate when you reach the level's target word count. The Proficient level requires Premium.",
  },
  {
    id: "scrabble",
    name: "Scrabble",
    tag: "4 Levels",
    desc: "Tap 7 letter tiles to build high-scoring words. Rare letters earn more - use all 7 for a BINGO bonus!",
    status: "live",
    emoji: "🎯",
    premium: true,
    howToPlay: "Choose a level, then tap letter tiles from your rack to build a word in the word area. Tap a selected letter to return it. Hit Submit when ready - the word must be valid and meet the minimum length for your level. Shuffle resets your rack. Using all 7 tiles earns a +50 BINGO bonus!",
  },
  {
    id: "crossword",
    name: "Crossword",
    tag: "4 Puzzles",
    desc: "Solve themed 5×5 mini crosswords. Click a clue or cell, then type your answer.",
    status: "live",
    emoji: "📝",
    premium: true,
    howToPlay: "Click a clue in the panel (or tap a cell in the grid) to select a word. A text input appears - type your answer. The grid fills in live as you type. Once all words are filled, press Check Answers to see your result. Green = correct, red = needs fixing.",
  },
  {
    id: "word-grid",
    name: "Word Grid",
    tag: "Boggle-Style",
    desc: "Swipe or drag adjacent letters in a grid to spell words before the timer runs out.",
    status: "live",
    emoji: "🔤",
    premium: true,
    howToPlay: "Hold and drag (or swipe on mobile) across adjacent letters - including diagonals - to trace a word path. Release to submit. Each letter can only be used once per word. Longer words score more points. The number next to each tile shows its position in your current word.",
  },
];

// ─── MAIN PLAY PAGE ────────────────────────────────────────────
export default function Play() {
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
          toast({ title: `Score saved: ${score} pts`, description: "Check the leaderboard!" });
        },
      }
    );
  };

  const helpGameData = useMemo(() => GAMES.find(g => g.id === helpGame), [helpGame]);

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
                Play for Words
              </span>
              {user && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    Hi, <span className="font-semibold text-foreground">{user.name?.split(" ")[0]}</span>
                    {isPremium && <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600"><Crown className="h-3 w-3" /> Premium</span>}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-3 py-1.5 hover:border-primary/30"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Log out
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              GAMES THAT MAKE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">WORDS FUN.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Six Lexigenz-branded word games. Play solo or challenge a friend. Every game sharpens your vocabulary.
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
                          <span className="text-xs font-bold text-primary">Premium Only</span>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); setShowPaymentModal(true); }}
                          className="text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
                        >
                          Upgrade for $8 →
                        </button>
                      </div>
                    )}

                    {/* Coming soon overlay */}
                    {isComingSoon && !isPremium && (
                      <div className="absolute inset-0 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                        <Badge className="font-bold bg-muted text-muted-foreground border-border shadow-sm">Coming Soon</Badge>
                      </div>
                    )}
                    {isComingSoon && isPremium && (
                      <div className="absolute top-3 right-10 z-10">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-400/30">
                          <Crown className="h-2.5 w-2.5" /> Early Access
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
                          <span>Top: <strong className="text-foreground">{topScore.score}</strong> by {topScore.username}</span>
                        </div>
                      )}
                      {isLocked ? (
                        <Button
                          size="sm"
                          className="w-full rounded-full mt-2 font-bold bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white"
                          onClick={e => { e.stopPropagation(); setShowPaymentModal(true); }}
                          data-testid={`button-unlock-${game.id}`}
                        >
                          <Crown className="h-3.5 w-3.5 mr-1.5" /> Unlock with Premium
                        </Button>
                      ) : isClickable ? (
                        <Button
                          size="sm"
                          className={`w-full rounded-full mt-2 font-bold ${game.id === "spelling-bee" ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-primary hover:bg-primary/90"}`}
                          data-testid={`button-play-${game.id}`}
                        >
                          {game.id === "spelling-bee" ? "🐝 Play Spelling Bee" : "Play Now"}
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
                  tryna unscramble your words?{" "}
                  <span className="font-bold text-primary underline underline-offset-2">do it rn at wordshuffl.com</span>
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
                      title="How to play"
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
                    tryna unscramble your words?{" "}
                    <span className="font-bold text-primary underline underline-offset-2">do it rn at wordshuffl.com</span>
                    <span className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </a>

                <div className="flex justify-end mb-6">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setActiveGame(null)} data-testid="button-back-to-games">
                    ← All Games
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
                      <h4 className="font-bold text-sm">Top Scores</h4>
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
            <h2 className="text-3xl md:text-4xl font-black mb-3">Word Tools & Resources</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Free vocabulary tools, word games, and learning resources – all in one place.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { href: "/vocabulary", emoji: "📚", label: "Vocabulary Hub" },
              { href: "/wordle-words", emoji: "🟩", label: "Wordle Words" },
              { href: "/scrabble-words", emoji: "🎯", label: "Scrabble Words" },
              { href: "/spelling-bee-words", emoji: "🐝", label: "Spelling Bee" },
              { href: "/crossword-words", emoji: "✏️", label: "Crossword Solver" },
              { href: "/synonym-finder", emoji: "🔀", label: "Synonym Finder" },
              { href: "/word-finder", emoji: "🔍", label: "Word Finder" },
              { href: "/anagram-solver", emoji: "🔤", label: "Anagram Solver" },
              { href: "/dictionary", emoji: "📖", label: "Dictionary" },
              { href: "/word-of-the-day", emoji: "⭐", label: "Word of the Day" },
            ].map(({ href, emoji, label }) => (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-center"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs font-bold leading-tight">{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-3">Browse by Category</p>
            <InteractiveCategoryBrowser categories={BROWSE_CATEGORIES} wordCount={15} />
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
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">How to Play</p>
                    <h3 className="font-black text-lg leading-tight">{helpGameData.name}</h3>
                  </div>
                </div>
                <button onClick={() => setHelpGame(null)} className="text-muted-foreground hover:text-foreground transition-colors mt-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{helpGameData.howToPlay}</p>
              <Button className="w-full rounded-2xl font-bold" onClick={() => setHelpGame(null)}>
                Got it
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
