
import { WebsiteImage } from '@/models/WebsiteImage';

// Initial website images
const initialImages: WebsiteImage[] = [
  {
    id: '1',
    name: 'Hero Image',
    url: 'https://images.squarespace-cdn.com/content/v1/65ceda6257234b70b68cc0fb/1714350468323-H9LLYACENDR9ZPCAOP0G/image-asset.jpeg',
    alt: 'IT Support Services',
    location: 'homepage-hero',
    seo: {
      title: 'IT Support Services in Charlotte',
      description: 'Professional IT services for businesses of all sizes',
      keywords: 'IT support, computer services, Charlotte'
    }
  },
  {
    id: '2',
    name: 'Printer Services Banner',
    url: 'https://images.squarespace-cdn.com/content/v1/65ceda6257234b70b68cc0fb/1715024886621-TB1TAZGR9500YFCK67WN/image-asset.jpeg',
    alt: 'Printer Services',
    location: 'printer-services-hero',
    seo: {
      title: 'Professional Printer Services',
      description: 'Expert printer installation and troubleshooting services',
      keywords: 'printer services, printer setup, printer troubleshooting'
    }
  }
];

// Get all website images
export const getWebsiteImages = (): WebsiteImage[] => {
  try {
    console.log("DEBUG [websiteImages]: Getting all website images from localStorage");
    const savedImages = localStorage.getItem('website_images');
    if (savedImages) {
      const parsedImages = JSON.parse(savedImages);
      console.log(`DEBUG [websiteImages]: Found ${parsedImages.length} images in localStorage`);
      
      // Log details about the images for debugging
      parsedImages.forEach((img: WebsiteImage) => {
        console.log(`DEBUG [websiteImages]: Image: ${img.id}, location: ${img.location}, name: ${img.name}`);
      });
      
      return parsedImages;
    }
    
    // If no saved images, initialize with the defaults and save
    console.log("DEBUG [websiteImages]: No saved images found, initializing with defaults");
    localStorage.setItem('website_images', JSON.stringify(initialImages));
    return initialImages;
  } catch (error) {
    console.error("DEBUG [websiteImages]: Error getting images:", error);
    return initialImages; // Fall back to initial images on error
  }
};

// Get a single image by ID
export const getImageById = (id: string): WebsiteImage | undefined => {
  try {
    const images = getWebsiteImages();
    const image = images.find(image => image.id === id);
    console.log(`DEBUG [websiteImages]: Found image by ID ${id}: ${!!image}`);
    return image;
  } catch (error) {
    console.error(`DEBUG [websiteImages]: Error finding image by ID ${id}:`, error);
    return undefined;
  }
};

// Get an image by its location on the website
export const getImageByLocation = (location: string): WebsiteImage | undefined => {
  try {
    const images = getWebsiteImages();
    const image = images.find(image => image.location === location);
    console.log(`DEBUG [websiteImages]: Found image by location ${location}: ${!!image}`);
    if (image) {
      console.log(`DEBUG [websiteImages]: Image details - id: ${image.id}, name: ${image.name}, url length: ${image.url?.length || 0}`);
    }
    return image;
  } catch (error) {
    console.error(`DEBUG [websiteImages]: Error finding image by location ${location}:`, error);
    return undefined;
  }
};

// Save an image (add new or update existing)
export const saveImage = (image: WebsiteImage): boolean => {
  try {
    console.log(`DEBUG [websiteImages]: Attempting to save image:`, {
      id: image.id,
      name: image.name,
      location: image.location,
      hasUrl: !!image.url,
      urlLength: image.url?.length || 0,
      urlType: typeof image.url
    });
    
    if (!image.url || image.url.trim() === '') {
      console.error("DEBUG [websiteImages]: Cannot save image with empty URL");
      return false;
    }
    
    // Extra validation for URL type
    if (typeof image.url !== 'string') {
      console.error("DEBUG [websiteImages]: URL is not a string:", typeof image.url);
      return false;
    }
    
    // Get current images
    const images = getWebsiteImages();
    console.log(`DEBUG [websiteImages]: Current images count before save: ${images.length}`);
    
    // Check if we're updating an existing image (by ID)
    const existingIndex = images.findIndex(img => img.id === image.id);
    console.log(`DEBUG [websiteImages]: Existing image index: ${existingIndex}`);
    
    if (existingIndex >= 0) {
      // Update existing image - make a copy of the array
      console.log(`DEBUG [websiteImages]: Updating existing image at index ${existingIndex}`);
      
      // Create a new array with the updated image
      const updatedImages = [...images];
      updatedImages[existingIndex] = { ...image };
      
      // Verify the update was made
      console.log(`DEBUG [websiteImages]: Updated image in array:`, {
        id: updatedImages[existingIndex].id,
        name: updatedImages[existingIndex].name,
        location: updatedImages[existingIndex].location
      });
      
      // Save to localStorage
      console.log(`DEBUG [websiteImages]: Saving ${updatedImages.length} images to localStorage`);
      localStorage.setItem('website_images', JSON.stringify(updatedImages));
    } else {
      // Add new image with a unique ID
      console.log("DEBUG [websiteImages]: Adding new image with ID:", image.id);
      const newImage = {
        ...image,
        id: image.id || Date.now().toString()
      };
      
      // Create a new array with the new image
      const updatedImages = [...images, newImage];
      
      // Save to localStorage
      console.log(`DEBUG [websiteImages]: Saving ${updatedImages.length} images to localStorage`);
      localStorage.setItem('website_images', JSON.stringify(updatedImages));
    }
    
    // Verify save was successful
    const savedDataString = localStorage.getItem('website_images');
    if (!savedDataString) {
      console.error("DEBUG [websiteImages]: Failed to retrieve saved data after saving");
      return false;
    }
    
    try {
      const savedImages = JSON.parse(savedDataString);
      console.log(`DEBUG [websiteImages]: Verified ${savedImages.length} images in localStorage after save`);
      
      // Verify our specific image was saved
      const savedImage = savedImages.find((img: WebsiteImage) => img.id === image.id);
      if (!savedImage) {
        console.error("DEBUG [websiteImages]: Image not found in saved data");
        return false;
      }
      
      console.log("DEBUG [websiteImages]: Image verified in saved data:", {
        id: savedImage.id,
        name: savedImage.name,
        url: savedImage.url ? savedImage.url.substring(0, 30) + "..." : "none"
      });
      
      return true;
    } catch (error) {
      console.error("DEBUG [websiteImages]: Error parsing saved data:", error);
      return false;
    }
  } catch (error) {
    console.error("DEBUG [websiteImages]: Error saving image:", error);
    console.error("DEBUG [websiteImages]: Error stack:", (error as Error).stack);
    return false;
  }
};

// Delete an image
export const deleteImage = (id: string): boolean => {
  try {
    console.log(`DEBUG [websiteImages]: Attempting to delete image with ID: ${id}`);
    let images = getWebsiteImages();
    const initialCount = images.length;
    images = images.filter(img => img.id !== id);
    
    if (images.length === initialCount) {
      console.log(`DEBUG [websiteImages]: No image found with ID ${id} to delete`);
      return false;
    }
    
    console.log(`DEBUG [websiteImages]: Deleted image with ID ${id}, saving ${images.length} remaining images`);
    localStorage.setItem('website_images', JSON.stringify(images));
    return true;
  } catch (error) {
    console.error(`DEBUG [websiteImages]: Error deleting image ${id}:`, error);
    return false;
  }
};
