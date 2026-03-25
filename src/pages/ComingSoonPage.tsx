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
    <div className="relative min-h-screen overflow-hidden bg-[#f4f8fb] text-slate-900">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-140px] top-[-90px] h-[340px] w-[340px] rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="absolute right-[-120px] top-[8%] h-[360px] w-[360px] rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute bottom-[-140px] left-[25%] h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-6 md:px-10 lg:px-16">
        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center"
        >
          <motion.img
            src="/logo.png"
            alt="Analymo"
            className="h-28 w-auto md:h-34"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c8d8e7] bg-white/85 px-5 py-2.5 text-sm font-medium text-[#23476a] shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1f4b7a]" />
            Bientôt disponible
          </div>

          <p className="mt-5 text-center text-xs uppercase tracking-[0.22em] text-[#7b93ad] md:text-sm">
            Analyses intelligentes de documents immobiliers
          </p>
        </motion.div>

        {/* Main */}
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-[#17385b] md:text-6xl">
              Analysez vos
              <br />
              documents
              <br />
              immobiliers
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#607a96] md:text-xl">
              Score global, risques cachés, impact financier : tout ce qu’il faut savoir avant de signer, expliqué
              simplement en quelques minutes.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {[
                { label: "Jours", value: timeLeft.days },
                { label: "Heures", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -3 }}
                  className="rounded-3xl border border-[#d9e4ef] bg-white/90 p-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur"
                >
                  <p className="text-3xl font-black text-[#1e4068]">{String(item.value).padStart(2, "0")}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#8aa0b7]">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-8 rounded-[30px] border border-[#dbe6f0] bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8aa0b7]">Progression</p>
                  <p className="mt-2 text-xl text-[#607a96]">
                    Jour{" "}
                    <span className="font-bold text-[#1e4068]">
                      {Math.min(totalDays, Math.max(0, Math.floor((progress / 100) * totalDays)))}
                    </span>{" "}
                    / {totalDays}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-5xl font-black leading-none text-[#1e4068]">{Math.round(progress)}%</p>
                  <p className="mt-2 text-sm text-[#8aa0b7]">J-{Math.max(0, timeLeft.days)}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative h-3 overflow-hidden rounded-full bg-[#dfe7ef] shadow-inner">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#17385b] via-[#285b87] to-[#7cc6d8]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-y-0 w-20 bg-white/50 blur-md"
                    animate={{ x: ["-10%", "140%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-[#9eb0c1]">
                  <span>Début</span>
                  <span>J-20</span>
                  <span>J-10</span>
                  <span>🚀</span>
                </div>
              </div>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[#6e89a5]">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span>🛡️</span>
                <span>Documents chiffrés</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span>🗑️</span>
                <span>Suppression auto</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span>📋</span>
                <span>Sans engagement</span>
              </div>
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dcecf6] blur-3xl" />

              <motion.div
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, 2, 0, -2, 0],
                  y: [0, -8, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative [perspective:1200px]"
              >
                <div className="relative h-[530px] w-[265px] rounded-[42px] border border-[#21384f] bg-[#1d3047] p-3 shadow-[0_30px_80px_rgba(15,23,42,0.20)]">
                  <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-[#1a2c41]" />

                  <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-gradient-to-br from-white via-[#f8fbfd] to-[#edf5fb] px-4 py-5">
                    <div className="absolute inset-0">
                      <div className="absolute left-5 top-8 h-20 w-20 rounded-full bg-cyan-100/60 blur-2xl" />
                      <div className="absolute bottom-6 right-5 h-20 w-20 rounded-full bg-sky-100/60 blur-2xl" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#8aa0b7]">Mon analyse</p>
                          <p className="mt-1 text-lg font-bold text-[#21384f]">Résultat d’analyse</p>
                        </div>
                        <div className="rounded-full bg-[#dff4e7] px-3 py-1 text-xs font-semibold text-[#3b9462]">
                          Terminé
                        </div>
                      </div>

                      <div className="mt-6 rounded-[24px] bg-[#22446c] p-5 text-white shadow-lg">
                        <div className="flex items-center gap-4">
                          <div className="relative flex h-16 w-16 items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[6px] border-white/20" />
                            <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-[#8de0c1] border-r-[#8de0c1]" />
                            <span className="text-2xl font-black">7</span>
                          </div>

                          <div>
                            <p className="text-lg font-bold">Score global</p>
                            <p className="text-sm text-white/75">Bien recommandé</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-[24px] bg-white/90 p-4 shadow-sm">
                        <p className="text-sm font-semibold text-[#21384f]">Analyse des charges</p>
                        <div className="mt-4 flex items-end gap-2">
                          {[22, 15, 30, 18, 38, 20, 28, 32, 16, 40].map((h, i) => (
                            <div
                              key={i}
                              className={`w-3 rounded-t-full ${i === 9 ? "bg-[#22446c]" : "bg-[#d7e4ef]"}`}
                              style={{ height: `${h}px` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="rounded-[22px] border border-[#d9efe0] bg-[#eef9f2] px-4 py-3">
                          <p className="text-sm font-semibold text-[#2e6d4f]">3 points positifs</p>
                          <p className="mt-1 text-xs text-[#6f9a83]">Finances saines, entretien correct</p>
                        </div>

                        <div className="rounded-[22px] border border-[#f4e5bf] bg-[#fbf5e8] px-4 py-3">
                          <p className="text-sm font-semibold text-[#966323]">2 vigilances</p>
                          <p className="mt-1 text-xs text-[#b1864e]">Points à vérifier avant décision</p>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="pointer-events-none absolute left-4 right-4 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                      animate={{ y: [85, 395, 85] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="pointer-events-none absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent"
                      animate={{ y: [70, 380, 70] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* floating chips */}
              <div className="absolute -right-8 top-16 rounded-[22px] border border-white/80 bg-white/90 px-5 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.10)] backdrop-blur md:-right-12">
                <p className="text-lg font-bold text-[#21384f]">100% sécurisé</p>
                <p className="mt-1 text-sm text-[#7f95aa]">Chiffré & supprimé</p>
              </div>

              <div className="absolute -left-8 bottom-16 rounded-[22px] border border-white/80 bg-white/90 px-5 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.10)] backdrop-blur md:-left-12">
                <p className="text-lg font-bold text-[#21384f]">PV scanné ✓</p>
              </div>

              <div className="absolute -right-10 bottom-28 rounded-[22px] border border-white/80 bg-white/90 px-5 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.10)] backdrop-blur md:-right-16">
                <p className="text-lg font-bold text-[#21384f]">Score : 7/10</p>
                <p className="mt-1 text-sm text-[#6db27f]">Bien recommandé</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center text-sm text-[#9bb0c3]">
          © 2025 Analymo · Analyses intelligentes de documents immobiliers
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
