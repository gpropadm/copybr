import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface GeminiVisionRequest {
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
    console.log('🔑 Verificando GEMINI_API_KEY...')
    console.log('🔑 Key exists:', !!process.env.GEMINI_API_KEY)
    
    // Verificar se tem API key configurada
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ GEMINI_API_KEY não configurada')
      return NextResponse.json(
        { error: 'API Gemini não configurada. Configure GEMINI_API_KEY.' },
        { status: 503 }
      )
    }

    const body = await request.json() as GeminiVisionRequest
    
    // Validação básica
    if (!body.image || !body.prompt) {
      return NextResponse.json(
        { error: 'Imagem e prompt são obrigatórios' },
        { status: 400 }
      )
    }

    console.log('🔍 Processando imagem com Gemini Vision...')
    console.log('📝 Prompt enviado:', body.prompt.substring(0, 100) + '...')
    console.log('📸 Tamanho da imagem base64:', body.image.length)
    console.log('🚀 CHAMANDO GEMINI API!')

    // Inicializar Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Preparar imagem para Gemini
    const imagePart = {
      inlineData: {
        data: body.image,
        mimeType: "image/jpeg"
      }
    }

    // Chamada para Gemini Vision
    const result = await model.generateContent([body.prompt, imagePart])
    const response = await result.response
    const content = response.text()

    if (!content) {
      throw new Error('Resposta vazia do Gemini Vision')
    }

    console.log('🎯 Resposta Gemini Vision RAW:', content)

    // Verificar se é um prompt genérico (não scanner de preços)
    if (body.prompt.includes('comprehensive, precise text prompt')) {
      // Retorno para geração de prompt
      return NextResponse.json({
        success: true,
        text: content,
        rawText: content
      })
    }

    // Tentar fazer parse do JSON (para scanner de preços)
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

    // Sistema anti-alucinação para Gemini
    const suspiciousPatterns = [
      /sono eme/i,
      /atacadao/i,
      /r\$ 3\.00/i,
      /smartphone.*r\$ [0-9]\./i, // Celular muito barato
      /celular.*r\$ [0-9]\./i,
      /xlkjdflkj/i,
      /asdfgh/i,
      /qwerty/i,
      /[a-z]{15,}/i, // Palavras muito longas
    ]
    
    const hallucination_words = ['sono', 'eme', 'atacadao', 'inventado', 'alucinacao']
    const productLower = parsedResponse.product.toLowerCase()
    const rawTextLower = parsedResponse.rawText.toLowerCase()
    
    const hasHallucination = hallucination_words.some(word => 
      productLower.includes(word) || rawTextLower.includes(word)
    )
    
    const seemsInvented = (
      parsedResponse.product.length > 50 || 
      parsedResponse.product.split(' ').length > 8 ||
      /\d{10,}/.test(parsedResponse.product)
    )
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(parsedResponse.product) || pattern.test(parsedResponse.rawText)
    ) || hasHallucination || seemsInvented
    
    console.log('🔍 Checando alucinações Gemini...')
    console.log('🎯 Produto:', parsedResponse.product)
    console.log('💰 Preço:', parsedResponse.price)
    console.log('📊 Confiança original:', parsedResponse.confidence)
    console.log('⚠️ Suspeito?', isSuspicious)
    
    if (isSuspicious || parsedResponse.confidence < 0.4) {
      console.log('❌ ALUCINAÇÃO DETECTADA - Bloqueando resposta Gemini')
      parsedResponse.confidence = 0.1
      parsedResponse.product = 'Imagem não pôde ser analisada'
      parsedResponse.price = 0
      parsedResponse.rawText = 'Análise falhou - tente uma imagem com melhor qualidade'
    }

    console.log('✅ Resposta Gemini processada:', parsedResponse)

    return NextResponse.json(parsedResponse)
    
  } catch (error) {
    console.error('❌ Erro na API Gemini Vision:', error)
    
    if (error instanceof Error) {
      // Erros específicos do Gemini
      if (error.message.includes('API_KEY_INVALID')) {
        return NextResponse.json(
          { error: 'Chave da API Gemini inválida. Verifique a configuração.' },
          { status: 401 }
        )
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        return NextResponse.json(
          { error: 'Cota da API Gemini esgotada.' },
          { status: 402 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor Gemini',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}