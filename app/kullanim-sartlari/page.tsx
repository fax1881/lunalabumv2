'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Shield, Users, CreditCard } from 'lucide-react';

export default function TermsOfServicePage() {
  const sections = [
    {
      title: 'Genel Hükümler',
      content: `Bu kullanım şartları, FurkanBxy web sitesini kullanımınızı düzenler. 
      Siteyi kullanarak bu şartları kabul etmiş sayılırsınız.
      
      • Site kullanımı 18 yaş üzeri kullanıcılar içindir
      • Tüm işlemler Türkiye Cumhuriyeti yasalarına tabidir
      • Şartlar değişiklik gösterebilir, güncel versiyon geçerlidir
      • Kullanım sırasında yasalara uygun davranılmalıdır`,
      icon: FileText
    },
    {
      title: 'Hesap Oluşturma ve Kullanım',
      content: `Hesap oluştururken ve kullanırken aşağıdaki kurallara uymalısınız:
      
      • Doğru ve güncel bilgiler vermelisiniz
      • Hesap güvenliğinizden siz sorumlusunuz
      • Şifrenizi kimseyle paylaşmamalısınız
      • Şüpheli aktiviteleri hemen bildirmelisiniz
      • Hesabınızı başkalarına devretmemelisiniz
      
      Hesap güvenliği ihlali durumunda sorumluluk kullanıcıya aittir.`,
      icon: Users
    },
    {
      title: 'Sipariş ve Ödeme',
      content: `Sipariş verme ve ödeme süreçleri şu şekilde işler:
      
      • Siparişler stok durumuna göre kabul edilir
      • Fiyatlar KDV dahil olarak gösterilir
      • Ödeme güvenliği SSL şifreleme ile sağlanır
      • Kredi kartı bilgileri saklanmaz
      • Sipariş onayı e-posta ile gönderilir
      
      Ödeme tamamlandıktan sonra sipariş işleme alınır.`,
      icon: CreditCard
    },
    {
      title: 'Teslimat ve Kargo',
      content: `Teslimat süreçleri hakkında bilgiler:
      
      • Kargo süresi 1-3 iş günüdür
      • 150₺ üzeri siparişlerde kargo ücretsizdir
      • Teslimat adresi doğru olmalıdır
      • Kargo firması seçimi müşteriye aittir
      • Teslimat sırasında imza gerekebilir
      
      Kargo süresi, sipariş onayından sonra başlar.`,
      icon: Shield
    },
    {
      title: 'İade ve Değişim',
      content: `İade ve değişim koşulları:
      
      • 14 gün içinde iade talebinde bulunabilirsiniz
      • Ürün orijinal durumunda olmalıdır
      • İade kargo ücreti müşteriye aittir
      • Hatalı ürünlerde kargo ücretsizdir
      • İade onayı sonrası ödeme iadesi yapılır
      
      Özel ürünlerde iade kabul edilmeyebilir.`,
      icon: CheckCircle
    },
    {
      title: 'Sorumluluk Sınırları',
      content: `FurkanBxy'nin sorumluluk sınırları:
      
      • Hizmet kesintilerinden sorumlu değildir
      • Üçüncü taraf hizmetlerden sorumlu değildir
      • Maksimum sorumluluk sipariş tutarı kadardır
      • Dolaylı zararlardan sorumlu değildir
      • Force majeure durumlarında sorumluluk yoktur
      
      Kullanıcı, site kullanımından doğan riskleri kabul eder.`,
      icon: AlertTriangle
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
              Kullanım Şartları
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Web sitemizi kullanırken uymanız gereken kurallar
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-yellow-400 mr-1" />
                <span>Yasal Uyumlu</span>
              </div>
              <span>•</span>
              <span>Son güncelleme: 15 Ocak 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="bg-blue-50 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Giriş
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Bu kullanım şartları, FurkanBxy web sitesini kullanımınızı düzenleyen 
                  yasal bir anlaşmadır. Siteyi kullanarak bu şartları kabul etmiş 
                  sayılırsınız.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Şartlar, Türkiye Cumhuriyeti yasalarına uygun olarak hazırlanmıştır 
                  ve web sitemizi kullandığınız sürece geçerlidir.
                </p>
              </div>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Important Notes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 bg-yellow-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Önemli Notlar
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 mb-1">
                      Şartlar Değişikliği
                    </p>
                    <p className="text-gray-700 text-sm">
                      Bu kullanım şartları, gerektiğinde güncellenebilir. 
                      Önemli değişiklikler olduğunda web sitemizde duyuru yapılacaktır.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 mb-1">
                      Yasal Uyumluluk
                    </p>
                    <p className="text-gray-700 text-sm">
                      Tüm işlemler Türkiye Cumhuriyeti yasalarına uygun olarak 
                      gerçekleştirilmektedir.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 mb-1">
                      Güvenlik
                    </p>
                    <p className="text-gray-700 text-sm">
                      Kişisel verileriniz KVKK kapsamında korunmaktadır. 
                      Detaylar için gizlilik politikamızı inceleyebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 bg-gray-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                İletişim
              </h3>
              <p className="text-gray-700 mb-4">
                Kullanım şartları hakkında sorularınız varsa, 
                aşağıdaki iletişim bilgilerinden bizimle iletişime geçebilirsiniz:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-800">E-posta:</p>
                  <p className="text-gray-600">info@furkanbxy.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Telefon:</p>
                  <p className="text-gray-600">+90 545 673 4497</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 