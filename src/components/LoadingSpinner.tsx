import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Analyzing image...' 
}) => {
  return (
    <Card className="shadow-card">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-medical-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Processing</h3>
        <p className="text-muted-foreground text-center">{message}</p>
        <div className="mt-4 text-sm text-muted-foreground text-center space-y-1">
          <p>• Analyzing image features</p>
          <p>• Applying machine learning models</p>
          <p>• Generating confidence scores</p>
        </div>
      </CardContent>
    </Card>
  );
};