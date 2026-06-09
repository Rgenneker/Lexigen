import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const wordsTable = pgTable("words", {
  id: serial("id").primaryKey(),
  word: text("word").notNull(),
  definition: text("definition").notNull(),
  exampleSentence: text("example_sentence").notNull(),
  partOfSpeech: text("part_of_speech").notNull(),
  difficulty: text("difficulty").notNull().default("medium"),
  archetype: text("archetype"),
  language: text("language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWordSchema = createInsertSchema(wordsTable).omit({ id: true, createdAt: true });
export type InsertWord = z.infer<typeof insertWordSchema>;
export type Word = typeof wordsTable.$inferSelect;

export const dailyWordsTable = pgTable("daily_words", {
  id: serial("id").primaryKey(),
  wordId: integer("word_id").notNull().references(() => wordsTable.id),
  date: text("date").notNull(),
  language: text("language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
