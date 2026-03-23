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
  FileText,
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative pt-36 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:pl-4 xl:pl-8 text-center lg:text-left items-center lg:items-start flex flex-col"
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

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-foreground leading-[1.1] max-w-xl mx-auto lg:mx-0">
              Analysez vos documents{" "}
              <span className="text-gradient">immobiliers</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0">
              Score global, risques cachés, impact financier — tout ce qu'il
              faut savoir avant de signer, expliqué simplement en moins de 2
              minutes grâce à notre outil d'analyse.
            </p>

            {/* Mobile phone animation — just above CTA */}
            <motion.div
              className="flex lg:hidden justify-center mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-[130px] h-[250px] bg-foreground rounded-[1.6rem] p-[3px] shadow-xl ring-1 ring-white/10">
                  <div className="w-full h-full bg-background rounded-[1.4rem] overflow-hidden relative">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[40px] h-[12px] bg-foreground rounded-full z-10" />
                    <div className="pt-5 px-2.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[7px] font-bold text-foreground">Scan en cours</span>
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full border-[1.5px] border-primary border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      <motion.div className="relative bg-muted rounded-md p-1.5 border border-border overflow-hidden">
                        <motion.div
                          className="absolute left-0 right-0 h-[1.5px] bg-primary/60 shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="space-y-1">
                          {[3/4, 1, 2/3, 5/6].map((w, i) => (
                            <div key={i} className="h-1 bg-foreground/10 rounded-full" style={{ width: `${w * 100}%` }} />
                          ))}
                        </div>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1 p-1 rounded-md bg-emerald-500/10 border border-emerald-500/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <CheckCircle2 size={8} className="text-emerald-500 shrink-0" />
                        <span className="text-[6px] font-semibold text-foreground">3 points positifs</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1 p-1 rounded-md bg-amber-500/10 border border-amber-500/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.8 }}
                      >
                        <AlertTriangle size={8} className="text-amber-500 shrink-0" />
                        <span className="text-[6px] font-semibold text-foreground">2 vigilances</span>
                      </motion.div>
                      <motion.div
                        className="flex justify-center pt-0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                      >
                        <div className="relative w-12 h-12">
                            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="19" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                            <motion.circle cx="24" cy="24" r="19" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeDasharray={119} initial={{ strokeDashoffset: 119 }} animate={{ strokeDashoffset: 119 - (119 * 7) / 10 }} transition={{ duration: 1.5, delay: 2.4, ease: "easeOut" }} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span className="text-[9px] font-black text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>7</motion.span>
                            <span className="text-[5px] text-muted-foreground">/10</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-foreground/20" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
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

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-8 mb-12 lg:mb-0">
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

          {/* Right — Phone with continuous movement */}
          <div className="hidden lg:flex justify-center relative" style={{ perspective: "1200px" }}>
            {/* Floating badge — Sécurisé */}
            <motion.div
              className="absolute -left-8 top-20 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
              animate={{ y: [0, -10, 0], x: [0, 3, 0] }}
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
              className="absolute -right-8 bottom-36 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
              animate={{ y: [0, 10, 0], x: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Score: 7/10</p>
                <p className="text-[9px] text-muted-foreground">Bien recommandé</p>
              </div>
            </motion.div>

            {/* Floating badge — Document */}
            <motion.div
              className="absolute -left-2 bottom-16 glass rounded-2xl px-3 py-2 z-20 flex items-center gap-2 shadow-xl"
              animate={{ y: [0, 6, 0], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            >
              <FileText size={14} className="text-primary" />
              <span className="text-[10px] font-semibold text-foreground">PV scanné ✓</span>
            </motion.div>

            {/* iPhone — continuous float + tilt */}
            <motion.div
              animate={{
                rotateY: [4, -4, 4],
                rotateX: [-3, 3, -3],
                y: [0, -12, 0],
                rotateZ: [0, 1, -1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-[230px] h-[480px] bg-foreground rounded-[2.5rem] p-[5px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] relative ring-1 ring-white/10">

                <div className="w-full h-full bg-background rounded-[2.2rem] overflow-hidden relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[72px] h-[22px] bg-foreground rounded-full z-10" />

                  {/* Status bar */}
                  <div className="pt-1 px-5 flex justify-between items-center text-[8px] font-semibold text-foreground/70">
                    <span>9:41</span>
                    <div className="flex gap-1 items-center">
                      <span>5G</span>
                      <div className="w-4 h-[8px] rounded-[2px] border border-foreground/50 relative">
                        <div className="absolute inset-[1px] right-[2px] bg-emerald-500 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Screen — Dashboard style */}
                  <div className="pt-8 px-3 space-y-2.5">
                    {/* App header */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-foreground">Résultat d'analyse</span>
                      <motion.div
                        className="px-2 py-0.5 rounded-full bg-emerald-500/15"
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-[8px] font-semibold text-emerald-600">Terminé</span>
                      </motion.div>
                    </div>

                    {/* Score — big circle */}
                    <div className="flex justify-center py-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="33" fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
                          <motion.circle
                            cx="40" cy="40" r="33" fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={207}
                            initial={{ strokeDashoffset: 207 }}
                            animate={{ strokeDashoffset: 207 - (207 * 7) / 10 }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span
                            className="text-xl font-black text-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                          >
                            7
                          </motion.span>
                          <span className="text-[7px] text-muted-foreground font-medium">/10</span>
                        </div>
                      </div>
                    </div>

                    {/* Animated bar chart */}
                    <div className="flex items-end gap-1 justify-center h-8">
                      {[60, 85, 45, 70, 90, 55, 75].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-3 rounded-t bg-primary/70"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        />
                      ))}
                    </div>

                    {/* Result items */}
                    <div className="space-y-1.5 pt-1">
                      <motion.div
                        className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/8 border border-emerald-500/15"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                      >
                        <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-[9px] font-semibold text-foreground">3 points positifs</p>
                          <p className="text-[6px] text-muted-foreground">Finances saines, entretien ok</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-2 p-2 rounded-xl bg-amber-500/8 border border-amber-500/15"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.9 }}
                      >
                        <AlertTriangle size={11} className="text-amber-500 shrink-0" />
                        <div>
                          <p className="text-[9px] font-semibold text-foreground">2 vigilances</p>
                          <p className="text-[6px] text-muted-foreground">Toiture prévue 2026</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-2 p-2 rounded-xl bg-muted border border-border"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2 }}
                      >
                        <CircleDollarSign size={11} className="text-primary shrink-0" />
                        <div>
                          <p className="text-[9px] font-semibold text-foreground">Impact financier</p>
                          <p className="text-[6px] text-muted-foreground">~12 000 € de charges</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-foreground/20" />
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
