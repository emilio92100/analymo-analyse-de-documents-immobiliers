import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  X,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NewAnalysisPageProps {
  user: any;
}

const NewAnalysisPage = ({ user }: NewAnalysisPageProps) => {
  const [analysisMode, setAnalysisMode] = useState<"single" | "full" | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const steps = [
    "Réception des documents...",
    "Extraction du texte...",
    "Numérisation des pages (OCR)...",
    "Analyse croisée des données...",
    "Détection des points de vigilance...",
    "Génération du rapport d'audit...",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (analysisMode === "single") {
        setSelectedFiles([files[0]]);
      } else {
        setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
      }
      setError(null);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const startAnalysis = async () => {
    if (selectedFiles.length === 0) return;
    setIsAnalyzing(true);
    setError(null);

    // Simulate analysis progress
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      setProgress(Math.round(((i + 1) / steps.length) * 100));
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    }

    // Navigate to mock report
    navigate("/app/report/1");
  };

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Circular Progress */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-primary">{progress}%</span>
              <span className="text-xs text-muted-foreground">Analyse</span>
            </div>
          </div>

          <p className="text-lg font-semibold text-foreground">{steps[step]}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {selectedFiles.length} document(s) en cours de traitement
          </p>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i <= step ? "bg-primary w-4" : "bg-border"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!analysisMode) {
    return (
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Que souhaitez-vous analyser ?
          </h1>
          <p className="text-muted-foreground mt-2">
            Choisissez le mode d'analyse adapté à votre besoin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            onClick={() => setAnalysisMode("single")}
            className="bg-background p-8 lg:p-10 rounded-3xl border-2 border-border hover:border-primary hover:shadow-xl transition-all text-left group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
              <FileText size={28} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Analyse d'un document</h3>
            <p className="text-muted-foreground text-sm">
              Idéal pour comprendre rapidement un document précis et lever un doute.
            </p>
            <div className="flex items-center gap-2 mt-4 text-primary font-semibold text-sm">
              Commencer <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <motion.button
            onClick={() => setAnalysisMode("full")}
            className="bg-background p-8 lg:p-10 rounded-3xl border-2 border-border hover:border-primary hover:shadow-xl transition-all text-left group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              Recommandé
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <ShieldCheck size={28} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Analyse complète d'un logement</h3>
            <p className="text-muted-foreground text-sm">
              Analyse croisée de tous les documents du bien pour une décision éclairée.
            </p>
            <div className="flex items-center gap-2 mt-4 text-primary font-semibold text-sm">
              Commencer l'audit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      <button
        onClick={() => { setAnalysisMode(null); setSelectedFiles([]); }}
        className="flex items-center text-muted-foreground hover:text-foreground mb-6 font-medium transition-colors"
      >
        <ChevronLeft size={18} />
        Retour au choix
      </button>

      <h1 className="text-2xl font-bold text-foreground">
        {analysisMode === "single" ? "Analyse d'un document" : "Audit complet du logement"}
      </h1>
      <p className="text-muted-foreground mt-1 mb-8">
        {analysisMode === "single"
          ? "Importez le document que vous souhaitez décrypter."
          : "Importez l'ensemble des documents pour un audit complet."}
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Upload Area */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple={analysisMode === "full"}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={() => {
          if (analysisMode === "single" && selectedFiles.length >= 1) {
            setError("Supprimez le fichier actuel pour en choisir un autre.");
            return;
          }
          fileInputRef.current?.click();
        }}
        className={cn(
          "w-full p-12 rounded-3xl border-2 border-dashed transition-all text-center group",
          analysisMode === "single" && selectedFiles.length >= 1
            ? "border-border bg-muted/50 cursor-not-allowed"
            : "border-border hover:border-primary hover:bg-primary/5"
        )}
      >
        <Upload
          size={40}
          className={cn(
            "mx-auto mb-4",
            selectedFiles.length >= 1 && analysisMode === "single"
              ? "text-muted-foreground/30"
              : "text-muted-foreground group-hover:text-primary"
          )}
        />
        <h3 className="text-lg font-bold text-foreground">
          {analysisMode === "single" ? "Sélectionner le document" : "Ajouter les documents"}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {analysisMode === "single"
            ? "Format PDF uniquement (1 document max)"
            : "Sélectionnez plusieurs PDF pour une analyse croisée"}
        </p>
      </button>

      {/* File list for full mode */}
      {analysisMode === "full" && selectedFiles.length > 0 && (
        <div className="mt-6 bg-background rounded-2xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-1">Documents dans la file d'audit</h3>
          <p className="text-xs text-muted-foreground mb-4">Tous ces documents seront croisés pour l'analyse finale</p>
          <div className="space-y-2">
            {selectedFiles.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText size={16} className="text-primary shrink-0" />
                  <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 bg-background rounded-2xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-3">Résumé de la sélection</h3>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Mode d'analyse</span>
          <span className="font-medium">{analysisMode === "single" ? "Document unique" : "Audit complet"}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-muted-foreground">Documents</span>
          <span className="font-medium">{selectedFiles.length}</span>
        </div>

        {analysisMode === "single" && selectedFiles.length > 0 && (
          <div className="p-3 rounded-xl bg-muted mb-4">
            <p className="text-sm font-medium truncate">{selectedFiles[0].name}</p>
            <button
              onClick={() => setSelectedFiles([])}
              className="text-xs font-bold text-destructive uppercase tracking-wider hover:underline mt-1"
            >
              Changer de document
            </button>
          </div>
        )}

        <button
          onClick={startAnalysis}
          disabled={selectedFiles.length === 0}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
        >
          Lancer l'analyse
        </button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          En lançant l'analyse, vous acceptez nos conditions générales d'utilisation.
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {[
          { icon: ShieldCheck, text: "100% Confidentiel", color: "text-emerald-500", bg: "bg-emerald-50" },
          { icon: Zap, text: "Analyse croisée intelligente", color: "text-amber-500", bg: "bg-amber-50" },
          { icon: Lock, text: "Paiement sécurisé", color: "text-primary", bg: "bg-primary-light" },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${item.bg}`}>
            <item.icon size={14} className={item.color} />
            <span className="text-xs font-medium text-foreground">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewAnalysisPage;
