import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-3">{title}</h1>
          <p className="text-sm text-muted-foreground mb-12 pb-12 border-b border-border">
            Last updated: {updated}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted-foreground [&_ul]:space-y-2 [&_li]:leading-relaxed [&_a]:text-primary">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
