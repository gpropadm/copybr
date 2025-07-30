import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    const userId = 'demo-user';
    const user = await Database.getUser(userId);
    
    return NextResponse.json({
      user,
      currentPeriodEnd: user?.currentPeriodEnd,
      currentPeriodEndType: typeof user?.currentPeriodEnd,
      currentPeriodEndString: user?.currentPeriodEnd?.toString(),
      allUsers: await Database.getAllUsers()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
}