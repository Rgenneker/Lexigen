import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";

const STORAGE_KEY = "lexigenz_invite_popup_ts";
const MS_15_DAYS = 15 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 4000;

export function InviteReminderModal() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!user || user.plan !== "free") return;

    const timer = setTimeout(() => {
      const lastTs = localStorage.getItem(STORAGE_KEY);
      const shouldShow = !lastTs || Date.now() - parseInt(lastTs, 10) >= MS_15_DAYS;
      if (shouldShow) setVisible(true);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, [user]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setVisible(false);
  };

  const goInvite = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setVisible(false);
    navigate("/invite");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={dismiss}
        >
          <motion.div
            initial={{ y: 48, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="bg-background rounded-3xl border border-border shadow-2xl p-8 max-w-sm w-full text-center space-y-5 relative"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-5xl">🤝</div>

            <div className="space-y-2">
              <h2 className="text-xl font-black">Share Lexigenz!</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Know someone who'd love growing their vocabulary every day? Invite them — it's completely free for them too.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={goInvite}
                className="w-full h-11 rounded-2xl bg-primary font-bold shadow-lg shadow-primary/20"
              >
                Invite a Friend →
              </Button>
              <button
                onClick={dismiss}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Remind me in 15 days
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              Free account · No credit card needed
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
