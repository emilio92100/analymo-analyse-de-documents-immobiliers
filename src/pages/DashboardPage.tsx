import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusCircle,
  TrendingUp,
  Calendar,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { mockAnalyses } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface DashboardPageProps {
  user: any;
}

const DashboardPage = ({ user }: DashboardPageProps) => {
  const analyses = mockAnalyses;

  const avgScore = analyses.length > 0
    ? (analyses.reduce((acc, a) => acc + a.score, 0) / analyses.length).toFixed(1)
    : "0.0";

  const lastDate = analyses.length > 0
    ? new Date(analyses[0].created_at).toLocaleDateString("fr-FR")
    : "Aucune";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-6xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Bonjour, {user?.email?.split("@")[0] || "Utilisateur"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue sur votre tableau de bord Analymo
          </p>
        </div>
        <Link
          to="/app/new-analysis"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <PlusCircle size={18} />
          Nouvelle analyse
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Analyses totales", value: analyses.length.toString(), icon: TrendingUp, color: "text-blue-500" },
          { label: "Score moyen", value: `${avgScore}/10`, icon: TrendingUp, color: "text-emerald-500" },
          { label: "Dernière analyse", value: lastDate, icon: Calendar, color: "text-violet-500" },
          { label: "Crédits restants", value: user?.credits?.toString() ?? "∞", icon: CreditCard, color: "text-amber-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-background rounded-2xl border border-border p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={16} className={stat.color} />
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Analyses */}
      <div className="bg-background rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Analyses récentes</h2>
          <Link
            to="/app/history"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {analyses.map((analysis) => (
            <Link
              key={analysis.id}
              to={`/app/report/${analysis.id}`}
              className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm truncate">
                  {analysis.document_name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {analysis.is_full_report ? "Analyse complète" : "Document unique"}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {new Date(analysis.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span
                  className={cn(
                    "text-lg font-bold",
                    analysis.score >= 7
                      ? "text-emerald-500"
                      : analysis.score >= 5
                      ? "text-amber-500"
                      : "text-destructive"
                  )}
                >
                  {analysis.score}/10
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
