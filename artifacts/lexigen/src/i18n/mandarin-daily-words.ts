export interface DailyWordCopy {
  definition: string;
  exampleSentence: string;
}

const MANDARIN_DAILY_WORDS: Record<string, DailyWordCopy> = {
  resilience: {
    definition: "从困境中迅速恢复的能力；韧性。",
    exampleSentence: "面对今年的每一次挑战，她都展现出坚韧。",
  },
  luminous: {
    definition: "发光的；明亮的，尤指在黑暗中。",
    exampleSentence: "城市灯火散发出的璀璨光芒令人叹为观止。",
  },
  ephemeral: {
    definition: "持续时间很短的；转瞬即逝的。",
    exampleSentence: "樱花转瞬即逝的美丽，因此更显珍贵。",
  },
  tenacity: {
    definition: "能够牢牢抓住某物的特性或能力；坚韧不拔。",
    exampleSentence: "她面对逆境时表现出的坚韧，为她赢得了晋升机会。",
  },
  serendipity: {
    definition: "偶然发生并带来美好或有益结果的事；意外之喜。",
    exampleSentence: "他们竟在那家咖啡馆相遇，真是意外之喜。",
  },
  audacious: {
    definition: "敢于冒险的；大胆无畏的。",
    exampleSentence: "这个大胆的计划看似不可能，但他们最终成功了。",
  },
  equanimity: {
    definition: "尤指在困境中保持的平静与沉着。",
    exampleSentence: "面对危机，她表现得异常沉着。",
  },
  confluence: {
    definition: "两条河流交汇的地方；汇合；交融。",
    exampleSentence: "峰会上思想的交汇激发了创新。",
  },
  wanderlust: {
    definition: "强烈的旅行和探索世界的渴望。",
    exampleSentence: "她对旅行的热爱让她走访了五十多个国家。",
  },
  perspicacious: {
    definition: "洞察力敏锐的；聪慧机敏的。",
    exampleSentence: "那位观察敏锐的分析师在其他人发现之前就指出了问题。",
  },
  fortitude: {
    definition: "面对痛苦或逆境时的勇气；坚强的意志。",
    exampleSentence: "在漫长的行动期间，士兵们展现出非凡的坚韧。",
  },
  ebullience: {
    definition: "开朗而充满活力的状态；热情洋溢。",
    exampleSentence: "她热情洋溢，让每次聚会都更加热闹欢快。",
  },
};

export function getMandarinDailyWordCopy(word: string): DailyWordCopy {
  return MANDARIN_DAILY_WORDS[word.trim().toLocaleLowerCase()] ?? {
    definition: "该词条的普通话释义暂未提供。",
    exampleSentence: "该词条的普通话例句暂未提供。",
  };
}

export function getMandarinDailyWordKeys(): string[] {
  return Object.keys(MANDARIN_DAILY_WORDS);
}
