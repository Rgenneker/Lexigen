import type { ReactNode } from "react";
import { MANDARIN_ARTICLE_METADATA } from "./article-metadata";

/**
 * Mandarin long-form shell for every public core route. Route IDs, game names,
 * examples, and branded terms remain English by design.
 */
function article(title: string): ReactNode {
  return <div className="space-y-5">
    <p>词汇学习并不是记住孤立的定义，而是在真实语境中理解、回忆并使用词语。{title}为你提供了一个可以立即实践的方法。</p>
    <h3 className="text-xl font-black mt-8 mb-3">从语境中建立理解</h3>
    <p>留意词语出现的受众、目的和语气。把一个新词与例句、熟悉的主题或个人经历联系起来，比反复浏览列表更容易在需要时想起它。</p>
    <h3 className="text-xl font-black mt-8 mb-3">可持续的练习方法</h3>
    <ul className="list-disc list-inside space-y-2 pl-2">
      <li>先读完整的例子，再查阅准确的定义。</li>
      <li>用这个词写一句与自己生活或工作相关的话。</li>
      <li>隔一段时间不看答案，主动回忆它的含义和用法。</li>
      <li>在合适的对话、阅读或游戏中再次使用它。</li>
    </ul>
    <p className="mt-8 italic text-muted-foreground">稳定、主动而有意义的接触，会把见过的词变成真正属于你的词汇。</p>
  </div>;
}

export const MANDARIN_CORE_ARTICLE_BODIES: Record<string, ReactNode> =
  Object.fromEntries(Object.entries(MANDARIN_ARTICLE_METADATA).map(([id, metadata]) => [id, article(metadata.title)]));