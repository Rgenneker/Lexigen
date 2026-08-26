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
  mandarin: {
    title: string;
    updated: string;
    headings: string[];
    body: string;
    listItem: string;
    linkLabels: string[];
    contact: string;
    warning?: string;
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
    mandarin: {
      title: "条款和条件",
      updated: "2026年6月1日",
      headings: ["目录", "1. 接受条款", "2. 服务的使用", "11. 联系我们"],
      body: "在使用 Lexigenz Trading 运营的 Lexigenz.com",
      listItem: "未经书面许可复制、抓取、重新发布或再分发",
      linkLabels: ["hello@lexigenz.com", "联系页面"],
      contact: "如对本条款有任何问题，请通过以下方式联系我们",
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
    mandarin: {
      title: "隐私政策",
      updated: "2026年6月1日",
      headings: ["目录", "1. 我们收集的信息", "2. 我们如何使用信息", "9. 联系我们"],
      body: "本隐私政策说明你使用我们的词语生成和每日单词工具时我们如何处理信息",
      listItem: "监控本网站的安全性和性能",
      linkLabels: ["hello@lexigenz.com", "联系页面"],
      contact: "如有隐私相关问题或请求，请通过以下方式联系我们",
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
    mandarin: {
      title: "使用条款",
      updated: "2026年6月1日",
      headings: ["1. 接受条款", "2. 资格", "24. 联系信息"],
      body: "本使用条款（“条款”）构成",
      listItem: "系统滥用：",
      linkLabels: ["隐私政策"],
      contact: "法务部 / 合规办公室",
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
    mandarin: {
      title: "Cookie 政策",
      updated: "2026年6月1日",
      headings: ["1. 简介", "2. 什么是 Cookie？", "17. 联系信息"],
      body: "本 Cookie 政策说明 Lexigenz Trading",
      listItem: "识别回访用户",
      linkLabels: ["hello@lexigenz.com"],
      contact: "信息官 / 数据保护官",
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
    mandarin: {
      title: "法律免责声明",
      updated: "2026年6月",
      headings: ["1. 重要通知", "2. 仅供参考", "13. 联系信息"],
      body: "欢迎访问 Lexigenz.com",
      listItem: "词语生成结果和词汇建议",
      linkLabels: ["hello@lexigenz.com", "https://lexigenz.com"],
      contact: "电子邮件：",
      warning: "风险警告",
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

test("Mandarin legal routes render translated headings, dates, clauses, lists, warnings, links, and contact copy", async () => {
  await i18n.changeLanguage("zh-CN");

  for (const page of pages) {
    const markup = renderPage(page);

    assertMarkupContains(markup, page.mandarin.title, `${page.route} Mandarin title`);
    assertMarkupContains(markup, page.mandarin.updated, `${page.route} Mandarin date`);
    assertMarkupContains(markup, "最后更新：", `${page.route} Mandarin update label`);
    assertMarkupContains(markup, page.mandarin.body, `${page.route} Mandarin body copy`);
    assertMarkupContains(markup, page.mandarin.listItem, `${page.route} Mandarin list item`);
    assertMarkupContains(markup, page.mandarin.contact, `${page.route} Mandarin contact copy`);

    for (const heading of page.mandarin.headings) {
      assertMarkupContains(markup, heading, `${page.route} Mandarin heading`);
    }
    for (const linkLabel of page.mandarin.linkLabels) {
      assertMarkupContains(markup, linkLabel, `${page.route} Mandarin inline link label`);
    }
    if (page.mandarin.warning) {
      assertMarkupContains(markup, page.mandarin.warning, `${page.route} Mandarin warning`);
    }
    for (const sourcePhrase of page.english.sourcePhrases) {
      assertMarkupOmits(markup, sourcePhrase, `${page.route} Mandarin regression check`);
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