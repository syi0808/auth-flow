import { prisma } from '@/utils/server/db';
import { user } from '@/utils/server/model';
import { hashSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const response = user.validator.parse(data);

    const createdUser = await prisma.user.create({
      data: {
        ...response,
        password: hashSync(response.password, 7),
      },
    });

    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
