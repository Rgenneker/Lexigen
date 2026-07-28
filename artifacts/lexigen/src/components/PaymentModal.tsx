import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  X, Loader2, CheckCircle2, CreditCard, Crown, Check, ChevronRight,
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

type ModalStep = "confirm" | "paypal" | "success" | "error";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  userEmail: string;
  userName: string;
}

const FEATURES = [
  "All 6 word games - unlimited",
  "Unlimited word journal + PDF export",
  "English + 1 language (additional languages $2)",
  "Full archetype deep-dive",
  "Monthly reports & badges",
];

export function PaymentModal({ onClose, onSuccess, userEmail, userName }: Props) {
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
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
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
                    {FEATURES.map(f => (
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
                    {FEATURES.map(f => (
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
