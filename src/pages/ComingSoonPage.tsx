import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [progress, setProgress] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 87) return 87;
        return prev + Math.random() * 2.2;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
      {/* Fond doux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,197,253,0.18),_transparent_30%),radial-gradient(circle_at_right,_rgba(191,219,254,0.22),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#f3f7fc_100%)]" />

      {/* halos doux */}
      <div className="absolute left-[-80px] top-[120px] h-[280px] w-[280px] rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute right-[-40px] top-[220px] h-[320px] w-[320px] rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute bottom-[-80px] left-1/3 h-[220px] w-[220px] rounded-full bg-cyan-100/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-10">
        {/* Logo centré */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </div>

        {/* Badge top */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-white/90 px-6 py-3 shadow-[0_8px_30px_rgba(148,163,184,0.12)] backdrop-blur">
            <span className="h-3 w-3 rounded-full bg-slate-700" />
            <span className="text-[18px] font-semibold text-slate-700">Bientôt disponible</span>
          </div>
        </motion.div>

        {/* sous titre */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-center text-[18px] uppercase tracking-[0.18em] text-slate-400"
        >
          Analyses intelligentes de documents immobiliers
        </motion.p>

        {/* Bloc principal */}
        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 py-10 lg:grid-cols-[1.02fr_0.98fr]">
          {/* Colonne gauche */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85 }}
            className="max-w-2xl"
          >
            <h1 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-slate-800 md:text-7xl">
              Analysez vos
              <br />
              documents
              <br />
              immobiliers
            </h1>

            <p className="mt-10 max-w-xl text-xl leading-10 text-slate-500 md:text-[20px]">
              Score global, risques cachés, impact financier — tout ce qu’il faut savoir avant de signer, en moins de 2
              minutes.
            </p>

            {/* compte à rebours */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { value: "30", label: "JOURS" },
                { value: "23", label: "HEURES" },
                { value: "59", label: "MINUTES" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -3 }}
                  className="flex h-[118px] w-[118px] flex-col items-center justify-center rounded-[24px] border border-slate-200/80 bg-white/90 shadow-[0_10px_30px_rgba(148,163,184,0.12)]"
                >
                  <div className="text-5xl font-bold tracking-[-0.04em] text-[#23406c]">{item.value}</div>
                  <div className="mt-2 text-[15px] font-medium tracking-[0.12em] text-slate-400">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Progress card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 rounded-[32px] border border-slate-200/70 bg-white/85 p-7 shadow-[0_20px_50px_rgba(148,163,184,0.14)] backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[15px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Progression
                  </div>
                  <div className="mt-3 text-[20px] text-slate-500">
                    Jour <span className="font-semibold text-[#23406c]">0</span> / 30
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-6xl font-bold tracking-[-0.04em] text-[#23406c]">{Math.floor(progress)}%</div>
                  <div className="mt-1 text-[15px] text-slate-400">J-30</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="relative h-4 rounded-full bg-slate-200/80">
                  <motion.div
                    className="absolute left-0 top-0 h-4 rounded-full bg-gradient-to-r from-[#264a7f] via-[#5f8ed9] to-[#9fd5c0]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-[5px] border-white bg-[#264a7f] shadow-[0_6px_18px_rgba(37,99,235,0.28)]"
                    animate={{ left: `calc(${progress}% - 14px)` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-4 text-sm text-slate-400">
                  <div>Début</div>
                  <div className="text-center">J-20</div>
                  <div className="text-center">J-10</div>
                  <div className="text-right">Lancement</div>
                </div>
              </div>
            </motion.div>

            {/* bas infos */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px] text-slate-500">
              <div>Documents chiffrés</div>
              <div>Suppression auto</div>
              <div>Sans engagement</div>
            </div>
          </motion.div>

          {/* Colonne droite */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* halo derrière téléphone */}
              <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200/40 blur-3xl" />

              {/* téléphone */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="relative h-[650px] w-[315px] rounded-[44px] border-[10px] border-[#26364d] bg-[#26364d] shadow-[0_40px_80px_rgba(15,23,42,0.20)]">
                  <div className="absolute left-1/2 top-[12px] h-[26px] w-[115px] -translate-x-1/2 rounded-full bg-[#26364d]" />
                  <div className="h-full w-full rounded-[34px] bg-[#f8fafc] p-5">
                    <div className="flex items-center justify-between pt-3 text-[14px] font-semibold text-slate-700">
                      <span>9:41</span>
                      <span>5G ••</span>
                    </div>

                    <div className="mt-8">
                      <div className="text-[18px] font-bold text-slate-800">Mon analyse</div>
                      <div className="mt-1 text-[15px] leading-6 text-slate-400">
                        PV d&apos;assemblée - Appartement
                        <br />
                        Paris 8e
                      </div>
                    </div>

                    {/* carte score */}
                    <div className="mt-8 rounded-[28px] bg-[#1f4375] p-5 text-white shadow-[0_12px_30px_rgba(37,99,235,0.18)]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#79d4bb]">
                          <div className="text-center">
                            <div className="text-4xl font-bold leading-none">7</div>
                            <div className="mt-1 text-xs text-blue-100">/10</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[17px] font-semibold">Score global</div>
                          <div className="mt-1 text-[15px] text-blue-100">Bien recommandé</div>
                          <div className="mt-4 flex gap-2">
                            <div className="h-2 w-8 rounded-full bg-[#79d4bb]" />
                            <div className="h-2 w-8 rounded-full bg-[#79d4bb]" />
                            <div className="h-2 w-8 rounded-full bg-[#79d4bb]" />
                            <div className="h-2 w-8 rounded-full bg-[#79d4bb]" />
                            <div className="h-2 w-8 rounded-full bg-[#79d4bb]/35" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* mini chart */}
                    <div className="mt-5 rounded-[24px] bg-[#f4f6fa] p-4">
                      <div className="text-[16px] font-semibold text-slate-700">Analyse des charges</div>
                      <div className="mt-5 flex h-20 items-end gap-3">
                        <div className="h-10 w-5 rounded-t-md bg-slate-300" />
                        <div className="h-8 w-5 rounded-t-md bg-slate-200" />
                        <div className="h-15 w-5 rounded-t-md bg-slate-300" />
                        <div className="h-11 w-5 rounded-t-md bg-slate-300" />
                        <div className="h-14 w-5 rounded-t-md bg-[#72a7ea]" />
                        <div className="h-9 w-5 rounded-t-md bg-slate-300" />
                        <div className="h-12 w-5 rounded-t-md bg-slate-300" />
                        <div className="h-15 w-5 rounded-t-md bg-slate-200" />
                        <div className="h-8 w-5 rounded-t-md bg-slate-300" />
                        <div className="h-14 w-5 rounded-t-md bg-[#23406c]" />
                      </div>
                    </div>

                    {/* cartes bas */}
                    <div className="mt-5 grid gap-3">
                      <div className="rounded-[20px] bg-[#f4f6fa] p-4">
                        <div className="text-[16px] font-semibold text-slate-700">3 points positifs</div>
                        <div className="mt-1 text-[14px] text-slate-400">Finances saines, copropriété suivie</div>
                      </div>

                      <div className="rounded-[20px] bg-[#f4f6fa] p-4">
                        <div className="text-[16px] font-semibold text-slate-700">Alerte modérée</div>
                        <div className="mt-1 text-[14px] text-slate-400">
                          Quelques éléments à vérifier avant signature
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* bulles flottantes */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[-55px] top-[85px] rounded-[24px] border border-slate-200 bg-white/95 px-5 py-4 shadow-[0_20px_40px_rgba(148,163,184,0.18)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-slate-100 text-xl">
                    🛡️
                  </div>
                  <div>
                    <div className="text-[18px] font-semibold text-slate-800">100% sécurisé</div>
                    <div className="text-[15px] text-slate-400">Chiffré & supprimé</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[-70px] top-[380px] rounded-[24px] border border-slate-200 bg-white/95 px-5 py-4 shadow-[0_20px_40px_rgba(148,163,184,0.18)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-green-50 text-xl">
                    📈
                  </div>
                  <div>
                    <div className="text-[18px] font-semibold text-slate-800">Score: 7/10</div>
                    <div className="text-[15px] text-green-600">Bien recommandé</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[-35px] bottom-[65px] rounded-[24px] border border-slate-200 bg-white/95 px-5 py-4 shadow-[0_20px_40px_rgba(148,163,184,0.18)]"
              >
                <div className="text-[18px] font-semibold text-slate-800">PV scanné ✓</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="pb-4 text-center text-[15px] text-slate-400">
          © 2025 Analymo · Analyses intelligentes de documents immobiliers
        </div>
      </div>
    </div>
  );
}
