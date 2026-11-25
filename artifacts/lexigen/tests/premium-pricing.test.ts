import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { applyMandarinOverrides } from "../src/i18n/mandarin-overrides";
import { applyPremiumPriceOverrides } from "../src/i18n/premium-pricing";

const localeDirectory = fileURLToPath(new URL("../src/i18n/locales/", import.meta.url));
const oldPremiumPrice = /(?:\$\s*8(?:[.,]00)?(?![\d.,])|(?<![\d,.])8(?:[.,]00)?\s*\$(?!\d)|(?<![\d,.])8[.,]00\s+USD\b)/i;

test("premium prices are $3 across every locale and $2 add-ons stay unchanged", () => {
  const localeFiles = readdirSync(localeDirectory).filter((file) => file.endsWith(".json"));
  assert.equal(localeFiles.length, 19);

  for (const file of localeFiles) {
    const source = JSON.parse(readFileSync(join(localeDirectory, file), "utf8"));
    const withMandarinOverrides = file === "zh.json" ? applyMandarinOverrides(source) : source;
    const translated = applyPremiumPriceOverrides(withMandarinOverrides);
    assert.doesNotMatch(JSON.stringify(translated), oldPremiumPrice, `${file} still contains an old premium price`);
  }
});

test("premium price normalization handles common locale formats without changing other amounts", () => {
  const translated = applyPremiumPriceOverrides({
    usd: "$8",
    usdWithCents: "$8.00",
    suffixSymbol: "8 $",
    decimalComma: "8,00 USD",
    languageAddOn: "$2",
    largerAmount: "$80",
  });

  assert.deepEqual(translated, {
    usd: "$3",
    usdWithCents: "$3.00",
    suffixSymbol: "3 $",
    decimalComma: "3,00 USD",
    languageAddOn: "$2",
    largerAmount: "$80",
  });
});
