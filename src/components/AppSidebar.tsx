import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  CreditCard,
  User as UserIcon,
  LifeBuoy,
  LogOut,
  Menu,
  X,
  ArrowLeftRight,
  ShieldCheck,
} from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  user: any;
  onLogout: () => void;
}

const AppSidebar = ({ user, onLogout }: AppSidebarProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard" },
    { name: "Nouvelle analyse", icon: PlusCircle, path: "/app/new-analysis" },
    { name: "Mes analyses", icon: History, path: "/app/history" },
    { name: "Comparer", icon: ArrowLeftRight, path: "/app/comparison" },
    { name: "Tarifs", icon: CreditCard, path: "/app/pricing" },
    { name: "Compte", icon: UserIcon, path: "/app/account" },
    { name: "Support", icon: LifeBuoy, path: "/app/support" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-background border-r border-border min-h-screen p-6 gap-6">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="bg-primary-light rounded-2xl p-4 text-center">
            <p className="text-xs font-medium text-muted-foreground">Analyses restantes</p>
            <p className="text-2xl font-bold text-primary">{user?.credits ?? "∞"}</p>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email?.split("@")[0] || "Utilisateur"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "user@analymo.fr"}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background pt-16 px-4 overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium text-base",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={() => { onLogout(); setMobileMenuOpen(false); }}
              className="flex items-center gap-4 px-6 py-4 w-full text-destructive font-medium"
            >
              <LogOut size={20} />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppSidebar;
