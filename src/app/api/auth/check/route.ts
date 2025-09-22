import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    // Direct session access without triggering any API calls
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

    return NextResponse.json({
      isLoggedIn: session.isLoggedIn || false,
      username: session.username || null,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      isLoggedIn: false,
      username: null,
    });
  }
}
