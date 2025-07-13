import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/templates - Şablonları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    const isPremium = searchParams.get('isPremium');

    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }
    
    if (isPremium !== null) {
      where.isPremium = isPremium === 'true';
    }

    const templates = await prisma.template.findMany({
      where,
      include: {
        elements: true,
        _count: {
          select: {
            designs: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      templates
    });

  } catch (error) {
    console.error('Templates GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Şablonlar yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/templates - Yeni şablon oluştur
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
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz token' },
        { status: 401 }
      );
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin yetkisi gerekli' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      description,
      category,
      thumbnail,
      width,
      height,
      isActive = true,
      isPremium = false,
      price = 0,
      elements = []
    } = body;

    // Validation
    if (!name || !category || !thumbnail || !width || !height) {
      return NextResponse.json(
        { success: false, error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // Template oluştur
    const template = await prisma.template.create({
      data: {
        name,
        description,
        category,
        thumbnail,
        width: parseInt(width),
        height: parseInt(height),
        isActive,
        isPremium,
        price: parseFloat(price),
        elements: {
          create: elements.map((element: any) => ({
            type: element.type,
            x: parseFloat(element.x),
            y: parseFloat(element.y),
            width: parseFloat(element.width),
            height: parseFloat(element.height),
            rotation: parseFloat(element.rotation || 0),
            zIndex: parseInt(element.zIndex || 0),
            properties: JSON.stringify(element.properties || {}),
            isLocked: element.isLocked || false
          }))
        }
      },
      include: {
        elements: true
      }
    });

    return NextResponse.json({
      success: true,
      template,
      message: 'Şablon başarıyla oluşturuldu'
    });

  } catch (error) {
    console.error('Template POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Şablon oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
} 