
import React, { useMemo, useEffect, useState } from 'react';
import { useWebsiteImages } from '@/hooks/useWebsiteImages';
import { WebsiteImage } from '@/models/WebsiteImage';

interface OptimizedImageProps {
  location: string;
  className?: string;
  fallbackSrc?: string;
  fallbackAlt?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  location, 
  className, 
  fallbackSrc,
  fallbackAlt 
}) => {
  const { getImageForLocation } = useWebsiteImages();
  const [imageData, setImageData] = useState<WebsiteImage | undefined>(undefined);
  
  // Get image data on mount and whenever location changes
  useEffect(() => {
    const image = getImageForLocation(location);
    console.log(`DEBUG [OptimizedImage]: Got image for location ${location}:`, !!image);
    setImageData(image);
  }, [getImageForLocation, location]);
  
  if (!imageData && !fallbackSrc) {
    console.log(`DEBUG [OptimizedImage]: No image data or fallback for ${location}`);
    return null;
  }
  
  return (
    <img 
      src={imageData?.url || fallbackSrc}
      alt={imageData?.alt || fallbackAlt || ''}
      className={className}
      // Add SEO attributes if available
      title={imageData?.seo?.title}
      loading="lazy"
      onError={(e) => {
        console.log(`DEBUG [OptimizedImage]: Error loading image for ${location}, using fallback`);
        if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
    />
  );
};

export default OptimizedImage;
