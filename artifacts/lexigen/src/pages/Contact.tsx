import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Clock, MessageCircle, Headphones, Bug, Lightbulb } from "lucide-react";

const topics = [
  { icon: Headphones, label: "General enquiry" },
  { icon: Bug, label: "Report a bug" },
  { icon: Lightbulb, label: "Feature request" },
  { icon: MessageCircle, label: "Premium support" },
  { icon: Mail, label: "Legal / Privacy" },
  { icon: Mail, label: "Press & Media" },
];

export default function Contact() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast({ title: "Message sent!", description: "We'll get back to you within 48 hours." });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 mb-16"
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              WE'RE REAL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                PEOPLE.
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Got a question, a bug to report, or something brilliant to suggest? Our team in South Africa is listening.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl border border-border bg-card"
            >
              {sent ? (
                <div className="text-center space-y-4 py-12">
                  <div className="text-6xl">✉️</div>
                  <h3 className="text-2xl font-bold">Message received!</h3>
                  <p className="text-muted-foreground">
                    We aim to respond within 48 hours. Check your inbox — our reply will come from <strong>hello@lexigen.app</strong>.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); setTopic(""); }}
                    className="rounded-full border-primary/30 hover:border-primary mt-2"
                    data-testid="button-send-another"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                  {/* Topic selector */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What's this about?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {topics.map(t => (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => setTopic(t.label === topic ? "" : t.label)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-all ${
                            topic === t.label
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/30"
                          }`}
                          data-testid={`topic-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <t.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-xs">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="contact-name">Name</label>
                        <Input id="contact-name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required className="rounded-xl" data-testid="input-name" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="contact-email">Email</label>
                        <Input id="contact-email" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-xl" data-testid="input-email" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="contact-message">Message</label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us everything..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="rounded-xl resize-none"
                        data-testid="textarea-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 font-bold"
                      disabled={!name || !email || !message}
                      data-testid="button-submit-contact"
                    >
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {[
                {
                  icon: Mail,
                  label: "General",
                  value: "hello@lexigen.app",
                  href: "mailto:hello@lexigen.app",
                },
                {
                  icon: Mail,
                  label: "Privacy & Legal",
                  value: "legal@lexigen.app",
                  href: "mailto:legal@lexigen.app",
                },
                {
                  icon: Mail,
                  label: "Press & Media",
                  value: "press@lexigen.app",
                  href: "mailto:press@lexigen.app",
                },
                {
                  icon: MapPin,
                  label: "Registered Office",
                  value: "Lexigen Trading, South Africa",
                },
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Within 48 hours on business days",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-primary hover:underline mt-1 block">{item.value}</a>
                    ) : (
                      <p className="font-semibold mt-1">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5">
                <h3 className="font-bold mb-2">Looking for help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Many questions are already answered in our FAQ section.
                </p>
                <a href="/faq" className="text-sm font-bold text-primary hover:underline">Browse the FAQ →</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
