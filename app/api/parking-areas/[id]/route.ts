import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const parkingArea = await prisma.parkingArea.findUnique({
      where: { id },
    });

    if (!parkingArea) {
      return NextResponse.json(
        { message: 'Parking area not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(parkingArea, { status: 200 });
  } catch (error) {
    console.error('Fetch parking area error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      location,
      type,
      capacity,
      available,
      price,
      latitude,
      longitude,
      operatingHours,
    } = body;

    const existingParkingArea = await prisma.parkingArea.findUnique({
      where: { id },
    });

    if (!existingParkingArea) {
      return NextResponse.json(
        { message: 'Parking area not found' },
        { status: 404 }
      );
    }

    const updatedParkingArea = await prisma.parkingArea.update({
      where: { id },
      data: {
        name,
        location,
        type,
        capacity: capacity !== undefined ? Number(capacity) : undefined,
        available: available !== undefined ? Number(available) : undefined,
        price,
        latitude: latitude !== undefined ? Number(latitude) : undefined,
        longitude: longitude !== undefined ? Number(longitude) : undefined,
        operatingHours,
      },
    });

    return NextResponse.json(updatedParkingArea, { status: 200 });
  } catch (error) {
    console.error('Update parking area error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const existingParkingArea = await prisma.parkingArea.findUnique({
      where: { id },
    });

    if (!existingParkingArea) {
      return NextResponse.json(
        { message: 'Parking area not found' },
        { status: 404 }
      );
    }

    await prisma.parkingArea.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Parking area deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete parking area error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
