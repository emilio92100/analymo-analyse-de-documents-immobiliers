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

  // Configuration du compte à rebours (30 jours)
  const startDate = new Date("2026-03-25T00:00:00");
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      const total = endDate.getTime() - startDate.getTime();
      const elapsed = now - startDate.getTime();

      setProgress(Math.min(Math.max((elapsed / total) * 100, 0), 100));

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
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden font-sans text-[#0F172A] relative">
      {/* HEADER / LOGO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-10 z-50"
      >
        <img src="/logo.png" alt="Analymo" className="h-12 w-auto" />
      </motion.div>

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* LEFT SIDE: TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-[#004262] font-bold tracking-[0.2em] text-sm uppercase">Bientôt disponible</h2>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              L'immobilier devient{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004262] to-blue-500">
                limpide.
              </span>
            </h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg">
              Analymo déchiffre vos documents complexes pour vous offrir une analyse claire, rapide et sans risque.
            </p>
          </div>

          {/* COUNTDOWN */}
          <div className="flex gap-10">
            {[
              { label: "Jours", value: timeLeft.days },
              { label: "Heures", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col">
                <span className="text-5xl font-medium text-[#004262] tabular-nums tracking-tighter">
                  {unit.value.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-3">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* PROGRESS BAR */}
          <div className="space-y-4 max-w-sm">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Phase finale de test
              </span>
              <span className="text-sm font-bold text-[#004262] bg-blue-50 px-2 py-0.5 rounded">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-[4px] w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#004262]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 2, ease: "circOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: THE SMART PHONE MOCKUP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          {/* Main Device Frame */}
          <div className="relative w-[320px] h-[650px] bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.07)] border-[10px] border-[#F1F5F9] overflow-hidden">
            {/* Status Bar */}
            <div className="absolute top-0 w-full h-10 bg-white z-20 flex justify-center items-end pb-2">
              <div className="w-20 h-5 bg-[#0F172A] rounded-full" />
            </div>

            <div className="p-6 pt-16 h-full flex flex-col bg-white">
              {/* Internal Logo */}
              <img src="/logo.png" alt="Analymo" className="h-6 w-auto mb-10 opacity-40 grayscale" />

              {/* Document Analysis Animation */}
              <div className="space-y-6 flex-1">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#004262] flex items-center justify-center text-white text-xs">
                      PDF
                    </div>
                    <div className="h-2 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-slate-100 rounded" />
                    <div className="h-1.5 w-full bg-slate-100 rounded" />
                    <div className="h-1.5 w-2/3 bg-slate-100 rounded" />
                  </div>
                </motion.div>

                {/* Real-time Scan Line */}
                <div className="relative h-[2px] w-full bg-slate-100">
                  <motion.div
                    animate={{ left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-[#004262] to-transparent shadow-[0_0_8px_#004262]"
                  />
                </div>

                {/* Score Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-[#004262] p-8 rounded-[2rem] text-center text-white shadow-xl shadow-blue-900/20"
                >
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Analyse terminée</span>
                  <div className="text-6xl font-black my-2 tabular-nums">8.2</div>
                  <div className="text-xs font-medium bg-white/10 py-1 px-3 rounded-full inline-block">
                    Score de fiabilité
                  </div>
                </motion.div>
              </div>

              {/* Bottom Nav Mockup */}
              <div className="mt-auto h-1 w-24 bg-slate-100 rounded-full mx-auto" />
            </div>
          </div>

          {/* Floating Decor */}
          <div className="absolute -z-10 -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full blur-2xl" />
        </motion.div>
      </div>

      {/* FOOTER TEXT */}
      <div className="absolute bottom-10 text-slate-400 text-[11px] font-medium tracking-widest uppercase">
        Analymo © 2026 — L'excellence immobilière
      </div>
    </div>
  );
};

export default ComingSoonPage;
