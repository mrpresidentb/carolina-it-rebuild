
import React, { useState, useEffect } from 'react';
import { useWebsiteImages } from '@/hooks/useWebsiteImages';
import { WebsiteImage } from '@/models/WebsiteImage';
import ImageGallery from '@/components/admin/ImageGallery';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/admin/ImageUploader';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { Toaster } from '@/components/ui/toaster';

const AdminImages = () => {
  const { images, isLoaded, updateImage, addImage, removeImage } = useWebsiteImages();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newImage, setNewImage] = useState<Partial<WebsiteImage>>({
    name: '',
    url: '',
    alt: '',
    location: '',
    isUploaded: false,
    seo: {
      title: '',
      description: '',
      keywords: ''
    }
  });
  const [filteredLocation, setFilteredLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // For debugging, log images when they change
  useEffect(() => {
    console.log("DEBUG [AdminImages]: Images in state:", images.length);
    images.forEach(img => {
      console.log(`DEBUG [AdminImages]: Image ${img.id}: ${img.name}, loc: ${img.location}, url: ${img.url.substring(0, 20)}...`);
    });
  }, [images]);

  // Filter images based on active tab and search terms
  const filteredImages = images.filter(image => {
    if (activeTab === 'all') return true;
    if (filteredLocation && image.location.toLowerCase().includes(filteredLocation.toLowerCase())) return true;
    return false;
  });

  const handleImageSelected = (imageUrl: string, imageFile?: File) => {
    // Debug the received imageUrl
    console.log("DEBUG [AdminImages]: Image selected:", 
      imageUrl ? `URL length: ${imageUrl.length}, starts with: ${imageUrl.substring(0, 20)}...` : "No URL");
    console.log("DEBUG [AdminImages]: Image file provided:", !!imageFile);
    
    // Set isUploaded flag based on whether a file was provided
    setNewImage({ 
      ...newImage, 
      url: imageUrl,
      isUploaded: !!imageFile 
    });
  };

  const resetNewImageForm = () => {
    setNewImage({
      name: '',
      url: '',
      alt: '',
      location: '',
      isUploaded: false,
      seo: {
        title: '',
        description: '',
        keywords: ''
      }
    });
  };

  const handleAddImage = () => {
    console.log("DEBUG [AdminImages]: handleAddImage called");
    console.log("DEBUG [AdminImages]: newImage state:", {
      name: newImage.name,
      location: newImage.location,
      urlExists: !!newImage.url,
      urlLength: newImage.url?.length || 0
    });
    
    if (!newImage.name) {
      console.log("DEBUG [AdminImages]: Missing name");
      toast({
        title: "Missing required field",
        description: "Please provide a name for the image",
        variant: "destructive",
      });
      return;
    }
    
    if (!newImage.location) {
      console.log("DEBUG [AdminImages]: Missing location");
      toast({
        title: "Missing required field",
        description: "Please provide a location for the image",
        variant: "destructive",
      });
      return;
    }
    
    if (!newImage.url) {
      console.log("DEBUG [AdminImages]: Missing URL");
      toast({
        title: "Missing required field",
        description: "Please upload an image or provide a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    // More detailed URL validation
    if (typeof newImage.url !== 'string') {
      console.error("DEBUG [AdminImages]: URL is not a string:", typeof newImage.url);
      toast({
        title: "Invalid URL",
        description: "The image URL is not valid",
        variant: "destructive",
      });
      return;
    }

    if (newImage.url.trim() === '') {
      console.error("DEBUG [AdminImages]: URL is empty string");
      toast({
        title: "Missing required field",
        description: "Please upload an image or provide a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("DEBUG [AdminImages]: Calling addImage with data:", {
        name: newImage.name,
        location: newImage.location,
        isUploaded: newImage.isUploaded,
        urlLength: newImage.url?.length || 0
      });

      const imageId = addImage(newImage as Omit<WebsiteImage, 'id'>);
      
      console.log("DEBUG [AdminImages]: Result of addImage:", imageId);
      
      if (imageId) {
        toast({
          title: "Image added successfully",
          description: `The image "${newImage.name}" has been added to your website`,
        });
        setIsAddDialogOpen(false);
        resetNewImageForm();
      } else {
        toast({
          title: "Error",
          description: "Failed to add the image. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("DEBUG [AdminImages]: Error adding image:", error);
      console.error("DEBUG [AdminImages]: Error stack:", (error as Error).stack);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding the image",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateImage = (updatedImage: WebsiteImage) => {
    console.log("DEBUG [AdminImages]: Updating image:", updatedImage.id);
    const success = updateImage(updatedImage);
    if (success) {
      toast({
        title: "Image updated",
        description: "The image has been updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update the image",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = (id: string) => {
    console.log("DEBUG [AdminImages]: Deleting image:", id);
    const success = removeImage(id);
    if (success) {
      toast({
        title: "Image deleted",
        description: "The image has been deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the image",
        variant: "destructive",
      });
    }
  };

  if (!isLoaded) {
    return <AdminLayout title="Images"><div className="flex items-center justify-center p-12">Loading...</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Images">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Website Images</h1>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-500 hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Image
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Images</TabsTrigger>
              <TabsTrigger value="filter">Filter by Location</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                {images.length} {images.length === 1 ? 'image' : 'images'} total
              </p>
            </div>
          </div>
          
          <TabsContent value="filter" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="location-filter">Filter by Image Location</Label>
                <Input
                  id="location-filter"
                  placeholder="e.g., homepage-hero"
                  value={filteredLocation}
                  onChange={(e) => setFilteredLocation(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <ImageGallery 
          images={filteredImages}
          onUpdate={handleUpdateImage}
          onDelete={handleDeleteImage}
        />

        {/* Add New Image Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          console.log("DEBUG [AdminImages]: Add dialog open change:", open);
          setIsAddDialogOpen(open);
          if (!open) {
            resetNewImageForm();
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="image-name">Image Name</Label>
                <Input
                  id="image-name"
                  placeholder="e.g., Homepage Hero Banner"
                  value={newImage.name}
                  onChange={(e) => {
                    console.log("DEBUG [AdminImages]: Setting image name:", e.target.value);
                    setNewImage({ ...newImage, name: e.target.value });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-location">Image Location</Label>
                <Input
                  id="image-location"
                  placeholder="e.g., homepage-hero"
                  value={newImage.location}
                  onChange={(e) => {
                    console.log("DEBUG [AdminImages]: Setting image location:", e.target.value);
                    setNewImage({ ...newImage, location: e.target.value });
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  This helps identify where this image is used on the website
                </p>
              </div>

              <div className="space-y-2">
                <Label>Image File</Label>
                <ImageUploader onImageSelected={handleImageSelected} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-alt">Alt Text (for SEO)</Label>
                <Input
                  id="image-alt"
                  placeholder="Describe what's in the image"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddImage} 
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isSubmitting ? 'Adding...' : 'Add Image'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </AdminLayout>
  );
};

export default AdminImages;
