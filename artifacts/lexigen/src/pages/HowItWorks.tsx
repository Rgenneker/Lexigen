import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Gamepad2, Users, Zap, Calendar } from "lucide-react";
import AdsterraAd from "@/components/AdsterraAd";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import { InteractiveCategoryBrowser } from "@/components/InteractiveCategoryBrowser";
import { langColor } from "@/data/language-colors";
import { PremiumPreviewModal } from "@/components/PremiumPreviewModal";
import { PaymentModal } from "@/components/PaymentModal";
import { FreemiumModal } from "@/components/FreemiumModal";
import { useAuth } from "@/context/AuthContext";

const BROWSE_CATEGORIES_DATA = [
  {
    id: "emotions",
    labelKey: "howItWorks.catEmotions",
    words: ["joy","sorrow","anger","fear","surprise","disgust","trust","anticipation","melancholy","elated","anxious","serene","frustrated","euphoric","despondent","apprehensive","jubilant","forlorn","exhilarated","dejected","resentful","compassion","empathy","nostalgia","gratitude","remorse","envy","pride","shame","awe","contempt","longing","tranquil","agitated","ecstatic","wistful","indignant","content","bewildered","optimistic","grief","admiration","regret","tenderness","anguish","serenity","elation","dread","hope","affection"],
  },
  {
    id: "business",
    labelKey: "howItWorks.catBusiness",
    words: ["accountability","acquisition","agility","analytics","benchmark","capital","catalyst","collaborate","competitive","compliance","deliverable","differentiation","disruptive","ecosystem","efficiency","engagement","entrepreneur","equity","execution","forecast","framework","governance","growth","implementation","incentive","innovation","leadership","leverage","margin","metrics","milestone","monetize","negotiation","optimization","performance","pipeline","portfolio","productivity","profitability","revenue","roadmap","scalability","stakeholder","strategy","sustainability","synergy","traction","transformation","transparency","venture"],
  },
  {
    id: "academic",
    labelKey: "howItWorks.catAcademic",
    words: ["abstract","analysis","annotation","argument","assertion","bibliography","causation","citation","classification","coherence","commentary","conceptual","conclusion","contradiction","critical","critique","deduction","dialectic","discourse","empirical","epistemology","evaluate","evidence","exemplify","extrapolate","fallacy","generalization","hypothesis","implication","inductive","inference","interpretation","juxtaposition","methodology","narrative","ontology","paradigm","pedagogy","perspective","phenomenon","philosophy","premise","rationale","refute","rhetoric","synthesis","theoretical","thesis","variable","verification"],
  },
  {
    id: "advanced",
    labelKey: "howItWorks.catAdvanced",
    words: ["aberrant","abeyance","abstruse","acrimony","acumen","alacrity","ameliorate","anomalous","apathy","aplomb","arduous","astute","austere","belligerent","byzantine","callous","capricious","cogent","convoluted","copious","corroborate","culpable","cynical","dearth","debilitate","diligent","discern","disparate","equanimity","erudite","esoteric","fastidious","fortitude","garrulous","grandiloquent","hapless","hegemony","hubris","iconoclast","immutable","implacable","indefatigable","insidious","intractable","laconic","loquacious","magnanimous","mendacity","mercurial","meticulous","obtuse","onerous","ostracize","parsimony","pedantic","perspicacious","pragmatic","querulous","recalcitrant","reticent","sagacious","sardonic","sycophant","taciturn","tenacious","ubiquitous","vacillate","vehement","venerable","verbose"],
  },
];

const LANGUAGE_DATA_HIW = [
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

export default function HowItWorks() {
  const { t } = useTranslation();
  const BROWSE_CATEGORIES = BROWSE_CATEGORIES_DATA.map(c => ({ ...c, label: t(c.labelKey) }));
  const [showPreview, setShowPreview] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showFreemium, setShowFreemium] = useState(false);
  const { user, setPremium } = useAuth();
  const isPremium = user?.plan === "premium";

  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: t("howItWorks.steps.01.title"),
      desc: t("howItWorks.steps.01.desc"),
    },
    {
      number: "02",
      icon: BookOpen,
      title: t("howItWorks.steps.02.title"),
      desc: t("howItWorks.steps.02.desc"),
    },
    {
      number: "03",
      icon: Zap,
      title: t("howItWorks.steps.03.title"),
      desc: t("howItWorks.steps.03.desc"),
    },
    {
      number: "04",
      icon: Star,
      title: t("howItWorks.steps.04.title"),
      desc: t("howItWorks.steps.04.desc"),
    },
    {
      number: "05",
      icon: Gamepad2,
      title: t("howItWorks.steps.05.title"),
      desc: t("howItWorks.steps.05.desc"),
    },
    {
      number: "06",
      icon: Users,
      title: t("howItWorks.steps.06.title"),
      desc: t("howItWorks.steps.06.desc"),
    },
  ];

  const tools = [
    { href: "/vocabulary", emoji: "📚", label: t("howItWorks.tools.vocabularyHub") },
    { href: "/wordle-words", emoji: "🟩", label: t("howItWorks.tools.wordleWords") },
    { href: "/scrabble-words", emoji: "🎯", label: t("howItWorks.tools.scrabbleWords") },
    { href: "/spelling-bee-words", emoji: "🐝", label: t("howItWorks.tools.spellingBee") },
    { href: "/crossword-words", emoji: "✏️", label: t("howItWorks.tools.crosswordSolver") },
    { href: "/synonym-finder", emoji: "🔀", label: t("howItWorks.tools.synonymFinder") },
    { href: "/word-finder", emoji: "🔍", label: t("howItWorks.tools.wordFinder") },
    { href: "/anagram-solver", emoji: "🔤", label: t("howItWorks.tools.anagramSolver") },
    { href: "/dictionary", emoji: "📖", label: t("howItWorks.tools.dictionary") },
    { href: "/word-of-the-day", emoji: "⭐", label: t("howItWorks.tools.wordOfTheDay") },
  ];

  return (
    <div className="min-h-screen">
      <AdsterraSocialBar />
      <AdsterraAd />
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5 mb-4"
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              {t("howItWorks.badge")}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              {t("howItWorks.heroHeading1")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t("howItWorks.heroHeading2")}
              </span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-xl">
              {t("howItWorks.heroSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-6 p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group"
                data-testid={`step-${step.number}`}
              >
                <div className="flex-shrink-0 space-y-3">
                  <span className="block text-xs font-bold font-mono text-primary">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5 mb-10"
          >
            <h2 className="text-4xl font-bold tracking-tighter">
              {t("howItWorks.languagesHeading1")}
              <br />
              <span className="text-primary">{t("howItWorks.languagesHeading2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              {t("howItWorks.languagesSubtitle")}
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2">
            {LANGUAGE_DATA_HIW.map(({ name: lang, key: langKey }, i) => {
              const c = langColor(lang);
              return (
                <motion.span
                  key={langKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${c.bg} ${c.text} ${c.border}`}
                >
                  {t(langKey)}
                </motion.span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Word Tools & Resources */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">{t("howItWorks.toolsTitle")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("howItWorks.toolsSubtitle")}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {tools.map(({ href, emoji, label }) => (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-center"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs font-bold leading-tight">{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-3">{t("howItWorks.browseByCat")}</p>
            <InteractiveCategoryBrowser categories={BROWSE_CATEGORIES} wordCount={15} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tighter mb-4">{t("howItWorks.readyTitle")}</h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("howItWorks.readySubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/app">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(139,92,246,0.4)]" data-testid="button-start">
                  {t("common.startFree")}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full border-primary/30 hover:border-primary font-bold px-8" onClick={() => setShowPreview(true)}>
                {t("common.viewPremium")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium preview modal */}
      <AnimatePresence>
        {showPreview && (
          <PremiumPreviewModal
            onClose={() => setShowPreview(false)}
            isPremium={isPremium}
            onGetPremium={() => { setShowPreview(false); setShowPayment(true); }}
            onSignUp={() => { setShowPreview(false); setShowFreemium(true); }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPayment && user && (
          <PaymentModal
            onClose={() => setShowPayment(false)}
            onSuccess={() => { setPremium(); setShowPayment(false); }}
            userEmail={user.email}
            userName={user.name}
          />
        )}
      </AnimatePresence>
      {showFreemium && (
        <FreemiumModal onClose={() => setShowFreemium(false)} />
      )}
    </div>
  );
}
