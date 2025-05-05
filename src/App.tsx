
import React, { useEffect } from "react";
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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

// Function to apply theme settings from localStorage
const applyThemeSettings = () => {
  try {
    const savedSettings = localStorage.getItem('site_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      
      if (settings?.styling) {
        const styling = settings.styling;
        
        // Apply all styling variables to CSS root
        document.documentElement.style.setProperty('--h1-color', styling.h1Color || '#000000');
        document.documentElement.style.setProperty('--h2-color', styling.h2Color || '#000000');
        document.documentElement.style.setProperty('--h3-color', styling.h3Color || '#000000');
        document.documentElement.style.setProperty('--body-text-color', styling.bodyTextColor || '#000000');
        document.documentElement.style.setProperty('--background-color', styling.backgroundColor || '#f6f6f7');
        document.documentElement.style.setProperty('--primary-color', styling.primaryColor || '#00a0c6');
        document.documentElement.style.setProperty('--link-color', styling.linkColor || '#00a0c6');
        document.documentElement.style.setProperty('--button-color', styling.buttonColor || '#00a0c6');
        document.documentElement.style.setProperty('--button-text-color', styling.buttonTextColor || '#ffffff');
        document.documentElement.style.setProperty('--form-text-color', styling.formTextColor || '#000000');
        document.documentElement.style.setProperty('--header-bg-color', styling.headerBgColor || '#182B3B');
        document.documentElement.style.setProperty('--header-text-color', styling.headerTextColor || '#ffffff');
        document.documentElement.style.setProperty('--header-nav-text-color', styling.headerNavTextColor || '#ffffff');
        document.documentElement.style.setProperty('--footer-bg-color', styling.footerBgColor || '#f1f5f9');
      }
    }
  } catch (error) {
    console.error("Error applying theme settings:", error);
  }
};

const App = () => {
  // Apply theme settings when the app loads
  useEffect(() => {
    applyThemeSettings();
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                
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
                <Route path="/blog" element={
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <div className="flex-1">
                      <Blog />
                    </div>
                    <Footer />
                  </div>
                } />
                <Route path="/blog/:id" element={
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <div className="flex-1">
                      <BlogPost />
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
          </TooltipProvider>
        </AdminAuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
