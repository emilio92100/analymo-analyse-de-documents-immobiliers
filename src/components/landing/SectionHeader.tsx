import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  highlight: string;
  subtitle: string;
  center?: boolean;
}

const SectionHeader = ({ title, highlight, subtitle, center = false }: SectionHeaderProps) => {
  return (
    <motion.div
      className={`max-w-4xl mb-20 ${center ? "mx-auto text-center" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.05] mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {title}{" "}
        <span className="text-gradient relative inline-block">
          {highlight}
          <motion.span
            className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </span>
      </motion.h2>
      <motion.p
        className={`text-muted-foreground text-lg sm:text-xl leading-relaxed mt-6 ${center ? "max-w-xl mx-auto" : "max-w-2xl"}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
