import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AccountPageProps {
  user: any;
}

const AccountPage = ({ user }: AccountPageProps) => {
  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre Compte</h1>
        <p className="text-muted-foreground mb-4">Connectez-vous pour gérer vos informations.</p>
        <Link to="/login" className="text-primary font-semibold hover:underline">Se connecter</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-2xl"
    >
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Mon Compte</h1>

      <div className="space-y-6">
        <div className="bg-background rounded-2xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Informations personnelles</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Analyses Document restantes</span>
              <span className="text-sm font-medium">∞</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Analyses Bien restantes</span>
              <span className="text-sm font-medium">∞</span>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-2xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Sécurité</h3>
          <button className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            Changer le mot de passe
          </button>
        </div>

        <div className="bg-background rounded-2xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-2">Paiements</h3>
          <p className="text-sm text-muted-foreground">Consultez vos factures et votre historique.</p>
          <p className="text-sm text-muted-foreground mt-4 italic">Aucun paiement récent.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountPage;
