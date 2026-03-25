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
    <div className="relative min-h-screen overflow-hidden bg-[#f6fbff] text-slate-900">
      {/* Background lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute right-[-100px] top-[15%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[10%] h-[340px] w-[340px] rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <motion.img
              src="/logo.png"
              alt="Analymo"
              className="mx-auto mb-8 h-24 md:h-28 lg:mx-0 lg:h-32 w-auto drop-shadow-[0_20px_35px_rgba(15,23,42,0.12)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Lancement premium en préparation
            </div>

            <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-6xl">
              Analymo
              <br />
              arrive bientôt
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-xl lg:mx-0">
              Une nouvelle façon de lire, comprendre et anticiper les risques dans les documents immobiliers, avec une
              expérience plus claire, plus moderne et plus rassurante.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Jours", value: timeLeft.days },
                { label: "Heures", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Secondes", value: timeLeft.seconds },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur"
                >
                  <p className="text-3xl font-black text-slate-950">{String(item.value).padStart(2, "0")}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 max-w-2xl">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                <span>Progression du lancement</span>
                <span className="font-semibold text-slate-900">{Math.round(progress)}%</span>
              </div>

              <div className="relative h-4 overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-slate-950 via-sky-700 to-cyan-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-y-0 w-28 bg-white/40 blur-md"
                  animate={{ x: ["-20%", "140%"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <p className="mt-3 text-sm text-slate-500">Une expérience plus premium est en cours de finalisation.</p>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute h-[420px] w-[420px] rounded-full bg-cyan-200/30 blur-3xl" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Phone shell */}
              <div className="relative h-[620px] w-[300px] rounded-[42px] border border-white/80 bg-slate-950 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
                <div className="absolute left-1/2 top-3 h-6 w-28 -translate-x-1/2 rounded-full bg-slate-900 border border-slate-800" />

                {/* Screen */}
                <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-gradient-to-br from-slate-50 via-white to-sky-50">
                  {/* Screen decor */}
                  <div className="absolute inset-0">
                    <div className="absolute left-6 top-8 h-24 w-24 rounded-full bg-cyan-100/60 blur-2xl" />
                    <div className="absolute bottom-10 right-6 h-24 w-24 rounded-full bg-sky-100/60 blur-2xl" />
                  </div>

                  {/* App content */}
                  <div className="relative z-10 flex h-full flex-col px-5 py-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Analyse</p>
                        <p className="mt-1 text-lg font-bold text-slate-950">Document détecté</p>
                      </div>
                      <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Scan actif
                      </div>
                    </div>

                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">PV d’assemblée générale</p>
                          <p className="mt-1 text-xs text-slate-500">Détection des signaux clés en cours</p>
                        </div>
                        <div className="rounded-xl bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                          PDF
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="h-3 w-full rounded-full bg-slate-100" />
                        <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                        <div className="h-3 w-4/6 rounded-full bg-slate-100" />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Travaux</p>
                        <p className="mt-2 text-2xl font-black text-slate-950">03</p>
                        <p className="mt-1 text-xs text-slate-500">éléments repérés</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Alertes</p>
                        <p className="mt-2 text-2xl font-black text-slate-950">02</p>
                        <p className="mt-1 text-xs text-slate-500">points sensibles</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">Lecture intelligente</p>
                        <p className="text-xs font-medium text-slate-500">En cours</p>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                            <p className="text-sm font-medium text-slate-800">Identification du type de document</p>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-3">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                            <p className="text-sm font-medium text-slate-800">Extraction des points de vigilance</p>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-3">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                            <p className="text-sm font-medium text-slate-800">Synthèse premium bientôt disponible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scanning line */}
                  <motion.div
                    className="pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent"
                    animate={{ y: [20, 500, 20] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="pointer-events-none absolute left-6 right-6 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
                    animate={{ y: [60, 520, 60] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                className="absolute -left-16 top-24 hidden rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-xl backdrop-blur md:block"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Détection</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Document analysé</p>
              </motion.div>

              <motion.div
                className="absolute -right-16 bottom-24 hidden rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-xl backdrop-blur md:block"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Signal</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Points clés extraits</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
