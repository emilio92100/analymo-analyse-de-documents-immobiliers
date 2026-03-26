import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function LaunchPage() {
  const startDate = new Date("2026-03-22T00:00:00").getTime();
  const launchDate = new Date("2026-04-25T00:00:00").getTime();

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { progress, daysLeft, hoursLeft, minutesLeft, secondsLeft, currentStep } = useMemo(() => {
    const total = launchDate - startDate;
    const elapsed = Math.min(Math.max(now - startDate, 0), total);
    const percent = total > 0 ? (elapsed / total) * 100 : 0;

    const remaining = Math.max(launchDate - now, 0);

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    let step = 1;
    if (percent >= 25) step = 2;
    if (percent >= 50) step = 3;
    if (percent >= 75) step = 4;
    if (percent >= 100) step = 5;

    return {
      progress: Math.min(100, percent),
      daysLeft: days,
      hoursLeft: hours,
      minutesLeft: minutes,
      secondsLeft: seconds,
      currentStep: step,
    };
  }, [now]);

  const steps = [
    { label: "Structure", threshold: 0 },
    { label: "Design", threshold: 25 },
    { label: "Tests", threshold: 50 },
    { label: "Finalisation", threshold: 75 },
    { label: "Ouverture", threshold: 100 },
  ];

  const countdown = [
    { value: daysLeft, short: "J", long: "Jours" },
    { value: hoursLeft, short: "H", long: "Heures" },
    { value: minutesLeft, short: "Min", long: "Minutes" },
    { value: secondsLeft, short: "Sec", long: "Secondes" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc] px-5 py-8">
      <div className="mx-auto max-w-6xl text-center">
        <img src="/logo.png" className="mx-auto h-16 mb-6" />

        <h1 className="text-4xl md:text-6xl font-bold text-[#274b80]">Sécurisez votre achat immobilier</h1>

        <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
          Analysez les documents, détectez les risques, les travaux à venir et comprenez la santé financière avant
          d’acheter.
        </p>

        {/* COUNTDOWN */}
        <div className="grid grid-cols-4 gap-3 mt-10">
          {countdown.map((item) => (
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="text-2xl font-bold text-[#274b80]">{String(item.value).padStart(2, "0")}</div>
              <div className="text-xs text-slate-400 sm:hidden">{item.short}</div>
              <div className="text-xs text-slate-400 hidden sm:block">{item.long}</div>
            </div>
          ))}
        </div>

        {/* PROGRESSION */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-slate-400">Progression</span>
            <span className="text-xl font-bold text-[#274b80]">{Math.floor(progress)}%</span>
          </div>

          <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#274b80] to-blue-400"
            />

            <motion.div
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute w-20 h-full bg-white/30 blur-md"
            />
          </div>

          {/* PALIERS */}
          <div className="grid grid-cols-5 mt-6 text-xs">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    progress >= step.threshold ? "bg-[#274b80] text-white" : "bg-slate-200"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="mt-2 text-[10px] sm:text-xs">{step.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TELEPHONE PROPRE */}
        <div className="mt-16 flex justify-center">
          <motion.div
            animate={{
              rotateY: [0, 8, 0, -8, 0],
              y: [0, -6, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-[220px] h-[440px] bg-white rounded-[40px] shadow-xl border border-slate-200 p-4 relative"
          >
            <div className="text-center text-sm font-semibold mb-4">Analyse en cours</div>

            {/* document */}
            <div className="relative w-[120px] h-[170px] bg-white mx-auto rounded-xl shadow p-3">
              {/* lignes */}
              <div className="h-2 bg-slate-200 rounded mb-2" />
              <div className="h-2 bg-slate-200 rounded mb-2" />
              <div className="h-2 bg-slate-200 rounded mb-2" />

              {/* scan centré */}
              <motion.div
                animate={{ y: [0, 120, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute left-0 right-0 h-[3px] bg-blue-400 shadow"
              />

              <motion.div
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 border-2 border-blue-300 rounded-xl"
              />
            </div>

            {/* infos */}
            <div className="mt-6 space-y-2 text-xs">
              <div>✔ Document identifié</div>
              <div>✔ Données extraites</div>
              <div>✔ Rapport généré</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
