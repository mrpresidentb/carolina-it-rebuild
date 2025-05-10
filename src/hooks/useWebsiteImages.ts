
import { useState, useEffect } from 'react';
import { WebsiteImage } from '@/models/WebsiteImage';
import { getWebsiteImages, saveImage, deleteImage, getImageByLocation } from '@/utils/websiteImages';

export const useWebsiteImages = () => {
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load images from localStorage
  useEffect(() => {
    try {
      const loadedImages = getWebsiteImages();
      setImages(loadedImages);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading images:", error);
      setIsLoaded(true);
    }
  }, []);

  // Update an image
  const updateImage = (image: WebsiteImage) => {
    try {
      // Make sure we have a URL
      if (!image.url) {
        console.error("Cannot save image without URL");
        return false;
      }

      const success = saveImage(image);
      if (success) {
        setImages(getWebsiteImages());
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating image:", error);
      return false;
    }
  };

  // Add a new image
  const addImage = (image: Omit<WebsiteImage, 'id'>) => {
    try {
      // Make sure we have a URL
      if (!image.url) {
        console.error("Cannot add image without URL");
        return null;
      }
      
      console.log("Adding new image in hook:", image.name, "URL length:", image.url.length);
      
      const newImage = {
        ...image,
        id: Date.now().toString()
      } as WebsiteImage;
      
      const success = saveImage(newImage);
      if (success) {
        setImages(getWebsiteImages());
        return newImage.id;
      }
      return null;
    } catch (error) {
      console.error("Error adding image:", error);
      return null;
    }
  };

  // Remove an image
  const removeImage = (id: string) => {
    try {
      const success = deleteImage(id);
      if (success) {
        setImages(getWebsiteImages());
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing image:", error);
      return false;
    }
  };

  // Get an image by its location
  const getImageForLocation = (location: string) => {
    return getImageByLocation(location);
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
