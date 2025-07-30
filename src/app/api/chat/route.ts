import { NextRequest, NextResponse } from 'next/server'
import { generateChatResponse } from '@/lib/openai'
import { Database } from '@/lib/database'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || 'demo-user'
    console.log(`💬 Chat API - userId: ${userId}`)
    
    // Garantir que usuário existe
    let user = await Database.getUser(userId);
    if (!user) {
      console.log(`👤 Criando usuário para chat: ${userId}`)
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
    
    const body = await request.json()
    const { message, history = [] } = body
    
    // Validação básica
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Mensagem muito longa (máximo 2000 caracteres)' },
        { status: 400 }
      )
    }

    // Verificar limites do usuário
    const canGenerate = await Database.canGenerateCopy(userId);
    console.log(`📊 Can generate check:`, canGenerate)
    
    // Para o chat, vamos usar um sistema diferente - verificar palavras usadas
    const wordsUsed = user.monthlyUsage || 0
    const wordsLimit = user.planType === 'free' ? 2000 : -1 // FREE: 2000 palavras, outros: ilimitado
    
    if (wordsLimit !== -1 && wordsUsed >= wordsLimit) {
      console.log(`❌ Words limit reached: ${wordsUsed}/${wordsLimit}`)
      return NextResponse.json(
        { 
          error: 'Limite de palavras excedido',
          message: `Você atingiu o limite de ${wordsLimit} palavras do plano FREE. Faça upgrade para continuar.`,
          wordsUsed,
          wordsLimit
        },
        { status: 403 }
      );
    }

    // Preparar contexto para a IA
    const contextMessages: ChatMessage[] = []
    
    // Adicionar mensagens do histórico (últimas 10)
    const recentHistory = history.slice(-10)
    recentHistory.forEach((msg: any) => {
      if (msg.role && msg.content) {
        contextMessages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })
      }
    })
    
    // Adicionar mensagem atual do usuário
    contextMessages.push({
      role: 'user',
      content: message.trim()
    })

    console.log(`🤖 Generating chat response for: "${message.substring(0, 50)}..."`)
    
    // Gerar resposta da IA
    const aiResponse = await generateChatResponse(contextMessages)
    
    // Contar palavras da resposta
    const wordCount = aiResponse.split(/\s+/).filter(word => word.length > 0).length
    console.log(`📝 Generated ${wordCount} words`)
    
    // Atualizar uso de palavras do usuário
    await Database.incrementUsage(userId, wordCount);
    
    return NextResponse.json({ 
      success: true, 
      response: aiResponse,
      wordCount,
      usage: {
        wordsUsed: wordsUsed + wordCount,
        wordsLimit
      }
    })
    
  } catch (error) {
    console.error('Erro na API de chat:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}