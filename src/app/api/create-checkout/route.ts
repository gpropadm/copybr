import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, type PlanType } from '@/lib/stripe'
import { getServerSession } from 'next-auth/next'

export async function POST(request: NextRequest) {
  try {
    const { planType, isAnnual = false } = await request.json()
    
    // Verificar autenticação (opcional para demonstração)
    // const session = await getServerSession()
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: 'Usuário não autenticado' },
    //     { status: 401 }
    //   )
    // }

    // Para demonstração, vamos usar dados simulados
    const userId = 'demo-user-123'
    const userEmail = 'demo@copybr.com'
    
    // Validação básica
    if (!planType) {
      return NextResponse.json(
        { error: 'Tipo de plano não fornecido' },
        { status: 400 }
      )
    }

    // Validar se o plano existe
    const validPlans: PlanType[] = ['starter', 'pro', 'business']
    if (!validPlans.includes(planType)) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    const session = await createCheckoutSession(planType, userId, userEmail)
    
    return NextResponse.json({ 
      success: true, 
      sessionId: session.id,
      url: session.url
    })
    
  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}