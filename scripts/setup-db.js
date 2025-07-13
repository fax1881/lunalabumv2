#!/usr/bin/env node

/**
 * Database Setup Script
 * Supports multiple database providers based on environment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Database Setup Wizard');
console.log('=========================\n');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('📝 Creating .env file...\n');
  
  const envContent = `# Database Configuration
# Choose one of the following setups:

# Option 1: Local SQLite (Quick start)
DATABASE_URL="file:./dev.db"

# Option 2: Supabase (Recommended for production)
# DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@[PROJECT_ID].supabase.co:5432/postgres"
# DIRECT_URL="postgresql://postgres:[YOUR_PASSWORD]@[PROJECT_ID].supabase.co:5432/postgres"

# Option 3: Vercel Postgres
# DATABASE_URL="your-vercel-postgres-url"
# POSTGRES_URL_NON_POOLING="your-vercel-postgres-direct-url"

# JWT Secret (Generate a strong secret for production)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# Environment
NODE_ENV="development"
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created with default SQLite configuration');
}

console.log('📋 Available Database Options:');
console.log('1. 🗄️  SQLite (Local development)');
console.log('2. 🐘 Supabase PostgreSQL (Recommended)');
console.log('3. 🔗 Vercel Postgres');
console.log('4. 🏠 Local PostgreSQL (Docker)\n');

console.log('🔧 Setup Instructions:');
console.log('');

console.log('For Supabase (Recommended):');
console.log('1. Go to https://supabase.com');
console.log('2. Create a new project');
console.log('3. Go to Settings > Database');
console.log('4. Copy the connection string');
console.log('5. Update DATABASE_URL in .env');
console.log('');

console.log('For Vercel Postgres:');
console.log('1. Go to Vercel Dashboard');
console.log('2. Go to Storage > Create Database');
console.log('3. Select Postgres');
console.log('4. Copy the connection strings');
console.log('5. Add to Vercel Environment Variables');
console.log('');

console.log('⚡ Quick Commands:');
console.log('npm run db:migrate  - Run database migrations');
console.log('npm run db:seed     - Seed with sample data');
console.log('npm run db:studio   - Open Prisma Studio');
console.log('npm run db:reset    - Reset database (DEV ONLY)'); 