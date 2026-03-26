import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function LaunchPage() {
  // Début il y a 30 jours
  const startDate = new Date("2026-02-24T00:00:00").getTime();
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
      progress: Math.max(0, Math.min(100, percent)),
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
    { value: daysLeft, mobile: "J", desktop: "Jours" },
    { value: hoursLeft, mobile: "H", desktop: "Heures" },
    { value: minutesLeft, mobile: "Min", desktop: "Minutes" },
    { value: secondsLeft, mobile: "Sec", desktop: "Secondes" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f9fd] text-slate-800">
      {/* Fond */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.34),_transparent_28%),radial-gradient(circle_at_right,_rgba(219,234,254,0.45),_transparent_26%),linear-gradient(180deg,_#fbfdff_0%,_#f3f8fc_100%)]" />

      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-28 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-50 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8 sm:px-6 md:px-8 lg:px-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </motion.div>

        {/* Hero */}
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
          >
            Ouverture prévue le 25 avril 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 max-w-4xl text-4xl font-bold leading-[0.96] tracking-[-0.04em] text-[#274b80] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Sécurisez votre
            <br />
            achat immobilier
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg md:text-xl"
          >
            Analysez les documents de façon claire, détectez la santé financière de l’immeuble, les diagnostics, les
            travaux à venir dans les PV, et avancez avec une vision plus sûre avant de signer.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="mx-auto mt-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,430px)] lg:gap-14">
          {/* Progression */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 rounded-[34px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_25px_60px_rgba(148,163,184,0.14)] backdrop-blur sm:p-7 lg:order-1"
          >
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {countdown.map((item) => (
                  <motion.div
                    key={item.desktop}
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="min-w-0 rounded-[22px] border border-slate-200 bg-[#fcfdff] px-2 py-4 text-center shadow-sm sm:px-3"
                  >
                    <div className="text-xl font-bold tracking-[-0.04em] text-[#274b80] sm:text-3xl">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-400 sm:hidden">
                      {item.mobile}
                    </div>
                    <div className="mt-1 hidden text-xs font-medium uppercase tracking-[0.14em] text-slate-400 sm:block">
                      {item.desktop}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center lg:text-left">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
                  Progression du lancement
                </div>
                <div className="mt-3 text-base leading-7 text-slate-500 sm:text-lg">
                  Le déploiement a commencé il y a 30 jours et progresse en continu jusqu’au 25 avril 2026.
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-400">Avancement global</span>
                  <motion.span
                    key={Math.floor(progress)}
                    initial={{ scale: 0.94, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl font-bold tracking-[-0.04em] text-[#274b80] sm:text-4xl"
                  >
                    {Math.floor(progress)}%
                  </motion.span>
                </div>

                <div className="relative h-5 overflow-hidden rounded-full bg-slate-200/80">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#274b80] via-[#5d8fdb] to-[#98d5c3]"
                  />

                  <motion.div
                    animate={{ x: ["-120%", "420%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-0 h-full w-28 rounded-full bg-white/35 blur-md"
                  />

                  <motion.div
                    animate={{ left: `calc(${progress}% - 18px)` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border-4 border-white bg-[#274b80] shadow-[0_8px_22px_rgba(39,75,128,0.22)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {steps.map((step, index) => {
                  const active = progress >= step.threshold;
                  const current = currentStep === index + 1;

                  return (
                    <div key={step.label} className="flex min-w-0 flex-col items-center">
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
                        className={`mt-2 break-words text-center text-[10px] font-medium leading-4 sm:mt-3 sm:text-sm ${
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

          {/* Téléphone entièrement refait */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative flex w-full items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.72, 1, 0.72] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-[290px] w-[290px] rounded-full bg-sky-100/80 blur-3xl sm:h-[340px] sm:w-[340px]"
              />

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateY: [0, 9, 0, -9, 0],
                  rotateX: [0, 3, 0, -3, 0],
                  rotateZ: [0, 0.7, 0, -0.7, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-[103%] h-10 w-44 -translate-x-1/2 rounded-full bg-slate-400 blur-2xl"
                />

                <div className="relative h-[500px] w-[245px] rounded-[44px] border border-white/80 bg-[linear-gradient(180deg,_#edf3fa_0%,_#d8e4f1_100%)] p-[5px] shadow-[0_32px_70px_rgba(15,23,42,0.16)]">
                  <div className="absolute -left-[2px] top-[112px] h-14 w-[3px] rounded-full bg-[#c8d4e3]" />
                  <div className="absolute -right-[2px] top-[126px] h-20 w-[3px] rounded-full bg-[#c8d4e3]" />
                  <div className="absolute left-1/2 top-[10px] h-[18px] w-[88px] -translate-x-1/2 rounded-full bg-[#d4ddea]" />

                  <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[linear-gradient(180deg,_#ffffff_0%,_#f5f9fe_100%)] px-4 pb-4 pt-5">
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-50/80 to-transparent" />

                    <motion.div
                      animate={{ x: [-55, 145, -55] }}
                      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 h-full w-12 rotate-[8deg] bg-white/25 blur-md"
                    />

                    <div className="relative z-20 flex items-center justify-between text-[12px] font-semibold text-slate-600">
                      <span>9:41</span>
                      <span>5G</span>
                    </div>

                    <div className="relative z-20 mt-5 text-center">
                      <div className="text-[15px] font-semibold text-slate-800">Analyse intelligente</div>
                      <div className="mt-1 text-[12px] text-slate-400">Vue synthétique du dossier</div>
                    </div>

                    {/* carte principale */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-20 mt-6 rounded-[28px] border border-slate-200 bg-white/96 p-4 shadow-[0_16px_32px_rgba(148,163,184,0.14)]"
                    >
                      <div className="flex items-center gap-4">
                        {/* anneau score */}
                        <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-[7px] border-slate-200 border-t-[#274b80] border-r-[#74a2e8]"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[8px] rounded-full border-[5px] border-transparent border-l-[#98d5c3] border-b-[#274b80]"
                          />
                          <div className="relative z-10 text-center">
                            <div className="text-[22px] font-bold leading-none text-[#274b80]">8.2</div>
                            <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.08em] text-slate-400">
                              score
                            </div>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-[14px] font-semibold text-slate-800">Achat bien sécurisé</div>
                          <div className="mt-1 text-[11px] leading-5 text-slate-400">
                            Synthèse rapide de la copropriété et des points de vigilance.
                          </div>
                        </div>
                      </div>

                      {/* scan central premium */}
                      <div className="relative mt-4 rounded-[20px] border border-slate-100 bg-[#f8fbff] p-4">
                        <div className="space-y-3">
                          <div className="h-2.5 w-[78%] rounded-full bg-slate-200" />
                          <div className="h-2.5 w-[92%] rounded-full bg-slate-200" />
                          <div className="h-2.5 w-[66%] rounded-full bg-slate-200" />
                          <div className="h-2.5 w-[84%] rounded-full bg-slate-200" />
                        </div>

                        <motion.div
                          animate={{
                            opacity: [0.3, 0.85, 0.3],
                            scale: [1, 1.01, 1],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-x-6 top-4 bottom-4 rounded-[16px] border-2 border-[#6b95db]/80 bg-sky-50/10"
                        />

                        <motion.div
                          animate={{ top: ["16px", "96px", "16px"] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-1/2 h-[3px] w-[130px] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#6b95db] to-transparent shadow-[0_0_16px_rgba(107,149,219,0.55)]"
                        />

                        <motion.div
                          animate={{ top: ["6px", "86px", "6px"], opacity: [0, 0.5, 0] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute left-1/2 h-10 w-[138px] -translate-x-1/2 rounded-full bg-sky-100/60 blur-md"
                        />
                      </div>
                    </motion.div>

                    {/* cartes infos */}
                    <div className="relative z-20 mt-4 space-y-3">
                      {["Santé financière analysée", "Travaux à venir détectés", "Diagnostics vérifiés"].map(
                        (item, index) => (
                          <motion.div
                            key={item}
                            animate={{
                              opacity: [0.75, 1, 0.75],
                              x: [0, 3, 0],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              delay: index * 0.35,
                            }}
                            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/94 px-3 py-3 shadow-[0_10px_20px_rgba(148,163,184,0.10)]"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-[#274b80]" />
                            <span className="text-[12px] font-medium text-slate-600">{item}</span>
                          </motion.div>
                        ),
                      )}
                    </div>

                    {/* badges flottants */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute right-3 top-[150px] rounded-full border border-sky-100 bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-sky-700 shadow-sm"
                    >
                      Scan live
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-3 top-[238px] rounded-full border border-emerald-100 bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700 shadow-sm"
                    >
                      IA active
                    </motion.div>
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
