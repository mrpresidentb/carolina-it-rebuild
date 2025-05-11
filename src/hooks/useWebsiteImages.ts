
import { useState, useEffect } from 'react';
import { WebsiteImage } from '@/models/WebsiteImage';
import { getWebsiteImages, saveImage, deleteImage, getImageByLocation } from '@/utils/websiteImages';

export const useWebsiteImages = () => {
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load images from localStorage
  useEffect(() => {
    try {
      console.log("DEBUG: Loading images from storage");
      const loadedImages = getWebsiteImages();
      console.log(`DEBUG: Loaded ${loadedImages.length} images`);
      setImages(loadedImages);
      setIsLoaded(true);
    } catch (error) {
      console.error("DEBUG: Error loading images:", error);
      setIsLoaded(true);
    }
  }, []);

  // Update an image
  const updateImage = (image: WebsiteImage) => {
    try {
      console.log("DEBUG: Updating image", { id: image.id, name: image.name });
      
      // Make sure we have a URL
      if (!image.url) {
        console.error("DEBUG: Cannot save image without URL");
        return false;
      }

      console.log("DEBUG: Image URL length:", image.url.length);
      console.log("DEBUG: Image URL starts with:", image.url.substring(0, 20));
      
      const success = saveImage(image);
      console.log("DEBUG: Image update result:", success);
      
      if (success) {
        setImages(getWebsiteImages());
        return true;
      }
      return false;
    } catch (error) {
      console.error("DEBUG: Error updating image:", error);
      return false;
    }
  };

  // Add a new image
  const addImage = (image: Omit<WebsiteImage, 'id'>) => {
    try {
      console.log("DEBUG: Adding new image:", { 
        name: image.name, 
        location: image.location,
        hasURL: !!image.url
      });
      
      // Validate URL
      if (!image.url || image.url.trim() === '') {
        console.error("DEBUG: Cannot add image without URL");
        return null;
      }
      
      console.log("DEBUG: URL validation passed. URL length:", image.url.length);
      console.log("DEBUG: URL preview:", image.url.substring(0, 30) + (image.url.length > 30 ? '...' : ''));
      
      const newImage = {
        ...image,
        id: Date.now().toString()
      } as WebsiteImage;
      
      console.log("DEBUG: Saving new image with ID:", newImage.id);
      const success = saveImage(newImage);
      console.log("DEBUG: Image save result:", success);
      
      if (success) {
        console.log("DEBUG: Image saved successfully, refreshing images list");
        setImages(getWebsiteImages());
        return newImage.id;
      }
      console.log("DEBUG: Failed to save image");
      return null;
    } catch (error) {
      console.error("DEBUG: Error adding image:", error);
      return null;
    }
  };

  // Remove an image
  const removeImage = (id: string) => {
    try {
      console.log("DEBUG: Removing image with ID:", id);
      const success = deleteImage(id);
      console.log("DEBUG: Image delete result:", success);
      
      if (success) {
        setImages(getWebsiteImages());
        return true;
      }
      return false;
    } catch (error) {
      console.error("DEBUG: Error removing image:", error);
      return false;
    }
  };

  // Get an image by its location
  const getImageForLocation = (location: string) => {
    console.log("DEBUG: Looking up image for location:", location);
    const image = getImageByLocation(location);
    console.log("DEBUG: Image found:", !!image);
    return image;
  };

  return {
    images,
    isLoaded,
    updateImage,
    addImage,
    removeImage,
    getImageForLocation
  };
};
