import { Router } from "express";
import { db } from "@workspace/db";
import { gameScoresTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();
const DEFAULT_USER_ID = 1;

const WORDLE_WORDS = [
  "FLAME", "BRAVE", "CRISP", "DRIFT", "EARTH", "FLAIR", "GLOOM", "HAVEN",
  "INERT", "JAZZY", "KNACK", "LOFTY", "MIRTH", "NOBLE", "OPTIC", "PLUCK",
  "QUEST", "RIGID", "SWIFT", "THYME", "ULTRA", "VIVID", "WRATH", "YEARN",
  "ZESTY", "AGILE", "BLISS", "CHARM", "DREAD", "ELATE"
];

const LEXIGEN_LETTER_SETS = [
  { letters: ["L", "E", "X", "I", "G", "E", "N"], targetWord: "LEXIGEN", hint: "The name of this app!" },
  { letters: ["E", "L", "I", "X", "G", "N", "E"], targetWord: "LEXIGEN", hint: "7 letters, starts with L" },
  { letters: ["N", "I", "G", "E", "X", "E", "L"], targetWord: "LEXIGEN", hint: "A word game brand" },
];

router.get("/games/scores", async (req, res) => {
  const { game } = req.query as { game?: string };
  let query = db.select().from(gameScoresTable).orderBy(desc(gameScoresTable.score));
  const scores = await (game
    ? db.select().from(gameScoresTable).where(eq(gameScoresTable.game, game)).orderBy(desc(gameScoresTable.score)).limit(10)
    : db.select().from(gameScoresTable).orderBy(desc(gameScoresTable.score)).limit(20));
  return res.json(scores.map(s => ({
    ...s,
    playedAt: s.playedAt.toISOString(),
  })));
});

router.post("/games/scores", async (req, res) => {
  const { game, score, duration } = req.body;
  if (!game || score === undefined) {
    return res.status(400).json({ error: "game and score are required" });
  }
  const username = "You";
  const [entry] = await db.insert(gameScoresTable).values({
    userId: DEFAULT_USER_ID,
    game,
    username,
    score,
    duration: duration ?? null,
  }).returning();
  return res.status(201).json({
    ...entry,
    playedAt: entry.playedAt.toISOString(),
  });
});

router.get("/games/wordle/word", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return res.json({
    wordLength: 5,
    maxAttempts: 6,
    date: today,
    answer: WORDLE_WORDS[dayOfYear % WORDLE_WORDS.length],
  });
});

router.get("/games/lexigen/word", async (req, res) => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const set = LEXIGEN_LETTER_SETS[dayOfYear % LEXIGEN_LETTER_SETS.length];
  return res.json({
    letters: [...set.letters].sort(() => Math.random() - 0.5),
    targetWord: set.targetWord,
    timeLimit: 120,
    hint: set.hint,
  });
});

export default router;
