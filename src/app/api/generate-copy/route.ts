import { NextRequest, NextResponse } from 'next/server'
import { generateCopy, type CopyRequest } from '@/lib/openai'
import { Database } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // Por enquanto usar demo user - depois integrar com auth real
    const userId = request.headers.get('x-user-id') || 'demo-user'
    
    console.log(`🔍 Generate Copy - userId: ${userId}`)
    
    // Garantir que usuário existe - criar se não existir
    let user = await Database.getUser(userId);
    if (!user) {
      console.log(`👤 Criando usuário novo: ${userId}`)
      user = await Database.upsertUser({
        userId,
        email: `${userId}@copybr.temp`,
        planType: 'free',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        monthlyUsage: 0,
        emailVerified: false
      });
    }
    
    // Verificar se usuário pode gerar copy
    const canGenerate = await Database.canGenerateCopy(userId);
    
    console.log(`📊 Can generate check:`, canGenerate)
    
    if (!canGenerate.allowed) {
      console.log(`❌ Blocked: ${canGenerate.reason}`)
      return NextResponse.json(
        { 
          error: 'Limite excedido',
          message: canGenerate.reason,
          usage: canGenerate.usage,
          limit: canGenerate.limit,
          userId: userId
        },
        { status: 403 }
      );
    }
    
    const body = await request.json() as CopyRequest
    
    // Validação básica
    if (!body.template || !body.input?.trim()) {
      return NextResponse.json(
        { error: 'Template e descrição são obrigatórios' },
        { status: 400 }
      )
    }

    if (body.input.length > 1000) {
      return NextResponse.json(
        { error: 'Descrição muito longa (máximo 1000 caracteres)' },
        { status: 400 }
      )
    }

    // Aqui você pode implementar:
    // - Verificação de autenticação
    // - Limites de uso por plano
    // - Rate limiting
    // - Logs de uso

    // Gerar copy
    const results = await generateCopy(body)
    
    // Incrementar uso do usuário
    await Database.incrementUsage(userId, 1);
    
    // Buscar dados atualizados
    const updatedCanGenerate = await Database.canGenerateCopy(userId);
    
    return NextResponse.json({ 
      success: true, 
      data: results,
      usage: {
        current: updatedCanGenerate.usage || 0,
        limit: updatedCanGenerate.limit || 0,
        remaining: updatedCanGenerate.limit === -1 ? -1 : (updatedCanGenerate.limit || 0) - (updatedCanGenerate.usage || 0)
      }
    })
    
  } catch (error) {
    console.error('Erro na API de geração:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}