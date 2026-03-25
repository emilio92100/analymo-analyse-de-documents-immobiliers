import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const ComingSoonPage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Logique du compte à rebours (30 jours)
  const startDate = new Date("2026-03-25T00:00:00");
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      const total = endDate.getTime() - startDate.getTime();
      const elapsed = now - startDate.getTime();

      let progressValue = (elapsed / total) * 100;
      setProgress(Math.min(Math.max(progressValue, 0), 100));

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-8 overflow-hidden font-sans text-[#0F172A] relative">
      {/* LOGO ANALYMO */}
      <div className="absolute top-10 left-10">
        <img src={logo} alt="Analymo" className="h-10 w-auto" />
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12">
        {/* SECTION GAUCHE : TEXTE & COMPTEUR */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-[#0F172A]">
              Analymo<span className="text-[#004262]">.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-lg">
              L'outil intelligent qui simplifie vos analyses de documents immobiliers.
            </p>
          </div>

          {/* COMPTEUR */}
          <div className="flex gap-8">
            {[
              { label: "Jours", value: timeLeft.days },
              { label: "Heures", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col">
                <span className="text-5xl font-semibold text-[#004262] tabular-nums">
                  {unit.value.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* BARRE DE PROGRESSION */}
          <div className="space-y-4 max-w-sm">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Finalisation de l'outil
              </span>
              <span className="text-lg font-bold text-[#004262]">{Math.round(progress)}%</span>
            </div>
            <div className="h-[6px] w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#004262]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* SECTION DROITE : LE TÉLÉPHONE FONCTIONNEL */}
        <motion.div
          className="relative perspective-2000"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative mx-auto w-[310px] h-[630px] bg-white/30 backdrop-blur-2xl border border-white/60 rounded-[3.8rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] p-2">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0F172A] rounded-full z-40" />

            <div className="h-full w-full bg-white/90 rounded-[3.1rem] overflow-hidden p-6 flex flex-col items-center relative">
              {/* Animation 1: Le Document */}
              <motion.div
                className="w-full mt-10 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-inner"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-[#004262]">
                  📄
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-slate-200 rounded" />
                  <div className="h-1.5 w-16 bg-slate-100 rounded" />
                </div>
              </motion.div>

              {/* Animation 2: Le Scan Laser */}
              <div className="relative h-44 w-full bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                <div className="text-[10px] text-[#004262] font-bold uppercase tracking-widest mb-4">
                  Analyse en cours
                </div>
                <div className="w-full space-y-2 px-8 opacity-40">
                  <div className="h-1 w-full bg-[#004262]/20 rounded-full" />
                  <div className="h-1 w-3/4 bg-[#004262]/20 rounded-full" />
                  <div className="h-1 w-full bg-[#004262]/20 rounded-full" />
                </div>
                <motion.div
                  className="absolute left-0 w-full h-[2px] bg-[#004262] shadow-[0_0_15px_#004262] z-30"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
              </div>

              {/* Animation 3: Résultats & Score */}
              <motion.div
                className="mt-8 w-full space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="flex gap-2">
                  <div className="h-8 w-full bg-green-50 rounded-lg border border-green-100 flex items-center justify-center text-[10px] text-green-600 font-bold">
                    ✓ POINTS POSITIFS
                  </div>
                  <div className="h-8 w-full bg-amber-50 rounded-lg border border-amber-100 flex items-center justify-center text-[10px] text-amber-600 font-bold">
                    ! VIGILANCES
                  </div>
                </div>

                <motion.div
                  className="w-full p-6 mt-4 bg-[#004262] rounded-3xl text-white text-center shadow-2xl shadow-[#004262]/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.2, type: "spring" }}
                >
                  <div className="text-[9px] uppercase tracking-[0.2em] opacity-60 mb-1 font-bold">
                    Score Recommandé
                  </div>
                  <div className="text-5xl font-bold">
                    7.4<span className="text-xl opacity-40">/10</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Barre de navigation fictive */}
              <div className="absolute bottom-6 w-32 h-1 bg-slate-100 rounded-full" />
            </div>
          </div>

          {/* Déco flottante */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 border border-dashed border-slate-200 rounded-full -z-10"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
