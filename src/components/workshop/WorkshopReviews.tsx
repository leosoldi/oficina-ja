
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkshopReviewsProps {
  workshopId: number;
  rating: number;
  totalReviews: number;
}

const WorkshopReviews = ({ workshopId, rating, totalReviews }: WorkshopReviewsProps) => {
  const reviews = [
    {
      id: 1,
      author: 'Carlos Silva',
      rating: 5,
      date: '2024-05-15',
      comment: 'Excelente atendimento! Resolveram o problema do meu carro rapidamente e com preço justo. Recomendo!',
      helpful: 12
    },
    {
      id: 2,
      author: 'Maria Santos',
      rating: 4,
      date: '2024-05-10',
      comment: 'Bom serviço, profissionais competentes. Só demorou um pouco mais do que o esperado.',
      helpful: 8
    },
    {
      id: 3,
      author: 'João Oliveira',
      rating: 5,
      date: '2024-05-05',
      comment: 'Oficina de confiança! Sempre levo meu carro lá. Nunca tive problemas.',
      helpful: 15
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 72 },
    { stars: 4, count: 23, percentage: 18 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 3 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Avaliações dos clientes</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">{rating}</span>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{totalReviews} avaliações</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Distribuição de notas */}
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="text-sm w-8">{item.stars}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Comentários */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{review.author}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                <ThumbsUp className="h-4 w-4" />
                Útil ({review.helpful})
              </button>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          Ver todas as avaliações
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkshopReviews;
