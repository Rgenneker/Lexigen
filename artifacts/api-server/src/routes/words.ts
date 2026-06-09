import { Router } from "express";
import { db } from "@workspace/db";
import { wordsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

const ARCHETYPES = ["The Visionary", "The Nurturer", "The Explorer", "The Sage", "The Creator", "The Guardian", "The Rebel", "The Diplomat", "The Achiever", "The Mystic", "The Maverick", "The Harmonizer"];

function getArchetypeFromBirthDate(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth();
  const day = date.getDate();
  const index = (month * 2 + Math.floor(day / 15)) % ARCHETYPES.length;
  return ARCHETYPES[index];
}

router.get("/words/daily", async (req, res) => {
  const { archetype, language = "en" } = req.query as { archetype?: string; language?: string };
  const today = new Date().toISOString().slice(0, 10);

  const words = await db.select().from(wordsTable)
    .where(eq(wordsTable.language, language));

  if (words.length === 0) {
    const allWords = await db.select().from(wordsTable);
    if (allWords.length === 0) {
      return res.status(404).json({ error: "No words available" });
    }
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const word = allWords[dayOfYear % allWords.length];
    return res.json({ word, date: today, isCheckedIn: false });
  }

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const word = words[dayOfYear % words.length];
  return res.json({ word, date: today, isCheckedIn: false });
});

router.get("/words", async (req, res) => {
  const words = await db.select().from(wordsTable);
  return res.json(words);
});

router.get("/words/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const [word] = await db.select().from(wordsTable).where(eq(wordsTable.id, id));
  if (!word) {
    return res.status(404).json({ error: "Word not found" });
  }
  return res.json(word);
});

export default router;
