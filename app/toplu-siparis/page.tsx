'use client';

import React, { useState } from 'react';
import { Package, Calculator, CheckCircle, Star, Mail, Phone } from 'lucide-react';

export default function TopluSiparisPage() {
  const [quantity, setQuantity] = useState(100);
  const [productType, setProductType] = useState<'fotograf' | 'canvas' | 'fotokitap' | 'magnet'>('fotograf');

  const priceRanges = {
    fotograf: { base: 5, discount: 0.3 },
    canvas: { base: 25, discount: 0.4 },
    fotokitap: { base: 35, discount: 0.35 },
    magnet: { base: 8, discount: 0.25 }
  } as const;

  const calculatePrice = () => {
    const basePrice = priceRanges[productType].base;
    const discount = quantity >= 500 ? 0.5 : quantity >= 200 ? 0.4 : priceRanges[productType].discount;
    return (basePrice * (1 - discount)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Toplu Sipariş</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Büyük miktarlarda sipariş verin, özel indirimlerden yararlanın
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Fiyat Hesaplayıcı</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Tipi
                </label>
                                 <select 
                   value={productType}
                   onChange={(e) => setProductType(e.target.value as typeof productType)}
                   className="w-full border border-gray-300 rounded-md px-3 py-2"
                 >
                  <option value="fotograf">Fotoğraf Baskısı</option>
                  <option value="canvas">Canvas Tablo</option>
                  <option value="fotokitap">Foto Kitap</option>
                  <option value="magnet">Magnet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adet: {quantity}
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>100</span>
                  <span>1000</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ₺{calculatePrice()} / adet
                  </div>
                                     <div className="text-sm text-gray-600">
                     Toplam: ₺{(parseFloat(calculatePrice()) * quantity).toLocaleString()}
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Toplu Sipariş Avantajları</h2>
              <div className="space-y-3">
                {[
                  "100+ adet siparişlerde %30 indirim",
                  "200+ adet siparişlerde %40 indirim", 
                  "500+ adet siparişlerde %50 indirim",
                  "Ücretsiz kargo",
                  "Öncelikli üretim",
                  "Kalite garantisi",
                  "Özel müşteri temsilcisi"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Müşteri Yorumları</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    "500 adetlik siparişimiz zamanında geldi ve kalite mükemmeldi!"
                  </p>
                  <p className="text-gray-500 text-xs mt-1">- ABC Şirketi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              Toplu Sipariş İçin İletişim
            </h2>
            <p className="text-gray-600 mb-6">
              Özel projeleriniz için bizimle iletişime geçin
            </p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>0850 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>toplu@lunalabum.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 