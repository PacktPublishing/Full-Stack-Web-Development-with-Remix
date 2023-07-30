import { createCookie } from '@remix-run/node';

const visitorCookie = createCookie('visitor-cookie', {
  maxAge: 60 * 5, // 5 minutes
});

type VisitorCookieData = {
  redirectUrl?: string;
};

export async function getVisitorCookieData(request: Request): Promise<VisitorCookieData> {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = await visitorCookie.parse(cookieHeader);
  return cookie && cookie.redirectUrl ? cookie : { redirectUrl: undefined };
}

export async function setVisitorCookieData(data: VisitorCookieData, headers = new Headers()): Promise<Headers> {
  const cookie = await visitorCookie.serialize(data);
  headers.append('Set-Cookie', cookie);
  return headers;
}
