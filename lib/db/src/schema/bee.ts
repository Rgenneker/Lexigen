import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export type BeeLevel = "beginner" | "lower_intermediate" | "upper_intermediate" | "proficient";
export type ContestStatus = "pending" | "lobby" | "active" | "finished" | "cancelled";
export type InviteStatus = "pending" | "accepted" | "declined" | "expired";
export type PlayerStatus = "invited" | "accepted" | "declined" | "ready" | "playing" | "finished";

export const beeContestsTable = pgTable("bee_contests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  level: text("level").notNull().$type<BeeLevel>(),
  status: text("status").notNull().default("pending").$type<ContestStatus>(),
  organiserId: integer("organiser_id").notNull().references(() => usersTable.id),
  contestCode: text("contest_code").notNull().unique(),
  wordCount: integer("word_count").notNull().default(10),
  wordTimeoutSec: integer("word_timeout_sec").notNull().default(15),
  startedAt: timestamp("started_at"),
  finishedAt: timestamp("finished_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const beeContestPlayersTable = pgTable("bee_contest_players", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id").notNull().references(() => beeContestsTable.id),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  status: text("status").notNull().default("invited").$type<PlayerStatus>(),
  score: integer("score").notNull().default(0),
  wordsCorrect: integer("words_correct").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  maxStreak: integer("max_streak").notNull().default(0),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  finishedAt: timestamp("finished_at"),
});

export const beeContestWordsTable = pgTable("bee_contest_words", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id").notNull().references(() => beeContestsTable.id),
  position: integer("position").notNull(),
  word: text("word").notNull(),
  pronunciation: text("pronunciation").notNull().default(""),
  origin: text("origin").notNull().default(""),
  exampleSentence: text("example_sentence").notNull().default(""),
});

export const beeContestAnswersTable = pgTable("bee_contest_answers", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id").notNull().references(() => beeContestsTable.id),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  wordPosition: integer("word_position").notNull(),
  answer: text("answer").notNull(),
  correct: boolean("correct").notNull().default(false),
  points: integer("points").notNull().default(0),
  hintLevel: integer("hint_level").notNull().default(0),
  responseMs: integer("response_ms"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const beeInvitesTable = pgTable("bee_invites", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id").notNull().references(() => beeContestsTable.id),
  inviteeId: integer("invitee_id").references(() => usersTable.id),
  inviteeEmail: text("invitee_email"),
  token: text("token").notNull().unique(),
  status: text("status").notNull().default("pending").$type<InviteStatus>(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const beeWorldRankingsTable = pgTable("bee_world_rankings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  year: integer("year").notNull(),
  eloScore: integer("elo_score").notNull().default(1200),
  contestsPlayed: integer("contests_played").notNull().default(0),
  contestsWon: integer("contests_won").notNull().default(0),
  totalPoints: integer("total_points").notNull().default(0),
  country: text("country"),
  institution: text("institution"),
  institutionType: text("institution_type"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
