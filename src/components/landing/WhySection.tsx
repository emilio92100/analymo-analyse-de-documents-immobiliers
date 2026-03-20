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
  Lock,
  Clock,
} from "lucide-react";
import { useRef } from "react";

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

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/3 blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header — balanced sizes */}
        <motion.div
          className="max-w-4xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pourquoi{" "}
            <span className="text-gradient relative inline-block">
              Analymo
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            L'achat immobilier est l'investissement d'une vie. Notre IA décrypte vos documents
            pour que vous achetiez en toute sérénité.
          </motion.p>
        </motion.div>

        {/* Bento grid — mixed sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 — Large, spans 2 cols */}
          <motion.div
            className="group lg:col-span-2 relative overflow-hidden rounded-3xl bg-foreground text-primary-foreground p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <FileSearch size={26} className="text-primary-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Détection des risques</h3>
                <p className="text-primary-foreground/60 leading-relaxed max-w-md">
                  Identification automatique des travaux votés, impayés et procédures en cours
                  dans vos PV d'AG et documents de copropriété.
                </p>
              </div>
              <div className="text-center md:text-right shrink-0">
                <motion.p
                  className="text-6xl md:text-7xl font-black text-primary-foreground/20"
                  whileInView={{ opacity: [0, 1], scale: [0.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  98%
                </motion.p>
                <p className="text-xs text-primary-foreground/40 uppercase tracking-wider font-medium mt-2">
                  de risques détectés
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Tall */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-border bg-background p-8 flex flex-col justify-between hover:shadow-xl hover:border-primary/20 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Clock size={22} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Résultats en 2 min</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Notre technologie analyse chaque ligne en quelques secondes. Fini les heures de lecture.
              </p>
            </div>
            <motion.p
              className="text-5xl font-black text-primary/15 group-hover:text-primary/40 transition-colors duration-500 mt-6"
              whileInView={{ opacity: [0, 1] }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {"< 2min"}
            </motion.p>
          </motion.div>

          {/* Card 3 — Medium */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-border bg-background p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Banknote size={22} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Impact financier</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Estimation des charges futures et analyse de la santé financière de la copropriété.
              </p>
              <motion.p
                className="text-4xl font-black text-amber-500/20 group-hover:text-amber-500/50 transition-colors duration-500 mt-4"
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                12k€
              </motion.p>
            </div>
          </motion.div>

          {/* Card 4 — Medium */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-border bg-background p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Scale size={22} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Conformité juridique</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Vérification des diagnostics obligatoires et détection des clauses abusives.
              </p>
              <motion.p
                className="text-4xl font-black text-blue-500/20 group-hover:text-blue-500/50 transition-colors duration-500 mt-4"
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
              >
                100%
              </motion.p>
            </div>
          </motion.div>

          {/* Card 5 — Wide, spans 2 cols on lg */}
          <motion.div
            className="group lg:col-span-2 relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary/5 to-transparent p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck size={26} className="text-emerald-600" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Lock size={26} className="text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Sécurité & confidentialité totales
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                  Chiffrement de bout en bout, infrastructure bancaire. Vos documents sont supprimés
                  automatiquement après analyse. Aucune donnée conservée ou revendue.
                </p>
              </div>
              <motion.div
                className="text-right shrink-0 hidden sm:block"
                whileInView={{ opacity: [0, 1], x: [20, 0] }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-5xl font-black text-emerald-500/20 group-hover:text-emerald-500/50 transition-colors duration-500">0</p>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mt-1">donnée conservée</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Card 6 — Score */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-border bg-background p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Target size={22} className="text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Score de fiabilité</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Un score clair de 0 à 100 pour évaluer la qualité globale du bien d'un seul coup d'œil.
              </p>
              {/* Mini score visual */}
              <div className="mt-5 flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                    <motion.circle
                      cx="32" cy="32" r="26" fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={163}
                      initial={{ strokeDashoffset: 163 }}
                      whileInView={{ strokeDashoffset: 163 - (163 * 78) / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-black text-foreground">78</span>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight">
                  <p className="font-bold text-foreground text-xs">Bon score</p>
                  <p>Bien recommandé avec vigilance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 text-center"
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
