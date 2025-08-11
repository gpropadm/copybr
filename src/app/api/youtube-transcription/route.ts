import { NextRequest, NextResponse } from 'next/server'
import { transcribeYouTubeVideo, isValidYouTubeURL, getVideoInfo } from '@/lib/youtube-transcription'
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

    // Para transcrição apenas, não precisa validar template específico
    if (template !== 'transcription-only') {
      return NextResponse.json(
        { error: 'Esta API suporta apenas transcrição completa' },
        { status: 400 }
      )
    }

    console.log(`🚀 Iniciando transcrição com Whisper: ${youtubeUrl}`)
    console.log(`📝 Template selecionado: ${template}`)

    // Transcrever vídeo com Whisper OpenAI (que você já tem crédito)
    const transcriptionResult = await transcribeYouTubeVideo(youtubeUrl)
    
    if (transcriptionResult.error) {
      return NextResponse.json(
        { error: transcriptionResult.error },
        { status: 400 }
      )
    }

    console.log(`✅ Transcrição Whisper concluída: ${transcriptionResult.title}`)

    // Para transcrição apenas, não gerar copies

    // Incrementar uso do usuário (conta como uma geração)
    await Database.incrementUsage(userId, 1);
    
    // Buscar dados atualizados
    const updatedCanGenerate = await Database.canGenerateCopy(userId);

    // Retornar apenas a transcrição completa
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
          summary: 'Transcrição real extraída com Whisper AI',
          keyPoints: []
        },
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
    const { title } = await getVideoInfo(url)

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