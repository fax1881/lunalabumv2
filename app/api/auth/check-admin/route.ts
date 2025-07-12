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
      return NextResponse.json({ isAdmin: false, error: 'Token bulunamadı' }, { status: 401 });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (!decoded || !decoded.id) {
      return NextResponse.json({ isAdmin: false, error: 'Geçersiz token' }, { status: 401 });
    }

    // Kullanıcıyı veritabanından kontrol et
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true }
    });

    if (!user) {
      return NextResponse.json({ isAdmin: false, error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // Admin rolünü kontrol et
    const isAdmin = user.role === 'admin';

    return NextResponse.json({ 
      isAdmin, 
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ isAdmin: false, error: 'Token doğrulanamadı' }, { status: 401 });
  }
} 