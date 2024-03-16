import { prisma } from '@/utils/server/db';
import { authenticate } from '@/utils/server/middleware';

export const GET = authenticate(async function (request) {
  const {} = await request.json();
});

export const PUT = authenticate(async function (request) {
  const {} = await request.json();
});
