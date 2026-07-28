import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function CrosswordWordsPage() {
  usePageMeta({
    title: "Crossword Solver - Complete Guide to Crossword Puzzles | LexigenZ",
    description: "Master crossword puzzles with our complete guide. Solving strategies, common crossword fill words, clue reading techniques, themed puzzle tips, and the vocabulary that wins every grid.",
    canonical: "/crossword-words",
    keywords: "crossword solver, crossword words, crossword clue help, crossword strategy, crossword fill words, how to solve crosswords",
  });

  const fillWords = ["EPEE", "ALOE", "OBOE", "ARIA", "ALEE", "OLEO", "ERNE", "ESNE", "ETUI", "EWER", "NARC", "SMEW", "TSAR", "STOA", "AGEE", "ALAE", "OAST", "ERST", "EIRE", "SNEE", "ORLE", "ESNE", "EDDO", "ADZE", "ABRI", "ANKH", "SPAE", "OTIC", "ENOL", "TOPI"];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Word Puzzles</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Crossword Solver</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your complete guide to solving crossword puzzles at every level. Strategies, fill words, clue conventions, and the vocabulary habits that make you a better solver every day.
            </p>
            <div className="text-4xl">✏️</div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How Crossword Puzzles Work</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>A crossword puzzle is a word game played on a square or rectangular grid of white and black squares. The goal is to fill all white squares with letters that form words reading both horizontally, called across answers, and vertically, called down answers. Each answer is clued by a numbered entry in the puzzle's clue list, with across and down clues listed separately.</p>
              <p>The grid is symmetrically designed, meaning it appears identical when rotated 180 degrees. Black squares divide the grid into answer spaces. The standard American crossword grid is 15x15 squares for daily puzzles and 21x21 or larger for Sunday editions. British-style crosswords and cryptic crosswords use different grid conventions.</p>
              <p>American crossword puzzles are constructed around a theme, a set of long answers that share a common thread. The theme answers are typically the longest entries in the puzzle and are positioned symmetrically in the grid. Identifying the theme early in solving is one of the most powerful strategies available, as it allows you to predict what the other long answers might be before you have enough crossing letters to deduce them independently.</p>
              <p>Each clue corresponds to exactly one correct answer of a specific length indicated by the numbered grid space. Clues and answers must match grammatically: a clue using a plural noun requires a plural answer, a clue in past tense requires a past tense answer, and a clue using an abbreviation suggests the answer is also abbreviated. These grammatical agreements are not accidents. Crossword constructors are required to maintain them, and solvers can rely on them as constant guides.</p>
              <p>The difficulty of crossword puzzles follows a predictable weekly pattern in most major publications. The New York Times crossword, which is the benchmark for American puzzles, increases in difficulty across the week. Monday puzzles are designed for beginners with straightforward clues and accessible vocabulary. Tuesday puzzles add modest complexity. The difficulty escalates daily through Saturday, which is the most challenging weekday puzzle. Sunday puzzles are larger but intentionally constructed at a medium difficulty level comparable to Thursday or Friday, partly because of the broader audience on weekends.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Reading Crossword Clues Correctly</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">The Question Mark Signal</h3>
                <p className="text-muted-foreground leading-relaxed">When a clue ends with a question mark, wordplay is involved. The question mark signals that the clue is using language creatively, typically through pun, double meaning, misdirection, or lateral thinking. The literal reading of the clue is not the path to the answer. For example, a clue like "Flower in a bank?" with a question mark does not refer to a plant. The question mark signals that flower here means something that flows, making the answer a river. The question mark is one of the most important signals in the crossword clue vocabulary.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Grammatical Agreement Is Always Exact</h3>
                <p className="text-muted-foreground leading-relaxed">Every clue must agree grammatically with its answer. If the clue is a noun, the answer is a noun. If the clue is a plural, the answer is plural. If the clue uses past tense, the answer is past tense. This rule is absolute in well-constructed crosswords. Use it actively: when you are deciding between two possible answers, grammar alone can rule one out. A clue that reads "Goes quickly" requires a verb form that can describe present action, eliminating past tense or noun form options.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Abbreviations Signal Abbreviations</h3>
                <p className="text-muted-foreground leading-relaxed">Constructors must indicate when an answer is abbreviated. This is typically done by including an abbreviation in the clue. A clue like "Dr.'s colleague" suggests the answer might be abbreviated, like RN or MD. Clues with state names might abbreviate, giving two-letter postal codes. Military rank clues often abbreviate. Recognising this convention prevents you from wasting time trying to fit a full word into a space that requires only an abbreviation.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Fill-in-the-Blank Clues</h3>
                <p className="text-muted-foreground leading-relaxed">Fill-in-the-blank clues, formatted as "___ and cheese" or "Once in a ___ moon", are among the easiest clue types. The answer is simply the word or phrase that completes the familiar phrase or saying. These clues are frequently used to anchor beginners in Monday and Tuesday puzzles. If you are struggling with a puzzle, fill-in-the-blank clues are a reliable source of confirmed letters to start your crossing-answer work.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Cross-Referenced Clues</h3>
                <p className="text-muted-foreground leading-relaxed">Sometimes clues reference other clue numbers directly, as in "With 47-Across, tropical destination." This indicates that the answer to this clue and the answer to 47-Across together form a compound phrase or complete idea. When you see cross-referenced clues, solve them together rather than separately. Getting one piece confirms letters that help you complete the other.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Common Crossword Fill Words Worth Memorising</h2>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">Certain words appear repeatedly in crosswords because their unusual letter combinations fill difficult grid spaces. These are not common everyday words, but knowing them removes significant friction from solving. Encountering "fencing sword" in a crossword clue is immediately solvable if you know EPEE.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {fillWords.map((w) => (
                <span key={w} className="px-3 py-1.5 rounded-lg bg-background border border-border font-mono font-bold text-sm">{w}</span>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { word: "EPEE", clue: "Fencing sword with a flexible blade" },
                { word: "ALOE", clue: "Succulent plant used in skin care" },
                { word: "ARIA", clue: "Solo piece in an opera" },
                { word: "ERNE", clue: "Eagle, especially the white-tailed eagle" },
                { word: "ETUI", clue: "Small ornamental case for needles or tools" },
                { word: "STOA", clue: "Ancient Greek covered walkway with columns" },
                { word: "OAST", clue: "Kiln used for drying hops or malt" },
                { word: "SMEW", clue: "Small diving duck of northern Europe" },
              ].map(({ word, clue }) => (
                <div key={word} className="p-3 rounded-xl border border-border bg-background flex gap-3 items-start">
                  <span className="font-black font-mono text-primary w-16 flex-shrink-0">{word}</span>
                  <span className="text-sm text-muted-foreground">{clue}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Proven Solving Strategies at Every Level</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>The first principle of effective crossword solving is to work from confidence, not from order. Beginners often start at 1-Across and work through the clues in sequence. Experienced solvers scan the entire clue list first, noting every clue they can answer immediately with complete confidence. Each confirmed answer provides crossing letters that make adjacent clues easier. One confident answer in the right position can unlock five or six crossing entries.</p>
              <p>Work both across and down simultaneously. After filling in confirmed answers, examine the crossing entries. Even if you cannot solve a down clue directly, confirmed letters from across answers may narrow the possibilities enough to deduce it. The process is one of progressive narrowing: each confirmed letter reduces the set of possible answers for every crossing entry that contains it.</p>
              <p>Theme answers are your most powerful tool in themed puzzles. Most crossword themes have names, and understanding the pattern of the theme often lets you fill in multiple long answers before you have enough crossing letters to confirm them independently. If you deduce that the theme is song titles containing the name of a colour, you can start generating candidates for all the theme answers simultaneously rather than solving each in isolation.</p>
              <p>When stuck on a clue, try approaching it from a completely different angle. Ask yourself: what part of speech does the answer need to be? Is it a proper noun? Could it be an abbreviation? Does it have a double meaning? Is the word in the clue being used in an unusual sense? Crossword constructors are masters of misdirection, and the most devious clues achieve their effect by leading you to think about the clue in the wrong category entirely.</p>
              <p>Progress through difficulty levels deliberately. Finishing Monday New York Times crosswords consistently is more valuable for skill development than struggling through Saturday puzzles and leaving them incomplete. Completing puzzles builds pattern recognition and reinforces the fill words and conventions that appear repeatedly. Partial completion of hard puzzles does build some skill but at a slower rate than completing easier ones consistently.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Building the Vocabulary That Solves Crosswords</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Crossword vocabulary is a specific dialect of English. It includes words from opera, ancient history, classical mythology, ornithology, heraldry, and other specialised domains that appear in crosswords with far greater frequency than in everyday life. Building this vocabulary requires reading broadly across subjects and deliberately paying attention to words that feel unusual or specialised.</p>
              <p>Beyond specialised fill words, crossword solving rewards a strong general vocabulary. Every unfamiliar word in a clue is an opportunity to slow down and lose confidence. Every word in the grid that you can confirm immediately is a letter bank for solving crossing entries. Strong vocabulary is not just about knowing the answers directly. It is about having enough linguistic confidence to work through ambiguous clues and partial letter patterns without anxiety.</p>
              <p>Reading quality journalism, literary fiction, and non-fiction narrative builds exactly the kind of broad, contextual vocabulary that crossword solving rewards. The Economist's vocabulary, The New Yorker's cultural references, historical non-fiction's specialised terminology, and literary fiction's precise word choices all appear in crosswords regularly. A daily reading habit is one of the most effective long-term crossword training programmes available.</p>
              <p>Daily vocabulary practice with LexigenZ complements crossword training by systematically building vocabulary with full etymological context. Words learned with etymology are easier to recognise in crossword clues that reference a word's origin or historical meaning. The pattern recognition skills developed through daily word learning also transfer directly to clue interpretation and fill word recognition.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Grow the Vocabulary That Fills Every Grid</h2>
          <p className="text-muted-foreground mb-6">Daily vocabulary with etymology builds the crossword-solving intuition that makes every puzzle more solvable.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Build Your Vocabulary Daily</Button></Link>
        </div>
      </section>
    </div>
  );
}
