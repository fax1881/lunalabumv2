#!/usr/bin/env node

/**
 * Database Provider Switcher
 * Automatically switches between SQLite and PostgreSQL based on environment
 */

const fs = require('fs');
const path = require('path');

const SCHEMA_PATH = path.join(process.cwd(), 'prisma', 'schema.prisma');

// Database configurations
const DB_CONFIGS = {
  sqlite: {
    provider: 'sqlite',
    url: 'env("DATABASE_URL")',
    directUrl: null
  },
  postgresql: {
    provider: 'postgresql', 
    url: 'env("DATABASE_URL")',
    directUrl: 'env("DIRECT_URL")'
  }
};

function updateSchema(dbType) {
  console.log(`🔄 Switching to ${dbType.toUpperCase()}...`);
  
  let schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  const config = DB_CONFIGS[dbType];
  
  // Replace datasource block
  const datasourcePattern = /datasource db \{[\s\S]*?\}/;
  
  let newDatasource = `datasource db {
  provider = "${config.provider}"
  url      = ${config.url}`;
  
  if (config.directUrl) {
    newDatasource += `\n  directUrl = ${config.directUrl}`;
  }
  
  newDatasource += '\n}';
  
  schema = schema.replace(datasourcePattern, newDatasource);
  
  fs.writeFileSync(SCHEMA_PATH, schema);
  console.log(`✅ Schema updated for ${dbType.toUpperCase()}`);
}

// Get command line argument
const dbType = process.argv[2];

if (!dbType || !DB_CONFIGS[dbType]) {
  console.log('Usage: node scripts/switch-db.js [sqlite|postgresql]');
  console.log('');
  console.log('Examples:');
  console.log('  npm run db:switch sqlite     - Switch to SQLite');
  console.log('  npm run db:switch postgresql - Switch to PostgreSQL');
  process.exit(1);
}

updateSchema(dbType); 