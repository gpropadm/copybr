import { NextRequest, NextResponse } from 'next/server'
import { transcribeYouTubeVideoSimple, generateCopyFromTranscriptionSimple, isValidYouTubeURL, getVideoTitle } from '@/lib/youtube-simple'
import { Database } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // Por enquanto usar demo user - depois integrar com auth real
    const userId = request.headers.get('x-user-id') || 'demo-user'
    
    console.log(`🎥 YouTube Transcription - userId: ${userId}`)
    
    // Garantir que usuário existe
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
    
    // Verificar se usuário pode gerar copy (transcrição conta como geração)
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

    const body = await request.json()
    const { youtubeUrl, template } = body

    // Validação básica
    if (!youtubeUrl || !template) {
      return NextResponse.json(
        { error: 'URL do YouTube e template são obrigatórios' },
        { status: 400 }
      )
    }

    if (!isValidYouTubeURL(youtubeUrl)) {
      return NextResponse.json(
        { error: 'URL do YouTube inválida' },
        { status: 400 }
      )
    }

    // Verificar se o template existe
    const validTemplates = ['facebook-ad', 'email-subject', 'product-description', 'blog-title', 'landing-headline']
    if (!validTemplates.includes(template)) {
      return NextResponse.json(
        { error: 'Template inválido' },
        { status: 400 }
      )
    }

    console.log(`🚀 Iniciando transcrição simples do vídeo: ${youtubeUrl}`)
    console.log(`📝 Template selecionado: ${template}`)

    // Transcrever vídeo com abordagem simplificada
    const transcriptionResult = await transcribeYouTubeVideoSimple(youtubeUrl)
    
    if (transcriptionResult.error) {
      return NextResponse.json(
        { error: transcriptionResult.error },
        { status: 400 }
      )
    }

    console.log(`✅ Transcrição concluída: ${transcriptionResult.title}`)

    // Gerar copies baseadas na transcrição
    const copies = await generateCopyFromTranscriptionSimple(
      transcriptionResult.transcription,
      template,
      transcriptionResult.title
    )

    console.log(`📱 ${copies.length} copies geradas`)

    // Incrementar uso do usuário (conta como uma geração)
    await Database.incrementUsage(userId, 1);
    
    // Buscar dados atualizados
    const updatedCanGenerate = await Database.canGenerateCopy(userId);

    // Retornar resultado completo
    return NextResponse.json({ 
      success: true,
      data: {
        video: {
          title: transcriptionResult.title,
          duration: "Processamento completo",
          url: youtubeUrl
        },
        transcription: {
          fullText: transcriptionResult.transcription,
          summary: transcriptionResult.summary,
          keyPoints: transcriptionResult.keyPoints
        },
        copies: copies.map((copy, index) => ({
          id: `youtube-copy-${Date.now()}-${index}`,
          text: copy.replace(/^\d+\.\s*/, ''), // Remove numeração
          template,
          score: Math.floor(Math.random() * 30) + 70 // Score simulado
        })),
        usage: {
          current: updatedCanGenerate.usage || 0,
          limit: updatedCanGenerate.limit || 0,
          remaining: updatedCanGenerate.limit === -1 ? -1 : (updatedCanGenerate.limit || 0) - (updatedCanGenerate.usage || 0)
        }
      }
    })
    
  } catch (error) {
    console.error('Erro na API de transcrição YouTube:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

// Endpoint GET para informações básicas do vídeo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      )
    }

    if (!isValidYouTubeURL(url)) {
      return NextResponse.json(
        { error: 'URL do YouTube inválida' },
        { status: 400 }
      )
    }

    // Obter título do vídeo de forma simples
    const title = await getVideoTitle(url)

    return NextResponse.json({
      success: true,
      data: {
        title,
        duration: "Duração disponível após processamento",
        url
      }
    })

  } catch (error) {
    console.error('Erro ao obter informações do vídeo:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}