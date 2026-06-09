import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 flex-1 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        
        <div className="container px-4 mx-auto text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              LEVEL UP YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                WORDS
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            A personalized daily vocabulary app where language learning feels like a game and a vibe check.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-8"
          >
            <Link href="/app">
              <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mini Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 w-full max-w-3xl mx-auto px-4"
        >
          <div className="aspect-[16/9] rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden relative flex items-center justify-center">
            {/* Animated Demo Placeholder */}
            <div className="text-center space-y-4">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl font-mono font-bold text-primary"
              >
                effervescent
              </motion.div>
              <p className="text-muted-foreground font-mono">adj. vivacious and enthusiastic.</p>
              <div className="flex justify-center gap-2 pt-4">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold uppercase">Streak: 12</span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase">Maverick</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features teaser */}
      <section className="py-24 bg-card">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-background border">
              <h3 className="text-2xl font-bold mb-4">Birth-based Archetypes</h3>
              <p className="text-muted-foreground">Your birth chart meets your vocab. Get words tailored to your personality vibe.</p>
            </div>
            <div className="p-8 rounded-2xl bg-background border">
              <h3 className="text-2xl font-bold mb-4">Gamified Streaks</h3>
              <p className="text-muted-foreground">Keep your streak alive. Unlock badges. Flex on your friends.</p>
            </div>
            <div className="p-8 rounded-2xl bg-background border">
              <h3 className="text-2xl font-bold mb-4">Word Games</h3>
              <p className="text-muted-foreground">Wordle, Crosswords, Spelling Bee. Play daily to cement your knowledge.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
