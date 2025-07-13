import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Kullanıcının sepetini getir
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

    const cart = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: { 
        product: true,
        design: {
          include: {
            template: true,
            frameSize: true
          }
        }
      }
    });
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Sepete ürün ekle
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

    const { productId, designId, quantity, size, price } = await req.json();
    
    if ((!productId && !designId) || !price) {
      return NextResponse.json(
        { error: 'Eksik bilgi (productId veya designId ve price gerekli)' },
        { status: 400 }
      );
    }

    // Design için sepete ekleme
    if (designId) {
      const cartItem = await prisma.cartItem.create({
        data: {
          userId: payload.userId,
          designId: parseInt(designId),
          quantity: quantity || 1,
          price: parseFloat(price)
        },
        include: {
          design: {
            include: {
              template: true,
              frameSize: true
            }
          }
        }
      });

      return NextResponse.json({
        success: true,
        cartItem,
        message: 'Tasarım sepete eklendi'
      });
    }

    // Normal ürün için sepete ekleme (eski kod)
    const existing = await prisma.cartItem.findFirst({
      where: { 
        userId: payload.userId, 
        productId, 
        size 
      }
    });

    let cartItem;
    if (existing) {
      cartItem = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (quantity || 1) }
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { 
          userId: payload.userId, 
          productId, 
          quantity: quantity || 1, 
          size, 
          price 
        }
      });
    }
    return NextResponse.json(cartItem);
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Sepet ürünü güncelle
export async function PUT(req: NextRequest) {
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

    const { cartItemId, quantity } = await req.json();
    
    if (!cartItemId || !quantity) {
      return NextResponse.json(
        { error: 'Eksik bilgi' },
        { status: 400 }
      );
    }

    // Check if cart item belongs to user
    const cartItem = await prisma.cartItem.findFirst({
      where: { 
        id: cartItemId,
        userId: payload.userId
      }
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Sepet öğesi bulunamadı' },
        { status: 404 }
      );
    }

    const updated = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Sepetten ürün sil
export async function DELETE(req: NextRequest) {
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

    const { cartItemId } = await req.json();
    
    if (!cartItemId) {
      return NextResponse.json(
        { error: 'Eksik bilgi' },
        { status: 400 }
      );
    }

    // Check if cart item belongs to user
    const cartItem = await prisma.cartItem.findFirst({
      where: { 
        id: cartItemId,
        userId: payload.userId
      }
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Sepet öğesi bulunamadı' },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete cart error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 