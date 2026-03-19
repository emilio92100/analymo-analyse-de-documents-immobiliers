import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  UserIcon,
  LayoutDashboard,
  Zap,
} from "lucide-react";

const ForWhoSection = () => {
  const professionals = [
    {
      title: "Notaires",
      desc: "Accélérez la préparation de vos dossiers avec une synthèse claire et fiable.",
      icon: ShieldCheck,
    },
    {
      title: "Agents Immobiliers",
      desc: "Valorisez votre devoir de conseil avec un rapport de transparence pour vos clients.",
      icon: UserIcon,
    },
    {
      title: "Syndics",
      desc: "Facilitez la transmission des informations lors des ventes en copropriété.",
      icon: LayoutDashboard,
    },
    {
      title: "Marchands de biens",
      desc: "Identifiez instantanément le potentiel ou les risques d'un bien.",
      icon: Zap,
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Pour qui est fait Analymo ?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Une solution adaptée à chaque acteur de l'immobilier.
          </p>
        </motion.div>

        {/* Buyers highlight */}
        <motion.div
          className="gradient-primary rounded-3xl p-8 md:p-12 text-primary-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Acheteurs Particuliers
            </h3>
            <p className="text-primary-foreground/80 max-w-2xl mb-8 text-lg">
              Ne faites pas d'erreur coûteuse. Nous décryptons pour vous la santé
              financière de la copropriété et les travaux à venir.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Comprendre les PV d'AG sans effort",
                "Anticiper les gros travaux à venir",
                "Vérifier la santé financière",
                "Acheter l'esprit tranquille",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={18} className="text-primary-foreground/80 shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Professional targets */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {professionals.map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl border border-border bg-card card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon size={22} className="text-primary" />
              </div>
              <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
