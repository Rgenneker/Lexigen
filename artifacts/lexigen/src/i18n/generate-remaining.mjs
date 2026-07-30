#!/usr/bin/env node
// Translates only the remaining languages (those still showing EN content)
import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const enJson = readFileSync(join(__dir, "locales/en.json"), "utf-8");
const enParsed = JSON.parse(enJson);

const BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
const API_KEY  = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: API_KEY,
  httpOptions: { apiVersion: "", baseUrl: BASE_URL },
});

// Only the remaining 12 that hit rate limits
const REMAINING = [
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

function isStillEnglish(code) {
  try {
    const existing = JSON.parse(readFileSync(join(__dir, `locales/${code}.json`), "utf-8"));
    return existing.common?.signIn === enParsed.common?.signIn;
  } catch { return true; }
}

async function translate(langName, langCode) {
  if (!isStillEnglish(langCode)) {
    console.log(`⏭️  ${langName} (${langCode}) already translated`);
    return;
  }

  const prompt = `You are a professional translator. Translate the following JSON from English to ${langName}.

STRICT RULES:
1. Keep ALL JSON keys exactly the same — never translate keys
2. Only translate the string VALUES
3. Preserve {{variable}} placeholders EXACTLY as-is
4. Preserve all emoji unchanged
5. Keep currency ($8, $2, $0.00) and brand names (Lexigenz, LEXIGENZ, PayPal) unchanged
6. Return ONLY valid JSON — no markdown fences, no explanation
7. Output must be parseable by JSON.parse()

JSON to translate:
${enJson}`;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { maxOutputTokens: 32768, temperature: 0.1 },
      });
      const text = response.text ?? "";
      const cleaned = text.replace(/^```json\s*/im,"").replace(/^```\s*/im,"").replace(/\s*```\s*$/im,"").trim();
      JSON.parse(cleaned);
      writeFileSync(join(__dir, `locales/${langCode}.json`), cleaned, "utf-8");
      console.log(`✅ ${langName} (${langCode})`);
      return;
    } catch (e) {
      const isRateLimit = e.message?.includes("RATELIMIT");
      const delay = isRateLimit ? 20000 * attempt : 5000;
      console.error(`  [${langName}] attempt ${attempt} failed: ${e.message?.slice(0,80)}`);
      if (attempt === 5) {
        console.error(`  Writing EN fallback for ${langCode}`);
        writeFileSync(join(__dir, `locales/${langCode}.json`), enJson, "utf-8");
      } else {
        console.log(`  Waiting ${delay/1000}s...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
}

// Serial execution with delay to avoid rate limits
for (const [name, code] of REMAINING) {
  await translate(name, code);
  await new Promise(r => setTimeout(r, 4000));
}
console.log("\n🎉 Done");
