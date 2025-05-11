
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Printers from './pages/Printers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminBlog from './pages/admin/AdminBlog';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';
import AdminImages from './pages/admin/AdminImages';
import AdminLogin from './pages/admin/AdminLogin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SiteHead from './components/SiteHead';
import { Toaster } from '@/components/ui/toaster';

// Layout component to wrap public pages with Navbar and Footer
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHead />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

const App = () => {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAdminAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/admin/login" />;
    }

    return <>{children}</>;
  };
  
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/service/:serviceId" element={<PublicLayout><ServicePage /></PublicLayout>} />
          <Route path="/printers" element={<PublicLayout><Printers /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:postId" element={<PublicLayout><BlogPost /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/terms-of-use" element={<PublicLayout><TermsOfUse /></PublicLayout>} />
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/services" element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          } />
          <Route path="/admin/blog" element={
            <ProtectedRoute>
              <AdminBlog />
            </ProtectedRoute>
          } />
          <Route path="/admin/messages" element={
            <ProtectedRoute>
              <AdminMessages />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          } />
          <Route path="/admin/images" element={
            <ProtectedRoute>
              <AdminImages />
            </ProtectedRoute>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AdminAuthProvider>
  );
};

export default App;
