# 🐘 PostgreSQL Kurulum Rehberi

## 🎯 En Kolay Yöntem: Supabase (Ücretsiz)

### 1. Supabase Hesap Oluştur
```bash
# 1. https://supabase.com/ git
# 2. "Start your project" tıkla
# 3. GitHub ile giriş yap
```

### 2. Yeni Proje Oluştur
```bash
# 1. "New Project" tıkla
# 2. Organization seç
# 3. Proje adı: "lunalabumv2"
# 4. Database Password: güçlü bir şifre seç (kaydet!)
# 5. Region: Europe (closest to Turkey)
# 6. "Create new project" tıkla
```

### 3. Database URL'yi Al
```bash
# 1. Sol menüden "Settings" > "Database"
# 2. "Connection string" bölümünde "URI" seç
# 3. URL'yi kopyala (şöyle görünür):
# postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

### 4. .env Dosyasını Güncelle
```bash
# Local + Production aynı PostgreSQL
DATABASE_URL="postgresql://postgres:[ŞIFRE]@db.[PROJECT-ID].supabase.co:5432/postgres"
JWT_SECRET="c1eef810a96e2bcf273092a8eb804dfffa90a0a0b7fd235913b799c577be51d3"
NODE_ENV="development"
```

## 🐳 Alternatif: Local Docker PostgreSQL

### 1. Docker PostgreSQL Çalıştır
```bash
docker run -d \
  --name lunalabum-postgres \
  -e POSTGRES_PASSWORD=lunalabum123 \
  -e POSTGRES_DB=lunalabumv2 \
  -e POSTGRES_USER=lunalabum \
  -p 5432:5432 \
  postgres:15
```

### 2. .env Dosyasını Güncelle
```bash
DATABASE_URL="postgresql://lunalabum:lunalabum123@localhost:5432/lunalabumv2"
JWT_SECRET="c1eef810a96e2bcf273092a8eb804dfffa90a0a0b7fd235913b799c577be51d3"
NODE_ENV="development"
```

## 🚀 Migration Adımları

### 1. Prisma Client Generate Et
```bash
npx prisma generate
```

### 2. Database'i Oluştur
```bash
npx prisma db push
```

### 3. Veri Kontrolü
```bash
npx prisma studio
```

## ✅ Avantajlar

**PostgreSQL Kullanmanın Faydaları:**
- 🎯 **Tek sistem**: Local ve production aynı
- 🚀 **Performans**: SQLite'dan çok daha hızlı
- 🔒 **Güvenlik**: Enterprise-level security
- 🌐 **Hosting**: Tüm platformlarda destekleniyor
- 📊 **Features**: Advanced SQL features
- 🔧 **Scaling**: Unlimited scaling capability

## 🛠️ Troubleshooting

### SSL Connection Error
```bash
# .env dosyasına ekle:
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### Connection Timeout
```bash
# URL'ye ekle:
DATABASE_URL="postgresql://user:pass@host:5432/db?connect_timeout=60"
```

### Migration Issues
```bash
# Schema reset
npx prisma migrate reset

# Force push
npx prisma db push --force-reset
```

---

**🎉 Şimdi sisteminiz tamamen PostgreSQL ile çalışıyor!** 