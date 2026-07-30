import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Globe, Gamepad2, BookOpen, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onClose: () => void;
  onGetPremium: () => void;
  onSignUp: () => void;
  isPremium?: boolean;
}

const FEATURES = [
  {
    icon: <Globe className="h-4 w-4" />,
    title: "English + 1 language included",
    sub: "All 19 languages available — extra languages $2 / 60 days",
  },
  {
    icon: <Gamepad2 className="h-4 w-4" />,
    title: "All 6 word games unlocked",
    sub: "Wordle, Scrabble, Crossword, Word Grid + the free games",
  },
  {
    icon: <BookOpen className="h-4 w-4" />,
    title: "Spelling Bee — all 4 levels",
    sub: "Upper Intermediate & Proficient levels unlocked",
  },
  {
    icon: <Zap className="h-4 w-4" />,
    title: "Daily word in your language",
    sub: "Personalised to your birth date + language choice",
  },
  {
    icon: <Star className="h-4 w-4" />,
    title: "One payment. No subscription.",
    sub: "Pay $8 once — yours forever, no expiry, no recurring fees",
  },
];

export function PremiumPreviewModal({ onClose, onGetPremium, onSignUp, isPremium }: Props) {
  const { user } = useAuth();

  const handleCTA = () => {
    if (!user) {
      onClose();
      onSignUp();
    } else {
      onGetPremium();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22 }}
          className="relative z-10 w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="relative px-7 pt-8 pb-5 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />

            {/* Price badge */}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <Crown className="h-3 w-3" /> Introductory offer — $8 once-off
            </span>

            <h2 className="text-2xl font-black leading-tight mb-1">
              Stop being average<br />
              <span className="text-primary">with words.</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              One payment. No subscription. No expiry. Yours forever.
            </p>
          </div>

          {/* Feature list */}
          <div className="px-7 pb-5 space-y-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                  {f.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold leading-snug flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                    {f.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-7 pb-7 flex flex-col gap-2.5">
            {isPremium ? (
              <div className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 font-bold text-sm">
                <Check className="h-4 w-4" /> You already have Premium
              </div>
            ) : (
              <Button
                onClick={handleCTA}
                className="w-full h-12 rounded-2xl bg-primary font-black text-base shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all"
              >
                <Crown className="h-4 w-4 mr-2" />
                {user ? "Get Premium — $8" : "Sign up to get Premium"}
              </Button>
            )}
            <Link href="/premium" onClick={onClose}>
              <button className="w-full text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 py-1">
                See full details on the Premium page →
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
