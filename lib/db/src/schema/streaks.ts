import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const streaksTable = pgTable("streaks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  totalDays: integer("total_days").notNull().default(0),
  lastCheckin: text("last_checkin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const badgesTable = pgTable("badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requirement: text("requirement").notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const insertStreakSchema = createInsertSchema(streaksTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStreak = z.infer<typeof insertStreakSchema>;
export type Streak = typeof streaksTable.$inferSelect;

export const insertBadgeSchema = createInsertSchema(badgesTable).omit({ id: true, earnedAt: true });
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badgesTable.$inferSelect;
