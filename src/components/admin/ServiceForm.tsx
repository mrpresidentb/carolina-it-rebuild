
import React, { useState } from 'react';
import { ServiceFormData } from '@/models/Service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface ServiceFormProps {
  initialData?: ServiceFormData;
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
}

const defaultFormData: ServiceFormData = {
  title: '',
  description: '',
  slug: '',
  content: '',
  visible: true
};

const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ServiceFormData>(initialData || defaultFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      visible: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate slug if empty
    if (!formData.slug) {
      formData.slug = formData.title.toLowerCase().replace(/\s+/g, '-');
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="slug">Slug (URL path)</Label>
        <Input 
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="auto-generated-if-empty"
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">Leave empty to auto-generate from title</p>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="mt-1"
          rows={10}
        />
        <p className="text-sm text-gray-500 mt-1">HTML content is supported</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="visible"
          checked={formData.visible}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="visible">Show in navigation</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-itblue">
          {initialData ? 'Update Service' : 'Add Service'}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
