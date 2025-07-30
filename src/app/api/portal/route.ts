import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId é obrigatório' },
        { status: 400 }
      );
    }

    // Portal de cobrança não implementado ainda no Asaas
    // Por enquanto, redirecionar para dashboard do usuário
    return NextResponse.json({ 
      portalUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://copybr.vercel.app'}/dashboard/planos`
    });

  } catch (error) {
    console.error('Erro ao criar portal:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}