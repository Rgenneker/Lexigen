import { Link } from "wouter";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const explore = [
    { href: "/", label: t("footer.links.home") },
    { href: "/about", label: t("footer.links.about") },
    { href: "/how-it-works", label: t("footer.links.howItWorks") },
    { href: "/app", label: t("footer.links.app") },
    { href: "/contact", label: t("footer.links.contact") },
    { href: "/faq", label: t("footer.links.faq") },
  ];

  const legal = [
    { href: "/privacy", label: t("footer.links.privacy") },
    { href: "/terms", label: t("footer.links.terms") },
    { href: "/cookies", label: t("footer.links.cookies") },
    { href: "/legal", label: t("footer.links.legalDisclaimer") },
    { href: "/terms-of-use", label: t("footer.links.termsOfUse") },
    { href: "/sitemap", label: t("footer.links.sitemap") },
  ];

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-tighter text-primary">{t("common.appName")}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              <span>{t("footer.reach")}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {t("footer.support")}{" "}
              <a href="mailto:hello@lexigenz.com" className="text-primary hover:underline font-medium">
                hello@lexigenz.com
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">{t("footer.explore")}</h4>
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
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">{t("footer.legal")}</h4>
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
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.trademark")}
          </p>
        </div>
      </div>
    </footer>
  );
}
