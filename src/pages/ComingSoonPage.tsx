import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.random() * 6;
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* Fond */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.10),_transparent_28%),linear-gradient(180deg,_#08111f_0%,_#0a1628_100%)]" />

      {/* Lueurs décoratives */}
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-16 left-10 h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute right-10 top-32 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 py-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex justify-center"
        >
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </motion.div>

        {/* Bloc principal */}
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Texte centré */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto flex w-full max-w-2xl flex-col items-center text-center"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur">
              Lancement en préparation
            </div>

            <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
              Votre analyse immobilière arrive bientôt
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              Une expérience plus claire, plus visuelle et plus rapide pour comprendre les documents immobiliers en un
              coup d’œil.
            </p>

            {/* Barre de progression */}
            <div className="mt-10 w-full max-w-md">
              <div className="mb-3 flex items-center justify-between text-sm text-white/70">
                <span>Progression du lancement</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 via-orange-400 to-red-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut", duration: 0.6 }}
                />
              </div>

              <p className="mt-3 text-sm text-white/50">
                Interface, rapports et automatisations en cours d’optimisation
              </p>
            </div>
          </motion.div>

          {/* Téléphone 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotateY: [0, 10, 0, -10, 0],
                rotateX: [0, -4, 0, 4, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Ombre */}
              <div className="absolute left-1/2 top-[95%] h-10 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-2xl" />

              {/* Cadre téléphone */}
              <div className="relative h-[560px] w-[280px] rounded-[42px] border border-white/10 bg-white/[0.04] p-[10px] shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="absolute left-1/2 top-3 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/20" />

                {/* Ecran */}
                <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,_#0c1728_0%,_#12233a_45%,_#0d1726_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_30%)]" />

                  {/* Header écran */}
                  <div className="px-5 pt-10">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/40">Analyse en cours</div>
                    <div className="mt-2 text-xl font-semibold text-white">Rapport intelligent</div>
                  </div>

                  {/* Carte score */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-4 mt-6 rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur-md"
                  >
                    <div className="mb-3 text-sm text-white/60">Lecture du dossier</div>

                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-sm text-white/70">
                          <span>Points favorables</span>
                          <span>74%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[74%] rounded-full bg-green-400" />
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex justify-between text-sm text-white/70">
                          <span>Points de vigilance</span>
                          <span>46%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[46%] rounded-full bg-orange-400" />
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex justify-between text-sm text-white/70">
                          <span>Risques à vérifier</span>
                          <span>28%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[28%] rounded-full bg-red-400" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cartes flottantes */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-[-36px] top-[170px] w-40 rounded-2xl border border-green-400/25 bg-green-400/10 p-3 backdrop-blur-md"
                  >
                    <div className="text-xs text-green-300">Signal positif</div>
                    <div className="mt-1 text-sm font-medium text-white">Travaux déjà réalisés</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[-42px] top-[250px] w-44 rounded-2xl border border-orange-400/25 bg-orange-400/10 p-3 backdrop-blur-md"
                  >
                    <div className="text-xs text-orange-300">Vigilance</div>
                    <div className="mt-1 text-sm font-medium text-white">Charges à comparer</div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-[-28px] bottom-[110px] w-44 rounded-2xl border border-red-400/25 bg-red-400/10 p-3 backdrop-blur-md"
                  >
                    <div className="text-xs text-red-300">Alerte</div>
                    <div className="mt-1 text-sm font-medium text-white">Point juridique à vérifier</div>
                  </motion.div>

                  {/* Bas écran */}
                  <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                    <div className="mb-2 text-sm text-white/60">Synthèse visuelle</div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-green-400/90" />
                      <div className="h-2 flex-1 rounded-full bg-orange-400/90" />
                      <div className="h-2 flex-1 rounded-full bg-red-400/90" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
