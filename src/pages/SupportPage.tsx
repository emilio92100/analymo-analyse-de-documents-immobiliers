import { motion } from "framer-motion";

const SupportPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-2xl"
    >
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Support</h1>
      <p className="text-muted-foreground mb-8">
        Une question ? Notre équipe vous répond sous 24h.
      </p>

      <div className="bg-background rounded-2xl border border-border p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nom</label>
          <input className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <input type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
          <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" />
        </div>
        <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
          Envoyer le message
        </button>
      </div>
    </motion.div>
  );
};

export default SupportPage;
