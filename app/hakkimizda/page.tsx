'use client';

import { motion } from 'framer-motion';
import { 
  Camera, 
  Award, 
  Users, 
  Heart,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Camera,
      title: 'Profesyonel Kalite',
      description: 'En yüksek kalitede fotoğraf baskı hizmetleri'
    },
    {
      icon: Award,
      title: 'Uzman Ekip',
      description: 'Deneyimli ve uzman kadromuzla hizmetinizdeyiz'
    },
    {
      icon: Heart,
      title: 'Müşteri Memnuniyeti',
      description: 'Müşteri memnuniyeti odaklı çalışma prensibi'
    },
    {
      icon: CheckCircle,
      title: 'Hızlı Teslimat',
      description: 'Siparişlerinizi en kısa sürede teslim ediyoruz'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Mutlu Müşteri' },
    { number: '5000+', label: 'Tamamlanan Sipariş' },
    { number: '5+', label: 'Yıllık Deneyim' },
    { number: '24/7', label: 'Müşteri Desteği' }
  ];

  const team = [
    {
      name: 'Ahmet Yılmaz',
      position: 'Kurucu & CEO',
      image: '/images/team-1.jpg',
      description: '10+ yıl fotoğraf baskı sektörü deneyimi'
    },
    {
      name: 'Ayşe Demir',
      position: 'Operasyon Müdürü',
      image: '/images/team-2.jpg',
      description: 'Müşteri hizmetleri ve operasyon uzmanı'
    },
    {
      name: 'Mehmet Kaya',
      position: 'Teknik Direktör',
      image: '/images/team-3.jpg',
      description: 'Baskı teknolojileri ve kalite kontrol uzmanı'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Profesyonel fotoğraf baskı hizmetlerinde güvenilir çözüm ortağınız
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>4.9/5</span>
              </div>
              <span>•</span>
              <span>1000+ Mutlu Müşteri</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Hikayemiz
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  2019 yılında kurulan FurkanBxy, fotoğraf baskı sektöründe kalite ve 
                  müşteri memnuniyetini ön planda tutan bir yaklaşımla yola çıktı.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  En son teknoloji baskı makineleri ve uzman ekibimizle, 
                  müşterilerimizin anılarını en güzel şekilde ölümsüzleştiriyoruz.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Bugün binlerce mutlu müşteriye hizmet veriyor, 
                  her siparişte aynı kalite ve güveni sunmaya devam ediyoruz.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Müşterilerimizin değerli anılarını en yüksek kalitede 
                    baskıya dönüştürerek, onların mutluluğuna katkıda bulunmak.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Neden Bizi Seçmelisiniz?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kalite, güvenilirlik ve müşteri memnuniyeti odaklı çalışma prensibimizle 
              fark yaratıyoruz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ekibimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deneyimli ve uzman kadromuzla size en iyi hizmeti sunuyoruz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                İletişim
              </h2>
              <p className="text-lg text-gray-600">
                Sorularınız için bizimle iletişime geçebilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Telefon</h3>
                <p className="text-gray-600">+90 545 673 4497</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">E-posta</h3>
                <p className="text-gray-600">info@furkanbxy.com</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Adres</h3>
                <p className="text-gray-600">İstanbul, Türkiye</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 