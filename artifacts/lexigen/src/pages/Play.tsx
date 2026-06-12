import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetWordleWord, useGetLexigenWord, useListGameScores, useSubmitGameScore, getListGameScoresQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Timer, Gamepad2, RotateCcw, Volume2, Award, Star } from "lucide-react";

// ─── WORDLE GAME ────────────────────────────────────────────
const WORD_BANK = ["FLAME", "BRAVE", "CRISP", "DRIFT", "FLAIR", "NOBLE", "SWIFT", "PLUCK", "VIVID", "AGILE", "BLISS", "CHARM", "ELATE", "QUEST", "THYME"];

function getLetterColor(letter: string, position: number, answer: string, guess: string): "correct" | "present" | "absent" {
  if (answer[position] === letter) return "correct";
  if (answer.includes(letter)) return "present";
  return "absent";
}

function WordleGame({ onScore }: { onScore: (score: number) => void }) {
  const [answer] = useState(() => WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`text-center font-bold py-3 rounded-xl ${gameState === "won" ? "bg-green-500/10 text-green-500 border border-green-500/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}>
            {gameState === "won" ? `Brilliant! The word was ${answer}` : `The word was ${answer}`}
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

// ─── SPELLING BEE GAME ─────────────────────────────────────────
const SPELLING_BEE_WORDS: { word: string; hint: string }[] = [
  { word: "ELOQUENT", hint: "fluent and persuasive in speaking" },
  { word: "AMBIGUOUS", hint: "open to more than one interpretation" },
  { word: "PERSEVERE", hint: "continue despite difficulty or delay" },
  { word: "ABUNDANCE", hint: "a very large quantity of something" },
  { word: "ILLUMINATE", hint: "light up or make something clear" },
  { word: "PHENOMENON", hint: "a remarkable or exceptional event" },
  { word: "TENACIOUS", hint: "not giving up; holding firm" },
  { word: "RESILIENT", hint: "able to recover quickly from setbacks" },
  { word: "MAGNANIMOUS", hint: "generous in forgiving others" },
  { word: "EBULLIENT", hint: "cheerful and full of energy" },
  { word: "FASTIDIOUS", hint: "very attentive to detail" },
  { word: "MELANCHOLY", hint: "a deep, persistent sadness" },
  { word: "LOQUACIOUS", hint: "tending to talk a great deal" },
  { word: "CAPRICIOUS", hint: "given to sudden changes of mood" },
  { word: "VIVACIOUS", hint: "attractively lively and animated" },
  { word: "OSTENTATIOUS", hint: "designed to impress others with wealth" },
  { word: "SURREPTITIOUS", hint: "done secretly or stealthily" },
  { word: "CONSCIENTIOUS", hint: "careful and thorough in one's work" },
  { word: "BENEVOLENT", hint: "well-meaning and kindly" },
  { word: "EXUBERANT", hint: "filled with lively energy and excitement" },
  { word: "INQUISITIVE", hint: "curious or eager to learn" },
  { word: "DILIGENT", hint: "steady and careful in one's work" },
  { word: "METICULOUS", hint: "showing great care and precision" },
  { word: "FLAMBOYANT", hint: "attracting attention; very showy" },
  { word: "EPHEMERAL", hint: "lasting for only a very short time" },
  { word: "MEDIOCRE", hint: "of only moderate or average quality" },
  { word: "VOCIFEROUS", hint: "expressing opinions loudly and forcefully" },
  { word: "EQUANIMITY", hint: "mental calmness under pressure" },
  { word: "PRECARIOUS", hint: "not secure; dependent on chance" },
  { word: "AUDACIOUS", hint: "showing willingness to take bold risks" },
  { word: "GARRULOUS", hint: "excessively talkative; wordy" },
  { word: "SUPERCILIOUS", hint: "behaving as if superior to others" },
  { word: "OBSEQUIOUS", hint: "excessively eager to please or obey" },
  { word: "CIRCUMSPECT", hint: "cautious; thinking carefully before acting" },
  { word: "NONCHALANT", hint: "appearing casually calm and relaxed" },
  { word: "LACONIC", hint: "using very few words" },
  { word: "LUGUBRIOUS", hint: "looking or sounding sad and dismal" },
  { word: "PEDANTIC", hint: "overly concerned with minor details" },
  { word: "UBIQUITOUS", hint: "present or appearing everywhere" },
  { word: "VERACITY", hint: "conforming to facts; truthfulness" },
  { word: "ZEALOUS", hint: "having great energy or enthusiasm" },
  { word: "NEFARIOUS", hint: "wicked and criminal in nature" },
  { word: "ALTRUISTIC", hint: "showing selfless concern for others" },
  { word: "ENIGMATIC", hint: "difficult to interpret or understand" },
  { word: "DIFFIDENT", hint: "modest or shy due to lack of confidence" },
  { word: "EGREGIOUS", hint: "outstandingly bad; shocking" },
  { word: "FERVENT", hint: "having passionate intensity" },
  { word: "GREGARIOUS", hint: "fond of the company of others; sociable" },
  { word: "HACKNEYED", hint: "lacking originality; overused" },
  { word: "INSIDIOUS", hint: "harmful but subtle and gradual" },
  { word: "JUBILANT", hint: "feeling or expressing great happiness" },
  { word: "MALLEABLE", hint: "easily shaped or influenced" },
  { word: "NEBULOUS", hint: "not clear or precise; vague" },
  { word: "OPULENT", hint: "richly luxurious and expensive" },
  { word: "QUERULOUS", hint: "complaining in a petulant way" },
  { word: "RAPACIOUS", hint: "aggressively greedy or grasping" },
  { word: "SAGACIOUS", hint: "having wisdom and good judgment" },
  { word: "TACITURN", hint: "reserved and uncommunicative in speech" },
  { word: "VORACIOUS", hint: "wanting or devouring great quantities" },
  { word: "WISTFUL", hint: "having a feeling of vague longing" },
  { word: "ACRIMONY", hint: "bitterness and ill feeling" },
  { word: "BELLICOSE", hint: "demonstrating aggression; warlike" },
  { word: "HALCYON", hint: "denoting a period of happiness and calm" },
  { word: "IMPETUOUS", hint: "acting quickly without thought or care" },
  { word: "JOCULAR", hint: "fond of or characterized by joking" },
  { word: "LACHRYMOSE", hint: "tearful or given to weeping" },
  { word: "NOMENCLATURE", hint: "the body of terms used in a subject" },
  { word: "PERNICIOUS", hint: "having a harmful or deadly effect" },
  { word: "RAUCOUS", hint: "making a loud, rough, unpleasant noise" },
  { word: "SANGUINE", hint: "optimistic, especially in tough times" },
  { word: "UMBRAGE", hint: "offense or annoyance" },
  { word: "VERBOSE", hint: "using more words than are needed" },
  { word: "WHIMSICAL", hint: "playfully quaint or fanciful" },
  { word: "PERSPICACIOUS", hint: "having ready insight; shrewd" },
  { word: "SERENDIPITY", hint: "finding something good by accident" },
  { word: "SCINTILLATING", hint: "brilliantly clever and fascinating" },
  { word: "LABYRINTHINE", hint: "like a maze; complicated and confusing" },
  { word: "RECALCITRANT", hint: "stubbornly uncooperative" },
  { word: "SYCOPHANT", hint: "a person who flatters to gain favor" },
  { word: "PROPITIOUS", hint: "giving a good chance of success" },
  { word: "COGENT", hint: "clear, logical and convincing" },
  { word: "EFFULGENT", hint: "radiant; shining brilliantly" },
  { word: "FURTIVE", hint: "attempting to avoid notice; secretive" },
  { word: "OMINOUS", hint: "suggesting something bad will happen" },
  { word: "TENEBROUS", hint: "dark; shadowy or obscure" },
  { word: "IMPECCABLE", hint: "in accordance with the highest standards" },
  { word: "PROFLIGATE", hint: "recklessly extravagant or wasteful" },
  { word: "OBDURATE", hint: "stubbornly refusing to change" },
  { word: "PERSPICACITY", hint: "the quality of having a ready insight" },
  { word: "INDEFATIGABLE", hint: "persisting tirelessly; never giving up" },
  { word: "PERFIDIOUS", hint: "deceitful and untrustworthy; treacherous" },
  { word: "MAGNILOQUENT", hint: "using very high-flown language" },
  { word: "SOLILOQUY", hint: "an act of speaking one's thoughts aloud" },
  { word: "TRUCULENT", hint: "eager or quick to argue or fight" },
  { word: "INCORRIGIBLE", hint: "not able to be corrected or improved" },
  { word: "MELLIFLUOUS", hint: "sweet or musical; pleasant to hear" },
  { word: "PONTIFICATE", hint: "express one's opinions pompously" },
  { word: "OBFUSCATE", hint: "make unclear or confusing" },
];

const BEE_BADGE_MILESTONES = [
  { streak: 5,  name: "Bee Apprentice", emoji: "🐝", color: "text-amber-600 bg-amber-500/10 border-amber-400/30" },
  { streak: 10, name: "Bee Scholar",    emoji: "📚🐝", color: "text-blue-600 bg-blue-500/10 border-blue-400/30" },
  { streak: 15, name: "Bee Expert",     emoji: "🌟🐝", color: "text-purple-600 bg-purple-500/10 border-purple-400/30" },
  { streak: 20, name: "Bee Master",     emoji: "🏆🐝", color: "text-primary bg-primary/10 border-primary/30" },
  { streak: 25, name: "Bee Legend",     emoji: "👑🐝", color: "text-yellow-600 bg-yellow-500/10 border-yellow-400/30" },
  { streak: 30, name: "Bee Supreme",    emoji: "⚡🐝", color: "text-rose-600 bg-rose-500/10 border-rose-400/30" },
];

function SpellingBeeGame({ onScore }: { onScore: (score: number) => void }) {
  const [wordPool] = useState(() => [...SPELLING_BEE_WORDS].sort(() => Math.random() - 0.5));
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerStarted, setTimerStarted] = useState(false);
  const [phase, setPhase] = useState<"ready" | "active" | "result">("ready");
  const [result, setResult] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [earnedStreaks, setEarnedStreaks] = useState<number[]>([]);
  const [newBadge, setNewBadge] = useState<typeof BEE_BADGE_MILESTONES[0] | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = wordPool[wordIdx % wordPool.length];
  const earnedBadges = BEE_BADGE_MILESTONES.filter(m => earnedStreaks.includes(m.streak));

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
        if (t <= 1) {
          stopTimer();
          setResult("timeout");
          setPhase("result");
          setStreak(0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [stopTimer]);

  const playWord = useCallback(() => {
    if (!window.speechSynthesis || isSpeaking || phase === "result") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.word.toLowerCase());
    utterance.rate = 0.75;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setPhase("active");
      startTimer();
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [currentWord.word, isSpeaking, phase, startTimer]);

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
      const milestone = BEE_BADGE_MILESTONES.find(m => m.streak === newStreak && !earnedStreaks.includes(m.streak));
      if (milestone) {
        setEarnedStreaks(prev => [...prev, milestone.streak]);
        setNewBadge(milestone);
      }
      if (newTotal === 100) setShowCertificate(true);
    } else {
      setStreak(0);
      setResult("wrong");
    }
    setPhase("result");
  }, [phase, timerStarted, typed, currentWord.word, streak, totalCorrect, timeLeft, stopTimer, onScore, earnedStreaks]);

  const nextWord = useCallback(() => {
    stopTimer();
    window.speechSynthesis?.cancel();
    setWordIdx(i => i + 1);
    setTyped("");
    setTimeLeft(30);
    setTimerStarted(false);
    setPhase("ready");
    setResult(null);
    setNewBadge(null);
    setIsSpeaking(false);
  }, [stopTimer]);

  // Auto-advance after result
  useEffect(() => {
    if (phase === "result" && !showCertificate && !newBadge) {
      const t = setTimeout(nextWord, 2800);
      return () => clearTimeout(t);
    }
  }, [phase, showCertificate, newBadge, nextWord]);

  // Physical keyboard submit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Enter") handleSubmit(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSubmit]);

  const letterSlots = Array.from({ length: currentWord.word.length }, (_, i) => typed[i]?.toUpperCase() ?? "");

  return (
    <div className="space-y-5">

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
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div className={`flex items-center gap-2 transition-colors ${!timerStarted ? "opacity-40" : timeLeft <= 10 ? "text-destructive" : ""}`}>
          <Timer className="h-4 w-4" />
          <span className="font-mono font-bold text-lg">
            00:{String(timeLeft).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress bar toward certificate */}
      <div className="space-y-1">
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${Math.min((totalCorrect / 100) * 100, 100)}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-right text-[10px] text-muted-foreground">{totalCorrect}/100 toward Spelling Bee Certificate</p>
      </div>

      {/* Badges row */}
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
        <p className="text-xs text-muted-foreground">
          {currentWord.word.length} letters · <em>{currentWord.hint}</em>
        </p>
      </div>

      {/* Letter slots */}
      <div className="flex justify-center flex-wrap gap-1.5">
        {letterSlots.map((letter, i) => (
          <div
            key={i}
            className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg font-mono transition-all ${
              result === "correct"
                ? "border-green-500 bg-green-500/10 text-green-600"
                : result === "wrong"
                ? letter
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-border bg-muted/30"
                : result === "timeout"
                ? "border-border bg-muted/30"
                : letter
                ? "border-primary bg-primary/10 text-primary"
                : timerStarted
                ? "border-border bg-card animate-pulse"
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
          disabled={isSpeaking || phase === "result"}
          title={timerStarted ? "Click to hear the word again" : "Click to hear your word — timer starts on first play"}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all border-2 ${
            isSpeaking
              ? "border-primary bg-primary/20 text-primary animate-pulse scale-110"
              : phase === "result"
              ? "border-border bg-muted text-muted-foreground opacity-40 cursor-not-allowed"
              : timerStarted
              ? "border-primary/60 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary hover:scale-110 active:scale-95"
              : "border-amber-500/60 bg-amber-500/5 text-amber-600 hover:bg-amber-500/20 hover:border-amber-500 hover:scale-110 active:scale-95"
          }`}
        >
          <Volume2 className="h-7 w-7" />
          {isSpeaking && (
            <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40" />
          )}
        </button>
        <p className="text-[11px] text-muted-foreground text-center">
          {isSpeaking ? "Listening…" : timerStarted ? "Click to hear again · Timer running" : "Click 🔊 — timer starts when word plays"}
        </p>
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
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
            />
            <Button
              onClick={handleSubmit}
              className="w-full h-11 rounded-xl bg-primary font-bold"
              disabled={!typed.trim()}
            >
              Submit Spelling ↵
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result message */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`text-center py-4 px-4 rounded-xl font-bold text-sm ${
              result === "correct"
                ? "bg-green-500/10 text-green-600 border border-green-500/30"
                : result === "timeout"
                ? "bg-amber-500/10 text-amber-600 border border-amber-400/30"
                : "bg-destructive/10 text-destructive border border-destructive/30"
            }`}
          >
            {result === "correct" && `✅ Correct! "${currentWord.word}" — next word coming…`}
            {result === "timeout" && `⏰ Time's up! The word was "${currentWord.word}"`}
            {result === "wrong" && `❌ It's "${currentWord.word}" — keep going!`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* New badge announcement */}
      <AnimatePresence>
        {newBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`text-center py-5 rounded-2xl border space-y-2 ${newBadge.color}`}
          >
            <p className="text-3xl">{newBadge.emoji}</p>
            <p className="font-black text-base">Badge Earned: {newBadge.name}!</p>
            <p className="text-xs opacity-70">{newBadge.streak} words correct in a row</p>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full mt-2 text-xs"
              onClick={() => { setNewBadge(null); nextWord(); }}
            >
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
                <h2 className="text-2xl font-black mt-1 leading-tight">Spelling Bee<br />Certificate</h2>
              </div>
              <div className="py-4 border-y border-border/60 space-y-2">
                <p className="text-sm text-muted-foreground">This certifies the achievement of</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <p className="text-4xl font-black text-primary">100</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground">correctly spelled words in the<br /><strong>Lexigenz Spelling Bee</strong></p>
              </div>
              {earnedBadges.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5">
                  {earnedBadges.map(b => (
                    <span key={b.name} className={`text-[10px] font-bold px-2 py-1 rounded-full border ${b.color}`}>
                      {b.emoji} {b.name}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground">Issued by Lexigenz Trading · Lexigenz Spelling Bee</p>
              <Button
                size="lg"
                className="w-full rounded-2xl bg-primary font-bold"
                onClick={() => { setShowCertificate(false); nextWord(); }}
              >
                Continue Playing 🐝
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────
const GAMES = [
  { id: "wordle", name: "Wordle", tag: "Lexigenz Edition", desc: "Guess the 5-letter word in 6 attempts. Green = correct spot. Yellow = wrong spot.", status: "live" },
  { id: "lexigen-game", name: "Lexigenz Game", tag: "Signature", desc: "Race to unscramble 7 letters into LEXIGENZ before the 15-second timer runs out.", status: "live" },
  { id: "spelling-bee", name: "Spelling Bee", tag: "Lexigenz Edition", desc: "Hear the word, then spell it correctly in 30 seconds. Earn badges every 5 in a row. Reach 100 for a Lexigenz Certificate.", status: "live" },
  { id: "scrabble", name: "Scrabble", tag: "vs Computer", desc: "Drag and drop tiles to form high-scoring words on the board.", status: "coming" },
  { id: "crossword", name: "Crossword", tag: "vs Computer", desc: "Fill in themed clues. New puzzle every day.", status: "coming" },
  { id: "word-grid", name: "Word Grid", tag: "6x6 Challenge", desc: "Find hidden words in all directions in a 6x6 letter grid.", status: "coming" },
];

export default function Play() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Play for Words
            </span>
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
                return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`relative p-6 rounded-2xl border bg-card transition-all group ${
                      game.status === "live"
                        ? "border-primary/30 hover:border-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] cursor-pointer"
                        : "border-border opacity-70"
                    }`}
                    onClick={() => game.status === "live" && setActiveGame(game.id)}
                    data-testid={`game-card-${game.id}`}
                  >
                    {game.status === "coming" && (
                      <div className="absolute inset-0 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                        <Badge variant="secondary" className="font-bold">Coming Soon</Badge>
                      </div>
                    )}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs font-bold ${game.id === "spelling-bee" ? "bg-amber-500/10 text-amber-600 border-amber-400/30" : "bg-primary/10 text-primary border-primary/20"}`}>
                          {game.tag}
                        </Badge>
                        {game.status === "live" && (
                          game.id === "spelling-bee"
                            ? <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">🐝</span>
                            : <Gamepad2 className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold">{game.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{game.desc}</p>
                      {topScore && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Trophy className="h-3 w-3 text-yellow-400" />
                          <span>Top: <strong className="text-foreground">{topScore.score}</strong> by {topScore.username}</span>
                        </div>
                      )}
                      {game.status === "live" && (
                        <Button size="sm" className={`w-full rounded-full mt-2 font-bold ${game.id === "spelling-bee" ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-primary hover:bg-primary/90"}`} data-testid={`button-play-${game.id}`}>
                          {game.id === "spelling-bee" ? "🐝 Play Spelling Bee" : "Play Now"}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Active Game Panel */}
          <AnimatePresence>
            {activeGame && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-lg mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {activeGame === "spelling-bee" && <span>🐝</span>}
                    {GAMES.find(g => g.id === activeGame)?.name}
                  </h2>
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setActiveGame(null)} data-testid="button-back-to-games">
                    All Games
                  </Button>
                </div>

                <div className={`p-6 rounded-2xl border bg-card shadow-[0_0_40px_rgba(139,92,246,0.1)] ${activeGame === "spelling-bee" ? "border-amber-400/30" : "border-primary/30"}`}>
                  {activeGame === "wordle" && <WordleGame onScore={(s) => handleScore("Wordle", s)} />}
                  {activeGame === "lexigen-game" && <LexigenGame onScore={(s) => handleScore("Lexigenz Game", s)} />}
                  {activeGame === "spelling-bee" && <SpellingBeeGame onScore={(s) => handleScore("Spelling Bee", s)} />}
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
    </div>
  );
}
