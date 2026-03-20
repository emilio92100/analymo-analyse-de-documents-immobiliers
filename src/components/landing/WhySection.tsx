import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  FileSearch,
  Scale,
  Banknote,
  Target,
  Lock,
  Clock,
} from "lucide-react";
import { useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

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
    color: "hsl(var(--primary))",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Résultats en 2 min",
    desc: "Notre technologie analyse chaque ligne en quelques secondes. Fini les heures de lecture fastidieuse.",
    stat: "< 2min",
    statLabel: "temps d'analyse",
    color: "hsl(160, 60%, 42%)",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Banknote,
    title: "Impact financier",
    desc: "Estimation des charges futures et analyse de la santé financière de la copropriété.",
    stat: "12k€",
    statLabel: "économie moyenne",
    color: "hsl(38, 92%, 50%)",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Scale,
    title: "Conformité juridique",
    desc: "Vérification des diagnostics obligatoires et détection des clauses abusives.",
    stat: "100%",
    statLabel: "conformité vérifiée",
    color: "hsl(210, 80%, 55%)",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Lock,
    title: "Sécurité totale",
    desc: "Chiffrement de bout en bout, infrastructure bancaire. Documents supprimés après analyse.",
    stat: "0",
    statLabel: "donnée conservée",
    color: "hsl(270, 60%, 55%)",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Target,
    title: "Score de fiabilité",
    desc: "Un score clair de 0 à 100 pour évaluer la qualité globale du bien d'un seul coup d'œil.",
    stat: "78/100",
    statLabel: "score moyen",
    color: "hsl(var(--primary))",
    bgColor: "bg-primary/10",
  },
];

const WhySection = ({ user }: WhySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/3 blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          title="Pourquoi"
          highlight="Analymo ?"
          subtitle="L'achat immobilier est l'investissement d'une vie. Notre IA décrypte vos documents pour que vous achetiez en toute sérénité."
        />

        {/* Interactive feature showcase */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          {/* Left — Feature selector tabs */}
          <div className="flex flex-col gap-2">
            {features.map((feature, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`group relative text-left p-5 rounded-2xl transition-all duration-400 ${
                  activeIndex === i
                    ? "bg-foreground text-primary-foreground shadow-2xl shadow-foreground/10"
                    : "bg-transparent hover:bg-muted/50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      activeIndex === i ? "bg-white/15" : feature.bgColor
                    }`}
                  >
                    <feature.icon
                      size={20}
                      style={{ color: activeIndex === i ? "white" : feature.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-bold text-base transition-colors ${
                        activeIndex === i ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {feature.title}
                    </h4>
                    {activeIndex === i && (
                      <motion.p
                        className="text-primary-foreground/60 text-sm mt-1 leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature.desc}
                      </motion.p>
                    )}
                  </div>
                  <span
                    className={`text-lg font-black shrink-0 transition-colors ${
                      activeIndex === i ? "text-primary-foreground/40" : "text-muted-foreground/20"
                    }`}
                  >
                    {feature.stat}
                  </span>
                </div>

                {/* Active indicator line */}
                {activeIndex === i && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-primary"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right — Active feature showcase */}
          <motion.div
            className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Dynamic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/90" />
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/10 blur-[80px]" />
            <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-white/5 blur-[60px]" />

            {/* Content */}
            <motion.div
              key={activeIndex}
              className="relative p-10 md:p-14 text-primary-foreground w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8"
              >
                {(() => {
                  const Icon = features[activeIndex].icon;
                  return <Icon size={30} className="text-primary-foreground" />;
                })()}
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-4">
                {features[activeIndex].title}
              </h3>
              <p className="text-primary-foreground/60 text-lg leading-relaxed max-w-md mb-10">
                {features[activeIndex].desc}
              </p>

              {/* Big stat */}
              <div className="flex items-end gap-4">
                <motion.span
                  className="text-7xl md:text-8xl font-black text-primary-foreground/15"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {features[activeIndex].stat}
                </motion.span>
                <span className="text-xs text-primary-foreground/30 uppercase tracking-wider font-medium pb-4">
                  {features[activeIndex].statLabel}
                </span>
              </div>

              {/* Progress dots */}
              <div className="absolute bottom-6 right-6 flex gap-1.5">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-white w-6" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
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
