'use client';

import React, { useState, useEffect } from 'react';
import AdvancedPhotoEditor from '../../../components/AdvancedPhotoEditor';

const FotografBaskisiEditor = () => {
  const [templates, setTemplates] = useState([]);
  const [frameSizes, setFrameSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplatesAndFrameSizes();
  }, []);

  const fetchTemplatesAndFrameSizes = async () => {
    try {
      setLoading(true);
      
      // Fetch templates
      const templatesResponse = await fetch('/api/templates?category=fotograf-baskisi');
      const templatesData = await templatesResponse.json();
      
      // Fetch frame sizes
      const frameSizesResponse = await fetch('/api/frame-sizes?category=fotograf-baskisi');
      const frameSizesData = await frameSizesResponse.json();
      
      if (templatesData.success) {
        setTemplates(templatesData.templates.map((t: any) => ({
          id: t.id.toString(),
          name: t.name,
          thumbnail: t.thumbnail,
          width: t.width,
          height: t.height,
          elements: t.elements || []
        })));
      }
      
      if (frameSizesData.success) {
        setFrameSizes(frameSizesData.frameSizes.map((fs: any) => ({
          id: fs.id.toString(),
          name: fs.name,
          width: fs.width,
          height: fs.height,
          price: fs.price
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDesign = async (designData: any) => {
    try {
      const response = await fetch('/api/designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Tasarım başarıyla kaydedildi!');
        console.log('Design saved:', result.design);
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      console.error('Save design error:', error);
      alert('Tasarım kaydedilirken hata oluştu');
    }
  };

  const handleAddToCart = async (designData: any) => {
    try {
      // First save the design
      const designResponse = await fetch('/api/designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...designData, isCompleted: true })
      });
      
      const designResult = await designResponse.json();
      
      if (designResult.success) {
        // Then add to cart
        const cartResponse = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            designId: designResult.design.id,
            quantity: 1,
            price: designData.totalPrice
          })
        });
        
        const cartResult = await cartResponse.json();
        
        if (cartResult.success) {
          alert(`Tasarım sepete eklendi! (${designData.totalPrice}₺)`);
        } else {
          alert('Sepete eklenirken hata: ' + cartResult.error);
        }
      } else {
        alert('Tasarım kaydedilemedi: ' + designResult.error);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Sepete eklerken hata oluştu');
    }
  };

  return (
    <AdvancedPhotoEditor
      category="fotograf-baskisi"
      templates={templates}
      frameSizes={frameSizes}
      defaultSize={{ width: 1050, height: 1500 }}
      allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
      onSaveDesign={handleSaveDesign}
      onAddToCart={handleAddToCart}
    />
  );
};

export default FotografBaskisiEditor; 