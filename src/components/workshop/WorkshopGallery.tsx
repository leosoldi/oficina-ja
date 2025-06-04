
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkshopGalleryProps {
  gallery: string[];
}

const WorkshopGallery = ({ gallery }: WorkshopGalleryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Galeria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`Galeria ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopGallery;
