import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, Trophy, Search, XCircle, Loader2, BarChart3 } from "lucide-react";

const LEVEL_COLOR: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700", lower_intermediate: "bg-blue-100 text-blue-700",
  upper_intermediate: "bg-violet-100 text-violet-700", proficient: "bg-rose-100 text-rose-700",
};
const STATUS_COLOR: Record<string, string> = {
  pending: "bg-muted text-muted-foreground", active: "bg-blue-100 text-blue-700",
  finished: "bg-emerald-100 text-emerald-700", cancelled: "bg-red-100 text-red-700",
};

interface Overview { totalContests: number; totalUsers: number; activeContests: number; totalAnswers: number }
interface AdminContest { id: number; name: string; level: string; status: string; contest_code: string; organiser: string; player_count: number; created_at: string }
interface AdminUser { id: number; username: string; email: string; is_premium: boolean; is_admin: boolean; country: string | null; institution: string | null; bee_contests: number; created_at: string }

type AdminTab = "overview" | "contests" | "users";

export default function AdminPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<AdminTab>("overview");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [contests, setContests] = useState<AdminContest[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [contestSearch, setContestSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [contestStatus, setContestStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/bee/admin/check?userId=${user.id}`)
      .then((r) => r.json())
      .then((d: { isAdmin: boolean }) => setIsAdmin(d.isAdmin));
  }, [user?.id]);

  useEffect(() => {
    if (!isAdmin || !user?.id) return;
    if (tab === "overview") {
      setLoading(true);
      fetch(`/api/bee/admin/overview?userId=${user.id}`)
        .then((r) => r.json()).then((d: Overview) => setOverview(d)).finally(() => setLoading(false));
    }
  }, [isAdmin, tab, user?.id]);

  async function loadContests() {
    if (!user?.id) return;
    setLoading(true);
    const params = new URLSearchParams({ userId: String(user.id), limit: "50" });
    if (contestStatus) params.set("status", contestStatus);
    const res = await fetch(`/api/bee/admin/contests?${params}`);
    const d = await res.json() as { contests: AdminContest[] };
    setContests(d.contests ?? []);
    setLoading(false);
  }

  async function loadUsers() {
    if (!user?.id) return;
    setLoading(true);
    const params = new URLSearchParams({ userId: String(user.id), limit: "50" });
    if (userSearch.trim()) params.set("q", userSearch.trim());
    const res = await fetch(`/api/bee/admin/users?${params}`);
    const d = await res.json() as { users: AdminUser[] };
    setUsers(d.users ?? []);
    setLoading(false);
  }

  useEffect(() => { if (isAdmin && tab === "contests") loadContests(); }, [isAdmin, tab, contestStatus]);
  useEffect(() => { if (isAdmin && tab === "users") loadUsers(); }, [isAdmin, tab]);

  async function cancelContest(id: number) {
    if (!user?.id || !confirm(t("bee.admin.confirmCancel"))) return;
    await fetch(`/api/bee/admin/contests/${id}/cancel`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    toast({ title: t("bee.admin.contestCancelled") });
    await loadContests();
  }

  async function toggleAdmin(targetId: number, targetName: string) {
    if (!user?.id || !confirm(t("bee.admin.confirmToggleAdmin", { name: targetName }))) return;
    await fetch(`/api/bee/admin/users/${targetId}/toggle-admin`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    toast({ title: t("bee.admin.adminUpdated") });
    await loadUsers();
  }

  if (isAdmin === null) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <Shield className="w-14 h-14 text-muted-foreground/30" />
      <h2 className="text-2xl font-bold">{t("bee.admin.accessRequired")}</h2>
      <p className="text-muted-foreground max-w-sm">{t("bee.admin.accessRequiredDesc")}</p>
      <Button onClick={() => navigate("/")} variant="outline">{t("bee.admin.goHome")}</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t("bee.admin.heading")}</h1>
            <p className="text-sm text-muted-foreground">{t("bee.admin.subtitle")}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl border bg-background p-1 gap-1 shadow-sm">
          {([
            { key: "overview", label: t("bee.admin.tabOverview"), icon: BarChart3 },
            { key: "contests", label: t("bee.admin.tabContests"), icon: Trophy },
            { key: "users", label: t("bee.admin.tabUsers"), icon: Users },
          ] as { key: AdminTab; label: string; icon: typeof BarChart3 }[]).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === "overview" && overview && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { label: t("bee.admin.totalUsers"), value: overview.totalUsers, icon: "👥", color: "text-primary" },
                { label: t("bee.admin.totalContests"), value: overview.totalContests, icon: "🐝", color: "text-amber-600" },
                { label: t("bee.admin.activeNow"), value: overview.activeContests, icon: "⚡", color: "text-emerald-600" },
                { label: t("bee.admin.totalAnswers"), value: overview.totalAnswers.toLocaleString(), icon: "✍️", color: "text-violet-600" },
              ].map((s) => (
                <Card key={s.label} className="border-0 shadow-md text-center">
                  <CardContent className="pt-5 pb-5">
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contests tab */}
        {tab === "contests" && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {["", "pending", "active", "finished", "cancelled"].map((s) => {
              const statusLabel: Record<string, string> = {
                pending: t("bee.admin.statusPending"),
                active: t("bee.admin.statusActive"),
                finished: t("bee.admin.statusFinished"),
                cancelled: t("bee.admin.statusCancelled"),
              };
              return (
                <button key={s} onClick={() => setContestStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${contestStatus === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>
                  {s ? (statusLabel[s] ?? s) : t("bee.admin.filterAll")}
                </button>
              );
              })}
            </div>
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : contests.length === 0 ? (
                  <p className="text-center py-12 text-muted-foreground text-sm">{t("bee.admin.noContests")}</p>
                ) : contests.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 px-4 py-3 border-b last:border-0 hover:bg-muted/20">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{c.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className={`text-xs ${LEVEL_COLOR[c.level]}`}>{{
                            beginner: t("bee.admin.levelBeginner"),
                            lower_intermediate: t("bee.admin.levelLowerIntermediate"),
                            upper_intermediate: t("bee.admin.levelUpperIntermediate"),
                            proficient: t("bee.admin.levelProficient")
                          }[c.level] ?? c.level.replace(/_/g, " ")}</Badge>
                        <Badge className={`text-xs ${STATUS_COLOR[c.status]}`}>{{
                            pending: t("bee.admin.statusPending"),
                            active: t("bee.admin.statusActive"),
                            finished: t("bee.admin.statusFinished"),
                            cancelled: t("bee.admin.statusCancelled")
                          }[c.status] ?? c.status}</Badge>
                        <span className="text-xs text-muted-foreground">{t("bee.admin.contestMeta", { count: c.player_count, organiser: c.organiser })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono text-muted-foreground">{c.contest_code}</span>
                      {c.status !== "finished" && c.status !== "cancelled" && (
                        <Button size="sm" variant="destructive" onClick={() => cancelContest(c.id)} className="gap-1 h-7 text-xs">
                          <XCircle className="w-3 h-3" /> {t("bee.admin.cancelContest")}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users tab */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder={t("bee.admin.searchPlaceholder")} value={userSearch} onChange={(e) => setUserSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loadUsers()} className="pl-9" />
              </div>
              <Button variant="outline" onClick={loadUsers}>{t("bee.admin.searchBtn")}</Button>
            </div>
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : users.length === 0 ? (
                  <p className="text-center py-12 text-muted-foreground text-sm">{t("bee.admin.noUsers")}</p>
                ) : users.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 px-4 py-3 border-b last:border-0 hover:bg-muted/20">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-medium text-sm">{u.username}</p>
                        {u.is_admin && <Badge className="bg-primary/10 text-primary text-xs">{t("bee.admin.badgeAdmin")}</Badge>}
                        {u.is_premium && <Badge className="bg-amber-100 text-amber-700 text-xs">{t("bee.admin.badgePremium")}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{u.email} · {u.bee_contests} bee contests{u.country ? ` · ${u.country}` : ""}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => toggleAdmin(u.id, u.username)} className="h-7 text-xs shrink-0">
                      {u.is_admin ? t("bee.admin.revokeAdmin") : t("bee.admin.makeAdmin")}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
