import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES } from "@/data/countries";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
    password.length >= 8 && /^[a-zA-Z0-9@#$&!]+$/.test(password) && /[@#$&!]/.test(password) &&
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
        toast({ title: t("modals.freemium.toastTitle"), description: t("modals.freemium.toastDesc") });
      } else {
        setErrorMsg(data.error ?? t("modals.freemium.errorRegistration"));
        setStep("error");
      }
    } catch {
      setErrorMsg(t("modals.freemium.errorConnection"));
      setStep("error");
    } finally {
      setLoading(false);
    }
  }, [firstName, lastName, email, password, countryCode, phone, canProceed, onSuccess, toast, t]);

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
                <p className="font-bold text-sm">{t("modals.freemium.title")}</p>
                <p className="text-xs text-muted-foreground">{t("modals.freemium.subtitle")}</p>
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
                    <h2 className="text-xl font-bold mb-1">{t("modals.freemium.heading")}</h2>
                    <p className="text-sm text-muted-foreground">{t("modals.freemium.subheading")}</p>
                  </div>
                  <div className="space-y-3">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="f-firstname" className="text-sm font-semibold">{t("modals.freemium.labelFirstName")}</Label>
                        <Input
                          id="f-firstname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t("modals.freemium.placeholderFirstName")}
                          className="rounded-xl h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="f-lastname" className="text-sm font-semibold">{t("modals.freemium.labelLastName")}</Label>
                        <Input
                          id="f-lastname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t("modals.freemium.placeholderLastName")}
                          className="rounded-xl h-11"
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="f-email" className="text-sm font-semibold">{t("modals.freemium.labelEmail")}</Label>
                      <Input
                        id="f-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("modals.freemium.placeholderEmail")}
                        className="rounded-xl h-11"
                      />
                    </div>
                    {/* Password */}
                    <div className="space-y-1.5">
                      <Label htmlFor="f-password" className="text-sm font-semibold">{t("modals.freemium.labelPassword")}</Label>
                      <div className="relative">
                        <Input
                          id="f-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t("modals.freemium.placeholderPassword")}
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
                      <p className="text-xs text-muted-foreground">{t("modals.freemium.passwordHint")}</p>
                    </div>
                    {/* Country */}
                    <div className="space-y-1.5">
                      <Label htmlFor="f-country" className="text-sm font-semibold">{t("registrationGate.labelCountry")}</Label>
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
                      <Label htmlFor="f-phone" className="text-sm font-semibold">{t("modals.freemium.labelPhone")}</Label>
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
                          placeholder={t("modals.freemium.phonePlaceholder")}
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
                      <span className="font-bold text-sm">{t("modals.freemium.amountDue")}</span>
                    </div>
                    <span className="font-bold text-lg text-green-600">{t("modals.freemium.amountFree")}</span>
                  </div>

                  {/* What's included */}
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {[t("modals.freemium.freeFeature1"), t("modals.freemium.freeFeature2"), t("modals.freemium.freeFeature3"), t("modals.freemium.freeFeature4")].map(f => (
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
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t("modals.freemium.registering")}</>
                    ) : (
                      <>{t("modals.freemium.registerBtn")} <ChevronRight className="h-4 w-4 ml-1" /></>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    {t("modals.freemium.noCard")}
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
                    <h2 className="text-2xl font-bold mb-2">{t("modals.freemium.successHeading")}</h2>
                    <p className="text-muted-foreground text-sm">
                      {t("modals.freemium.successDesc")}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl border border-border bg-muted/30 text-sm text-left space-y-2">
                    <p className="font-semibold">{t("modals.freemium.whatsNext")}</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>{t("modals.freemium.nextItem1")}</li>
                      <li>{t("modals.freemium.nextItem2")}</li>
                      <li>{t("modals.freemium.nextItem3")}</li>
                    </ul>
                  </div>
                  <Button size="lg" className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold" onClick={onClose}>
                    {t("modals.freemium.successBtn")}
                  </Button>
                </motion.div>
              )}

              {/* ── Step 3: Error ── */}
              {step === "error" && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 py-4 text-center">
                  <div className="text-4xl">⚠️</div>
                  <h2 className="text-xl font-bold">{t("modals.freemium.errorHeading")}</h2>
                  <p className="text-sm text-muted-foreground">{errorMsg}</p>
                  <Button variant="outline" className="w-full rounded-2xl" onClick={() => setStep("form")}>
                    {t("modals.freemium.errorBtn")}
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
