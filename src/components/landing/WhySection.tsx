import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  FileSearch,
  Scale,
  Banknote,
  Target,
} from "lucide-react";
import { useRef } from "react";

interface WhySectionProps {
  user: any;
}

const FeatureCard = ({
  item,
  index,
}: {
  item: { icon: any; title: string; desc: string; accent: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="relative p-8 rounded-3xl bg-card border border-border overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Accent glow on hover */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${item.accent} opacity-0 group-hover:opacity-100 blur-[60px] transition-opacity duration-500`}
        />

        <div className="relative">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors duration-300"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <item.icon size={26} className="text-primary" />
          </motion.div>

          <h3 className="font-bold text-foreground text-xl mb-3">{item.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </motion.div>
    </motion.div>
  );
};

const WhySection = ({ user }: WhySectionProps) => {
  const features = [
    {
      icon: FileSearch,
      title: "Détection des risques",
      desc: "Identification automatique des travaux votés, impayés et procédures en cours.",
      accent: "bg-primary/20",
    },
    {
      icon: Banknote,
      title: "Impact financier",
      desc: "Estimation des charges futures et analyse de la santé financière de la copropriété.",
      accent: "bg-warning/20",
    },
    {
      icon: Scale,
      title: "Conformité juridique",
      desc: "Vérification des diagnostics obligatoires et détection des clauses abusives.",
      accent: "bg-info/20",
    },
    {
      icon: ShieldCheck,
      title: "Données sécurisées",
      desc: "Chiffrement de bout en bout. Documents supprimés automatiquement après analyse.",
      accent: "bg-success/20",
    },
    {
      icon: Zap,
      title: "Résultats en 2 min",
      desc: "Notre technologie analyse chaque ligne de vos documents en quelques secondes.",
      accent: "bg-primary/20",
    },
    {
      icon: Target,
      title: "Score de fiabilité",
      desc: "Un score clair de 0 à 100 pour évaluer la qualité globale du bien en un coup d'œil.",
      accent: "bg-info/20",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/3 blur-[150px]" />
        <motion.div
          className="absolute top-1/4 right-0 w-2 h-2 rounded-full bg-primary/30"
          animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-10 w-3 h-3 rounded-full bg-primary/20"
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary text-sm font-bold uppercase tracking-widest mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Pourquoi Analymo
          </motion.span>

          <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-black text-foreground leading-[1.05] mb-6">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Tout ce qu'il faut
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              savoir{" "}
              <span className="text-gradient relative">
                avant de signer
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </span>
            </motion.span>
          </h2>

          <motion.p
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            L'achat immobilier est l'investissement d'une vie. Notre outil d'analyse
            intelligente décrypte vos documents pour vous.
          </motion.p>
        </motion.div>

        {/* Feature grid with 3D tilt cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <FeatureCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to={user ? "/app/new-analysis" : "/signup"}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 group"
          >
            Lancer l'analyse
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
