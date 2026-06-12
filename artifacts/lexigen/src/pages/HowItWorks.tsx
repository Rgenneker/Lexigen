import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Gamepad2, Users, Zap, Calendar } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Enter your birth date",
    desc: "Your birth date unlocks your personal vocabulary archetype — a unique profile that shapes every word recommendation, daily insight, and language style tip you receive.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Receive your daily word",
    desc: "Every day, Lexigenz delivers a curated word matched to your archetype and chosen language. Read the definition, explore the example sentence, and absorb the context.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Build your sentence",
    desc: "Use the Sentence Builder to write your own sentence with today's word. This is the most powerful step — creating your own context locks the word into long-term memory.",
  },
  {
    number: "04",
    icon: Star,
    title: "Grow your streak & earn badges",
    desc: "Check in daily to keep your streak alive. Hit milestones at 7, 30, 100, and 365 days to unlock achievement badges. Consistency is the whole game.",
  },
  {
    number: "05",
    icon: Gamepad2,
    title: "Play for words",
    desc: "Six Lexigenz-branded word games — Wordle, the Lexigenz Game, Scrabble vs Computer, Crossword, Spelling Bee, and Word Grid. Every game sharpens your vocabulary in a different way.",
  },
  {
    number: "06",
    icon: Users,
    title: "Invite & challenge friends",
    desc: "Share Lexigenz with your circle. Challenge friends to word games, compare streaks, and grow your vocabulary together — no borders, no timezones, just words.",
  },
];

const languages = [
  "English", "Spanish", "Portuguese", "French", "German", "Dutch", "Italian",
  "Arabic", "Afrikaans", "Zulu", "Xhosa", "Farsi", "Russian",
  "Bahasa Malay", "Vietnamese", "Tagalog", "Japanese", "Cantonese", "Chinese (Mandarin)"
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
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
              How It Works
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              SIX STEPS TO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                WORD MASTERY.
              </span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-xl">
              Lexigenz is designed for seven minutes a day. Here's exactly how it works — and why it sticks.
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
              Choose your language.
              <br />
              <span className="text-primary">19 to pick from.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Switch anytime from the globe icon in the navbar. Your word, your archetype, your language.
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
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  ["Afrikaans", "Zulu", "Xhosa"].includes(lang)
                    ? "border-primary/40 bg-primary/10 text-primary font-bold"
                    : "border-border bg-card"
                }`}
              >
                {lang}
              </motion.span>
            ))}
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
            <h2 className="text-4xl font-bold tracking-tighter mb-4">Ready to start?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Seven minutes a day is all it takes. Your words are waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/app">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(139,92,246,0.4)]" data-testid="button-start">
                  Start for Free
                </Button>
              </Link>
              <Link href="/premium">
                <Button size="lg" variant="outline" className="rounded-full border-primary/30 hover:border-primary font-bold px-8">
                  View Premium
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
