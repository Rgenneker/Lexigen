import { Router } from "express";
import { db, pool } from "@workspace/db";
import {
  beeContestsTable,
  beeContestPlayersTable,
  beeContestWordsTable,
  usersTable,
} from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { randomBytes } from "crypto";
import { getWordsForContest, getLevelConfig } from "../data/bee-words.js";

const router = Router();

function genCode(len = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(randomBytes(len)).map((b) => chars[b % chars.length]).join("");
}

/** How many rounds and how many advance per round based on player count */
function calcBracket(playerCount: number): { rounds: number; advancingPerRound: number[] } {
  if (playerCount >= 7) return { rounds: 3, advancingPerRound: [4, 2, 1] };
  if (playerCount >= 3) return { rounds: 2, advancingPerRound: [2, 1] };
  return { rounds: 1, advancingPerRound: [1] };
}

function roundName(roundNumber: number, totalRounds: number): string {
  if (roundNumber === totalRounds) return "Grand Final";
  if (roundNumber === totalRounds - 1) return "Semifinal";
  if (roundNumber === totalRounds - 2) return "Quarterfinal";
  return `Round ${roundNumber}`;
}

// ─── Create Tournament ────────────────────────────────────────────────────────

router.post("/bee/tournaments", async (req, res) => {
  const { organiserId, name, level, inviteUserIds = [] } = req.body as {
    organiserId: number; name: string; level: string; inviteUserIds: number[];
  };

  if (!organiserId || !name || !level) {
    return res.status(400).json({ error: "organiserId, name, level required" });
  }

  const allPlayerIds: number[] = [organiserId, ...inviteUserIds.filter((id) => id !== organiserId)];
  if (allPlayerIds.length < 2) {
    return res.status(400).json({ error: "Need at least 2 players" });
  }
  if (allPlayerIds.length > 8) {
    return res.status(400).json({ error: "Maximum 8 players in a tournament" });
  }

  const { rounds, advancingPerRound } = calcBracket(allPlayerIds.length);
  const levelConfig = getLevelConfig(level);
  if (!levelConfig) return res.status(400).json({ error: "Invalid level" });

  // Create tournament
  const { rows: [tournament] } = await pool.query(
    `INSERT INTO bee_tournaments (name, level, status, organiser_id, current_round, total_rounds)
     VALUES ($1, $2, 'pending', $3, 0, $4) RETURNING *`,
    [name.trim(), level, organiserId, rounds],
  );

  // Enrol all players
  for (const uid of allPlayerIds) {
    await pool.query(
      `INSERT INTO bee_tournament_players (tournament_id, user_id, status) VALUES ($1, $2, 'active')
       ON CONFLICT DO NOTHING`,
      [tournament.id, uid],
    );
  }

  // Create round records (no contest yet — contests created on-demand)
  for (let r = 1; r <= rounds; r++) {
    await pool.query(
      `INSERT INTO bee_tournament_rounds (tournament_id, round_number, round_name, status, advancing_count)
       VALUES ($1, $2, $3, $4, $5)`,
      [tournament.id, r, roundName(r, rounds), r === 1 ? "active" : "pending", advancingPerRound[r - 1]],
    );
  }

  // Auto-create Round 1 contest with all players
  let contestCode = genCode();
  const [round1Contest] = await db
    .insert(beeContestsTable)
    .values({
      name: `${name} — ${roundName(1, rounds)}`,
      level,
      status: "pending",
      organiserId,
      contestCode,
      wordCount: levelConfig.wordCount,
      wordTimeoutSec: levelConfig.timeoutSec,
    })
    .returning();

  const words = getWordsForContest(level, levelConfig.wordCount);
  await db.insert(beeContestWordsTable).values(
    words.map((w, i) => ({
      contestId: round1Contest.id,
      position: i + 1,
      word: w.word,
      pronunciation: w.pronunciation,
      origin: w.origin,
      exampleSentence: w.sentence,
    })),
  );

  for (const uid of allPlayerIds) {
    await db.insert(beeContestPlayersTable).values({
      contestId: round1Contest.id,
      userId: uid,
      status: uid === organiserId ? "accepted" : "invited",
    });
  }

  // Link contest to round 1
  await pool.query(
    `UPDATE bee_tournament_rounds SET contest_id=$1 WHERE tournament_id=$2 AND round_number=1`,
    [round1Contest.id, tournament.id],
  );

  // Mark tournament as active
  await pool.query(
    `UPDATE bee_tournaments SET current_round=1 WHERE id=$1`, [tournament.id],
  );

  return res.status(201).json({ tournament, contestId: round1Contest.id, contestCode });
});

// ─── Get Tournament ───────────────────────────────────────────────────────────

router.get("/bee/tournaments/:id", async (req, res) => {
  const tId = Number(req.params.id);

  const { rows: [tournament] } = await pool.query(
    `SELECT t.*, u.username AS organiser_name FROM bee_tournaments t
     JOIN users u ON t.organiser_id = u.id WHERE t.id = $1`, [tId],
  );
  if (!tournament) return res.status(404).json({ error: "Tournament not found" });

  const { rows: players } = await pool.query(
    `SELECT tp.*, u.username FROM bee_tournament_players tp
     JOIN users u ON tp.user_id = u.id WHERE tp.tournament_id = $1
     ORDER BY tp.final_rank NULLS LAST, tp.id`, [tId],
  );

  const { rows: rounds } = await pool.query(
    `SELECT tr.*, bc.status AS contest_status, bc.contest_code
     FROM bee_tournament_rounds tr
     LEFT JOIN bee_contests bc ON tr.contest_id = bc.id
     WHERE tr.tournament_id = $1 ORDER BY tr.round_number`, [tId],
  );

  // For each completed round, get player results
  const roundResults: Record<number, unknown[]> = {};
  for (const round of rounds) {
    if (round.contest_id) {
      const { rows } = await pool.query(
        `SELECT bcp.user_id, u.username, bcp.score, bcp.words_correct, bcp.max_streak,
                RANK() OVER (ORDER BY bcp.score DESC) AS rank
         FROM bee_contest_players bcp JOIN users u ON bcp.user_id = u.id
         WHERE bcp.contest_id = $1`, [round.contest_id],
      );
      roundResults[round.round_number] = rows;
    }
  }

  return res.json({ tournament, players, rounds, roundResults });
});

// ─── Advance to next round ────────────────────────────────────────────────────

router.post("/bee/tournaments/:id/advance", async (req, res) => {
  const tId = Number(req.params.id);
  const { organiserId } = req.body as { organiserId: number };

  const { rows: [tournament] } = await pool.query(
    `SELECT * FROM bee_tournaments WHERE id=$1`, [tId],
  );
  if (!tournament) return res.status(404).json({ error: "Not found" });
  if (tournament.organiser_id !== organiserId) return res.status(403).json({ error: "Not organiser" });
  if (tournament.status === "completed") return res.status(409).json({ error: "Tournament already completed" });

  const currentRound = tournament.current_round;
  const nextRound = currentRound + 1;

  // Get current round
  const { rows: [curRound] } = await pool.query(
    `SELECT * FROM bee_tournament_rounds WHERE tournament_id=$1 AND round_number=$2`,
    [tId, currentRound],
  );
  if (!curRound?.contest_id) return res.status(400).json({ error: "Current round has no contest" });

  // Check current contest finished
  const [contest] = await db
    .select()
    .from(beeContestsTable)
    .where(eq(beeContestsTable.id, curRound.contest_id))
    .limit(1);
  if (contest?.status !== "finished") {
    return res.status(409).json({ error: "Current round not yet finished" });
  }

  // Get ranked results
  const { rows: results } = await pool.query(
    `SELECT bcp.user_id, bcp.score,
            RANK() OVER (ORDER BY bcp.score DESC) AS rank
     FROM bee_contest_players bcp WHERE bcp.contest_id=$1`,
    [curRound.contest_id],
  );

  const advancingCount = curRound.advancing_count;
  const advancingIds = results
    .filter((r: { rank: number }) => r.rank <= advancingCount)
    .map((r: { user_id: number }) => r.user_id);

  // Eliminate bottom players
  for (const r of results as { user_id: number; rank: number }[]) {
    if (!advancingIds.includes(r.user_id)) {
      await pool.query(
        `UPDATE bee_tournament_players SET status='eliminated', eliminated_in_round=$1
         WHERE tournament_id=$2 AND user_id=$3`,
        [currentRound, tId, r.user_id],
      );
    }
  }

  // If this was the final round
  if (nextRound > tournament.total_rounds) {
    // Mark winner
    const winner = (results as { user_id: number; rank: number }[]).find((r) => r.rank === 1);
    if (winner) {
      await pool.query(
        `UPDATE bee_tournament_players SET status='winner', final_rank=1 WHERE tournament_id=$1 AND user_id=$2`,
        [tId, winner.user_id],
      );
    }
    // Assign final ranks to others
    for (const r of results as { user_id: number; rank: number }[]) {
      if (r.user_id !== winner?.user_id) {
        await pool.query(
          `UPDATE bee_tournament_players SET final_rank=$1 WHERE tournament_id=$2 AND user_id=$3`,
          [r.rank, tId, r.user_id],
        );
      }
    }
    await pool.query(
      `UPDATE bee_tournaments SET status='completed', completed_at=NOW() WHERE id=$1`, [tId],
    );
    return res.json({ ok: true, completed: true, winnerId: winner?.user_id });
  }

  // Create next round contest
  const { rows: [nextRoundRow] } = await pool.query(
    `SELECT * FROM bee_tournament_rounds WHERE tournament_id=$1 AND round_number=$2`,
    [tId, nextRound],
  );

  const levelConfig = getLevelConfig(tournament.level)!;
  const code = genCode();
  const [nextContest] = await db
    .insert(beeContestsTable)
    .values({
      name: `${tournament.name} — ${nextRoundRow.round_name}`,
      level: tournament.level,
      status: "pending",
      organiserId: tournament.organiser_id,
      contestCode: code,
      wordCount: levelConfig.wordCount,
      wordTimeoutSec: levelConfig.timeoutSec,
    })
    .returning();

  const words = getWordsForContest(tournament.level, levelConfig.wordCount);
  await db.insert(beeContestWordsTable).values(
    words.map((w, i) => ({
      contestId: nextContest.id,
      position: i + 1,
      word: w.word,
      pronunciation: w.pronunciation,
      origin: w.origin,
      exampleSentence: w.sentence,
    })),
  );

  for (const uid of advancingIds) {
    await db.insert(beeContestPlayersTable).values({
      contestId: nextContest.id,
      userId: uid,
      status: "accepted",
    });
  }

  await pool.query(
    `UPDATE bee_tournament_rounds SET contest_id=$1, status='active' WHERE tournament_id=$2 AND round_number=$3`,
    [nextContest.id, tId, nextRound],
  );
  await pool.query(
    `UPDATE bee_tournament_rounds SET status='completed' WHERE tournament_id=$1 AND round_number=$2`,
    [tId, currentRound],
  );
  await pool.query(
    `UPDATE bee_tournaments SET current_round=$1 WHERE id=$2`, [nextRound, tId],
  );

  return res.json({ ok: true, completed: false, nextRound, contestId: nextContest.id, contestCode: code });
});

// ─── User tournament history ───────────────────────────────────────────────────

router.get("/bee/users/:userId/tournaments", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT t.id, t.name, t.level, t.status, t.current_round, t.total_rounds, t.created_at,
            tp.status AS player_status, tp.final_rank, tp.eliminated_in_round,
            u.username AS organiser_name
     FROM bee_tournament_players tp
     JOIN bee_tournaments t ON tp.tournament_id = t.id
     JOIN users u ON t.organiser_id = u.id
     WHERE tp.user_id = $1
     ORDER BY t.created_at DESC LIMIT 20`,
    [Number(req.params.userId)],
  );
  return res.json({ tournaments: rows });
});

export default router;
