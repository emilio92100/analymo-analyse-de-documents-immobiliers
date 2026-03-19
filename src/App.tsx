import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppSidebar from "@/components/AppSidebar";
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import NewAnalysisPage from "@/pages/NewAnalysisPage";
import HistoryPage from "@/pages/HistoryPage";
import ReportPage from "@/pages/ReportPage";
import PricingPage from "@/pages/PricingPage";
import AccountPage from "@/pages/AccountPage";
import SupportPage from "@/pages/SupportPage";
import ComparisonPage from "@/pages/ComparisonPage";
import ExamplePage from "@/pages/ExamplePage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ user, onLogout, children }: { user: any; onLogout: () => void; children: React.ReactNode }) => (
  <div className="flex min-h-screen bg-bg-light">
    <AppSidebar user={user} onLogout={onLogout} />
    <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
      {children}
    </main>
  </div>
);

const App = () => {
  const [user, setUser] = useState<any>(null);

  const handleAuth = (userData: any) => setUser(userData);
  const handleLogout = () => setUser(null);

  // Guest user for demo
  const GUEST_USER = { id: "guest", email: "guest@analymo.fr", credits: 999, isGuest: true };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
            <Route path="/pricing" element={<PricingPage user={user} onLogout={handleLogout} />} />
            <Route path="/example" element={<ExamplePage user={user} onLogout={handleLogout} />} />
            <Route path="/login" element={user ? <Navigate to="/app/dashboard" /> : <AuthPage type="login" onAuth={handleAuth} />} />
            <Route path="/signup" element={user ? <Navigate to="/app/dashboard" /> : <AuthPage type="signup" onAuth={handleAuth} />} />

            {/* App routes with sidebar */}
            <Route path="/app/dashboard" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><DashboardPage user={user || GUEST_USER} /></AppLayout>} />
            <Route path="/app/new-analysis" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><NewAnalysisPage user={user || GUEST_USER} /></AppLayout>} />
            <Route path="/app/history" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><HistoryPage user={user || GUEST_USER} /></AppLayout>} />
            <Route path="/app/report/:id" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><ReportPage /></AppLayout>} />
            <Route path="/app/comparison" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><ComparisonPage user={user || GUEST_USER} /></AppLayout>} />
            <Route path="/app/pricing" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><PricingPage user={user || GUEST_USER} inApp /></AppLayout>} />
            <Route path="/app/account" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><AccountPage user={user || GUEST_USER} /></AppLayout>} />
            <Route path="/app/support" element={<AppLayout user={user || GUEST_USER} onLogout={handleLogout}><SupportPage /></AppLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
