'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Image, 
  Heart, 
  Star, 
  CheckCircle,
  Truck,
  Shield,
  Clock,
  Users,
  FileText,
  Camera,
  Home,
  Gift,
  Palette
} from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Takvim = () => {
  const products = [
    {
      id: 1,
      name: '13x13 cm Masa Takvimi',
      description: '13x13 cm ölçüsünde 12 sayfa + 1 kapaktan oluşmaktadır.',
      price: '199,90 TL',
      features: ['12 sayfa + 1 kapak', 'Masa takvimi', 'Kişiselleştirilebilir'],
      image: '/images/takvim-13x13.jpg'
    },
    {
      id: 2,
      name: '13x26 cm Masa Takvimi',
      description: '13x26 cm ölçüsünde 12 sayfa + 1 kapaktan oluşmaktadır.',
      price: '279,90 TL',
      features: ['12 sayfa + 1 kapak', 'Büyük masa takvimi', 'Detaylı görünüm'],
      image: '/images/takvim-13x26.jpg'
    },
    {
      id: 3,
      name: '10x15 cm Ayaklı Masa Takvimi',
      description: '10x15 cm ölçüsünde 12 sayfadan oluşmaktadır.',
      price: '149,90 TL',
      features: ['12 sayfa', 'Ayaklı tasarım', 'Kompakt boyut'],
      image: '/images/takvim-10x15.jpg'
    }
  ]

  const features = [
    {
      icon: Calendar,
      title: 'Kişiselleştirilmiş Tasarım',
      description: 'Kendi fotoğraflarınızla özel takvim tasarımı'
    },
    {
      icon: Image,
      title: 'Yüksek Kalite Baskı',
      description: 'Profesyonel kalitede fotoğraf baskısı'
    },
    {
      icon: Shield,
      title: 'Dayanıklı Malzeme',
      description: 'Uzun yıllar kullanıma uygun kaliteli malzeme'
    },
    {
      icon: Gift,
      title: 'Mükemmel Hediye',
      description: 'Sevdikleriniz için anlamlı hediye seçeneği'
    }
  ]

  const handleOrder = (productName: string) => {
    alert(`${productName} için sipariş başlatılıyor...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-light mb-6">
              Foto Takvim
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100">
              Kişiselleştirilmiş foto takvimlerinizi oluşturun
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Kişiselleştirilmiş tasarım</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Yüksek kalite baskı</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Dayanıklı malzeme</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-4">
              Foto Takvim Çeşitleri
            </h2>
            <p className="text-gray-600 text-lg">
              İhtiyacınıza uygun foto takvim seçenekleri
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Calendar className="text-green-600 text-4xl" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <span className="text-sm text-gray-500">/ adet</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-gray-800">Özellikler:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleOrder(product.name)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                  >
                    Siparişe Başla
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-light mb-4">
              Neden Foto Takvim?
            </h2>
            <p className="text-gray-600 text-lg">
              Foto takvimlerin avantajları
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Anılarınızı Yaşatın</h3>
              <p className="text-gray-600">Her ay farklı fotoğraflarla özel anılarınızı hatırlayın</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Özel Tasarım</h3>
              <p className="text-gray-600">Kendi fotoğraflarınızla kişiselleştirilmiş takvim tasarımı</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">2-3 iş günü içinde kapınızda</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Hemen Sipariş Verin
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Sevdikleriniz için özel foto takvimlerinizi oluşturun
            </p>
            <button 
              onClick={() => handleOrder('Foto Takvim')}
              className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Siparişe Başla
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Takvim; 