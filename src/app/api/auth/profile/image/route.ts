import { prisma } from '@/utils/server/db';
import { authenticate } from '@/utils/server/middleware';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const imageSourceDirectory = path.join(process.cwd(), 'images/');

export const POST = authenticate(async function (request, { tokenPayload }) {
  const formData = await request.formData();

  const image = formData.get('image') as File;
  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = Date.now() + image.name.replaceAll(' ', '_');

  try {
    await writeFile(path.join(imageSourceDirectory, filename), buffer);

    await prisma.user.update({ data: { image: filename }, where: { id: tokenPayload.id } });

    return new NextResponse(null, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
});
