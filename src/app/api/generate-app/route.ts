import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt é obrigatório' }, { status: 400 })
    }

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0.7,
      system: `Você é um especialista em design de interfaces de aplicativos móveis e web. Sua função é criar layouts profissionais, modernos e funcionais baseados nas solicitações dos clientes.

REGRAS IMPORTANTES:
1. SEMPRE retorne código HTML completo e válido
2. Use APENAS Tailwind CSS para estilização
3. Inclua JavaScript funcional quando necessário
4. Crie interfaces PROFISSIONAIS, não caricatas
5. Use cores modernas e harmoniosas
6. Implemente navegação e interações realistas
7. Foque em UX/UI de alta qualidade
8. Use ícones SVG inline (não bibliotecas externas)
9. Torne responsivo (mobile-first)
10. Inclua estados de hover, loading, etc.

ESTRUTURA OBRIGATÓRIA:
- DOCTYPE html completo
- Head com viewport e Tailwind CDN
- Body com conteúdo funcional
- JavaScript para interações
- Design system consistente
- Componentes reutilizáveis
- Acessibilidade básica

TIPOS DE APP QUE VOCÊ DOMINA:
- Aplicativos de gestão/admin
- E-commerce e marketplaces
- Apps financeiros e bancários
- Redes sociais e comunidades
- Produtividade e organização
- Saúde e fitness
- Educação e cursos
- Delivery e food tech
- Imobiliário e classificados
- Streaming e entretenimento

PADRÕES DE QUALIDADE:
- Layout grid moderno
- Tipografia clara e hierárquica
- Cores com contraste adequado
- Espaçamentos consistentes
- Botões com feedback visual
- Forms bem estruturados
- Loading states apropriados
- Error states considerados
- Empty states planejados

Analise o briefing do cliente e crie um layout que impressione pela qualidade profissional.`,
      messages: [
        {
          role: "user",
          content: `Crie um layout profissional para: ${prompt}

Por favor, gere um código HTML completo com Tailwind CSS que seja:
- Visualmente impressionante
- Funcionalmente completo
- Profissionalmente adequado para apresentar a um cliente
- Moderno e atual com as tendências de design
- Com interações JavaScript funcionais`
        }
      ]
    })

    const generatedCode = message.content[0]?.type === 'text' ? message.content[0].text : null

    if (!generatedCode) {
      return NextResponse.json({ error: 'Erro ao gerar código' }, { status: 500 })
    }

    return NextResponse.json({ code: generatedCode })

  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}