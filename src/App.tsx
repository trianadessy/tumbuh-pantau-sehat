import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import RoleSelection from "./pages/Auth/RoleSelection";
import ChildrenList from "./pages/Children/ChildrenList";
import VisitForm from "./pages/Children/VisitForm";
import AtRiskList from "./pages/AtRisk/AtRiskList";
import MaternalForm from "./pages/Maternal/MaternalForm";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/masuk" element={<Login />} />
          <Route path="/peran" element={<RoleSelection />} />
          
          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/anak" element={<ChildrenList />} />
          <Route path="/anak/kunjungan-baru" element={<VisitForm />} />
          <Route path="/risiko" element={<AtRiskList />} />
          <Route path="/maternal" element={<MaternalForm />} />
          <Route path="/pengaturan" element={<Settings />} />
          <Route path="/ekspor" element={<div>Export Screen - Coming Soon</div>} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
