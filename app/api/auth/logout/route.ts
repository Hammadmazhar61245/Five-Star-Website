import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Immediately expires the cookie
    path: '/',
  });
  return response;
}
