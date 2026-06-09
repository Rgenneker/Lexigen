import { Router } from "express";
import { db } from "@workspace/db";
import { streaksTable, badgesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();
const DEFAULT_USER_ID = 1;

router.get("/streaks", async (req, res) => {
  const [streak] = await db.select().from(streaksTable).where(eq(streaksTable.userId, DEFAULT_USER_ID));
  if (!streak) {
    return res.json({
      currentStreak: 0,
      longestStreak: 0,
      totalDays: 0,
      lastCheckin: null,
      nextMilestone: 7,
    });
  }
  const nextMilestone = streak.currentStreak < 7 ? 7
    : streak.currentStreak < 30 ? 30
    : streak.currentStreak < 100 ? 100
    : 365;
  return res.json({
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    totalDays: streak.totalDays,
    lastCheckin: streak.lastCheckin ?? null,
    nextMilestone,
  });
});

router.post("/streaks/checkin", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const [existing] = await db.select().from(streaksTable).where(eq(streaksTable.userId, DEFAULT_USER_ID));

  if (!existing) {
    const [newStreak] = await db.insert(streaksTable).values({
      userId: DEFAULT_USER_ID,
      currentStreak: 1,
      longestStreak: 1,
      totalDays: 1,
      lastCheckin: today,
    }).returning();
    return res.json({
      currentStreak: newStreak.currentStreak,
      longestStreak: newStreak.longestStreak,
      totalDays: newStreak.totalDays,
      lastCheckin: newStreak.lastCheckin,
      nextMilestone: 7,
    });
  }

  if (existing.lastCheckin === today) {
    const nextMilestone = existing.currentStreak < 7 ? 7
      : existing.currentStreak < 30 ? 30
      : existing.currentStreak < 100 ? 100
      : 365;
    return res.json({
      currentStreak: existing.currentStreak,
      longestStreak: existing.longestStreak,
      totalDays: existing.totalDays,
      lastCheckin: existing.lastCheckin,
      nextMilestone,
    });
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = existing.lastCheckin === yesterday ? existing.currentStreak + 1 : 1;
  const newLongest = Math.max(newStreak, existing.longestStreak);

  const [updated] = await db.update(streaksTable)
    .set({
      currentStreak: newStreak,
      longestStreak: newLongest,
      totalDays: existing.totalDays + 1,
      lastCheckin: today,
      updatedAt: new Date(),
    })
    .where(eq(streaksTable.userId, DEFAULT_USER_ID))
    .returning();

  // Award badges for milestone streaks
  const milestones = [7, 30, 100, 365];
  for (const milestone of milestones) {
    if (newStreak === milestone) {
      await db.insert(badgesTable).values({
        userId: DEFAULT_USER_ID,
        name: `${milestone}-Day Streak`,
        description: `Maintained a ${milestone}-day learning streak`,
        icon: milestone === 7 ? "flame" : milestone === 30 ? "star" : milestone === 100 ? "trophy" : "crown",
        requirement: `Check in for ${milestone} consecutive days`,
      }).onConflictDoNothing();
    }
  }

  const nextMilestone = newStreak < 7 ? 7
    : newStreak < 30 ? 30
    : newStreak < 100 ? 100
    : 365;
  return res.json({
    currentStreak: updated.currentStreak,
    longestStreak: updated.longestStreak,
    totalDays: updated.totalDays,
    lastCheckin: updated.lastCheckin,
    nextMilestone,
  });
});

router.get("/streaks/badges", async (req, res) => {
  const badges = await db.select().from(badgesTable).where(eq(badgesTable.userId, DEFAULT_USER_ID));
  return res.json(badges.map(b => ({
    ...b,
    earnedAt: b.earnedAt.toISOString(),
  })));
});

export default router;
