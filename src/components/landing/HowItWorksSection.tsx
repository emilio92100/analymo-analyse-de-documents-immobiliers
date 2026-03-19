import { motion } from "framer-motion";
import { FileText, Zap, ShieldCheck } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Importez vos documents",
      desc: "Déposez vos PV d'AG, règlements de copropriété, diagnostics techniques ou appels de fonds.",
      icon: FileText,
    },
    {
      step: "02",
      title: "Analyse par notre IA",
      desc: "Notre technologie scanne chaque ligne pour détecter les risques cachés et les points d'attention.",
      icon: Zap,
    },
    {
      step: "03",
      title: "Rapport détaillé",
      desc: "Recevez une synthèse claire avec un score de fiabilité, des alertes et des recommandations.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Comment ça marche ?</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Trois étapes simples pour sécuriser votre investissement immobilier.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="relative text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Connector line */}
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-primary/20" />
              )}

              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
                <item.icon size={28} className="text-primary-foreground" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Étape {item.step}
              </span>
              <h3 className="text-xl font-bold mt-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
