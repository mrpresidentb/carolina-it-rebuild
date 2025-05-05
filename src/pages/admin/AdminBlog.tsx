
import React from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { FileText, Plus } from 'lucide-react';

const AdminBlog = () => {
  return (
    <AdminLayout title="Blog">
      <header className="mb-8 pb-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button className="bg-itblue hover:bg-itblue-dark">
          <Plus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </header>

      <div className="bg-white p-12 rounded-lg shadow text-center">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No blog posts yet</h3>
        <p className="text-gray-500 mb-6">Create your first blog post to share updates and news</p>
        <Button className="bg-itblue hover:bg-itblue-dark">
          <Plus className="mr-2 h-4 w-4" />
          Create First Post
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
