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
import { Globe, Menu, Lock, CheckCircle2, AlertTriangle, Clock, LogOut, Crown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence } from "framer-motion";
import { LanguageUnlockModal } from "@/components/LanguageUnlockModal";
import { PaymentModal } from "@/components/PaymentModal";
import { useAuth } from "@/context/AuthContext";

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
  const { user, isRegistered, logout, setPremium } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fetchUnlocks = useCallback(async () => {
    try {
      const res = await fetch("/api/language-unlock/status");
      const data = await res.json() as { unlocks: UnlockStatus[] };
      setUnlocks(data.unlocks ?? []);
    } catch {
      // non-critical — silently ignore
    }
  }, []);

  useEffect(() => {
    fetchUnlocks();
    const interval = setInterval(fetchUnlocks, 60_000);
    return () => clearInterval(interval);
  }, [fetchUnlocks]);

  const getUnlockStatus = (lang: string): UnlockStatus | null =>
    unlocks.find(u => u.language === lang) ?? null;

  const isUnlocked = (lang: string): boolean => {
    if (lang === "English") return true;
    const u = getUnlockStatus(lang);
    return !!u && !u.expired;
  };

  const handleLanguageClick = (lang: string) => {
    if (lang === "English") { setLanguage(lang); return; }
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

  const PROTECTED = ["/play", "/app", "/invite", "/bee/create"];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/articles", label: "Articles" },
    { href: "/play", label: "Play", protected: true },
    { href: "/app", label: "App", protected: true },
    { href: "/bee/create", label: "🐝 Bee", protected: true },
    { href: "/bee/tournament/create", label: "🏆 Tourney", protected: true },
    { href: "/bee/stats", label: "📊 Stats", protected: true },
    { href: "/leaderboard", label: "Rankings" },
    { href: "/bee/world-championship", label: "🌍 Worlds" },
    { href: "/invite", label: "Invite", protected: true },
    { href: "/faq", label: "FAQ" },
  ];

  const currentStatus = language !== "English" ? getUnlockStatus(language) : null;
  const showRenewalBadge = currentStatus && (currentStatus.expired || currentStatus.daysRemaining <= 7);
  const firstName = user?.name.split(" ")[0] ?? "";
  const isPremium = user?.plan === "premium";

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
              <DropdownMenuContent align="end" className="max-h-[340px] overflow-y-auto w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal pb-1">
                  Free: English · Others $2 / 60 days
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {LANGUAGES.map((lang) => {
                  const unlocked = isUnlocked(lang);
                  const status = lang !== "English" ? getUnlockStatus(lang) : null;
                  const isActive = language === lang;
                  const nearExpiry = status && !status.expired && status.daysRemaining <= 7;
                  const expired = status?.expired;
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
                        {!isActive && !unlocked && lang !== "English" && (
                          <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        )}
                        {!isActive && unlocked && <span className="w-3.5" />}
                        <span className="text-sm">{lang}</span>
                      </span>
                      {lang === "English" && (
                        <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">Free</span>
                      )}
                      {lang !== "English" && !unlocked && !expired && (
                        <span className="text-[10px] bg-blue-500/10 text-blue-600 px-1.5 py-0.5 rounded-full font-semibold">$2</span>
                      )}
                      {lang !== "English" && expired && (
                        <span className="text-[10px] bg-red-500/10 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">Expired</span>
                      )}
                      {lang !== "English" && nearExpiry && (
                        <span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />{status!.daysRemaining}d
                        </span>
                      )}
                      {lang !== "English" && unlocked && !nearExpiry && (
                        <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">
                          {status!.daysRemaining}d
                        </span>
                      )}
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
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                      {user?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
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
              <Link href="/premium">
                <Button variant="default" className="bg-primary text-primary-foreground font-bold tracking-tight">
                  Get Premium
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

                  {/* Mobile language section */}
                  <div className="border-t border-border pt-4 space-y-2">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Language</p>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {LANGUAGES.map((lang) => {
                        const unlocked = isUnlocked(lang);
                        const isActive = language === lang;
                        return (
                          <button
                            key={lang}
                            onClick={() => { handleLanguageClick(lang); setIsOpen(false); }}
                            className={`flex items-center justify-between gap-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all hover:scale-[1.02] ${
                              isActive
                                ? "bg-primary/10 border-primary/30 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
                            }`}
                          >
                            <span className="truncate">{lang}</span>
                            {!unlocked && lang !== "English" && <Lock className="h-3 w-3 flex-shrink-0 text-muted-foreground" />}
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
                    <Link href="/premium" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-2 bg-primary text-primary-foreground font-bold">
                        Get Premium
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
            onSuccess={() => { setPremium(); setShowPaymentModal(false); }}
            userEmail={user.email}
            userName={user.name}
          />
        )}
      </AnimatePresence>
    </>
  );
}
