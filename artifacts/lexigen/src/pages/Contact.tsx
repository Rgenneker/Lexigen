import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3 mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Get in Touch</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Questions or feedback? Send us a message and we'll get back to you soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-8 md:p-10 rounded-3xl border border-border bg-card"
        >
          {sent ? (
            <div className="text-center space-y-4 py-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Message sent!</h3>
              <p className="text-muted-foreground">
                We'll get back to you soon at <strong>{email}</strong>.
              </p>
              <Button
                variant="outline"
                onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
                className="rounded-full border-border hover:border-primary mt-2"
                data-testid="button-send-another"
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" htmlFor="contact-name">Name</label>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="rounded-xl h-12"
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold" htmlFor="contact-email">Email</label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="rounded-xl h-12"
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold" htmlFor="contact-message">Message</label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us how we can help"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="rounded-xl resize-none"
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                disabled={!name || !email || !message}
                data-testid="button-submit-contact"
              >
                Send Message
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Mail className="h-4 w-4" />
          <span>Support email:</span>
          <a href="mailto:hello@lexigen.com" className="text-primary font-semibold hover:underline">
            hello@lexigen.com
          </a>
        </motion.div>
      </div>
    </div>
  );
}
