import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Star, Calendar, Brain, Flame, BookOpen, Zap } from "lucide-react";

export default function WordOfTheDayPage() {
  usePageMeta({
    title: "Word of the Day - Daily Vocabulary for Every Archetype | LexigenZ",
    description: "Get a new vocabulary word every day, personalised to your birth archetype. Full etymology, pronunciation, sentence builder, and word games - the complete daily word experience.",
    canonical: "/word-of-the-day",
    keywords: "word of the day, daily vocabulary word, vocabulary word, english word of the day, learn a new word daily",
  });

  const archetypes = [
    { name: "The Visionary", sign: "Aries", trait: "Bold, innovative language with forward-looking energy" },
    { name: "The Architect", sign: "Taurus", trait: "Precise, structural vocabulary with lasting weight" },
    { name: "The Connector", sign: "Gemini", trait: "Dynamic, varied words that bridge ideas and people" },
    { name: "The Nurturer", sign: "Cancer", trait: "Warm, emotionally intelligent vocabulary for relationships" },
    { name: "The Performer", sign: "Leo", trait: "Expressive, commanding words with presence and authority" },
    { name: "The Analyst", sign: "Virgo", trait: "Precise, systematic vocabulary for clarity and accuracy" },
    { name: "The Diplomat", sign: "Libra", trait: "Balanced, considered words that build consensus and beauty" },
    { name: "The Strategist", sign: "Scorpio", trait: "Intense, penetrating vocabulary with depth and purpose" },
    { name: "The Explorer", sign: "Sagittarius", trait: "Expansive, philosophical words that seek truth and meaning" },
    { name: "The Commander", sign: "Capricorn", trait: "Authoritative, disciplined language with proven impact" },
    { name: "The Innovator", sign: "Aquarius", trait: "Original, unconventional words that challenge and inspire" },
    { name: "The Intuitive", sign: "Pisces", trait: "Imaginative, fluid vocabulary with emotional depth and poetry" },
  ];

  const benefits = [
    { icon: Brain, title: "Spaced Repetition Built In", desc: "Each daily word is reinforced through sentence building, games, and the streak system - creating the spaced repetition that memory science shows is most effective for long-term retention." },
    { icon: Flame, title: "Streak-Based Habit Formation", desc: "Daily streaks create the psychological loop that makes vocabulary practice automatic. Missing a day breaks the streak, creating a gentle but real incentive to return." },
    { icon: BookOpen, title: "Word Journal for Reflection", desc: "Every word and every sentence you write is saved to your personal Word Journal. Reviewing your journal is one of the most effective vocabulary reinforcement techniques available." },
    { icon: Star, title: "Archetype Personalisation", desc: "Your birth month determines your vocabulary archetype. Words are selected to match your archetype's language style, making each daily word feel relevant rather than random." },
    { icon: Zap, title: "Game-Based Reinforcement", desc: "After your daily word, six word games reinforce it through different engagement modes. Multi-modal learning produces retention rates dramatically higher than single-mode exposure." },
    { icon: Calendar, title: "19 Languages", desc: "Whether you want your daily word in English, Spanish, French, Portuguese, German, Japanese, or any of sixteen other languages, LexigenZ delivers it with full depth." },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/15 via-background to-background">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Daily Vocabulary</span>
            <h1 className="text-5xl md:text-6xl font-black mt-3 mb-5">Word of the Day</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              One new word, every day, matched to your personality. Not a random dictionary entry. A deliberately chosen word with full depth, etymology, and a sentence you write yourself.
            </p>
            <div className="text-4xl mb-6">⭐</div>
            <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Get Today's Word</Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Why a Word of the Day Works</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>The word of the day format has been a vocabulary-building staple for over a century, appearing in newspapers, radio broadcasts, email newsletters, and apps. Its longevity reflects a genuine insight about how vocabulary grows: not through intensive cramming sessions but through consistent daily engagement that accumulates over time. One carefully learned word per day equals 365 words per year. Over five years, that is 1,825 words added to your active vocabulary, which represents a transformation in expressive capacity that is visible to everyone who interacts with you.</p>
              <p>The critical distinction between an effective word of the day system and a passive one is depth of engagement. Seeing a word and its definition in a daily email, reading it for ten seconds, and moving on produces near-zero vocabulary gain. The word needs to be engaged with: its etymology explored, its pronunciation practised, its usage understood in multiple sentence contexts, and then actively produced in your own writing. This deeper engagement is what LexigenZ is engineered around.</p>
              <p>Research in cognitive psychology consistently shows that vocabulary acquisition requires multiple exposures in varied contexts. A single deep exposure, where you read the definition, explore the etymology, hear the pronunciation, read examples, and then write your own sentence, produces far more durable retention than five shallow exposures of just seeing the word and its definition. LexigenZ's daily word system is designed to deliver this depth of engagement in seven minutes or less.</p>
              <p>The psychological power of a daily word system also lies in its routine nature. Habits that are triggered at the same time each day, such as morning vocabulary practice alongside coffee, become automatic quickly. The deliberate decision-making required to start a vocabulary practice session disappears once it is embedded in a daily routine. This is why LexigenZ's streak system matters: it creates a ritual, not just a tool.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">The LexigenZ Archetype System</h2>
            <div className="space-y-4 text-base leading-relaxed mb-8">
              <p>What distinguishes LexigenZ's word of the day from generic services is personalisation through archetypes. Your vocabulary archetype is determined by your birth month and shapes the style, register, and thematic orientation of the words you receive each day. This means that two people using LexigenZ simultaneously may receive completely different words, each chosen to fit their archetype's language profile.</p>
              <p>The archetype system is built on the insight that vocabulary is not one-size-fits-all. Different people naturally gravitate toward different kinds of language. Some are drawn to emotional, relational vocabulary that captures feeling and connection. Others prefer precise, analytical vocabulary that enables exact thinking and professional communication. Some want creative, poetic words that enrich writing and conversation. Others want strategic, leadership-oriented vocabulary that commands respect and authority.</p>
              <p>Rather than sending everyone the same word and hoping it fits, LexigenZ uses your archetype to select words that are more likely to be genuinely useful and genuinely interesting to you specifically. The result is a daily vocabulary experience that feels less like a homework assignment and more like a natural extension of your existing interests and communication style.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {archetypes.map(({ name, sign, trait }) => (
                <div key={name} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm">{name}</span>
                    <span className="text-xs text-muted-foreground">({sign})</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{trait}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">What the LexigenZ Daily Word Includes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-5 rounded-2xl border border-border bg-background">
                  <Icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-bold mb-2 text-sm">{title}</h3>
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
            <h2 className="text-3xl font-black mb-6">How to Make the Most of Your Daily Word</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Read the Full Entry, Not Just the Definition</h3>
                <p className="text-muted-foreground leading-relaxed">When your daily word arrives, resist the urge to skim the definition and move on. Read the etymology. Explore where the word comes from. Read every example sentence provided. Think about whether you have seen or heard this word before and in what contexts. This depth of engagement, taking three to four minutes rather than thirty seconds, produces dramatically more durable retention. Words you engaged with deeply at first exposure are retrieved far more readily weeks later than words you glanced at once.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Use the Sentence Builder Every Day</h3>
                <p className="text-muted-foreground leading-relaxed">The sentence builder is the most important feature in LexigenZ for vocabulary retention, and it is the one most commonly skipped. The cognitive science is clear: generating your own sentence using a new word produces retention that is two to three times more durable than simply reading example sentences. Your sentence does not need to be literary. It needs to be personally meaningful - a sentence about something in your actual life. The personal relevance is part of what makes it memorable.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Play at Least One Game</h3>
                <p className="text-muted-foreground leading-relaxed">After your daily word and sentence, play at least one word game. The games reinforce the word through a different cognitive mode than reading and writing, engaging visual pattern recognition and game-state decision-making alongside language knowledge. This multi-modal reinforcement, the same word encountered through reading, sentence production, and game play, activates multiple memory systems simultaneously and makes retention substantially more robust.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Use the Word in Real Life That Day</h3>
                <p className="text-muted-foreground leading-relaxed">The final and most powerful step in daily word practice is real-world use. Find one opportunity to use the word in actual conversation or writing before the day ends. This does not require forcing it awkwardly into an unnatural context. Simply keep the word in mind and watch for any situation where it fits naturally. When you find that opportunity and use the word correctly in real communication, something concrete happens in your brain: the word is now associated with actual social experience, which is one of the strongest possible memory anchors.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">The Long Game: What Daily Words Look Like After a Year</h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>After thirty days of daily vocabulary practice with LexigenZ, you have encountered and engaged with thirty new words. You have written thirty sentences, played games, and maintained a streak. The vocabulary gains at this stage are real but modest. You have expanded your working vocabulary by around thirty words, and more importantly, you have established the daily habit that makes everything else possible.</p>
              <p>After ninety days, the compounding effect begins to become visible. You are starting to notice your daily words appearing in reading and conversation with surprising frequency. This is not coincidence. It is the vocabulary frequency illusion: once you have learned a word and are sensitised to it, you begin to notice every occurrence of it in language you were previously processing but not consciously attending to. Your vocabulary awareness has grown, which makes subsequent learning faster.</p>
              <p>After a year, you have genuinely learned over 300 words to the level of active ownership. Your Word Journal contains a year's worth of sentences, a personal vocabulary history that captures how your language has grown. Your reading speed and comprehension have improved because fewer words require deliberate decoding. Your writing has become more precise because you have more options available at every point where you need to choose a word. People around you notice that you communicate with more clarity and authority, even if they cannot pinpoint exactly why.</p>
              <p>After three years, the transformation is substantial. Over 1,000 genuinely owned words added to your active vocabulary fundamentally changes your expressive capacity. Not because you are now trying to sound impressive, but because you have the right tool for every communicative situation. Precision in language is not about showing off. It is about being understood exactly as you intend, every time.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-primary/5 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-2xl">
          <h2 className="text-3xl font-black mb-4">Start Today. One Word at a Time.</h2>
          <p className="text-muted-foreground mb-8 text-lg">Free forever. No credit card. No downloads. Just a better word every morning, matched to who you are.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app"><Button size="lg" className="rounded-full bg-primary font-bold px-10">Get Today's Word</Button></Link>
            <Link href="/how-it-works"><Button size="lg" variant="outline" className="rounded-full px-10">How It Works</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
