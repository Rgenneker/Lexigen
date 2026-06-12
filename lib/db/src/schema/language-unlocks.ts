import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const languageUnlocksTable = pgTable("language_unlocks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  language: text("language").notNull(),
  orderId: text("order_id"),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export type LanguageUnlock = typeof languageUnlocksTable.$inferSelect;
