
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Printers from "./pages/Printers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminBlog from "./pages/admin/AdminBlog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            
            {/* Public Routes */}
            <Route path="/" element={
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">
                  <Index />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/services" element={
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">
                  <Services />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/printers" element={
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">
                  <Printers />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">
                  <Contact />
                </div>
                <Footer />
              </div>
            } />
            <Route path="*" element={
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">
                  <NotFound />
                </div>
                <Footer />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
