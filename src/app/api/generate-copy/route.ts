import { NextRequest, NextResponse } from 'next/server'
import { generateCopy, type CopyRequest } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
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

    const results = await generateCopy(body)
    
    return NextResponse.json({ 
      success: true, 
      data: results,
      usage: {
        tokens: Math.floor(Math.random() * 500) + 100, // Mock
        cost: 0.02 // Mock
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