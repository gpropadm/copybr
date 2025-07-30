import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || 'demo-user';
    
    console.log(`🔍 Debug User - userId: ${userId}`);
    
    // Buscar usuário
    const user = await Database.getUser(userId);
    console.log(`👤 User data:`, user);
    
    // Verificar se pode gerar copy
    const canGenerate = await Database.canGenerateCopy(userId);
    console.log(`📊 Can generate:`, canGenerate);
    
    // Listar todos os usuários para debug
    const allUsers = await Database.getAllUsers();
    console.log(`👥 All users:`, allUsers);
    
    return NextResponse.json({
      success: true,
      data: {
        userId,
        user,
        canGenerate,
        allUsers: allUsers.length,
        debugInfo: 'Check Vercel logs for detailed output'
      }
    });

  } catch (error) {
    console.error('❌ Debug error:', error);
    return NextResponse.json({
      error: 'Debug failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}