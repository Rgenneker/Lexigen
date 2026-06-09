import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();
const DEFAULT_USER_ID = 1;

const PREMIUM_FEATURES = [
  "Unlimited sentence builder",
  "Advanced monthly report",
  "No ads",
  "Exclusive themes",
  "Access to unlimited word games",
  "Priority word recommendations",
  "Extended word journal",
  "Export journal to PDF",
];

router.get("/premium/status", async (req, res) => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, DEFAULT_USER_ID));
  const freeFeatures = ["Daily word delivery", "Birth archetype profile", "Streak tracking", "Word journal (5 entries)"];
  return res.json({
    isPremium: user?.isPremium ?? false,
    plan: user?.premiumPlan ?? null,
    expiresAt: user?.premiumExpiresAt?.toISOString() ?? null,
    features: user?.isPremium ? PREMIUM_FEATURES : freeFeatures,
  });
});

router.post("/premium/upgrade", async (req, res) => {
  const { plan } = req.body;
  if (!plan) {
    return res.status(400).json({ error: "plan is required" });
  }
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await db.update(usersTable).set({
    isPremium: true,
    premiumPlan: plan,
    premiumExpiresAt: expiresAt,
  }).where(eq(usersTable.id, DEFAULT_USER_ID));
  return res.json({
    isPremium: true,
    plan,
    expiresAt: expiresAt.toISOString(),
    features: PREMIUM_FEATURES,
  });
});

export default router;
