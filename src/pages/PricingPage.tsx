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
      colorClass: "from-blue-500/10 to-blue-600/5 border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
      idealBg: "bg-blue-50 border border-blue-200",
      idealText: "text-blue-700",
      idealLabel: "text-blue-500",
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
      colorClass: "from-emerald-500/10 to-emerald-600/5 border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-600",
      idealBg: "bg-emerald-50 border border-emerald-200",
      idealText: "text-emerald-700",
      idealLabel: "text-emerald-500",
      badge: "Le plus populaire",
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
      colorClass: "from-amber-500/10 to-amber-600/5 border-amber-200",
      iconBg: "bg-amber-100 text-amber-600",
      idealBg: "bg-amber-50 border border-amber-200",
      idealText: "text-amber-700",
      idealLabel: "text-amber-500",
      badge: "Économique",
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
      colorClass: "from-violet-500/10 to-violet-600/5 border-violet-200",
      iconBg: "bg-violet-100 text-violet-600",
      idealBg: "bg-violet-50 border border-violet-200",
      idealText: "text-violet-700",
      idealLabel: "text-violet-500",
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

      {/* Offers Grid — 4 columns */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            className={cn(
              "relative bg-gradient-to-b rounded-3xl border-2 p-6 flex flex-col",
              offer.colorClass,
              offer.recommended && "shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-400/30"
            )}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            {offer.badge && (
              <div className={cn(
                "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap",
                offer.recommended
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500 text-white"
              )}>
                {offer.badge}
              </div>
            )}

            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-3", offer.iconBg)}>
              <offer.icon size={20} />
            </div>

            <h3 className="text-base font-bold text-foreground">{offer.name}</h3>

            <div className="mt-2 mb-3">
              <span className="text-3xl font-extrabold text-foreground">{offer.price}</span>
              <span className="text-foreground font-medium text-sm">€</span>
            </div>

            {/* Colored "Idéal pour" */}
            <div className={cn("p-3 rounded-xl mb-4", offer.idealBg)}>
              <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-1", offer.idealLabel)}>
                ✦ Idéal pour
              </p>
              <p className={cn("text-sm font-medium leading-snug", offer.idealText)}>
                {offer.perfectFor}
              </p>
            </div>

            <ul className="space-y-2.5 mb-5 flex-1">
              {offer.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(offer)}
              className={cn(
                "w-full py-3 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02]",
                offer.recommended
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              {offer.cta}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Pro Offer — redesigned */}
      <motion.div
        className="relative overflow-hidden rounded-[2rem] mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,90%,12%)] via-[hsl(200,80%,18%)] to-[hsl(220,70%,22%)]" />
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 blur-sm" />
        <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-white/5 blur-sm" />
        <div className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-14">
          {/* Left */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Crown size={14} />
              Professionnel
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Offre
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Professionnelle
              </span>
            </h3>
            <p className="text-white/60 text-lg mb-8 max-w-md">
              Une solution sur mesure pour les acteurs de l'immobilier qui traitent un volume important de dossiers.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Notaires", "Agents immobiliers", "Syndics", "Marchands de biens"].map((role, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {role}
                </motion.span>
              ))}
            </div>
            <button
              onClick={() => window.location.href = "mailto:contact@analymo.fr"}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-foreground font-bold text-sm hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02]"
            >
              <Mail size={18} />
              Nous contacter
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right — features grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: "Multi-utilisateurs", desc: "Toute votre équipe sur un seul compte" },
              { icon: Zap, label: "API dédiée", desc: "Intégrez Analymo dans vos outils" },
              { icon: FileText, label: "Rapports sur-mesure", desc: "Personnalisez vos livrables clients" },
              { icon: ShieldCheck, label: "Support premium", desc: "Un interlocuteur dédié réactif" },
            ].map((feat, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center mb-3">
                  <feat.icon size={16} className="text-amber-300" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{feat.label}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
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
        className="p-8 rounded-3xl bg-primary-light text-center mb-14"
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
