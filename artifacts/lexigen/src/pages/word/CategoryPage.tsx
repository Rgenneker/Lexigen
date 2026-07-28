import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UNIQUE_WORDS, LETTERS, SUFFIXES } from "@/data/word-list";

type CategoryType = "starting-with" | "ending-with" | "theme";

const THEME_WORDS: Record<string, string[]> = {
  positive: ["abundance","achieve","admirable","aspire","auspicious","bold","breakthrough","calm","capable","celebrate","certain","champion","confident","courageous","creative","decisive","dedicated","determined","dignified","driven","empower","encourage","energize","excel","exceptional","faithful","fearless","flourish","focused","fulfillment","genuine","graceful","grounded","grow","happiness","harmonious","hopeful","impactful","inspire","integrity","joyful","kind","limitless","magnificent","motivated","noble","nurturing","optimistic","passionate","peaceful","powerful","purposeful","radiant","resilient","selfless","serene","sincere","skilled","soar","strong","thankful","thriving","transform","triumph","trust","uplifting","vibrant","victorious","visionary","wise","wonderful","worthy"],
  negative: ["aberrant","abhor","acrimony","adverse","agitate","antagonize","apathy","arrogant","avarice","callous","caustic","complacent","condescend","contentious","covet","craven","cynical","daunt","deceitful","denounce","deprecate","despair","disdain","dogmatic","dubious","erratic","fallacious","fatuous","furtive","garrulous","haughty","heinous","hubris","ignorant","impatient","impetuous","indolent","insidious","intractable","irascible","lazy","malevolent","mendacity","nefarious","obstinate","ominous","oppressive","pernicious","petulant","pompous","procrastinate","reckless","resentful","sarcastic","scathing","selfish","toxic","truculent","vapid","vindictive","vociferous","volatile","wrath"],
  motivational: ["aspire","audacious","bold","breakthrough","capable","champion","commit","conquer","courage","dauntless","dedicated","determined","driven","embolden","endurance","excel","fearless","flourish","fortitude","grit","hardworking","impactful","indefatigable","inspire","integrity","lead","limitless","perseverance","persistent","pioneer","potential","powerful","proactive","purposeful","relentless","resilient","resolute","rise","selfless","soar","steadfast","strive","succeed","tenacious","thrive","transform","triumph","unwavering","valiant","visionary","zealous"],
  business: ["accountability","acquisition","agility","analytics","benchmark","capital","catalyst","collaborate","competitive","compliance","deliverable","differentiation","disruptive","ecosystem","efficiency","engagement","entrepreneur","equity","execution","forecast","framework","governance","growth","implementation","incentive","innovation","kpi","leadership","leverage","margin","metrics","milestone","monetize","negotiation","optimization","performance","pipeline","portfolio","prioritization","productivity","profitability","revenue","roadmap","scalability","stakeholder","strategy","sustainability","synergy","traction","transformation","transparency","venture","workflow"],
  academic: ["abstract","analysis","annotation","argument","assertion","bibliography","causation","citation","classification","coherence","commentary","conceptual","conclusion","contradiction","critical","critique","deduction","dialectic","discourse","empirical","epistemology","evaluate","evidence","exemplify","extrapolate","fallacy","generalization","hypothesis","implication","inductive","inference","interpretation","juxtaposition","methodology","narrative","ontology","paradigm","pedagogy","perspective","phenomenon","philosophy","premise","rationale","refute","rhetoric","synthesis","theoretical","thesis","variable","verification"],
  professional: ["accountability","articulate","assertive","authentic","collaborate","communication","competent","confident","credible","decisive","dedicated","diligent","diplomatic","effective","efficient","eloquent","empathetic","expertise","focused","innovative","integrity","leadership","meticulous","motivated","negotiation","objective","organized","persuasive","proactive","productive","proficient","reliable","resourceful","responsible","rigorous","savvy","skilled","strategic","thorough","transparent","trustworthy","versatile"],
  advanced: ["aberrant","abeyance","abstruse","acrimony","acumen","alacrity","ameliorate","anomalous","apathy","aplomb","arduous","astute","austere","belligerent","byzantine","callous","capricious","cogent","convoluted","copious","corroborate","culpable","cynical","dearth","debilitate","diligent","discern","disparate","equanimity","erudite","esoteric","fastidious","fortitude","garrulous","grandiloquent","hapless","hegemony","hubris","iconoclast","immutable","implacable","indefatigable","insidious","intractable","laconic","loquacious","magnanimous","mendacity","mercurial","meticulous","obtuse","onerous","ostracize","pander","parsimony","pedantic","perspicacious","pragmatic","querulous","recalcitrant","reticent","sagacious","sardonic","sycophant","taciturn","tenacious","ubiquitous","vacillate","vehement","venerable","verbose"],
  powerful: ["audacious","authoritative","bold","brilliant","command","compelling","confident","courageous","decisive","dominant","dynamic","eloquent","empower","exceptional","formidable","galvanize","impactful","influential","inspire","intrepid","invincible","lead","magnificent","masterful","momentous","noble","outstanding","passionate","persuasive","pivotal","potent","powerful","profound","resilient","resolute","robust","steadfast","tenacious","transform","triumphant","unstoppable","valiant","vibrant","visionary","zealous"],
  formal: ["accordingly","affirm","albeit","articulate","assert","cognizant","commence","concur","deem","deliberate","demonstrate","eloquent","endeavour","enumerate","explicit","facilitate","forthwith","henceforth","hereby","illustrate","implement","indicate","infer","mandate","moreover","nevertheless","notwithstanding","objective","pursuant","rectify","reiterate","substantiate","subsequently","thereof","thereby","thus","undertake","utilise","verify","whereas","whereby","wherefore"],
  simple: ["able","ask","big","call","care","clear","close","come","easy","fair","fast","feel","find","free","full","give","good","great","help","high","hold","know","large","last","lead","left","life","light","like","little","live","long","look","love","make","move","need","next","open","place","plan","play","point","read","right","see","seem","show","small","talk","tell","think","time","turn","walk","want","work","world","write","young"],
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

function Breadcrumb({ crumbs }: { crumbs: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {c.href ? <Link href={c.href} className="hover:text-foreground transition-colors">{c.label}</Link> : <span className="text-foreground font-medium">{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}

// ─── Letter page ───────────────────────────────────────────────────────────
function LetterPage({ letter }: { letter: string }) {
  const l = letter.toLowerCase();
  const words = UNIQUE_WORDS.filter((w) => w.toLowerCase().startsWith(l));
  useDocumentMeta(
    `Words Starting With ${letter.toUpperCase()} | Vocabulary List - LexigenZ`,
    `Browse ${words.length}+ English words starting with the letter ${letter.toUpperCase()}. Learn definitions, synonyms, and usage for each word on LexigenZ.`
  );
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Words", href: "/hub/dictionary" }, { label: `Words Starting With ${letter.toUpperCase()}` }]} />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Words Starting With <span className="text-primary uppercase">{letter}</span></h1>
        <p className="text-muted-foreground">{words.length} vocabulary words beginning with &ldquo;{letter.toUpperCase()}&rdquo; - click any word to see its full definition, synonyms, and usage.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {LETTERS.map((lt) => (
          <Link key={lt} href={`/words/starting-with/${lt}`}>
            <Badge variant={lt === l ? "default" : "outline"} className="cursor-pointer hover:opacity-80 uppercase text-sm w-8 justify-center py-1">{lt}</Badge>
          </Link>
        ))}
      </div>
      {words.length === 0 ? (
        <p className="text-muted-foreground">No words found starting with &ldquo;{letter.toUpperCase()}&rdquo; in our current list.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {words.map((w) => (
            <Link key={w} href={`/word/${w.replace(/\s+/g, "-")}`}>
              <div className="border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors cursor-pointer group">
                <span className="capitalize font-medium text-sm group-hover:text-primary transition-colors">{w}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Suffix page ───────────────────────────────────────────────────────────
function SuffixPage({ suffix }: { suffix: string }) {
  const s = suffix.toLowerCase();
  const words = UNIQUE_WORDS.filter((w) => w.toLowerCase().endsWith(s));
  useDocumentMeta(
    `Words Ending In -${suffix.toUpperCase()} | Vocabulary List - LexigenZ`,
    `Browse English words ending in "-${suffix}". Learn definitions, synonyms, and usage. Expand your vocabulary with LexigenZ.`
  );
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Words", href: "/hub/dictionary" }, { label: `Words Ending In -${suffix}` }]} />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Words Ending In <span className="text-primary">-{suffix}</span></h1>
        <p className="text-muted-foreground">{words.length} vocabulary words with the &ldquo;-{suffix}&rdquo; ending.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {SUFFIXES.map((sf) => (
          <Link key={sf} href={`/words/ending-with/${sf}`}>
            <Badge variant={sf === s ? "default" : "outline"} className="cursor-pointer hover:opacity-80 text-sm py-1">-{sf}</Badge>
          </Link>
        ))}
      </div>
      {words.length === 0 ? (
        <p className="text-muted-foreground">No words found ending in &ldquo;-{suffix}&rdquo; in our current list.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {words.map((w) => (
            <Link key={w} href={`/word/${w.replace(/\s+/g, "-")}`}>
              <div className="border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors cursor-pointer group">
                <span className="capitalize font-medium text-sm group-hover:text-primary transition-colors">{w}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Theme page ────────────────────────────────────────────────────────────
function ThemePage({ theme }: { theme: string }) {
  const words = THEME_WORDS[theme.toLowerCase()] ?? [];
  const label = theme.charAt(0).toUpperCase() + theme.slice(1);
  useDocumentMeta(
    `${label} Words | ${label} Vocabulary List - LexigenZ`,
    `Browse ${words.length}+ ${label.toLowerCase()} English words. Learn definitions and usage for ${label.toLowerCase()} vocabulary with LexigenZ.`
  );
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Words", href: "/hub/dictionary" }, { label: `${label} Words` }]} />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2"><span className="text-primary">{label}</span> Words</h1>
        <p className="text-muted-foreground">{words.length} curated {label.toLowerCase()} English vocabulary words - click any word to see its full definition.</p>
      </div>
      {words.length === 0 ? (
        <p className="text-muted-foreground">No words found for theme &ldquo;{theme}&rdquo;.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {words.map((w) => (
            <Link key={w} href={`/word/${w.replace(/\s+/g, "-")}`}>
              <div className="border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors cursor-pointer group">
                <span className="capitalize font-medium text-sm group-hover:text-primary transition-colors">{w}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Router component ──────────────────────────────────────────────────────
export function CategoryPage() {
  const params = useParams<{ type: string; value: string }>();
  const type = params.type as CategoryType;
  const value = params.value ?? "";

  if (type === "starting-with") return <LetterPage letter={value} />;
  if (type === "ending-with") return <SuffixPage suffix={value} />;
  if (type === "theme") return <ThemePage theme={value} />;
  return null;
}

export default CategoryPage;
