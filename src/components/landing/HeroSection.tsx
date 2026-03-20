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

            {/* Mobile phone animation */}
            <motion.div
              className="flex lg:hidden justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-[160px] h-[300px] bg-foreground rounded-[2rem] p-[4px] shadow-2xl ring-1 ring-white/10">
                  <div className="w-full h-full bg-background rounded-[1.7rem] overflow-hidden relative">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[50px] h-[16px] bg-foreground rounded-full z-10" />
                    <div className="pt-7 px-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold text-foreground">Scan en cours</span>
                        <motion.div
                          className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <motion.div className="relative bg-muted rounded-lg p-2 border border-border overflow-hidden">
                        <motion.div
                          className="absolute left-0 right-0 h-[2px] bg-primary/60 shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="space-y-1.5">
                          {[3/4, 1, 2/3, 5/6, 1/2].map((w, i) => (
                            <div key={i} className="h-1.5 bg-foreground/10 rounded-full" style={{ width: `${w * 100}%` }} />
                          ))}
                        </div>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
                        <span className="text-[7px] font-semibold text-foreground">3 points positifs</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.8 }}
                      >
                        <AlertTriangle size={10} className="text-amber-500 shrink-0" />
                        <span className="text-[7px] font-semibold text-foreground">2 vigilances</span>
                      </motion.div>
                      <motion.div
                        className="flex justify-center pt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                      >
                        <div className="relative w-14 h-14">
                          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                            <circle cx="28" cy="28" r="22" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                            <motion.circle cx="28" cy="28" r="22" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeDasharray={138} initial={{ strokeDashoffset: 138 }} animate={{ strokeDashoffset: 138 - (138 * 78) / 100 }} transition={{ duration: 1.5, delay: 2.4, ease: "easeOut" }} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span className="text-sm font-black text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>78</motion.span>
                            <span className="text-[6px] text-muted-foreground">/100</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full bg-foreground/20" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — 3D Floating iPhone */}
          <div className="hidden lg:flex justify-center relative" style={{ perspective: "1200px" }}>
            {/* Floating badge — Sécurisé */}
            <motion.div
              className="absolute -left-6 top-16 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">100% sécurisé</p>
                <p className="text-[9px] text-muted-foreground">Chiffré & supprimé</p>
              </div>
            </motion.div>

            {/* Floating badge — Score */}
            <motion.div
              className="absolute -right-6 bottom-32 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Score: 78/100</p>
                <p className="text-[9px] text-muted-foreground">Bien recommandé</p>
              </div>
            </motion.div>

            {/* iPhone with 3D float */}
            <motion.div
              animate={{
                rotateY: [3, -3, 3],
                rotateX: [-2, 2, -2],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Phone Frame */}
              <div className="w-[280px] h-[580px] bg-foreground rounded-[3rem] p-[6px] shadow-2xl relative ring-1 ring-white/10">
                {/* Side buttons */}
                <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-foreground rounded-l-sm" />
                <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-foreground rounded-l-sm" />
                <div className="absolute -left-[2px] top-52 w-[3px] h-12 bg-foreground rounded-l-sm" />
                <div className="absolute -right-[2px] top-32 w-[3px] h-16 bg-foreground rounded-r-sm" />

                <div className="w-full h-full bg-background rounded-[2.6rem] overflow-hidden relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-foreground rounded-full z-10 flex items-center justify-center gap-2">
                    <div className="w-[8px] h-[8px] rounded-full bg-foreground ring-1 ring-gray-700" />
                  </div>

                  {/* Status bar */}
                  <div className="pt-1 px-6 flex justify-between items-center text-[9px] font-semibold text-foreground/70">
                    <span>9:41</span>
                    <div className="flex gap-1 items-center">
                      <div className="flex gap-[1px]">
                        {[3, 4, 5, 6].map((h) => (
                          <div
                            key={h}
                            className="w-[3px] rounded-sm bg-foreground/60"
                            style={{ height: h }}
                          />
                        ))}
                      </div>
                      <span className="ml-1">5G</span>
                      <div className="w-5 h-[9px] rounded-[2px] border border-foreground/50 relative ml-1">
                        <div className="absolute inset-[1px] right-[3px] bg-emerald-500 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="pt-10 px-4 space-y-3">
                    {/* App header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-foreground tracking-tight">
                        Résultat d'analyse
                      </span>
                      <div className="px-2 py-0.5 bg-emerald-500/15 rounded-full">
                        <span className="text-[9px] font-semibold text-emerald-600">Terminé</span>
                      </div>
                    </div>

                    {/* Score Circle */}
                    <div className="flex justify-center py-2">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                          <motion.circle
                            cx="48" cy="48" r="40" fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={251}
                            initial={{ strokeDashoffset: 251 }}
                            animate={{ strokeDashoffset: 251 - (251 * 78) / 100 }}
                            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
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
                          <span className="text-[8px] text-muted-foreground font-medium">/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Result cards */}
                    <div className="space-y-2">
                      <motion.div
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-[10px] font-semibold text-foreground">3 points positifs</p>
                          <p className="text-[8px] text-muted-foreground">Finances saines, bon entretien</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/8 border border-amber-500/15"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                      >
                        <AlertTriangle size={13} className="text-amber-500 shrink-0" />
                        <div>
                          <p className="text-[10px] font-semibold text-foreground">2 points de vigilance</p>
                          <p className="text-[8px] text-muted-foreground">Travaux toiture prévus 2026</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted border border-border"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 }}
                      >
                        <CircleDollarSign size={13} className="text-primary shrink-0" />
                        <div>
                          <p className="text-[10px] font-semibold text-foreground">Impact financier</p>
                          <p className="text-[8px] text-muted-foreground">~12 000 € de charges prévues</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-foreground/20" />
                </div>
              </div>
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
