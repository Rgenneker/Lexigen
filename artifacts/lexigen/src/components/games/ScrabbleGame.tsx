import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Send, ChevronRight } from 'lucide-react';
import { GAME_WORDS } from '@/data/gameWords';

const LETTER_VALUES: Record<string, number> = {
  A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:5,L:1,M:3,
  N:1,O:1,P:3,Q:10,R:1,S:1,T:1,U:1,V:4,W:4,X:8,Y:4,Z:10,
};

const VOWELS = ['A','E','I','O','U'];
const CONSONANTS = 'RRRSSTTNNLLLMMPPBBCCDDFGGHHWWVVYYK'.split('');

type Level = { id:string; name:string; emoji:string; tagline:string; rounds:number; minLen:number; secs:number; };

const LEVELS: Level[] = [
  { id:'casual',   name:'Casual',   emoji:'😊', tagline:'Form any 3+ letter word from your 7 tiles', rounds:5, minLen:3, secs:60 },
  { id:'standard', name:'Standard', emoji:'🎯', tagline:'4+ letters - classic Scrabble scoring',      rounds:6, minLen:4, secs:45 },
  { id:'advanced', name:'Advanced', emoji:'🔥', tagline:'5+ letters only - bigger points per round',  rounds:7, minLen:5, secs:35 },
  { id:'master',   name:'Master',   emoji:'👑', tagline:'Use all 7 tiles for a +50 BINGO bonus',      rounds:8, minLen:5, secs:25 },
];

interface Tile { id:number; letter:string; value:number; }

function makeRack(): Tile[] {
  const letters: string[] = [];
  const vCount = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < vCount; i++) letters.push(VOWELS[Math.floor(Math.random() * VOWELS.length)]);
  while (letters.length < 7) letters.push(CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)]);
  letters.sort(() => Math.random() - 0.5);
  return letters.map((l, i) => ({ id: Date.now() + i, letter: l, value: LETTER_VALUES[l] ?? 1 }));
}

function calcScore(word: string, usedAll: boolean): number {
  const base = [...word.toUpperCase()].reduce((s, l) => s + (LETTER_VALUES[l] ?? 1), 0);
  const mult = word.length >= 7 ? 3 : word.length >= 6 ? 2 : word.length >= 5 ? 1.5 : 1;
  return Math.round(base * mult) + (usedAll ? 50 : 0);
}

function canForm(word: string, tiles: Tile[]): boolean {
  const pool = tiles.map(t => t.letter);
  for (const ch of word.toUpperCase()) {
    const idx = pool.indexOf(ch);
    if (idx === -1) return false;
    pool.splice(idx, 1);
  }
  return true;
}

interface Props { onScore: (n: number) => void; }

export function ScrabbleGame({ onScore }: Props) {
  const [level, setLevel] = useState<Level | null>(null);
  const [rack, setRack] = useState<Tile[]>([]);
  const [word, setWord] = useState<Tile[]>([]);
  const [round, setRound] = useState(1);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState<{ score:number; word:string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function startGame(l: Level) {
    setLevel(l); setRound(1); setTotal(0); setDone(false);
    setRack(makeRack()); setWord([]); setResult(null);
    setTimeLeft(l.secs); setError('');
  }

  useEffect(() => {
    if (!level || result || done) { clearInterval(timerRef.current); return; }
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setResult({ score:0, word:'' }); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [level, round, result]);

  function pickTile(tile: Tile) {
    if (result) return;
    setRack(r => r.filter(t => t.id !== tile.id));
    setWord(w => [...w, tile]);
    setError('');
  }
  function returnTile(tile: Tile) {
    if (result) return;
    setWord(w => w.filter(t => t.id !== tile.id));
    setRack(r => [...r, tile]);
  }

  function submit() {
    if (!level) return;
    clearInterval(timerRef.current);
    const w = word.map(t => t.letter).join('');
    if (w.length < level.minLen) { setError(`Need at least ${level.minLen} letters`); return; }
    if (!canForm(w, rack.concat(word))) { setError('Invalid tiles used'); return; }
    if (!GAME_WORDS.has(w.toLowerCase())) { setError(`"${w.toLowerCase()}" - not in word list, try again`); return; }
    const sc = calcScore(w, word.length === 7);
    setResult({ score:sc, word:w });
    setTotal(t => t + sc);
    setError('');
  }

  function nextRound() {
    if (!level) return;
    const newTotal = total;
    if (round >= level.rounds) { setDone(true); onScore(newTotal); return; }
    setRound(r => r + 1);
    setRack(makeRack()); setWord([]); setResult(null);
    setTimeLeft(level.secs); setError('');
  }

  if (!level) return (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">🔡 Choose Your Level</p>
        <p className="text-sm text-muted-foreground">Tap tiles to build a word. Rare letters score more!</p>
      </div>
      {LEVELS.map(l => (
        <div key={l.id} onClick={() => startGame(l)}
          className="flex items-center gap-3 p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-all active:scale-[0.98]">
          <span className="text-2xl">{l.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold">{l.name}</div>
            <div className="text-xs text-muted-foreground truncate">{l.tagline}</div>
          </div>
          <div className="text-xs text-muted-foreground shrink-0">{l.secs}s · {l.rounds}R</div>
        </div>
      ))}
    </div>
  );

  if (done) return (
    <div className="text-center space-y-5 py-8">
      <div className="text-5xl">🏆</div>
      <div>
        <div className="text-3xl font-bold">{total}</div>
        <div className="text-muted-foreground text-sm">total points - {level.rounds} rounds of {level.name}</div>
      </div>
      <Button onClick={() => { setLevel(null); setDone(false); }} className="rounded-full bg-primary font-bold px-8">Play Again</Button>
    </div>
  );

  const wordStr = word.map(t => t.letter).join('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-foreground">Round {round} / {level.rounds}</span>
        <div className="flex gap-4">
          <span className="font-mono font-bold text-primary">{total} pts</span>
          <span className={`font-mono font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</span>
        </div>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width:`${(timeLeft/level.secs)*100}%` }} />
      </div>

      <div className="min-h-[56px] flex items-center justify-center gap-1.5 p-3 bg-muted/30 rounded-2xl border border-border flex-wrap">
        {word.length === 0
          ? <span className="text-muted-foreground text-sm">Tap tiles below to build your word</span>
          : word.map(tile => (
            <motion.button key={tile.id} onClick={() => returnTile(tile)} disabled={!!result}
              initial={{ scale:0.8, y:-4 }} animate={{ scale:1, y:0 }}
              className="relative w-10 h-10 rounded-lg bg-primary text-white font-bold text-base flex items-center justify-center shadow-md hover:bg-primary/80 active:scale-90 transition-all disabled:opacity-60">
              {tile.letter}
              <span className="absolute bottom-0.5 right-0.5 text-[8px] opacity-70">{tile.value}</span>
            </motion.button>
          ))
        }
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {rack.map(tile => (
          <motion.button key={tile.id} onClick={() => pickTile(tile)} disabled={!!result}
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="relative w-12 h-12 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 font-bold text-xl flex items-center justify-center active:scale-90 transition-all disabled:opacity-50">
            {tile.letter}
            <span className="absolute bottom-0.5 right-1 text-[8px] text-muted-foreground">{tile.value}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {error && <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="text-center text-sm text-red-500 font-medium">{error}</motion.p>}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            className={`text-center p-4 rounded-2xl ${result.score > 0 ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50 border border-border'}`}>
            {result.score > 0 ? (
              <>
                <p className="text-2xl font-bold text-primary">+{result.score} pts</p>
                <p className="font-mono tracking-widest mt-1">{result.word.toLowerCase()}</p>
                {word.length === 7 && <p className="text-xs text-amber-600 font-bold mt-1">🔥 BINGO! Used all 7 tiles (+50 bonus)</p>}
              </>
            ) : <p className="text-muted-foreground font-medium">Round skipped - 0 points</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {result ? (
        <Button className="w-full rounded-full bg-primary font-bold" onClick={nextRound}>
          {round >= level.rounds ? 'See Final Score' : 'Next Round'} <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 rounded-full" onClick={() => { setWord([]); setRack(makeRack()); setError(''); }}>
            <RotateCcw className="h-4 w-4 mr-1.5" /> Shuffle
          </Button>
          <Button variant="ghost" className="rounded-full px-4 text-muted-foreground text-sm"
            onClick={() => { clearInterval(timerRef.current); setResult({ score:0, word:'' }); }}>
            Skip
          </Button>
          <Button className="flex-1 rounded-full bg-primary font-bold" onClick={submit} disabled={word.length === 0}>
            <Send className="h-4 w-4 mr-1.5" /> Submit
          </Button>
        </div>
      )}
    </div>
  );
}
