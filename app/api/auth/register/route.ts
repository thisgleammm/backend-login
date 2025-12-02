import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nim, email, password } = body;

    if (!name || !nim || !email || !password) {
      return NextResponse.json(
        { message: 'Name, NIM, Email, and Password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { nim }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this Email or NIM already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        nim,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully', user: { id: user.id, name: user.name, email: user.email, nim: user.nim } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
