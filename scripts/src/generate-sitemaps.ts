import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  UNIQUE_WORDS,
  LETTERS,
  SUFFIXES,
  THEMES,
  VOCABULARY_LISTS,
  HUBS,
  ARTICLES,
} from "./data/word-list.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_DIR = join(__dirname, "../../artifacts/lexigen/public");
const BASE = "https://lexigenz.com";
const TODAY = new Date().toISOString().slice(0, 10);
const MAX_PER_SITEMAP = 49_000;

function xmlHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
}

function urlEntry(loc: string, changefreq: string, priority: string, lastmod = TODAY) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>\n`;
}

function writeSitemap(filename: string, entries: string[]) {
  const content = xmlHeader() + entries.join("") + "</urlset>";
  writeFileSync(join(OUT_DIR, filename), content, "utf-8");
  console.log(`  ✓ ${filename} — ${entries.length.toLocaleString()} URLs`);
}

// ─── Word page URLs ────────────────────────────────────────────────────────
const WORD_PAGE_TYPES = [
  { suffix: "", priority: "0.7", changefreq: "monthly" },
  { suffix: "/synonyms", priority: "0.6", changefreq: "monthly" },
  { suffix: "/antonyms", priority: "0.6", changefreq: "monthly" },
  { suffix: "/in-a-sentence", priority: "0.6", changefreq: "monthly" },
  { suffix: "/advanced-alternatives", priority: "0.5", changefreq: "monthly" },
];

function buildWordEntries(): string[] {
  const entries: string[] = [];
  for (const word of UNIQUE_WORDS) {
    const slug = word.toLowerCase().replace(/\s+/g, "-");
    for (const pt of WORD_PAGE_TYPES) {
      entries.push(urlEntry(`${BASE}/word/${slug}${pt.suffix}`, pt.changefreq, pt.priority));
    }
  }
  return entries;
}

// ─── Category page URLs ────────────────────────────────────────────────────
function buildCategoryEntries(): string[] {
  const entries: string[] = [];
  for (const letter of LETTERS) {
    entries.push(urlEntry(`${BASE}/words/starting-with/${letter}`, "weekly", "0.7"));
  }
  for (const suffix of SUFFIXES) {
    entries.push(urlEntry(`${BASE}/words/ending-with/${suffix}`, "weekly", "0.6"));
  }
  for (const theme of THEMES) {
    entries.push(urlEntry(`${BASE}/words/theme/${theme}`, "weekly", "0.6"));
  }
  return entries;
}

// ─── Vocabulary list page URLs ─────────────────────────────────────────────
function buildListEntries(): string[] {
  return VOCABULARY_LISTS.map((l) =>
    urlEntry(`${BASE}/vocabulary/${l.slug}`, "monthly", "0.8")
  );
}

// ─── Hub page URLs ─────────────────────────────────────────────────────────
function buildHubEntries(): string[] {
  return HUBS.map((h) => urlEntry(`${BASE}/hub/${h}`, "weekly", "0.8"));
}

// ─── Article page URLs ─────────────────────────────────────────────────────
function buildArticleEntries(): string[] {
  return ARTICLES.map((a) => urlEntry(`${BASE}/articles/${a}`, "monthly", "0.7"));
}

// ─── Core static pages ────────────────────────────────────────────────────
const CORE_PAGES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/how-it-works", changefreq: "monthly", priority: "0.9" },
  { path: "/play", changefreq: "weekly", priority: "0.8" },
  { path: "/app", changefreq: "daily", priority: "0.9" },
  { path: "/premium", changefreq: "monthly", priority: "0.8" },
  { path: "/articles", changefreq: "weekly", priority: "0.9" },
  { path: "/invite", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  { path: "/privacy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms", changefreq: "yearly", priority: "0.4" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
  { path: "/legal", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-of-use", changefreq: "yearly", priority: "0.3" },
  { path: "/sitemap", changefreq: "monthly", priority: "0.5" },
];

// ─── Main ──────────────────────────────────────────────────────────────────
console.log("LexigenZ Sitemap Generator");
console.log("==========================");
mkdirSync(OUT_DIR, { recursive: true });

const wordEntries = buildWordEntries();
const categoryEntries = buildCategoryEntries();
const listEntries = buildListEntries();
const hubEntries = buildHubEntries();
const articleEntries = buildArticleEntries();
const coreEntries = CORE_PAGES.map((p) =>
  urlEntry(`${BASE}${p.path}`, p.changefreq, p.priority)
);

// Split word entries into chunks of MAX_PER_SITEMAP
const wordChunks: string[][] = [];
for (let i = 0; i < wordEntries.length; i += MAX_PER_SITEMAP) {
  wordChunks.push(wordEntries.slice(i, i + MAX_PER_SITEMAP));
}

// Write word sitemaps
for (let i = 0; i < wordChunks.length; i++) {
  writeSitemap(`sitemap-words-${i + 1}.xml`, wordChunks[i]);
}

// Write category sitemap
writeSitemap("sitemap-categories.xml", categoryEntries);

// Write vocabulary lists sitemap
writeSitemap("sitemap-lists.xml", [...listEntries, ...hubEntries]);

// Write articles sitemap
writeSitemap("sitemap-articles.xml", articleEntries);

// Write core sitemap (replaces old sitemap.xml)
writeSitemap("sitemap.xml", coreEntries);

// Build sitemap index
const indexEntries: string[] = [];
const allSitemaps = [
  "sitemap.xml",
  ...wordChunks.map((_, i) => `sitemap-words-${i + 1}.xml`),
  "sitemap-categories.xml",
  "sitemap-lists.xml",
  "sitemap-articles.xml",
];
for (const s of allSitemaps) {
  indexEntries.push(
    `  <sitemap>\n    <loc>${BASE}/${s}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>\n`
  );
}
const indexContent =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  indexEntries.join("") +
  `</sitemapindex>`;
writeFileSync(join(OUT_DIR, "sitemap-index.xml"), indexContent, "utf-8");
console.log(`  ✓ sitemap-index.xml — ${allSitemaps.length} sitemaps indexed`);

// Summary
const total =
  wordEntries.length + categoryEntries.length + listEntries.length +
  hubEntries.length + articleEntries.length + coreEntries.length;
console.log(`\n✅ Done — ${total.toLocaleString()} total URLs across ${allSitemaps.length} sitemaps`);
