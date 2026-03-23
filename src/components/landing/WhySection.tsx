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
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

interface WhySectionProps {
  user: any;
}

const WhySection = ({ user }: WhySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const analysisValues = [
    {
      icon: AlertTriangle,
      title: "Risques détectés",
      items: ["Travaux votés non réalisés", "Impayés de copropriétaires", "Procédures judiciaires en cours"],
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      icon: Banknote,
      title: "Santé financière",
      items: ["Budget prévisionnel analysé", "Fonds de travaux évalué", "Charges futures estimées"],
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      icon: Scale,
      title: "Conformité juridique",
      items: ["Diagnostics obligatoires vérifiés", "Clauses abusives identifiées", "Règlement de copropriété"],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: TrendingUp,
      title: "Potentiel du bien",
      items: ["Historique des travaux réalisés", "État général de l'immeuble", "Valorisation estimée"],
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/3 blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          title="Pourquoi"
          highlight="Analymo ?"
          subtitle="L'achat immobilier est l'investissement d'une vie. Notre outil décrypte vos documents pour que vous achetiez en toute sérénité."
          center
        />

        {/* Central score + analysis showcase */}
        <div className="relative mb-14">
          {/* Score hero card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-foreground text-primary-foreground p-8 md:p-12 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/10 blur-[80px]" />
            <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-white/5 blur-[60px]" />

            <div className="relative flex flex-col md:flex-row items-center gap-10">
              {/* Score circle */}
              <div className="shrink-0">
                <div className="relative w-36 h-36">
                  <svg className="w-36 h-36 -rotate-90" viewBox="0 0 144 144">
                    <circle cx="72" cy="72" r="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <motion.circle
                      cx="72" cy="72" r="60" fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={377}
                      initial={{ strokeDashoffset: 377 }}
                      whileInView={{ strokeDashoffset: 377 - (377 * 7.8) / 10 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-primary-foreground">7.8</span>
                    <span className="text-[10px] text-primary-foreground/40 uppercase tracking-wider font-bold">/10</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black mb-3">
                  Un score unique pour tout comprendre
                </h3>
                <p className="text-primary-foreground/50 text-lg leading-relaxed max-w-lg">
                  Chaque document est analysé et synthétisé en un score de fiabilité clair.
                  Risques, finances, juridique — tout est passé au crible en moins de 2 minutes.
                </p>
                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                  {[
                    { label: "98% de risques détectés", icon: Target },
                    { label: "< 2 min d'analyse", icon: Clock },
                    { label: "0 donnée conservée", icon: Lock },
                  ].map((badge, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 text-sm font-medium text-primary-foreground/70"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <badge.icon size={14} />
                      {badge.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analysis value cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {analysisValues.map((item, i) => (
              <motion.div
                key={i}
                className={`group relative p-6 rounded-2xl border ${item.borderColor} bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-400`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${item.bgColor} to-transparent opacity-30`} />
                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={20} className={item.color} />
                  </div>
                  <h4 className="font-bold text-foreground text-base mb-3">{item.title}</h4>
                  <ul className="space-y-2">
                    {item.items.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={14} className={`${item.color} shrink-0 mt-0.5`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
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
