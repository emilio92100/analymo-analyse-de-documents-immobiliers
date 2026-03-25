{
  /* SECTION VISUELLE : LE TÉLÉPHONE ULTRA-MODERNE & FONCTIONNEL */
}
<motion.div
  className="relative perspective-2000"
  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
  transition={{ duration: 1.2, ease: "circOut" }}
>
  {/* L'appareil style "Glassmorphism" (iPhone 16 Pro dématérialisé) */}
  <div className="relative mx-auto w-[310px] h-[630px] bg-white/30 backdrop-blur-2xl border border-white/60 rounded-[3.8rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] p-2">
    {/* Dynamic Island minimaliste */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0F172A] rounded-full z-40 shadow-inner" />

    {/* Écran de l'application */}
    <div className="h-full w-full bg-white/90 rounded-[3.1rem] overflow-hidden p-6 flex flex-col items-center relative">
      {/* ÉTAPE 1 : L'IMPORTATION (Animation d'entrée) */}
      <motion.div
        className="w-full space-y-3 mt-10 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex items-center justify-between px-2">
          <div className="text-xs font-bold text-[#004262]/70 uppercase tracking-widest">Document reçu</div>
          <div className="text-[10px] text-slate-400">il y a 2s</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-inner">
          <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center text-[#004262]">📄</div>
          <div>
            <div className="h-2 w-32 bg-slate-200 rounded" />
            <div className="h-1.5 w-24 bg-slate-100 rounded mt-2" />
          </div>
        </div>
      </motion.div>

      {/* ÉTAPE 2 : L'ANALYSE (Zone de scan dynamique) */}
      <div className="relative h-44 w-full bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center p-5 overflow-hidden shadow-inner group">
        {/* Texte de statut */}
        <motion.div
          className="text-xs text-[#004262] font-bold uppercase tracking-widest mb-4 z-10"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Scan en cours...
        </motion.div>

        {/* Lignes de scan horizontales simulées */}
        <div className="w-full space-y-2.5 px-4 z-10 opacity-60">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 w-full bg-white rounded-full"
              animate={{ scaleX: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            />
          ))}
        </div>

        {/* LASER DE SCAN BLEU (Ultra-fin et précis) */}
        <motion.div
          className="absolute left-0 w-full h-[1.5px] bg-[#004262] shadow-[0_0_20px_2px_#004262] z-30"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />

        {/* Effet de brillance en arrière-plan */}
        <div className="absolute inset-0 bg-[#004262]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* ÉTAPE 3 : LE RÉSULTAT (L'IA synthétise) */}
      <motion.div
        className="mt-8 w-full space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="text-[11px] font-medium text-slate-400 tracking-wider">Points clés détectés</div>

        {/* Badges de résultats */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 p-3 bg-green-50 rounded-xl border border-green-100"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-600 text-xs flex items-center justify-center">
              ✓
            </div>
            <div className="h-1.5 w-16 bg-green-900/10 rounded" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 p-3 bg-amber-50 rounded-xl border border-amber-100"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 text-xs flex items-center justify-center">
              !
            </div>
            <div className="h-1.5 w-16 bg-amber-900/10 rounded" />
          </motion.div>
        </div>

        {/* CARTE DE SCORE (Apparaît en dernier) */}
        <motion.div
          className="w-full p-6 mt-6 bg-[#004262] rounded-3xl text-white text-center shadow-3xl shadow-[#004262]/40 relative overflow-hidden"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3, duration: 1, ease: "backOut" }}
          whileHover={{ y: -5 }}
        >
          <div className="text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2 font-bold">Score d'Analyse</div>
          <div className="text-6xl font-extrabold tracking-tighter tabular-nums">
            7.4<span className="text-xl opacity-40 font-medium">/10</span>
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-white/10 rounded-full blur-2xl" />
        </motion.div>
      </motion.div>

      {/* Bouton d'action fantôme */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-2 bg-slate-100 rounded-full" />
    </div>
  </div>

  {/* Éléments de design flottants autour du téléphone pour la "magie" */}
  <motion.div
    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    className="absolute -top-12 -right-12 w-36 h-36 border border-dashed border-slate-100 rounded-full -z-10 opacity-70"
  />
</motion.div>;
