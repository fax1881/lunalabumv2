import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Kullanıcıyı JWT ile doğrula
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Giriş yapmalısınız.' }, { status: 401 });
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Oturum geçersiz.' }, { status: 401 });
    }

    const { urun, adet, adres } = await req.json();
    
    // Input validation
    if (!urun || !adet || !adres) {
      return NextResponse.json({ error: 'Tüm alanlar zorunlu.' }, { status: 400 });
    }
    
    // Adet validation
    if (typeof adet !== 'number' || adet <= 0 || adet > 1000) {
      return NextResponse.json({ error: 'Geçerli bir adet girin.' }, { status: 400 });
    }
    
    // String validation
    if (typeof urun !== 'string' || urun.trim().length === 0) {
      return NextResponse.json({ error: 'Geçerli bir ürün adı girin.' }, { status: 400 });
    }
    
    if (typeof adres !== 'string' || adres.trim().length === 0) {
      return NextResponse.json({ error: 'Geçerli bir adres girin.' }, { status: 400 });
    }

    // Referans numarası üret
    const referans = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Sipariş oluştur
    const siparis = await prisma.order.create({
      data: {
        userId: payload.userId,
        orderNumber: referans,
        adres: adres.trim(),
        totalAmount: adet * 100, // Fiyat hesaplama örneği
        status: 'Hazırlanıyor',
        orderItems: {
          create: [{
            productId: 1, // Ürün ID'si gerçek sistemde dinamik olmalı
            quantity: adet,
            price: 100 // Gerçek fiyat
          }]
        }
      }
    });

    return NextResponse.json({ 
      message: 'Sipariş başarıyla oluşturuldu!', 
      siparis: { ...siparis, referans }
    });

  } catch (error) {
    console.error('Sipariş oluşturma hatası:', error);
    return NextResponse.json({ error: 'Sipariş oluşturulurken hata oluştu.' }, { status: 500 });
  }
} 