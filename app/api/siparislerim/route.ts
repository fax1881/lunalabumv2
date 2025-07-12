import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export async function GET(req: NextRequest) {
  try {
    // Cookie'den token'ı al
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Token bulunamadı' }, { status: 401 });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    // Kullanıcıyı veritabanından çek
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // Kullanıcının siparişlerini çek
    const siparisler = await prisma.order.findMany({
      where: { referans: user.email },
      orderBy: { tarih: 'desc' }
    });

    return NextResponse.json(siparisler);

  } catch (error) {
    console.error('Siparislerim error:', error);
    return NextResponse.json({ error: 'Siparişler yüklenemedi' }, { status: 500 });
  }
} 