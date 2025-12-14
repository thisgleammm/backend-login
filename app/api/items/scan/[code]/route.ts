import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/items/scan/:code - Scan QR Code untuk cari item
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const code = (await params).code;

    if (!code) {
      return NextResponse.json(
        { found: false, item: null, message: "QR Code tidak valid" },
        { status: 400 },
      );
    }

    const item = await prisma.item.findUnique({
      where: { qrCode: code },
    });

    if (!item) {
      return NextResponse.json(
        {
          found: false,
          item: null,
          message: "Item dengan QR Code tersebut tidak ditemukan",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        found: true,
        item,
        message: `Item ditemukan di ${item.storageLocation}`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Scan QR error:", error);
    return NextResponse.json(
      { found: false, item: null, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
