import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  FileSearch,
  Scale,
  Banknote,
  Target,
} from "lucide-react";

interface WhySectionProps {
  user: any;
}

const WhySection = ({ user }: WhySectionProps) => {
  const features = [
    {
      icon: FileSearch,
      title: "Détection des risques",
      desc: "Identification automatique des travaux votés, impayés et procédures en cours.",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: Banknote,
      title: "Impact financier",
      desc: "Estimation des charges futures et analyse de la santé financière de la copropriété.",
      gradient: "from-warning/10 to-warning/5",
    },
    {
      icon: Scale,
      title: "Conformité juridique",
      desc: "Vérification des diagnostics obligatoires et détection des clauses abusives.",
      gradient: "from-info/10 to-info/5",
    },
    {
      icon: ShieldCheck,
      title: "Données sécurisées",
      desc: "Chiffrement de bout en bout. Documents supprimés automatiquement après analyse.",
      gradient: "from-success/10 to-success/5",
    },
    {
      icon: Zap,
      title: "Résultats en 2 min",
      desc: "Notre technologie analyse chaque ligne de vos documents en quelques secondes.",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: Target,
      title: "Score de fiabilité",
      desc: "Un score clair de 0 à 100 pour évaluer la qualité globale du bien en un coup d'œil.",
      gradient: "from-info/10 to-info/5",
    },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Pourquoi Analymo
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Tout ce qu'il faut savoir
            <br />
            <span className="text-gradient">avant de signer</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-xl mx-auto">
            L'achat immobilier est l'investissement d'une vie. Notre outil d'analyse
            intelligente décrypte vos documents pour vous.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="group relative p-7 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to={user ? "/app/new-analysis" : "/signup"}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Lancer l'analyse
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
