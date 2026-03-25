import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user: any;
  onLogout?: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Exemple", path: "/example" },
    { name: "Tarifs", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "left-0 right-0 z-50 transition-all duration-300",
        "fixed w-full z-50 mt-6",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm md:bg-transparent md:backdrop-blur-none md:border-b-0 md:shadow-none"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <Logo size="xl" />
          </Link>

          {/* Desktop Nav — single pill with everything */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-muted/60 backdrop-blur-sm border border-border/40">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}

            {/* Separator */}
            <div className="w-px h-5 bg-border/60 mx-1" />

            {user ? (
              <>
                <button
                  onClick={() => navigate("/app/dashboard")}
                  className="relative px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Mon espace
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Déconnexion
                  </button>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-muted/60 transition-colors"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-border/50 space-y-2">
                {user ? (
                  <button
                    onClick={() => {
                      navigate("/app/dashboard");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-primary text-primary-foreground text-center"
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
                      className="block px-4 py-3 text-sm font-semibold text-center rounded-xl bg-primary text-primary-foreground"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
