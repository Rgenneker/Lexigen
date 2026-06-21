import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UNIQUE_WORDS, VOCABULARY_LISTS } from "@/data/word-list";

const LIST_DATA: Record<string, { title: string; description: string; words: string[] }> = {
  "advanced-english-100": {
    title: "100 Advanced English Words",
    description: "Master these 100 advanced English words to dramatically improve your vocabulary, writing, and communication.",
    words: ["aberrant","abstruse","acrimony","acumen","alacrity","ameliorate","anomalous","aplomb","arduous","astute","austere","belligerent","byzantine","capricious","cogent","convoluted","copious","corroborate","culpable","cynical","dearth","debilitate","equanimity","erudite","esoteric","fastidious","fortitude","garrulous","grandiloquent","hapless","hegemony","hubris","iconoclast","immutable","implacable","indefatigable","insidious","intractable","laconic","loquacious","magnanimous","mendacity","mercurial","meticulous","obtuse","onerous","ostracize","parsimony","pedantic","perspicacious","pragmatic","querulous","recalcitrant","reticent","sagacious","sardonic","sycophant","taciturn","tenacious","ubiquitous","vacillate","vehement","venerable","verbose","vitriolic","vociferous","wistful","zealous","abeyance","abnegate","abrogate","abstemious","abstinent","accolade","accretion","acerbic","actuate","adumbrate","adventitious","aegis","affectation","aggrandize","alienate","allegory","altruism","amalgamate","ambivalence","anachronism","anathema","antagonize","antipathy","aphorism","apocryphal","apotheosis","approbation","arcane"],
  },
  "business-english-500": {
    title: "500 Business English Words",
    description: "Essential business vocabulary for professionals. These 500 words will help you communicate more effectively in any corporate environment.",
    words: UNIQUE_WORDS.filter((w) => ["accountability","acquisition","agility","analytics","benchmark","capital","catalyst","collaborate","competitive","compliance","deliverable","differentiation","disruptive","ecosystem","efficiency","engagement","entrepreneur","equity","execution","forecast","framework","governance","growth","implementation","incentive","innovation","kpi","leadership","leverage","margin","metrics","milestone","monetize","negotiation","optimization","performance","pipeline","portfolio","prioritization","productivity","profitability","revenue","roadmap","scalability","stakeholder","strategy","sustainability","synergy","traction","transformation","transparency","venture","workflow","acumen","alignment","allocation","ambiguity","arbitrage","articulate","bandwidth","brainstorm","cohesion","contingency","convergence","credibility","dashboard","deadline","delegation","endorsement","enhancement","entrepreneur","escalation","expertise","incentive","integration","iteration"].includes(w)).concat(["market-share","value-proposition","cross-functional","rebranding","onboarding","roi"]),
  },
  "sat-vocabulary-1000": {
    title: "1000 SAT Vocabulary Words",
    description: "The most important vocabulary words for SAT preparation. Master these words to maximize your SAT reading and writing scores.",
    words: UNIQUE_WORDS.slice(0, 200),
  },
  "professional-500": {
    title: "500 Professional Vocabulary Words",
    description: "Words every professional should know. Build the vocabulary that makes you sound more competent, credible, and authoritative.",
    words: UNIQUE_WORDS.filter((w) => w.length > 6 && w.length < 15).slice(0, 200),
  },
  "difficult-english": {
    title: "Most Difficult English Words",
    description: "The hardest English words to spell, pronounce, and remember — and what they mean.",
    words: ["aberration","acquiescence","amphibious","annihilation","antecedent","apoplectic","archipelago","assuage","bureaucracy","cacophonous","camouflage","catastrophe","chrysanthemum","circumnavigate","connoisseur","conscientious","contraband","counterfeit","desiccate","dilapidated","dissonance","entrepreneurial","ephemeral","etiquette","fascinate","fluorescent","fortuitous","idiosyncratic","impeccable","inadvertent","incandescent","incongruent","infrastructure","innocuous","insomnia","iridescent","kaleidoscope","labyrinthine","malapropism","malnourishment","melancholy","miscellaneous","mnemonic","monotonous","nomenclature","omnipotent","ostentatious","palindrome","paraphernalia","parsimonious","peculiar","philosophical","plagiarism","pneumonia","preposterous","psychedelic","quarantine","questionnaire","relinquish","reminiscent","rendezvous","rhapsody","sabotage","sacrilegious","saxophone","serendipity","silhouette","simultaneous","sophisticated","surveillance","susceptible","sycophant","treacherous","unprecedented","vengeance","vertiginous","whimsical"],
  },
  "powerful-english": {
    title: "Powerful English Words",
    description: "Words that command attention, inspire action, and leave a lasting impression. Use these in your writing, speeches, and conversations.",
    words: ["audacious","authoritative","bold","brilliant","command","compelling","confident","courageous","decisive","dominant","dynamic","eloquent","empower","exceptional","formidable","galvanize","impactful","influential","inspire","intrepid","invincible","lead","magnificent","masterful","momentous","noble","outstanding","passionate","persuasive","pivotal","potent","powerful","profound","resilient","resolute","robust","steadfast","tenacious","transform","triumphant","unstoppable","valiant","vibrant","visionary","zealous","unyielding","indomitable","fierce","relentless","decisive","commanding"],
  },
  "positive-words": {
    title: "Positive Words List",
    description: "A curated list of positive English words to uplift your writing, conversations, and mindset.",
    words: ["abundance","achieve","admirable","aspire","auspicious","awesome","balance","blossom","bold","breakthrough","bright","calm","capable","celebrate","champion","clear","confident","courageous","creative","decisive","dedicated","delightful","determined","dignified","driven","empower","encourage","energize","excel","exceptional","exciting","extraordinary","faithful","fearless","flourish","focused","freedom","fulfillment","genuine","glorious","graceful","grounded","grow","happiness","harmonious","hopeful","impactful","inspire","integrity","joyful","kind","lead","limitless","magnificent","motivated","noble","nurturing","optimistic","passionate","peaceful","potential","powerful","purposeful","radiant","resilient","respectful","rise","selfless","serene","shine","sincere","skilled","soar","strong","succeed","thankful","thriving","transform","triumph","trust","uplifting","vibrant","victorious","visionary","warm","wise","wonderful","worthy"],
  },
  "motivational-words": {
    title: "Motivational Words",
    description: "Powerful motivational vocabulary to inspire, energize, and drive action. Perfect for speeches, writing, and daily affirmations.",
    words: ["aspire","audacious","bold","breakthrough","capable","champion","commit","conquer","courage","dauntless","dedicated","determined","driven","embolden","endurance","excel","fearless","flourish","fortitude","grit","hardworking","impactful","indefatigable","inspire","integrity","lead","limitless","perseverance","persistent","pioneer","potential","powerful","proactive","purposeful","relentless","resilient","resolute","rise","selfless","soar","steadfast","strive","succeed","tenacious","thrive","transform","triumph","unwavering","valiant","visionary","zealous"],
  },
  "academic-words": {
    title: "Academic Word List",
    description: "Essential academic vocabulary for students, researchers, and scholars. These words appear most frequently in academic texts.",
    words: ["abstract","analysis","annotate","antithesis","application","argument","assertion","assumption","bibliography","category","causation","citation","claim","classification","coherence","cohesion","commentary","conceptual","conclusion","context","contradiction","contrast","critical","critique","deduction","definition","demonstrate","dialectic","discourse","domain","empirical","epistemology","evaluate","evidence","examination","exemplify","explicit","extrapolate","fallacy","framework","generalization","hypothesis","ideological","implication","inductive","inference","interpretation","investigation","juxtaposition","literature","methodology","narrative","objective","observation","ontology","paradigm","parameter","paraphrase","pedagogy","perspective","phenomenon","philosophy","premise","rationale","refute","research","rhetoric","scope","synthesis","theoretical","thesis","variable","verification"],
  },
  "spelling-bee-words": {
    title: "Spelling Bee Word List",
    description: "Master these spelling bee words to compete and win. Includes common Scripps National Spelling Bee vocabulary.",
    words: ["aberration","acquiescence","aegis","aesthetic","agoraphobia","alliteration","ambiguity","ameliorate","anachronism","archipelago","bibliography","bureaucracy","cacophonous","camouflage","catastrophe","charismatic","chrysanthemum","circumnavigate","connoisseur","conscientious","desiccate","dilapidated","disillusioned","eligible","ephemeral","etiquette","exasperate","exhilarate","fascinate","fluorescent","fortuitous","gregarious","hierarchy","idiosyncratic","impeccable","inadvertent","incandescent","iridescent","kaleidoscope","labyrinthine","malapropism","melancholy","miscellaneous","mnemonic","nomenclature","omnipotent","ostentatious","palindrome","parsimonious","peculiar","philosophical","plagiarism","pneumonia","psychedelic","quarantine","questionnaire","relinquish","reminiscent","rendezvous","rhapsody","sabotage","sacrilegious","serendipity","silhouette","simultaneous","sophisticated","surveillance","susceptible","treacherous","unprecedented"],
  },
  "scrabble-words": {
    title: "High-Value Scrabble Words",
    description: "Maximize your Scrabble score with these high-value words. Includes Q, Z, X, and J words that score big points.",
    words: ["quiz","jazz","fizz","buzz","czar","jinx","zinc","lynx","flux","oxen","aqua","zeal","azure","waltz","quaff","squat","queue","quest","quick","quirk","quota","quake","jazzy","fizzy","fuzzy","jazzy","quaff","squab","quill","quirky","zodiac","zigzag","zephyr","zenith","zealot","quorum","quartz","quench","quintet","quantum","qualify"],
  },
  "wordle-words": {
    title: "5-Letter Wordle Words",
    description: "Master these common 5-letter words to improve your Wordle strategy. Includes the most frequent Wordle answers.",
    words: UNIQUE_WORDS.filter((w) => w.replace(/-/g, "").length === 5),
  },
  "words-for-professionals": {
    title: "Words Every Professional Should Know",
    description: "Vocabulary that sets professionals apart. These words signal expertise, confidence, and credibility in any workplace.",
    words: ["accountability","acumen","articulate","assertive","authentic","collaborate","communication","competent","confident","credible","decisive","dedicated","diligent","diplomatic","effective","efficient","eloquent","empathetic","expertise","focused","innovative","integrity","leadership","meticulous","motivated","negotiation","objective","organized","persuasive","proactive","productive","proficient","reliable","resourceful","responsible","rigorous","savvy","skilled","strategic","thorough","transparent","trustworthy","versatile","astute","circumspect","cogent","deliberate","discern","expedient","pragmatic","tenacious","visionary"],
  },
  "words-for-students": {
    title: "Vocabulary Words for Students",
    description: "Essential vocabulary for students at all levels. These words appear in textbooks, exams, and academic writing.",
    words: ["abstract","analyze","articulate","assert","bibliography","categorize","causation","cite","classify","coherent","conclude","contrast","critique","deduce","define","demonstrate","describe","evaluate","evidence","examine","exemplify","explain","extrapolate","hypothesize","identify","illustrate","infer","interpret","investigate","justify","methodology","narrative","observe","outline","paraphrase","perspective","phenomenon","premise","rationale","reflect","research","summarize","synthesize","theorize","thesis","verify"],
  },
  "words-for-interviews": {
    title: "Vocabulary Words for Interviews",
    description: "Impress interviewers with the right vocabulary. These words demonstrate leadership, competence, and professionalism.",
    words: ["accountable","adaptable","ambitious","analytical","articulate","authentic","collaborative","committed","competent","confident","creative","decisive","dedicated","dependable","detail-oriented","diligent","driven","effective","efficient","empathetic","enthusiastic","focused","goal-oriented","hardworking","impactful","innovative","insightful","integrity","leadership","meticulous","motivated","organized","passionate","proactive","productive","proficient","resourceful","responsible","results-driven","strategic","tenacious","thorough","trustworthy","versatile","visionary"],
  },
  "words-for-exams": {
    title: "Vocabulary Words for Exams",
    description: "High-frequency vocabulary for standardized tests including SAT, ACT, GRE, IELTS, and TOEFL.",
    words: UNIQUE_WORDS.filter((w) => w.length >= 7 && w.length <= 12).slice(0, 150),
  },
  "words-for-writing": {
    title: "Advanced Words for Writing",
    description: "Elevate your writing with sophisticated vocabulary. These words add precision, nuance, and style to any piece of writing.",
    words: ["accentuate","articulate","astute","captivate","catalyze","coalesce","compel","crystallize","deftly","discern","eloquent","embody","evoke","exemplify","extrapolate","illuminate","illustrate","immerse","impart","invoke","juxtapose","nuanced","permeate","perspicacious","portray","profound","resonate","substantiate","transcend","underscore","vivid","wield"],
  },
  "common-misspelled": {
    title: "Commonly Misspelled Words",
    description: "Learn to spell these commonly misspelled English words correctly. Avoid embarrassing spelling mistakes in your writing.",
    words: ["aberration","absence","acceptable","accidentally","accommodate","accomplish","accumulate","acknowledge","acquaintance","acquire","address","adequate","adjacent","admittance","adolescent","adrenaline","advertisement","aggressive","ambiguous","anonymous","argument","assassination","beautiful","beginning","believe","bureaucracy","calendar","camouflage","category","cemetery","changeable","chauffeur","colleague","committed","conscientious","consistency","counterfeit","curriculum","definite","dilemma","disappear","discipline","embarrass","exaggerate","existence","fiery","fluorescent","foreign","gauge","grammar","guarantee","harass","hierarchy","hygiene","independent","interrupt","knowledge","liaison","license","maintenance","manoeuvre","medieval","millennium","miniature","mischievous","misspell","necessary","negligence","noticeable","occasion","occurrence","parliament","peculiar","personnel","pneumonia","privilege","pronunciation","pseudonym","questionnaire","receive","recommend","renaissance","rhythm","schedule","separate","similar","sincerely","supersede","threshold","tomorrow","unanimous","unnecessary","weird"],
  },
  "formal-english": {
    title: "Formal English Vocabulary",
    description: "Master formal English vocabulary for professional emails, reports, presentations, and correspondence.",
    words: ["accordingly","affirm","albeit","articulate","assert","cognizant","commence","concur","deem","deliberate","demonstrate","eloquent","endeavour","enumerate","explicit","facilitate","forthwith","henceforth","hereby","illustrate","implement","indicate","infer","mandate","moreover","nevertheless","notwithstanding","objective","pursuant","rectify","reiterate","substantiate","subsequently","thereof","thereby","thus","undertake","utilise","verify","whereas","whereby","wherefore","acknowledge","appreciate","correspond","elaborate","enquire","inform","notify","proceed","reconsider","request","resolve","submit","undertake"],
  },
};

function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.content ?? "";
    if (meta) meta.content = description;
    return () => {
      document.title = prev;
      if (meta) meta.content = prevDesc;
    };
  }, [title, description]);
}

export function VocabularyListPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const list = LIST_DATA[slug];

  if (!list) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">List Not Found</h1>
        <p className="text-muted-foreground mb-6">This vocabulary list doesn&apos;t exist yet.</p>
        <Link href="/hub/vocabulary"><Button>Browse Vocabulary Hub</Button></Link>
      </div>
    );
  }

  const words = [...new Set(list.words)];

  return <ListView slug={slug} title={list.title} description={list.description} words={words} />;
}

function ListView({ slug, title, description, words }: { slug: string; title: string; description: string; words: string[] }) {
  useDocumentMeta(`${title} | LexigenZ`, description);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/hub/vocabulary" className="hover:text-foreground transition-colors">Vocabulary Hub</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{title}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">{description}</p>
        <div className="flex items-center gap-3 mt-4">
          <Badge variant="secondary">{words.length} words</Badge>
          <Badge variant="outline">Click any word for full definition</Badge>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12"
      >
        {words.map((w, i) => (
          <Link key={`${w}-${i}`} href={`/word/${w.replace(/\s+/g, "-")}`}>
            <div className="border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors cursor-pointer group">
              <span className="text-xs text-muted-foreground mr-1">{i + 1}.</span>
              <span className="capitalize font-medium text-sm group-hover:text-primary transition-colors">{w}</span>
            </div>
          </Link>
        ))}
      </motion.div>

      <div className="border border-border rounded-xl p-6 bg-muted/30 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <BookOpen className="w-8 h-8 text-primary shrink-0" />
        <div className="flex-1">
          <h2 className="font-semibold mb-1">Build this vocabulary with LexigenZ</h2>
          <p className="text-muted-foreground text-sm">Get a personalised word every day — based on your archetype — and track your progress with streaks and badges.</p>
        </div>
        <Link href="/">
          <Button size="sm">Start Learning <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">More Vocabulary Lists</h2>
        <div className="flex flex-wrap gap-2">
          {VOCABULARY_LISTS.filter((l) => l.slug !== slug).slice(0, 10).map((l) => (
            <Link key={l.slug} href={`/vocabulary/${l.slug}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">{l.label}</Badge>
            </Link>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: title,
            description,
            url: `https://lexigenz.com/vocabulary/${slug}`,
            numberOfItems: words.length,
            itemListElement: words.slice(0, 20).map((w, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: w,
              url: `https://lexigenz.com/word/${w.replace(/\s+/g, "-")}`,
            })),
          }),
        }}
      />
    </div>
  );
}

export default VocabularyListPage;
