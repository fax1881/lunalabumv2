'use client';

import React from 'react';
import PhotoEditor from '../../../components/PhotoEditor';

const FotokitapEditor = () => {
  const templates = [
    {
      id: 'fotokitap-1',
      name: '15x20 cm Kare',
      thumbnail: '/api/placeholder/150/100',
      width: 1500,
      height: 2000
    },
    {
      id: 'fotokitap-2',
      name: '20x30 cm Standart',
      thumbnail: '/api/placeholder/150/100',
      width: 2000,
      height: 3000
    },
    {
      id: 'fotokitap-3',
      name: '30x30 cm Kare',
      thumbnail: '/api/placeholder/150/100',
      width: 3000,
      height: 3000
    },
    {
      id: 'fotokitap-4',
      name: '21x30 cm A4',
      thumbnail: '/api/placeholder/150/100',
      width: 2100,
      height: 3000
    },
    {
      id: 'fotokitap-5',
      name: '25x35 cm Büyük',
      thumbnail: '/api/placeholder/150/100',
      width: 2500,
      height: 3500
    }
  ];

  return (
    <PhotoEditor
      category="fotokitap"
      templates={templates}
      defaultSize={{ width: 2000, height: 3000 }}
      allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
    />
  );
};

export default FotokitapEditor; 