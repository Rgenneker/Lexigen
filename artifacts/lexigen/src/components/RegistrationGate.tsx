import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Eye, EyeOff, ChevronDown, Lock, ArrowLeft, Copy, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { COUNTRY_CODES } from "@/data/countryCodes";

type Tab = "register" | "login";
type LoginView = "form" | "forgot" | "forgot-result";

function validatePassword(pw: string): string | null {
  if (pw.length < 8) return "Password must be at least 8 characters.";
  if (!/^[a-zA-Z0-9]+$/.test(pw)) return "Password must only contain letters and numbers.";
  return null;
}

function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full h-11 rounded-xl border border-input bg-muted/30 px-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        tabIndex={-1}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

function PhoneInput({
  dialCode,
  onDialChange,
  phone,
  onPhoneChange,
}: {
  dialCode: string;
  onDialChange: (v: string) => void;
  phone: string;
  onPhoneChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-shrink-0">
        <select
          value={dialCode}
          onChange={e => onDialChange(e.target.value)}
          className="h-11 rounded-xl border border-input bg-muted/30 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none cursor-pointer"
          style={{ minWidth: "96px" }}
        >
          {COUNTRY_CODES.map(c => (
            <option key={c.code} value={c.dial}>
              {c.flag} {c.dial}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      </div>
      <input
        type="tel"
        value={phone}
        onChange={e => onPhoneChange(e.target.value.replace(/[^0-9\s\-()]/g, ""))}
        placeholder="cell number"
        autoComplete="tel-national"
        className="flex-1 h-11 rounded-xl border border-input bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
      />
    </div>
  );
}

export function RegistrationGate({ initialTab = "register" }: { initialTab?: Tab }) {
  const { registerFree, login } = useAuth();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [loginView, setLoginView] = useState<LoginView>("form");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialCode, setDialCode] = useState("+27");
  const [phone, setPhone] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!firstName.trim() || !lastName.trim()) { setError("First and last name are required."); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    const pwErr = validatePassword(password);
    if (pwErr) { setError(pwErr); return; }
    if (!phone.trim()) { setError("Cell number is required."); return; }
    setLoading(true);
    try {
      await registerFree(firstName, lastName, email, password, `${dialCode} ${phone.trim()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginEmail.trim()) { setError("Email is required."); return; }
    if (!loginPassword) { setError("Password is required."); return; }
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Check your email and password.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase() }),
      });
      const data = await res.json() as { found?: boolean; tempPassword?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setTempPassword(data.found && data.tempPassword ? data.tempPassword : "");
      setLoginView("forgot-result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTemp = () => {
    navigator.clipboard.writeText(tempPassword).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetLoginView = () => {
    setLoginView("form");
    setForgotEmail("");
    setTempPassword("");
    setError("");
    setCopied(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgba(5,0,20,0.88)", backdropFilter: "blur(10px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md my-4"
      >
        <div className="bg-background rounded-3xl border border-border/60 shadow-[0_0_80px_rgba(139,92,246,0.25)] overflow-hidden">
          {/* Header */}
          <div className="relative px-8 pt-8 pb-5 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none" />
            <p className="text-primary font-black text-sm tracking-[0.25em] uppercase mb-2">LEXIGENZ</p>
            <h1 className="text-2xl font-black leading-tight">
              {tab === "register"
                ? "Create your free account"
                : loginView === "forgot"
                ? "Reset your password"
                : loginView === "forgot-result"
                ? "Temporary password"
                : "Welcome back"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              {tab === "register"
                ? "English included · 6 word games · Upgrade anytime"
                : loginView === "forgot"
                ? "We'll generate a temporary password for your account"
                : loginView === "forgot-result"
                ? "Use this to sign in, then update your password"
                : "Sign in to continue your streak"}
            </p>
          </div>

          {/* Tabs */}
          <div className="px-8 pb-0">
            <div className="flex rounded-xl bg-muted/40 p-1 gap-1">
              {(["register", "login"] as Tab[]).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTab(t); setError(""); resetLoginView(); }}
                  className={`flex-1 h-9 rounded-lg text-sm font-bold transition-all ${tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t === "register" ? "Register" : "Sign In"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "register" ? (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleRegister}
                className="px-8 pb-8 pt-5 space-y-4"
              >
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Alex"
                      autoComplete="given-name"
                      className="w-full h-11 rounded-xl border border-input bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Smith"
                      autoComplete="family-name"
                      className="w-full h-11 rounded-xl border border-input bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    autoComplete="email"
                    className="w-full h-11 rounded-xl border border-input bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> Password
                  </label>
                  <PasswordInput value={password} onChange={setPassword} autoComplete="new-password" />
                  <p className="text-[11px] text-muted-foreground">Letters and numbers only · min 8 characters</p>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Cell Phone Number</label>
                  <PhoneInput
                    dialCode={dialCode}
                    onDialChange={setDialCode}
                    phone={phone}
                    onPhoneChange={setPhone}
                  />
                </div>

                {error && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/30"
                >
                  {loading ? "Creating account…" : "Register Free →"}
                </Button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-medium">or go all-in</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <Link href="/premium">
                  <button
                    type="button"
                    className="w-full h-11 rounded-2xl border-2 border-primary/40 font-bold text-sm text-primary hover:bg-primary/5 hover:border-primary transition-all flex items-center justify-center gap-2"
                  >
                    ⭐ Get Premium — $8 lifetime · All 19 languages
                  </button>
                </Link>

                <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
                  By registering you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">Terms</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
                </p>

                <div className="flex justify-center">
                  <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                    ← Back to Home
                  </Link>
                </div>
              </motion.form>
            ) : loginView === "forgot" ? (
              <motion.form
                key="forgot"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleForgotPassword}
                className="px-8 pb-8 pt-5 space-y-4"
              >
                <button
                  type="button"
                  onClick={resetLoginView}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </button>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Your Email Address</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="alex@example.com"
                    autoComplete="email"
                    className="w-full h-11 rounded-xl border border-input bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/30"
                >
                  {loading ? "Generating…" : "Get Temporary Password →"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  A temporary password will be shown on screen. Use it to sign in, then contact us to set a permanent one.
                </p>
              </motion.form>
            ) : loginView === "forgot-result" ? (
              <motion.div
                key="forgot-result"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="px-8 pb-8 pt-5 space-y-4"
              >
                {tempPassword ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      A temporary password has been set for <span className="font-semibold text-foreground">{forgotEmail}</span>. Copy it and use it to sign in.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 font-mono text-lg font-bold tracking-widest bg-muted/50 border border-border rounded-xl px-4 py-3 text-center select-all">
                        {tempPassword}
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyTemp}
                        className="w-11 h-11 rounded-xl border border-border bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex-shrink-0"
                        title="Copy"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-amber-600 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
                      ⚠️ This password replaces your old one immediately. Sign in now to secure your account.
                    </p>
                  </>
                ) : (
                  <div className="py-4 text-center space-y-2">
                    <p className="text-sm font-semibold">No account found</p>
                    <p className="text-xs text-muted-foreground">
                      We couldn't find an account for <span className="font-medium">{forgotEmail}</span>. Check the email or create a free account.
                    </p>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={resetLoginView}
                  variant="outline"
                  className="w-full h-11 rounded-2xl font-bold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleLogin}
                className="px-8 pb-8 pt-5 space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="alex@example.com"
                    autoComplete="email"
                    className="w-full h-11 rounded-xl border border-input bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <Lock className="w-3 h-3" /> Password
                    </label>
                    <button
                      type="button"
                      onClick={() => { setLoginView("forgot"); setForgotEmail(loginEmail); setError(""); }}
                      className="text-[11px] text-primary hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <PasswordInput value={loginPassword} onChange={setLoginPassword} autoComplete="current-password" />
                </div>

                {error && (
                  <p className="text-xs text-destructive font-medium bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/30"
                >
                  {loading ? "Signing in…" : "Sign In →"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  No account yet?{" "}
                  <button type="button" onClick={() => { setTab("register"); setError(""); }} className="text-primary font-bold hover:underline">
                    Register free
                  </button>
                </p>

                <div className="flex justify-center">
                  <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
                    ← Back to Home
                  </Link>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Feature chips */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: "📖", text: "Daily word" },
            { icon: "🎮", text: "6 games" },
            { icon: "🌍", text: "19 languages" },
          ].map(f => (
            <div key={f.text} className="bg-white/5 rounded-2xl px-3 py-3 border border-white/10 backdrop-blur-sm">
              <p className="text-xl">{f.icon}</p>
              <p className="text-[11px] text-white/60 font-semibold mt-1">{f.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
