import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    tldr: "$3 once. English + 1 language. No subscription. Share via link. Done.",
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
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-bl-lg">$3 once</div>
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
    options: ["$3/month", "$3/year", "$3 once", "Free"],
    answer: 2,
    explanation: "Premium is a one-time $3 payment. No subscription, no renewal, no expiry date. Ever.",
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
      { label: "Price", value: "$3 once (lifetime)" },
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

const SPANISH_STEPS = [
  {
    emoji: "🗺️",
    label: "Vista general",
    title: "Bienvenido a Lexigenz: aquí tienes tu orientación",
    summary: "Lexigenz = una palabra al día, seis juegos, tu personalidad y 19 idiomas.",
    body: "Lexigenz es una plataforma diaria para ampliar el vocabulario, creada para quienes quieren mejorar sus habilidades lingüísticas sin complicaciones. Todo el ciclo dura unos 7 minutos al día.",
  },
  {
    emoji: "🧭",
    label: "Navegación",
    title: "Cómo moverte por la plataforma: todas las páginas explicadas",
    summary: "La barra de navegación es tu mapa. Aplicación = centro diario. Jugar = juegos. Artículos = lecturas profundas.",
    body: "La barra de navegación superior contiene todo lo que necesitas. En el móvil se convierte en un menú hamburguesa. Inicio presenta Lexigenz; Acerca de muestra las herramientas; Cómo funciona explica el sistema; Artículos ofrece lecturas; Jugar reúne los seis juegos; Aplicación es tu centro diario; Invitar permite desafiar a tus amigos; y Preguntas frecuentes es el centro de ayuda.",
  },
  {
    emoji: "🌟",
    label: "Tu arquetipo",
    title: "Tu personalidad de vocabulario: cómo funcionan los arquetipos",
    summary: "Fecha de nacimiento → 1 de 12 arquetipos → palabras, estilo y tono personalizados.",
    body: "Cuando introduces tu fecha de nacimiento en la página Aplicación, Lexigenz calcula tu arquetipo de vocabulario: un perfil de personalidad que influye en el estilo, el tono y el tipo de palabras que recibes. Es determinista: la misma fecha siempre produce el mismo arquetipo.",
  },
  {
    emoji: "⚡",
    label: "Ciclo diario",
    title: "El ciclo diario: cómo se fijan realmente las palabras",
    summary: "Lee → escribe una frase → guarda → repasa. La repetición espaciada está integrada.",
    body: "Visita la página Aplicación cada día. Recibirás una palabra adaptada a tu arquetipo y tu idioma, con definición, etimología, pronunciación y ejemplos. Después escribe tu propia frase en el Creador de frases, consulta tu Diario de palabras y vuelve cada día para mantener tu racha.",
  },
  {
    emoji: "🎮",
    label: "6 juegos de palabras",
    title: "Jugar con palabras: tu colección de seis juegos",
    summary: "Ve a Jugar y elige un juego. Cada uno entrena una habilidad de vocabulario diferente.",
    body: "Wordle te pide adivinar una palabra de cinco letras; Scrabble enfrenta tus fichas contra la computadora; Crucigrama utiliza pistas temáticas; Concurso de Ortografía usa siete letras en forma de panal; Cuadrícula de palabras es una búsqueda cronometrada; y el Juego de Lexigenz te reta a ordenar las letras de LEXIGENZ.",
  },
  {
    emoji: "🔐",
    label: "Inicio de sesión",
    title: "Qué ocurre cuando inicias sesión",
    summary: "El inicio de sesión sincroniza tu racha, diario, arquetipo y Premium en todos tus dispositivos.",
    body: "Puedes utilizar Lexigenz sin iniciar sesión, pero registrarte te proporciona una identidad persistente. Tu racha, Diario de palabras, arquetipo y preferencia de idioma se sincronizan con tu cuenta. Al actualizar a Premium se desbloquean idiomas, entradas ilimitadas, juegos sin anuncios, temas exclusivos e informes mensuales.",
  },
  {
    emoji: "🌍",
    label: "Premium e idiomas",
    title: "Premium, idiomas y el sistema de invitaciones",
    summary: "3 $ una sola vez. Inglés + 1 idioma. Sin suscripción. Comparte mediante un enlace.",
    body: "El plan gratuito incluye inglés, la palabra del día, los seis juegos, el Creador de frases, un Diario de palabras limitado y la racha básica. Premium añade un idioma, diario ilimitado, juegos sin anuncios, informes mensuales, temas Premium y asistencia prioritaria. Puedes invitar a cualquiera mediante un enlace y no necesita una cuenta para jugar.",
  },
];

const SPANISH_QUIZ = [
  ["¿Cuántos juegos de palabras incluye Lexigenz?", ["4", "5", "6", "8"], 2, "Lexigenz incluye 6 juegos: Wordle, Scrabble, Crucigrama, Concurso de Ortografía, Cuadrícula de palabras y el Juego de Lexigenz."],
  ["¿Qué determina tu arquetipo de vocabulario en Lexigenz?", ["Un cuestionario de personalidad", "Tu fecha de nacimiento", "Tu dirección de correo", "Tu país"], 1, "Tu arquetipo se calcula a partir de tu fecha de nacimiento; la misma fecha siempre produce el mismo arquetipo."],
  ["¿Qué acción activa el registro de tu racha diaria?", ["Leer un artículo", "Jugar a cualquier juego", "Visitar la página Aplicación", "Abrir las preguntas frecuentes"], 2, "Solo visitar la página Aplicación y trabajar con tu palabra diaria cuenta como registro de la racha."],
  ["¿Qué ocurre con las frases del Diario de palabras después de escribirlas?", ["Desaparecen a medianoche", "Son públicas en tu perfil", "Se guardan en tu diario privado", "Se envían a tus amigos"], 2, "Cada frase que escribes se guarda en tu Diario de palabras privado y solo tú puedes verla."],
  ["El precio de Lexigenz Premium es:", ["3 $ al mes", "3 $ al año", "3 $ una sola vez", "Gratis"], 2, "Premium cuesta 3 $ una sola vez. No hay suscripción, renovación ni fecha de caducidad."],
] as const;

function SpanishPlaybook({ defaultOpen = false }: PlaybookSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [tab, setTab] = useState<"lessons" | "cheat">("lessons");
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [question, setQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState(false);
  const score = answers.filter((answer, index) => answer === SPANISH_QUIZ[index][2]).length;

  if (!open) {
    return (
      <motion.div onClick={() => setOpen(true)} className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent cursor-pointer group">
        <div className="relative px-6 py-5 flex items-center gap-5">
          <div className="text-4xl flex-shrink-0">🎯</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-2 py-0.5 rounded-full">¿Nuevo en Lexigenz?</span>
              <span className="text-xs text-muted-foreground">5 min de lectura</span>
            </div>
            <h3 className="text-xl font-black leading-tight">El manual de Lexigenz</h3>
            <p className="text-sm text-muted-foreground mt-0.5">7 lecciones interactivas + minicuestionario + hoja de referencia. Todo lo que necesitas para empezar.</p>
          </div>
          <Button className="flex-shrink-0 gap-2">Empezar <ChevronRight className="h-4 w-4" /></Button>
        </div>
        <div className="border-t border-primary/20 px-6 py-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> 7 lecciones</span>
          <span className="flex items-center gap-1.5"><Hash className="h-3 w-3" /> Cuestionario de 5 preguntas</span>
          <span className="flex items-center gap-1.5"><LayoutGrid className="h-3 w-3" /> Hoja de referencia visual</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> ~5 minutos</span>
        </div>
      </motion.div>
    );
  }

  const finishAnswer = (answer: number) => {
    const next = [...answers];
    next[question] = answer;
    setAnswers(next);
    setSelected(answer);
    setTimeout(() => {
      if (question < SPANISH_QUIZ.length - 1) {
        setQuestion(value => value + 1);
        setSelected(null);
      } else setResult(true);
    }, 700);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-primary/30 rounded-2xl overflow-hidden bg-background shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-muted/30">
        <div className="flex items-center gap-3"><span className="text-xl">🎯</span><div><p className="text-sm font-black">El manual de Lexigenz</p><p className="text-xs text-muted-foreground">Tu guía completa de la plataforma</p></div></div>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
      </div>
      <div className="flex border-b border-border">
        <button onClick={() => setTab("lessons")} className={`flex-1 py-2.5 text-sm font-semibold ${tab === "lessons" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"}`}>📖 Lecciones + cuestionario</button>
        <button onClick={() => setTab("cheat")} className={`flex-1 py-2.5 text-sm font-semibold ${tab === "cheat" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"}`}>📋 Hoja de referencia</button>
      </div>
      {tab === "lessons" && !quiz && !result && (
        <>
          <div className="px-5 pt-4 pb-2"><div className="flex justify-between mb-1.5"><div className="flex gap-1.5">{SPANISH_STEPS.map((item, index) => <button aria-label={`Lección ${index + 1}`} key={item.title} onClick={() => setStep(index)} className={`w-2 h-2 rounded-full ${index === step ? "bg-primary w-6" : "bg-primary/40"}`} />)}</div><span className="text-xs text-muted-foreground">{step + 1} / {SPANISH_STEPS.length}</span></div><div className="h-1 bg-muted rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: `${((step + 1) / SPANISH_STEPS.length) * 100}%` }} /></div></div>
          <div className="px-5 pb-5"><div className="flex items-center gap-2 mb-1"><span className="text-2xl">{SPANISH_STEPS[step].emoji}</span><span className="text-xs font-bold uppercase tracking-widest text-primary">{SPANISH_STEPS[step].label}</span></div><h4 className="text-lg font-black mb-2">{SPANISH_STEPS[step].title}</h4><div className="bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-1.5 mb-4"><p className="text-xs font-semibold text-amber-700 dark:text-amber-400"><strong>En resumen:</strong> {SPANISH_STEPS[step].summary}</p></div><p className="text-sm text-muted-foreground leading-relaxed">{SPANISH_STEPS[step].body}</p></div>
          <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-muted/20"><Button variant="outline" size="sm" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}><ChevronLeft className="h-4 w-4" /> Anterior</Button><div className="flex gap-1.5"><span className="text-xs text-muted-foreground">{SPANISH_STEPS[step].emoji}</span></div>{step < SPANISH_STEPS.length - 1 ? <Button size="sm" onClick={() => setStep(value => value + 1)}>Siguiente <ChevronRight className="h-4 w-4" /></Button> : <Button size="sm" onClick={() => setQuiz(true)} className="bg-emerald-600 hover:bg-emerald-700">Hacer el cuestionario <Sparkles className="h-4 w-4" /></Button>}</div>
        </>
      )}
      {tab === "lessons" && quiz && !result && (
        <div className="px-5 py-5"><div className="flex items-center justify-between mb-4"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Minicuestionario</p><p className="text-sm font-semibold">Pregunta {question + 1} de {SPANISH_QUIZ.length}</p></div><div className="flex gap-1">{SPANISH_QUIZ.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full ${index <= question ? "bg-primary" : "bg-muted-foreground/20"}`} />)}</div></div><p className="text-base font-black mb-4">{SPANISH_QUIZ[question][0]}</p><div className="space-y-2">{SPANISH_QUIZ[question][1].map((option, index) => <button key={option} onClick={() => selected === null && finishAnswer(index)} className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium ${selected === null ? "border-border hover:border-primary" : index === SPANISH_QUIZ[question][2] ? "border-emerald-500 bg-emerald-500/10" : selected === index ? "border-rose-500 bg-rose-500/10" : "border-border opacity-40"}`}><span className="mr-3 font-bold">{["A", "B", "C", "D"][index]}</span>{option}</button>)}</div>{selected !== null && <p className="mt-3 rounded-xl p-3 text-xs bg-primary/5 border border-primary/20">{SPANISH_QUIZ[question][3]}</p>}<Button variant="ghost" size="sm" onClick={() => setQuiz(false)} className="mt-4"><ChevronLeft className="h-4 w-4" /> Volver a las lecciones</Button></div>
      )}
      {tab === "lessons" && result && <div className="px-5 py-8 text-center"><div className="text-5xl mb-3">{score >= 4 ? "🏆" : score >= 3 ? "🌟" : "📚"}</div><h4 className="text-2xl font-black mb-1">{score >= 4 ? "¡Estás certificado!" : score >= 3 ? "¡Buen trabajo!" : "¡Casi lo consigues!"}</h4><p className="text-muted-foreground text-sm mb-4">Has acertado <strong className="text-foreground">{score} de {SPANISH_QUIZ.length}</strong> preguntas. {score >= 4 ? "Has prestado mucha atención. ¡Bienvenido al equipo Lexigenz!" : "Repasa las lecciones e inténtalo de nuevo: ampliar el vocabulario consiste en repetir."}</p><Button variant="outline" size="sm" onClick={() => { setResult(false); setQuiz(false); setStep(0); setAnswers(Array(5).fill(null)); setQuestion(0); }}><RotateCcw className="h-4 w-4" /> Repetir</Button></div>}
      {tab === "cheat" && <div className="px-5 py-5"><h4 className="text-base font-black">Hoja de referencia de Lexigenz</h4><p className="text-xs text-muted-foreground mb-4">Tu referencia visual rápida: haz una captura y consérvala.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{[["📍 Navegación", [["Aprendizaje diario", "/app"], ["Juegos de palabras", "/play"], ["Lecturas profundas", "/articles"], ["Herramientas", "/about"], ["Desafiar a amigos", "/invite"]]], ["🔥 Reglas de la racha", [["Activación", "Visita Aplicación"], ["Reinicio", "Medianoche local"], ["7 días", "Primera insignia 🥉"], ["30 días", "Insignia de plata 🥈"], ["100 días", "Insignia de oro 🥇"], ["365 días", "Insignia de leyenda 🏆"]]], ["🎮 Juegos", [["Wordle", "5 letras, 6 intentos"], ["Scrabble", "Fichas contra la IA"], ["Crucigrama", "Cuadrícula temática"], ["Concurso de Ortografía", "Panal de 7 letras"], ["Cuadrícula de palabras", "Búsqueda 6×6"], ["Juego de Lexigenz", "Ordena LEXIGENZ"]]], ["🌍 Idiomas", [["Plan gratuito", "Solo inglés"], ["Premium", "Inglés + 1 idioma"], ["Cambiar mediante", "Icono del globo 🌐"], ["Impacto en la racha", "Ninguno"], ["Idiomas sudafricanos", "Afrikáans, zulú, xhosa"]]], ["⭐ Gratis frente a Premium", [["Precio", "3 $ una sola vez"], ["Idiomas", "Los 19"], ["Diario de palabras", "Ilimitado"], ["Juegos", "Sin anuncios"], ["Informes", "Mensuales"], ["Pago", "PayPal / tarjeta"]]]].map(([section, items]) => <div key={section as string} className="border border-primary/20 rounded-xl overflow-hidden bg-primary/5"><p className="px-3 py-2 border-b border-primary/15 text-xs font-black">{section as string}</p><div className="px-3 py-2 space-y-1">{(items as string[][]).map(([label, value]) => <div key={label} className="flex justify-between gap-2"><span className="text-xs text-muted-foreground">{label}</span><span className="text-xs font-semibold text-right">{String(value)}</span></div>)}</div></div>)}</div><div className="mt-4 flex gap-2"><Button size="sm" onClick={() => { setTab("lessons"); setQuiz(true); setResult(false); }} className="flex-1"><Trophy className="h-4 w-4" /> Hacer el cuestionario</Button><Link href="/app" className="flex-1"><Button size="sm" variant="outline" className="w-full">Ir a la aplicación <ArrowRight className="h-4 w-4" /></Button></Link></div></div>}
    </motion.div>
  );
}

const FRENCH_STEPS = [
  { emoji: "🗺️", label: "Vue d’ensemble", title: "Bienvenue sur Lexigenz : voici votre guide d’orientation", summary: "Lexigenz = un mot par jour, six jeux, votre personnalité et 19 langues.", body: "Lexigenz est une plateforme quotidienne d’enrichissement du vocabulaire, conçue pour celles et ceux qui veulent améliorer leurs compétences linguistiques sans effort fastidieux. Tout le cycle prend environ 7 minutes par jour." },
  { emoji: "🧭", label: "Navigation", title: "Se repérer sur la plateforme : chaque page expliquée", summary: "La barre de navigation est votre carte. Application = centre quotidien. Jouer = jeux. Articles = lectures approfondies.", body: "La barre de navigation en haut contient tout ce dont vous avez besoin. Sur mobile, elle devient un menu hamburger. Accueil présente Lexigenz ; À propos présente les outils ; Comment ça marche explique le système ; Articles propose des lectures ; Jouer rassemble les six jeux ; Application est votre centre quotidien ; Inviter vous permet de défier vos amis ; et FAQ est le centre d’aide." },
  { emoji: "🌟", label: "Votre archétype", title: "Votre personnalité de vocabulaire : comment fonctionnent les archétypes", summary: "Date de naissance → 1 des 12 archétypes → mots, style et ton personnalisés.", body: "Lorsque vous saisissez votre date de naissance sur la page Application, Lexigenz calcule votre archétype de vocabulaire : un profil de personnalité qui influence le style, le ton et le type de mots que vous recevez. C’est déterministe : la même date produit toujours le même archétype." },
  { emoji: "⚡", label: "Cycle quotidien", title: "Le cycle quotidien : comment les mots restent vraiment en mémoire", summary: "Lisez → écrivez une phrase → enregistrez → révisez. La répétition espacée est intégrée.", body: "Visitez la page Application chaque jour. Vous recevrez un mot adapté à votre archétype et à votre langue, avec sa définition, son étymologie, sa prononciation et des exemples. Écrivez ensuite votre propre phrase dans le Générateur de phrases, consultez votre Journal de mots et revenez chaque jour pour conserver votre série." },
  { emoji: "🎮", label: "6 jeux de mots", title: "Jouer avec les mots : votre collection de six jeux", summary: "Allez dans Jouer et choisissez un jeu. Chacun entraîne une compétence de vocabulaire différente.", body: "Wordle vous demande de deviner un mot de cinq lettres ; Scrabble vous oppose à l’ordinateur ; les Mots croisés utilisent des indices thématiques ; l’Abeille d’orthographe utilise sept lettres en nid d’abeilles ; la Grille de mots est une recherche chronométrée ; et le Jeu Lexigenz vous met au défi de remettre les lettres de LEXIGENZ dans l’ordre." },
  { emoji: "🔐", label: "Connexion", title: "Ce qui se passe lorsque vous vous connectez", summary: "La connexion synchronise votre série, votre journal, votre archétype et Premium sur tous vos appareils.", body: "Vous pouvez utiliser Lexigenz sans vous connecter, mais l’inscription vous donne une identité persistante. Votre série, votre Journal de mots, votre archétype et votre préférence de langue sont synchronisés avec votre compte. Le passage à Premium débloque des langues, des entrées illimitées, des jeux sans publicité, des thèmes exclusifs et des rapports mensuels." },
  { emoji: "🌍", label: "Premium et langues", title: "Premium, langues et système d’invitation", summary: "3 $ une seule fois. Anglais + 1 langue. Aucun abonnement. Partagez par lien.", body: "L’offre gratuite inclut l’anglais, le mot du jour, les six jeux, le Générateur de phrases, un Journal de mots limité et une série de base. Premium ajoute une langue, un journal illimité, des jeux sans publicité, des rapports mensuels, des thèmes Premium et une assistance prioritaire. Vous pouvez inviter n’importe qui avec un lien, sans qu’un compte soit nécessaire pour jouer." },
] as const;

const FRENCH_QUIZ = [
  ["Combien de jeux de mots Lexigenz propose-t-il ?", ["4", "5", "6", "8"], 2, "Lexigenz propose 6 jeux : Wordle, Scrabble, Mots croisés, Abeille d’orthographe, Grille de mots et le Jeu Lexigenz."],
  ["Qu’est-ce qui détermine votre archétype de vocabulaire sur Lexigenz ?", ["Un test de personnalité", "Votre date de naissance", "Votre adresse e-mail", "Votre pays"], 1, "Votre archétype est calculé à partir de votre date de naissance ; la même date produit toujours le même archétype."],
  ["Quelle action déclenche l’enregistrement de votre série quotidienne ?", ["Lire un article", "Jouer à n’importe quel jeu", "Visiter la page Application", "Ouvrir la FAQ"], 2, "Seule la visite de la page Application et l’utilisation de votre mot quotidien comptent comme un enregistrement de série."],
  ["Que deviennent les phrases de votre Journal de mots après les avoir écrites ?", ["Elles disparaissent à minuit", "Elles sont publiques sur votre profil", "Elles sont enregistrées dans votre journal privé", "Elles sont envoyées à vos amis"], 2, "Chaque phrase que vous écrivez est enregistrée dans votre Journal de mots privé, visible uniquement par vous."],
  ["Le prix de Lexigenz Premium est de :", ["3 $ par mois", "3 $ par an", "3 $ une seule fois", "Gratuit"], 2, "Premium coûte 3 $ une seule fois. Il n’y a ni abonnement, ni renouvellement, ni date d’expiration."],
] as const;

const MANDARIN_STEPS = [
  ["🗺️", "平台概览", "欢迎来到 Lexigenz：快速了解平台", "Lexigenz = 每日一词、六款游戏、你的语言个性和 19 种语言。", "Lexigenz 是一个每日词汇成长平台。完整学习循环约需 7 分钟：认识一个词、亲自造句，再通过游戏和复习巩固记忆。"],
  ["🧭", "导航", "如何浏览每个页面", "导航栏就是你的地图。App 用于每日学习，Play 用于游戏，Articles 提供深度阅读。", "在手机上，导航栏会变成菜单。Home 介绍平台；About 汇集工具；How It Works 说明系统；Invite 可向朋友发送挑战链接；FAQ 提供帮助。"],
  ["🌟", "你的原型", "词汇个性如何运作", "出生日期 → 12 个原型之一 → 个性化的词语、风格和语气。", "在 App 页面输入出生日期后，Lexigenz 会计算你的词汇原型。相同日期始终产生相同原型；它用来匹配你收到的每日词语。"],
  ["⚡", "每日循环", "词语如何真正留在记忆中", "阅读 → 造句 → 记录 → 复习；间隔重复已包含在流程中。", "每天打开 App，阅读你的每日单词及其定义、词源、发音和例句。然后在 Sentence Builder 中写自己的句子，并在 Word Journal 中回顾。"],
  ["🎮", "6 款词语游戏", "通过游戏练习词汇", "前往 Play 并选择游戏；每款游戏训练不同的词汇能力。", "Wordle、Scrabble、Crossword、Spelling Bee、Word Grid 和 The Lexigenz Game 都保留其英文游戏名称。它们分别练习猜词、拼写、线索和快速回忆。"],
  ["🔐", "登录与同步", "登录后会发生什么", "登录会在所有设备间同步连续学习、日志、原型和 Premium。", "你可以不登录使用 Lexigenz。注册后，你的连续记录、Word Journal、原型和语言偏好会同步到账号；Premium 可解锁更多语言和功能。"],
  ["🌍", "Premium 与语言", "语言和邀请系统", "$3 一次性付费：英语加一种语言，无订阅。", "免费方案提供英语、每日单词、六款游戏和基础连续记录。你可以通过链接邀请任何人挑战，无需对方拥有 Lexigenz 账号。"],
] as const;

function MandarinPlaybook({ defaultOpen = false }: PlaybookSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [step, setStep] = useState(0);
  if (!open) return <motion.div onClick={() => setOpen(true)} className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent cursor-pointer">
    <div className="px-6 py-5 flex items-center gap-5"><div className="text-4xl">🎯</div><div className="flex-1"><div className="text-xs font-bold uppercase tracking-widest text-primary">刚开始使用 Lexigenz？</div><h3 className="text-xl font-black">Lexigenz 使用指南</h3><p className="text-sm text-muted-foreground">7 节互动课程，快速掌握平台。</p></div><Button>开始 <ChevronRight className="h-4 w-4" /></Button></div>
  </motion.div>;
  const current = MANDARIN_STEPS[step];
  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-primary/30 rounded-2xl overflow-hidden bg-background shadow-xl">
    <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-muted/30"><div><p className="text-sm font-black">Lexigenz 使用指南</p><p className="text-xs text-muted-foreground">你的完整平台指南</p></div><button aria-label="关闭" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button></div>
    <div className="px-5 pt-4"><div className="flex justify-between text-xs text-muted-foreground mb-2"><span>课程 {step + 1} / {MANDARIN_STEPS.length}</span><span>约 5 分钟</span></div><div className="h-1 bg-muted rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: `${((step + 1) / MANDARIN_STEPS.length) * 100}%` }} /></div></div>
    <div className="px-5 py-5"><div className="flex items-center gap-2"><span className="text-2xl">{current[0]}</span><span className="text-xs font-bold text-primary">{current[1]}</span></div><h4 className="text-lg font-black mt-2">{current[2]}</h4><div className="bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2 mt-3 text-sm font-semibold text-amber-700 dark:text-amber-400">简而言之：{current[3]}</div><p className="text-sm text-muted-foreground leading-relaxed mt-4">{current[4]}</p></div>
    <div className="border-t border-border px-5 py-3 flex justify-between bg-muted/20"><Button variant="outline" size="sm" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}><ChevronLeft className="h-4 w-4" /> 上一课</Button>{step < MANDARIN_STEPS.length - 1 ? <Button size="sm" onClick={() => setStep(value => value + 1)}>下一课 <ChevronRight className="h-4 w-4" /></Button> : <Link href="/app"><Button size="sm">前往 App <ArrowRight className="h-4 w-4" /></Button></Link>}</div>
  </motion.div>;
}

function FrenchPlaybook({ defaultOpen = false }: PlaybookSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [tab, setTab] = useState<"lessons" | "cheat">("lessons");
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [question, setQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState(false);
  const score = answers.filter((answer, index) => answer === FRENCH_QUIZ[index][2]).length;

  if (!open) return <motion.div onClick={() => setOpen(true)} className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent cursor-pointer group"><div className="relative px-6 py-5 flex items-center gap-5"><div className="text-4xl flex-shrink-0">🎯</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-2 py-0.5 rounded-full">Nouveau sur Lexigenz ?</span><span className="text-xs text-muted-foreground">5 min de lecture</span></div><h3 className="text-xl font-black leading-tight">Le guide Lexigenz</h3><p className="text-sm text-muted-foreground mt-0.5">7 leçons interactives + mini-quiz + fiche mémo. Tout ce qu’il vous faut pour commencer.</p></div><Button className="flex-shrink-0 gap-2">Commencer <ChevronRight className="h-4 w-4" /></Button></div><div className="border-t border-primary/20 px-6 py-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> 7 leçons</span><span className="flex items-center gap-1.5"><Hash className="h-3 w-3" /> Quiz de 5 questions</span><span className="flex items-center gap-1.5"><LayoutGrid className="h-3 w-3" /> Fiche mémo visuelle</span><span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> ~5 minutes</span></div></motion.div>;

  const finishAnswer = (answer: number) => {
    const next = [...answers]; next[question] = answer; setAnswers(next); setSelected(answer);
    setTimeout(() => { if (question < FRENCH_QUIZ.length - 1) { setQuestion(value => value + 1); setSelected(null); } else setResult(true); }, 700);
  };
  const cheatSections = [
    ["📍 Navigation", [["Apprentissage quotidien", "/app"], ["Jeux de mots", "/play"], ["Lectures approfondies", "/articles"], ["Outils", "/about"], ["Défier des amis", "/invite"]]],
    ["🔥 Règles de série", [["Déclencheur", "Visite de l’Application"], ["Réinitialisation", "Minuit local"], ["7 jours", "Premier badge 🥉"], ["30 jours", "Badge argent 🥈"], ["100 jours", "Badge or 🥇"], ["365 jours", "Badge légende 🏆"]]],
    ["🎮 Jeux", [["Wordle", "5 lettres, 6 essais"], ["Scrabble", "Tuiles contre l’IA"], ["Mots croisés", "Grille thématique"], ["Abeille d’orthographe", "Nid d’abeilles à 7 lettres"], ["Grille de mots", "Recherche 6×6"], ["Jeu Lexigenz", "Remettez LEXIGENZ dans l’ordre"]]],
    ["🌍 Langues", [["Offre gratuite", "Anglais uniquement"], ["Premium", "Anglais + 1 langue"], ["Changer via", "Icône globe 🌐"], ["Impact sur la série", "Aucun"], ["Langues sud-africaines", "Afrikaans, zoulou, xhosa"]]],
    ["⭐ Gratuit ou Premium", [["Prix", "3 $ une seule fois"], ["Langues", "Les 19"], ["Journal de mots", "Illimité"], ["Jeux", "Sans publicité"], ["Rapports", "Mensuels"], ["Paiement", "PayPal / carte"]]],
  ] as const;
  return <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-primary/30 rounded-2xl overflow-hidden bg-background shadow-xl">
    <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-muted/30"><div className="flex items-center gap-3"><span className="text-xl">🎯</span><div><p className="text-sm font-black">Le guide Lexigenz</p><p className="text-xs text-muted-foreground">Votre guide complet de la plateforme</p></div></div><button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button></div>
    <div className="flex border-b border-border"><button onClick={() => setTab("lessons")} className={`flex-1 py-2.5 text-sm font-semibold ${tab === "lessons" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"}`}>📖 Leçons + quiz</button><button onClick={() => setTab("cheat")} className={`flex-1 py-2.5 text-sm font-semibold ${tab === "cheat" ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground"}`}>📋 Fiche mémo</button></div>
    {tab === "lessons" && !quiz && !result && <><div className="px-5 pt-4 pb-2"><div className="flex justify-between mb-1.5"><div className="flex gap-1.5">{FRENCH_STEPS.map((item, index) => <button aria-label={`Leçon ${index + 1}`} key={item.title} onClick={() => setStep(index)} className={`w-2 h-2 rounded-full ${index === step ? "bg-primary w-6" : "bg-primary/40"}`} />)}</div><span className="text-xs text-muted-foreground">{step + 1} / {FRENCH_STEPS.length}</span></div><div className="h-1 bg-muted rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: `${((step + 1) / FRENCH_STEPS.length) * 100}%` }} /></div></div><div className="px-5 pb-5"><div className="flex items-center gap-2 mb-1"><span className="text-2xl">{FRENCH_STEPS[step].emoji}</span><span className="text-xs font-bold uppercase tracking-widest text-primary">{FRENCH_STEPS[step].label}</span></div><h4 className="text-lg font-black mb-2">{FRENCH_STEPS[step].title}</h4><div className="bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-1.5 mb-4"><p className="text-xs font-semibold text-amber-700 dark:text-amber-400"><strong>En bref :</strong> {FRENCH_STEPS[step].summary}</p></div><p className="text-sm text-muted-foreground leading-relaxed">{FRENCH_STEPS[step].body}</p></div><div className="border-t border-border px-5 py-3 flex items-center justify-between bg-muted/20"><Button variant="outline" size="sm" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}><ChevronLeft className="h-4 w-4" /> Précédent</Button><div className="flex gap-1.5"><span className="text-xs text-muted-foreground">{FRENCH_STEPS[step].emoji}</span></div>{step < FRENCH_STEPS.length - 1 ? <Button size="sm" onClick={() => setStep(value => value + 1)}>Suivant <ChevronRight className="h-4 w-4" /></Button> : <Button size="sm" onClick={() => setQuiz(true)} className="bg-emerald-600 hover:bg-emerald-700">Faire le quiz <Sparkles className="h-4 w-4" /></Button>}</div></>}
    {tab === "lessons" && quiz && !result && <div className="px-5 py-5"><div className="flex items-center justify-between mb-4"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Mini-quiz</p><p className="text-sm font-semibold">Question {question + 1} sur {FRENCH_QUIZ.length}</p></div><div className="flex gap-1">{FRENCH_QUIZ.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full ${index <= question ? "bg-primary" : "bg-muted-foreground/20"}`} />)}</div></div><p className="text-base font-black mb-4">{FRENCH_QUIZ[question][0]}</p><div className="space-y-2">{FRENCH_QUIZ[question][1].map((option, index) => <button key={option} onClick={() => selected === null && finishAnswer(index)} className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium ${selected === null ? "border-border hover:border-primary" : index === FRENCH_QUIZ[question][2] ? "border-emerald-500 bg-emerald-500/10" : selected === index ? "border-rose-500 bg-rose-500/10" : "border-border opacity-40"}`}><span className="mr-3 font-bold">{["A", "B", "C", "D"][index]}</span>{option}</button>)}</div>{selected !== null && <p className="mt-3 rounded-xl p-3 text-xs bg-primary/5 border border-primary/20">{FRENCH_QUIZ[question][3]}</p>}<Button variant="ghost" size="sm" onClick={() => setQuiz(false)} className="mt-4"><ChevronLeft className="h-4 w-4" /> Retour aux leçons</Button></div>}
    {tab === "lessons" && result && <div className="px-5 py-8 text-center"><div className="text-5xl mb-3">{score >= 4 ? "🏆" : score >= 3 ? "🌟" : "📚"}</div><h4 className="text-2xl font-black mb-1">{score >= 4 ? "Vous êtes certifié(e) !" : score >= 3 ? "Beau travail !" : "Vous y êtes presque !"}</h4><p className="text-muted-foreground text-sm mb-4">Vous avez obtenu <strong className="text-foreground">{score} sur {FRENCH_QUIZ.length}</strong>. {score >= 4 ? "Vous avez été très attentif(ve). Bienvenue dans l’équipe Lexigenz !" : "Relisez les leçons et réessayez : enrichir son vocabulaire repose sur la répétition."}</p><Button variant="outline" size="sm" onClick={() => { setResult(false); setQuiz(false); setStep(0); setAnswers(Array(5).fill(null)); setQuestion(0); }}><RotateCcw className="h-4 w-4" /> Recommencer</Button></div>}
    {tab === "cheat" && <div className="px-5 py-5"><h4 className="text-base font-black">Fiche mémo Lexigenz</h4><p className="text-xs text-muted-foreground mb-4">Votre référence visuelle rapide : faites une capture d’écran et conservez-la.</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{cheatSections.map(([section, items]) => <div key={section} className="border border-primary/20 rounded-xl overflow-hidden bg-primary/5"><p className="px-3 py-2 border-b border-primary/15 text-xs font-black">{section}</p><div className="px-3 py-2 space-y-1">{items.map(([label, value]) => <div key={label} className="flex justify-between gap-2"><span className="text-xs text-muted-foreground">{label}</span><span className="text-xs font-semibold text-right">{value}</span></div>)}</div></div>)}</div><div className="mt-4 flex gap-2"><Button size="sm" onClick={() => { setTab("lessons"); setQuiz(true); setResult(false); }} className="flex-1"><Trophy className="h-4 w-4" /> Faire le quiz</Button><Link href="/app" className="flex-1"><Button size="sm" variant="outline" className="w-full">Aller à l’application <ArrowRight className="h-4 w-4" /></Button></Link></div></div>}
  </motion.div>;
}

export default function PlaybookSection({ defaultOpen = false }: PlaybookSectionProps) {
  const { i18n } = useTranslation();
  if (i18n.language === "es") return <SpanishPlaybook defaultOpen={defaultOpen} />;
  if (i18n.language === "fr") return <FrenchPlaybook defaultOpen={defaultOpen} />;
  if (i18n.language === "zh") return <MandarinPlaybook defaultOpen={defaultOpen} />;
  return <EnglishPlaybook defaultOpen={defaultOpen} />;
}

function EnglishPlaybook({ defaultOpen = false }: PlaybookSectionProps) {
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
