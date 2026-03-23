import { FileText, Loader2, AlertCircle, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Analysis {
  id: string;
  document_name: string;
  status: string;
  summary: string | null;
  key_points: string[] | null;
  score: number | null;
  full_analysis: any;
  created_at: string;
}

interface AnalysisListProps {
  analyses: Analysis[];
  onSelect: (analysis: Analysis) => void;
}

const statusConfig = {
  pending: { icon: Loader2, label: "En attente", color: "text-muted-foreground", animate: true },
  processing: { icon: Loader2, label: "Analyse en cours", color: "text-primary", animate: true },
  completed: { icon: CheckCircle, label: "Terminé", color: "text-green-500", animate: false },
  error: { icon: AlertCircle, label: "Erreur", color: "text-destructive", animate: false },
};

const AnalysisList = ({ analyses, onSelect }: AnalysisListProps) => {
  if (analyses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <FileText size={40} className="mx-auto mb-3 opacity-30" />
        <p className="font-medium">Aucune analyse pour le moment</p>
        <p className="text-sm mt-1">Uploadez un document pour commencer</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {analyses.map((analysis, i) => {
        const status = statusConfig[analysis.status as keyof typeof statusConfig] || statusConfig.error;
        const StatusIcon = status.icon;

        return (
          <motion.button
            key={analysis.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => analysis.status === "completed" && onSelect(analysis)}
            className={cn(
              "flex items-center gap-4 px-6 py-4 w-full text-left transition-colors",
              analysis.status === "completed" ? "hover:bg-muted/50 cursor-pointer" : "cursor-default"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm truncate">
                {analysis.document_name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusIcon size={12} className={cn(status.color, status.animate && "animate-spin")} />
                <span className={cn("text-xs", status.color)}>{status.label}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(analysis.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
            {analysis.score !== null && (
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
            )}
            {analysis.status === "completed" && (
              <ChevronRight size={16} className="text-muted-foreground/40" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default AnalysisList;
