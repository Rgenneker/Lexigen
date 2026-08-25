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
  spanish: {
    title: string;
    updated: string;
    headings: string[];
    body: string;
    listItem: string;
    linkLabels: string[];
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
    spanish: {
      title: "Términos y condiciones",
      updated: "1 de junio de 2026",
      headings: ["Índice", "1. Aceptación de los términos", "2. Uso del servicio", "11. Contacto"],
      body: "Lea detenidamente estos Términos y Condiciones",
      listItem: "Copiar, extraer, republicar o redistribuir",
      linkLabels: ["hello@lexigenz.com", "página de contacto"],
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
    spanish: {
      title: "Política de privacidad",
      updated: "1 de junio de 2026",
      headings: ["Índice", "1. Información que recopilamos", "2. Cómo utilizamos la información", "9. Contáctenos"],
      body: "Esta Política de Privacidad explica cómo manejamos la información",
      listItem: "Supervisar la seguridad y el rendimiento del Sitio",
      linkLabels: ["hello@lexigenz.com", "página de contacto"],
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
    spanish: {
      title: "Términos de uso",
      updated: "1 de junio de 2026",
      headings: ["1. Aceptación de los términos", "2. Elegibilidad", "24. Información de contacto"],
      body: "Estos Términos de uso",
      listItem: "Abuso del sistema:",
      linkLabels: ["Política de privacidad"],
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
    spanish: {
      title: "Política de cookies",
      updated: "1 de junio de 2026",
      headings: ["1. Introducción", "2. ¿Qué son las cookies?", "17. Información de contacto"],
      body: "Esta Política de cookies explica cómo Lexigenz Trading",
      listItem: "Reconocer a los usuarios recurrentes",
      linkLabels: ["hello@lexigenz.com"],
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
    spanish: {
      title: "Aviso legal",
      updated: "Junio de 2026",
      headings: ["1. Aviso importante", "2. Solo para fines informativos", "13. Información de contacto"],
      body: "Bienvenido a Lexigenz.com",
      listItem: "Resultados de generación de palabras y sugerencias de vocabulario",
      linkLabels: ["hello@lexigenz.com", "https://lexigenz.com"],
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

test("Spanish legal routes render translated headings, dates, body, lists, and links", async () => {
  await i18n.changeLanguage("es");

  for (const page of pages) {
    const markup = renderPage(page);

    assertMarkupContains(markup, page.spanish.title, `${page.route} Spanish title`);
    assertMarkupContains(markup, page.spanish.updated, `${page.route} Spanish date`);
    assertMarkupContains(markup, "Última actualización:", `${page.route} Spanish update label`);
    assertMarkupContains(markup, page.spanish.body, `${page.route} Spanish body copy`);
    assertMarkupContains(markup, page.spanish.listItem, `${page.route} Spanish list item`);

    for (const heading of page.spanish.headings) {
      assertMarkupContains(markup, heading, `${page.route} Spanish heading`);
    }
    for (const linkLabel of page.spanish.linkLabels) {
      assertMarkupContains(markup, linkLabel, `${page.route} Spanish inline link label`);
    }
    for (const sourcePhrase of page.english.sourcePhrases) {
      assertMarkupOmits(markup, sourcePhrase, `${page.route} Spanish regression check`);
    }
  }
});

test("English legal routes retain the English rendering", async () => {
  await i18n.changeLanguage("en");

  for (const page of pages) {
    const markup = renderPage(page);

    assertMarkupContains(markup, page.english.title, `${page.route} English title`);
    assertMarkupContains(markup, "Last updated:", `${page.route} English update label`);
    assertMarkupContains(markup, page.english.body, `${page.route} English body copy`);
    assertMarkupContains(markup, page.english.updated, `${page.route} English date`);
  }
});