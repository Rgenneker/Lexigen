import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function AnagramSolverPage() {
  usePageMeta({
    title: "Anagram Solver — Find Anagrams, Solve Word Puzzles | LexigenZ",
    description: "Complete guide to anagrams. What anagrams are, how to solve them mentally, famous anagrams, anagram games, and strategies for finding anagrams quickly without a tool.",
    canonical: "/anagram-solver",
    keywords: "anagram solver, find anagrams, word anagrams, anagram games, solve anagram, anagram puzzles",
  });

  const famousAnagrams = [
    { word: "LISTEN", anagram: "SILENT", note: "One of the most famous word anagram pairs in English" },
    { word: "ASTRONOMER", anagram: "MOON STARER", note: "Astronomers study the moon — the anagram reflects this" },
    { word: "CONVERSATION", anagram: "VOICES RANT ON", note: "A remarkably apt description of most conversations" },
    { word: "DORMITORY", anagram: "DIRTY ROOM", note: "Perhaps uncomfortably accurate for student living" },
    { word: "SCHOOL MASTER", anagram: "THE CLASSROOM", note: "Exactly where you would find a school master" },
    { word: "DESPERATION", anagram: "A ROPE ENDS IT", note: "Dark but undeniably clever" },
    { word: "ELECTION RESULTS", anagram: "LIES, LETS RECOUNT", note: "Politically provocative and perfectly formed" },
    { word: "THE MORSE CODE", anagram: "HERE COME DOTS", note: "A self-referential anagram about communication" },
  ];

  const anagramGames = [
    { name: "Wordscapes", desc: "Mobile puzzle game where you form words from letter wheels to fill a crossword grid. Anagram solving is the core skill." },
    { name: "Scrabble", desc: "The classic board game where anagram recognition lets you rapidly identify all valid words from your rack." },
    { name: "Words With Friends", desc: "Mobile Scrabble-style game where anagram solving gives you a decisive advantage in finding optimal plays." },
    { name: "Word Cookies", desc: "Game where you swipe letter bubbles to form words. Speed and anagram intuition determine performance." },
    { name: "Anagrammer", desc: "Dedicated online anagram solving tool for competitive word game players." },
    { name: "NYT Spelling Bee", desc: "Daily puzzle requiring you to find words using a specific set of letters, with one required centre letter." },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Word Puzzles</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Anagram Solver</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to know about anagrams. How to solve them, famous examples, the games that use them, and strategies that work without needing a solver tool.
            </p>
            <div className="text-4xl mb-4">🔤</div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">What Is an Anagram</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>An anagram is a word or phrase formed by rearranging all the letters of another word or phrase, using each letter exactly once. The word anagram itself comes from the Greek ana, meaning back or again, and gramma, meaning letter. So an anagram is literally letters rearranged. The practice of creating anagrams has a long history, dating back at least to ancient Greece, where anagrams were often treated as having mystical significance because they revealed hidden meanings within names and words.</p>
              <p>The simplest anagrams are single-word pairs: LISTEN becomes SILENT, EARTH becomes HEART, TRIANGLE becomes ALERTING or RELATING. More complex anagrams rearrange entire phrases, sometimes to remarkable effect. The best anagrams are ones where the rearrangement creates a meaning that relates to or comments on the original, a quality called aptness that anagram enthusiasts prize highly.</p>
              <p>Anagrams have appeared throughout literary and intellectual history as a form of wordplay, puzzle, and sometimes as coded communication. Medieval scholars created anagrams of names to divine hidden truths. Renaissance writers used anagrams as a form of literary sport. Cryptic crossword setters use anagram clues as one of their most frequently employed techniques. Computer scientists study anagram detection as an introduction to combinatorics and algorithm design. The humble anagram sits at the intersection of language, mathematics, and puzzle-solving.</p>
              <p>Today, anagrams are used primarily in word games and puzzles, though they also appear in naming contexts, where companies, books, and characters are sometimes named with anagrammatic relationships to other words for reasons of cleverness or obscured meaning. Recognising these embedded anagrams adds an extra layer of meaning and appreciation to the text or brand that contains them.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How to Solve Anagrams Mentally</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Start With Uncommon Letters</h3>
                <p className="text-muted-foreground leading-relaxed">When you look at a set of scrambled letters, your eye should go first to the least common letters: J, Q, X, Z, V, K, W, Y. These letters have fewer positions where they can naturally sit in English words, which means they provide the strongest constraints. If you have a Z in your letter set, you know the answer contains Z, and you know it is likely near the beginning or end of the answer word. Use uncommon letters as anchors around which to construct possible words.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Identify Common Endings First</h3>
                <p className="text-muted-foreground leading-relaxed">Look for letter combinations that commonly end English words: -ING, -ED, -ER, -EST, -LY, -TION, -NESS, -MENT, -FUL, -LESS. If your scrambled set contains I, N, and G, the answer might end in -ING. If it contains E and D, it might end in -ED. Identifying the probable ending narrows the search space dramatically by fixing several letters in their correct position and leaving only the beginning to figure out.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Look for Common Beginnings</h3>
                <p className="text-muted-foreground leading-relaxed">After considering endings, look for common word beginnings: UN-, RE-, IN-, DIS-, PRE-, CON-, COM-, EX-, OUT-. These prefixes are extremely common in English and if your letter set contains them, the answer might begin with them. Combining a likely ending with a likely beginning and then fitting the remaining letters into the middle is often the fastest path to a solution.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Rearrange on Paper or in Your Mind</h3>
                <p className="text-muted-foreground leading-relaxed">For longer anagrams, physically rearranging the letters helps. Write each letter on a separate index card and move them around. Many solvers find that writing the letters in a circle rather than a straight line helps their eye find new combinations that reading left to right misses. Mentally, try grouping letters into pairs and triplets that commonly go together, then see whether the remaining letters form a beginning or ending.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Consider the Context</h3>
                <p className="text-muted-foreground leading-relaxed">When anagrams appear in puzzles, they are almost always clued in some way. A crossword anagram clue uses words like scrambled, mixed up, confused, or rearranged as signals. A word game context limits possibilities to words of specific lengths. A thematic puzzle hints at the category of the answer. Always use contextual clues to narrow the solution space before attempting to solve the anagram by brute-force letter rearrangement.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Famous Anagrams</h2>
            <div className="space-y-3">
              {famousAnagrams.map(({ word, anagram, note }) => (
                <div key={word} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-black font-mono text-primary">{word}</span>
                    <span className="text-muted-foreground text-sm">rearranges to</span>
                    <span className="font-black font-mono">{anagram}</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Anagram Clues in Cryptic Crosswords</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Cryptic crosswords are a British tradition that use a specific set of clue types, and anagram clues are among the most frequently used. In a cryptic crossword, every clue has two parts: a definition and a wordplay element. In anagram clues, the wordplay element is the anagram, and the clue always contains an indicator word that signals to the solver that an anagram is involved.</p>
              <p>Common anagram indicator words include: confused, scrambled, jumbled, rearranged, mixed, upset, broken, strange, weird, wild, drunk, excited, transformed, about, around, altered, changed, disordered, and many others. Any word in the clue that suggests disorder, movement, transformation, or intoxication is a potential anagram indicator. The letters to be anagrammed are always adjacent to the indicator in the clue.</p>
              <p>A sample cryptic anagram clue might read: "Confused Britons in chaos (7)." The word confused signals an anagram, the letters to anagram are BRITONS minus one letter plus IN, or alternatively the full word RINOTSB anagrammed to give the answer. NOSTRIB? No. Try BRITONS rearranged: RIBSTON? No. The answer might be using IN and CHATOS... actually working through this demonstrates exactly the iterative process of cryptic anagram solving. The answer is RIBSTON, a type of apple, but the solving process requires patience and systematic letter rearrangement.</p>
              <p>Learning to recognise anagram indicators in cryptic crosswords is a skill that develops with practice. Experienced cryptic solvers can scan a clue immediately and identify whether an anagram is involved, which narrows the solving process dramatically. If you enjoy cryptic crosswords, studying anagram indicator words is one of the highest-value study investments available.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Games That Use Anagram Solving</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {anagramGames.map(({ name, desc }) => (
                <div key={name} className="p-5 rounded-2xl border border-border bg-background">
                  <h3 className="font-bold mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Building Your Anagram Solving Intuition</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Anagram solving is a trainable skill. The fundamental competency is word recognition speed, the ability to see a valid word in a set of letters quickly without needing to check every permutation. This speed is built through vocabulary breadth: the more words you know, the more patterns you can recognise in a scrambled letter set without conscious deliberate calculation.</p>
              <p>Expert Scrabble and word game players who excel at anagram solving are not necessarily faster at permutation calculation than beginners. They simply have more words stored in memory that they can match against the patterns they see. When a player with a 40,000-word vocabulary looks at a rack of seven letters, they can draw on a vastly larger set of potential matches than a player with 8,000 words. The apparent speed advantage of the expert is largely a vocabulary advantage.</p>
              <p>Deliberate practice for anagram solving includes working through daily anagram puzzles, playing word games like Scrabble regularly, and most fundamentally, building your vocabulary continuously through reading and systematic word learning. Each new word you genuinely learn, in the sense of being able to produce and recognise it readily, adds another potential match to your mental anagram solver.</p>
              <p>Letter frequency awareness also accelerates anagram solving. Knowing that E, T, A, O, I, N, S, H, R are the nine most common letters in English means that when you see these letters scrambled, you should be thinking of common words. Unusual letters like Z, Q, X, and J in a scramble narrow the search immediately because so few common English words contain them. Building an intuitive sense of which letter combinations are common and which are rare is part of developing into a strong anagram solver.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">The Best Anagram Solver Is Your Vocabulary</h2>
          <p className="text-muted-foreground mb-6">Daily vocabulary practice with LexigenZ builds the word recognition that makes anagram solving faster and more intuitive every month.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Start Building Your Word Memory</Button></Link>
        </div>
      </section>
    </div>
  );
}
