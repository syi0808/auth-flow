'use client';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { JwtPayload, verify } from 'jsonwebtoken';

export const authenticate = async (next: (request: Request & { payload: JwtPayload }) => any) => (request: Request) => {
  const token = cookies().get('Authorization');

  if (token) {
    try {
      const payload = verify(token as unknown as string, process.env.JWT_SECRET as string) as JwtPayload;

      return next({ ...request, payload });
    } catch (err) {
      return NextResponse.json({ error: `${err}` }, { status: 500 });
    }
  }

  return new NextResponse(null, { status: 401 });
};
