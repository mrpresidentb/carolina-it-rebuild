
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("DEBUG: No file selected");
      return;
    }

    console.log("DEBUG: File selected", { 
      name: file.name, 
      type: file.type, 
      size: `${(file.size / 1024).toFixed(2)}KB` 
    });

    // For image size validation
    if (file.size > 5 * 1024 * 1024) { // 5MB
      console.log("DEBUG: File too large", { size: file.size });
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setImageFile(file);

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      console.log("DEBUG: File read success, data URL length:", result?.length || 0);
      setPreviewUrl(result);
      onImageSelected(result, file); // Pass both the data URL and the file
      setIsLoading(false);
      
      toast({
        title: "Image selected",
        description: "Image has been selected and is ready to be saved.",
      });
    };
    reader.onerror = (error) => {
      console.error("DEBUG: File read error", error);
      toast({
        title: "Error loading image",
        description: "Failed to read the selected image file",
        variant: "destructive",
      });
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleExternalUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    console.log("DEBUG: URL entered:", url ? url.substring(0, 30) + "..." : "empty");
    setPreviewUrl(url);
    setImageFile(null);
    onImageSelected(url); // Only pass URL for external images
    
    if (url) {
      toast({
        title: "URL entered",
        description: "External image URL has been set",
      });
    }
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
            disabled={isLoading}
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
            disabled={isLoading}
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
              onError={(e) => {
                console.error("DEBUG: Image preview error", { url: previewUrl });
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
      
      {isLoading && (
        <div className="text-center text-sm text-blue-600">
          Processing image...
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
