import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, createPixPayment, PLANS } from '@/lib/asaas';

export async function POST(req: NextRequest) {
  try {
    const { planType, userId, userEmail } = await req.json();

    // Validações
    if (!planType || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Dados obrigatórios: planType, userId, userEmail' },
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

    // Criar checkout hospedado (usuário escolhe PIX ou cartão na página do Asaas)
    const session = await createCheckoutSession(planType, userId, userEmail);
    
    return NextResponse.json({ 
      checkoutUrl: session.url,
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