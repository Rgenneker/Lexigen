import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, streaksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const DEFAULT_USER_ID = 1;

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

router.post("/register/free", async (req, res) => {
  const { initials, surname, countryCode, phone } = req.body as {
    initials?: string; surname?: string; countryCode?: string; phone?: string;
  };
  if (!initials?.trim() || !surname?.trim()) {
    return res.status(400).json({ error: "initials and surname are required" });
  }
  await ensureDefaultUser();
  const displayName = `${initials.trim()} ${surname.trim()}`;
  await db.update(usersTable)
    .set({ username: displayName })
    .where(eq(usersTable.id, DEFAULT_USER_ID));
  req.log.info({ displayName, countryCode, phone: phone ? "provided" : "not provided" }, "free registration");
  return res.json({ success: true, plan: "free", displayName });
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
