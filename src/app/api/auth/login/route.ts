import { prisma } from '@/utils/server/db';
import { compareSync } from 'bcrypt';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sign } from 'jsonwebtoken';

const loginBody = z.object({
  id: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  const data = await request.json();
  const response = loginBody.safeParse(data);

  if (!response.success) {
    return NextResponse.json({ error: response.error }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: response.data.id,
    },
  });

  if (user && compareSync(response.data.password, user.password)) {
    const { password, ...userWithoutPassword } = user;

    const token = sign({ ...userWithoutPassword }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    return NextResponse.json({ token });
  }

  return new NextResponse(null, { status: 400 });
}
