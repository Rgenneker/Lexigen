import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Flame, Target, Crown, ChevronRight, Loader2 } from "lucide-react";

const LEVEL_LABEL: Record<string, string> = {
  beginner: "Beginner", lower_intermediate: "Lower Intermediate",
  upper_intermediate: "Upper Intermediate", proficient: "Proficient",
};
const LEVEL_COLOR: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700", lower_intermediate: "bg-blue-100 text-blue-700",
  upper_intermediate: "bg-violet-100 text-violet-700", proficient: "bg-rose-100 text-rose-700",
};

interface Overview {
  totalContests: number; wins: number; winRate: number;
  totalScore: number; bestScore: number; avgScore: number;
  totalWordsCorrect: number; totalWordsAttempted: number;
  wordAccuracy: number; bestStreak: number;
}
interface ByLevel { level: string; played: number; avg_score: number; best_score: number }
interface RecentContest { contest_id: number; name: string; level: string; status: string; score: number; words_correct: number; max_streak: number; finish_rank: number; total_players: number; finished_at: string }
interface ScorePoint { name: string; score: number; level: string; finished_at: string }
interface Achievement { key: string; emoji: string; label: string; description: string; earned: boolean; earnedAt: string | null }

interface StatsData {
  overview: Overview;
  byLevel: ByLevel[];
  recentContests: RecentContest[];
  scoreHistory: ScorePoint[];
  achievements: Achievement[];
}

function MiniBarChart({ data }: { data: ScorePoint[] }) {
  if (!data.length) return <p className="text-center text-sm text-muted-foreground py-6">Play some contests to see your score trend!</p>;
  const max = Math.max(...data.map((d) => d.score), 1);
  return (
    <div className="flex items-end gap-1.5 h-24 px-2">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {d.name.length > 15 ? d.name.slice(0, 15) + "…" : d.name}: {d.score}
          </div>
          <div
            className={`w-full rounded-t-sm transition-all ${LEVEL_COLOR[d.level]?.split(" ")[0] ?? "bg-primary/60"}`}
            style={{ height: `${Math.max(4, (d.score / max) * 80)}px` }}
          />
        </div>
      ))}
    </div>
  );
}

export default function StatsPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "history" | "achievements">("overview");

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/bee/stats/${user.id}`)
      .then((r) => r.json())
      .then((d: StatsData) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  if (!data) return null;

  const { overview, byLevel, recentContests, scoreHistory, achievements } = data;
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-7">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Your Bee Stats 📊</h1>
          <p className="text-muted-foreground">All your Spelling Bee performance across every contest</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/bee/create")} className="gap-2"><Crown className="w-4 h-4" /> New Contest</Button>
            <Button onClick={() => navigate("/leaderboard")} variant="outline" className="gap-2"><Trophy className="w-4 h-4" /> Leaderboard</Button>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Contests", value: overview.totalContests, icon: "🎮" },
            { label: "Wins", value: overview.wins, icon: "🏆" },
            { label: "Win Rate", value: `${overview.winRate}%`, icon: "🎯" },
            { label: "Best Score", value: overview.bestScore, icon: "⭐" },
            { label: "Avg Score", value: overview.avgScore, icon: "📈" },
            { label: "Words Correct", value: overview.totalWordsCorrect, icon: "✅" },
            { label: "Word Accuracy", value: `${overview.wordAccuracy}%`, icon: "🔤" },
            { label: "Best Streak", value: overview.bestStreak, icon: "🔥" },
          ].map((s) => (
            <Card key={s.label} className="border-0 shadow-sm text-center">
              <CardContent className="pt-4 pb-4">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-black text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl border bg-muted/30 p-1 gap-1">
          {(["overview", "history", "achievements"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "achievements" ? `🏅 Achievements (${earnedCount}/${achievements.length})` : t === "history" ? "📋 History" : "📊 Overview"}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Score chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Score Trend (last 20 contests)</CardTitle>
              </CardHeader>
              <CardContent>
                <MiniBarChart data={scoreHistory} />
                <div className="flex gap-3 mt-3 flex-wrap">
                  {Object.entries(LEVEL_COLOR).map(([lv, cls]) => (
                    <span key={lv} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={`w-3 h-3 rounded-sm ${cls.split(" ")[0]}`} />
                      {LEVEL_LABEL[lv]}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* By level */}
            {byLevel.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3"><CardTitle className="text-base">Performance by Level</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {byLevel.map((l) => (
                    <div key={l.level} className="flex items-center gap-4">
                      <Badge className={`w-36 justify-center shrink-0 ${LEVEL_COLOR[l.level]}`}>
                        {LEVEL_LABEL[l.level]}
                      </Badge>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{l.played} contest{l.played !== 1 ? "s" : ""}</span>
                          <span>avg {l.avg_score} · best {l.best_score}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${LEVEL_COLOR[l.level]?.split(" ")[0]}`}
                            style={{ width: `${Math.min(100, (Number(l.avg_score) / 500) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* History tab */}
        {tab === "history" && (
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {recentContests.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Target className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                  <p className="text-muted-foreground">No finished contests yet</p>
                  <Button onClick={() => navigate("/bee/create")} variant="outline">Create a Contest</Button>
                </div>
              ) : recentContests.map((c, i) => (
                <div key={c.contest_id} className={`flex items-center gap-4 px-4 py-3.5 border-b last:border-0 hover:bg-muted/20 transition-colors ${i < 3 ? "cursor-pointer" : ""}`}
                  onClick={() => navigate(`/bee/play/${c.contest_id}`)}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${c.finish_rank === 1 ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`}>
                    #{c.finish_rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{c.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className={`text-xs ${LEVEL_COLOR[c.level]}`}>{LEVEL_LABEL[c.level]}</Badge>
                      <span className="text-xs text-muted-foreground">{c.total_players} players</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-lg tabular-nums">{c.score}</p>
                    <p className="text-xs text-muted-foreground">{c.words_correct} correct{c.max_streak >= 3 ? ` · 🔥${c.max_streak}` : ""}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Achievements tab */}
        {tab === "achievements" && (
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map((a) => (
              <Card key={a.key} className={`border-0 shadow-sm transition-all ${a.earned ? "ring-1 ring-primary/30 bg-primary/3" : "opacity-60"}`}>
                <CardContent className="pt-4 pb-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 ${a.earned ? "bg-primary/10" : "bg-muted"}`}>
                    {a.earned ? a.emoji : "🔒"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${a.earned ? "" : "text-muted-foreground"}`}>{a.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                    {a.earnedAt && (
                      <p className="text-xs text-primary mt-1">
                        Earned {new Date(a.earnedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    )}
                  </div>
                  {a.earned && <div className="text-emerald-500 shrink-0">✓</div>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
