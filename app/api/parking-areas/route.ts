import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const parkingAreas = await prisma.parkingArea.findMany({
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(parkingAreas, { status: 200 });
  } catch (error) {
    console.error('Fetch parking areas error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    if (
      !name ||
      !location ||
      !type ||
      capacity === undefined ||
      available === undefined ||
      !price ||
      latitude === undefined ||
      longitude === undefined ||
      !operatingHours
    ) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const parkingArea = await prisma.parkingArea.create({
      data: {
        name,
        location,
        type,
        capacity: Number(capacity),
        available: Number(available),
        price,
        latitude: Number(latitude),
        longitude: Number(longitude),
        operatingHours,
      },
    });

    return NextResponse.json(parkingArea, { status: 201 });
  } catch (error) {
    console.error('Create parking area error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
