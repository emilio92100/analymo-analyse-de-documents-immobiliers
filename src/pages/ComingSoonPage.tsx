import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [progress, setProgress] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 86) return 86;
        return prev + Math.random() * 1.8;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f8fc] text-slate-800">
      {/* fond doux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.30),_transparent_28%),radial-gradient(circle_at_right,_rgba(226,232,240,0.55),_transparent_30%),linear-gradient(180deg,_#fbfcfe_0%,_#f4f7fb_100%)]" />

      <div className="absolute left-[-80px] top-[120px] h-[260px] w-[260px] rounded-full bg-sky-100/60 blur-3xl" />
      <div className="absolute right-[-50px] top-[220px] h-[300px] w-[300px] rounded-full bg-blue-100/60 blur-3xl" />
      <div className="absolute bottom-[-70px] left-1/3 h-[240px] w-[240px] rounded-full bg-slate-100 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-10">
        {/* logo */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </div>

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-white/90 px-6 py-3 shadow-[0_10px_30px_rgba(148,163,184,0.10)]">
            <span className="h-3 w-3 rounded-full bg-slate-700" />
            <span className="text-[18px] font-semibold text-slate-700">Bientôt disponible</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-center text-[16px] uppercase tracking-[0.18em] text-slate-400 md:text-[18px]"
        >
          Analyses intelligentes de documents immobiliers
        </motion.p>

        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* gauche */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-slate-800 md:text-7xl">
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

            {/* countdown */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { value: "30", label: "JOURS" },
                { value: "23", label: "HEURES" },
                { value: "59", label: "MINUTES" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex h-[118px] w-[118px] flex-col items-center justify-center rounded-[24px] border border-slate-200/80 bg-white/90 shadow-[0_10px_30px_rgba(148,163,184,0.10)]"
                >
                  <div className="text-5xl font-bold tracking-[-0.04em] text-[#23406c]">{item.value}</div>
                  <div className="mt-2 text-[15px] font-medium tracking-[0.12em] text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>

            {/* progression */}
            <div className="mt-10 rounded-[32px] border border-slate-200/70 bg-white/90 p-7 shadow-[0_20px_50px_rgba(148,163,184,0.12)]">
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
                    className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-[5px] border-white bg-[#264a7f] shadow-[0_6px_18px_rgba(37,99,235,0.22)]"
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
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px] text-slate-500">
              <div>Documents chiffrés</div>
              <div>Suppression auto</div>
              <div>Sans engagement</div>
            </div>
          </motion.div>

          {/* droite */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="flex w-full max-w-[420px] flex-col items-center">
              {/* téléphone revu */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* halo */}
                <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200/60 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-2xl" />

                <div className="relative z-10 h-[540px] w-[260px] rounded-[42px] border-[8px] border-[#24364b] bg-[#24364b] p-[8px] shadow-[0_28px_60px_rgba(15,23,42,0.16)]">
                  <div className="absolute left-1/2 top-[10px] h-[24px] w-[108px] -translate-x-1/2 rounded-full bg-[#24364b]" />

                  <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,_#fbfcff_0%,_#f4f7fb_100%)] p-4">
                    {/* reflet */}
                    <div className="absolute inset-y-0 left-[-30%] w-[40%] rotate-[18deg] bg-white/35 blur-xl" />

                    {/* scan line */}
                    <motion.div
                      animate={{ y: ["-10%", "110%"] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-3 right-3 h-16 rounded-full bg-gradient-to-b from-transparent via-sky-100/70 to-transparent blur-md"
                    />

                    <div className="relative z-10 flex items-center justify-between pt-2 text-[13px] font-semibold text-slate-700">
                      <span>9:41</span>
                      <span>5G ••</span>
                    </div>

                    <div className="relative z-10 mt-6">
                      <div className="text-[18px] font-bold text-slate-800">Analyse en cours</div>
                      <div className="mt-1 text-[14px] leading-6 text-slate-400">
                        Dossier immobilier
                        <br />
                        Vérification automatique
                      </div>
                    </div>

                    {/* anneau central animé */}
                    <div className="relative z-10 mt-8 flex justify-center">
                      <div className="relative flex h-[170px] w-[170px] items-center justify-center rounded-full">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-full border-[10px] border-slate-200 border-t-[#264a7f] border-r-[#79d4bb]"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-[14px] rounded-full border-[8px] border-transparent border-l-[#f59e0b] border-b-[#ef4444]"
                        />
                        <div className="relative z-10 rounded-full bg-white px-8 py-6 text-center shadow-[0_12px_30px_rgba(148,163,184,0.18)]">
                          <div className="text-4xl font-bold tracking-[-0.04em] text-[#23406c]">7/10</div>
                          <div className="mt-2 text-[13px] font-medium text-slate-400">Score analysé</div>
                        </div>
                      </div>
                    </div>

                    {/* barres couleur */}
                    <div className="relative z-10 mt-8 space-y-4">
                      {[
                        {
                          label: "Points favorables",
                          value: "74%",
                          width: "74%",
                          color: "bg-[#79d4bb]",
                        },
                        {
                          label: "Vigilances",
                          value: "46%",
                          width: "46%",
                          color: "bg-[#f59e0b]",
                        },
                        {
                          label: "Risques à vérifier",
                          value: "28%",
                          width: "28%",
                          color: "bg-[#ef4444]",
                        },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="mb-2 flex items-center justify-between text-[13px]">
                            <span className="text-slate-500">{item.label}</span>
                            <span className="font-semibold text-slate-700">{item.value}</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-slate-200/80">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: item.width }}
                              transition={{ duration: 1.2, delay: 0.2 }}
                              className={`h-2.5 rounded-full ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* footer phone */}
                    <div className="relative z-10 mt-8 grid grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-white/90 p-3 text-center shadow-sm">
                        <div className="text-[11px] text-slate-400">PDF</div>
                        <div className="mt-1 text-[13px] font-semibold text-slate-700">Scan</div>
                      </div>
                      <div className="rounded-2xl bg-white/90 p-3 text-center shadow-sm">
                        <div className="text-[11px] text-slate-400">IA</div>
                        <div className="mt-1 text-[13px] font-semibold text-slate-700">Analyse</div>
                      </div>
                      <div className="rounded-2xl bg-white/90 p-3 text-center shadow-sm">
                        <div className="text-[11px] text-slate-400">Rapport</div>
                        <div className="mt-1 text-[13px] font-semibold text-slate-700">Prêt</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* cartes sous téléphone */}
              <div className="mt-8 grid w-full gap-4 sm:grid-cols-3">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_16px_35px_rgba(148,163,184,0.12)]"
                >
                  <div className="text-[13px] text-slate-400">Sécurité</div>
                  <div className="mt-2 text-[17px] font-semibold text-slate-800">100% sécurisé</div>
                  <div className="mt-1 text-[14px] text-slate-500">Chiffré et supprimé</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_16px_35px_rgba(148,163,184,0.12)]"
                >
                  <div className="text-[13px] text-slate-400">Rapport</div>
                  <div className="mt-2 text-[17px] font-semibold text-slate-800">Lecture rapide</div>
                  <div className="mt-1 text-[14px] text-slate-500">Clair, visuel, synthétique</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_16px_35px_rgba(148,163,184,0.12)]"
                >
                  <div className="text-[13px] text-slate-400">Résultat</div>
                  <div className="mt-2 text-[17px] font-semibold text-slate-800">Score global</div>
                  <div className="mt-1 text-[14px] text-slate-500">Vert, orange, rouge</div>
                </motion.div>
              </div>
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
