import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowLeft,
  Brain,
  TrendingUp,
  Wrench,
  Building2,
  Scale,
  BookOpen,
} from "lucide-react";
import { mockAnalyses } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const ReportPage = () => {
  const { id } = useParams();
  const analysis = mockAnalyses.find((a) => a.id === id);

  if (!analysis) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Rapport non trouvé.</p>
        <Link to="/app/history" className="text-primary hover:underline mt-2 inline-block">
          Retour à l'historique
        </Link>
      </div>
    );
  }

  const report = JSON.parse(analysis.report_json);

  const scoreColor = analysis.score >= 7 ? "text-emerald-500" : analysis.score >= 5 ? "text-amber-500" : "text-destructive";
  const scoreBg = analysis.score >= 7 ? "bg-emerald-50" : analysis.score >= 5 ? "bg-amber-50" : "bg-red-50";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 lg:p-8 max-w-5xl"
    >
      <Link
        to="/app/history"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm font-medium transition-colors"
      >
        <ArrowLeft size={16} />
        Retour aux analyses
      </Link>

      {/* Header */}
      <div className="bg-background rounded-3xl border border-border p-6 lg:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">
              {analysis.document_name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {report.address || "Analyse immobilière"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(analysis.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className={cn("text-center p-6 rounded-2xl", scoreBg)}>
            <p className={cn("text-4xl font-extrabold", scoreColor)}>
              {analysis.score}/10
            </p>
            <p className="text-xs font-medium text-muted-foreground mt-1">Score de fiabilité</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-background rounded-3xl border border-border p-6 lg:p-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={20} className="text-primary" />
          <h2 className="text-lg font-bold text-foreground">Synthèse de l'Expert</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">{report.summary}</p>

        {report.generalOpinion && (
          <div className="mt-4 p-4 rounded-2xl bg-primary-light border border-primary/10">
            <p className="text-sm text-foreground">{report.generalOpinion}</p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-background rounded-3xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={20} className="text-emerald-500" />
            <h3 className="font-bold text-foreground">Points positifs</h3>
          </div>
          <ul className="space-y-3">
            {report.pros?.map((pro: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vigilance */}
        <div className="bg-background rounded-3xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-amber-500" />
            <h3 className="font-bold text-foreground">Points de vigilance</h3>
          </div>
          <ul className="space-y-3">
            {report.vigilancePoints?.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Financial Health */}
        <div className="bg-background rounded-3xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-primary" />
            <h3 className="font-bold text-foreground">Santé financière</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{report.financialHealth}</p>

          {report.financials && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Charges annuelles", value: `${report.financials.annualCharges} €` },
                { label: "Tendance", value: report.financials.chargesTrend },
                { label: "Fonds de travaux", value: report.financials.reserveFund },
                { label: "Taxe foncière", value: report.financials.taxeFonciere },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Diagnostics */}
        {report.diagnostics && (
          <div className="bg-background rounded-3xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={20} className="text-primary" />
              <h3 className="font-bold text-foreground">Diagnostics Techniques</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "DPE", value: report.diagnostics.dpe },
                { label: "GES", value: report.diagnostics.ges },
                { label: "Amiante", value: report.diagnostics.amiante },
                { label: "Plomb", value: report.diagnostics.plomb },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className={cn(
                    "text-sm font-bold",
                    item.value === "Néant" ? "text-emerald-500" :
                    ["A", "B", "C"].includes(item.value) ? "text-emerald-500" :
                    ["D", "E"].includes(item.value) ? "text-amber-500" :
                    "text-destructive"
                  )}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Works */}
      {report.works?.length > 0 && (
        <div className="bg-background rounded-3xl border border-border p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Wrench size={20} className="text-primary" />
            <h3 className="font-bold text-foreground">Travaux identifiés</h3>
          </div>
          <div className="space-y-3">
            {report.works.map((work: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted">
                <div>
                  <p className="font-medium text-foreground text-sm">{work.description}</p>
                  <p className="text-xs text-muted-foreground">{work.status}</p>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold",
                  work.impact === "Élevé" || work.impact === "Très élevé"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-600"
                )}>
                  Impact {work.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-background rounded-3xl border border-border p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Info size={20} className="text-primary" />
          <h3 className="font-bold text-foreground">Recommandations</h3>
        </div>
        <ul className="space-y-3">
          {report.recommendations?.map((rec: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Info size={14} className="text-primary mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expert Advice */}
      {report.analymoAdvice && (
        <div className="bg-primary rounded-3xl p-6 lg:p-8 mt-6 text-primary-foreground">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={20} />
            <h3 className="font-bold">L'avis d'Analymo</h3>
          </div>
          <p className="text-primary-foreground/90 leading-relaxed italic">
            "{report.analymoAdvice}"
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ReportPage;
