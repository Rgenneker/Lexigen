import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").unique(),
  passwordHash: text("password_hash"),
  phone: text("phone"),
  birthDate: text("birth_date"),
  archetype: text("archetype"),
  language: text("language").notNull().default("en"),
  isPremium: boolean("is_premium").notNull().default(false),
  premiumPlan: text("premium_plan"),
  premiumExpiresAt: timestamp("premium_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
