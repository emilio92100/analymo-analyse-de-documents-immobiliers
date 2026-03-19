import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Trash2,
  Building2,
  ChevronDown,
  CheckCircle2,
  Eye,
  TrendingUp,
  AlertTriangle,
  CircleDollarSign,
  BarChart3,
} from "lucide-react";

interface HeroSectionProps {
  user: any;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden gradient-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:pl-4 xl:pl-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              Analyse immobilière intelligente
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-foreground leading-[1.1] max-w-xl">
              Analysez vos documents{" "}
              <span className="text-gradient">immobiliers</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Score global, risques cachés, impact financier — tout ce qu'il
              faut savoir avant de signer, expliqué simplement en moins de 2
              minutes grâce à notre outil d'analyse.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to={user ? "/app/new-analysis" : "/signup"}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                <ShieldCheck size={18} />
                Lancer l'analyse
              </Link>
              <Link
                to="/example"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
              >
                <Eye size={18} />
                Voir un exemple
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-8">
              {[
                { icon: ShieldCheck, label: "Documents chiffrés" },
                { icon: Trash2, label: "Suppression auto" },
                { icon: Building2, label: "Sans engagement" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <item.icon size={14} className="text-primary" />
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — 3D Floating Dashboard */}
          <div className="hidden lg:flex justify-center relative" style={{ perspective: "1200px" }}>
            {/* Main dashboard card with continuous 3D rotation */}
            <motion.div
              className="relative w-[400px]"
              animate={{
                rotateY: [2, -2, 2],
                rotateX: [-3, 3, -3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main card */}
              <motion.div
                className="relative bg-background/90 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl shadow-primary/10 p-6 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                />

                {/* Header */}
                <div className="flex items-center justify-between mb-5 relative">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Résultat d'analyse</p>
                    <p className="text-sm font-bold text-foreground">Appartement T3 — Paris 11e</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/15 rounded-full">
                    <span className="text-[11px] font-bold text-emerald-600">Terminé</span>
                  </div>
                </div>

                {/* Score circle */}
                <div className="flex items-center gap-6 mb-5 relative">
                  <div className="relative w-[88px] h-[88px] shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
                      <circle cx="44" cy="44" r="36" fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
                      <motion.circle
                        cx="44" cy="44" r="36" fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={226}
                        initial={{ strokeDashoffset: 226 }}
                        animate={{ strokeDashoffset: 226 - (226 * 78) / 100 }}
                        transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        className="text-2xl font-black text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        78
                      </motion.span>
                      <span className="text-[9px] text-muted-foreground font-medium">/100</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[
                      { label: "Finances", value: 85, color: "bg-emerald-500" },
                      { label: "Juridique", value: 72, color: "bg-blue-500" },
                      { label: "Travaux", value: 60, color: "bg-amber-500" },
                    ].map((bar, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">{bar.label}</span>
                          <span className="font-bold text-foreground">{bar.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${bar.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.value}%` }}
                            transition={{ duration: 1.2, delay: 1 + i * 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Result cards */}
                <div className="space-y-2 relative">
                  {[
                    { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/8 border-emerald-500/15", title: "3 points positifs", sub: "Finances saines, bon entretien" },
                    { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/8 border-amber-500/15", title: "2 points de vigilance", sub: "Travaux toiture prévus 2026" },
                    { icon: CircleDollarSign, color: "text-primary", bg: "bg-muted border-border", title: "Impact financier", sub: "~12 000 € de charges prévues" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${card.bg}`}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + i * 0.2 }}
                    >
                      <card.icon size={15} className={`${card.color} shrink-0`} />
                      <div>
                        <p className="text-[11px] font-semibold text-foreground">{card.title}</p>
                        <p className="text-[9px] text-muted-foreground">{card.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badge — top left */}
              <motion.div
                className="absolute -left-12 top-4 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">100% sécurisé</p>
                  <p className="text-[9px] text-muted-foreground">Chiffré & supprimé</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                className="absolute -right-10 bottom-8 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Score: 78/100</p>
                  <p className="text-[9px] text-muted-foreground">Bien recommandé</p>
                </div>
              </motion.div>

              {/* Floating mini chart — top right */}
              <motion.div
                className="absolute -right-6 -top-4 glass rounded-xl px-3 py-2 z-20 shadow-lg"
                animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="flex items-center gap-1.5">
                  <BarChart3 size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-foreground">Analyse IA</span>
                </div>
                <div className="flex gap-[3px] mt-1.5">
                  {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-[4px] rounded-full bg-primary/60"
                      initial={{ height: 4 }}
                      animate={{ height: h / 4 }}
                      transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground/60">
            Découvrir
          </span>
          <ChevronDown size={18} className="text-muted-foreground/40 animate-scroll" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
