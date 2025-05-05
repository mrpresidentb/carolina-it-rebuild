
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Layout, Settings, FileText, Eye, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md fixed h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Layout size={20} />
              <span>Admin Panel</span>
            </h2>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Dashboard' ? 'bg-gray-100' : ''}`}
                  onClick={() => navigate('/admin/dashboard')}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Services' ? 'bg-gray-100' : ''}`}
                  onClick={() => navigate('/admin/services')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Services
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Blog' ? 'bg-gray-100' : ''}`}
                  onClick={() => navigate('/admin/blog')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Blog
                </Button>
              </li>
              <li className="pt-4 border-t mt-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/')}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Site
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 w-full p-8">
          <header className="mb-8 pb-4 border-b">
            <h1 className="text-2xl font-bold">{title}</h1>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
