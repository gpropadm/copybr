import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    // Pegar userId do header ou usar demo
    const userId = req.headers.get('x-user-id') || 'demo-user';
    
    // Buscar usuário no banco
    let user = await Database.getUser(userId);
    
    // Se não existe, criar usuário gratuito
    if (!user) {
      console.log(`👤 Criando novo usuário: ${userId}`)
      user = await Database.upsertUser({
        userId,
        email: 'demo@copybr.com.br',
        planType: 'free',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        monthlyUsage: 0, // Garantir que inicia com 0
        emailVerified: false
      });
      console.log(`✅ Usuário criado:`, user)
    } else {
      console.log(`👤 Usuário existente:`, user)
    }

    return NextResponse.json({
      userId: user.userId,
      email: user.email,
      planType: user.planType,
      status: user.status,
      monthlyUsage: user.monthlyUsage, // Copies geradas
      wordsUsed: user.monthlyUsage, // Por enquanto, mesmo valor (1 copy = 1 palavra para simplicidade)
      currentPeriodEnd: user.currentPeriodEnd,
      limits: {
        free: 10,
        starter: 100,
        pro: 1000,
        business: -1 // Ilimitado
      },
      wordLimits: {
        free: 2000,    // 2000 palavras para FREE
        starter: -1,   // Ilimitado para pagos
        pro: -1,       // Ilimitado para pagos  
        business: -1   // Ilimitado para pagos
      }
    });

  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, userId = 'demo-user' } = await req.json();

    if (action === 'increment_usage') {
      // Verificar se pode gerar copy
      const canGenerate = await Database.canGenerateCopy(userId);
      
      if (!canGenerate.allowed) {
        return NextResponse.json({
          success: false,
          error: canGenerate.reason,
          usage: canGenerate.usage,
          limit: canGenerate.limit
        }, { status: 403 });
      }

      // Incrementar uso
      const user = await Database.incrementUsage(userId);
      
      return NextResponse.json({
        success: true,
        usage: user?.monthlyUsage || 0,
        limit: canGenerate.limit
      });
    }

    return NextResponse.json(
      { error: 'Ação inválida' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Erro ao processar ação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}