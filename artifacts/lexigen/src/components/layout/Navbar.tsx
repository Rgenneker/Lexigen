import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const LANGUAGES = [
  "English", "Spanish", "Portuguese", "French", "German", "Dutch", 
  "Italian", "Arabic", "Afrikaans", "Zulu", "Xhosa", "Farsi", 
  "Russian", "Bahasa Malay", "Vietnamese", "Tagalog", "Japanese", 
  "Cantonese", "Chinese (Mandarin)"
];

export function Navbar() {
  const [location] = useLocation();
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/play", label: "Play" },
    { href: "/app", label: "App" },
    { href: "/invite", label: "Invite" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl tracking-tighter text-primary">LEXIGENZ</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Select language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem 
                  key={lang} 
                  onClick={() => setLanguage(lang)}
                  className={language === lang ? "bg-accent/10 text-accent font-bold" : ""}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/premium">
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-tight">
              Get Premium
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mt-4">
                <span className="font-bold text-2xl tracking-tighter text-primary">LEXIGENZ</span>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/premium" onClick={() => setIsOpen(false)}>
                  <Button className="w-full mt-4 bg-primary text-primary-foreground font-bold">
                    Get Premium
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
