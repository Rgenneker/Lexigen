import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Building2, GraduationCap, CheckCircle2, Globe, ChevronRight } from "lucide-react";

const INSTITUTION_TYPES = [
  { value: "school", label: "School (Grade 1–12)" },
  { value: "university", label: "University / College" },
  { value: "corporate", label: "Corporate / Workplace" },
  { value: "community", label: "Community Group" },
  { value: "independent", label: "Independent (Self)" },
  { value: "other", label: "Other" },
];

const COUNTRIES = [
  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
  { code: "EG", name: "Egypt" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "PH", name: "Philippines" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "NZ", name: "New Zealand" },
  { code: "IE", name: "Ireland" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "ZM", name: "Zambia" },
  { code: "UG", name: "Uganda" },
  { code: "TZ", name: "Tanzania" },
  { code: "ET", name: "Ethiopia" },
  { code: "BW", name: "Botswana" },
  { code: "MW", name: "Malawi" },
  { code: "MZ", name: "Mozambique" },
  { code: "NA", name: "Namibia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "PK", name: "Pakistan" },
  { code: "BD", name: "Bangladesh" },
  { code: "OTHER", name: "Other" },
].sort((a, b) => a.name.localeCompare(b.name));

interface BeeProfile {
  country: string | null;
  city: string | null;
  institution: string | null;
  institutionType: string | null;
}

export default function BeeProfilePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [profile, setProfile] = useState<BeeProfile>({ country: "", city: "", institution: "", institutionType: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/bee/profile/${user.id}`)
      .then((r) => r.json())
      .then((d: { profile: BeeProfile }) => {
        if (d.profile) setProfile(d.profile);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  async function handleSave() {
    if (!user?.id) return;
    setSaving(true);
    try {
      const res = await fetch("/api/bee/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ...profile }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      toast({ title: "Profile saved! 🌍" });
    } catch {
      toast({ title: "Failed to save profile", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  const isComplete = !!(profile.country && profile.city && profile.institution && profile.institutionType);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
            <Globe className="w-4 h-4" /> Geographic Profile
          </div>
          <h1 className="text-3xl font-bold">Your Bee Profile 🐝</h1>
          <p className="text-muted-foreground">
            Fill in your location and institution to appear on regional leaderboards and qualify for the{" "}
            <span className="text-primary font-medium">Annual World Championship</span>.
          </p>
        </div>

        {/* Completeness indicator */}
        <div className={`rounded-xl p-4 flex items-center gap-3 border ${isComplete ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isComplete ? "bg-emerald-100" : "bg-amber-100"}`}>
            {isComplete ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Globe className="w-5 h-5 text-amber-600" />}
          </div>
          <div>
            <p className={`font-semibold text-sm ${isComplete ? "text-emerald-800" : "text-amber-800"}`}>
              {isComplete ? "Profile complete - you can register for the World Championship!" : "Complete all fields to unlock World Championship registration"}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle>Location & Institution</CardTitle>
            <CardDescription>Used for regional leaderboards only - never shared publicly beyond your display name</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Country */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-muted-foreground" /> Country
              </label>
              <select
                value={profile.country ?? ""}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select your country…</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-muted-foreground" /> City / Town
              </label>
              <Input
                placeholder="e.g. Cape Town, Lagos, Nairobi…"
                value={profile.city ?? ""}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                maxLength={80}
              />
            </div>

            {/* Institution */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-muted-foreground" /> Institution / Organisation
              </label>
              <Input
                placeholder="e.g. UCT, Lagos Business School, Independent…"
                value={profile.institution ?? ""}
                onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                maxLength={120}
              />
            </div>

            {/* Institution type */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-muted-foreground" /> Institution Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {INSTITUTION_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setProfile({ ...profile, institutionType: t.value })}
                    className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-all ${profile.institutionType === t.value ? "border-primary bg-primary/5 font-medium text-primary" : "border-border hover:border-primary/40"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full h-11 text-base font-semibold gap-2">
              {saving ? "Saving…" : saved ? <><CheckCircle2 className="w-5 h-5" /> Saved!</> : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Next steps */}
        {isComplete && (
          <div className="space-y-3">
            <button
              onClick={() => navigate("/bee/world-championship")}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div className="text-left">
                  <p className="font-semibold">Register for the World Championship</p>
                  <p className="text-xs text-muted-foreground">Annual global final - 3rd Saturday of June, 12:00 UTC</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div className="text-left">
                  <p className="font-semibold">View Regional Leaderboard</p>
                  <p className="text-xs text-muted-foreground">Filter by country or institution</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
