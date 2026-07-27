import { Router } from "express";
import { db } from "@workspace/db";
import {
  beeContestsTable,
  beeContestPlayersTable,
  beeContestWordsTable,
  beeInvitesTable,
  beeWorldRankingsTable,
  usersTable,
} from "@workspace/db/schema";
import { eq, and, desc, or, ilike } from "drizzle-orm";
import { randomBytes } from "crypto";
import { getWordsForContest, getLevelConfig } from "../data/bee-words.js";

const router = Router();

// ─── Utilities ──────────────────────────────────────────────────────────────

function genCode(len = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(randomBytes(len))
    .map((b) => chars[b % chars.length])
    .join("");
}

function genToken(): string {
  return randomBytes(24).toString("hex");
}

// ─── Create Contest ──────────────────────────────────────────────────────────

router.post("/bee/contests", async (req, res) => {
  const { organiserId, name, level, inviteEmails = [], inviteUserIds = [] } = req.body as {
    organiserId: number;
    name: string;
    level: string;
    inviteEmails?: string[];
    inviteUserIds?: number[];
  };

  if (!organiserId || !name || !level) {
    return res.status(400).json({ error: "organiserId, name, and level are required" });
  }

  const validLevels = ["beginner", "lower_intermediate", "upper_intermediate", "proficient"];
  if (!validLevels.includes(level)) {
    return res.status(400).json({ error: "Invalid level" });
  }

  const levelConfig = getLevelConfig(level);
  if (!levelConfig) return res.status(400).json({ error: "Level not configured" });

  const totalInvites = inviteEmails.length + inviteUserIds.length;
  if (totalInvites > 4) {
    return res.status(400).json({ error: "Maximum 4 challengers (5 total including organiser)" });
  }

  let contestCode = genCode();
  // Ensure unique code
  let attempts = 0;
  while (attempts < 10) {
    const existing = await db
      .select({ id: beeContestsTable.id })
      .from(beeContestsTable)
      .where(eq(beeContestsTable.contestCode, contestCode))
      .limit(1);
    if (existing.length === 0) break;
    contestCode = genCode();
    attempts++;
  }

  // Create contest
  const [contest] = await db
    .insert(beeContestsTable)
    .values({
      name: name.trim(),
      level,
      status: "pending",
      organiserId,
      contestCode,
      wordCount: levelConfig.wordCount,
      wordTimeoutSec: levelConfig.timeoutSec,
    })
    .returning();

  // Add organiser as a player
  await db.insert(beeContestPlayersTable).values({
    contestId: contest.id,
    userId: organiserId,
    status: "accepted",
  });

  // Generate words
  const words = getWordsForContest(level, levelConfig.wordCount);
  await db.insert(beeContestWordsTable).values(
    words.map((w, i) => ({
      contestId: contest.id,
      position: i + 1,
      word: w.word,
      pronunciation: w.pronunciation,
      origin: w.origin,
      exampleSentence: w.sentence,
    })),
  );

  // Create invites for userId list
  const inviteTokens: string[] = [];
  for (const inviteeId of inviteUserIds) {
    const token = genToken();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48h
    await db.insert(beeInvitesTable).values({
      contestId: contest.id,
      inviteeId,
      token,
      expiresAt,
    });
    await db.insert(beeContestPlayersTable).values({
      contestId: contest.id,
      userId: inviteeId,
      status: "invited",
    });
    inviteTokens.push(token);
  }

  // Create invites for email list (user may or may not exist)
  for (const email of inviteEmails) {
    const [existingUser] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase().trim()))
      .limit(1);

    const token = genToken();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
    await db.insert(beeInvitesTable).values({
      contestId: contest.id,
      inviteeId: existingUser?.id ?? null,
      inviteeEmail: email.toLowerCase().trim(),
      token,
      expiresAt,
    });

    if (existingUser) {
      await db.insert(beeContestPlayersTable).values({
        contestId: contest.id,
        userId: existingUser.id,
        status: "invited",
      });
    }
    inviteTokens.push(token);
  }

  return res.status(201).json({
    contest: { ...contest },
    inviteTokens,
    shareLink: `/bee/invite/${contestCode}`,
  });
});

// ─── Search users ─────────────────────────────────────────────────────────────

router.get("/bee/users/search", async (req, res) => {
  const { q } = req.query as { q?: string };
  if (!q || q.trim().length < 2) return res.json({ users: [] });

  const results = await db
    .select({ id: usersTable.id, username: usersTable.username, email: usersTable.email })
    .from(usersTable)
    .where(
      or(
        ilike(usersTable.username, `%${q.trim()}%`),
        ilike(usersTable.email, `%${q.trim()}%`),
      ),
    )
    .limit(10);

  return res.json({ users: results });
});

// ─── Get Contest ─────────────────────────────────────────────────────────────

router.get("/bee/contests/:id", async (req, res) => {
  const contestId = Number(req.params.id);
  const [contest] = await db
    .select()
    .from(beeContestsTable)
    .where(eq(beeContestsTable.id, contestId))
    .limit(1);

  if (!contest) return res.status(404).json({ error: "Contest not found" });

  const players = await db
    .select({
      id: beeContestPlayersTable.id,
      userId: beeContestPlayersTable.userId,
      status: beeContestPlayersTable.status,
      score: beeContestPlayersTable.score,
      wordsCorrect: beeContestPlayersTable.wordsCorrect,
      username: usersTable.username,
    })
    .from(beeContestPlayersTable)
    .leftJoin(usersTable, eq(beeContestPlayersTable.userId, usersTable.id))
    .where(eq(beeContestPlayersTable.contestId, contestId));

  return res.json({ contest, players });
});

// ─── Get Contest by code (for QR/share link join) ────────────────────────────

router.get("/bee/contests/code/:code", async (req, res) => {
  const [contest] = await db
    .select()
    .from(beeContestsTable)
    .where(eq(beeContestsTable.contestCode, req.params.code.toUpperCase()))
    .limit(1);

  if (!contest) return res.status(404).json({ error: "Contest not found" });

  const players = await db
    .select({
      userId: beeContestPlayersTable.userId,
      status: beeContestPlayersTable.status,
      username: usersTable.username,
    })
    .from(beeContestPlayersTable)
    .leftJoin(usersTable, eq(beeContestPlayersTable.userId, usersTable.id))
    .where(eq(beeContestPlayersTable.contestId, contest.id));

  return res.json({ contest, players });
});

// ─── Get Invite details ───────────────────────────────────────────────────────

router.get("/bee/invites/:token", async (req, res) => {
  const [invite] = await db
    .select()
    .from(beeInvitesTable)
    .where(eq(beeInvitesTable.token, req.params.token))
    .limit(1);

  if (!invite) return res.status(404).json({ error: "Invite not found" });
  if (invite.expiresAt < new Date()) return res.status(410).json({ error: "Invite has expired" });

  const [contest] = await db
    .select()
    .from(beeContestsTable)
    .where(eq(beeContestsTable.id, invite.contestId))
    .limit(1);

  const [organiser] = await db
    .select({ username: usersTable.username })
    .from(usersTable)
    .where(eq(usersTable.id, contest.organiserId))
    .limit(1);

  const playerCount = await db
    .select({ userId: beeContestPlayersTable.userId })
    .from(beeContestPlayersTable)
    .where(
      and(
        eq(beeContestPlayersTable.contestId, invite.contestId),
        eq(beeContestPlayersTable.status, "accepted"),
      ),
    );

  return res.json({ invite, contest, organiserName: organiser?.username, playerCount: playerCount.length });
});

// ─── Respond to invite ────────────────────────────────────────────────────────

router.post("/bee/invites/:token/respond", async (req, res) => {
  const { userId, action } = req.body as { userId: number; action: "accept" | "decline" };

  const [invite] = await db
    .select()
    .from(beeInvitesTable)
    .where(eq(beeInvitesTable.token, req.params.token))
    .limit(1);

  if (!invite) return res.status(404).json({ error: "Invite not found" });
  if (invite.status !== "pending") return res.status(409).json({ error: `Invite already ${invite.status}` });
  if (invite.expiresAt < new Date()) return res.status(410).json({ error: "Invite has expired" });

  const [contest] = await db
    .select()
    .from(beeContestsTable)
    .where(eq(beeContestsTable.id, invite.contestId))
    .limit(1);

  if (!contest) return res.status(404).json({ error: "Contest not found" });
  if (contest.status !== "pending") return res.status(409).json({ error: "Contest has already started" });

  const newStatus = action === "accept" ? "accepted" : "declined";
  await db
    .update(beeInvitesTable)
    .set({ status: newStatus })
    .where(eq(beeInvitesTable.id, invite.id));

  // Link invite to userId if not already linked (shareable-link join)
  const resolvedUserId = invite.inviteeId ?? userId;
  if (!resolvedUserId) return res.status(400).json({ error: "userId required for shared-link invites" });

  const [existingPlayer] = await db
    .select()
    .from(beeContestPlayersTable)
    .where(
      and(
        eq(beeContestPlayersTable.contestId, invite.contestId),
        eq(beeContestPlayersTable.userId, resolvedUserId),
      ),
    )
    .limit(1);

  if (existingPlayer) {
    await db
      .update(beeContestPlayersTable)
      .set({ status: newStatus as "accepted" | "declined" })
      .where(eq(beeContestPlayersTable.id, existingPlayer.id));
  } else if (action === "accept") {
    // New player joining via shared link
    const currentPlayers = await db
      .select({ id: beeContestPlayersTable.id })
      .from(beeContestPlayersTable)
      .where(eq(beeContestPlayersTable.contestId, invite.contestId));

    if (currentPlayers.length >= 5) {
      return res.status(409).json({ error: "Contest is full (5 players max)" });
    }
    await db.insert(beeContestPlayersTable).values({
      contestId: invite.contestId,
      userId: resolvedUserId,
      status: "accepted",
    });
  }

  return res.json({ ok: true, action, contestId: invite.contestId });
});

// ─── Join by contest code (QR / share link) ───────────────────────────────────

router.post("/bee/contests/code/:code/join", async (req, res) => {
  const { userId } = req.body as { userId: number };
  if (!userId) return res.status(400).json({ error: "userId required" });

  const [contest] = await db
    .select()
    .from(beeContestsTable)
    .where(eq(beeContestsTable.contestCode, req.params.code.toUpperCase()))
    .limit(1);

  if (!contest) return res.status(404).json({ error: "Contest not found" });
  if (contest.status !== "pending") return res.status(409).json({ error: "Contest is not open for joining" });

  const existingPlayers = await db
    .select({ id: beeContestPlayersTable.id, userId: beeContestPlayersTable.userId })
    .from(beeContestPlayersTable)
    .where(eq(beeContestPlayersTable.contestId, contest.id));

  if (existingPlayers.find((p) => p.userId === userId)) {
    return res.json({ ok: true, contestId: contest.id, alreadyJoined: true });
  }
  if (existingPlayers.length >= 5) {
    return res.status(409).json({ error: "Contest is full" });
  }

  await db.insert(beeContestPlayersTable).values({
    contestId: contest.id,
    userId,
    status: "accepted",
  });

  return res.json({ ok: true, contestId: contest.id });
});

// ─── Contest results ─────────────────────────────────────────────────────────

router.get("/bee/contests/:id/results", async (req, res) => {
  const contestId = Number(req.params.id);

  const [contest] = await db
    .select()
    .from(beeContestsTable)
    .where(eq(beeContestsTable.id, contestId))
    .limit(1);
  if (!contest) return res.status(404).json({ error: "Not found" });

  const players = await db
    .select({
      userId: beeContestPlayersTable.userId,
      score: beeContestPlayersTable.score,
      wordsCorrect: beeContestPlayersTable.wordsCorrect,
      maxStreak: beeContestPlayersTable.maxStreak,
      username: usersTable.username,
    })
    .from(beeContestPlayersTable)
    .leftJoin(usersTable, eq(beeContestPlayersTable.userId, usersTable.id))
    .where(eq(beeContestPlayersTable.contestId, contestId))
    .orderBy(desc(beeContestPlayersTable.score));

  return res.json({ contest, players });
});

// ─── Global Leaderboard ────────────────────────────────────────────────────────

router.get("/bee/leaderboard", async (req, res) => {
  const { level, limit = "20" } = req.query as { level?: string; limit?: string };

  let query = db
    .select({
      userId: beeContestPlayersTable.userId,
      username: usersTable.username,
      score: beeContestPlayersTable.score,
      wordsCorrect: beeContestPlayersTable.wordsCorrect,
      maxStreak: beeContestPlayersTable.maxStreak,
      contestName: beeContestsTable.name,
      level: beeContestsTable.level,
      finishedAt: beeContestPlayersTable.finishedAt,
    })
    .from(beeContestPlayersTable)
    .leftJoin(usersTable, eq(beeContestPlayersTable.userId, usersTable.id))
    .leftJoin(beeContestsTable, eq(beeContestPlayersTable.contestId, beeContestsTable.id))
    .orderBy(desc(beeContestPlayersTable.score))
    .limit(Number(limit));

  if (level) {
    const rows = await db
      .select({
        userId: beeContestPlayersTable.userId,
        username: usersTable.username,
        score: beeContestPlayersTable.score,
        wordsCorrect: beeContestPlayersTable.wordsCorrect,
        maxStreak: beeContestPlayersTable.maxStreak,
        contestName: beeContestsTable.name,
        level: beeContestsTable.level,
        finishedAt: beeContestPlayersTable.finishedAt,
      })
      .from(beeContestPlayersTable)
      .leftJoin(usersTable, eq(beeContestPlayersTable.userId, usersTable.id))
      .innerJoin(
        beeContestsTable,
        and(
          eq(beeContestPlayersTable.contestId, beeContestsTable.id),
          eq(beeContestsTable.level, level),
        ),
      )
      .orderBy(desc(beeContestPlayersTable.score))
      .limit(Number(limit));
    return res.json({ rows });
  }

  const rows = await query;
  return res.json({ rows });
});

// ─── My contests ─────────────────────────────────────────────────────────────

router.get("/bee/users/:userId/contests", async (req, res) => {
  const userId = Number(req.params.userId);

  const rows = await db
    .select({
      contestId: beeContestPlayersTable.contestId,
      playerStatus: beeContestPlayersTable.status,
      score: beeContestPlayersTable.score,
      contestName: beeContestsTable.name,
      level: beeContestsTable.level,
      contestStatus: beeContestsTable.status,
      createdAt: beeContestsTable.createdAt,
      contestCode: beeContestsTable.contestCode,
    })
    .from(beeContestPlayersTable)
    .innerJoin(beeContestsTable, eq(beeContestPlayersTable.contestId, beeContestsTable.id))
    .where(eq(beeContestPlayersTable.userId, userId))
    .orderBy(desc(beeContestsTable.createdAt))
    .limit(50);

  return res.json({ contests: rows });
});

export default router;
