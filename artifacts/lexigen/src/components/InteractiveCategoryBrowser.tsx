import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { RefreshCw, X, Loader2 } from "lucide-react";

export interface CategoryOption {
  id: string;
  label: string;
  words: string[];
}

interface DictDef {
  partOfSpeech: string;
  definition: string;
}

function pickRandom(pool: string[], n: number): string[] {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

interface Props {
  categories: CategoryOption[];
  wordCount?: number;
}

export function InteractiveCategoryBrowser({ categories, wordCount = 15 }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [definition, setDefinition] = useState<DictDef[] | null>(null);
  const [defLoading, setDefLoading] = useState(false);
  const [defError, setDefError] = useState(false);

  const loadCategory = useCallback((id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    setWords(pickRandom(cat.words, wordCount));
    setActiveId(id);
    setSelectedWord(null);
    setDefinition(null);
    setDefError(false);
  }, [categories, wordCount]);

  const refresh = useCallback(() => {
    if (!activeId) return;
    const cat = categories.find((c) => c.id === activeId);
    if (!cat) return;
    setWords(pickRandom(cat.words, wordCount));
    setSelectedWord(null);
    setDefinition(null);
    setDefError(false);
  }, [activeId, categories, wordCount]);

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
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );
      if (!res.ok) throw new Error("not found");
      const data = await res.json();
      const defs: DictDef[] = [];
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

  const closeDefinition = useCallback(() => {
    setSelectedWord(null);
    setDefinition(null);
    setDefError(false);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => loadCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeId === cat.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {categories.find((c) => c.id === activeId)?.label}
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
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 rounded-xl bg-background border border-border p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-black text-lg capitalize">{selectedWord}</h3>
                      <button
                        onClick={closeDefinition}
                        className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {defLoading && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading definition…
                      </div>
                    )}

                    {defError && !defLoading && (
                      <p className="text-sm text-muted-foreground">
                        Definition not found.{" "}
                        <Link href={`/word/${selectedWord}`} className="text-primary underline">
                          View full word page
                        </Link>
                      </p>
                    )}

                    {definition && !defLoading && (
                      <div className="space-y-2">
                        {definition.map((d, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold whitespace-nowrap mt-0.5">
                              {d.partOfSpeech}
                            </span>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {d.definition}
                            </p>
                          </div>
                        ))}
                        <Link
                          href={`/word/${selectedWord}`}
                          className="text-xs text-primary hover:underline mt-2 inline-block"
                        >
                          Synonyms, antonyms, examples
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
    </div>
  );
}
