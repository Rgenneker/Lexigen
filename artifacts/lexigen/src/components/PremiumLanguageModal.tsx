import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, CheckCircle2, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { langColor } from "@/data/language-colors";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  "Afrikaans", "Arabic", "Bahasa Malay", "Cantonese", "Chinese (Mandarin)",
  "Dutch", "Farsi", "French", "German", "Italian",
  "Japanese", "Portuguese", "Russian", "Spanish", "Tagalog",
  "Vietnamese", "Xhosa", "Zulu",
];

interface Props {
  onClose: () => void;
  /** If true, shows "change" framing instead of "choose" */
  isChange?: boolean;
}

export function PremiumLanguageModal({ onClose, isChange = false }: Props) {
  const { t } = useTranslation();
  const { user, setPremiumLanguage } = useAuth();
  const [selected, setSelected] = useState<string | null>(user?.premiumLanguage ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const currentLanguage = user?.premiumLanguage ?? "";

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    setError("");
    try {
      await setPremiumLanguage(selected);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("modals.premiumLanguage.errorSave"));
    } finally {
      setSaving(false);
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
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-border">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-black">
                  {isChange ? t("modals.premiumLanguage.changeTitle") : t("modals.premiumLanguage.title")}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isChange
                    ? t("modals.premiumLanguage.changeSubtitle", { current: currentLanguage })
                    : t("modals.premiumLanguage.subtitle")}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* English — always included, not selectable */}
            <div className="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-green-500/8 border border-green-500/20">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
              <div className="flex-1">
                <span className="font-bold text-sm">{t("modals.premiumLanguage.english")}</span>
                <span className="text-xs text-muted-foreground ml-2">{t("modals.premiumLanguage.alwaysIncluded")}</span>
              </div>
              <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-bold">{t("common.free").toUpperCase()}</span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {t("modals.premiumLanguage.otherLanguages")}
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {LANGUAGES.map((lang) => {
                const isSelected = selected === lang;
                const c = langColor(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => setSelected(lang)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium text-left transition-all hover:scale-[1.02] ${c.bg} ${c.text} ${c.border} ${
                      isSelected ? "opacity-100 shadow-sm" : "opacity-60 hover:opacity-90"
                    }`}
                  >
                    {isSelected
                      ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      : <span className="w-4 h-4 rounded-full border-2 border-current opacity-40 flex-shrink-0" />
                    }
                    <span className="truncate">{lang}</span>
                  </button>
                );
              })}
            </div>

            {/* Info note */}
            <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 inline mr-1 text-primary" />
              {t("modals.premiumLanguage.note")}
            </div>

            {error && (
              <p className="mt-3 text-xs text-destructive font-medium">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-2xl">
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!selected || saving}
              className="flex-1 rounded-2xl bg-primary font-bold"
            >
              {saving
                ? t("modals.premiumLanguage.saving")
                : isChange
                  ? t("modals.premiumLanguage.updateBtn")
                  : t("modals.premiumLanguage.saveBtn")}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
