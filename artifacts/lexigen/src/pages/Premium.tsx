import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  useGetPremiumStatus,
  getGetPremiumStatusQueryKey,
  useGetDailyWord,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useAuth } from "@/context/AuthContext";
import {
  Check, Zap, Lock, TrendingUp, Gamepad2, FileText,
  Crown, Brain, ChevronRight, RefreshCw, BarChart3,
  BookOpen, Sparkles, Star, Globe, Trophy, Mic,
  Download, Flame, Users, ChevronDown, X, CreditCard,
  CheckCircle2, Loader2,
} from "lucide-react";

// ── PayPal window type ───────────────────────────────────
declare global {
  interface Window {
    paypal?: {
      Buttons: (opts: {
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: unknown) => void;
        onCancel: () => void;
        style?: {
          layout?: string;
          color?: string;
          shape?: string;
          label?: string;
          height?: number;
        };
      }) => { render: (el: HTMLElement) => Promise<void>; close: () => void };
    };
  }
}

const LANGUAGE_CODES: Record<string, string> = {
  English: "en", Spanish: "es", Portuguese: "pt", French: "fr", German: "de",
  Dutch: "nl", Italian: "it", Arabic: "ar", Afrikaans: "af", Zulu: "zu",
  Xhosa: "xh", Farsi: "fa", Russian: "ru", "Bahasa Malay": "ms",
  Vietnamese: "vi", Tagalog: "tl", Japanese: "ja", Cantonese: "yue",
  "Chinese (Mandarin)": "zh",
};


// ── Payment Modal ────────────────────────────────────────
type ModalStep = "confirm" | "paypal" | "success" | "error";

function PaymentModal({
  onClose,
  onSuccess,
  userEmail,
  userName,
}: {
  onClose: () => void;
  onSuccess: () => void;
  userEmail: string;
  userName: string;
}) {
  const [step, setStep] = useState<ModalStep>("confirm");
  const [errorMsg, setErrorMsg] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkLoading, setSdkLoading] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const loadPayPalSdk = useCallback(async () => {
    setSdkLoading(true);
    try {
      const res = await fetch("/api/premium/paypal-config");
      const { clientId } = (await res.json()) as { clientId: string; mode: string };
      if (!clientId) throw new Error("PayPal client ID not configured");
      const existing = document.getElementById("paypal-sdk");
      if (existing) existing.remove();
      delete window.paypal;
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&components=buttons`;
      script.async = true;
      script.onload = () => { setSdkReady(true); setSdkLoading(false); };
      script.onerror = () => {
        setSdkLoading(false);
        setErrorMsg("Failed to load PayPal. Please check your connection.");
        setStep("error");
      };
      document.head.appendChild(script);
    } catch {
      setSdkLoading(false);
      setErrorMsg("Could not reach PayPal. Please try again.");
      setStep("error");
    }
  }, []);

  useEffect(() => {
    if (!sdkReady || step !== "paypal" || !paypalContainerRef.current || !window.paypal) return;
    paypalContainerRef.current.innerHTML = "";
    window.paypal
      .Buttons({
        style: { layout: "vertical", color: "gold", shape: "pill", label: "pay", height: 48 },
        createOrder: async () => {
          const res = await fetch("/api/premium/create-order", { method: "POST" });
          if (!res.ok) throw new Error("Failed to create order");
          const { orderID } = (await res.json()) as { orderID: string };
          return orderID;
        },
        onApprove: async (data) => {
          const res = await fetch("/api/premium/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID, userEmail }),
          });
          const result = (await res.json()) as { success?: boolean; error?: string };
          if (result.success) {
            setStep("success");
          } else {
            setErrorMsg(result.error ?? "Payment capture failed.");
            setStep("error");
          }
        },
        onError: () => {
          setErrorMsg("Something went wrong with PayPal. Please try again.");
          setStep("error");
        },
        onCancel: () => setStep("confirm"),
      })
      .render(paypalContainerRef.current)
      .catch(() => {
        setErrorMsg("PayPal buttons failed to render.");
        setStep("error");
      });
  }, [sdkReady, step, userEmail]);

  const handleContinue = async () => {
    setStep("paypal");
    if (!sdkReady) await loadPayPalSdk();
  };

  const handleSuccess = () => {
    onSuccess();
    onClose();
    toast({ title: "🎉 Welcome to Lexigenz Premium!", description: "Every feature is now unlocked forever." });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div className="flex min-h-full items-start justify-center p-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-background border border-border rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-sm">Lexigenz Premium</p>
              <p className="text-xs text-muted-foreground">$8.00 - once-off, forever</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <AnimatePresence mode="wait">

            {/* ── Step 1: Confirm ── */}
            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold mb-1">Ready to upgrade?</h2>
                  <p className="text-sm text-muted-foreground">
                    Upgrading account for <span className="font-semibold text-foreground">{userName}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{userEmail}</p>
                </div>
                <div className="space-y-2">
                  {["All 6 word games - unlimited", "Unlimited word journal + PDF export", "English + 1 language (additional languages $2)", "Full archetype deep-dive", "Monthly reports & badges"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-bold text-sm">Amount due</span>
                  </div>
                  <span className="font-bold text-lg text-primary">$8.00 USD</span>
                </div>
                <Button
                  size="lg"
                  className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold"
                  onClick={handleContinue}
                  disabled={sdkLoading}
                  data-testid="payment-continue"
                >
                  {sdkLoading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading PayPal…</>
                  ) : (
                    <>Pay with PayPal <ChevronRight className="h-4 w-4 ml-1" /></>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Secured by PayPal · No card details stored by Lexigenz
                </p>
              </motion.div>
            )}

            {/* ── Step 2: PayPal buttons ── */}
            {step === "paypal" && (
              <motion.div key="paypal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold mb-1">Complete payment</h2>
                  <p className="text-sm text-muted-foreground">
                    Pay with your PayPal account or a credit/debit card · $8.00 USD
                  </p>
                </div>
                <div ref={paypalContainerRef} className="min-h-[56px]">
                  {!sdkReady && (
                    <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" /> Loading PayPal…
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setStep("confirm")}
                  className="text-xs text-muted-foreground hover:text-foreground underline w-full text-center"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {/* ── Step 3: Success ── */}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-5 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-9 w-9 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Payment confirmed!</h2>
                  <p className="text-muted-foreground text-sm">
                    Welcome to premium, <span className="font-semibold text-foreground">{userName}</span>. Every feature is now unlocked - forever.
                  </p>
                </div>
                <div className="space-y-2 text-left">
                  {["All 6 word games - unlimited", "Unlimited word journal + PDF export", "English + 1 language (additional languages $2)", "Full archetype deep-dive", "Monthly reports & badges"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold"
                  onClick={handleSuccess}
                  data-testid="payment-success-btn"
                >
                  Go to my Premium Dashboard
                </Button>
              </motion.div>
            )}

            {/* ── Step 4: Error ── */}
            {step === "error" && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                  <X className="h-9 w-9 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">Payment failed</h2>
                  <p className="text-muted-foreground text-sm">{errorMsg || "Something went wrong. Please try again."}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-2xl font-bold"
                  onClick={() => { setStep("confirm"); setErrorMsg(""); }}
                >
                  Try Again
                </Button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

// ── Interactive Sessions ─────────────────────────────────
type SessionType = "quiz" | "builder" | "report" | null;

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
      if (idx + 1 >= QUIZ_QUESTIONS.length) setDone(true);
      else { setIdx(n => n + 1); setSelected(null); }
    }, 900);
  };

  if (done) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-6">
      <div className="text-5xl font-bold text-primary">{score}/{QUIZ_QUESTIONS.length}</div>
      <p className="font-bold text-lg">{score === 5 ? "Perfect score!" : score >= 3 ? "Strong vocab skills." : "Keep practising - you're growing."}</p>
      <Button onClick={() => { setIdx(0); setScore(0); setSelected(null); setDone(false); }} variant="outline" size="sm" className="rounded-full mt-2">
        <RefreshCw className="h-3.5 w-3.5 mr-2" /> Try Again
      </Button>
    </motion.div>
  );

  return (
    <div className="space-y-5">
      <div className="flex justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-muted-foreground">Question {idx + 1}/{QUIZ_QUESTIONS.length}</span>
        <span className="font-bold text-primary">{score} correct</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div animate={{ width: `${(idx / QUIZ_QUESTIONS.length) * 100}%` }} className="h-full bg-primary rounded-full" />
      </div>
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">What does this mean?</p>
        <p className="text-4xl font-bold font-mono">{q.word}</p>
      </div>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
            className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
              selected === null ? "border-border hover:border-primary/50 hover:bg-primary/5"
                : i === q.answer ? "border-green-500 bg-green-500/10 text-green-600"
                : i === selected ? "border-destructive bg-destructive/10 text-destructive"
                : "border-border opacity-50"}`}
          >{opt}</button>
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
    `Describe someone you admire using "${word}".`,
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
      <p className="text-sm italic text-muted-foreground">{prompts[promptIdx]}</p>
      <div className="flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Write your sentence…"
          className="rounded-xl" onKeyDown={e => e.key === "Enter" && handleSave()} />
        <Button onClick={handleSave} disabled={!input.trim()} className="rounded-xl bg-primary hover:bg-primary/90 font-bold flex-shrink-0">Save</Button>
      </div>
      {saved.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border">"{s}"</motion.div>
      ))}
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
      <div className="flex flex-wrap gap-2">
        {["Ephemeral", "Resilience", "Luminous", "Serendipity", "Equanimity"].map(w => (
          <span key={w} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">{w}</span>
        ))}
      </div>
      <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-center">
        <p className="text-xs text-muted-foreground mb-1">Archetype this month</p>
        <p className="text-lg font-bold text-primary">The Visionary - 87% match</p>
      </div>
    </div>
  );
}

// ── Premium Dashboard (after upgrade) ───────────────────
const sessions = [
  { id: "quiz" as SessionType, icon: Brain, label: "Vocab Quiz", desc: "Test 5 words with instant feedback." },
  { id: "builder" as SessionType, icon: Zap, label: "Sentence Builder", desc: "Unlimited creative practice with rotating prompts." },
  { id: "report" as SessionType, icon: BarChart3, label: "Monthly Report", desc: "Growth dashboard - streaks, top words, archetype." },
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
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Every premium feature unlocked. Choose a session below.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {sessions.map((s, i) => (
            <motion.button key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => setActiveSession(activeSession === s.id ? null : s.id)}
              className={`p-6 rounded-2xl border-2 text-left transition-all group ${activeSession === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${activeSession === s.id ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold mb-1">{s.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeSession && (
            <motion.div key={activeSession} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="p-8 rounded-3xl border-2 border-primary/30 bg-card">
              <h2 className="text-xl font-bold mb-6">{sessions.find(s => s.id === activeSession)?.label}</h2>
              {activeSession === "quiz" && <VocabQuiz />}
              {activeSession === "builder" && <SentenceBuilder word={dailyWord} />}
              {activeSession === "report" && <ProgressReport />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Comparison & marketing data ──────────────────────────
const comparison = [
  { feature: "Daily word delivery", free: "1 word/day", premium: "1 word/day + etymology & audio" },
  { feature: "Word games", free: "1 game/day", premium: "All 6 games - unlimited" },
  { feature: "Word journal", free: "5 entries max", premium: "Unlimited + PDF export" },
  { feature: "Sentence builder", free: "3 uses/day", premium: "Unlimited sessions" },
  { feature: "Streak tracking", free: "Basic streak only", premium: "Badges, milestones & leaderboard" },
  { feature: "Birth archetype", free: "Basic profile", premium: "Full deep-dive report" },
  { feature: "Vocabulary reports", free: "None", premium: "Monthly growth report" },
  { feature: "Languages", free: "English only", premium: "English + 1 language (more for $2)" },
  { feature: "Friend challenges", free: "Not available", premium: "Cross-language word duels" },
  { feature: "Custom word lists", free: "Not available", premium: "Build your own lists" },
  { feature: "Ads", free: "Shown", premium: "No ads, ever" },
  { feature: "New features", free: "Standard access", premium: "Early access" },
];

const testimonials = [
  { name: "Ayanda M.", location: "Johannesburg", text: "Eight dollars. That's it. I've been using it every single day for 3 months. The word journal alone is worth ten times that.", stars: 5 },
  { name: "Priya K.", location: "Cape Town", text: "I went from dreading English essays to actually enjoying them. The archetype report showed me exactly how I learn best.", stars: 5 },
  { name: "Luca T.", location: "London", text: "The games are actually addictive. Spelling Bee and the Lexigenz Game have me coming back every day. Premium was a no-brainer.", stars: 5 },
  { name: "Fatima R.", location: "Dubai", text: "Learning in Arabic and switching to English for practise - seamlessly. That alone makes the $8 worth every cent.", stars: 5 },
];

// ── Main Export ──────────────────────────────────────────
export default function Premium() {
  const [showModal, setShowModal] = useState(false);
  const [isPremiumLocal, setIsPremiumLocal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("lifetime");
  const queryClient = useQueryClient();
  const { language } = useLanguageStore();
  const { user, setPremium } = useAuth();
  const langCode = LANGUAGE_CODES[language] || "en";

  const { data: premiumStatus } = useGetPremiumStatus();
  const { data: dailyWord } = useGetDailyWord(
    { language: langCode },
    { query: { queryKey: ["daily-word", langCode], enabled: isPremiumLocal || !!premiumStatus?.isPremium } }
  );

  const handleUpgradeSuccess = () => {
    setPremium();
    setIsPremiumLocal(true);
    queryClient.invalidateQueries({ queryKey: getGetPremiumStatusQueryKey() });
  };

  const isPremium = user?.plan === "premium" || premiumStatus?.isPremium || isPremiumLocal;
  if (isPremium) return <PremiumDashboard dailyWord={dailyWord?.word?.word ?? "Resilience"} />;

  const visibleComparison = showAll ? comparison : comparison.slice(0, 6);

  return (
    <div className="min-h-screen">

      {/* Payment Modal */}
      <AnimatePresence>
        {showModal && (
          <PaymentModal
            onClose={() => setShowModal(false)}
            onSuccess={handleUpgradeSuccess}
            userEmail={user?.email ?? ""}
            userName={user?.name ?? ""}
          />
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/25 via-background to-background -z-10" />
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Introductory Offer - $8 once-off
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              STOP BEING<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AVERAGE WITH WORDS.</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Free gives you a taste. Premium gives you everything - for the price of a coffee. One payment. No subscription. No expiry. Unlimited, forever.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => setShowModal(true)}
                className="rounded-full bg-primary hover:bg-primary/90 font-bold px-10 h-14 text-lg shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                data-testid="button-upgrade-hero">
                Get Premium - $8 Forever
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

      {/* ── What's locked ── */}
      <section className="py-16 px-4 bg-card/60">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">You're on the free plan</p>
            <h2 className="text-4xl font-bold tracking-tighter">Here's what you can't do - yet.</h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">Every feature is waiting on the other side of a single $8 payment.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Gamepad2, label: "All 6 word games, unlimited", limit: "Free: 1 game/day" },
              { icon: BookOpen, label: "Unlimited word journal", limit: "Free: 5 entries only" },
              { icon: Download, label: "Export journal to PDF", limit: "Free: not available" },
              { icon: Zap, label: "Unlimited sentence builder", limit: "Free: 3 uses/day" },
              { icon: Globe, label: "English + 1 language", limit: "More languages: $2 each" },
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
                <div className="absolute top-3 right-3"><Lock className="h-4 w-4 text-muted-foreground/40" /></div>
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

      {/* ── Languages Section ── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Languages</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              One platform.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">19 languages.</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
              Switch your learning language anytime from the globe icon in the navigation. Your word, your archetype, your language.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 text-xs font-bold px-4 py-1.5 rounded-full">
              <Lock className="h-3 w-3" /> Free plan: English only
            </div>
          </motion.div>

          {/* Language pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2.5 mb-4">
            {[
              { name: "English", sa: false },
              { name: "Spanish", sa: false },
              { name: "Portuguese", sa: false },
              { name: "French", sa: false },
              { name: "German", sa: false },
              { name: "Dutch", sa: false },
              { name: "Italian", sa: false },
              { name: "Arabic", sa: false },
              { name: "Afrikaans", sa: true },
              { name: "Zulu", sa: true },
              { name: "Xhosa", sa: true },
              { name: "Farsi", sa: false },
              { name: "Russian", sa: false },
              { name: "Bahasa Malay", sa: false },
              { name: "Vietnamese", sa: false },
              { name: "Tagalog", sa: false },
              { name: "Japanese", sa: false },
              { name: "Cantonese", sa: false },
              { name: "Chinese (Mandarin)", sa: false },
            ].map((lang, i) => (
              <motion.span key={lang.name}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  lang.sa
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-card border-border text-foreground hover:border-primary/30"
                }`}>
                {lang.name}
              </motion.span>
            ))}
          </motion.div>
          <p className="text-center text-xs text-muted-foreground mb-10">South African languages highlighted</p>

          {/* Inline premium CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-r from-primary/8 to-accent/8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">Unlock English + 1 other language</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm">
                Free users are limited to English only. Premium includes English + 1 language of your choice. Additional languages available for $2 each.
              </p>
            </div>
            <Button size="lg" onClick={() => setShowModal(true)}
              className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8 h-12 flex-shrink-0 shadow-[0_0_24px_rgba(139,92,246,0.4)]"
              data-testid="button-upgrade-languages">
              Get Premium - $8
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section id="compare" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter">Free vs Premium</h2>
            <p className="text-muted-foreground text-lg mt-2">Side by side. You decide.</p>
          </motion.div>
          <div className="rounded-3xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-card border-b border-border">
              <div className="p-5 text-sm font-bold text-muted-foreground uppercase tracking-wider">Feature</div>
              <div className="p-5 text-sm font-bold text-center border-l border-border">Free</div>
              <div className="p-5 text-sm font-bold text-center border-l border-border bg-primary/5">
                <span className="text-primary">Premium</span>
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold">$8</span>
              </div>
            </div>
            {visibleComparison.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-card/40"}`}>
                <div className="p-4 text-sm font-medium">{row.feature}</div>
                <div className="p-4 text-sm text-center border-l border-border text-muted-foreground">{row.free}</div>
                <div className="p-4 text-sm text-center border-l border-border bg-primary/5 text-primary font-semibold">{row.premium}</div>
              </div>
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

      {/* ── Testimonials ── */}
      <section className="py-20 px-4 bg-card/50">
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
                  {Array.from({ length: t.stars }).map((_, s) => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5">"{t.text}"</p>
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plan selector ── */}
      <section className="py-20 px-4">
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
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">{plan.badge}</span>
                )}
                <div className="text-xs font-semibold text-muted-foreground mb-1">{plan.label}</div>
                <div className={`text-xl font-bold ${selectedPlan === plan.id ? "text-primary" : ""}`}>{plan.price}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{plan.sub}</div>
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <Button size="lg"
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              onClick={() => selectedPlan === "lifetime" && setShowModal(true)}
              disabled={selectedPlan !== "lifetime"}
              data-testid="button-upgrade-premium">
              {selectedPlan === "lifetime" ? "Unlock Everything - $8 Forever" : "Select 'Once-off' to upgrade"}
            </Button>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ icon: Flame, label: "One payment" }, { icon: Crown, label: "No expiry" }, { icon: Globe, label: "Global access" }].map(b => (
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

      {/* ── Final CTA ── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-12 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/8 to-accent/8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Crown className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter">One coffee. A lifetime of better words.</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              $8, once. No renewals, no regrets. Thousands of learners across 5 continents already made the switch.
            </p>
            <Button size="lg" onClick={() => setShowModal(true)}
              className="rounded-full bg-primary hover:bg-primary/90 font-bold px-12 h-14 text-lg shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              data-testid="button-upgrade-final">
              Get Premium - $8
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
