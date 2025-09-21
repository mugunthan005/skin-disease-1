import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageUpload } from '@/components/ImageUpload';
import { ClassificationResults } from '@/components/ClassificationResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useClassification } from '@/hooks/useClassification';
import { Brain, Shield, Microscope, AlertTriangle } from 'lucide-react';
import heroImage from '@/assets/medical-hero.jpg';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { classifyImage, isClassifying, result, error, reset } = useClassification();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    reset();
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview(null);
    reset();
  };

  const handleClassify = async () => {
    if (selectedImage) {
      await classifyImage(selectedImage);
    }
  };

  const handleStartOver = () => {
    handleImageRemove();
  };

  return (
    <div className="min-h-screen bg-medical-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-medical-primary to-medical-secondary">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Medical AI Technology"
            className="w-full h-full object-cover opacity-20"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/80 to-medical-secondary/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Skin Disease Classification
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Advanced machine learning technology for preliminary skin lesion analysis and risk assessment
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                <p className="text-white/80">Deep learning models trained on dermatological data</p>
              </div>
              <div className="text-center">
                <Microscope className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">Visual Attention</h3>
                <p className="text-white/80">Grad-CAM heatmaps show focus areas</p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                <p className="text-white/80">Categorized risk levels for informed decisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Important Disclaimer */}
          <Alert className="border-warning bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning-foreground">
              <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and should not replace professional medical advice. 
              Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>

          {/* Upload Section */}
          {!result && (
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-medical-primary text-center">
                  Upload Image for Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  onImageRemove={handleImageRemove}
                />
                
                {selectedImage && !isClassifying && (
                  <div className="text-center">
                    <Button
                      onClick={handleClassify}
                      className="bg-medical-primary hover:bg-medical-primary/90 text-white px-8 py-3 text-lg"
                      size="lg"
                    >
                      <Brain className="mr-2 h-5 w-5" />
                      Analyze Image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isClassifying && (
            <LoadingSpinner message="Analyzing skin lesion patterns and generating predictions..." />
          )}

          {/* Error State */}
          {error && (
            <Alert className="border-destructive bg-destructive/5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                <strong>Analysis Error:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Results */}
          {result && imagePreview && (
            <div className="space-y-6">
              <ClassificationResults
                result={result}
                originalImage={imagePreview}
              />
              
              <div className="text-center">
                <Button
                  onClick={handleStartOver}
                  variant="outline"
                  className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                >
                  Analyze Another Image
                </Button>
              </div>
            </div>
          )}

          {/* How It Works Section */}
          {!selectedImage && !result && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-medical-primary text-center">
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="bg-medical-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-medical-primary">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Upload Image</h3>
                    <p className="text-muted-foreground text-sm">
                      Upload a clear image of the skin lesion using our drag-and-drop interface
                    </p>
                  </div>
                  <div>
                    <div className="bg-medical-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-medical-primary">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">AI Analysis</h3>
                    <p className="text-muted-foreground text-sm">
                      Our deep learning model analyzes the image and identifies key features
                    </p>
                  </div>
                  <div>
                    <div className="bg-medical-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-medical-primary">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Get Results</h3>
                    <p className="text-muted-foreground text-sm">
                      Receive classification results with confidence scores and risk assessment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
