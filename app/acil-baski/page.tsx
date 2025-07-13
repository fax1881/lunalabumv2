'use client';

import React from 'react';
import { Zap, Clock, Truck, Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function AcilBaskiPage() {
  const urgentServices = [
    {
      title: "6 Saat Express",
      time: "6 saat",
      price: "+%200",
      products: ["Fotoğraf 10x15", "Magnet", "Polaroid"],
      maxQty: "50 adet"
    },
    {
      title: "12 Saat Hızlı",
      time: "12 saat", 
      price: "+%150",
      products: ["Canvas 20x30", "Fotokitap A5", "Poster A4"],
      maxQty: "20 adet"
    },
    {
      title: "24 Saat Standart",
      time: "24 saat",
      price: "+%100", 
      products: ["Tüm ürünler", "Büyük boyutlar", "Çerçeveli ürünler"],
      maxQty: "100 adet"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Anında Üretim",
      description: "Siparişiniz onaylandıktan hemen sonra üretime başlıyoruz"
    },
    {
      icon: Truck,
      title: "Hızlı Teslimat",
      description: "Motorlu kurye ile İstanbul içi aynı gün teslimat"
    },
    {
      icon: Shield,
      title: "Kalite Garantisi",
      description: "Acil üretimde bile kaliteden ödün vermiyoruz"
    },
    {
      icon: Clock,
      title: "7/24 Destek",
      description: "Acil durumlarınız için 7/24 müşteri desteği"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Zap className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Acil Baskı Hizmetleri</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              6 saat içinde teslimat! Acil ihtiyaçlarınız için hızlı baskı çözümleri
            </p>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="container mx-auto px-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-yellow-700">
                <strong>Önemli:</strong> Acil baskı siparişleri için ödeme onayı alındıktan sonra iptal edilemez. 
                Dosyalarınızın baskı kalitesinde olmasına dikkat ediniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Acil Baskı Paketleri</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {urgentServices.map((service, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-6 border-2 ${
              index === 0 ? 'border-red-500' : index === 1 ? 'border-orange-500' : 'border-green-500'
            }`}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <div className={`text-3xl font-bold ${
                  index === 0 ? 'text-red-500' : index === 1 ? 'text-orange-500' : 'text-green-500'
                }`}>
                  {service.time}
                </div>
                <div className="text-lg text-gray-600">{service.price}</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Uygun Ürünler:</h4>
                  <ul className="space-y-1">
                    {service.products.map((product, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-3">
                  <span className="text-sm text-gray-600">Max: {service.maxQty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Acil Baskı Avantajları</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Acil Sipariş Süreci</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { step: 1, title: "Sipariş Ver", desc: "Online sipariş oluştur", time: "2 dk" },
            { step: 2, title: "Hızlı Ödeme", desc: "Anında ödeme yap", time: "1 dk" },
            { step: 3, title: "Onay", desc: "Sipariş onayı al", time: "5 dk" },
            { step: 4, title: "Üretim", desc: "Anında üretime başla", time: "1-6 saat" },
            { step: 5, title: "Teslimat", desc: "Kurye ile teslimat", time: "30 dk" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-1">{item.desc}</p>
              <span className="text-red-500 text-xs font-semibold">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Acil mi? Hemen Sipariş Ver!</h2>
          <p className="text-xl mb-8">6 saat içinde elinizde olsun</p>
          <button className="bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Acil Sipariş Ver
          </button>
        </div>
      </div>
    </div>
  );
} 