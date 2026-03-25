import { motion } from "framer-motion";
import { useMemo } from "react";

export default function LaunchPage() {
  const launchDate = new Date("2026-04-25T10:00:00");
  const startDate = new Date("2026-03-26T10:00:00");

  const { progress, daysLeft, hoursLeft } = useMemo(() => {
    const now = new Date();

    const total = launchDate.getTime() - startDate.getTime();
    const elapsed = Math.min(Math.max(now.getTime() - startDate.getTime(), 0), total);

    const percent = total > 0 ? Math.round((elapsed / total) * 100) : 0;

    const remainingMs = Math.max(launchDate.getTime() - now.getTime(), 0);
    const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return {
      progress: percent,
      daysLeft: days,
      hoursLeft: hours,
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(226,232,240,0.8),_transparent_28%),linear-gradient(180deg,_#fbfcfe_0%,_#f4f8fc_100%)]" />

      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-slate-100 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </motion.div>

        <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
            >
              Lancement en préparation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-slate-800 md:text-7xl"
            >
              Analymo arrive
              <br />
              bientôt
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 max-w-xl text-lg leading-8 text-slate-500 md:text-xl"
            >
              Notre outil d’analyse de documents immobiliers se prépare. Une expérience plus fluide, plus claire et plus
              moderne arrive bientôt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mt-10 rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_50px_rgba(148,163,184,0.12)] backdrop-blur"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
                    Progression réelle
                  </div>
                  <div className="mt-2 text-lg text-slate-500">
                    Mise en ligne dans <span className="font-semibold text-[#23406c]">{daysLeft} j</span> et{" "}
                    <span className="font-semibold text-[#23406c]">{hoursLeft} h</span>
                  </div>
                </div>

                <motion.div
                  key={progress}
                  initial={{ scale: 0.92, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-right"
                >
                  <div className="text-5xl font-bold tracking-[-0.04em] text-[#23406c]">{progress}%</div>
                </motion.div>
              </div>

              <div className="mt-6">
                <div className="relative h-3.5 overflow-hidden rounded-full bg-slate-200/80">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#274b80] via-[#5d8fdb] to-[#9ed4c0]"
                  />

                  <motion.div
                    animate={{ x: ["-100%", "350%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 h-full w-24 bg-white/30 blur-md"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85 }}
            className="flex justify-center"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/70 blur-3xl" />

                <div className="relative h-[460px] w-[220px] rounded-[36px] border-[7px] border-[#26374f] bg-[#26374f] p-[7px] shadow-[0_30px_60px_rgba(15,23,42,0.16)]">
                  <div className="absolute left-1/2 top-[10px] h-[22px] w-[96px] -translate-x-1/2 rounded-full bg-[#26374f]" />

                  <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,_#fcfdff_0%,_#f2f6fb_100%)] p-4">
                    <motion.div
                      animate={{ y: ["-20%", "115%"] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-2 right-2 h-16 rounded-full bg-gradient-to-b from-transparent via-sky-100/80 to-transparent blur-md"
                    />

                    <div className="relative z-10 flex items-center justify-between text-[12px] font-semibold text-slate-700">
                      <span>9:41</span>
                      <span>5G</span>
                    </div>

                    <div className="relative z-10 mt-5">
                      <div className="text-[15px] font-semibold text-slate-800">Analyse du document</div>
                      <div className="mt-1 text-[12px] text-slate-400">Lecture intelligente en cours</div>
                    </div>

                    <motion.div
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      className="relative z-10 mt-6 rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm"
                    >
                      <div className="space-y-3">
                        <div className="h-2.5 w-[82%] rounded-full bg-slate-200" />
                        <div className="h-2.5 w-[65%] rounded-full bg-slate-200" />
                        <div className="h-2.5 w-[90%] rounded-full bg-slate-200" />
                        <div className="h-2.5 w-[58%] rounded-full bg-slate-200" />
                      </div>
                    </motion.div>

                    <div className="relative z-10 mt-5 space-y-3">
                      {["Détection du document", "Extraction des données", "Préparation du rapport"].map(
                        (item, index) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0.6, x: 0 }}
                            animate={{ opacity: [0.6, 1, 0.6], x: [0, 4, 0] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              delay: index * 0.35,
                            }}
                            className="flex items-center gap-3 rounded-2xl bg-white/85 px-3 py-3 shadow-sm"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-[#274b80]" />
                            <span className="text-[12px] font-medium text-slate-600">{item}</span>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="mt-8 rounded-[24px] border border-slate-200 bg-white/90 px-5 py-4 text-center shadow-[0_16px_35px_rgba(148,163,184,0.12)]"
              >
                <div className="text-sm text-slate-400">Expérience en préparation</div>
                <div className="mt-1 text-lg font-semibold text-slate-800">Moderne, claire et rassurante</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
