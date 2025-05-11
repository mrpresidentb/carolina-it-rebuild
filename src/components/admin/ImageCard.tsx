import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WebsiteImage } from '@/models/WebsiteImage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Image, Trash2 } from 'lucide-react';
import ImageSEOForm from './ImageSEOForm';
import ImageUploader from './ImageUploader';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface ImageCardProps {
  image: WebsiteImage;
  onUpdate: (image: WebsiteImage) => void;
  onDelete: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState<'image' | 'seo' | null>(null);
  const [tempImage, setTempImage] = useState<WebsiteImage>({ ...image });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleImageSelected = (imageUrl: string) => {
    console.log("DEBUG: Image selected in card component");
    console.log("DEBUG: URL length:", imageUrl?.length || 0);
    console.log("DEBUG: URL starts with:", imageUrl?.substring(0, 20) || "empty");
    
    setTempImage({ ...tempImage, url: imageUrl });
  };

  const handleSaveImage = () => {
    console.log("DEBUG: Attempting to save image");
    console.log("DEBUG: Image URL present:", !!tempImage.url);
    
    if (!tempImage.url || tempImage.url.trim() === '') {
      console.error("DEBUG: Image URL is empty or invalid");
      toast({
        title: "Error",
        description: "Image URL is required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    console.log("DEBUG: Set saving state to true");
    
    try {
      console.log("DEBUG: Calling onUpdate with image:", {
        id: tempImage.id,
        name: tempImage.name,
        urlLength: tempImage.url.length
      });
      
      onUpdate(tempImage);
      
      console.log("DEBUG: Update completed");
      
      toast({
        title: "Success",
        description: "Image has been updated successfully",
      });
      setEditMode(null);
    } catch (error) {
      console.error("DEBUG: Error in handleSaveImage:", error);
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    } finally {
      console.log("DEBUG: Setting saving state to false");
      setIsSaving(false);
    }
  };

  const handleSEOUpdate = (updatedImage: Partial<WebsiteImage>) => {
    try {
      console.log("DEBUG: Handling SEO update", updatedImage);
      const newImage = { ...image, ...updatedImage };
      console.log("DEBUG: Calling onUpdate with merged image");
      onUpdate(newImage);
      toast({
        title: "Success",
        description: "SEO information has been updated",
      });
      setEditMode(null);
    } catch (error) {
      console.error("DEBUG: Error updating SEO info:", error);
      toast({
        title: "Error",
        description: "Failed to update SEO information",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{image.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-video w-full relative overflow-hidden mb-3 bg-gray-100 rounded-md">
          <img 
            src={image.url} 
            alt={image.alt || image.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("DEBUG: Error loading image in card:", image.url);
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
            }}
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground line-clamp-1">
            <span className="font-medium">Location:</span> {image.location}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            <span className="font-medium">Alt Text:</span> {image.alt || "Not set"}
          </p>
          {image.seo?.title && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              <span className="font-medium">SEO Title:</span> {image.seo.title}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 justify-between">
        <Dialog open={editMode === 'image'} onOpenChange={(open) => {
          console.log("DEBUG: Image dialog open change:", open);
          if (!open) setEditMode(null);
          if (open) {
            setEditMode('image');
            console.log("DEBUG: Reset temp image", { id: image.id, name: image.name });
            setTempImage({ ...image }); // Reset temp image when opening dialog
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Image className="h-4 w-4 mr-1" />
              Change Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <ImageUploader onImageSelected={handleImageSelected} currentUrl={image.url} />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditMode(null)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveImage}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex space-x-2">
          <Dialog open={editMode === 'seo'} onOpenChange={(open) => {
            console.log("DEBUG: SEO dialog open change:", open);
            if (!open) setEditMode(null);
            if (open) setEditMode('seo');
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-1" />
                SEO
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit SEO Settings</DialogTitle>
              </DialogHeader>
              <ImageSEOForm image={image} onSave={handleSEOUpdate} />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the image "{image.name}" from your website.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  console.log("DEBUG: Delete image action triggered for:", image.id);
                  onDelete(image.id);
                  toast({
                    title: "Success",
                    description: `Image "${image.name}" has been deleted`,
                  });
                }}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
