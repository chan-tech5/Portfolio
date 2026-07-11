import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface AttemptRecord {
  count: number;
  lockUntil: number;
}

const failedAttempts = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 1000; // 30 seconds

function getIpAddress(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'global_ip';
}

export async function POST(request: Request) {
  const ip = getIpAddress(request);
  const now = Date.now();
  
  // Rate limiting lockout check
  const record = failedAttempts.get(ip);
  if (record && record.count >= MAX_ATTEMPTS && now < record.lockUntil) {
    const remainingTime = Math.ceil((record.lockUntil - now) / 1000);
    return NextResponse.json({ 
      error: `Too many failed attempts. Locked. Please wait ${remainingTime}s.`,
      locked: true,
      remainingTime
    }, { status: 429 });
  }

  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "Chandru@Portfolio2026!";

    if (password === expectedPassword) {
      // Clear failed attempts upon success
      failedAttempts.delete(ip);

      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      });

      return NextResponse.json({ success: true });
    } else {
      // Track failed attempt
      const count = record ? (now > record.lockUntil ? 1 : record.count + 1) : 1;
      const lockUntil = count >= MAX_ATTEMPTS ? now + LOCKOUT_DURATION : 0;
      failedAttempts.set(ip, { count, lockUntil });

      const remainingAttempts = MAX_ATTEMPTS - count;
      if (remainingAttempts <= 0) {
        return NextResponse.json({ 
          error: "Too many failed attempts. Locked for 30 seconds.",
          locked: true,
          remainingTime: 30
        }, { status: 429 });
      } else {
        return NextResponse.json({ 
          error: `Incorrect passphrase. ${remainingAttempts} attempts remaining.`,
          remainingAttempts
        }, { status: 401 });
      }
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const isAuthenticated = session?.value === 'true';
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
