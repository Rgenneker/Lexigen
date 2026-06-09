import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Main Pages",
    links: [
      { href: "/", label: "Home", desc: "Landing page, hero, and product overview" },
      { href: "/about", label: "About Lexigen", desc: "Our mission, story, and promise" },
      { href: "/faq", label: "FAQ", desc: "Frequently asked questions" },
      { href: "/contact", label: "Contact", desc: "Get in touch with our team" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/app", label: "Daily App", desc: "Your word of the day, archetype, streak, and journal" },
      { href: "/play", label: "Play for Words", desc: "All six Lexigen word games" },
      { href: "/invite", label: "Invite & Challenge", desc: "Challenge friends and read original articles" },
      { href: "/premium", label: "Premium", desc: "Upgrade for unlimited features" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { href: "/terms", label: "Terms & Conditions", desc: "Full terms governing your use of Lexigen" },
      { href: "/terms-of-use", label: "Terms of Use", desc: "Specific rules for content and platform interaction" },
      { href: "/privacy", label: "Privacy Policy", desc: "How we collect, use, and protect your data" },
      { href: "/cookies", label: "Cookie Policy", desc: "Our use of cookies and local storage" },
      { href: "/legal", label: "Legal Disclaimer", desc: "Liability, IP notices, and governing law" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Navigation</p>
          <h1 className="text-5xl font-bold tracking-tighter">Sitemap</h1>
          <p className="text-muted-foreground text-lg">
            Every page on Lexigen, in one place.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.1 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 pb-3 border-b border-border">
                {section.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {section.links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    data-testid={`sitemap-link-${link.href.replace(/\//g, "").replace(/-/g, "")}`}
                  >
                    <div className="space-y-1">
                      <p className="font-semibold group-hover:text-primary transition-colors">{link.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{link.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 rounded-2xl border border-border bg-card text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lexigen Trading. All rights reserved. Registered in South Africa.
            <br />
            Lexigen™ is a registered trademark of Lexigen Trading.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
