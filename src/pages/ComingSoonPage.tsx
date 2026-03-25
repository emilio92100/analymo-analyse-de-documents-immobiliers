import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Clock size={40} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Bientôt disponible
        </h1>
        <p className="text-muted-foreground mb-8">
          Cette fonctionnalité est en cours de développement. Revenez bientôt !
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={18} />
          Retour
        </button>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;
