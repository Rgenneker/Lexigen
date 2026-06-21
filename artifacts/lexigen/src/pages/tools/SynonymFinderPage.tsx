import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function SynonymFinderPage() {
  usePageMeta({
    title: "Synonym Finder — Find the Right Word Every Time | LexigenZ",
    description: "Discover synonyms that actually fit your context. Learn why synonyms are never perfectly interchangeable, how register and nuance differ, and how to choose the right word every time.",
    canonical: "/synonym-finder",
    keywords: "synonym finder, find synonyms, word synonyms, synonyms for writing, vocabulary synonyms, english synonyms",
  });

  const synonymGroups = [
    { base: "happy", words: ["content", "pleased", "elated", "euphoric", "jubilant", "blissful", "gleeful", "overjoyed"], note: "Intensity increases left to right. 'Content' is quietly satisfied; 'euphoric' is intensely joyful." },
    { base: "angry", words: ["annoyed", "irritated", "frustrated", "furious", "incensed", "livid", "apoplectic", "irate"], note: "Escalating intensity. 'Annoyed' is mild; 'apoplectic' is extreme and physical." },
    { base: "small", words: ["tiny", "minute", "minuscule", "microscopic", "negligible", "insignificant", "petite", "slight"], note: "Dimensional vs abstract: 'petite' describes people positively; 'negligible' describes importance." },
    { base: "walk", words: ["stroll", "stride", "march", "trudge", "lumber", "saunter", "amble", "shuffle"], note: "Each implies different speed, purpose, and attitude. 'Saunter' is casual; 'trudge' is exhausted." },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500">Writing Tools</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Synonym Finder</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find synonyms that actually work in your context. Because good writing is not about replacing a word with any synonym — it is about finding the word that says precisely what you mean.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">What Are Synonyms and Why They Matter</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Synonyms are words that share a similar or related meaning. Happy and joyful are synonyms. Begin and commence are synonyms. Big and enormous are synonyms. However, a common and consequential misconception is that synonyms are interchangeable, that one can replace another without changing the meaning or effect of a sentence. This is almost never true.</p>
              <p>Every synonym has its own specific texture. It carries connotations, register implications, intensity levels, and contextual restrictions that distinguish it from every other word that shares its general meaning. Understanding these distinctions is what separates good writing from mediocre writing. A novice writer uses happy throughout an essay because it is safe. A skilled writer uses happy, content, elated, and overjoyed deliberately, choosing each based on the precise emotional shade required at that point in the text.</p>
              <p>The philosopher and mathematician Gottfried Leibniz argued that no two words are truly synonymous, because if they were identical in all respects including meaning, connotation, and usage, there would be no reason for both to exist in the language. While modern linguists debate the details of this claim, the practical insight is valuable: treat synonyms not as identical replacements but as related tools with different applications. Your job as a writer is to know enough synonyms to always reach for the right tool.</p>
              <p>Synonyms serve several specific functions in skilled writing. They allow you to avoid repetition without losing precision. They let you modulate intensity by moving up or down a scale of synonyms. They enable register adjustment, allowing you to shift the formality or emotionality of a passage. They provide rhythmic variety, as synonym choices affect the sound and flow of prose. All of these functions depend on knowing synonyms deeply, not merely knowing that they share a definition.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Register: The Most Important Synonym Distinction</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Register refers to the level of formality, technical complexity, and social context associated with a word. Every English word occupies a position on the register spectrum, from extremely informal and casual to highly formal and academic. Synonyms frequently share meaning but differ dramatically in register, and choosing a word with the wrong register is one of the most jarring errors a writer can make.</p>
              <p>Consider the verb to begin. In casual conversation you might say start, as in I started reading the book last night. In professional writing you might say begin, as in the project begins next quarter. In formal academic or legal writing you might use commence, as in the proceedings shall commence at nine o'clock. All three words mean roughly the same thing, but using commence in a text message to a friend would be strange, and using start in a legal contract would undermine the document's professional authority.</p>
              <p>The register distinction matters just as much for emotional words. Think about words that mean to die. Pass away is gentle and consoling, appropriate for sympathy messages and obituaries. Die is direct and neutral, appropriate for medical and factual contexts. Perish is slightly elevated and often used for tragic or dramatic deaths. Expire is bureaucratic and clinical. Croak is casual and even darkly humorous in the right context. Selecting the wrong register word in an emotionally sensitive context is not just stylistically clumsy, it can cause genuine offence.</p>
              <p>When looking for synonyms, always consider the register of your current context. Academic essays require Latinate vocabulary and formal registers. Business communication benefits from precise, direct vocabulary without either excessive formality or excessive casualness. Creative fiction should match the narrative voice, which might be high literary, conversational, or anything in between. Personal communication should match the relationship and emotional context of the interaction.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Synonym Groups With Nuance Notes</h2>
            <div className="space-y-4">
              {synonymGroups.map(({ base, words, note }) => (
                <div key={base} className="p-5 rounded-2xl border border-border bg-background">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-black text-lg capitalize text-primary">{base}</span>
                    <span className="text-xs text-muted-foreground">and its synonyms</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {words.map((w) => (
                      <span key={w} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">{w}</span>
                    ))}
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
            <h2 className="text-3xl font-black mb-6">Connotation: The Invisible Layer of Meaning</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Connotation refers to the emotional and associative meanings that a word carries beyond its literal definition. Two words can have the same denotative meaning, the dictionary definition, while carrying opposite connotations. Childlike and childish both describe behaviour similar to a child's, but childlike is warm and positive while childish is dismissive and critical. Slim and skinny both describe a thin physique, but slim is typically complimentary while skinny can be seen as negative or unhealthily thin.</p>
              <p>Understanding connotation is particularly important when writing about people, groups, or sensitive topics. Words that seem like neutral synonyms often carry strong positive or negative connotations that significantly affect how readers receive the information. A politician can be described as determined, stubborn, or inflexible, all of which convey a similar factual meaning but create completely different impressions of the person. The synonym you choose reveals your attitude toward the subject even when you believe you are being objective.</p>
              <p>Connotation also shifts over time and across communities. Words that were neutral a generation ago now carry heavy connotations, either positive or negative, that make them unsuitable in contexts where they were once standard. Staying attuned to how connotations evolve is part of being a sensitive and effective communicator. What your audience hears when they read a word is not only determined by the dictionary but by the cultural and social history the word has accumulated.</p>
              <p>When using a synonym finder, always consider both the denotative accuracy and the connotative fit of each alternative. A thesaurus gives you words that share a general meaning. Your job is to evaluate which of those words matches the emotional tone, register, and connotative baggage that your specific context requires. This evaluation is where vocabulary depth becomes essential. Knowing twenty synonyms for angry means nothing if you do not know how each one feels different to a reader.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How to Use Synonyms to Strengthen Your Writing</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Avoiding Repetition Without Losing Precision</h3>
                <p className="text-muted-foreground leading-relaxed">Repeating the same word in close proximity creates a monotonous reading experience and can make writing seem unsophisticated. However, using a synonym purely to avoid repetition, without checking that the synonym is equally precise, often makes the problem worse. The solution is to build a rich enough synonym vocabulary that you can alternate between closely related words while maintaining the exact meaning you intend. If no synonym is precise enough, repetition is preferable to imprecision.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Using Synonyms to Build Intensity</h3>
                <p className="text-muted-foreground leading-relaxed">Synonyms arranged on a scale of intensity give writers a powerful tool for building emotional momentum. Instead of saying someone was very angry and then very very angry, you can write that they were irritated, then frustrated, then furious, then incensed. Each synonym on the scale moves the reader incrementally upward, creating a sense of escalation that the same word repeated with intensifiers cannot achieve. This technique is particularly effective in narrative and persuasive writing.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Word-Finding vs Synonym-Finding</h3>
                <p className="text-muted-foreground leading-relaxed">Sometimes writers are not looking for a synonym at all. They are looking for the specific word that expresses a meaning they cannot yet name. This is not synonym-finding but word-finding: the process of articulating a precise concept that is hovering in your mind without a label. For this, browsing synonym groups by theme, exploring vocabulary lists in relevant domains, and reading widely in your subject area are more effective than consulting a thesaurus. Daily vocabulary practice with LexigenZ is specifically designed to expand the range of words available to you when you reach for the right one.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Browse Synonyms by Word</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {["happy", "sad", "angry", "smart", "fast", "slow", "big", "small", "beautiful", "strange", "important", "difficult"].map((w) => (
                <Link key={w} href={`/word/${w}/synonyms`}>
                  <div className="p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-sm font-medium text-center capitalize">
                    Synonyms for {w}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Build the Vocabulary That Finds the Right Word</h2>
          <p className="text-muted-foreground mb-6">The best synonym finder is a rich vocabulary. Daily practice with LexigenZ expands the words available to you when you need them most.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Start Daily Word Practice</Button></Link>
        </div>
      </section>
    </div>
  );
}
