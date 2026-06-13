import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

type Dir = 'across' | 'down';
type Entry = { num:number; dir:Dir; row:number; col:number; answer:string; clue:string; };
type Puzzle = { title:string; size:number; entries:Entry[]; };
type Level = { id:string; name:string; emoji:string; tagline:string; puzzle:Puzzle; };

const PUZZLES: Puzzle[] = [
  {
    title:'Pop Culture', size:5,
    entries:[
      { num:1, dir:'across', row:0, col:0, answer:'MUSIC', clue:'Melodies and rhythms that move your soul' },
      { num:3, dir:'across', row:2, col:0, answer:'NAIVE', clue:'Lacking worldly experience or judgement' },
      { num:4, dir:'across', row:4, col:0, answer:'EXTRA', clue:'More than needed — or a background actor' },
      { num:1, dir:'down',   row:0, col:0, answer:'MINCE', clue:'Chop finely, or speak with forced delicacy' },
      { num:2, dir:'down',   row:0, col:2, answer:'SAINT', clue:'A person of exceptional holiness or virtue' },
    ],
  },
  {
    title:'SA Vibes', size:5,
    entries:[
      { num:1, dir:'across', row:0, col:0, answer:'BRAVO', clue:'"Well done!" — a shout of approval' },
      { num:3, dir:'across', row:2, col:0, answer:'SIREN', clue:'Alarm sound, or an irresistibly alluring person' },
      { num:4, dir:'across', row:4, col:0, answer:'DANCE', clue:'Move rhythmically to music' },
      { num:1, dir:'down',   row:0, col:0, answer:'BASED', clue:'Grounded in fact — or Gen Z for "admirable"' },
      { num:2, dir:'down',   row:0, col:4, answer:'OZONE', clue:'The protective atmospheric layer above Earth' },
    ],
  },
  {
    title:'Word Power', size:5,
    entries:[
      { num:1, dir:'across', row:0, col:0, answer:'CLAIM', clue:'Assert ownership, or say something is true' },
      { num:3, dir:'across', row:2, col:0, answer:'CANOE', clue:'A narrow boat driven by a paddle' },
      { num:4, dir:'across', row:4, col:0, answer:'EAGLE', clue:'Large bird of prey; two under par in golf' },
      { num:1, dir:'down',   row:0, col:0, answer:'CACHE', clue:'A secret hidden store of valuable items' },
      { num:2, dir:'down',   row:0, col:1, answer:'LIANA', clue:'A long woody climbing vine of tropical forests' },
    ],
  },
  {
    title:'Vocab Master', size:5,
    entries:[
      { num:1, dir:'across', row:0, col:0, answer:'SHIRT', clue:'Common garment worn on the upper body' },
      { num:3, dir:'across', row:2, col:0, answer:'ANGER', clue:'Strong feeling of displeasure or hostility' },
      { num:4, dir:'across', row:4, col:0, answer:'PROOF', clue:'Conclusive evidence that something is true' },
      { num:1, dir:'down',   row:0, col:0, answer:'SHARP', clue:'Having a fine cutting edge — or mentally keen' },
      { num:2, dir:'down',   row:0, col:1, answer:'HONOR', clue:'High respect, or great esteem given to someone' },
    ],
  },
];

const LEVELS: Level[] = [
  { id:'rookie',  name:'Rookie',  emoji:'🌱', tagline:'Simple vocab, get into the groove',      puzzle:PUZZLES[0] },
  { id:'regular', name:'Regular', emoji:'🎯', tagline:'Everyday words with a cultural flavour',  puzzle:PUZZLES[1] },
  { id:'sharp',   name:'Sharp',   emoji:'🔥', tagline:'Rarer clues, tighter vocabulary',        puzzle:PUZZLES[2] },
  { id:'wizard',  name:'Wizard',  emoji:'🧙', tagline:'Advanced words — the full Lexigenz test', puzzle:PUZZLES[3] },
];

function buildSolved(entries: Entry[], size: number): string[][] {
  const g: string[][] = Array.from({ length:size }, () => Array(size).fill('#'));
  for (const e of entries) {
    for (let i = 0; i < e.answer.length; i++) {
      const r = e.dir === 'across' ? e.row : e.row + i;
      const c = e.dir === 'across' ? e.col + i : e.col;
      g[r][c] = e.answer[i];
    }
  }
  return g;
}

function buildPlayer(solved: string[][]): string[][] {
  return solved.map(row => row.map(c => (c === '#' ? '#' : '')));
}

function cellNum(row: number, col: number, entries: Entry[]): number | null {
  const e = entries.find(e => e.row === row && e.col === col);
  return e ? e.num : null;
}

function getEntryValue(entry: Entry, grid: string[][]): string {
  return Array.from({ length:entry.answer.length }, (_, i) => {
    const r = entry.dir === 'across' ? entry.row : entry.row + i;
    const c = entry.dir === 'across' ? entry.col + i : entry.col;
    return grid[r]?.[c] ?? '';
  }).join('');
}

function setEntryValue(entry: Entry, value: string, grid: string[][]): string[][] {
  const n = grid.map(r => [...r]);
  for (let i = 0; i < entry.answer.length; i++) {
    const r = entry.dir === 'across' ? entry.row : entry.row + i;
    const c = entry.dir === 'across' ? entry.col + i : entry.col;
    n[r][c] = value[i]?.toUpperCase() ?? '';
  }
  return n;
}

interface Props { onScore: (n: number) => void; }

export function CrosswordGame({ onScore }: Props) {
  const [level, setLevel] = useState<Level | null>(null);
  const [playerGrid, setPlayerGrid] = useState<string[][]>([]);
  const [solved, setSolved] = useState<string[][]>([]);
  const [selected, setSelected] = useState<Entry | null>(null);
  const [checked, setChecked] = useState(false);
  const [wrongCells, setWrongCells] = useState<Set<string>>(new Set());
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function startGame(l: Level) {
    const sv = buildSolved(l.puzzle.entries, l.puzzle.size);
    setLevel(l); setSolved(sv); setPlayerGrid(buildPlayer(sv));
    setSelected(null); setChecked(false); setWrongCells(new Set());
    setElapsed(0); setStartTime(Date.now()); setDone(false);
  }

  useEffect(() => {
    if (!level || done) return;
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 500);
    return () => clearInterval(timerRef.current);
  }, [level, startTime, done]);

  function selectEntry(e: Entry) {
    setSelected(e);
    setTimeout(() => inputRef.current?.focus(), 60);
  }

  function handleCellClick(r: number, c: number) {
    if (!level || solved[r]?.[c] === '#') return;
    const candidates = level.puzzle.entries.filter(e => {
      if (e.dir === 'across') return e.row === r && c >= e.col && c < e.col + e.answer.length;
      return e.col === c && r >= e.row && r < e.row + e.answer.length;
    });
    if (!candidates.length) return;
    if (selected && candidates.some(c => c.dir === selected.dir && c.row === selected.row && c.col === selected.col)) {
      const other = candidates.find(c => !(c.dir === selected.dir && c.row === selected.row && c.col === selected.col));
      if (other) { selectEntry(other); return; }
    }
    selectEntry(candidates[0]);
  }

  function handleInput(raw: string) {
    if (!selected || !level) return;
    const clean = raw.toUpperCase().replace(/[^A-Z]/g, '').slice(0, selected.answer.length);
    setPlayerGrid(g => setEntryValue(selected, clean, g));
    setChecked(false);
    setWrongCells(new Set());
  }

  function checkAnswers() {
    if (!level) return;
    const sv = buildSolved(level.puzzle.entries, level.puzzle.size);
    const wrong = new Set<string>();
    let allCorrect = true;
    for (let r = 0; r < level.puzzle.size; r++) {
      for (let c = 0; c < level.puzzle.size; c++) {
        if (sv[r][c] !== '#') {
          if (playerGrid[r]?.[c] !== sv[r][c]) {
            wrong.add(`${r}-${c}`);
            allCorrect = false;
          }
        }
      }
    }
    setChecked(true);
    setWrongCells(wrong);
    if (allCorrect) {
      clearInterval(timerRef.current);
      setDone(true);
      const bonus = Math.max(0, 300 - elapsed);
      onScore(200 + bonus);
    }
  }

  function isInSelected(r: number, c: number): boolean {
    if (!selected) return false;
    return selected.dir === 'across'
      ? selected.row === r && c >= selected.col && c < selected.col + selected.answer.length
      : selected.col === c && r >= selected.row && r < selected.row + selected.answer.length;
  }

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  if (!level) return (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">📝 Choose Your Level</p>
        <p className="text-sm text-muted-foreground">Click a clue or cell, then type your answer</p>
      </div>
      {LEVELS.map(l => (
        <div key={l.id} onClick={() => startGame(l)}
          className="flex items-center gap-3 p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 cursor-pointer transition-all active:scale-[0.98]">
          <span className="text-2xl">{l.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold">{l.name}</div>
            <div className="text-xs text-muted-foreground truncate">{l.tagline}</div>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{l.puzzle.title}</span>
        </div>
      ))}
    </div>
  );

  if (done) return (
    <div className="text-center space-y-5 py-8">
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} className="text-5xl">✅</motion.div>
      <div>
        <div className="text-2xl font-bold">Puzzle Solved!</div>
        <div className="text-muted-foreground text-sm mt-1">Finished in {fmt(elapsed)}</div>
      </div>
      <Button onClick={() => setLevel(null)} className="rounded-full bg-primary font-bold px-8">Play Again</Button>
    </div>
  );

  const size = level.puzzle.size;
  const CELL = 'w-8 h-8 sm:w-10 sm:h-10 border text-center text-sm font-bold flex items-center justify-center relative transition-all';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold">{level.puzzle.title}</span>
        <span className="font-mono text-muted-foreground">{fmt(elapsed)}</span>
      </div>

      {/* Grid */}
      <div className="flex justify-center">
        <div className="inline-grid gap-0.5" style={{ gridTemplateColumns:`repeat(${size}, minmax(0, 2.5rem))` }}>
          {Array.from({ length:size }).flatMap((_, r) =>
            Array.from({ length:size }).map((_, c) => {
              const isBk = solved[r]?.[c] === '#';
              const inSel = isInSelected(r, c);
              const isWrong = checked && wrongCells.has(`${r}-${c}`);
              const isCorrect = checked && !wrongCells.has(`${r}-${c}`) && playerGrid[r]?.[c];
              const num = !isBk ? cellNum(r, c, level.puzzle.entries) : null;
              const cellClass = isBk
                ? `${CELL} bg-foreground`
                : inSel
                  ? `${CELL} bg-primary/15 border-primary/60 cursor-pointer`
                  : isWrong
                    ? `${CELL} bg-red-500/10 border-red-400/40 cursor-pointer`
                    : isCorrect
                      ? `${CELL} bg-green-500/10 border-green-400/40 cursor-pointer`
                      : `${CELL} bg-card border-border hover:border-primary/50 cursor-pointer`;
              return (
                <div key={`${r}-${c}`} className={cellClass} onClick={() => handleCellClick(r, c)}>
                  {num && <span className="absolute top-0 left-0.5 text-[7px] leading-tight text-muted-foreground font-normal">{num}</span>}
                  {!isBk && <span className={inSel ? 'text-primary font-bold' : ''}>{playerGrid[r]?.[c] ?? ''}</span>}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Selected entry input */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className="p-3 bg-muted/40 rounded-xl border border-border space-y-2">
            <p className="text-xs font-bold text-primary">
              {selected.num} {selected.dir === 'across' ? 'Across' : 'Down'} —{' '}
              <span className="font-normal text-foreground">{selected.clue}</span>
            </p>
            <input
              ref={inputRef}
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={selected.answer.length}
              value={getEntryValue(selected, playerGrid)}
              onChange={e => handleInput(e.target.value)}
              placeholder={'_'.repeat(selected.answer.length)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-center font-mono tracking-[0.35em] uppercase text-lg focus:outline-none focus:border-primary"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clues */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-bold uppercase tracking-wide text-muted-foreground mb-2">Across</p>
          {level.puzzle.entries.filter(e => e.dir === 'across').map(e => (
            <button key={`a${e.num}`} onClick={() => selectEntry(e)}
              className={`block w-full text-left px-2 py-1.5 rounded-lg mb-0.5 transition-colors leading-snug ${
                selected?.dir==='across' && selected.num===e.num && selected.row===e.row
                  ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted/60'}`}>
              <span className="font-bold mr-1">{e.num}.</span>{e.clue}
            </button>
          ))}
        </div>
        <div>
          <p className="font-bold uppercase tracking-wide text-muted-foreground mb-2">Down</p>
          {level.puzzle.entries.filter(e => e.dir === 'down').map(e => (
            <button key={`d${e.num}`} onClick={() => selectEntry(e)}
              className={`block w-full text-left px-2 py-1.5 rounded-lg mb-0.5 transition-colors leading-snug ${
                selected?.dir==='down' && selected.num===e.num && selected.col===e.col
                  ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted/60'}`}>
              <span className="font-bold mr-1">{e.num}.</span>{e.clue}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 rounded-full" onClick={() => {
          if (!level) return;
          setPlayerGrid(buildPlayer(buildSolved(level.puzzle.entries, level.puzzle.size)));
          setChecked(false); setWrongCells(new Set());
        }}>Clear</Button>
        <Button className="flex-1 rounded-full bg-primary font-bold" onClick={checkAnswers}>
          <CheckCircle className="h-4 w-4 mr-1.5" /> Check Answers
        </Button>
      </div>

      {checked && !done && wrongCells.size > 0 && (
        <p className="text-center text-sm text-red-500 font-medium">
          {wrongCells.size} cell{wrongCells.size > 1 ? 's' : ''} need fixing — red cells are incorrect
        </p>
      )}
    </div>
  );
}
