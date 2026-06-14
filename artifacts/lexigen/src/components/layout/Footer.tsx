import { Link } from "wouter";
import { Globe } from "lucide-react";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/app", label: "App" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/legal", label: "Legal Disclaimer" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/sitemap", label: "Sitemap" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-tighter text-primary">LEXIGENZ</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              A personalised daily vocabulary platform for Gen Z and millennials — proudly built in South Africa, spoken worldwide in 19 languages.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              <span>19 languages · Global reach</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Support:{" "}
              <a href="mailto:hello@lexigenz.com" className="text-primary hover:underline font-medium">
                hello@lexigenz.com
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Explore</h4>
            <ul className="space-y-2.5">
              {explore.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Legal</h4>
            <ul className="space-y-2.5">
              {legal.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lexigenz Trading. All rights reserved. Registered in South Africa.
          </p>
          <p className="text-xs text-muted-foreground">
            Lexigenz™ is a registered trademark of Lexigenz Trading.
          </p>
        </div>
      </div>
    </footer>
  );
}
