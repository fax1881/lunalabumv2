import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

// Kullanıcının siparişlerini getir
export async function GET(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: { orderItems: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Sepetten sipariş oluştur
export async function POST(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      );
    }

    const { adres } = await req.json();
    
    if (!adres) {
      return NextResponse.json(
        { error: 'Adres bilgisi gereklidir' },
        { status: 400 }
      );
    }

    // Kullanıcının sepetini al
    const cartItems = await prisma.cartItem.findMany({ 
      where: { userId: payload.userId } 
    });
    
    if (!cartItems.length) {
      return NextResponse.json(
        { error: 'Sepet boş' },
        { status: 400 }
      );
    }

    // Sipariş toplamını hesapla
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Sipariş numarası oluştur
    const orderNumber = 'ORD-' + Date.now();
    
    // Siparişi oluştur
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: payload.userId,
        adres,
        totalAmount,
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            price: item.price
          }))
        }
      },
      include: { orderItems: true }
    });
    
    // Sepeti temizle
    await prisma.cartItem.deleteMany({ where: { userId: payload.userId } });
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 