import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
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
    <div className="relative min-h-screen overflow-hidden bg-[#f7fafc] px-6 py-12 text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-sky-100/50 blur-3xl" />
        <div className="absolute right-[-100px] top-[10%] h-[300px] w-[300px] rounded-full bg-cyan-100/40 blur-3xl" />
        <div className="absolute bottom-[-140px] left-[20%] h-[300px] w-[300px] rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="w-full text-center">
          <motion.img
            src="/logo.png"
            alt="Analymo"
            className="mx-auto h-28 md:h-36 w-auto drop-shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.6 },
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Lancement premium en préparation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-6xl"
          >
            L’analyse immobilière
            <br />
            nouvelle génération arrive bientôt
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.55 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-xl"
          >
            Une expérience plus claire, plus élégante et plus rassurante pour comprendre rapidement vos documents
            immobiliers avant de signer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-14 max-w-4xl"
          >
            <div className="relative mx-auto flex max-w-3xl items-center justify-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[340px]"
              >
                <div className="rounded-[42px] border border-slate-200 bg-slate-950 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
                  <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-white via-slate-50 to-sky-50 px-6 pb-8 pt-8">
                    <div className="absolute left-1/2 top-3 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-900" />

                    <div className="mt-8">
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-8 border-slate-200 border-t-[#0f3d5a] text-2xl font-black text-slate-900">
                        7
                      </div>

                      <p className="text-sm font-semibold text-slate-900">Résultat d’analyse</p>
                      <p className="mt-1 text-xs text-slate-500">Lecture simplifiée en préparation</p>

                      <div className="mt-6 space-y-3">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-left">
                          <p className="text-sm font-semibold text-emerald-800">3 points positifs</p>
                          <p className="mt-1 text-xs text-emerald-700/80">Présentation claire et lisible</p>
                        </div>

                        <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-left">
                          <p className="text-sm font-semibold text-amber-800">2 vigilances</p>
                          <p className="mt-1 text-xs text-amber-700/80">Détection plus fine en cours</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm">
                          <p className="text-sm font-semibold text-slate-800">Synthèse intelligente</p>
                          <p className="mt-1 text-xs text-slate-500">Bientôt disponible</p>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="pointer-events-none absolute left-4 right-4 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                      animate={{ y: [90, 420, 90] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                      className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent"
                      animate={{ y: [70, 400, 70] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                <div className="absolute -left-20 top-20 hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-left shadow-xl backdrop-blur md:block">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Détection</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">Analyse en cours</p>
                </div>

                <div className="absolute -right-20 bottom-20 hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-left shadow-xl backdrop-blur md:block">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Synthèse</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">Sortie prochaine</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="mx-auto mt-14 max-w-3xl"
          >
            <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
              <span>Progression du lancement</span>
              <span className="font-semibold text-slate-900">{Math.round(progress)}%</span>
            </div>

            <div className="relative h-4 overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0f3d5a] via-[#155e75] to-[#22d3ee]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-y-0 w-24 bg-white/35 blur-md"
                animate={{ x: ["-20%", "140%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Jours", value: timeLeft.days },
                { label: "Heures", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Secondes", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur"
                >
                  <p className="text-3xl font-black text-slate-950">{String(item.value).padStart(2, "0")}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
