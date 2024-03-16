import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const imageSourceDirectory = path.join(process.cwd(), 'images/');

export async function GET(_request: Request, { params }: { params: { imageName: string } }) {
  const { imageName } = params;

  const image = await readFile(path.join(imageSourceDirectory, imageName));

  return new NextResponse(image);
}
