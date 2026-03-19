import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ShieldCheck, Lock, Zap, FileText, Clock, Users } from "lucide-react";
import { useEffect, useRef } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [target, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const TrustSection = () => {
  const trustItems = [
    {
      title: "Confidentiel",
      desc: "Documents analysés puis automatiquement supprimés. Aucune donnée revendue.",
      icon: ShieldCheck,
    },
    {
      title: "Sécurisé",
      desc: "Chiffrement de bout en bout et infrastructure de niveau bancaire.",
      icon: Lock,
    },
    {
      title: "Instantané",
      desc: "Rapport complet en moins de 2 minutes, disponible 24h/24.",
      icon: Zap,
    },
  ];

  const stats = [
    { value: 10000, suffix: "+", label: "Documents analysés", icon: FileText },
    { value: 2, suffix: " min", label: "Temps moyen", icon: Clock },
    { value: 4.8, suffix: "/5", label: "Satisfaction client", icon: Users },
  ];

  return (
    <section className="py-16 bg-bg-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />
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
            Confiance
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.1]">
            Sécurité <span className="text-gradient">sans compromis</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Vos données sont protégées avec les standards les plus exigeants du marché.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              className="group p-8 rounded-3xl bg-card border border-border text-center hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="gradient-primary rounded-[2rem] p-10 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-white/5" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />

          <div className="grid sm:grid-cols-3 gap-10 text-center text-primary-foreground relative">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <stat.icon size={24} className="mx-auto mb-3 opacity-70" />
                <p className="text-4xl md:text-5xl font-black">
                  {typeof stat.value === 'number' && stat.value > 100 ? (
                    <>
                      <AnimatedCounter target={stat.value} />
                      {stat.suffix}
                    </>
                  ) : (
                    <>{"< "}{stat.value}{stat.suffix}</>
                  )}
                </p>
                <p className="text-sm mt-2 opacity-70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
