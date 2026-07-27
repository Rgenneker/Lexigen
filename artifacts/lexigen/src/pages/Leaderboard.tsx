import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Flame, Target, Plus } from "lucide-react";

const LEVELS = [
  { key: "", label: "All Levels" },
  { key: "beginner", label: "Beginner" },
  { key: "lower_intermediate", label: "Lower Intermediate" },
  { key: "upper_intermediate", label: "Upper Intermediate" },
  { key: "proficient", label: "Proficient" },
];

const LEVEL_BADGE: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700",
  lower_intermediate: "bg-blue-100 text-blue-700",
  upper_intermediate: "bg-violet-100 text-violet-700",
  proficient: "bg-rose-100 text-rose-700",
};

interface LeaderRow {
  userId: number;
  username: string;
  score: number;
  wordsCorrect: number;
  maxStreak: number;
  contestName: string;
  level: string;
  finishedAt: string | null;
}

export default function Leaderboard() {
  const [, navigate] = useLocation();
  const [level, setLevel] = useState("");
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = level ? `/api/bee/leaderboard?level=${level}&limit=50` : "/api/bee/leaderboard?limit=50";
    fetch(url)
      .then((r) => r.json())
      .then((d: { rows: LeaderRow[] }) => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [level]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-background to-primary/5 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-1.5 text-sm font-medium">
            <Trophy className="w-4 h-4" /> Global Leaderboard
          </div>
          <h1 className="text-4xl font-bold">Spelling Bee Champions 🐝</h1>
          <p className="text-muted-foreground">Top scores across all LexigenZ Spelling Bee contests</p>
          <Button onClick={() => navigate("/bee/create")} className="gap-2">
            <Plus className="w-4 h-4" /> Create a Contest
          </Button>
        </div>

        {/* Level filter */}
        <div className="flex gap-2 flex-wrap justify-center">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => setLevel(l.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${level === l.key ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-background border-border hover:border-primary/50"}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="border-b bg-muted/30 py-3">
            <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
              <span className="col-span-1 text-center">#</span>
              <span className="col-span-4">Player</span>
              <span className="col-span-2 text-right">Score</span>
              <span className="col-span-2 text-right">Correct</span>
              <span className="col-span-1 text-right">Streak</span>
              <span className="col-span-2 text-right hidden sm:block">Level</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : rows.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground">No scores yet — be the first!</p>
                <Button onClick={() => navigate("/bee/create")} variant="outline" className="gap-2">
                  <Crown className="w-4 h-4" /> Create a Contest
                </Button>
              </div>
            ) : (
              rows.map((row, i) => {
                const rank = i + 1;
                return (
                  <div
                    key={`${row.userId}-${i}`}
                    className={`grid grid-cols-12 items-center px-4 py-3.5 border-b last:border-0 transition-colors hover:bg-muted/20 ${rank <= 3 ? "bg-amber-50/50" : ""}`}
                  >
                    <div className="col-span-1 flex justify-center">
                      {rank === 1 ? (
                        <span className="text-xl">🥇</span>
                      ) : rank === 2 ? (
                        <span className="text-xl">🥈</span>
                      ) : rank === 3 ? (
                        <span className="text-xl">🥉</span>
                      ) : (
                        <span className="text-sm text-muted-foreground font-mono w-6 text-center">{rank}</span>
                      )}
                    </div>
                    <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {(row.username ?? "?").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{row.username ?? "—"}</p>
                        {row.contestName && <p className="text-xs text-muted-foreground truncate">{row.contestName}</p>}
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-bold text-lg tabular-nums">{row.score}</span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-sm flex items-center justify-end gap-1 text-emerald-600 font-medium">
                        <Target className="w-3.5 h-3.5" /> {row.wordsCorrect}
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      {row.maxStreak >= 3 ? (
                        <span className="text-sm flex items-center justify-end gap-0.5 text-orange-500 font-medium">
                          <Flame className="w-3.5 h-3.5" />{row.maxStreak}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.maxStreak}</span>
                      )}
                    </div>
                    <div className="col-span-2 text-right hidden sm:block">
                      {row.level && (
                        <Badge className={`text-xs ${LEVEL_BADGE[row.level] ?? ""}`}>
                          {row.level.replace(/_/g, " ")}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Annual championship callout */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-accent text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-conic-gradient(white 0% 10%, transparent 10% 20%)" }} />
          <CardContent className="pt-6 pb-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-4xl">🌍</div>
              <div className="flex-1">
                <p className="font-bold text-lg">World Spelling Bee Championship</p>
                <p className="text-white/80 text-sm mt-0.5">Every year in the 3rd week of June — a single synchronous global final at 12:00 UTC. Top spellers from every country compete for the world title.</p>
              </div>
              <Button variant="secondary" className="shrink-0 gap-2 font-semibold">
                <Trophy className="w-4 h-4" /> Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
