
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Service, ServiceFormData } from '@/models/Service';
import ServiceForm from './ServiceForm';

interface ServiceDialogProps {
  open: boolean;
  service?: Service;
  onClose: () => void;
  onSubmit: (data: ServiceFormData) => void;
  title: string;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({ open, service, onClose, onSubmit, title }) => {
  const handleSubmit = (data: ServiceFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ServiceForm 
          initialData={service}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
