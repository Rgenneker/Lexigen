import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function WordleWordsPage() {
  usePageMeta({
    title: "Wordle Words - Complete Guide, Strategies & Word Lists | LexigenZ",
    description: "Master Wordle with our complete guide. Best starting words, strategies, common patterns, hard mode tips, and how vocabulary knowledge gives you a decisive edge.",
    canonical: "/wordle-words",
    keywords: "wordle words, wordle strategy, best wordle starting words, wordle tips, wordle guide, five letter words",
  });

  const startingWords = ["CRANE", "SLATE", "AUDIO", "RAISE", "STARE", "AROSE", "TEARS", "IRATE", "SANER", "ALTER"];
  const commonPatterns = [
    { pattern: "Words ending in -IGHT", examples: "light, night, fight, might, right, sight, tight, bight, wight" },
    { pattern: "Words ending in -OUND", examples: "found, bound, round, sound, wound, mound, hound, pound, mound" },
    { pattern: "Words ending in -TION", examples: "Not valid in Wordle - all five-letter -tion words are six letters" },
    { pattern: "Words ending in -STER", examples: "aster, buster, foster, luster, mister, oyster, sister" },
    { pattern: "Words ending in -ATCH", examples: "batch, catch, hatch, latch, match, patch, watch" },
    { pattern: "Words ending in -ARGE", examples: "barge, charge, large, marge" },
    { pattern: "Words with double letters", examples: "abbey, added, alley, belle, berry, blood, brood, cheek" },
    { pattern: "More -IGHT words", examples: "aight, bight, fight, light, might, night, right, sight, tight, wight" },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-green-500">Word Games</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Wordle Words</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The complete guide to Wordle words, strategies, and vocabulary. Stop guessing randomly and start solving with purpose.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["🟩", "🟨", "⬜", "🟩", "🟨"].map((c, i) => (
                <span key={i} className="text-3xl">{c}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">What Is Wordle and How Does It Work</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Wordle is a daily word puzzle where players attempt to guess a hidden five-letter English word in six or fewer tries. After each guess, tiles change colour to indicate how close you are to the answer. A green tile means the letter is correct and in the correct position. A yellow tile means the letter is in the word but in a different position. A grey tile means the letter does not appear in the word at all.</p>
              <p>The game was created by Josh Wardle and became a global phenomenon after being acquired by The New York Times in early 2022. Its appeal lies in its elegant simplicity and the way it combines word knowledge with logical deduction. Anyone can play, but mastery requires both vocabulary breadth and systematic strategy.</p>
              <p>Wordle selects its daily words from a curated list of around 2,300 common five-letter English words. The list excludes highly obscure words, proper nouns, and words with unusual letter combinations that would feel unfair to casual players. Understanding the characteristics of this word pool is the foundation of strong Wordle strategy.</p>
              <p>The shared daily puzzle format is central to Wordle's social appeal. Everyone around the world plays the same word on the same day, which makes the results shareable and comparable. This creates a daily ritual and a shared experience that keeps millions of players returning every morning.</p>
              <p>Hard Mode is an optional setting that forces players to use confirmed letters in every subsequent guess. In standard mode, you can guess words that you know contain eliminated letters, purely to gather more information. In Hard Mode, every guess must incorporate all confirmed letters in their confirmed positions. This is significantly more challenging but produces substantially better vocabulary learning as a side effect.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">The Best Wordle Starting Words</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Your opening word is the single most important decision in every Wordle game. A well-chosen starting word eliminates large portions of the possible word pool immediately, giving you more information with which to make your subsequent guesses. A poor starting word wastes one of your six precious attempts on low-information output.</p>
              <p>The best starting words share specific characteristics. They contain only letters from the high-frequency set, meaning letters that appear most often in five-letter English words. No letter is repeated, since a repeated letter in your opener wastes a position that could deliver new information. The word should ideally contain vowels in multiple positions, since vowel placement is one of the fastest ways to narrow the answer space.</p>
              <p>Statistical analysis of the Wordle word list consistently identifies certain letters as appearing most frequently in answers: E, A, R, O, T, L, I, S, N, and C lead the frequency charts. An ideal starting word covers as many of these as possible.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
              {startingWords.map((w) => (
                <div key={w} className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-center font-black text-green-600 tracking-widest">
                  {w}
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4 text-base leading-relaxed">
              <p>CRANE is widely regarded as one of the strongest openers. It contains C, R, A, N, and E, covering five of the ten most common Wordle letters with no repeats. SLATE offers S, L, A, T, and E. AUDIO maximises vowel coverage with A, U, D, I, and O, including four of the five vowels in a single word, making it excellent for players who prioritise identifying vowel positions early.</p>
              <p>Some experienced players use a two-word opening system rather than seeking a perfect single starter. By pre-selecting two complementary words that together cover ten different high-frequency letters, they can gather maximum information in the first two guesses before switching to answer-chasing from guess three onward.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Core Wordle Strategy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Maximise Information, Not Guesses</h3>
                <p className="text-base leading-relaxed text-muted-foreground">The fundamental error most Wordle players make is trying to guess the answer too early. Every guess is most valuable when it eliminates the maximum number of remaining possibilities. A guess that eliminates half the remaining words is far more valuable than a guess that chases a specific answer and might miss entirely. Think like a scientist forming hypotheses rather than a gambler going for broke.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Never Reuse Grey Letters</h3>
                <p className="text-base leading-relaxed text-muted-foreground">Grey letters are hard evidence. They tell you with absolute certainty that a specific letter does not appear anywhere in the answer. Reusing a grey letter in a subsequent guess is simply wasting a turn. Before submitting any guess, quickly review your eliminated letters and ensure your word contains none of them. This discipline alone will meaningfully improve your average solve rate.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Move Yellow Letters</h3>
                <p className="text-base leading-relaxed text-muted-foreground">Yellow letters are in the word but in the wrong position. Your next guess should place that letter somewhere else in the word while maintaining any green letters in their confirmed positions. Players who repeat yellow letters in the same position are wasting turns. The yellow is telling you two things: the letter exists, and it is not there. Use both pieces of information.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Common Word Endings to Prioritise</h3>
                <p className="text-base leading-relaxed text-muted-foreground">Many Wordle answers follow predictable ending patterns. Knowing these patterns allows you to construct better guesses when you have partial information. Words ending in Y are extremely common in the Wordle list. Words ending in ER, ED, and LY appear regularly. Words ending in IGHT (light, night, might, fight, right, sight) form a dense cluster. When you have confirmed several letters, matching them to known common patterns can dramatically narrow your choices.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Common Five-Letter Word Patterns</h2>
            <div className="space-y-3">
              {commonPatterns.map(({ pattern, examples }) => (
                <div key={pattern} className="p-4 rounded-xl border border-border bg-card">
                  <p className="font-bold text-sm mb-1">{pattern}</p>
                  <p className="text-sm text-muted-foreground">{examples}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Hard Mode: Why You Should Play It</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Wordle's Hard Mode forces you to use every confirmed letter in every subsequent guess. In standard mode, if you know the word contains A in position two and R somewhere, you could guess any word you like, whether or not it uses A and R. In Hard Mode, every guess must incorporate all confirmed letters. This is more challenging and occasionally frustrating, but the benefits for vocabulary development are substantial.</p>
              <p>Hard Mode players are forced to think more carefully about what words are possible given the constraints. This develops the kind of systematic word knowledge that serves you in all word games, not just Wordle. You begin to internalise patterns of five-letter word construction, common letter combinations, and the constraints that English phonology places on word structure.</p>
              <p>A practical warning about Hard Mode: it is possible to get into situations where your remaining guesses are all members of a cluster of similar words that differ by only one letter. For example, if you have confirmed _IGHT, you might cycle through might, night, light, fight, sight, tight, and right across seven guesses, when only six are available. To avoid this trap, try to eliminate potential endings early by choosing guesses that distinguish between cluster members.</p>
              <p>The statistical evidence suggests Hard Mode players develop stronger Wordle intuition over time and perform meaningfully better in their third month of play than they did in their first. If you are playing Wordle to genuinely improve your vocabulary and word game skills, Hard Mode is the right choice.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How Vocabulary Knowledge Gives You an Edge</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Wordle rewards vocabulary breadth in a specific way. Players who know more five-letter words have more options available when constructing constraint-satisfying guesses. When you have confirmed three letters and eliminated six others, the player who knows forty valid five-letter words matching those constraints has far more strategic choices than the player who can only think of two.</p>
              <p>More subtly, strong vocabulary enables faster pattern recognition. Experienced language users immediately recognise common English letter combinations, typical word shapes, and frequent endings. This intuition, built from thousands of hours of reading and word exposure, accelerates the narrowing process that Wordle requires.</p>
              <p>LexigenZ's daily vocabulary practice directly improves Wordle performance by expanding your five-letter word knowledge and deepening your familiarity with English word structure. Players who engage with daily vocabulary learning consistently report improved Wordle solve rates over two to three months of practice.</p>
              <p>Beyond Wordle itself, the vocabulary skills developed through daily word practice transfer to all word games, professional communication, academic writing, and reading comprehension. Wordle is a useful diagnostic tool for vocabulary strength, but it is the daily practice behind it that builds lasting linguistic ability.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Build the Vocabulary That Wins at Wordle</h2>
          <p className="text-muted-foreground mb-6">One word per day with LexigenZ builds the five-letter word intuition that transforms your Wordle game.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Start Daily Practice</Button></Link>
        </div>
      </section>
    </div>
  );
}
