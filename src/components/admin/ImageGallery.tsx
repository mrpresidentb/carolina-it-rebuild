
import React from 'react';
import { WebsiteImage } from '@/models/WebsiteImage';
import ImageCard from './ImageCard';

interface ImageGalleryProps {
  images: WebsiteImage[];
  onUpdate: (image: WebsiteImage) => void;
  onDelete: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onUpdate, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageCard 
          key={image.id} 
          image={image} 
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
      {images.length === 0 && (
        <div className="col-span-full text-center py-8 bg-gray-50 rounded-md border">
          <p className="text-muted-foreground">No images found</p>
          <p className="text-sm text-muted-foreground mt-1">Upload some images to get started</p>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
