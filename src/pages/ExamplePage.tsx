import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Building2,
  Wrench,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { exampleProperties } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ExamplePageProps {
  user: any;
  onLogout: () => void;
}

const ExamplePage = ({ user, onLogout }: ExamplePageProps) => {
  const [selectedId, setSelectedId] = useState(1);
  const current = exampleProperties.find((p) => p.id === selectedId) || exampleProperties[0];

  const scoreColor = current.score >= 80 ? "text-emerald-500" : "text-amber-500";
  const scoreBg = current.score >= 80 ? "bg-emerald-50" : "bg-amber-50";

  return (
    <div className="min-h-screen bg-bg-light">
      <Navbar user={user} onLogout={onLogout} />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property selector */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {exampleProperties.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={cn(
                "px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all border-2",
                selectedId === p.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-background border-border hover:border-primary/30"
              )}
            >
              {p.address}
            </button>
          ))}
        </div>

        {/* Header */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background rounded-3xl border border-border p-6 lg:p-8 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{current.address}</h1>
              <p className="text-muted-foreground">{current.city} • {current.type}</p>
              <p className="text-lg font-bold text-primary mt-2">{current.price}</p>
            </div>
            <div className={cn("text-center p-6 rounded-2xl", scoreBg)}>
              <p className={cn("text-4xl font-extrabold", scoreColor)}>{current.score}/100</p>
              <p className="text-xs font-bold mt-1">{current.status}</p>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <div className="bg-background rounded-3xl border border-border p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Synthèse de l'Expert</h2>
          <p className="text-muted-foreground italic">"{current.summary}"</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {current.positives.map((p, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium">
                <CheckCircle2 size={12} /> {p}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Financials */}
          <div className="bg-background rounded-3xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-primary" />
              <h3 className="font-bold text-foreground">Tableau de bord financier</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Charges Annuelles", value: `${current.financials.annualCharges} €`, sub: `${current.financials.chargesTrend} vs N-1` },
                { label: "Fonds de travaux", value: current.financials.reserveFund, sub: "Quote-part estimée" },
                { label: "Taxe Foncière", value: current.financials.taxeFonciere, sub: "Base 2023" },
                { label: "Prix du bien", value: current.price, sub: "Prix d'achat" },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostics & Works */}
          <div className="space-y-6">
            <div className="bg-background rounded-3xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={18} className="text-primary" />
                <h3 className="font-bold text-foreground">Diagnostics Techniques</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "DPE", value: current.diagnostics.dpe },
                  { label: "GES", value: current.diagnostics.ges },
                ].map((d, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-muted">
                    <span className={cn(
                      "text-2xl font-extrabold",
                      ["A", "B", "C"].includes(d.value) ? "text-emerald-500" : "text-destructive"
                    )}>
                      {d.value}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{d.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm p-2">
                  <span className="text-muted-foreground">Amiante</span>
                  <span className="font-medium">{current.diagnostics.amiante}</span>
                </div>
                <div className="flex justify-between text-sm p-2">
                  <span className="text-muted-foreground">Plomb</span>
                  <span className="font-medium">{current.diagnostics.plomb}</span>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-3xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={18} className="text-primary" />
                <h3 className="font-bold text-foreground">Historique Travaux</h3>
              </div>
              <div className="space-y-3">
                {current.works.map((w, i) => (
                  <div key={i} className="p-3 rounded-xl bg-muted">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-primary">{w.year}</span>
                      <span className="text-xs font-medium text-muted-foreground">{w.status}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{w.title}</p>
                    <p className="text-xs text-muted-foreground">{w.cost}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts & CTA */}
          <div className="space-y-6">
            <div className="bg-background rounded-3xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-amber-500" />
                <h3 className="font-bold text-foreground">Points de Vigilance</h3>
              </div>
              <div className="space-y-3">
                {current.alerts.map((a, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-2xl border",
                      a.severity === "high"
                        ? "bg-red-50 border-red-100"
                        : a.severity === "medium"
                        ? "bg-amber-50 border-amber-100"
                        : "bg-blue-50 border-blue-100"
                    )}
                  >
                    <h4 className="font-bold text-foreground text-sm">{a.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-3xl p-6 text-primary-foreground">
              <ShieldCheck size={24} className="mb-3" />
              <h3 className="font-bold text-lg mb-2">Prêt à sécuriser votre achat ?</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Obtenez votre audit complet en moins de 2 minutes.
              </p>
              <Link
                to={user ? "/app/new-analysis" : "/signup"}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary-foreground text-primary font-bold text-sm hover:bg-primary-foreground/90 transition-all"
              >
                Lancer mon audit
                <ArrowRight size={16} />
              </Link>
              <p className="text-xs text-primary-foreground/50 mt-3">
                Sans engagement • 100% en ligne
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
