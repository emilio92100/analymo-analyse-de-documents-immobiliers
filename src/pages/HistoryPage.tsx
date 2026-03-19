import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mockAnalyses } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface HistoryPageProps {
  user: any;
}

const HistoryPage = ({ user }: HistoryPageProps) => {
  const analyses = mockAnalyses;

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre Historique</h1>
        <p className="text-muted-foreground mb-4">Connectez-vous pour retrouver vos analyses.</p>
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-4xl"
    >
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
        Historique des analyses
      </h1>

      <div className="space-y-3">
        {analyses.map((analysis, i) => (
          <motion.div
            key={analysis.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/app/report/${analysis.id}`}
              className="flex items-center justify-between p-5 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {analysis.document_name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {analysis.is_full_report ? "Analyse complète" : "Document unique"}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {new Date(analysis.created_at).toLocaleDateString("fr-FR")}
                </span>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Score</span>
                  <p
                    className={cn(
                      "text-lg font-bold",
                      analysis.score >= 7
                        ? "text-emerald-500"
                        : analysis.score >= 4
                        ? "text-amber-500"
                        : "text-destructive"
                    )}
                  >
                    {analysis.score}/10
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HistoryPage;
