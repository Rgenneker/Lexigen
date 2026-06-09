import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  useGetPremiumStatus, useUpgradeToPremium,
  getGetPremiumStatusQueryKey, useGetDailyWord
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  Check, Zap, Lock, TrendingUp, Gamepad2, FileText,
  Crown, Brain, ChevronRight, RefreshCw, BarChart3,
  BookOpen, Sparkles, Star, Globe, Trophy, Mic,
  Download, Flame, Users, ChevronDown
} from "lucide-react";

const LANGUAGE_CODES: Record<string, string> = {
  English: "en", Spanish: "es", Portuguese: "pt", French: "fr", German: "de",
  Dutch: "nl", Italian: "it", Arabic: "ar", Afrikaans: "af", Zulu: "zu",
  Xhosa: "xh", Farsi: "fa", Russian: "ru", "Bahasa Malay": "ms",
  Vietnamese: "vi", Tagalog: "tl", Japanese: "ja", Cantonese: "yue", "Chinese (Mandarin)": "zh"
};

type SessionType = "quiz" | "builder" | "report" | null;

// ── Quiz ────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { word: "Ephemeral", options: ["Lasting forever", "Short-lived and transient", "Bright and glowing", "Deeply meaningful"], answer: 1 },
  { word: "Perspicacious", options: ["Overly cautious", "Having sharp insight", "Physically strong", "Emotionally detached"], answer: 1 },
  { word: "Equanimity", options: ["Great anger", "Intense joy", "Mental calmness", "Physical strength"], answer: 2 },
  { word: "Confluence", options: ["A type of river fish", "A state of confusion", "A coming together", "A formal agreement"], answer: 2 },
  { word: "Audacious", options: ["Quietly reserved", "Daring and bold", "Deeply empathetic", "Carefully planned"], answer: 1 },
];

function VocabQuiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUIZ_QUESTIONS[idx];

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= QUIZ_QUESTIONS.length) { setDone(true); }
      else { setIdx(i => i + 1); setSelected(null); }
    }, 900);
  };

  if (done) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-6">
      <div className="text-5xl font-bold text-primary">{score}/{QUIZ_QUESTIONS.length}</div>
      <p className="font-bold text-lg">{score === 5 ? "Perfect score! Word master." : score >= 3 ? "Strong vocab skills." : "Keep practising — you're growing."}</p>
      <Button onClick={() => { setIdx(0); setScore(0); setSelected(null); setDone(false); }} variant="outline" size="sm" className="rounded-full mt-2">
        <RefreshCw className="h-3.5 w-3.5 mr-2" /> Try Again
      </Button>
    </motion.div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Question {idx + 1} of {QUIZ_QUESTIONS.length}</span>
        <span className="text-xs font-bold text-primary">{score} correct</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div animate={{ width: `${(idx / QUIZ_QUESTIONS.length) * 100}%` }} className="h-full bg-primary rounded-full" />
      </div>
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">What does this word mean?</p>
        <p className="text-4xl font-bold tracking-tight font-mono" data-testid="quiz-word">{q.word}</p>
      </div>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
            className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
              selected === null ? "border-border hover:border-primary/50 hover:bg-primary/5"
                : i === q.answer ? "border-green-500 bg-green-500/10 text-green-600"
                : i === selected ? "border-destructive bg-destructive/10 text-destructive"
                : "border-border opacity-50"}`}
            data-testid={`quiz-option-${i}`}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

// ── Sentence Builder ─────────────────────────────────────
function SentenceBuilder({ word }: { word: string }) {
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const prompts = [
    `Use "${word}" to describe a moment that shaped you.`,
    `Write a sentence with "${word}" set in a city you love.`,
    `Describe someone you admire using the word "${word}".`,
    `What does "${word}" mean to you personally? Show, don't tell.`,
  ];
  const [promptIdx, setPromptIdx] = useState(0);
  const handleSave = () => {
    if (!input.trim()) return;
    setSaved(s => [...s, input.trim()]);
    setInput("");
    setPromptIdx(i => (i + 1) % prompts.length);
  };

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Today's word</p>
        <p className="text-2xl font-bold">{word}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1 font-medium">Prompt:</p>
        <p className="text-sm italic text-muted-foreground">{prompts[promptIdx]}</p>
      </div>
      <div className="flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Write your sentence..."
          className="rounded-xl" onKeyDown={e => e.key === "Enter" && handleSave()} data-testid="premium-sentence-input" />
        <Button onClick={handleSave} disabled={!input.trim()} className="rounded-xl bg-primary hover:bg-primary/90 font-bold flex-shrink-0" data-testid="premium-save-sentence">Save</Button>
      </div>
      {saved.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your sentences this session</p>
          {saved.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border">"{s}"</motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Progress Report ──────────────────────────────────────
function ProgressReport() {
  const stats = [
    { label: "Words This Month", value: 24, max: 30, color: "bg-primary" },
    { label: "Streak Days", value: 18, max: 30, color: "bg-accent" },
    { label: "Games Played", value: 12, max: 20, color: "bg-green-500" },
    { label: "Journal Entries", value: 8, max: 10, color: "bg-yellow-500" },
  ];
  const topWords = ["Ephemeral", "Resilience", "Luminous", "Serendipity", "Equanimity"];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {stats.map(s => (
          <div key={s.label} className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold">{s.label}</span>
              <span className="text-muted-foreground">{s.value}/{s.max}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(s.value / s.max) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }} className={`h-full ${s.color} rounded-full`} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Top Words This Month</p>
        <div className="flex flex-wrap gap-2">
          {topWords.map(w => (
            <span key={w} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">{w}</span>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-center">
        <p className="text-xs text-muted-foreground mb-1">Archetype alignment this month</p>
        <p className="text-lg font-bold text-primary">The Visionary — 87% match</p>
      </div>
    </div>
  );
}

// ── Premium Active Dashboard ─────────────────────────────
const sessions = [
  { id: "quiz" as SessionType, icon: Brain, label: "Vocab Quiz", desc: "Test yourself on 5 words with instant feedback and scoring." },
  { id: "builder" as SessionType, icon: Zap, label: "Sentence Builder", desc: "Unlimited creative practice with rotating prompts." },
  { id: "report" as SessionType, icon: BarChart3, label: "Monthly Report", desc: "Growth dashboard — streaks, top words, archetype alignment." },
];

const allPremiumFeatures = [
  { icon: Gamepad2, label: "All 6 word games — unlimited daily plays" },
  { icon: BookOpen, label: "Unlimited word journal entries" },
  { icon: Download, label: "Export your journal to PDF" },
  { icon: Zap, label: "Unlimited sentence builder sessions" },
  { icon: BarChart3, label: "Advanced monthly vocabulary reports" },
  { icon: Brain, label: "Full archetype deep-dive profile" },
  { icon: Sparkles, label: "Word etymology & origins" },
  { icon: Mic, label: "Pronunciation audio guides" },
  { icon: Globe, label: "All 19 languages — unlimited switching" },
  { icon: Trophy, label: "Streak milestone badges & leaderboard" },
  { icon: Users, label: "Cross-language friend challenges" },
  { icon: Star, label: "Custom vocabulary lists" },
  { icon: TrendingUp, label: "Priority word recommendations" },
  { icon: Crown, label: "Early access to new features" },
  { icon: FileText, label: "No ads — ever" },
];

function PremiumDashboard({ dailyWord }: { dailyWord: string }) {
  const [activeSession, setActiveSession] = useState<SessionType>(null);
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="container mx-auto max-w-4xl space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.5)]">
            <Crown className="h-12 w-12 text-white" />
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30 font-bold tracking-widest text-xs uppercase">Premium Active</Badge>
          <h1 className="text-5xl font-bold tracking-tighter">
            You're in the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">inner circle.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Every premium feature is unlocked. Choose an interactive session below.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {sessions.map((s, i) => (
            <motion.button key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => setActiveSession(activeSession === s.id ? null : s.id)}
              className={`p-6 rounded-2xl border-2 text-left transition-all group ${activeSession === s.id ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.2)]" : "border-border hover:border-primary/50 bg-card"}`}
              data-testid={`session-${s.id}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${activeSession === s.id ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary/20"}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold mb-1">{s.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs font-bold text-primary">
                {activeSession === s.id ? "Active" : "Start"} <ChevronRight className="h-3 w-3" />
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeSession && (
            <motion.div key={activeSession} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="p-8 rounded-3xl border-2 border-primary/30 bg-card shadow-[0_0_40px_rgba(139,92,246,0.1)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{sessions.find(s => s.id === activeSession)?.label}</h2>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold">Premium</Badge>
              </div>
              {activeSession === "quiz" && <VocabQuiz />}
              {activeSession === "builder" && <SentenceBuilder word={dailyWord} />}
              {activeSession === "report" && <ProgressReport />}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-8 rounded-3xl border border-border bg-card">
          <h3 className="font-bold text-lg mb-5">Everything unlocked</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allPremiumFeatures.map(f => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Comparison row data ──────────────────────────────────
const comparison = [
  { feature: "Daily word delivery", free: "1 word/day", premium: "1 word/day + etymology & audio" },
  { feature: "Word games", free: "1 game/day", premium: "All 6 games — unlimited" },
  { feature: "Word journal", free: "5 entries max", premium: "Unlimited + PDF export" },
  { feature: "Sentence builder", free: "3 uses/day", premium: "Unlimited sessions" },
  { feature: "Streak tracking", free: "Basic streak only", premium: "Badges, milestones & leaderboard" },
  { feature: "Birth archetype", free: "Basic profile", premium: "Full deep-dive report" },
  { feature: "Vocabulary reports", free: "None", premium: "Monthly growth report" },
  { feature: "Languages", free: "English only", premium: "All 19 languages" },
  { feature: "Friend challenges", free: "Not available", premium: "Cross-language word duels" },
  { feature: "Custom word lists", free: "Not available", premium: "Build your own lists" },
  { feature: "Ads", free: "Shown", premium: "No ads, ever" },
  { feature: "New features", free: "Standard access", premium: "Early access" },
];

// ── Testimonials ─────────────────────────────────────────
const testimonials = [
  { name: "Ayanda M.", location: "Johannesburg", text: "Eight dollars. That's it. I've been using it every single day for 3 months. The word journal alone is worth ten times that.", stars: 5 },
  { name: "Priya K.", location: "Cape Town", text: "I went from dreading English essays to actually enjoying them. The archetype report showed me exactly how I learn best.", stars: 5 },
  { name: "Luca T.", location: "London", text: "The games are actually addictive. Spelling Bee and the Lexigen Game have me coming back every day. Premium was a no-brainer.", stars: 5 },
  { name: "Fatima R.", location: "Dubai", text: "Learning in Arabic and switching to English for practise — seamlessly. That alone makes the $8 worth every cent.", stars: 5 },
];

// ── Main Export ──────────────────────────────────────────
export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState("lifetime");
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();
  const langCode = LANGUAGE_CODES[language] || "en";

  const { data: premiumStatus } = useGetPremiumStatus();
  const upgradeMutation = useUpgradeToPremium();
  const { data: dailyWord } = useGetDailyWord(
    { language: langCode },
    { query: { queryKey: ["daily-word", langCode], enabled: isUpgraded || !!premiumStatus?.isPremium } }
  );

  const handleUpgrade = () => {
    upgradeMutation.mutate(
      { data: { plan: selectedPlan, paymentToken: "demo_token" } },
      {
        onSuccess: () => {
          setIsUpgraded(true);
          queryClient.invalidateQueries({ queryKey: getGetPremiumStatusQueryKey() });
          toast({ title: "Welcome to Lexigen Premium!", description: "Every feature is now unlocked." });
        },
        onError: () => toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" }),
      }
    );
  };

  const isPremium = premiumStatus?.isPremium || isUpgraded;
  if (isPremium) return <PremiumDashboard dailyWord={dailyWord?.word?.word ?? "Resilience"} />;

  const visibleComparison = showAll ? comparison : comparison.slice(0, 6);

  return (
    <div className="min-h-screen">

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/25 via-background to-background -z-10" />
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Introductory Offer — $8 once-off
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              STOP BEING<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AVERAGE WITH WORDS.</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Free gives you a taste. Premium gives you everything — for the price of a coffee. One payment. No subscription. No expiry. Unlimited, forever.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={handleUpgrade} disabled={upgradeMutation.isPending}
                className="rounded-full bg-primary hover:bg-primary/90 font-bold px-10 h-14 text-lg shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                data-testid="button-upgrade-hero">
                {upgradeMutation.isPending ? "Processing..." : "Get Premium — $8 Forever"}
              </Button>
              <a href="#compare">
                <Button size="lg" variant="outline" className="rounded-full border-border hover:border-primary/50 font-bold px-8 h-14">
                  See What You're Missing <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">One-time payment · No recurring fees · Built in South Africa</p>
          </motion.div>
        </div>
      </section>

      {/* ── What's locked on Free ───────────────────────── */}
      <section className="py-16 px-4 bg-card/60">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">You're on the free plan</p>
            <h2 className="text-4xl font-bold tracking-tighter">Here's what you can't do — yet.</h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
              Every one of these features is waiting for you on the other side of a single $8 payment.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Gamepad2, label: "All 6 word games, unlimited", limit: "Free: 1 game/day" },
              { icon: BookOpen, label: "Unlimited word journal", limit: "Free: 5 entries only" },
              { icon: Download, label: "Export journal to PDF", limit: "Free: not available" },
              { icon: Zap, label: "Unlimited sentence builder", limit: "Free: 3 uses/day" },
              { icon: Globe, label: "All 19 languages", limit: "Free: English only" },
              { icon: Brain, label: "Full archetype deep-dive", limit: "Free: basic profile" },
              { icon: BarChart3, label: "Monthly vocabulary report", limit: "Free: not available" },
              { icon: Trophy, label: "Badge milestones & leaderboard", limit: "Free: basic streak" },
              { icon: Users, label: "Cross-language friend challenges", limit: "Free: not available" },
              { icon: Sparkles, label: "Word etymology & origins", limit: "Free: not available" },
              { icon: Mic, label: "Pronunciation audio guides", limit: "Free: not available" },
              { icon: Star, label: "Custom vocabulary lists", limit: "Free: not available" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <Lock className="h-4 w-4 text-muted-foreground/40" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-bold text-sm mb-1">{item.label}</p>
                <p className="text-xs text-destructive/70 font-medium">{item.limit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ─────────────────────────────── */}
      <section id="compare" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter">Free vs Premium</h2>
            <p className="text-muted-foreground text-lg mt-2">Side by side. You decide.</p>
          </motion.div>

          <div className="rounded-3xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-card border-b border-border">
              <div className="p-5 text-sm font-bold text-muted-foreground uppercase tracking-wider">Feature</div>
              <div className="p-5 text-sm font-bold text-center border-l border-border">Free</div>
              <div className="p-5 text-sm font-bold text-center border-l border-border bg-primary/5">
                <span className="text-primary">Premium</span>
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold">$8</span>
              </div>
            </div>
            {visibleComparison.map((row, i) => (
              <motion.div key={row.feature} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className={`grid grid-cols-3 border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-card/40"}`}>
                <div className="p-4 text-sm font-medium">{row.feature}</div>
                <div className="p-4 text-sm text-center border-l border-border text-muted-foreground">{row.free}</div>
                <div className="p-4 text-sm text-center border-l border-border bg-primary/5 text-primary font-semibold">{row.premium}</div>
              </motion.div>
            ))}
          </div>

          {!showAll && (
            <div className="text-center mt-4">
              <button onClick={() => setShowAll(true)} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1 mx-auto">
                Show all {comparison.length} comparisons <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Feature Highlights ──────────────────────────── */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tighter">What premium actually feels like</h2>
            <p className="text-muted-foreground text-lg mt-2 max-w-xl mx-auto">Three interactive sessions that come with every premium account.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {sessions.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} className="p-7 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tighter">Real learners. Real results.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-7 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 text-foreground">"{t.text}"</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plan Selector + CTA ──────────────────────────── */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-4xl font-bold tracking-tighter mb-2">Choose your plan</h2>
            <p className="text-muted-foreground">Free is always free. Upgrade when you're ready.</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "monthly", label: "Monthly", price: "Free", sub: "limited use" },
              { id: "annual", label: "Annually", price: "Free", sub: "limited use" },
              { id: "lifetime", label: "Once-off", price: "$8", sub: "unlimited · forever", badge: "Best Value" },
            ].map(plan => (
              <button key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-2xl border-2 text-center transition-all ${selectedPlan === plan.id ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]" : "border-border hover:border-primary/40 bg-card"}`}
                data-testid={`button-plan-${plan.id}`}>
                {plan.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
                <div className="text-xs font-semibold text-muted-foreground mb-1">{plan.label}</div>
                <div className={`text-xl font-bold ${selectedPlan === plan.id ? "text-primary" : ""}`}>{plan.price}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{plan.sub}</div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <Button size="lg" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              onClick={handleUpgrade} disabled={upgradeMutation.isPending || selectedPlan !== "lifetime"}
              data-testid="button-upgrade-premium">
              {selectedPlan === "lifetime"
                ? upgradeMutation.isPending ? "Processing..." : "Unlock Everything — $8 Forever"
                : "Select 'Once-off' to upgrade"}
            </Button>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Flame, label: "One payment" },
                { icon: Crown, label: "No expiry" },
                { icon: Globe, label: "Global access" },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-card">
                  <b.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground">No hidden fees. No subscriptions. Built in South Africa, for the world.</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA Banner ─────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-12 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/8 to-accent/8 text-center space-y-6 shadow-[0_0_80px_rgba(139,92,246,0.12)]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Crown className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter">One coffee. A lifetime of better words.</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              $8, once. No renewals, no regrets. Thousands of learners across 5 continents already made the switch. Your vocabulary is waiting.
            </p>
            <Button size="lg" onClick={handleUpgrade} disabled={upgradeMutation.isPending}
              className="rounded-full bg-primary hover:bg-primary/90 font-bold px-12 h-14 text-lg shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              data-testid="button-upgrade-final">
              {upgradeMutation.isPending ? "Processing..." : "Get Premium — $8"}
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
