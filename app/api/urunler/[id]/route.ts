import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Geçersiz ürün ID' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    // Mock data for now - gerçek uygulamada veritabanından gelecek
    const mockProduct = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      originalPrice: product.price * 1.4, // Mock indirim
      category: product.category || 'Genel',
      images: [
        '/images/photo-print-1.jpg',
        '/images/photo-print-2.jpg',
        '/images/photo-print-3.jpg',
        '/images/photo-print-4.jpg'
      ],
      sizes: product.sizes && product.sizes.length > 0 ? product.sizes : ['10x15 cm', '13x18 cm', '15x21 cm', '20x30 cm'],
      features: product.features && product.features.length > 0 ? product.features : [
        'Yüksek çözünürlüklü baskı',
        'Su geçirmez kağıt',
        'UV korumalı',
        'Hızlı teslimat',
        'Ücretsiz kargo (150₺ üzeri)'
      ],
      inStock: product.inStock,
      rating: 4.8,
      reviewCount: 127, // Mock review count
      shippingInfo: '1-3 iş günü içinde kargoya verilir',
      returnInfo: '14 gün içinde ücretsiz iade',
      reviews: [
        {
          id: 1,
          user: 'Ahmet Y.',
          rating: 5,
          date: '2024-01-15T00:00:00.000Z',
          comment: 'Harika kalitede baskı, çok memnun kaldım.'
        },
        {
          id: 2,
          user: 'Ayşe D.',
          rating: 4,
          date: '2024-01-12T00:00:00.000Z',
          comment: 'Kalite iyi, kargo hızlıydı.'
        }
      ]
    };

    return NextResponse.json(mockProduct);
  } catch (error) {
    console.error('Product detail fetch error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 