export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  emoji: string;
  body: React.ReactNode;
}

export const ARTICLES: Article[] = [
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
  // ── 15 High-Traffic Articles ──────────────────────────────────────────────
  {
    id: "how-to-improve-your-vocabulary",
    title: "How to Improve Your Vocabulary by 1,000 Words",
    excerpt: "A practical, science-backed system for adding 1,000 words to your active vocabulary — without flashcards, without cramming, and without losing your mind.",
    category: "Study Tips",
    readTime: 7,
    emoji: "📈",
    body: (
      <div className="space-y-5">
        <p>Most people's vocabulary stops growing around age 25. Not because the brain loses capacity — but because learning becomes passive. You read the same types of content, talk to the same people, and use the same 2,000 words on repeat. Growth requires deliberate friction.</p>
        <p>Here's a structured system that will add 1,000 genuinely useful words to your active vocabulary over 12 months. That's less than three new words per day — entirely achievable, deeply effective.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 1: Distinguish Active vs Passive Vocabulary</h3>
        <p>Your <strong>passive vocabulary</strong> is words you recognise when you read or hear them. Your <strong>active vocabulary</strong> is words you actually use in speech and writing. Most adults have passive vocabularies 4–5× larger than their active ones. The goal is closing that gap — converting recognition into use.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 2: Learn in Context, Not in Isolation</h3>
        <p>Flashcard apps teach you word-definition pairs. The brain discards isolated pairs rapidly. What sticks is <em>context</em> — the sentence the word lived in, the emotion attached to it, the story around it. When you learn a new word, find three real-world examples of it being used. Read them. Then write your own sentence. That's the retention trigger.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 3: One Domain at a Time</h3>
        <p>Don't try to learn "vocabulary" in the abstract. Pick a domain — business language, literary vocabulary, scientific terminology, emotional lexicon — and build within it. Domain-specific learning creates semantic clusters in your brain, making each new word easier to retain because it connects to words you already know.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 4: Use Spaced Repetition</h3>
        <p>Review new words at increasing intervals: day 1, day 3, day 7, day 14, day 30. Each review strengthens the memory trace. Skip the review? The word fades. This is why Lexigenz resurfaces words through daily streaks and game-based reinforcement — spaced repetition baked into the habit.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Step 5: Consume Deliberately</h3>
        <p>Read one article per day outside your comfort zone — a field you know nothing about. Listen to podcasts where speakers have strong vocabularies. When you hear or see an unfamiliar word, don't skip it. Stop. Look it up. Use it within 24 hours or you'll forget it within 48.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The 1,000-Word Tracker</h3>
        <p>Keep a vocabulary journal — physical or digital. Log every new word with: its definition, the sentence you found it in, and a sentence you wrote yourself. At 3 words per day, you hit 1,000 in under a year. Your Word Journal in Lexigenz does this automatically.</p>

        <p className="italic text-muted-foreground mt-8">One thousand words isn't a goal. It's a habit. Start today.</p>
      </div>
    ),
  },
  {
    id: "advanced-english-words-professionals",
    title: "500 Advanced English Words Every Professional Should Know",
    excerpt: "From board meetings to client emails, your vocabulary is your credibility. Here are the high-value words that separate strong communicators from forgettable ones.",
    category: "Communication",
    readTime: 8,
    emoji: "💼",
    body: (
      <div className="space-y-5">
        <p>In every professional environment, communication is currency. The words you choose — in emails, presentations, negotiations, and casual conversations — shape how you're perceived. Studies consistently show that vocabulary is one of the strongest predictors of career advancement.</p>
        <p>This isn't about using big words to sound impressive. It's about having <em>precise</em> words available when precision matters. Here are the categories and sample words every professional should own.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Strategic & Business Thinking</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {["Commensurate — proportionate in size or degree", "Exigent — requiring immediate attention; urgent", "Synergistic — producing combined effects greater than individual parts", "Perspicacious — having sharp insight; astute", "Iterate — to repeat a process to improve a result", "Propitious — giving or indicating a good chance of success", "Efficacious — producing the desired result", "Enumerate — to list items one by one"].map(w => (
            <li key={w}>{w}</li>
          ))}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Communication & Negotiation</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {["Conciliate — to make peace; to placate", "Articulate — expressing ideas clearly and effectively", "Persuasive — good at causing people to believe something", "Unequivocal — leaving no doubt; clear", "Cogent — clear, logical, and convincing", "Circumspect — wary and unwilling to take risks", "Candid — truthful and straightforward", "Eloquent — well-spoken; fluent and persuasive"].map(w => (
            <li key={w}>{w}</li>
          ))}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Analysis & Problem-Solving</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {["Extrapolate — extend known data to unknown situations", "Juxtapose — place side by side to highlight contrast", "Correlate — have a mutual relationship or connection", "Delineate — describe or indicate with precision", "Synthesise — combine elements to form a new whole", "Hypothesis — a proposed explanation to be tested", "Empirical — based on observation and evidence", "Substantiate — provide evidence to support a claim"].map(w => (
            <li key={w}>{w}</li>
          ))}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Leadership & Influence</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {["Galvanise — shock or excite into action", "Tenacious — persistent; not giving up easily", "Magnanimous — generous and forgiving", "Pragmatic — dealing with things sensibly and realistically", "Resilient — able to recover quickly from difficulties", "Empower — give authority or confidence to act", "Delegate — entrust a task to another", "Visionary — thinking about the future with imagination and wisdom"].map(w => (
            <li key={w}>{w}</li>
          ))}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">How to Actually Learn These</h3>
        <p>Don't try to memorise this list. Pick five words per week. Find each one used in a real news article or business publication. Write one sentence per word. Use at least two in your actual work that week — in an email, a meeting, or a document. After 100 weeks of that, you'll have 500 genuinely owned words.</p>

        <p className="italic text-muted-foreground mt-8">The best professional vocabulary is the one that fits naturally into your voice. Build it one word at a time.</p>
      </div>
    ),
  },
  {
    id: "wordle-strategies-that-work",
    title: "Wordle Strategies That Actually Work",
    excerpt: "Stop guessing randomly. These data-backed Wordle strategies cut your average solve rate dramatically — and yes, the starting word really does matter.",
    category: "Games",
    readTime: 6,
    emoji: "🟩",
    body: (
      <div className="space-y-5">
        <p>Wordle looks simple: guess the five-letter word in six tries, with colour-coded feedback. But there's real strategy underneath — and the right approach can take your average from five guesses down to three.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Why Your Starting Word Is Everything</h3>
        <p>The best opening words contain the most common English letters in five-letter words. Analysis of the Wordle word list shows that <strong>E, A, R, O, T, L, I, S, N</strong> are the highest-frequency letters. A strong opener covers as many of these as possible with no repeating letters.</p>
        <p>Top-performing starting words based on letter frequency: <strong>CRANE, SLATE, AUDIO, RAISE, STARE, AROSE</strong>. Avoid words with repeated letters in your opener — you're wasting information.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Information Maximisation Strategy</h3>
        <p>Each guess should maximise the <em>information</em> you gain, not just guess the answer. If your first guess eliminates 40% of possible words, your second guess should target the remaining 60% — even if that second word isn't close to the answer. Players who chase the answer too early run out of guesses.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Reading the Colours Correctly</h3>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Green:</strong> That letter is correct in that exact position. Lock it in.</li>
          <li><strong>Yellow:</strong> The letter is in the word but in a different position. Move it.</li>
          <li><strong>Grey:</strong> That letter is not in the word at all. Eliminate it from all future guesses.</li>
        </ul>
        <p>A common mistake: using grey letters again in later guesses. Every grey is hard information. Use it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Common Patterns Worth Memorising</h3>
        <p>Many Wordle answers follow common patterns. Knowing these shapes your guesses:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Words ending in <strong>-IGHT</strong>: light, night, fight, might, right, sight, tight</li>
          <li>Words ending in <strong>-OUND</strong>: found, bound, round, sound, wound, mound</li>
          <li>Words ending in <strong>-TION</strong> are 6 letters — not valid in Wordle</li>
          <li>Double-letter words: often a trap when you've run out of single-letter options</li>
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Hard Mode Is Actually Better Practice</h3>
        <p>Wordle's Hard Mode forces you to use confirmed letters in every subsequent guess. This is frustrating but builds genuine word knowledge — you can't fall back on information-gathering words that ignore confirmed letters. Play Hard Mode for three weeks and your vocabulary intuition will sharpen noticeably.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Practice Daily on Lexigenz</h3>
        <p>The <a href="/wordle-words" className="text-primary underline">Lexigenz Wordle hub</a> includes a vocabulary-focused Wordle game that reinforces the same words you're learning daily — so every game doubles as vocabulary practice, not just entertainment.</p>

        <p className="italic text-muted-foreground mt-8">The best Wordle players aren't lucky. They know their words.</p>
      </div>
    ),
  },
  {
    id: "essential-scrabble-words",
    title: "100 Essential Scrabble Words Every Player Should Know",
    excerpt: "You don't need a massive vocabulary to win at Scrabble. You need the right words. These high-scoring, awkward-to-counter words will change your game.",
    category: "Games",
    readTime: 7,
    emoji: "🎯",
    body: (
      <div className="space-y-5">
        <p>Scrabble isn't a vocabulary contest — it's a <em>word strategy</em> game. The players who win consistently know a specific set of high-value words that most opponents don't. Here are the categories you need to master.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Two-Letter Words (The Foundation)</h3>
        <p>Knowing all 107 valid two-letter Scrabble words is the single biggest skill upgrade available. These words unlock parallel plays, hook plays, and get rid of awkward letter combinations. Essential two-letter words:</p>
        <p className="font-mono bg-muted rounded-lg p-4 text-sm leading-loose">
          AA · AB · AD · AE · AG · AH · AI · AL · AM · AN · AR · AS · AT · AW · AX · AY · BA · BE · BI · BO · BY · DA · DE · DO · ED · EF · EH · EL · EM · EN · ER · ES · ET · EW · EX · FA · FE · GI · GO · HA · HE · HI · HM · HO · ID · IF · IN · IS · IT · JO · KA · KI · LA · LI · LO · MA · ME · MI · MM · MO · MU · MY · NA · NE · NO · NU · OD · OE · OF · OH · OI · OM · ON · OP · OR · OS · OW · OX · OY · PA · PE · PI · PO · QI · RE · SH · SI · SO · TA · TE · TI · TO · UH · UM · UN · UP · US · UT · WE · WO · XI · XU · YA · YE · ZA
        </p>

        <h3 className="text-xl font-black mt-8 mb-3">High-Value Q Words (Without U)</h3>
        <p>Stuck with a Q and no U? These words will save you:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 font-semibold">
          {["QI — the life force in Chinese philosophy (10 pts)", "QOPH — Hebrew letter (18 pts)", "QANAT — underground irrigation tunnel (14 pts)", "QIGONG — Chinese health practice (18 pts)", "QWERTY — standard keyboard layout (21 pts)", "TRANQ — to tranquilise (14 pts)", "QINTAR — monetary unit of Albania (14 pts)"].map(w => <li key={w}>{w}</li>)}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">High-Value Z Words</h3>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {["ZOEAE — plural of zoea (larval form)", "ZOUK — Caribbean music style", "ZONK — to hit hard or fall asleep", "ZOETROPE — early animation device", "ZYMURGY — branch of chemistry dealing with fermentation", "ZILCH — nothing", "ZEALOT — fanatical person"].map(w => <li key={w}>{w}</li>)}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Bingo Words (7-Letter Plays = 50 Bonus Points)</h3>
        <p>Using all seven tiles earns a 50-point bonus called a "bingo." Common bingo stems to study:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {["SATINE + one letter: words like ENTAILS, RETAINS, NASTIER, ANTSIER", "RETAINS stem: productive for finding 7-letter words", "TISANE stem: TEA-related vocabulary cluster", "SATIRE stem: SATIREX, SATIRES", "ALINES, ALIENS, SALINE: common anagram cluster"].map(w => <li key={w}>{w}</li>)}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">The Parallel Play Mindset</h3>
        <p>The highest-scoring Scrabble moves aren't always long words — they're words placed to score on <em>two</em> rows simultaneously. A three-letter word placed parallel to an existing word can score from both, doubling your points. This mindset — looking for parallel opportunities — is what separates intermediate from advanced players.</p>

        <p className="italic text-muted-foreground mt-8">Study the two-letter words first. Everything else in Scrabble flows from those.</p>
      </div>
    ),
  },
  {
    id: "best-vocabulary-apps-compared",
    title: "Best Vocabulary Apps Compared in 2025",
    excerpt: "Not all vocabulary apps are equal. We compared the top options on retention, personalisation, and real-world effectiveness. Here's what we found.",
    category: "Study Tips",
    readTime: 6,
    emoji: "📱",
    body: (
      <div className="space-y-5">
        <p>There are dozens of vocabulary apps available in 2025. Most of them do the same thing: show you a word, show you a definition, ask you to select the right meaning from four options. That's it. And that's why most people's vocabularies don't grow after using them for three weeks.</p>
        <p>Here's an honest comparison of the major options — and why the approach matters as much as the content.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Merriam-Webster App</h3>
        <p><strong>Best for:</strong> Dictionary lookups and word of the day. <strong>Limitation:</strong> Purely passive — you read definitions but never use the words. No gamification, no personalisation, no retention loop. Excellent reference tool, poor learning tool.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Duolingo</h3>
        <p><strong>Best for:</strong> Language learning (new languages). <strong>Limitation:</strong> Vocabulary within Duolingo is always tied to language acquisition context — it's not designed for expanding vocabulary in your native language. Gamification is strong but learning depth is shallow. Great for beginners learning Spanish or French, not for growing English vocabulary.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Anki</h3>
        <p><strong>Best for:</strong> Hardcore learners who want to build custom flashcard decks. <strong>Limitation:</strong> Steep learning curve, no pre-built quality vocabulary curriculum, entirely self-directed. Powerful tool in the right hands, but most users abandon it within a month because setup is too heavy.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Vocabulary.com</h3>
        <p><strong>Best for:</strong> Contextual vocabulary learning with a large database. <strong>Limitation:</strong> The adaptive algorithm is good, but the experience is clinical — no personality, no streaks, no gamification beyond basic quizzes. Works well for students who are self-motivated.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Lexigenz</h3>
        <p><strong>Best for:</strong> Gen Z and millennials who want daily vocabulary growth that's personalised, gamified, and actually enjoyable. <strong>What's different:</strong> Birth-archetype personalisation means words are matched to your personality profile. Six word games reinforce each word through play. The sentence builder creates personal memory anchors. 19 languages. Streak system. Word journal. $8 one-off for lifetime Premium — no subscription.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Bottom Line</h3>
        <p>The best vocabulary app is the one you'll use daily. That makes engagement design as important as content quality. Any app that makes you <em>want</em> to return every day wins over one with better content that you abandon after a week. If you want to grow your vocabulary in English (or any of 19 other languages) through a system that feels personal and progressive, <a href="/app" className="text-primary underline">start with Lexigenz</a>.</p>
      </div>
    ),
  },
  {
    id: "spelling-bees-academic-performance",
    title: "How Spelling Bees Improve Academic Performance",
    excerpt: "The research is clear: students who participate in spelling competitions develop skills that extend far beyond spelling — into reading, writing, and reasoning.",
    category: "Word Facts",
    readTime: 5,
    emoji: "🏆",
    body: (
      <div className="space-y-5">
        <p>At first glance, a spelling bee seems like a narrow skill — you either know how to spell the word or you don't. But research into competitive spelling reveals something more interesting: the process of preparing for and competing in spelling bees develops a range of cognitive and academic skills that transfer broadly.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Spelling Competence and Reading Fluency</h3>
        <p>A consistent finding in educational research is that <strong>spelling ability is a strong predictor of reading fluency</strong>. This isn't coincidental — both skills rely on the same underlying orthographic knowledge: the understanding of how sounds map to letters, and how letter patterns create meaning. Students who develop strong spelling skills read faster and with higher comprehension because they recognise word forms automatically.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Etymology Knowledge as a Learning Accelerator</h3>
        <p>Spelling bee preparation involves extensive study of word origins — Latin, Greek, French, German roots. This etymological knowledge becomes a learning accelerator: once a student understands that <em>bio</em> means life, they can decode <em>biology, biography, biosphere, antibiotic,</em> and dozens of related words without memorising each individually. This is called morphological awareness and it's one of the most transferable academic skills available.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Performance Under Pressure</h3>
        <p>Standing at a microphone, spelling a word in front of an audience, with no ability to revise your answer — spelling bee competition is excellent training for high-stakes performance. Students who compete regularly develop stronger working memory, better stress management, and greater confidence in public settings. These skills directly support exam performance and, later, professional presentations.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Vocabulary Growth as a Side Effect</h3>
        <p>Spelling bee participants don't just learn to spell words — they learn to <em>own</em> them. A student who has studied the etymology, pronunciation, and usage of "perspicacious" to spell it in competition actually knows the word. The preparation process is a comprehensive word-learning experience, not just a memorisation exercise. Competition participants typically demonstrate vocabulary levels two to three grade levels above their peers.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Supporting Spelling Development at Home</h3>
        <p>Parents and students don't need to enter formal competitions to benefit from spelling study. Daily vocabulary practice — with a system like Lexigenz that includes etymology, contextual usage, and gamified reinforcement — builds the same foundational skills that spelling bee preparation develops.</p>

        <p className="italic text-muted-foreground mt-8">The spelling bee is a feature, not a bug, of an educated vocabulary.</p>
      </div>
    ),
  },
  {
    id: "crossword-solving-techniques",
    title: "Crossword Solving Techniques That Work at Every Level",
    excerpt: "From beginner-friendly strategies to expert habits that crack the hardest Sunday grids — here's how to get better at crosswords, systematically.",
    category: "Games",
    readTime: 6,
    emoji: "✏️",
    body: (
      <div className="space-y-5">
        <p>Crossword puzzles have been the world's most popular word game for over a century — and for good reason. They simultaneously test vocabulary, general knowledge, lateral thinking, and wordplay intuition. Here's how to get consistently better at them.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Start With What You Know (Across AND Down)</h3>
        <p>The most common beginner mistake: working through clues in order. Instead, scan the entire puzzle first and fill in every answer you're certain about — regardless of position. Each confirmed letter becomes an anchor that makes crossing answers easier. One confident answer can unlock four others.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Learn the Crossword Clue Conventions</h3>
        <p>Crossword clues follow consistent conventions once you learn to read them:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Question mark at end</strong> = wordplay or pun involved. The literal meaning isn't the answer.</li>
          <li><strong>"Perhaps" or "maybe"</strong> = the answer is an example, not the definition itself.</li>
          <li><strong>Abbreviations in clue</strong> = abbreviation likely in answer. "Dr." as part of a clue suggests the answer might be abbreviated.</li>
          <li><strong>Past tense clue</strong> = past tense answer. Clues and answers must match grammatically.</li>
          <li><strong>"Sounds like"</strong> = homophone clue. The answer sounds like the word being described.</li>
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Common Crossword Fill Words Worth Memorising</h3>
        <p>Certain words appear repeatedly in crosswords because they have unusual letter combinations that fill awkward grid spaces:</p>
        <p className="font-mono bg-muted rounded-lg p-3 text-sm leading-relaxed">
          EPEE · ALOE · OBOE · ARIA · OREO · ALEE · OLEO · ERNE · ESNE · ETUI · EWER · NARC · SMEW · TSAR · STOA · AGEE · ALAE · OAST · ERST · EIRE
        </p>
        <p>These aren't common everyday words — but crossword constructors love them. Seeing "fencing sword" and knowing it's EPEE saves you from impossible letter intersections.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Work the Themed Clues</h3>
        <p>Most crosswords have a theme — a pattern linking the longest answers. Identifying the theme early is a massive advantage. If three long answers are all "___ party", the fourth probably is too. Theme recognition often unlocks multiple answers simultaneously.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Practice on the Right Difficulty</h3>
        <p>Difficulty scales through the week in most major crosswords (NY Times Monday → Sunday = easiest → hardest). Start at Monday level until you're finishing consistently, then move up one day. Jumping to Saturday before you're ready is frustrating and unproductive. Deliberate, level-appropriate practice beats heroic struggle every time.</p>

        <p className="italic text-muted-foreground mt-8">The crossword rewards patience and pattern recognition more than raw vocabulary. Both improve with practice.</p>
      </div>
    ),
  },
  {
    id: "science-of-learning-new-words",
    title: "The Science of Learning New Words (And Why Most Apps Get It Wrong)",
    excerpt: "Memory research gives us a clear picture of how vocabulary actually sticks — and it's almost the opposite of what most word apps do.",
    category: "Study Tips",
    readTime: 7,
    emoji: "🧠",
    body: (
      <div className="space-y-5">
        <p>Learning a new word is not the same as remembering a new word. The gap between exposure and ownership is where most vocabulary learning falls apart — and it's not your fault. It's the fault of poorly designed systems that ignore 80 years of memory research.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Forgetting Curve</h3>
        <p>In 1885, psychologist Hermann Ebbinghaus documented what he called the <strong>Forgetting Curve</strong>: without reinforcement, we forget approximately 50% of new information within an hour, 70% within 24 hours, and 90% within a week. This curve is ruthlessly efficient — the brain discards anything it hasn't been prompted to retain.</p>
        <p>This is why seeing a word once in a vocabulary list is essentially useless. Exposure without reinforcement is not learning.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Spaced Repetition: The Antidote</h3>
        <p><strong>Spaced repetition</strong> defeats the forgetting curve by reviewing information at carefully timed intervals — just as you're about to forget it. Each retrieval attempt strengthens the memory trace. The optimal schedule, based on research: review at 1 day, 3 days, 7 days, 14 days, 30 days. After five successful retrievals at these intervals, a word transitions from short-term to long-term memory.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Generation Effect</h3>
        <p>Studies consistently show that <strong>generating</strong> information — producing it rather than just recognising it — leads to dramatically stronger retention. Writing your own sentence using a new word is far more effective than reading someone else's example sentence. This is called the generation effect, and it's why Lexigenz's sentence builder isn't optional — it's the core of the learning loop.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Contextual Encoding</h3>
        <p>Words learned in rich context are remembered better than words learned in isolation. If you learn "sanguine" with a definition alone, it's fragile. If you learn it in a story, attach an emotion to it, and write a sentence about your own life using it — it's encoded in multiple memory systems simultaneously. Rich encoding = durable retention.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Multi-Modal Learning</h3>
        <p>The more sensory channels involved in learning, the stronger the memory. This is why games work — they engage visual, auditory, and kinesthetic systems simultaneously. Hearing a word pronounced, reading its definition, writing a sentence, and then playing a game that uses it activates four different memory encoding pathways for the same piece of information.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Why Most Apps Get It Wrong</h3>
        <p>Most vocabulary apps rely on <em>recognition</em> (multiple choice) rather than <em>recall</em> (generate the word from memory). Recognition is cognitively easy — your brain can guess from options without actually knowing the answer. Apps that make you feel like you're learning because you're getting answers right in multiple choice are creating an illusion of progress. True learning requires harder, less comfortable retrieval — producing the word, not just identifying it.</p>

        <p className="italic text-muted-foreground mt-8">The science is not complicated: space your reviews, generate your own sentences, and use every word in context. Do those three things and retention becomes inevitable.</p>
      </div>
    ),
  },
  {
    id: "vocabulary-matters-in-business",
    title: "Why Your Vocabulary Directly Affects Your Career",
    excerpt: "Decades of research connect vocabulary size to income, promotion rates, and leadership effectiveness. Here's what the data says — and what to do about it.",
    category: "Communication",
    readTime: 6,
    emoji: "📊",
    body: (
      <div className="space-y-5">
        <p>In 1956, Johnson O'Connor, founder of the Human Engineering Laboratory, published findings from decades of aptitude testing that showed a direct correlation between vocabulary size and professional success — across virtually every field he studied. Since then, multiple independent research bodies have confirmed and extended his findings.</p>
        <p>Vocabulary isn't a proxy for intelligence. It's a measure of expressed intelligence — the ability to communicate what you know with precision and clarity. And in professional environments, that ability is worth money.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Promotion Data</h3>
        <p>O'Connor's research found that vocabulary scores correlated more strongly with management level than any other aptitude tested — including mathematical ability, spatial reasoning, and mechanical knowledge. In study after study, the pattern held: executives outscored managers on vocabulary tests; managers outscored supervisors; supervisors outscored general staff.</p>
        <p>This doesn't mean vocabulary <em>causes</em> career success — but it's strongly associated with the communication skills, reading habits, and intellectual engagement that do.</p>

        <h3 className="text-xl font-black mt-8 mb-3">In Meetings: Precision Wins</h3>
        <p>The professional who says "I think we need to reconsider the fundamental assumptions underpinning this strategy" communicates differently to the one who says "I think maybe this might not work." Both may have the same insight. Only one is taken seriously. Vocabulary gives you access to precision — the ability to say exactly what you mean without hedging or vagueness.</p>

        <h3 className="text-xl font-black mt-8 mb-3">In Writing: Credibility Is Built One Word at a Time</h3>
        <p>Every email, report, and message you send is a written signal of your intelligence, attention, and care. A proposal filled with imprecise language signals shallow thinking. Clear, varied, purposeful language signals depth. Your writing vocabulary is visible to every person above you in the organisation — and it's forming impressions constantly.</p>

        <h3 className="text-xl font-black mt-8 mb-3">In Negotiations: Naming the Dynamic</h3>
        <p>Professional vocabulary gives you the ability to name dynamics as they occur — "I think we're approaching an impasse here; what would help us find a mutually acceptable position?" The ability to label negotiation states calmly and accurately is a power move. It requires having the vocabulary to do it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Building Business Vocabulary Systematically</h3>
        <p>The most efficient approach: read broadly in business, law, finance, psychology, and technology — fields whose vocabularies overlap with most professional environments. When you encounter an unfamiliar term, log it, research it, and use it within 24 hours. Three to five new words per week, consistently applied over two years, will measurably change how colleagues and clients perceive you.</p>

        <p className="italic text-muted-foreground mt-8">Your vocabulary is your professional voice. Build it deliberately.</p>
      </div>
    ),
  },
  {
    id: "daily-habits-expand-vocabulary",
    title: "Daily Habits That Actually Expand Your Vocabulary",
    excerpt: "Not cramming sessions. Not memorisation marathons. These small, consistent daily habits produce lasting vocabulary growth — backed by habit science.",
    category: "Self-Development",
    readTime: 5,
    emoji: "🌱",
    body: (
      <div className="space-y-5">
        <p>Vocabulary growth is a lagging indicator of daily habits. You can't see it happening in real time, which is why people give up — they do the work and expect immediate results. The truth: consistent small inputs compound dramatically over 6–12 months. Here's what those inputs look like.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Morning: One Word With Full Depth</h3>
        <p>Every morning, engage with one new word — not just its definition, but its etymology, pronunciation, usage examples, and synonyms. Seven minutes maximum. Then write one sentence using it in a context from your own life. This is what Lexigenz is built around: one word per day with full depth and a sentence builder. Seven minutes, every morning, for a year = 365 genuinely owned words.</p>

        <h3 className="text-xl font-black mt-8 mb-3">During the Day: Read Outside Your Comfort Zone</h3>
        <p>The most passive but consistent vocabulary-builders are great readers — not because they study vocabulary, but because wide reading exposes them to words in rich context repeatedly. Pick one long-form article per day from a domain outside your expertise. The Guardian's science section. The Economist's finance pages. A literary magazine. New words in context are the richest possible input.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The "Pause and Look Up" Rule</h3>
        <p>Make a non-negotiable rule: whenever you encounter a word you don't fully know — in any context — you stop and look it up immediately. Not later. Now. The friction of pausing is exactly what creates the memory trace. Words you bothered to look up in the middle of something important are the ones you remember.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Evening: Use It or Lose It</h3>
        <p>Before bed, try to use the day's new word in a real conversation — or write about it in a journal. If you can't use it naturally that day, write a second sentence. The production step is non-negotiable for long-term retention. Reading alone doesn't build active vocabulary. Use builds active vocabulary.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Weekly: Review and Test</h3>
        <p>Once per week, review the words from the past seven days — without looking at definitions first. Try to produce the definition, then check. Any word you can't produce goes back into rotation. Any word you can define, use in a sentence, and identify correctly three weeks in a row is owned.</p>

        <p className="italic text-muted-foreground mt-8">Small daily inputs. Long patience. Remarkable results. That's vocabulary growth.</p>
      </div>
    ),
  },
  {
    id: "commonly-misspelled-words",
    title: "The Most Commonly Misspelled English Words (And How to Fix Them)",
    excerpt: "These words have been getting spelt wrong for generations. Here's why — and the memory tricks that actually make the correct spelling stick.",
    category: "Word Facts",
    readTime: 6,
    emoji: "🔤",
    body: (
      <div className="space-y-5">
        <p>English spelling is objectively difficult. It inherited words from Latin, French, Norse, Anglo-Saxon, and Greek — each with different phonetic rules — then froze spelling conventions in the 15th century while pronunciation kept evolving. The result: dozens of common words that look nothing like they sound.</p>
        <p>Here are the most frequently misspelled words and — more importantly — why they're spelled that way.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Accommodate</h3>
        <p><em>Common error: accommodate, accomodate.</em> Remember: it has <strong>two Cs and two Ms</strong>. Think "accommodate is large enough to fit double everything." The word comes from Latin <em>accommodare</em> — to make fit.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Necessary</h3>
        <p><em>Common error: neccessary, necesary.</em> One C, two Ss. Memory trick: it's <strong>Necessary</strong> to have one Collar and two Socks. (1C, 2S).</p>

        <h3 className="text-xl font-black mt-8 mb-3">Occurrence</h3>
        <p><em>Common error: occurence, occurance.</em> Two Cs, two Rs, ends in -ence not -ance. From Latin <em>occurrere</em> — to run to meet. The double-R was in the original Latin.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Separate</h3>
        <p><em>Common error: seperate.</em> The A is in the middle: sep-A-rate. Memory trick: there's a <strong>rat</strong> in "sep<strong>a</strong>r<strong>ate</strong>." Once you see it, you can't unsee it.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Definite / Definitely</h3>
        <p><em>Common error: definate, definately.</em> It comes from the Latin <em>definitus</em> — finite is inside the word. De-<strong>finite</strong>-ly. If you know "finite," you know "definite."</p>

        <h3 className="text-xl font-black mt-8 mb-3">Embarrass</h3>
        <p><em>Common error: embarras, embarass.</em> Two Rs and two Ss — because being embarrassed is doubly uncomfortable. From French <em>embarrasser</em> — to obstruct.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Liaison</h3>
        <p><em>Common error: liason, laison.</em> The A comes before the I: li-A-I-son. French origin — the A and I together create the French sound. Think: the A is first.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Privilege</h3>
        <p><em>Common error: priviledge, privelege.</em> No D. From Latin <em>privilegium</em> — a law applying to one person. The -lege ending comes from <em>lex</em> (law) — no D in Latin.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Rhythm</h3>
        <p><em>Common error: rythm, rhythem.</em> No vowels except the Y. Greek origin: <em>rhythmos</em>. Memory: <strong>R-H-Y-T-H-M</strong> = "Rhythm Helps Your Two Hips Move."</p>

        <h3 className="text-xl font-black mt-8 mb-3">Supersede</h3>
        <p><em>Common error: supercede.</em> Ends in -sede, not -cede. It's the only English word using the Latin <em>sedere</em> (to sit) rather than <em>cedere</em> (to go). It literally means "to sit above."</p>

        <p className="italic text-muted-foreground mt-8">Every spelling has a story. Learn the story and the spelling takes care of itself.</p>
      </div>
    ),
  },
  {
    id: "how-to-speak-more-professionally",
    title: "How to Speak More Professionally — Without Sounding Fake",
    excerpt: "Upgrading how you speak at work doesn't mean adopting corporate jargon. It means choosing words with more precision, more confidence, and more impact.",
    category: "Communication",
    readTime: 6,
    emoji: "🎤",
    body: (
      <div className="space-y-5">
        <p>The goal isn't to sound like a different person. The goal is to sound like the best, clearest, most confident version of yourself. That's what professional speech really means — not buzzwords and corporate-speak, but precision, intentionality, and verbal confidence.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Replace Filler Phrases</h3>
        <p>Filler phrases erode credibility. They signal uncertainty and unpreparedness even when you feel neither. The most common ones to eliminate:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>"I just wanted to…" → "I'm reaching out to…" or just state the purpose directly.</li>
          <li>"Does that make sense?" → "What questions do you have?" (Assumes comprehension; invites engagement.)</li>
          <li>"To be honest…" → Implies you're sometimes dishonest. Just be honest.</li>
          <li>"Basically…" → Often precedes the important thing. Lead with the important thing.</li>
          <li>"Obviously…" → Alienates anyone who didn't already know. Remove it.</li>
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Upgrade Your Precision Vocabulary</h3>
        <p>Vague words signal vague thinking. Precise words signal precise thinking. Some substitutions that immediately elevate your professional speech:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>"Good" → "Effective, compelling, rigorous, well-executed"</li>
          <li>"Problem" → "Challenge, obstacle, bottleneck, constraint"</li>
          <li>"Think" → "Believe, propose, conclude, hypothesise"</li>
          <li>"Very important" → "Critical, essential, paramount, non-negotiable"</li>
          <li>"Get" → "Acquire, secure, obtain, achieve, generate"</li>
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Use "We" Strategically</h3>
        <p>In professional contexts, "we" signals collaboration and shared ownership. "I decided" vs "We determined" — the second sounds like leadership, not lone decision-making. Conversely, when accepting responsibility, use "I" — "I made an error on this" is more trustworthy than "there was an error" (passive, evasive).</p>

        <h3 className="text-xl font-black mt-8 mb-3">Pause Before You Speak</h3>
        <p>The most underused professional speaking technique: silence before answering. A two-second pause before responding to a question signals that you're thinking carefully — not that you don't know. Leaders who pause before speaking are perceived as more thoughtful and confident than those who immediately fill silence. Silence is vocabulary-adjacent: it shows you're choosing your words.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Read More. Write More.</h3>
        <p>Professional vocabulary doesn't come from vocabulary lists. It comes from exposure to strong professional writing: annual reports, thought leadership articles, quality journalism, legal documents, academic summaries. Read the way professionals in your field write, and their language will gradually become yours.</p>

        <p className="italic text-muted-foreground mt-8">Speaking professionally is a skill. Skills are learnable. Start with one upgraded word this week.</p>
      </div>
    ),
  },
  {
    id: "powerful-words-improve-communication",
    title: "Powerful Words That Instantly Improve Your Communication",
    excerpt: "Certain words carry disproportionate weight in conversation. Here are the ones worth adding to your active vocabulary — and why they work.",
    category: "Communication",
    readTime: 5,
    emoji: "⚡",
    body: (
      <div className="space-y-5">
        <p>Not all words are equal. Some carry weight that stops people mid-sentence. Some open doors. Some signal exactly the right intelligence at exactly the right moment. Here are the words worth knowing — and why each one earns its place in your vocabulary.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Precisely</h3>
        <p>Replaces "exactly" or "yes." It signals calibrated agreement — you didn't just nod along, you measured the statement and found it accurate. "Precisely" commands a room. Try it in your next meeting.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Nuance</h3>
        <p>"The nuance here is…" — this phrase signals sophisticated thinking. It tells your audience that you see complexity where others see simplicity. Using "nuance" correctly marks you as someone who thinks in layers.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Compelling</h3>
        <p>More specific than "interesting" or "good." A compelling argument is one that moves you to act or believe. A compelling story demands attention. This word has persuasive energy baked in — use it when you want your endorsement to carry weight.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Leverage</h3>
        <p>As a verb: to use something to maximum advantage. "We can leverage our existing relationships to accelerate the launch." Conveys strategic thinking without verbosity. One word replaces five.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Catalyse</h3>
        <p>To cause a reaction without being consumed by it. Used in professional contexts: "This partnership will catalyse growth in three new markets." It's a science word with executive-level applications. Rare enough to stop people but precise enough to be perfectly clear.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Substantiate</h3>
        <p>To provide evidence for. "Can you substantiate that claim?" is a powerful, neutral way to ask for proof. It doesn't sound aggressive — it sounds rigorous. Use it in debates, meetings, and research discussions.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Inevitable</h3>
        <p>"This outcome is inevitable" frames your position as not debatable — not from arrogance, but from logical certainty. Used carefully, "inevitable" ends arguments. Used carelessly, it sounds overconfident. The key: only use it when you can actually support the certainty.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Articulate (as a verb)</h3>
        <p>"Let me articulate why this matters…" signals that clarity is coming. It sets an expectation of precision and depth. Professionals who articulate well are consistently perceived as more competent than those who just "explain" things.</p>

        <p className="italic text-muted-foreground mt-8">One precise word is worth five vague ones. Build your arsenal deliberately.</p>
      </div>
    ),
  },
  {
    id: "vocabulary-building-for-students",
    title: "Vocabulary Building for Students: A Complete System",
    excerpt: "Students with strong vocabularies read faster, write better, score higher, and learn more efficiently across every subject. Here's the system that makes it happen.",
    category: "Study Tips",
    readTime: 7,
    emoji: "📚",
    body: (
      <div className="space-y-5">
        <p>Vocabulary is the invisible scaffold of academic performance. Reading comprehension depends on it. Essay quality depends on it. Science, history, and mathematics all have domain-specific vocabularies that separate students who truly understand a subject from those who are just following instructions. Here's a complete system for building academic vocabulary deliberately.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Why Academic Vocabulary Is Different</h3>
        <p>Academic vocabulary operates at three tiers. Tier 1 words are common everyday words most students already know. Tier 2 words are high-frequency academic words that appear across subjects — "analyse," "formulate," "evaluate," "derive," "synthesise." Tier 3 words are subject-specific technical terms. Most students are weak on Tier 2 — and that weakness costs them across every subject simultaneously.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Tier 2 Words Every Student Needs</h3>
        <p>These cross-subject academic words appear in exam questions, textbook explanations, and essay prompts across all disciplines:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          {["Analyse — examine in detail, identifying components and their relationships", "Evaluate — assess the value, significance, or quality of something", "Synthesise — combine information from multiple sources into a new whole", "Hypothesise — propose a possible explanation to be tested", "Contextualise — place information within its broader situation or circumstances", "Derive — obtain something from a specified source through a process", "Elucidate — make clear; explain in detail", "Juxtapose — place side by side for the purpose of comparison"].map(w => <li key={w}>{w}</li>)}
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">The Vocabulary Journal System</h3>
        <p>Every student should keep a vocabulary journal — subject by subject. When you encounter an unfamiliar word in class or reading, log: the word, its definition, the sentence it was used in, and a sentence you write yourself using it in a new context. Review your journal weekly. This single habit, sustained over a school year, produces dramatic vocabulary gains.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Root Words as Learning Multipliers</h3>
        <p>Learning Latin and Greek roots multiplies your vocabulary gains. One root unlocks dozens of words:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><strong>GRAPH</strong> (write): photograph, biography, autograph, graphic, paragraph</li>
          <li><strong>PORT</strong> (carry): transport, import, export, portable, portfolio</li>
          <li><strong>CRED</strong> (believe): credible, credit, discredit, credential, incredible</li>
          <li><strong>SCRIB/SCRIPT</strong> (write): describe, prescription, manuscript, subscribe</li>
          <li><strong>DICT</strong> (say): predict, dictionary, contradict, verdict, dictate</li>
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Using New Words in Writing</h3>
        <p>The fastest path from passive to active vocabulary for students: use every new word you learn in your next written assignment — once, correctly. Teachers notice. More importantly, using a word correctly cements it. An essay written with three carefully chosen new vocabulary words is more memorable — to the writer and the reader — than one that plays it safe.</p>

        <p className="italic text-muted-foreground mt-8">The student with the best vocabulary doesn't always get the best marks — but they're almost never the student who struggles.</p>
      </div>
    ),
  },
  {
    id: "how-reading-improves-vocabulary",
    title: "How Reading Improves Vocabulary (And the Right Way to Read for Growth)",
    excerpt: "Reading is the most effective long-term vocabulary builder — but only if you read the right material in the right way. Here's what the research says.",
    category: "Study Tips",
    readTime: 6,
    emoji: "📖",
    body: (
      <div className="space-y-5">
        <p>Every credible language researcher agrees on one thing: the best readers have the largest vocabularies, and the largest vocabularies produce the best readers. The relationship is bidirectional and self-reinforcing. But not all reading builds vocabulary equally — the type of text, the level of difficulty, and the reader's approach all matter.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Why Reading Builds Vocabulary</h3>
        <p>Reading exposes you to words in rich context — the way they're actually used by skilled writers, embedded in meaning, connected to ideas. This is fundamentally different from memorising definitions. When you encounter "sycophantic" in a novel about a scheming courtier, you understand the word's texture, its register, and its emotional tone — not just its dictionary meaning. That richness is what makes reading-acquired vocabulary so durable.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Right Difficulty Level</h3>
        <p>Reading at your current vocabulary level produces minimal growth. Reading at a level slightly above your current level — where you know roughly 95% of words and encounter 1–2 unfamiliar words per page — produces the optimal input. Too easy: no new words. Too hard: comprehension breaks down and you stop reading. The sweet spot is challenging enough to encounter new words while maintaining enough comprehension to infer their meaning from context.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Read Wide, Not Just Deep</h3>
        <p>Every field has its own vocabulary. Reading only within one genre — say, only thrillers, or only social media, or only your professional domain — limits your exposure to the breadth of English vocabulary. The highest-vocabulary individuals typically read across multiple genres and disciplines: fiction, non-fiction, journalism, science writing, history, philosophy. Width of reading is as important as volume.</p>

        <h3 className="text-xl font-black mt-8 mb-3">Active vs Passive Reading</h3>
        <p><em>Passive reading:</em> encountering an unfamiliar word, guessing its meaning, moving on, forgetting it. <em>Active reading:</em> pausing, looking up the word, reading its etymology, using it within 24 hours. Active reading builds vocabulary three to five times faster than passive reading — but it's slower in the short run and requires discipline. The investment pays off rapidly.</p>

        <h3 className="text-xl font-black mt-8 mb-3">The Best Reading Material for Vocabulary Growth</h3>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li><strong>Literary fiction:</strong> Highest density of precise, uncommon vocabulary in natural context. Start with Orwell, Atwood, or Ondaatje.</li>
          <li><strong>Quality journalism:</strong> The Economist, The Atlantic, longform Guardian pieces. Professional, varied, contemporary.</li>
          <li><strong>Non-fiction narrative:</strong> Books like <em>Sapiens</em>, <em>The Body</em> by Bill Bryson — engaging enough to keep reading, rich enough to deliver new vocabulary.</li>
          <li><strong>Essays:</strong> Essays by James Baldwin, Joan Didion, or David Foster Wallace are among the most vocabulary-rich reading available in English.</li>
        </ul>

        <h3 className="text-xl font-black mt-8 mb-3">Reading + Lexigenz: The Combination That Works</h3>
        <p>Daily reading provides broad vocabulary exposure; Lexigenz provides structured daily reinforcement and retention. One word per day, in depth, with a sentence builder and game-based reinforcement — combined with 30 minutes of reading per day — is the most effective vocabulary development system available for free. The words you encounter in your reading will start appearing in your Lexigenz practice, and vice versa. That's the recognition loop that accelerates growth.</p>

        <p className="italic text-muted-foreground mt-8">Read every day. Look up every word you don't fully own. That's the entire system.</p>
      </div>
    ),
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Word History": "bg-amber-500/10 text-amber-600 border-amber-400/30",
  "Word Facts": "bg-rose-500/10 text-rose-600 border-rose-400/30",
  "Study Tips": "bg-blue-500/10 text-blue-600 border-blue-400/30",
  "Communication": "bg-teal-500/10 text-teal-600 border-teal-400/30",
  "Confidence": "bg-purple-500/10 text-purple-600 border-purple-400/30",
  "Self-Development": "bg-green-500/10 text-green-600 border-green-400/30",
  "Language & Culture": "bg-primary/10 text-primary border-primary/20",
  "Games": "bg-orange-500/10 text-orange-600 border-orange-400/30",
};
