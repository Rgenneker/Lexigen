#!/usr/bin/env node
// Run with: node src/i18n/generate-translations.mjs
// Uses @google/genai with Replit AI Integrations proxy

import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const enJson = readFileSync(join(__dir, "locales/en.json"), "utf-8");

const BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
const API_KEY  = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error("Missing AI_INTEGRATIONS_GEMINI_BASE_URL or AI_INTEGRATIONS_GEMINI_API_KEY");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: BASE_URL,
  },
});

const LANGUAGES = [
  ["French",            "fr"],
  ["Spanish",           "es"],
  ["Portuguese",        "pt"],
  ["German",            "de"],
  ["Dutch",             "nl"],
  ["Italian",           "it"],
  ["Arabic",            "ar"],
  ["Farsi",             "fa"],
  ["Russian",           "ru"],
  ["Bahasa Malay",      "ms"],
  ["Vietnamese",        "vi"],
  ["Tagalog",           "tl"],
  ["Japanese",          "ja"],
  ["Cantonese",         "yue"],
  ["Chinese Mandarin",  "zh"],
  ["Afrikaans",         "af"],
  ["Zulu",              "zu"],
  ["Xhosa",             "xh"],
];

async function translate(langName, langCode) {
  const prompt = `You are a professional translator. Translate the following JSON from English to ${langName}.

STRICT RULES:
1. Keep ALL JSON keys exactly the same — never translate keys
2. Only translate the string VALUES
3. Preserve interpolation variables like {{variable}}, {{count}}, {{lang}}, {{year}}, {{email}}, {{game}}, {{score}}, {{days}}, {{search}}, {{category}}, {{current}}, {{idx}}, {{total}}, {{name}}, {{date}}, {{s}} EXACTLY as-is inside translated strings
4. Preserve all emoji characters (🎁, 🎉, 🐝, 🏆, 📊, ←, →, etc.) unchanged
5. Keep currency amounts ($8, $2, $0.00) unchanged
6. Keep brand names (Lexigenz, LEXIGENZ, PayPal) unchanged
7. Return ONLY valid JSON — no markdown fences, no explanation, no extra text
8. The output must be parseable by JSON.parse()

JSON to translate:
${enJson}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { maxOutputTokens: 32768, temperature: 0.1 },
      });

      const text = response.text ?? "";
      const cleaned = text
        .replace(/^```json\s*/im, "")
        .replace(/^```\s*/im, "")
        .replace(/\s*```\s*$/im, "")
        .trim();

      JSON.parse(cleaned); // validate
      writeFileSync(join(__dir, `locales/${langCode}.json`), cleaned, "utf-8");
      console.log(`✅ ${langName} (${langCode})`);
      return;
    } catch (e) {
      console.error(`  [${langName}] attempt ${attempt} failed: ${e.message}`);
      if (attempt === 3) {
        console.error(`  Writing EN fallback for ${langCode}`);
        writeFileSync(join(__dir, `locales/${langCode}.json`), enJson, "utf-8");
      } else {
        await new Promise(r => setTimeout(r, 5000 * attempt));
      }
    }
  }
}

// Process 3 at a time to respect rate limits
async function batchRun(pairs, concurrency = 3) {
  for (let i = 0; i < pairs.length; i += concurrency) {
    const batch = pairs.slice(i, i + concurrency);
    console.log(`\n→ Batch ${Math.floor(i / concurrency) + 1}: ${batch.map(b => b[0]).join(", ")}`);
    await Promise.all(batch.map(([name, code]) => translate(name, code)));
    if (i + concurrency < pairs.length) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

await batchRun(LANGUAGES, 3);
console.log("\n🎉 All translations complete");
