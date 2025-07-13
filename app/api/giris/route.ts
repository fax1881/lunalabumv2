import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { comparePassword, generateToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Input validation
    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve şifre zorunlu.' }, { status: 400 });
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Geçerli bir e-posta adresi girin.' }, { status: 400 });
    }
    
    // Password length validation
    if (password.length < 6) {
      return NextResponse.json({ error: 'Şifre en az 6 karakter olmalı.' }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }
    
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Şifre yanlış.' }, { status: 401 });
    }
    
    // JWT token oluştur
    const token = generateToken({ 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    });
    
    // Şifreyi response'dan çıkar
    const { password: _, ...userSafe } = user;
    
    // Token'ı httpOnly cookie olarak ayarla
    const response = NextResponse.json(userSafe);
    response.cookies.set('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 gün
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Giris error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
} 