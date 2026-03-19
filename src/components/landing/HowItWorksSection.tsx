import { motion } from "framer-motion";
import { Upload, Search, FileCheck } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Importez",
      desc: "Déposez vos PV d'AG, règlements de copropriété, diagnostics ou appels de fonds.",
      icon: Upload,
      color: "bg-primary",
    },
    {
      step: "02",
      title: "Analyse automatique",
      desc: "Notre technologie scanne chaque ligne pour détecter les risques et points d'attention.",
      icon: Search,
      color: "bg-primary",
    },
    {
      step: "03",
      title: "Rapport complet",
      desc: "Score de fiabilité, alertes détaillées et recommandations claires en moins de 2 minutes.",
      icon: FileCheck,
      color: "bg-primary",
    },
  ];

  return (
    <section className="py-28 bg-bg-light relative overflow-hidden">
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.1]">
            Trois étapes, <span className="text-gradient">zéro stress</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Une analyse complète de vos documents immobiliers en quelques clics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-16 left-[25%] right-[25%] h-px">
            <div className="w-full h-full border-t-2 border-dashed border-primary/15" />
          </div>

          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="relative text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Step number */}
              <motion.div
                className="w-[72px] h-[72px] rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <item.icon size={30} className="text-primary-foreground" />
              </motion.div>

              <div className="inline-block px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Étape {item.step}
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
