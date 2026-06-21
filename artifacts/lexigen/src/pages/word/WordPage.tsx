import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Volume2, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type PageType = "definition" | "synonyms" | "antonyms" | "in-a-sentence" | "advanced-alternatives";

interface DictionaryEntry {
  word: string;
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  sourceUrls?: string[];
}

function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.content ?? "";
    if (meta) meta.content = description;
    return () => {
      document.title = prev;
      if (meta) meta.content = prevDesc;
    };
  }, [title, description]);
}

function useWordData(word: string) {
  const [data, setData] = useState<DictionaryEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setData(null);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [word]);

  return { data, loading, error };
}

function WordBreadcrumb({ word, type }: { word: string; type: PageType }) {
  const base = `/word/${word}`;
  const crumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Words", href: "/hub/dictionary" },
    { label: word.charAt(0).toUpperCase() + word.slice(1), href: base },
    ...(type !== "definition" ? [{ label: type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }] : []),
  ];
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

function SubPageNav({ word, active }: { word: string; active: PageType }) {
  const tabs: { type: PageType; label: string; href: string }[] = [
    { type: "definition", label: "Definition", href: `/word/${word}` },
    { type: "synonyms", label: "Synonyms", href: `/word/${word}/synonyms` },
    { type: "antonyms", label: "Antonyms", href: `/word/${word}/antonyms` },
    { type: "in-a-sentence", label: "In a Sentence", href: `/word/${word}/in-a-sentence` },
    { type: "advanced-alternatives", label: "Advanced Alternatives", href: `/word/${word}/advanced-alternatives` },
  ];
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
      {tabs.map((t) => (
        <Link key={t.type} href={t.href}>
          <Badge
            variant={active === t.type ? "default" : "outline"}
            className="cursor-pointer hover:opacity-80 transition-opacity text-sm py-1 px-3"
          >
            {t.label}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-muted rounded w-48" />
      <div className="h-4 bg-muted rounded w-full max-w-lg" />
      <div className="h-4 bg-muted rounded w-full max-w-md" />
      <div className="h-4 bg-muted rounded w-full max-w-sm" />
    </div>
  );
}

// ─── Definition Page ───────────────────────────────────────────────────────
function DefinitionView({ word, data }: { word: string; data: DictionaryEntry[] }) {
  const entry = data[0];
  useDocumentMeta(
    `Meaning of ${word} | Definition, Usage & Examples — LexigenZ`,
    `What does ${word} mean? Full definition, pronunciation, part of speech, and example sentences for "${word}". Learn advanced vocabulary on LexigenZ.`
  );

  function speak() {
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-US";
    speechSynthesis.speak(u);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold capitalize mb-1">{word}</h1>
          {entry.phonetic && <p className="text-muted-foreground text-lg font-mono">{entry.phonetic}</p>}
        </div>
        <Button variant="outline" size="sm" onClick={speak} className="mt-2">
          <Volume2 className="w-4 h-4 mr-1" /> Pronounce
        </Button>
      </div>

      {entry.meanings.map((m, mi) => (
        <section key={mi} className="space-y-4">
          <Badge variant="secondary" className="text-sm capitalize">{m.partOfSpeech}</Badge>
          <ol className="space-y-4 list-none">
            {m.definitions.slice(0, 5).map((d, di) => (
              <li key={di} className="border-l-2 border-primary/30 pl-4 space-y-1">
                <p className="text-foreground leading-relaxed">
                  <span className="text-muted-foreground text-sm mr-2">{di + 1}.</span>
                  {d.definition}
                </p>
                {d.example && (
                  <p className="text-muted-foreground text-sm italic">
                    &ldquo;{d.example}&rdquo;
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}

      <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-border">
        {(() => {
          const allSynonyms = [...new Set(entry.meanings.flatMap((m) => m.synonyms))].slice(0, 10);
          const allAntonyms = [...new Set(entry.meanings.flatMap((m) => m.antonyms))].slice(0, 10);
          return (
            <>
              {allSynonyms.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Synonyms</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSynonyms.map((s) => (
                      <Link key={s} href={`/word/${s}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">{s}</Badge>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/word/${word}/synonyms`} className="text-sm text-primary hover:underline mt-2 inline-block">
                    See all synonyms →
                  </Link>
                </div>
              )}
              {allAntonyms.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Antonyms</h3>
                  <div className="flex flex-wrap gap-2">
                    {allAntonyms.map((a) => (
                      <Link key={a} href={`/word/${a}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">{a}</Badge>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/word/${word}/antonyms`} className="text-sm text-primary hover:underline mt-2 inline-block">
                    See all antonyms →
                  </Link>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {(entry.sourceUrls?.length ?? 0) > 0 && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          Source: <a href={entry.sourceUrls![0]} target="_blank" rel="noopener noreferrer" className="hover:underline">{entry.sourceUrls![0]}</a>
        </p>
      )}
    </div>
  );
}

// ─── Synonyms Page ─────────────────────────────────────────────────────────
function SynonymsView({ word, data }: { word: string; data: DictionaryEntry[] }) {
  const synonyms = [...new Set(data.flatMap((e) => e.meanings.flatMap((m) => m.synonyms)))];
  useDocumentMeta(
    `Synonyms of "${word}" — Full List | LexigenZ`,
    `Complete list of synonyms for "${word}". Discover words with similar meanings and expand your vocabulary with LexigenZ.`
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Synonyms of <span className="text-primary capitalize">{word}</span></h1>
        <p className="text-muted-foreground">Words with similar or related meanings to &ldquo;{word}&rdquo;</p>
      </div>
      {synonyms.length === 0 ? (
        <p className="text-muted-foreground">No synonyms found in our dictionary for this word.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {synonyms.map((s) => (
            <Link key={s} href={`/word/${s}`}>
              <div className="border border-border rounded-lg px-4 py-2 hover:bg-muted transition-colors cursor-pointer group">
                <span className="font-medium capitalize">{s}</span>
                <ArrowRight className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Antonyms Page ─────────────────────────────────────────────────────────
function AntonymsView({ word, data }: { word: string; data: DictionaryEntry[] }) {
  const antonyms = [...new Set(data.flatMap((e) => e.meanings.flatMap((m) => m.antonyms)))];
  useDocumentMeta(
    `Antonyms of "${word}" — Opposite Words | LexigenZ`,
    `What is the opposite of "${word}"? Full list of antonyms and opposite words. Improve your vocabulary contrast with LexigenZ.`
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Antonyms of <span className="text-primary capitalize">{word}</span></h1>
        <p className="text-muted-foreground">Words with opposite or contrasting meanings to &ldquo;{word}&rdquo;</p>
      </div>
      {antonyms.length === 0 ? (
        <p className="text-muted-foreground">No antonyms found in our dictionary for this word.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {antonyms.map((a) => (
            <Link key={a} href={`/word/${a}`}>
              <div className="border border-border rounded-lg px-4 py-2 hover:bg-muted transition-colors cursor-pointer group">
                <span className="font-medium capitalize">{a}</span>
                <ArrowRight className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── In a Sentence Page ────────────────────────────────────────────────────
function InASentenceView({ word, data }: { word: string; data: DictionaryEntry[] }) {
  const examples = data
    .flatMap((e) => e.meanings.flatMap((m) => m.definitions.map((d) => d.example)))
    .filter(Boolean) as string[];
  useDocumentMeta(
    `"${word}" in a Sentence — Examples & Usage | LexigenZ`,
    `How to use "${word}" in a sentence. Real example sentences showing correct usage of "${word}". Improve your vocabulary and writing skills.`
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2"><span className="text-primary capitalize">{word}</span> in a Sentence</h1>
        <p className="text-muted-foreground">Example sentences showing how to use &ldquo;{word}&rdquo; correctly</p>
      </div>
      {examples.length === 0 ? (
        <p className="text-muted-foreground">No example sentences found for this word in our dictionary.</p>
      ) : (
        <div className="space-y-4">
          {examples.map((ex, i) => (
            <div key={i} className="border-l-4 border-primary/40 pl-4 py-2 bg-muted/30 rounded-r-lg">
              <p className="text-foreground leading-relaxed italic">&ldquo;{ex}&rdquo;</p>
              <p className="text-xs text-muted-foreground mt-1">Example {i + 1}</p>
            </div>
          ))}
        </div>
      )}
      <div className="pt-4 border-t border-border">
        <h2 className="font-semibold mb-2">Practice using &ldquo;{word}&rdquo;</h2>
        <p className="text-muted-foreground text-sm">Try incorporating this word into your daily writing. Add it to your word journal on LexigenZ to track your progress.</p>
        <Link href="/app">
          <Button className="mt-3" size="sm">Open Word Journal <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Advanced Alternatives Page ────────────────────────────────────────────
function AdvancedAlternativesView({ word, data }: { word: string; data: DictionaryEntry[] }) {
  const synonyms = [...new Set(data.flatMap((e) => e.meanings.flatMap((m) => m.synonyms)))];
  useDocumentMeta(
    `Advanced Alternatives to "${word}" | Sophisticated Synonyms — LexigenZ`,
    `Looking for a more sophisticated word than "${word}"? Discover advanced vocabulary alternatives and elevate your English with LexigenZ.`
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Advanced Alternatives to <span className="text-primary capitalize">{word}</span></h1>
        <p className="text-muted-foreground">Sophisticated vocabulary options to replace &ldquo;{word}&rdquo; in formal, professional, or academic writing</p>
      </div>
      {synonyms.length === 0 ? (
        <p className="text-muted-foreground">No advanced alternatives found in our dictionary for this word.</p>
      ) : (
        <div className="space-y-3">
          {synonyms.slice(0, 20).map((s) => (
            <Link key={s} href={`/word/${s}`}>
              <div className="flex items-center justify-between border border-border rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer group">
                <div>
                  <span className="font-semibold capitalize">{s}</span>
                  <p className="text-sm text-muted-foreground">Click to see full definition and usage</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="pt-4 border-t border-border bg-muted/30 rounded-lg p-4">
        <h2 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Build your advanced vocabulary</h2>
        <p className="text-muted-foreground text-sm mb-3">LexigenZ delivers a personalised advanced word every day — tailored to your learning style and archetype.</p>
        <Link href="/"><Button size="sm">Get Your Daily Word <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div>
    </div>
  );
}

// ─── Error State ───────────────────────────────────────────────────────────
function WordNotFound({ word }: { word: string }) {
  useDocumentMeta(
    `"${word}" — Word Reference | LexigenZ`,
    `Looking up "${word}". Explore vocabulary, definitions, and more on LexigenZ.`
  );
  return (
    <div className="text-center py-16 space-y-4">
      <div className="text-5xl">📖</div>
      <h1 className="text-2xl font-bold capitalize">{word}</h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        We couldn&apos;t find a dictionary entry for &ldquo;{word}&rdquo;. It may be a proper noun, abbreviation, or specialised term.
      </p>
      <div className="flex justify-center gap-3 flex-wrap pt-2">
        <Link href="/"><Button variant="outline">Home</Button></Link>
        <Link href="/hub/dictionary"><Button>Browse Words</Button></Link>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────
export function WordPage({ type = "definition", slug: slugProp }: { type?: PageType; slug?: string }) {
  const params = useParams<{ slug: string }>();
  const slug = slugProp ?? params.slug ?? "";
  const word = slug.replace(/-/g, " ");
  const { data, loading, error } = useWordData(word);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <WordBreadcrumb word={slug} type={type} />
      <SubPageNav word={slug} active={type} />

      <motion.div
        key={`${slug}-${type}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading && <LoadingState />}
        {error && <WordNotFound word={word} />}
        {data && !loading && (
          <>
            {type === "definition" && <DefinitionView word={word} data={data} />}
            {type === "synonyms" && <SynonymsView word={word} data={data} />}
            {type === "antonyms" && <AntonymsView word={word} data={data} />}
            {type === "in-a-sentence" && <InASentenceView word={word} data={data} />}
            {type === "advanced-alternatives" && <AdvancedAlternativesView word={word} data={data} />}
          </>
        )}
      </motion.div>

      {/* Related words footer */}
      {data && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Explore More Words</h2>
          <div className="flex flex-wrap gap-2">
            {[...new Set(data.flatMap((e) => e.meanings.flatMap((m) => [...m.synonyms, ...m.antonyms])))].slice(0, 12).map((w) => (
              <Link key={w} href={`/word/${w}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted capitalize">{w}</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* JSON-LD for this word page */}
      {data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DefinedTerm",
              name: word,
              description: data[0]?.meanings[0]?.definitions[0]?.definition ?? "",
              inDefinedTermSet: {
                "@type": "DefinedTermSet",
                name: "LexigenZ Vocabulary Dictionary",
                url: "https://lexigenz.com/hub/dictionary",
              },
              url: `https://lexigenz.com/word/${slug}`,
            }),
          }}
        />
      )}
    </div>
  );
}

export default WordPage;
