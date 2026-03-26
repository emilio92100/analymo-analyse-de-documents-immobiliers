import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function LaunchPage() {
  const startDate = new Date("2026-03-26T00:00:00").getTime();
  const launchDate = new Date("2026-04-25T00:00:00").getTime();

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { progress, daysLeft, hoursLeft, minutesLeft, secondsLeft, currentStep } = useMemo(() => {
    const total = launchDate - startDate;
    const elapsed = Math.min(Math.max(now - startDate, 0), total);
    const percent = total > 0 ? (elapsed / total) * 100 : 0;

    const remainingMs = Math.max(launchDate - now, 0);

    const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

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
  }, [now, startDate, launchDate]);

  const steps = [
    { label: "Structure", threshold: 0 },
    { label: "Design", threshold: 25 },
    { label: "Tests", threshold: 50 },
    { label: "Finalisation", threshold: 75 },
    { label: "Ouverture", threshold: 100 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
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
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </motion.div>

        <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col items-center text-center">
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
            className="mt-7 max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#274b80] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Sécurisez votre achat immobilier
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg md:text-xl"
          >
            Analysez les documents de façon claire, détectez la santé financière de l’immeuble, les diagnostics, les
            travaux à venir dans les PV, et avancez avec une vision plus sûre avant de signer.
          </motion.p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-start gap-12 py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,420px)] lg:gap-16">
          {/* Bloc progression plus large */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="order-2 rounded-[30px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_50px_rgba(148,163,184,0.12)] backdrop-blur sm:p-6 lg:order-1"
          >
            <div className="flex flex-col gap-8">
              {/* compte à rebours */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {[
                  { value: daysLeft, label: "Jours" },
                  { value: hoursLeft, label: "Heures" },
                  { value: minutesLeft, label: "Minutes" },
                  { value: secondsLeft, label: "Secondes" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-[22px] border border-slate-200 bg-[#fbfdff] px-3 py-4 text-center shadow-sm"
                  >
                    <div className="text-2xl font-bold tracking-[-0.04em] text-[#274b80] sm:text-3xl">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 sm:text-xs">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* texte progression */}
              <div className="text-center lg:text-left">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
                  Progression du lancement
                </div>
                <div className="mt-3 text-base text-slate-500 sm:text-lg">
                  L’application évolue en temps réel jusqu’à son ouverture.
                </div>
              </div>

              {/* barre progressive vivante */}
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
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#274b80] via-[#5d8fdb] to-[#9ed4c0]"
                  />

                  <motion.div
                    animate={{ x: ["-120%", "450%"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 h-full w-28 rounded-full bg-white/35 blur-md"
                  />

                  <motion.div
                    animate={{ left: `calc(${progress}% - 18px)` }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="absolute top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border-4 border-white bg-[#274b80] shadow-[0_8px_20px_rgba(39,75,128,0.22)]"
                  />
                </div>
              </div>

              {/* paliers lisibles */}
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {steps.map((step, index) => {
                  const active = progress >= step.threshold;
                  const current = currentStep === index + 1;

                  return (
                    <div key={step.label} className="flex min-w-0 flex-col items-center">
                      <motion.div
                        animate={current ? { scale: [1, 1.08, 1] } : {}}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                          active
                            ? "border-[#274b80] bg-[#274b80] text-white"
                            : "border-slate-300 bg-white text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </motion.div>

                      <div
                        className={`mt-3 break-words text-center text-[11px] font-medium leading-4 sm:text-sm ${
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

          {/* Téléphone plus bas + nouvelle animation */}
          <div className="order-1 flex justify-center lg:order-2 lg:pt-28">
            <div className="relative flex w-full max-w-[300px] items-center justify-center sm:max-w-[320px] md:max-w-[340px]">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 0.8, 0, -0.8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/70 blur-3xl sm:h-[280px] sm:w-[280px]" />

                <div className="relative h-[420px] w-[205px] rounded-[34px] border-[7px] border-[#26374f] bg-[#26374f] p-[7px] shadow-[0_30px_60px_rgba(15,23,42,0.14)] sm:h-[450px] sm:w-[220px] md:h-[480px] md:w-[230px]">
                  <div className="absolute left-1/2 top-[10px] h-[20px] w-[88px] -translate-x-1/2 rounded-full bg-[#26374f]" />

                  <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,_#fcfdff_0%,_#f2f6fb_100%)] p-4">
                    {/* document qui monte */}
                    <motion.div
                      animate={{ y: [80, 10, 80] }}
                      transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-1/2 top-[115px] z-0 h-[170px] w-[120px] -translate-x-1/2 rounded-[18px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(148,163,184,0.16)]"
                    >
                      <div className="p-4">
                        <div className="h-2.5 w-[70%] rounded-full bg-slate-200" />
                        <div className="mt-3 h-2.5 w-[88%] rounded-full bg-slate-200" />
                        <div className="mt-3 h-2.5 w-[62%] rounded-full bg-slate-200" />
                        <div className="mt-3 h-2.5 w-[80%] rounded-full bg-slate-200" />
                        <div className="mt-3 h-2.5 w-[55%] rounded-full bg-slate-200" />
                      </div>
                    </motion.div>

                    {/* cadre d'analyse */}
                    <motion.div
                      animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.02, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-1/2 top-[150px] z-10 h-[110px] w-[145px] -translate-x-1/2 rounded-[22px] border-2 border-[#5d8fdb] bg-sky-50/30"
                    />

                    {/* ligne scanner horizontale */}
                    <motion.div
                      animate={{ y: [145, 240, 145] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-1/2 z-20 h-[3px] w-[150px] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#5d8fdb] to-transparent shadow-[0_0_16px_rgba(93,143,219,0.55)]"
                    />

                    <div className="relative z-30 flex items-center justify-between text-[12px] font-semibold text-slate-700">
                      <span>9:41</span>
                      <span>5G</span>
                    </div>

                    <div className="relative z-30 mt-5 text-center">
                      <div className="text-[15px] font-semibold text-slate-800">Analyse en cours</div>
                      <div className="mt-1 text-[12px] text-slate-400">Lecture intelligente du dossier</div>
                    </div>

                    <div className="relative z-30 mt-[250px] space-y-3">
                      {["Document identifié", "Données extraites", "Rapport en préparation"].map((item, index) => (
                        <motion.div
                          key={item}
                          animate={{ opacity: [0.6, 1, 0.6], x: [0, 3, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                          className="flex items-center gap-3 rounded-2xl bg-white/90 px-3 py-3 shadow-sm"
                        >
                          <div className="h-2.5 w-2.5 rounded-full bg-[#274b80]" />
                          <span className="text-[12px] font-medium text-slate-600">{item}</span>
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
