import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
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
import ConfirmEmailPage from "@/pages/ConfirmEmailPage";
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

const ProtectedRoute = ({ user, loading, onLogout, children }: { user: any; loading: boolean; onLogout: () => void; children: React.ReactNode }) => {
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!user) return <Navigate to="/login" />;
  return <AppLayout user={user} onLogout={onLogout}>{children}</AppLayout>;
};

const AppRoutes = () => {
  const { user, loading, signOut } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} onLogout={signOut} />} />
      <Route path="/pricing" element={<PricingPage user={user} onLogout={signOut} />} />
      <Route path="/example" element={<ExamplePage user={user} onLogout={signOut} />} />
      <Route path="/contact" element={<ContactPage user={user} onLogout={signOut} />} />
      <Route path="/login" element={user ? <Navigate to="/app/dashboard" /> : <AuthPage type="login" />} />
      <Route path="/signup" element={user ? <Navigate to="/app/dashboard" /> : <AuthPage type="signup" />} />

      {/* Protected app routes */}
      <Route path="/app/dashboard" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><DashboardPage user={user} /></ProtectedRoute>} />
      <Route path="/app/new-analysis" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><NewAnalysisPage user={user} /></ProtectedRoute>} />
      <Route path="/app/history" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><HistoryPage user={user} /></ProtectedRoute>} />
      <Route path="/app/report/:id" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><ReportPage /></ProtectedRoute>} />
      <Route path="/app/comparison" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><ComparisonPage user={user} /></ProtectedRoute>} />
      <Route path="/app/pricing" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><PricingPage user={user} inApp /></ProtectedRoute>} />
      <Route path="/app/account" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><AccountPage user={user} /></ProtectedRoute>} />
      <Route path="/app/support" element={<ProtectedRoute user={user} loading={loading} onLogout={signOut}><SupportPage /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
