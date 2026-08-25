import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

class TestStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  clear() {
    this.values.clear();
  }
}

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: new TestStorage(),
});
Object.defineProperty(globalThis, "React", {
  configurable: true,
  value: React,
});
Object.defineProperty(globalThis, "document", {
  configurable: true,
  value: { documentElement: { dir: "ltr", lang: "en" } },
});

const [{ default: i18n }, { default: Terms }, { default: Privacy }, { default: TermsOfUse }, { default: CookiePolicy }, { default: LegalDisclaimer }] =
  await Promise.all([
    import("../src/i18n"),
    import("../src/pages/legal/Terms"),
    import("../src/pages/legal/Privacy"),
    import("../src/pages/legal/TermsOfUse"),
    import("../src/pages/legal/CookiePolicy"),
    import("../src/pages/legal/LegalDisclaimer"),
  ]);

type LegalPage = {
  route: string;
  component: React.ComponentType;
  french: {
    title: string;
    updated: string;
    headings: string[];
    body: string;
    listItem: string;
    linkLabels: string[];
  };
  english: {
    title: string;
    updated: string;
    body: string;
    sourcePhrases: string[];
  };
};

const pages: LegalPage[] = [
  {
    route: "/terms",
    component: Terms,
    french: {
      title: "Conditions générales",
      updated: "1 juin 2026",
      headings: ["Sommaire", "1. Acceptation des conditions", "2. Utilisation du service", "11. Contact"],
      body: "Veuillez lire attentivement les présentes conditions générales",
      listItem: "Copier, extraire, republier ou redistribuer",
      linkLabels: ["hello@lexigenz.com", "page de contact"],
    },
    english: {
      title: "Terms and Conditions",
      updated: "1 June 2026",
      body: "Please read these Terms and Conditions carefully",
      sourcePhrases: ["Please read these Terms and Conditions carefully", "Acceptance of Terms", "Copy, scrape, republish", "Contact page"],
    },
  },
  {
    route: "/privacy",
    component: Privacy,
    french: {
      title: "Politique de confidentialité",
      updated: "1 juin 2026",
      headings: ["Sommaire", "1. Informations que nous collectons", "2. Utilisation des informations", "9. Nous contacter"],
      body: "La présente politique de confidentialité explique",
      listItem: "Surveiller la sécurité et les performances du Site",
      linkLabels: ["hello@lexigenz.com", "page de contact"],
    },
    english: {
      title: "Privacy Policy",
      updated: "1 June 2026",
      body: "This Privacy Policy explains how we handle information",
      sourcePhrases: ["This Privacy Policy explains how we handle information", "Information We Collect", "Monitor the security and performance of the Site", "Contact page"],
    },
  },
  {
    route: "/terms-of-use",
    component: TermsOfUse,
    french: {
      title: "Conditions d'utilisation",
      updated: "1 juin 2026",
      headings: ["1. Acceptation des conditions", "2. Admissibilité", "24. Coordonnées"],
      body: "Les présentes conditions d’utilisation",
      listItem: "Abus du système :",
      linkLabels: ["politique de confidentialité"],
    },
    english: {
      title: "Terms of Use",
      updated: "1 June 2026",
      body: "These Terms of Use",
      sourcePhrases: ["These Terms of Use", "Acceptance of Terms", "Provide accurate and up-to-date information"],
    },
  },
  {
    route: "/cookies",
    component: CookiePolicy,
    french: {
      title: "Politique relative aux cookies",
      updated: "1 juin 2026",
      headings: ["1. Introduction", "2. Que sont les cookies ?", "17. Coordonnées"],
      body: "La présente politique relative aux cookies explique",
      listItem: "Reconnaître les utilisateurs récurrents",
      linkLabels: ["hello@lexigenz.com"],
    },
    english: {
      title: "Cookie Policy",
      updated: "1 June 2026",
      body: "This Cookie Policy explains how Lexigenz Trading",
      sourcePhrases: ["This Cookie Policy explains how Lexigenz Trading", "Cookies are small text files", "Recognize returning users"],
    },
  },
  {
    route: "/legal",
    component: LegalDisclaimer,
    french: {
      title: "Avertissement juridique",
      updated: "juin 2026",
      headings: ["1. Avis important", "2. À titre informatif uniquement", "13. Coordonnées"],
      body: "Bienvenue sur Lexigenz.com",
      listItem: "Résultats des générateurs de mots et suggestions de vocabulaire",
      linkLabels: ["hello@lexigenz.com", "https://lexigenz.com"],
    },
    english: {
      title: "Legal Disclaimer",
      updated: "June 2026",
      body: "Welcome to Lexigenz.com",
      sourcePhrases: ["Welcome to Lexigenz.com", "Important Notice", "Word generation results and vocabulary suggestions"],
    },
  },
];

function renderPage(page: LegalPage) {
  return renderToStaticMarkup(React.createElement(page.component));
}

function decodeMarkup(markup: string) {
  return markup
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function assertMarkupContains(markup: string, expected: string, message: string) {
  assert.ok(decodeMarkup(markup).includes(expected), `${message}: expected "${expected}"`);
}

function assertMarkupOmits(markup: string, unexpected: string, message: string) {
  assert.ok(!decodeMarkup(markup).includes(unexpected), `${message}: found "${unexpected}"`);
}

test("French legal routes render translated headings, dates, body, lists, and links", async () => {
  await i18n.changeLanguage("fr");

  for (const page of pages) {
    const markup = renderPage(page);

    assertMarkupContains(markup, page.french.title, `${page.route} title`);
    assertMarkupContains(markup, page.french.updated, `${page.route} date`);
    assertMarkupContains(markup, "Dernière mise à jour :", `${page.route} update label`);
    assertMarkupContains(markup, page.french.body, `${page.route} body copy`);
    assertMarkupContains(markup, page.french.listItem, `${page.route} list item`);

    for (const heading of page.french.headings) {
      assertMarkupContains(markup, heading, `${page.route} French heading`);
    }
    for (const linkLabel of page.french.linkLabels) {
      assertMarkupContains(markup, linkLabel, `${page.route} inline link label`);
    }
    for (const sourcePhrase of page.english.sourcePhrases) {
      assertMarkupOmits(markup, sourcePhrase, `${page.route} French regression check`);
    }
  }
});

test("English and Spanish legal routes retain the English rendering", async () => {
  for (const language of ["en", "es"]) {
    await i18n.changeLanguage(language);

    for (const page of pages) {
      const markup = renderPage(page);

      assertMarkupContains(markup, page.english.title, `${language} ${page.route} title`);
      assertMarkupContains(markup, "Last updated:", `${language} ${page.route} update label`);
      assertMarkupContains(markup, page.english.body, `${language} ${page.route} body copy`);
      assertMarkupContains(markup, page.english.updated, `${language} ${page.route} date`);
    }
  }
});