
import React, { useMemo } from 'react';
import { useWebsiteImages } from '@/hooks/useWebsiteImages';

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
  
  const image = useMemo(() => getImageForLocation(location), [getImageForLocation, location]);
  
  if (!image && !fallbackSrc) {
    return null;
  }
  
  return (
    <img 
      src={image?.url || fallbackSrc}
      alt={image?.alt || fallbackAlt || ''}
      className={className}
      // Add SEO attributes if available
      title={image?.seo?.title}
      loading="lazy"
      onError={(e) => {
        if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
    />
  );
};

export default OptimizedImage;
