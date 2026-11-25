export const PREMIUM_PRICE_USD = "3.00";
export const PREMIUM_PRICE_DISPLAY = "$3.00";
export const PREMIUM_PRICE_LABEL = "$3";

// Normalize older/generated locale copy at runtime so every language shows the
// same current premium price without changing unrelated add-on prices.
function updatePriceText(text: string): string {
  return text
    .replace(/\$\s*8(?:(\.|,)00)?(?![\d.,])/g, (_match, separator: string | undefined) =>
      separator ? `$3${separator}00` : "$3",
    )
    .replace(/\b8(?:(\.|,)00)?(?=\s*\$)/g, (_match, separator: string | undefined) =>
      separator ? `3${separator}00` : "3",
    )
    .replace(/\b8([.,]00)(?=\s+USD\b)/gi, "3$1");
}

function visitTranslations(value: unknown): unknown {
  if (typeof value === "string") return updatePriceText(value);
  if (Array.isArray(value)) return value.map(visitTranslations);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, visitTranslations(nestedValue)]),
    );
  }
  return value;
}

export function applyPremiumPriceOverrides<T>(translations: T): T {
  return visitTranslations(translations) as T;
}
