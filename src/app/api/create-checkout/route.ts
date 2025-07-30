import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, PLANS } from '@/lib/asaas';

export async function POST(req: NextRequest) {
  try {
    const { planType, isAnnual = false } = await req.json();

    // Validações
    if (!planType) {
      return NextResponse.json(
        { error: 'planType é obrigatório' },
        { status: 400 }
      );
    }

    if (!(planType in PLANS)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    if (planType === 'free') {
      return NextResponse.json(
        { error: 'Plano gratuito não requer checkout' },
        { status: 400 }
      );
    }

    // Para usuário de demonstração (implementar autenticação real depois)
    const userId = 'demo-user';
    const userEmail = 'demo@copybr.com.br';

    // Criar sessão de checkout hospedado (usuário escolhe PIX ou cartão)
    const session = await createCheckoutSession(planType, userId, userEmail, 'Demo User');

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id,
      paymentId: session.paymentId
    });

  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}