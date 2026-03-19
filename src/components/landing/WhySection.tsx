import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Scale,
  Banknote,
} from "lucide-react";

interface WhySectionProps {
  user: any;
}

const WhySection = ({ user }: WhySectionProps) => {
  const checkpoints = [
    { icon: FileSearch, text: "Identification des travaux votés ou à prévoir" },
    { icon: Banknote, text: "Analyse de la santé financière de la copropriété" },
    { icon: Scale, text: "Détection des procédures judiciaires en cours" },
    { icon: ShieldCheck, text: "Vérification de la conformité des diagnostics" },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Sécurité Maximale",
      desc: "Vos données sont cryptées et anonymisées. Documents supprimés après analyse.",
    },
    {
      icon: Zap,
      title: "Rapidité Inégalée",
      desc: "Analyse complète en moins de 2 minutes grâce à notre IA spécialisée.",
    },
    {
      icon: Lock,
      title: "Précision Chirurgicale",
      desc: "Détection des clauses abusives, risques financiers et vices cachés.",
    },
  ];

  return (
    <section className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Pourquoi choisir Analymo ?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            L'achat d'un bien immobilier est souvent l'investissement d'une vie.
            Ne laissez pas une lecture rapide compromettre votre avenir financier.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Checkpoints */}
          <div>
            <div className="space-y-4 mb-8">
              {checkpoints.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border card-hover"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to={user ? "/app/new-analysis" : "/signup"}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                Commencer gratuitement
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Right — Feature cards */}
          <div className="grid gap-4">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-card border border-border card-hover"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
