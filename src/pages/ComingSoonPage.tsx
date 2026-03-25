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
    <div className="relative min-h-screen overflow-hidden bg-[#f5f9fc] text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="absolute right-[-140px] top-[8%] h-[340px] w-[340px] rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[20%] h-[280px] w-[280px] rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-6 md:px-10 lg:px-16">
        <motion.img
          src="/logo.png"
          alt="Analymo"
          className="mx-auto h-20 w-auto md:h-24"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Lancement premium en préparation
            </div>

            <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-tight text-slate-950 md:text-6xl">
              L’analyse
              <br />
              immobilière
              <br />
              nouvelle génération
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-xl">
              Analymo vous aide à lire, comprendre et anticiper les points clés de vos documents immobiliers avec une
              expérience plus claire, plus élégante et plus rassurante.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                Lecture simplifiée
              </div>
              <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                Points de vigilance
              </div>
              <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                Vision plus claire
              </div>
            </div>

            <div className="mt-8 max-w-xl">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                <span>Progression du lancement</span>
                <span className="font-semibold text-slate-900">{Math.round(progress)}%</span>
              </div>

              <div className="relative h-4 overflow-hidden rounded-full bg-slate-200/90 shadow-inner">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0f3d5a] via-[#155e75] to-[#22d3ee]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-y-0 w-24 bg-white/40 blur-md"
                  animate={{ x: ["-20%", "140%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Jours", value: timeLeft.days },
                { label: "Heures", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Secondes", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/80 bg-white/85 p-4 text-center shadow-sm backdrop-blur"
                >
                  <p className="text-2xl font-black text-slate-950 md:text-3xl">
                    {String(item.value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                rotateY: [0, 6, 0, -6, 0],
                rotateX: [0, 2, 0, -2, 0],
                y: [0, -8, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative [perspective:1200px]"
            >
              <div className="relative h-[470px] w-[235px] rounded-[38px] border border-white/80 bg-slate-950 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.20)] md:h-[530px] md:w-[265px]">
                <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full border border-slate-800 bg-slate-900" />

                <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-gradient-to-br from-white via-slate-50 to-sky-50">
                  <div className="absolute inset-0">
                    <div className="absolute left-5 top-8 h-20 w-20 rounded-full bg-cyan-100/60 blur-2xl" />
                    <div className="absolute bottom-6 right-5 h-20 w-20 rounded-full bg-sky-100/60 blur-2xl" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col px-4 py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Analyse</p>
                        <p className="mt-1 text-base font-bold text-slate-950 md:text-lg">Résultat intelligent</p>
                      </div>
                      <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 md:text-xs">
                        Actif
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                      <div className="relative flex h-24 w-24 items-center justify-center md:h-28 md:w-28">
                        <div className="absolute inset-0 rounded-full border-[9px] border-slate-200" />
                        <div className="absolute inset-0 rounded-full border-[9px] border-transparent border-t-[#0f3d5a] border-r-[#0f3d5a]" />
                        <span className="text-3xl font-black text-slate-950 md:text-4xl">7</span>
                      </div>
                    </div>

                    <p className="mt-4 text-center text-sm font-semibold text-slate-900">Vue d’ensemble du document</p>
                    <p className="mt-1 text-center text-xs text-slate-500 md:text-sm">
                      Lecture claire, fluide et rassurante
                    </p>

                    <div className="mt-6 space-y-3">
                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                        <p className="text-sm font-semibold text-emerald-800">3 points positifs</p>
                        <p className="mt-1 text-xs text-emerald-700/80">Informations bien identifiées</p>
                      </div>

                      <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                        <p className="text-sm font-semibold text-amber-800">2 vigilances</p>
                        <p className="mt-1 text-xs text-amber-700/80">Éléments à clarifier</p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <p className="text-sm font-semibold text-slate-800">Synthèse premium</p>
                        <p className="mt-1 text-xs text-slate-500">Très prochainement</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <div className="h-2 w-full rounded-full bg-slate-100" />
                    </div>
                  </div>

                  <motion.div
                    className="pointer-events-none absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent"
                    animate={{ y: [70, 390, 70] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="pointer-events-none absolute left-4 right-4 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
                    animate={{ y: [90, 410, 90] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* cards below phone */}
            <div className="mt-5 grid w-full max-w-[360px] grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-left shadow-lg backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Détection</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">PV d’AG reconnu</p>
              </div>

              <div className="rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-left shadow-lg backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Synthèse</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Points clés extraits</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
