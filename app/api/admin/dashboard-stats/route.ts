import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../../lib/auth';

const prisma = new PrismaClient();

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Paralel olarak tüm istatistikleri çek
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      pendingOrders,
      completedOrders,
      revenueResult
    ] = await Promise.all([
      prisma.order.count(),
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count({
        where: { status: 'Beklemede' }
      }),
      prisma.order.count({
        where: { status: 'Teslim Edildi' }
      }),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true
        }
      })
    ]);

    const totalRevenue = revenueResult._sum.totalAmount || 0;

    return NextResponse.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
      pendingOrders,
      completedOrders
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 