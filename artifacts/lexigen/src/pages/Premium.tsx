import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetPremiumStatus, useUpgradeToPremium, getGetPremiumStatusQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Check, Zap, Lock, TrendingUp, Gamepad2, Palette, FileText, Crown } from "lucide-react";

const freeFeatures = [
  "Daily word delivery",
  "Birth archetype profile",
  "Streak tracking",
  "Word journal (5 entries)",
];

const premiumFeatures = [
  { icon: Zap, label: "Unlimited sentence builder" },
  { icon: TrendingUp, label: "Advanced monthly report" },
  { icon: Lock, label: "No ads, ever" },
  { icon: Palette, label: "Exclusive premium themes" },
  { icon: Gamepad2, label: "Unlimited word games access" },
  { icon: Crown, label: "Priority word recommendations" },
  { icon: FileText, label: "Extended word journal" },
  { icon: FileText, label: "Export journal to PDF" },
];

const plans = [
  { id: "monthly", label: "Monthly", price: "R49", period: "/month", highlight: false },
  { id: "annual", label: "Annual", price: "R399", period: "/year", badge: "Save 32%", highlight: true },
  { id: "lifetime", label: "Lifetime", price: "R999", period: "once", highlight: false },
];

const interactiveFeatures = [
  {
    title: "Your word, your way",
    desc: "Generate unlimited practice sentences, get contextual usage tips, and explore word families — all powered by your birth archetype.",
    icon: Zap,
  },
  {
    title: "Monthly growth reports",
    desc: "See how your vocabulary has expanded month by month. Track word categories, learning streaks, game scores, and archetype alignment.",
    icon: TrendingUp,
  },
  {
    title: "Unlimited game access",
    desc: "Play every Lexigen game as many times as you want. Compete on global leaderboards. Unlock exclusive game themes.",
    icon: Gamepad2,
  },
  {
    title: "Theme studio",
    desc: "Make Lexigen yours. Choose from 12+ exclusive premium themes — dark luxury, neon arcade, minimalist paper, and more.",
    icon: Palette,
  },
];

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const [isUpgraded, setIsUpgraded] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: premiumStatus } = useGetPremiumStatus();
  const upgradeMutation = useUpgradeToPremium();

  const handleUpgrade = () => {
    upgradeMutation.mutate(
      { data: { plan: selectedPlan, paymentToken: "demo_token" } },
      {
        onSuccess: () => {
          setIsUpgraded(true);
          queryClient.invalidateQueries({ queryKey: getGetPremiumStatusQueryKey() });
          toast({ title: "Welcome to Lexigen Premium!", description: "Your vocabulary journey just levelled up." });
        },
        onError: () => {
          toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
        },
      }
    );
  };

  const isPremium = premiumStatus?.isPremium || isUpgraded;

  if (isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <div className="relative">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.5)]">
              <Crown className="h-16 w-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent animate-ping opacity-40" />
          </div>

          <div>
            <Badge className="bg-primary/20 text-primary border-primary/30 font-bold tracking-widest text-xs uppercase mb-4">
              Premium Active
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
              You're in the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">inner circle.</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg max-w-lg mx-auto">
              Every premium feature is unlocked. Your vocabulary journey just got a serious upgrade.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {interactiveFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-2xl border border-primary/30 bg-primary/5 space-y-2"
                data-testid={`premium-feature-${i}`}
              >
                <f.icon className="h-5 w-5 text-primary" />
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-primary/30 hover:border-primary px-8 font-bold"
            onClick={() => window.history.back()}
            data-testid="button-back-to-app"
          >
            Back to App
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-accent/20 text-accent border-accent/30 font-bold tracking-widest text-xs uppercase mb-4">
              Premium
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              UNLOCK YOUR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                FULL POTENTIAL
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
              Free gets you started. Premium gets you there — faster, deeper, and with more satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-border bg-card"
            >
              <h3 className="text-2xl font-bold mb-1">Free</h3>
              <p className="text-4xl font-bold mb-6">R0 <span className="text-muted-foreground text-base font-normal">/ forever</span></p>
              <ul className="space-y-3">
                {freeFeatures.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)]"
            >
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground font-bold text-xs">Recommended</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">Premium</h3>
              <p className="text-4xl font-bold mb-6">
                <span className="text-primary">{plans.find(p => p.id === selectedPlan)?.price}</span>
                <span className="text-muted-foreground text-base font-normal ml-1">
                  {plans.find(p => p.id === selectedPlan)?.period}
                </span>
              </p>
              <ul className="space-y-3">
                {premiumFeatures.map(f => (
                  <li key={f.label} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plan Selector + CTA */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Choose your plan</h2>
            <div className="grid grid-cols-3 gap-3">
              {plans.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-4 rounded-2xl border-2 text-center transition-all ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                      : "border-border hover:border-primary/40"
                  }`}
                  data-testid={`button-plan-${plan.id}`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <div className="text-xs font-semibold text-muted-foreground mb-1">{plan.label}</div>
                  <div className="text-lg font-bold">{plan.price}</div>
                  <div className="text-xs text-muted-foreground">{plan.period}</div>
                </button>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all"
              onClick={handleUpgrade}
              disabled={upgradeMutation.isPending}
              data-testid="button-upgrade-premium"
            >
              {upgradeMutation.isPending ? "Processing..." : "Upgrade Now"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Cancel anytime. No hidden fees. Lexigen Premium — built in South Africa, for the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tighter text-center mb-12"
          >
            What premium actually feels like
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {interactiveFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all group"
                data-testid={`feature-card-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
