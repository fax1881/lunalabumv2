import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Lazy getter for JWT_SECRET to avoid build-time errors
const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
};

// Site ayarlarını getir
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    
    if (!settings) {
      // İlk kez çalıştırılıyorsa varsayılan ayarları oluştur
      const defaultSettings = await prisma.siteSettings.create({
        data: {}
      });
      return NextResponse.json(defaultSettings);
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Site settings GET error:', error);
    return NextResponse.json({ error: 'Site ayarları alınamadı' }, { status: 500 });
  }
}

// Site ayarlarını güncelle (sadece admin)
export async function PUT(request: NextRequest) {
  try {
    // Admin kontrolü
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Yetkilendirme gerekli' }, { status: 401 });
    }

    const decoded = jwt.verify(token, getJWTSecret()) as any;
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Admin yetkisi gerekli' }, { status: 403 });
    }

    const body = await request.json();
    
    // Mevcut ayarları bul veya oluştur
    let settings = await prisma.siteSettings.findFirst();
    
    if (settings) {
      // Mevcut ayarları güncelle
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          siteName: body.siteName,
          siteDescription: body.siteDescription,
          logo: body.logo,
          favicon: body.favicon,
          primaryColor: body.primaryColor,
          secondaryColor: body.secondaryColor,
          contactEmail: body.contactEmail,
          contactPhone: body.contactPhone,
          contactAddress: body.contactAddress,
          socialFacebook: body.socialFacebook,
          socialInstagram: body.socialInstagram,
          socialTwitter: body.socialTwitter,
          socialYoutube: body.socialYoutube,
          aboutText: body.aboutText,
          privacyPolicy: body.privacyPolicy,
          termsOfService: body.termsOfService,
          shippingInfo: body.shippingInfo,
          returnPolicy: body.returnPolicy,
          faqContent: body.faqContent,
          maintenanceMode: body.maintenanceMode,
          maintenanceMessage: body.maintenanceMessage,
          googleAnalytics: body.googleAnalytics,
          facebookPixel: body.facebookPixel,
        }
      });
    } else {
      // Yeni ayarlar oluştur
      settings = await prisma.siteSettings.create({
        data: body
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Site settings PUT error:', error);
    return NextResponse.json({ error: 'Site ayarları güncellenemedi' }, { status: 500 });
  }
} 