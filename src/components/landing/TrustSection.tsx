import { motion } from "framer-motion";
import { ShieldCheck, Lock, Zap, FileText, Clock, Users } from "lucide-react";

const TrustSection = () => {
  const trustItems = [
    {
      title: "Confidentiel",
      desc: "Vos documents sont analysés puis automatiquement supprimés. Aucune donnée n'est revendue ni partagée.",
      icon: ShieldCheck,
    },
    {
      title: "Sécurisé",
      desc: "Chiffrement de bout en bout et infrastructure bancaire pour la protection de vos données sensibles.",
      icon: Lock,
    },
    {
      title: "Rapide",
      desc: "Obtenez votre rapport complet en moins de 2 minutes, disponible 24h/24 et 7j/7.",
      icon: Zap,
    },
  ];

  const stats = [
    { value: "10 000+", label: "Documents analysés", icon: FileText },
    { value: "< 2 min", label: "Temps moyen d'analyse", icon: Clock },
    { value: "4.8/5", label: "Satisfaction client", icon: Users },
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
            Une sécurité sans compromis
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Nous utilisons les meilleures technologies pour protéger vos données
            et garantir la fiabilité de nos analyses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-3xl bg-card border border-border text-center card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon size={26} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="gradient-primary rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid sm:grid-cols-3 gap-8 text-center text-primary-foreground">
            {stats.map((stat, i) => (
              <div key={i}>
                <stat.icon size={24} className="mx-auto mb-3 opacity-80" />
                <p className="text-3xl md:text-4xl font-black">{stat.value}</p>
                <p className="text-sm mt-1 opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
