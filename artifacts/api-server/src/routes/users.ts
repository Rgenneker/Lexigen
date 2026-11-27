import { Router } from "express";
import { db } from "@workspace/db";
import { passwordResetTokensTable, usersTable, streaksTable } from "@workspace/db";
import { and, eq, gt, lt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router = Router();

const DEFAULT_USER_ID = 1;
const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;
const PASSWORD_RESET_COOLDOWN_MS = 60 * 1000;
const PASSWORD_RESET_SENDER =
  process.env.RESEND_FROM_EMAIL ?? "Lexigenz <hello@lexigenz.com>";

function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function getPublicAppBaseUrl(): string {
  const configuredUrl = process.env.PUBLIC_APP_URL?.trim();
  const replitDomain =
    process.env.REPLIT_DOMAINS?.split(",")[0]?.trim() ||
    process.env.REPLIT_DEV_DOMAIN?.trim();
  const replitUrl = replitDomain
    ? (/^https?:\/\//i.test(replitDomain) ? replitDomain : `https://${replitDomain}`)
    : "";
  const baseUrl = configuredUrl || replitUrl;

  if (!baseUrl) {
    throw new Error("Set PUBLIC_APP_URL or a Replit app domain before sending reset links.");
  }

  return new URL(baseUrl).origin;
}

async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  const connectors = new ReplitConnectors();
  const safeResetUrl = resetUrl.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const response = await connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: PASSWORD_RESET_SENDER,
      to: [to],
      subject: "Reset your Lexigenz password",
      text: `We received a request to reset your Lexigenz password. Use this link within 60 minutes:\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
      html: `<p>We received a request to reset your Lexigenz password.</p><p><a href="${safeResetUrl}">Reset your password</a></p><p>This link expires in 60 minutes. If you did not request this, you can ignore this email.</p>`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend rejected the password reset email (${response.status}).`);
  }
}

// ─── Password validation ───────────────────────────────────────
function isValidPassword(pw: string): boolean {
  return pw.length >= 8 && /^[a-zA-Z0-9@#$&!]+$/.test(pw) && /[@#$&!]/.test(pw);
}

// ─── Archetypes ────────────────────────────────────────────────
const ARCHETYPES: Record<string, {
  name: string;
  description: string;
  strengths: string[];
  languageStyle: string;
  recommendedWords: string[];
  color: string;
  emoji: string;
}> = {
  "The Visionary": {
    name: "The Visionary",
    description: "You see possibilities others miss. Your language is expansive, forward-thinking, and full of potential. Words are your tools for imagining better futures.",
    strengths: ["Innovation", "Inspiration", "Big-picture thinking"],
    languageStyle: "Metaphorical and aspirational — you paint vivid pictures with your words",
    recommendedWords: ["transcendent", "pioneering", "luminous", "catalyst", "boundless"],
    color: "#7C3AED",
    emoji: "✨"
  },
  "The Nurturer": {
    name: "The Nurturer",
    description: "Warmth radiates from everything you say. You choose words that comfort, connect, and care. Language, for you, is an act of love.",
    strengths: ["Empathy", "Support", "Connection"],
    languageStyle: "Warm and inclusive — your words wrap people in belonging",
    recommendedWords: ["compassion", "solace", "kinship", "tenderness", "cultivate"],
    color: "#EC4899",
    emoji: "🌸"
  },
  "The Explorer": {
    name: "The Explorer",
    description: "Adventure lives in your vocabulary. You seek words from every corner of the world, absorbing new languages and concepts with relentless curiosity.",
    strengths: ["Curiosity", "Adaptability", "Discovery"],
    languageStyle: "Eclectic and curious — borrowing freely across cultures and disciplines",
    recommendedWords: ["wanderlust", "serendipity", "nomadic", "traverse", "uncharted"],
    color: "#F59E0B",
    emoji: "🗺"
  },
  "The Sage": {
    name: "The Sage",
    description: "Wisdom anchors your every word. You speak with precision and depth, choosing language that carries weight and stands the test of time.",
    strengths: ["Wisdom", "Clarity", "Depth"],
    languageStyle: "Precise and thoughtful — every word earns its place",
    recommendedWords: ["perspicacious", "sagacious", "erudite", "discernment", "equanimity"],
    color: "#0EA5E9",
    emoji: "📚"
  },
  "The Creator": {
    name: "The Creator",
    description: "Language is your raw material. You bend and reshape words into art, finding the perfect phrase that captures what no one else could express.",
    strengths: ["Creativity", "Expression", "Originality"],
    languageStyle: "Inventive and poetic — you play with language like an instrument",
    recommendedWords: ["ephemeral", "rhapsody", "elusive", "confluence", "ineffable"],
    color: "#10B981",
    emoji: "🎨"
  },
  "The Guardian": {
    name: "The Guardian",
    description: "Reliability and strength define your language. You choose words that protect, affirm, and stand firm — your vocabulary is your shield and your promise.",
    strengths: ["Loyalty", "Dependability", "Strength"],
    languageStyle: "Direct and trustworthy — your words mean exactly what they say",
    recommendedWords: ["steadfast", "resilience", "unwavering", "fortitude", "allegiance"],
    color: "#6366F1",
    emoji: "🛡"
  },
  "The Rebel": {
    name: "The Rebel",
    description: "You challenge the expected with every sentence. Your language disrupts, questions, and refuses to be contained by convention.",
    strengths: ["Courage", "Authenticity", "Challenge"],
    languageStyle: "Bold and unconventional — you say what others won't",
    recommendedWords: ["iconoclast", "insurgent", "audacious", "defiant", "provocative"],
    color: "#EF4444",
    emoji: "⚡"
  },
  "The Diplomat": {
    name: "The Diplomat",
    description: "You are a master of nuance and tact. Your words build bridges, navigate complexity, and bring people together across divides.",
    strengths: ["Tact", "Balance", "Mediation"],
    languageStyle: "Nuanced and diplomatic — you find the word that everyone can agree on",
    recommendedWords: ["conciliation", "mediation", "judicious", "pragmatic", "consensus"],
    color: "#14B8A6",
    emoji: "🤝"
  },
  "The Achiever": {
    name: "The Achiever",
    description: "Excellence is your baseline. Your language is action-oriented, goal-driven, and unflinching. Every word you use is a step toward something greater.",
    strengths: ["Ambition", "Drive", "Excellence"],
    languageStyle: "Precise and action-oriented — your words move things forward",
    recommendedWords: ["tenacity", "pinnacle", "ambitious", "accomplished", "exceed"],
    color: "#F97316",
    emoji: "🏆"
  },
  "The Mystic": {
    name: "The Mystic",
    description: "The unseen speaks through you. Your vocabulary reaches into the spiritual, the philosophical, and the ineffable — exploring what cannot be easily named.",
    strengths: ["Intuition", "Depth", "Mystery"],
    languageStyle: "Ethereal and philosophical — you navigate the space between what is said and what is felt",
    recommendedWords: ["numinous", "liminal", "ethereal", "transcendence", "arcane"],
    color: "#8B5CF6",
    emoji: "🌙"
  },
  "The Maverick": {
    name: "The Maverick",
    description: "Rules were made to be rewritten — and so was the dictionary. Your language evolves constantly, mixing high and low, old and new, formal and street.",
    strengths: ["Independence", "Innovation", "Versatility"],
    languageStyle: "Hybrid and adaptive — you fuse registers and styles without apology",
    recommendedWords: ["unconventional", "eclectic", "disruptive", "hybrid", "irreverent"],
    color: "#06B6D4",
    emoji: "🦋"
  },
  "The Harmonizer": {
    name: "The Harmonizer",
    description: "Balance and beauty live in your language. You seek words that create peace, rhythm, and resonance — your sentences flow like music.",
    strengths: ["Balance", "Beauty", "Flow"],
    languageStyle: "Melodic and balanced — your language has a natural rhythm",
    recommendedWords: ["euphony", "consonance", "equilibrium", "serene", "cadence"],
    color: "#84CC16",
    emoji: "🎵"
  }
};

function getArchetypeFromBirthDate(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth();
  const day = date.getDate();
  const archetypeKeys = Object.keys(ARCHETYPES);
  const index = (month * 2 + Math.floor(day / 15)) % archetypeKeys.length;
  return archetypeKeys[index];
}

async function ensureDefaultUser() {
  const [existing] = await db.select().from(usersTable).where(eq(usersTable.id, DEFAULT_USER_ID));
  if (!existing) {
    await db.insert(usersTable).values({
      username: "lexigen_user",
      language: "en",
      isPremium: false,
    });
    await db.insert(streaksTable).values({
      userId: DEFAULT_USER_ID,
      currentStreak: 7,
      longestStreak: 14,
      totalDays: 21,
      lastCheckin: new Date().toISOString().slice(0, 10),
    });
  }
  return existing;
}

// ─── Register free ─────────────────────────────────────────────
router.post("/register/free", async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body as {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
  };

  if (!firstName?.trim() || !lastName?.trim()) {
    return res.status(400).json({ error: "First and last name are required." });
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }
  if (!password || !isValidPassword(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters with letters, numbers, and at least one special character (@, #, $, &, !)." });
  }
  if (!phone?.trim()) {
    return res.status(400).json({ error: "Cell phone number is required." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check email uniqueness
  const [existing] = await db.select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, normalizedEmail));
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists. Please sign in." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const displayName = `${firstName.trim()} ${lastName.trim()}`;

  const [newUser] = await db.insert(usersTable).values({
    username: displayName,
    email: normalizedEmail,
    passwordHash,
    phone: phone.trim(),
    language: "en",
    isPremium: false,
  }).returning();

  // Create streak record for this user
  await db.insert(streaksTable).values({
    userId: newUser.id,
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    lastCheckin: new Date().toISOString().slice(0, 10),
  }).onConflictDoNothing();

  req.log.info({ userId: newUser.id, email: normalizedEmail }, "free registration");

  return res.status(201).json({
    success: true,
    id: newUser.id,
    name: displayName,
    email: normalizedEmail,
    phone: phone.trim(),
    plan: "free",
  });
});

// ─── Login ─────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email?.trim() || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, normalizedEmail));

  if (!user || !user.passwordHash) {
    return res.status(401).json({ error: "No account found with this email address." });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: "Incorrect password. Please try again." });
  }

  req.log.info({ userId: user.id }, "login");

  return res.json({
    id: user.id,
    name: user.username,
    email: user.email,
    phone: user.phone ?? undefined,
    plan: user.isPremium ? "premium" : "free",
    premiumLanguage: user.premiumLanguage ?? null,
    registeredAt: user.createdAt.toISOString(),
  });
});

// ─── Forgot password ───────────────────────────────────────────
router.post("/forgot-password", async (req, res): Promise<void> => {
  const { email } = req.body as { email?: string };

  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  try {
    const [user] = await db.select({ id: usersTable.id, email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail));

    if (user?.email) {
      const now = new Date();
      await db.delete(passwordResetTokensTable)
        .where(lt(passwordResetTokensTable.expiresAt, now));

      const [recentToken] = await db.select({ tokenHash: passwordResetTokensTable.tokenHash })
        .from(passwordResetTokensTable)
        .where(and(
          eq(passwordResetTokensTable.userId, user.id),
          gt(passwordResetTokensTable.createdAt, new Date(now.getTime() - PASSWORD_RESET_COOLDOWN_MS)),
        ))
        .limit(1);

      if (!recentToken) {
        const rawToken = randomBytes(32).toString("base64url");
        const tokenHash = hashResetToken(rawToken);

        await db.transaction(async (tx) => {
          await tx.delete(passwordResetTokensTable)
            .where(eq(passwordResetTokensTable.userId, user.id));
          await tx.insert(passwordResetTokensTable).values({
            tokenHash,
            userId: user.id,
            expiresAt: new Date(now.getTime() + PASSWORD_RESET_TTL_MS),
          });
        });

        try {
          const resetUrl = new URL(
            `/reset-password?token=${encodeURIComponent(rawToken)}`,
            getPublicAppBaseUrl(),
          ).toString();
          await sendPasswordResetEmail(user.email, resetUrl);
        } catch {
          await db.delete(passwordResetTokensTable)
            .where(eq(passwordResetTokensTable.tokenHash, tokenHash))
            .catch(() => {
              req.log.error({ userId: user.id }, "failed to remove an unsent password reset token");
            });
          req.log.error({ userId: user.id }, "password reset email delivery failed");
        }
      }
    }

    // Keep the response identical whether or not the account exists.
    res.json({ success: true });
  } catch (error) {
    req.log.error({ err: error }, "password reset request failed");
    res.status(503).json({ error: "Password reset is temporarily unavailable. Please try again later." });
  }
});

router.post("/reset-password", async (req, res): Promise<void> => {
  const { token, password } = req.body as { token?: string; password?: string };
  if (!token || !password) {
    res.status(400).json({ error: "A reset token and new password are required." });
    return;
  }
  if (!isValidPassword(password)) {
    res.status(400).json({
      error: "Use at least 8 characters. Allowed characters are letters, numbers, @, #, $, &, and !; include at least one special character.",
    });
    return;
  }

  const tokenHash = hashResetToken(token);
  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  let userId: number | null;
  try {
    userId = await db.transaction(async (tx) => {
      const [claimedToken] = await tx.delete(passwordResetTokensTable)
        .where(and(
          eq(passwordResetTokensTable.tokenHash, tokenHash),
          gt(passwordResetTokensTable.expiresAt, now),
        ))
        .returning({ userId: passwordResetTokensTable.userId });

      if (!claimedToken) return null;

      await tx.update(usersTable)
        .set({ passwordHash })
        .where(eq(usersTable.id, claimedToken.userId));
      await tx.delete(passwordResetTokensTable)
        .where(eq(passwordResetTokensTable.userId, claimedToken.userId));

      return claimedToken.userId;
    });
  } catch (error) {
    req.log.error({ err: error }, "password reset completion failed");
    res.status(503).json({ error: "Password reset is temporarily unavailable. Please try again later." });
    return;
  }

  if (!userId) {
    res.status(400).json({ error: "This reset link is invalid or has expired." });
    return;
  }

  req.log.info({ userId }, "password reset completed");
  res.json({ success: true });
});

// ─── Profile routes ────────────────────────────────────────────
router.get("/users/profile", async (req, res) => {
  await ensureDefaultUser();
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, DEFAULT_USER_ID));
  return res.json({
    id: user.id,
    username: user.username,
    birthDate: user.birthDate ?? null,
    archetype: user.archetype ?? null,
    language: user.language,
    isPremium: user.isPremium,
    createdAt: user.createdAt.toISOString(),
  });
});

router.patch("/users/profile", async (req, res) => {
  const { username, birthDate, language } = req.body;
  const updates: Record<string, string> = {};
  if (username) updates.username = username;
  if (birthDate) {
    updates.birthDate = birthDate;
    updates.archetype = getArchetypeFromBirthDate(birthDate);
  }
  if (language) updates.language = language;

  await db.update(usersTable).set(updates).where(eq(usersTable.id, DEFAULT_USER_ID));
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, DEFAULT_USER_ID));
  return res.json({
    id: user.id,
    username: user.username,
    birthDate: user.birthDate ?? null,
    archetype: user.archetype ?? null,
    language: user.language,
    isPremium: user.isPremium,
    createdAt: user.createdAt.toISOString(),
  });
});

router.get("/users/archetype", async (req, res) => {
  const { birthDate } = req.query as { birthDate?: string };
  if (!birthDate) {
    return res.status(400).json({ error: "birthDate is required" });
  }
  const archetypeName = getArchetypeFromBirthDate(birthDate);
  const archetype = ARCHETYPES[archetypeName] ?? ARCHETYPES["The Explorer"];
  return res.json(archetype);
});

// ─── Premium language (GET) ────────────────────────────────────
router.get("/user/premium-language", async (req, res) => {
  const userId = parseInt((req.query.userId as string) ?? "0", 10);
  if (!userId) return res.status(400).json({ error: "userId required" });
  const [user] = await db.select({ premiumLanguage: usersTable.premiumLanguage })
    .from(usersTable).where(eq(usersTable.id, userId));
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ premiumLanguage: user.premiumLanguage ?? null });
});

// ─── Premium language (SET) ────────────────────────────────────
router.post("/user/premium-language", async (req, res) => {
  const { userId, language } = req.body as { userId?: number; language?: string };
  if (!userId || !language?.trim()) {
    return res.status(400).json({ error: "userId and language are required" });
  }
  // Verify user is premium
  const [user] = await db.select({ isPremium: usersTable.isPremium })
    .from(usersTable).where(eq(usersTable.id, userId));
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!user.isPremium) return res.status(403).json({ error: "Premium required" });

  await db.update(usersTable)
    .set({ premiumLanguage: language.trim() })
    .where(eq(usersTable.id, userId));
  return res.json({ success: true, premiumLanguage: language.trim() });
});

router.get("/stats/summary", async (req, res) => {
  const [streak] = await db.select().from(streaksTable).where(eq(streaksTable.userId, DEFAULT_USER_ID));
  return res.json({
    wordsLearned: 42,
    currentStreak: streak?.currentStreak ?? 0,
    badgesEarned: 5,
    gamesPlayed: 18,
    journalEntries: 12,
    topGame: "Wordle",
  });
});

export default router;
