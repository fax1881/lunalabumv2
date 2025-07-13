'use client';

import React from 'react';
import PhotoEditor from '../../../components/PhotoEditor';

const BezBaskiEditor = () => {
  const templates = [
    {
      id: 'bez-1',
      name: 'Tişört - S',
      thumbnail: '/api/placeholder/150/100',
      width: 1800,
      height: 2200
    },
    {
      id: 'bez-2', 
      name: 'Tişört - M',
      thumbnail: '/api/placeholder/150/100',
      width: 1900,
      height: 2300
    },
    {
      id: 'bez-3',
      name: 'Tişört - L',
      thumbnail: '/api/placeholder/150/100',
      width: 2000,
      height: 2400
    },
    {
      id: 'bez-4',
      name: 'Tişört - XL',
      thumbnail: '/api/placeholder/150/100',
      width: 2100,
      height: 2500
    },
    {
      id: 'bez-5',
      name: 'Çanta 35x40',
      thumbnail: '/api/placeholder/150/100',
      width: 3500,
      height: 4000
    }
  ];

  return (
    <PhotoEditor
      category="bez-baski"
      templates={templates}
      defaultSize={{ width: 2000, height: 2400 }}
      allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
    />
  );
};

export default BezBaskiEditor; 