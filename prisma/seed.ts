import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  {
    qrCode: "ITEM-001-LAPTOP",
    name: "Laptop Asus ROG Strix",
    description: "Gaming laptop dengan RTX 4060, RAM 16GB, SSD 512GB",
    quantity: 3,
    storageLocation: "Gudang A, Rak 1, Slot A1",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-002-MONITOR",
    name: 'Monitor LG UltraWide 34"',
    description: "Monitor ultrawide 34 inch, 144Hz, resolusi 3440x1440",
    quantity: 5,
    storageLocation: "Gudang A, Rak 1, Slot A2",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-003-KEYBOARD",
    name: "Keyboard Mechanical Keychron K2",
    description: "Keyboard mechanical wireless, brown switch, RGB backlight",
    quantity: 10,
    storageLocation: "Gudang A, Rak 2, Slot B1",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-004-MOUSE",
    name: "Mouse Logitech MX Master 3",
    description: "Mouse wireless ergonomis, sensor 8000 DPI",
    quantity: 8,
    storageLocation: "Gudang A, Rak 2, Slot B2",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-005-HEADSET",
    name: "Headset Sony WH-1000XM5",
    description: "Headphone wireless dengan noise cancelling",
    quantity: 4,
    storageLocation: "Gudang A, Rak 3, Slot C1",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-006-WEBCAM",
    name: "Webcam Logitech C920",
    description: "Webcam Full HD 1080p dengan mikrofon stereo",
    quantity: 6,
    storageLocation: "Gudang A, Rak 3, Slot C2",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-007-TABLET",
    name: 'iPad Pro 12.9" M2',
    description: "Tablet Apple dengan chip M2, layar Liquid Retina XDR",
    quantity: 2,
    storageLocation: "Gudang B, Rak 1, Slot A1",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-008-CHARGER",
    name: "Charger Anker PowerPort 65W",
    description: "Charger USB-C dengan teknologi GaN, 65W output",
    quantity: 15,
    storageLocation: "Gudang B, Rak 1, Slot A2",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-009-CABLE",
    name: "Kabel USB-C to USB-C 2m",
    description: "Kabel USB-C braided, mendukung fast charging 100W",
    quantity: 20,
    storageLocation: "Gudang B, Rak 2, Slot B1",
    imageUrl: null,
  },
  {
    qrCode: "ITEM-010-SSD",
    name: "SSD Samsung 980 PRO 1TB",
    description: "NVMe SSD dengan kecepatan baca hingga 7000 MB/s",
    quantity: 7,
    storageLocation: "Gudang B, Rak 2, Slot B2",
    imageUrl: null,
  },
];

async function main() {
  console.log("Seeding items...");

  for (const item of items) {
    const existingItem = await prisma.item.findUnique({
      where: { qrCode: item.qrCode },
    });

    if (!existingItem) {
      await prisma.item.create({ data: item });
      console.log(`Created: ${item.name}`);
    } else {
      console.log(`Skipped (already exists): ${item.name}`);
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
