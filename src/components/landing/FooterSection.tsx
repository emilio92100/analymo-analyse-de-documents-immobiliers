import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const FooterSection = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <Logo light />
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              L'outil d'analyse intelligente pour sécuriser vos investissements immobiliers.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Liens</span>
            {[
              { label: "Tarifs", path: "/pricing" },
              { label: "Exemple", path: "/example" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/50 hover:text-white/80 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Légal</span>
            <Link to="/legal/privacy" className="text-white/50 hover:text-white/80 transition-colors text-sm">
              Confidentialité
            </Link>
            <Link to="/legal/terms" className="text-white/50 hover:text-white/80 transition-colors text-sm">
              CGU
            </Link>
          </div>
        </div>

        {/* IA Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs leading-relaxed max-w-3xl">
            Les analyses fournies par Analymo sont générées par une intelligence artificielle à titre indicatif et de conseil uniquement.
            Elles peuvent contenir des erreurs et ne se substituent en aucun cas à l'avis d'un notaire, d'un avocat ou d'un expert immobilier qualifié.
          </p>
          <p className="text-white/25 text-xs mt-4">
            © 2026 Analymo. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
