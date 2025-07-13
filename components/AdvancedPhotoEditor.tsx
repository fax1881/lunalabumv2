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
  Save,
  Layers,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  Settings,
  Palette,
  ShoppingCart,
  Sliders
} from 'lucide-react';
import ImageFilters from './ImageFilters';
import { TouchControls, useTouchGestures, useDeviceDetection } from './TouchControls';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  width: number;
  height: number;
  elements?: TemplateElement[];
}

interface TemplateElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'background';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  properties: any;
  isLocked: boolean;
}

interface FrameSize {
  id: string;
  name: string;
  width: number;
  height: number;
  price: number;
}

interface AdvancedPhotoEditorProps {
  category: string;
  templates?: Template[];
  frameSizes?: FrameSize[];
  defaultSize?: {
    width: number;
    height: number;
  };
  allowedFormats?: string[];
  onSaveDesign?: (designData: any) => void;
  onAddToCart?: (designData: any) => void;
}

const AdvancedPhotoEditor: React.FC<AdvancedPhotoEditorProps> = ({
  category,
  templates = [],
  frameSizes = [],
  defaultSize = { width: 800, height: 600 },
  allowedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  onSaveDesign,
  onAddToCart
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [canvasSize, setCanvasSize] = useState(defaultSize);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFrameSize, setSelectedFrameSize] = useState<FrameSize | null>(null);
  const [designElements, setDesignElements] = useState<TemplateElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showFrameSizes, setShowFrameSizes] = useState(false);
  const [designName, setDesignName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImageForFilter, setSelectedImageForFilter] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Mobile/device detection
  const deviceInfo = useDeviceDetection();
  
  // Touch gestures
  useTouchGestures(canvasRef, {
    onPinch: (scale: number) => {
      setZoom(prevZoom => Math.max(0.1, Math.min(5, prevZoom * scale)));
    },
    onPan: (deltaX: number, deltaY: number) => {
      setPan(prevPan => ({
        x: prevPan.x + deltaX,
        y: prevPan.y + deltaY
      }));
    },
    onTap: (x: number, y: number) => {
      // Handle element selection on tap
      const element = designElements.find(el => 
        x >= el.x && x <= el.x + el.width && 
        y >= el.y && y <= el.y + el.height
      );
      setSelectedElement(element ? element.id : null);
    },
    onDoubleTap: (x: number, y: number) => {
      // Double tap to zoom
      setZoom(prevZoom => prevZoom === 1 ? 2 : 1);
    },
    onLongPress: (x: number, y: number) => {
      // Long press for context menu or detailed selection
      const element = designElements.find(el => 
        x >= el.x && x <= el.x + el.width && 
        y >= el.y && y <= el.y + el.height
      );
      if (element) {
        setSelectedElement(element.id);
        // Could show context menu here
      }
    }
  });

  // Canvas initialization
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Responsive canvas sizing
        const containerWidth = canvas.parentElement?.clientWidth || canvasSize.width;
        const containerHeight = canvas.parentElement?.clientHeight || canvasSize.height;
        
        if (deviceInfo.isMobile) {
          const scale = Math.min(containerWidth / canvasSize.width, containerHeight / canvasSize.height) * 0.8;
          canvas.width = canvasSize.width * scale;
          canvas.height = canvasSize.height * scale;
        } else {
          canvas.width = canvasSize.width;
          canvas.height = canvasSize.height;
        }
        
        // Clear and set background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Apply zoom and pan transformations
        ctx.save();
        ctx.scale(zoom, zoom);
        ctx.translate(pan.x / zoom, pan.y / zoom);
        
        // Render design elements
        renderElements(ctx);
        
        ctx.restore();
      }
    }
  }, [canvasSize, backgroundColor, designElements]);

  // Update total price when frame size changes
  useEffect(() => {
    let basePrice = selectedFrameSize?.price || 0;
    let templatePrice = selectedTemplate?.elements?.reduce((sum, el) => 
      sum + (el.properties?.price || 0), 0) || 0;
    setTotalPrice(basePrice + templatePrice);
  }, [selectedFrameSize, selectedTemplate]);

  const renderElements = (ctx: CanvasRenderingContext2D) => {
    // Sort elements by zIndex
    const sortedElements = [...designElements].sort((a, b) => a.zIndex - b.zIndex);
    
    sortedElements.forEach(element => {
      ctx.save();
      
      // Apply transformations
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.translate(-element.width / 2, -element.height / 2);
      
      switch (element.type) {
        case 'text':
          renderTextElement(ctx, element);
          break;
        case 'image':
          renderImageElement(ctx, element);
          break;
        case 'shape':
          renderShapeElement(ctx, element);
          break;
      }
      
      ctx.restore();
      
      // Draw selection indicator
      if (selectedElement === element.id) {
        drawSelectionBorder(ctx, element);
      }
    });
  };

  const renderTextElement = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    const { text, fontSize, fontFamily, color, fontWeight } = element.properties;
    ctx.font = `${fontWeight || 'normal'} ${fontSize || 24}px ${fontFamily || 'Arial'}`;
    ctx.fillStyle = color || '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(text || 'Metin', 0, 0);
  };

  const renderImageElement = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    const { imageSrc } = element.properties;
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, element.width, element.height);
      };
      img.src = imageSrc;
    }
  };

  const renderShapeElement = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    const { shapeType, fillColor, strokeColor, strokeWidth } = element.properties;
    
    ctx.fillStyle = fillColor || '#ff0000';
    ctx.strokeStyle = strokeColor || '#000000';
    ctx.lineWidth = strokeWidth || 1;
    
    if (shapeType === 'rectangle') {
      ctx.fillRect(0, 0, element.width, element.height);
      if (strokeWidth) ctx.strokeRect(0, 0, element.width, element.height);
    } else if (shapeType === 'circle') {
      const radius = Math.min(element.width, element.height) / 2;
      ctx.beginPath();
      ctx.arc(element.width / 2, element.height / 2, radius, 0, 2 * Math.PI);
      ctx.fill();
      if (strokeWidth) ctx.stroke();
    }
  };

  const drawSelectionBorder = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(element.x - 2, element.y - 2, element.width + 4, element.height + 4);
    ctx.setLineDash([]);
  };

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
    const newElement: TemplateElement = {
      id: `img_${Date.now()}`,
      type: 'image',
      x: 50,
      y: 50,
      width: 200,
      height: 150,
      rotation: 0,
      zIndex: designElements.length,
      properties: { imageSrc },
      isLocked: false
    };
    
    setDesignElements(prev => [...prev, newElement]);
  };

  const addText = () => {
    const newElement: TemplateElement = {
      id: `text_${Date.now()}`,
      type: 'text',
      x: canvasSize.width / 2 - 100,
      y: canvasSize.height / 2 - 12,
      width: 200,
      height: 24,
      rotation: 0,
      zIndex: designElements.length,
      properties: {
        text: 'Yeni Metin',
        fontSize: 24,
        fontFamily: 'Arial',
        color: '#000000',
        fontWeight: 'normal'
      },
      isLocked: false
    };
    
    setDesignElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const addShape = (shapeType: 'rectangle' | 'circle') => {
    const newElement: TemplateElement = {
      id: `shape_${Date.now()}`,
      type: 'shape',
      x: canvasSize.width / 2 - 50,
      y: canvasSize.height / 2 - 50,
      width: 100,
      height: 100,
      rotation: 0,
      zIndex: designElements.length,
      properties: {
        shapeType,
        fillColor: shapeType === 'rectangle' ? '#ff0000' : '#0000ff',
        strokeColor: '#000000',
        strokeWidth: 0
      },
      isLocked: false
    };
    
    setDesignElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const loadTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCanvasSize({ width: template.width, height: template.height });
    setDesignElements(template.elements || []);
    setShowTemplates(false);
  };

  const selectFrameSize = (frameSize: FrameSize) => {
    setSelectedFrameSize(frameSize);
    setCanvasSize({ width: frameSize.width, height: frameSize.height });
    setShowFrameSizes(false);
  };

  const exportCanvas = (format: 'png' | 'jpg' = 'png') => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 0.9);
      
      const link = document.createElement('a');
      link.download = `${designName || 'design'}.${format}`;
      link.href = dataURL;
      link.click();
    }
  };

  const saveDesign = () => {
    if (canvasRef.current) {
      const designData = {
        name: designName,
        category,
        width: canvasSize.width,
        height: canvasSize.height,
        elements: designElements,
        template: selectedTemplate,
        frameSize: selectedFrameSize,
        totalPrice,
        preview: canvasRef.current.toDataURL('image/png', 0.3)
      };
      
      onSaveDesign?.(designData);
    }
  };

  const addToCart = () => {
    if (canvasRef.current) {
      const designData = {
        name: designName,
        category,
        width: canvasSize.width,
        height: canvasSize.height,
        elements: designElements,
        template: selectedTemplate,
        frameSize: selectedFrameSize,
        totalPrice,
        preview: canvasRef.current.toDataURL('image/png', 0.3)
      };
      
      onAddToCart?.(designData);
    }
  };

  const clearCanvas = () => {
    setDesignElements([]);
    setSelectedElement(null);
  };

  const deleteSelectedElement = () => {
    if (selectedElement) {
      setDesignElements(prev => prev.filter(el => el.id !== selectedElement));
      setSelectedElement(null);
    }
  };

  const duplicateSelectedElement = () => {
    if (selectedElement) {
      const element = designElements.find(el => el.id === selectedElement);
      if (element) {
        const newElement = {
          ...element,
          id: `${element.type}_${Date.now()}`,
          x: element.x + 20,
          y: element.y + 20,
          zIndex: designElements.length
        };
        setDesignElements(prev => [...prev, newElement]);
        setSelectedElement(newElement.id);
      }
    }
  };

  const handleFilterToggle = () => {
    if (selectedElement) {
      const element = designElements.find(el => el.id === selectedElement);
      if (element && element.type === 'image' && element.properties?.src) {
        setSelectedImageForFilter(element.properties.src);
        setShowFilters(true);
      }
    }
  };

  const handleFilterApplied = (filteredImageSrc: string) => {
    if (selectedElement) {
      setDesignElements(prev => 
        prev.map(el => 
          el.id === selectedElement 
            ? { ...el, properties: { ...el.properties, src: filteredImageSrc } }
            : el
        )
      );
    }
  };

  // Mobile control handlers
  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(5, prevZoom * 1.2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(0.1, prevZoom / 1.2));
  };

  const handleRotateSelected = () => {
    if (selectedElement) {
      setDesignElements(prev => 
        prev.map(el => 
          el.id === selectedElement 
            ? { ...el, rotation: (el.rotation + 15) % 360 }
            : el
        )
      );
    }
  };

  const handleMoveMode = () => {
    setSelectedTool('move');
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {category.charAt(0).toUpperCase() + category.slice(1)} Editörü
            </h1>
            <input
              type="text"
              placeholder="Tasarım adı..."
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => exportCanvas('png')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Download size={20} />
              <span>İndir</span>
            </button>
            <button
              onClick={saveDesign}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Save size={20} />
              <span>Kaydet</span>
            </button>
            <button
              onClick={addToCart}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <ShoppingCart size={20} />
              <span>Sepete Ekle ({totalPrice}₺)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Tools & Templates */}
        <div className={`
          bg-white shadow-md p-4 space-y-4 overflow-y-auto
          ${deviceInfo.isMobile 
            ? 'fixed left-0 top-0 h-full z-30 w-80 transform transition-transform duration-300' + (showTemplates ? ' translate-x-0' : ' -translate-x-full')
            : 'w-80'
          }
        `}>
          {/* Templates Section */}
          <div>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span className="font-semibold">Şablonlar</span>
              <Layers size={20} />
            </button>
            {showTemplates && (
              <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => loadTemplate(template)}
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
            )}
          </div>

          {/* Frame Sizes */}
          <div>
            <button
              onClick={() => setShowFrameSizes(!showFrameSizes)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span className="font-semibold">Çerçeve Boyutları</span>
              <Settings size={20} />
            </button>
            {showFrameSizes && (
              <div className="mt-2 space-y-2">
                {frameSizes.map((frameSize) => (
                  <div
                    key={frameSize.id}
                    onClick={() => selectFrameSize(frameSize)}
                    className={`cursor-pointer p-2 border rounded-lg hover:border-blue-500 transition-all ${
                      selectedFrameSize?.id === frameSize.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{frameSize.name}</span>
                      <span className="text-sm font-medium text-green-600">{frameSize.price}₺</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Araçlar</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={addText}
                className="p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all flex flex-col items-center"
              >
                <Type size={20} className="mb-1" />
                <span className="text-xs">Metin</span>
              </button>
              <button
                onClick={() => addShape('rectangle')}
                className="p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all flex flex-col items-center"
              >
                <Square size={20} className="mb-1" />
                <span className="text-xs">Kare</span>
              </button>
              <button
                onClick={() => addShape('circle')}
                className="p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all flex flex-col items-center"
              >
                <Circle size={20} className="mb-1" />
                <span className="text-xs">Daire</span>
              </button>
              <button
                onClick={handleFilterToggle}
                disabled={!selectedElement || designElements.find(el => el.id === selectedElement)?.type !== 'image'}
                className="p-3 rounded-lg border-2 border-purple-200 hover:border-purple-500 text-purple-600 transition-all flex flex-col items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sliders size={20} className="mb-1" />
                <span className="text-xs">Filtre</span>
              </button>
              <button
                onClick={clearCanvas}
                className="p-3 rounded-lg border-2 border-red-200 hover:border-red-500 text-red-600 transition-all flex flex-col items-center"
              >
                <Trash2 size={20} className="mb-1" />
                <span className="text-xs">Temizle</span>
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
                {isDragActive ? 'Fotoğrafları buraya bırak' : 'Fotoğraf yükle'}
              </p>
            </div>
          </div>

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
        <div className={`
          flex-1 p-4 overflow-auto
          ${deviceInfo.isMobile ? 'w-full' : ''}
        `}>
          <div className="bg-white rounded-lg shadow-md p-4 h-full flex items-center justify-center">
            <div className="relative border border-gray-300 rounded-lg overflow-hidden">
              <canvas 
                ref={canvasRef}
                className="block"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: deviceInfo.isMobile ? '60vh' : '80vh',
                  touchAction: 'none' // Prevent default touch behaviors
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties & Layers */}
        <div className={`
          bg-white shadow-md p-4 space-y-4 overflow-y-auto
          ${deviceInfo.isMobile 
            ? 'fixed right-0 top-0 h-full z-30 w-80 transform transition-transform duration-300' + (showFrameSizes ? ' translate-x-0' : ' translate-x-full')
            : 'w-80'
          }
        `}>
          <h3 className="font-semibold text-gray-700">Özellikler</h3>
          
          {/* Selected Element Properties */}
          {selectedElement && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={duplicateSelectedElement}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded text-sm flex items-center justify-center space-x-1"
                >
                  <Copy size={16} />
                  <span>Kopyala</span>
                </button>
                <button
                  onClick={deleteSelectedElement}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded text-sm flex items-center justify-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Sil</span>
                </button>
              </div>
            </div>
          )}

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
                  onChange={(e) => setCanvasSize(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Genişlik"
                />
                <input
                  type="number"
                  value={canvasSize.height}
                  onChange={(e) => setCanvasSize(prev => ({ ...prev, height: parseInt(e.target.value) }))}
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
          </div>

          {/* Layers */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Katmanlar</h3>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {designElements
                .sort((a, b) => b.zIndex - a.zIndex)
                .map((element) => (
                  <div
                    key={element.id}
                    onClick={() => setSelectedElement(element.id)}
                    className={`p-2 border rounded cursor-pointer flex items-center justify-between ${
                      selectedElement === element.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <span className="text-sm capitalize">
                      {element.type} {element.id.split('_')[1]}
                    </span>
                    <div className="flex space-x-1">
                      <button className="text-gray-400 hover:text-gray-600">
                        {element.isLocked ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Design Info */}
          <div className="pt-4 border-t">
            <h4 className="font-medium text-gray-700 mb-2">Tasarım Bilgisi</h4>
            <div className="space-y-2 text-sm">
              {selectedTemplate && (
                <div>
                  <span className="text-gray-600">Şablon:</span>
                  <span className="ml-2">{selectedTemplate.name}</span>
                </div>
              )}
              {selectedFrameSize && (
                <div>
                  <span className="text-gray-600">Boyut:</span>
                  <span className="ml-2">{selectedFrameSize.name}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Toplam Fiyat:</span>
                <span className="ml-2 font-semibold text-green-600">{totalPrice}₺</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilters && selectedImageForFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Fotoğraf Filtreleri</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <ImageFilters
              imageSrc={selectedImageForFilter}
              onFilterApplied={handleFilterApplied}
              className="w-full"
            />
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowFilters(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Touch Controls for Mobile */}
      <TouchControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotate={handleRotateSelected}
        onMove={handleMoveMode}
        onToggleFullscreen={handleToggleFullscreen}
        zoom={zoom}
        isFullscreen={isFullscreen}
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
      />

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

export default AdvancedPhotoEditor; 