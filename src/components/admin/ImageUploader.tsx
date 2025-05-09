
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string, imageFile?: File) => void;
  currentUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, currentUrl }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For image size validation
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      onImageSelected(result, file);
    };
    reader.readAsDataURL(file);
  };

  const handleExternalUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewUrl(url);
    onImageSelected(url);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="image-upload">Upload Image</Label>
          <Input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">Max file size: 5MB</p>
        </div>

        <div className="- my-2">
          <p className="text-sm text-center">OR</p>
        </div>

        <div>
          <Label htmlFor="external-url">External Image URL</Label>
          <Input 
            id="external-url" 
            type="url" 
            placeholder="https://example.com/image.jpg" 
            onChange={handleExternalUrlChange}
            defaultValue={currentUrl}
            className="mt-1"
          />
        </div>
      </div>

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Preview:</p>
          <div className="border rounded-md p-2 bg-gray-50">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-64 mx-auto object-contain"
              onError={() => {
                toast({
                  title: "Error loading image",
                  description: "The image URL is invalid or inaccessible",
                  variant: "destructive",
                });
                setPreviewUrl('');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
