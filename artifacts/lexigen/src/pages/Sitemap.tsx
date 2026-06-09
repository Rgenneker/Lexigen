import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ExternalLink } from "lucide-react";

const BASE_URL = "https://www.lexigen.com";

const pages = [
  {
    section: "Core Pages",
    items: [
      {
        href: "/",
        label: "Home",
        url: `${BASE_URL}/`,
        description: "Lexigen's daily vocabulary platform — personalised word-of-the-day, birth archetypes, streaks, and word games for Gen Z and millennials.",
        keywords: ["daily word", "vocabulary app", "word of the day", "word games", "vocabulary builder", "Gen Z vocabulary", "millennial language", "South Africa"],
        priority: "1.0",
        changefreq: "Daily",
      },
      {
        href: "/about",
        label: "About",
        url: `${BASE_URL}/about`,
        description: "Learn about Lexigen Trading — a South African vocabulary platform serving 19 languages across the globe. Our mission, story, values and timeline.",
        keywords: ["about Lexigen", "Lexigen Trading", "South Africa vocabulary", "word learning platform", "multilingual vocabulary", "language learning app"],
        priority: "0.9",
        changefreq: "Monthly",
      },
      {
        href: "/how-it-works",
        label: "How It Works",
        url: `${BASE_URL}/how-it-works`,
        description: "Discover how Lexigen works in 6 steps — birth archetype, daily word, sentence builder, streaks, word games and friend challenges.",
        keywords: ["how Lexigen works", "vocabulary archetype", "sentence builder", "daily vocabulary routine", "word streak", "vocabulary learning steps"],
        priority: "0.9",
        changefreq: "Monthly",
      },
      {
        href: "/app",
        label: "App",
        url: `${BASE_URL}/app`,
        description: "Your personal Lexigen dashboard — today's word, birth archetype profile, streak tracker, badge collection, journal, and sentence builder.",
        keywords: ["vocabulary dashboard", "word journal", "daily word app", "vocabulary streak", "word badge", "birth archetype vocabulary", "sentence builder"],
        priority: "0.9",
        changefreq: "Daily",
      },
      {
        href: "/play",
        label: "Play",
        url: `${BASE_URL}/play`,
        description: "Play 6 Lexigen word games — Wordle, the Lexigen Game, Scrabble, Crossword, Spelling Bee and Word Grid. Train your vocabulary through play.",
        keywords: ["word games", "Wordle alternative", "vocabulary game", "word puzzle", "spelling bee", "crossword", "word grid", "scrabble online", "Lexigen game"],
        priority: "0.8",
        changefreq: "Weekly",
      },
      {
        href: "/invite",
        label: "Invite",
        url: `${BASE_URL}/invite`,
        description: "Challenge a friend to a word duel. Share Lexigen and compete on vocabulary, streaks, and word games across 19 languages.",
        keywords: ["invite friend vocabulary", "word challenge", "vocabulary competition", "share word game", "vocabulary duel"],
        priority: "0.7",
        changefreq: "Monthly",
      },
      {
        href: "/premium",
        label: "Premium",
        url: `${BASE_URL}/premium`,
        description: "Upgrade to Lexigen Premium — R399/year. Unlock unlimited sentence builder sessions, advanced monthly vocabulary reports, and premium word game access.",
        keywords: ["Lexigen Premium", "vocabulary subscription", "premium word app", "advanced vocabulary", "monthly report vocabulary", "R399 vocabulary plan"],
        priority: "0.8",
        changefreq: "Monthly",
      },
      {
        href: "/faq",
        label: "FAQ",
        url: `${BASE_URL}/faq`,
        description: "Frequently asked questions about Lexigen — how the word archetype works, supported languages, premium plans, streaks, and more.",
        keywords: ["Lexigen FAQ", "vocabulary app questions", "word archetype FAQ", "Lexigen help", "vocabulary platform support"],
        priority: "0.7",
        changefreq: "Monthly",
      },
      {
        href: "/contact",
        label: "Contact",
        url: `${BASE_URL}/contact`,
        description: "Contact Lexigen Trading. Send us a message or email hello@lexigen.com with questions, bug reports, or feature suggestions.",
        keywords: ["contact Lexigen", "Lexigen support", "hello@lexigen.com", "vocabulary app support", "Lexigen Trading contact"],
        priority: "0.6",
        changefreq: "Yearly",
      },
    ],
  },
  {
    section: "Legal Pages",
    items: [
      {
        href: "/privacy",
        label: "Privacy Policy",
        url: `${BASE_URL}/privacy`,
        description: "Lexigen Trading's Privacy Policy — how we collect, use, and protect your data under POPIA (South Africa) and GDPR.",
        keywords: ["Lexigen privacy policy", "POPIA compliance", "data protection vocabulary app", "GDPR vocabulary"],
        priority: "0.4",
        changefreq: "Yearly",
      },
      {
        href: "/terms",
        label: "Terms and Conditions",
        url: `${BASE_URL}/terms`,
        description: "Terms and Conditions for using Lexigen.com — intellectual property, disclaimers, liability limitations, and governing law (South Africa).",
        keywords: ["Lexigen terms and conditions", "vocabulary app terms", "Lexigen legal", "South Africa digital terms"],
        priority: "0.4",
        changefreq: "Yearly",
      },
      {
        href: "/cookies",
        label: "Cookie Policy",
        url: `${BASE_URL}/cookies`,
        description: "Lexigen's Cookie Policy — types of cookies used, Google AdSense, analytics, consent management, and your rights under POPIA and GDPR.",
        keywords: ["Lexigen cookies", "cookie policy vocabulary", "AdSense cookies", "POPIA cookie compliance"],
        priority: "0.3",
        changefreq: "Yearly",
      },
      {
        href: "/legal",
        label: "Legal Disclaimer",
        url: `${BASE_URL}/legal`,
        description: "Legal Disclaimer for Lexigen.com — limitations on accuracy, no professional advice, generator disclaimers, and governing law.",
        keywords: ["Lexigen disclaimer", "word generator disclaimer", "vocabulary app legal notice"],
        priority: "0.3",
        changefreq: "Yearly",
      },
      {
        href: "/terms-of-use",
        label: "Terms of Use",
        url: `${BASE_URL}/terms-of-use`,
        description: "Lexigen's Terms of Use — eligibility, prohibited conduct, intellectual property rights, limitation of liability, and dispute resolution.",
        keywords: ["Lexigen terms of use", "vocabulary platform terms", "user agreement Lexigen"],
        priority: "0.3",
        changefreq: "Yearly",
      },
    ],
  },
];

const priorityColor = (p: string) => {
  const n = parseFloat(p);
  if (n >= 0.9) return "text-emerald-500 bg-emerald-500/10";
  if (n >= 0.7) return "text-primary bg-primary/10";
  if (n >= 0.5) return "text-amber-500 bg-amber-500/10";
  return "text-muted-foreground bg-muted";
};

export default function Sitemap() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 mb-6"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Navigation Index</p>
          <h1 className="text-5xl font-bold tracking-tighter">Sitemap</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Every page on Lexigen with full URLs, descriptions, and keywords — indexed for Google Search and AdSense discovery.
          </p>
        </motion.div>

        {/* SEO meta info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-14 text-xs"
        >
          <span className="px-3 py-1.5 rounded-full border border-border bg-card font-mono text-muted-foreground">
            XML: <a href="/sitemap.xml" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">sitemap.xml</a>
          </span>
          <span className="px-3 py-1.5 rounded-full border border-border bg-card font-mono text-muted-foreground">
            robots.txt: <a href="/robots.txt" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">robots.txt</a>
          </span>
          <span className="px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground">
            {pages.flatMap(s => s.items).length} pages indexed
          </span>
          <span className="px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground">
            Last updated: 1 June 2026
          </span>
        </motion.div>

        {/* Pages by section */}
        <div className="space-y-14">
          {pages.map((section, si) => (
            <motion.div
              key={section.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.12 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-3 border-b border-border">
                {section.section}
              </h2>

              <div className="space-y-4">
                {section.items.map((page) => (
                  <div
                    key={page.href}
                    className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all"
                    data-testid={`sitemap-entry-${page.href.replace(/\//g, "-")}`}
                  >
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Link
                          href={page.href}
                          className="text-lg font-bold hover:text-primary transition-colors"
                        >
                          {page.label}
                        </Link>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityColor(page.priority)}`}>
                          Priority {page.priority}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {page.changefreq}
                        </span>
                      </div>
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors mt-0.5"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    {/* URL */}
                    <p className="text-xs font-mono text-primary/70 mb-3 truncate">{page.url}</p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {page.description}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5">
                      {page.keywords.map(kw => (
                        <span
                          key={kw}
                          className="text-xs px-2.5 py-1 rounded-full border border-border bg-background text-muted-foreground"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl border border-border bg-card space-y-3"
        >
          <h3 className="font-bold">About this sitemap</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This sitemap is designed to help Google Search, Google AdSense, and other crawlers discover and index all Lexigen pages. A machine-readable{" "}
            <a href="/sitemap.xml" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
              XML sitemap
            </a>{" "}
            is available for automated indexing. A{" "}
            <a href="/robots.txt" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
              robots.txt
            </a>{" "}
            file directs crawlers to the XML sitemap and restricts API routes.
          </p>
          <div className="pt-2 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Lexigen Trading. All rights reserved. Registered in South Africa.</span>
            <span>Lexigen™ is a registered trademark of Lexigen Trading.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
