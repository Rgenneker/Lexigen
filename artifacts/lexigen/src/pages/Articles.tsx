import { motion } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Trophy, ChevronRight } from "lucide-react";
import { ARTICLES, CATEGORY_COLORS } from "@/data/articles";
import AdsterraAd from "@/components/AdsterraAd";
import AdsterraSocialBar from "@/components/AdsterraSocialBar";

export default function Articles() {
  return (
    <div className="min-h-screen bg-background">
      <AdsterraSocialBar />
      <AdsterraAd />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <BookOpen className="w-4 h-4" />
            Lexigenz Articles
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Words. Culture. Knowledge.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free reads for curious minds. No login required — just good writing about language, communication, and word power.
          </p>
        </motion.div>

        {/* World Championship banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <Link href="/bee/world-championship">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a0533] via-[#2d0a5e] to-[#0f1a4a] text-white px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl hover:shadow-violet-500/20 transition-shadow cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative flex items-center gap-5">
                <div className="text-4xl shrink-0">🏆</div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300/80 mb-0.5">Annual Global Event</p>
                  <h3 className="text-xl font-black leading-tight">World Spelling Bee Championship 2027</h3>
                  <p className="text-white/60 text-sm mt-1">3rd Saturday of June · 12:00 UTC · Open to all countries</p>
                </div>
              </div>
              <div className="relative flex items-center gap-2 shrink-0 bg-white/10 hover:bg-white/20 transition-colors rounded-full px-5 py-2.5 font-bold text-sm whitespace-nowrap">
                Register Free <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/articles/${article.id}`}>
                <div className="group h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer flex flex-col">
                  <div className="text-4xl mb-4">{article.emoji}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[article.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min
                    </span>
                  </div>
                  <h2 className="font-black text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read article →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-muted-foreground mt-14"
        >
          All articles authored by <span className="font-semibold">Lexigenz</span> · Free to read · No account required
        </motion.p>
      </div>
    </div>
  );
}
