import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_WORDS } from '@/data/gameWords';

type WGLevel = { id:string; name:string; emoji:string; tagline:string; size:number; secs:number; minLen:number; };

const LEVELS: WGLevel[] = [
  { id:'starter', name:'Starter', emoji:'🌱', tagline:'4×4 grid · 90 seconds · 3+ letter words', size:4, secs:90,  minLen:3 },
  { id:'medium',  name:'Medium',  emoji:'🎯', tagline:'4×4 grid · 60 seconds · 3+ letter words', size:4, secs:60,  minLen:3 },
  { id:'hard',    name:'Hard',    emoji:'🔥', tagline:'5×5 grid · 45 seconds · 4+ letter words', size:5, secs:45,  minLen:4 },
  { id:'expert',  name:'Expert',  emoji:'👑', tagline:'5×5 grid · 30 seconds · 5+ letter words', size:5, secs:30,  minLen:5 },
];

const LETTER_POOL = 'AAAAAEEEEEEIIIIOOOOUURRRSSTTNNLLDDGGHHMMPPCBBFFWWYYVK'.split('');

function makeGrid(size: number): string[][] {
  return Array.from({ length:size }, () =>
    Array.from({ length:size }, () => LETTER_POOL[Math.floor(Math.random() * LETTER_POOL.length)])
  );
}

function isAdj(a:[number,number], b:[number,number]): boolean {
  return Math.abs(a[0]-b[0]) <= 1 && Math.abs(a[1]-b[1]) <= 1 && !(a[0]===b[0] && a[1]===b[1]);
}

function wordPts(len: number): number {
  if (len >= 8) return 11;
  if (len >= 7) return 8;
  if (len >= 6) return 5;
  if (len >= 5) return 3;
  if (len >= 4) return 2;
  return 1;
}

interface Props { onScore: (n: number) => void; }

export function WordGridGame({ onScore }: Props) {
  const [level, setLevel] = useState<WGLevel | null>(null);
  const [grid, setGrid]   = useState<string[][]>([]);
  const [path, setPath]   = useState<[number,number][]>([]);
  const [dragging, setDragging] = useState(false);
  const [found, setFound] = useState<{ word:string; pts:number }[]>([]);
  const [rejected, setRejected] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const foundRef     = useRef(found);
  const doneRef      = useRef(false);

  useEffect(() => { foundRef.current = found; }, [found]);

  function startGame(l: WGLevel) {
    doneRef.current = false;
    setLevel(l); setGrid(makeGrid(l.size));
    setPath([]); setDragging(false); setFound([]); setRejected('');
    setTimeLeft(l.secs); setDone(false);
  }

  useEffect(() => {
    if (!level || doneRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          doneRef.current = true;
          setDone(true);
          const total = foundRef.current.reduce((s, w) => s + w.pts, 0) * 10;
          onScore(total);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [level]);

  function getCellAt(x: number, y: number): [number,number] | null {
    const el = document.elementFromPoint(x, y);
    const cell = el?.closest('[data-wg]') as HTMLElement | null;
    if (!cell) return null;
    const r = parseInt(cell.dataset.r ?? '-1');
    const c = parseInt(cell.dataset.c ?? '-1');
    return r >= 0 && c >= 0 ? [r,c] : null;
  }

  function onDown(e: React.PointerEvent) {
    const cell = getCellAt(e.clientX, e.clientY);
    if (!cell) return;
    containerRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    setPath([cell]);
    setRejected('');
  }

  function onMove(e: React.PointerEvent) {
    if (!dragging) return;
    const cell = getCellAt(e.clientX, e.clientY);
    if (!cell) return;
    setPath(prev => {
      if (!prev.length) return [cell];
      const last = prev[prev.length-1];
      if (last[0]===cell[0] && last[1]===cell[1]) return prev;
      // allow backtracking
      if (prev.length >= 2) {
        const sl = prev[prev.length-2];
        if (sl[0]===cell[0] && sl[1]===cell[1]) return prev.slice(0,-1);
      }
      if (isAdj(last, cell) && !prev.some(p => p[0]===cell[0] && p[1]===cell[1])) return [...prev, cell];
      return prev;
    });
  }

  function onUp(e: React.PointerEvent) {
    if (!dragging) return;
    setDragging(false);
    containerRef.current?.releasePointerCapture(e.pointerId);
    commitWord();
  }

  function commitWord() {
    if (!level) return;
    setPath(prev => {
      if (prev.length < level.minLen) return [];
      const word = prev.map(([r,c]) => grid[r][c]).join('').toLowerCase();
      if (!GAME_WORDS.has(word)) {
        setRejected(`"${word}" - not in word list`);
        return [];
      }
      if (foundRef.current.some(f => f.word === word)) {
        setRejected(`"${word}" - already found!`);
        return [];
      }
      const pts = wordPts(word.length);
      setFound(f => [...f, { word, pts }]);
      setRejected('');
      return [];
    });
  }

  function endEarly() {
    clearInterval(timerRef.current);
    doneRef.current = true;
    setDone(true);
    const total = found.reduce((s, w) => s + w.pts, 0) * 10;
    onScore(total);
  }

  const currentWord = path.map(([r,c]) => grid[r]?.[c] ?? '').join('');
  const totalPts = found.reduce((s, w) => s + w.pts, 0);

  if (!level) return (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">🔤 Choose Your Level</p>
        <p className="text-sm text-muted-foreground">Swipe/drag adjacent letters to spell words - like Boggle!</p>
      </div>
      {LEVELS.map(l => (
        <div key={l.id} onClick={() => startGame(l)}
          className="flex items-center gap-3 p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-all active:scale-[0.98]">
          <span className="text-2xl">{l.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold">{l.name}</div>
            <div className="text-xs text-muted-foreground truncate">{l.tagline}</div>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{l.size}×{l.size}</span>
        </div>
      ))}
    </div>
  );

  if (done) return (
    <div className="text-center space-y-5 py-8">
      <div className="text-5xl">⏰</div>
      <div>
        <div className="text-3xl font-bold">{totalPts * 10} pts</div>
        <div className="text-muted-foreground text-sm">{found.length} word{found.length !== 1 ? 's' : ''} found</div>
      </div>
      {found.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center px-2">
          {found.map(f => (
            <span key={f.word} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono">
              {f.word} <span className="opacity-60">+{f.pts}</span>
            </span>
          ))}
        </div>
      )}
      <Button onClick={() => { setLevel(null); setDone(false); }} className="rounded-full bg-primary font-bold px-8">Play Again</Button>
    </div>
  );

  const cs = level.size === 4 ? 'w-14 h-14 text-xl' : 'w-11 h-11 text-base';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-primary">{totalPts * 10} pts</span>
          <span className="text-muted-foreground">· {found.length} word{found.length !== 1 ? 's' : ''}</span>
        </div>
        <span className={`font-mono font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width:`${(timeLeft/level.secs)*100}%` }} />
      </div>

      {/* Current word display */}
      <div className="h-11 flex items-center justify-center bg-muted/30 rounded-xl border border-border px-4">
        {currentWord
          ? <span className="font-mono font-bold text-xl tracking-widest">{currentWord.toLowerCase()}</span>
          : <span className="text-muted-foreground text-sm">Hold and drag to connect letters</span>
        }
      </div>

      {/* Letter grid */}
      <div
        ref={containerRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="select-none touch-none mx-auto w-fit"
      >
        <div className="inline-grid gap-1.5"
          style={{ gridTemplateColumns:`repeat(${level.size}, minmax(0, 1fr))` }}>
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const inPath = path.some(p => p[0]===r && p[1]===c);
              const idx    = path.findIndex(p => p[0]===r && p[1]===c);
              return (
                <div key={`${r}-${c}`}
                  data-wg="" data-r={r} data-c={c}
                  className={`${cs} rounded-xl border-2 font-bold flex items-center justify-center relative transition-all ${
                    inPath
                      ? 'bg-primary border-primary text-white shadow-lg scale-95'
                      : 'bg-card border-border'
                  }`}>
                  {letter}
                  {inPath && <span className="absolute top-0.5 left-1 text-[9px] text-white/60 font-bold leading-none">{idx+1}</span>}
                </div>
              );
            })
          )}
        </div>
      </div>

      <AnimatePresence>
        {rejected && (
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="text-center text-xs text-muted-foreground">{rejected}</motion.p>
        )}
      </AnimatePresence>

      {/* Found words */}
      {found.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {found.map(f => (
            <span key={f.word} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono">
              {f.word} <span className="opacity-60">+{f.pts}</span>
            </span>
          ))}
        </div>
      )}

      <Button variant="outline" className="w-full rounded-full text-sm" onClick={endEarly}>
        End Round & See Score
      </Button>
    </div>
  );
}
