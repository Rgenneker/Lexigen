import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import en from "../src/i18n/locales/en.json";
import zh from "../src/i18n/locales/zh.json";

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
  const locale = applyMandarinOverrides(zh as Record<string, unknown>);
  const play = locale.play as Record<string, string>;
  const howItWorks = locale.howItWorks as Record<string, string>;
  assert.equal(play.categoryEmotions, "情绪词汇");
  assert.equal(play.categoryBusiness, "商务词汇");
  assert.equal(play.categoryAcademic, "学术词汇");
  assert.equal(play.categoryAdvanced, "高级英语");
  assert.equal(howItWorks.catEmotions, "情绪词汇");
  assert.equal(howItWorks.catBusiness, "商务词汇");
  assert.equal(howItWorks.catAcademic, "学术词汇");
  assert.equal(howItWorks.catAdvanced, "高级英语");
});

test("Mandarin FAQ questions, answers, and section labels are translated", () => {
  const locale = applyMandarinOverrides(zh as Record<string, unknown>);
  const faq = locale.faq as {
    categories: Record<string, string>;
    items: Array<{ q: string; a: string }>;
  };

  assert.deepEqual(faq.categories, {
    all: "全部",
    gettingStarted: "入门",
    vocabulary: "词汇学习",
    archetypes: "词汇原型",
    games: "游戏",
    premium: "高级版",
    languages: "语言",
    privacy: "隐私与数据",
    technical: "技术问题",
  });
  assert.equal(faq.items.length, 46);
  assert.equal(faq.items[0].q, "Lexigenz 到底是什么？");
  assert.equal(faq.items[13].q, "Lexigenz 有哪些单词游戏？");
  assert.equal(faq.items[45].q, "怎样才能把新单词牢牢记住？");

  faq.items.forEach((item, index) => {
    assert.match(item.q, /[\u4e00-\u9fff]/, `FAQ question ${index + 1} should be in Mandarin`);
    assert.match(item.a, /[\u4e00-\u9fff]/, `FAQ answer ${index + 1} should be in Mandarin`);
    assert.notEqual(item.q, en.faq.items[index].q, `FAQ question ${index + 1} should not fall back to English`);
    assert.notEqual(item.a, en.faq.items[index].a, `FAQ answer ${index + 1} should not fall back to English`);
  });
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
