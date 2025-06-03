
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkshopGalleryProps {
  gallery: string[];
}

const WorkshopGallery = ({ gallery }: WorkshopGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Galeria de fotos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
            <div className="text-6xl">📸</div>
            
            {gallery.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-2xl transition-all ${
                  currentImage === index ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                }`}
              >
                📷
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopGallery;
