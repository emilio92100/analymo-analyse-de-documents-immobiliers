import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ComingSoonPage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 });

  // Effet 3D Mouse Tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  // Configuration du décompte de 30 jours à partir de maintenant
  const [targetDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      const totalDuration = 30 * 24 * 60 * 60 * 1000;
      const elapsed = totalDuration - distance;

      // Progression fluide
      setProgress(Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100));

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
  }, [targetDate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden font-sans text-[#0F172A] relative">
      {/* LOGO AGRANDI */}
      <div className="absolute top-10 left-10 z-50">
        <img src="/logo.png" alt="Analymo" className="h-20 md:h-24 w-auto" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* TEXTE DE GAUCHE */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-[#004262] rounded-full animate-pulse" />
            <span className="text-xs font-bold text-[#004262] uppercase tracking-wider">Outil d'analyse expert</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-[#0F172A]">
            Analysez vos <br />
            <span className="text-[#004262]">
              documents <br /> immobiliers
            </span>
          </h1>

          <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg">
            Score global, risques cachés, impact financier — tout ce qu'il faut savoir avant de signer, grâce à notre
            outil d'analyse.
          </p>

          {/* COMPTEUR 30 JOURS */}
          <div className="flex gap-8">
            {[
              { label: "Jours", value: timeLeft.days },
              { label: "Heures", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col">
                <span className="text-4xl font-bold text-[#004262] tabular-nums tracking-tighter">
                  {unit.value.toString().padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* BARRE DE PROGRESSION */}
          <div className="space-y-4 max-w-sm">
            <div className="flex justify-between items-end text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <span>Finalisation de l'outil</span>
              <span className="text-[#004262] text-sm">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div className="h-full bg-[#004262] rounded-full" style={{ width: `${progress}%` }} />
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* TÉLÉPHONE 3D */}
        <div
          className="relative flex justify-center perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-[310px] h-[630px] bg-[#0F172A] rounded-[3.5rem] p-[10px] shadow-[0_50px_100px_rgba(0,66,98,0.15)]"
          >
            <div className="h-full w-full bg-white rounded-[2.9rem] overflow-hidden flex flex-col relative shadow-inner">
              <div className="p-6 pt-12 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Résultat d'analyse</span>
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-[8px] font-bold rounded-full">Prêt</span>
                </div>

                {/* Score */}
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full rotate-[-90deg]">
                    <circle cx="64" cy="64" r="58" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="#004262"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="364"
                      initial={{ strokeDashoffset: 364 }}
                      animate={{ strokeDashoffset: 364 - 364 * 0.74 }}
                      transition={{ delay: 1, duration: 1.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#0F172A]">7.4</span>
                    <span className="text-[10px] text-slate-400">/10</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px]">
                      ✓
                    </div>
                    <div className="h-2 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-[10px]">
                      !
                    </div>
                    <div className="h-2 w-20 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>

              {/* Laser de scan */}
              <motion.div
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-[2px] bg-[#004262] shadow-[0_0_15px_#004262] z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">
        Analymo — Outil de précision immobilière
      </div>
    </div>
  );
};

export default ComingSoonPage;
