import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Crown, ChevronRight, Eye, Swords, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const LEVEL_LABEL: Record<string, string> = {
  beginner: "Beginner", lower_intermediate: "Lower Intermediate",
  upper_intermediate: "Upper Intermediate", proficient: "Proficient",
};

interface TPlayer { user_id: number; username: string; status: string; final_rank: number | null; eliminated_in_round: number | null }
interface TRound { round_number: number; round_name: string; status: string; contest_id: number | null; advancing_count: number; contest_status: string | null; contest_code: string | null }
interface RoundResult { user_id: number; username: string; score: number; words_correct: number; rank: number }
interface Tournament { id: number; name: string; level: string; status: string; current_round: number; total_rounds: number; organiser_id: number; organiser_name: string }

interface TournamentData {
  tournament: Tournament;
  players: TPlayer[];
  rounds: TRound[];
  roundResults: Record<number, RoundResult[]>;
}

const STATUS_COLOR: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800", winner: "bg-amber-100 text-amber-800",
  eliminated: "bg-red-100 text-red-700", pending: "bg-muted text-muted-foreground",
};

export default function TournamentPage({ tournamentId }: { tournamentId: number }) {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [data, setData] = useState<TournamentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);

  async function loadTournament() {
    try {
      const res = await fetch(`/api/bee/tournaments/${tournamentId}`);
      const d = await res.json() as TournamentData;
      setData(d);
    } catch { toast({ title: "Failed to load tournament", variant: "destructive" }); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadTournament(); }, [tournamentId]);

  async function handleAdvance() {
    if (!user?.id || !data) return;
    setAdvancing(true);
    try {
      const res = await fetch(`/api/bee/tournaments/${tournamentId}/advance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organiserId: user.id }),
      });
      const d = await res.json() as { ok: boolean; completed?: boolean; nextRound?: number; contestId?: number; error?: string };
      if (!res.ok) throw new Error(d.error);
      if (d.completed) {
        toast({ title: "🏆 Tournament complete!" });
      } else {
        toast({ title: `Round ${d.nextRound} started!` });
        if (d.contestId) navigate(`/bee/play/${d.contestId}`);
      }
      await loadTournament();
    } catch (e: unknown) {
      toast({ title: (e as Error).message, variant: "destructive" });
    } finally { setAdvancing(false); }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Tournament not found.</p>
    </div>
  );

  const { tournament, players, rounds, roundResults } = data;
  const isOrganiser = user?.id === tournament.organiser_id;
  const currentRound = rounds.find((r) => r.round_number === tournament.current_round);
  const myPlayer = players.find((p) => p.user_id === user?.id);
  const canAdvance = isOrganiser && currentRound?.contest_status === "finished" && tournament.status !== "completed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-background to-primary/5 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-1.5 text-sm font-bold">
            <Trophy className="w-4 h-4" /> Tournament
          </div>
          <h1 className="text-3xl font-bold">{tournament.name}</h1>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary">{LEVEL_LABEL[tournament.level]}</Badge>
            <Badge variant="outline">{tournament.total_rounds} round{tournament.total_rounds !== 1 ? "s" : ""}</Badge>
            <Badge className={tournament.status === "completed" ? "bg-emerald-100 text-emerald-800" : tournament.status === "active" ? "bg-blue-100 text-blue-800" : "bg-muted text-muted-foreground"}>
              {tournament.status === "completed" ? "✓ Complete" : tournament.status === "active" ? "● Active" : "Pending"}
            </Badge>
          </div>
          {isOrganiser && <p className="text-xs text-muted-foreground">You are the organiser</p>}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bracket */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Swords className="w-5 h-5" /> Bracket</h2>

            {rounds.map((round) => {
              const results = roundResults[round.round_number] ?? [];
              const isCurrentRound = round.round_number === tournament.current_round;
              const isFutureRound = round.round_number > tournament.current_round;

              return (
                <Card key={round.round_number}
                  className={`border-0 shadow-md transition-all ${isCurrentRound ? "ring-2 ring-primary/40" : isFutureRound ? "opacity-50" : ""}`}>
                  <CardHeader className="pb-3 flex flex-row items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                      ${round.status === "completed" ? "bg-emerald-100 text-emerald-700" : isCurrentRound ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {round.round_number}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{round.round_name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {round.status === "completed" ? "Completed" : isCurrentRound ? "In progress" : "Upcoming"}
                        {round.advancing_count > 0 && ` · Top ${round.advancing_count} advance`}
                      </p>
                    </div>
                    {round.contest_id && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigate(`/bee/watch/${round.contest_id}`)} className="gap-1">
                          <Eye className="w-3.5 h-3.5" /> Watch
                        </Button>
                        {myPlayer?.status === "active" && isCurrentRound && (
                          <Button size="sm" onClick={() => navigate(`/bee/play/${round.contest_id}`)} className="gap-1">
                            Play <ChevronRight className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    )}
                  </CardHeader>

                  {results.length > 0 && (
                    <CardContent className="pt-0">
                      <div className="space-y-1.5">
                        {results.map((r) => {
                          const advancing = r.rank <= round.advancing_count;
                          return (
                            <div key={r.user_id}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${advancing ? "bg-emerald-50 border border-emerald-200" : "bg-red-50/50 border border-red-100"}`}>
                              <span className="font-mono text-xs w-4 text-center text-muted-foreground">{r.rank}</span>
                              <span className="flex-1 font-medium truncate">{r.username}</span>
                              <span className="font-bold tabular-nums">{r.score}</span>
                              {advancing
                                ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                : <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}

                  {isFutureRound && (
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground italic text-center py-2">Players TBD after previous round</p>
                    </CardContent>
                  )}
                </Card>
              );
            })}

            {canAdvance && (
              <Button onClick={handleAdvance} disabled={advancing} className="w-full h-12 gap-2 font-semibold" size="lg">
                {advancing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
                {tournament.current_round >= tournament.total_rounds ? "Finalise Tournament" : `Advance to ${rounds.find((r) => r.round_number === tournament.current_round + 1)?.round_name ?? "Next Round"}`}
              </Button>
            )}
          </div>

          {/* Player roster */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500" /> Players</h2>
            <Card className="border-0 shadow-md">
              <CardContent className="pt-4 space-y-2">
                {players.map((p, i) => (
                  <div key={p.user_id} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${p.user_id === user?.id ? "bg-primary/5 ring-1 ring-primary/20" : "bg-muted/30"}`}>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {p.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {i === 0 && <Crown className="w-3 h-3 text-amber-500 inline mr-1" />}
                        {p.username}
                      </p>
                      {p.final_rank && <p className="text-xs text-muted-foreground">Finished #{p.final_rank}</p>}
                    </div>
                    <Badge className={`text-xs shrink-0 ${STATUS_COLOR[p.status] ?? ""}`}>
                      {p.status === "winner" ? "🏆 Winner" : p.status === "eliminated" ? `Out R${p.eliminated_in_round}` : p.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Winner card */}
            {tournament.status === "completed" && (() => {
              const winner = players.find((p) => p.status === "winner");
              return winner ? (
                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  <CardContent className="pt-5 pb-5 text-center space-y-2">
                    <p className="text-4xl">🏆</p>
                    <p className="font-black text-xl">{winner.username}</p>
                    <p className="text-white/80 text-sm">Tournament Champion</p>
                  </CardContent>
                </Card>
              ) : null;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
