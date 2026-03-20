import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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

const features = [
  {
    icon: FileSearch,
    title: "Détection des risques",
    desc: "Identification automatique des travaux votés, impayés et procédures en cours dans vos PV d'AG.",
    stat: "98%",
    statLabel: "de risques détectés",
  },
  {
    icon: Banknote,
    title: "Impact financier",
    desc: "Estimation des charges futures et analyse complète de la santé financière de la copropriété.",
    stat: "12k€",
    statLabel: "économisés en moyenne",
  },
  {
    icon: Scale,
    title: "Conformité juridique",
    desc: "Vérification des diagnostics obligatoires et détection automatique des clauses abusives.",
    stat: "100%",
    statLabel: "des diagnostics vérifiés",
  },
  {
    icon: ShieldCheck,
    title: "Données sécurisées",
    desc: "Chiffrement de bout en bout. Vos documents sont supprimés automatiquement après l'analyse.",
    stat: "0",
    statLabel: "donnée conservée",
  },
  {
    icon: Zap,
    title: "Résultats en 2 min",
    desc: "Notre technologie analyse chaque ligne de vos documents en quelques secondes seulement.",
    stat: "< 2min",
    statLabel: "par analyse",
  },
  {
    icon: Target,
    title: "Score de fiabilité",
    desc: "Un score clair de 0 à 100 pour évaluer la qualité globale du bien en un coup d'œil.",
    stat: "0-100",
    statLabel: "score précis",
  },
];

const WhySection = ({ user }: WhySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/3 blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Massive animated header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary text-sm font-bold uppercase tracking-widest mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pourquoi Analymo
          </motion.span>

          <div className="max-w-5xl">
            <h2 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black text-foreground leading-[1.02]">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Tout ce qu'il faut
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                savoir{" "}
                <span className="text-gradient relative inline-block">
                  avant de signer
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </span>
              </motion.span>
            </h2>
          </div>

          <motion.p
            className="text-muted-foreground text-xl max-w-xl mt-8 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            L'achat immobilier est l'investissement d'une vie. Notre IA décrypte
            vos documents pour que vous achetiez en toute sérénité.
          </motion.p>
        </motion.div>

        {/* Feature rows — alternating layout with big numbers */}
        <div className="space-y-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="relative flex items-center gap-6 md:gap-10 p-6 md:p-8 rounded-2xl border border-transparent hover:border-border hover:bg-background/80 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-default">
                {/* Number */}
                <motion.div
                  className="hidden sm:flex shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/5 items-center justify-center group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-2xl md:text-3xl font-black text-primary/60 group-hover:text-primary transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>

                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/12 transition-all duration-300">
                  <feature.icon size={24} className="text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-1 max-w-xl">
                    {feature.desc}
                  </p>
                </div>

                {/* Stat */}
                <div className="hidden md:block text-right shrink-0">
                  <motion.p
                    className="text-3xl lg:text-4xl font-black text-primary/20 group-hover:text-primary/80 transition-colors duration-500"
                    whileInView={{ scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    {feature.stat}
                  </motion.p>
                  <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mt-1">
                    {feature.statLabel}
                  </p>
                </div>

                {/* Animated arrow on hover */}
                <motion.div
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ArrowRight size={20} className="text-primary" />
                </motion.div>

                {/* Progress line at bottom */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-border/50" />
                <motion.div
                  className="absolute bottom-0 left-8 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to={user ? "/app/new-analysis" : "/signup"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/20 group"
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
