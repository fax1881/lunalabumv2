import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

// GET /api/frame-sizes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = { isActive: true };
    
    if (category) {
      where.category = category;
    }

    const frameSizes = await prisma.frameSize.findMany({
      where,
      orderBy: {
        sortOrder: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      frameSizes
    });

  } catch (error) {
    console.error('Frame sizes GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Çerçeve boyutları yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/frame-sizes - Yeni çerçeve boyutu oluştur
export async function POST(request: NextRequest) {
  try {
    // Admin yetkisi kontrolü
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token gerekli' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin yetkisi gerekli' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      category,
      name,
      width,
      height,
      price,
      isActive = true,
      sortOrder = 0
    } = body;

    // Validation
    if (!category || !name || !width || !height || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    const frameSize = await prisma.frameSize.create({
      data: {
        category,
        name,
        width: parseInt(width),
        height: parseInt(height),
        price: parseFloat(price),
        isActive,
        sortOrder: parseInt(sortOrder)
      }
    });

    return NextResponse.json({
      success: true,
      frameSize,
      message: 'Çerçeve boyutu başarıyla oluşturuldu'
    });

  } catch (error) {
    console.error('Frame size POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Çerçeve boyutu oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
} 