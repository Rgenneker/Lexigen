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

const LANGUAGES = [
  "English", "Spanish", "Portuguese", "French", "German", "Dutch",
  "Italian", "Arabic", "Afrikaans", "Zulu", "Xhosa", "Farsi",
  "Russian", "Bahasa Malay", "Vietnamese", "Tagalog", "Japanese",
  "Cantonese", "Chinese (Mandarin)",
];

interface UnlockStatus {
  language: string;
  expiresAt: string;
  expired: boolean;
  daysRemaining: number;
}

export function Navbar() {
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

  /** A language is unlocked if:
   *  - it's English (always free)
   *  - it's the user's included premium language
   *  - the user has a paid 60-day unlock for it
   */
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

  /** Called when premium upgrade completes */
  const handlePremiumSuccess = () => {
    setPremium();
    setShowPaymentModal(false);
    // If no premium language chosen yet, open the picker
    if (!premiumLanguage) {
      setShowLangModal(true);
    }
  };

  const PROTECTED = ["/play", "/app", "/invite", "/bee/create"];
  void PROTECTED;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/articles", label: "Articles" },
    { href: "/play", label: "Play", protected: true },
    { href: "/app", label: "App", protected: true },
    { href: "/invite", label: "Invite", protected: true },
    { href: "/faq", label: "FAQ" },
  ];

  const currentStatus = language !== "English" ? getUnlockStatus(language) : null;
  const isPremiumLang = isPremium && premiumLanguage === language;
  const showRenewalBadge = !isPremiumLang && currentStatus && (currentStatus.expired || currentStatus.daysRemaining <= 7);
  const firstName = user?.name.split(" ")[0] ?? "";

  const langLabel = (lang: string) => {
    if (lang === "English") return <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">Free</span>;
    if (isPremium && premiumLanguage === lang) return <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold">Included</span>;
    const u = getUnlockStatus(lang);
    if (!u || u.expired) return <span className="text-[10px] bg-blue-500/10 text-blue-600 px-1.5 py-0.5 rounded-full font-semibold">$2</span>;
    if (u.daysRemaining <= 7) return <span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{u.daysRemaining}d</span>;
    return <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">{u.daysRemaining}d</span>;
  };

  const dropdownLabel = isPremium
    ? `English + ${premiumLanguage ?? "1 language"} · Others $2`
    : "Free: English · Others $2 / 60 days";

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tighter text-primary hover:opacity-80 transition-opacity">LEXIGENZ</span>
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
                  🐝 Bee
                  {!isRegistered && <Lock className="h-2.5 w-2.5 opacity-50" />}
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  Spelling Bee
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bee/create" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🐝</span>
                    <span>New Contest</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bee/tournament/create" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🏆</span>
                    <span>Tournament</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bee/stats" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">📊</span>
                    <span>My Stats</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/leaderboard" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🏅</span>
                    <span>Rankings</span>
                    {!isRegistered && <Lock className="h-3 w-3 ml-auto opacity-40" />}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bee/world-championship" className="flex items-center gap-2 cursor-pointer w-full">
                    <span className="text-base leading-none">🌍</span>
                    <span>World Championship</span>
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
                {currentStatus!.expired ? `${language} expired` : `${language}: ${currentStatus!.daysRemaining}d left`}
              </button>
            )}

            {/* Language picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative" title="Switch language">
                  <Globe className="h-4 w-4" />
                  {showRenewalBadge && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-background" />
                  )}
                  <span className="sr-only">Select language</span>
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
                    Change included language
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {LANGUAGES.map((lang) => {
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
                        <span className="text-sm">{lang}</span>
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
                {/* Plan badge */}
                {isPremium ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/25">
                    <Crown className="h-3 w-3" />
                    Premium
                  </span>
                ) : (
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    title="Upgrade to Premium"
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    Free
                  </button>
                )}

                {/* User name + logout dropdown */}
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
                        Languages: English + {premiumLanguage}
                      </DropdownMenuLabel>
                    )}
                    {isPremium && !premiumLanguage && (
                      <DropdownMenuLabel className="font-normal text-xs text-amber-600 -mt-1">
                        No 2nd language chosen yet
                      </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    {isPremium && (
                      <DropdownMenuItem
                        onClick={() => { setChangingLang(true); setShowLangModal(true); }}
                        className="flex items-center gap-2 cursor-pointer text-primary font-semibold"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        {premiumLanguage ? "Change included language" : "Choose included language"}
                      </DropdownMenuItem>
                    )}
                    {!isPremium && (
                      <DropdownMenuItem
                        onClick={() => setShowPaymentModal(true)}
                        className="flex items-center gap-2 cursor-pointer text-primary font-semibold"
                      >
                        <Crown className="h-3.5 w-3.5" />
                        Upgrade to Premium
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-destructive"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Quick sign-out button */}
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/signin">
                <Button variant="default" className="bg-primary text-primary-foreground font-bold tracking-tight">
                  Sign In
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
                  <span className="font-bold text-2xl tracking-tighter text-primary">LEXIGENZ</span>
                  {isRegistered && (
                    <div className="flex items-center gap-2">
                      {isPremium ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25">
                          <Crown className="h-3 w-3" />Premium
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                          Free
                        </span>
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
                          English{premiumLanguage ? ` + ${premiumLanguage}` : " + (pick a 2nd language)"}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      title="Sign out"
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
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Spelling Bee</p>
                    {[
                      { href: "/bee/create", label: "🐝 New Contest", protected: true },
                      { href: "/bee/tournament/create", label: "🏆 Tournament", protected: true },
                      { href: "/bee/stats", label: "📊 My Stats", protected: true },
                      { href: "/leaderboard", label: "🏅 Rankings", protected: true },
                      { href: "/bee/world-championship", label: "🌍 World Championship", protected: false },
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
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Language</p>
                      {isPremium && (
                        <button
                          onClick={() => { setChangingLang(true); setShowLangModal(true); setIsOpen(false); }}
                          className="text-xs text-primary font-semibold flex items-center gap-1"
                        >
                          <Globe className="h-3 w-3" />
                          {premiumLanguage ? "Change" : "Choose language"}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {LANGUAGES.map((lang) => {
                        const unlocked = isUnlocked(lang);
                        const isActive = language === lang;
                        const isIncluded = isPremium && premiumLanguage === lang;
                        const c = langColor(lang);
                        return (
                          <button
                            key={lang}
                            onClick={() => { handleLanguageClick(lang); setIsOpen(false); }}
                            className={`flex items-center justify-between gap-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all hover:scale-[1.02] ${c.bg} ${c.text} ${c.border} ${
                              isActive ? "ring-2 ring-offset-1 ring-current/30 opacity-100" : "opacity-70 hover:opacity-100"
                            }`}
                          >
                            <span className="truncate">{lang}</span>
                            {isIncluded && <Crown className="h-3 w-3 flex-shrink-0 opacity-80" />}
                            {!unlocked && !isIncluded && lang !== "English" && <Lock className="h-3 w-3 flex-shrink-0 opacity-50" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isRegistered ? (
                    <div className="space-y-2 pt-2 border-t border-border">
                      {!isPremium && (
                        <Button
                          className="w-full bg-primary text-primary-foreground font-bold"
                          onClick={() => { setShowPaymentModal(true); setIsOpen(false); }}
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Premium
                        </Button>
                      )}
                      {isPremium && !premiumLanguage && (
                        <Button
                          className="w-full bg-primary/10 text-primary border border-primary/30 font-bold"
                          variant="outline"
                          onClick={() => { setChangingLang(false); setShowLangModal(true); setIsOpen(false); }}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Choose your included language
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => { logout(); setIsOpen(false); }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </Button>
                    </div>
                  ) : (
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-2 bg-primary text-primary-foreground font-bold">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Language Unlock Modal */}
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

      {/* Premium Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && user && (
          <PaymentModal
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePremiumSuccess}
            userEmail={user.email}
            userName={user.name}
          />
        )}
      </AnimatePresence>

      {/* Premium Language Picker Modal */}
      <AnimatePresence>
        {showLangModal && (
          <PremiumLanguageModal
            isChange={changingLang}
            onClose={() => { setShowLangModal(false); setChangingLang(false); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
