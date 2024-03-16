import { prisma } from '@/utils/server/db';
import { authenticate } from '@/utils/server/middleware';

export const PUT = authenticate(async function (request: Request) {
  const {} = await request.json();
});
