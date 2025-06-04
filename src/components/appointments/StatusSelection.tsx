
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { statusOptions } from '@/constants/appointmentStatus';

interface StatusSelectionProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const StatusSelection = ({ selectedStatus, onStatusChange }: StatusSelectionProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">Selecione o status atual:</h4>
      <div className="grid grid-cols-1 gap-3">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedStatus === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <option.icon className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
              <Badge className={option.color}>
                {option.label}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusSelection;
