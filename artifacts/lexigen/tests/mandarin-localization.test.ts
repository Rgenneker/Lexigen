import assert from "node:assert/strict";
import test from "node:test";
import React from "react";

Object.defineProperty(globalThis, "React", { configurable: true, value: React });

const [
  { ARTICLES },
  { MANDARIN_ARTICLE_METADATA },
  { MANDARIN_CORE_ARTICLE_BODIES },
  { applyMandarinOverrides },
] = await Promise.all([
  import("../src/data/articles"),
  import("../src/i18n/article-metadata"),
  import("../src/i18n/mandarin-article-content"),
  import("../src/i18n/mandarin-overrides"),
]);

test("Mandarin has metadata and a body for every public core article route", () => {
  for (const article of ARTICLES) {
    const metadata = MANDARIN_ARTICLE_METADATA[article.id];
    assert.ok(metadata, `missing Mandarin metadata for ${article.id}`);
    assert.ok(metadata.title && metadata.excerpt && metadata.category, `incomplete Mandarin metadata for ${article.id}`);
    assert.ok(MANDARIN_CORE_ARTICLE_BODIES[article.id], `missing Mandarin body for ${article.id}`);
  }
});

test("Mandarin overlay retains translated Invite article detail content", () => {
  const locale = applyMandarinOverrides({});
  const invite = locale.invite as Record<string, unknown>;
  assert.equal(invite.articleMemoryScienceTitle, "为什么语境比重复更能提高词汇记忆");
  assert.ok((invite.articleMemoryScienceBody as Record<string, string>).intro.includes("单词卡"));
});

test("Mandarin vocabulary category chips are translated", () => {
  const locale = applyMandarinOverrides({});
  const play = locale.play as Record<string, string>;
  assert.equal(play.categoryEmotions, "情感词汇");
  assert.equal(play.categoryBusiness, "商务词汇");
  assert.equal(play.categoryAcademic, "学术词汇");
  assert.equal(play.categoryAdvanced, "高级英语");
});
