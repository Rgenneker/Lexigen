import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Zap, BookOpen, Users, TrendingUp, ChevronDown } from "lucide-react";
import { TOOL_EXPANDED } from "@/data/tool-expanded";
import { langColor } from "@/data/language-colors";
import AdsterraAd from "@/components/AdsterraAd";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";

const MILESTONE_KEYS = [
  "about.milestone1",
  "about.milestone2",
  "about.milestone3",
  "about.milestone4",
  "about.milestone5",
];
const MILESTONE_YEARS = ["2024", "2024", "2025", "2025", "2026"];

const LANGUAGE_KEYS = [
  "lang.english", "lang.spanish", "lang.portuguese", "lang.french", "lang.german", "lang.dutch", "lang.italian",
  "lang.arabic", "lang.afrikaans", "lang.zulu", "lang.xhosa", "lang.farsi", "lang.russian",
  "lang.malay", "lang.vietnamese", "lang.tagalog", "lang.japanese", "lang.cantonese", "lang.mandarin"
];
const LANGUAGE_NAMES = [
  "English", "Spanish", "Portuguese", "French", "German", "Dutch", "Italian",
  "Arabic", "Afrikaans", "Zulu", "Xhosa", "Farsi", "Russian",
  "Bahasa Malay", "Vietnamese", "Tagalog", "Japanese", "Cantonese", "Chinese (Mandarin)"
];

export default function About() {
  const { t } = useTranslation();
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const TITLE_KEY_SUFFIX: Record<string, string> = {
    "about.toolVocabBuilderTitle": "toolVocabBuilderTitle",
    "about.toolWotdTitle": "toolWotdTitle",
    "about.toolWordleTitle": "toolWordleTitle",
    "about.toolScrabbleTitle": "toolScrabbleTitle",
    "about.toolSpellingBeeTitle": "toolSpellingBeeTitle",
    "about.toolDictionaryTitle": "toolDictionaryTitle",
    "about.toolSynonymTitle": "toolSynonymTitle",
    "about.toolCrosswordTitle": "toolCrosswordTitle",
    "about.toolVocabListsTitle": "toolVocabListsTitle",
  };
  const TITLE_KEY_TO_ID: Record<string, string> = {
    "about.toolVocabBuilderTitle": "Vocabulary Builder",
    "about.toolWotdTitle": "Word of the Day",
    "about.toolWordleTitle": "Wordle Word Help",
    "about.toolScrabbleTitle": "Scrabble Word Finder",
    "about.toolSpellingBeeTitle": "Spelling Bee Words",
    "about.toolDictionaryTitle": "Dictionary & Definitions",
    "about.toolSynonymTitle": "Synonym Finder",
    "about.toolCrosswordTitle": "Crossword Solver",
    "about.toolVocabListsTitle": "Vocabulary Lists",
  };
  const expandedRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      icon: BookOpen,
      title: t("about.valueWords"),
      desc: t("about.valueWordsDesc"),
    },
    {
      icon: Heart,
      title: t("about.valueLearning"),
      desc: t("about.valueLearningDesc"),
    },
    {
      icon: Zap,
      title: t("about.valueConsistency"),
      desc: t("about.valueConsistencyDesc"),
    },
    {
      icon: Globe,
      title: t("about.valueBorders"),
      desc: t("about.valueBordersDesc"),
    },
    {
      icon: Users,
      title: t("about.valueTogether"),
      desc: t("about.valueTogetherDesc"),
    },
    {
      icon: TrendingUp,
      title: t("about.valueGrowth"),
      desc: t("about.valueGrowthDesc"),
    },
  ];

  useEffect(() => {
    if (expandedTool && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [expandedTool]);

  return (
    <div className="min-h-screen">
      <AdsterraSocialBar />
      <AdsterraAd />
      {/* Hero */}
      <section className="pt-20 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-accent bg-accent/10 px-4 py-1.5 rounded-full">
              {t("about.badge")}
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              {t("about.heroLine1")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t("about.heroLine2")}
              </span>
              <br />
              {t("about.heroLine3")}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed font-medium max-w-2xl text-muted-foreground">
              {t("about.heroSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{t("about.missionLabel")}</p>
              <h2 className="text-4xl font-bold tracking-tighter leading-tight">
                {t("about.missionHeading")}
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {t("about.missionBody1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.missionBody2")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{t("about.originLabel")}</p>
              <h2 className="text-4xl font-bold tracking-tighter mb-6">{t("about.originHeading")}</h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {t("about.originBody1")}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t("about.originBody2")}
            </p>

            {/* Timeline */}
            <div className="mt-12 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">{t("about.timelineLabel")}</p>
              {MILESTONE_KEYS.map((key, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-5"
                >
                  <span className="text-sm font-bold font-mono text-primary w-12 flex-shrink-0 pt-0.5">{MILESTONE_YEARS[i]}</span>
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{t(key)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{t("about.valuesLabel")}</p>
            <h2 className="text-4xl font-bold tracking-tighter">{t("about.valuesHeading")}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 19 Languages */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 mb-10"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("about.languagesLabel")}</p>
            <h2 className="text-4xl font-bold tracking-tighter">
              {t("about.languagesHeading")} <span className="text-primary">{t("about.languagesHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("about.languagesSubtitle")}
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2">
            {LANGUAGE_NAMES.map((lang, i) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${langColor(lang).bg} ${langColor(lang).text} ${langColor(lang).border}`}
              >
                {t(LANGUAGE_KEYS[i])}
              </motion.span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">{t("about.languagesNote")}</p>
        </div>
      </section>

      {/* Platform Features - Gen Z focused */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{t("about.platformLabel")}</p>
            <h2 className="text-4xl font-bold tracking-tighter max-w-xl">
              {t("about.platformHeading")}
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
              {t("about.platformSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { tag: "01", title: t("about.platform1Title"), body: t("about.platform1Body") },
              { tag: "02", title: t("about.platform2Title"), body: t("about.platform2Body") },
              { tag: "03", title: t("about.platform3Title"), body: t("about.platform3Body") },
              { tag: "04", title: t("about.platform4Title"), body: t("about.platform4Body") },
            ].map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded-2xl border border-border bg-background hover:border-primary/30 transition-all"
              >
                <span className="text-xs font-bold font-mono text-primary block mb-4">{item.tag}</span>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Lexigenz Covers */}
      <section className="py-20 px-4 bg-background border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-3xl font-black mb-3">{t("about.toolsHeading")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              {t("about.toolsSubtitle")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { titleKey: "about.toolVocabBuilderTitle", descKey: "about.toolVocabBuilderDesc", href: "/vocabulary" },
              { titleKey: "about.toolWotdTitle", descKey: "about.toolWotdDesc", href: "/word-of-the-day" },
              { titleKey: "about.toolWordleTitle", descKey: "about.toolWordleDesc", href: "/wordle-words" },
              { titleKey: "about.toolScrabbleTitle", descKey: "about.toolScrabbleDesc", href: "/scrabble-words" },
              { titleKey: "about.toolSpellingBeeTitle", descKey: "about.toolSpellingBeeDesc", href: "/spelling-bee-words" },
              { titleKey: "about.toolDictionaryTitle", descKey: "about.toolDictionaryDesc", href: "/dictionary" },
              { titleKey: "about.toolSynonymTitle", descKey: "about.toolSynonymDesc", href: "/synonym-finder" },
              { titleKey: "about.toolCrosswordTitle", descKey: "about.toolCrosswordDesc", href: "/crossword-words" },
              { titleKey: "about.toolVocabListsTitle", descKey: "about.toolVocabListsDesc", href: "/vocabulary-lists/advanced-english" },
            ].map((item) => {
              const title = t(item.titleKey);
              const desc = t(item.descKey);
              const isOpen = expandedTool === item.titleKey;
              return (
                <motion.div
                  key={item.titleKey}
                  whileHover={{ y: isOpen ? 0 : -2 }}
                  onClick={() => setExpandedTool(isOpen ? null : item.titleKey)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer h-full ${
                    isOpen
                      ? "border-primary/60 bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <h3 className="font-bold text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  <div className={`mt-3 flex items-center gap-1 text-xs font-medium transition-colors ${isOpen ? "text-primary" : "text-muted-foreground/50"}`}>
                    <span>{isOpen ? t("about.closeExpand") : t("about.learnMore")}</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {expandedTool && (() => {
              const toolEnglishId = expandedTool ? TITLE_KEY_TO_ID[expandedTool] : null;
              const expanded = TOOL_EXPANDED.find(te => te.id === toolEnglishId);
              if (!expanded) return null;
              return (
                <motion.div
                  ref={expandedRef}
                  key={expandedTool}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 rounded-2xl border border-primary/20 bg-card p-8 md:p-12"
                >
                  <div className="flex items-start justify-between gap-4 mb-10">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{t("about.whatYouLearn")}</p>
                      <h3 className="text-2xl md:text-3xl font-black">{t(expandedTool)}</h3>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setExpandedTool(null); }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-1 px-3 py-1.5 rounded-lg hover:bg-muted"
                    >
                      {t("about.closeExpand")}
                    </button>
                  </div>
                  <div className="space-y-10">
                    {expanded.reasons.map((reason, idx) => {
                      const tkSuffix = expandedTool ? TITLE_KEY_SUFFIX[expandedTool] : null;
                      const headingText = tkSuffix ? t(`about.${tkSuffix}R${idx}Heading`) : reason.heading;
                      const bodyText = tkSuffix ? t(`about.${tkSuffix}R${idx}Body`) : reason.body;
                      return (
                        <div key={idx} className="flex gap-5">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-base mb-2 leading-snug">{headingText}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{bodyText}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* Promise + CTA */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 text-center space-y-6 shadow-[0_0_60px_rgba(139,92,246,0.1)]"
          >
            <h2 className="text-4xl font-bold tracking-tighter">{t("about.promiseHeading")}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              {t("about.promiseText")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/app">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(139,92,246,0.4)]" data-testid="button-get-started">
                  {t("about.startLearning")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full border-border hover:border-primary/50 font-bold px-8">
                  {t("about.talkToUs")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
