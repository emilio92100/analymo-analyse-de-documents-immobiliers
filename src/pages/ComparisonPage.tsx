import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeftRight, Eye, Brain } from "lucide-react";
import { mockAnalyses } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ComparisonPageProps {
  user: any;
}

const ComparisonPage = ({ user }: ComparisonPageProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const analyses = mockAnalyses.filter((a) => a.is_full_report);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else if (selectedIds.length < 2) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds([selectedIds[1], id]);
    }
  };

  const selectedAnalyses = analyses.filter((a) => selectedIds.includes(a.id));

  if (showComparison && selectedAnalyses.length === 2) {
    const reportA = JSON.parse(selectedAnalyses[0].report_json);
    const reportB = JSON.parse(selectedAnalyses[1].report_json);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 lg:p-8 max-w-5xl"
      >
        <button
          onClick={() => { setShowComparison(false); }}
          className="flex items-center text-muted-foreground hover:text-foreground font-medium text-sm transition-colors mb-6"
        >
          ← Retour
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-6">Analyse Comparative</h2>

        {/* Verdict */}
        <div className="bg-primary rounded-3xl p-6 lg:p-8 text-primary-foreground mb-6">
          <Brain size={24} className="mb-3" />
          <h3 className="font-bold text-lg mb-3">Verdict Rapide</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-primary-foreground/10 rounded-2xl p-4">
              <p className="text-xs text-primary-foreground/60">Bien recommandé</p>
              <p className="font-bold">{selectedAnalyses[0].document_name}</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-4">
              <p className="text-xs text-primary-foreground/60">Plus risqué</p>
              <p className="font-bold">{selectedAnalyses[1].document_name}</p>
            </div>
          </div>
          <p className="text-primary-foreground/80 text-sm italic">
            "Le premier bien présente un profil nettement plus sûr avec des finances saines et moins de travaux à prévoir."
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-background rounded-3xl border border-border p-6 mb-6 overflow-x-auto">
          <h3 className="font-bold text-foreground mb-4">Comparaison Simplifiée</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground">Critère</th>
                <th className="text-center py-3 font-medium text-muted-foreground">{selectedAnalyses[0].document_name.substring(0, 30)}...</th>
                <th className="text-center py-3 font-medium text-muted-foreground">{selectedAnalyses[1].document_name.substring(0, 30)}...</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Score", a: `${selectedAnalyses[0].score}/10`, b: `${selectedAnalyses[1].score}/10` },
                { label: "Charges/an", a: `${reportA.financials?.annualCharges || "N/A"} €`, b: `${reportB.financials?.annualCharges || "N/A"} €` },
                { label: "DPE", a: reportA.diagnostics?.dpe || "N/A", b: reportB.diagnostics?.dpe || "N/A" },
                { label: "Fonds travaux", a: reportA.financials?.reserveFund || "N/A", b: reportB.financials?.reserveFund || "N/A" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-3 font-medium text-foreground">{row.label}</td>
                  <td className="py-3 text-center text-muted-foreground">{row.a}</td>
                  <td className="py-3 text-center text-muted-foreground">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Serenity Index */}
        <div className="bg-background rounded-3xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Indice de Sérénité</h3>
          {selectedAnalyses.map((a, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">{a.document_name}</span>
                <span className="font-bold text-primary">{a.score}/10</span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    a.score >= 7 ? "bg-emerald-500" : a.score >= 5 ? "bg-amber-500" : "bg-destructive"
                  )}
                  style={{ width: `${a.score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-4xl"
    >
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
        Comparer mes biens
      </h1>
      <p className="text-muted-foreground mb-6">
        Sélectionnez deux audits complets pour obtenir une comparaison détaillée.
      </p>

      <button
        onClick={() => selectedIds.length >= 2 && setShowComparison(true)}
        disabled={selectedIds.length < 2}
        className="mb-6 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <ArrowLeftRight size={18} />
        Lancer la comparaison
      </button>

      {selectedIds.length < 2 && (
        <p className="text-xs text-muted-foreground mb-6">
          Sélectionnez au moins deux analyses
        </p>
      )}

      {analyses.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {analyses.map((a) => (
            <button
              key={a.id}
              onClick={() => toggleSelect(a.id)}
              className={cn(
                "p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden",
                selectedIds.includes(a.id)
                  ? "border-primary bg-primary/5 shadow-xl"
                  : "border-border bg-background hover:border-primary/30 hover:shadow-lg"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  selectedIds.includes(a.id) ? "border-primary bg-primary" : "border-border"
                )}>
                  {selectedIds.includes(a.id) && (
                    <CheckCircle2 size={14} className="text-primary-foreground" />
                  )}
                </div>
                <span className={cn(
                  "text-lg font-bold",
                  a.score >= 7 ? "text-emerald-500" : a.score >= 5 ? "text-amber-500" : "text-destructive"
                )}>
                  {a.score}/10
                </span>
              </div>

              <h3 className="font-bold text-foreground">{a.document_name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(a.created_at).toLocaleDateString("fr-FR")}
              </p>
              <span className="inline-block mt-2 px-2 py-1 rounded-lg bg-primary-light text-xs font-medium text-primary">
                Audit Complet
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-background rounded-3xl border border-border">
          <h3 className="font-bold text-foreground mb-2">Aucun audit complet détecté</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Réalisez au moins deux analyses complètes pour pouvoir les comparer.
          </p>
          <Link
            to="/app/new-analysis"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold"
          >
            Lancer mon premier audit
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default ComparisonPage;
