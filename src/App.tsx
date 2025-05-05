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
import ServicePage from "./pages/ServicePage";

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
    // Default theme values matching the image
    const defaultSettings = {
      styling: {
        h1Color: "#000000",
        h2Color: "#000000",
        h3Color: "#000000",
        bodyTextColor: "#000000",
        backgroundColor: "#f6f6f7",
        primaryColor: "#00a0c6",
        linkColor: "#00a0c6",
        buttonColor: "#00a0c6",
        buttonTextColor: "#000000",
        formTextColor: "#000000",
        headerBgColor: "#182B3B",
        headerTextColor: "#ffffff", 
        headerNavTextColor: "#ffffff",
        footerBgColor: "#f1f5f9"
      }
    };
    
    const savedSettings = localStorage.getItem('site_settings');
    const settings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;
      
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
      document.documentElement.style.setProperty('--button-text-color', styling.buttonTextColor || '#000000');
      document.documentElement.style.setProperty('--form-text-color', styling.formTextColor || '#000000');
      document.documentElement.style.setProperty('--header-bg-color', styling.headerBgColor || '#182B3B');
      document.documentElement.style.setProperty('--header-text-color', styling.headerTextColor || '#ffffff');
      document.documentElement.style.setProperty('--header-nav-text-color', styling.headerNavTextColor || '#ffffff');
      document.documentElement.style.setProperty('--footer-bg-color', styling.footerBgColor || '#f1f5f9');
    } else {
      // If no styling found in localStorage, apply defaults
      applyDefaultThemeSettings();
    }
  } catch (error) {
    console.error("Error applying theme settings:", error);
    // Apply defaults if there's an error
    applyDefaultThemeSettings();
  }
};

// Function to apply default theme settings
const applyDefaultThemeSettings = () => {
  document.documentElement.style.setProperty('--h1-color', '#000000');
  document.documentElement.style.setProperty('--h2-color', '#000000');
  document.documentElement.style.setProperty('--h3-color', '#000000');
  document.documentElement.style.setProperty('--body-text-color', '#000000');
  document.documentElement.style.setProperty('--background-color', '#f6f6f7');
  document.documentElement.style.setProperty('--primary-color', '#00a0c6');
  document.documentElement.style.setProperty('--link-color', '#00a0c6');
  document.documentElement.style.setProperty('--button-color', '#00a0c6');
  document.documentElement.style.setProperty('--button-text-color', '#000000');
  document.documentElement.style.setProperty('--form-text-color', '#000000');
  document.documentElement.style.setProperty('--header-bg-color', '#182B3B');
  document.documentElement.style.setProperty('--header-text-color', '#ffffff');
  document.documentElement.style.setProperty('--header-nav-text-color', '#ffffff');
  document.documentElement.style.setProperty('--footer-bg-color', '#f1f5f9');
};

const App = () => {
  // Apply theme settings when the app loads
  useEffect(() => {
    applyThemeSettings();
  }, []);

  // Create a layout component to avoid repetition
  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );

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
                  <Layout>
                    <Index />
                  </Layout>
                } />
                <Route path="/services" element={
                  <Layout>
                    <Services />
                  </Layout>
                } />
                <Route path="/printers" element={
                  <Layout>
                    <Printers />
                  </Layout>
                } />
                <Route path="/contact" element={
                  <Layout>
                    <Contact />
                  </Layout>
                } />
                <Route path="/blog" element={
                  <Layout>
                    <Blog />
                  </Layout>
                } />
                <Route path="/blog/:id" element={
                  <Layout>
                    <BlogPost />
                  </Layout>
                } />
                {/* Dynamic Service Pages */}
                <Route path="/services/:slug" element={
                  <Layout>
                    <ServicePage />
                  </Layout>
                } />
                <Route path="*" element={
                  <Layout>
                    <NotFound />
                  </Layout>
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
