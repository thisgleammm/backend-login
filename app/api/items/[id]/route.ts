import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/items/:id - Get item by ID
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseInt((await params).id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { message: "Item tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("Fetch item error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT /api/items/:id - Update item
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseInt((await params).id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const { qrCode, name, description, quantity, storageLocation, imageUrl } =
      body;

    // Check if item exists
    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { message: "Item tidak ditemukan" },
        { status: 404 },
      );
    }

    // Check if new qrCode conflicts with another item
    if (qrCode && qrCode !== existingItem.qrCode) {
      const conflictItem = await prisma.item.findUnique({
        where: { qrCode },
      });
      if (conflictItem) {
        return NextResponse.json(
          { message: "QR Code sudah digunakan item lain" },
          { status: 409 },
        );
      }
    }

    const updatedItem = await prisma.item.update({
      where: { id },
      data: {
        qrCode: qrCode ?? existingItem.qrCode,
        name: name ?? existingItem.name,
        description:
          description !== undefined ? description : existingItem.description,
        quantity: quantity ?? existingItem.quantity,
        storageLocation: storageLocation ?? existingItem.storageLocation,
        imageUrl: imageUrl !== undefined ? imageUrl : existingItem.imageUrl,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Update item error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE /api/items/:id - Delete item
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseInt((await params).id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { message: "Item tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.item.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Item berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete item error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
