
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
import { useAuth } from '@/hooks/useAuth';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

const App = () => {
  const { isLoggedIn } = useAuth();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn()) {
      return <Navigate to="/admin/login" />;
    }

    return <>{children}</>;
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:serviceId" element={<ServicePage />} />
        <Route path="/printers" element={<Printers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="*" element={<NotFound />} />
        
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
    </BrowserRouter>
  );
};

export default App;
