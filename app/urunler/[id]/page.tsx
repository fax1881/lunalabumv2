'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  Share2,
  Minus,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  features: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  shippingInfo: string;
  returnInfo: string;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      
      // Mock veriler - gerçek uygulamada API'den gelecek
      const mockProduct: Product = {
        id: Number(productId),
        name: 'Profesyonel Fotoğraf Baskısı',
        description: 'Yüksek kaliteli fotoğraf baskısı hizmeti. Profesyonel ekipmanlar ve kaliteli kağıt kullanarak fotoğraflarınızı en iyi şekilde basıyoruz. Özel anlarınızı ölümsüzleştirmek için ideal çözüm.',
        price: 25.00,
        originalPrice: 35.00,
        category: 'Fotoğraf Baskısı',
        images: [
          '/images/photo-print-1.jpg',
          '/images/photo-print-2.jpg',
          '/images/photo-print-3.jpg',
          '/images/photo-print-4.jpg'
        ],
        sizes: ['10x15 cm', '13x18 cm', '15x21 cm', '20x30 cm'],
        features: [
          'Yüksek çözünürlüklü baskı',
          'Su geçirmez kağıt',
          'UV korumalı',
          'Hızlı teslimat',
          'Ücretsiz kargo (150₺ üzeri)'
        ],
        inStock: true,
        rating: 4.8,
        reviewCount: 127,
        shippingInfo: '1-3 iş günü içinde kargoya verilir',
        returnInfo: '14 gün içinde ücretsiz iade'
      };

      setProduct(mockProduct);
      if (mockProduct.sizes.length > 0) {
        setSelectedSize(mockProduct.sizes[0]);
      }
    } catch (error) {
      console.error('Product fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Lütfen bir boyut seçin');
      return;
    }

    setAddingToCart(true);
    try {
      const cartItem = {
        productId: product?.id,
        name: product?.name,
        price: product?.price,
        size: selectedSize,
        quantity: quantity,
        image: product?.images[0]
      };

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error('Sepete eklenemedi');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Ürün sepete eklenirken bir hata oluştu');
    } finally {
      setAddingToCart(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ürün bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ürün Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Link
            href="/urunler"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Ürünlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-blue-600">Ürünler</Link>
            <span>/</span>
            <Link href={`/urunler?category=${product.category}`} className="hover:text-blue-600">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Main Image */}
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  {product.images[selectedImage] ? (
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">Resim yüklenemedi</span>
                    </div>
                  )}
                </div>
                
                {/* Image Navigation */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-blue-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} değerlendirme)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-800">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                        %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Boyut Seçin</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Adet</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || !selectedSize || !product.inStock}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sepete Ekleniyor...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Sepete Ekle
                    </>
                  )}
                </button>

                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800">Ürün sepete eklendi!</span>
                  </motion.div>
                )}

                {!product.inStock && (
                  <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-800">Bu ürün stokta bulunmuyor</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping & Return Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <Truck className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">Kargo Bilgisi</h3>
                </div>
                <p className="text-gray-600 text-sm">{product.shippingInfo}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <RotateCcw className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-800">İade Bilgisi</h3>
                </div>
                <p className="text-gray-600 text-sm">{product.returnInfo}</p>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Güvenli Alışveriş</h3>
              </div>
              <p className="text-gray-600 text-sm">
                SSL şifreleme ile güvenli ödeme, kişisel verileriniz korunur.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Müşteri Değerlendirmeleri</h2>
            
            {/* Mock Reviews */}
            <div className="space-y-6">
              {[
                {
                  id: 1,
                  user: 'Ahmet Y.',
                  rating: 5,
                  date: '2024-01-15',
                  comment: 'Harika kalitede baskı, çok memnun kaldım. Kesinlikle tavsiye ederim.'
                },
                {
                  id: 2,
                  user: 'Ayşe D.',
                  rating: 4,
                  date: '2024-01-12',
                  comment: 'Kalite iyi, kargo hızlıydı. Bir dahaki sefere daha büyük boyut alacağım.'
                },
                {
                  id: 3,
                  user: 'Mehmet K.',
                  rating: 5,
                  date: '2024-01-10',
                  comment: 'Mükemmel hizmet! Fotoğraflarım çok güzel basıldı.'
                }
              ].map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">{review.user}</span>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 