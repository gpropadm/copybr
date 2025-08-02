import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  let userPrompt = 'App personalizado'
  
  try {
    // Check if API key is present
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY not found in environment variables')
      return NextResponse.json({ 
        error: 'Configuração da API não encontrada. Verifique as variáveis de ambiente.',
        details: 'ANTHROPIC_API_KEY missing'
      }, { status: 500 })
    }

    console.log('API Key present:', process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No')
    console.log('API Key length:', process.env.ANTHROPIC_API_KEY?.length || 0)

    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt é obrigatório' }, { status: 400 })
    }
    
    userPrompt = prompt
    console.log('Processing prompt:', userPrompt.substring(0, 50) + '...')

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0.3,
      system: `Você é um desenvolvedor frontend expert chamado "Code Assistant". Você cria experiências web interativas, funcionais e visualmente incríveis usando HTML, CSS e JavaScript.

PERSONALIDADE:
- Seja amigável, otimista e encorajador
- Explique de forma simples, sem jargões técnicos
- Mantenha conversas curtas e diretas
- Sempre sugira melhorias ou próximos passos

REGRAS TÉCNICAS OBRIGATÓRIAS:
- SEMPRE crie código HTML completo e funcional (nunca parcial)
- Use Tailwind CSS por padrão (via CDN)
- Todos os botões e interações DEVEM funcionar 100%
- Inclua CSS e JavaScript inline no HTML
- Crie designs profissionais, bonitos e responsivos
- Nunca deixe elementos sobrepostos ou quebrados
- Use fontes do Google Fonts quando apropriado
- Adicione animações e transições suaves
- Considere UX e hierarquia visual

FUNCIONALIDADES:
- Todos os botões devem ter ações (mesmo que simuladas)
- Formulários devem validar e mostrar feedback
- Use localStorage quando apropriado
- Crie notificações visuais para ações
- Implemente estados de hover e loading
- Use SVGs para ícones (não imagens externas)

DESIGN:
- Evite fundos brancos básicos (use gradientes ou cores interessantes)
- Aplique sombras e bordas adequadas
- Espaçamento consistente (padding/margin)
- Tipografia bem definida
- Paleta de cores harmoniosa
- Elementos bem alinhados

IMPORTANTE: Sempre gere código COMPLETO e FUNCIONAL. Nunca use comentários como "código anterior permanece igual" ou "adicione aqui". Sempre reescreva tudo.`,
      messages: [
        {
          role: "user",
          content: `Crie um layout profissional para: ${userPrompt}

Por favor, gere um código HTML completo com Tailwind CSS que seja:
- Visualmente impressionante
- Funcionalmente completo  
- Profissionalmente adequado para apresentar a um cliente
- Moderno e atual com as tendências de design
- Com interações JavaScript funcionais

Responda APENAS com o código HTML, sem explicações adicionais.`
        }
      ]
    })

    const generatedCode = message.content[0]?.type === 'text' ? message.content[0].text : null

    if (!generatedCode) {
      return NextResponse.json({ error: 'Erro ao gerar código' }, { status: 500 })
    }

    return NextResponse.json({ code: generatedCode })

  } catch (error) {
    console.error('Erro na API Claude:', error)
    
    // More specific error handling
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      
      if (error.message.includes('401') || error.message.includes('authentication')) {
        return NextResponse.json({ 
          error: 'Erro de autenticação. Verifique se a chave da API Claude está correta.',
          details: 'Authentication failed - invalid API key'
        }, { status: 401 })
      }
      
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        return NextResponse.json({ 
          error: 'Limite de uso da API atingido. Tente novamente em alguns minutos.',
          details: 'Rate limit exceeded'
        }, { status: 429 })
      }
    }
    
    return NextResponse.json({ 
      error: 'Erro ao conectar com Claude API. Tente novamente.',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}