import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/designs - Kullanıcının tasarımlarını listele
export async function GET(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isCompleted = searchParams.get('isCompleted');

    const where: any = { userId: user.userId };
    
    if (category) {
      where.category = category;
    }
    
    if (isCompleted !== null) {
      where.isCompleted = isCompleted === 'true';
    }

    const designs = await prisma.design.findMany({
      where,
      include: {
        template: {
          select: {
            id: true,
            name: true,
            thumbnail: true
          }
        },
        frameSize: {
          select: {
            id: true,
            name: true,
            price: true
          }
        },
        elements: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      designs
    });

  } catch (error) {
    console.error('Designs GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Tasarımlar yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/designs - Yeni tasarım kaydet
export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const {
      name,
      category,
      width,
      height,
      preview,
      data,
      templateId,
      frameSizeId,
      elements = [],
      isCompleted = false,
      totalPrice = 0
    } = body;

    // Validation
    if (!name || !category || !width || !height) {
      return NextResponse.json(
        { success: false, error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // Design oluştur
    const design = await prisma.design.create({
      data: {
        userId: user.userId,
        name,
        category,
        width: parseInt(width),
        height: parseInt(height),
        preview,
        data: JSON.stringify(data),
        templateId: templateId ? parseInt(templateId) : null,
        frameSizeId: frameSizeId ? parseInt(frameSizeId) : null,
        isCompleted,
        totalPrice: parseFloat(totalPrice),
        elements: {
          create: elements.map((element: any) => ({
            type: element.type,
            x: parseFloat(element.x),
            y: parseFloat(element.y),
            width: parseFloat(element.width),
            height: parseFloat(element.height),
            rotation: parseFloat(element.rotation || 0),
            zIndex: parseInt(element.zIndex || 0),
            properties: JSON.stringify(element.properties || {})
          }))
        }
      },
      include: {
        template: true,
        frameSize: true,
        elements: true
      }
    });

    return NextResponse.json({
      success: true,
      design,
      message: 'Tasarım başarıyla kaydedildi'
    });

  } catch (error) {
    console.error('Design POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Tasarım kaydedilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT /api/designs/[id] için ayrı endpoint oluşturacağız 