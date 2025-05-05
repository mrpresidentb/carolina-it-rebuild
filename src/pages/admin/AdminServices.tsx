
import React from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus } from 'lucide-react';

const AdminServices = () => {
  return (
    <AdminLayout title="Services">
      <header className="mb-8 pb-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button className="bg-itblue hover:bg-itblue-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </header>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4">Computer Troubleshooting</td>
              <td className="px-6 py-4 max-w-xs truncate">Diagnosis and resolution of hardware and software issues affecting your computer's performance.</td>
              <td className="px-6 py-4 text-right space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Delete</Button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">2</td>
              <td className="px-6 py-4">Software Installation</td>
              <td className="px-6 py-4 max-w-xs truncate">Professional installation and configuration of software applications for optimal performance.</td>
              <td className="px-6 py-4 text-right space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
