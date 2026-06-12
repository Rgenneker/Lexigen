import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSendInvite } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Globe, Users, Zap, Heart, BookOpen, Brain, Sparkles } from "lucide-react";

const articles = [
  {
    tag: "Memory Science",
    title: "Why Context Beats Repetition for Vocabulary Retention",
    excerpt: "Research consistently shows that encountering a word in a meaningful sentence — one you've written yourself — is 3x more effective than flashcard drilling. Here's the neuroscience behind why your Word Journal is your most powerful learning tool.",
    readTime: "5 min read",
    icon: Brain,
  },
  {
    tag: "Language Habits",
    title: "The 21-Day Word Habit: Building Fluency Through Daily Micro-Exposure",
    excerpt: "You don't need hours of study. You need seven minutes a day, every day. We break down the habit-stacking techniques that turn Lexigenz's daily word into a permanent shift in how you think and communicate.",
    readTime: "7 min read",
    icon: Sparkles,
  },
  {
    tag: "Social Learning",
    title: "Learning With Others: How Competitive Play Accelerates Word Memory",
    excerpt: "When you challenge a friend to a Wordle match or race through the Lexigenz Game together, your brain encodes vocabulary differently — and faster. Discover the science of social vocabulary building.",
    readTime: "6 min read",
    icon: Users,
  },
  {
    tag: "Gen Z & Language",
    title: "Code-Switching, Slang, and Standard English: Owning Every Register",
    excerpt: "Gen Z already communicates fluently across multiple linguistic registers. Formal English, internet slang, community vernacular — Lexigenz helps you master formal vocabulary without losing the voice that's already yours.",
    readTime: "8 min read",
    icon: Globe,
  },
  {
    tag: "Personal Growth",
    title: "Word Power Is Life Power: How Vocabulary Shapes Confidence and Opportunity",
    excerpt: "Studies link vocabulary size to career earnings, social confidence, and cognitive agility. This isn't about being 'proper' — it's about having more tools in your kit. More words means more ways to be understood, respected, and heard.",
    readTime: "6 min read",
    icon: Zap,
  },
];

const benefits = [
  {
    icon: Globe,
    title: "No borders, no barriers",
    desc: "Challenge anyone, anywhere. Your word game arena spans 19 languages and every timezone.",
  },
  {
    icon: Heart,
    title: "Build real connection",
    desc: "Shared learning is the most underrated form of bonding. Play a round, learn something, grow together.",
  },
  {
    icon: Zap,
    title: "Stay in your own space",
    desc: "No commute. No awkward scheduling. Challenge your cousin in Johannesburg while you're in your kitchen in Tokyo.",
  },
  {
    icon: Users,
    title: "Accountability built in",
    desc: "When your friends see your streak, you'll think twice about breaking it. Healthy pressure, real results.",
  },
];

export default function Invite() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [game, setGame] = useState("Wordle");
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const sendInvite = useSendInvite();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sendInvite.mutate(
      { data: { recipientEmail: email, message: message || null, challengeGame: game } },
      {
        onSuccess: () => {
          setSent(true);
          toast({ title: "Invite sent!", description: `Your challenge to ${email} is on its way.` });
        },
        onError: () => {
          toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background -z-10" />
        <div className="container mx-auto max-w-5xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              Invite & Challenge
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
              WORDS WITHOUT
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                BORDERS.
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Vocabulary is better together. Challenge someone you love to a word game from wherever you are in the world — no flights required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-base">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Invite Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl border border-border bg-card shadow-[0_0_60px_rgba(139,92,246,0.1)]"
          >
            {sent ? (
              <div className="text-center space-y-4 py-8">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold">Challenge sent!</h2>
                <p className="text-muted-foreground">
                  Your friend is about to get their vocabulary tested. May the best wordsmith win.
                </p>
                <Button
                  onClick={() => { setSent(false); setEmail(""); setMessage(""); }}
                  variant="outline"
                  className="mt-4 rounded-full border-primary/30 hover:border-primary"
                  data-testid="button-invite-another"
                >
                  Invite someone else
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">Send a challenge</h2>
                <p className="text-muted-foreground mb-8">
                  Let your people know you're on Lexigenz — and that you're ready for a rematch.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold" htmlFor="invite-email">
                      Friend's email
                    </label>
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="their@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="rounded-xl h-12"
                      data-testid="input-invite-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Challenge game</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Wordle", "Lexigenz Game", "Word Grid"].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGame(g)}
                          className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                            game === g
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/30"
                          }`}
                          data-testid={`button-game-${g.replace(/\s+/g, "-").toLowerCase()}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold" htmlFor="invite-message">
                      Personal message (optional)
                    </label>
                    <Textarea
                      id="invite-message"
                      placeholder="Think you can beat me? Let's find out..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="rounded-xl resize-none"
                      rows={3}
                      data-testid="textarea-invite-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                    disabled={sendInvite.isPending || !email}
                    data-testid="button-send-invite"
                  >
                    {sendInvite.isPending ? "Sending..." : "Send Challenge"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-accent bg-accent/10 px-4 py-1.5 rounded-full mb-4">
              Learn More
            </span>
            <h2 className="text-4xl font-bold tracking-tighter">
              Become a better wordsmith — fast.
            </h2>
            <p className="text-muted-foreground mt-2">Original insights on language, memory, and growth.</p>
          </motion.div>

          <div className="space-y-6">
            {articles.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] transition-all cursor-pointer group"
                data-testid={`article-card-${i}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <article.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs font-bold bg-secondary/20 text-secondary-foreground rounded-full">
                        {article.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{article.excerpt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
