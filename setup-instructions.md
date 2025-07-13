# 🚀 LunaLabum v2 - Yeni Bilgisayar Kurulum Rehberi

## 📋 Gereksinimler
- Node.js v18+
- Git
- Code editor (VS Code önerilen)

## 🔧 Kurulum Adımları

### 1. Projeyi Clone Et
```bash
git clone https://github.com/fax1881/lunalabumv2.git
cd lunalabumv2
```

### 2. Dependencies Yükle
```bash
npm install
```

### 3. Environment Variables (.env dosyası oluştur)
Proje ana klasöründe `.env` dosyası oluşturup şu içeriği ekle:

```env
# Database Configuration (SQLite için doğru format - TIRNAKSız!)
DATABASE_URL=file:./prisma/dev.db

# JWT Secret (Güvenlik için değiştir!)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-for-development

# Environment
NODE_ENV=development

# Production için (Opsiyonel)
# DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/[DATABASE]
# DIRECT_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/[DATABASE]
```

### 4. Database Setup
```bash
# Prisma client generate et
npx prisma generate

# Database migrate et (tablolar oluşur)
npx prisma migrate dev --name init

# İlk admin kullanıcı oluştur (opsiyonel)
npx prisma db seed
```

### 5. Development Server Başlat
```bash
npm run dev
```

Proje şu adreste çalışacak: `http://localhost:3000`

## 🗃️ Database Management

### Database Reset (Gerekirse)
```bash
npm run db:reset
```

### Prisma Studio (Database Görüntüle)
```bash
npm run db:studio
```

### Production Database (Vercel/Supabase)
Production için `.env` dosyasında PostgreSQL URL'lerini güncelle:

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
DIRECT_URL="postgresql://username:password@host:5432/database"
```

## 🌟 Özellikler
- ✅ E-ticaret sistemi
- ✅ Admin paneli
- ✅ Fotoğraf editörü
- ✅ Kullanıcı kimlik doğrulama
- ✅ Sepet sistemi
- ✅ Mobil uyumlu
- ✅ Fotoğraf filtreleri

## 🆘 Yaygın Sorunlar

### Port Zaten Kullanımda
```bash
# Farklı port kullan
npm run dev -- -p 3001
```

### Database Hatası (Çözümü)
```bash
# 1. Corrupted database'i temizle
del prisma/dev.db

# 2. Fresh database oluştur
npx prisma migrate dev --name fresh_database

# 3. Prisma generate
npx prisma generate

# 4. Server restart
npm run dev
```

### Prisma Generate Hatası
```bash
# Node process'leri durdur
taskkill /f /im node.exe
npx prisma generate
```

## 📞 Destek
Sorun yaşarsan GitHub Issues veya iletişim kanallarından ulaş! 