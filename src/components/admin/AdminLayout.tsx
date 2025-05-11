
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Layout, Settings, FileText, Eye, LogOut, Layers, Image, Mail } from 'lucide-react';

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
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md fixed h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <Layout size={20} />
              <span>Admin Panel</span>
            </h2>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Dashboard' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => navigate('/admin')}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Services' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => navigate('/admin/services')}
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Services
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Blog' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => navigate('/admin/blog')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Blog
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Images' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => navigate('/admin/images')}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Images
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Messages' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => navigate('/admin/messages')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${title === 'Settings' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => navigate('/admin/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </li>
              <li className="pt-4 border-t mt-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700"
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
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
