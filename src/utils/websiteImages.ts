
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
  const savedImages = localStorage.getItem('website_images');
  if (savedImages) {
    return JSON.parse(savedImages);
  }
  
  // If no saved images, initialize with the defaults and save
  localStorage.setItem('website_images', JSON.stringify(initialImages));
  return initialImages;
};

// Get a single image by ID
export const getImageById = (id: string): WebsiteImage | undefined => {
  const images = getWebsiteImages();
  return images.find(image => image.id === id);
};

// Get an image by its location on the website
export const getImageByLocation = (location: string): WebsiteImage | undefined => {
  const images = getWebsiteImages();
  return images.find(image => image.location === location);
};

// Save an image (add new or update existing)
export const saveImage = (image: WebsiteImage): boolean => {
  try {
    const images = getWebsiteImages();
    const existingIndex = images.findIndex(img => img.id === image.id);
    
    if (existingIndex >= 0) {
      // Update existing image
      images[existingIndex] = image;
    } else {
      // Add new image with a unique ID
      const newImage = {
        ...image,
        id: image.id || Date.now().toString()
      };
      images.push(newImage);
    }
    
    localStorage.setItem('website_images', JSON.stringify(images));
    return true;
  } catch (error) {
    console.error("Error saving image:", error);
    return false;
  }
};

// Delete an image
export const deleteImage = (id: string): boolean => {
  try {
    let images = getWebsiteImages();
    images = images.filter(img => img.id !== id);
    localStorage.setItem('website_images', JSON.stringify(images));
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};
