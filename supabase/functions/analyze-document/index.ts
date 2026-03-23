import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Non autorisé");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user
    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!);
    const { data: { user }, error: authError } = await anonClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) throw new Error("Non autorisé");

    const { analysisId, filePath } = await req.json();
    if (!analysisId || !filePath) throw new Error("Paramètres manquants");

    // Update status to processing
    await supabase.from("document_analyses").update({ status: "processing" }).eq("id", analysisId);

    // Download the file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from("documents")
      .download(filePath);

    if (downloadError || !fileData) {
      await supabase.from("document_analyses").update({ status: "error", summary: "Impossible de télécharger le fichier." }).eq("id", analysisId);
      throw new Error("Erreur de téléchargement du fichier");
    }

    // Extract text from the file
    let textContent = "";
    const fileName = filePath.split("/").pop() || "";
    const ext = fileName.split(".").pop()?.toLowerCase();

    if (ext === "pdf") {
      // For PDF, convert to base64 for AI vision
      const arrayBuffer = await fileData.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      textContent = `[Document PDF encodé en base64 - ${fileName}]`;
      
      // Use AI with the document
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY non configurée");

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `Tu es un expert en analyse de documents immobiliers. Tu analyses les documents (PV d'AG, diagnostics, baux, etc.) et tu produis un résumé structuré en français.

Tu dois retourner un JSON avec cette structure exacte :
{
  "summary": "Résumé concis du document en 2-3 phrases",
  "keyPoints": ["Point clé 1", "Point clé 2", "Point clé 3", ...],
  "score": 7.5,
  "analysis": {
    "type": "Type de document (PV AG, Diagnostic, Bail, etc.)",
    "pros": ["Point positif 1", "Point positif 2"],
    "warnings": ["Point de vigilance 1", "Point de vigilance 2"],
    "recommendations": ["Recommandation 1", "Recommandation 2"],
    "financialSummary": "Résumé financier si applicable",
    "legalNotes": "Notes juridiques si applicable"
  }
}

Le score est sur 10 et reflète la qualité/sécurité globale du document pour un acheteur immobilier.`
            },
            {
              role: "user",
              content: [
                { type: "text", text: `Analyse ce document immobilier : ${fileName}` },
                {
                  type: "image_url",
                  image_url: { url: `data:application/pdf;base64,${base64}` }
                }
              ]
            }
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "document_analysis",
                description: "Structured analysis of a real estate document",
                parameters: {
                  type: "object",
                  properties: {
                    summary: { type: "string", description: "Résumé concis en 2-3 phrases" },
                    keyPoints: { type: "array", items: { type: "string" }, description: "Points clés du document" },
                    score: { type: "number", description: "Score sur 10" },
                    analysis: {
                      type: "object",
                      properties: {
                        type: { type: "string" },
                        pros: { type: "array", items: { type: "string" } },
                        warnings: { type: "array", items: { type: "string" } },
                        recommendations: { type: "array", items: { type: "string" } },
                        financialSummary: { type: "string" },
                        legalNotes: { type: "string" }
                      },
                      required: ["type", "pros", "warnings", "recommendations"]
                    }
                  },
                  required: ["summary", "keyPoints", "score", "analysis"],
                  additionalProperties: false
                }
              }
            }
          ],
          tool_choice: { type: "function", function: { name: "document_analysis" } }
        }),
      });

      if (!aiResponse.ok) {
        const status = aiResponse.status;
        if (status === 429) {
          await supabase.from("document_analyses").update({ status: "error", summary: "Limite de requêtes atteinte, réessayez plus tard." }).eq("id", analysisId);
          return new Response(JSON.stringify({ error: "Rate limit" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        if (status === 402) {
          await supabase.from("document_analyses").update({ status: "error", summary: "Crédits IA insuffisants." }).eq("id", analysisId);
          return new Response(JSON.stringify({ error: "Crédits insuffisants" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        throw new Error(`Erreur IA: ${status}`);
      }

      const aiData = await aiResponse.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      
      let result;
      if (toolCall) {
        result = JSON.parse(toolCall.function.arguments);
      } else {
        // Fallback: try to parse from content
        const content = aiData.choices?.[0]?.message?.content || "";
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
        } catch {
          result = null;
        }
      }

      if (result) {
        await supabase.from("document_analyses").update({
          status: "completed",
          summary: result.summary,
          key_points: result.keyPoints,
          score: result.score,
          full_analysis: result.analysis,
        }).eq("id", analysisId);
      } else {
        await supabase.from("document_analyses").update({
          status: "error",
          summary: "Impossible d'analyser le document. Format non reconnu.",
        }).eq("id", analysisId);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // For text-based files
    textContent = await fileData.text();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY non configurée");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Tu es un expert en analyse de documents immobiliers. Tu analyses les documents (PV d'AG, diagnostics, baux, etc.) et tu produis un résumé structuré en français.`
          },
          {
            role: "user",
            content: `Analyse ce document immobilier nommé "${fileName}" :\n\n${textContent.slice(0, 30000)}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "document_analysis",
              description: "Structured analysis of a real estate document",
              parameters: {
                type: "object",
                properties: {
                  summary: { type: "string", description: "Résumé concis en 2-3 phrases" },
                  keyPoints: { type: "array", items: { type: "string" }, description: "Points clés" },
                  score: { type: "number", description: "Score sur 10" },
                  analysis: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      pros: { type: "array", items: { type: "string" } },
                      warnings: { type: "array", items: { type: "string" } },
                      recommendations: { type: "array", items: { type: "string" } },
                      financialSummary: { type: "string" },
                      legalNotes: { type: "string" }
                    },
                    required: ["type", "pros", "warnings", "recommendations"]
                  }
                },
                required: ["summary", "keyPoints", "score", "analysis"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "document_analysis" } }
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      await supabase.from("document_analyses").update({ status: "error", summary: `Erreur IA (${status})` }).eq("id", analysisId);
      return new Response(JSON.stringify({ error: `AI error ${status}` }), {
        status: status === 429 || status === 402 ? status : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    let result;
    if (toolCall) {
      result = JSON.parse(toolCall.function.arguments);
    } else {
      const content = aiData.choices?.[0]?.message?.content || "";
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch {
        result = null;
      }
    }

    if (result) {
      await supabase.from("document_analyses").update({
        status: "completed",
        summary: result.summary,
        key_points: result.keyPoints,
        score: result.score,
        full_analysis: result.analysis,
      }).eq("id", analysisId);
    } else {
      await supabase.from("document_analyses").update({
        status: "error",
        summary: "Impossible d'analyser le document.",
      }).eq("id", analysisId);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("analyze-document error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
