import { useEffect, useState, useRef } from "react";
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
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verify = async () => {
      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type") as any;

      // Strategy 1: Check if Supabase already consumed the token via redirect
      // (GET /verify consumes it and creates a session before redirecting here)
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setStatus("success");
        setTimeout(() => navigate("/app/dashboard"), 3000);
        return;
      }

      // Strategy 2: Listen for auth state change (token exchange in progress)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session?.user && status !== "success") {
            setStatus("success");
            setTimeout(() => navigate("/app/dashboard"), 3000);
          }
        }
      );

      // Strategy 3: Try verifyOtp if we have a token_hash (direct link to our page)
      if (tokenHash && type) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type || "signup",
          });

          if (error) {
            // If token already used but session exists now, it's a success
            const { data: { session: freshSession } } = await supabase.auth.getSession();
            if (freshSession?.user) {
              setStatus("success");
              setTimeout(() => navigate("/app/dashboard"), 3000);
              subscription.unsubscribe();
              return;
            }

            setStatus("error");
            setErrorMsg(
              error.message.includes("expired") || error.message.includes("not found")
                ? "Ce lien a expiré ou a déjà été utilisé. Veuillez vous connecter ou demander un nouveau lien."
                : "Une erreur est survenue lors de la vérification. Veuillez réessayer."
            );
            subscription.unsubscribe();
            return;
          }

          setStatus("success");
          setTimeout(() => navigate("/app/dashboard"), 3000);
        } catch {
          setStatus("error");
          setErrorMsg("Une erreur inattendue est survenue.");
        }
      } else {
        // No token_hash — wait a few seconds for auth state change from redirect
        setTimeout(async () => {
          const { data: { session: delayedSession } } = await supabase.auth.getSession();
          if (delayedSession?.user) {
            setStatus("success");
            setTimeout(() => navigate("/app/dashboard"), 3000);
          } else {
            setStatus("error");
            setErrorMsg("Lien de confirmation invalide ou expiré.");
          }
          subscription.unsubscribe();
        }, 3000);
        return;
      }

      subscription.unsubscribe();
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
                  onClick={() => window.location.assign(`${window.location.origin}/login`)}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
                >
                  Me connecter
                </button>
                <button
                  onClick={() => window.location.assign(`${window.location.origin}/signup`)}
                  className="w-full py-3 rounded-xl border border-border text-muted-foreground font-medium hover:bg-muted transition-all"
                >
                  Réessayer l'inscription
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
