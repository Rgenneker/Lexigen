import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trophy, CheckCircle2, Clock, Globe, Users, Flame, ChevronRight, AlertCircle } from "lucide-react";

const COUNTRY_NAMES: Record<string, string> = {
  ZA: "🇿🇦 South Africa", NG: "🇳🇬 Nigeria", KE: "🇰🇪 Kenya", GH: "🇬🇭 Ghana",
  EG: "🇪🇬 Egypt", US: "🇺🇸 United States", GB: "🇬🇧 United Kingdom",
  CA: "🇨🇦 Canada", AU: "🇦🇺 Australia", IN: "🇮🇳 India",
  PH: "🇵🇭 Philippines", SG: "🇸🇬 Singapore", MY: "🇲🇾 Malaysia",
  NZ: "🇳🇿 New Zealand", IE: "🇮🇪 Ireland", ZW: "🇿🇼 Zimbabwe",
};

interface ChampionRow {
  year: number;
  username: string;
  country: string | null;
  institution: string | null;
  eloScore: number;
  totalPoints: number;
}

interface ChampInfo {
  nextDate: string;          // ISO string
  year: number;
  registrantCount: number;
  pastChampions: ChampionRow[];
  userRegistered: boolean;
  userProfile: { country: string | null; city: string | null; institution: string | null; institutionType: string | null } | null;
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Pad({ n }: { n: number }) {
  return <span>{String(n).padStart(2, "0")}</span>;
}

export default function WorldChampionship() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [info, setInfo] = useState<ChampInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const url = user?.id ? `/api/bee/world-championship?userId=${user.id}` : "/api/bee/world-championship";
    fetch(url)
      .then((r) => r.json())
      .then((d: ChampInfo) => {
        setInfo(d);
        if (d.userRegistered) setRegistered(true);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  const targetDate = info ? new Date(info.nextDate) : new Date(Date.UTC(2027, 5, 19, 12, 0, 0));
  const countdown = useCountdown(targetDate);
  const profileComplete = !!(info?.userProfile?.country && info?.userProfile?.institution);

  async function handleRegister() {
    if (!user?.id) { navigate("/bee/profile"); return; }
    if (!profileComplete) { navigate("/bee/profile"); return; }
    setRegistering(true);
    try {
      const res = await fetch("/api/bee/world-championship/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const d = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(d.error ?? "Registration failed");
      setRegistered(true);
      setInfo((prev) => prev ? { ...prev, registrantCount: prev.registrantCount + 1, userRegistered: true } : prev);
      toast({ title: "You're registered for the World Championship! 🏆" });
    } catch (e: unknown) {
      toast({ title: (e as Error).message, variant: "destructive" });
    } finally {
      setRegistering(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-1.5 text-sm font-bold">
            🏆 Annual Event
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            World Spelling Bee<br />
            <span className="text-primary">Championship {info?.year ?? new Date().getFullYear() + 1}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One synchronous global final. Every speller. One moment.<br />
            3rd Saturday of June · 12:00 UTC
          </p>

          {/* Countdown */}
          <div className="inline-flex gap-4 bg-card border shadow-lg rounded-2xl px-8 py-5 mt-4">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Min" },
              { value: countdown.seconds, label: "Sec" },
            ].map((u, i) => (
              <div key={u.label} className="text-center">
                {i > 0 && <span className="absolute -ml-3 mt-1 text-2xl text-muted-foreground font-light">:</span>}
                <div className="text-4xl font-black tabular-nums text-primary"><Pad n={u.value} /></div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{u.label}</div>
              </div>
            ))}
          </div>

          {/* Registrant count */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span><strong className="text-foreground">{info?.registrantCount ?? 0}</strong> players registered so far</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-10">
        {/* Registration panel */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="pt-6 pb-6">
            {!user?.id ? (
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Trophy className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sign in to Register</h3>
                  <p className="text-muted-foreground text-sm mt-1">Create a free account to register for the World Championship</p>
                </div>
                <Button onClick={() => navigate("/")} className="gap-2">Sign In / Register</Button>
              </div>
            ) : registered ? (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-emerald-700">You're registered! 🎉</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Mark your calendar: <strong>{targetDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</strong> at 12:00 UTC.
                    Keep practising - the best Proficient spelling wins the title.
                  </p>
                </div>
                <Button onClick={() => navigate("/bee/create")} variant="outline" className="gap-2 shrink-0">
                  Practise Now <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : !profileComplete ? (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg">Complete your Bee Profile first</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    You need to add your country and institution before registering. This places you on regional leaderboards.
                  </p>
                </div>
                <Button onClick={() => navigate("/bee/profile")} className="gap-2 shrink-0">
                  Complete Profile <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg">Register for the {info?.year ?? ""} Championship</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Representing <strong>{COUNTRY_NAMES[info!.userProfile!.country!] ?? info!.userProfile!.country}</strong>
                    {info?.userProfile?.institution ? <> · <strong>{info.userProfile.institution}</strong></> : null}.
                    The contest is <strong>Proficient level</strong> for all registered players.
                  </p>
                </div>
                <Button onClick={handleRegister} disabled={registering} className="gap-2 shrink-0 h-12 px-6 font-semibold">
                  {registering ? "Registering…" : "Register Now 🏆"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji: "📝", title: "Register", desc: "Sign up any time before the event. Complete your geographic profile to appear on regional leaderboards." },
              { emoji: "🌍", title: "Compete Together", desc: "On the 3rd Saturday of June at 12:00 UTC, every registered player takes the same Proficient-level contest simultaneously." },
              { emoji: "🏆", title: "Claim the Title", desc: "The highest score wins the World Championship title for that year and is enshrined in the Hall of Champions." },
            ].map((step) => (
              <Card key={step.title} className="border-0 shadow-md text-center p-6 space-y-3">
                <div className="text-4xl">{step.emoji}</div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Schedule & rules */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-5 h-5 text-primary" /> Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: "Registration opens", value: "Year-round" },
                { label: "Registration closes", value: "1 hour before start" },
                { label: "Contest starts", value: "3rd Saturday of June, 12:00 UTC" },
                { label: "Duration", value: "25 words · Proficient level" },
                { label: "Word timeout", value: "12 seconds per word" },
                { label: "Results published", value: "Within 30 minutes of finish" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium text-right">{r.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="w-5 h-5 text-orange-500" /> Scoring & Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: "Base points per word", value: "100 pts" },
                { label: "Speed bonus (<5 s)", value: "+10 pts" },
                { label: "Streak bonus (≥3 correct)", value: "+15 pts" },
                { label: "Hint penalty", value: "−20 pts / hint" },
                { label: "Eligibility", value: "Any registered user" },
                { label: "Entry fee", value: "Free" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium text-right">{r.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Hall of Champions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">🏛️ Hall of Champions</h2>
          {!info?.pastChampions?.length ? (
            <Card className="border-0 shadow-md">
              <CardContent className="py-12 text-center space-y-3">
                <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground font-medium">No champions yet</p>
                <p className="text-sm text-muted-foreground">The first World Spelling Bee Champion will be crowned in {info?.year ?? 2027}. Could it be you?</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {info.pastChampions.map((c, i) => (
                <Card key={c.year} className={`border-0 shadow-md ${i === 0 ? "ring-2 ring-amber-400" : ""}`}>
                  <CardContent className="py-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${i === 0 ? "bg-amber-100" : "bg-muted"}`}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">{c.username}</span>
                        {c.country && <Badge variant="secondary" className="text-xs">{COUNTRY_NAMES[c.country] ?? c.country}</Badge>}
                        {c.institution && <Badge variant="outline" className="text-xs">{c.institution}</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{c.year} World Champion · {c.totalPoints.toLocaleString()} pts</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-primary">{c.eloScore}</div>
                      <div className="text-xs text-muted-foreground">Elo</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
