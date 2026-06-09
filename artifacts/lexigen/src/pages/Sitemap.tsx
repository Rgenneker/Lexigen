import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Main Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/app", label: "App" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms and Conditions" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/legal", label: "Legal Disclaimer" },
      { href: "/terms-of-use", label: "Terms of Use" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Navigation</p>
          <h1 className="text-5xl font-bold tracking-tighter">Sitemap</h1>
          <p className="text-muted-foreground text-lg">Every page on Lexigen, in one place.</p>
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
              <div className="space-y-2">
                {section.links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    data-testid={`sitemap-link-${link.href.replace(/\//g, "").replace(/-/g, "")}`}
                  >
                    <span className="font-medium group-hover:text-primary transition-colors text-sm">
                      {link.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-6 rounded-2xl border border-border bg-card text-center space-y-1"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lexigen Trading. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Lexigen™ is a registered trademark of Lexigen Trading, South Africa.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
