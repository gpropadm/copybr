import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Configuração da OpenAI usando a mesma chave do generate-copy
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface VisionRequest {
  image: string // base64 image
  prompt: string
}

interface VisionResponse {
  product: string
  price: number
  confidence: number
  rawText: string
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se tem API key configurada
    if (!process.env.OPENAI_API_KEY) {
      console.log('🤖 OPENAI_API_KEY não configurada - usando fallback simulado')
      return NextResponse.json(
        { error: 'API OpenAI não configurada. Configure OPENAI_API_KEY.' },
        { status: 503 }
      )
    }

    const body = await request.json() as VisionRequest
    
    // Validação básica
    if (!body.image || !body.prompt) {
      return NextResponse.json(
        { error: 'Imagem e prompt são obrigatórios' },
        { status: 400 }
      )
    }

    console.log('🔍 Processando imagem com GPT-4 Vision...')

    // Chamada para GPT-4 Vision
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Modelo que suporta vision
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: body.prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${body.image}`,
                detail: "low" // Usar detalhe baixo para economizar tokens
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.0, // Temperatura zero para máxima consistência
    })

    const content = completion.choices[0]?.message?.content

    if (!content) {
      throw new Error('Resposta vazia da OpenAI Vision')
    }

    console.log('🎯 Resposta GPT-4 Vision:', content)

    // Tentar fazer parse do JSON
    let parsedResponse: VisionResponse
    try {
      parsedResponse = JSON.parse(content)
    } catch (parseError) {
      console.error('❌ Erro ao fazer parse do JSON:', parseError)
      console.log('📝 Conteúdo recebido:', content)
      
      // Fallback: tentar extrair informações manualmente
      const productMatch = content.match(/"product":\s*"([^"]+)"/i)
      const priceMatch = content.match(/"price":\s*(\d+\.?\d*)/i)
      const confidenceMatch = content.match(/"confidence":\s*(\d\.?\d*)/i)
      
      parsedResponse = {
        product: productMatch?.[1] || 'Produto não identificado',
        price: parseFloat(priceMatch?.[1] || '0'),
        confidence: parseFloat(confidenceMatch?.[1] || '0.5'),
        rawText: content
      }
    }

    // Validar e corrigir resposta
    if (!parsedResponse.product) parsedResponse.product = 'Produto não identificado'
    if (!parsedResponse.price || isNaN(parsedResponse.price)) parsedResponse.price = 0
    if (!parsedResponse.confidence || isNaN(parsedResponse.confidence)) parsedResponse.confidence = 0.5
    if (!parsedResponse.rawText) parsedResponse.rawText = content

    // Garantir que confidence está entre 0 e 1
    if (parsedResponse.confidence > 1) parsedResponse.confidence = parsedResponse.confidence / 100

    // Detectar respostas suspeitas/alucinações
    const suspiciousPatterns = [
      /sono eme/i,
      /atacadao/i,
      /loja atacadao/i
    ]
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(parsedResponse.product) || pattern.test(parsedResponse.rawText)
    )
    
    if (isSuspicious || parsedResponse.confidence < 0.3) {
      console.log('⚠️ Resposta suspeita detectada, reduzindo confiança')
      parsedResponse.confidence = Math.min(parsedResponse.confidence, 0.2)
      parsedResponse.product = 'Não foi possível identificar o produto'
      parsedResponse.price = 0
    }

    console.log('✅ Resposta processada:', parsedResponse)

    return NextResponse.json(parsedResponse)
    
  } catch (error) {
    console.error('❌ Erro na API Vision:', error)
    
    if (error instanceof Error) {
      // Erros específicos da OpenAI
      if (error.message.includes('insufficient_quota')) {
        return NextResponse.json(
          { error: 'Cota da API OpenAI esgotada. Verifique seu billing.' },
          { status: 402 }
        )
      }
      if (error.message.includes('invalid_api_key')) {
        return NextResponse.json(
          { error: 'Chave da API OpenAI inválida. Verifique a configuração.' },
          { status: 401 }
        )
      }
      if (error.message.includes('rate_limit')) {
        return NextResponse.json(
          { error: 'Limite de requisições atingido. Tente novamente em alguns minutos.' },
          { status: 429 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}