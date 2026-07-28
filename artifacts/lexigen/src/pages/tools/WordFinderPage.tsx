import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function WordFinderPage() {
  usePageMeta({
    title: "Word Finder - Find Words From Letters, Patterns & Clues | LexigenZ",
    description: "Complete guide to finding words from letter combinations. How word finders work, common letter patterns, English word structure, and strategies for word games, puzzles, and creative writing.",
    canonical: "/word-finder",
    keywords: "word finder, find words from letters, word search, word patterns, letters to words, word game helper",
  });

  const commonEndings = [
    { ending: "-TION", examples: "action, nation, station, motion, notion, fraction, position, emotion" },
    { ending: "-NESS", examples: "kindness, darkness, happiness, awareness, calmness, sadness, brightness" },
    { ending: "-MENT", examples: "movement, treatment, payment, agreement, development, argument" },
    { ending: "-ABLE", examples: "capable, suitable, adorable, readable, manageable, comfortable" },
    { ending: "-IBLE", examples: "possible, visible, flexible, audible, eligible, credible, terrible" },
    { ending: "-LY", examples: "quickly, simply, clearly, recently, perfectly, obviously, entirely" },
    { ending: "-FUL", examples: "powerful, careful, hopeful, grateful, cheerful, peaceful, harmful" },
    { ending: "-LESS", examples: "hopeless, careless, harmless, useless, restless, breathless, endless" },
    { ending: "-ING", examples: "running, thinking, writing, playing, building, speaking, learning" },
    { ending: "-ED", examples: "wanted, played, worked, talked, moved, changed, improved, decided" },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Word Tools</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Word Finder</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find words from any combination of letters. Understand how English word structure works and discover the patterns that make finding words faster and more intuitive.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How Word Finders Work</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>A word finder is a tool that generates valid words from a set of letters you provide. You input some or all of your available letters, specify any constraints such as word length or required positions, and the tool returns every valid word that can be formed from your letter set. Word finders are valuable across a wide range of contexts: word games like Scrabble and Words With Friends, crossword puzzle solving, creative writing, educational activities, and general language exploration.</p>
              <p>At their core, word finders work by checking permutations and combinations of your input letters against a comprehensive word dictionary. More sophisticated tools also apply linguistic pattern matching, which allows them to find words that match partial patterns with blank positions, like words matching the pattern C__T or _IGHT. The quality of a word finder depends primarily on the completeness and currency of its underlying word list.</p>
              <p>Word finders work best when you understand the constraints they operate within. Different word games use different valid word lists. Scrabble uses specific official dictionaries that differ between North American and international editions. Words With Friends uses its own word list, which includes some words not in the Scrabble dictionary and excludes others that Scrabble accepts. Wordle uses a specific curated subset of common five-letter English words. When using a word finder for a specific game, make sure the tool is checking against the appropriate word list.</p>
              <p>Beyond games, word finders are genuinely useful for writers seeking words that fit a specific metrical pattern in poetry, words that rhyme with a particular sound, or words that begin or end with a specific letter sequence. Understanding the structural principles that word finders use can help you become your own word finder for many common searches.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">English Word Structure: What You Need to Know</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>English words are built from a relatively small set of structural components: roots, prefixes, and suffixes. Understanding these components transforms you from a passive receiver of words into an active creator of them. When you are looking for a word that fits a specific meaning and letter pattern, knowledge of word structure dramatically reduces the search space.</p>
              <p>Prefixes attach to the beginning of a root word and modify its meaning. The prefix UN means not, giving you unhappy, unsafe, unknown, unlikely, and unbearable from the same starting point. The prefix RE means again, giving you rebuild, rewrite, review, replay, and rethink. The prefix DIS means away, apart, or not, giving you disagree, disconnect, disorder, and disappear. Knowing that your target word might be a prefixed form of a simpler root lets you search for the root and then attach prefixes systematically.</p>
              <p>Suffixes attach to the end of root words and typically change the word's grammatical role. Adding -TION to a verb root creates a noun: act becomes action, create becomes creation, educate becomes education. Adding -LY to an adjective creates an adverb: quick becomes quickly, clear becomes clearly, perfect becomes perfectly. Adding -FUL to a noun creates an adjective: hope becomes hopeful, care becomes careful, power becomes powerful. These suffix transformations are systematic and predictable, which means knowing them lets you generate large families of related words from a single starting point.</p>
              <p>Compound words combine two complete words into a new one: bookcase, sunlight, football, notebook, rainbow. When searching for words with a particular letter combination, compound words are worth considering separately because their internal structure follows word-boundary logic rather than standard syllabic patterns. Many letter combinations that seem difficult to form into words become straightforward when you recognise that they represent the junction of two shorter words.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Common Word Endings and Example Words</h2>
            <p className="text-muted-foreground mb-6">Knowing these endings lets you work backwards from letter combinations to find valid words more efficiently.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commonEndings.map(({ ending, examples }) => (
                <div key={ending} className="p-4 rounded-xl border border-border bg-background">
                  <span className="font-black font-mono text-primary block mb-1">{ending}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{examples}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">High-Frequency Letter Combinations in English</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>English words follow predictable patterns in how consonants cluster, which vowels appear adjacent to which consonants, and which letter combinations are simply impossible in well-formed English words. Understanding these patterns lets you make educated guesses about words even when you cannot recall them directly, and it helps you recognise immediately when a generated combination cannot be a valid English word.</p>
              <p>Common consonant clusters that begin English words include BL, BR, CL, CR, DR, FL, FR, GL, GR, PL, PR, SC, SK, SL, SM, SN, SP, ST, SW, TH, TR, and WR. These clusters appear at the start of thousands of common English words. If you have these letters available, you have a productive starting point for word construction. Conversely, clusters that do not appear at the start of English words include BN, DL, FK, and many others: seeing these combinations in a word finder result would immediately flag the word as suspect.</p>
              <p>Common two-letter vowel combinations in English include AI as in rain, EA as in read, EE as in tree, OA as in boat, OO as in moon, OU as in cloud, and AU as in cause. These pairs appear in the middle of thousands of common words and are productive targets when working from available vowels. Less common but valid vowel pairs include OI as in oil, OE as in poet, and IE as in field.</p>
              <p>The Q almost always requires U to follow it in English words, with specific exceptions noted in the Scrabble words section of this site. The letter J rarely appears at the end of English words. The letter V never ends a word in standard English without a following E. The letter W does not appear as the second letter after another consonant except in words borrowed from other languages. These constraints reduce the valid word space significantly and make systematic word finding more tractable.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Word Finding Strategies for Common Situations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">When You Have Too Many Vowels</h3>
                <p className="text-muted-foreground leading-relaxed">A rack heavy in vowels is a common and frustrating situation in Scrabble and similar games. The best strategy is to look for short words that use multiple consecutive vowels: words like QUEUE, AUDIO, ADIEU, OUIJA, and OIDIA all use four or five vowels in a short word. Alternatively, look for words where vowels can carry the full phonetic weight: AEON, IDEA, ARIA, and similar words are short but vowel-heavy. Planning ahead by tracking remaining consonants in the bag and playing vowels strategically prevents the worst vowel-heavy situations from developing.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">When You Have Too Many Consonants</h3>
                <p className="text-muted-foreground leading-relaxed">Consonant-heavy racks require looking for consonant cluster words that English borrowed from other languages. Words like CRYPT, TRYST, GLYPH, LYNCH, LYMPH, NYMPH, and PYGMY contain multiple consonants with minimal vowels. Additionally, the letters S, T, N, R, and L can often be combined into short valid words even without vowels in some specific letter games. In Scrabble, exchanging is usually better than forcing a low-scoring play when vowels are critically short.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Using Wildcards and Blank Tiles</h3>
                <p className="text-muted-foreground leading-relaxed">Blank tiles in Scrabble and wildcards in word puzzle contexts represent any letter you choose. The most productive use of a blank is in a position that enables a high-scoring word, particularly a bingo that uses all seven tiles. Blanks should almost never be used to make a two-letter word when they could be held for a longer, higher-value play. When using a word finder with a blank, search for the words it enables systematically rather than committing to the first valid word found.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Browse Words by Starting Letter</h2>
            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
              {"abcdefghijklmnopqrstuvwxyz".split("").map((l) => (
                <Link key={l} href={`/words/letter/${l}`}>
                  <div className="p-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-sm font-black text-center uppercase">{l}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Expand Your Word-Finding Vocabulary</h2>
          <p className="text-muted-foreground mb-6">The best word finder is the one in your head. Daily vocabulary practice builds the mental word list that serves you in every game, puzzle, and writing situation.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Build Your Vocabulary</Button></Link>
        </div>
      </section>
    </div>
  );
}
