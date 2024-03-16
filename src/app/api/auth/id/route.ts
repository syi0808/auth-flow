import { prisma } from '@/utils/server/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const nameBody = z.object({
  id: z.string(),
});

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const response = nameBody.parse(data);

    const user = await prisma.user.findFirst({
      where: { id: response.id },
    });

    if (user) {
      return new NextResponse(null, { status: 409 });
    } else {
      return new NextResponse(null);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
