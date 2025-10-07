import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PiNetworkProvider } from "@/hooks/usePiNetwork";
import Index from "./pages/Index";
import Claim from "./pages/Claim";
import Verifier from "./pages/Verifier";
import Admin from "./pages/Admin";
import Policy from "./pages/Policy";
import Contract from "./pages/Contract";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PiNetworkProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/claim" element={<Claim />} />
            <Route path="/verifier" element={<Verifier />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/contract" element={<Contract />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PiNetworkProvider>
  </QueryClientProvider>
);

export default App;
