import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, XCircle, Trophy, Users, Clock, Link, QrCode } from "lucide-react";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Beginner",
  lower_intermediate: "Lower Intermediate",
  upper_intermediate: "Upper Intermediate",
  proficient: "Proficient",
};
const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-800",
  lower_intermediate: "bg-blue-100 text-blue-800",
  upper_intermediate: "bg-violet-100 text-violet-800",
  proficient: "bg-rose-100 text-rose-800",
};

interface InviteData {
  invite: { id: number; status: string; contestId: number; token: string };
  contest: { id: number; name: string; level: string; contestCode: string; status: string };
  organiserName: string;
  playerCount: number;
}

export default function InvitePage({ token }: { token: string }) {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [data, setData] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [responded, setResponded] = useState<"accepted" | "declined" | null>(null);
  const [activeTab, setActiveTab] = useState<"link" | "qr">("link");

  const shareUrl = data ? `${window.location.origin}/bee/invite/${data.contest.contestCode}` : "";

  useEffect(() => {
    fetch(`/api/bee/invites/${token}`)
      .then((r) => r.json())
      .then((d: InviteData | { error: string }) => {
        if ("error" in d) throw new Error(d.error);
        setData(d as InviteData);
      })
      .catch((e: unknown) => toast({ title: (e as Error).message, variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [token, toast]);

  async function respond(action: "accept" | "decline") {
    if (!user?.id) { toast({ title: "Sign in to respond to this invite", variant: "destructive" }); return; }
    setResponding(true);
    try {
      const res = await fetch(`/api/bee/invites/${token}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, action }),
      });
      if (!res.ok) {
        const e = await res.json() as { error: string };
        throw new Error(e.error);
      }
      const d = await res.json() as { contestId: number };
      setResponded(action === "accept" ? "accepted" : "declined");
      if (action === "accept") {
        setTimeout(() => navigate(`/bee/play/${d.contestId}`), 1200);
      }
    } catch (e: unknown) {
      toast({ title: (e as Error).message, variant: "destructive" });
    } finally {
      setResponding(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <XCircle className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold">Invite not found or expired</h2>
          <p className="text-muted-foreground">This invite link may have expired or been used already.</p>
          <Button onClick={() => navigate("/")} variant="outline">Go Home</Button>
        </div>
      </div>
    );
  }

  const { invite, contest } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <p className="text-4xl">🐝</p>
          <h1 className="text-3xl font-bold">You're Invited!</h1>
          <p className="text-muted-foreground"><span className="font-semibold text-foreground">{data.organiserName}</span> is challenging you to a Spelling Bee</p>
        </div>

        {/* Contest card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl">{contest.name}</CardTitle>
                <CardDescription>Hosted by {data.organiserName}</CardDescription>
              </div>
              <Badge className={`shrink-0 ${LEVEL_COLORS[contest.level]}`}>
                {LEVEL_LABELS[contest.level]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Players so far</p>
                  <p className="font-semibold">{data.playerCount} / 5</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Buy-in</p>
                  <p className="font-semibold">{["upper_intermediate", "proficient"].includes(contest.level) ? "$1.00" : "Free"}</p>
                </div>
              </div>
            </div>

            {invite.status !== "pending" || responded ? (
              <div className={`flex items-center gap-3 p-4 rounded-xl ${responded === "accepted" || invite.status === "accepted" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {responded === "accepted" || invite.status === "accepted" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <div>
                  <p className="font-semibold">{responded === "accepted" || invite.status === "accepted" ? "You accepted!" : "You declined"}</p>
                  {(responded === "accepted" || invite.status === "accepted") && <p className="text-xs mt-0.5">Redirecting to lobby…</p>}
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button onClick={() => respond("accept")} disabled={responding} className="flex-1 gap-2 h-11">
                  <CheckCircle2 className="w-4 h-4" /> Accept Challenge
                </Button>
                <Button onClick={() => respond("decline")} disabled={responding} variant="outline" className="flex-1 gap-2 h-11">
                  <XCircle className="w-4 h-4" /> Decline
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Share with others */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">Share with others</p>
            <div className="flex border rounded-lg overflow-hidden">
              <button onClick={() => setActiveTab("link")} className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${activeTab === "link" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                <Link className="w-3.5 h-3.5" /> Link
              </button>
              <button onClick={() => setActiveTab("qr")} className={`flex-1 py-2 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${activeTab === "qr" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                <QrCode className="w-3.5 h-3.5" /> QR Code
              </button>
            </div>
            {activeTab === "link" ? (
              <div className="flex gap-2">
                <input value={shareUrl} readOnly className="flex-1 text-xs font-mono bg-muted/50 border rounded px-3 py-2 outline-none" />
                <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(shareUrl); }}>Copy</Button>
              </div>
            ) : (
              <div className="flex justify-center py-2">
                <div className="p-2 bg-white rounded-lg border">
                  <QRCodeSVG value={shareUrl} size={140} includeMargin />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> Invite expires in 48 hours
          </p>
        </div>
      </div>
    </div>
  );
}
