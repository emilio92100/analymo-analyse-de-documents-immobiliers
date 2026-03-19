import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusCircle,
  FileText,
  ShieldCheck,
  Clock,
  ArrowRight,
  ChevronRight,
  Zap,
} from "lucide-react";
import { mockAnalyses } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface DashboardPageProps {
  user: any;
}

const DashboardPage = ({ user }: DashboardPageProps) => {
  const analyses = mockAnalyses;

  const avgScore =
    analyses.length > 0
      ? (analyses.reduce((acc, a) => acc + a.score, 0) / analyses.length).toFixed(1)
      : "0.0";

  const lastDate =
    analyses.length > 0
      ? new Date(analyses[0].created_at).toLocaleDateString("fr-FR")
      : "Aucune";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-6xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Bonjour, {user?.email?.split("@")[0] || "Utilisateur"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue sur votre tableau de bord Analymo
          </p>
        </div>
        <Link
          to="/app/new-analysis"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <PlusCircle size={18} />
          Nouvelle analyse
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "ANALYSES TOTALES",
            value: analyses.length.toString(),
            icon: FileText,
          },
          {
            label: "SCORE MOYEN",
            value: `${avgScore}/10`,
            icon: ShieldCheck,
          },
          {
            label: "DERNIÈRE ANALYSE",
            value: lastDate,
            icon: Clock,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-card rounded-2xl border border-border p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <stat.icon size={18} className="text-primary" />
            </div>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
          </motion.div>
        ))}

        {/* Credits Card — dark */}
        <motion.div
          className="gradient-dark rounded-2xl p-6 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="absolute top-3 right-3 opacity-10">
            <Zap size={60} />
          </div>
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/60">
            CRÉDITS RESTANTS
          </p>
          <p className="text-4xl font-black mt-1">{user?.credits ?? 0}</p>
          <Link
            to="/app/pricing"
            className="inline-flex items-center gap-1 mt-3 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
          >
            Recharger <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Recent Analyses */}
      <div className="bg-card rounded-2xl border border-border">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-bold text-foreground">Analyses récentes</h2>
          <Link
            to="/app/history"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-border">
          {analyses.map((analysis, i) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <Link
                to={`/app/report/${analysis.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm truncate">
                    {analysis.document_name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(analysis.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-lg font-bold",
                    analysis.score >= 7
                      ? "text-primary"
                      : analysis.score >= 5
                      ? "text-warning"
                      : "text-destructive"
                  )}
                >
                  {analysis.score}/10
                </span>
                <ChevronRight size={16} className="text-muted-foreground/40" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
