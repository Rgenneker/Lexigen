import { Router } from "express";
import { pool } from "@workspace/db";

const router = Router();

// ─── Achievements definition ──────────────────────────────────────────────────

export const ACHIEVEMENTS: Record<string, { label: string; description: string; emoji: string }> = {
  first_contest:      { emoji: "🎯", label: "First Step",       description: "Play your first Spelling Bee contest" },
  first_win:          { emoji: "🏆", label: "First Blood",      description: "Win your first contest" },
  streak_master:      { emoji: "🔥", label: "Streak Master",    description: "Achieve a 5+ streak in a single contest" },
  perfect_speller:    { emoji: "💯", label: "Perfect Speller",  description: "Spell every word correctly in a contest" },
  speed_demon:        { emoji: "⚡", label: "Speed Demon",      description: "Answer 3+ words in under 3 seconds each" },
  scholar:            { emoji: "🎓", label: "Scholar",          description: "Compete at all 4 difficulty levels" },
  hat_trick:          { emoji: "🎩", label: "Hat Trick",        description: "Win 3 contests (any time)" },
  world_contender:    { emoji: "🌍", label: "World Contender",  description: "Register for the World Championship" },
  tournament_winner:  { emoji: "👑", label: "Champion",         description: "Win a tournament" },
  centurion:          { emoji: "💎", label: "Centurion",        description: "Score 100+ points in a single contest" },
};

// ─── Check and award achievements after a contest ─────────────────────────────

export async function checkAchievements(userId: number, contestId: number): Promise<string[]> {
  const newAchievements: string[] = [];

  async function award(key: string) {
    try {
      const result = await pool.query(
        `INSERT INTO bee_achievements (user_id, achievement_key) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING id`,
        [userId, key],
      );
      if (result.rowCount && result.rowCount > 0) newAchievements.push(key);
    } catch { /* ignore */ }
  }

  // Get player result for this contest
  const { rows: [playerResult] } = await pool.query(
    `SELECT bcp.score, bcp.words_correct, bcp.max_streak,
            (SELECT COUNT(*) FROM bee_contest_players bcp2 WHERE bcp2.contest_id=$1 AND bcp2.score < bcp.score) AS players_below,
            bc.level, bc.word_count
     FROM bee_contest_players bcp JOIN bee_contests bc ON bcp.contest_id=bc.id
     WHERE bcp.contest_id=$1 AND bcp.user_id=$2`,
    [contestId, userId],
  );

  if (!playerResult) return newAchievements;

  // first_contest
  const { rows: [{ count: contestCount }] } = await pool.query(
    `SELECT COUNT(*) FROM bee_contest_players WHERE user_id=$1`, [userId],
  );
  if (Number(contestCount) === 1) await award("first_contest");

  // first_win / hat_trick / centurion
  const isWinner = Number(playerResult.players_below) === (await pool.query(
    `SELECT COUNT(*)-1 FROM bee_contest_players WHERE contest_id=$1`, [contestId],
  ).then(r => Number(r.rows[0].count)));

  if (isWinner) {
    await award("first_win");
    const { rows: [{ count: wins }] } = await pool.query(
      `SELECT COUNT(DISTINCT bcp.contest_id) FROM bee_contest_players bcp
       WHERE bcp.user_id=$1 AND bcp.score = (
         SELECT MAX(bcp2.score) FROM bee_contest_players bcp2 WHERE bcp2.contest_id=bcp.contest_id
       )`, [userId],
    );
    if (Number(wins) >= 3) await award("hat_trick");
  }

  // streak_master
  if (Number(playerResult.max_streak) >= 5) await award("streak_master");

  // perfect_speller
  if (Number(playerResult.words_correct) >= Number(playerResult.word_count)) await award("perfect_speller");

  // centurion
  if (Number(playerResult.score) >= 100) await award("centurion");

  // scholar: played all 4 levels
  const { rows: levels } = await pool.query(
    `SELECT DISTINCT bc.level FROM bee_contest_players bcp
     JOIN bee_contests bc ON bcp.contest_id=bc.id WHERE bcp.user_id=$1`, [userId],
  );
  const levelSet = new Set(levels.map((l: { level: string }) => l.level));
  if (["beginner","lower_intermediate","upper_intermediate","proficient"].every((l) => levelSet.has(l))) {
    await award("scholar");
  }

  // speed_demon: check answers for this contest
  const { rows: [{ count: fastAnswers }] } = await pool.query(
    `SELECT COUNT(*) FROM bee_contest_answers
     WHERE contest_id=$1 AND user_id=$2 AND correct=true AND response_ms < 3000`, [contestId, userId],
  );
  if (Number(fastAnswers) >= 3) await award("speed_demon");

  return newAchievements;
}

// ─── User stats ───────────────────────────────────────────────────────────────

router.get("/bee/stats/:userId", async (req, res) => {
  const userId = Number(req.params.userId);

  const { rows: [overall] } = await pool.query(
    `SELECT
       COUNT(DISTINCT bcp.contest_id) AS total_contests,
       COALESCE(SUM(bcp.score), 0) AS total_score,
       COALESCE(MAX(bcp.score), 0) AS best_score,
       COALESCE(ROUND(AVG(bcp.score)::numeric, 0), 0) AS avg_score,
       COALESCE(SUM(bcp.words_correct), 0) AS total_words_correct,
       COALESCE(MAX(bcp.max_streak), 0) AS best_streak
     FROM bee_contest_players bcp WHERE bcp.user_id=$1`, [userId],
  );

  // Win count: rank 1 in each contest
  const { rows: [{ wins }] } = await pool.query(
    `SELECT COUNT(*) AS wins FROM bee_contest_players bcp
     WHERE bcp.user_id=$1
       AND bcp.score = (SELECT MAX(bcp2.score) FROM bee_contest_players bcp2 WHERE bcp2.contest_id=bcp.contest_id)
       AND (SELECT COUNT(*) FROM bee_contest_players bcp3 WHERE bcp3.contest_id=bcp.contest_id) > 1`, [userId],
  );

  // By level breakdown
  const { rows: byLevel } = await pool.query(
    `SELECT bc.level,
            COUNT(DISTINCT bcp.contest_id) AS played,
            COALESCE(ROUND(AVG(bcp.score)::numeric, 0), 0) AS avg_score,
            COALESCE(MAX(bcp.score), 0) AS best_score
     FROM bee_contest_players bcp
     JOIN bee_contests bc ON bcp.contest_id=bc.id
     WHERE bcp.user_id=$1
     GROUP BY bc.level`, [userId],
  );

  // Recent contests
  const { rows: recentContests } = await pool.query(
    `SELECT bc.id AS contest_id, bc.name, bc.level, bc.status,
            bcp.score, bcp.words_correct, bcp.max_streak, bcp.finished_at,
            RANK() OVER (PARTITION BY bcp.contest_id ORDER BY bcp.score DESC) AS finish_rank,
            (SELECT COUNT(*) FROM bee_contest_players bcp2 WHERE bcp2.contest_id=bc.id) AS total_players
     FROM bee_contest_players bcp
     JOIN bee_contests bc ON bcp.contest_id=bc.id
     WHERE bcp.user_id=$1 AND bc.status='finished'
     ORDER BY bcp.finished_at DESC NULLS LAST LIMIT 10`, [userId],
  );

  // Score history for chart
  const { rows: scoreHistory } = await pool.query(
    `SELECT bc.name, bcp.score, bcp.finished_at, bc.level
     FROM bee_contest_players bcp
     JOIN bee_contests bc ON bcp.contest_id=bc.id
     WHERE bcp.user_id=$1 AND bc.status='finished'
     ORDER BY bcp.finished_at ASC NULLS LAST LIMIT 20`, [userId],
  );

  // Achievements
  const { rows: achievements } = await pool.query(
    `SELECT achievement_key, earned_at FROM bee_achievements WHERE user_id=$1 ORDER BY earned_at`, [userId],
  );

  // Answers accuracy
  const { rows: [{ total_ans, correct_ans }] } = await pool.query(
    `SELECT COUNT(*) AS total_ans, SUM(CASE WHEN correct THEN 1 ELSE 0 END) AS correct_ans
     FROM bee_contest_answers WHERE user_id=$1`, [userId],
  );

  return res.json({
    overview: {
      totalContests: Number(overall.total_contests),
      wins: Number(wins),
      winRate: overall.total_contests > 0 ? Math.round((Number(wins) / Number(overall.total_contests)) * 100) : 0,
      totalScore: Number(overall.total_score),
      bestScore: Number(overall.best_score),
      avgScore: Number(overall.avg_score),
      totalWordsCorrect: Number(overall.total_words_correct),
      totalWordsAttempted: Number(total_ans ?? 0),
      wordAccuracy: total_ans > 0 ? Math.round((Number(correct_ans) / Number(total_ans)) * 100) : 0,
      bestStreak: Number(overall.best_streak),
    },
    byLevel,
    recentContests,
    scoreHistory,
    achievements,
  });
});

// ─── Achievements list for user ───────────────────────────────────────────────

router.get("/bee/achievements/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const { rows } = await pool.query(
    `SELECT achievement_key, earned_at FROM bee_achievements WHERE user_id=$1 ORDER BY earned_at`, [userId],
  );
  const earnedKeys = new Set(rows.map((r: { achievement_key: string }) => r.achievement_key));
  const all = Object.entries(ACHIEVEMENTS).map(([key, def]) => ({
    key,
    ...def,
    earned: earnedKeys.has(key),
    earnedAt: rows.find((r: { achievement_key: string; earned_at: string }) => r.achievement_key === key)?.earned_at ?? null,
  }));
  return res.json({ achievements: all });
});

// ─── Admin endpoints ──────────────────────────────────────────────────────────

async function requireAdmin(userId: number): Promise<boolean> {
  const { rows: [u] } = await pool.query(`SELECT is_admin FROM users WHERE id=$1`, [userId]);
  return u?.is_admin === true;
}

router.get("/bee/admin/check", async (req, res) => {
  const { userId } = req.query as { userId?: string };
  if (!userId) return res.json({ isAdmin: false });
  const ok = await requireAdmin(Number(userId));
  return res.json({ isAdmin: ok });
});

router.get("/bee/admin/overview", async (req, res) => {
  const { userId } = req.query as { userId?: string };
  if (!userId || !(await requireAdmin(Number(userId)))) return res.status(403).json({ error: "Forbidden" });

  const [contests, users, activeContests, totalAnswers] = await Promise.all([
    pool.query(`SELECT COUNT(*) AS count FROM bee_contests`),
    pool.query(`SELECT COUNT(*) AS count FROM users`),
    pool.query(`SELECT COUNT(*) AS count FROM bee_contests WHERE status='active'`),
    pool.query(`SELECT COUNT(*) AS count FROM bee_contest_answers`),
  ]);

  return res.json({
    totalContests: Number(contests.rows[0].count),
    totalUsers: Number(users.rows[0].count),
    activeContests: Number(activeContests.rows[0].count),
    totalAnswers: Number(totalAnswers.rows[0].count),
  });
});

router.get("/bee/admin/contests", async (req, res) => {
  const { userId, status, limit = "50", offset = "0" } = req.query as { userId?: string; status?: string; limit?: string; offset?: string };
  if (!userId || !(await requireAdmin(Number(userId)))) return res.status(403).json({ error: "Forbidden" });

  const conditions = status ? `WHERE bc.status = '${status}'` : "";
  const { rows } = await pool.query(
    `SELECT bc.id, bc.name, bc.level, bc.status, bc.contest_code,
            bc.created_at, bc.started_at, bc.finished_at,
            u.username AS organiser,
            (SELECT COUNT(*) FROM bee_contest_players bcp WHERE bcp.contest_id=bc.id) AS player_count
     FROM bee_contests bc JOIN users u ON bc.organiser_id=u.id
     ${conditions} ORDER BY bc.created_at DESC LIMIT $1 OFFSET $2`,
    [Number(limit), Number(offset)],
  );
  return res.json({ contests: rows });
});

router.get("/bee/admin/users", async (req, res) => {
  const { userId, q, limit = "50", offset = "0" } = req.query as { userId?: string; q?: string; limit?: string; offset?: string };
  if (!userId || !(await requireAdmin(Number(userId)))) return res.status(403).json({ error: "Forbidden" });

  const search = q?.trim();
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.email, u.is_premium, u.is_admin, u.created_at,
            u.country, u.institution,
            (SELECT COUNT(*) FROM bee_contest_players bcp WHERE bcp.user_id=u.id) AS bee_contests
     FROM users u
     WHERE ($1::text IS NULL OR u.username ILIKE $1 OR u.email ILIKE $1)
     ORDER BY u.created_at DESC LIMIT $2 OFFSET $3`,
    [search ? `%${search}%` : null, Number(limit), Number(offset)],
  );
  return res.json({ users: rows });
});

router.post("/bee/admin/contests/:id/cancel", async (req, res) => {
  const { userId } = req.body as { userId: number };
  if (!userId || !(await requireAdmin(userId))) return res.status(403).json({ error: "Forbidden" });
  await pool.query(
    `UPDATE bee_contests SET status='cancelled', finished_at=NOW() WHERE id=$1`, [req.params.id],
  );
  return res.json({ ok: true });
});

router.post("/bee/admin/users/:id/toggle-admin", async (req, res) => {
  const { userId } = req.body as { userId: number };
  if (!userId || !(await requireAdmin(userId))) return res.status(403).json({ error: "Forbidden" });
  await pool.query(
    `UPDATE users SET is_admin = NOT is_admin WHERE id=$1`, [req.params.id],
  );
  return res.json({ ok: true });
});

export default router;
