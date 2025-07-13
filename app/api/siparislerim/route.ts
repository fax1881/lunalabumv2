import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Cookie'den token'ı al
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Token bulunamadı' }, { status: 401 });
    }

    // Token'ı doğrula
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    // Kullanıcıyı veritabanından çek
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // Kullanıcının siparişlerini çek
    const siparisler = await prisma.order.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(siparisler);

  } catch (error) {
    console.error('Siparislerim error:', error);
    return NextResponse.json({ error: 'Siparişler yüklenemedi' }, { status: 500 });
  }
} 