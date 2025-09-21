import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface ClassificationResult {
  diseaseName: string;
  confidence: number;
  riskLevel: 'high' | 'medium' | 'low';
  gradCAMUrl?: string;
}

interface ClassificationResultsProps {
  result: ClassificationResult;
  originalImage: string;
}

export const ClassificationResults: React.FC<ClassificationResultsProps> = ({
  result,
  originalImage
}) => {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'high':
        return 'High Risk - Immediate Medical Attention Required';
      case 'medium':
        return 'Review Needed - Consult Healthcare Professional';
      case 'low':
        return 'Likely Benign - Monitor for Changes';
      default:
        return 'Unknown Risk Level';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-risk-high text-white';
      case 'medium':
        return 'bg-risk-medium text-white';
      case 'low':
        return 'bg-risk-low text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="text-medical-primary">Classification Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Predicted Condition</h3>
            <p className="text-2xl font-bold text-foreground">{result.diseaseName}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
            <Badge className={`${getRiskColor(result.riskLevel)} px-3 py-1`}>
              {getRiskIcon(result.riskLevel)}
              <span className="ml-2">{getRiskLabel(result.riskLevel)}</span>
            </Badge>
          </div>

          <div className="p-4 bg-medical-muted rounded-lg border-l-4 border-medical-primary">
            <p className="text-sm">
              <strong>Important:</strong> This is an AI-powered analysis for informational purposes only. 
              Always consult with a qualified healthcare professional for proper medical diagnosis and treatment.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-medical-primary">Visual Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Original Image</h4>
              <img
                src={originalImage}
                alt="Original skin lesion"
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
            
            {result.gradCAMUrl && (
              <div>
                <h4 className="font-semibold mb-2">Attention Heatmap</h4>
                <img
                  src={result.gradCAMUrl}
                  alt="Grad-CAM heatmap"
                  className="w-full h-64 object-cover rounded-lg border"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Highlighted areas show regions the AI focused on for classification
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};