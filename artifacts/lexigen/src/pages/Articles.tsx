import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BookOpen, Share2, Check } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  emoji: string;
  body: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    id: "origin-of-spelling-bee",
    title: "The Origin of the Spelling Bee — And Why It's Cooler Than You Think",
    excerpt: "Before TikTok, before Instagram, before even radio — people gathered in fields and town halls to spell words competitively. No, seriously.",
    category: "Word History",
    readTime: 5,
    emoji: "🐝",
    body: (
      <div className="space-y-5">
        <p>Before TikTok, before Instagram, before even radio — people gathered in fields and town halls to spell words competitively. No, seriously. The spelling bee is one of the oldest intellectual competitions in American history, and its roots go deeper than most people realise.</p>

        <h3 className="text-xl font-black mt-8 mb-3">So… Where Did It Actually Start?</h3>
        <p>The term <strong>"spelling bee"</strong> first appeared in print in 1875, but the practice of competitive spelling dates back to the late 1700s in North America. The word <em>bee</em> in this context doesn't refer to the insect — it comes from an old English dialect word meaning a gathering of people to help a neighbour or to work together on a task. Think: a quilting bee, a husking bee, a spelling bee.</p>
        <p>Communities would come together, often at schoolhouses or community halls, and children (and sometimes adults) would stand in a row and spell words aloud. Miss a word? Sit down. Last one standing wins. It was both entertainment and education — a combo that clearly works, because it's still going strong today.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Scripps National Spelling Bee Changed Everything</h3>
        <p>In 1925, the <strong>Scripps National Spelling Bee</strong> was founded in the United States, and it transformed a local pastime into a national phenomenon. Nine kids competed in that first championship. Today, millions of students participate in regional bees hoping to reach the national finals.</p>
        <p>The words have gotten progressively harder over the decades. Winners in the early years were spelling things like "gladiolus." Recent champions have conquered words like <em>koinonia, marocain,</em> and <em>scherenschnitte.</em> Yes, those are real. Yes, they're brutal.</p>

        <h3 className="text-xl font-black mt-8 mb-3">It's Not Just an American Thing</h3>
        <p>While the U.S. popularised the format, spelling competitions exist globally — in the UK, South Africa, India, and across the Commonwealth. South Africa in particular has a rich tradition of spelling competitions in schools, with English, Afrikaans, and other languages represented.</p>
        <p><strong>Lexigenz was born from that tradition.</strong> The idea that spelling is more than memorisation — it's the foundation of communication, confidence, and intelligence. When you can spell a word, you own it. And when you own words, you own rooms.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Why Spelling Still Matters in 2025</h3>
        <p>Some people will tell you autocorrect makes spelling irrelevant. Those people are wrong. Here's why:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Autocorrect makes errors — sometimes embarrassing ones.</li>
          <li>Strong spellers read faster and comprehend more deeply.</li>
          <li>Spelling fluency is directly linked to stronger writing and communication.</li>
          <li>In professional settings, spelling mistakes cost credibility.</li>
        </ul>
        <p>The spelling bee didn't survive 250 years by accident. It survived because the skill it tests — precision with language — never goes out of style.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Modern Bee</h3>
        <p>Today, spelling bees have gone digital, global, and gamified. Apps, online competitions, and platforms like Lexigenz are bringing the thrill of competitive spelling to a new generation. The format has evolved — timers, audio cues, difficulty levels — but the core challenge remains: <strong>do you know your words?</strong></p>
        <p>And honestly? There's something deeply satisfying about hearing a word you've never seen, understanding its roots, and spelling it perfectly. It's not just a party trick. It's a superpower.</p>
        <p className="italic text-muted-foreground">Now go practise. The bee doesn't wait.</p>
      </div>
    ),
  },
  {
    id: "wild-word-facts",
    title: "12 Wild Facts About Words That'll Actually Break Your Brain",
    excerpt: "Language is unhinged in the best way possible. Here are 12 facts about words that will make you stare at the ceiling tonight.",
    category: "Word Facts",
    readTime: 6,
    emoji: "🤯",
    body: (
      <div className="space-y-5">
        <p>Language is unhinged in the best way possible. We use words every single day without stopping to question how bizarre they actually are. Here are 12 facts about words that will genuinely make you stare at the ceiling tonight.</p>

        <h3 className="text-xl font-black mt-8 mb-3">1. "Dreamt" Is the Only English Word That Ends in "mt"</h3>
        <p>Go ahead — try to think of another one. We'll wait. The word <em>dreamt</em> stands alone as the sole English word ending in the letters "mt." Its American variant "dreamed" cheats the streak. British English keeps the tradition alive.</p>

        <h3 className="text-xl font-black mt-8 mb-3">2. The Longest Word in English Takes Over 3 Hours to Pronounce</h3>
        <p>The full chemical name of titin — the largest known protein — is 189,819 letters long. It begins with <em>methionylthreonylthreonyl…</em> and technically qualifies as a word. No one will ever use it in a sentence. But it exists.</p>

        <h3 className="text-xl font-black mt-8 mb-3">3. "Set" Has the Most Definitions in the English Language</h3>
        <p>The Oxford English Dictionary lists <strong>430 distinct definitions</strong> for the word "set." It can be a noun, verb, and adjective. It can describe placing something down, a group of items, a television prop, or a hardening process. One word. 430 meanings. English is chaotic.</p>

        <h3 className="text-xl font-black mt-8 mb-3">4. The Word "Silly" Used to Mean "Blessed"</h3>
        <p>In Old English, <em>sælig</em> meant fortunate, blessed, or happy. Over centuries, the meaning shifted — blessed → innocent → harmless → weak → foolish. Today it means goofy. Language is always sliding somewhere new.</p>

        <h3 className="text-xl font-black mt-8 mb-3">5. There's a Word for the Smell of Rain on Dry Earth</h3>
        <p><strong>Petrichor.</strong> Coined in 1964 by two Australian scientists, it describes that distinct, earthy scent that rises when rain hits dry soil. It's caused by an oil released by plants during dry periods, combined with a compound produced by soil bacteria. Now you have the word for it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">6. "Goodbye" Is a Contraction of "God Be With Ye"</h3>
        <p>We say it dozens of times a day without realising it carries a 500-year-old blessing. <em>God be with ye</em> → <em>God b'wy</em> → <em>goodb'wy</em> → <em>goodbye.</em> Language compression at its finest.</p>

        <h3 className="text-xl font-black mt-8 mb-3">7. "Nice" Originally Meant "Foolish" or "Stupid"</h3>
        <p>From the Latin <em>nescius</em> (ignorant), nice entered English meaning simple-minded. Then it shifted to mean lascivious, then shy, then precise, then agreeable. By the 18th century it settled into pleasant. Words have incredible glow-ups.</p>

        <h3 className="text-xl font-black mt-8 mb-3">8. "Ough" Has at Least 8 Different Pronunciations</h3>
        <p>Through, though, thought, tough, cough, plough, borough, hiccough. Eight totally different sounds. One letter combination. English spelling and pronunciation genuinely refused to cooperate with each other at multiple points in history.</p>

        <h3 className="text-xl font-black mt-8 mb-3">9. Shakespeare Invented Over 1,700 Words</h3>
        <p>Including: bedroom, eyeball, lonely, generous, obscene, radiance, and swagger. When Shakespeare didn't have the word he needed, he simply made one up. Several hundred of them stuck permanently in the language. That's the power of creative confidence.</p>

        <h3 className="text-xl font-black mt-8 mb-3">10. There's a Word for Words That Sound Like Their Meaning</h3>
        <p><strong>Onomatopoeia.</strong> Buzz, crack, whisper, splash — these words imitate the sounds they describe. It's one of the oldest poetic devices in human language, appearing in ancient Greek, Sanskrit, and virtually every language on Earth.</p>

        <h3 className="text-xl font-black mt-8 mb-3">11. "Rhythm" Is the Longest English Word Without a Vowel</h3>
        <p>Technically the "y" functions as a vowel here, but it's not classified as one in the traditional sense. Rhythms (the plural) stretches it to seven letters. It holds the record for longest standard English word using no a, e, i, o, or u.</p>

        <h3 className="text-xl font-black mt-8 mb-3">12. The Most Translated Document in Human History Contains About 800 Unique Words</h3>
        <p>The <em>Universal Declaration of Human Rights</em> has been translated into over 500 languages. It uses a deliberately simple vocabulary — proof that complexity of thought doesn't require complexity of language. Sometimes the most powerful words are the simplest ones.</p>

        <p className="mt-8 italic text-muted-foreground">Language is alive, weird, and endlessly fascinating. The more you know about it, the more powerful your own use of it becomes.</p>
      </div>
    ),
  },
  {
    id: "nail-english-exam",
    title: "6 Ways to Nail Your English Exam Without Pulling an All-Nighter",
    excerpt: "You don't need to sacrifice sleep or your social life to ace English. You need a smarter strategy. Here's what actually works.",
    category: "Study Tips",
    readTime: 5,
    emoji: "📝",
    body: (
      <div className="space-y-5">
        <p>You don't need to sacrifice sleep or your social life to ace English. You need a smarter strategy. Most students approach English exams the same way they approach every other subject — brute-force memorisation at 2am. That doesn't work here. English rewards understanding, not cramming.</p>
        <p>Here are six things that actually move the needle.</p>

        <h3 className="text-xl font-black mt-8 mb-3">1. Know the Rubric Better Than Your Teacher Does</h3>
        <p>Every English exam is marked against a rubric. That rubric is your treasure map. Before you study a single poem or essay, get your hands on the marking criteria and read it three times. What exactly is being rewarded? <strong>Vocabulary range? Structural clarity? Critical analysis?</strong></p>
        <p>Once you know what the markers want, every study session has a clear target. You're not studying English — you're studying the rubric. Huge difference.</p>

        <h3 className="text-xl font-black mt-8 mb-3">2. Write Practice Essays Under Timed Conditions</h3>
        <p>Reading past papers is fine. Writing under exam conditions is where the real gains happen. Set a timer. No notes. Force yourself to plan, structure, and complete a response in the allocated time.</p>
        <p>The first few will be rough. That's the point. You're training your brain to perform under pressure — the same pressure that exists in the exam room. By the third or fourth practice essay, you'll feel a shift in your confidence.</p>

        <h3 className="text-xl font-black mt-8 mb-3">3. Build a Vocabulary Bank Specific to Your Texts</h3>
        <p>For literature exams, every text has a cluster of high-value words that appear in strong essays — words like <em>juxtaposition, motif, allegory, catharsis, unreliable narrator.</em> Build a vocabulary bank of 20–30 terms per text, with a one-line definition and an example of how to use each one in analysis.</p>
        <p>When these words appear naturally in your writing, markers see evidence of literary understanding. <strong>It signals sophistication without you having to fake it.</strong></p>

        <h3 className="text-xl font-black mt-8 mb-3">4. Use the "Quote Sandwich" for Every Piece of Evidence</h3>
        <p>A quote sandwich is simple: <strong>introduce → quote → analyse.</strong> Never drop a quotation into a paragraph without context, and never leave one without unpacking what it actually reveals. The analysis is where marks live. A quote alone is just copying.</p>
        <p>Practice this so consistently that it becomes automatic. When it's automatic, you can spend your exam energy on the ideas rather than the structure.</p>

        <h3 className="text-xl font-black mt-8 mb-3">5. Read Your Own Work Out Loud</h3>
        <p>This sounds slightly ridiculous until you try it. Reading your essay aloud reveals things your eye skips over — clunky sentences, repeated words, ideas that don't connect, conclusions that trail off. Your ear catches what your eye misses.</p>
        <p>If a sentence makes you stumble when you read it aloud, it'll make the marker stumble when they read it silently. Fix it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">6. Start with Your Strongest Point</h3>
        <p>Markers are human. They form impressions early. If your first paragraph is sharp, confident, and well-evidenced, it sets a tone that colours how the rest of your essay is perceived. <strong>Your first impression on paper is your opening paragraph.</strong> Make it count.</p>
        <p>Don't save your best argument for last — lead with it. The essay should flow from strong to stronger, not from warm-up to main event.</p>

        <p className="mt-8 font-bold">The bottom line:</p>
        <p>English exams reward students who understand what they're reading, write with purpose, and express ideas precisely. None of that requires genius. It requires strategy, practice, and a commitment to the craft of language. You already have all of that in you.</p>
        <p className="italic text-muted-foreground">Now go write something worth reading.</p>
      </div>
    ),
  },
  {
    id: "lecture-better",
    title: "12 Ways to Lecture Better and Actually Keep People Awake",
    excerpt: "Whether you're a teacher, a student doing a presentation, or someone who just has to present at work — these 12 shifts will change how people experience you speaking.",
    category: "Communication",
    readTime: 7,
    emoji: "🎤",
    body: (
      <div className="space-y-5">
        <p>Whether you're a teacher, a student doing a presentation, or someone who just has to talk in front of people — the difference between a lecture that lands and one that loses people usually comes down to a handful of habits. Here are 12 you can start using immediately.</p>

        <h3 className="text-xl font-black mt-8 mb-3">1. Open with a Question, Not a Slide</h3>
        <p>Before you explain anything, make your audience think. Ask a question they can't immediately answer. It creates instant engagement — their brain is now active, searching, curious. <strong>Curious people listen. Passive people scroll.</strong></p>

        <h3 className="text-xl font-black mt-8 mb-3">2. Kill the Filler Words</h3>
        <p>"Um," "uh," "like," "you know," "sort of" — these words are verbal static. They undermine your authority and pull attention away from your content. Record yourself speaking for 60 seconds and count your fillers. Painful? Yes. Useful? Absolutely.</p>

        <h3 className="text-xl font-black mt-8 mb-3">3. Use the Rule of Three</h3>
        <p>Humans absorb information in clusters of three. Three points. Three examples. Three reasons. It's not arbitrary — it's cognitive. "There are three things I want you to walk away with today" signals structure. Structure signals confidence. Confidence earns attention.</p>

        <h3 className="text-xl font-black mt-8 mb-3">4. Pause on Purpose</h3>
        <p>Silence is not awkward — rushing to fill it is. After making a key point, pause. Let it land. A deliberate pause signals: <em>that was important, let it sink in.</em> It also gives you a moment to gather your next thought without the verbal crutches.</p>

        <h3 className="text-xl font-black mt-8 mb-3">5. Vary Your Vocal Energy</h3>
        <p>A monotone voice is the fastest way to lose a room. Vary your pace, your volume, and your pitch. Slow down for complex ideas. Speed up for energy. Drop your volume to draw people in closer. Your voice is a tool — use the full range of it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">6. Tell Micro-Stories</h3>
        <p>Every abstract concept becomes more memorable with a story attached to it. It doesn't need to be long — a 30-second anecdote that illustrates a point will stick in memory far longer than three bullet points. Humans are wired for narrative.</p>

        <h3 className="text-xl font-black mt-8 mb-3">7. Make Eye Contact With Individuals, Not the Room</h3>
        <p>Scanning the room feels like you're talking to no one. Instead, make genuine eye contact with one person for one complete thought, then move to another. Each person you lock eyes with feels like you're talking directly to them. The whole room comes alive.</p>

        <h3 className="text-xl font-black mt-8 mb-3">8. Acknowledge What You Don't Know</h3>
        <p>Pretending to know everything destroys credibility the moment someone catches you out. Saying "That's a great question — I'll find out and follow up" builds more trust than a confident wrong answer. <strong>Intellectual honesty is a strength, not a weakness.</strong></p>

        <h3 className="text-xl font-black mt-8 mb-3">9. Summarise at Every Transition</h3>
        <p>Before moving from one section to the next, briefly recap what was just covered. "So we've established X — now let's look at how that connects to Y." This signals structure, reinforces the information, and brings back anyone whose mind wandered.</p>

        <h3 className="text-xl font-black mt-8 mb-3">10. Use Precise Language</h3>
        <p>Vague language creates vague understanding. "A lot of people" versus "67% of surveyed respondents." "Pretty important" versus "critical." Train yourself to say exactly what you mean. Precision builds authority. <strong>Imprecision creates doubt.</strong></p>

        <h3 className="text-xl font-black mt-8 mb-3">11. Invite Interaction — Don't Just Allow It</h3>
        <p>There's a difference between saying "any questions?" and "I want to hear your take on this — what would you do?" The first is passive. The second is an invitation. The more agency your audience feels, the more invested they become.</p>

        <h3 className="text-xl font-black mt-8 mb-3">12. End with One Clear Takeaway</h3>
        <p>Don't summarise everything. Don't list five conclusions. End with one sentence that you want people to remember when they walk out the door. Something like: <em>"If you remember one thing from today, let it be this…"</em> It sticks. It lands. It respects their time.</p>

        <p className="mt-8 italic text-muted-foreground">Great lecturing isn't about knowing more than everyone in the room. It's about communicating what you know in a way that actually reaches them.</p>
      </div>
    ),
  },
  {
    id: "say-it-confidently",
    title: "Say It Confidently Every Time: The Art of Owning Your Words",
    excerpt: "Confidence isn't about having the perfect words. It's about trusting the ones you've got. Here's how to build that trust.",
    category: "Confidence",
    readTime: 5,
    emoji: "💬",
    body: (
      <div className="space-y-5">
        <p>Here's the thing about confident speech: it's not about having a massive vocabulary or sounding like a TV presenter. It's about <strong>trusting yourself enough to say what you mean and mean what you say.</strong> Most people hold back, rephrase, hedge, or trail off mid-sentence — not because they don't know what they want to say, but because they're afraid of how it'll land.</p>
        <p>That fear is costing you rooms. Here's how to stop it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 1: Eliminate Hedging Language</h3>
        <p>Hedging language sounds like this: "I might be wrong, but…" or "This is probably a silly idea, however…" or "I'm not sure if this is relevant, but…" Every hedge you add before your point dilutes it. It's like apologising for existing before you've even said anything.</p>
        <p>Cut the preamble. State the thing. "I think we should…" is stronger than "I'm not sure, but maybe we could possibly consider…" Practice leading with your actual point.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 2: Slow Down When It Matters</h3>
        <p>Speed is the enemy of clarity. When people are nervous, they talk faster — which makes them sound more nervous, which makes them talk faster. Break the cycle deliberately. <strong>Slow down when you make your most important point.</strong> The pause that follows is not awkward silence. It's emphasis.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 3: Know Your Words Cold</h3>
        <p>Confidence with language comes from vocabulary. Not showing off — just having the right word available when you need it. When you can't find the word, you fumble. When you fumble, you lose momentum. When you lose momentum, confidence drops.</p>
        <p>Building your vocabulary — even 5 new words a week — gives you more options in real-time conversation. More options equal smoother delivery. Smoother delivery feels like confidence, to you and to everyone listening.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 4: Make Eye Contact Before You Speak</h3>
        <p>Before you say a word in a group setting, make eye contact. Look at someone. It grounds you, signals that you're about to say something intentional, and gives your audience a moment to tune in. It's a power move that takes two seconds and costs nothing.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 5: Practice Recovery, Not Perfection</h3>
        <p>Even the most eloquent speakers stumble. The difference between someone who seems confident and someone who seems rattled is how they handle the stumble. If you lose your thread mid-sentence, <strong>pause, breathe, and restart the sentence</strong> — don't barrel through awkwardly or spiral into apology.</p>
        <p>"Let me rephrase that" is one of the most confident things you can say. It signals self-awareness, composure, and a commitment to clarity.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 6: Record Yourself Regularly</h3>
        <p>This is uncomfortable and essential. Record yourself for 60 seconds talking about something you know well. Play it back. Listen to your filler words, your pace, your vocal energy. Notice where you hedge and where you trail off. You can't fix what you can't hear.</p>
        <p>Do this once a week. Within a month, you'll hear an objective difference.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Bigger Picture</h3>
        <p>Confident speech is a skill, not a personality trait. Introverts can master it. Quiet people can master it. People who've spent years second-guessing themselves can absolutely master it. It takes repetition, feedback, and the willingness to sound imperfect while you're getting better.</p>
        <p><strong>Your voice deserves to be heard clearly.</strong> Build the habit of using it that way.</p>
      </div>
    ),
  },
  {
    id: "vocabulary-changes-your-life",
    title: "Word Power: How Building Your Vocabulary Can Literally Change Your Life",
    excerpt: "This isn't about sounding smart. It's about thinking clearly, earning more, and navigating the world with precision. Words are your most underrated tool.",
    category: "Self-Development",
    readTime: 6,
    emoji: "⚡",
    body: (
      <div className="space-y-5">
        <p>There's a study that keeps coming up in research on career success, academic achievement, and leadership effectiveness. It doesn't measure IQ. It doesn't measure technical skills or emotional intelligence. It measures <strong>vocabulary.</strong></p>
        <p>The correlation is consistent and striking: people with larger vocabularies earn more, lead more effectively, read faster, and demonstrate stronger critical thinking. This isn't because smart people happen to know more words. It's because knowing more words makes you smarter in measurable, practical ways.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Language Shapes Thought — Not Just Expression</h3>
        <p>Here's the part most people miss: vocabulary doesn't just help you express thoughts you already have. It shapes the thoughts themselves. When you have a precise word for something, you can think about it more clearly. <em>Cognitive dissonance. Sunk-cost fallacy. Cognitive load.</em> These aren't just terms — they're thinking tools.</p>
        <p>Without the word <em>cognitive dissonance</em>, you can still feel the discomfort of holding two conflicting beliefs — but you can't identify it, examine it, or resolve it as efficiently. The word gives the concept a handle. And handles make things easier to pick up and work with.</p>

        <h3 className="text-xl font-black mt-8 mb-3">In Professional Settings, Words Are Currency</h3>
        <p>Emails, presentations, negotiations, interviews — every professional interaction is mediated by language. The person who can articulate a problem clearly, frame a solution compellingly, and respond with precision in real time has an enormous advantage over someone who knows the same information but can't communicate it effectively.</p>
        <p><strong>You can be the smartest person in the room and lose every opportunity because your language doesn't reflect it.</strong> That's not fair. But it's real. Vocabulary is one of the fastest ways to close that gap.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Reading Is Still the Single Most Effective Vocabulary Builder</h3>
        <p>Not apps. Not flashcards. Not word-of-the-day emails. Reading. Specifically, reading widely — across genres, subjects, and styles. When you encounter a word in context — embedded in a sentence, a scene, a story — your brain absorbs it differently than if you memorised it from a list. You get the meaning, the tone, the register, and the emotional weight all at once.</p>
        <p>A person who reads 20 minutes a day will build a dramatically richer vocabulary over a year than one who doesn't, with almost no additional effort. It compounds.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Games Are the Second-Best Option</h3>
        <p>If reading feels like too big a lift right now, games that challenge you with unfamiliar words — spelling bees, word games, crosswords — activate the same learning pathways. The competitive element adds a memory hook that passive reading sometimes lacks. When you fought to remember how to spell a word under a 30-second timer, you remember it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">A Simple System That Actually Sticks</h3>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Learn 5 new words per week</strong> — not 50. Sustainable beats ambitious.</li>
          <li><strong>Use each word in a sentence the same day</strong> you encounter it.</li>
          <li><strong>Notice the word again</strong> in the wild — in a book, article, conversation.</li>
          <li><strong>Use it in speech or writing</strong> within the week. That's the move that cements it.</li>
        </ul>
        <p>Five words a week. Fifty-two weeks. That's 260 new words in a year — words that didn't exist in your toolkit before. Layer that over five years and you're looking at a fundamentally different command of language.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Confidence Bonus</h3>
        <p>Here's the part no one talks about enough: when you have the words for what you feel, what you think, and what you want — you feel less invisible. Less like things are happening to you that you can't describe or control. Language gives you agency. And agency is confidence at its root.</p>
        <p className="italic text-muted-foreground mt-6">Your vocabulary is a living thing. Feed it. It will pay you back in every area of your life.</p>
      </div>
    ),
  },
  {
    id: "gen-z-rewriting-dictionary",
    title: "The Secret Life of Slang — How Gen Z Is Actually Rewriting the Dictionary",
    excerpt: "No cap: slang isn't lazy language. It's innovation. Here's the linguistic science behind why the words Gen Z created are genuinely brilliant.",
    category: "Language & Culture",
    readTime: 5,
    emoji: "🔥",
    body: (
      <div className="space-y-5">
        <p>No cap: every generation thinks the next generation is ruining the language. The Boomers hated "groovy." The Gen Xers were told not to say "radical." Millennials got grief for "literally" and "adulting." And now, Gen Z slang — <em>rizz, slay, ate, bussin, understood the assignment</em> — is being treated like a symptom of civilisational decline.</p>
        <p>It isn't. In fact, linguists are kind of obsessed with it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Slang Is Language Doing Its Job</h3>
        <p>Language evolves. It always has. That's not a bug — it's the entire point. Languages that don't evolve die. Every word in formal English was once slang, informal, borrowed, or invented. <em>Bully</em> used to mean friend. <em>Computer</em> used to mean a person who computes by hand. <em>Awful</em> used to mean awe-inspiring, not terrible.</p>
        <p><strong>Slang is the frontier of language.</strong> It's where new meanings get minted before they're refined and formalised. Some words die quickly. Others — like "cool," which has been slang for nearly a century — become permanent fixtures.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Gen Z Slang Is Linguistically Creative</h3>
        <p>Take the word <em>rizz.</em> It's apparently derived from "charisma," dropping the first syllable — a process linguists call clipping. It fills a genuine gap: there wasn't previously a snappy, flexible term for the specific kind of effortless social magnetism it describes. Now there is. It's been added to the Oxford English Dictionary.</p>
        <p><em>Understood the assignment</em> is a complete metaphorical reframe — it takes workplace language and uses it to describe performing beautifully in any context. It's elegant. <em>Ate</em> (as in "she ate that") is a compressed compliment for flawless execution. These constructions are quick, precise, and expressive. That's good language design.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Code-Switching Is Actually a Sign of Intelligence</h3>
        <p>One of the most impressive things Gen Z does instinctively is <strong>code-switch</strong> — moving fluidly between registers depending on the context. Formal in a job interview. Casual with friends. Professional in an email. Playful in a group chat. This isn't inconsistency. It's sophisticated linguistic awareness.</p>
        <p>Research consistently shows that people who can code-switch effectively are better communicators, more socially intelligent, and more adaptable in professional environments. The ability to know which version of your language is appropriate for which room is a skill many adults never fully develop.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Line Between Slang and Vocabulary</h3>
        <p>Here's the thing: there's a time and place. Slang among friends is connection. Slang in a job interview is a risk. The most effective communicators know both registers deeply — the formal and the informal — and deploy them strategically.</p>
        <p>This is why building formal vocabulary matters even when you're fluent in slang. They're not in competition. They're two different tools in the same kit. And the person who only has one tool is always going to be limited.</p>

        <p className="mt-8 font-bold">The real flex?</p>
        <p>Being able to write a flawless formal essay and drop the correct slang in the right moment without missing a beat. That's range. That's power. And yes — that slays.</p>
      </div>
    ),
  },
  {
    id: "communication-habits",
    title: "5 Communication Habits That Will Make People Actually Listen to You",
    excerpt: "Most people aren't bad communicators because they don't know enough words. They're bad communicators because of five fixable habits. Here's what they are.",
    category: "Communication",
    readTime: 5,
    emoji: "👂",
    body: (
      <div className="space-y-5">
        <p>Most people aren't bad communicators because they lack knowledge or intelligence. They're bad communicators because of five fixable habits that create distance between what they mean and what people hear. Here's what they are — and how to replace them with something better.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Habit 1: Responding Instead of Listening</h3>
        <p>Most people listen to reply, not to understand. While someone else is talking, they're formulating their response, waiting for a pause, ready to fire. The result is a conversation that's really two monologues happening simultaneously.</p>
        <p><strong>The fix:</strong> When someone is speaking, make your only job understanding what they're saying. Don't compose your reply until they've finished. The quality of your response will improve dramatically. And they'll notice — because being truly listened to is rare enough that people remember it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Habit 2: Leading with "I" in Every Sentence</h3>
        <p>Communication is about connection, not broadcasting. When every sentence begins with "I think," "I feel," "I once," you're centering the conversation on yourself. This isn't always intentional — it's a habit. But it creates a subtle distance.</p>
        <p><strong>The fix:</strong> Shift your framing. "I think you should try X" becomes "Have you thought about X?" "I had a similar experience" becomes "That reminds me — what happened when you tried…?" These small shifts make you feel more curious, more engaged, and less like you're waiting for your turn to talk.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Habit 3: Overexplaining and Burying the Point</h3>
        <p>Some people are afraid that if they just state the thing directly, it'll seem abrupt or rude. So they add context, disclaimers, background, caveats — and by the time they get to the actual point, the other person has tuned out.</p>
        <p><strong>The fix:</strong> Lead with the conclusion, then support it. "I think we should postpone the meeting — the data isn't ready yet and a rushed presentation would undermine the whole proposal." That's one sentence. Clean. Clear. Respectful of everyone's time.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Habit 4: Using Jargon to Sound Smart</h3>
        <p>Every field has its jargon. And jargon has its place — when everyone in the room speaks the same technical language, it's efficient. But using insider terminology with people who don't share it creates exclusion and confusion, not respect.</p>
        <p><strong>The fix:</strong> Read your audience. If you're not sure whether your terminology is shared, use plain language. Precision doesn't require complexity. Saying exactly what you mean in words everyone can follow is harder than using jargon — and more impressive when you pull it off.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Habit 5: Reacting to Tone Instead of Content</h3>
        <p>When someone delivers information in an irritating, aggressive, or dismissive way, it's tempting to respond to the tone rather than the actual content. This derails conversations, escalates conflict, and usually means the valid point buried in the bad delivery never gets addressed.</p>
        <p><strong>The fix:</strong> Separate the message from the delivery. Process the content first: is there something useful or true in what was just said? If yes, address that. Then, separately, you can address the tone — calmly, directly, and specifically. This is one of the hardest communication skills to develop. It's also one of the most powerful.</p>

        <p className="mt-8 italic text-muted-foreground">The world is full of people who have important things to say but haven't yet learned how to say them in ways that land. Being the person in the room who communicates clearly and listens deeply is an advantage that compounds over time.</p>
      </div>
    ),
  },
  {
    id: "empower-yourself-with-words",
    title: "Why Knowing Your Words Is the Ultimate Self-Empowerment Tool",
    excerpt: "Self-improvement culture is full of advice about mindset and habits. Nobody talks enough about vocabulary. Here's why that's the gap you should be filling.",
    category: "Self-Development",
    readTime: 6,
    emoji: "🔑",
    body: (
      <div className="space-y-5">
        <p>Self-improvement culture gives a lot of airtime to mindset, morning routines, journaling, and hustle. Vocabulary barely rates a mention. That's a gap — because language is the operating system through which every other skill is accessed, expressed, and built upon.</p>
        <p>Here's what happens when you deliberately expand your vocabulary:</p>

        <h3 className="text-xl font-black mt-8 mb-3">You Think More Precisely</h3>
        <p>Thought is language-dependent. When you lack a word for something, your thinking about it is fuzzy and imprecise. When you have the exact word — <em>ennui, schadenfreude, equanimity, cognitive dissonance</em> — your thinking about that concept sharpens. <strong>Precise language creates precise thought.</strong> Precise thought enables better decisions.</p>

        <h3 className="text-xl font-black mt-8 mb-3">You Navigate Difficult Conversations With Less Fear</h3>
        <p>Many people avoid hard conversations not because they're emotionally unready but because they literally don't have the words. How do you tell someone they're being passive-aggressive without sounding accusatory? How do you advocate for yourself in a salary negotiation? How do you express nuanced disagreement without being dismissive?</p>
        <p>These are vocabulary problems masquerading as courage problems. When you have the language, the conversation becomes possible. And possible is everything.</p>

        <h3 className="text-xl font-black mt-8 mb-3">You Read Faster and Understand More</h3>
        <p>Reading speed is directly tied to vocabulary. When every third word requires a mental pause to decode, reading feels like work. When you recognise words instantly — because you've encountered them enough times — reading becomes fluid. And fluent reading is access: to information, to ideas, to perspectives that shift how you see everything.</p>

        <h3 className="text-xl font-black mt-8 mb-3">You Write with Authority</h3>
        <p>Writing is thinking made permanent. When your vocabulary is rich, your writing has texture, nuance, and personality. You're not reaching for a word — you're choosing between several. That agency shows up on the page. People feel it. <strong>Authority in writing is built word by word.</strong></p>

        <h3 className="text-xl font-black mt-8 mb-3">You Become Someone People Want to Listen To</h3>
        <p>This sounds superficial. It isn't. When someone articulates an idea clearly, concisely, and with the right words, they command attention — not because they're louder or more assertive, but because precision is rare and valuable. People lean in when they sense they're hearing something worth hearing.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Practice Is Simple (If Slightly Unglamorous)</h3>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Read broadly — not just your field or genre.</li>
          <li>When you don't know a word, look it up immediately. Don't skip it.</li>
          <li>Use new words in your own writing and speech within 48 hours.</li>
          <li>Play word games. Compete. The pressure of a timer burns words into memory.</li>
          <li>Listen to articulate speakers — podcasters, authors, documentarians — and notice the words they choose.</li>
        </ul>

        <p className="mt-6">None of this requires talent. It requires attention. And the payoff — in your career, your relationships, your self-concept — is enormous.</p>
        <p className="italic text-muted-foreground mt-4">Words are the one resource that, the more you use them, the more you have. Start using more of them on purpose.</p>
      </div>
    ),
  },
  {
    id: "word-origins-unhinged",
    title: "Origins of 10 Everyday Words That Are Absolutely Unhinged",
    excerpt: "The words you use every single day have backstories that are stranger, funnier, and more twisted than you'd ever expect. Buckle up.",
    category: "Word History",
    readTime: 5,
    emoji: "📜",
    body: (
      <div className="space-y-5">
        <p>You use these words constantly — without any idea where they came from or what they used to mean. Here are 10 everyday words with origin stories that range from delightfully strange to genuinely disturbing.</p>

        <h3 className="text-xl font-black mt-8 mb-3">1. Salary</h3>
        <p>Your salary — the money you get paid — comes from the Latin <em>salarium,</em> which referred to payments made to Roman soldiers to buy <strong>salt.</strong> Salt was so valuable in the ancient world that it was literally used as currency. "Worth their salt" isn't just an expression. It's an historical fact.</p>

        <h3 className="text-xl font-black mt-8 mb-3">2. Disaster</h3>
        <p>From the Italian <em>disastro</em> — <em>dis</em> (bad) + <em>astro</em> (star). A disaster was literally a "bad star" — a catastrophic event attributed to unfavourable astrological alignment. Astrology was once taken seriously enough to name misfortunes after stars. Wild.</p>

        <h3 className="text-xl font-black mt-8 mb-3">3. Muscle</h3>
        <p>From the Latin <em>musculus</em>, meaning "little mouse." Ancient Romans apparently thought flexing muscles looked like a mouse moving under skin. Next time you see someone showing off at the gym, remember they're technically displaying their "little mice."</p>

        <h3 className="text-xl font-black mt-8 mb-3">4. Hazard</h3>
        <p>From the Arabic <em>az-zahr</em>, meaning "the dice." Dice games were considered dangerously unpredictable — a gamble that could go disastrously wrong. The word travelled through Spanish, French, and English, and by the time it arrived, it meant any kind of risk or danger.</p>

        <h3 className="text-xl font-black mt-8 mb-3">5. Candidate</h3>
        <p>From the Latin <em>candidatus</em> — meaning dressed in white. In ancient Rome, people seeking public office wore bright white togas as a symbol of purity and transparency. Today's candidates don't wear white togas, but the word still carries the implication that they're supposed to be squeaky clean.</p>

        <h3 className="text-xl font-black mt-8 mb-3">6. Bankrupt</h3>
        <p>From the Italian <em>banca rotta</em> — literally "broken bench." In medieval Italian markets, money-changers conducted business from benches (<em>banca</em>). When a money-changer couldn't pay their debts, their bench was smashed — a public declaration of financial ruin. The symbolism was on the nose.</p>

        <h3 className="text-xl font-black mt-8 mb-3">7. Bonfire</h3>
        <p>This one is dark. <em>Bonfire</em> comes from Middle English <em>bonefire</em> — a fire of <strong>bones.</strong> Large outdoor fires in medieval Europe often burned bones as fuel, whether animal or (in grimmer historical moments) human. We now use the word for celebratory outdoor fires. Progress.</p>

        <h3 className="text-xl font-black mt-8 mb-3">8. Clue</h3>
        <p>Originally spelled <em>clew</em>, referring to a ball of yarn. In the Greek myth of Theseus and the Minotaur, Theseus unravelled a ball of thread through the labyrinth so he could find his way back out. The thread — the <em>clew</em> — led him to safety. Centuries later, anything that leads you to a solution became a "clue."</p>

        <h3 className="text-xl font-black mt-8 mb-3">9. Villain</h3>
        <p>From the Old French <em>vilain</em> and Latin <em>villanus</em> — meaning a person who works on a <em>villa</em> (a rural estate). A villein was a feudal serf: poor, uneducated, and considered morally suspect by the aristocracy who controlled them. Class bias baked directly into vocabulary. Language is never neutral.</p>

        <h3 className="text-xl font-black mt-8 mb-3">10. Tragedy</h3>
        <p>From the ancient Greek <em>tragōidia</em> — literally "goat song." The exact connection is debated: some scholars think goats were given as prizes in early dramatic competitions; others think it refers to costumes worn by performers. Regardless, every great tragic narrative you've ever experienced traces its name back to a goat.</p>

        <p className="mt-8 italic text-muted-foreground">Language carries history inside every word. When you dig into etymologies, you're not just learning where words came from — you're reading the story of human civilisation one word at a time.</p>
      </div>
    ),
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Word History": "bg-amber-500/10 text-amber-600 border-amber-400/30",
  "Word Facts": "bg-rose-500/10 text-rose-600 border-rose-400/30",
  "Study Tips": "bg-blue-500/10 text-blue-600 border-blue-400/30",
  "Communication": "bg-teal-500/10 text-teal-600 border-teal-400/30",
  "Confidence": "bg-purple-500/10 text-purple-600 border-purple-400/30",
  "Self-Development": "bg-green-500/10 text-green-600 border-green-400/30",
  "Language & Culture": "bg-primary/10 text-primary border-primary/20",
};

function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}

export default function Articles() {
  const [selected, setSelected] = useState<Article | null>(null);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!selected ? (
          /* ── ARTICLE GRID ─────────────────────────────────── */
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero */}
            <section className="pt-20 pb-12 px-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
              <div className="container mx-auto max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-4">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                    Free · No Account Needed
                  </span>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                    WORDS.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">KNOWLEDGE. POWER.</span>
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-xl">
                    Original articles on vocabulary, communication, confidence, and the weird, wonderful world of language. Free for everyone — always.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Grid */}
            <section className="px-4 pb-20">
              <div className="container mx-auto max-w-5xl">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ARTICLES.map((article, i) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all cursor-pointer flex flex-col gap-4"
                      onClick={() => { setSelected(article); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                      <div className="text-4xl">{article.emoji}</div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-[10px] font-bold ${CATEGORY_COLORS[article.category] ?? "bg-primary/10 text-primary"}`}>
                            {article.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" /> {article.readTime} min read
                          </span>
                        </div>
                        <h2 className="font-black text-base leading-snug group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-border/60">
                        <span className="text-[10px] font-bold text-primary tracking-wide uppercase">Authored by Lexigenz</span>
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium">
                          Read →
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* ── ARTICLE READER ───────────────────────────────── */
          <motion.div key={selected.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <section className="pt-20 pb-20 px-4">
              <div className="container mx-auto max-w-2xl">
                {/* Back button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-8 -ml-2 text-muted-foreground hover:text-foreground"
                  onClick={() => { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <ArrowLeft className="h-4 w-4 mr-1.5" /> All Articles
                </Button>

                {/* Article header */}
                <div className="space-y-4 mb-10">
                  <div className="text-5xl">{selected.emoji}</div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className={`text-[10px] font-bold ${CATEGORY_COLORS[selected.category] ?? "bg-primary/10 text-primary"}`}>
                      {selected.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {selected.readTime} min read
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" /> Free to read
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black leading-tight">{selected.title}</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">{selected.excerpt}</p>

                  {/* Author line */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-lg">🐝</div>
                      <div>
                        <p className="text-sm font-bold">Lexigenz Editorial</p>
                        <p className="text-[11px] text-muted-foreground">Lexigenz Trading · hello@lexigenz.com</p>
                      </div>
                    </div>
                    <ShareButton title={selected.title} />
                  </div>
                </div>

                {/* Article body */}
                <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed [&_h3]:text-foreground [&_strong]:text-foreground [&_em]:text-muted-foreground">
                  {selected.body}
                </div>

                {/* Footer watermark */}
                <div className="mt-14 pt-8 border-t border-border/60 flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-primary">Authored by Lexigenz</p>
                    <p className="text-[11px] text-muted-foreground">© Lexigenz Trading · All rights reserved · hello@lexigenz.com</p>
                  </div>
                  <ShareButton title={selected.title} />
                </div>

                {/* More articles */}
                <div className="mt-12">
                  <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-5">More Articles</h3>
                  <div className="space-y-3">
                    {ARTICLES.filter(a => a.id !== selected.id).slice(0, 3).map(a => (
                      <button
                        key={a.id}
                        className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-all group"
                        onClick={() => { setSelected(a); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl shrink-0">{a.emoji}</span>
                          <div>
                            <p className="font-bold text-sm group-hover:text-primary transition-colors leading-snug">{a.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                              <Clock className="h-3 w-3" /> {a.readTime} min · {a.category}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 rounded-xl border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >
                    View All Articles
                  </Button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
