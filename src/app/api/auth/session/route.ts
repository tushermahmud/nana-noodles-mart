import { NextResponse } from 'next/server';
import { getSession } from '@/actions/auth.actions';

export async function GET() {
  try {
    const session = await getSession();

    // Return only the necessary session data (not tokens for security)
    return NextResponse.json({
      isLoggedIn: session.isLoggedIn,
      role: session.role,
      user_id: session.user_id,
      username: session.username,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}
