import assert from "node:assert/strict";
import test from "node:test";
import React from "react";

Object.defineProperty(globalThis, "React", { configurable: true, value: React });

const [{ ARTICLES }, { SPANISH_ARTICLE_METADATA }] = await Promise.all([
  import("../src/data/articles"),
  import("../src/i18n/article-metadata"),
]);

test("Spanish article cards have translated metadata for every public route", () => {
  assert.equal(Object.keys(SPANISH_ARTICLE_METADATA).length, ARTICLES.length);

  for (const article of ARTICLES) {
    const metadata = SPANISH_ARTICLE_METADATA[article.id];
    assert.ok(metadata, `missing Spanish card localization for ${article.id}`);
    assert.ok(metadata.category && metadata.title && metadata.excerpt, `incomplete Spanish card localization for ${article.id}`);
  }
});
