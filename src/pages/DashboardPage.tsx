import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusCircle,
  FileText,
  ShieldCheck,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import DocumentUpload from "@/components/dashboard/DocumentUpload";
import AnalysisList from "@/components/dashboard/AnalysisList";
import AnalysisDetail from "@/components/dashboard/AnalysisDetail";

interface DashboardPageProps {
  user: any;
}

const DashboardPage = ({ user }: DashboardPageProps) => {
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalyses = useCallback(async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from("document_analyses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setAnalyses(data || []);
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    fetchAnalyses();

    // Poll for status changes every 5s
    const interval = setInterval(fetchAnalyses, 5000);
    return () => clearInterval(interval);
  }, [fetchAnalyses]);

  const completedAnalyses = analyses.filter((a) => a.status === "completed");
  const avgScore =
    completedAnalyses.length > 0
      ? (completedAnalyses.reduce((acc, a) => acc + (a.score || 0), 0) / completedAnalyses.length).toFixed(1)
      : "—";

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
            Bonjour, {user?.displayName || user?.email?.split("@")[0] || "Utilisateur"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue sur votre tableau de bord Analymo
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "ANALYSES TOTALES", value: analyses.length.toString(), icon: FileText },
          { label: "SCORE MOYEN", value: avgScore === "—" ? "—" : `${avgScore}/10`, icon: ShieldCheck },
          { label: "DERNIÈRE ANALYSE", value: lastDate, icon: Clock },
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

      {/* Document Upload */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4">Analyser un document</h2>
        <DocumentUpload userId={user?.id} onAnalysisComplete={fetchAnalyses} />
      </div>

      {/* Selected Analysis Detail */}
      {selectedAnalysis && (
        <div className="mb-8">
          <AnalysisDetail
            analysis={selectedAnalysis}
            onClose={() => setSelectedAnalysis(null)}
          />
        </div>
      )}

      {/* Analyses List */}
      <div className="bg-card rounded-2xl border border-border">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-bold text-foreground">Vos analyses</h2>
          <span className="text-sm text-muted-foreground">{analyses.length} document{analyses.length > 1 ? "s" : ""}</span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <AnalysisList analyses={analyses} onSelect={setSelectedAnalysis} />
        )}
      </div>
    </motion.div>
  );
};

export default DashboardPage;
