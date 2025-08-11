import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    
    console.log('🔍 DEBUG OpenAI:')
    console.log('- Environment:', process.env.VERCEL ? 'VERCEL' : 'LOCAL')
    console.log('- API Key exists:', !!apiKey)
    console.log('- API Key length:', apiKey?.length || 0)
    console.log('- API Key start:', apiKey?.substring(0, 20) || 'none')
    console.log('- All env vars:', Object.keys(process.env).filter(key => key.includes('OPENAI')))
    
    if (!apiKey) {
      return NextResponse.json({
        error: 'OpenAI API Key não encontrada',
        debug: {
          hasKey: false,
          keyLength: 0,
          environment: process.env.VERCEL ? 'VERCEL' : 'LOCAL',
          allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI'))
        }
      })
    }
    
    // Testar a chave fazendo uma requisição simples
    const openai = new OpenAI({
      apiKey: apiKey.trim(),
    })
    
    console.log('🧪 Testando chave OpenAI...')
    
    const models = await openai.models.list()
    const whisperModel = models.data.find(model => model.id === 'whisper-1')
    
    return NextResponse.json({
      success: true,
      debug: {
        hasKey: true,
        keyLength: apiKey.length,
        keyStart: apiKey.substring(0, 20),
        environment: process.env.VERCEL ? 'VERCEL' : 'LOCAL',
        whisperAvailable: !!whisperModel,
        totalModels: models.data.length
      }
    })
    
  } catch (error) {
    console.error('❌ Erro no teste OpenAI:', error)
    
    return NextResponse.json({
      error: 'Erro ao testar OpenAI',
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      debug: {
        hasKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0,
        environment: process.env.VERCEL ? 'VERCEL' : 'LOCAL'
      }
    })
  }
}