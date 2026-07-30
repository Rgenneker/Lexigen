import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, Lock, CheckCircle2, AlertTriangle, Clock, LogOut, Crown, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence } from "framer-motion";
import { LanguageUnlockModal } from "@/components/LanguageUnlockModal";
import { PaymentModal } from "@/components/PaymentModal";
import { PremiumLanguageModal } from "@/components/PremiumLanguageModal";
import { useAuth } from "@/context/AuthContext";
import { langColor } from "@/data/language-colors";
import { useTranslation } from "react-i18next";

const LANGUAGE_DATA = [
  { key: "lang.english",    name: "English" },
  { key: "lang.spanish",    name: "Spanish" },
  { key: "lang.portuguese", name: "Portuguese" },
  { key: "lang.french",     name: "French" },
  { key: "lang.german",     name: "German" },
  { key: "lang.dutch",      name: "Dutch" },
  { key: "lang.italian",    name: "Italian" },
  { key: "lang.arabic",     name: "Arabic" },
  { key: "lang.afrikaans",  name: "Afrikaans" },
  { key: "lang.zulu",       name: "Zulu" },
  { key: "lang.xhosa",      name: "Xhosa" },
  { key: "lang.farsi",      name: "Farsi" },
  { key: "lang.russian",    name: "Russian" },
  { key: "lang.malay",      name: "Bahasa Malay" },
  { key: "lang.vietnamese", name: "Vietnamese" },
  { key: "lang.tagalog",    name: "Tagalog" },
  { key: "lang.japanese",   name: "Japanese" },
  { key: "lang.cantonese",  name: "Cantonese" },
  { key: "lang.mandarin",   name: "Chinese (Mandarin)" },
];

interface UnlockStatus {
  language: string;
  expiresAt: string;
  expired: boolean;
  daysRemaining: number;
}

export function Navbar() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [unlocks, setUnlocks] = useState<UnlockStatus[]>([]);
  const [unlockModal, setUnlockModal] = useState<{ language: string; isRenewal: boolean; daysRemaining?: number } | null>(null);
  const { user, isRegistered, logout, setPremium, setPremiumLanguage } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [changingLang, setChangingLang] = useState(false);

  const isPremium = user?.plan === "premium";
  const premiumLanguage = user?.premiumLanguage ?? null;

  const fetchUnlocks = useCallback(async () => {
    try {
      const userId = user?.id ? `?userId=${user.id}` : "";
      const res = await fetch(`/api/language-unlock/status${userId}`);
      const data = await res.json() as { unlocks: UnlockStatus[] };
      setUnlocks(data.unlocks ?? []);
    } catch {
      // non-critical
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUnlocks();
    const interval = setInterval(fetchUnlocks, 60_000);
    return () => clearInterval(interval);
  }, [fetchUnlocks]);

  const getUnlockStatus = (lang: string): UnlockStatus | null =>
    unlocks.find(u => u.language === lang) ?? null;

  const isUnlocked = (lang: string): boolean => {
    if (lang === "English") return true;
    if (isPremium && premiumLanguage === lang) return true;
    const u = getUnlockStatus(lang);
    return !!u && !u.expired;
  };

  const handleLanguageClick = (lang: string) => {
    if (lang === "English") { setLanguage(lang); return; }
    if (isPremium && premiumLanguage === lang) { setLanguage(lang); return; }
    const u = getUnlockStatus(lang);
    if (u && !u.expired) {
      setLanguage(lang);
    } else if (u && u.expired) {
      setUnlockModal({ language: lang, isRenewal: true, daysRemaining: 0 });
    } else {
      setUnlockModal({ language: lang, isRenewal: false });
    }
  };

  const handleUnlockSuccess = (lang: string) => {
    fetchUnlocks();
    setLanguage(lang);
    setUnlockModal(null);
  };

  const handlePremiumSuccess = () => {
    setPremium();
    setShowPaymentModal(false);
    if (!premiumLanguage) {
      setShowLangModal(true);
    }
  };

  const PROTECTED = ["/play", "/app", "/invite", "/bee/create"];
  void PROTECTED;

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/how-it-works", label: t("nav.howItWorks") },
    { href: "/articles", label: t("nav.articles") },
    { href: "/play", label: t("nav.play"), protected: true },
    { href: "/app", label: t("nav.app"), protected: true },
    { href: "/invite", label: t("nav.invite"), protected: true },
    { href: "/faq", label: t("nav.faq") },
  ];

  const currentStatus = language !== "English" ? getUnlockStatus(language) : null;
  const isPremiumLang = isPremium && premiumLanguage === language;
  const showRenewalBadge = !isPremiumLang && currentStatus && (currentStatus.expired || currentStatus.daysRemaining <= 7);
  const firstName = user?.name.split(" ")[0] ?? "";

  const langLabel = (lang: string) => {
    if (lang === "English") return <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">{t("common.free")}</span>;
    if (isPremium && premiumLanguage === lang) return <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold">{t("nav.included")}</span>;
    const u = getUnlockStatus(lang);
    if (!u || u.expired) return <span className="text-[10px] bg-blue-500/10 text-blue-600 px-1.5 py-0.5 rounded-full font-semibold">$2</span>;
    if (u.daysRemaining <= 7) return <span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{u.daysRemaining}d</span>;
    return <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">{u.daysRemaining}d</span>;
  };

  const dropdownLabel = isPremium
    ? t("nav.languageDropdownPremium", { lang: premiumLanguage ?? "1 language" })
    : t("nav.languageDropdownFree");

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tighter text-primary hover:opacity-80 transition-opacity">{t("common.appName")}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all hover:text-primary hover:scale-105 flex items-center gap-1 ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {link.protected && !isRegistered && (
                  <Lock className="h-2.5 w-2.5 opacity-50" />
                )}
              </Link>
            ))}

            {/* Bee dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`text-sm font-medium transition-all hover:text-primary hover:scale-105 flex items-center gap-1 ${
                    ["/bee/create", "/bee/tournament/create", "/bee/stats", "/bee/world-championship"].includes(location)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {t("nav.bee")}
                  {!isRegistered && <Lock className="h-2.5 w-2.5 opacity-50" />}
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  {t("nav.spellingBee")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bee/create" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🐝</span>
                    <span>{t("nav.newContest")}</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bee/tournament/create" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🏆</span>
                    <span>{t("nav.tournament")}</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bee/stats" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">📊</span>
                    <span>{t("nav.myStats")}</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/leaderboard" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🏅</span>
                    <span>{t("nav.rankings")}</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bee/world-championship" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🌍</span>
                    <span>{t("nav.worldChampionship")}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Renewal alert badge */}
            {showRenewalBadge && (
              <button
                onClick={() => setUnlockModal({ language, isRenewal: true, daysRemaining: currentStatus!.daysRemaining })}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-600 text-xs font-bold hover:bg-amber-500/20 hover:scale-105 transition-all"
              >
                <AlertTriangle className="h-3 w-3" />
                {currentStatus!.expired
                  ? t("nav.expiredBadge", { lang: language })
                  : t("nav.expiresInDays", { lang: language, days: currentStatus!.daysRemaining })}
              </button>
            )}

            {/* Language picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative" title={t("nav.languageLabel")}>
                  <Globe className="h-4 w-4" />
                  {showRenewalBadge && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-background" />
                  )}
                  <span className="sr-only">{t("nav.languageLabel")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[360px] overflow-y-auto w-60">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal pb-1">
                  {dropdownLabel}
                </DropdownMenuLabel>
                {isPremium && (
                  <DropdownMenuItem
                    onClick={() => { setChangingLang(true); setShowLangModal(true); }}
                    className="text-xs text-primary cursor-pointer font-semibold flex items-center gap-1.5"
                  >
                    <Globe className="h-3 w-3" />
                    {t("nav.changeIncludedLanguage")}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {LANGUAGE_DATA.map(({ name: lang, key: langKey }) => {
                  const unlocked = isUnlocked(lang);
                  const isActive = language === lang;
                  const isIncluded = isPremium && premiumLanguage === lang;
                  return (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => handleLanguageClick(lang)}
                      className={`flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                        isActive ? "bg-primary/10 text-primary font-bold" : ""
                      } ${!unlocked && lang !== "English" ? "opacity-70" : ""}`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />}
                        {!isActive && !unlocked && lang !== "English" && !isIncluded && (
                          <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        )}
                        {!isActive && (unlocked || isIncluded) && <span className="w-3.5" />}
                        <span className="text-sm">{t(langKey)}</span>
                      </span>
                      {langLabel(lang)}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User area */}
            {isRegistered ? (
              <div className="flex items-center gap-2">
                {isPremium ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/25">
                    <Crown className="h-3 w-3" />
                    {t("nav.premiumBadge")}
                  </span>
                ) : (
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    title={t("nav.upgradeAction")}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    {t("common.free")}
                  </button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-semibold">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-black flex items-center justify-center">
                        {firstName[0]?.toUpperCase()}
                      </span>
                      {firstName}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                      {user?.email}
                    </DropdownMenuLabel>
                    {isPremium && premiumLanguage && (
                      <DropdownMenuLabel className="font-normal text-xs text-muted-foreground -mt-1">
                        {t("nav.languagesLabel", { lang: premiumLanguage })}
                      </DropdownMenuLabel>
                    )}
                    {isPremium && !premiumLanguage && (
                      <DropdownMenuLabel className="font-normal text-xs text-amber-600 -mt-1">
                        {t("nav.noSecondLanguage")}
                      </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    {isPremium && (
                      <DropdownMenuItem
                        onClick={() => { setChangingLang(true); setShowLangModal(true); }}
                        className="flex items-center gap-2 cursor-pointer text-primary font-semibold"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        {premiumLanguage ? t("nav.changeIncludedLanguage") : t("nav.chooseIncludedLanguage")}
                      </DropdownMenuItem>
                    )}
                    {!isPremium && (
                      <DropdownMenuItem
                        onClick={() => setShowPaymentModal(true)}
                        className="flex items-center gap-2 cursor-pointer text-primary font-semibold"
                      >
                        <Crown className="h-3.5 w-3.5" />
                        {t("nav.upgradeAction")}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-destructive"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      {t("nav.signOut")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <button
                  onClick={logout}
                  title={t("nav.signOut")}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/signin">
                <Button variant="default" className="bg-primary text-primary-foreground font-bold tracking-tight">
                  {t("common.signIn")}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-6">
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-2xl tracking-tighter text-primary">{t("common.appName")}</span>
                  {isRegistered && (
                    <div className="flex items-center gap-2">
                      {isPremium ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25">
                          <Crown className="h-3 w-3" />{t("nav.premiumBadge")}
                        </span>
                      ) : (
                        <button
                          onClick={() => { setShowPaymentModal(true); setIsOpen(false); }}
                          className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          <Crown className="h-2.5 w-2.5" />
                          {t("nav.upgradeAction")}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isRegistered && (
                  <div className="flex items-center gap-2 -mt-2 pb-2 border-b border-border">
                    <span className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-black flex items-center justify-center flex-shrink-0">
                      {firstName[0]?.toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      {isPremium && (
                        <p className="text-xs text-primary font-medium truncate">
                          English{premiumLanguage ? ` + ${premiumLanguage}` : ` + (${t("nav.chooseIncludedLanguage")})`}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      title={t("nav.signOut")}
                      className="flex-shrink-0 p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-all hover:text-primary hover:translate-x-1 flex items-center gap-2 ${
                        location === link.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      {link.protected && !isRegistered && (
                        <Lock className="h-3.5 w-3.5 opacity-50" />
                      )}
                    </Link>
                  ))}

                  {/* Spelling Bee section */}
                  <div className="border-t border-border pt-3 space-y-3">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">{t("nav.spellingBee")}</p>
                    {[
                      { href: "/bee/create", label: `🐝 ${t("nav.newContest")}`, protected: true },
                      { href: "/bee/tournament/create", label: `🏆 ${t("nav.tournament")}`, protected: true },
                      { href: "/bee/stats", label: `📊 ${t("nav.myStats")}`, protected: true },
                      { href: "/leaderboard", label: `🏅 ${t("nav.rankings")}`, protected: true },
                      { href: "/bee/world-championship", label: `🌍 ${t("nav.worldChampionship")}`, protected: false },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium transition-all hover:text-primary hover:translate-x-1 flex items-center gap-2 ${
                          location === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                        {link.protected && !isRegistered && (
                          <Lock className="h-3.5 w-3.5 opacity-50" />
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile language section */}
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">{t("nav.languagesHeader")}</p>
                      {isPremium && (
                        <button
                          onClick={() => { setChangingLang(true); setShowLangModal(true); setIsOpen(false); }}
                          className="text-xs text-primary font-semibold flex items-center gap-1"
                        >
                          <Globe className="h-3 w-3" />
                          {premiumLanguage ? t("nav.changeIncludedLanguage") : t("nav.chooseIncludedLanguage")}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {LANGUAGE_DATA.map(({ name: lang, key: langKey }) => {
                        const unlocked = isUnlocked(lang);
                        const isActive = language === lang;
                        const isIncluded = isPremium && premiumLanguage === lang;
                        const c = langColor(lang);
                        return (
                          <button
                            key={langKey}
                            onClick={() => { handleLanguageClick(lang); setIsOpen(false); }}
                            className={`flex items-center justify-between gap-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all hover:scale-[1.02] ${c.bg} ${c.text} ${c.border} ${
                              isActive ? "ring-2 ring-offset-1 ring-current/30 opacity-100" : "opacity-70 hover:opacity-100"
                            }`}
                          >
                            <span className="truncate text-xs">{t(langKey)}</span>
                            <span className="flex-shrink-0">
                              {isActive ? <CheckCircle2 className="h-3 w-3" /> : !unlocked && !isIncluded && lang !== "English" ? <Lock className="h-3 w-3 opacity-50" /> : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {!isRegistered && (
                    <div className="border-t border-border pt-4 flex flex-col gap-3">
                      <Link href="/signin" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">{t("common.signIn")}</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {unlockModal && (
          <LanguageUnlockModal
            language={unlockModal.language}
            isRenewal={unlockModal.isRenewal}
            daysRemaining={unlockModal.daysRemaining}
            onClose={() => setUnlockModal(null)}
            onSuccess={handleUnlockSuccess}
          />
        )}
      </AnimatePresence>

      {showPaymentModal && user && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePremiumSuccess}
          userEmail={user.email}
          userName={user.name}
        />
      )}

      {showLangModal && (
        <PremiumLanguageModal
          isChange={changingLang}
          onClose={async () => {
            // After the modal saves internally, sync the selected language
            const updated = user?.premiumLanguage;
            if (updated) setLanguage(updated);
            setShowLangModal(false);
            setChangingLang(false);
          }}
        />
      )}
    </>
  );
}
