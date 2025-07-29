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
    console.log('🔑 Verificando OPENAI_API_KEY...')
    console.log('🔑 Key exists:', !!process.env.OPENAI_API_KEY)
    console.log('🔑 Key preview:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...')
    
    // Verificar se tem API key configurada
    if (!process.env.OPENAI_API_KEY) {
      console.log('❌ OPENAI_API_KEY não configurada - usando fallback simulado')
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
    console.log('📝 Prompt enviado:', body.prompt.substring(0, 100) + '...')
    console.log('📸 Tamanho da imagem base64:', body.image.length)
    console.log('🚀 CHAMANDO OPENAI API REAL - DEVE CONSUMIR CRÉDITOS!')

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

    console.log('🎯 Resposta GPT-4 Vision RAW:', content)
    console.log('📊 Tokens usados:', completion.usage?.total_tokens)
    console.log('💰 CRÉDITOS FORAM CONSUMIDOS! Total tokens:', completion.usage?.total_tokens)

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

    // Detectar respostas suspeitas/alucinações - SISTEMA APRIMORADO
    const suspiciousPatterns = [
      /sono eme/i,
      /atacadao/i,
      /loja atacadao/i,
      /r\$ 3\.00/i,
      /confiança 30%/i,
      /smartphone.*r\$ [0-9]\./i, // Celular barato demais
      /celular.*r\$ [0-9]\./i,
      // Palavras sem sentido
      /xlkjdflkj/i,
      /asdfgh/i,
      /qwerty/i,
      /abcd.*efgh/i,
      // Preços irreais (muito baratos para produtos complexos)
      /smartphone.*r\$ [1-9]\.?\d{0,2}$/i, // Smartphone < R$ 100
      /celular.*r\$ [1-9]\.?\d{0,2}$/i,    // Celular < R$ 100
      // Textos muito longos sem espaço (indicam alucinação)
      /[a-z]{15,}/i,
      // Produtos que não fazem sentido
      /produto.*[0-9]{5,}/i, // Nomes com muitos números
    ]
    
    // Palavras específicas que indicam alucinação detectada anteriormente
    const hallucination_words = ['sono', 'eme', 'atacadao', 'drogada', 'fumou', 'inventado', 'alucinacao']
    const productLower = parsedResponse.product.toLowerCase()
    const rawTextLower = parsedResponse.rawText.toLowerCase()
    
    const hasHallucination = hallucination_words.some(word => 
      productLower.includes(word) || rawTextLower.includes(word)
    )
    
    // Verificar se produto parece inventado (muito específico mas sem sentido)
    const seemsInvented = (
      parsedResponse.product.length > 50 || // Nome muito longo
      parsedResponse.product.split(' ').length > 8 || // Muitas palavras
      /\d{10,}/.test(parsedResponse.product) // Muitos números seguidos
    )
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(parsedResponse.product) || pattern.test(parsedResponse.rawText)
    ) || hasHallucination || seemsInvented
    
    console.log('🔍 Checando alucinações...')
    console.log('🎯 Produto:', parsedResponse.product)
    console.log('💰 Preço:', parsedResponse.price)
    console.log('📊 Confiança original:', parsedResponse.confidence)
    console.log('⚠️ Suspeito?', isSuspicious)
    
    if (isSuspicious || parsedResponse.confidence < 0.4) {
      console.log('❌ ALUCINAÇÃO DETECTADA - Bloqueando resposta')
      parsedResponse.confidence = 0.1
      parsedResponse.product = 'Imagem não pôde ser analisada'
      parsedResponse.price = 0
      parsedResponse.rawText = 'Análise falhou - tente uma imagem com melhor qualidade'
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