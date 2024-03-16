import { prisma } from '@/utils/server/db';
import { user } from '@/utils/server/model';
import { hashSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const response = user.validator.safeParse(data);

  if (!response.success) {
    return NextResponse.json({ error: response.error }, { status: 400 });
  }

  const createdUser = await prisma.user.create({
    data: {
      ...response.data,
      password: hashSync(response.data.password, 7),
    },
  });

  return NextResponse.json(createdUser);
}
