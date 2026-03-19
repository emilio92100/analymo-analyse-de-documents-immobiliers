import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Trash2, Building2, ChevronDown, CheckCircle2, Eye } from "lucide-react";
import Logo from "@/components/Logo";

interface HeroSectionProps {
  user: any;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-bg">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              IA immobilière · 1 analyse gratuite
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-foreground leading-[1.1]">
              Analysez vos
              <br />
              documents
              <br />
              <span className="text-gradient">immobiliers</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              Score global, risques cachés, impact financier — tout ce qu'il
              faut savoir avant de signer, expliqué simplement par notre IA en
              moins de 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to={user ? "/app/new-analysis" : "/signup"}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                <ShieldCheck size={18} />
                Analyser gratuitement
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

          {/* Right — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center relative"
          >
            {/* Floating badge — 100% sécurisé */}
            <motion.div
              className="absolute -left-8 top-16 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck size={16} className="text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">100% sécurisé</span>
            </motion.div>

            {/* Floating badge — < 2 minutes */}
            <motion.div
              className="absolute -right-4 bottom-24 glass rounded-2xl px-4 py-3 z-20 flex items-center gap-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">⏱</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{"< 2 minutes"}</span>
            </motion.div>

            {/* Phone Frame */}
            <div className="w-[300px] h-[600px] bg-foreground rounded-[3rem] p-3 shadow-2xl relative">
              <div className="w-full h-full bg-background rounded-[2.4rem] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-foreground rounded-b-2xl z-10" />

                {/* Screen Content */}
                <div className="pt-12 px-5 space-y-4">
                  {/* App header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground tracking-tight">ImmoScan</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />
                      <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />
                    </div>
                  </div>

                  {/* Document scan area */}
                  <div className="bg-muted rounded-2xl p-4 relative overflow-hidden h-44">
                    {/* Corner brackets */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-md" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-primary/40 rounded-tr-md" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary/40 rounded-bl-md" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-md" />

                    {/* Text lines */}
                    <div className="space-y-2 mt-4 mx-4">
                      {[90, 80, 95, 70, 85, 60].map((w, i) => (
                        <div
                          key={i}
                          className="h-2 bg-border rounded-full"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>

                    {/* Scan Line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-primary/50 animate-scan" />
                  </div>

                  {/* File name */}
                  <p className="text-xs text-muted-foreground">PV_AG_2024.pdf importé</p>

                  {/* Analysis steps */}
                  <div className="space-y-2.5 mt-2">
                    <div className="flex items-center gap-2.5 text-xs">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <span className="text-muted-foreground">Extraction du texte...</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <span className="text-muted-foreground">Analyse des risques...</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
                      <span className="text-foreground font-medium">Calcul du score global...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/30" />
            </div>
          </motion.div>
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
