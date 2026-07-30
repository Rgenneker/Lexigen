import { useState } from "react";
import { langColor } from "@/data/language-colors";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Gamepad2, Zap, Star, Globe, Trophy, ChevronRight,
  ChevronLeft, X, CheckCircle2, XCircle, Sparkles, Map,
  User, Calendar, MessageSquare, LayoutGrid, ArrowRight,
  RotateCcw, Lock, Flame, Clock, Hash
} from "lucide-react";
import { Link } from "wouter";

const STEPS = [
  {
    id: 0,
    emoji: "🗺️",
    label: "Platform Overview",
    title: "Welcome to Lexigenz - here's your orientation",
    tldr: "Lexigenz = one word a day, six games, your personality, 19 languages.",
    content: (
      <div className="space-y-5">
        <p className="text-muted-foreground leading-relaxed">
          Lexigenz is a <strong>daily vocabulary growth platform</strong> built for people who want smarter language skills without the grind. The whole loop takes about 7 minutes a day - seriously, that's it.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen, label: "1 Word/Day", desc: "Personalised to you", color: "bg-violet-500/10 text-violet-600 border-violet-400/20" },
            { icon: MessageSquare, label: "Sentence Builder", desc: "Write it, own it", color: "bg-blue-500/10 text-blue-600 border-blue-400/20" },
            { icon: Gamepad2, label: "6 Word Games", desc: "Learn through play", color: "bg-orange-500/10 text-orange-600 border-orange-400/20" },
            { icon: Star, label: "Streaks & Badges", desc: "Daily momentum", color: "bg-amber-500/10 text-amber-600 border-amber-400/20" },
            { icon: Globe, label: "19 Languages", desc: "Your world, your words", color: "bg-emerald-500/10 text-emerald-600 border-emerald-400/20" },
            { icon: User, label: "12 Archetypes", desc: "Your vocab identity", color: "bg-pink-500/10 text-pink-600 border-pink-400/20" },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className={`flex items-center gap-3 border rounded-xl p-3 ${color}`}>
              <Icon className="h-4 w-4 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold">{label}</p>
                <p className="text-xs opacity-75">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <p className="text-sm font-semibold text-primary mb-1">🔥 The 7-minute daily loop</p>
          <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
            <span className="bg-background border border-border px-2 py-1 rounded-lg font-medium">Open App</span>
            <ArrowRight className="h-3 w-3" />
            <span className="bg-background border border-border px-2 py-1 rounded-lg font-medium">Read word</span>
            <ArrowRight className="h-3 w-3" />
            <span className="bg-background border border-border px-2 py-1 rounded-lg font-medium">Build sentence</span>
            <ArrowRight className="h-3 w-3" />
            <span className="bg-background border border-border px-2 py-1 rounded-lg font-medium">Play a game</span>
            <ArrowRight className="h-3 w-3" />
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-lg font-medium">Streak ✅</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    emoji: "🧭",
    label: "Navigation",
    title: "Getting around - every page explained",
    tldr: "The navbar is your map. App = daily hub. Play = games. Articles = deep reads.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          The navbar at the top has everything. On mobile, it becomes a hamburger menu (tap the three lines top-right). Here's what each page does:
        </p>
        <div className="space-y-2">
          {[
            { page: "Home", path: "/", icon: "🏠", desc: "Brand intro, features overview, browse categories by letter or theme." },
            { page: "About", path: "/about", icon: "💡", desc: "Meet the 9 tools (Dictionary, Synonym Finder, Anagram Solver, etc.) and why Lexigenz exists." },
            { page: "How It Works", path: "/how-it-works", icon: "⚙️", desc: "The 6-step system explained - perfect to share with someone new." },
            { page: "Articles", path: "/articles", icon: "📰", desc: "25+ deep-dive articles on words, games, communication & self-development." },
            { page: "Play", path: "/play", icon: "🎮", desc: "Your game hub - access all 6 word games from here." },
            { page: "App", path: "/app", icon: "⚡", desc: "Your daily learning home. Daily word, Sentence Builder, streak, Word Journal." },
            { page: "Invite", path: "/invite", icon: "📨", desc: "Challenge friends via link. No download needed on their end." },
            { page: "FAQ", path: "/faq", icon: "❓", desc: "You're here! Help centre + this Playbook." },
          ].map(({ page, icon, desc }) => (
            <div key={page} className="flex gap-3 p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
              <div>
                <p className="text-sm font-bold">{page}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-500/10 border border-amber-400/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
          <strong>Pro tip:</strong> Bookmark <code className="bg-amber-500/10 px-1 rounded">/app</code> as your daily shortcut. You can also add Lexigenz to your phone home screen via browser settings for an app-like experience.
        </div>
      </div>
    ),
  },
  {
    id: 2,
    emoji: "🌟",
    label: "Your Archetype",
    title: "Your vocabulary personality - how archetypes work",
    tldr: "Birth date → 1 of 12 archetypes → personalised words, style & tone for life.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          When you open the App page and enter your birth date, Lexigenz calculates your <strong>vocabulary archetype</strong> - a personality profile that shapes the style, tone, and type of words you receive. It's deterministic: same birth date = same archetype, always.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["The Visionary", "The Nurturer", "The Explorer", "The Sage", "The Creator", "The Guardian", "The Rebel", "The Diplomat", "The Achiever", "The Mystic", "The Maverick", "The Harmonizer"].map(a => (
            <div key={a} className="bg-muted/50 border border-border rounded-lg px-2 py-1.5 text-center">
              <p className="text-xs font-semibold leading-tight">{a}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { label: "Sage & Mystic", desc: "Complex, philosophical, Latin/Greek-heavy words", color: "text-violet-600" },
            { label: "Rebel & Maverick", desc: "Contemporary, edgy, hybrid vocabulary", color: "text-rose-600" },
            { label: "Nurturer & Diplomat", desc: "Warm, relational, emotionally precise words", color: "text-emerald-600" },
            { label: "Explorer & Creator", desc: "Eclectic, creative, cross-cultural terms", color: "text-orange-600" },
          ].map(({ label, desc, color }) => (
            <div key={label} className="flex gap-2 items-start text-sm">
              <span className={`font-bold flex-shrink-0 ${color}`}>{label}:</span>
              <span className="text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-sm">
          <strong>Can I change it?</strong> Yes - update your birth date in your profile to explore different archetypes. Your archetype is stable by design but not a cage.
        </div>
      </div>
    ),
  },
  {
    id: 3,
    emoji: "⚡",
    label: "Daily Word Loop",
    title: "The daily loop - how words actually stick",
    tldr: "Read → sentence → journal → review. Spaced repetition baked in.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Head to the <strong>App page</strong> every day. Here's what happens in sequence:
        </p>
        <div className="space-y-3">
          {[
            { step: "01", title: "Your daily word drops", desc: "A word matched to your archetype and language. Definition, etymology, pronunciation, example sentences - all included. Resets at midnight your time.", icon: BookOpen, color: "text-violet-600 bg-violet-500/10" },
            { step: "02", title: "Sentence Builder", desc: "Write your own sentence using the word. This is the highest-retention step - generating your own sentence is 2-3× more effective than reading one. It saves automatically to your Word Journal.", icon: MessageSquare, color: "text-blue-600 bg-blue-500/10" },
            { step: "03", title: "Word Journal", desc: "Every sentence you write is stored here. Free users get limited entries; Premium users get unlimited. Your journal is your vocabulary history - it grows with you.", icon: BookOpen, color: "text-emerald-600 bg-emerald-500/10" },
            { step: "04", title: "Streak check-in", desc: "Visiting the App page and engaging with today's word counts as your daily check-in. Miss a day? Streak resets. Milestones at 7, 30, 100, and 365 days unlock badges.", icon: Flame, color: "text-amber-600 bg-amber-500/10" },
          ].map(({ step, title, desc, icon: Icon, color }) => (
            <div key={step} className="flex gap-3 p-3 rounded-xl border border-border bg-muted/30">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Step {step}</p>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-rose-500/10 border border-rose-400/20 rounded-xl p-3 text-xs text-rose-700 dark:text-rose-400">
          <strong>Streak rules:</strong> Only the App page triggers a streak check-in. Articles, Play, or any other page won't count. Come to App first every day.
        </div>
      </div>
    ),
  },
  {
    id: 4,
    emoji: "🎮",
    label: "6 Word Games",
    title: "Play for Words - your 6-game suite, explained",
    tldr: "Go to Play → pick a game. Each game trains a different vocab skill.",
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground text-sm">
          Navigate to <strong>Play</strong> in the navbar. Six games, one hub. Free users get the full games suite. Premium removes ads.
        </p>
        <div className="space-y-2">
          {[
            { game: "Wordle", emoji: "🟩", desc: "Guess the 5-letter word in 6 tries. Colour feedback guides you. Words pulled from your archetype pool - so it's also vocabulary practice.", tip: "Start with CRANE or SLATE for best letter coverage." },
            { game: "Scrabble vs Computer", emoji: "🔤", desc: "Classic tile-based word building against an AI opponent. Place tiles on the board to score points - double/triple score squares included.", tip: "Learn 2-letter words first. They unlock the board." },
            { game: "Crossword", emoji: "✏️", desc: "Themed crossword puzzles generated for you. Fill the grid using across and down clues. Multiple difficulty levels.", tip: "Solve what you know first - crossing letters unlock the harder clues." },
            { game: "Spelling Bee", emoji: "🐝", desc: "Find words using 7 letters arranged in a honeycomb - one centre letter must appear in every word. Longer words = more points.", tip: "Find the pangram (uses all 7 letters) for the bonus." },
            { game: "Word Grid", emoji: "🔍", desc: "Hidden word search in a 6×6 grid. Find all the themed words before the clock runs out. Words can run in any direction.", tip: "Scan for unusual first letters first - they're easier to spot." },
            { game: "The Lexigenz Game", emoji: "⏱️", desc: "7 letters drawn from L-E-X-I-G-E-N-Z. Unscramble them to spell the full word before the countdown hits zero. The fastest game - under 60 seconds.", tip: "Look for the vowels first: E, I. Build from there." },
          ].map(({ game, emoji, desc, tip }) => (
            <div key={game} className="border border-border rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/40">
                <span className="text-base">{emoji}</span>
                <p className="text-sm font-bold">{game}</p>
              </div>
              <div className="px-3 py-2 space-y-1">
                <p className="text-xs text-muted-foreground">{desc}</p>
                <p className="text-xs text-primary font-medium">💡 {tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    emoji: "🔐",
    label: "Sign In & Updates",
    title: "What happens when you sign in",
    tldr: "Sign-in syncs your streak, journal, archetype & Premium - across all devices.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          You can use Lexigenz without signing in, but registering gives you a persistent identity - your data travels with you, not just your device.
        </p>
        <div className="space-y-2">
          {[
            { event: "First visit (no account)", desc: "Lexigenz works immediately. Enter your birth date on the App page to get your archetype and daily word. Data saves locally on your device.", status: "guest" },
            { event: "After registering (free)", desc: "Your streak, Word Journal, archetype, and language preference sync to your account. Access your journal from any device. Streak history is preserved.", status: "registered" },
            { event: "After upgrading to Premium", desc: "English + 1 language unlock instantly (additional languages $2 each). Unlimited Word Journal entries. Ad-free games. Premium themes. Monthly progress report. No expiry - ever.", status: "premium" },
            { event: "Every time you sign in", desc: "Your streak is validated and synced. Today's word is served fresh. Your Word Journal is loaded. Language and archetype settings are restored.", status: "sync" },
          ].map(({ event, desc, status }) => (
            <div key={event} className="flex gap-3 p-3 rounded-xl border border-border bg-muted/30">
              <span className={`text-lg flex-shrink-0 ${status === "premium" ? "text-amber-500" : status === "registered" ? "text-primary" : status === "sync" ? "text-emerald-500" : "text-muted-foreground"}`}>
                {status === "premium" ? "⭐" : status === "registered" ? "✅" : status === "sync" ? "🔄" : "👤"}
              </span>
              <div>
                <p className="text-sm font-semibold">{event}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-3 text-xs">
          <strong className="text-emerald-700 dark:text-emerald-400">Language switching:</strong>
          <span className="text-muted-foreground"> Tap the 🌐 globe icon in the navbar anytime. Instant switch - no page reload needed. Your streak carries over. Premium users only (except English).</span>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    emoji: "🌍",
    label: "Premium & Languages",
    title: "Premium, languages & the invite system",
    tldr: "$8 once. English + 1 language. No subscription. Share via link. Done.",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border rounded-xl p-3 space-y-1">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Free Plan</p>
            {["English only", "Word of the day", "6 word games", "Sentence Builder", "Limited Word Journal", "Basic streak"].map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" /> {f}
              </div>
            ))}
          </div>
          <div className="border-2 border-primary rounded-xl p-3 space-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-bl-lg">$8 once</div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Premium</p>
            {["English + 1 language (+more for $2)", "Unlimited journal", "Ad-free games", "Monthly reports", "Premium themes", "Priority support"].map(f => (
              <div key={f} className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold mb-2">🌐 The 19 languages</p>
          <div className="flex flex-wrap gap-1.5">
            {["English", "Afrikaans", "Zulu", "Xhosa", "French", "Spanish", "Portuguese", "German", "Dutch", "Italian", "Arabic", "Farsi", "Russian", "Bahasa Malay", "Vietnamese", "Tagalog", "Japanese", "Cantonese", "Mandarin"].map(lang => {
              const c = langColor(lang);
              return <span key={lang} className={`text-xs px-2 py-0.5 rounded-full font-medium border ${c.bg} ${c.text} ${c.border}`}>{lang}</span>;
            })}
          </div>
        </div>
        <div className="bg-muted/50 border border-border rounded-xl p-3 space-y-1">
          <p className="text-sm font-bold">📨 Invite & Challenge</p>
          <p className="text-xs text-muted-foreground">Go to the Invite page to send a challenge link to anyone. They don't need a Lexigenz account to play - just click the link. Great for challenging friends on Wordle or Scrabble.</p>
        </div>
      </div>
    ),
  },
];

const QUIZ_QUESTIONS = [
  {
    q: "How many word games does Lexigenz include?",
    options: ["4", "5", "6", "8"],
    answer: 2,
    explanation: "Lexigenz has 6 games: Wordle, Scrabble, Crossword, Spelling Bee, Word Grid, and The Lexigenz Game.",
  },
  {
    q: "What determines your vocabulary archetype on Lexigenz?",
    options: ["A personality quiz", "Your birth date", "Your email address", "Your country"],
    answer: 1,
    explanation: "Your archetype is calculated from your birth date - same date always produces the same archetype.",
  },
  {
    q: "Which action triggers your daily streak check-in?",
    options: ["Reading an Article", "Playing any game", "Visiting the App page", "Opening the FAQ"],
    answer: 2,
    explanation: "Only visiting the App page and engaging with your daily word counts as a streak check-in.",
  },
  {
    q: "What happens to your Word Journal sentences after you write them?",
    options: ["They disappear at midnight", "They're public on your profile", "They save to your private journal", "They're sent to friends"],
    answer: 2,
    explanation: "Every sentence you write saves to your private Word Journal - visible only to you.",
  },
  {
    q: "Lexigenz Premium is priced at:",
    options: ["$8/month", "$8/year", "$8 once", "Free"],
    answer: 2,
    explanation: "Premium is a one-time $8 payment. No subscription, no renewal, no expiry date. Ever.",
  },
];

const CHEAT_SHEET_ITEMS = [
  {
    section: "📍 Navigation",
    color: "border-violet-400/30 bg-violet-500/5",
    items: [
      { label: "Daily learning", value: "/app" },
      { label: "Word games", value: "/play" },
      { label: "Deep reads", value: "/articles" },
      { label: "Tools & browse", value: "/about" },
      { label: "Challenge friends", value: "/invite" },
    ],
  },
  {
    section: "🔥 Streak Rules",
    color: "border-amber-400/30 bg-amber-500/5",
    items: [
      { label: "Trigger", value: "App page visit" },
      { label: "Resets", value: "Midnight local time" },
      { label: "7 days", value: "First badge 🥉" },
      { label: "30 days", value: "Silver badge 🥈" },
      { label: "100 days", value: "Gold badge 🥇" },
      { label: "365 days", value: "Legend badge 🏆" },
    ],
  },
  {
    section: "🎮 Games Quick-Ref",
    color: "border-orange-400/30 bg-orange-500/5",
    items: [
      { label: "Wordle", value: "5-letter, 6 guesses" },
      { label: "Scrabble", value: "Tiles vs AI" },
      { label: "Crossword", value: "Themed grid" },
      { label: "Spelling Bee", value: "7-letter honeycomb" },
      { label: "Word Grid", value: "6×6 search" },
      { label: "Lexigenz Game", value: "Unscramble LEXIGENZ" },
    ],
  },
  {
    section: "⚡ Daily Loop",
    color: "border-primary/30 bg-primary/5",
    items: [
      { label: "Step 1", value: "Open App page" },
      { label: "Step 2", value: "Read daily word" },
      { label: "Step 3", value: "Write sentence" },
      { label: "Step 4", value: "Play a game" },
      { label: "Time needed", value: "~7 minutes" },
      { label: "Resets", value: "Every midnight" },
    ],
  },
  {
    section: "🌍 Languages",
    color: "border-emerald-400/30 bg-emerald-500/5",
    items: [
      { label: "Free plan", value: "English only" },
      { label: "Premium", value: "English + 1 language" },
      { label: "Switch via", value: "🌐 Globe icon" },
      { label: "Streak impact", value: "None" },
      { label: "SA languages", value: "Afrikaans, Zulu, Xhosa" },
      { label: "Asian langs", value: "Japanese, Cantonese, Mandarin" },
    ],
  },
  {
    section: "⭐ Free vs Premium",
    color: "border-blue-400/30 bg-blue-500/5",
    items: [
      { label: "Price", value: "$8 once (lifetime)" },
      { label: "Language unlock", value: "All 19" },
      { label: "Word Journal", value: "Unlimited" },
      { label: "Games", value: "Ad-free" },
      { label: "Reports", value: "Monthly" },
      { label: "Payment", value: "PayPal / Card" },
    ],
  },
];

interface PlaybookSectionProps {
  defaultOpen?: boolean;
}

export default function PlaybookSection({ defaultOpen = false }: PlaybookSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState<"playbook" | "cheatsheet">("playbook");
  const [step, setStep] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null));
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const totalSteps = STEPS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const updated = [...quizAnswers];
    updated[quizQuestion] = idx;
    setQuizAnswers(updated);
    setTimeout(() => {
      if (quizQuestion < QUIZ_QUESTIONS.length - 1) {
        setQuizQuestion(q => q + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setQuizAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setQuizQuestion(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const score = quizAnswers.filter((a, i) => a === QUIZ_QUESTIONS[i].answer).length;

  return (
    <div className="w-full">
      {!open ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent cursor-pointer group"
          onClick={() => setOpen(true)}
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 80% 50%, hsl(var(--primary)/0.3) 0%, transparent 60%)"
          }} />
          <div className="relative px-6 py-5 flex items-center gap-5">
            <div className="text-4xl flex-shrink-0">🎯</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-2 py-0.5 rounded-full">New to Lexigenz?</span>
                <span className="text-xs text-muted-foreground">5 min read</span>
              </div>
              <h3 className="text-xl font-black leading-tight">The Lexigenz Playbook</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                7 interactive lessons + mini quiz + cheat sheet. Everything you need to hit the ground running.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button className="gap-2 group-hover:gap-3 transition-all">
                Start <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="border-t border-primary/20 px-6 py-2 flex gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> 7 lessons</span>
            <span className="flex items-center gap-1.5"><Hash className="h-3 w-3" /> 5-question quiz</span>
            <span className="flex items-center gap-1.5"><LayoutGrid className="h-3 w-3" /> Visual cheat sheet</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> ~5 minutes</span>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="playbook-open"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="border-2 border-primary/30 rounded-2xl overflow-hidden bg-background shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-muted/30">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎯</span>
                <div>
                  <p className="text-sm font-black">The Lexigenz Playbook</p>
                  <p className="text-xs text-muted-foreground">Your complete guide to the platform</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-border">
              {([["playbook", "📖 Lessons + Quiz"], ["cheatsheet", "📋 Cheat Sheet"]] as const).map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${activeTab === tab ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeTab === "playbook" ? (
              <div>
                {!quizMode ? (
                  <>
                    {/* Progress bar */}
                    <div className="px-5 pt-4 pb-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex gap-1.5">
                          {STEPS.map((s, i) => (
                            <button
                              key={s.id}
                              onClick={() => setStep(i)}
                              className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-primary w-6" : i < step ? "bg-primary/50" : "bg-muted-foreground/20"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{step + 1} / {totalSteps}</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>

                    {/* Step content */}
                    <div className="px-5 pb-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{STEPS[step].emoji}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">{STEPS[step].label}</span>
                          </div>
                          <h4 className="text-lg font-black mb-1 leading-tight">{STEPS[step].title}</h4>
                          <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-1.5 mb-4">
                            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                              <span className="font-black">TL;DR:</span> {STEPS[step].tldr}
                            </p>
                          </div>
                          <div className="max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                            {STEPS[step].content}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-muted/20">
                      <Button variant="outline" size="sm" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="gap-1.5">
                        <ChevronLeft className="h-4 w-4" /> Prev
                      </Button>
                      <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                        {STEPS.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => setStep(i)}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${i === step ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                          >
                            {s.emoji}
                          </button>
                        ))}
                      </div>
                      {step < totalSteps - 1 ? (
                        <Button size="sm" onClick={() => setStep(s => s + 1)} className="gap-1.5">
                          Next <ChevronRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" onClick={() => setQuizMode(true)} className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
                          Take Quiz <Sparkles className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </>
                ) : showResult ? (
                  /* Result screen */
                  <div className="px-5 py-8 text-center">
                    <div className="text-5xl mb-3">{score >= 4 ? "🏆" : score >= 3 ? "🌟" : "📚"}</div>
                    <h4 className="text-2xl font-black mb-1">
                      {score >= 4 ? "You're certified!" : score >= 3 ? "Nice work!" : "Almost there!"}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      You got <strong className="text-foreground">{score} out of {QUIZ_QUESTIONS.length}</strong> correct.
                      {score >= 4 ? " You clearly paid attention. Welcome to the Lexigenz crew. 🎯" : " Review the lessons and try again - vocab growth is all about repetition."}
                    </p>

                    {/* Answer review */}
                    <div className="space-y-2 mb-6 text-left">
                      {QUIZ_QUESTIONS.map((q, i) => {
                        const correct = quizAnswers[i] === q.answer;
                        return (
                          <div key={i} className={`rounded-xl p-3 border ${correct ? "border-emerald-400/30 bg-emerald-500/5" : "border-rose-400/30 bg-rose-500/5"}`}>
                            <div className="flex items-start gap-2">
                              {correct ? <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />}
                              <div>
                                <p className="text-xs font-semibold">{q.q}</p>
                                {!correct && (
                                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                                    Correct: <strong>{q.options[q.answer]}</strong>
                                  </p>
                                )}
                                <p className="text-xs text-muted-foreground mt-0.5">{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" size="sm" onClick={resetQuiz} className="gap-1.5">
                        <RotateCcw className="h-4 w-4" /> Retry
                      </Button>
                      <Button size="sm" onClick={() => { setQuizMode(false); setStep(0); resetQuiz(); }} className="gap-1.5">
                        <BookOpen className="h-4 w-4" /> Back to lessons
                      </Button>
                      <Link href="/app">
                        <Button size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700">
                          Start learning <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Quiz mode */
                  <div className="px-5 py-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">Mini Quiz</p>
                        <p className="text-sm font-semibold">Question {quizQuestion + 1} of {QUIZ_QUESTIONS.length}</p>
                      </div>
                      <div className="flex gap-1">
                        {QUIZ_QUESTIONS.map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i < quizQuestion ? "bg-primary" : i === quizQuestion ? "bg-primary/60" : "bg-muted-foreground/20"}`} />
                        ))}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={quizQuestion}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                      >
                        <p className="text-base font-black mb-4 leading-snug">
                          {QUIZ_QUESTIONS[quizQuestion].q}
                        </p>
                        <div className="space-y-2">
                          {QUIZ_QUESTIONS[quizQuestion].options.map((opt, idx) => {
                            const isCorrect = idx === QUIZ_QUESTIONS[quizQuestion].answer;
                            const isSelected = selectedAnswer === idx;
                            let btnClass = "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ";
                            if (selectedAnswer === null) {
                              btnClass += "border-border hover:border-primary hover:bg-primary/5 cursor-pointer";
                            } else if (isCorrect) {
                              btnClass += "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
                            } else if (isSelected) {
                              btnClass += "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400";
                            } else {
                              btnClass += "border-border opacity-40";
                            }

                            return (
                              <motion.button
                                key={opt}
                                className={btnClass}
                                onClick={() => handleAnswer(idx)}
                                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                              >
                                <span className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {["A", "B", "C", "D"][idx]}
                                  </span>
                                  {opt}
                                  {selectedAnswer !== null && isCorrect && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                                  {isSelected && !isCorrect && <XCircle className="h-4 w-4 ml-auto" />}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>

                        {selectedAnswer !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-3 rounded-xl p-3 text-xs ${selectedAnswer === QUIZ_QUESTIONS[quizQuestion].answer ? "bg-emerald-500/10 border border-emerald-400/30 text-emerald-700 dark:text-emerald-400" : "bg-rose-500/10 border border-rose-400/30 text-rose-700 dark:text-rose-400"}`}
                          >
                            {QUIZ_QUESTIONS[quizQuestion].explanation}
                          </motion.div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-4 flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => { setQuizMode(false); }} className="text-muted-foreground gap-1.5">
                        <ChevronLeft className="h-4 w-4" /> Back to lessons
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Cheat Sheet */
              <div className="px-5 py-5">
                <div className="mb-4">
                  <h4 className="text-base font-black">Lexigenz Cheat Sheet</h4>
                  <p className="text-xs text-muted-foreground">Your visual quick-reference - screenshot this and keep it handy.</p>
                </div>

                {/* Visual infographic */}
                <div className="border border-primary/20 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/15 bg-primary/5">
                    <Zap className="h-4 w-4 text-primary" />
                    <p className="text-xs font-black uppercase tracking-wider text-primary">The 7-Minute Daily System</p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-stretch gap-0 overflow-x-auto pb-1">
                      {[
                        { step: "1", label: "App page", sub: "Open daily", emoji: "📱", color: "bg-violet-500" },
                        { step: "2", label: "Read word", sub: "Definition + etymology", emoji: "📖", color: "bg-blue-500" },
                        { step: "3", label: "Build sentence", sub: "Your own words", emoji: "✍️", color: "bg-emerald-500" },
                        { step: "4", label: "Play game", sub: "1 game min.", emoji: "🎮", color: "bg-orange-500" },
                        { step: "5", label: "Streak ✅", sub: "Come back tomorrow", emoji: "🔥", color: "bg-rose-500" },
                      ].map((s, i, arr) => (
                        <div key={s.step} className="flex items-center flex-shrink-0">
                          <div className="text-center w-[88px]">
                            <div className={`w-10 h-10 rounded-full ${s.color} text-white flex items-center justify-center text-xl mx-auto mb-1`}>
                              {s.emoji}
                            </div>
                            <p className="text-xs font-bold leading-tight">{s.label}</p>
                            <p className="text-xs text-muted-foreground leading-tight">{s.sub}</p>
                          </div>
                          {i < arr.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cheat sheet grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CHEAT_SHEET_ITEMS.map(({ section, color, items }) => (
                    <div key={section} className={`border rounded-xl overflow-hidden ${color}`}>
                      <div className="px-3 py-2 border-b border-inherit">
                        <p className="text-xs font-black">{section}</p>
                      </div>
                      <div className="px-3 py-2 space-y-1">
                        {items.map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between gap-2">
                            <span className="text-xs text-muted-foreground flex-shrink-0">{label}</span>
                            <span className="text-xs font-semibold text-right truncate">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Game icons visual row */}
                <div className="mt-4 border border-border rounded-xl overflow-hidden">
                  <div className="px-3 py-2 border-b border-border bg-muted/40">
                    <p className="text-xs font-black">🎮 6 Games Visual Map</p>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-y divide-border">
                    {[
                      { emoji: "🟩", name: "Wordle", rules: "5-letter · 6 guesses · colour clues" },
                      { emoji: "🔤", name: "Scrabble", rules: "Tiles · score by position · vs AI" },
                      { emoji: "✏️", name: "Crossword", rules: "Across + down · themed clues" },
                      { emoji: "🐝", name: "Spelling Bee", rules: "7 letters · honeycomb · pangrams" },
                      { emoji: "🔍", name: "Word Grid", rules: "6×6 grid · all directions · timed" },
                      { emoji: "⏱️", name: "Lexigenz Game", rules: "Unscramble LEXIGENZ · 60 seconds" },
                    ].map(({ emoji, name, rules }) => (
                      <div key={name} className="p-3 text-center">
                        <div className="text-2xl mb-1">{emoji}</div>
                        <p className="text-xs font-bold">{name}</p>
                        <p className="text-xs text-muted-foreground leading-tight">{rules}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak milestones */}
                <div className="mt-3 border border-amber-400/30 bg-amber-500/5 rounded-xl overflow-hidden">
                  <div className="px-3 py-2 border-b border-amber-400/20">
                    <p className="text-xs font-black text-amber-700 dark:text-amber-400">🔥 Streak Milestone Map</p>
                  </div>
                  <div className="flex divide-x divide-amber-400/20 overflow-x-auto">
                    {[
                      { days: "7", label: "Week One", badge: "🥉", subtitle: "Bronze" },
                      { days: "30", label: "Month", badge: "🥈", subtitle: "Silver" },
                      { days: "100", label: "Century", badge: "🥇", subtitle: "Gold" },
                      { days: "365", label: "Year", badge: "🏆", subtitle: "Legend" },
                    ].map(({ days, label, badge, subtitle }) => (
                      <div key={days} className="flex-1 p-3 text-center min-w-[80px]">
                        <div className="text-2xl">{badge}</div>
                        <p className="text-base font-black text-amber-700 dark:text-amber-400">{days}</p>
                        <p className="text-xs font-semibold">{label}</p>
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={() => { setActiveTab("playbook"); setQuizMode(true); resetQuiz(); }} className="gap-1.5 flex-1">
                    <Trophy className="h-4 w-4" /> Take the Quiz
                  </Button>
                  <Link href="/app" className="flex-1">
                    <Button size="sm" variant="outline" className="gap-1.5 w-full">
                      Go to App <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
