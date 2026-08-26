export interface ArticleMetadata {
  category: string;
  title: string;
  excerpt: string;
}

/**
 * Listing copy is kept separate from the article bodies, which remain English
 * reference content. Keys match the stable article route IDs.
 */
export const FRENCH_ARTICLE_METADATA: Record<string, ArticleMetadata> = {
  "origin-of-spelling-bee": {
    category: "Histoire des mots",
    title: "L'origine du Spelling Bee — et pourquoi c'est plus passionnant qu'on ne le pense",
    excerpt: "Avant TikTok, avant Instagram, et même avant la radio, les gens se réunissaient dans des champs et des mairies pour épeler des mots en compétition. Si, vraiment.",
  },
  "wild-word-facts": {
    category: "Faits sur les mots",
    title: "12 faits étonnants sur les mots qui vont vous retourner le cerveau",
    excerpt: "La langue est délicieusement débridée. Voici 12 faits sur les mots qui vous feront fixer le plafond ce soir.",
  },
  "nail-english-exam": {
    category: "Conseils d'étude",
    title: "6 façons de réussir votre examen d'anglais sans passer une nuit blanche",
    excerpt: "Inutile de sacrifier votre sommeil ou votre vie sociale pour exceller en anglais. Il vous faut une stratégie plus intelligente. Voici ce qui fonctionne vraiment.",
  },
  "lecture-better": {
    category: "Communication",
    title: "12 façons de mieux présenter et de garder vraiment votre public éveillé",
    excerpt: "Que vous soyez enseignant, étudiant en exposé ou amené à présenter au travail, ces 12 changements transformeront la façon dont les autres vous écoutent.",
  },
  "say-it-confidently": {
    category: "Confiance en soi",
    title: "Parlez avec assurance à chaque fois : l'art de vous approprier vos mots",
    excerpt: "La confiance ne consiste pas à avoir les mots parfaits, mais à faire confiance à ceux que vous avez. Voici comment bâtir cette confiance.",
  },
  "vocabulary-changes-your-life": {
    category: "Développement personnel",
    title: "Le pouvoir des mots : comment enrichir votre vocabulaire peut littéralement changer votre vie",
    excerpt: "Il ne s'agit pas de paraître intelligent, mais de penser clairement, de mieux gagner sa vie et de naviguer dans le monde avec précision. Les mots sont votre outil le plus sous-estimé.",
  },
  "gen-z-rewriting-dictionary": {
    category: "Langue et culture",
    title: "La vie secrète de l'argot : comment la génération Z réécrit vraiment le dictionnaire",
    excerpt: "Sans blague : l'argot n'est pas une langue paresseuse, c'est de l'innovation. Voici la science linguistique qui explique pourquoi les mots créés par la génération Z sont brillants.",
  },
  "communication-habits": {
    category: "Communication",
    title: "5 habitudes de communication qui feront vraiment écouter les autres",
    excerpt: "La plupart des gens ne communiquent pas mal faute de connaître assez de mots, mais à cause de cinq habitudes que l'on peut corriger. Les voici.",
  },
  "empower-yourself-with-words": {
    category: "Développement personnel",
    title: "Pourquoi connaître ses mots est l'outil ultime pour s'émanciper",
    excerpt: "La culture du développement personnel regorge de conseils sur l'état d'esprit et les habitudes. On ne parle pas assez de vocabulaire. Voici pourquoi c'est le manque à combler.",
  },
  "word-origins-unhinged": {
    category: "Histoire des mots",
    title: "Les origines complètement folles de 10 mots du quotidien",
    excerpt: "Les mots que vous employez chaque jour ont des histoires plus étranges, plus drôles et plus tortueuses que vous ne l'imaginez. Attachez votre ceinture.",
  },
  "how-to-improve-your-vocabulary": {
    category: "Conseils d'étude",
    title: "Comment enrichir votre vocabulaire de 1 000 mots",
    excerpt: "Une méthode pratique, fondée sur la science, pour ajouter 1 000 mots à votre vocabulaire actif — sans fiches, sans bachotage et sans perdre la tête.",
  },
  "advanced-english-words-professionals": {
    category: "Communication",
    title: "500 mots anglais avancés que tout professionnel devrait connaître",
    excerpt: "Des réunions de direction aux e-mails clients, votre vocabulaire fait votre crédibilité. Voici les mots à forte valeur qui distinguent les bons communicants des autres.",
  },
  "wordle-strategies-that-work": {
    category: "Jeux",
    title: "Des stratégies Wordle qui fonctionnent vraiment",
    excerpt: "Cessez de deviner au hasard. Ces stratégies Wordle étayées par les données réduisent considérablement votre nombre moyen d'essais — et oui, le mot de départ compte vraiment.",
  },
  "essential-scrabble-words": {
    category: "Jeux",
    title: "100 mots essentiels au Scrabble que tout joueur devrait connaître",
    excerpt: "Vous n'avez pas besoin d'un vocabulaire immense pour gagner au Scrabble. Il vous faut les bons mots. Ces mots à fort score, difficiles à contrer, changeront votre jeu.",
  },
  "best-vocabulary-apps-compared": {
    category: "Conseils d'étude",
    title: "Les meilleures applis de vocabulaire comparées en 2025",
    excerpt: "Toutes les applis de vocabulaire ne se valent pas. Nous avons comparé les meilleures selon la mémorisation, la personnalisation et l'efficacité au quotidien. Voici nos conclusions.",
  },
  "spelling-bees-academic-performance": {
    category: "Faits sur les mots",
    title: "Comment les concours d'orthographe améliorent les résultats scolaires",
    excerpt: "Les recherches sont claires : les élèves qui participent à des concours d'orthographe développent des compétences qui dépassent largement l'orthographe — en lecture, écriture et raisonnement.",
  },
  "crossword-solving-techniques": {
    category: "Jeux",
    title: "Des techniques pour résoudre les mots croisés à tous les niveaux",
    excerpt: "Des stratégies accessibles aux débutants aux habitudes d'experts qui viennent à bout des grilles du dimanche les plus difficiles : voici comment progresser systématiquement.",
  },
  "science-of-learning-new-words": {
    category: "Conseils d'étude",
    title: "La science de l'apprentissage des nouveaux mots (et pourquoi la plupart des applis se trompent)",
    excerpt: "Les recherches sur la mémoire nous montrent clairement comment le vocabulaire s'ancre réellement — et c'est presque l'inverse de ce que proposent la plupart des applis de mots.",
  },
  "vocabulary-matters-in-business": {
    category: "Communication",
    title: "Pourquoi votre vocabulaire influence directement votre carrière",
    excerpt: "Des décennies de recherches relient l'étendue du vocabulaire au revenu, aux promotions et à l'efficacité du leadership. Voici ce que disent les données — et quoi faire.",
  },
  "daily-habits-expand-vocabulary": {
    category: "Développement personnel",
    title: "Des habitudes quotidiennes qui enrichissent vraiment votre vocabulaire",
    excerpt: "Ni séances de bachotage ni marathons de mémorisation : ces petites habitudes quotidiennes et régulières favorisent une progression durable du vocabulaire, selon la science des habitudes.",
  },
  "commonly-misspelled-words": {
    category: "Faits sur les mots",
    title: "Les mots anglais les plus souvent mal orthographiés (et comment les corriger)",
    excerpt: "Ces mots sont mal orthographiés depuis des générations. Voici pourquoi — et les astuces mnémotechniques qui permettent vraiment de retenir la bonne orthographe.",
  },
  "how-to-speak-more-professionally": {
    category: "Communication",
    title: "Comment parler de manière plus professionnelle sans sonner faux",
    excerpt: "Améliorer sa façon de parler au travail ne veut pas dire adopter le jargon d'entreprise. Il s'agit de choisir des mots avec plus de précision, d'assurance et d'impact.",
  },
  "powerful-words-improve-communication": {
    category: "Communication",
    title: "Des mots puissants qui améliorent instantanément votre communication",
    excerpt: "Certains mots ont un poids disproportionné dans une conversation. Voici ceux qui méritent d'entrer dans votre vocabulaire actif — et pourquoi ils fonctionnent.",
  },
  "vocabulary-building-for-students": {
    category: "Conseils d'étude",
    title: "Enrichir son vocabulaire quand on est étudiant : un système complet",
    excerpt: "Les élèves au vocabulaire solide lisent plus vite, écrivent mieux, obtiennent de meilleurs résultats et apprennent plus efficacement dans toutes les matières. Voici le système qui le permet.",
  },
  "how-reading-improves-vocabulary": {
    category: "Conseils d'étude",
    title: "Comment la lecture enrichit le vocabulaire (et comment lire pour progresser)",
    excerpt: "La lecture est le moyen le plus efficace d'enrichir durablement son vocabulaire — mais seulement si l'on lit les bons textes de la bonne manière. Voici ce que dit la recherche.",
  },
  "why-context-beats-repetition": {
    category: "Science de la mémoire",
    title: "Pourquoi le contexte surpasse la répétition pour retenir le vocabulaire",
    excerpt: "La recherche montre qu'un mot rencontré dans une phrase qui a du sens — surtout si vous l'avez écrite vous-même — est trois fois plus efficace que les fiches. Voici la neuroscience derrière votre Journal de mots.",
  },
  "the-21-day-word-habit": {
    category: "Habitudes linguistiques",
    title: "L'habitude des mots en 21 jours : développer sa fluidité grâce à de courtes expositions quotidiennes",
    excerpt: "Vous n'avez pas besoin d'heures d'étude, mais de sept minutes par jour, chaque jour. Découvrez les techniques d'empilement d'habitudes qui font du mot quotidien de Lexigenz un changement durable.",
  },
  "learning-with-others": {
    category: "Apprentissage social",
    title: "Apprendre avec les autres : comment le jeu compétitif accélère la mémorisation des mots",
    excerpt: "Quand vous défiez un ami à Wordle ou jouez ensemble au jeu Lexigenz, votre cerveau encode le vocabulaire différemment — et plus vite. Découvrez la science de l'apprentissage social du vocabulaire.",
  },
  "owning-every-register": {
    category: "Génération Z et langue",
    title: "Alternance codique, argot et anglais standard : maîtriser tous les registres",
    excerpt: "La génération Z communique déjà avec aisance dans plusieurs registres. Anglais formel, argot d'internet, langage communautaire : Lexigenz vous aide à maîtriser le vocabulaire formel sans perdre votre voix.",
  },
  "word-power-is-life-power": {
    category: "Développement personnel",
    title: "Le pouvoir des mots, c'est le pouvoir d'agir : comment le vocabulaire façonne la confiance et les opportunités",
    excerpt: "Des études relient l'étendue du vocabulaire aux revenus, à l'assurance sociale et à l'agilité cognitive. Il ne s'agit pas d'être « correct », mais d'avoir plus d'outils. Plus de mots, c'est plus de façons d'être compris, respecté et entendu.",
  },
};

/** Mandarin listing copy uses the existing, stable English route IDs. */
export const MANDARIN_ARTICLE_METADATA: Record<string, ArticleMetadata> = {
  "origin-of-spelling-bee": { category: "词语历史", title: "Spelling Bee 的起源——以及它为何比你想象的更精彩", excerpt: "早在 TikTok、Instagram，甚至收音机出现之前，人们就聚集在田野和市政厅里竞赛拼写单词。" },
  "wild-word-facts": { category: "词语趣闻", title: "12 个会让你大吃一惊的词语事实", excerpt: "语言奇妙而狂野。这里有 12 个会让你今晚盯着天花板思考的词语事实。" },
  "nail-english-exam": { category: "学习技巧", title: "不用熬夜也能考好英语的 6 个方法", excerpt: "要在英语考试中表现出色，不必牺牲睡眠或社交生活；你需要的是更聪明的策略。" },
  "lecture-better": { category: "沟通", title: "12 个让演讲更出色并真正抓住听众的方法", excerpt: "无论你是教师、学生还是职场演讲者，这些改变都会提升别人听你说话的方式。" },
  "say-it-confidently": { category: "自信", title: "每次都自信表达：拥有自己语言的艺术", excerpt: "自信不是拥有完美的词语，而是相信你已有的词语。" },
  "vocabulary-changes-your-life": { category: "个人成长", title: "词语的力量：词汇如何真正改变你的人生", excerpt: "这不是为了显得聪明，而是为了清晰思考、更好地谋生并准确地应对世界。" },
  "gen-z-rewriting-dictionary": { category: "语言与文化", title: "俚语的秘密生活：Z 世代如何重写词典", excerpt: "俚语并不是懒惰的语言，而是一种创新。" },
  "communication-habits": { category: "沟通", title: "让别人真正倾听你的 5 个沟通习惯", excerpt: "大多数人沟通不佳不是因为词汇不够，而是因为五种可以改变的习惯。" },
  "empower-yourself-with-words": { category: "个人成长", title: "为什么掌握词语是赋能自己的终极工具", excerpt: "个人成长常谈心态和习惯，却很少谈词汇。" },
  "word-origins-unhinged": { category: "词语历史", title: "10 个日常词语出人意料的起源", excerpt: "你每天使用的词语，拥有比你想象中更奇特、更有趣的故事。" },
  "how-to-improve-your-vocabulary": { category: "学习技巧", title: "如何扩充 1,000 个词的词汇量", excerpt: "一种实用且以科学为基础的方法，帮你增加活跃词汇量。" },
  "advanced-english-words-professionals": { category: "沟通", title: "每位职场人士都应掌握的 500 个高级英语词汇", excerpt: "从董事会会议到客户邮件，词汇塑造你的可信度。" },
  "wordle-strategies-that-work": { category: "游戏", title: "真正有效的 Wordle 策略", excerpt: "停止随意猜测。这些由数据支持的策略能显著减少你的平均尝试次数。" },
  "essential-scrabble-words": { category: "游戏", title: "每位玩家都该知道的 100 个 Scrabble 核心词", excerpt: "赢得 Scrabble 不需要海量词汇，而需要正确的词。" },
  "best-vocabulary-apps-compared": { category: "学习技巧", title: "2025 年最佳词汇应用比较", excerpt: "并非所有词汇应用都一样；我们比较了记忆、个性化和日常成效。" },
  "spelling-bees-academic-performance": { category: "词语趣闻", title: "拼写比赛如何提升学业表现", excerpt: "研究表明，参加拼写比赛的学生培养的能力远不止拼写。" },
  "crossword-solving-techniques": { category: "游戏", title: "适合每个水平的填字游戏解题技巧", excerpt: "从新手策略到破解最难周日谜题的专家习惯，持续进步的方法都在这里。" },
  "science-of-learning-new-words": { category: "学习技巧", title: "学习新词的科学（以及多数应用为何做错）", excerpt: "记忆研究清楚说明词汇如何真正扎根。" },
  "vocabulary-matters-in-business": { category: "沟通", title: "为什么词汇会直接影响你的职业", excerpt: "数十年的研究将词汇广度与收入、晋升和领导效能联系起来。" },
  "daily-habits-expand-vocabulary": { category: "个人成长", title: "真正能扩充词汇量的日常习惯", excerpt: "不是死记硬背或记忆马拉松，而是小而持续的日常习惯。" },
  "commonly-misspelled-words": { category: "词语趣闻", title: "最常被拼错的英语单词（以及如何拼对）", excerpt: "这些词被拼错了好几代；这里解释原因和真正有效的记忆方法。" },
  "how-to-speak-more-professionally": { category: "沟通", title: "如何说得更专业而不显得做作", excerpt: "提升职场表达不等于使用企业术语；它关乎准确、自信和影响力。" },
  "powerful-words-improve-communication": { category: "沟通", title: "立即改善沟通的有力词语", excerpt: "有些词在对话中有不成比例的力量，值得加入你的活跃词汇。" },
  "vocabulary-building-for-students": { category: "学习技巧", title: "学生词汇建设：完整系统", excerpt: "拥有强大词汇的学生读得更快、写得更好，并在各学科学得更有效。" },
  "how-reading-improves-vocabulary": { category: "学习技巧", title: "阅读如何改善词汇量（以及如何为进步而读）", excerpt: "阅读是长期扩充词汇最有效的方法——只要用正确方法读正确内容。" },
  "why-context-beats-repetition": { category: "记忆科学", title: "为什么语境比重复更能提高词汇记忆", excerpt: "研究显示，在有意义的句子中遇到词语比单词卡有效三倍。" },
  "the-21-day-word-habit": { category: "语言习惯", title: "21 天单词习惯：通过每日微接触建立流利度", excerpt: "你不需要数小时学习，只需要每天七分钟。" },
  "learning-with-others": { category: "社交学习", title: "与他人共同学习：竞技游戏如何加速单词记忆", excerpt: "和朋友挑战 Wordle 或一起玩 Lexigenz Game 时，大脑会更快地编码词汇。" },
  "owning-every-register": { category: "Z 世代与语言", title: "语码转换、俚语和标准英语：掌控每种语域", excerpt: "Lexigenz 帮助你掌握正式词汇，同时保留自己的声音。" },
  "word-power-is-life-power": { category: "个人成长", title: "言语的力量就是生命的力量：词汇如何塑造自信与机遇", excerpt: "更多词汇意味着更多被理解、被尊重和被倾听的方式。" },
};