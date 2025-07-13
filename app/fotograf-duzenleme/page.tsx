'use client';

import React from 'react';
import { Image, Wand2, Palette, Sparkles, CheckCircle, Clock } from 'lucide-react';

export default function FotografDuzenlemePage() {
  const services = [
    {
      icon: Wand2,
      title: "Temel Düzenleme",
      description: "Renk düzeltme, keskinleştirme, ışık ayarlama",
      price: "₺25",
      features: ["Renk düzeltme", "Parlaklık ayarlama", "Keskinleştirme", "Crop işlemi"]
    },
    {
      icon: Sparkles,
      title: "Gelişmiş Rötuş",
      description: "Cilt düzeltme, nesne kaldırma, arka plan değişimi",
      price: "₺75",
      features: ["Cilt rötuşı", "Nesne kaldırma", "Arka plan değişimi", "Gölge düzeltme"]
    },
    {
      icon: Palette,
      title: "Artistik Efektler",
      description: "Vintage, HDR, sanatsal filtreler",
      price: "₺50",
      features: ["Vintage efekt", "HDR işleme", "Siyah-beyaz", "Sanatsal filtreler"]
    },
    {
      icon: Image,
      title: "Restorasyon",
      description: "Eski fotoğrafların onarımı ve yenileme",
      price: "₺150",
      features: ["Çizik giderme", "Renk canlandırma", "Yırtık onarım", "Detay restore"]
    }
  ];

  const beforeAfter = [
    {
      title: "Portre Rötuşu",
      before: "/api/placeholder/300/200",
      after: "/api/placeholder/300/200"
    },
    {
      title: "Arka Plan Değişimi", 
      before: "/api/placeholder/300/200",
      after: "/api/placeholder/300/200"
    },
    {
      title: "Renk Düzeltme",
      before: "/api/placeholder/300/200", 
      after: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Wand2 className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Profesyonel Fotoğraf Düzenleme</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Fotoğraflarınızı mükemmelleştirin, anılarınızı daha da güzel hale getirin
            </p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Düzenleme Hizmetleri</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <service.icon className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="text-2xl font-bold text-purple-600 mb-4">{service.price}</div>
              <ul className="space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Before After */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Öncesi / Sonrası</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {beforeAfter.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-center mb-4">{item.title}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Önce</p>
                    <img 
                      src={item.before} 
                      alt="Before"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Sonra</p>
                    <img 
                      src={item.after} 
                      alt="After"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: 1, title: "Fotoğraf Gönder", desc: "Düzenlemek istediğiniz fotoğrafları yükleyin" },
            { step: 2, title: "Hizmet Seç", desc: "İhtiyacınıza uygun düzenleme paketini seçin" },
            { step: 3, title: "Profesyonel İşlem", desc: "Uzman tasarımcılarımız çalışıyor" },
            { step: 4, title: "Teslim", desc: "24-48 saat içinde yüksek kalitede teslim" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Fotoğraflarınızı Mükemmelleştirin</h2>
          <p className="text-xl mb-8">Hemen başlayın ve farkı görün</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Fotoğraf Yükle
          </button>
        </div>
      </div>
    </div>
  );
} 