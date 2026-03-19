import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  user: any;
  onLogout?: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Tarifs", path: "/pricing" },
    { name: "Exemple", path: "/example" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/app/dashboard")}
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-all shadow-md shadow-primary/20"
                >
                  Mon espace
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Déconnexion
                  </button>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-all shadow-md shadow-primary/20"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-border space-y-2">
            {user ? (
              <button
                onClick={() => { navigate("/app/dashboard"); setIsMenuOpen(false); }}
                className="w-full px-4 py-3 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground"
              >
                Mon espace
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-center rounded-xl border border-border"
                >
                  Connexion
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-center rounded-xl gradient-primary text-primary-foreground"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
