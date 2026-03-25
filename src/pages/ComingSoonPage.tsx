import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 overflow-hidden font-sans text-[#1A2B3B]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
              Lancement prévu pour Avril 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Analyma<span className="text-blue-600">.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-md">
              L'IA qui déchiffre vos documents immobiliers en un clin d'œil. Ne signez plus jamais dans le noir.
            </p>
          </div>

          {/* Countdown Grid */}
          <div className="grid grid-cols-4 gap-4 max-w-sm">
            {[
              { label: "Jours", value: timeLeft.days },
              { label: "Hrs", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-blue-600">{unit.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{unit.label}</div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-3 max-w-md">
            <div className="flex justify-between text-sm font-medium">
              <span>Analyse en cours...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Phone Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          {/* Mockup iPhone */}
          <div className="relative w-[280px] h-[580px] bg-[#1A2B3B] rounded-[3rem] border-[8px] border-[#2A3B4B] shadow-2xl overflow-hidden">
            {/* Dynamic Content inside phone */}
            <div className="absolute inset-0 bg-white p-6 pt-12">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

              <div className="space-y-6">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="h-32 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 flex items-center justify-center"
                >
                  <span className="text-blue-400 text-sm font-medium italic">Document_Scanner.pdf</span>
                </motion.div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.5 }}
                      className="h-12 bg-gray-50 rounded-xl flex items-center px-4"
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${i === 1 ? "bg-green-400" : "bg-orange-400"}`} />
                      <div className="h-2 w-full bg-gray-200 rounded" />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-8 p-4 bg-blue-600 rounded-2xl text-white text-center font-bold text-sm shadow-lg"
                >
                  Génération du score : 8.5/10
                </motion.div>
              </div>
            </div>

            {/* Scanning Laser Effect */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
