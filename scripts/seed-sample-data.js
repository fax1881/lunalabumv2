const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding sample data...');

  // Sample Templates
  const templates = [
    {
      name: 'Klasik Fotoğraf Şablonu',
      description: 'Standart fotoğraf baskısı için basit şablon',
      category: 'fotograf-baskisi',
      thumbnail: '/images/templates/classic-photo.jpg',
      width: 1050,
      height: 1500,
      isActive: true,
      isPremium: false,
      price: 0
    },
    {
      name: 'Modern Canvas Tasarım',
      description: 'Çerçeveli canvas için modern şablon',
      category: 'canvas',
      thumbnail: '/images/templates/modern-canvas.jpg',
      width: 2000,
      height: 3000,
      isActive: true,
      isPremium: true,
      price: 15
    },
    {
      name: 'Fotokitap Kapak Premium',
      description: 'Premium fotokitap kapağı tasarımı',
      category: 'fotokitap',
      thumbnail: '/images/templates/photobook-cover.jpg',
      width: 2100,
      height: 3000,
      isActive: true,
      isPremium: true,
      price: 10
    },
    {
      name: 'Bez Üzerine Vintage',
      description: 'Vintage tarzı bez baskı şablonu',
      category: 'bez-baski',
      thumbnail: '/images/templates/vintage-fabric.jpg',
      width: 2000,
      height: 2400,
      isActive: true,
      isPremium: false,
      price: 0
    }
  ];

  // Sample Frame Sizes
  const frameSizes = [
    // Fotoğraf Baskısı
    { category: 'fotograf-baskisi', name: '9x13 cm', width: 900, height: 1300, price: 7.90, sortOrder: 1 },
    { category: 'fotograf-baskisi', name: '10x15 cm', width: 1000, height: 1500, price: 8.90, sortOrder: 2 },
    { category: 'fotograf-baskisi', name: '13x18 cm', width: 1300, height: 1800, price: 14.90, sortOrder: 3 },
    { category: 'fotograf-baskisi', name: '15x21 cm', width: 1500, height: 2100, price: 16.90, sortOrder: 4 },
    { category: 'fotograf-baskisi', name: '20x30 cm', width: 2000, height: 3000, price: 49.90, sortOrder: 5 },
    
    // Canvas
    { category: 'canvas', name: '20x30 cm', width: 2000, height: 3000, price: 85, sortOrder: 1 },
    { category: 'canvas', name: '30x40 cm', width: 3000, height: 4000, price: 125, sortOrder: 2 },
    { category: 'canvas', name: '40x60 cm', width: 4000, height: 6000, price: 175, sortOrder: 3 },
    { category: 'canvas', name: '50x70 cm', width: 5000, height: 7000, price: 225, sortOrder: 4 },
    { category: 'canvas', name: '60x80 cm', width: 6000, height: 8000, price: 285, sortOrder: 5 },
    
    // Fotokitap
    { category: 'fotokitap', name: '15x20 cm', width: 1500, height: 2000, price: 45, sortOrder: 1 },
    { category: 'fotokitap', name: '20x30 cm', width: 2000, height: 3000, price: 65, sortOrder: 2 },
    { category: 'fotokitap', name: '30x30 cm', width: 3000, height: 3000, price: 85, sortOrder: 3 },
    { category: 'fotokitap', name: '21x30 cm A4', width: 2100, height: 3000, price: 75, sortOrder: 4 },
    
    // Bez Baskı
    { category: 'bez-baski', name: 'Tişört S', width: 1800, height: 2200, price: 35, sortOrder: 1 },
    { category: 'bez-baski', name: 'Tişört M', width: 1900, height: 2300, price: 35, sortOrder: 2 },
    { category: 'bez-baski', name: 'Tişört L', width: 2000, height: 2400, price: 35, sortOrder: 3 },
    { category: 'bez-baski', name: 'Tişört XL', width: 2100, height: 2500, price: 35, sortOrder: 4 },
    { category: 'bez-baski', name: 'Çanta 35x40', width: 3500, height: 4000, price: 55, sortOrder: 5 }
  ];

  // Sample Product Options
  const productOptions = [
    {
      category: 'fotograf-baskisi',
      name: 'Kağıt Tipi',
      type: 'radio',
      options: JSON.stringify([
        { value: 'mat', label: 'Mat', price: 0 },
        { value: 'parlak', label: 'Parlak', price: 0 },
        { value: 'premium', label: 'Premium', price: 2 }
      ]),
      isRequired: true,
      sortOrder: 1
    },
    {
      category: 'canvas',
      name: 'Çerçeve Tipi',
      type: 'radio',
      options: JSON.stringify([
        { value: 'yok', label: 'Çerçevesiz', price: 0 },
        { value: 'ahsap', label: 'Ahşap Çerçeve', price: 25 },
        { value: 'metal', label: 'Metal Çerçeve', price: 35 }
      ]),
      isRequired: false,
      sortOrder: 1
    },
    {
      category: 'fotokitap',
      name: 'Kapak Tipi',
      type: 'radio',
      options: JSON.stringify([
        { value: 'yumusak', label: 'Yumuşak Kapak', price: 0 },
        { value: 'sert', label: 'Sert Kapak', price: 15 }
      ]),
      isRequired: true,
      sortOrder: 1
    }
  ];

  try {
    // Clear existing data
    await prisma.template.deleteMany();
    await prisma.frameSize.deleteMany();
    await prisma.productOption.deleteMany();

    console.log('Existing data cleared.');

    // Create templates
    for (const template of templates) {
      await prisma.template.create({
        data: template
      });
    }
    console.log(`Created ${templates.length} templates.`);

    // Create frame sizes
    for (const frameSize of frameSizes) {
      await prisma.frameSize.create({
        data: frameSize
      });
    }
    console.log(`Created ${frameSizes.length} frame sizes.`);

    // Create product options
    for (const option of productOptions) {
      await prisma.productOption.create({
        data: option
      });
    }
    console.log(`Created ${productOptions.length} product options.`);

    console.log('Sample data seeding completed!');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 