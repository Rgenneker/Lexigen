import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Zap, BookOpen, Users, TrendingUp, ChevronDown } from "lucide-react";
import { TOOL_EXPANDED } from "@/data/tool-expanded";

const milestones = [
  { year: "2024", label: "Lexigenz Trading founded in South Africa" },
  { year: "2024", label: "Concept: daily vocab meets birth archetype personalisation" },
  { year: "2025", label: "Beta launch — English + 18 additional languages" },
  { year: "2025", label: "6 word games live, global challenge feature launched" },
  { year: "2026", label: "Community of learners across 5 continents" },
];

const values = [
  {
    icon: BookOpen,
    title: "Words are power.",
    desc: "Vocabulary is one of the most underrated career and life skills. We exist to close the gap between knowing a word and owning it.",
  },
  {
    icon: Heart,
    title: "Learning should feel personal.",
    desc: "Generic word lists don't work. Your archetype, your language, your mood — Lexigenz shapes itself around you.",
  },
  {
    icon: Zap,
    title: "Consistency over intensity.",
    desc: "Seven minutes a day, every day, beats a six-hour study session once a month. We're built for the long game.",
  },
  {
    icon: Globe,
    title: "No borders.",
    desc: "Rooted in South Africa. Spoken in 19 languages. Lexigenz is for every learner, everywhere.",
  },
  {
    icon: Users,
    title: "Together is better.",
    desc: "Challenge culture, shared streaks, and invite features — because the best vocabulary growth happens in community.",
  },
  {
    icon: TrendingUp,
    title: "Growth, not perfection.",
    desc: "We don't test you, grade you, or make you feel behind. We celebrate every word learned, every streak hit.",
  },
];

const languages = [
  "English", "Spanish", "Portuguese", "French", "German", "Dutch", "Italian",
  "Arabic", "Afrikaans", "Zulu", "Xhosa", "Farsi", "Russian",
  "Bahasa Malay", "Vietnamese", "Tagalog", "Japanese", "Cantonese", "Chinese (Mandarin)"
];

export default function About() {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  return (
    <div className="min-h-screen">
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
              Our Story
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              NOT YOUR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                TEXTBOOK'S
              </span>
              <br />
              VOCAB.
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed font-medium max-w-2xl text-muted-foreground">
              Lexigenz is built to make daily vocabulary growth feel personal, playful, and meaningful — for every generation, in every language, across every border.
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
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Mission</p>
              <h2 className="text-4xl font-bold tracking-tighter leading-tight">
                We want every Gen Z learner to feel confident using words that matter.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Lexigenz was founded in South Africa with a simple belief: that the words you know shape the life you live. Academic vocabulary, professional English, multilingual fluency — these aren't luxuries. They're tools. And tools should be accessible to everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We built Lexigenz for the student who wants to level up before an interview. For the creative who wants richer language in their writing. For the professional who wants to communicate with more precision and confidence. For everyone who has ever reached for a word and found the cupboard bare.
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
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Where We Come From</p>
              <h2 className="text-4xl font-bold tracking-tighter mb-6">Built in South Africa. Built for the world.</h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              Lexigenz Trading is a South African company. We started with the conviction that vocabulary platforms built for the West don't always serve the needs, rhythms, or realities of learners in Africa and the Global South. We wanted something that was African in its origin, but genuinely global in its reach.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              That's why Lexigenz launched with 19 languages from day one — including Afrikaans, Zulu, and Xhosa alongside global languages. That's why our archetype system celebrates personality and individuality over rote memorisation. And that's why we made community a core feature, not an afterthought.
            </p>

            {/* Timeline */}
            <div className="mt-12 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Timeline</p>
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-5"
                >
                  <span className="text-sm font-bold font-mono text-primary w-12 flex-shrink-0 pt-0.5">{m.year}</span>
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{m.label}</p>
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
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Our Values</p>
            <h2 className="text-4xl font-bold tracking-tighter">What we believe.</h2>
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
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Languages</p>
            <h2 className="text-4xl font-bold tracking-tighter">
              One platform. <span className="text-primary">19 languages.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Switch your learning language anytime from the globe icon in the navigation. Your word, your archetype, your language.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2">
            {languages.map((lang, i) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  ["Afrikaans", "Zulu", "Xhosa"].includes(lang)
                    ? "border-primary/40 bg-primary/10 text-primary font-bold"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {lang}
              </motion.span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">South African languages highlighted</p>
        </div>
      </section>

      {/* Platform Features — Gen Z focused */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">What Lexigenz Delivers</p>
            <h2 className="text-4xl font-bold tracking-tighter max-w-xl">
              Built to build better language.
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
              Every feature on Lexigenz is designed with one goal: helping Gen Z learners own the words they use — not just recognise them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                tag: "01",
                title: "Personalised Daily Word",
                body: "Each day delivers one word — matched to your vocabulary level, your language choice, and your personal learning history. No overwhelm. Just one powerful word, fully contextualised with a definition, pronunciation, and real-world example sentence.",
              },
              {
                tag: "02",
                title: "Birth-Based Archetype Insights",
                body: "Your date of birth unlocks a unique vocabulary archetype — a profile that reflects how you process language, what words resonate with you, and how your communication style is wired. It's not astrology. It's personalisation with a purpose.",
              },
              {
                tag: "03",
                title: "Streak Rewards",
                body: "Consistency is the whole game. Lexigenz tracks your daily check-ins and rewards you with milestone badges at 7, 30, 100, and 365 days. Every streak is a visible record of real growth — and a motivator to keep showing up.",
              },
              {
                tag: "04",
                title: "Social Challenges for Gen Z Learners",
                body: "Vocabulary grows fastest in community. Invite friends, challenge peers to word duels, compare streaks, and build your vocabulary circle across timezones and borders. Words have always been social — Lexigenz just makes that explicit.",
              },
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
            <h2 className="text-3xl font-black mb-3">Everything Vocabulary, in One Place</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Lexigenz is a full vocabulary ecosystem — daily words, word games, vocabulary lists, and learning tools across 19 languages.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Vocabulary Builder", desc: "Grow your English vocabulary with one personalised word per day — with etymology, usage, and sentence practice.", href: "/vocabulary" },
              { title: "Word of the Day", desc: "A new word every day matched to your archetype — with full context, pronunciation, and example sentences.", href: "/word-of-the-day" },
              { title: "Wordle Word Help", desc: "Vocabulary-focused Wordle game plus strategy guides and word lists for every Wordle player.", href: "/wordle-words" },
              { title: "Scrabble Word Finder", desc: "High-value Scrabble words, two-letter words, Q-without-U words, and gameplay strategies.", href: "/scrabble-words" },
              { title: "Spelling Bee Words", desc: "Vocabulary practice for spelling competition — from beginner lists to advanced championship-level words.", href: "/spelling-bee-words" },
              { title: "Dictionary & Definitions", desc: "Look up any English word with full definitions, etymology, synonyms, antonyms, and pronunciation.", href: "/dictionary" },
              { title: "Synonym Finder", desc: "Find the right synonym for any word — with context notes on nuance and register differences.", href: "/synonym-finder" },
              { title: "Crossword Solver", desc: "Crossword vocabulary guides, common fill words, and clue-reading strategies for all levels.", href: "/crossword-words" },
              { title: "Vocabulary Lists", desc: "Curated word lists by theme, difficulty, and use case — from GRE prep to business communication.", href: "/vocabulary-lists/advanced-english" },
            ].map((item) => {
              const isOpen = expandedTool === item.title;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: isOpen ? 0 : -2 }}
                  onClick={() => setExpandedTool(isOpen ? null : item.title)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer h-full ${
                    isOpen
                      ? "border-primary/60 bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  <div className={`mt-3 flex items-center gap-1 text-xs font-medium transition-colors ${isOpen ? "text-primary" : "text-muted-foreground/50"}`}>
                    <span>{isOpen ? "Close" : "Learn more"}</span>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {expandedTool && (() => {
              const expanded = TOOL_EXPANDED.find(t => t.id === expandedTool);
              if (!expanded) return null;
              return (
                <motion.div
                  key={expandedTool}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 rounded-2xl border border-primary/20 bg-card p-8 md:p-12"
                >
                  <div className="flex items-start justify-between gap-4 mb-10">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">What you will learn</p>
                      <h3 className="text-2xl md:text-3xl font-black">{expandedTool}</h3>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setExpandedTool(null); }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-1 px-3 py-1.5 rounded-lg hover:bg-muted"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-10">
                    {expanded.reasons.map((reason, idx) => (
                      <div key={idx} className="flex gap-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary">
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

      {/* Promise + CTA */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 text-center space-y-6 shadow-[0_0_60px_rgba(139,92,246,0.1)]"
          >
            <h2 className="text-4xl font-bold tracking-tighter">Our Promise</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              Consistent growth, not quick fixes. Personalisation, not generic lists. Community, not isolation. We are building a global vocabulary movement — rooted in South Africa, ready for the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/app">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(139,92,246,0.4)]" data-testid="button-get-started">
                  Start Learning Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full border-border hover:border-primary/50 font-bold px-8">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
