import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Flame, Target, Plus, Globe, Building2, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const LEVEL_BADGE: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700",
  lower_intermediate: "bg-blue-100 text-blue-700",
  upper_intermediate: "bg-violet-100 text-violet-700",
  proficient: "bg-rose-100 text-rose-700",
};

const COUNTRY_KEY_MAP: Record<string, string> = {
  ZA: "leaderboard.countryZA", NG: "leaderboard.countryNG", KE: "leaderboard.countryKE", GH: "leaderboard.countryGH",
  EG: "leaderboard.countryEG", US: "leaderboard.countryUS", GB: "leaderboard.countryGB",
  CA: "leaderboard.countryCA", AU: "leaderboard.countryAU", IN: "leaderboard.countryIN",
  PH: "leaderboard.countryPH", SG: "leaderboard.countrySG", MY: "leaderboard.countryMY",
  NZ: "leaderboard.countryNZ", IE: "leaderboard.countryIE", ZW: "leaderboard.countryZW",
  ZM: "leaderboard.countryZM", UG: "leaderboard.countryUG", TZ: "leaderboard.countryTZ",
  BW: "leaderboard.countryBW", DE: "leaderboard.countryDE", FR: "leaderboard.countryFR",
  BR: "leaderboard.countryBR", CN: "leaderboard.countryCN", JP: "leaderboard.countryJP",
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
  country: string | null;
  city: string | null;
  institution: string | null;
  institutionType: string | null;
}

type ViewMode = "global" | "country" | "institution";

export default function Leaderboard() {
  const { t } = useTranslation();

  const LEVELS = [
    { key: "", label: t("leaderboard.allLevels") },
    { key: "beginner", label: t("leaderboard.beginner") },
    { key: "lower_intermediate", label: t("leaderboard.lowerIntermediate") },
    { key: "upper_intermediate", label: t("leaderboard.upperIntermediate") },
    { key: "proficient", label: t("leaderboard.proficient") },
  ];

  const [, navigate] = useLocation();
  const [level, setLevel] = useState("");
  const [view, setView] = useState<ViewMode>("global");
  const [countryFilter, setCountryFilter] = useState("");
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50" });
    if (level) params.set("level", level);
    if (view === "country" && countryFilter) params.set("country", countryFilter);
    if (view === "institution" && institutionSearch.trim()) params.set("institution", institutionSearch.trim());

    fetch(`/api/bee/leaderboard?${params}`)
      .then((r) => r.json())
      .then((d: { rows: LeaderRow[] }) => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [level, view, countryFilter, institutionSearch]);

  const availableCountries = Array.from(new Set(rows.map((r) => r.country).filter(Boolean))) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-background to-primary/5 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-1.5 text-sm font-medium">
            <Trophy className="w-4 h-4" /> {t("leaderboard.badge")}
          </div>
          <h1 className="text-4xl font-bold">{t("leaderboard.heading")}</h1>
          <p className="text-muted-foreground">{t("leaderboard.subtitle")}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/bee/create")} className="gap-2">
              <Plus className="w-4 h-4" /> {t("leaderboard.createContest")}
            </Button>
            <Button onClick={() => navigate("/bee/world-championship")} variant="outline" className="gap-2">
              🌍 {t("nav.worldChampionship")}
            </Button>
          </div>
        </div>

        {/* View mode tabs */}
        <div className="flex rounded-xl border bg-muted/30 p-1 gap-1">
          {([
            { key: "global", label: `🌐 ${t("leaderboard.globalView")}`, icon: Globe },
            { key: "country", label: `🗺️ ${t("leaderboard.countryView")}`, icon: Globe },
            { key: "institution", label: `🏫 ${t("leaderboard.institutionView")}`, icon: Building2 },
          ] as { key: ViewMode; label: string; icon: typeof Globe }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${view === tab.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Secondary filter */}
        {view === "country" && (
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setCountryFilter("")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${!countryFilter ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}>
              {t("leaderboard.allCountries")}
            </button>
            {availableCountries.map((c) => (
              <button
                key={c}
                onClick={() => setCountryFilter(c === countryFilter ? "" : c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${countryFilter === c ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/50"}`}
              >
                {COUNTRY_KEY_MAP[c] ? t(COUNTRY_KEY_MAP[c]) : c}
              </button>
            ))}
          </div>
        )}

        {view === "institution" && (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("leaderboard.institutionSearch")}
                value={institutionSearch}
                onChange={(e) => setInstitutionSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        )}

        {/* Level filter */}
        <div className="flex gap-2 flex-wrap">
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
              <span className="col-span-1 text-center">{t("leaderboard.rankColumn")}</span>
              <span className="col-span-4">{t("leaderboard.player")}</span>
              <span className="col-span-2 text-right">{t("leaderboard.score")}</span>
              <span className="col-span-1 text-right">✅</span>
              <span className="col-span-1 text-right">🔥</span>
              <span className="col-span-3 text-right hidden sm:block">
                {view === "institution" ? t("leaderboard.institution", { defaultValue: "Institution" }) : view === "country" ? t("leaderboard.cityColumn") : t("leaderboard.contest")}
              </span>
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
                <p className="text-muted-foreground">{t("leaderboard.noData")}</p>
                <Button onClick={() => navigate("/bee/create")} variant="outline" className="gap-2">
                  <Crown className="w-4 h-4" /> {t("leaderboard.createContest")}
                </Button>
              </div>
            ) : (
              rows.map((row, i) => {
                const rank = i + 1;
                const flagEmoji = row.country ? (COUNTRY_KEY_MAP[row.country] ? t(COUNTRY_KEY_MAP[row.country]).slice(0, 2) : "") : "";
                return (
                  <div
                    key={`${row.userId}-${i}`}
                    className={`grid grid-cols-12 items-center px-4 py-3.5 border-b last:border-0 transition-colors hover:bg-muted/20 ${rank <= 3 ? "bg-amber-50/50" : ""}`}
                  >
                    <div className="col-span-1 flex justify-center">
                      {rank === 1 ? <span className="text-xl">🥇</span>
                        : rank === 2 ? <span className="text-xl">🥈</span>
                        : rank === 3 ? <span className="text-xl">🥉</span>
                        : <span className="text-sm text-muted-foreground font-mono w-6 text-center">{rank}</span>}
                    </div>
                    <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {(row.username ?? "?").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {flagEmoji && <span className="mr-1">{flagEmoji}</span>}
                          {row.username ?? "-"}
                        </p>
                        {row.contestName && <p className="text-xs text-muted-foreground truncate">{row.contestName}</p>}
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-bold text-lg tabular-nums">{row.score}</span>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="text-sm text-emerald-600 font-medium tabular-nums">{row.wordsCorrect}</span>
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
                    <div className="col-span-3 text-right hidden sm:block">
                      {view === "institution" && row.institution ? (
                        <div className="text-xs text-right">
                          <p className="font-medium truncate">{row.institution}</p>
                          {row.city && <p className="text-muted-foreground">{row.city}</p>}
                        </div>
                      ) : view === "country" && row.city ? (
                        <span className="text-xs text-muted-foreground">{row.city}</span>
                      ) : row.level ? (
                        <Badge className={`text-xs ${LEVEL_BADGE[row.level] ?? ""}`}>
                          {row.level.replace(/_/g, " ")}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* World Championship callout */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-accent text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-conic-gradient(white 0% 10%, transparent 10% 20%)" }} />
          <CardContent className="pt-6 pb-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-4xl">🌍</div>
              <div className="flex-1">
                <p className="font-bold text-lg">{t("leaderboard.championshipBanner")}</p>
                <p className="text-white/80 text-sm mt-0.5">{t("leaderboard.championshipDesc")}</p>
                <p className="text-white/70 text-xs mt-1">{t("leaderboard.championshipPricing")}</p>
              </div>
              <Button onClick={() => navigate("/bee/world-championship")} variant="secondary" className="shrink-0 gap-2 font-semibold">
                <Trophy className="w-4 h-4" /> {t("leaderboard.registerChampionship")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
