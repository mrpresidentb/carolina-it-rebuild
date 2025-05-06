
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import SiteHead from "@/components/SiteHead";
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
import AdminMessages from "./pages/admin/AdminMessages";

const queryClient = new QueryClient();

const App = () => {
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
              {/* SiteHead handles SEO and theme settings */}
              <SiteHead />
              
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                
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
