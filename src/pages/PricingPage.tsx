import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Zap,
  History,
  ArrowRight,
  CheckCircle2,
  Star,
  CreditCard,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

interface PricingPageProps {
  user: any;
  onLogout?: () => void;
  inApp?: boolean;
}

const PricingPage = ({ user, onLogout, inApp = false }: PricingPageProps) => {
  const navigate = useNavigate();

  const offers = [
    {
      id: "single",
      name: "Analyse Document",
      price: "4,99",
      icon: FileText,
      perfectFor: "Comprendre rapidement un document précis et lever un doute",
      items: [
        "Analyse détaillée d'un seul document",
        "PV d'AG, règlement, appel de charges ou diagnostic",
      ],
      color: "blue",
      cta: "Acheter / Analyser un document",
    },
    {
      id: "full",
      name: "Analyse Complète d'un Bien",
      price: "19,90",
      icon: ShieldCheck,
      perfectFor: "Prendre une décision avant de faire une offre",
      items: [
        "Analyse globale multi-documents d'un bien",
        "Score global, risques, travaux, charges, diagnostics",
        "Conclusion claire + PDF",
      ],
      recommended: true,
      color: "emerald",
      badge: "L'offre la plus choisie",
      cta: "Analyser un bien",
    },
    {
      id: "pack3",
      name: "Pack 3 biens + Comparaison",
      price: "39,90",
      icon: Users,
      perfectFor: "Comparer plusieurs biens avant de choisir",
      items: [
        "Analyse complète de 3 biens différents",
        "Outil de comparaison pour choisir le meilleur",
      ],
      color: "violet",
      cta: "Comparer 3 biens",
    },
  ];

  const handlePurchase = (offer: any) => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Mock purchase - navigate to analysis
    navigate("/app/new-analysis");
  };

  const content = (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
          <CreditCard size={14} />
          Tarification transparente
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Investissez en toute sérénité
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Des tarifs simples pour sécuriser votre futur chez-vous.
        </p>
      </motion.div>

      {/* Offers Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            className={cn(
              "relative bg-background rounded-3xl border-2 p-8 card-hover",
              offer.recommended ? "border-primary shadow-xl shadow-primary/10" : "border-border"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {offer.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold whitespace-nowrap">
                {offer.badge}
              </div>
            )}

            <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
              <offer.icon size={24} className="text-primary" />
            </div>

            <h3 className="text-lg font-bold text-foreground">{offer.name}</h3>

            <div className="mt-3 mb-4">
              <span className="text-3xl font-extrabold text-foreground">{offer.price}</span>
              <span className="text-foreground font-medium">€</span>
            </div>

            {offer.perfectFor && (
              <div className="p-3 rounded-xl bg-muted mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Idéal pour</p>
                <p className="text-sm text-foreground">{offer.perfectFor}</p>
              </div>
            )}

            <ul className="space-y-3 mb-6">
              {offer.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(offer)}
              className={cn(
                "w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02]",
                offer.recommended
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              {offer.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pro Offer */}
      <motion.div
        className="bg-foreground rounded-3xl p-8 md:p-12 text-primary-foreground text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold mb-2">Offre Professionnelle</h3>
        <p className="text-3xl font-extrabold mb-4">Sur demande</p>
        <p className="text-primary-foreground/70 mb-6">
          Notaires, Agents, Syndics, Marchands de biens
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {["Accès multi-utilisateurs", "API dédiée", "Rapports personnalisés", "Support premium"].map(
            (item, i) => (
              <span key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={14} className="text-emerald-300" />
                {item}
              </span>
            )
          )}
        </div>
        <button
          onClick={() => window.location.href = "mailto:contact@analymo.fr"}
          className="px-8 py-3.5 rounded-2xl bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 transition-all"
        >
          Nous contacter
        </button>
      </motion.div>

      {/* Why Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[
          { title: "Audit de pointe", desc: "Notre algorithme est entraîné sur des milliers de documents juridiques immobiliers.", icon: Zap },
          { title: "Gain de temps précieux", desc: "Évitez des heures de lecture fastidieuse. Obtenez une synthèse en 30 secondes.", icon: History },
          { title: "Sécurité maximale", desc: "Détectez les vices cachés et les charges imprévues avant de signer.", icon: ShieldCheck },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl border border-border text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <item.icon size={24} className="text-primary mx-auto mb-3" />
            <h4 className="font-bold text-foreground">{item.title}</h4>
            <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial */}
      <motion.div
        className="mt-12 p-8 rounded-3xl bg-primary-light text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Star size={24} className="text-amber-500 mx-auto mb-4" />
        <p className="text-lg text-foreground italic max-w-2xl mx-auto">
          "Analymo m'a permis de détecter un ravalement de façade non voté mais imminent
          sur un appartement. J'ai pu négocier 15 000€ de baisse sur le prix."
        </p>
        <p className="mt-4 font-bold text-foreground">Marc D.</p>
        <p className="text-sm text-muted-foreground">Investisseur immobilier</p>
      </motion.div>

      {/* FAQ */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div className="space-y-4">
          {[
            {
              q: "Quels types de documents puis-je analyser ?",
              a: "Vous pouvez analyser des PV d'AG, des règlements de copropriété, des diagnostics techniques (DPE, Amiante, etc.) et des carnets d'entretien.",
            },
            {
              q: "Mes documents sont-ils en sécurité ?",
              a: "Absolument. Vos documents sont cryptés et jamais partagés. Ils sont supprimés après analyse.",
            },
            {
              q: "Comment fonctionne le système de crédits ?",
              a: "1 crédit correspond à l'analyse complète d'un document. Les crédits n'ont pas de date d'expiration.",
            },
            {
              q: "Puis-je obtenir une facture ?",
              a: "Oui, une facture est générée automatiquement et accessible dans votre espace client.",
            },
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-background">
              <h4 className="font-bold text-foreground">{faq.q}</h4>
              <p className="text-sm text-muted-foreground mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment footer */}
      <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
        <span>Paiement 100% sécurisé</span>
        {["VISA", "MASTERCARD", "STRIPE", "SSL"].map((label) => (
          <span key={label} className="px-3 py-1 rounded-lg bg-muted text-xs font-bold">
            {label}
          </span>
        ))}
      </div>
    </div>
  );

  if (inApp) {
    return content;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />
      <div className="pt-16">{content}</div>
    </div>
  );
};

export default PricingPage;
