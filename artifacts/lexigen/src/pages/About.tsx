import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          NOT YOUR <br />
          <span className="text-primary">TEXTBOOK'S</span> VOCAB.
        </h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-2xl leading-relaxed font-medium">
            Lexigen is built to make daily vocabulary growth feel personal, playful, and meaningful.
          </p>
          
          <div className="h-px w-full bg-border my-8" />
          
          <h2 className="text-3xl font-bold">Mission</h2>
          <p>
            "We want every Gen Z learner to feel confident using words that matter."
          </p>
          
          <h2 className="text-3xl font-bold mt-12">Why Lexigen</h2>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex gap-4 items-start">
              <span className="text-accent font-bold mt-1">01.</span>
              <span><strong>Birth-based personalisation:</strong> Your words should match your energy.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-accent font-bold mt-1">02.</span>
              <span><strong>Gamified streaks:</strong> Growth requires consistency. We make it fun.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-accent font-bold mt-1">03.</span>
              <span><strong>Daily mood check-ins:</strong> Connect your feelings to your vocabulary.</span>
            </li>
          </ul>

          <div className="p-8 mt-12 bg-secondary text-secondary-foreground rounded-2xl border border-secondary-border">
            <h3 className="text-2xl font-bold mb-2">Our Promise</h3>
            <p className="text-secondary-foreground/80 m-0">Consistent growth, not quick fixes. We are building a global community, rooted in South Africa, ready to level up together.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
