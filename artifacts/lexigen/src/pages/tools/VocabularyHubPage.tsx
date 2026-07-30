import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Star, TrendingUp, Users, Zap, RefreshCw, X, Loader2 } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { UNIQUE_WORDS } from "@/data/word-list";

const CATEGORIES = [
  { id: "a", label: "Words starting with A", filter: (w: string) => w.toLowerCase().startsWith("a") },
  { id: "b", label: "Words starting with B", filter: (w: string) => w.toLowerCase().startsWith("b") },
  { id: "tion", label: "Words ending in -tion", filter: (w: string) => w.toLowerCase().endsWith("tion") },
  { id: "ness", label: "Words ending in -ness", filter: (w: string) => w.toLowerCase().endsWith("ness") },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

interface DictDefinition {
  partOfSpeech: string;
  definition: string;
}

function pickRandom(pool: string[], n: number): string[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function BrowseByCategorySection() {
  const [activeId, setActiveId] = useState<CategoryId | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [definition, setDefinition] = useState<DictDefinition[] | null>(null);
  const [defLoading, setDefLoading] = useState(false);
  const [defError, setDefError] = useState(false);

  const loadCategory = useCallback((id: CategoryId) => {
    const cat = CATEGORIES.find((c) => c.id === id)!;
    const pool = UNIQUE_WORDS.filter(cat.filter);
    setWords(pickRandom(pool, 15));
    setActiveId(id);
    setSelectedWord(null);
    setDefinition(null);
    setDefError(false);
  }, []);

  const refresh = useCallback(() => {
    if (!activeId) return;
    const cat = CATEGORIES.find((c) => c.id === activeId)!;
    const pool = UNIQUE_WORDS.filter(cat.filter);
    setWords(pickRandom(pool, 15));
    setSelectedWord(null);
    setDefinition(null);
    setDefError(false);
  }, [activeId]);

  const selectWord = useCallback(async (word: string) => {
    if (selectedWord === word) {
      setSelectedWord(null);
      setDefinition(null);
      setDefError(false);
      return;
    }
    setSelectedWord(word);
    setDefinition(null);
    setDefError(false);
    setDefLoading(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!res.ok) throw new Error("not found");
      const data = await res.json();
      const defs: DictDefinition[] = [];
      for (const entry of data) {
        for (const meaning of entry.meanings ?? []) {
          const d = meaning.definitions?.[0];
          if (d) defs.push({ partOfSpeech: meaning.partOfSpeech, definition: d.definition });
          if (defs.length >= 3) break;
        }
        if (defs.length >= 3) break;
      }
      setDefinition(defs.length ? defs : null);
      if (!defs.length) setDefError(true);
    } catch {
      setDefError(true);
    } finally {
      setDefLoading(false);
    }
  }, [selectedWord]);

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-black mb-2">Browse by Category</h2>
          <p className="text-muted-foreground mb-6 text-sm">Select a category to see words. Click any word to reveal its definition. Hit refresh to load new words.</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => loadCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeId === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {CATEGORIES.find((c) => c.id === activeId)?.label}
                  </span>
                  <button
                    onClick={refresh}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1.5 transition-all hover:border-primary/40 hover:bg-primary/5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {words.map((w) => (
                    <button
                      key={w}
                      onClick={() => selectWord(w)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                        selectedWord === w
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedWord && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 rounded-xl bg-background border border-border p-4">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="font-black text-lg capitalize">{selectedWord}</h3>
                          <button
                            onClick={() => { setSelectedWord(null); setDefinition(null); setDefError(false); }}
                            className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {defLoading && (
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading definition...
                          </div>
                        )}

                        {defError && !defLoading && (
                          <p className="text-sm text-muted-foreground">Definition not found. <Link href={`/word/${selectedWord}`} className="text-primary underline">View full word page</Link></p>
                        )}

                        {definition && !defLoading && (
                          <div className="space-y-2">
                            {definition.map((d, i) => (
                              <div key={i} className="flex gap-2">
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold h-fit mt-0.5 whitespace-nowrap">{d.partOfSpeech}</span>
                                <p className="text-sm text-muted-foreground leading-relaxed">{d.definition}</p>
                              </div>
                            ))}
                            <Link href={`/word/${selectedWord}`} className="text-xs text-primary hover:underline mt-2 inline-block">
                              View full page: synonyms, antonyms, examples
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function VocabularyHubPage() {
  usePageMeta({
    title: "Vocabulary Hub - Build Your English Vocabulary | LexigenZ",
    description: "Your complete English vocabulary learning centre. Discover how to build vocabulary fast, browse word lists by category, and find proven strategies used by top learners worldwide.",
    canonical: "/vocabulary",
    keywords: "vocabulary hub, build vocabulary, english vocabulary, vocabulary learning, word lists, vocabulary builder",
  });

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">LexigenZ</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Vocabulary Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your complete English vocabulary learning centre. Whether you are a student, a professional, or someone who loves language, this is where vocabulary growth begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-8">Start Learning Today</Button></Link>
              <Link href="/articles"><Button size="lg" variant="outline" className="rounded-full px-8">Read Vocabulary Guides</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">What Is Vocabulary and Why Does It Matter</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground space-y-4 text-base leading-relaxed">
              <p>Vocabulary is the full collection of words a person knows and uses. It is not simply a list of definitions memorised from a dictionary. It is a living system of meaning that shapes how you think, speak, write, and understand the world around you. The richer your vocabulary, the more precisely you can express what you mean, and the more deeply you can understand what others say.</p>
              <p>Language researchers divide vocabulary into two major categories. Passive vocabulary refers to words you recognise when you encounter them in reading or listening. Active vocabulary refers to words you can spontaneously produce in speaking and writing. Most adults have a passive vocabulary that is three to five times larger than their active vocabulary. One of the most powerful things you can do for your communication is to deliberately close that gap by converting passive recognition into active use.</p>
              <p>The importance of vocabulary extends far beyond academic performance. Research consistently shows that vocabulary is one of the most reliable predictors of professional success, career advancement, and earning potential. Studies by the Human Engineering Laboratory, which tested thousands of adults over several decades, found that executives scored measurably higher on vocabulary assessments than managers, managers scored higher than supervisors, and supervisors scored higher than general staff. The relationship is not coincidental. Words are tools. The person with the right tool for every situation gets more done, more clearly, with less effort.</p>
              <p>Vocabulary also shapes cognition in ways that go beyond communication. Researchers in cognitive linguistics have argued for decades that the words available to you determine what concepts you can easily think about. When you have a word for something, you can hold it in your mind, reason about it, and communicate it. When you lack the word, the concept remains vague and difficult to work with. Growing your vocabulary is, in the deepest sense, growing your thinking.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">How to Build Your Vocabulary Systematically</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Most people approach vocabulary building backwards. They create long lists of words, try to memorise them in a single sitting, and then wonder why nothing sticks a week later. Vocabulary acquisition is not a memorisation task. It is a habit system. The brain builds durable word knowledge through repeated exposure in multiple contexts over time. A single encounter with a word produces recognition. Multiple contextual encounters produce ownership.</p>
              <p>The most effective vocabulary learning system works like this. First, you encounter a new word in context, which gives you a rough sense of its meaning from the surrounding text. Second, you look it up properly, reading its full definition, etymology, pronunciation, and usage examples. Third, you write your own original sentence using the word in a context that is personally relevant to you. Fourth, you encounter and use the word in real conversation or writing within 24 hours. Fifth, you review it at spaced intervals over the following weeks until retrieval becomes effortless.</p>
              <p>This is the system that LexigenZ is built around. One carefully chosen word per day, delivered with full context, followed by a sentence builder that prompts you to create your own usage, reinforced through game-based repetition. The streak system and Word Journal create the habit loop that makes daily engagement automatic rather than effortful.</p>
              <p>The key insight is that vocabulary growth is cumulative. Each new word you learn makes it easier to learn the next one, because new words connect to existing semantic networks in your brain. The more words you know in a particular domain, the faster you absorb new vocabulary in that domain. This is why domain-focused learning, building vocabulary in a specific area like business, science, or literature, is often more efficient than trying to learn vocabulary in the abstract.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">The Three Tiers of English Vocabulary</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>Educational researchers classify English vocabulary into three tiers, and understanding this framework transforms how you approach vocabulary study. Once you know which tier a word belongs to, you know exactly how to prioritise learning it and where it will be most useful.</p>
              <p>Tier One words are basic, everyday words that most native English speakers already know from early childhood. These include words like house, run, happy, big, and food. If English is your first language, you almost certainly know all the Tier One words you need. If you are learning English as a second language, building a solid Tier One foundation is your first priority.</p>
              <p>Tier Two words are the most valuable targets for vocabulary development in both students and adults. These are words that appear frequently across many different subject areas and types of text, but that are not typically taught in conversation or picked up from everyday speech. Words like analyse, formulate, evaluate, circumstance, perspective, and significant are Tier Two words. They are high-frequency in academic and professional writing, but many people never develop strong active command of them. Weakness in Tier Two vocabulary costs students across every subject simultaneously and limits professionals in written and verbal communication.</p>
              <p>Tier Three words are specialised, subject-specific terms that appear rarely outside their particular domain. Medical terminology, legal jargon, engineering vocabulary, and scientific nomenclature are all Tier Three examples. These words are best learned in context when you need them, rather than studied in isolation. When you begin working in a new field, the Tier Three vocabulary of that field will come to you naturally through immersion in relevant reading and professional practice.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Word Roots, Prefixes, and Suffixes</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>One of the most powerful strategies for rapid vocabulary expansion is learning Latin and Greek roots, prefixes, and suffixes. Rather than learning one word at a time, you learn a pattern that unlocks dozens or even hundreds of words simultaneously. A single root can generate an entire family of related words that share a core meaning.</p>
              <p>Consider the root word PORT, from the Latin portare, meaning to carry. This single root explains transport, import, export, portable, portfolio, deportation, report, support, porter, and opportunity. Once you know the root and its meaning, every word built on it becomes immediately interpretable even if you have never seen it before.</p>
              <p>Similarly, knowing the prefix DIS means apart, away, or not, you can decode disappear, disagree, disconnect, disrupt, discredit, disengage, and dismiss. Knowing the suffix OLOGY means the study of, you can understand biology, geology, psychology, anthropology, and cardiology without memorising each separately.</p>
              <p>High-frequency Latin and Greek roots worth learning include DICT meaning to say, giving us dictate, predict, verdict, and contradict. The root GRAPH meaning to write explains photograph, biography, paragraph, and autograph. PORT meaning to carry, as mentioned above. SPEC meaning to look, giving us spectator, inspect, perspective, spectacle, and introspect. CRED meaning to believe, giving us credible, incredible, credit, discredit, and credential.</p>
              <p>Spending time learning roots is an investment that compounds. Every root you master accelerates the acquisition of dozens of future words. LexigenZ includes etymology information for every daily word precisely because this kind of deep word knowledge is what creates durable, transferable vocabulary, not just recognition of isolated definitions.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Proven Strategies for Vocabulary Retention</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Brain, title: "Spaced Repetition", desc: "Review new words at increasing intervals: one day, three days, one week, two weeks, one month. Each retrieval attempt strengthens the memory trace. This approach, rooted in Ebbinghaus's memory research, produces retention rates dramatically superior to massed practice." },
                { icon: BookOpen, title: "The Generation Effect", desc: "Writing your own sentence using a new word produces far stronger retention than reading someone else's example. The cognitive effort of generating your own usage creates a deeper memory encoding. This is the scientific basis behind LexigenZ's sentence builder." },
                { icon: TrendingUp, title: "Contextual Immersion", desc: "Read broadly in domains you want to master. Literary fiction has the highest density of precise, uncommon vocabulary. Quality journalism, academic writing, and non-fiction narrative all provide rich contextual vocabulary exposure that no word list can replicate." },
                { icon: Zap, title: "Active Use Within 24 Hours", desc: "Use every new word you learn in real speech or writing within 24 hours of learning it. If you cannot use it naturally in conversation, write an additional sentence. Production within one day dramatically increases the probability of long-term retention." },
                { icon: Users, title: "Word Association", desc: "Connect new words to words you already know, to images, or to personal memories. The more connections a word has in your mental network, the more retrieval paths exist. Associations make words impossible to forget because there are too many ways to access them." },
                { icon: Star, title: "Consistent Daily Practice", desc: "Brief, consistent daily sessions outperform long, irregular study marathons by every measure. Seven minutes per day, every day, beats three hours once a week. LexigenZ is designed around this principle: one word, deeply learned, every single day." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-5 rounded-2xl border border-border bg-background">
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <BrowseByCategorySection />

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Common Questions About Vocabulary Building</h2>
            <div className="space-y-6">
              {[
                { q: "How many words do I need to know to be fluent in English?", a: "Research suggests that knowing the most frequent 8,000 to 9,000 word families gives you access to approximately 98 percent of everyday English text. However, fluent and confident professional communication typically requires a broader active vocabulary, particularly in writing, presenting, and negotiating. Most educated adult native speakers have passive vocabularies of 20,000 to 35,000 words." },
                { q: "How long does it take to add 1,000 words to my vocabulary?", a: "At three new words per day with proper contextual learning and spaced repetition, you can add 1,000 genuinely owned words to your active vocabulary in under a year. The key word is genuinely owned, which means words you can produce spontaneously, not just recognise when you see them. Shallow exposure to 1,000 words is not the same as deeply owning 300." },
                { q: "What is the best age to build vocabulary?", a: "Vocabulary acquisition is fastest in early childhood, when the brain is most plastic and language learning is effortless. However, vocabulary can grow at any age. Adults have one significant advantage over children in vocabulary learning: they bring existing semantic networks, world knowledge, and analytical skills that help new words connect to existing understanding rapidly. There is no bad age to start." },
                { q: "Does reading fiction help build vocabulary more than non-fiction?", a: "Both help, but research suggests that literary fiction provides the highest density of diverse, precise, and emotionally resonant vocabulary in natural context. Non-fiction provides domain-specific vocabulary and Tier Two academic words. The ideal reading diet for vocabulary growth includes both, supplemented with quality journalism and, for professionals, writing in your specific field." },
              ].map(({ q, a }) => (
                <div key={q} className="p-6 rounded-2xl border border-border bg-background">
                  <h3 className="font-bold mb-3">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-3xl font-black mb-4">Start Building Your Vocabulary Today</h2>
          <p className="text-muted-foreground mb-8">One personalised word per day. Full etymology. Sentence builder. Six word games. Word Journal. Free.</p>
          <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Get Your First Word</Button></Link>
        </div>
      </section>
    </div>
  );
}
