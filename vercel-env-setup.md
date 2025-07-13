# Vercel Environment Variables Kurulum Rehberi

## Vercel Dashboard'da Ayarlanması Gereken Environment Variables

### 1. Database Configuration
```
DATABASE_URL = postgresql://username:password@hostname:port/database?schema=public
```
**Notlar:**
- Vercel Postgres, Supabase, PlanetScale, Railway vb. kullanabilirsiniz
- SSL bağlantısı gerekli: `?sslmode=require` ekleyin
- Örnek: `postgresql://user:pass@db.vercel-storage.com:5432/verceldb?sslmode=require`

### 2. JWT Secret
```
JWT_SECRET = your-super-secure-jwt-secret-key-here
```
**Notlar:**
- En az 32 karakter olmalı
- Güvenli random string kullanın
- Production'da mutlaka değiştirin

### 3. Node Environment
```
NODE_ENV = production
```

## Veritabanı Setup Adımları

### 1. Vercel Postgres Kurulumu (Önerilen)
1. Vercel Dashboard → Storage → Create Database → Postgres
2. Database connection string'i kopyalayın
3. Environment Variables'a `DATABASE_URL` olarak ekleyin

### 2. Prisma Migration
Vercel deploy sırasında otomatik olarak çalışacak:
```bash
npx prisma generate
npx prisma db push
```

## Build Commands (package.json)
Mevcut build script zaten hazır:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

## Deployment Checklist

### ✅ Hazır Olanlar:
- [x] TypeScript build başarılı
- [x] API routes çalışıyor
- [x] Admin paneli gerçek verilerle çalışıyor
- [x] Edge Runtime uyumlu auth
- [x] Prisma client generation

### ⚠️ Vercel'de Yapılacaklar:
- [ ] Database setup (PostgreSQL)
- [ ] Environment variables set
- [ ] Domain configuration (opsiyonel)

## Muhtemel Hatalar ve Çözümleri

### 1. Prisma Client Error
**Hata:** `Cannot find module '@prisma/client'`
**Çözüm:** Build script'te `prisma generate` var, otomatik çözülür

### 2. Database Connection Error
**Hata:** `Can't reach database server`
**Çözüm:** DATABASE_URL'i kontrol edin, SSL gerekli

### 3. JWT Secret Error
**Hata:** `JWT_SECRET environment variable is required`
**Çözüm:** Environment variables'a JWT_SECRET ekleyin

## Test Edilecek Admin Özellikleri

Deploy sonrası kontrol edilecekler:
- [ ] Admin login çalışıyor mu?
- [ ] Dashboard istatistikleri görünüyor mu?
- [ ] Kullanıcı listesi gerçek verileri gösteriyor mu?
- [ ] Sipariş yönetimi çalışıyor mu?
- [ ] Placeholder resimler yükleniyor mu?

## Performance Optimizations

Build size optimizasyonları zaten mevcut:
- Static page generation: 96 sayfa
- Bundle size: ~139kB (ana sayfa)
- Middleware: 55.2kB

**Sonuç:** Proje Vercel'e deploy edilmeye hazır! 🚀 