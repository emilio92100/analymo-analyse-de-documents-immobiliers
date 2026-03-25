import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
  const navigate = useNavigate();
  const totalDays = 30;

  const startDate = new Date("2026-03-25T00:00:00");
  const endDate = new Date(startDate.getTime() + totalDays * 24 * 60 * 60 * 1000);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      const elapsed = now - startDate.getTime();
      const total = endDate.getTime() - startDate.getTime();

      let progressValue = (elapsed / total) * 100;
      if (progressValue < 0) progressValue = 0;
      if (progressValue > 100) progressValue = 100;
      setProgress(progressValue);

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endDate, startDate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eef4f8] via-white to-[#f4f8fb] px-6 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-80px] left-[-80px] h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-60px] h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full rounded-[32px] border border-white/70 bg-white/80 p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-12"
        >
          <motion.img
            src="/logo.png"
            alt="Analymo"
            className="mx-auto h-52 md:h-72 w-auto mb-8 drop-shadow-xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Lancement en préparation
          </motion.div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">Analymo arrive bientôt</h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-xl">
            Comprenez vos documents immobiliers plus rapidement et détectez les points de vigilance avant de signer.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Jours", value: timeLeft.days },
              { label: "Heures", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Secondes", value: timeLeft.seconds },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-3xl font-black text-slate-900">{String(item.value).padStart(2, "0")}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl text-left">
            <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
              <span>Progression du lancement</span>
              <span className="font-semibold text-slate-900">{Math.round(progress)}%</span>
            </div>

            <div className="relative h-4 overflow-hidden rounded-full bg-slate-200/90 shadow-inner">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-slate-900 via-sky-700 to-cyan-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-y-0 w-24 bg-white/30 blur-md"
                animate={{ x: ["-20%", "120%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <p className="mt-3 text-center text-sm text-slate-500">
              Mise en ligne prévue dans environ {totalDays} jours à partir du lancement du teasing.
            </p>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
            >
              Être informé
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/example")}
              className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voir un aperçu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
