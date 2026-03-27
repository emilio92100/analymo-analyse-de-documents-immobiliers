import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

const FooterSection = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Banner */}
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-white/5" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />

            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary-foreground leading-tight mb-4">
                Prêt à sécuriser
                <br />
                votre investissement ?
              </h2>
              <p className="text-primary-foreground/60 text-lg mb-8">
                Rejoignez des milliers d'acheteurs qui analysent avant de signer.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-foreground text-foreground font-bold text-base hover:bg-primary-foreground/90 transition-all shadow-xl group"
              >
                Commencer gratuitement
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 items-start">
            <div className="md:col-span-2">
              <Logo light size="xl" />
              <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-sm">
                L'outil d'analyse intelligente pour sécuriser vos investissements
                immobiliers. Score, risques et recommandations en 2 minutes.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">
                Navigation
              </span>
              {[
                { label: "Tarifs", path: "/pricing" },
                { label: "Exemple", path: "/example" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white/40 hover:text-white/80 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">
                Légal
              </span>
              <Link to="/legal/privacy" className="text-white/40 hover:text-white/80 transition-colors text-sm">
                Confidentialité
              </Link>
              <Link to="/legal/terms" className="text-white/40 hover:text-white/80 transition-colors text-sm">
                CGU
              </Link>
            </div>
          </div>

          {/* IA Disclaimer + Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/25 text-xs leading-relaxed max-w-3xl">
              Les analyses fournies par Analymo sont générées par une
              intelligence artificielle à titre indicatif et de conseil
              uniquement. Elles peuvent contenir des erreurs et ne se
              substituent en aucun cas à l'avis d'un notaire, d'un avocat ou
              d'un expert immobilier qualifié.
            </p>
            <p className="text-white/20 text-xs mt-4">
              © 2026 Analymo. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
