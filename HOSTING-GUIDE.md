# 🚀 Hosting Platformları Database Setup Rehberi

## 📋 Genel Bakış

Bu proje **SQLite** (local development) ve **PostgreSQL** (production) destekler. Tüm hosting platformlarında sorunsuz çalışması için aşağıdaki adımları takip edin.

## 🔧 Hosting Platformlarına Göre Kurulum

### 1. **Vercel** (Önerilen)

```bash
# 1. Vercel Postgres ekle
npm i @vercel/postgres

# 2. Environment Variables (Vercel Dashboard):
DATABASE_URL="postgresql://username:password@host:5432/database"
JWT_SECRET="your-super-secret-jwt-key-32-characters-minimum"
NODE_ENV="production"
```

**Vercel'de Schema Update:**
```javascript
// prisma/schema.prisma (production için)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. **Netlify**

```bash
# 1. Supabase veya Railway database kullan
# 2. Environment Variables:
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
JWT_SECRET="your-super-secret-jwt-key-32-characters-minimum"
NODE_ENV="production"
```

### 3. **Railway**

```bash
# 1. Railway PostgreSQL service ekle
# 2. Environment Variables:
DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway"
JWT_SECRET="your-super-secret-jwt-key-32-characters-minimum"
NODE_ENV="production"
```

### 4. **Heroku**

```bash
# 1. Heroku Postgres addon ekle
heroku addons:create heroku-postgresql:hobby-dev

# 2. Environment Variables:
DATABASE_URL="postgresql://user:password@hostname:5432/database_name"
JWT_SECRET="your-super-secret-jwt-key-32-characters-minimum"
NODE_ENV="production"
```

### 5. **DigitalOcean App Platform**

```bash
# 1. DigitalOcean Managed Database oluştur
# 2. Environment Variables:
DATABASE_URL="postgresql://doadmin:password@db-postgresql-fra1-12345-do-user-123456-0.b.db.ondigitalocean.com:25060/defaultdb"
JWT_SECRET="your-super-secret-jwt-key-32-characters-minimum"
NODE_ENV="production"
```

### 6. **AWS Amplify**

```bash
# 1. AWS RDS PostgreSQL instance oluştur
# 2. Environment Variables:
DATABASE_URL="postgresql://username:password@rds-instance.region.rds.amazonaws.com:5432/database"
JWT_SECRET="your-super-secret-jwt-key-32-characters-minimum"
NODE_ENV="production"
```

## 🔄 Production Deployment Adımları

### 1. Schema Production'a Hazırla

```bash
# Local development (SQLite)
DATABASE_URL="file:./prisma/dev.db"

# Production (PostgreSQL) - hosting platform'da ayarla
DATABASE_URL="postgresql://username:password@host:5432/database"
```

### 2. Database Migration

```bash
# Production'da çalıştır
npx prisma generate
npx prisma db push
```

### 3. Environment Variables Kontrol

```bash
# Gerekli variables:
DATABASE_URL="postgresql://..."
JWT_SECRET="minimum-32-characters"
NODE_ENV="production"
```

## 🛡️ Güvenlik Önerileri

### 1. JWT Secret Oluştur

```bash
# Güvenli JWT secret üret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Database Güvenliği

- SSL bağlantısı kullan
- Güçlü password seç
- IP whitelist ayarla
- Regular backup al

## 🔍 Debugging

### Common Issues:

1. **Database Connection Error**
   ```bash
   # Check environment variables
   echo $DATABASE_URL
   
   # Test connection
   npx prisma db push
   ```

2. **Migration Issues**
   ```bash
   # Reset database
   npx prisma migrate reset
   
   # Push schema
   npx prisma db push
   ```

3. **JWT Secret Error**
   ```bash
   # Generate new secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## 📊 Database Status Check

```bash
# Check current database
npx prisma db push

# Open database browser
npx prisma studio
```

## 🎯 Quick Start Commands

```bash
# Local development
npm run dev

# Production build
npm run build

# Database setup
npx prisma generate
npx prisma db push
```

## 🌐 Supported Hosting Platforms

✅ **Vercel** (Recommended)  
✅ **Netlify**  
✅ **Railway**  
✅ **Heroku**  
✅ **DigitalOcean**  
✅ **AWS Amplify**  
✅ **Google Cloud Run**  
✅ **Azure Static Web Apps**

---

**🎉 Artık tüm hosting platformlarında sorunsuz çalışabilirsiniz!** 