import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";

export function RegistrationGate() {
  const { registerFree } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerFree(firstName, lastName, email);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,0,20,0.88)", backdropFilter: "blur(10px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-background rounded-3xl border border-border/60 shadow-[0_0_80px_rgba(139,92,246,0.25)] overflow-hidden">

          {/* Header */}
          <div className="relative px-8 pt-8 pb-6 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none" />
            <p className="text-primary font-black text-sm tracking-[0.25em] uppercase mb-2">LEXIGENZ</p>
            <h1 className="text-2xl font-black leading-tight">Create your free account</h1>
            <p className="text-muted-foreground text-sm mt-2">
              English included · 6 word games · Upgrade anytime
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  First Name
                </label>
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
                <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Last Name
                </label>
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

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@example.com"
                autoComplete="email"
                className="w-full h-11 rounded-xl border border-input bg-muted/30 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-destructive font-medium bg-destructive/10 px-3 py-2 rounded-lg">
                {error}
              </p>
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

            <p className="text-center text-[11px] text-muted-foreground leading-relaxed pt-1">
              By registering you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
            </p>

            <div className="flex justify-center pt-1">
              <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 underline underline-offset-2">
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>

        {/* Feature chips below card */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: "📖", text: "Daily word" },
            { icon: "🎮", text: "6 games" },
            { icon: "🌍", text: "19 languages" },
          ].map(f => (
            <div
              key={f.text}
              className="bg-white/5 rounded-2xl px-3 py-3 border border-white/10 backdrop-blur-sm"
            >
              <p className="text-xl">{f.icon}</p>
              <p className="text-[11px] text-white/60 font-semibold mt-1">{f.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
