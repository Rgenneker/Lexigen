import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const gameScoresTable = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  game: text("game").notNull(),
  username: text("username").notNull(),
  score: integer("score").notNull(),
  duration: integer("duration"),
  playedAt: timestamp("played_at").defaultNow().notNull(),
});

export const insertGameScoreSchema = createInsertSchema(gameScoresTable).omit({ id: true, playedAt: true });
export type InsertGameScore = z.infer<typeof insertGameScoreSchema>;
export type GameScore = typeof gameScoresTable.$inferSelect;
