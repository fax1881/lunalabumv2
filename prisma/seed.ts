import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Örnek ürünler
  const products = [
    {
      name: 'Profesyonel Fotoğraf Baskısı',
      description: 'Yüksek kaliteli fotoğraf baskısı',
      price: 25.00,
      category: 'Fotoğraf Baskısı',
      image: '/api/placeholder/300/200',
      inStock: true,
      sizes: JSON.stringify(['10x15', '13x18', '15x21', '20x30']),
      features: JSON.stringify(['Yüksek çözünürlük', 'Su geçirmez', 'UV korumalı'])
    },
    {
      name: 'Canvas Tablo',
      description: 'Tuval üzerine profesyonel baskı',
      price: 85.00,
      category: 'Canvas Tablo',
      image: '/api/placeholder/300/200',
      inStock: true,
      sizes: JSON.stringify(['20x30', '30x40', '40x60']),
      features: JSON.stringify(['Tuval üzerine baskı', 'Çerçeve hazır', 'Dayanıklı'])
    },
    {
      name: 'Foto Takvim',
      description: 'Kişisel fotoğraflarınızla takvim',
      price: 45.00,
      category: 'Takvim',
      image: '/api/placeholder/300/200',
      inStock: true,
      sizes: JSON.stringify(['A4', 'A3']),
      features: JSON.stringify(['12 sayfa', 'Kişisel tasarım', 'Kaliteli kağıt'])
    },
    {
      name: 'Fotokitap',
      description: 'Anılarınızı kitap haline getirin',
      price: 65.00,
      category: 'Fotokitap',
      image: '/api/placeholder/300/200',
      inStock: true,
      sizes: JSON.stringify(['15x20', '20x30', '30x30']),
      features: JSON.stringify(['Ciltli', 'Mat kağıt', 'Kişisel tasarım'])
    }
  ];

  // Ürünleri ekle
  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name }
    });
    
    if (!existingProduct) {
      await prisma.product.create({
        data: product
      });
    }
  }

  console.log('✅ Products seeded');

  // Örnek kullanıcılar (admin'i zaten var)
  const users = [
    {
      name: 'Test Kullanıcı',
      email: 'test@example.com',
      password: '$2b$12$test.hash.password', // Plain: testpass
      role: 'user'
    },
    {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      password: '$2b$12$test.hash.password',
      role: 'user'
    },
    {
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      password: '$2b$12$test.hash.password',
      role: 'user'
    }
  ];

  // Kullanıcıları ekle (admin hariç)
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    });
  }

  console.log('✅ Users seeded');

  // Örnek siparişler
  const user1 = await prisma.user.findUnique({ where: { email: 'test@example.com' } });
  const user2 = await prisma.user.findUnique({ where: { email: 'ahmet@example.com' } });
  const product1 = await prisma.product.findFirst({ where: { name: 'Profesyonel Fotoğraf Baskısı' } });
  const product2 = await prisma.product.findFirst({ where: { name: 'Canvas Tablo' } });

  if (user1 && user2 && product1 && product2) {
    // Sipariş 1
    const existingOrder1 = await prisma.order.findFirst({ where: { userId: user1.id } });
    if (!existingOrder1) {
      await prisma.order.create({
        data: {
          orderNumber: `ORD-${Date.now()}-1`,
          userId: user1.id,
          totalAmount: 125.50,
          status: 'Hazırlanıyor',
          adres: 'İstanbul, Kadıköy, Test Mahallesi No:123',
          orderItems: {
            create: [
              {
                productId: product1.id,
                quantity: 2,
                price: 25.00,
                size: '13x18'
              },
              {
                productId: product2.id,
                quantity: 1,
                price: 85.00,
                size: '20x30'
              }
            ]
          }
        }
      });
    }

    // Sipariş 2
    const existingOrder2 = await prisma.order.findFirst({ where: { userId: user2.id } });
    if (!existingOrder2) {
      await prisma.order.create({
        data: {
          orderNumber: `ORD-${Date.now()}-2`,
          userId: user2.id,
          totalAmount: 65.00,
          status: 'Teslim Edildi',
          adres: 'Ankara, Çankaya, Örnek Sokak No:456',
          orderItems: {
            create: [
              {
                productId: product1.id,
                quantity: 1,
                price: 25.00,
                size: '15x21'
              }
            ]
          }
        }
      });
    }

    console.log('✅ Orders seeded');
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 