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
                            <motion.circle cx="24" cy="24" r="19" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeDasharray={119} initial={{ strokeDashoffset: 119 }} animate={{ strokeDashoffset: 119 - (119 * 78) / 100 }} transition={{ duration: 1.5, delay: 2.4, ease: "easeOut" }} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span className="text-xs font-black text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>78</motion.span>
                            <span className="text-[5px] text-muted-foreground">/100</span>
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

          {/* Right — Phone with scan effect */}
          <div className="hidden lg:flex justify-center relative" style={{ perspective: "1200px" }}>
            {/* Floating badge — Sécurisé */}
            <motion.div
              className="absolute -left-6 top-24 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
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
              className="absolute -right-6 bottom-40 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2.5 shadow-xl"
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

            {/* iPhone with scan animation */}
            <motion.div
              animate={{
                rotateY: [2, -2, 2],
                rotateX: [-1, 1, -1],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Phone Frame — smaller */}
              <div className="w-[240px] h-[500px] bg-foreground rounded-[2.5rem] p-[5px] shadow-2xl relative ring-1 ring-white/10">
                {/* Side buttons */}
                <div className="absolute -left-[2px] top-20 w-[3px] h-7 bg-foreground rounded-l-sm" />
                <div className="absolute -left-[2px] top-30 w-[3px] h-10 bg-foreground rounded-l-sm" />
                <div className="absolute -left-[2px] top-44 w-[3px] h-10 bg-foreground rounded-l-sm" />
                <div className="absolute -right-[2px] top-28 w-[3px] h-14 bg-foreground rounded-r-sm" />

                <div className="w-full h-full bg-background rounded-[2.2rem] overflow-hidden relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[75px] h-[24px] bg-foreground rounded-full z-10 flex items-center justify-center">
                    <div className="w-[7px] h-[7px] rounded-full bg-foreground ring-1 ring-gray-700" />
                  </div>

                  {/* Status bar */}
                  <div className="pt-1 px-5 flex justify-between items-center text-[8px] font-semibold text-foreground/70">
                    <span>9:41</span>
                    <div className="flex gap-1 items-center">
                      <div className="flex gap-[1px]">
                        {[3, 4, 5, 6].map((h) => (
                          <div key={h} className="w-[2px] rounded-sm bg-foreground/60" style={{ height: h }} />
                        ))}
                      </div>
                      <span className="ml-0.5">5G</span>
                    </div>
                  </div>

                  {/* Screen Content — Scan animation */}
                  <div className="pt-9 px-3 space-y-2">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                      <motion.span
                        className="text-[10px] font-bold text-foreground tracking-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Scan du document
                      </motion.span>
                      <motion.div
                        className="w-3 h-3 rounded-full border-[1.5px] border-primary border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: 3, ease: "linear" }}
                      />
                    </div>

                    {/* Document being scanned */}
                    <motion.div className="relative bg-muted rounded-xl p-3 border border-border overflow-hidden min-h-[100px]">
                      {/* Scan line */}
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-primary/70 shadow-[0_0_12px_hsl(var(--primary)/0.5)] z-10"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {/* Fake text lines */}
                      <div className="space-y-1.5">
                        {[85, 100, 65, 90, 50, 75, 95, 60].map((w, i) => (
                          <motion.div
                            key={i}
                            className="h-1.5 bg-foreground/8 rounded-full"
                            style={{ width: `${w}%` }}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Results appearing one by one */}
                    <motion.div
                      className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/8 border border-emerald-500/15"
                      initial={{ opacity: 0, x: -15, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 1.5, type: "spring", bounce: 0.3 }}
                    >
                      <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-semibold text-foreground">3 points positifs</p>
                        <p className="text-[7px] text-muted-foreground">Finances saines</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/8 border border-amber-500/15"
                      initial={{ opacity: 0, x: -15, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 2, type: "spring", bounce: 0.3 }}
                    >
                      <AlertTriangle size={11} className="text-amber-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-semibold text-foreground">2 vigilances</p>
                        <p className="text-[7px] text-muted-foreground">Toiture à surveiller</p>
                      </div>
                    </motion.div>

                    {/* Score circle appearing */}
                    <motion.div
                      className="flex justify-center pt-1"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5, type: "spring", bounce: 0.4 }}
                    >
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
                            animate={{ strokeDashoffset: 163 - (163 * 78) / 100 }}
                            transition={{ duration: 1.5, delay: 2.8, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span
                            className="text-lg font-black text-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3 }}
                          >
                            78
                          </motion.span>
                          <span className="text-[6px] text-muted-foreground font-medium">/100</span>
                        </div>
                      </div>
                    </motion.div>
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
