import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { FreemiumModal } from "@/components/FreemiumModal";
import { PaymentModal } from "@/components/PaymentModal";
import { useAuth } from "@/context/AuthContext";
import {
  Brain, Flame, Gamepad2, Globe, BookOpen, Zap, Star,
  TrendingUp, Users, Clock, CheckCircle2, ChevronRight,
  Trophy, Sparkles, Target, BarChart3, Lock,
} from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Brain,
    title: "Enter your birth date",
    desc: "Lexigenz calculates your unique vocabulary archetype — a personality-driven language profile derived from your birth month and day. There are 12 archetypes, each with distinct word styles, strengths, and curated vocabulary paths.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Receive your daily word",
    desc: "Every morning, a new word lands in your feed — chosen specifically for your archetype and language preference. Not random dictionary filler: each word is selected to stretch your vocabulary in the direction that matches how you naturally think and speak.",
  },
  {
    step: "03",
    icon: BookOpen,
    title: "Build it into a sentence",
    desc: "The Sentence Builder prompts you to use the word in your own context. Writing your own sentence is the single most effective method for cementing new vocabulary into long-term memory. Your sentences save to your personal Word Journal.",
  },
  {
    step: "04",
    icon: Gamepad2,
    title: "Play word games to reinforce it",
    desc: "Lock the word in through six themed games: Wordle, Scrabble, Crossword, Spelling Bee, Word Grid, and the signature Lexigenz Game. Spaced repetition through play is how the brain actually retains what it learns.",
  },
  {
    step: "05",
    icon: Flame,
    title: "Keep your streak alive",
    desc: "Daily check-ins build your streak counter. Hit 7, 30, 100, and 365-day milestones to unlock exclusive badges. Streaks create the habit loop that makes vocabulary growth automatic rather than intentional.",
  },
];

const BENEFITS = [
  {
    icon: Brain,
    title: "Vocabulary that actually sticks",
    desc: "Lexigenz uses the science of contextual learning: you hear, read, use, and play with every new word. This multi-modal approach produces retention rates 4× higher than flashcard apps.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Target,
    title: "Words matched to your personality",
    desc: "Generic word lists ignore who you are. Your archetype means every word Lexigenz sends you is one you're more likely to actually use — in the conversations, writing, and situations that are real in your life.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Globe,
    title: "19 languages, one platform",
    desc: "Whether you're learning Afrikaans, reinforcing your French, or expanding your Mandarin, Lexigenz works across 19 languages. Switch languages instantly from the navbar without losing your streak or journal.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Flame,
    title: "Habit-forming streak system",
    desc: "Streaks work because they make daily learning feel urgent and rewarding. Lexigenz's streak engine is backed by milestone badges that make you want to keep going — even on the days you don't feel like it.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Gamepad2,
    title: "Six unique word games",
    desc: "Play is the most underrated learning tool. Lexigenz's six games — Wordle, Scrabble, Crossword, Spelling Bee, Word Grid, and the Lexigenz Game — use your learned words to reinforce them through competitive, timed challenges.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: BookOpen,
    title: "Your personal Word Journal",
    desc: "Every sentence you build is saved in your Word Journal — a searchable, growing archive of your vocabulary history. Review past entries to see how far you've come, and revisit words that need another pass.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: TrendingUp,
    title: "Track real progress",
    desc: "Monthly progress reports show words learned, games played, streaks maintained, and badges earned. Progress data makes growth visible — and visible growth is the best motivation to keep going.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Users,
    title: "Built for sharing",
    desc: "Send word challenges to friends. Invite others to beat your game scores. Lexigenz is designed to be social without being distracting — vocabulary growth as a shared experience, not a solo grind.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const ARCHETYPES = [
  { emoji: "✨", name: "The Visionary", style: "Aspirational & expansive" },
  { emoji: "🌸", name: "The Nurturer", style: "Warm & inclusive" },
  { emoji: "🗺", name: "The Explorer", style: "Eclectic & curious" },
  { emoji: "📚", name: "The Sage", style: "Precise & thoughtful" },
  { emoji: "🎨", name: "The Creator", style: "Inventive & poetic" },
  { emoji: "🛡", name: "The Guardian", style: "Direct & trustworthy" },
  { emoji: "⚡", name: "The Rebel", style: "Bold & unconventional" },
  { emoji: "🤝", name: "The Diplomat", style: "Nuanced & tactful" },
  { emoji: "🏆", name: "The Achiever", style: "Action & excellence" },
  { emoji: "🌙", name: "The Mystic", style: "Ethereal & philosophical" },
  { emoji: "🦋", name: "The Maverick", style: "Hybrid & adaptive" },
  { emoji: "🎵", name: "The Harmonizer", style: "Melodic & balanced" },
];

const LANGUAGES = [
  "English", "Afrikaans", "Zulu", "Xhosa", "French", "Spanish",
  "Portuguese", "German", "Dutch", "Italian", "Arabic", "Farsi",
  "Russian", "Bahasa Malay", "Vietnamese", "Tagalog",
  "Japanese", "Cantonese", "Chinese (Mandarin)",
];

const STATS = [
  { value: "19", label: "Languages supported" },
  { value: "6", label: "Word games" },
  { value: "12", label: "Personality archetypes" },
  { value: "365", label: "Days of daily words" },
];

export default function Home() {
  const [showFreemium, setShowFreemium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-32 flex-1 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        <div className="container px-4 mx-auto text-center space-y-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              LEVEL UP YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">WORDS</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            A personalised daily vocabulary app where your birth date determines your words, your games determine your growth, and your streak determines your status.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" onClick={() => setShowFreemium(true)} className="h-14 px-8 text-lg font-bold rounded-full border-2 border-green-500 text-green-600 hover:bg-green-500/10 hover:scale-105 transition-all">
              🎁 Register Free
            </Button>
            <Link href="/signin">
              <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                Sign In
              </Button>
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }} className="text-xs text-muted-foreground">
            Free forever · No credit card · Upgrade to Premium for $8 anytime
          </motion.p>
        </div>

        {/* Animated word demo */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-20 w-full max-w-3xl mx-auto px-4">
          <div className="aspect-[16/9] rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden flex items-center justify-center">
            <div className="text-center space-y-4">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-4xl md:text-5xl font-mono font-bold text-primary">
                effervescent
              </motion.div>
              <p className="text-muted-foreground font-mono text-sm md:text-base">adj. vivacious, enthusiastic, and full of energy.</p>
              <p className="text-xs text-muted-foreground italic">"Her effervescent personality lit up every room she entered."</p>
              <div className="flex justify-center gap-2 pt-4">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold uppercase">🔥 Streak: 12</span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase">✨ Visionary</span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold">🇿🇦 English</span>
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
            <span className="text-xs font-bold uppercase tracking-widest text-primary">What is Lexigenz?</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6">Vocabulary growth built around <em>you</em></h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Most vocabulary apps treat every user the same — the same word lists, the same exercises, the same generic approach. Lexigenz does the opposite.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Lexigenz is a daily vocabulary growth platform</strong> that personalises your entire language-learning experience based on who you are — starting with your birth date. Your birth month and day are used to assign you one of 12 personality archetypes, each with its own vocabulary style, word preferences, and language strengths.
              </p>
              <p>
                Every day, you receive a word calibrated to your archetype and your chosen language. You don't just read the definition — you use it in a sentence, play games that reinforce it, track your streak, and add it to a personal Word Journal that becomes your vocabulary history over time.
              </p>
              <p>
                Built in South Africa, used globally. Lexigenz supports 19 languages — from English, Afrikaans, Zulu, and Xhosa to French, Arabic, Japanese, and Mandarin — making it one of the most linguistically inclusive vocabulary platforms in the world.
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="outline" className="rounded-full gap-2">
                    Read the full story <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {[
                { icon: CheckCircle2, text: "Personalised words based on your birth archetype" },
                { icon: CheckCircle2, text: "Sentence builder for contextual memory retention" },
                { icon: CheckCircle2, text: "Six word games for playful reinforcement" },
                { icon: CheckCircle2, text: "Daily streaks and milestone badge system" },
                { icon: CheckCircle2, text: "Word Journal — your personal vocabulary archive" },
                { icon: CheckCircle2, text: "19 languages with instant switching" },
                { icon: CheckCircle2, text: "Monthly progress tracking and reports" },
                { icon: CheckCircle2, text: "Friend challenges and social invite system" },
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
            <span className="text-xs font-bold uppercase tracking-widest text-primary">How it works</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Five steps to a richer vocabulary</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Lexigenz is built on a proven daily learning loop. Each step reinforces the last.</p>
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
                    <span className="text-xs font-black text-primary/60 tracking-widest">STEP {item.step}</span>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Why Lexigenz</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Eight reasons your vocabulary will never be the same</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Lexigenz is engineered around what actually makes new words stick — and what makes learning feel worth doing every single day.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center mb-4`}>
                  <b.icon className={`h-5 w-5 ${b.color}`} />
                </div>
                <h3 className="font-bold mb-2 text-sm">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Archetypes ── */}
      <section className="py-24 bg-card">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Your archetype</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Which one are you?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Enter your birth date and Lexigenz instantly assigns your vocabulary archetype — a personality-driven language profile that shapes every word we send you.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ARCHETYPES.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className="p-4 rounded-2xl border border-border bg-background text-center hover:border-primary/30 hover:shadow-md transition-all cursor-default"
              >
                <div className="text-3xl mb-2">{a.emoji}</div>
                <p className="font-bold text-sm">{a.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.style}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/app">
              <Button className="rounded-full gap-2 bg-primary">
                Discover your archetype <ChevronRight className="h-4 w-4" />
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
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Language support</span>
              <h2 className="text-4xl font-black">One platform. 19 languages.</h2>
              <p className="text-muted-foreground leading-relaxed">
                Lexigenz was born in South Africa — a country with 11 official languages and a culture of multilingualism. That DNA is woven into the platform. Whether you're deepening your mother tongue or building vocabulary in a second language, Lexigenz meets you there.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Switch your language from the navbar at any time. Your streak, journal, and archetype travel with you across every language.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Free: English only · <strong className="text-foreground">Premium: all 19 languages</strong></span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => {
                const highlighted = ["Afrikaans", "Zulu", "Xhosa"].includes(lang);
                return (
                  <span
                    key={lang}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      highlighted
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {lang}
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
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Word Games</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Play to remember</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Research shows that playful, game-based repetition improves long-term vocabulary recall by up to 60% compared to passive review. Lexigenz's six games are built on exactly that principle.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { name: "Wordle vs Computer", desc: "Guess the 5-letter word in 6 tries. Today's hidden word is always drawn from your archetype word list.", emoji: "🟩" },
              { name: "Scrabble vs Computer", desc: "Rack up points by forming words from your letter tiles. The AI opponent adapts to your skill level.", emoji: "🔠" },
              { name: "Crossword vs Computer", desc: "Themed crossword clues built around the week's vocabulary. Solve it before the clock runs out.", emoji: "✏️" },
              { name: "Spelling Bee", desc: "A Lexigenz-branded take on the classic: use the 7-letter honeycomb to find as many words as possible.", emoji: "🐝" },
              { name: "Word Grid", desc: "Hunt for hidden words across a 6×6 letter grid. Speed and pattern recognition are your weapons.", emoji: "🔍" },
              { name: "The Lexigenz Game", desc: "Unscramble 'LEXIGENZ' from 7 random letters before the timer hits zero. The signature challenge.", emoji: "⚡" },
            ].map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl border border-border bg-background hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl mb-3">{g.emoji}</div>
                <h3 className="font-bold mb-2">{g.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/play">
              <Button variant="outline" className="rounded-full gap-2">
                Play all six games <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Premium vs Free ── */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Pricing</span>
            <h2 className="text-4xl font-black mt-3 mb-4">Free gets you started. Premium takes you all the way.</h2>
            <p className="text-muted-foreground">One price. No subscription. No expiry. $8 once and it's yours forever.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="p-8 rounded-3xl border border-border bg-card space-y-5">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Free</p>
                <p className="text-4xl font-black mt-1">$0</p>
                <p className="text-xs text-muted-foreground">Forever</p>
              </div>
              <ul className="space-y-3 text-sm">
                {["Daily word of the day (English only)", "Birth-based archetype profile", "Streak tracking", "Basic word journal (limited entries)", "Access to word games"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-2xl" onClick={() => setShowFreemium(true)}>
                🎁 Register Free
              </Button>
            </div>
            {/* Premium */}
            <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 space-y-5 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">BEST VALUE</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">Premium</p>
                <p className="text-4xl font-black mt-1">$8</p>
                <p className="text-xs text-muted-foreground">Once-off · Lifetime access</p>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  "Everything in Free", "All 19 languages", "Unlimited sentence builder", "Full word journal (unlimited)",
                  "Monthly progress reports", "Exclusive Premium themes", "No ads", "Priority support",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-2xl bg-primary font-bold" onClick={handleGetPremium}>
                Get Premium — $8 Forever
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-3xl text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Start with one word today.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The most powerful vocabulary in the room didn't come from cramming. It came from showing up every day. Lexigenz makes that easy, personalised, and genuinely worth looking forward to.
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="outline" onClick={() => setShowFreemium(true)} className="h-14 px-8 text-lg font-bold rounded-full border-2 border-green-500 text-green-600 hover:bg-green-500/10">
              🎁 Register Free
            </Button>
            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(139,92,246,0.4)]" onClick={handleGetPremium}>
              Get Premium — $8 <Zap className="h-4 w-4 ml-2" />
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
