import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Lazy getter for JWT_SECRET to avoid build-time errors
const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
};

// Adresleri listele
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Giriş yapmalısınız.' }, { status: 401 });
    
    let userData: any;
    try {
      userData = jwt.verify(token, getJWTSecret()) as any;
    } catch {
      return NextResponse.json({ error: 'Oturum geçersiz.' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({ 
      where: { id: userData.userId as number }, 
      include: { addresses: true } 
    });
    
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    return NextResponse.json(user.addresses);
  } catch (error) {
    console.error('Address fetch error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

// Yeni adres ekle
export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Giriş yapmalısınız.' }, { status: 401 });
  let userData: any;
  try {
    userData = jwt.verify(token, getJWTSecret()) as any;
  } catch {
    return NextResponse.json({ error: 'Oturum geçersiz.' }, { status: 401 });
  }
  const { ad, adres, il, ilce, posta } = await req.json();
  if (!ad || !adres || !il || !ilce || !posta) {
    return NextResponse.json({ error: 'Tüm alanlar zorunlu.' }, { status: 400 });
  }
  const newAddress = await prisma.address.create({
    data: {
      userId: Number(userData.userId),
      ad,
      adres,
      il,
      ilce,
      posta
    }
  });
  return NextResponse.json(newAddress);
}

// Adres sil
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Giriş yapmalısınız.' }, { status: 401 });
  let userData: any;
  try {
    userData = jwt.verify(token, getJWTSecret()) as any;
  } catch {
    return NextResponse.json({ error: 'Oturum geçersiz.' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'Adres ID gerekli.' }, { status: 400 });
  // Sadece kendi adresini silebilsin
  const address = await prisma.address.findUnique({ where: { id } });
  if (!address || address.userId !== Number(userData.userId)) {
    return NextResponse.json({ error: 'Adres bulunamadı veya yetkisiz.' }, { status: 403 });
  }
  await prisma.address.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 