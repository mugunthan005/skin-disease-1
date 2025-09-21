import { useState } from 'react';

interface ClassificationResult {
  diseaseName: string;
  confidence: number;
  riskLevel: 'high' | 'medium' | 'low';
  gradCAMUrl?: string;
}

export const useClassification = () => {
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const classifyImage = async (imageFile: File): Promise<void> => {
    setIsClassifying(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      // Mock API call - replace with actual backend endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with actual API response
      const mockResult: ClassificationResult = {
        diseaseName: 'Melanocytic Nevus',
        confidence: 0.87,
        riskLevel: 'low',
        // gradCAMUrl: 'path/to/gradcam/image.jpg'
      };

      setResult(mockResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Classification failed');
    } finally {
      setIsClassifying(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setIsClassifying(false);
  };

  return {
    classifyImage,
    isClassifying,
    result,
    error,
    reset
  };
};