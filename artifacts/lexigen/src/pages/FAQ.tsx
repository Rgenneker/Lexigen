import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "What even is Lexigenz?",
    a: "Lexigenz is a daily vocabulary growth app built for Gen Z and millennials. We combine birth-based personality profiling with daily word experiences, streaks, word games, and journalling so language learning actually sticks — and feels worth showing off."
  },
  {
    q: "How does birth-based personalisation work?",
    a: "When you enter your birth date, Lexigenz calculates your archetype — a personality profile based on your birth month and day. Your archetype shapes your daily word recommendations, your language style insights, and your overall learning experience. No two archetypes are the same."
  },
  {
    q: "Is Lexigenz free?",
    a: "Yes — Lexigenz has a robust free tier that includes your daily word, birth archetype profile, streak tracking, and a word journal. Premium unlocks unlimited sentence builder use, advanced monthly progress reports, exclusive themes, no ads, and unlimited access to all word games."
  },
  {
    q: "What languages does Lexigenz support?",
    a: "Lexigenz supports 19 languages: English, Spanish, Portuguese, French, German, Dutch, Italian, Arabic, Afrikaans, Zulu, Xhosa, Farsi, Russian, Bahasa Malay, Vietnamese, Tagalog, Japanese, Cantonese, and Chinese (Mandarin). Switch your language anytime from the navbar."
  },
  {
    q: "What word games are available?",
    a: "Lexigenz's Play for Words section features six fully branded games: Scrabble vs Computer, Wordle vs Computer, Crossword vs Computer, Spelling Bee (Lexigenz Edition), the Word Grid (find words in a 6×6 grid), and the Lexigenz Game — where you race to unscramble 'LEXIGENZ' from 7 letters before time runs out."
  },
  {
    q: "How do streaks work?",
    a: "Check in daily by visiting the App page and engaging with your word. Your streak counter increments every day you come back. Hit milestones at 7, 30, 100, and 365 days to unlock special badges. Miss a day and your streak resets — so make it a habit!"
  },
  {
    q: "Can I challenge friends?",
    a: "Absolutely. Head to the Invite page to send word game challenges to your friends and family. Lexigenz is built to be social — no borders, no timezones stopping you. Challenge someone to a Wordle match or the Lexigenz Game from anywhere in the world."
  },
  {
    q: "What is the Sentence Builder?",
    a: "The Sentence Builder lets you write your own sentence using today's daily word, then saves it to your Word Journal. It's the most powerful way to actually remember words — because you generated the context yourself. Free users can build up to 5 journal entries; Premium unlocks unlimited."
  },
  {
    q: "Is my data private?",
    a: "Yes. Lexigenz collects only what's necessary to power your personalised experience — your birth date (for archetype calculation), your language preference, your streak data, and your journal entries. We never sell your data. Review our full Privacy Policy for details."
  },
  {
    q: "Where is Lexigenz based?",
    a: "Lexigenz is owned and trademarked by Lexigenz Trading, based in South Africa. We're proudly African-built, globally minded. The platform operates in 19 languages and serves learners on every continent."
  },
  {
    q: "How do I cancel Premium?",
    a: "You can manage or cancel your Premium subscription anytime from your account settings. Cancellation takes effect at the end of your billing period — you keep Premium access until then."
  },
  {
    q: "I found a bug. How do I report it?",
    a: "We want to hear about it. Reach us via the Contact link in the footer. Our team monitors reports closely and typically responds within 48 hours."
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-accent bg-accent/10 px-4 py-1.5 rounded-full">
              Got questions
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              We've got
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                answers.
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to know about Lexigenz, in plain language.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-2xl px-6 bg-card data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center p-10 rounded-3xl border border-border bg-card"
          >
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is ready to help. Reach out and we'll get back to you within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8"
                  data-testid="button-try-lexigen"
                >
                  Try Lexigenz Free
                </Button>
              </Link>
              <a href="mailto:hello@lexigen.app">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full font-bold px-8 border-border hover:border-primary/50"
                  data-testid="button-contact"
                >
                  Contact Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
