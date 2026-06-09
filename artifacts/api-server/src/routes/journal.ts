import { Router } from "express";
import { db } from "@workspace/db";
import { journalEntriesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();
const DEFAULT_USER_ID = 1;

router.get("/journal", async (req, res) => {
  const entries = await db.select().from(journalEntriesTable)
    .where(eq(journalEntriesTable.userId, DEFAULT_USER_ID))
    .orderBy(desc(journalEntriesTable.createdAt));
  return res.json(entries.map(e => ({
    ...e,
    createdAt: e.createdAt.toISOString(),
  })));
});

router.post("/journal", async (req, res) => {
  const { word, sentence, mood } = req.body;
  if (!word || !sentence) {
    return res.status(400).json({ error: "word and sentence are required" });
  }
  const [entry] = await db.insert(journalEntriesTable).values({
    userId: DEFAULT_USER_ID,
    word,
    sentence,
    mood: mood ?? null,
  }).returning();
  return res.status(201).json({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
  });
});

router.delete("/journal/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  await db.delete(journalEntriesTable).where(eq(journalEntriesTable.id, id));
  return res.status(204).send();
});

export default router;
