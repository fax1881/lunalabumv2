import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Ürünleri listele
export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}

// Yeni ürün ekle
export async function POST(req: NextRequest) {
  const {
    name,
    description,
    price,
    image,
    category,
    subcategory,
    sizes,
    prices,
    features,
    inStock
  } = await req.json();
  if (!name || price === undefined) {
    return NextResponse.json({ error: 'Ürün adı ve fiyat zorunlu.' }, { status: 400 });
  }
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      image,
      category,
      subcategory,
      sizes: sizes || [],
      prices: prices || [],
      features: features || [],
      inStock: inStock !== undefined ? inStock : true
    }
  });
  return NextResponse.json(product);
} 