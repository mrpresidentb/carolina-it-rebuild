
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
      console.log("DEBUG [updateImage]: Starting to update image", { 
        id: image.id, 
        name: image.name,
        location: image.location
      });
      
      // Extra validation
      if (!image.url) {
        console.error("DEBUG [updateImage]: Cannot save image without URL");
        return false;
      }

      if (typeof image.url !== 'string') {
        console.error("DEBUG [updateImage]: URL is not a string type:", typeof image.url);
        return false;
      }

      if (image.url.trim() === '') {
        console.error("DEBUG [updateImage]: URL is an empty string");
        return false;
      }

      console.log("DEBUG [updateImage]: Image URL length:", image.url.length);
      console.log("DEBUG [updateImage]: Image URL starts with:", image.url.substring(0, 30));
      
      console.log("DEBUG [updateImage]: Calling saveImage function");
      const success = saveImage(image);
      console.log("DEBUG [updateImage]: Image update result:", success);
      
      if (success) {
        console.log("DEBUG [updateImage]: Update successful, refreshing images list");
        const refreshedImages = getWebsiteImages();
        console.log("DEBUG [updateImage]: Refreshed images count:", refreshedImages.length);
        setImages(refreshedImages);
        return true;
      }
      console.error("DEBUG [updateImage]: saveImage returned false");
      return false;
    } catch (error) {
      console.error("DEBUG [updateImage]: Error updating image:", error);
      console.error("DEBUG [updateImage]: Error stack:", (error as Error).stack);
      return false;
    }
  };

  // Add a new image
  const addImage = (image: Omit<WebsiteImage, 'id'>) => {
    try {
      console.log("DEBUG [addImage]: Adding new image:", { 
        name: image.name, 
        location: image.location,
        hasURL: !!image.url,
        urlType: typeof image.url
      });
      
      // Enhanced URL validation logging
      if (!image.url) {
        console.error("DEBUG [addImage]: Cannot add image - URL is null or undefined");
        return null;
      }
      
      if (typeof image.url !== 'string') {
        console.error("DEBUG [addImage]: URL is not a string type:", typeof image.url);
        return null;
      }
      
      if (image.url.trim() === '') {
        console.error("DEBUG [addImage]: Cannot add image - URL is empty string");
        return null;
      }
      
      console.log("DEBUG [addImage]: URL validation passed. URL type:", typeof image.url);
      console.log("DEBUG [addImage]: URL length:", image.url.length);
      console.log("DEBUG [addImage]: URL preview:", image.url.substring(0, 30) + (image.url.length > 30 ? '...' : ''));
      
      // Create new image object with ID
      const newImage = {
        ...image,
        id: Date.now().toString()
      } as WebsiteImage;
      
      console.log("DEBUG [addImage]: Saving new image with ID:", newImage.id);
      const success = saveImage(newImage);
      console.log("DEBUG [addImage]: Image save result:", success);
      
      if (success) {
        console.log("DEBUG [addImage]: Image saved successfully, refreshing images list");
        const updatedImages = getWebsiteImages();
        console.log("DEBUG [addImage]: Updated image count:", updatedImages.length);
        setImages(updatedImages);
        return newImage.id;
      }
      console.log("DEBUG [addImage]: Failed to save image");
      return null;
    } catch (error) {
      console.error("DEBUG [addImage]: Error adding image:", error);
      console.error("DEBUG [addImage]: Error stack:", (error as Error).stack);
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
