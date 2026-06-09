import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetPremiumStatus, useUpgradeToPremium, getGetPremiumStatusQueryKey, useGetDailyWord } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Check, Zap, Lock, TrendingUp, Gamepad2, Palette, FileText, Crown, Brain, ChevronRight, RefreshCw, BarChart3 } from "lucide-react";

const LANGUAGE_CODES: Record<string, string> = {
  English: "en", Spanish: "es", Portuguese: "pt", French: "fr", German: "de",
  Dutch: "nl", Italian: "it", Arabic: "ar", Afrikaans: "af", Zulu: "zu",
  Xhosa: "xh", Farsi: "fa", Russian: "ru", "Bahasa Malay": "ms",
  Vietnamese: "vi", Tagalog: "tl", Japanese: "ja", Cantonese: "yue", "Chinese (Mandarin)": "zh"
};

const freeFeatures = [
  "Daily word delivery",
  "Birth archetype profile",
  "Streak tracking",
  "Word journal (5 entries)",
];

const premiumFeatures = [
  { icon: Zap, label: "Unlimited sentence builder" },
  { icon: TrendingUp, label: "Advanced monthly report" },
  { icon: Lock, label: "No ads, ever" },
  { icon: Palette, label: "Exclusive premium themes" },
  { icon: Gamepad2, label: "Unlimited word games access" },
  { icon: Crown, label: "Priority word recommendations" },
  { icon: FileText, label: "Extended word journal" },
  { icon: FileText, label: "Export journal to PDF" },
];

const plans = [
  { id: "monthly", label: "Monthly", price: "R49", period: "/month", highlight: false },
  { id: "annual", label: "Annual", price: "R399", period: "/year", badge: "Save 32%", highlight: true },
  { id: "lifetime", label: "Lifetime", price: "R999", period: "once", highlight: false },
];

// ── Interactive Premium Session Types ───────────────────
type SessionType = "quiz" | "builder" | "report" | null;

const QUIZ_QUESTIONS = [
  {
    word: "Ephemeral",
    options: ["Lasting forever", "Short-lived and transient", "Bright and glowing", "Deeply meaningful"],
    answer: 1,
  },
  {
    word: "Perspicacious",
    options: ["Overly cautious", "Having sharp insight", "Physically strong", "Emotionally detached"],
    answer: 1,
  },
  {
    word: "Equanimity",
    options: ["Great anger", "Intense joy", "Mental calmness", "Physical strength"],
    answer: 2,
  },
  {
    word: "Confluence",
    options: ["A type of river fish", "A state of confusion", "A coming together", "A formal agreement"],
    answer: 2,
  },
  {
    word: "Audacious",
    options: ["Quietly reserved", "Daring and bold", "Deeply empathetic", "Carefully planned"],
    answer: 1,
  },
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
      if (idx + 1 >= QUIZ_QUESTIONS.length) {
        setDone(true);
      } else {
        setIdx(i => i + 1);
        setSelected(null);
      }
    }, 900);
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-6">
        <div className="text-5xl font-bold text-primary">{score}/{QUIZ_QUESTIONS.length}</div>
        <p className="font-bold text-lg">
          {score === 5 ? "Perfect score! You're a word master." : score >= 3 ? "Strong vocab skills." : "Keep practising — you're growing."}
        </p>
        <Button onClick={() => { setIdx(0); setScore(0); setSelected(null); setDone(false); }} variant="outline" size="sm" className="rounded-full mt-2">
          <RefreshCw className="h-3.5 w-3.5 mr-2" /> Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Question {idx + 1} of {QUIZ_QUESTIONS.length}</span>
        <span className="text-xs font-bold text-primary">{score} correct</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${((idx) / QUIZ_QUESTIONS.length) * 100}%` }}
          className="h-full bg-primary rounded-full"
        />
      </div>
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">What does this word mean?</p>
        <p className="text-4xl font-bold tracking-tight font-mono" data-testid="quiz-word">{q.word}</p>
      </div>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
            className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
              selected === null
                ? "border-border hover:border-primary/50 hover:bg-primary/5"
                : i === q.answer
                  ? "border-green-500 bg-green-500/10 text-green-600"
                  : i === selected
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border opacity-50"
            }`}
            data-testid={`quiz-option-${i}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

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
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write your sentence..."
          className="rounded-xl"
          onKeyDown={e => e.key === "Enter" && handleSave()}
          data-testid="premium-sentence-input"
        />
        <Button onClick={handleSave} disabled={!input.trim()} className="rounded-xl bg-primary hover:bg-primary/90 font-bold flex-shrink-0" data-testid="premium-save-sentence">
          Save
        </Button>
      </div>
      {saved.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your sentences this session</p>
          {saved.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border">
              "{s}"
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

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
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(s.value / s.max) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full ${s.color} rounded-full`}
              />
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

// ── Main Component ───────────────────────────────────────────
export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [activeSession, setActiveSession] = useState<SessionType>(null);
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
        onError: () => {
          toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
        },
      }
    );
  };

  const isPremium = premiumStatus?.isPremium || isUpgraded;

  const sessions = [
    { id: "quiz" as SessionType, icon: Brain, label: "Vocab Quiz", desc: "Test yourself on words you've encountered. 5 questions, instant feedback." },
    { id: "builder" as SessionType, icon: Zap, label: "Sentence Builder", desc: "Unlimited creative practice with today's word and rotating prompts." },
    { id: "report" as SessionType, icon: BarChart3, label: "Monthly Report", desc: "Your personal growth dashboard — streaks, top words, archetype alignment." },
  ];

  if (isPremium) {
    return (
      <div className="min-h-screen px-4 py-16">
        <div className="container mx-auto max-w-4xl space-y-10">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.5)]">
                <Crown className="h-12 w-12 text-white" />
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 font-bold tracking-widest text-xs uppercase">
              Premium Active
            </Badge>
            <h1 className="text-5xl font-bold tracking-tighter">
              You're in the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">inner circle.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Every premium feature is unlocked. Choose an interactive session below to get started.
            </p>
          </motion.div>

          {/* Interactive Session Selector */}
          <div className="grid md:grid-cols-3 gap-4">
            {sessions.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveSession(activeSession === s.id ? null : s.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                  activeSession === s.id
                    ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
                data-testid={`session-${s.id}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  activeSession === s.id ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                }`}>
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

          {/* Active Session Panel */}
          <AnimatePresence mode="wait">
            {activeSession && (
              <motion.div
                key={activeSession}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 rounded-3xl border-2 border-primary/30 bg-card shadow-[0_0_40px_rgba(139,92,246,0.1)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">
                    {sessions.find(s => s.id === activeSession)?.label}
                  </h2>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold">Premium</Badge>
                </div>
                {activeSession === "quiz" && <VocabQuiz />}
                {activeSession === "builder" && <SentenceBuilder word={dailyWord?.word?.word ?? "Resilience"} />}
                {activeSession === "report" && <ProgressReport />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* All Premium Features List */}
          <div className="p-8 rounded-3xl border border-border bg-card">
            <h3 className="font-bold text-lg mb-5">Everything that's unlocked</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {premiumFeatures.map(f => (
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

  // ── Upgrade / Pricing Page ────────────────────────────────────
  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-accent/20 text-accent border-accent/30 font-bold tracking-widest text-xs uppercase mb-4">Premium</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              UNLOCK YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">FULL POTENTIAL</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
              Free gets you started. Premium gets you there — faster, deeper, and with a lot more satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl border border-border bg-card">
              <h3 className="text-2xl font-bold mb-1">Free</h3>
              <p className="text-4xl font-bold mb-6">R0 <span className="text-muted-foreground text-base font-normal">/ forever</span></p>
              <ul className="space-y-3">
                {freeFeatures.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)]">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground font-bold text-xs">Recommended</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">Premium</h3>
              <p className="text-4xl font-bold mb-6">
                <span className="text-primary">{plans.find(p => p.id === selectedPlan)?.price}</span>
                <span className="text-muted-foreground text-base font-normal ml-1">{plans.find(p => p.id === selectedPlan)?.period}</span>
              </p>
              <ul className="space-y-3">
                {premiumFeatures.map(f => (
                  <li key={f.label} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-xl space-y-6">
          <h2 className="text-2xl font-bold text-center">Choose your plan</h2>
          <div className="grid grid-cols-3 gap-3">
            {plans.map(plan => (
              <button key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-2xl border-2 text-center transition-all ${selectedPlan === plan.id ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]" : "border-border hover:border-primary/40"}`}
                data-testid={`button-plan-${plan.id}`}
              >
                {plan.badge && <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{plan.badge}</span>}
                <div className="text-xs font-semibold text-muted-foreground mb-1">{plan.label}</div>
                <div className="text-lg font-bold">{plan.price}</div>
                <div className="text-xs text-muted-foreground">{plan.period}</div>
              </button>
            ))}
          </div>
          <Button size="lg" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)]" onClick={handleUpgrade} disabled={upgradeMutation.isPending} data-testid="button-upgrade-premium">
            {upgradeMutation.isPending ? "Processing..." : "Upgrade Now"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">Cancel anytime. No hidden fees. Built in South Africa, for the world.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tighter text-center mb-12">What premium actually feels like</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {sessions.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-7 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all group">
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
    </div>
  );
}
