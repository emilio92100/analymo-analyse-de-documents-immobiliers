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
  Building2,
  Crown,
  Sparkles,
  Mail,
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
      accent: "border-blue-200 bg-blue-50/60",
      cta: "Analyser un document",
    },
    {
      id: "full",
      name: "Analyse Complète",
      price: "19,90",
      icon: ShieldCheck,
      perfectFor: "Prendre une décision avant de faire une offre",
      items: [
        "Analyse globale multi-documents d'un bien",
        "Score global, risques, travaux, charges, diagnostics",
        "Conclusion claire + rapport PDF",
      ],
      recommended: true,
      badge: "Le plus populaire",
      badgeColor: "bg-emerald-500 text-white",
      accent: "border-emerald-300 bg-emerald-50/60",
      cta: "Analyser un bien",
    },
    {
      id: "pack2",
      name: "Pack 2 Biens",
      price: "29,90",
      icon: Building2,
      perfectFor: "Hésiter entre deux biens et choisir le meilleur",
      items: [
        "Analyse complète de 2 biens",
        "Comparaison côte à côte",
        "Économisez 10€ vs 2 analyses séparées",
      ],
      badge: "Économique",
      badgeColor: "bg-amber-500 text-white",
      accent: "border-amber-300 bg-amber-50/60",
      cta: "Comparer 2 biens",
    },
    {
      id: "pack3",
      name: "Pack 3 Biens",
      price: "39,90",
      icon: Users,
      perfectFor: "Comparer plusieurs biens avant de choisir le bon",
      items: [
        "Analyse complète de 3 biens différents",
        "Outil de comparaison avancé",
        "Économisez 20€ vs 3 analyses séparées",
      ],
      accent: "border-violet-200 bg-violet-50/60",
      cta: "Comparer 3 biens",
    },
  ];

  const handlePurchase = (offer: any) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/app/new-analysis");
  };

  const content = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center max-w-2xl mx-auto mb-14"
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            className={cn(
              "relative bg-background rounded-2xl border p-6 flex flex-col transition-shadow",
              offer.recommended
                ? "border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/20"
                : "border-border hover:shadow-md"
            )}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            {offer.badge && (
              <div className={cn(
                "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap",
                offer.badgeColor || "bg-primary text-primary-foreground"
              )}>
                {offer.badge}
              </div>
            )}

            <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-3 mx-auto">
              <offer.icon size={20} className="text-primary" />
            </div>

            <h3 className="text-base font-bold text-foreground text-center">{offer.name}</h3>

            <div className="mt-2 mb-4 text-center">
              <span className="text-4xl font-extrabold text-foreground">{offer.price}</span>
              <span className="text-muted-foreground font-medium text-base ml-0.5">€</span>
            </div>

            {/* Idéal pour — bordered box */}
            <div className={cn("p-3 rounded-xl border mb-4", offer.accent)}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                ✦ Idéal pour
              </p>
              <p className="text-sm font-medium text-foreground leading-snug">
                {offer.perfectFor}
              </p>
            </div>

            <ul className="space-y-2.5 mb-5 flex-1">
              {offer.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(offer)}
              className={cn(
                "w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.01]",
                offer.recommended
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/15"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              {offer.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pro Offer — enriched */}
      <motion.div
        className="relative overflow-hidden rounded-2xl mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,90%,12%)] via-[hsl(200,80%,16%)] to-[hsl(220,70%,20%)]" />
        <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-amber-400/8 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative p-7 md:p-10">
          {/* Top row: badge + title + CTA */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-11 h-11 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0">
                <Crown size={20} className="text-amber-300" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white leading-tight">
                  Offre <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Professionnelle</span>
                </h3>
                <p className="text-white/50 text-sm mt-0.5">
                  Volumes illimités · Tarif dégressif · Sur devis
                </p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = "mailto:contact@analymo.fr"}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-foreground font-bold text-sm hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
            >
              <Mail size={15} />
              Demander un devis
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Who is it for */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: "Notaires", icon: ShieldCheck },
              { label: "Agents immobiliers", icon: Users },
              { label: "Syndics de copropriété", icon: Building2 },
              { label: "Marchands de biens", icon: Zap },
              { label: "Promoteurs", icon: Building2 },
              { label: "Gestionnaires de patrimoine", icon: Crown },
            ].map((role, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 text-white/80 text-xs font-medium border border-white/5"
              >
                <role.icon size={11} className="text-amber-300/70" />
                {role.label}
              </span>
            ))}
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Users, label: "Multi-utilisateurs", desc: "Gérez toute votre équipe" },
              { icon: Zap, label: "API dédiée", desc: "Intégration dans vos outils" },
              { icon: FileText, label: "Rapports sur-mesure", desc: "À votre image de marque" },
              { icon: ShieldCheck, label: "Support prioritaire", desc: "Interlocuteur dédié" },
              { icon: History, label: "Analyses illimitées", desc: "Sans plafond mensuel" },
              { icon: Star, label: "Formation incluse", desc: "Onboarding personnalisé" },
              { icon: CreditCard, label: "Facturation flexible", desc: "Mensuel ou à l'usage" },
              { icon: Building2, label: "White-label", desc: "Votre marque, notre techno" },
            ].map((feat, i) => (
              <motion.div
                key={i}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/8 transition-colors"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <feat.icon size={14} className="text-amber-300/80 mb-1.5" />
                <p className="text-white text-xs font-bold leading-tight">{feat.label}</p>
                <p className="text-white/40 text-[10px] mt-0.5">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why Analymo — visual cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {[
          {
            title: "Audit de pointe",
            desc: "Notre IA est entraînée sur des milliers de documents juridiques immobiliers français.",
            icon: Zap,
            gradient: "from-blue-500/10 to-blue-600/5",
            iconBg: "bg-blue-100 text-blue-600",
            accent: "bg-blue-500",
          },
          {
            title: "Résultat en 30 secondes",
            desc: "Évitez des heures de lecture fastidieuse. Obtenez une synthèse claire et actionnable.",
            icon: History,
            gradient: "from-emerald-500/10 to-emerald-600/5",
            iconBg: "bg-emerald-100 text-emerald-600",
            accent: "bg-emerald-500",
          },
          {
            title: "Sécurité maximale",
            desc: "Détectez vices cachés, charges imprévues et travaux à venir avant de signer.",
            icon: ShieldCheck,
            gradient: "from-violet-500/10 to-violet-600/5",
            iconBg: "bg-violet-100 text-violet-600",
            accent: "bg-violet-500",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={cn(
              "relative p-7 rounded-2xl bg-gradient-to-b border border-border overflow-hidden group hover:shadow-lg transition-shadow",
              item.gradient
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={cn("absolute top-0 left-0 w-full h-0.5", item.accent)} />
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4", item.iconBg)}>
              <item.icon size={20} />
            </div>
            <h4 className="font-bold text-foreground text-lg mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial — prominent */}
      <motion.div
        className="relative overflow-hidden rounded-2xl mb-14"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-amber-500/5" />
        <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          {/* Big quote */}
          <div className="flex-1">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-5">
              "Analymo m'a permis de détecter un ravalement de façade non voté mais imminent.
              J'ai pu négocier <span className="text-primary">15 000€ de baisse</span> sur le prix."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                MD
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Marc D.</p>
                <p className="text-xs text-muted-foreground">Investisseur immobilier · Paris</p>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="flex md:flex-col gap-6 shrink-0">
            {[
              { value: "15\u00a0000€", label: "Économisés" },
              { value: "30\u00a0sec", label: "D'analyse" },
              { value: "4.9/5", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xl md:text-2xl font-black text-primary whitespace-nowrap">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mb-14">
        <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div className="space-y-4">
          {[
            { q: "Quels types de documents puis-je analyser ?", a: "Vous pouvez analyser des PV d'AG, des règlements de copropriété, des diagnostics techniques (DPE, Amiante, etc.) et des carnets d'entretien." },
            { q: "Mes documents sont-ils en sécurité ?", a: "Absolument. Vos documents sont cryptés et jamais partagés. Ils sont supprimés après analyse." },
            { q: "Comment fonctionne le système de crédits ?", a: "1 crédit correspond à l'analyse complète d'un document. Les crédits n'ont pas de date d'expiration." },
            { q: "Puis-je obtenir une facture ?", a: "Oui, une facture est générée automatiquement et accessible dans votre espace client." },
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-background">
              <h4 className="font-bold text-foreground">{faq.q}</h4>
              <p className="text-sm text-muted-foreground mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment footer */}
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <span>Paiement 100% sécurisé</span>
        {["VISA", "MASTERCARD", "STRIPE", "SSL"].map((label) => (
          <span key={label} className="px-3 py-1 rounded-lg bg-muted text-xs font-bold">
            {label}
          </span>
        ))}
      </div>
    </div>
  );

  if (inApp) return content;

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />
      <div className="pt-16">{content}</div>
    </div>
  );
};

export default PricingPage;
