'use client';

import React from 'react';
import AdvancedPhotoEditor from '../../../components/AdvancedPhotoEditor';

const CanvasEditor = () => {
  const templates = [
    {
      id: 'canvas-1',
      name: '20x30 cm Standart',
      thumbnail: '/api/placeholder/150/100',
      width: 2000,
      height: 3000,
      elements: []
    },
    {
      id: 'canvas-2',
      name: '30x40 cm Büyük',
      thumbnail: '/api/placeholder/150/100',
      width: 3000,
      height: 4000,
      elements: []
    },
    {
      id: 'canvas-3',
      name: '40x60 cm XL',
      thumbnail: '/api/placeholder/150/100',
      width: 4000,
      height: 6000,
      elements: []
    },
    {
      id: 'canvas-4',
      name: '50x70 cm XXL',
      thumbnail: '/api/placeholder/150/100',
      width: 5000,
      height: 7000,
      elements: []
    }
  ];

  const frameSizes = [
    { id: 'cs-1', name: '20x30 cm', width: 2000, height: 3000, price: 85 },
    { id: 'cs-2', name: '30x40 cm', width: 3000, height: 4000, price: 125 },
    { id: 'cs-3', name: '40x60 cm', width: 4000, height: 6000, price: 175 },
    { id: 'cs-4', name: '50x70 cm', width: 5000, height: 7000, price: 225 },
    { id: 'cs-5', name: '60x80 cm', width: 6000, height: 8000, price: 285 }
  ];

  const handleSaveDesign = async (designData: any) => {
    console.log('Saving canvas design:', designData);
    alert('Canvas tasarımı kaydedildi!');
  };

  const handleAddToCart = async (designData: any) => {
    console.log('Adding canvas to cart:', designData);
    alert(`Canvas tasarımı sepete eklendi! (${designData.totalPrice}₺)`);
  };

  return (
    <AdvancedPhotoEditor
      category="canvas"
      templates={templates}
      frameSizes={frameSizes}
      defaultSize={{ width: 2000, height: 3000 }}
      allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
      onSaveDesign={handleSaveDesign}
      onAddToCart={handleAddToCart}
    />
  );
};

export default CanvasEditor; 