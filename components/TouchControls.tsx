'use client';

import React, { useEffect, useState } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Hand, 
  Move, 
  RotateCw, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface TouchControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onMove: () => void;
  onToggleFullscreen: () => void;
  zoom: number;
  isFullscreen: boolean;
  selectedTool: string;
  onToolChange: (tool: string) => void;
  className?: string;
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onRotate,
  onMove,
  onToggleFullscreen,
  zoom,
  isFullscreen,
  selectedTool,
  onToolChange,
  className = ''
}) => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      setIsLandscape(width > height);
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  if (deviceType === 'desktop') {
    return null; // Desktop'ta touch kontrolleri gösterme
  }

  return (
    <div className={`fixed z-40 ${className}`}>
      {/* Touch Toolbar */}
      <div className={`
        bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg border
        ${deviceType === 'mobile' 
          ? isLandscape 
            ? 'bottom-4 left-4 flex flex-col space-y-2 p-2' 
            : 'bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2'
          : 'bottom-4 right-4 flex flex-col space-y-2 p-2'
        }
      `}>
        {/* Tool Selection */}
        <div className={`
          flex ${deviceType === 'mobile' && !isLandscape ? 'flex-row space-x-2' : 'flex-col space-y-2'}
        `}>
          <button
            onClick={() => onToolChange('select')}
            className={`p-3 rounded-lg transition-all ${
              selectedTool === 'select' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Hand size={20} />
          </button>
          
          <button
            onClick={() => onToolChange('move')}
            className={`p-3 rounded-lg transition-all ${
              selectedTool === 'move' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Move size={20} />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className={`
          flex ${deviceType === 'mobile' && !isLandscape ? 'flex-row space-x-2' : 'flex-col space-y-2'}
        `}>
          <button
            onClick={onZoomIn}
            className="p-3 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-all"
          >
            <ZoomIn size={20} />
          </button>
          
          <button
            onClick={onZoomOut}
            className="p-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-all"
          >
            <ZoomOut size={20} />
          </button>
        </div>

        {/* Additional Controls */}
        <div className={`
          flex ${deviceType === 'mobile' && !isLandscape ? 'flex-row space-x-2' : 'flex-col space-y-2'}
        `}>
          <button
            onClick={onRotate}
            className="p-3 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all"
          >
            <RotateCw size={20} />
          </button>
          
          <button
            onClick={onToggleFullscreen}
            className="p-3 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className={`
        bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded
        ${deviceType === 'mobile' 
          ? isLandscape 
            ? 'top-4 left-4' 
            : 'top-4 left-1/2 transform -translate-x-1/2'
          : 'top-4 right-4'
        }
      `}>
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};

// Touch gesture handler hook
export const useTouchGestures = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: {
    onPinch?: (scale: number) => void;
    onPan?: (deltaX: number, deltaY: number) => void;
    onTap?: (x: number, y: number) => void;
    onDoubleTap?: (x: number, y: number) => void;
    onLongPress?: (x: number, y: number) => void;
  }
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastTouchDistance = 0;
    let lastTouchTime = 0;
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    let lastTouchPos = { x: 0, y: 0 };
    let longPressTimer: NodeJS.Timeout | null = null;

    const getTouchDistance = (touch1: Touch, touch2: Touch) => {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchCenter = (touch1: Touch, touch2: Touch) => {
      return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      touchStartTime = Date.now();
      
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        touchStartPos = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
        lastTouchPos = { ...touchStartPos };
        
        // Start long press timer
        longPressTimer = setTimeout(() => {
          options.onLongPress?.(touchStartPos.x, touchStartPos.y);
        }, 500);
      } else if (e.touches.length === 2) {
        // Clear long press timer on multi-touch
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
        
        lastTouchDistance = getTouchDistance(e.touches[0], e.touches[1]);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      // Clear long press timer on move
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const currentPos = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
        
        const deltaX = currentPos.x - lastTouchPos.x;
        const deltaY = currentPos.y - lastTouchPos.y;
        
        options.onPan?.(deltaX, deltaY);
        lastTouchPos = currentPos;
      } else if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const scale = currentDistance / lastTouchDistance;
        
        options.onPinch?.(scale);
        lastTouchDistance = currentDistance;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      
      // Clear long press timer
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      
      if (e.changedTouches.length === 1) {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        // Quick tap detection
        if (touchDuration < 200) {
          const timeSinceLastTouch = touchEndTime - lastTouchTime;
          
          if (timeSinceLastTouch < 300) {
            // Double tap
            options.onDoubleTap?.(touchStartPos.x, touchStartPos.y);
          } else {
            // Single tap
            options.onTap?.(touchStartPos.x, touchStartPos.y);
          }
          
          lastTouchTime = touchEndTime;
        }
      }
    };

    // Add touch event listeners
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Prevent default touch behaviors
    canvas.addEventListener('touchcancel', (e) => e.preventDefault());

    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
      
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', (e) => e.preventDefault());
    };
  }, [canvasRef, options]);
};

// Device detection hook
export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLandscape: false,
    screenWidth: 0,
    screenHeight: 0,
    pixelRatio: 1
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape: width > height,
        screenWidth: width,
        screenHeight: height,
        pixelRatio: window.devicePixelRatio || 1
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

export default TouchControls; 