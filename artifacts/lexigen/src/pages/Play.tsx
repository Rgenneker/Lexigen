import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetWordleWord, useGetLexigenWord, useListGameScores, useSubmitGameScore, getListGameScoresQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Timer, Gamepad2, RotateCcw } from "lucide-react";

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
      {/* Grid */}
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

      {/* Status */}
      <AnimatePresence>
        {gameState !== "playing" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center font-bold py-3 rounded-xl ${gameState === "won" ? "bg-green-500/10 text-green-500 border border-green-500/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}
          >
            {gameState === "won" ? `Brilliant! The word was ${answer}` : `The word was ${answer}`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard */}
      <div className="space-y-1.5">
        {KEYBOARD.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map(key => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                className={`h-10 rounded-lg font-bold text-xs font-mono transition-colors ${
                  key.length > 1 ? "px-3" : "w-8"
                } ${
                  usedLetters[key] === "correct" ? "bg-green-500 text-white"
                  : usedLetters[key] === "present" ? "bg-yellow-500 text-white"
                  : usedLetters[key] === "absent" ? "bg-muted text-muted-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                data-testid={`wordle-key-${key}`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEXIGEN GAME ────────────────────────────────────────────
function LexigenGame({ onScore }: { onScore: (score: number) => void }) {
  const { data: gameData, isLoading } = useGetLexigenWord();
  const [letters, setLetters] = useState<{ char: string; used: boolean }[]>([]);
  const [formed, setFormed] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (gameData && gameState === "playing") {
      setLetters(gameData.letters.map(c => ({ char: c, used: false })));
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setGameState("lost");
            return 0;
          }
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
      const score = Math.floor(timeLeft * 10);
      onScore(score);
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
      {/* Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className={`font-mono font-bold text-lg ${timeLeft < 30 ? "text-destructive" : ""}`}>
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
        <button onClick={handleReset} className="text-muted-foreground hover:text-foreground transition-colors">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Target hint */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Spell the word</p>
        <div className="flex justify-center gap-2">
          {Array.from({ length: gameData?.targetWord.length ?? 7 }).map((_, i) => (
            <div
              key={i}
              className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-lg font-mono transition-all ${
                formed[i]
                  ? gameState === "won" ? "border-green-500 bg-green-500/10 text-green-500"
                    : "border-primary bg-primary/10 text-primary"
                  : "border-border"
              }`}
              data-testid={`lexigen-slot-${i}`}
            >
              {formed[i] || ""}
            </div>
          ))}
        </div>
        {gameData?.hint && <p className="text-xs text-muted-foreground mt-2">Hint: {gameData.hint}</p>}
      </div>

      {/* Letter tiles */}
      <div className="flex justify-center flex-wrap gap-2">
        {letters.map((l, i) => (
          <button
            key={i}
            onClick={() => handlePickLetter(i)}
            disabled={l.used || gameState !== "playing"}
            className={`w-12 h-12 rounded-xl border-2 font-bold text-lg font-mono transition-all ${
              l.used
                ? "border-border bg-muted text-muted-foreground opacity-30"
                : "border-primary/40 bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary hover:scale-105 active:scale-95"
            }`}
            data-testid={`lexigen-tile-${i}`}
          >
            {l.char}
          </button>
        ))}
      </div>

      {/* Undo */}
      {formed.length > 0 && gameState === "playing" && (
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              const last = formed[formed.length - 1];
              const li = letters.map((l, i) => l.used && l.char === last ? i : -1).filter(i => i >= 0).pop();
              if (li !== undefined && li >= 0) {
                const nl = [...letters];
                nl[li] = { ...nl[li], used: false };
                setLetters(nl);
              }
              setFormed(f => f.slice(0, -1));
            }}
          >
            Undo
          </Button>
        </div>
      )}

      <AnimatePresence>
        {gameState !== "playing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-4 rounded-xl font-bold ${gameState === "won" ? "bg-green-500/10 text-green-500 border border-green-500/30" : "bg-destructive/10 text-destructive border border-destructive/30"}`}
          >
            {gameState === "won" ? `Nailed it! LEXIGEN spelled in ${120 - timeLeft}s` : `Time's up! The word was ${gameData?.targetWord}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────
const GAMES = [
  { id: "wordle", name: "Wordle", tag: "Lexigen Edition", desc: "Guess the 5-letter word in 6 attempts. Green = correct spot. Yellow = wrong spot.", status: "live" },
  { id: "lexigen-game", name: "Lexigen Game", tag: "Signature", desc: "Race to unscramble 7 letters into LEXIGEN before time expires.", status: "live" },
  { id: "scrabble", name: "Scrabble", tag: "vs Computer", desc: "Drag and drop tiles to form high-scoring words on the board.", status: "coming" },
  { id: "crossword", name: "Crossword", tag: "vs Computer", desc: "Fill in themed clues. New puzzle every day.", status: "coming" },
  { id: "spelling-bee", name: "Spelling Bee", tag: "Lexigen Edition", desc: "Find words in the hexagonal grid using the center letter.", status: "coming" },
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
      {/* Hero */}
      <section className="pt-20 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-12"
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Play for Words
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              GAMES THAT MAKE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                WORDS FUN.
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Six Lexigen-branded word games. Play solo or challenge a friend. Every game sharpens your vocabulary.
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
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">{game.tag}</Badge>
                        {game.status === "live" && <Gamepad2 className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
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
                        <Button size="sm" className="w-full rounded-full mt-2 bg-primary hover:bg-primary/90 font-bold" data-testid={`button-play-${game.id}`}>
                          Play Now
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-lg mx-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {GAMES.find(g => g.id === activeGame)?.name}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setActiveGame(null)}
                    data-testid="button-back-to-games"
                  >
                    All Games
                  </Button>
                </div>

                <div className="p-6 rounded-2xl border border-primary/30 bg-card shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                  {activeGame === "wordle" && (
                    <WordleGame onScore={(s) => handleScore("Wordle", s)} />
                  )}
                  {activeGame === "lexigen-game" && (
                    <LexigenGame onScore={(s) => handleScore("Lexigen Game", s)} />
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
    </div>
  );
}
