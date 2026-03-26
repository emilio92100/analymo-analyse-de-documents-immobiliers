import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function LaunchPage() {
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
    if (percent >= 20) step = 2;
    if (percent >= 40) step = 3;
    if (percent >= 60) step = 4;
    if (percent >= 80) step = 5;
    if (percent >= 100) step = 6;

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
    { label: "Interface", threshold: 20 },
    { label: "Analyse", threshold: 40 },
    { label: "Tests", threshold: 60 },
    { label: "Finalisation", threshold: 80 },
    { label: "Ouverture", threshold: 100 },
  ];

  const countdown = [
    { value: daysLeft, mobile: "J", desktop: "Jours" },
    { value: hoursLeft, mobile: "H", desktop: "Heures" },
    { value: minutesLeft, mobile: "Min", desktop: "Minutes" },
    { value: secondsLeft, mobile: "Sec", desktop: "Secondes" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f9fd] text-slate-800">
      {/* Fond premium doux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.35),_transparent_28%),radial-gradient(circle_at_right,_rgba(219,234,254,0.40),_transparent_26%),linear-gradient(180deg,_#fbfdff_0%,_#f4f8fc_100%)]" />

      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
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
          <img src="/logo.png" alt="Analymo" className="h-18 w-auto md:h-20" />
        </motion.div>

        {/* Hero */}
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="inline-flex items-center rounded-full border border-[#d7e3f5] bg-white/95 px-5 py-2.5 text-sm font-semibold text-[#274b80] shadow-sm"
          >
            Lancement le 25 Avril 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-8 max-w-4xl text-3xl font-bold leading-[0.97] tracking-[-0.04em] text-[#234674] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Sécurisez votre achat immobilier
            <br />
            <span className="text-[#4f7fc4]">avant de signer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base md:text-lg"
          >
            Une lecture claire des documents, des risques, des travaux à venir et de la santé financière de l’immeuble
            pour prendre votre décision avec plus de sérénité.
          </motion.p>
        </div>

        {/* Zone principale */}
        <div className="mx-auto mt-12 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,430px)] lg:gap-16">
          {/* Bloc progression */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="order-2 rounded-[34px] border border-white/70 bg-white/90 p-5 shadow-[0_24px_60px_rgba(148,163,184,0.14)] backdrop-blur sm:p-7 lg:order-1"
          >
            <div className="flex flex-col gap-8">
              {/* Date focus */}
              <div className="rounded-[26px] border border-slate-200/80 bg-[#fbfdff] px-6 py-6 text-center shadow-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Date d’ouverture</div>
                <div className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#274b80] sm:text-4xl">
                  25 Avril 2026
                </div>
              </div>

              {/* Countdown */}
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

              {/* Texte progression */}
              <div className="text-center lg:text-left">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
                  Progression du lancement
                </div>
                <div className="mt-3 text-base leading-7 text-slate-500 sm:text-lg">
                  Le déploiement a commencé il y a{" "}
                  <span className="block font-medium text-slate-600 sm:inline">30 jours</span> et progresse jusqu’au{" "}
                  <span className="block font-semibold text-[#274b80] sm:inline">25 Avril 2026</span>.
                </div>
              </div>

              {/* Barre premium */}
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
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#274b80] via-[#5d8fdb] to-[#9ad8c6]"
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

                {/* Paliers */}
                <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {steps.map((step, index) => {
                    const active = progress >= step.threshold;
                    const current = currentStep === index + 1;

                    return (
                      <motion.div
                        key={step.label}
                        animate={current ? { y: [0, -3, 0] } : {}}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className={`rounded-[18px] border px-3 py-3 text-center ${
                          active ? "border-[#d5e2f5] bg-[#f5f9ff]" : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                            active ? "bg-[#274b80] text-white" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div
                          className={`mt-2 text-[10px] font-medium leading-4 sm:text-xs ${
                            active ? "text-slate-700" : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Téléphone complètement revu */}
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
                  rotateY: [0, 8, 0, -8, 0],
                  rotateX: [0, 3, 0, -3, 0],
                  rotateZ: [0, 0.6, 0, -0.6, 0],
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

                <div className="relative h-[510px] w-[248px] rounded-[44px] border border-white/80 bg-[linear-gradient(180deg,_#edf3fa_0%,_#d9e5f2_100%)] p-[5px] shadow-[0_32px_70px_rgba(15,23,42,0.16)]">
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
                      <div className="text-[15px] font-semibold text-slate-800">Prévisualisation du rapport</div>
                      <div className="mt-1 text-[12px] text-slate-400">Une lecture rapide et rassurante</div>
                    </div>

                    {/* Carte principale */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-20 mt-6 rounded-[28px] border border-slate-200 bg-white/96 p-4 shadow-[0_16px_32px_rgba(148,163,184,0.14)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-[7px] border-slate-200 border-t-[#274b80] border-r-[#74a2e8]"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[8px] rounded-full border-[5px] border-transparent border-l-[#9ad8c6] border-b-[#274b80]"
                          />
                          <div className="relative z-10 text-center">
                            <div className="text-[22px] font-bold leading-none text-[#274b80]">8.2</div>
                            <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.08em] text-slate-400">
                              score
                            </div>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-[14px] font-semibold text-slate-800">Bien recommandé</div>
                          <div className="mt-1 text-[11px] leading-5 text-slate-400">
                            Les points clés ressortent immédiatement.
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        <div className="rounded-[18px] border border-slate-100 bg-[#f8fbff] p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-[0.08em] text-slate-400">
                              Santé financière
                            </span>
                            <span className="text-[11px] font-semibold text-[#274b80]">Bonne</span>
                          </div>
                          <div className="mt-2 h-2.5 rounded-full bg-slate-200">
                            <motion.div
                              animate={{ width: ["0%", "82%"] }}
                              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8 }}
                              className="h-2.5 rounded-full bg-[#274b80]"
                            />
                          </div>
                        </div>

                        <div className="rounded-[18px] border border-slate-100 bg-[#f8fbff] p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-[0.08em] text-slate-400">
                              Travaux à venir
                            </span>
                            <span className="text-[11px] font-semibold text-[#74a2e8]">À surveiller</span>
                          </div>
                          <div className="mt-2 h-2.5 rounded-full bg-slate-200">
                            <motion.div
                              animate={{ width: ["0%", "58%"] }}
                              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1 }}
                              className="h-2.5 rounded-full bg-[#74a2e8]"
                            />
                          </div>
                        </div>

                        <div className="rounded-[18px] border border-slate-100 bg-[#f8fbff] p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-[0.08em] text-slate-400">Diagnostics</span>
                            <span className="text-[11px] font-semibold text-[#4f8f7d]">Vérifiés</span>
                          </div>
                          <div className="mt-2 h-2.5 rounded-full bg-slate-200">
                            <motion.div
                              animate={{ width: ["0%", "76%"] }}
                              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
                              className="h-2.5 rounded-full bg-[#9ad8c6]"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Lignes d'aperçu */}
                    <div className="relative z-20 mt-4 space-y-3">
                      {[
                        "Synthèse des risques détectés",
                        "Lecture des documents simplifiée",
                        "Vue rapide avant décision",
                      ].map((item, index) => (
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
