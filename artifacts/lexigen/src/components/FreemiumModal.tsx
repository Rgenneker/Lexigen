import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES } from "@/data/countries";
import {
  X, ChevronRight, Loader2, CheckCircle2, CreditCard, Eye, EyeOff,
} from "lucide-react";

type ModalStep = "form" | "success" | "error";

export function FreemiumModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [step, setStep] = useState<ModalStep>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("ZA");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { toast } = useToast();

  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES.find(c => c.code === "ZA")!;
  const canProceed =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 8 &&
    phone.trim().length > 0;

  const handleRegister = useCallback(async () => {
    if (!canProceed) return;
    setLoading(true);
    try {
      const res = await fetch("/api/register/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password,
          phone: phone.trim(),
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (data.success) {
        setStep("success");
        onSuccess?.();
        toast({ title: "🎉 Welcome to Lexigenz!", description: "Your free account is ready. Start exploring words today." });
      } else {
        setErrorMsg(data.error ?? "Registration failed. Please try again.");
        setStep("error");
      }
    } catch {
      setErrorMsg("Could not connect. Please check your connection and try again.");
      setStep("error");
    } finally {
      setLoading(false);
    }
  }, [firstName, lastName, email, password, countryCode, phone, canProceed, onSuccess, toast]);

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
              <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                <span className="text-lg">🎁</span>
              </div>
              <div>
                <p className="font-bold text-sm">Lexigenz Free</p>
                <p className="text-xs text-muted-foreground">$0.00 — free forever</p>
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

              {/* ── Step 1: Registration form ── */}
              {step === "form" && (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Create your free account</h2>
                    <p className="text-sm text-muted-foreground">No credit card required — free forever.</p>
                  </div>
                  <div className="space-y-3">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="f-firstname" className="text-sm font-semibold">First Name</Label>
                        <Input
                          id="f-firstname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Russ"
                          className="rounded-xl h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="f-lastname" className="text-sm font-semibold">Last Name</Label>
                        <Input
                          id="f-lastname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Smith"
                          className="rounded-xl h-11"
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="f-email" className="text-sm font-semibold">Email Address</Label>
                      <Input
                        id="f-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="rounded-xl h-11"
                      />
                    </div>
                    {/* Password */}
                    <div className="space-y-1.5">
                      <Label htmlFor="f-password" className="text-sm font-semibold">Password</Label>
                      <div className="relative">
                        <Input
                          id="f-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min 8 characters"
                          className="rounded-xl h-11 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(v => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">Letters and numbers only · min 8 characters</p>
                    </div>
                    {/* Country */}
                    <div className="space-y-1.5">
                      <Label htmlFor="f-country" className="text-sm font-semibold">Country</Label>
                      <select
                        id="f-country"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.name} ({c.dial})
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label htmlFor="f-phone" className="text-sm font-semibold">Cell Phone Number</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 h-11 px-3 rounded-xl border border-input bg-muted/50 text-sm font-medium flex-shrink-0 min-w-[72px] justify-center">
                          <span>{selectedCountry.flag}</span>
                          <span className="text-muted-foreground">{selectedCountry.dial}</span>
                        </div>
                        <Input
                          id="f-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9 \-]/g, ""))}
                          placeholder="e.g. 82 123 4567"
                          className="rounded-xl h-11 flex-1"
                          onKeyDown={(e) => e.key === "Enter" && canProceed && handleRegister()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan summary */}
                  <div className="p-4 rounded-2xl border border-green-500/20 bg-green-500/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-sm">Amount due</span>
                    </div>
                    <span className="font-bold text-lg text-green-600">$0.00 — Free</span>
                  </div>

                  {/* What's included */}
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {["Word of the day (English)", "Birth-based archetype", "Daily streaks & badges", "Word journal"].map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 font-bold text-white"
                    onClick={handleRegister}
                    disabled={!canProceed || loading}
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Registering…</>
                    ) : (
                      <>Start for Free <ChevronRight className="h-4 w-4 ml-1" /></>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No card required · Upgrade to Premium anytime for $8
                  </p>
                </motion.div>
              )}

              {/* ── Step 2: Success ── */}
              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-5 py-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">You're in! 🎉</h2>
                    <p className="text-muted-foreground text-sm">
                      Welcome, <span className="font-semibold text-foreground">{firstName.trim()} {lastName.trim()}</span>.<br />
                      Your free Lexigenz account is active.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl border border-border bg-muted/30 text-sm text-left space-y-2">
                    <p className="font-semibold">What's next:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>📖 Get your word of the day on the App page</li>
                      <li>🎮 Play word games under Play</li>
                      <li>🔥 Start building your streak</li>
                    </ul>
                  </div>
                  <Button size="lg" className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold" onClick={onClose}>
                    Start Exploring →
                  </Button>
                </motion.div>
              )}

              {/* ── Step 3: Error ── */}
              {step === "error" && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 py-4 text-center">
                  <div className="text-4xl">⚠️</div>
                  <h2 className="text-xl font-bold">Something went wrong</h2>
                  <p className="text-sm text-muted-foreground">{errorMsg}</p>
                  <Button variant="outline" className="w-full rounded-2xl" onClick={() => setStep("form")}>
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
