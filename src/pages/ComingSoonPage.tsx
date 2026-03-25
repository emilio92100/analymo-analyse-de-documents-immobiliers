import { motion } from "framer-motion";

export default function ComingSoonPage() {
  const totalDays = 30;
  const currentDay = 0;
  const daysLeft = totalDays - currentDay;
  const progress = Math.round((currentDay / totalDays) * 100);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
      {/* Fond doux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.28),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(226,232,240,0.65),_transparent_28%),linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fc_100%)]" />

      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Analymo" className="h-16 w-auto md:h-22" />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-white/90 px-5 py-3 shadow-[0_10px_30px_rgba(148,163,184,0.10)] backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <span className="text-base font-semibold text-slate-700 md:text-lg">Lancement en préparation</span>
          </div>
        </motion.div>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-center text-[15px] uppercase tracking-[0.20em] text-slate-400 md:text-[17px]"
        >
          Analyses intelligentes de documents immobiliers
        </motion.p>

        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-16 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Colonne gauche */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-slate-800 md:text-7xl">
              Comprenez vos
              <br />
              documents
              <br />
              avant de signer
            </h1>

            <p className="mt-10 max-w-xl text-xl leading-10 text-slate-500 md:text-[20px]">
              Analymo vous aide à repérer les points importants, les risques potentiels et les éléments financiers
              essentiels d’un dossier immobilier en quelques instants.
            </p>

            {/* Trois bénéfices */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.10)]">
                <div className="text-sm text-slate-400">Lecture</div>
                <div className="mt-2 text-lg font-semibold text-slate-800">Plus claire</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">
                  Une synthèse simple et visuelle des documents.
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.10)]">
                <div className="text-sm text-slate-400">Analyse</div>
                <div className="mt-2 text-lg font-semibold text-slate-800">Plus rapide</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">Les points clés ressortent immédiatement.</div>
              </div>

              <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.10)]">
                <div className="text-sm text-slate-400">Décision</div>
                <div className="mt-2 text-lg font-semibold text-slate-800">Plus sereine</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">
                  Vous avancez avec une meilleure compréhension du bien.
                </div>
              </div>
            </div>

            {/* Barre de progression cohérente */}
            <div className="mt-10 rounded-[32px] border border-slate-200/70 bg-white/90 p-7 shadow-[0_20px_50px_rgba(148,163,184,0.12)] backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[15px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Progression du lancement
                  </div>
                  <div className="mt-3 text-[20px] text-slate-500">
                    Jour <span className="font-semibold text-[#23406c]">{currentDay}</span> / {totalDays}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-5xl font-bold tracking-[-0.04em] text-[#23406c] md:text-6xl">{progress}%</div>
                  <div className="mt-1 text-[15px] text-slate-400">J-{daysLeft}</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="relative h-4 rounded-full bg-slate-200/80">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                    className="absolute left-0 top-0 h-4 rounded-full bg-gradient-to-r from-[#264a7f] via-[#5f8ed9] to-[#9fd5c0]"
                  />

                  <motion.div
                    initial={{ left: 0 }}
                    animate={{ left: `calc(${progress}% - 14px)` }}
                    transition={{ duration: 1 }}
                    className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-[5px] border-white bg-[#264a7f] shadow-[0_6px_18px_rgba(37,99,235,0.20)]"
                  />
                </div>

                <div className="mt-5 grid grid-cols-4 text-sm text-slate-400">
                  <div>Début</div>
                  <div className="text-center">Milieu</div>
                  <div className="text-center">Finalisation</div>
                  <div className="text-right">Ouverture</div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[16px] text-slate-500">
              <div>Documents chiffrés</div>
              <div>Suppression automatique</div>
              <div>Sans engagement</div>
            </div>
          </motion.div>

          {/* Colonne droite */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[500px]">
              {/* halo */}
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200/60 blur-3xl" />

              {/* Bloc principal visuel */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[36px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_70px_rgba(148,163,184,0.16)] backdrop-blur"
              >
                {/* En-tête */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400">Document analysé</div>
                    <div className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-800">
                      Rapport intelligent
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">Aperçu</div>
                </div>

                {/* Carte document */}
                <div className="mt-6 rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-slate-800">PV d’assemblée générale</div>
                      <div className="mt-1 text-sm text-slate-400">Détection automatique des points clés</div>
                    </div>

                    <div className="rounded-xl bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700">
                      Analyse active
                    </div>
                  </div>

                  {/* lignes analysées */}
                  <div className="mt-6 space-y-4">
                    {[
                      { label: "Éléments importants détectés", width: "78%" },
                      { label: "Informations financières extraites", width: "62%" },
                      { label: "Points de vigilance identifiés", width: "48%" },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-500">{item.label}</span>
                          <span className="font-medium text-slate-700">{item.width}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-200/70">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: item.width }}
                            transition={{ duration: 1.1, delay: 0.2 + index * 0.15 }}
                            className="h-2.5 rounded-full bg-[#23406c]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* mini cartes */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_24px_rgba(148,163,184,0.10)]"
                  >
                    <div className="text-sm text-slate-400">Ce que vous verrez</div>
                    <div className="mt-2 text-lg font-semibold text-slate-800">Synthèse lisible</div>
                    <div className="mt-2 text-sm leading-6 text-slate-500">
                      Une lecture rapide des éléments utiles avant votre décision.
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_24px_rgba(148,163,184,0.10)]"
                  >
                    <div className="text-sm text-slate-400">Notre promesse</div>
                    <div className="mt-2 text-lg font-semibold text-slate-800">Un outil rassurant</div>
                    <div className="mt-2 text-sm leading-6 text-slate-500">
                      Moderne, simple et pensé pour mieux comprendre un dossier.
                    </div>
                  </motion.div>
                </div>

                {/* ligne bas */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">Lecture guidée</div>
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">Points clés</div>
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">Vue synthétique</div>
                </div>
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
