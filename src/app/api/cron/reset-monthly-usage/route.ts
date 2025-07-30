import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

// Esta API deve ser chamada por um cron job diário
// Vercel Cron, GitHub Actions, ou serviço externo

export async function GET(req: NextRequest) {
  try {
    // Verificar autorização (opcional - para segurança)
    const authHeader = req.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const now = new Date();
    const allUsers = await Database.getAllUsers();
    let resetCount = 0;

    for (const user of allUsers) {
      // Verificar se passou do período atual
      if (now > user.currentPeriodEnd) {
        // Resetar uso mensal
        await Database.resetMonthlyUsage(user.userId);
        
        // Estender período para próximo mês (apenas para planos gratuitos)
        if (user.planType === 'free') {
          await Database.upsertUser({
            userId: user.userId,
            currentPeriodEnd: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // +30 dias
          });
        }
        
        resetCount++;
        console.log(`🔄 Reset mensal para usuário ${user.userId} (plano: ${user.planType})`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reset executado para ${resetCount} usuários`,
      resetCount,
      executedAt: now.toISOString()
    });

  } catch (error) {
    console.error('Erro no reset mensal:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Também permitir POST para flexibilidade
export async function POST(req: NextRequest) {
  return GET(req);
}