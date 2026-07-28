import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, Search, Star, Zap, Brain, ArrowRight, ChevronRight, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VOCABULARY_LISTS, LETTERS } from "@/data/word-list";

function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.content ?? "";
    if (meta) meta.content = description;
    return () => {
      document.title = prev;
      if (meta) meta.content = prevDesc;
    };
  }, [title, description]);
}

function Breadcrumb({ label }: { label: string }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
      <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-foreground font-medium">{label}</span>
    </nav>
  );
}

const HUB_CONFIG: Record<string, {
  title: string;
  icon: React.ReactNode;
  description: string;
  metaDesc: string;
  sections: { heading: string; items: { label: string; href: string; desc?: string }[] }[];
}> = {
  vocabulary: {
    title: "Vocabulary Hub",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    description: "Your complete vocabulary learning centre. Browse word lists, category pages, and daily vocabulary tools to expand your English vocabulary fast.",
    metaDesc: "The ultimate vocabulary learning hub. Browse 300k+ word pages, vocabulary lists, category collections, and daily vocabulary tools. Improve your English with LexigenZ.",
    sections: [
      {
        heading: "Vocabulary Lists",
        items: VOCABULARY_LISTS.map((l) => ({ label: l.label, href: `/vocabulary/${l.slug}`, desc: "Curated word list" })),
      },
      {
        heading: "Browse by Letter",
        items: LETTERS.map((l) => ({ label: `Words Starting With ${l.toUpperCase()}`, href: `/words/starting-with/${l}` })),
      },
      {
        heading: "Browse by Theme",
        items: [
          { label: "Positive Words", href: "/words/theme/positive", desc: "Uplifting vocabulary" },
          { label: "Motivational Words", href: "/words/theme/motivational", desc: "Words that inspire" },
          { label: "Business Words", href: "/words/theme/business", desc: "Professional vocabulary" },
          { label: "Academic Words", href: "/words/theme/academic", desc: "Scholarly vocabulary" },
          { label: "Advanced Words", href: "/words/theme/advanced", desc: "Sophisticated vocabulary" },
          { label: "Formal Words", href: "/words/theme/formal", desc: "Formal English" },
          { label: "Powerful Words", href: "/words/theme/powerful", desc: "Commanding vocabulary" },
        ],
      },
    ],
  },
  "word-of-the-day": {
    title: "Word of the Day Hub",
    icon: <Star className="w-8 h-8 text-primary" />,
    description: "Explore words of the day from LexigenZ. Each word is selected based on your birth archetype for a personalised daily vocabulary experience.",
    metaDesc: "Word of the day hub. Personalised daily vocabulary words based on your birth archetype. Streaks, badges, and word journal - LexigenZ.",
    sections: [
      {
        heading: "How It Works",
        items: [
          { label: "Get Your Daily Word", href: "/", desc: "Start with today's personalised word" },
          { label: "How LexigenZ Works", href: "/how-it-works", desc: "Learn about the archetype system" },
          { label: "Build a Streak", href: "/app", desc: "Track your daily vocabulary progress" },
          { label: "Word Journal", href: "/app", desc: "Save and review words you've learned" },
        ],
      },
      {
        heading: "Learn More",
        items: [
          { label: "The Science of Learning New Words", href: "/articles/science-of-learning-new-words" },
          { label: "Daily Habits That Expand Vocabulary", href: "/articles/daily-habits-that-expand-vocabulary" },
          { label: "How to Remember New Words", href: "/articles/how-to-improve-your-vocabulary" },
        ],
      },
    ],
  },
  wordle: {
    title: "Wordle Hub",
    icon: <Hash className="w-8 h-8 text-primary" />,
    description: "Become a Wordle expert. Browse 5-letter words, learn strategies, and practice with LexigenZ's Wordle-style game.",
    metaDesc: "Wordle helper, Wordle strategy, and 5-letter word finder. Practice with LexigenZ's Wordle-style vocabulary game. Improve your Wordle score every day.",
    sections: [
      {
        heading: "Wordle Resources",
        items: [
          { label: "Wordle Word List", href: "/vocabulary/wordle-words", desc: "5-letter words for Wordle" },
          { label: "Wordle Strategy Guide", href: "/articles/wordle-strategies-that-work", desc: "Tips that actually work" },
          { label: "Play LexigenZ Word Game", href: "/play", desc: "Practice your Wordle skills" },
          { label: "Words Starting With A–Z", href: "/words/starting-with/a", desc: "Browse by first letter" },
          { label: "Common 5-Letter Words", href: "/vocabulary/wordle-words", desc: "Most frequent Wordle words" },
        ],
      },
      {
        heading: "Browse 5-Letter Words by Letter",
        items: LETTERS.map((l) => ({ label: `5-Letter Words With ${l.toUpperCase()}`, href: `/words/starting-with/${l}` })),
      },
    ],
  },
  scrabble: {
    title: "Scrabble Hub",
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    description: "Boost your Scrabble score. Browse high-value words, Q-without-U words, two and three letter words, and Scrabble strategy guides.",
    metaDesc: "Scrabble word finder, Scrabble dictionary, and Scrabble strategy. Browse high-value words and maximize your Scrabble score with LexigenZ.",
    sections: [
      {
        heading: "Scrabble Resources",
        items: [
          { label: "High-Value Scrabble Words", href: "/vocabulary/scrabble-words", desc: "Q, Z, X, J words for big scores" },
          { label: "100 Essential Scrabble Words", href: "/articles/100-essential-scrabble-words", desc: "Must-know Scrabble vocabulary" },
          { label: "Advanced Vocabulary Alternatives", href: "/words/theme/advanced", desc: "Advanced words for high scores" },
          { label: "Words Ending In -ING", href: "/words/ending-with/ing", desc: "Flexible word endings" },
          { label: "Words Ending In -TION", href: "/words/ending-with/tion", desc: "Common word endings" },
          { label: "Short Powerful Words", href: "/words/theme/simple", desc: "2–4 letter word strategies" },
        ],
      },
    ],
  },
  "spelling-bee": {
    title: "Spelling Bee Hub",
    icon: <Zap className="w-8 h-8 text-primary" />,
    description: "Train for spelling bees at any level. Practice difficult words, learn spelling patterns, and master the vocabulary that wins competitions.",
    metaDesc: "Spelling bee training, spelling bee word list, and spelling bee practice. Prepare for spelling competitions with LexigenZ's vocabulary tools.",
    sections: [
      {
        heading: "Spelling Bee Resources",
        items: [
          { label: "Spelling Bee Word List", href: "/vocabulary/spelling-bee-words", desc: "Practice words for competitions" },
          { label: "Most Difficult English Words", href: "/vocabulary/difficult-english", desc: "Hard words to spell" },
          { label: "Commonly Misspelled Words", href: "/vocabulary/common-misspelled", desc: "Avoid common mistakes" },
          { label: "How Spelling Bees Improve Performance", href: "/articles/how-spelling-bees-improve-academic-performance", desc: "The academic case for spelling bees" },
          { label: "Play Spelling Bee Game", href: "/play", desc: "Practice with audio" },
        ],
      },
      {
        heading: "Browse Difficult Words",
        items: LETTERS.map((l) => ({ label: `Difficult Words Starting With ${l.toUpperCase()}`, href: `/words/starting-with/${l}` })),
      },
    ],
  },
  crossword: {
    title: "Crossword Hub",
    icon: <Search className="w-8 h-8 text-primary" />,
    description: "Solve crosswords faster with the right vocabulary. Browse words by pattern, letter count, and starting/ending letters.",
    metaDesc: "Crossword solver, crossword word finder, and crossword vocabulary. Find words for any crossword clue with LexigenZ's vocabulary tools.",
    sections: [
      {
        heading: "Crossword Resources",
        items: [
          { label: "Crossword Solving Techniques", href: "/articles/crossword-solving-techniques", desc: "Expert strategies" },
          { label: "Words Ending In -TION", href: "/words/ending-with/tion", desc: "Common crossword endings" },
          { label: "Words Ending In -MENT", href: "/words/ending-with/ment", desc: "Common crossword endings" },
          { label: "Words Ending In -ING", href: "/words/ending-with/ing", desc: "Gerund crossword answers" },
          { label: "Advanced Word List", href: "/vocabulary/advanced-english-100", desc: "Sophisticated crossword answers" },
          { label: "Academic Words", href: "/words/theme/academic", desc: "Scholarly crossword vocabulary" },
        ],
      },
      {
        heading: "Browse Words by Starting Letter",
        items: LETTERS.map((l) => ({ label: `${l.toUpperCase()} Words`, href: `/words/starting-with/${l}` })),
      },
    ],
  },
  "word-finder": {
    title: "Word Finder Hub",
    icon: <Search className="w-8 h-8 text-primary" />,
    description: "Find any word you need. Browse by letter, theme, ending, or word length. The complete word finder and word generator tool.",
    metaDesc: "Word finder, word maker, anagram solver, and word generator. Find words from letters and solve word puzzles with LexigenZ.",
    sections: [
      {
        heading: "Find Words By",
        items: [
          ...LETTERS.slice(0, 13).map((l) => ({ label: `Words Starting With ${l.toUpperCase()}`, href: `/words/starting-with/${l}` })),
        ],
      },
      {
        heading: "More Word Finder Tools",
        items: [
          ...LETTERS.slice(13).map((l) => ({ label: `Words Starting With ${l.toUpperCase()}`, href: `/words/starting-with/${l}` })),
          { label: "Anagram Solver", href: "/play", desc: "Solve anagrams" },
          { label: "Wordle Word Finder", href: "/hub/wordle", desc: "5-letter words" },
        ],
      },
      {
        heading: "Browse By Ending",
        items: [
          { label: "Words Ending In -ING", href: "/words/ending-with/ing" },
          { label: "Words Ending In -TION", href: "/words/ending-with/tion" },
          { label: "Words Ending In -MENT", href: "/words/ending-with/ment" },
          { label: "Words Ending In -NESS", href: "/words/ending-with/ness" },
          { label: "Words Ending In -LY", href: "/words/ending-with/ly" },
          { label: "Words Ending In -FUL", href: "/words/ending-with/ful" },
          { label: "Words Ending In -LESS", href: "/words/ending-with/less" },
          { label: "Words Ending In -ABLE", href: "/words/ending-with/able" },
        ],
      },
    ],
  },
  anagram: {
    title: "Anagram Hub",
    icon: <Brain className="w-8 h-8 text-primary" />,
    description: "Solve anagrams and find words from letters. Practice anagram solving with LexigenZ's word games.",
    metaDesc: "Anagram solver, anagram finder, and word puzzle helper. Find words from letters and solve anagrams with LexigenZ.",
    sections: [
      {
        heading: "Anagram Resources",
        items: [
          { label: "Play Anagram Game", href: "/play", desc: "Solve live anagrams" },
          { label: "Word Finder", href: "/hub/word-finder", desc: "Find words from letters" },
          { label: "Words With High Letter Scores", href: "/vocabulary/scrabble-words", desc: "Q, Z, X, J combinations" },
          { label: "Short Powerful Words", href: "/words/theme/simple", desc: "2–5 letter words for anagrams" },
        ],
      },
    ],
  },
  synonym: {
    title: "Synonym Hub",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    description: "Find synonyms for any word. Browse our synonym collections by theme, difficulty, and usage to expand your vocabulary.",
    metaDesc: "Synonym finder and synonym dictionary. Find synonyms for any word and expand your vocabulary with LexigenZ's comprehensive synonym hub.",
    sections: [
      {
        heading: "Browse Synonyms By Theme",
        items: [
          { label: "Synonyms for Positive Words", href: "/words/theme/positive" },
          { label: "Synonyms for Business Words", href: "/words/theme/business" },
          { label: "Synonyms for Academic Words", href: "/words/theme/academic" },
          { label: "Advanced Synonyms", href: "/words/theme/advanced" },
          { label: "Formal Synonyms", href: "/words/theme/formal" },
          { label: "Powerful Synonyms", href: "/words/theme/powerful" },
          { label: "Motivational Synonyms", href: "/words/theme/motivational" },
        ],
      },
      {
        heading: "Popular Synonym Searches",
        items: [
          { label: "Synonyms of Resilient", href: "/word/resilient/synonyms" },
          { label: "Synonyms of Tenacious", href: "/word/tenacious/synonyms" },
          { label: "Synonyms of Pragmatic", href: "/word/pragmatic/synonyms" },
          { label: "Synonyms of Eloquent", href: "/word/eloquent/synonyms" },
          { label: "Synonyms of Meticulous", href: "/word/meticulous/synonyms" },
          { label: "Synonyms of Audacious", href: "/word/audacious/synonyms" },
          { label: "Synonyms of Diligent", href: "/word/diligent/synonyms" },
        ],
      },
    ],
  },
  dictionary: {
    title: "Dictionary Hub",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    description: "Browse LexigenZ's vocabulary dictionary. Look up any English word to find its definition, synonyms, antonyms, and usage examples.",
    metaDesc: "English vocabulary dictionary with definitions, synonyms, antonyms, and example sentences. Browse 300k+ word pages on LexigenZ.",
    sections: [
      {
        heading: "Browse Dictionary A–Z",
        items: LETTERS.map((l) => ({ label: `${l.toUpperCase()}`, href: `/words/starting-with/${l}`, desc: `Words starting with ${l.toUpperCase()}` })),
      },
      {
        heading: "Featured Vocabulary Lists",
        items: VOCABULARY_LISTS.slice(0, 10).map((l) => ({ label: l.label, href: `/vocabulary/${l.slug}` })),
      },
    ],
  },
};

export function HubPage() {
  const params = useParams<{ hub: string }>();
  const hub = params.hub ?? "";
  const config = HUB_CONFIG[hub];

  if (!config) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Hub Not Found</h1>
        <Link href="/hub/vocabulary"><Button>Vocabulary Hub</Button></Link>
      </div>
    );
  }

  useDocumentMeta(`${config.title} | LexigenZ`, config.metaDesc);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumb label={config.title} />

      <div className="flex items-start gap-4 mb-10">
        <div className="p-3 border border-border rounded-xl bg-muted/30">{config.icon}</div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{config.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">{config.description}</p>
        </div>
      </div>

      <div className="space-y-10">
        {config.sections.map((section, si) => (
          <motion.section
            key={si}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: si * 0.05 }}
          >
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">{section.heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {section.items.map((item, ii) => (
                <Link key={ii} href={item.href}>
                  <div className="border border-border rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer group h-full">
                    <p className="font-medium text-sm group-hover:text-primary transition-colors capitalize">{item.label}</p>
                    {item.desc && <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-12 border border-border rounded-xl p-6 bg-muted/30 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <h2 className="font-semibold mb-1">Learn one new word every day with LexigenZ</h2>
          <p className="text-muted-foreground text-sm">Personalised vocabulary delivery based on your birth archetype - with streaks, badges, and 6 word games.</p>
        </div>
        <Link href="/"><Button size="sm">Get Started Free <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Explore Other Hubs</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(HUB_CONFIG)
            .filter(([k]) => k !== hub)
            .map(([k, v]) => (
              <Link key={k} href={`/hub/${k}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">{v.title}</Badge>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HubPage;
