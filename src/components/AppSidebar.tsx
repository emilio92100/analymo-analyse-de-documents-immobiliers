import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
    { name: "Comparer mes biens", icon: ArrowLeftRight, path: "/app/comparison" },
    { name: "Tarifs", icon: CreditCard, path: "/app/pricing" },
    { name: "Compte", icon: UserIcon, path: "/app/account" },
    { name: "Support", icon: LifeBuoy, path: "/app/support" },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 pb-2">
        <Link to="/">
          <Logo light showSubtitle />
        </Link>
      </div>

      {/* Credits box */}
      <div className="mx-4 mt-4 mb-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-sidebar-muted">
            Analyses restantes
          </p>
          <p className="text-4xl font-black text-sidebar-foreground mt-1">
            {user?.credits ?? 0}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/30"
                  : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center text-sm font-bold uppercase">
            {user?.email?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.email?.split("@")[0] || "Utilisateur"}
            </p>
            <p className="text-xs text-sidebar-muted truncate">
              {user?.email || "user@analymo.fr"}
            </p>
          </div>
        </div>
        <button
          onClick={() => { onLogout(); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-sidebar-muted hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wider text-xs"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-sidebar min-h-screen">
        <SidebarContent />
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
        <div className="lg:hidden fixed inset-0 z-40 bg-sidebar pt-16 flex flex-col">
          <SidebarContent />
        </div>
      )}
    </>
  );
};

export default AppSidebar;
