#!/usr/bin/env node
/**
 * Translates missing i18n keys into all 18 non-English locales using Gemini.
 * Run: node scripts/translate-missing-keys.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { GoogleGenAI } from "/home/runner/workspace/node_modules/.pnpm/@google+genai@2.13.0/node_modules/@google/genai/dist/index.mjs";

const LOCALES_DIR = "artifacts/lexigen/src/i18n/locales";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const LANGUAGE_NAMES = {
  af: "Afrikaans", ar: "Arabic", de: "German", es: "Spanish", fa: "Persian (Farsi)",
  fr: "French", it: "Italian", ja: "Japanese", ms: "Bahasa Malay", nl: "Dutch",
  pt: "Portuguese", ru: "Russian", tl: "Tagalog", vi: "Vietnamese",
  xh: "Xhosa", yue: "Cantonese (Traditional Chinese)", zh: "Simplified Chinese", zu: "Zulu",
};

function flatten(obj, prefix = "") {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null) Object.assign(result, flatten(v, key));
    else result[key] = v;
  }
  return result;
}

function unflatten(flat) {
  const result = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let node = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!node[parts[i]]) node[parts[i]] = {};
      node = node[parts[i]];
    }
    node[parts[parts.length - 1]] = value;
  }
  return result;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function translateBatch(langCode, langName, keysObj, attempt = 1) {
  const prompt = `Translate the following JSON object's string values from English to ${langName}.
Rules:
- Keep all i18next interpolation placeholders exactly as-is: {{variable}}, {{count}}, etc.
- Keep all emoji exactly as-is.
- Return ONLY valid JSON with identical keys and translated values.
- No comments, no explanations, no markdown fences.
- For short UI strings like button labels, keep them concise.

JSON to translate:
${JSON.stringify(keysObj, null, 2)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 8192,
        temperature: 0.1,
      },
    });

    const text = response.text ?? "";
    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]+\}/);
      if (match) return JSON.parse(match[0]);
      console.error(`  [${langCode}] JSON parse failed`);
      return {};
    }
  } catch (err) {
    const msg = err.message ?? String(err);
    if ((msg.includes("429") || msg.includes("503") || msg.includes("overloaded")) && attempt <= 5) {
      const wait = attempt * 10000;
      console.log(`  [${langCode}] Rate limit, retry ${attempt} in ${wait/1000}s...`);
      await sleep(wait);
      return translateBatch(langCode, langName, keysObj, attempt + 1);
    }
    console.error(`  [${langCode}] Error (attempt ${attempt}): ${msg.slice(0, 120)}`);
    return {};
  }
}

async function processLanguage(langCode, langName, missingFlat) {
  const allKeys = Object.keys(missingFlat);
  if (allKeys.length === 0) { console.log(`${langCode}: up to date`); return {}; }

  const BATCH_SIZE = 120;
  const translated = {};

  for (let i = 0; i < allKeys.length; i += BATCH_SIZE) {
    const batchKeys = allKeys.slice(i, i + BATCH_SIZE);
    const batchObj = {};
    for (const k of batchKeys) batchObj[k] = missingFlat[k];

    const batch = Math.floor(i / BATCH_SIZE) + 1;
    const total = Math.ceil(allKeys.length / BATCH_SIZE);
    process.stdout.write(`  ${langCode} batch ${batch}/${total}... `);

    const result = await translateBatch(langCode, langName, batchObj);
    let added = 0;
    for (const [k, v] of Object.entries(result)) {
      if (k in missingFlat) { translated[k] = v; added++; }
    }
    console.log(`${added} keys`);

    if (i + BATCH_SIZE < allKeys.length) await sleep(1200);
  }

  return translated;
}

async function main() {
  const en = JSON.parse(readFileSync(`${LOCALES_DIR}/en.json`, "utf8"));
  const enFlat = flatten(en);

  const langCodes = Object.keys(LANGUAGE_NAMES);

  // Process 3 languages at a time to balance speed vs rate limits
  const PARALLEL = 3;
  for (let i = 0; i < langCodes.length; i += PARALLEL) {
    const batch = langCodes.slice(i, i + PARALLEL);

    await Promise.all(batch.map(async (langCode) => {
      const langName = LANGUAGE_NAMES[langCode];
      const localeFile = `${LOCALES_DIR}/${langCode}.json`;
      const existing = JSON.parse(readFileSync(localeFile, "utf8"));
      const existFlat = flatten(existing);

      const missingFlat = {};
      for (const k of Object.keys(enFlat)) {
        if (!(k in existFlat)) missingFlat[k] = enFlat[k];
      }

      if (Object.keys(missingFlat).length === 0) {
        console.log(`${langCode}: already complete`);
        return;
      }

      console.log(`\n${langCode} (${langName}): ${Object.keys(missingFlat).length} keys to translate`);
      const translations = await processLanguage(langCode, langName, missingFlat);

      const mergedFlat = { ...existFlat };
      let added = 0;
      for (const [k, v] of Object.entries(translations)) {
        mergedFlat[k] = v; added++;
      }
      // English fallback for anything not translated
      for (const k of Object.keys(missingFlat)) {
        if (!(k in mergedFlat)) { mergedFlat[k] = enFlat[k]; }
      }

      const merged = unflatten(mergedFlat);
      writeFileSync(localeFile, JSON.stringify(merged, null, 2) + "\n", "utf8");
      console.log(`  ${langCode}: saved ${added} translations`);
    }));

    if (i + PARALLEL < langCodes.length) {
      console.log(`\n--- Pausing 3s before next group ---`);
      await sleep(3000);
    }
  }

  console.log("\n✓ Translation complete!");

  // Final check
  for (const langCode of langCodes) {
    const d = JSON.parse(readFileSync(`${LOCALES_DIR}/${langCode}.json`, "utf8"));
    const flat = flatten(d);
    const still = Object.keys(enFlat).filter(k => !(k in flat));
    if (still.length > 0) console.log(`${langCode}: ${still.length} keys still missing`);
    else console.log(`${langCode}: ✓ complete`);
  }
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
