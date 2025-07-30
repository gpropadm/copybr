import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, createPixPayment, PLANS } from '@/lib/asaas';

export async function POST(req: NextRequest) {
  try {
    const { planType, userId, userEmail, paymentMethod = 'PIX' } = await req.json();

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

    if (!['PIX', 'CREDIT_CARD'].includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Método de pagamento inválido. Use PIX ou CREDIT_CARD' },
        { status: 400 }
      );
    }

    // Criar pagamento conforme método escolhido
    if (paymentMethod === 'PIX') {
      const pixPayment = await createPixPayment(planType, userId, userEmail);
      
      return NextResponse.json({ 
        paymentMethod: 'PIX',
        pixCode: pixPayment.pixCode,
        qrCode: pixPayment.qrCode,
        paymentId: pixPayment.paymentId
      });
    } else {
      // Criar sessão de checkout para cartão
      const session = await createCheckoutSession(planType, userId, userEmail, 'CREDIT_CARD');
      
      return NextResponse.json({ 
        paymentMethod: 'CREDIT_CARD',
        checkoutUrl: session.url,
        sessionId: session.id,
        paymentId: session.paymentId
      });
    }

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