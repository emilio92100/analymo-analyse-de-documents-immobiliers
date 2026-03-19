import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Lock,
  FileText,
  CheckCircle2,
  UserIcon,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

interface LandingPageProps {
  user: any;
  onLogout: () => void;
}

const LandingPage = ({ user, onLogout }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 11) % 70}%`,
              }}
              animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium mb-6">
                <ShieldCheck size={16} />
                Vérifiez les éléments importants avant de signer
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                Votre futur logement{" "}
                <span className="text-primary">analysé en 30 secondes</span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Diagnostics, PV d'AG, Règlement de Copropriété, Appels de fonds...
                Notre outil vous aide à comprendre rapidement les informations
                essentielles avant de signer.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to={user ? "/app/new-analysis" : "/signup"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Analyser mon premier document
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/example"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
                >
                  Voir un exemple
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock size={14} className="text-emerald-500" />
                  100% Sécurisé
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap size={14} className="text-amber-500" />
                  Audit Expert
                </div>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Floating Cards */}
                <motion.div
                  className="absolute -left-24 top-8 glass rounded-2xl p-4 w-48 z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <p className="text-xs font-medium text-muted-foreground">Score Global</p>
                  <p className="text-2xl font-bold text-emerald-500">9.4/10</p>
                  <p className="text-xs text-emerald-500">Excellente santé financière</p>
                </motion.div>

                <motion.div
                  className="absolute -right-20 top-40 glass rounded-2xl p-4 w-44 z-10"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <p className="text-xs font-medium text-muted-foreground">Risques Détectés</p>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Ravalement</span>
                      <span className="text-amber-500 font-medium">Voté</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Impayés</span>
                      <span className="text-emerald-500 font-medium">0 €</span>
                    </div>
                  </div>
                </motion.div>

                {/* Phone Frame */}
                <div className="w-[280px] h-[560px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl z-10" />

                    {/* Screen Content */}
                    <div className="pt-10 px-4 space-y-3">
                      <div className="flex justify-center">
                        <Logo className="scale-75" />
                      </div>

                      {/* Document preview */}
                      <div className="bg-muted rounded-xl p-3 relative overflow-hidden h-40">
                        <div className="space-y-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-2 bg-border rounded" style={{ width: `${70 + i * 5}%` }} />
                          ))}
                        </div>
                        {/* Scan Line */}
                        <div className="absolute left-0 right-0 h-0.5 bg-primary/60 animate-scan" />
                      </div>

                      {/* Analysis steps */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span className="text-muted-foreground">Analyse des PV d'AG...</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span className="text-muted-foreground">Vérification charges...</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          <span className="text-foreground font-medium">Détection risques...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Pourquoi choisir Analymo ?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              L'achat d'un bien immobilier est souvent l'investissement d'une vie.
              Ne laissez pas une lecture rapide compromettre votre avenir financier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                "Identification des travaux votés ou à prévoir",
                "Analyse de la santé financière de la copropriété",
                "Détection des procédures judiciaires en cours",
                "Vérification de la conformité des diagnostics",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-background border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CheckCircle2 size={20} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{text}</span>
                </motion.div>
              ))}

              <Link
                to={user ? "/app/new-analysis" : "/signup"}
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Commencer gratuitement
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-4">
              {[
                { icon: ShieldCheck, title: "Sécurité Maximale", desc: "Vos données sont cryptées et anonymisées.", color: "text-emerald-500", bg: "bg-emerald-50" },
                { icon: Zap, title: "Rapidité Inégalée", desc: "Analyse complète en moins de 30 secondes.", color: "text-amber-500", bg: "bg-amber-50" },
                { icon: Lock, title: "Précision Chirurgicale", desc: "Détection des clauses abusives et risques financiers.", color: "text-primary", bg: "bg-primary-light" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-2xl bg-background border border-border card-hover"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                    <item.icon size={20} className={item.color} />
                  </div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Who */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Pour qui est fait Analymo ?</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Une solution adaptée à chaque acteur de l'immobilier.
            </p>
          </motion.div>

          {/* Buyers highlight */}
          <motion.div
            className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Acheteurs Particuliers</h3>
            <p className="text-primary-foreground/80 max-w-2xl mb-6">
              Ne faites pas d'erreur coûteuse. Nous décryptons pour vous la santé financière
              de la copropriété et les travaux à venir. Sécurisez votre achat.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Comprendre les PV d'AG sans effort",
                "Anticiper les gros travaux",
                "Vérifier la santé financière",
                "Acheter l'esprit tranquille",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Professional targets */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Notaires", desc: "Accélérez la préparation de vos dossiers avec une synthèse claire.", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
              { title: "Agents Immobiliers", desc: "Valorisez votre devoir de conseil avec un rapport de transparence.", icon: UserIcon, color: "text-indigo-600", bg: "bg-indigo-50" },
              { title: "Syndics", desc: "Facilitez la transmission des informations lors des ventes.", icon: LayoutDashboard, color: "text-violet-600", bg: "bg-violet-50" },
              { title: "Marchands de biens", desc: "Identifiez instantanément le potentiel ou les risques.", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl border border-border card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Comment ça marche ?</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Trois étapes simples pour sécuriser votre investissement immobilier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Importez vos documents", desc: "Déposez vos PV d'AG, règlements de copropriété ou diagnostics techniques.", icon: FileText, color: "bg-blue-500" },
              { step: "02", title: "Audit par algorithme", desc: "Notre technologie scanne chaque ligne pour détecter les risques cachés.", icon: Zap, color: "bg-primary" },
              { step: "03", title: "Rapport détaillé", desc: "Recevez une synthèse claire avec un score de fiabilité.", icon: ShieldCheck, color: "bg-emerald-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.step}</span>
                <h3 className="text-xl font-bold mt-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Une sécurité sans compromis</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Nous utilisons les meilleures technologies pour protéger vos données.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Confidentiel", desc: "Vos documents sont analysés puis supprimés. Aucune donnée n'est revendue.", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
              { title: "Sécurisé", desc: "Chiffrement de bout en bout et infrastructure bancaire pour vos paiements.", icon: Lock, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
              { title: "Rapide", desc: "Obtenez votre rapport complet en moins d'une minute, 24h/24 et 7j/7.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`p-8 rounded-3xl border ${item.border} ${item.bg} text-center card-hover`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon size={32} className={`${item.color} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo light />
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <Link to="/legal/privacy" className="hover:text-primary-foreground transition-colors">Confidentialité</Link>
              <Link to="/legal/terms" className="hover:text-primary-foreground transition-colors">CGU</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-primary-foreground/40">
              © 2026 Analymo. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
