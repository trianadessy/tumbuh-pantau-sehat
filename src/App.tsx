import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";

// Pages
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import RoleSelection from "./pages/Auth/RoleSelection";
import ChildrenList from "./pages/Children/ChildrenList";
import VisitForm from "./pages/Children/VisitForm";
import AtRiskList from "./pages/AtRisk/AtRiskList";
import CameraPage from "./pages/Camera/CameraPage";
import ReportsPage from "./pages/Reports/ReportsPage";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/masuk" element={<Login />} />
            <Route path="/peran" element={<RoleSelection />} />
            
            {/* Main App Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/tasks" element={<AtRiskList />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/profile" element={<Settings />} />
            
            {/* Legacy routes for compatibility */}
            <Route path="/anak" element={<ChildrenList />} />
            <Route path="/anak/kunjungan-baru" element={<VisitForm />} />
            <Route path="/risiko" element={<AtRiskList />} />
            <Route path="/pengaturan" element={<Settings />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
