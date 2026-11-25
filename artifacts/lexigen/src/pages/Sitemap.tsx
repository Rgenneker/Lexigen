import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import { legalUi } from "@/i18n/legalLocale";
import { useTranslation } from "react-i18next";
import { SPANISH_SITEMAP_ENTRIES } from "@/i18n/spanish-sitemap";

const BASE_URL = "https://lexigenz.com";

export const SITEMAP_PAGES = [
  {
    section: "Core Pages",
    items: [
      {
        href: "/",
        label: "Home",
        url: `${BASE_URL}/`,
        description: "Lexigenz's daily vocabulary platform - personalised word-of-the-day, birth archetypes, streaks, and word games for Gen Z and millennials.",
        keywords: ["daily word", "vocabulary app", "word of the day", "word games", "vocabulary builder", "Gen Z vocabulary", "millennial language", "South Africa"],
        priority: "1.0",
        changefreq: "Daily",
      },
      {
        href: "/about",
        label: "About",
        url: `${BASE_URL}/about`,
        description: "Learn about Lexigenz Trading - a South African vocabulary platform serving 19 languages across the globe. Our mission, story, values and timeline.",
        keywords: ["about Lexigenz", "Lexigenz Trading", "South Africa vocabulary", "word learning platform", "multilingual vocabulary", "language learning app"],
        priority: "0.9",
        changefreq: "Monthly",
      },
      {
        href: "/how-it-works",
        label: "How It Works",
        url: `${BASE_URL}/how-it-works`,
        description: "Discover how Lexigenz works in 6 steps - birth archetype, daily word, sentence builder, streaks, word games and friend challenges.",
        keywords: ["how Lexigenz works", "vocabulary archetype", "sentence builder", "daily vocabulary routine", "word streak", "vocabulary learning steps"],
        priority: "0.9",
        changefreq: "Monthly",
      },
      {
        href: "/app",
        label: "App",
        url: `${BASE_URL}/app`,
        description: "Your personal Lexigenz dashboard - today's word, birth archetype profile, streak tracker, badge collection, journal, and sentence builder.",
        keywords: ["vocabulary dashboard", "word journal", "daily word app", "vocabulary streak", "word badge", "birth archetype vocabulary", "sentence builder"],
        priority: "0.9",
        changefreq: "Daily",
      },
      {
        href: "/play",
        label: "Play",
        url: `${BASE_URL}/play`,
        description: "Play 6 Lexigenz word games - Wordle, the Lexigenz Game, Scrabble, Crossword, Spelling Bee and Word Grid. Train your vocabulary through play.",
        keywords: ["word games", "Wordle alternative", "vocabulary game", "word puzzle", "spelling bee", "crossword", "word grid", "scrabble online", "Lexigenz game"],
        priority: "0.8",
        changefreq: "Weekly",
      },
      {
        href: "/invite",
        label: "Invite",
        url: `${BASE_URL}/invite`,
        description: "Challenge a friend to a word duel. Share Lexigenz and compete on vocabulary, streaks, and word games across 19 languages.",
        keywords: ["invite friend vocabulary", "word challenge", "vocabulary competition", "share word game", "vocabulary duel"],
        priority: "0.7",
        changefreq: "Monthly",
      },
      {
        href: "/premium",
        label: "Premium",
        url: `${BASE_URL}/premium`,
        description: "Upgrade to Lexigenz Premium - $3 once-off for unlimited access. Unlock unlimited sentence builder sessions, advanced monthly vocabulary reports, and premium word game access.",
        keywords: ["Lexigenz Premium", "vocabulary subscription", "premium word app", "advanced vocabulary", "monthly report vocabulary", "unlimited vocabulary plan"],
        priority: "0.8",
        changefreq: "Monthly",
      },
      {
        href: "/faq",
        label: "FAQ",
        url: `${BASE_URL}/faq`,
        description: "Frequently asked questions about Lexigenz - how the word archetype works, supported languages, premium plans, streaks, and more.",
        keywords: ["Lexigenz FAQ", "vocabulary app questions", "word archetype FAQ", "Lexigenz help", "vocabulary platform support"],
        priority: "0.7",
        changefreq: "Monthly",
      },
      {
        href: "/contact",
        label: "Contact",
        url: `${BASE_URL}/contact`,
        description: "Contact Lexigenz Trading. Send us a message or email hello@lexigenz.com with questions, bug reports, or feature suggestions.",
        keywords: ["contact Lexigenz", "Lexigenz support", "hello@lexigenz.com", "vocabulary app support", "Lexigenz Trading contact"],
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
        description: "Lexigenz Trading's Privacy Policy - how we collect, use, and protect your data under POPIA (South Africa) and GDPR.",
        keywords: ["Lexigenz privacy policy", "POPIA compliance", "data protection vocabulary app", "GDPR vocabulary"],
        priority: "0.4",
        changefreq: "Yearly",
      },
      {
        href: "/terms",
        label: "Terms and Conditions",
        url: `${BASE_URL}/terms`,
        description: "Terms and Conditions for using Lexigenz.com - intellectual property, disclaimers, liability limitations, and governing law (South Africa).",
        keywords: ["Lexigenz terms and conditions", "vocabulary app terms", "Lexigenz legal", "South Africa digital terms"],
        priority: "0.4",
        changefreq: "Yearly",
      },
      {
        href: "/cookies",
        label: "Cookie Policy",
        url: `${BASE_URL}/cookies`,
        description: "Lexigenz's Cookie Policy - types of cookies used, Google AdSense, analytics, consent management, and your rights under POPIA and GDPR.",
        keywords: ["Lexigenz cookies", "cookie policy vocabulary", "AdSense cookies", "POPIA cookie compliance"],
        priority: "0.3",
        changefreq: "Yearly",
      },
      {
        href: "/legal",
        label: "Legal Disclaimer",
        url: `${BASE_URL}/legal`,
        description: "Legal Disclaimer for Lexigenz.com - limitations on accuracy, no professional advice, generator disclaimers, and governing law.",
        keywords: ["Lexigenz disclaimer", "word generator disclaimer", "vocabulary app legal notice"],
        priority: "0.3",
        changefreq: "Yearly",
      },
      {
        href: "/terms-of-use",
        label: "Terms of Use",
        url: `${BASE_URL}/terms-of-use`,
        description: "Lexigenz's Terms of Use - eligibility, prohibited conduct, intellectual property rights, limitation of liability, and dispute resolution.",
        keywords: ["Lexigenz terms of use", "vocabulary platform terms", "user agreement Lexigenz"],
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

const sitemapLabels: Record<string, string> = {
  Home: "Accueil",
  About: "À propos",
  "How It Works": "Comment ça marche",
  App: "Application",
  Play: "Jouer",
  Invite: "Inviter",
  Premium: "Premium",
  FAQ: "FAQ",
  Contact: "Contact",
  "Privacy Policy": "Politique de confidentialité",
  "Terms and Conditions": "Conditions générales",
  "Cookie Policy": "Politique relative aux cookies",
  "Legal Disclaimer": "Avertissement juridique",
  "Terms of Use": "Conditions d'utilisation",
};

const sitemapSection = (section: string) =>
  legalUi(
    section,
    section === "Core Pages" ? "Pages principales" : "Pages juridiques",
    section === "Core Pages" ? "Páginas principales" : "Páginas legales",
  );

const sitemapFrequency = (frequency: string) => legalUi(frequency, {
  Daily: "Quotidienne",
  Weekly: "Hebdomadaire",
  Monthly: "Mensuelle",
  Yearly: "Annuelle",
}[frequency] ?? frequency, {
  Daily: "Diaria",
  Weekly: "Semanal",
  Monthly: "Mensual",
  Yearly: "Anual",
}[frequency] ?? frequency);

export default function Sitemap() {
  const { i18n } = useTranslation();
  const isSpanishPage = i18n.language.split("-")[0] === "es";
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{legalUi("Navigation Index", "Index de navigation", "Índice de navegación")}</p>
          <h1 className="text-5xl font-bold tracking-tighter">{legalUi("Sitemap", "Plan du site", "Mapa del sitio")}</h1>
        </motion.div>

        {/* Pages by section */}
        <div className="space-y-14">
          {SITEMAP_PAGES.map((section, si) => (
            <motion.div
              key={section.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.12 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-3 border-b border-border">
                {sitemapSection(section.section)}
              </h2>

              <div className="space-y-4">
                {section.items.map((page) => {
                  const spanishEntry = isSpanishPage ? SPANISH_SITEMAP_ENTRIES[page.href] : undefined;
                  if (isSpanishPage && !spanishEntry) {
                    throw new Error(`Missing Spanish sitemap localization for "${page.href}"`);
                  }
                  return (
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
                          {legalUi(page.label, sitemapLabels[page.label] ?? page.label, spanishEntry?.label ?? page.label)}
                        </Link>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityColor(page.priority)}`}>
                          {legalUi("Priority", "Priorité", "Prioridad")} {page.priority}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {sitemapFrequency(page.changefreq)}
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
                      {spanishEntry?.description ?? page.description}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5">
                      {(spanishEntry?.keywords ?? page.keywords).map(kw => (
                        <span
                          key={kw}
                          className="text-xs px-2.5 py-1 rounded-full border border-border bg-background text-muted-foreground"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-muted-foreground"
        >
          <span>© {new Date().getFullYear()} Lexigenz Trading. {legalUi("All rights reserved. Registered in South Africa.", "Tous droits réservés. Enregistrée en Afrique du Sud.", "Todos los derechos reservados. Registrada en Sudáfrica.")}</span>
          <span>Lexigenz™ {legalUi("is a registered trademark of Lexigenz Trading.", "est une marque déposée de Lexigenz Trading.", "es una marca registrada de Lexigenz Trading.")}</span>
        </motion.div>
      </div>
    </div>
  );
}
