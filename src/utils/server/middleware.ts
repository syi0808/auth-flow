import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { JwtPayload, verify } from 'jsonwebtoken';

type Handler<T> = (request: Request, payload: T) => Promise<any>;
type Middleware<T> = (next: Handler<T>) => (request: Request) => Promise<NextResponse> | ReturnType<Handler<T>>;

export const authenticate: Middleware<{ tokenPayload: JwtPayload }> = (next) => async (request) => {
  const token = cookies().get('token')?.value;

  if (token) {
    try {
      const payload = verify(token as unknown as string, process.env.JWT_SECRET as string) as JwtPayload;

      return await next(request, { tokenPayload: payload });
    } catch (err) {
      return NextResponse.json({ error: `${err}` }, { status: 500 });
    }
  }

  return new NextResponse(null, { status: 401 });
};
