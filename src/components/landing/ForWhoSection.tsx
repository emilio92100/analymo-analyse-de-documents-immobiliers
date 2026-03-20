import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  UserIcon,
  LayoutDashboard,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const ForWhoSection = () => {
  const professionals = [
    {
      title: "Notaires",
      desc: "Accélérez la préparation de vos dossiers avec une synthèse claire et fiable.",
      icon: ShieldCheck,
    },
    {
      title: "Agents Immobiliers",
      desc: "Valorisez votre devoir de conseil avec un rapport de transparence.",
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
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[100px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="max-w-4xl mb-20"
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
            Pour qui
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.05]">
            Conçu pour chaque
            <br />
            acteur <span className="text-gradient">de l'immobilier</span>
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mt-6 leading-relaxed">
            Que vous soyez acheteur particulier ou professionnel, Analymo s'adapte à vos besoins.
          </p>
        </motion.div>

        {/* Buyers highlight — modern card */}
        <motion.div
          className="relative gradient-primary rounded-[2rem] p-8 md:p-14 text-primary-foreground mb-10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-white/5" />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />

          <div className="relative max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider mb-5">
              Particuliers
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Acheteurs : ne laissez rien au hasard
            </h3>
            <p className="text-primary-foreground/75 max-w-2xl mb-8 text-lg">
              Nous décryptons la santé financière de la copropriété et les travaux à venir
              pour que vous achetiez en toute sérénité.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
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
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all"
            >
              Essayer maintenant
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Professional targets */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {professionals.map((item, i) => (
            <motion.div
              key={i}
              className="group p-7 rounded-3xl border border-border bg-card hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={22} className="text-primary" />
              </div>
              <h4 className="font-bold text-foreground text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
