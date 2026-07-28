import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { getBeeSocket, disconnectBeeSocket } from "@/lib/socket";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, XCircle, Crown, Users, Trophy, Volume2, Lightbulb, Link, QrCode, CheckCheck, Loader2 } from "lucide-react";
import type { Socket } from "socket.io-client";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LobbyPlayer { userId: number; userName: string; ready: boolean }
interface RankEntry { rank: number; userId: number; userName: string; score: number; wordsCorrect: number; currentStreak: number }

interface LobbyPayload { contestId: number; contestName: string; level: string; totalWords: number; players: LobbyPlayer[]; spectatorCount: number }
interface WordPayload { position: number; total: number; word: string; timeoutSec: number }
interface WordResultPayload { position: number; correctAnswer: string; playerAnswers: Array<{ userId: number; correct: boolean; points: number }> }
interface AckPayload { position: number; correct: boolean; points: number; correctAnswer?: string }
interface HintPayload { position: number; level: number; hint: string }
interface EndedPayload { contestId: number; finalRankings: RankEntry[] }

const LEVEL_LABELS: Record<string, string> = { beginner: "Beginner", lower_intermediate: "Lower Intermediate", upper_intermediate: "Upper Intermediate", proficient: "Proficient" };

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveLeaderboard({ rankings, myId }: { rankings: RankEntry[]; myId?: number }) {
  return (
    <div className="space-y-1.5">
      {rankings.map((r) => (
        <div key={r.userId} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${r.userId === myId ? "bg-primary/10 ring-1 ring-primary/30" : "bg-muted/40"}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${r.rank === 1 ? "bg-amber-400 text-white" : r.rank === 2 ? "bg-slate-300 text-slate-800" : r.rank === 3 ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}>
            {r.rank}
          </span>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${r.userId === myId ? "text-primary" : ""}`}>{r.userName}</p>
            <p className="text-xs text-muted-foreground">{r.wordsCorrect} correct{r.currentStreak >= 3 ? ` · 🔥 ${r.currentStreak}` : ""}</p>
          </div>
          <span className="text-sm font-bold tabular-nums shrink-0">{r.score}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContestPage({ contestId }: { contestId: number }) {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const socketRef = useRef<Socket | null>(null);

  // Phase: lobby | playing | finished
  const [phase, setPhase] = useState<"lobby" | "playing" | "finished">("lobby");

  // Lobby state
  const [lobby, setLobby] = useState<LobbyPayload | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [shareTab, setShareTab] = useState<"link" | "qr">("link");

  // Arena state
  const [currentWord, setCurrentWord] = useState<WordPayload | null>(null);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [ack, setAck] = useState<AckPayload | null>(null);
  const [hints, setHints] = useState<Record<number, string>>({});
  const [leaderboard, setLeaderboard] = useState<RankEntry[]>([]);
  const [myScore, setMyScore] = useState(0);
  const [wordResult, setWordResult] = useState<WordResultPayload | null>(null);

  // Results
  const [finalRankings, setFinalRankings] = useState<RankEntry[] | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shareUrl = lobby ? `${window.location.origin}/bee/invite/${lobby.contestId}` : "";

  // ── TTS ──────────────────────────────────────────────────────────────────
  const speak = useCallback((word: string) => {
    window.speechSynthesis?.cancel();
    const utter = new SpeechSynthesisUtterance(word);
    utter.rate = 0.85;
    window.speechSynthesis?.speak(utter);
  }, []);

  // ── Socket wiring ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.id) return;
    const socket = getBeeSocket(user.id, user.name);
    socketRef.current = socket;
    socket.connect();

    socket.emit("bee:join", { contestId });

    socket.on("bee:lobby", (payload: LobbyPayload) => {
      setLobby(payload);
      setPhase("lobby");
    });

    socket.on("bee:started", ({ wordTimeoutSec }: { totalWords: number; wordTimeoutSec: number }) => {
      setPhase("playing");
      setTotalTime(wordTimeoutSec);
    });

    socket.on("bee:word", (payload: WordPayload) => {
      setCurrentWord(payload);
      setAnswer("");
      setSubmitted(false);
      setAck(null);
      setHints({});
      setWordResult(null);
      setTimeLeft(payload.timeoutSec);
      setTotalTime(payload.timeoutSec);
      speak(payload.word);
      setTimeout(() => inputRef.current?.focus(), 100);

      if (timerRef.current) clearInterval(timerRef.current);
      let t = payload.timeoutSec;
      timerRef.current = setInterval(() => {
        t -= 0.1;
        setTimeLeft(Math.max(0, t));
        if (t <= 0 && timerRef.current) clearInterval(timerRef.current);
      }, 100);
    });

    socket.on("bee:answer-ack", (payload: AckPayload) => {
      setAck(payload);
      setMyScore((s) => s + payload.points);
      if (timerRef.current) clearInterval(timerRef.current);
    });

    socket.on("bee:hint-reveal", (payload: HintPayload) => {
      setHints((h) => ({ ...h, [payload.level]: payload.hint }));
    });

    socket.on("bee:word-result", (payload: WordResultPayload) => {
      setWordResult(payload);
    });

    socket.on("bee:leaderboard", (rankings: RankEntry[]) => {
      setLeaderboard(rankings);
    });

    socket.on("bee:ended", (payload: EndedPayload) => {
      setFinalRankings(payload.finalRankings);
      setPhase("finished");
      if (timerRef.current) clearInterval(timerRef.current);
    });

    socket.on("bee:error", ({ message }: { message: string }) => {
      toast({ title: message, variant: "destructive" });
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      socket.off("bee:lobby");
      socket.off("bee:started");
      socket.off("bee:word");
      socket.off("bee:answer-ack");
      socket.off("bee:hint-reveal");
      socket.off("bee:word-result");
      socket.off("bee:leaderboard");
      socket.off("bee:ended");
      socket.off("bee:error");
      disconnectBeeSocket();
    };
  }, [contestId, user?.id, user?.name, speak, toast]);

  // ── Actions ───────────────────────────────────────────────────────────────
  function handleReady() {
    setIsReady(true);
    socketRef.current?.emit("bee:ready", { contestId });
  }

  function handleSubmit() {
    if (!answer.trim() || submitted || !currentWord) return;
    setSubmitted(true);
    socketRef.current?.emit("bee:submit", { contestId, position: currentWord.position, answer: answer.trim() });
  }

  function requestHint(level: number) {
    if (!currentWord || submitted) return;
    socketRef.current?.emit("bee:hint", { contestId, level });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE: LOBBY
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "lobby") {
    if (!lobby) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Joining lobby…</p>
        </div>
      );
    }
    const myPlayer = lobby.players.find((p) => p.userId === user?.id);
    const allReady = lobby.players.length >= 2 && lobby.players.every((p) => p.ready);

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <p className="text-5xl">🐝</p>
            <h1 className="text-3xl font-bold">{lobby.contestName}</h1>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="secondary">{LEVEL_LABELS[lobby.level]}</Badge>
              <Badge variant="outline">{lobby.totalWords} words</Badge>
              {lobby.spectatorCount > 0 && <Badge variant="outline">{lobby.spectatorCount} watching</Badge>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Players */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">Players ({lobby.players.length}/5)</span>
                </div>
                {lobby.players.map((p, i) => (
                  <div key={p.userId} className={`flex items-center gap-3 p-3 rounded-xl border ${p.userId === user?.id ? "border-primary/40 bg-primary/5" : "border-border bg-muted/30"}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                      {p.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{p.userName} {p.userId === user?.id && <span className="text-xs text-muted-foreground">(you)</span>}</p>
                      {i === 0 && <p className="text-xs text-amber-600 font-medium flex items-center gap-1"><Crown className="w-3 h-3" /> Organiser</p>}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.ready ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {p.ready ? "Ready ✓" : "Waiting…"}
                    </span>
                  </div>
                ))}
                {lobby.players.length < 5 && (
                  <div className="border-2 border-dashed border-border rounded-xl p-3 text-center text-sm text-muted-foreground">
                    Waiting for more players ({5 - lobby.players.length} spots left)
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Share + Ready */}
            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-5 space-y-3">
                  <p className="font-semibold text-sm">Invite more players</p>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Contest Code</p>
                    <p className="text-2xl font-mono font-bold tracking-widest text-primary">{lobby.contestId}</p>
                  </div>
                  <div className="flex border rounded-lg overflow-hidden">
                    <button onClick={() => setShareTab("link")} className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${shareTab === "link" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                      <Link className="w-3.5 h-3.5" /> Link
                    </button>
                    <button onClick={() => setShareTab("qr")} className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${shareTab === "qr" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                      <QrCode className="w-3.5 h-3.5" /> QR Code
                    </button>
                  </div>
                  {shareTab === "link" ? (
                    <div className="flex gap-2">
                      <input value={shareUrl} readOnly className="flex-1 text-xs font-mono bg-muted/50 border rounded px-2 py-1.5 outline-none" />
                      <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(shareUrl); toast({ title: "Copied!" }); }}>Copy</Button>
                    </div>
                  ) : (
                    <div className="flex justify-center py-1">
                      <div className="p-2 bg-white rounded-lg border">
                        <QRCodeSVG value={shareUrl} size={110} includeMargin />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button onClick={handleReady} disabled={isReady || !myPlayer} className="w-full h-12 text-base font-semibold gap-2" size="lg">
                {isReady ? <><CheckCheck className="w-5 h-5" /> You're Ready!</> : "I'm Ready →"}
              </Button>
              {allReady && <p className="text-center text-sm text-emerald-600 font-medium animate-pulse">All players ready - starting now! 🐝</p>}
              {!allReady && lobby.players.length < 2 && (
                <p className="text-center text-xs text-muted-foreground">Need at least 2 players to start</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE: FINISHED
  // ═══════════════════════════════════════════════════════════════════════════
  if (phase === "finished" && finalRankings) {
    const myRank = finalRankings.find((r) => r.userId === user?.id);
    const winner = finalRankings[0];

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-background to-primary/5 px-4 py-12">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-6xl">{myRank?.rank === 1 ? "🏆" : "🐝"}</p>
            <h1 className="text-3xl font-bold">{myRank?.rank === 1 ? "You Won!" : "Contest Over!"}</h1>
            {myRank && myRank.rank > 1 && (
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">{winner.userName}</span> wins with {winner.score} pts</p>
            )}
          </div>

          {myRank && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Your Score", value: myRank.score, icon: "🎯" },
                { label: "Rank", value: `#${myRank.rank}`, icon: "🏅" },
                { label: "Correct", value: myRank.wordsCorrect, icon: "✅" },
              ].map((s) => (
                <div key={s.label} className="bg-card border rounded-xl p-3 text-center shadow-sm">
                  <p className="text-2xl">{s.icon}</p>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-5">
              <p className="font-semibold mb-3 flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" /> Final Leaderboard</p>
              <LiveLeaderboard rankings={finalRankings} myId={user?.id} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={() => navigate("/bee/create")} className="flex-1 gap-2">
              <Crown className="w-4 h-4" /> New Contest
            </Button>
            <Button onClick={() => navigate("/leaderboard")} variant="outline" className="flex-1 gap-2">
              <Trophy className="w-4 h-4" /> Leaderboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PHASE: PLAYING
  // ═══════════════════════════════════════════════════════════════════════════
  const timerPct = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const timerColor = timerPct > 50 ? "bg-emerald-500" : timerPct > 25 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">

        {/* ── Main arena ── */}
        <div className="flex-1 space-y-4">
          {/* Timer bar */}
          {currentWord && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Word {currentWord.position} / {currentWord.total}</span>
                <span className={timeLeft <= 5 ? "text-rose-500 font-bold animate-pulse" : ""}>{Math.ceil(timeLeft)}s</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${timerColor} transition-all duration-100 rounded-full`} style={{ width: `${timerPct}%` }} />
              </div>
            </div>
          )}

          {/* Word card */}
          <Card className="border-0 shadow-xl">
            <CardContent className="pt-8 pb-8 space-y-6 text-center">
              {currentWord ? (
                <>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Spell this word</p>
                    <button onClick={() => speak(currentWord.word)} className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:opacity-80 transition-opacity">
                      <Volume2 className="w-5 h-5" />
                      <span className="italic">Listen again</span>
                    </button>
                  </div>

                  {/* Hints */}
                  <div className="flex gap-2 justify-center flex-wrap">
                    {[
                      { level: 1, label: "Pronunciation", icon: "🔊" },
                      { level: 2, label: "Origin", icon: "📚" },
                      { level: 3, label: "In a sentence", icon: "💬" },
                    ].map((h) => (
                      <div key={h.level} className="text-left">
                        {hints[h.level] ? (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-[200px]">
                            <p className="text-xs font-medium text-amber-700">{h.icon} {h.label}</p>
                            <p className="text-xs text-amber-800 mt-0.5">{hints[h.level]}</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => requestHint(h.level)}
                            disabled={submitted}
                            className="flex items-center gap-1.5 text-xs border border-dashed rounded-lg px-3 py-2 text-muted-foreground hover:border-amber-400 hover:text-amber-600 transition-colors disabled:opacity-50"
                          >
                            <Lightbulb className="w-3.5 h-3.5" />
                            {h.label} <span className="text-[10px] opacity-70">-20pts</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Answer */}
                  {ack ? (
                    <div className={`flex flex-col items-center gap-2 py-4 ${ack.correct ? "text-emerald-600" : "text-rose-600"}`}>
                      {ack.correct ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                      <p className="text-lg font-bold">{ack.correct ? `+${ack.points} pts` : "Incorrect"}</p>
                      {!ack.correct && ack.correctAnswer && (
                        <p className="text-sm text-muted-foreground">Correct spelling: <span className="font-semibold text-foreground">{ack.correctAnswer}</span></p>
                      )}
                      <p className="text-sm text-muted-foreground">Next word coming up…</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 max-w-sm mx-auto">
                      <Input
                        ref={inputRef}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="Type your spelling…"
                        disabled={submitted}
                        className="text-base text-center tracking-widest font-mono h-12"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                      />
                      <Button onClick={handleSubmit} disabled={!answer.trim() || submitted} className="h-12 px-5">
                        Submit
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-8 text-muted-foreground flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p>Waiting for next word…</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* My score */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">Your score:</span>
            <span className="text-2xl font-bold text-primary">{myScore}</span>
          </div>
        </div>

        {/* ── Leaderboard sidebar ── */}
        <div className="w-full lg:w-72 space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-sm">Live Leaderboard</span>
            <span className="ml-auto text-xs text-emerald-500 font-medium animate-pulse">● LIVE</span>
          </div>
          <LiveLeaderboard rankings={leaderboard} myId={user?.id} />
        </div>
      </div>
    </div>
  );
}
