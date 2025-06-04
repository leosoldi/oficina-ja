
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkshopAboutProps {
  about: string;
}

const WorkshopAbout = ({ about }: WorkshopAboutProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre a oficina</h2>
        <p className="text-gray-600 leading-relaxed">{about}</p>
      </CardContent>
    </Card>
  );
};

export default WorkshopAbout;
