import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  X, Loader2, CheckCircle2, Globe, Lock, AlertCircle,
} from "lucide-react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (opts: {
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: unknown) => void;
        onCancel: () => void;
        style?: { layout?: string; color?: string; shape?: string; label?: string; height?: number };
      }) => { render: (el: HTMLElement) => Promise<void>; close: () => void };
    };
  }
}

type Step = "info" | "paypal" | "success" | "error";

interface Props {
  language: string;
  isRenewal?: boolean;
  daysRemaining?: number;
  onClose: () => void;
  onSuccess: (language: string) => void;
}

export function LanguageUnlockModal({ language, isRenewal, daysRemaining, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("info");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const paypalButtonsRef = useRef<{ close: () => void } | null>(null);
  const { toast } = useToast();

  // Load PayPal SDK
  useEffect(() => {
    if (step !== "paypal") return;

    const loadSdk = async () => {
      if (window.paypal) { setSdkReady(true); return; }

      try {
        const cfgRes = await fetch("/api/premium/paypal-config");
        const cfg = await cfgRes.json() as { clientId: string; mode: string };

        const existing = document.querySelector('script[data-paypal-sdk]');
        if (existing) { setSdkReady(true); return; }

        const script = document.createElement("script");
        const params = new URLSearchParams({ "client-id": cfg.clientId, currency: "USD", intent: "capture" });
        script.src = `https://www.paypal.com/sdk/js?${params}`;
        script.setAttribute("data-paypal-sdk", "true");
        script.onload = () => setSdkReady(true);
        script.onerror = () => { setErrorMsg("Failed to load PayPal. Check your connection."); setStep("error"); };
        document.head.appendChild(script);
      } catch {
        setErrorMsg("Failed to load PayPal config.");
        setStep("error");
      }
    };

    loadSdk();
  }, [step]);

  // Render PayPal buttons once SDK is ready
  useEffect(() => {
    if (!sdkReady || !paypalContainerRef.current || step !== "paypal") return;

    const container = paypalContainerRef.current;
    container.innerHTML = "";

    const buttons = window.paypal!.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/language-unlock/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language }),
        });
        const data = await res.json() as { orderID?: string; error?: string };
        if (!data.orderID) throw new Error(data.error ?? "Order creation failed");
        return data.orderID;
      },
      onApprove: async ({ orderID }) => {
        setLoading(true);
        try {
          const res = await fetch("/api/language-unlock/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID, language }),
          });
          const data = await res.json() as { success?: boolean; expiresAt?: string; error?: string };
          if (data.success) {
            setExpiresAt(data.expiresAt ?? null);
            setStep("success");
            onSuccess(language);
            toast({ title: `🌍 ${language} unlocked!`, description: "60-day access is active. Enjoy!" });
          } else {
            setErrorMsg(data.error ?? "Payment captured but unlock failed.");
            setStep("error");
          }
        } catch {
          setErrorMsg("Could not verify payment. Contact hello@lexigenz.com.");
          setStep("error");
        } finally {
          setLoading(false);
        }
      },
      onError: () => { setErrorMsg("PayPal encountered an error. Please try again."); setStep("error"); },
      onCancel: () => setStep("info"),
      style: { layout: "vertical", color: "gold", shape: "pill", label: "pay", height: 48 },
    });

    buttons.render(container);
    paypalButtonsRef.current = buttons;

    return () => { try { buttons.close(); } catch { /* noop */ } };
  }, [sdkReady, step, language, onSuccess, toast]);

  const goToPayPal = useCallback(() => setStep("paypal"), []);

  const expired = typeof daysRemaining === "number" && daysRemaining === 0;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
    >
      <div className="flex min-h-full items-start justify-center p-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-background border border-border rounded-3xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-sm">{isRenewal ? "Renew" : "Unlock"} {language}</p>
                <p className="text-xs text-muted-foreground">$2.00 · 60-day access</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-6 py-6">
            <AnimatePresence mode="wait">

              {/* ── Info step ── */}
              {step === "info" && (
                <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  {isRenewal && (
                    <div className="p-3 rounded-xl border border-amber-400/30 bg-amber-400/10 flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-700 dark:text-amber-300">
                        {expired
                          ? `Your ${language} access has expired. Renew to continue.`
                          : `Your ${language} access expires in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}. Renew now to keep going.`}
                      </p>
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-bold mb-1">
                      {isRenewal ? `Renew ${language} access` : `Unlock ${language} vocabulary`}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Unlock daily words, the Sentence Builder, and all word games in <strong>{language}</strong> for 60 days.
                      One small payment - no subscription.
                    </p>
                  </div>

                  {/* What you get */}
                  <ul className="space-y-2 text-sm">
                    {[
                      `Daily word of the day in ${language}`,
                      `Archetype-matched vocabulary in ${language}`,
                      "Full Sentence Builder in your chosen language",
                      "All six word games in this language",
                      "Word Journal entries in this language",
                      "60 days of access from today",
                    ].map(f => (
                      <li key={f} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="p-4 rounded-2xl border border-border bg-muted/30 flex items-center justify-between">
                    <div>
                      <p className="font-bold">{language} - 60-day access</p>
                      <p className="text-xs text-muted-foreground">Renews for $2 every 60 days</p>
                    </div>
                    <p className="text-2xl font-black text-blue-600">$2</p>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-white"
                    onClick={goToPayPal}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {isRenewal ? "Renew with PayPal" : "Unlock with PayPal"} - $2
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Secure payment via PayPal · All major cards accepted
                  </p>
                </motion.div>
              )}

              {/* ── PayPal step ── */}
              {step === "paypal" && (
                <motion.div key="paypal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Complete payment</h2>
                    <p className="text-sm text-muted-foreground">Pay $2.00 securely via PayPal to unlock <strong>{language}</strong> for 60 days.</p>
                  </div>
                  {loading && (
                    <div className="flex items-center justify-center py-6 gap-3 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Verifying payment…</span>
                    </div>
                  )}
                  <div ref={paypalContainerRef} className={loading ? "opacity-0 pointer-events-none" : ""} />
                  {!sdkReady && !loading && (
                    <div className="flex items-center justify-center py-6 gap-3 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Loading PayPal…</span>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground transition-colors" onClick={() => setStep("info")}>
                    ← Back
                  </Button>
                </motion.div>
              )}

              {/* ── Success step ── */}
              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-5 py-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">🌍 {language} unlocked!</h2>
                    <p className="text-muted-foreground text-sm">
                      You now have 60-day access to <strong>{language}</strong> vocabulary, games, and your journal.
                    </p>
                    {expiresAt && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Access expires: <strong>{new Date(expiresAt).toLocaleDateString()}</strong>
                      </p>
                    )}
                  </div>
                  <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-sm text-left space-y-2">
                    <p className="font-semibold">What's active now:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>🌐 Switch to {language} in the navbar globe menu</li>
                      <li>📖 Daily word now served in {language}</li>
                      <li>🎮 All games playable in {language}</li>
                    </ul>
                  </div>
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold"
                    onClick={onClose}
                  >
                    Start exploring {language} →
                  </Button>
                </motion.div>
              )}

              {/* ── Error step ── */}
              {step === "error" && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 py-4 text-center">
                  <div className="text-4xl">⚠️</div>
                  <h2 className="text-xl font-bold">Something went wrong</h2>
                  <p className="text-sm text-muted-foreground">{errorMsg}</p>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                    onClick={() => setStep("info")}
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
