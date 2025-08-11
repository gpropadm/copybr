import { NextRequest, NextResponse } from 'next/server'
import { getTranscriptionPreview, isValidYouTubeURL } from '@/lib/youtube-simple'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { youtubeUrl } = body

    // Validação básica
    if (!youtubeUrl) {
      return NextResponse.json(
        { error: 'URL do YouTube é obrigatória' },
        { status: 400 }
      )
    }

    if (!isValidYouTubeURL(youtubeUrl)) {
      return NextResponse.json(
        { error: 'URL do YouTube inválida' },
        { status: 400 }
      )
    }

    console.log(`🎬 Gerando preview para: ${youtubeUrl}`)

    // Gerar preview da transcrição (estilo Clipto)
    const previewResult = await getTranscriptionPreview(youtubeUrl)
    
    console.log(`✅ Preview gerado: ${previewResult.title}`)

    return NextResponse.json({ 
      success: true,
      data: {
        title: previewResult.title,
        preview: previewResult.preview,
        wordCount: previewResult.wordCount,
        url: youtubeUrl
      }
    })
    
  } catch (error) {
    console.error('Erro na API de preview YouTube:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}