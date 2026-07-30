import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const enJson = readFileSync(join(__dir, "locales/en.json"), "utf-8");
const en = JSON.parse(enJson);

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: { apiVersion: "", baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL },
});

async function go(name, code) {
  const cur = JSON.parse(readFileSync(join(__dir, `locales/${code}.json`), "utf-8"));
  if (cur.common?.signIn !== en.common?.signIn) { console.log("skip " + code); return; }
  for (let i = 1; i <= 4; i++) {
    try {
      const r = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: `Translate this JSON from English to ${name}. Keep all keys unchanged, translate only values, preserve {{placeholders}} unchanged, preserve emoji, keep dollar amounts and brand names (Lexigenz, LEXIGENZ, PayPal) unchanged. Return ONLY valid JSON with no markdown fences.\n\n${enJson}` }] }],
        config: { maxOutputTokens: 32768, temperature: 0.1 },
      });
      const text = (r.text ?? "").replace(/^```json\s*/im, "").replace(/^```\s*/im, "").replace(/\s*```\s*$/im, "").trim();
      JSON.parse(text);
      writeFileSync(join(__dir, `locales/${code}.json`), text);
      console.log("OK " + name);
      return;
    } catch (e) {
      const isRL = String(e.message ?? "").includes("RATELIMIT");
      console.log(`fail ${code} #${i}: ${String(e.message ?? "").slice(0, 60)}`);
      if (i < 4) await new Promise(r => setTimeout(r, isRL ? 25000 : 4000));
      else { writeFileSync(join(__dir, `locales/${code}.json`), enJson); console.log("fallback " + code); }
    }
  }
}

await go("Zulu", "zu");
await new Promise(r => setTimeout(r, 5000));
await go("Xhosa", "xh");
console.log("done");
