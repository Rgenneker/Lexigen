import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBeeSocket, disconnectBeeSocket } from "@/lib/socket";
import { Eye, Volume2, Loader2, Users } from "lucide-react";
import type { Socket } from "socket.io-client";

interface RankEntry { rank: number; userId: number; userName: string; score: number; wordsCorrect: number; currentStreak: number }
interface SpectatorState { status: string; currentWord?: { word: string; position: number; total: number }; leaderboard: RankEntry[] }

function LiveLeaderboard({ rankings }: { rankings: RankEntry[] }) {
  return (
    <div className="space-y-1.5">
      {rankings.map((r) => (
        <div key={r.userId} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/40`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${r.rank === 1 ? "bg-amber-400 text-white" : r.rank === 2 ? "bg-slate-300 text-slate-800" : r.rank === 3 ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}>
            {r.rank}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{r.userName}</p>
            <p className="text-xs text-muted-foreground">{r.wordsCorrect} correct{r.currentStreak >= 3 ? ` · 🔥 ${r.currentStreak}` : ""}</p>
          </div>
          <span className="text-sm font-bold tabular-nums shrink-0">{r.score}</span>
        </div>
      ))}
    </div>
  );
}

export default function SpectatorPage({ contestId }: { contestId: number }) {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const socketRef = useRef<Socket | null>(null);

  const [spectatorCount, setSpectatorCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<RankEntry[]>([]);
  const [currentWord, setCurrentWord] = useState<{ word: string; position: number; total: number } | null>(null);
  const [contestStatus, setContestStatus] = useState<"lobby" | "active" | "finished">("lobby");
  const [contestName, setContestName] = useState("");
  const [connected, setConnected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function speak(word: string) {
    window.speechSynthesis?.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.rate = 0.85;
    window.speechSynthesis?.speak(u);
  }

  useEffect(() => {
    const socket = getBeeSocket(user?.id, user?.name);
    socketRef.current = socket;
    socket.connect();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    // Emit spectate
    socket.emit("bee:spectate", { contestId });

    socket.on("bee:spectator-state", (state: SpectatorState) => {
      setContestStatus(state.status as "lobby" | "active" | "finished");
      setLeaderboard(state.leaderboard ?? []);
      if (state.currentWord) setCurrentWord(state.currentWord);
    });

    socket.on("bee:lobby", (payload: { contestId: number; contestName: string; players: unknown[]; spectatorCount: number }) => {
      setContestName(payload.contestName);
      setContestStatus("lobby");
      setSpectatorCount(payload.spectatorCount);
    });

    socket.on("bee:started", () => setContestStatus("active"));

    socket.on("bee:word", (payload: { position: number; total: number; word: string; timeoutSec: number }) => {
      setCurrentWord({ word: payload.word, position: payload.position, total: payload.total });
      setTimeLeft(payload.timeoutSec);
      setTotalTime(payload.timeoutSec);
      speak(payload.word);
      if (timerRef.current) clearInterval(timerRef.current);
      let t = payload.timeoutSec;
      timerRef.current = setInterval(() => {
        t -= 0.1;
        setTimeLeft(Math.max(0, t));
        if (t <= 0 && timerRef.current) clearInterval(timerRef.current);
      }, 100);
    });

    socket.on("bee:word-result", (payload: { correctAnswer: string; playerAnswers: { userId: number; correct: boolean; points: number }[] }) => {
      // Show result briefly - already handled via leaderboard update
    });

    socket.on("bee:leaderboard", (rankings: RankEntry[]) => setLeaderboard(rankings));

    socket.on("bee:spectator-count", ({ count }: { count: number }) => setSpectatorCount(count));

    socket.on("bee:ended", (payload: { finalRankings: RankEntry[] }) => {
      setContestStatus("finished");
      setLeaderboard(payload.finalRankings);
      if (timerRef.current) clearInterval(timerRef.current);
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      socket.off("bee:spectator-state");
      socket.off("bee:lobby");
      socket.off("bee:started");
      socket.off("bee:word");
      socket.off("bee:leaderboard");
      socket.off("bee:spectator-count");
      socket.off("bee:ended");
      disconnectBeeSocket();
    };
  }, [contestId, user?.id, user?.name]);

  const timerPct = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const timerColor = timerPct > 50 ? "bg-emerald-500" : timerPct > 25 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/50 via-background to-primary/5">
      {/* Spectator banner */}
      <div className="bg-violet-600 text-white py-2 px-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span className="font-medium">Spectating{contestName ? `: ${contestName}` : ""}</span>
          {!connected && <span className="text-violet-200 ml-2">● Connecting…</span>}
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-violet-200">
            <Users className="w-3.5 h-3.5" /> {spectatorCount} watching
          </span>
          <Button size="sm" variant="ghost" className="text-white hover:text-white/80 h-7" onClick={() => navigate("/leaderboard")}>
            Leave
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-4">
          {contestStatus === "lobby" && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
              <div className="text-center">
                <p className="font-semibold text-lg">Waiting for players to get ready…</p>
                <p className="text-sm text-muted-foreground mt-1">The contest will begin once all players are ready</p>
              </div>
            </div>
          )}

          {contestStatus === "active" && currentWord && (
            <>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Word {currentWord.position} / {currentWord.total}</span>
                  <span className={timeLeft <= 5 ? "text-rose-500 font-bold animate-pulse" : ""}>{Math.ceil(timeLeft)}s</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${timerColor} transition-all duration-100 rounded-full`} style={{ width: `${timerPct}%` }} />
                </div>
              </div>

              <Card className="border-0 shadow-xl">
                <CardContent className="pt-10 pb-10 text-center space-y-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Current Word</p>
                  <button onClick={() => speak(currentWord.word)} className="inline-flex items-center gap-2 text-xl font-semibold text-primary hover:opacity-80 transition-opacity">
                    <Volume2 className="w-6 h-6" />
                    <span className="italic text-2xl">Click to hear</span>
                  </button>
                  <div className="text-5xl font-black tracking-wide text-foreground/90">
                    {currentWord.word}
                  </div>
                  <p className="text-sm text-muted-foreground">Players are spelling this word right now…</p>
                </CardContent>
              </Card>
            </>
          )}

          {contestStatus === "finished" && (
            <div className="text-center py-12 space-y-4">
              <p className="text-4xl">🏁</p>
              <h2 className="text-2xl font-bold">Contest Over!</h2>
              <p className="text-muted-foreground">Final standings are shown in the leaderboard →</p>
              <Button onClick={() => navigate("/bee/create")} className="gap-2">
                Create Your Own Contest
              </Button>
            </div>
          )}
        </div>

        {/* Live leaderboard */}
        <div className="w-full lg:w-72 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Live Leaderboard</span>
            {contestStatus === "active" && <span className="ml-auto text-xs text-emerald-500 font-medium animate-pulse">● LIVE</span>}
          </div>
          {leaderboard.length > 0
            ? <LiveLeaderboard rankings={leaderboard} />
            : <p className="text-sm text-muted-foreground text-center py-4">Waiting for the contest to start…</p>}
        </div>
      </div>
    </div>
  );
}
