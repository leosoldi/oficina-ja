
import React from 'react';
import { Star, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
}

interface WorkshopReviewsProps {
  rating: number;
  reviews: number;
  customerReviews: Review[];
}

const WorkshopReviews = ({ rating, reviews, customerReviews }: WorkshopReviewsProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Avaliações dos clientes</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(5)}
            </div>
            <span className="text-lg font-semibold text-gray-900">{rating}</span>
            <span className="text-gray-600">({reviews} avaliações)</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {customerReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">• {review.date}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {review.service}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            Ver todas as avaliações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopReviews;
