import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Share2, Check, BookOpen } from "lucide-react";
import { useState } from "react";
import { ARTICLES, CATEGORY_COLORS } from "@/data/articles";
import NotFound from "@/pages/not-found";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const article = ARTICLES.find((a) => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) return <NotFound />;

  const currentIndex = ARTICLES.findIndex((a) => a.id === id);
  const prev = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const next = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/articles">
            <Button variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" />
              All Articles
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[article.category] ?? "bg-muted text-muted-foreground border-border"}`}>
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} min read
            </span>
          </div>

          <div className="text-5xl mb-5">{article.emoji}</div>

          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between mb-10 pb-8 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>Authored by <strong className="text-foreground">Lexigenz</strong></span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
              {copied ? "Copied!" : "Share"}
            </Button>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed">
            {article.body}
          </div>

          <div className="mt-14 pt-10 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-8">
              All articles authored by <strong>Lexigenz</strong> · Free to read · No account required
            </p>

            <div className="grid grid-cols-2 gap-4">
              {prev ? (
                <Link href={`/articles/${prev.id}`}>
                  <div className="group p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                    <p className="text-xs text-muted-foreground mb-1">← Previous</p>
                    <p className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link href={`/articles/${next.id}`}>
                  <div className="group p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer text-right">
                    <p className="text-xs text-muted-foreground mb-1">Next →</p>
                    <p className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {next.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="text-center mt-8">
              <Link href="/articles">
                <Button variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse all articles
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
