import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ComingSoonPage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Date de début (aujourd'hui) et fin (dans 30 jours)
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
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-8 overflow-hidden font-sans text-[#0F172A]">
      {/* Background subtil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Section Texte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-[#0F172A]">
              Analymo<span className="text-[#004262]">.</span>
            </h1>
            <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-lg">
              L'outil qui simplifie vos analyses de documents immobiliers.
            </p>
          </div>

          {/* Compteur stylisé */}
          <div className="flex gap-6">
            {[
              { label: "Jours", value: timeLeft.days },
              { label: "Heures", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col">
                <span className="text-4xl font-semibold text-[#004262]">{unit.value.toString().padStart(2, "0")}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">{unit.label}</span>
              </div>
            ))}
          </div>

          {/* Barre de progression épurée */}
          <div className="space-y-4 max-w-sm">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Développement de l'outil
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

        {/* Section Visuelle : Le Téléphone "Glass" */}
        <motion.div
          className="relative perspective-1000"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Le "Téléphone" style Glassmorphism */}
          <div className="relative mx-auto w-[300px] h-[600px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/80 rounded-b-2xl" />{" "}
            {/* Island */}
            <div className="h-full w-full bg-white/50 rounded-[2.4rem] overflow-hidden p-6 flex flex-col justify-center gap-6">
              {/* Animation de scan */}
              <div className="relative h-48 w-full bg-white rounded-2xl shadow-inner border border-slate-50 flex flex-col items-center justify-center p-4 overflow-hidden">
                <div className="text-[#004262] font-semibold text-sm mb-2 uppercase tracking-tighter">
                  Analyse en cours
                </div>
                <div className="w-full space-y-2 px-4">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ x: [-150, 300] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="h-full w-24 bg-gradient-to-r from-transparent via-[#004262] to-transparent"
                    />
                  </div>
                  <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
                </div>
                {/* Laser line */}
                <motion.div
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute left-0 w-full h-[2px] bg-[#004262]/30 shadow-[0_0_10px_#004262]"
                />
              </div>

              {/* Résultats simulés */}
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="p-3 bg-white rounded-xl shadow-sm border border-slate-50 flex items-center gap-3"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${i === 1 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}
                    >
                      {i === 1 ? "✓" : "!"}
                    </div>
                    <div className="h-2 w-24 bg-slate-100 rounded" />
                  </motion.div>
                ))}
              </div>

              {/* Le Score Final */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="mt-4 p-6 bg-[#004262] rounded-3xl text-white text-center shadow-xl shadow-[#004262]/20"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-70 mb-1">Score Global</div>
                <div className="text-4xl font-bold">
                  8.5<span className="text-lg opacity-50">/10</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Déco flottante autour du tel */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 border-2 border-dashed border-slate-200 rounded-full -z-10"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
