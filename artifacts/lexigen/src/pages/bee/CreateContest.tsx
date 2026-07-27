import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { Crown, Plus, X, Search, Link, QrCode, Trophy, ChevronRight } from "lucide-react";

const LEVELS = [
  { key: "beginner", label: "Beginner", desc: "3–6 letter phonetic words", color: "bg-emerald-100 text-emerald-800 border-emerald-200", free: true, words: 10 },
  { key: "lower_intermediate", label: "Lower Intermediate", desc: "6–8 letters, common roots", color: "bg-blue-100 text-blue-800 border-blue-200", free: true, words: 15 },
  { key: "upper_intermediate", label: "Upper Intermediate", desc: "8–12 letters, Latin/Greek roots", color: "bg-violet-100 text-violet-800 border-violet-200", free: false, words: 20 },
  { key: "proficient", label: "Proficient", desc: "12+ letters, advanced etymology", color: "bg-rose-100 text-rose-800 border-rose-200", free: false, words: 25 },
];

interface SearchedUser { id: number; username: string; email: string }

export default function CreateContest() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [level, setLevel] = useState("beginner");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);
  const [invited, setInvited] = useState<SearchedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState<{ contestId: number; code: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"link" | "qr">("link");

  const shareUrl = created ? `${window.location.origin}/bee/invite/${created.code}` : "";

  async function handleSearch() {
    if (search.trim().length < 2) return;
    const res = await fetch(`/api/bee/users/search?q=${encodeURIComponent(search)}`);
    const data = await res.json() as { users: SearchedUser[] };
    setSearchResults(data.users.filter((u) => u.id !== user?.id && !invited.find((i) => i.id === u.id)));
  }

  function addInvitee(u: SearchedUser) {
    if (invited.length >= 4) { toast({ title: "Maximum 4 challengers", variant: "destructive" }); return; }
    setInvited([...invited, u]);
    setSearchResults([]);
    setSearch("");
  }

  async function handleCreate() {
    if (!user?.id) return;
    if (!name.trim()) { toast({ title: "Enter a contest name", variant: "destructive" }); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/bee/contests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organiserId: user.id,
          name: name.trim(),
          level,
          inviteUserIds: invited.map((u) => u.id),
        }),
      });
      if (!res.ok) {
        const err = await res.json() as { error: string };
        throw new Error(err.error);
      }
      const data = await res.json() as { contest: { id: number; contestCode: string } };
      setCreated({ contestId: data.contest.id, code: data.contest.contestCode });
    } catch (e: unknown) {
      toast({ title: (e as Error).message ?? "Failed to create contest", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  if (created) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-card">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
              <Trophy className="w-8 h-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl">Contest Created! 🐝</CardTitle>
            <CardDescription>Share the invite with your challengers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Contest Code</p>
              <p className="text-4xl font-mono font-bold tracking-widest text-primary">{created.code}</p>
            </div>

            <div className="flex border rounded-lg overflow-hidden">
              <button onClick={() => setActiveTab("link")} className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === "link" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                <Link className="w-4 h-4" /> Share Link
              </button>
              <button onClick={() => setActiveTab("qr")} className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === "qr" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                <QrCode className="w-4 h-4" /> QR Code
              </button>
            </div>

            {activeTab === "link" ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly className="text-xs font-mono" />
                  <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(shareUrl); toast({ title: "Link copied!" }); }}>
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">Anyone with this link can join (up to 5 players total)</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-white rounded-xl border shadow-sm">
                  <QRCodeSVG value={shareUrl} size={180} includeMargin />
                </div>
                <p className="text-xs text-muted-foreground">Scan to join on any device</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={() => navigate(`/bee/play/${created.contestId}`)} className="flex-1 gap-2">
                Go to Lobby <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-2">
            <Crown className="w-4 h-4" /> Contest Organiser
          </div>
          <h1 className="text-4xl font-bold">Create a Spelling Bee 🐝</h1>
          <p className="text-muted-foreground">Invite up to 4 challengers for a live spelling contest</p>
        </div>

        {/* Contest Name */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6 space-y-3">
            <label className="text-sm font-semibold">Contest Name</label>
            <Input placeholder="e.g. Friday Night Bee, UCT vs Wits, Room 4B Championship…" value={name} onChange={(e) => setName(e.target.value)} className="text-base" maxLength={60} />
          </CardContent>
        </Card>

        {/* Level */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Choose Level</CardTitle>
            <CardDescription>All challengers compete at the same level</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LEVELS.map((l) => (
              <button key={l.key} onClick={() => setLevel(l.key)} className={`relative text-left p-4 rounded-xl border-2 transition-all ${level === l.key ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"}`}>
                {!l.free && <span className="absolute top-2 right-2 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">$1 buy-in</span>}
                <p className="font-semibold text-sm">{l.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{l.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{l.words} words · {l.key === "beginner" ? "20s" : l.key === "lower_intermediate" ? "18s" : l.key === "upper_intermediate" ? "15s" : "12s"} per word</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Invite players */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Invite Challengers</CardTitle>
            <CardDescription>Search by username or email · max 4</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Search username or email…" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
              <Button variant="outline" onClick={handleSearch} size="icon"><Search className="w-4 h-4" /></Button>
            </div>
            {searchResults.length > 0 && (
              <div className="border rounded-lg divide-y">
                {searchResults.map((u) => (
                  <button key={u.id} onClick={() => addInvitee(u)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left">
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
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Invited ({invited.length}/4)</p>
                <div className="flex flex-wrap gap-2">
                  {invited.map((u) => (
                    <Badge key={u.id} variant="secondary" className="gap-1.5 pl-3 pr-2 py-1.5">
                      {u.username}
                      <button onClick={() => setInvited(invited.filter((i) => i.id !== u.id))} className="hover:text-destructive transition-colors"><X className="w-3 h-3" /></button>
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Additional players can join via the shareable link after creation</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Button onClick={handleCreate} disabled={loading || !name.trim()} className="w-full h-12 text-base font-semibold gap-2">
          {loading ? "Creating…" : <><Crown className="w-5 h-5" /> Create Contest</>}
        </Button>
      </div>
    </div>
  );
}
