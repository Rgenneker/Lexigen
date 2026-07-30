import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trophy, CheckCircle2, Clock, Globe, Users, Flame, ChevronRight, AlertCircle, Crown } from "lucide-react";

const COUNTRY_KEY_MAP: Record<string, string> = {
  ZA: "bee.worldChampionship.countryZA",
  NG: "bee.worldChampionship.countryNG",
  KE: "bee.worldChampionship.countryKE",
  GH: "bee.worldChampionship.countryGH",
  EG: "bee.worldChampionship.countryEG",
  US: "bee.worldChampionship.countryUS",
  GB: "bee.worldChampionship.countryGB",
  CA: "bee.worldChampionship.countryCA",
  AU: "bee.worldChampionship.countryAU",
  IN: "bee.worldChampionship.countryIN",
  PH: "bee.worldChampionship.countryPH",
  SG: "bee.worldChampionship.countrySG",
  MY: "bee.worldChampionship.countryMY",
  NZ: "bee.worldChampionship.countryNZ",
  IE: "bee.worldChampionship.countryIE",
  ZW: "bee.worldChampionship.countryZW",
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
  const { t } = useTranslation();
  const { user } = useAuth();
  const isPremium = user?.plan === "premium";
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
      toast({ title: t("bee.worldChampionship.registeredToast") });
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
            🏆 {t("bee.worldChampionship.badge")}
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            {t("bee.worldChampionship.heading")}<br />
            <span className="text-primary">{t("bee.worldChampionship.yearHeading", { year: info?.year ?? new Date().getFullYear() + 1 })}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("bee.worldChampionship.subtitle")}<br />
            {t("bee.worldChampionship.dateDesc")}
          </p>

          {/* Countdown */}
          <div className="inline-flex gap-4 bg-card border shadow-lg rounded-2xl px-8 py-5 mt-4">
            {[
              { value: countdown.days, label: t("bee.worldChampionship.countdownDays") },
              { value: countdown.hours, label: t("bee.worldChampionship.countdownHours") },
              { value: countdown.minutes, label: t("bee.worldChampionship.countdownMin") },
              { value: countdown.seconds, label: t("bee.worldChampionship.countdownSec") },
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
            <span><strong className="text-foreground">{info?.registrantCount ?? 0}</strong> {t("bee.worldChampionship.registrantCountSuffix")}</span>
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
                  <h3 className="font-bold text-lg">{t("bee.worldChampionship.signInPrompt")}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{t("bee.worldChampionship.signInDesc")}</p>
                </div>
                <Button onClick={() => navigate("/")} className="gap-2">{t("bee.worldChampionship.signInBtn")}</Button>
              </div>
            ) : registered ? (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-emerald-700">{t("bee.worldChampionship.alreadyRegistered", { year: info?.year ?? "" })}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t("bee.worldChampionship.alreadyRegisteredDesc")} <strong>{targetDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</strong> at 12:00 UTC.
                    {t("bee.worldChampionship.keepPractising")}
                  </p>
                </div>
                <Button onClick={() => navigate("/bee/create")} variant="outline" className="gap-2 shrink-0">
                  {t("bee.worldChampionship.practiseNow")} <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : !profileComplete ? (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg">{t("bee.worldChampionship.profileRequired")}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t("bee.worldChampionship.profileRequiredDesc")}
                  </p>
                </div>
                <Button onClick={() => navigate("/bee/profile")} className="gap-2 shrink-0">
                  {t("bee.worldChampionship.completeProfileBtn")} <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start flex-wrap">
                    <h3 className="font-bold text-lg">{t("bee.worldChampionship.registerHeading", { year: info?.year ?? "" })}</h3>
                    {isPremium ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        <Crown className="w-3 h-3" /> {t("bee.worldChampionship.freeBadge")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                        {t("bee.worldChampionship.paidBadge")}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {t("bee.worldChampionship.representingPrefix")} <strong>{t(COUNTRY_KEY_MAP[info!.userProfile!.country!] ?? info!.userProfile!.country!)}</strong>
                    {info?.userProfile?.institution ? <> · <strong>{info.userProfile.institution}</strong></> : null}.
                    The contest is <strong>{t("bee.worldChampionship.contestLevel")}</strong> for all registered players.
                  </p>
                  {!isPremium && (
                    <p className="text-xs text-amber-700 mt-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                      {t("bee.worldChampionship.upgradeNote")} <a href="/premium" className="underline font-semibold hover:text-primary">{t("bee.worldChampionship.upgradeLink")}</a> {t("bee.worldChampionship.upgradeDesc")}
                    </p>
                  )}
                </div>
                <Button onClick={handleRegister} disabled={registering} className="gap-2 shrink-0 h-12 px-6 font-semibold">
                  {registering ? t("bee.worldChampionship.registering") : isPremium ? t("bee.worldChampionship.registerBtn") : t("bee.worldChampionship.registerPaidBtn")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How it works */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">{t("bee.worldChampionship.howItWorksHeading")}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji: "📝", titleKey: "bee.worldChampionship.step1Title", descKey: "bee.worldChampionship.step1Desc" },
              { emoji: "🌍", titleKey: "bee.worldChampionship.step2Title", descKey: "bee.worldChampionship.step2Desc" },
              { emoji: "🏆", titleKey: "bee.worldChampionship.step3Title", descKey: "bee.worldChampionship.step3Desc" },
            ].map((step) => (
              <Card key={step.titleKey} className="border-0 shadow-md text-center p-6 space-y-3">
                <div className="text-4xl">{step.emoji}</div>
                <h3 className="font-bold">{t(step.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(step.descKey)}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Schedule & rules */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-5 h-5 text-primary" /> {t("bee.worldChampionship.scheduleTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: t("bee.worldChampionship.scheduleRegOpens"), value: t("bee.worldChampionship.scheduleRegOpensVal") },
                { label: t("bee.worldChampionship.scheduleRegCloses"), value: t("bee.worldChampionship.scheduleRegClosesVal") },
                { label: t("bee.worldChampionship.scheduleStart"), value: t("bee.worldChampionship.scheduleStartVal") },
                { label: t("bee.worldChampionship.scheduleDuration"), value: t("bee.worldChampionship.scheduleDurationVal") },
                { label: t("bee.worldChampionship.scheduleTimeout"), value: t("bee.worldChampionship.scheduleTimeoutVal") },
                { label: t("bee.worldChampionship.scheduleResults"), value: t("bee.worldChampionship.scheduleResultsVal") },
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
                <Flame className="w-5 h-5 text-orange-500" /> {t("bee.worldChampionship.scoringTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: t("bee.worldChampionship.scoringBase"), value: t("bee.worldChampionship.scoringBaseVal") },
                { label: t("bee.worldChampionship.scoringSpeed"), value: t("bee.worldChampionship.scoringSpeedVal") },
                { label: t("bee.worldChampionship.scoringStreak"), value: t("bee.worldChampionship.scoringStreakVal") },
                { label: t("bee.worldChampionship.scoringHint"), value: t("bee.worldChampionship.scoringHintVal") },
                { label: t("bee.worldChampionship.scoringEligibility"), value: t("bee.worldChampionship.scoringEligibilityVal") },
                { label: t("bee.worldChampionship.entryFeeLabel"), value: isPremium ? t("bee.worldChampionship.entryFeePremium") : t("bee.worldChampionship.entryFeeAll") },
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
          <h2 className="text-2xl font-bold text-center">{t("bee.worldChampionship.hallTitle")}</h2>
          {!info?.pastChampions?.length ? (
            <Card className="border-0 shadow-md">
              <CardContent className="py-12 text-center space-y-3">
                <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground font-medium">{t("bee.worldChampionship.noChampions")}</p>
                <p className="text-sm text-muted-foreground">{t("bee.worldChampionship.noChampionsDesc", { year: info?.year ?? 2027 })}</p>
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
                        {c.country && <Badge variant="secondary" className="text-xs">{t(COUNTRY_KEY_MAP[c.country] ?? c.country)}</Badge>}
                        {c.institution && <Badge variant="outline" className="text-xs">{c.institution}</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{t("bee.worldChampionship.championDesc", { year: c.year, pts: c.totalPoints.toLocaleString() })}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-primary">{c.eloScore}</div>
                      <div className="text-xs text-muted-foreground">{t("bee.worldChampionship.elo")}</div>
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
