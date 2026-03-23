import { useState, useRef } from "react";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DocumentUploadProps {
  userId: string;
  onAnalysisComplete: () => void;
}

const DocumentUpload = ({ userId, onAnalysisComplete }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "analyzing" | "done" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const allowedTypes = ["application/pdf", "text/plain", "text/csv", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!allowedTypes.includes(file.type) && !file.name.endsWith(".txt") && !file.name.endsWith(".pdf")) {
      toast.error("Format non supporté. Utilisez PDF, TXT, CSV ou DOCX.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Fichier trop volumineux (max 20 Mo).");
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setUploadStatus("uploading");

    try {
      // Upload to storage
      const filePath = `${userId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create analysis record
      const { data: analysis, error: insertError } = await supabase
        .from("document_analyses")
        .insert({
          user_id: userId,
          document_name: file.name,
          file_path: filePath,
          status: "pending",
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setUploadStatus("analyzing");

      // Trigger AI analysis
      const { data: session } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-document`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.session?.access_token}`,
          },
          body: JSON.stringify({
            analysisId: analysis.id,
            filePath,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          toast.error("Limite de requêtes atteinte, réessayez dans quelques instants.");
        } else if (response.status === 402) {
          toast.error("Crédits IA insuffisants. Rechargez votre compte.");
        } else {
          throw new Error(errData.error || "Erreur d'analyse");
        }
        setUploadStatus("error");
        return;
      }

      setUploadStatus("done");
      toast.success("Document analysé avec succès !");
      onAnalysisComplete();

      // Reset after 3 seconds
      setTimeout(() => {
        setUploadStatus("idle");
        setFileName("");
        setUploading(false);
      }, 3000);
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      toast.error(err.message || "Erreur lors de l'upload");
      setTimeout(() => {
        setUploadStatus("idle");
        setFileName("");
        setUploading(false);
      }, 3000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => !uploading && fileInputRef.current?.click()}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
        isDragging
          ? "border-primary bg-primary/5"
          : uploadStatus === "done"
          ? "border-green-500/30 bg-green-500/5"
          : uploadStatus === "error"
          ? "border-destructive/30 bg-destructive/5"
          : "border-border hover:border-primary/40 hover:bg-muted/50"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.csv,.docx"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />

      {uploadStatus === "idle" && (
        <>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className="text-primary" />
          </div>
          <p className="font-semibold text-foreground">Déposez un document ici</p>
          <p className="text-sm text-muted-foreground mt-1">
            ou cliquez pour sélectionner un fichier
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            PDF, TXT, CSV, DOCX • Max 20 Mo
          </p>
        </>
      )}

      {uploadStatus === "uploading" && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-primary animate-spin" />
          <div>
            <p className="font-semibold text-foreground">Upload en cours...</p>
            <p className="text-sm text-muted-foreground mt-1">{fileName}</p>
          </div>
        </div>
      )}

      {uploadStatus === "analyzing" && (
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <FileText size={28} className="text-primary" />
            <Loader2 size={14} className="text-primary animate-spin absolute -bottom-1 -right-1" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Analyse IA en cours...</p>
            <p className="text-sm text-muted-foreground mt-1">Notre IA lit et analyse votre document</p>
          </div>
        </div>
      )}

      {uploadStatus === "done" && (
        <div className="flex flex-col items-center gap-3">
          <CheckCircle size={28} className="text-green-500" />
          <div>
            <p className="font-semibold text-foreground">Analyse terminée !</p>
            <p className="text-sm text-muted-foreground mt-1">{fileName}</p>
          </div>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="flex flex-col items-center gap-3">
          <AlertCircle size={28} className="text-destructive" />
          <div>
            <p className="font-semibold text-foreground">Erreur d'analyse</p>
            <p className="text-sm text-muted-foreground mt-1">Veuillez réessayer</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
