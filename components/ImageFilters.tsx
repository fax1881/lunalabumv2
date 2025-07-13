'use client';

import React, { useRef, useEffect, useState } from 'react';
import { 
  Sliders, 
  Sun, 
  Contrast, 
  Droplets, 
  Zap, 
  Circle,
  RotateCcw,
  Download,
  Eye
} from 'lucide-react';

interface Filter {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  apply: (imageData: ImageData, intensity: number) => ImageData;
}

interface ImageFiltersProps {
  imageSrc: string;
  onFilterApplied: (filteredImageSrc: string) => void;
  className?: string;
}

const ImageFilters: React.FC<ImageFiltersProps> = ({ 
  imageSrc, 
  onFilterApplied, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Filter functions
  const filters: Filter[] = [
    {
      id: 'brightness',
      name: 'Parlaklık',
      icon: Sun,
      apply: (imageData: ImageData, intensity: number) => {
        const data = new Uint8ClampedArray(imageData.data);
        const factor = intensity / 50; // -1 to 1 range
        
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.max(0, Math.min(255, data[i] + factor * 100));     // R
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + factor * 100)); // G
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + factor * 100)); // B
        }
        
        return new ImageData(data, imageData.width, imageData.height);
      }
    },
    {
      id: 'contrast',
      name: 'Kontrast',
      icon: Contrast,
      apply: (imageData: ImageData, intensity: number) => {
        const data = new Uint8ClampedArray(imageData.data);
        const factor = (intensity + 100) / 100; // 0 to 2 range
        
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.max(0, Math.min(255, ((data[i] - 128) * factor) + 128));     // R
          data[i + 1] = Math.max(0, Math.min(255, ((data[i + 1] - 128) * factor) + 128)); // G
          data[i + 2] = Math.max(0, Math.min(255, ((data[i + 2] - 128) * factor) + 128)); // B
        }
        
        return new ImageData(data, imageData.width, imageData.height);
      }
    },
    {
      id: 'saturation',
      name: 'Doygunluk',
      icon: Droplets,
      apply: (imageData: ImageData, intensity: number) => {
        const data = new Uint8ClampedArray(imageData.data);
        const factor = intensity / 50; // -1 to 1 range
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Convert to grayscale
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          
          // Apply saturation
          data[i] = Math.max(0, Math.min(255, gray + factor * (r - gray)));
          data[i + 1] = Math.max(0, Math.min(255, gray + factor * (g - gray)));
          data[i + 2] = Math.max(0, Math.min(255, gray + factor * (b - gray)));
        }
        
        return new ImageData(data, imageData.width, imageData.height);
      }
    },
    {
      id: 'sepia',
      name: 'Sepia',
      icon: Circle,
      apply: (imageData: ImageData, intensity: number) => {
        const data = new Uint8ClampedArray(imageData.data);
        const factor = intensity / 100; // 0 to 1 range
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const newR = (r * 0.393) + (g * 0.769) + (b * 0.189);
          const newG = (r * 0.349) + (g * 0.686) + (b * 0.168);
          const newB = (r * 0.272) + (g * 0.534) + (b * 0.131);
          
          data[i] = Math.min(255, r + factor * (newR - r));
          data[i + 1] = Math.min(255, g + factor * (newG - g));
          data[i + 2] = Math.min(255, b + factor * (newB - b));
        }
        
        return new ImageData(data, imageData.width, imageData.height);
      }
    },
    {
      id: 'blur',
      name: 'Bulanıklık',
      icon: Eye,
      apply: (imageData: ImageData, intensity: number) => {
        const data = new Uint8ClampedArray(imageData.data);
        const width = imageData.width;
        const height = imageData.height;
        const radius = Math.floor(intensity / 20); // 0 to 5 radius
        
        if (radius <= 0) return imageData;
        
        // Simple box blur
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, count = 0;
            
            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const ny = y + dy;
                const nx = x + dx;
                
                if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                  const idx = (ny * width + nx) * 4;
                  r += imageData.data[idx];
                  g += imageData.data[idx + 1];
                  b += imageData.data[idx + 2];
                  count++;
                }
              }
            }
            
            const idx = (y * width + x) * 4;
            data[idx] = r / count;
            data[idx + 1] = g / count;
            data[idx + 2] = b / count;
            data[idx + 3] = imageData.data[idx + 3]; // Keep alpha
          }
        }
        
        return new ImageData(data, width, height);
      }
    },
    {
      id: 'grayscale',
      name: 'Siyah-Beyaz',
      icon: Zap,
      apply: (imageData: ImageData, intensity: number) => {
        const data = new Uint8ClampedArray(imageData.data);
        const factor = intensity / 100; // 0 to 1 range
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          
          data[i] = r + factor * (gray - r);
          data[i + 1] = g + factor * (gray - g);
          data[i + 2] = b + factor * (gray - b);
        }
        
        return new ImageData(data, imageData.width, imageData.height);
      }
    }
  ];

  // Load original image
  useEffect(() => {
    if (imageSrc && originalCanvasRef.current) {
      const canvas = originalCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          setOriginalImageData(imageData);
          
          // Initialize display canvas
          if (canvasRef.current) {
            const displayCanvas = canvasRef.current;
            const displayCtx = displayCanvas.getContext('2d');
            if (displayCtx) {
              displayCanvas.width = img.width;
              displayCanvas.height = img.height;
              displayCtx.putImageData(imageData, 0, 0);
            }
          }
        };
        img.src = imageSrc;
      }
    }
  }, [imageSrc]);

  // Apply all filters
  const applyFilters = () => {
    if (!originalImageData || !canvasRef.current) return;
    
    setIsLoading(true);
    
    // Start with original image data
    let currentImageData = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    );
    
    // Apply each filter in sequence
    Object.entries(appliedFilters).forEach(([filterId, intensity]) => {
      if (intensity !== 0) {
        const filter = filters.find(f => f.id === filterId);
        if (filter) {
          currentImageData = filter.apply(currentImageData, intensity);
        }
      }
    });
    
    // Draw to canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.putImageData(currentImageData, 0, 0);
      
      // Generate filtered image source
      const filteredImageSrc = canvas.toDataURL('image/png');
      onFilterApplied(filteredImageSrc);
    }
    
    setIsLoading(false);
  };

  // Update filter intensity
  const updateFilter = (filterId: string, intensity: number) => {
    setAppliedFilters(prev => ({
      ...prev,
      [filterId]: intensity
    }));
  };

  // Apply filters when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 100); // Debounce for performance
    
    return () => clearTimeout(timer);
  }, [appliedFilters, originalImageData]);

  // Reset all filters
  const resetFilters = () => {
    setAppliedFilters({});
  };

  // Export filtered image
  const exportImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'filtered-image.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Sliders size={20} />
          <span>Fotoğraf Filtreleri</span>
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
          >
            <RotateCcw size={16} />
            <span>Sıfırla</span>
          </button>
          <button
            onClick={exportImage}
            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            <Download size={16} />
            <span>İndir</span>
          </button>
        </div>
      </div>

      {/* Canvas for displaying image */}
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="max-w-full max-h-64 border border-gray-300 rounded"
            style={{ maxWidth: '300px', maxHeight: '200px' }}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
              <div className="text-white text-sm">İşleniyor...</div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for original image */}
      <canvas ref={originalCanvasRef} style={{ display: 'none' }} />

      {/* Filter Controls */}
      <div className="space-y-4">
        {filters.map((filter) => {
          const FilterIcon = filter.icon;
          const currentValue = appliedFilters[filter.id] || 0;
          
          return (
            <div key={filter.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FilterIcon size={16} className="text-gray-600" />
                  <span className="text-sm font-medium">{filter.name}</span>
                </div>
                <span className="text-sm text-gray-500">{currentValue}</span>
              </div>
              <input
                type="range"
                min={filter.id === 'blur' ? 0 : -100}
                max="100"
                value={currentValue}
                onChange={(e) => updateFilter(filter.id, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    filter.id === 'blur' 
                      ? currentValue 
                      : ((currentValue + 100) / 2)
                  }%, #e5e7eb ${
                    filter.id === 'blur' 
                      ? currentValue 
                      : ((currentValue + 100) / 2)
                  }%, #e5e7eb 100%)`
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Quick Preset Filters */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium mb-3">Hızlı Filtreler</h4>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setAppliedFilters({ sepia: 80, brightness: 10 })}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-3 rounded text-xs"
          >
            Vintage
          </button>
          <button
            onClick={() => setAppliedFilters({ grayscale: 100, contrast: 20 })}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-xs"
          >
            Klasik
          </button>
          <button
            onClick={() => setAppliedFilters({ brightness: 30, saturation: 20, contrast: 15 })}
            className="bg-orange-100 hover:bg-orange-200 text-orange-800 py-2 px-3 rounded text-xs"
          >
            Canlı
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageFilters; 