import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const FooterSection = () => {
  return (
    <footer className="bg-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo light />
          <div className="flex gap-8 text-sm">
            <Link
              to="/legal/privacy"
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              to="/legal/terms"
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              CGU
            </Link>
            <Link
              to="/contact"
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              Contact
            </Link>
          </div>
          <p className="text-sm text-white/30">
            © 2026 Analymo. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
