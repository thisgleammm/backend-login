import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateQRCodeString,
  createAndUploadQRCode,
} from "@/lib/qr-generator";

// GET /api/items - List semua items dengan search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";

    const items = await prisma.item.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                  { qrCode: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          location
            ? {
                storageLocation: { contains: location, mode: "insensitive" },
              }
            : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Fetch items error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST /api/items - Create item baru dengan auto-generate QR Code
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { qrCode, name, description, quantity, storageLocation, imageUrl } =
      body;

    // Validasi required fields (qrCode sekarang opsional)
    if (!name || !storageLocation) {
      return NextResponse.json(
        { message: "name dan storageLocation wajib diisi" },
        { status: 400 },
      );
    }

    // Generate qrCode jika tidak dikirim
    const finalQrCode = qrCode || generateQRCodeString();

    // Cek apakah qrCode sudah ada
    const existingItem = await prisma.item.findUnique({
      where: { qrCode: finalQrCode },
    });

    if (existingItem) {
      return NextResponse.json(
        { message: "Item dengan QR Code tersebut sudah ada" },
        { status: 409 },
      );
    }

    // Generate dan upload gambar QR ke Vercel Blob
    let qrImageUrl: string | null = null;
    try {
      qrImageUrl = await createAndUploadQRCode(finalQrCode);
    } catch (qrError) {
      console.error("Error generating QR image:", qrError);
      // Lanjutkan tanpa QR image jika gagal
    }

    const item = await prisma.item.create({
      data: {
        qrCode: finalQrCode,
        qrImageUrl,
        name,
        description: description || null,
        quantity: quantity || 1,
        storageLocation,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create item error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
