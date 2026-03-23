import { X, FileText, CheckCircle, AlertTriangle, Lightbulb, DollarSign, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnalysisDetailProps {
  analysis: {
    id: string;
    document_name: string;
    summary: string | null;
    key_points: string[] | null;
    score: number | null;
    full_analysis: any;
    created_at: string;
  };
  onClose: () => void;
}

const AnalysisDetail = ({ analysis, onClose }: AnalysisDetailProps) => {
  const fa = analysis.full_analysis || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">{analysis.document_name}</h2>
            <p className="text-xs text-muted-foreground">
              {fa.type && `${fa.type} • `}
              {new Date(analysis.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {analysis.score !== null && (
            <div className={cn(
              "text-2xl font-black",
              analysis.score >= 7 ? "text-primary" : analysis.score >= 5 ? "text-warning" : "text-destructive"
            )}>
              {analysis.score}/10
            </div>
          )}
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
        {/* Summary */}
        {analysis.summary && (
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Résumé</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>
          </div>
        )}

        {/* Key Points */}
        {analysis.key_points && analysis.key_points.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Points clés</h3>
            <ul className="space-y-1.5">
              {analysis.key_points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pros */}
        {fa.pros?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={14} className="text-green-500" />
              <h3 className="text-sm font-bold text-foreground">Points positifs</h3>
            </div>
            <ul className="space-y-1.5">
              {fa.pros.map((p: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {fa.warnings?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-warning" />
              <h3 className="text-sm font-bold text-foreground">Points de vigilance</h3>
            </div>
            <ul className="space-y-1.5">
              {fa.warnings.map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {fa.recommendations?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={14} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">Recommandations</h3>
            </div>
            <ul className="space-y-1.5">
              {fa.recommendations.map((r: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Financial Summary */}
        {fa.financialSummary && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={14} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">Résumé financier</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{fa.financialSummary}</p>
          </div>
        )}

        {/* Legal Notes */}
        {fa.legalNotes && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Scale size={14} className="text-primary" />
              <h3 className="text-sm font-bold text-foreground">Notes juridiques</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{fa.legalNotes}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnalysisDetail;
