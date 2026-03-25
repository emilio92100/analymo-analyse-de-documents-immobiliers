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
      
      {/* LOGO AU MILIEU & GRAND */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: "backOut" }}
      >
        <img src="/logo.png" alt="Analymo" className="h-28 md:h-36 w-auto" />
      </motion.div>

      {/* BACKGROUND ELEMENTS SUBTILS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-slate-100 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10">
        
        {/* SECTION TEXTE & COMPTEUR (Gauchie) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12 w-full lg:w-1/2"
        >
          <div className="space-y-6">
            <h2 className="text-[#004262] font-bold tracking-[0.2em] text-sm uppercase">Bientôt disponible</h2>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Analymo, votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004262] to-blue-500">œil expert.</span>
            </h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg">
              Analymo déchiffre vos documents immobiliers complexes pour une analyse claire, rapide et sans risque.
            </p>
          </div>

          {/* COMPTEUR 30 JOURS */}
          <div className="flex gap-10">
            {[
              { label: 'Jours', value: timeLeft.days },
              { label: 'Heures', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col">
                <span className="text-5xl font-medium text-[#004262] tabular-nums tracking-tighter">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-3">{unit.label}</span>
              </div>
            ))}
          </div>

          {/* BARRE DE PROGRESSION MISE EN AVANT */}
          <div className="space-y-4 max-w-md">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimisation de l'outil</span>
              <span className="text-sm font-bold text-[#004262] bg-blue-50 px-2 py-0.5 rounded">{Math.round(progress)}%</span>
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

        {/* SECTION VISUELLE : TÉLÉPHONE 3D & ANIMATION UNIQUE (Droitie) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center perspective-1000 lg:w-1/2" 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
        >
          {/* Main Device Frame (3D Effect) */}
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative w-[320px] h-[650px] bg-white rounded-[3.8rem] border border-white/60 shadow-[0_50px_100px_rgba(0,0,0,0.08)] backdrop-blur-3xl overflow-hidden group origin-center"
          >
            
            {/* Status Bar / Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0F172A] rounded-full z-40" />
            
            {/* Screen Content (Glassmorphism inside) */}
            <div className="h-full w-full bg-white/95 rounded-[3.1rem] overflow-hidden p-6 flex flex-col items-center justify-center relative shadow-inner">
              
              {/* Internal Logo (Faded) */}
              <img src="/logo.png" alt="Analymo" className="h-8 w-auto mb-12 opacity-30 grayscale" />
              
              {/* Document Scanning Animation */}
              <div className="relative h-44 w-full bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                
                {/* Status text */}
                <motion.div 
                  className="text-xs text-[#004262] font-bold uppercase tracking-widest mb-4 z-10"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  Analyse...
                </motion.div>
                
                {/* Simulated scan lines */}
                <div className="w-full space-y-2.5 px-6 z-10 opacity-30">
                   {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1.5 w-full bg-slate-200 rounded-full" />
                   ))}
                </div>

                {/* LASER DE SCAN BLEU FIN ET PRÉCIS */}
                <motion.div 
                  className="absolute left-0 w-full h-[2px] bg-[#004262] shadow-[0_0_20px_2px_#004262] z-30"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                />
              </div>

              {/* Résultats simulés (Cards) */}
              <motion.div 
                className="mt-8 w-full space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex gap-3">
                  <div className="h-10 w-full bg-green-50 rounded-lg border border-green-100 flex items-center justify-center text-[11px] text-green-600 font-bold shadow-sm">✓ PRÉCIS</div>
                  <div className="h-10 w-full bg-amber-50 rounded-lg border border-amber-100 flex items-center justify-center text-[11px] text-amber-600 font-bold shadow-sm">! VIGILANT</div>
                </div>

                {/* Carte de score finale (Surgit à la fin) */}
                <motion.div 
                  className="w-full p-8 mt-6 bg-[#004262] rounded-3xl text-white text-center shadow-2xl shadow-[#004262]/30 relative overflow-hidden"
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 1, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -5 }} // Interactif au survol
                >
                  <div className="text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2 font-bold">Score d'Analyse</div>
                  <div className="text-6xl font-extrabold tracking-tighter tabular-nums">7.4<span className="text-xl opacity-40 font-medium">/10</span></div>
                  <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                </motion.div>
              </motion.div>
              
            </div>
          </div>
          
          {/* Floating Decor */}
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
