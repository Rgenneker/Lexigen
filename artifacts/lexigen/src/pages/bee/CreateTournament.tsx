import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Crown, Search, X, Plus, Trophy, ChevronRight, Users } from "lucide-react";

const SIZE_OPTIONS = [
  { players: 2, labelKey: "bee.createTournament.sizeDuelLabel", descKey: "bee.createTournament.sizeDuelDesc", emoji: "⚔️", roundsKey: "bee.createTournament.sizeDuelRounds" },
  { players: 4, labelKey: "bee.createTournament.sizeMiniLabel", descKey: "bee.createTournament.sizeMiniDesc", emoji: "🥊", roundsKey: "bee.createTournament.sizeMiniRounds" },
  { players: 8, labelKey: "bee.createTournament.sizeFullLabel", descKey: "bee.createTournament.sizeFullDesc", emoji: "🏟️", roundsKey: "bee.createTournament.sizeFullRounds" },
];

interface SearchedUser { id: number; username: string; email: string }

export default function CreateTournament() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const LEVELS = [
    { key: "beginner", label: t("bee.createContest.levels.beginner"), color: "bg-emerald-100 text-emerald-800", cardBg: "bg-emerald-50 border-emerald-200", paid: false },
    { key: "lower_intermediate", label: t("bee.createContest.levels.lower_intermediate"), color: "bg-blue-100 text-blue-800", cardBg: "bg-blue-50 border-blue-200", paid: false },
    { key: "upper_intermediate", label: t("bee.createContest.levels.upper_intermediate"), color: "bg-violet-100 text-violet-800", cardBg: "bg-violet-50 border-violet-200", paid: true },
    { key: "proficient", label: t("bee.createContest.levels.proficient"), color: "bg-rose-100 text-rose-800", cardBg: "bg-rose-50 border-rose-200", paid: true },
  ];

  const [name, setName] = useState("");
  const [level, setLevel] = useState("beginner");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);
  const [invited, setInvited] = useState<SearchedUser[]>([]);
  const [loading, setLoading] = useState(false);

  const sizeOption = SIZE_OPTIONS.find((s) => s.players === maxPlayers) ?? SIZE_OPTIONS[1];
  const maxInvite = maxPlayers - 1;

  async function handleSearch() {
    if (search.trim().length < 2) return;
    const res = await fetch(`/api/bee/users/search?q=${encodeURIComponent(search)}`);
    const data = await res.json() as { users: SearchedUser[] };
    setSearchResults(data.users.filter((u) => u.id !== user?.id && !invited.find((i) => i.id === u.id)));
  }

  function addInvitee(u: SearchedUser) {
    if (invited.length >= maxInvite) {
      toast({ title: t("bee.createTournament.errorMaxChallengers", { count: maxInvite }), variant: "destructive" });
      return;
    }
    setInvited([...invited, u]);
    setSearchResults([]);
    setSearch("");
  }

  async function handleCreate() {
    if (!user?.id) return;
    if (!name.trim()) { toast({ title: t("bee.createTournament.errorNoName"), variant: "destructive" }); return; }
    if (invited.length < 1) { toast({ title: t("bee.createTournament.errorNoChallengers"), variant: "destructive" }); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/bee/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organiserId: user.id,
          name: name.trim(),
          level,
          inviteUserIds: invited.map((u) => u.id),
        }),
      });
      if (!res.ok) { const e = await res.json() as { error: string }; throw new Error(e.error); }
      const data = await res.json() as { tournament: { id: number } };
      navigate(`/bee/tournament/${data.tournament.id}`);
    } catch (e: unknown) {
      toast({ title: (e as Error).message ?? "Failed to create", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-7">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-1.5 text-sm font-medium">
            <Trophy className="w-4 h-4" /> {t("bee.createTournament.organiserLabel")}
          </div>
          <h1 className="text-4xl font-bold">{t("bee.createTournament.heading")}</h1>
          <p className="text-muted-foreground">{t("bee.createTournament.subtitle")}</p>
        </div>

        {/* Name */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6 space-y-3">
            <label className="text-sm font-semibold">{t("bee.createTournament.labelName")}</label>
            <Input placeholder={t("bee.createTournament.namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
          </CardContent>
        </Card>

        {/* Size */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2"><Users className="w-5 h-5" /> {t("bee.createTournament.labelSize")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {SIZE_OPTIONS.map((s) => (
              <button key={s.players} onClick={() => { setMaxPlayers(s.players); setInvited([]); }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${maxPlayers === s.players ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"}`}>
                <div className="text-2xl mb-1">{s.emoji}</div>
                <p className="font-bold text-sm">{t(s.labelKey)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t(s.roundsKey)}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Level */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6 space-y-3">
            <label className="text-sm font-semibold">{t("bee.createContest.labelLevel")}</label>
            <div className="grid grid-cols-2 gap-2">
              {LEVELS.map((l) => (
                <button key={l.key} onClick={() => setLevel(l.key)}
                  className={`relative py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all text-left ${level === l.key ? "border-primary bg-primary/5" : `${l.cardBg} hover:border-primary/40`}`}>
                  {l.paid && <span className="absolute top-2 right-2 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{t("bee.createContest.premiumLevel")}</span>}
                  <Badge className={`mb-1 ${l.color}`}>{l.label}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invite */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("bee.createContest.labelInvite")}</CardTitle>
            <CardDescription>{t("bee.createTournament.inviteDesc", { count: maxInvite, plural: maxInvite !== 1 ? "s" : "", total: maxPlayers })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder={t("bee.createContest.searchPlaceholder")} value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
              <Button variant="outline" onClick={handleSearch} size="icon"><Search className="w-4 h-4" /></Button>
            </div>
            {searchResults.length > 0 && (
              <div className="border rounded-lg divide-y">
                {searchResults.map((u) => (
                  <button key={u.id} onClick={() => addInvitee(u)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left">
                    <div>
                      <p className="font-medium text-sm">{u.username}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <Plus className="w-4 h-4 text-primary" />
                  </button>
                ))}
              </div>
            )}
            {invited.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {invited.map((u) => (
                  <Badge key={u.id} variant="secondary" className="gap-1.5 pl-3 pr-2 py-1.5">
                    {u.username}
                    <button onClick={() => setInvited(invited.filter((i) => i.id !== u.id))}><X className="w-3 h-3" /></button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Button onClick={handleCreate} disabled={loading || !name.trim() || invited.length < 1} className="w-full h-12 text-base font-semibold gap-2">
          {loading ? t("bee.createContest.creating") : <><Crown className="w-5 h-5" /> {t("bee.createTournament.launchBtn")}</>}
        </Button>
      </div>
    </div>
  );
}
