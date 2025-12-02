import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        nim: true,
        // Exclude password
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Fetch users error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
