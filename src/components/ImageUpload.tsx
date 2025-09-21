import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onImageRemove: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedImage,
  onImageRemove
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.bmp']
    },
    multiple: false
  });

  const handleRemove = () => {
    onImageRemove();
    setPreview(null);
  };

  if (selectedImage && preview) {
    return (
      <Card className="relative overflow-hidden shadow-card">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={preview}
              alt="Selected skin lesion"
              className="w-full h-96 object-cover"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 bg-medical-muted">
            <p className="text-sm text-muted-foreground">
              <ImageIcon className="inline h-4 w-4 mr-2" />
              {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-dashed transition-all duration-200 hover:shadow-medical">
      <CardContent className="p-8">
        <div
          {...getRootProps()}
          className={`text-center cursor-pointer transition-colors duration-200 ${
            isDragActive ? 'text-medical-primary' : 'text-muted-foreground'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 mb-4 text-medical-primary" />
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Upload Skin Lesion Image
          </h3>
          {isDragActive ? (
            <p className="text-medical-primary">Drop the image here...</p>
          ) : (
            <div className="space-y-2">
              <p>Drag & drop an image here, or click to select</p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, JPEG, PNG, BMP formats (max 10MB)
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};