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