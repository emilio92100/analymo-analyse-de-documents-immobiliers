import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

const ComingSoonPage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Dates pour la progression continue
  const startDate = new Date("2026-02-26T00:00:00"); // Il y a 27 jours (par rapport au 25 Mars)
  const endDate = new Date("2026-04-25T00:00:00"); // Date cible

  // Tracking 3D pour le téléphone
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const total = endDate.getTime() - startDate.getTime();
      const elapsed = now - startDate.getTime();
      const distance = endDate.getTime() - now;

      setProgress(Math.min(Math.max((elapsed / total) * 100, 0), 100));

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX / innerWidth - 0.5);
    mouseY.set(e.clientY / innerHeight - 0.5);
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-start p-6 md:p-12 overflow-x-hidden font-sans text-[#0F172A]"
      onMouseMove={handleMouseMove}
    >
      {/* 1. LOGO CENTRAL */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 md:mb-16">
        <img src="/logo.png" alt="Analymo" className="h-16 md:h-24 w-auto object-contain" />
      </motion.div>

      {/* 2. TEXTE D'ACCROCHE CENTRÉ */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-4xl px-4 mb-16">
        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
          L'analyse immobilière <br />
          <span className="text-[#004262]">réinventée pour vous.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto">
          Score global, risques et impact financier. Notre outil expert finalise ses derniers tests avant le lancement
          officiel.
        </p>
      </motion.div>

      {/* 3. LE TÉLÉPHONE 3D ANIMÉ AU CENTRE */}
      <div className="relative perspective-2000 mb-20">
        <motion.div
          style={{ rotateX, rotateY, z: 100 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-[280px] h-[580px] md:w-[320px] md:h-[650px] bg-[#0F172A] rounded-[3.5rem] p-3 shadow-[0_50px_100px_rgba(0,66,98,0.2)]"
        >
          {/* Écran interne */}
          <div className="h-full w-full bg-white rounded-[2.8rem] overflow-hidden relative flex flex-col p-6">
            <div className="mt-12 space-y-8">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Analyse en cours</span>
                <span className="text-green-500">98%</span>
              </div>

              {/* Animation Scan */}
              <div className="relative h-48 w-full bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-1 bg-[#004262] shadow-[0_0_20px_#004262] z-10"
                />
                <div className="space-y-3 w-2/3 opacity-20">
                  <div className="h-2 bg-[#004262] rounded-full" />
                  <div className="h-2 bg-[#004262] rounded-full w-4/5" />
                  <div className="h-2 bg-[#004262] rounded-full w-full" />
                </div>
              </div>

              {/* Éléments de data simulés */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="p-4 bg-[#004262] rounded-2xl text-white text-center shadow-lg"
              >
                <div className="text-[10px] opacity-60 uppercase mb-1">Score Précision</div>
                <div className="text-4xl font-black">
                  7.4<span className="text-sm opacity-40">/10</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Éléments flottants autour du téléphone */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute -inset-10 border border-dashed border-[#004262]/20 rounded-full -z-10"
          />
        </motion.div>
      </div>

      {/* 4. BARRE DE PROGRESSION À PALIERS */}
      <div className="w-full max-w-3xl px-4 space-y-6 mb-20">
        <div className="flex justify-between items-end text-[11px] font-black text-[#004262] uppercase tracking-[0.2em]">
          <span>Lancement du protocole</span>
          <span className="text-lg">{Math.round(progress)}%</span>
        </div>

        <div className="relative h-4 w-full bg-slate-100 rounded-full p-1 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#004262] to-blue-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 right-0 h-full w-8 bg-white/30 blur-sm rounded-full animate-pulse" />
          </motion.div>

          {/* Paliers visuels */}
          {[25, 50, 75].map((step) => (
            <div
              key={step}
              className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${progress > step ? "bg-white" : "bg-slate-300"}`}
              style={{ left: `${step}%` }}
            />
          ))}
        </div>

        {/* Décompte temporel */}
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { label: "Jours", val: timeLeft.days },
            { label: "Heures", val: timeLeft.hours },
            { label: "Min", val: timeLeft.minutes },
            { label: "Sec", val: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="bg-white p-3 rounded-xl shadow-sm border border-slate-50">
              <div className="text-xl md:text-2xl font-bold text-[#004262] tabular-nums">{item.val}</div>
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">
        Analymo — Expertise Immobilière Digitale
      </div>
    </div>
  );
};

export default ComingSoonPage;
