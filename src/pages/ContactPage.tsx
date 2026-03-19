import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface ContactPageProps {
  user: any;
  onLogout?: () => void;
}

const ContactPage = ({ user, onLogout }: ContactPageProps) => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message envoyé ! Nous vous répondrons sous 24h.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Contact
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
              Une question ?
              <br />
              <span className="text-gradient">Parlons-en.</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Notre équipe vous répond sous 24 heures.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-[1fr,1.4fr] gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  desc: "contact@analymo.fr",
                  action: "mailto:contact@analymo.fr",
                },
                {
                  icon: MessageSquare,
                  title: "Réponse rapide",
                  desc: "Sous 24h en jours ouvrés",
                },
                {
                  icon: MapPin,
                  title: "Localisation",
                  desc: "Paris, France",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-2xl border border-border bg-background hover:border-primary/20 hover:shadow-md transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      {item.action ? (
                        <a href={item.action} className="text-sm text-primary hover:underline">
                          {item.desc}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Pro callout */}
              <motion.div
                className="p-6 rounded-2xl bg-foreground text-primary-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="font-bold text-lg mb-2">Offre Pro ?</h3>
                <p className="text-primary-foreground/60 text-sm mb-3">
                  Notaires, agents, syndics — demandez un devis personnalisé.
                </p>
                <a
                  href="mailto:contact@analymo.fr?subject=Offre Professionnelle"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-foreground/10 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/20 transition-colors"
                >
                  <Mail size={14} />
                  contact@analymo.fr
                </a>
              </motion.div>
            </div>

            {/* Contact form */}
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl border border-border bg-background"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Envoyez-nous un message</h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Nom</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    placeholder="votre@email.fr"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1.5">Sujet</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  placeholder="Question, demande de devis, partenariat..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/15 disabled:opacity-60"
              >
                {sending ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send size={16} />
                    Envoyer le message
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
