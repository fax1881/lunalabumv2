import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Token cookie'sini temizle
    const response = NextResponse.json({ message: 'Başarıyla çıkış yapıldı' });
    response.cookies.set('token', '', { 
      httpOnly: true, 
      path: '/', 
      maxAge: 0,
      expires: new Date(0)
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Çıkış yapılırken hata oluştu' }, { status: 500 });
  }
} 