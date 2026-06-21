import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function SpellingBeeWordsPage() {
  usePageMeta({
    title: "Spelling Bee Words — Complete Guide to Spelling Competitions | LexigenZ",
    description: "Master spelling bees with our complete guide. How to prepare, word roots to study, competition strategies, common bee words, and the vocabulary habits that produce champions.",
    canonical: "/spelling-bee-words",
    keywords: "spelling bee words, spelling bee preparation, spelling competition, how to win spelling bee, spelling bee strategy, spelling bee vocabulary",
  });

  const wordRoots = [
    { root: "ANTHROPO", meaning: "human", examples: "anthropology, philanthropist, misanthrope" },
    { root: "CARDI", meaning: "heart", examples: "cardiac, cardiology, cardiovascular, pericardium" },
    { root: "CHRON", meaning: "time", examples: "chronology, anachronism, synchronise, chronological" },
    { root: "DERM", meaning: "skin", examples: "epidermis, dermatology, hypodermic, taxidermy" },
    { root: "GRAPH", meaning: "write", examples: "autograph, biography, typography, stenography" },
    { root: "LOGY", meaning: "study of", examples: "biology, psychology, sociology, etymology" },
    { root: "MORPH", meaning: "shape", examples: "morphology, metamorphosis, amorphous, dimorphic" },
    { root: "PHON", meaning: "sound", examples: "phonics, euphony, cacophony, microphone" },
    { root: "PSYCH", meaning: "mind", examples: "psychology, psyche, psychosis, psychiatry" },
    { root: "SCRIB/SCRIPT", meaning: "write", examples: "describe, manuscript, subscription, prescribe" },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Spelling</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Spelling Bee Words</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to understand, prepare for, and succeed in spelling competitions. From beginner bee vocabulary to championship-level preparation strategy.
            </p>
            <div className="text-4xl mb-4">🐝</div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">What Is a Spelling Bee</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>A spelling bee is a competition in which participants are asked to spell words aloud, one at a time, with elimination occurring when a word is misspelled. The last remaining competitor wins. The format traces its origins to early American communities in the eighteenth century, where public spelling events served both as education and entertainment. The word bee in this context comes from an old English dialect term for a community gathering, similar to a quilting bee or husking bee.</p>
              <p>The Scripps National Spelling Bee, founded in 1925 in the United States, is the most famous spelling competition in the world. It draws contestants who have won regional and school-level competitions from across the country, culminating in a nationally televised championship where competitors spell some of the most obscure and difficult words in the English language. Words like koinonia, marocain, scherenschnitte, and knaidel have appeared in recent championship rounds.</p>
              <p>Spelling bees exist in various formats beyond the traditional stand-at-a-microphone competition. Group spelling bees allow teams to collaborate. Written spelling bees test on paper rather than aloud. Speed spelling bees add time pressure. Online spelling bees have become increasingly common, allowing competitors from anywhere to participate without travel. The core skill being tested, the ability to spell words correctly from memory, remains consistent across all formats.</p>
              <p>What makes spelling bees valuable beyond the competition itself is the preparation process. Preparing seriously for a spelling bee develops etymological knowledge, phonetic awareness, pattern recognition, and a deep vocabulary that extends far beyond the word lists studied. The vocabulary built during spelling bee preparation typically places competitors two to three grade levels above their peers on standardised vocabulary assessments.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How to Prepare for a Spelling Bee</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Start With the Official Word List</h3>
                <p className="text-muted-foreground leading-relaxed">Most competitions provide or reference an official word list. The Scripps Spelling Bee publishes its School Spelling Bee Study List, which is an excellent starting point for any competitor regardless of the specific competition they are entering. Work through this list systematically, spending enough time on each word to understand its pronunciation, language of origin, and meaning in addition to its spelling. Words you understand are far more reliably spelled than words you have only memorised phonetically.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Study Language of Origin First</h3>
                <p className="text-muted-foreground leading-relaxed">The most important single skill in advanced spelling is language of origin identification. English has borrowed words from dozens of languages, and each source language has predictable spelling patterns. Words from Latin tend to have specific prefixes, suffixes, and vowel patterns. Words from French often retain silent consonants and accent-related spellings that look inconsistent in English context. Greek-origin words follow Greek phonology, which includes letter combinations like PH for the F sound, TH for the theta sound, and CH for the K sound. German-origin words often retain German consonant clusters. When you know a word's origin, you can predict its spelling from phonological rules rather than memorising each word individually.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Learn Root Words as Multipliers</h3>
                <p className="text-muted-foreground leading-relaxed">Every root word you master unlocks an entire family of words. Knowing that the Greek root HYDRO means water helps you spell hydrology, dehydration, hydroelectric, hydraulic, and hydrotherapy correctly without memorising each separately. Knowing that the Latin root FRACT means break helps with fracture, infraction, refraction, and diffraction. Roots are the highest-leverage vocabulary investment available to spelling bee competitors.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Use Competition Strategies During Practice</h3>
                <p className="text-muted-foreground leading-relaxed">In a real spelling bee, you are allowed to ask for the definition, language of origin, part of speech, and use in a sentence. You can also ask the pronouncer to repeat the word. Practising with these tools is essential. Train yourself to always ask for language of origin, as this often determines the spelling pattern. Practise asking for the definition even when you know it, because hearing the word used in a sentence can confirm which word is being asked and prevent errors caused by mishearing.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-4">Essential Word Roots for Spelling Bee Preparation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wordRoots.map(({ root, meaning, examples }) => (
                <div key={root} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-black font-mono">{root}</span>
                    <span className="text-xs bg-amber-500/10 text-amber-600 border border-amber-400/30 px-2 py-0.5 rounded-full">{meaning}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{examples}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Tricky Spelling Patterns Worth Memorising</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>English spelling is notoriously inconsistent, but there are patterns within the inconsistency that experienced spellers learn to recognise. Knowing these patterns reduces the number of words you need to treat as pure memory items and instead allows you to reason from rules.</p>
              <p>Words with silent letters are a common source of errors. Silent K appears in words of Old English origin where the K was once pronounced: knave, knight, kneel, know, knot, knock. Silent P appears in Greek-origin words: pneumonia, psychology, pterodactyl, psyche. Silent B appears after M: bomb, comb, climb, thumb, dumb, numb. Silent G appears before N: gnaw, gnome, sign, design, campaign, champagne.</p>
              <p>The IE and EI distinction trips up even experienced writers. The traditional rule, I before E except after C, works for most common words: believe, achieve, piece, receive, deceive, perceive. However, numerous exceptions exist: weird, seize, neither, leisure, height, foreign, sovereign. These exceptions are best memorised as a specific list rather than trusted to the general rule.</p>
              <p>Doubled consonants follow patterns related to word stress and syllable structure. The consonant doubles when a short vowel sound is followed by the consonant at the end of a stressed syllable: running, stopped, bigger, beginning. The consonant does not double when the vowel sound is long or when the stress falls elsewhere: hoping, opened, preference. This rule explains why running has double N while hoping has only one P.</p>
              <p>Words ending in the sound -shun can be spelled multiple ways. The ending -tion is most common: station, action, location. The ending -sion appears after certain consonants: mansion, tension, version. The ending -cian appears for people: musician, physician, technician. The ending -xion appears in a few words: complexion, flexion. Knowing which to use requires either memorisation or recognising the base word from which the -shun word derives.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Competition Day Strategy</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>On competition day, your strategy needs to account for both the linguistic and psychological dimensions of performance. Spelling bees are high-stakes public performances where stress management is as important as vocabulary knowledge. Many competitors who know how to spell a word under normal conditions misspell it under pressure. Preparation for the psychological challenge is as important as preparation for the linguistic one.</p>
              <p>Before you begin spelling, always gather all available information. Ask for the language of origin, the definition, the part of speech, and a use in a sentence. This delays the moment when you must commit to a spelling and gives you additional information that might confirm or alter your initial instinct. It also gives you time to calm your nerves before beginning.</p>
              <p>When you begin spelling, speak at a deliberate, measured pace. Many errors in competition occur when competitors rush through letters they know well and stumble at the difficult section they were dreading. Spelling too quickly also reduces your ability to hear yourself and catch errors as you go. If you hear yourself say a wrong letter, you may ask to start over in most competitions.</p>
              <p>Visualise the word before you spell it. Experienced competitors have a clear mental image of the word's written form, not just a phonetic sequence. If you cannot form a clear mental image of the word's spelling, this is a signal that you need to reason more carefully from language of origin and root word knowledge rather than trusting memory alone.</p>
              <p>After competing, always review the words you misspelled or were uncertain about. Every competition is a vocabulary lesson. The words that challenged you are the exact words worth prioritising in future study. Champions do not merely repeat the words they already know. They aggressively pursue the words at the edge of their knowledge.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Build a Championship Vocabulary</h2>
          <p className="text-muted-foreground mb-6">LexigenZ delivers daily vocabulary with full etymology — exactly the depth that spelling bee preparation requires.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Start Your Daily Practice</Button></Link>
        </div>
      </section>
    </div>
  );
}
