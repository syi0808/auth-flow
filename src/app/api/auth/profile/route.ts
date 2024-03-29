import { prisma } from '@/utils/server/db';
import { authenticate } from '@/utils/server/middleware';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = authenticate(async function (_request, { tokenPayload }) {
  const user = await prisma.user.findFirst({ where: { id: tokenPayload.id } });

  return NextResponse.json(user);
});

const partialUser = z.object({
  name: z.string().optional(),
});

export const PUT = authenticate(async function (request, { tokenPayload }) {
  const body = request.json();

  try {
    const response = partialUser.parse(body);

    const user = await prisma.user.update({ data: response, where: { id: tokenPayload.id } });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(null, { status: 400 });
  }
});
