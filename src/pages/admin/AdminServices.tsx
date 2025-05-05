
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Service, ServiceFormData } from '@/models/Service';
import { getServices, addService, updateService, deleteService } from '@/utils/services';
import ServiceDialog from '@/components/admin/ServiceDialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/components/ui/use-toast';

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const { toast } = useToast();

  // Load services
  useEffect(() => {
    setServices(getServices());
  }, []);

  // Handle add service
  const handleAddService = () => {
    setIsAddDialogOpen(true);
  };

  // Handle edit service
  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsEditDialogOpen(true);
  };

  // Handle delete service
  const handleDeleteClick = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  // Submit new service
  const handleAddSubmit = (data: ServiceFormData) => {
    const newService = addService(data);
    setServices(getServices());
    toast({
      title: "Service added",
      description: `${newService.title} has been successfully added.`,
    });
  };

  // Submit updated service
  const handleEditSubmit = (data: ServiceFormData) => {
    if (currentService) {
      const updated = updateService(currentService.id, data);
      if (updated) {
        setServices(getServices());
        toast({
          title: "Service updated",
          description: `${updated.title} has been successfully updated.`,
        });
      }
    }
  };

  // Confirm service deletion
  const handleDeleteConfirm = () => {
    if (currentService) {
      const deleted = deleteService(currentService.id);
      if (deleted) {
        setServices(getServices());
        toast({
          title: "Service deleted",
          description: `The service has been successfully deleted.`,
        });
      }
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <AdminLayout title="Services">
      <header className="mb-8 pb-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button className="bg-itblue hover:bg-itblue-dark" onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </header>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.title}</TableCell>
                <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                <TableCell>{service.visible ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(service)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No services found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Service Dialog */}
      <ServiceDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddSubmit}
        title="Add New Service"
      />

      {/* Edit Service Dialog */}
      {currentService && (
        <ServiceDialog
          open={isEditDialogOpen}
          service={currentService}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          title={`Edit Service: ${currentService.title}`}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service
              {currentService && ` "${currentService.title}"`}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminServices;
