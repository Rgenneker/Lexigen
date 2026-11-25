import assert from "node:assert/strict";
import test from "node:test";
import en from "../src/i18n/locales/en.json";
import zh from "../src/i18n/locales/zh.json";
import { applyMandarinOverrides } from "../src/i18n/mandarin-overrides";

function flatten(value: Record<string, unknown>, prefix = "", result: Record<string, unknown> = {}) {
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child)) {
      flatten(child as Record<string, unknown>, path, result);
    } else {
      result[path] = child;
    }
  }
  return result;
}

test("Mandarin About copy does not fall back to English", () => {
  const english = flatten(en as Record<string, unknown>);
  const mandarinBase = flatten(zh as Record<string, unknown>);
  const mandarin = flatten(applyMandarinOverrides(zh as Record<string, unknown>));
  let translatedCount = 0;

  for (const [path, englishValue] of Object.entries(english)) {
    if (!path.startsWith("about.") || typeof englishValue !== "string") continue;
    if (mandarinBase[path] !== englishValue) continue;

    const translated = mandarin[path];
    assert.equal(typeof translated, "string", `missing Mandarin text for ${path}`);
    assert.notEqual(translated, englishValue, `English fallback remains for ${path}`);
    assert.match(translated as string, /[\u4e00-\u9fff]/, `no Chinese text found for ${path}`);
    translatedCount++;
  }

  assert.ok(translatedCount > 0, "expected untranslated About entries to be covered");
});

test("Mandarin About translations preserve English vocabulary examples", () => {
  const mandarin = flatten(applyMandarinOverrides(zh as Record<string, unknown>));
  const etymology = mandarin["about.toolVocabBuilderTitleR1Body"] as string;
  const greList = mandarin["about.toolVocabListsTitleR3Body"] as string;

  assert.ok(etymology.includes("magnanimous"));
  assert.ok(etymology.includes("magnus"));
  assert.ok(etymology.includes("animus"));
  assert.ok(greList.includes("tendentious"));
  assert.ok(greList.includes("recondite"));
});
