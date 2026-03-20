import { motion } from "framer-motion";
import { Upload, Search, FileCheck, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Importez vos documents",
      desc: "PV d'AG, règlements de copropriété, diagnostics, appels de fonds — glissez-déposez vos fichiers.",
      icon: Upload,
    },
    {
      step: "02",
      title: "Analyse intelligente",
      desc: "Notre IA scanne chaque ligne pour extraire les risques, charges et points d'attention critiques.",
      icon: Search,
    },
    {
      step: "03",
      title: "Rapport complet",
      desc: "Score de fiabilité, alertes détaillées et recommandations concrètes en moins de 2 minutes.",
      icon: FileCheck,
    },
  ];

  return (
    <section className="py-24 bg-bg-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2 rounded-full bg-primary/8 text-primary text-sm font-bold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Comment ça marche
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.05]">
            Trois étapes,
            <br />
            <span className="text-gradient">zéro stress</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Une analyse complète de vos documents immobiliers en quelques clics.
          </p>
        </motion.div>

        {/* Steps — horizontal timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                className="relative text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Icon circle */}
                <motion.div
                  className="w-[120px] h-[120px] rounded-[2rem] bg-background border-2 border-border flex flex-col items-center justify-center mx-auto mb-8 shadow-lg group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-500"
                  whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-1">
                    Étape
                  </span>
                  <span className="text-3xl font-black text-foreground">{item.step}</span>
                </motion.div>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={22} className="text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>

                {/* Arrow between steps on desktop */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-[60px] -right-5 z-10">
                    <ArrowRight size={20} className="text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
