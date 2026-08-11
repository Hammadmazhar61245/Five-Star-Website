import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// ⚠️ CHANGE THESE TWO LINES BEFORE GOING LIVE:
const ADMIN_EMAIL = 'admin@fivestar.com';
// Replace the string below with your actual bcrypt hash (use the node command provided above)
const ADMIN_PASSWORD_HASH = '$2b$10$IvqQllvsievBahaSQ4SGE.Jw6RQ3TS79HjASmwU4vuvrkhor8DRku'; 

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isValid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}
