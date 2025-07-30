import { NextRequest, NextResponse } from 'next/server';
import { createBillingPortalSession } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId é obrigatório' },
        { status: 400 }
      );
    }

    // Criar sessão do portal de cobrança
    const session = await createBillingPortalSession(customerId);

    return NextResponse.json({ 
      portalUrl: session.url 
    });

  } catch (error) {
    console.error('Erro ao criar portal:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}