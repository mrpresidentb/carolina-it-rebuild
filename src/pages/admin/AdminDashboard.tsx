
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { getContactSubmissions } from '@/utils/contactSubmissions';
import { getServices } from '@/utils/services';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [messagesCount, setMessagesCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    // Get actual counts from data
    setMessagesCount(getContactSubmissions().length);
    setServicesCount(getServices().length);
  }, []);

  const handleAddService = () => {
    navigate('/admin/services', { state: { openDialog: true } });
  };

  const handleCreateBlogPost = () => {
    navigate('/admin/blog', { state: { openDialog: true } });
  };

  const handleViewMessages = () => {
    navigate('/admin/messages');
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Services</h3>
          <p className="text-3xl font-bold">{servicesCount}</p>
          <p className="text-sm text-gray-500 mt-2">Total services listed</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Blog Posts</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500 mt-2">Published articles</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Inquiries</h3>
          <p className="text-3xl font-bold">{messagesCount}</p>
          <p className="text-sm text-gray-500 mt-2">Contact form submissions</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-itblue hover:bg-itblue-dark"
              onClick={handleAddService}
            >
              Add New Service
            </Button>
            <Button 
              className="bg-itblue hover:bg-itblue-dark"
              onClick={handleCreateBlogPost}
            >
              Create Blog Post
            </Button>
            <Button 
              className="bg-itblue hover:bg-itblue-dark"
              onClick={handleViewMessages}
            >
              View Messages
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
