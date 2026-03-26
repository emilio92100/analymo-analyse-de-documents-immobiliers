import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

const ComingSoonPage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Dates pour la progression continue
  const startDate = new Date("2026-02-26T00:00:00"); // Il y a 27 jours (par rapport au 25 Mars)
  const endDate = new Date("2026-04-25T00:00:00");   // Date cible

  // Tracking 3D pour le téléphone
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsed = now - startDate.getTime();
      const distance = endDate.getTime() - now;

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
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    mouseX.set(mouseXPos / width - 0.5); // Normalise entre -0.5 et 0.5
    y.set(mouseYPos / height - 0.5);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden font-sans text-[#0F172A] relative">
      
      {/* 1. LOGO DEPUIS PUBLIC (Haut à gauche) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-10 z-50"
      >
        <img src="/logo.png" alt="Analymo" className="h-10 md:h-12 w-auto object-contain" />
      </motion.div>

      {/* BACKGROUND ELEMENTS SUBTILS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-20 lg:mt-0">
        
        {/* SECTION TEXTE & PROGRESSION (GAUCHE) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12 w-full text-center" // Centré par défaut pour mobile
        >
          <div className="space-y-6">
            <h2 className="text-[#004262] font-bold tracking-[0.2em] text-xs uppercase">Phase finale de test</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-[#0F172A]">
              Analysez vos <br /> 
              <span className="text-[#004262]">documents <br /> immobiliers</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-lg mx-auto">
              Score global, risques cachés, impact financier — tout ce qu'il faut savoir avant de signer, expliqué simplement.
            </p>
          </div>

          {/* BARRE DE PROGRESSION À PALIERS */}
          <div className="space-y-5 max-w-sm mx-auto">
            <div className="flex justify-between items-end text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <span>Déploiement de l'outil</span>
              <span className="text-[#004262] text-sm font-semibold">{Math.round(progress)}%</span>
            </div>
            
            {/* Conteneur de la barre style "Glassmorphism" */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative shadow-inner p-0.5">
              
              {/* Le remplissage de la barre */}
              <motion.div 
                className="h-full bg-gradient-to-r from-[#004262] to-blue-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              
              {/* Lueur lumineuse flottante */}
              <motion.div 
                animate={{ x: [`-100%`, `200%`] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/2 bg-white/40 blur-sm rounded-full"
              />
              
              {/* Paliers visuels */}
              {[25, 50, 75].map((step) => (
                <div 
                  key={step}
                  className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${progress > step ? 'bg-white' : 'bg-slate-300'}`}
                  style={{ left: `${step}%` }}
                />
              ))}
            </div>
          </div>
          
          {/* COMPTEUR 30 JOURS (Sous la barre sur mobile) */}
          <div className="flex gap-6 justify-center">
            {[
              { label: 'Jours', value: timeLeft.days },
              { label: 'Heures', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col">
                <span className="text-4xl font-semibold text-[#004262] tabular-nums tracking-tighter">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">{unit.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION VISUELLE : TÉLÉPHONE 3D ANIMÉ AU CENTRE (DROITE) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative flex justify-center perspective-1000 lg:w-full lg:order-last" // lg:order-last pour le mettre à droite sur ordi
          ref={phoneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
          {/* Main Device Frame (3D Effect, réduit sur mobile) */}
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative w-[280px] h-[580px] md:w-[310px] md:h-[630px] bg-white rounded-[3.5rem] p-3 shadow-[0_50px_100px_rgba(0,0,0,0.06)] border border-white/60 group origin-center"
          >
            {/* Dynamic Island minimaliste */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0F172A] rounded-full z-40 shadow-inner" />
            
            {/* Écran interne */}
            <div className="h-full w-full bg-white/95 rounded-[2.8rem] overflow-hidden p-6 flex flex-col items-center relative shadow-inner">
              
              {/* Mini Logo délavé pour l'ambiance */}
              <img src="/logo.png" alt="Analymo" className="h-6 w-auto mt-10 mb-8 opacity-40 grayscale" />
              
              {/* Zone de scan laser dynamique */}
              <div className="relative h-44 w-full bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center overflow-hidden shadow-inner p-4 group">
                <div className="text-[10px] text-[#004262] font-bold uppercase tracking-widest mb-4 z-10">Analyse expert</div>
                
                {/* Lignes simulées */}
                <div className="w-full space-y-2 px-8 z-10 opacity-30 group-hover:opacity-50 transition-opacity">
                   <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                   <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
                   <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                </div>

                {/* LASER DE SCAN BLEU (Ultra-fin et précis) */}
                <motion.div 
                  className="absolute left-0 w-full h-[2px] bg-[#004262] shadow-[0_0_15px_#004262] z-30"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                />
              </div>

              {/* Résultats simulés (Cards) */}
              <motion.div 
                className="mt-8 w-full space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex gap-2">
                  <div className="h-8 w-full bg-green-50 rounded-lg border border-green-100 flex items-center justify-center text-[10px] text-green-600 font-bold">✓ POINTS CLÉS</div>
                  <div className="h-8 w-full bg-amber-50 rounded-lg border border-amber-100 flex items-center justify-center text-[10px] text-amber-600 font-bold">! VIGILANCES</div>
                </div>

                {/* Score final flottant */}
                <motion.div 
                  className="w-full p-6 mt-6 bg-[#004262] rounded-3xl text-white text-center shadow-3xl shadow-[#004262]/30 relative overflow-hidden"
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 1, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -5 }} // Interactif
                >
                  <div className="text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2 font-bold">Score d'Analyse</div>
                  <div className="text-6xl font-extrabold tracking-tighter tabular-nums">7.4<span className="text-xl opacity-40 font-medium">/10</span></div>
                  <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                </motion.div>
              </motion.div>
              
              {/* Barre de navigation fictive en bas */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-100 rounded-full" />
            </div>
          </div>
          
          {/* Éléments de design flottants autour du téléphone pour la "magie" */}
          <motion.div 
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -right-12 w-36 h-36 border border-dashed border-slate-100 rounded-full -z-10 opacity-70"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default ComingSoonPage;
