import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion";

const ComingSoonPage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  // Pour l'effet 3D au survol
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Configuration du compte à rebours (30 jours)
  const startDate = new Date("2026-03-25T00:00:00");
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      const total = endDate.getTime() - startDate.getTime();
      const elapsed = now - startDate.getTime();

      // BARRE DE PROGRESSION CONTINUE ET VIVANTE (on utilise elapsed directement)
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

  // Logique pour l'effet 3D au survol
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width - 0.5); // Normalise entre -0.5 et 0.5
    y.set(mouseY / height - 0.5);
  };

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]); // Inclinaison X
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]); // Inclinaison Y

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

      {/* BACKGROUND ELEMENTS (plus subtils) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-slate-100 rounded-full blur-[120px] opacity-40" />
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
            <h2 className="text-[#004262] font-bold tracking-[0.2em] text-sm uppercase">Phase de développement</h2>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Déchiffrez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004262] to-blue-500">immobilier.</span>
            </h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed max-w-lg">
              Analymo décode vos documents complexes pour une analyse claire, rapide et sans risque.
            </p>
          </div>

          {/* COUNTDOWN */}
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

          {/* BARRE DE PROGRESSION CONTINUE ET VIVANTE */}
          <div className="space-y-4 max-w-sm">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimisation de l'outil</span>
              <span className="text-sm font-bold text-[#004262]">{Math.round(progress)}%</span>
            </div>
            <div className="h-[5px] w-full bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#004262] to-blue-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }} // Transition hyper-rapide pour effet continu
              />
              {/* Effet lumineux flottant */}
              <motion.div 
                className="absolute inset-0 bg-white/20 blur-sm rounded-full"
                animate={{ x: [`-100%`, `100%`] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: THE 3D ANIMATED PHONE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative flex justify-center perspective-1000" // perspective est cruciale pour la 3D
          ref={phoneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
        >
          {/* Main Device Frame (le corps 3D) */}
          <motion.div 
            className="relative w-[320px] h-[650px] bg-white rounded-[3.8rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border-[12px] border-[#F1F5F9] overflow-hidden group origin-center"
            style={{ rotateX, rotateY }} // Applique la rotation 3D
          >
            
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0F172A] rounded-full z-40 shadow-inner" />
            
            {/* Écran de l'application */}
            <div className="h-full w-full bg-white/95 rounded-[3.1rem] overflow-hidden p-6 flex flex-col items-center relative">
              
              {/* Logo Analymo dans le téléphone */}
              <img src="/logo.png" alt="Mini Logo" className="h-8 w-auto mt-10 mb-8 opacity-40 grayscale" />
              
              {/* Animation 1: Le Document */}
              <motion.div 
                className="w-full mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-inner"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-[#004262]">📄</div>
                <div className="space-y-2 flex-1">
                  <div className="h-2 w-full bg-slate-200 rounded" />
                  <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
                </div>
              </motion.div>

              {/* Zone de scan laser dynamique */}
              <div className="relative h-44 w-full bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center overflow-hidden shadow-inner group">
                <div className="text-[10px] text-[#004262] font-bold uppercase tracking-widest mb-4 z-10">Analyse en cours...</div>
                
                {/* Lignes simulées */}
                <div className="w-full space-y-2 px-8 z-10 opacity-30 group-hover:opacity-50 transition-opacity">
                   <div className="h-1.5 w-full bg-[#004262]/20 rounded-full" />
                   <div className="h-1.5 w-3/4 bg-[#004262]/20 rounded-full" />
                   <div className="h-1.5 w-full bg-[#004262]/20 rounded-full" />
                </div>

                {/* LASER BLEU (Scan) */}
                <motion.div 
                  className="absolute left-0 w-full h-[2px] bg-[#004262] shadow-[0_0_15px_#004262] z-30"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                />
              </div>

              {/* Carte de score finale (Surgit à la fin) */}
              <motion.div 
                className="w-full p-6 mt-6 bg-[#004262] rounded-3xl text-white text-center shadow-3xl shadow-[#004262]/40 relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1, type: "spring" }}
                whileHover={{ y: -5 }} // Effet interactif
              >
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2 font-bold">Score d'Analyse</div>
                <div className="text-6xl font-extrabold tracking-tighter tabular-nums">7.4<span className="text-xl opacity-40 font-medium">/10</span></div>
                <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-white/10 rounded-full blur-2xl" />
              </motion.div>
              
            </div>
          </div>
          
          {/* Éléments de design flottants autour du téléphone pour la "magie" */}
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1
