'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Palette, 
  Move,
  RotateCw,
  Save,
  Eye,
  EyeOff,
  Layers,
  Settings,
  ArrowUp,
  ArrowDown,
  Copy,
  Download,
  Upload
} from 'lucide-react';

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
  isVisible: boolean;
  isLocked: boolean;
}

interface TemplateData {
  id?: string;
  name: string;
  description: string;
  category: string;
  width: number;
  height: number;
  thumbnail: string;
  elements: TemplateElement[];
  isActive: boolean;
  isPremium: boolean;
  price: number;
}

interface VisualTemplateEditorProps {
  template?: TemplateData;
  onSave: (template: TemplateData) => void;
  onCancel: () => void;
  categories: string[];
  className?: string;
}

const VisualTemplateEditor: React.FC<VisualTemplateEditorProps> = ({
  template,
  onSave,
  onCancel,
  categories,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [templateData, setTemplateData] = useState<TemplateData>(
    template || {
      name: '',
      description: '',
      category: categories[0] || '',
      width: 800,
      height: 600,
      thumbnail: '',
      elements: [],
      isActive: true,
      isPremium: false,
      price: 0
    }
  );
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Canvas initialization and rendering
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = templateData.width;
        canvas.height = templateData.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Apply zoom and pan
        ctx.save();
        ctx.scale(zoom, zoom);
        ctx.translate(pan.x / zoom, pan.y / zoom);
        
        // Draw background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        if (showGrid) {
          drawGrid(ctx);
        }
        
        // Render elements
        renderElements(ctx);
        
        ctx.restore();
      }
    }
  }, [templateData, selectedElement, zoom, pan, showGrid]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20;
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= templateData.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, templateData.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= templateData.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(templateData.width, y);
      ctx.stroke();
    }
  };

  const renderElements = (ctx: CanvasRenderingContext2D) => {
    const sortedElements = [...templateData.elements].sort((a, b) => a.zIndex - b.zIndex);
    
    sortedElements.forEach(element => {
      if (!element.isVisible) return;
      
      ctx.save();
      
      // Apply transformations
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
      ctx.rotate(element.rotation * Math.PI / 180);
      ctx.translate(-element.width / 2, -element.height / 2);
      
      // Render element based on type
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
      
      // Draw selection border
      if (selectedElement === element.id) {
        drawSelectionBorder(ctx, element);
      }
    });
  };

  const renderTextElement = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    const { text, fontSize, fontFamily, color, align } = element.properties;
    
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'top';
    
    ctx.fillText(text, 0, 0);
  };

  const renderImageElement = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    if (element.properties.src) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, element.width, element.height);
      };
      img.src = element.properties.src;
    } else {
      // Placeholder
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, element.width, element.height);
      ctx.strokeStyle = '#ccc';
      ctx.strokeRect(0, 0, element.width, element.height);
      
      ctx.fillStyle = '#666';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Resim', element.width / 2, element.height / 2);
    }
  };

  const renderShapeElement = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    const { shapeType, fillColor, strokeColor, strokeWidth } = element.properties;
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    
    if (shapeType === 'rectangle') {
      ctx.fillRect(0, 0, element.width, element.height);
      ctx.strokeRect(0, 0, element.width, element.height);
    } else if (shapeType === 'circle') {
      const radius = Math.min(element.width, element.height) / 2;
      ctx.beginPath();
      ctx.arc(element.width / 2, element.height / 2, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  };

  const drawSelectionBorder = (ctx: CanvasRenderingContext2D, element: TemplateElement) => {
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(element.x, element.y, element.width, element.height);
    ctx.setLineDash([]);
    
    // Draw handles
    const handleSize = 8;
    const handles = [
      { x: element.x - handleSize/2, y: element.y - handleSize/2 },
      { x: element.x + element.width - handleSize/2, y: element.y - handleSize/2 },
      { x: element.x - handleSize/2, y: element.y + element.height - handleSize/2 },
      { x: element.x + element.width - handleSize/2, y: element.y + element.height - handleSize/2 }
    ];
    
    ctx.fillStyle = '#007bff';
    handles.forEach(handle => {
      ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
    });
  };

  const addElement = (type: string) => {
    const newElement: TemplateElement = {
      id: `element-${Date.now()}`,
      type: type as any,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 40 : 100,
      rotation: 0,
      zIndex: templateData.elements.length,
      isVisible: true,
      isLocked: false,
      properties: getDefaultProperties(type)
    };
    
    setTemplateData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    setSelectedElement(newElement.id);
  };

  const getDefaultProperties = (type: string) => {
    switch (type) {
      case 'text':
        return {
          text: 'Metin',
          fontSize: 20,
          fontFamily: 'Arial',
          color: '#000000',
          align: 'left'
        };
      case 'image':
        return {
          src: '',
          opacity: 1
        };
      case 'shape':
        return {
          shapeType: 'rectangle',
          fillColor: '#007bff',
          strokeColor: '#0056b3',
          strokeWidth: 2
        };
      default:
        return {};
    }
  };

  const deleteElement = (id: string) => {
    setTemplateData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id)
    }));
    setSelectedElement(null);
  };

  const duplicateElement = (id: string) => {
    const element = templateData.elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: `element-${Date.now()}`,
        x: element.x + 20,
        y: element.y + 20,
        zIndex: templateData.elements.length
      };
      setTemplateData(prev => ({
        ...prev,
        elements: [...prev.elements, newElement]
      }));
    }
  };

  const updateElement = (id: string, updates: Partial<TemplateElement>) => {
    setTemplateData(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  };

  const moveElement = (id: string, direction: 'up' | 'down') => {
    const element = templateData.elements.find(el => el.id === id);
    if (!element) return;
    
    const newZIndex = direction === 'up' ? element.zIndex + 1 : element.zIndex - 1;
    updateElement(id, { zIndex: newZIndex });
  };

  const handleSave = () => {
    // Generate thumbnail
    const canvas = canvasRef.current;
    if (canvas) {
      const thumbnail = canvas.toDataURL('image/png');
      const templateToSave = {
        ...templateData,
        thumbnail
      };
      onSave(templateToSave);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom - pan.x / zoom;
    const y = (e.clientY - rect.top) / zoom - pan.y / zoom;
    
    // Find clicked element
    const clickedElement = templateData.elements.find(el => 
      x >= el.x && x <= el.x + el.width && 
      y >= el.y && y <= el.y + el.height
    );
    
    setSelectedElement(clickedElement ? clickedElement.id : null);
  };

  const selectedElementData = templateData.elements.find(el => el.id === selectedElement);

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {template ? 'Şablonu Düzenle' : 'Yeni Şablon Oluştur'}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              <Save size={16} />
              <span>Kaydet</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Template Info & Tools */}
        <div className="w-80 p-4 border-r border-gray-200 space-y-4">
          {/* Template Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şablon Adı
              </label>
              <input
                type="text"
                value={templateData.name}
                onChange={(e) => setTemplateData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Şablon adını girin"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Açıklama
              </label>
              <textarea
                value={templateData.description}
                onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Şablon açıklaması"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori
              </label>
              <select
                value={templateData.category}
                onChange={(e) => setTemplateData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genişlik
                </label>
                <input
                  type="number"
                  value={templateData.width}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yükseklik
                </label>
                <input
                  type="number"
                  value={templateData.height}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={templateData.isPremium}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, isPremium: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm">Premium Şablon</span>
              </label>
              
              {templateData.isPremium && (
                <input
                  type="number"
                  value={templateData.price}
                  onChange={(e) => setTemplateData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Fiyat"
                />
              )}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Araçlar</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addElement('text')}
                className="flex items-center space-x-2 p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
              >
                <Type size={16} />
                <span>Metin</span>
              </button>
              <button
                onClick={() => addElement('image')}
                className="flex items-center space-x-2 p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded"
              >
                <ImageIcon size={16} />
                <span>Resim</span>
              </button>
              <button
                onClick={() => addElement('shape')}
                className="flex items-center space-x-2 p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded"
              >
                <Square size={16} />
                <span>Şekil</span>
              </button>
            </div>
          </div>

          {/* View Controls */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Görünüm</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded ${showGrid ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setZoom(prev => Math.min(3, prev * 1.2))}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
              >
                +
              </button>
              <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(prev => Math.max(0.1, prev / 1.2))}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 p-4 bg-gray-50">
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="border border-gray-300 rounded cursor-crosshair"
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                transform: `scale(${zoom})`,
                transformOrigin: 'top left'
              }}
            />
          </div>
        </div>

        {/* Right Sidebar - Element Properties */}
        <div className="w-80 p-4 border-l border-gray-200 space-y-4">
          {/* Layers */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Katmanlar</h3>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {templateData.elements.map(element => (
                <div
                  key={element.id}
                  className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                    selectedElement === element.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateElement(element.id, { isVisible: !element.isVisible });
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {element.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <span className="flex-1 text-sm">{element.type}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveElement(element.id, 'up');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveElement(element.id, 'down');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateElement(element.id);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(element.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Element Properties */}
          {selectedElementData && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">Özellikler</h3>
              
              {/* Position and Size */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">X</label>
                  <input
                    type="number"
                    value={selectedElementData.x}
                    onChange={(e) => updateElement(selectedElementData.id, { x: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Y</label>
                  <input
                    type="number"
                    value={selectedElementData.y}
                    onChange={(e) => updateElement(selectedElementData.id, { y: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Genişlik</label>
                  <input
                    type="number"
                    value={selectedElementData.width}
                    onChange={(e) => updateElement(selectedElementData.id, { width: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Yükseklik</label>
                  <input
                    type="number"
                    value={selectedElementData.height}
                    onChange={(e) => updateElement(selectedElementData.id, { height: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              {/* Type-specific properties */}
              {selectedElementData.type === 'text' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Metin</label>
                    <input
                      type="text"
                      value={selectedElementData.properties.text}
                      onChange={(e) => updateElement(selectedElementData.id, { 
                        properties: { ...selectedElementData.properties, text: e.target.value }
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Renk</label>
                    <input
                      type="color"
                      value={selectedElementData.properties.color}
                      onChange={(e) => updateElement(selectedElementData.id, { 
                        properties: { ...selectedElementData.properties, color: e.target.value }
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Boyut</label>
                    <input
                      type="number"
                      value={selectedElementData.properties.fontSize}
                      onChange={(e) => updateElement(selectedElementData.id, { 
                        properties: { ...selectedElementData.properties, fontSize: parseInt(e.target.value) }
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}

              {selectedElementData.type === 'shape' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Şekil</label>
                    <select
                      value={selectedElementData.properties.shapeType}
                      onChange={(e) => updateElement(selectedElementData.id, { 
                        properties: { ...selectedElementData.properties, shapeType: e.target.value }
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="rectangle">Dikdörtgen</option>
                      <option value="circle">Daire</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Dolgu Rengi</label>
                    <input
                      type="color"
                      value={selectedElementData.properties.fillColor}
                      onChange={(e) => updateElement(selectedElementData.id, { 
                        properties: { ...selectedElementData.properties, fillColor: e.target.value }
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualTemplateEditor; 