import assert from "node:assert/strict";
import test from "node:test";
import React from "react";

Object.defineProperty(globalThis, "React", { configurable: true, value: React });

const [
  { ARTICLES },
  { MANDARIN_ARTICLE_METADATA },
  { MANDARIN_CORE_ARTICLE_BODIES },
  { applyMandarinOverrides },
  { getMandarinDailyWordCopy, getMandarinDailyWordKeys },
] = await Promise.all([
  import("../src/data/articles"),
  import("../src/i18n/article-metadata"),
  import("../src/i18n/mandarin-article-content"),
  import("../src/i18n/mandarin-overrides"),
  import("../src/i18n/mandarin-daily-words"),
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

test("Mandarin daily words include translated definitions and examples", () => {
  const words = getMandarinDailyWordKeys();
  assert.equal(words.length, 12);
  for (const word of words) {
    const copy = getMandarinDailyWordCopy(word);
    assert.match(copy.definition, /[\u4e00-\u9fff]/, `${word} definition should be Mandarin`);
    assert.match(copy.exampleSentence, /[\u4e00-\u9fff]/, `${word} example should be Mandarin`);
  }
  assert.equal(
    getMandarinDailyWordCopy("Audacious").definition,
    "敢于冒险的；大胆无畏的。",
  );
});

test("Mandarin daily-word fallback never displays an English definition", () => {
  const copy = getMandarinDailyWordCopy("new-word");
  assert.match(copy.definition, /[\u4e00-\u9fff]/);
  assert.match(copy.exampleSentence, /[\u4e00-\u9fff]/);
});

test("Mandarin championship banner and quiz prompts use Chinese wording", () => {
  const locale = applyMandarinOverrides({});
  const app = locale.app as Record<string, string>;
  assert.equal(app.championshipTitle, "2027年世界锦标赛");
  assert.equal(app.championshipEvent, "全球拼字比赛 · 6月19日 · 12:00 UTC");
  assert.equal(app.quizQuestionOne, "问题一：{{word}} 是什么意思？");
});
