import assert from "node:assert/strict";
import test from "node:test";
import React from "react";

Object.defineProperty(globalThis, "React", { configurable: true, value: React });
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: { getItem: () => null },
});
Object.defineProperty(globalThis, "document", {
  configurable: true,
  value: { documentElement: { dir: "ltr", lang: "en" } },
});

const [{ SITEMAP_PAGES }, { SPANISH_SITEMAP_ENTRIES }] = await Promise.all([
  import("../src/pages/Sitemap"),
  import("../src/i18n/spanish-sitemap"),
]);

test("every sitemap route has complete Spanish visible copy", () => {
  const routes = SITEMAP_PAGES.flatMap((section) => section.items.map((page) => page.href));
  assert.equal(Object.keys(SPANISH_SITEMAP_ENTRIES).length, routes.length);

  for (const route of routes) {
    const entry = SPANISH_SITEMAP_ENTRIES[route];
    assert.ok(entry, `missing Spanish sitemap entry for ${route}`);
    assert.ok(entry.label.trim(), `missing Spanish label for ${route}`);
    assert.ok(entry.description.trim(), `missing Spanish description for ${route}`);
    assert.ok(entry.keywords.length > 0 && entry.keywords.every((keyword) => keyword.trim()), `missing Spanish keywords for ${route}`);
  }
});
