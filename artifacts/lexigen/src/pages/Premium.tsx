import { langColor } from "@/data/language-colors";
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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        setErrorMsg(t("premium.modal.paypalError"));
        setStep("error");
      };
      document.head.appendChild(script);
    } catch {
      setSdkLoading(false);
      setErrorMsg(t("premium.modal.paypalReachError"));
      setStep("error");
    }
  }, [t]);

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
            setErrorMsg(result.error ?? t("premium.modal.captureError"));
            setStep("error");
          }
        },
        onError: () => {
          setErrorMsg(t("premium.modal.paypalGenericError"));
          setStep("error");
        },
        onCancel: () => setStep("confirm"),
      })
      .render(paypalContainerRef.current)
      .catch(() => {
        setErrorMsg(t("premium.modal.renderError"));
        setStep("error");
      });
  }, [sdkReady, step, userEmail, t]);

  const handleContinue = async () => {
    setStep("paypal");
    if (!sdkReady) await loadPayPalSdk();
  };

  const handleSuccess = () => {
    onSuccess();
    onClose();
    toast({ title: t("premium.modal.welcomeToast"), description: t("premium.modal.welcomeToastDesc") });
  };

  const premiumFeatures = [
    t("premium.featureGames"),
    t("premium.featureJournal"),
    t("premium.featureLang"),
    t("premium.featureArchetype"),
    t("premium.featureReports"),
  ];

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
              <p className="font-bold text-sm">{t("premium.modal.title")}</p>
              <p className="text-xs text-muted-foreground">{t("premium.modal.subtitle")}</p>
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
                  <h2 className="text-xl font-bold mb-1">{t("premium.modal.readyToUpgrade")}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t("premium.modal.upgradingFor")} <span className="font-semibold text-foreground">{userName}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{userEmail}</p>
                </div>
                <div className="space-y-2">
                  {premiumFeatures.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-bold text-sm">{t("premium.modal.amountDue")}</span>
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
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t("premium.modal.loadingPaypal")}</>
                  ) : (
                    <>{t("premium.modal.payWithPaypal")} <ChevronRight className="h-4 w-4 ml-1" /></>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {t("premium.modal.securedBy")}
                </p>
              </motion.div>
            )}

            {/* ── Step 2: PayPal buttons ── */}
            {step === "paypal" && (
              <motion.div key="paypal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold mb-1">{t("premium.modal.completePayment")}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t("premium.modal.completePaymentDesc")}
                  </p>
                </div>
                <div ref={paypalContainerRef} className="min-h-[56px]">
                  {!sdkReady && (
                    <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" /> {t("premium.modal.loadingPaypal")}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setStep("confirm")}
                  className="text-xs text-muted-foreground hover:text-foreground underline w-full text-center"
                >
                  {t("common.back")}
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
                  <h2 className="text-2xl font-bold mb-1">{t("premium.modal.paymentConfirmed")}</h2>
                  <p className="text-muted-foreground text-sm">
                    {t("premium.modal.welcomePremium")} <span className="font-semibold text-foreground">{userName}</span>. {t("premium.modal.welcomeDesc")}
                  </p>
                </div>
                <div className="space-y-2 text-left">
                  {premiumFeatures.map(f => (
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
                  {t("premium.dashboardBtn")}
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
                  <h2 className="text-xl font-bold mb-1">{t("premium.modal.paymentFailed")}</h2>
                  <p className="text-muted-foreground text-sm">{errorMsg || t("common.error")}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-2xl font-bold"
                  onClick={() => { setStep("confirm"); setErrorMsg(""); }}
                >
                  {t("common.tryAgain")}
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
  const { t } = useTranslation();
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
      <p className="font-bold text-lg">{score === 5 ? t("premium.quizPerfect") : score >= 3 ? t("premium.quizStrong") : t("premium.quizKeepPractising")}</p>
      <Button onClick={() => { setIdx(0); setScore(0); setSelected(null); setDone(false); }} variant="outline" size="sm" className="rounded-full mt-2">
        <RefreshCw className="h-3.5 w-3.5 mr-2" /> {t("premium.quizTryAgain")}
      </Button>
    </motion.div>
  );

  return (
    <div className="space-y-5">
      <div className="flex justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-muted-foreground">{t("premium.quizQuestion", { idx: idx + 1, total: QUIZ_QUESTIONS.length })}</span>
        <span className="font-bold text-primary">{t("premium.quizCorrect", { score })}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div animate={{ width: `${(idx / QUIZ_QUESTIONS.length) * 100}%` }} className="h-full bg-primary rounded-full" />
      </div>
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{t("premium.quizMeaning")}</p>
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
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const prompts = [
    t("premium.builderPrompt1", { word }),
    t("premium.builderPrompt2", { word }),
    t("premium.builderPrompt3", { word }),
    t("premium.builderPrompt4", { word }),
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
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{t("premium.builderTodayWord")}</p>
        <p className="text-2xl font-bold">{word}</p>
      </div>
      <p className="text-sm italic text-muted-foreground">{prompts[promptIdx]}</p>
      <div className="flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder={t("premium.builderPlaceholder")}
          className="rounded-xl" onKeyDown={e => e.key === "Enter" && handleSave()} />
        <Button onClick={handleSave} disabled={!input.trim()} className="rounded-xl bg-primary hover:bg-primary/90 font-bold flex-shrink-0">{t("premium.builderSave")}</Button>
      </div>
      {saved.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border">"{s}"</motion.div>
      ))}
    </div>
  );
}

function ProgressReport() {
  const { t } = useTranslation();
  const stats = [
    { label: t("premium.reportWordsMonth"), value: 24, max: 30, color: "bg-primary" },
    { label: t("premium.reportStreak"), value: 18, max: 30, color: "bg-accent" },
    { label: t("premium.reportGames"), value: 12, max: 20, color: "bg-green-500" },
    { label: t("premium.reportJournal"), value: 8, max: 10, color: "bg-yellow-500" },
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
        <p className="text-xs text-muted-foreground mb-1">{t("premium.reportArchetype")}</p>
        <p className="text-lg font-bold text-primary">{t("premium.reportArchetypeMatch", { archetype: "The Visionary", match: 87 })}</p>
      </div>
    </div>
  );
}

// ── Premium Dashboard (after upgrade) ───────────────────
function PremiumDashboard({ dailyWord }: { dailyWord: string }) {
  const { t } = useTranslation();

  const sessions = [
    { id: "quiz" as SessionType, icon: Brain, label: t("premium.sessionQuiz"), desc: t("premium.sessionQuizDesc") },
    { id: "builder" as SessionType, icon: Zap, label: t("premium.sessionBuilder"), desc: t("premium.sessionBuilderDesc") },
    { id: "report" as SessionType, icon: BarChart3, label: t("premium.sessionReport"), desc: t("premium.sessionReportDesc") },
  ];

  const [activeSession, setActiveSession] = useState<SessionType>(null);
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="container mx-auto max-w-4xl space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.5)]">
            <Crown className="h-12 w-12 text-white" />
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30 font-bold tracking-widest text-xs uppercase">{t("premium.dashboardBadge")}</Badge>
          <h1 className="text-5xl font-bold tracking-tighter">
            {t("premium.dashboardHeading")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t("premium.dashboardHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">{t("premium.dashboardSubtitle")}</p>
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

// ── Comparison data (module-level, translated inside component) ──
// see comparison const below, inside Premium component

const TESTIMONIAL_KEYS = [0, 1, 2, 3];

// ── Main Export ──────────────────────────────────────────
export default function Premium() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [isPremiumLocal, setIsPremiumLocal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("lifetime");

  const comparison = [
    { feature: t("premium.compare.featureDaily"), free: t("premium.compare.freeDaily"), premium: t("premium.compare.premiumDaily") },
    { feature: t("premium.compare.featureGames"), free: t("premium.compare.freeGames"), premium: t("premium.compare.premiumGames") },
    { feature: t("premium.compare.featureJournal"), free: t("premium.compare.freeJournal"), premium: t("premium.compare.premiumJournal") },
    { feature: t("premium.compare.featureBuilder"), free: t("premium.compare.freeBuilder"), premium: t("premium.compare.premiumBuilder") },
    { feature: t("premium.compare.featureStreak"), free: t("premium.compare.freeStreak"), premium: t("premium.compare.premiumStreak") },
    { feature: t("premium.compare.featureArchetype"), free: t("premium.compare.freeArchetype"), premium: t("premium.compare.premiumArchetype") },
    { feature: t("premium.compare.featureReports"), free: t("premium.compare.freeReports"), premium: t("premium.compare.premiumReports") },
    { feature: t("premium.compare.featureLang"), free: t("premium.compare.freeLang"), premium: t("premium.compare.premiumLang") },
    { feature: t("premium.compare.featureFriends"), free: t("premium.compare.freeFriends"), premium: t("premium.compare.premiumFriends") },
    { feature: t("premium.compare.featureCustom"), free: t("premium.compare.freeCustom"), premium: t("premium.compare.premiumCustom") },
    { feature: t("premium.compare.featureAds"), free: t("premium.compare.freeAds"), premium: t("premium.compare.premiumAds") },
    { feature: t("premium.compare.featureFeatures"), free: t("premium.compare.freeFeatures"), premium: t("premium.compare.premiumFeatures") },
  ];
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
              <Sparkles className="h-3.5 w-3.5" /> {t("premium.pageBadge")}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              {t("premium.pageHeading")}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t("premium.pageHighlight")}</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("premium.pageSubtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => setShowModal(true)}
                className="rounded-full bg-primary hover:bg-primary/90 font-bold px-10 h-14 text-lg shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                data-testid="button-upgrade-hero">
                {t("premium.upgradeBtn")}
              </Button>
              <a href="#compare">
                <Button size="lg" variant="outline" className="rounded-full border-border hover:border-primary/50 font-bold px-8 h-14">
                  {t("premium.compareHeading")} <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("premium.oneTimePaymentNote")}</p>
          </motion.div>
        </div>
      </section>

      {/* ── What's locked ── */}
      <section className="py-16 px-4 bg-card/60">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t("premium.lockedSectionBadge")}</p>
            <h2 className="text-4xl font-bold tracking-tighter">{t("premium.lockedSectionHeading")}</h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">{t("premium.lockedSectionSubtitle")}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Gamepad2, label: t("premium.lockedFeature1"), limit: t("premium.lockedFeature1Limit") },
              { icon: BookOpen, label: t("premium.lockedFeature2"), limit: t("premium.lockedFeature2Limit") },
              { icon: Download, label: t("premium.lockedFeature3"), limit: t("premium.lockedFeature3Limit") },
              { icon: Zap, label: t("premium.lockedFeature4"), limit: t("premium.lockedFeature4Limit") },
              { icon: Globe, label: t("premium.lockedFeature5"), limit: t("premium.lockedFeature5Limit") },
              { icon: Brain, label: t("premium.lockedFeature6"), limit: t("premium.lockedFeature6Limit") },
              { icon: BarChart3, label: t("premium.lockedFeature7"), limit: t("premium.lockedFeature7Limit") },
              { icon: Trophy, label: t("premium.lockedFeature8"), limit: t("premium.lockedFeature8Limit") },
              { icon: Users, label: t("premium.lockedFeature9"), limit: t("premium.lockedFeature9Limit") },
              { icon: Sparkles, label: t("premium.lockedFeature10"), limit: t("premium.lockedFeature10Limit") },
              { icon: Mic, label: t("premium.lockedFeature11"), limit: t("premium.lockedFeature11Limit") },
              { icon: Star, label: t("premium.lockedFeature12"), limit: t("premium.lockedFeature12Limit") },
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
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t("premium.langSectionBadge")}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              {t("premium.langSectionHeading1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t("premium.langSectionHeading2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
              {t("premium.langSectionSubtitle")}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 text-xs font-bold px-4 py-1.5 rounded-full">
              <Lock className="h-3 w-3" /> {t("premium.langSectionFreePlan")}
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
            ].map((lang, i) => {
              const c = langColor(lang.name);
              return (
                <motion.span key={lang.name}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${c.bg} ${c.text} ${c.border}`}>
                  {lang.name}
                </motion.span>
              );
            })}
          </motion.div>
          <p className="text-center text-xs text-muted-foreground mb-10">{t("premium.langColorsNote")}</p>

          {/* Inline premium CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-r from-primary/8 to-accent/8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{t("premium.langCtaLabel")}</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm">
                {t("premium.langCtaDesc")}
              </p>
            </div>
            <Button size="lg" onClick={() => setShowModal(true)}
              className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8 h-12 flex-shrink-0 shadow-[0_0_24px_rgba(139,92,246,0.4)]"
              data-testid="button-upgrade-languages">
              {t("premium.upgradeBtn")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section id="compare" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter">{t("premium.compareHeading")}</h2>
            <p className="text-muted-foreground text-lg mt-2">{t("premium.compareSubtitle")}</p>
          </motion.div>
          <div className="rounded-3xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-card border-b border-border">
              <div className="p-5 text-sm font-bold text-muted-foreground uppercase tracking-wider">{t("premium.compareFeatureLabel")}</div>
              <div className="p-5 text-sm font-bold text-center border-l border-border">{t("common.free")}</div>
              <div className="p-5 text-sm font-bold text-center border-l border-border bg-primary/5">
                <span className="text-primary">{t("common.premium")}</span>
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
                {t("premium.compareShowAll", { count: comparison.length })} <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tighter">{t("premium.testimonialsHeading")}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {TESTIMONIAL_KEYS.map((idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="p-7 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5">"{t(`premium.testimonial${idx}Text`)}"</p>
                <p className="font-bold text-sm">{t(`premium.testimonial${idx}Name`)}</p>
                <p className="text-xs text-muted-foreground">{t(`premium.testimonial${idx}Location`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plan selector ── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-xl space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-4xl font-bold tracking-tighter mb-2">{t("premium.planChooseHeading")}</h2>
            <p className="text-muted-foreground">{t("premium.planChooseSubtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "monthly", label: t("premium.planMonthlyLabel"), price: "Free", sub: t("premium.planLimitedUse") },
              { id: "annual", label: t("premium.planAnnuallyLabel"), price: "Free", sub: t("premium.planLimitedUse") },
              { id: "lifetime", label: t("premium.planOnceOffLabel"), price: "$8", sub: t("premium.planUnlimited"), badge: t("premium.planBestValue") },
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
              {selectedPlan === "lifetime" ? t("premium.planUnlockCta") : t("premium.planSelectOnceOff")}
            </Button>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[{ icon: Flame, label: t("premium.planOnePayment") }, { icon: Crown, label: t("premium.planNoExpiry") }, { icon: Globe, label: t("premium.planGlobalAccess") }].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-card">
                  <b.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground">{t("premium.planNoHiddenFees")}</p>
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
            <h2 className="text-4xl font-bold tracking-tighter">{t("premium.ctaHeading")}</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              {t("premium.ctaSubtitle")}
            </p>
            <Button size="lg" onClick={() => setShowModal(true)}
              className="rounded-full bg-primary hover:bg-primary/90 font-bold px-12 h-14 text-lg shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              data-testid="button-upgrade-final">
              {t("premium.upgradeBtn")}
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
