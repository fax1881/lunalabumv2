'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  Type, 
  Download, 
  RotateCw, 
  ZoomIn, 
  ZoomOut,
  Move,
  Square,
  Circle,
  Save
} from 'lucide-react';

interface PhotoEditorProps {
  category: string;
  templates?: Array<{
    id: string;
    name: string;
    thumbnail: string;
    width: number;
    height: number;
  }>;
  defaultSize?: {
    width: number;
    height: number;
  };
  allowedFormats?: string[];
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({
  category,
  templates = [],
  defaultSize = { width: 800, height: 600 },
  allowedFormats = ['image/jpeg', 'image/png', 'image/webp']
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [canvasSize, setCanvasSize] = useState(defaultSize);

  // Canvas initialization
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        
        // Clear and set background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [canvasSize, backgroundColor]);

  // Dropzone for file upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': allowedFormats.map(format => format.replace('image/', '.'))
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      handleImageUpload(acceptedFiles);
    }
  });

  const handleImageUpload = async (files: File[]) => {
    setIsLoading(true);
    
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImages(prev => [...prev, imageUrl]);
      };
      reader.readAsDataURL(file);
    }
    
    setIsLoading(false);
  };

  const addImageToCanvas = (imageSrc: string) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          // Calculate scale to fit image
          const scale = Math.min(
            (canvas.width * 0.5) / img.width,
            (canvas.height * 0.5) / img.height
          );
          
          const newWidth = img.width * scale;
          const newHeight = img.height * scale;
          const x = (canvas.width - newWidth) / 2;
          const y = (canvas.height - newHeight) / 2;
          
          ctx.drawImage(img, x, y, newWidth, newHeight);
        };
        img.src = imageSrc;
      }
    }
  };

  const addText = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText('Metin Ekle', canvas.width / 2 - 50, canvas.height / 2);
      }
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const exportCanvas = (format: 'png' | 'jpg' = 'png') => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 0.9);
      
      // Download
      const link = document.createElement('a');
      link.download = `${category}-design.${format}`;
      link.href = dataURL;
      link.click();
    }
  };

  const updateCanvasSize = (width: number, height: number) => {
    setCanvasSize({ width, height });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {category.charAt(0).toUpperCase() + category.slice(1)} Editörü
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => exportCanvas('png')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Download size={20} />
              <span>PNG İndir</span>
            </button>
            <button
              onClick={() => exportCanvas('jpg')}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={20} />
              <span>JPG İndir</span>
            </button>
            <button
              onClick={clearCanvas}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <span>Temizle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-white shadow-md p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Araçlar</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedTool('select')}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTool === 'select' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <Move size={20} className="mx-auto" />
                <span className="text-xs block mt-1">Seç</span>
              </button>
              <button
                onClick={addText}
                className="p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
              >
                <Type size={20} className="mx-auto" />
                <span className="text-xs block mt-1">Metin</span>
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Fotoğraf Yükle</h3>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed p-4 rounded-lg text-center cursor-pointer transition-all ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <Upload size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive ? 'Fotoğrafları buraya bırak' : 'Fotoğraf yükle veya sürükle'}
              </p>
            </div>
          </div>

          {/* Templates */}
          {templates.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Şablonlar</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => updateCanvasSize(template.width, template.height)}
                    className="cursor-pointer p-2 border rounded-lg hover:border-blue-500 transition-all"
                  >
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-16 object-cover rounded mb-1"
                    />
                    <p className="text-xs text-center text-gray-600">{template.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Yüklenen Fotoğraflar</h3>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {uploadedImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Uploaded ${index}`}
                    className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-75"
                    onClick={() => addImageToCanvas(img)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-md p-4 h-full flex items-center justify-center">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <canvas 
                ref={canvasRef}
                className="block"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-white shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-4">Özellikler</h3>
          
          {/* Canvas Properties */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Canvas Boyutu
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={canvasSize.width}
                  onChange={(e) => updateCanvasSize(parseInt(e.target.value), canvasSize.height)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Genişlik"
                />
                <input
                  type="number"
                  value={canvasSize.height}
                  onChange={(e) => updateCanvasSize(canvasSize.width, parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Yükseklik"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arka Plan Rengi
              </label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded"
              />
            </div>

            {/* Category-specific controls will be added here */}
            <div className="pt-4 border-t">
              <h4 className="font-medium text-gray-700 mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)} Özellikleri
              </h4>
              <p className="text-sm text-gray-500">
                Bu kategori için özel özellikler burada görünecek.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoEditor; 