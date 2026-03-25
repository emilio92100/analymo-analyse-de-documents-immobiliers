import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";

type Status = "verifying" | "success" | "error";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const verify = async () => {
      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type") as any;

      if (!tokenHash || !type) {
        setStatus("error");
        setErrorMsg("Lien de confirmation invalide ou expiré.");
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type || "signup",
        });

        if (error) {
          setStatus("error");
          setErrorMsg(error.message === "Token has expired or is invalid"
            ? "Ce lien a expiré. Veuillez demander un nouveau lien de confirmation."
            : "Une erreur est survenue lors de la vérification. Veuillez réessayer."
          );
          return;
        }

        setStatus("success");

        // Auto-redirect after 3 seconds
        setTimeout(() => {
          navigate("/app/dashboard");
        }, 3000);
      } catch {
        setStatus("error");
        setErrorMsg("Une erreur inattendue est survenue.");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-background rounded-3xl border border-border p-8 shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {status === "verifying" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Loader2 size={32} className="text-primary animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Vérification en cours…
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Nous vérifions votre adresse email, un instant.
              </p>
              <div className="flex justify-center gap-1 pt-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-success" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Email vérifié ! ✓
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Votre adresse email a été confirmée avec succès.<br />
                Vous allez être redirigé automatiquement…
              </p>
              <button
                onClick={() => navigate("/app/dashboard")}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Accéder à mon espace
              </button>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <XCircle size={32} className="text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Vérification échouée
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {errorMsg}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
                >
                  Réessayer l'inscription
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-xl border border-border text-muted-foreground font-medium hover:bg-muted transition-all"
                >
                  Me connecter
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmEmailPage;
