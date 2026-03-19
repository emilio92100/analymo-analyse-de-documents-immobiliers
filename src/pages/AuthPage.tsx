import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";

interface AuthPageProps {
  type: "login" | "signup";
  onAuth: (user: any) => void;
}

const AuthPage = ({ type, onAuth }: AuthPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate auth (replace with Lovable Cloud auth later)
    try {
      await new Promise((r) => setTimeout(r, 800));

      if (!email || !password) {
        setError("Veuillez remplir tous les champs.");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
        setLoading(false);
        return;
      }

      const mockUser = {
        id: "user-1",
        email,
        credits: 3,
        isGuest: false,
      };

      onAuth(mockUser);
      navigate("/app/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo showSubtitle />
          </Link>
        </div>

        <div className="bg-background rounded-3xl border border-border p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground text-center">
            {type === "login" ? "Bon retour parmi nous" : "Créez votre compte"}
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            {type === "login"
              ? "Connectez-vous pour accéder à vos analyses."
              : "Commencez avec 1 analyse gratuite."}
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading
                ? "Chargement..."
                : type === "login"
                ? "Se connecter"
                : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {type === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}
            {" "}
            <Link
              to={type === "login" ? "/signup" : "/login"}
              className="text-primary font-medium hover:underline"
            >
              {type === "login" ? "S'inscrire" : "Se connecter"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
