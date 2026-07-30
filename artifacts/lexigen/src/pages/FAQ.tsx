import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AdsterraAd from "@/components/AdsterraAd";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PremiumPreviewModal } from "@/components/PremiumPreviewModal";
import { PaymentModal } from "@/components/PaymentModal";
import { FreemiumModal } from "@/components/FreemiumModal";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PlaybookSection from "@/components/PlaybookSection";
import { useTranslation } from "react-i18next";

const faqs: { q: string; a: string; category: string }[] = [
  // Getting Started
  {
    category: "Getting Started",
    q: "What exactly is Lexigenz?",
    a: "Lexigenz is a personalised daily vocabulary growth platform built for Gen Z and millennials. It combines birth-based personality profiling with daily curated words, a sentence builder, six word games, streak tracking, and a personal Word Journal - all available in 19 languages. It's not just a dictionary app. It's a complete vocabulary development system built around who you are, not just what you want to learn."
  },
  {
    category: "Getting Started",
    q: "Who is Lexigenz built for?",
    a: "Lexigenz is designed for anyone who wants to grow their vocabulary in a way that feels natural and genuinely engaging - not like homework. The core audience is Gen Z and millennials aged 16–40, but the platform works for anyone who values language, loves word games, is learning a new language, or wants to communicate more powerfully in their daily life."
  },
  {
    category: "Getting Started",
    q: "How do I start using Lexigenz?",
    a: "Visit the App page to get your first daily word immediately - no sign-up required to start. Enter your birth date to unlock your archetype, choose your language, and you're in. For a registered experience with a saved Word Journal, streaks, and progress tracking, click 'Register Free' on the homepage. It takes under 60 seconds."
  },
  {
    category: "Getting Started",
    q: "Is there a mobile app?",
    a: "Lexigenz is fully optimised for mobile browsers - it's designed to feel like a native app when accessed on your phone. You can add it to your home screen directly from your mobile browser (using 'Add to Home Screen' in Chrome or Safari) for an app-like experience without downloading anything from an app store."
  },
  {
    category: "Getting Started",
    q: "What makes Lexigenz different from other vocabulary apps?",
    a: "Most vocabulary apps give every user the same word lists. Lexigenz personalises your entire vocabulary experience from your birth date - your archetype defines the style, tone, and type of words you receive. Beyond that, the multi-modal learning loop (read → build a sentence → play games → streak → journal) is specifically engineered for retention. You don't just see a word once and move on."
  },
  {
    category: "Getting Started",
    q: "How does the daily word system work?",
    a: "Every day, Lexigenz surfaces a new word tailored to your archetype and your selected language. The word comes with a full definition, example sentences, etymology (where available), and a prompt to write your own sentence in the Sentence Builder. The word resets at midnight in your local timezone."
  },
  {
    category: "Getting Started",
    q: "What is the Sentence Builder?",
    a: "The Sentence Builder is a writing prompt attached to each daily word. It asks you to write your own sentence using the word in a context that's meaningful to you. Generating your own sentence is the most powerful vocabulary retention method - because you're creating a personal memory anchor for the word, not just passively reading someone else's example. Every sentence you write saves to your Word Journal."
  },
  {
    category: "Getting Started",
    q: "What is the Word Journal?",
    a: "Your Word Journal is a chronological archive of every word you've engaged with on Lexigenz - including the sentences you wrote, the date you encountered the word, and the language it was in. It becomes a personal vocabulary history that grows with you. Free users have a limited journal capacity; Premium users get unlimited entries."
  },

  // Archetypes
  {
    category: "Archetypes",
    q: "What is a vocabulary archetype?",
    a: "A vocabulary archetype is a personality-driven language profile that determines the style, tone, and type of words Lexigenz sends you. There are 12 archetypes - The Visionary, The Nurturer, The Explorer, The Sage, The Creator, The Guardian, The Rebel, The Diplomat, The Achiever, The Mystic, The Maverick, and The Harmonizer. Each archetype has its own vocabulary strengths, language style, and recommended word set."
  },
  {
    category: "Archetypes",
    q: "How is my archetype calculated?",
    a: "Your archetype is calculated from your birth month and day. The system maps your birth date to one of the 12 archetypes using a deterministic algorithm - meaning two people born on the same date will always get the same archetype. It's not horoscope-based; it's a personality typing system inspired by numerological and chronological patterns."
  },
  {
    category: "Archetypes",
    q: "Can my archetype change?",
    a: "Your archetype is fixed to your birth date - it won't change unless you update your birth date in your profile. This is intentional: your archetype is meant to be a stable identity within Lexigenz that your vocabulary grows around, not a variable that shifts week to week."
  },
  {
    category: "Archetypes",
    q: "What if I don't like my archetype's word style?",
    a: "Your archetype influences your word recommendations but doesn't lock you into a narrow box. Lexigenz also offers language switching, game-based learning across all word types, and a broad daily word pool. If you genuinely feel a different archetype fits you better, you can update your birth date to explore different archetypes."
  },
  {
    category: "Archetypes",
    q: "Which archetype has the most advanced vocabulary?",
    a: "The Sage and The Mystic tend toward the most complex and rare vocabulary - words that are precise, philosophical, and often Latin or Greek in origin. The Rebel and The Maverick lean toward contemporary, edgy, and hybrid vocabulary. The Explorer tends toward eclectic, cross-cultural terms. But all 12 archetypes receive rich, interesting words - the difference is in style and register, not quality."
  },

  // Games
  {
    category: "Games",
    q: "What word games does Lexigenz include?",
    a: "Lexigenz's Play for Words section features six fully branded games: Scrabble vs Computer (tile-based word formation), Wordle vs Computer (5-letter daily guessing game), Crossword vs Computer (themed crossword puzzles), Spelling Bee Lexigenz Edition (7-letter honeycomb word hunt), Word Grid (hidden word search in a 6×6 grid), and The Lexigenz Game (unscramble 'LEXIGENZ' from 7 letters before the timer runs out)."
  },
  {
    category: "Games",
    q: "Do I need Premium to play the games?",
    a: "Free users get access to the full games suite. Premium users get an ad-free gaming experience and access to expanded game modes. Games are a core part of the free Lexigenz experience - we believe play-based learning should be accessible to everyone."
  },
  {
    category: "Games",
    q: "Are the games connected to my daily word?",
    a: "Yes. The Wordle and Crossword games prioritise words from your archetype word pool, which overlaps with your daily word recommendations. This means the games actively reinforce what you've been learning, rather than using completely random word sets."
  },
  {
    category: "Games",
    q: "What is The Lexigenz Game?",
    a: "The Lexigenz Game is our signature original game. You're given 7 random letters drawn from the letters in 'LEXIGENZ' and must unscramble them to spell the full word before the countdown timer hits zero. It sounds simple - but under pressure, it's surprisingly addictive. It's also the fastest game to complete, making it perfect for a 60-second vocabulary session."
  },
  {
    category: "Games",
    q: "Can I challenge friends to the games?",
    a: "Yes. The Invite page lets you send direct game challenges to friends and family anywhere in the world. Challenges can be sent via link - no app download needed for the recipient. Lexigenz is designed to make vocabulary social, not solitary."
  },
  {
    category: "Games",
    q: "Does my game performance affect my streak?",
    a: "Streaks are based on daily check-ins to the App page, not game performance. Playing games doesn't reset or break your streak. However, game scores are tracked separately and contribute to your monthly progress report, so there's still a reason to play well."
  },

  // Premium
  {
    category: "Premium",
    q: "What does Premium include?",
    a: "Lexigenz Premium unlocks: English + 1 language of your choice (Free is English only - additional languages available for $2 each), unlimited Sentence Builder use, full Word Journal with no entry cap, monthly detailed progress reports, exclusive Premium visual themes, a completely ad-free experience, and priority support. Premium is a one-time payment of $8 - no subscription, no monthly fees, no expiry date."
  },
  {
    category: "Premium",
    q: "Is Premium a subscription or a one-time payment?",
    a: "Premium is a once-off payment of $8. You pay once and have Premium access with no recurring charges, no renewal reminders, no cancellation needed. This is a deliberate design choice. We believe that meaningful tools should be affordable and permanent, not a subscription you have to remember to cancel."
  },
  {
    category: "Premium",
    q: "How do I upgrade to Premium?",
    a: "Click 'Get Premium' in the navbar or visit the Premium page. Enter your initials, surname, country, and mobile number, then choose to pay via your PayPal account or a credit/debit card through the PayPal secure checkout. Payment is processed by PayPal - Lexigenz never stores your card details."
  },
  {
    category: "Premium",
    q: "Which payment methods are accepted?",
    a: "Lexigenz uses PayPal to process all Premium payments. You can pay with your existing PayPal account, or use a credit or debit card directly through PayPal's card entry form - no PayPal account required. All major international card brands are accepted."
  },
  {
    category: "Premium",
    q: "Is my payment secure?",
    a: "Yes. All payments are processed by PayPal, one of the world's most trusted payment platforms. Lexigenz never receives or stores your card details. The transaction is encrypted end-to-end by PayPal's infrastructure."
  },
  {
    category: "Premium",
    q: "What currency is Premium priced in?",
    a: "Premium is priced in USD ($8.00). PayPal automatically handles currency conversion for international buyers, so you'll see the equivalent amount in your local currency at checkout. No additional conversion fees are charged by Lexigenz."
  },

  // Languages
  {
    category: "Languages",
    q: "Which 19 languages does Lexigenz support?",
    a: "Lexigenz supports: English, Afrikaans, Zulu, Xhosa, French, Spanish, Portuguese, German, Dutch, Italian, Arabic, Farsi, Russian, Bahasa Malay, Vietnamese, Tagalog, Japanese, Cantonese, and Chinese (Mandarin). Free users have access to English only. Premium includes English + 1 language of your choice. Additional languages are available for $2 each."
  },
  {
    category: "Languages",
    q: "Why does the free plan only include English?",
    a: "English serves as the platform's universal baseline, allowing all users to experience the full Lexigenz learning loop without needing to pay. Supporting 19 high-quality language word sets requires ongoing editorial work - offering additional languages as a Premium feature allows us to maintain quality across all of them sustainably."
  },
  {
    category: "Languages",
    q: "Can I switch languages mid-streak?",
    a: "Yes. Language switching is instant via the globe icon in the navbar. Your streak counter, Word Journal, and archetype all carry over - only the daily word changes to reflect your new language. There is no penalty for switching languages."
  },
  {
    category: "Languages",
    q: "Why does Lexigenz include Afrikaans, Zulu, and Xhosa?",
    a: "Lexigenz was built in South Africa, a country with 11 official languages. Afrikaans, Zulu, and Xhosa are among the most widely spoken South African languages, and their inclusion is both a cultural commitment and a practical one: many of our users are proudly South African and want to grow their vocabulary in their mother tongue. These three languages are highlighted in the Premium language selector as our founding languages."
  },

  // Privacy & Data
  {
    category: "Privacy & Data",
    q: "What data does Lexigenz collect?",
    a: "Lexigenz collects only what is necessary to power your personalised experience: your birth date (to calculate your archetype), your selected language, your streak data, and your Word Journal entries. If you register, we also collect your initials, surname, country, and mobile number for account identification purposes."
  },
  {
    category: "Privacy & Data",
    q: "Does Lexigenz sell my data?",
    a: "Never. Lexigenz does not sell, trade, or share your personal data with third parties for commercial purposes. Your data is used solely to power your Lexigenz experience. For the complete breakdown, see our Privacy Policy linked in the footer."
  },
  {
    category: "Privacy & Data",
    q: "Is my Word Journal private?",
    a: "Yes. Your Word Journal is private to you - it is not shared with other users, visible on the platform, or used for any purpose outside your own review. It is stored against your user profile and accessible only through your account."
  },
  {
    category: "Privacy & Data",
    q: "Where is Lexigenz based and who operates it?",
    a: "Lexigenz is owned, trademarked, and operated by Lexigenz Trading, registered in South Africa. We are an African-built, globally deployed platform. Legal enquiries and data requests can be directed to hello@lexigenz.com."
  },

  // Technical
  {
    category: "Technical",
    q: "Why is my streak not updating?",
    a: "Streaks update when you visit the App page and engage with your daily word. Make sure you're visiting the App section specifically - navigating other pages of the site does not trigger a streak check-in. If your streak hasn't updated despite a visit, try refreshing the App page. If the issue persists, contact us via the Contact page."
  },
  {
    category: "Technical",
    q: "I found a bug. How do I report it?",
    a: "We want to hear about it. Use the Contact link in the footer to send us a bug report. Include the page where you encountered the issue, what you were doing at the time, and what device and browser you were using. Our team monitors reports closely and typically responds within 48 business hours."
  },
  {
    category: "Technical",
    q: "The PayPal payment form isn't loading. What should I do?",
    a: "First, make sure you haven't blocked third-party scripts in your browser settings - the PayPal JS SDK is loaded from PayPal's servers and requires script access to run. Try disabling any ad-blockers temporarily. If the issue persists on a different browser or network, contact us at hello@lexigenz.com and we'll assist you directly."
  },
  {
    category: "Technical",
    q: "Can I use Lexigenz offline?",
    a: "Lexigenz is a web-based platform and currently requires an internet connection to load your daily word, sync your streak, and access the games. We're exploring offline features for a future update. For now, the lightest way to access Lexigenz on mobile is to add the site to your home screen - it loads quickly even on slower connections."
  },

  // Vocabulary
  {
    category: "Vocabulary",
    q: "How do I improve my vocabulary quickly?",
    a: "The fastest path to vocabulary growth is a daily system - not a cramming session. Learn one new word every day with full context: its definition, etymology, and an example sentence you write yourself. Use spaced repetition to review words at increasing intervals (day 1, 3, 7, 14, 30). Read broadly outside your comfort zone. And use every new word in real conversation within 24 hours of learning it. Lexigenz is built around this exact system - one word per day, sentence builder, game reinforcement, and a Word Journal to track your progress."
  },
  {
    category: "Vocabulary",
    q: "What is the difference between active and passive vocabulary?",
    a: "Your passive vocabulary is the set of words you understand when you read or hear them. Your active vocabulary is the set of words you actually use when you speak or write. Most adults have a passive vocabulary three to five times larger than their active vocabulary. The goal of vocabulary building is to convert passive recognition into active use - which requires deliberate practice like sentence writing, not just reading definitions."
  },
  {
    category: "Vocabulary",
    q: "How many words does the average person know?",
    a: "Research suggests adult native English speakers have passive vocabularies of around 20,000–35,000 words, with active vocabularies of 5,000–10,000 words. Highly educated professionals and avid readers can have passive vocabularies exceeding 50,000 words. Vocabulary growth slows significantly in adulthood unless deliberately cultivated - which is exactly what Lexigenz is designed to support."
  },
  {
    category: "Vocabulary",
    q: "What vocabulary level do I need for professional English?",
    a: "Research suggests that a vocabulary of around 8,000–9,000 word families provides access to approximately 98% of everyday professional English text. However, truly fluent and confident professional communication requires an active vocabulary well above this - particularly for writing, presenting, and negotiating. Academic and executive-level communication draws on a significantly broader range of precise, formal vocabulary. Lexigenz includes vocabulary lists tailored to business, academic, and advanced English contexts."
  },
  {
    category: "Vocabulary",
    q: "Does Lexigenz help with GRE or IELTS vocabulary preparation?",
    a: "Yes. Lexigenz's vocabulary library includes high-frequency academic and advanced English words that appear frequently in GRE verbal sections, IELTS reading and writing tasks, and similar standardised tests. The personalised daily word system, sentence builder, and spaced repetition structure make it effective preparation for vocabulary-intensive exams - alongside dedicated test prep resources."
  },
  {
    category: "Vocabulary",
    q: "What are the best words to learn to sound more professional?",
    a: "The most impactful professional vocabulary upgrades come from Tier 2 academic and business words - high-frequency words that appear across many professional contexts. Words like: articulate, substantiate, commensurate, iterate, pragmatic, synthesise, cogent, perspicacious, and galvanise. These words are precise, versatile, and signal clear, confident thinking. The Lexigenz vocabulary hub includes curated business vocabulary lists you can explore at your own pace."
  },
  {
    category: "Vocabulary",
    q: "How does Lexigenz's word-of-the-day work?",
    a: "Every day, Lexigenz delivers one new word matched to your birth-based vocabulary archetype. Unlike generic word-of-the-day services, Lexigenz personalises the selection based on your archetype's language profile - so the words align with how you naturally think and communicate. Each word comes with its full definition, pronunciation, etymology, example sentences, and a Sentence Builder prompt so you can create your own context for the word and save it to your Word Journal."
  },
  {
    category: "Vocabulary",
    q: "Can vocabulary building help my Wordle and Scrabble performance?",
    a: "Absolutely. Wordle rewards knowledge of common five-letter word patterns and high-frequency English letters (E, A, R, O, T, L, I, S, N). Scrabble rewards a completely different set - two-letter words, high-value Q/Z/X words, and bingo seven-letter plays. Lexigenz's game hubs include vocabulary lists and strategy guides specifically for Wordle and Scrabble players, alongside the Lexigenz vocabulary game that reinforces your daily words through competitive play."
  },
  {
    category: "Vocabulary",
    q: "What is the best way to memorise new words permanently?",
    a: "Permanent vocabulary retention requires three things: context (learn words in sentences, not in isolation), generation (write your own sentences using the word - don't just read others'), and spaced repetition (review words at increasing intervals: 1, 3, 7, 14, and 30 days after first encounter). Words reviewed five times at these intervals typically move into long-term memory. The Lexigenz system is built around these three principles."
  },
];

export default function FAQ() {
  const { t } = useTranslation();

  const CATEGORIES = [
    { key: "All", label: t("faq.categories.all") },
    { key: "Getting Started", label: t("faq.categories.gettingStarted") },
    { key: "Vocabulary", label: t("faq.categories.vocabulary") },
    { key: "Archetypes", label: t("faq.categories.archetypes") },
    { key: "Games", label: t("faq.categories.games") },
    { key: "Premium", label: t("faq.categories.premium") },
    { key: "Languages", label: t("faq.categories.languages") },
    { key: "Privacy & Data", label: t("faq.categories.privacy") },
    { key: "Technical", label: t("faq.categories.technical") },
  ];

  const CATEGORY_BADGE: Record<string, string> = useMemo(() => ({
    "Getting Started": t("faq.categories.gettingStarted"),
    "Vocabulary": t("faq.categories.vocabulary"),
    "Archetypes": t("faq.categories.archetypes"),
    "Games": t("faq.categories.games"),
    "Premium": t("faq.categories.premium"),
    "Languages": t("faq.categories.languages"),
    "Privacy & Data": t("faq.categories.privacy"),
    "Technical": t("faq.categories.technical"),
  }), [t]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showFreemium, setShowFreemium] = useState(false);
  const { user, setPremium } = useAuth();
  const isPremium = user?.plan === "premium";

  const faqsWithIdx = faqs.map((f, idx) => ({
    ...f,
    idx,
    tq: t(`faq.items.${idx}.q`),
    ta: t(`faq.items.${idx}.a`),
  }));
  const filtered = faqsWithIdx.filter(f => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchSearch = search.trim() === "" ||
      f.tq.toLowerCase().includes(search.toLowerCase()) ||
      f.ta.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeCategoryLabel = CATEGORIES.find(c => c.key === activeCategory)?.label ?? activeCategory;

  return (
    <div className="min-h-screen">
      <AdsterraSocialBar />
      <AdsterraAd />
      {/* Header */}
      <section className="pt-24 pb-16 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container px-4 mx-auto max-w-3xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{t("faq.badge")}</span>
          <h1 className="text-5xl md:text-6xl font-black mt-3 mb-4">{t("faq.heading")}</h1>
          <p className="text-muted-foreground text-lg mb-8">
            {t("faq.subtitle")}
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("faq.searchPlaceholder")}
              className="pl-10 h-12 rounded-2xl border-border"
            />
          </div>
        </motion.div>
      </section>

      {/* Playbook - prominent placement between hero and FAQ list */}
      <section className="pb-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-3xl">
          <PlaybookSection />
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-border sticky top-[57px] bg-background/95 backdrop-blur z-10">
        <div className="container px-4 mx-auto">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary hover:ring-1 hover:ring-primary/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-3xl">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-lg">{t("common.noResults", { search })}</p>
              <p className="text-sm mt-2">{t("common.noResultsHint")}</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-xs text-muted-foreground mb-6 font-semibold uppercase tracking-widest">
                {t("common.questions", { count: filtered.length })}
                {activeCategory !== "All" ? ` ${t("faq.inCategory", { category: activeCategoryLabel })}` : ""}
              </p>
              <Accordion type="single" collapsible className="space-y-3">
                {filtered.map((faq, i) => (
                  <motion.div
                    key={faq.idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <AccordionItem value={`faq-${faq.idx}`} className="border border-border rounded-2xl px-2 overflow-hidden">
                      <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline text-sm leading-snug">
                        <div className="flex items-start gap-3 text-left">
                          <span className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
                            {CATEGORY_BADGE[faq.category] ?? faq.category}
                          </span>
                          <span>{t(`faq.items.${faq.idx}.q`)}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 pl-2">
                        {t(`faq.items.${faq.idx}.a`)}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-2xl text-center space-y-4">
          <h2 className="text-2xl font-bold">{t("faq.stillQuestion")}</h2>
          <p className="text-muted-foreground text-sm">
            {t("faq.stillQuestionDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/contact">
              <Button className="rounded-full bg-primary">{t("common.contactUs")}</Button>
            </Link>
            <Button variant="outline" className="rounded-full" onClick={() => setShowPreview(true)}>
              {t("common.viewPremium")}
            </Button>
          </div>
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
