import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import AdsterraAd from "@/components/AdsterraAd";
import { FreemiumModal } from "@/components/FreemiumModal";
import { PaymentModal } from "@/components/PaymentModal";
import { useAuth } from "@/context/AuthContext";
import { InteractiveCategoryBrowser } from "@/components/InteractiveCategoryBrowser";
import { BENEFIT_EXPANDED } from "@/data/benefit-expanded";
import { langColor } from "@/data/language-colors";

import {
  Brain, Flame, Gamepad2, Globe, BookOpen, Zap, Star,
  TrendingUp, Users, Clock, CheckCircle2, ChevronRight,
  Trophy, Sparkles, Target, BarChart3, Lock, ChevronDown,
} from "lucide-react";

const HOME_BROWSE_CATEGORIES = [
  {
    id: "emotions",
    labelKey: "play.categoryEmotions",
    label: "Emotion vocabulary",
    words: ["joy","sorrow","anger","fear","surprise","disgust","trust","anticipation","melancholy","elated","anxious","serene","frustrated","euphoric","despondent","apprehensive","jubilant","forlorn","exhilarated","dejected","resentful","compassion","empathy","nostalgia","gratitude","remorse","envy","pride","shame","awe","contempt","longing","tranquil","agitated","ecstatic","wistful","indignant","content","bewildered","optimistic","grief","admiration","regret","tenderness","anguish","serenity","elation","dread","hope","affection"],
  },
  {
    id: "business",
    labelKey: "play.categoryBusiness",
    label: "Business vocabulary",
    words: ["accountability","acquisition","agility","analytics","benchmark","capital","catalyst","collaborate","competitive","compliance","deliverable","differentiation","disruptive","ecosystem","efficiency","engagement","entrepreneur","equity","execution","forecast","framework","governance","growth","implementation","incentive","innovation","leadership","leverage","margin","metrics","milestone","monetize","negotiation","optimization","performance","pipeline","portfolio","productivity","profitability","revenue","roadmap","scalability","stakeholder","strategy","sustainability","synergy","traction","transformation","transparency","venture"],
  },
  {
    id: "academic",
    labelKey: "play.categoryAcademic",
    label: "Academic words",
    words: ["abstract","analysis","annotation","argument","assertion","bibliography","causation","citation","classification","coherence","commentary","conceptual","conclusion","contradiction","critical","critique","deduction","dialectic","discourse","empirical","epistemology","evaluate","evidence","exemplify","extrapolate","fallacy","generalization","hypothesis","implication","inductive","inference","interpretation","juxtaposition","methodology","narrative","ontology","paradigm","pedagogy","perspective","phenomenon","philosophy","premise","rationale","refute","rhetoric","synthesis","theoretical","thesis","variable","verification"],
  },
  {
    id: "advanced",
    labelKey: "play.categoryAdvanced",
    label: "Advanced English",
    words: ["aberrant","abeyance","abstruse","acrimony","acumen","alacrity","ameliorate","anomalous","apathy","aplomb","arduous","astute","austere","belligerent","byzantine","callous","capricious","cogent","convoluted","copious","corroborate","culpable","cynical","dearth","debilitate","diligent","discern","disparate","equanimity","erudite","esoteric","fastidious","fortitude","garrulous","grandiloquent","hapless","hegemony","hubris","iconoclast","immutable","implacable","indefatigable","insidious","intractable","laconic","loquacious","magnanimous","mendacity","mercurial","meticulous","obtuse","onerous","ostracize","parsimony","pedantic","perspicacious","pragmatic","querulous","recalcitrant","reticent","sagacious","sardonic","sycophant","taciturn","tenacious","ubiquitous","vacillate","vehement","venerable","verbose"],
  },
];

const ARCHETYPES = [
  { emoji: "✨", nameKey: "home.archetypeVisionary", styleKey: "home.archetypeVisionaryStyle" },
  { emoji: "🌸", nameKey: "home.archetypeNurturer", styleKey: "home.archetypeNurturerStyle" },
  { emoji: "🗺", nameKey: "home.archetypeExplorer", styleKey: "home.archetypeExplorerStyle" },
  { emoji: "📚", nameKey: "home.archetypeSage", styleKey: "home.archetypeSageStyle" },
  { emoji: "🎨", nameKey: "home.archetypeCreator", styleKey: "home.archetypeCreatorStyle" },
  { emoji: "🛡", nameKey: "home.archetypeGuardian", styleKey: "home.archetypeGuardianStyle" },
  { emoji: "⚡", nameKey: "home.archetypeRebel", styleKey: "home.archetypeRebelStyle" },
  { emoji: "🤝", nameKey: "home.archetypeDiplomat", styleKey: "home.archetypeDiplomatStyle" },
  { emoji: "🏆", nameKey: "home.archetypeAchiever", styleKey: "home.archetypeAchieverStyle" },
  { emoji: "🌙", nameKey: "home.archetypeMystic", styleKey: "home.archetypeMysticStyle" },
  { emoji: "🦋", nameKey: "home.archetypeMaverick", styleKey: "home.archetypeMaverickStyle" },
  { emoji: "🎵", nameKey: "home.archetypeHarmonizer", styleKey: "home.archetypeHarmonizerStyle" },
];

const LANGUAGE_DATA = [
  { key: "lang.english",    name: "English" },
  { key: "lang.afrikaans",  name: "Afrikaans" },
  { key: "lang.zulu",       name: "Zulu" },
  { key: "lang.xhosa",      name: "Xhosa" },
  { key: "lang.french",     name: "French" },
  { key: "lang.spanish",    name: "Spanish" },
  { key: "lang.portuguese", name: "Portuguese" },
  { key: "lang.german",     name: "German" },
  { key: "lang.dutch",      name: "Dutch" },
  { key: "lang.italian",    name: "Italian" },
  { key: "lang.arabic",     name: "Arabic" },
  { key: "lang.farsi",      name: "Farsi" },
  { key: "lang.russian",    name: "Russian" },
  { key: "lang.malay",      name: "Bahasa Malay" },
  { key: "lang.vietnamese", name: "Vietnamese" },
  { key: "lang.tagalog",    name: "Tagalog" },
  { key: "lang.japanese",   name: "Japanese" },
  { key: "lang.cantonese",  name: "Cantonese" },
  { key: "lang.mandarin",   name: "Chinese (Mandarin)" },
];

export default function Home() {
  const { t } = useTranslation();

  const HOW_IT_WORKS = [
    {
      step: "01",
      icon: Brain,
      title: t("home.howStep1Title"),
      desc: t("home.howStep1Desc"),
    },
    {
      step: "02",
      icon: Sparkles,
      title: t("home.howStep2Title"),
      desc: t("home.howStep2Desc"),
    },
    {
      step: "03",
      icon: BookOpen,
      title: t("home.howStep3Title"),
      desc: t("home.howStep3Desc"),
    },
    {
      step: "04",
      icon: Gamepad2,
      title: t("home.howStep4Title"),
      desc: t("home.howStep4Desc"),
    },
    {
      step: "05",
      icon: Flame,
      title: t("home.howStep5Title"),
      desc: t("home.howStep5Desc"),
    },
  ];

  const BENEFITS = [
    {
      icon: Brain,
      title: t("home.benefitVocabTitle"),
      desc: t("home.benefitVocabDesc"),
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      icon: Target,
      title: t("home.benefitPersonalTitle"),
      desc: t("home.benefitPersonalDesc"),
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      icon: Globe,
      title: t("home.benefit19LangTitle"),
      desc: t("home.benefit19LangDesc"),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Flame,
      title: t("home.benefitStreakTitle"),
      desc: t("home.benefitStreakDesc"),
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: Gamepad2,
      title: t("home.benefitGamesTitle"),
      desc: t("home.benefitGamesDesc"),
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: BookOpen,
      title: t("home.benefitJournalTitle"),
      desc: t("home.benefitJournalDesc"),
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
    },
    {
      icon: TrendingUp,
      title: t("home.benefitProgressTitle"),
      desc: t("home.benefitProgressDesc"),
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Users,
      title: t("home.benefitSocialTitle"),
      desc: t("home.benefitSocialDesc"),
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  const STATS = [
    { value: "19", label: t("home.statsLanguages") },
    { value: "6", label: t("home.statsGames") },
    { value: "12", label: t("home.statsArchetypes") },
    { value: "365", label: t("home.statsDays") },
  ];

  const [showFreemium, setShowFreemium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);
  const benefitExpandedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expandedBenefit && benefitExpandedRef.current) {
      setTimeout(() => {
        benefitExpandedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [expandedBenefit]);
  const { user, isRegistered, setPremium } = useAuth();
  const isPremium = user?.plan === "premium";
  const [, navigate] = useLocation();

  const handleGetPremium = () => {
    if (isRegistered && !isPremium) {
      setShowPaymentModal(true);
    } else if (!isRegistered) {
      navigate("/premium");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdsterraAd />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-32 flex-1 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        <div className="container px-4 mx-auto text-center space-y-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              {t("home.heroTitle")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t("home.heroTitleHighlight")}</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t("home.heroSubtitle")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" onClick={() => !isRegistered && setShowFreemium(true)} disabled={isRegistered} className={`h-14 px-8 text-lg font-bold rounded-full border-2 transition-all ${isRegistered ? "border-muted text-muted-foreground opacity-50 cursor-not-allowed" : "border-green-500 text-green-600 hover:bg-green-500/10 hover:scale-105"}`}>
              {t("home.registerFreeBtn")}
            </Button>
            {isRegistered ? (
              <Button size="lg" disabled className="h-14 px-8 text-lg font-bold rounded-full opacity-50 cursor-not-allowed">
                {t("common.signIn")}
              </Button>
            ) : (
              <Link href="/signin">
                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                  {t("common.signIn")}
                </Button>
              </Link>
            )}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }} className="text-xs text-muted-foreground">
            {t("home.noCard")}
          </motion.p>
        </div>

        {/* Animated word demo */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-20 w-full max-w-3xl mx-auto px-4">
          <div className="aspect-[16/9] rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden flex items-center justify-center">
            <div className="text-center space-y-4">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-4xl md:text-5xl font-mono font-bold text-primary">
                {t("home.demoWord")}
              </motion.div>
              <p className="text-muted-foreground font-mono text-sm md:text-base">{t("home.demoDef")}</p>
              <p className="text-xs text-muted-foreground italic">{t("home.demoSentence")}</p>
              <div className="flex justify-center gap-2 pt-4">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold uppercase">{t("home.demoStreak")}</span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase">{t("home.demoArchetype")}</span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold">{t("home.demoLang")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <p className="text-4xl font-black text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is Lexigenz ── */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("home.whatTitle")}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6">{t("home.whatHeading")} <em>{t("home.whatHeadingItalic")}</em></h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("home.whatSubtitle")}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 text-muted-foreground leading-relaxed">
              <p>{t("home.whatBody1")}</p>
              <p>{t("home.whatBody2")}</p>
              <p>{t("home.whatBody3")}</p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="outline" className="rounded-full gap-2">
                    {t("home.readFullStory")} <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {[
                { icon: CheckCircle2, text: t("home.whatFeature1") },
                { icon: CheckCircle2, text: t("home.whatFeature2") },
                { icon: CheckCircle2, text: t("home.whatFeature3") },
                { icon: CheckCircle2, text: t("home.whatFeature4") },
                { icon: CheckCircle2, text: t("home.whatFeature5") },
                { icon: CheckCircle2, text: t("home.whatFeature6") },
                { icon: CheckCircle2, text: t("home.whatFeature7") },
                { icon: CheckCircle2, text: t("home.whatFeature8") },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-card">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("home.howTitle")}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">{t("home.howHeading")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.howSubtitle")}</p>
          </motion.div>
          <div className="space-y-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black text-primary/60 tracking-widest">{t("home.step")} {item.step}</span>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── World Spelling Bee Championship promo ── */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0533] via-[#2d0a5e] to-[#0f1a4a] text-white shadow-2xl"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative px-8 py-12 md:px-16 md:py-14 flex flex-col md:flex-row items-center gap-10">
              {/* Left: content */}
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                  <Trophy className="w-3.5 h-3.5" /> {t("home.annualEvent")}
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  {t("home.worldChampTitle")}<br />
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                    {t("home.worldChampSubtitle")}
                  </span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                  {t("home.worldChampDesc")}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {[
                    { icon: "📅", text: t("home.worldChampDate") },
                    { icon: "🌍", text: t("home.worldChampCountries") },
                    { icon: "🏆", text: t("home.worldChampHall") },
                  ].map((f) => (
                    <span key={f.text} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 font-medium">
                      {f.icon} {f.text}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/bee/world-championship">
                    <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold shadow-lg shadow-violet-500/30 gap-2 px-6 h-12">
                      <Sparkles className="w-4 h-4" /> {t("home.register2027")}
                    </Button>
                  </Link>
                  <Link href="/leaderboard">
                    <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 gap-1.5 h-12">
                      {t("home.viewRankings")} <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: countdown blocks */}
              <div className="shrink-0 flex flex-col items-center gap-4">
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">{t("home.countdownTitle")}</p>
                <div className="grid grid-cols-4 gap-3">
                  {(() => {
                    const target = new Date("2027-06-19T12:00:00Z").getTime();
                    const diff = Math.max(0, target - Date.now());
                    const d = Math.floor(diff / 86400000);
                    const h = Math.floor((diff % 86400000) / 3600000);
                    const m = Math.floor((diff % 3600000) / 60000);
                    const s = Math.floor((diff % 60000) / 1000);
                    return [
                      { n: d, label: t("home.countdownDays") },
                      { n: h, label: t("home.countdownHrs") },
                      { n: m, label: t("home.countdownMin") },
                      { n: s, label: t("home.countdownSec") },
                    ].map(({ n, label }) => (
                      <div key={label} className="flex flex-col items-center bg-white/10 rounded-2xl px-4 py-4 min-w-[64px]">
                        <span className="text-3xl font-black tabular-nums text-violet-200">{String(n).padStart(2, "0")}</span>
                        <span className="text-[9px] font-bold text-white/40 tracking-widest mt-1">{label}</span>
                      </div>
                    ));
                  })()}
                </div>
                <p className="text-white/40 text-[11px]">{t("home.worldChampDate")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("home.whyTitle")}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">{t("home.whyHeading")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.whySubtitle")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => {
              const isOpen = expandedBenefit === b.title;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  onClick={() => setExpandedBenefit(isOpen ? null : b.title)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isOpen
                      ? "border-primary/60 bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center mb-4`}>
                    <b.icon className={`h-5 w-5 ${b.color}`} />
                  </div>
                  <h3 className="font-bold mb-2 text-sm">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  <div className={`mt-3 flex items-center gap-1 text-xs font-medium transition-colors ${isOpen ? "text-primary" : "text-muted-foreground/60"}`}>
                    <span>{isOpen ? t("common.close") : t("common.readMore")}</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {expandedBenefit && (() => {
              const expanded = BENEFIT_EXPANDED.find(e => e.id === expandedBenefit);
              const benefit = BENEFITS.find(b => b.title === expandedBenefit);
              if (!expanded || !benefit) return null;
              return (
                <motion.div
                  ref={benefitExpandedRef}
                  key={expandedBenefit}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 rounded-2xl border border-primary/20 bg-card p-8 md:p-12"
                >
                  <div className="flex items-start justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${benefit.bg} flex items-center justify-center flex-shrink-0`}>
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{t("home.eightReasons")}</p>
                        <h3 className="text-2xl md:text-3xl font-black">{benefit.title}</h3>
                      </div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setExpandedBenefit(null); }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-1 px-3 py-1.5 rounded-lg hover:bg-muted"
                    >
                      {t("common.close")}
                    </button>
                  </div>

                  <div className="space-y-10">
                    {expanded.reasons.map((reason, idx) => (
                      <div key={idx} className="flex gap-5">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${benefit.bg} flex items-center justify-center text-xs font-black ${benefit.color}`}>
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-base mb-2 leading-snug">{reason.heading}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{reason.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>


      {/* ── Archetypes ── */}
      <section className="py-24 bg-card">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("home.archetypeLabel")}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">{t("home.archetypeHeading")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.archetypeSubtitle")}</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ARCHETYPES.map((a, i) => (
              <motion.div
                key={a.nameKey}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="p-4 rounded-2xl border border-border bg-background text-center hover:border-primary/30 hover:shadow-md transition-all cursor-default"
              >
                <div className="text-3xl mb-2">{a.emoji}</div>
                <p className="font-bold text-sm">{t(a.nameKey)}</p>
                <p className="text-xs text-muted-foreground mt-1">{t(a.styleKey)}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/app">
              <Button className="rounded-full gap-2 bg-primary">
                {t("home.archetypeDiscover")} <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 19 Languages ── */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("home.langSectionLabel")}</span>
              <h2 className="text-4xl font-black">{t("home.langSectionHeading")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("home.langBody1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("home.langBody2")}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>{t("home.langFreeNote")}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_DATA.map((lang) => {
                const c = langColor(lang.name);
                return (
                  <span
                    key={lang.key}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}
                  >
                    {t(lang.key)}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Games showcase ── */}
      <section className="py-24 bg-card">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("home.gamesTitle")}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">{t("home.gamesPlayToRemember")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.gamesResearch")}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { nameKey: "home.gameWordle", descKey: "home.gameWordleDesc", emoji: "🟩" },
              { nameKey: "home.gameScrabble", descKey: "home.gameScrabbleDesc", emoji: "🔠" },
              { nameKey: "home.gameCrossword", descKey: "home.gameCrosswordDesc", emoji: "✏️" },
              { nameKey: "home.gameSpellingBee", descKey: "home.gameSpellingBeeDesc", emoji: "🐝" },
              { nameKey: "home.gameWordGrid", descKey: "home.gameWordGridDesc", emoji: "🔍" },
              { nameKey: "home.gameLexigenz", descKey: "home.gameLexigenzDesc", emoji: "⚡" },
            ].map((g, i) => (
              <motion.div
                key={g.nameKey}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl mb-3">{g.emoji}</div>
                <h3 className="font-bold mb-2">{t(g.nameKey)}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(g.descKey)}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/play">
              <Button variant="outline" className="rounded-full gap-2">
                {t("home.playAllGames")} <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Premium vs Free ── */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("home.pricingTitle")}</span>
            <h2 className="text-4xl font-black mt-3 mb-4">{t("home.pricingHeading")}</h2>
            <p className="text-muted-foreground">{t("home.pricingSubtitle")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="p-8 rounded-3xl border border-border bg-card space-y-5">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{t("home.freePlanLabel")}</p>
                <p className="text-4xl font-black mt-1">$0</p>
                <p className="text-xs text-muted-foreground">{t("home.freePlanDesc")}</p>
              </div>
              <ul className="space-y-3 text-sm">
                {[t("home.freeFeature1"), t("home.freeFeature2"), t("home.freeFeature3"), t("home.freeFeature4"), t("home.freeFeature5")].map(f => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" disabled={isRegistered} onClick={() => !isRegistered && setShowFreemium(true)} className={`w-full rounded-2xl ${isRegistered ? "opacity-50 cursor-not-allowed" : ""}`}>
                {t("home.registerFreeBtn")}
              </Button>
            </div>
            {/* Premium */}
            <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 space-y-5 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">{t("home.bestValue")}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">{t("home.premiumPlanLabel")}</p>
                <p className="text-4xl font-black mt-1">{t("home.premiumPrice")}</p>
                <p className="text-xs text-muted-foreground">{t("home.premiumPlanDesc")}</p>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  t("home.premiumFeature1"), t("home.premiumFeature2"), t("home.premiumFeature3"), t("home.premiumFeature4"),
                  t("home.premiumFeature5"), t("home.premiumFeature6"), t("home.premiumFeature7"), t("home.premiumFeature8"),
                ].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-2xl bg-primary font-bold" onClick={handleGetPremium}>
                {isPremium ? t("home.alreadyPremium") : isRegistered ? t("home.getPremiumRegistered") : t("home.getPremiumFree")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-3xl text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black mb-4">{t("home.ctaHeading")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("home.ctaBody")}
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="outline" onClick={() => !isRegistered && setShowFreemium(true)} disabled={isRegistered} className={`h-14 px-8 text-lg font-bold rounded-full border-2 transition-all ${isRegistered ? "border-muted text-muted-foreground opacity-50 cursor-not-allowed" : "border-green-500 text-green-600 hover:bg-green-500/10"}`}>
              {t("home.registerFreeBtn")}
            </Button>
            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(139,92,246,0.4)]" onClick={handleGetPremium}>
              {isRegistered ? <> {t("home.getPremiumRegistered")} <Zap className="h-4 w-4 ml-2" /></> : t("home.getPremiumFree")}
            </Button>
          </div>
        </div>
      </section>

      {/* Freemium modal */}
      <AnimatePresence>
        {showFreemium && (
          <FreemiumModal onClose={() => setShowFreemium(false)} />
        )}
      </AnimatePresence>

      {/* Premium payment modal */}
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
    </div>
  );
}
