import { motion } from "framer-motion";
import { useMemo } from "react";

export default function LaunchPage() {
  const startDate = new Date("2026-03-26T00:00:00");
  const launchDate = new Date("2026-04-25T00:00:00");

  const { progress, daysLeft, currentStep } = useMemo(() => {
    const now = new Date();

    const total = launchDate.getTime() - startDate.getTime();
    const elapsed = Math.min(Math.max(now.getTime() - startDate.getTime(), 0), total);

    const percent = total > 0 ? Math.round((elapsed / total) * 100) : 0;

    const remainingMs = Math.max(launchDate.getTime() - now.getTime(), 0);
    const days = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));

    let step = 1;
    if (percent >= 25) step = 2;
    if (percent >= 50) step = 3;
    if (percent >= 75) step = 4;
    if (percent >= 100) step = 5;

    return {
      progress: percent,
      daysLeft: days,
      currentStep: step,
    };
  }, []);

  const steps = [
    { label: "Structure", threshold: 0 },
    { label: "Design", threshold: 25 },
    { label: "Tests", threshold: 50 },
    { label: "Finalisation", threshold: 75 },
    { label: "Ouverture", threshold: 100 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
      {/* Fond */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.30),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(226,232,240,0.70),_transparent_28%),linear-gradient(180deg,_#fbfcfe_0%,_#f4f8fc_100%)]" />

      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-28 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-slate-100 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 sm:px-6 md:px-8 lg:px-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </motion.div>

        {/* Bloc central responsive */}
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Texte */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
            >
              Ouverture prévue le 25 avril 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-7 max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Sécurisez votre
              <br />
              achat immobilier
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-7 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg md:text-xl"
            >
              Analysez les documents de façon claire, comprenez la santé financière de l’immeuble, les diagnostics, les
              travaux à venir dans les PV d’assemblée générale, et avancez avec une vision plus sûre avant de signer.
            </motion.p>

            {/* Barre de progression */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="mt-10 w-full max-w-3xl rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_50px_rgba(148,163,184,0.12)] backdrop-blur sm:p-6"
            >
              <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
                  Progression du lancement
                </div>

                <div className="text-base text-slate-500 sm:text-lg">
                  Disponibilité dans <span className="font-semibold text-[#23406c]">{daysLeft} jours</span>
                </div>
              </div>

              <div className="mt-7">
                <div className="relative h-4 overflow-visible rounded-full bg-slate-200/80">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#274b80] via-[#5d8fdb] to-[#9ed4c0]"
                  />

                  {/* Effet vivant permanent */}
                  <motion.div
                    animate={{ x: ["-120%", "420%"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 h-full w-24 rounded-full bg-white/35 blur-md"
                  />

                  {/* Curseur */}
                  <motion.div
                    animate={{ left: `calc(${progress}% - 16px)` }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border-4 border-white bg-[#274b80] shadow-[0_8px_20px_rgba(39,75,128,0.22)]"
                  />
                </div>

                {/* Paliers */}
                <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-3">
                  {steps.map((step, index) => {
                    const active = progress >= step.threshold;
                    const current = currentStep === index + 1;

                    return (
                      <div key={step.label} className="flex flex-col items-center">
                        <motion.div
                          animate={current ? { scale: [1, 1.08, 1] } : {}}
                          transition={{ duration: 1.8, repeat: Infinity }}
                          className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold sm:h-10 sm:w-10 sm:text-sm ${
                            active
                              ? "border-[#274b80] bg-[#274b80] text-white"
                              : "border-slate-300 bg-white text-slate-400"
                          }`}
                        >
                          {index + 1}
                        </motion.div>

                        <div
                          className={`mt-2 text-center text-[11px] font-medium leading-4 sm:mt-3 sm:text-sm ${
                            active ? "text-slate-700" : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Téléphone */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative flex w-full max-w-[280px] items-center justify-center sm:max-w-[300px] md:max-w-[320px]">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/70 blur-3xl sm:h-[260px] sm:w-[260px]" />

                <div className="relative h-[390px] w-[190px] rounded-[32px] border-[7px] border-[#26374f] bg-[#26374f] p-[7px] shadow-[0_30px_60px_rgba(15,23,42,0.14)] sm:h-[420px] sm:w-[200px] md:h-[450px] md:w-[215px]">
                  <div className="absolute left-1/2 top-[10px] h-[18px] w-[82px] -translate-x-1/2 rounded-full bg-[#26374f] sm:h-[20px] sm:w-[88px]" />

                  <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,_#fcfdff_0%,_#f2f6fb_100%)] p-3 sm:rounded-[26px] sm:p-4">
                    {/* Scan vertical */}
                    <motion.div
                      animate={{ y: ["-20%", "115%"] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-2 right-2 h-14 rounded-full bg-gradient-to-b from-transparent via-sky-100/80 to-transparent blur-md sm:h-16"
                    />

                    <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold text-slate-700 sm:text-[12px]">
                      <span>9:41</span>
                      <span>5G</span>
                    </div>

                    <div className="relative z-10 mt-4 sm:mt-5">
                      <div className="text-[13px] font-semibold text-slate-800 sm:text-[15px]">Analyse du document</div>
                      <div className="mt-1 text-[11px] text-slate-400 sm:text-[12px]">Traitement intelligent</div>
                    </div>

                    {/* Document */}
                    <motion.div
                      animate={{ opacity: [0.82, 1, 0.82] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      className="relative z-10 mt-5 rounded-[20px] border border-slate-200 bg-white/90 p-3 shadow-sm sm:mt-6 sm:rounded-[24px] sm:p-4"
                    >
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="h-2.5 w-[84%] rounded-full bg-slate-200" />
                        <div className="h-2.5 w-[67%] rounded-full bg-slate-200" />
                        <div className="h-2.5 w-[90%] rounded-full bg-slate-200" />
                        <div className="h-2.5 w-[58%] rounded-full bg-slate-200" />
                      </div>
                    </motion.div>

                    {/* Étapes dans le téléphone */}
                    <div className="relative z-10 mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                      {["Détection du document", "Lecture des données", "Préparation du rapport"].map((item, index) => (
                        <motion.div
                          key={item}
                          animate={{ opacity: [0.6, 1, 0.6], x: [0, 4, 0] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: index * 0.35,
                          }}
                          className="flex items-center gap-2.5 rounded-2xl bg-white/85 px-3 py-2.5 shadow-sm sm:gap-3 sm:px-3 sm:py-3"
                        >
                          <div className="h-2.5 w-2.5 rounded-full bg-[#274b80]" />
                          <span className="text-[11px] font-medium text-slate-600 sm:text-[12px]">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
