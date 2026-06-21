import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function DictionaryPage() {
  usePageMeta({
    title: "English Dictionary — Words, Definitions, Etymology & More | LexigenZ",
    description: "Explore the English language with our complete dictionary guide. How to read dictionary entries, etymology, pronunciation, parts of speech, and how to use dictionary knowledge to build vocabulary.",
    canonical: "/dictionary",
    keywords: "english dictionary, word definitions, word etymology, dictionary guide, word meanings, dictionary lookup",
  });

  const partsOfSpeech = [
    { pos: "Noun", symbol: "n.", desc: "A person, place, thing, or idea. The name of something.", examples: "book, freedom, London, happiness, idea" },
    { pos: "Verb", symbol: "v.", desc: "An action, occurrence, or state of being.", examples: "run, think, become, exist, transform" },
    { pos: "Adjective", symbol: "adj.", desc: "A word that modifies or describes a noun or pronoun.", examples: "large, beautiful, impossible, ancient, vivid" },
    { pos: "Adverb", symbol: "adv.", desc: "A word that modifies a verb, adjective, or another adverb.", examples: "quickly, very, barely, nonetheless, rapidly" },
    { pos: "Preposition", symbol: "prep.", desc: "A word showing the relationship between a noun and another word.", examples: "in, on, at, beside, throughout, despite" },
    { pos: "Conjunction", symbol: "conj.", desc: "A word that connects clauses, sentences, or words.", examples: "and, but, or, although, however, therefore" },
    { pos: "Interjection", symbol: "interj.", desc: "An exclamation expressing emotion, not grammatically integrated.", examples: "ah, oh, wow, alas, bravo, indeed" },
    { pos: "Pronoun", symbol: "pron.", desc: "A word that stands in for a noun already mentioned.", examples: "he, she, they, it, who, which, that" },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-500">Language Reference</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">English Dictionary</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your complete English language reference. Understand how dictionaries work, how to read entries deeply, and how etymology transforms a definition lookup into lasting vocabulary.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How to Read a Dictionary Entry</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Most people use dictionaries as a one-sentence definition service: you look up a word, read its primary meaning, and close the tab. This approach wastes the majority of what a dictionary entry actually contains. A complete dictionary entry is a comprehensive portrait of a word, its history, its grammatical behaviour, its range of meanings, and its relationship to other words. Learning to read entries completely transforms a dictionary from a definition source into a vocabulary-building tool.</p>
              <p>The headword is the word itself, presented in bold at the start of the entry and typically given in its base form. Following the headword is the pronunciation guide, shown either in International Phonetic Alphabet notation or in a simplified phonetic respelling designed for the target audience. Learning to read the IPA, even at a basic level, allows you to correctly pronounce words you have never heard aloud, which is particularly valuable for literary and academic vocabulary encountered only in reading.</p>
              <p>The grammatical label follows the pronunciation guide. It tells you what part of speech the word belongs to: noun, verb, adjective, adverb, preposition, conjunction, or interjection. This label matters more than most readers recognise. A word can function as multiple parts of speech, with different meanings in each role. The verb form of run and the noun form of run share a spelling but have different grammatical roles and subtly different ranges of meaning. Many sophisticated vocabulary errors occur when people use words in the wrong grammatical role.</p>
              <p>Most dictionary entries contain multiple numbered definitions, ordered either by frequency of use or by historical sequence of development. Reading only the first definition misses the full semantic range of the word. A word like set has dozens of distinct definitions in its full entry. Even simpler words often have secondary meanings that are more precise or specialised than the primary definition and more useful in sophisticated writing.</p>
              <p>Usage examples provided in dictionary entries are invaluable but frequently skipped. These examples show you how the word actually appears in real sentence contexts, which is different from knowing its isolated meaning. Reading usage examples is the closest a dictionary can come to simulating the contextual vocabulary learning that produces the most durable retention.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Etymology: The History Inside Every Word</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Etymology is the study of word origins: where a word came from, how its meaning has changed over time, and what earlier forms of the word looked like in older versions of English and in the source languages from which English borrowed. Most modern dictionaries include etymological information, usually in brackets following the definitions, and this information is among the most valuable content in any entry.</p>
              <p>English is one of the world's most etymologically diverse languages. It drew from Old English and Norse for its core domestic vocabulary, from French and Latin after the Norman Conquest for legal, governmental, and cultural vocabulary, from classical Latin and Greek for scientific and academic vocabulary, and from dozens of other languages including Arabic, Portuguese, Dutch, and Nahuatl for words in specific domains. This diversity means that understanding English etymology requires some familiarity with multiple source languages, but even surface-level knowledge produces significant vocabulary benefits.</p>
              <p>Consider the word sincere, which most people understand to mean genuine or honest. Its etymology is disputed but one compelling account traces it to the Latin sine cera, meaning without wax. Roman sculptors allegedly used wax to fill cracks in imperfect marble, and a piece guaranteed sine cera meant without deceptive filling. Whether this etymology is historically accurate, it creates a rich memory anchor for the word's meaning that a bare definition does not provide.</p>
              <p>Knowing that the root BENE means well in Latin explains benevolent meaning well-wishing, benefit meaning something that does well, benign meaning kindly, and beneficial meaning producing good results. Knowing that the root MAL means bad explains malevolent, malicious, malfunction, malnutrition, and malpractice. These etymological roots function as master keys that unlock entire families of words simultaneously, which is why the most efficient vocabulary learners prioritise root word knowledge alongside individual word learning.</p>
              <p>The etymological information in a dictionary entry also helps with spelling. Words that look like they should be spelled differently often make perfect sense once their origin is known. The silent K in knight reflects an Old English pronunciation where the K was once spoken. The PH representing the F sound in photograph and phonics comes from the Greek letter phi, which was rendered as PH when Greek words were transliterated into the Latin alphabet. Etymology does not just explain meaning. It explains structure.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Parts of Speech Explained</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {partsOfSpeech.map(({ pos, symbol, desc, examples }) => (
                <div key={pos} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-black">{pos}</span>
                    <span className="text-xs bg-teal-500/10 text-teal-600 border border-teal-400/30 px-2 py-0.5 rounded-full font-mono">{symbol}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{desc}</p>
                  <p className="text-xs text-muted-foreground italic">{examples}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Descriptive vs Prescriptive Dictionaries</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>An important distinction in understanding how dictionaries work is the difference between descriptive and prescriptive approaches to language documentation. A prescriptive dictionary attempts to establish rules for correct language use, prescribing how words should be used. A descriptive dictionary attempts to document how words are actually used by speakers and writers, describing language as it exists rather than as someone believes it should be.</p>
              <p>Most modern major dictionaries, including Merriam-Webster, Oxford, and Collins, are descriptive. They add new words when evidence shows those words are widely used, they update definitions when a word's meaning shifts in actual usage, and they note informal or slang usage alongside formal definitions. This approach reflects the reality that living languages change constantly and no external authority can successfully freeze a language in a particular form.</p>
              <p>Prescriptive approaches still exist in style guides, which are reference works that establish editorial standards for specific publications or organisations. The Oxford Style Guide, the Chicago Manual of Style, the AP Stylebook, and similar publications make prescriptive recommendations about usage, punctuation, and capitalisation. These recommendations are important for professional writing contexts where consistency and authority matter, but they represent style preferences rather than absolute linguistic rules.</p>
              <p>Understanding this distinction helps you use dictionaries more intelligently. When a dictionary labels a word informal, it is not telling you the word is wrong. It is telling you that the word is typically used in casual rather than formal contexts. When a dictionary lists multiple definitions for a word that includes colloquial usages that differ from the traditional meaning, it is documenting real usage patterns, not endorsing every usage as equally appropriate in every context. The dictionary describes; the writer decides.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Pronunciation and the IPA</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>The International Phonetic Alphabet, universally abbreviated as IPA, is a system of phonetic notation designed to represent every sound used in human language. It was developed in the late nineteenth century by the International Phonetic Association and has been refined continuously since. Linguists, language teachers, speech therapists, and dictionary editors use the IPA to record pronunciations with greater precision than any spelling-based system allows.</p>
              <p>Major dictionaries include IPA pronunciation guides for every entry. The symbols may look intimidating at first, but learning even the most common ones provides immediate practical benefit. The schwa symbol, which looks like an upside-down e, represents the unstressed vowel sound in the first syllable of about, the second syllable of button, and dozens of other common English words. The distinction between long and short vowel representations in IPA explains why live the verb sounds different from live the adjective, and why read the present tense sounds different from read the past tense.</p>
              <p>For vocabulary learners, knowing how to read IPA prevents the common problem of learning a word's spelling and meaning from text while mispronouncing it for years because you never heard it spoken. This mispronunciation problem is particularly acute for academic and literary vocabulary, which readers often encounter in text long before they hear it in conversation. Learning the IPA is a one-time investment that pays dividends across every word you subsequently look up.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Look Up Any Word</h2>
            <p className="text-muted-foreground mb-6">Search for any English word to see its definition, pronunciation, synonyms, antonyms, and etymology.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {["ephemeral", "perspicacious", "sanguine", "loquacious", "serendipity", "melancholy", "resilient", "tenacious", "equanimity", "magnanimous", "pragmatic", "eloquent"].map((word) => (
                <Link key={word} href={`/word/${word}`}>
                  <div className="p-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-sm font-medium text-center">{word}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Learn Words With Full Dictionary Depth</h2>
          <p className="text-muted-foreground mb-6">LexigenZ delivers one word per day with definition, etymology, pronunciation, and sentence practice. The dictionary, made into a daily habit.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Get Your Daily Word</Button></Link>
        </div>
      </section>
    </div>
  );
}
