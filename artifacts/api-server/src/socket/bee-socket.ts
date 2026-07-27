import type { Server, Socket } from "socket.io";
import { db } from "@workspace/db";
import {
  beeContestsTable,
  beeContestPlayersTable,
  beeContestAnswersTable,
} from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { logger } from "../lib/logger";

// ─── In-memory state ────────────────────────────────────────────────────────

interface BeeWord {
  word: string;
  pronunciation: string;
  origin: string;
  sentence: string;
}

interface PlayerState {
  userId: number;
  userName: string;
  socketId: string;
  ready: boolean;
  score: number;
  wordsCorrect: number;
  currentStreak: number;
  maxStreak: number;
  hasAnsweredCurrentWord: boolean;
  hintLevelForCurrentWord: number;
  wordStartTime: number;
}

interface ContestRoom {
  contestId: number;
  level: string;
  wordTimeoutSec: number;
  status: "lobby" | "active" | "finished";
  players: Map<number, PlayerState>;
  spectators: Set<string>;
  words: BeeWord[];
  currentPosition: number;
  wordTimer: ReturnType<typeof setTimeout> | null;
}

const rooms = new Map<number, ContestRoom>();

// ─── Helpers ────────────────────────────────────────────────────────────────

function roomKey(contestId: number) {
  return `bee:${contestId}`;
}

function calcPoints(correct: boolean, hintLevel: number, responseMs: number, streak: number): number {
  if (!correct) return 0;
  const base = Math.max(0, 100 - hintLevel * 20);
  const speed = responseMs > 0 && responseMs < 5000 ? 10 : 0;
  const streakBonus = streak >= 3 ? 15 : 0;
  return base + speed + streakBonus;
}

function buildLeaderboard(players: Map<number, PlayerState>) {
  return Array.from(players.values())
    .sort((a, b) => b.score - a.score || b.wordsCorrect - a.wordsCorrect)
    .map((p, i) => ({
      rank: i + 1,
      userId: p.userId,
      userName: p.userName,
      score: p.score,
      wordsCorrect: p.wordsCorrect,
      currentStreak: p.currentStreak,
    }));
}

function buildLobbyPayload(room: ContestRoom, contestName: string) {
  return {
    contestId: room.contestId,
    contestName,
    level: room.level,
    totalWords: room.words.length,
    players: Array.from(room.players.values()).map((p) => ({
      userId: p.userId,
      userName: p.userName,
      ready: p.ready,
    })),
    spectatorCount: room.spectators.size,
  };
}

// ─── Word flow ───────────────────────────────────────────────────────────────

async function sendNextWord(io: Server, contestId: number): Promise<void> {
  const room = rooms.get(contestId);
  if (!room || room.status !== "active") return;

  const word = room.words[room.currentPosition];
  if (!word) {
    await endContest(io, contestId);
    return;
  }

  const now = Date.now();
  room.wordTimer = null;
  room.players.forEach((p) => {
    p.hasAnsweredCurrentWord = false;
    p.hintLevelForCurrentWord = 0;
    p.wordStartTime = now;
  });

  io.to(roomKey(contestId)).emit("bee:word", {
    position: room.currentPosition + 1,
    total: room.words.length,
    word: word.word,
    timeoutSec: room.wordTimeoutSec,
  });

  room.wordTimer = setTimeout(() => {
    resolveWord(io, contestId);
  }, room.wordTimeoutSec * 1000);
}

async function resolveWord(io: Server, contestId: number): Promise<void> {
  const room = rooms.get(contestId);
  if (!room || room.status !== "active") return;

  if (room.wordTimer) {
    clearTimeout(room.wordTimer);
    room.wordTimer = null;
  }

  const word = room.words[room.currentPosition];
  if (!word) return;

  const playerAnswers: Array<{ userId: number; userName: string; correct: boolean; points: number }> = [];
  room.players.forEach((p) => {
    playerAnswers.push({ userId: p.userId, userName: p.userName, correct: false, points: 0 });
  });

  io.to(roomKey(contestId)).emit("bee:word-result", {
    position: room.currentPosition + 1,
    correctAnswer: word.word,
    playerAnswers,
  });

  io.to(roomKey(contestId)).emit("bee:leaderboard", buildLeaderboard(room.players));

  room.currentPosition++;

  // Small pause between words
  await new Promise((r) => setTimeout(r, 2500));
  await sendNextWord(io, contestId);
}

async function endContest(io: Server, contestId: number): Promise<void> {
  const room = rooms.get(contestId);
  if (!room) return;

  room.status = "finished";
  if (room.wordTimer) clearTimeout(room.wordTimer);

  const finalRankings = buildLeaderboard(room.players);
  io.to(roomKey(contestId)).emit("bee:ended", { contestId, finalRankings });

  // Persist scores
  try {
    await db
      .update(beeContestsTable)
      .set({ status: "finished", finishedAt: new Date() })
      .where(eq(beeContestsTable.id, contestId));

    for (const p of room.players.values()) {
      await db
        .update(beeContestPlayersTable)
        .set({
          score: p.score,
          wordsCorrect: p.wordsCorrect,
          currentStreak: p.maxStreak,
          status: "finished",
          finishedAt: new Date(),
        })
        .where(
          and(
            eq(beeContestPlayersTable.contestId, contestId),
            eq(beeContestPlayersTable.userId, p.userId),
          ),
        );
    }
  } catch (err) {
    logger.error({ err }, "bee: error persisting contest end");
  }

  rooms.delete(contestId);
}

// ─── Socket registration ─────────────────────────────────────────────────────

export function registerBeeSocket(io: Server): void {
  io.on("connection", (socket: Socket) => {
    const auth = socket.handshake.auth as { userId?: number; userName?: string };
    const userId = auth.userId ? Number(auth.userId) : null;
    const userName = auth.userName ?? "Guest";

    // ── bee:join ────────────────────────────────────────────────────────────
    socket.on("bee:join", async ({ contestId }: { contestId: number }) => {
      if (!userId) { socket.emit("bee:error", { message: "Not authenticated" }); return; }

      try {
        const [contest] = await db
          .select()
          .from(beeContestsTable)
          .where(eq(beeContestsTable.id, contestId))
          .limit(1);

        if (!contest) { socket.emit("bee:error", { message: "Contest not found" }); return; }
        if (contest.status === "finished" || contest.status === "cancelled") {
          socket.emit("bee:error", { message: "Contest has ended" }); return;
        }

        // Check player is authorised
        const [playerRow] = await db
          .select()
          .from(beeContestPlayersTable)
          .where(
            and(
              eq(beeContestPlayersTable.contestId, contestId),
              eq(beeContestPlayersTable.userId, userId),
            ),
          )
          .limit(1);

        if (!playerRow) { socket.emit("bee:error", { message: "You are not in this contest" }); return; }
        if (playerRow.status === "declined") { socket.emit("bee:error", { message: "You declined this contest" }); return; }

        socket.join(roomKey(contestId));

        // Initialise room if not yet
        if (!rooms.has(contestId)) {
          const { getWordsForContest } = await import("../data/bee-words.js");
          const words = getWordsForContest(contest.level, contest.wordCount);
          rooms.set(contestId, {
            contestId,
            level: contest.level,
            wordTimeoutSec: contest.wordTimeoutSec,
            status: "lobby",
            players: new Map(),
            spectators: new Set(),
            words,
            currentPosition: 0,
            wordTimer: null,
          });
        }

        const room = rooms.get(contestId)!;
        room.players.set(userId, {
          userId,
          userName,
          socketId: socket.id,
          ready: false,
          score: 0,
          wordsCorrect: 0,
          currentStreak: 0,
          maxStreak: 0,
          hasAnsweredCurrentWord: false,
          hintLevelForCurrentWord: 0,
          wordStartTime: 0,
        });

        // Mark player as accepted in DB
        await db
          .update(beeContestPlayersTable)
          .set({ status: "playing" })
          .where(
            and(
              eq(beeContestPlayersTable.contestId, contestId),
              eq(beeContestPlayersTable.userId, userId),
            ),
          );

        io.to(roomKey(contestId)).emit("bee:lobby", buildLobbyPayload(room, contest.name));
      } catch (err) {
        logger.error({ err }, "bee:join error");
        socket.emit("bee:error", { message: "Server error" });
      }
    });

    // ── bee:spectate ────────────────────────────────────────────────────────
    socket.on("bee:spectate", ({ contestId }: { contestId: number }) => {
      socket.join(roomKey(contestId));
      const room = rooms.get(contestId);
      if (room) {
        room.spectators.add(socket.id);
        if (room.status === "active") {
          socket.emit("bee:leaderboard", buildLeaderboard(room.players));
        }
      }
    });

    // ── bee:ready ────────────────────────────────────────────────────────────
    socket.on("bee:ready", async ({ contestId }: { contestId: number }) => {
      if (!userId) return;
      const room = rooms.get(contestId);
      if (!room || room.status !== "lobby") return;

      const player = room.players.get(userId);
      if (!player) return;
      player.ready = true;

      const [contest] = await db
        .select()
        .from(beeContestsTable)
        .where(eq(beeContestsTable.id, contestId))
        .limit(1);

      io.to(roomKey(contestId)).emit("bee:lobby", buildLobbyPayload(room, contest?.name ?? "Spelling Bee"));

      // Start when all players (≥2) are ready
      const allPlayers = Array.from(room.players.values());
      if (allPlayers.length >= 2 && allPlayers.every((p) => p.ready)) {
        room.status = "active";
        await db
          .update(beeContestsTable)
          .set({ status: "active", startedAt: new Date() })
          .where(eq(beeContestsTable.id, contestId));

        io.to(roomKey(contestId)).emit("bee:started", {
          totalWords: room.words.length,
          wordTimeoutSec: room.wordTimeoutSec,
        });

        await new Promise((r) => setTimeout(r, 1500));
        await sendNextWord(io, contestId);
      }
    });

    // ── bee:hint ────────────────────────────────────────────────────────────
    socket.on("bee:hint", ({ contestId, level }: { contestId: number; level: number }) => {
      if (!userId) return;
      const room = rooms.get(contestId);
      if (!room || room.status !== "active") return;
      const player = room.players.get(userId);
      if (!player || player.hasAnsweredCurrentWord) return;

      const word = room.words[room.currentPosition];
      if (!word) return;
      player.hintLevelForCurrentWord = Math.min(3, level);

      const hints: Record<number, string> = {
        1: word.pronunciation,
        2: word.origin,
        3: word.sentence,
      };

      socket.emit("bee:hint-reveal", {
        position: room.currentPosition + 1,
        level: player.hintLevelForCurrentWord,
        hint: hints[player.hintLevelForCurrentWord] ?? "",
      });
    });

    // ── bee:submit ──────────────────────────────────────────────────────────
    socket.on(
      "bee:submit",
      async ({ contestId, position, answer }: { contestId: number; position: number; answer: string }) => {
        if (!userId) return;
        const room = rooms.get(contestId);
        if (!room || room.status !== "active") return;
        const player = room.players.get(userId);
        if (!player || player.hasAnsweredCurrentWord) return;
        if (position !== room.currentPosition + 1) return;

        const word = room.words[room.currentPosition];
        if (!word) return;

        const responseMs = Date.now() - player.wordStartTime;
        const correct = answer.trim().toLowerCase() === word.word.toLowerCase();
        const points = calcPoints(correct, player.hintLevelForCurrentWord, responseMs, player.currentStreak);

        if (correct) {
          player.wordsCorrect++;
          player.currentStreak++;
          player.maxStreak = Math.max(player.maxStreak, player.currentStreak);
        } else {
          player.currentStreak = 0;
        }
        player.score += points;
        player.hasAnsweredCurrentWord = true;

        socket.emit("bee:answer-ack", { position, correct, points, correctAnswer: correct ? undefined : word.word });

        // Persist answer
        try {
          await db.insert(beeContestAnswersTable).values({
            contestId,
            userId,
            wordPosition: position,
            answer: answer.trim(),
            correct,
            points,
            hintLevel: player.hintLevelForCurrentWord,
            responseMs,
          });
        } catch (err) {
          logger.error({ err }, "bee: error inserting answer");
        }

        io.to(roomKey(contestId)).emit("bee:leaderboard", buildLeaderboard(room.players));

        // Resolve early when all players answered
        const allAnswered = Array.from(room.players.values()).every((p) => p.hasAnsweredCurrentWord);
        if (allAnswered) {
          await resolveWord(io, contestId);
        }
      },
    );

    // ── disconnect ───────────────────────────────────────────────────────────
    socket.on("disconnect", () => {
      if (!userId) return;
      rooms.forEach((room) => {
        if (room.players.has(userId)) {
          const player = room.players.get(userId)!;
          if (player.socketId === socket.id) {
            room.players.delete(userId);
            io.to(roomKey(room.contestId)).emit("bee:player-left", { userId, userName });
          }
        }
        room.spectators.delete(socket.id);
      });
    });
  });
}
