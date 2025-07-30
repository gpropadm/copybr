import OpenAI from 'openai'

export interface CopyRequest {
  template: string
  input: string
  tone?: string
  targetAudience?: string
}

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface CopyResult {
  id: string
  text: string
  score?: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const TEMPLATES = {
  'facebook-ad': {
    name: 'Anúncio Facebook/Instagram',
    prompt: 'Você é um copywriter brasileiro especialista em anúncios para redes sociais. Crie 5 variações de copy para anúncio do Facebook/Instagram que sejam persuasivos, usem gatilhos mentais e linguagem brasileira. O copy deve ter entre 50-100 palavras e incluir call-to-action.'
  },
  'email-subject': {
    name: 'Assunto de Email',
    prompt: 'Você é um especialista em email marketing brasileiro. Crie 5 linhas de assunto de email que despertem curiosidade, criem urgência e aumentem a taxa de abertura. Use linguagem brasileira e técnicas de copywriting.'
  },
  'product-description': {
    name: 'Descrição de Produto',
    prompt: 'Você é um copywriter e-commerce brasileiro. Crie 5 descrições de produto persuasivas que destaquem benefícios, criem desejo e convertam visitantes em compradores. Use linguagem brasileira e foque nos resultados que o produto entrega.'
  },
  'blog-title': {
    name: 'Título de Blog',
    prompt: 'Você é um content writer brasileiro. Crie 5 títulos de blog posts que sejam irresistíveis, despertem curiosidade e sejam otimizados para SEO. Use números, palavras de poder e linguagem brasileira.'
  },
  'landing-headline': {
    name: 'Headline de Landing Page',
    prompt: 'Você é um especialista em landing pages brasileiro. Crie 5 headlines poderosos que capturem atenção imediatamente, comuniquem valor único e incentivem ação. Use técnicas de copywriting e linguagem brasileira.'
  }
}

// Função para calcular score baseado na qualidade do copy
function calculateCopyScore(text: string, template: string): number {
  let score = 50; // Score base
  
  // Critérios de qualidade para copywriting
  const qualityCriteria = {
    // Presença de emojis (engajamento visual)
    hasEmojis: /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(text),
    
    // Call-to-action forte
    hasStrongCTA: /clique|agende|garante|aproveite|teste|acesse|compre|cadastre|baixe|descubra|entre em contato/i.test(text),
    
    // Gatilhos mentais
    hasUrgency: /hoje|agora|limitad|rápid|últim|expira|acaba|restam|vagas|tempo|pressa|urgente/i.test(text),
    hasScarcity: /limitad|exclusiv|restam|poucos|últim|vagas|apenas|somente/i.test(text),
    hasSocialProof: /\+\d+|\d+\+|milhares|centenas|clientes|pessoas|usuários|depoimentos|aprovado|satisfeit|premiado/i.test(text),
    
    // Benefícios vs características
    hasBenefits: /economize|ganhe|transforme|revolucione|aumente|melhore|conquiste|realize|alcance|resultados/i.test(text),
    
    // Linguagem brasileira
    brazilianLanguage: /você|seu|sua|nosso|nossa|brasil|brasileir/i.test(text),
    
    // Oferta/valor
    hasOffer: /%|off|desconto|grátis|gratuito|promoção|oferta|r\$|\$|preço|valor/i.test(text),
    
    // Garantia/confiança
    hasGuarantee: /garantia|garantido|segur|confiáv|certeza|prometo|sem risco/i.test(text),
    
    // Tamanho adequado (não muito curto nem muito longo)
    goodLength: text.length >= 40 && text.length <= 200
  };
  
  // Pontuação por critério
  if (qualityCriteria.hasEmojis) score += 8;
  if (qualityCriteria.hasStrongCTA) score += 15;
  if (qualityCriteria.hasUrgency) score += 12;
  if (qualityCriteria.hasScarcity) score += 10;
  if (qualityCriteria.hasSocialProof) score += 12;
  if (qualityCriteria.hasBenefits) score += 10;
  if (qualityCriteria.brazilianLanguage) score += 8;
  if (qualityCriteria.hasOffer) score += 8;
  if (qualityCriteria.hasGuarantee) score += 7;
  if (qualityCriteria.goodLength) score += 5;
  
  // Bônus para combinações poderosas
  if (qualityCriteria.hasUrgency && qualityCriteria.hasScarcity) score += 5;
  if (qualityCriteria.hasSocialProof && qualityCriteria.hasGuarantee) score += 5;
  if (qualityCriteria.hasStrongCTA && qualityCriteria.hasOffer) score += 5;
  
  // Penalizações
  if (text.length < 30) score -= 10; // Muito curto
  if (text.length > 250) score -= 8; // Muito longo
  if (!qualityCriteria.hasStrongCTA) score -= 15; // Sem CTA é crítico
  
  // Critérios específicos por template
  if (template === 'facebook-ad') {
    if (!/facebook|instagram|redes sociais/i.test(text)) score += 2; // Não mencionar a plataforma é bom
    if (qualityCriteria.hasEmojis && qualityCriteria.hasSocialProof) score += 8; // Combo poderoso para FB
  }
  
  // Garantir que o score fique entre 0 e 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

export async function generateCopy(request: CopyRequest): Promise<CopyResult[]> {
  const template = TEMPLATES[request.template as keyof typeof TEMPLATES]
  
  if (!template) {
    throw new Error('Template não encontrado')
  }

  const systemPrompt = template.prompt
  const userPrompt = `
Produto/Serviço: ${request.input}
${request.tone ? `Tom de voz: ${request.tone}` : ''}
${request.targetAudience ? `Público-alvo: ${request.targetAudience}` : ''}

Instruções específicas:
- Use linguagem brasileira natural (não Portugal)
- Inclua emojis relevantes quando apropriado
- Foque em benefícios, não apenas características
- Use gatilhos mentais (escassez, urgência, prova social, etc.)
- Seja persuasivo mas autêntico
- Adapte para o público brasileiro

Formato de resposta: Retorne exatamente 5 variações numeradas de 1 a 5, cada uma em uma linha separada.
`

  try {
    // Verificar se tem API key configurada
    if (!process.env.OPENAI_API_KEY) {
      console.log('🤖 Usando modo simulação - configure OPENAI_API_KEY para usar API real')
      const mockResponse = await simulateOpenAIResponse(request)
      
      return mockResponse.map((text, index) => {
        const cleanText = text.replace(/^\d+\.\s*/, ''); // Remove numeração
        return {
          id: `copy-${Date.now()}-${index}`,
          text: cleanText,
          score: calculateCopyScore(cleanText, request.template)
        };
      });
    }

    // Chamada real da OpenAI API
    console.log('🚀 Usando OpenAI API real')
    const realResponse = await callOpenAI(systemPrompt, userPrompt)
    
    return realResponse.map((text, index) => {
      const cleanText = text.replace(/^\d+\.\s*/, ''); // Remove numeração
      return {
        id: `copy-${Date.now()}-${index}`,
        text: cleanText,
        score: calculateCopyScore(cleanText, request.template)
      };
    });
    
  } catch (error) {
    console.error('Erro ao gerar copy:', error)
    
    // Fallback para simulação em caso de erro
    console.log('⚠️ Erro na API - usando fallback simulado')
    const mockResponse = await simulateOpenAIResponse(request)
    
    return mockResponse.map((text, index) => {
      const cleanText = text.replace(/^\d+\.\s*/, '');
      return {
        id: `copy-${Date.now()}-${index}`,
        text: cleanText,
        score: calculateCopyScore(cleanText, request.template)
      };
    });
  }
}

// Simulação da OpenAI API para desenvolvimento
async function simulateOpenAIResponse(request: CopyRequest): Promise<string[]> {
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const responses: Record<string, string[]> = {
    'facebook-ad': [
      '🔥 Transforme sua vida em 30 dias! Nossa metodologia exclusiva já mudou a vida de +5000 pessoas. ✨ Não espere mais para ter os resultados que você merece. 👆 Clique e garante sua vaga com 50% OFF hoje!',
      '💡 Cansado de resultados mediocres? Nossa solução revolucionária vai te surpreender! 🚀 Já são +1000 clientes satisfeitos. Teste grátis por 7 dias e veja a diferença! ⏰ Oferta limitada!',
      '⚡ NOVIDADE! A ferramenta que você estava esperando finalmente chegou ao Brasil! 🇧🇷 Resultados garantidos em 24h ou seu dinheiro de volta. 💰 Aproveite o lançamento: 60% OFF!',
      '🎯 Para de perder tempo com métodos que não funcionam! Nossa abordagem comprovada entrega resultados reais. ✅ +500 depoimentos reais. 🔗 Clique e comece hoje mesmo!',
      '🌟 Imagine ter tudo isso em suas mãos... Nossa plataforma torna possível! 💪 Milhares já conquistaram seus objetivos. 🎁 Oferta especial: apenas R$ 47 (era R$ 197)'
    ],
    'email-subject': [
      '⚠️ Alex, sua conta expira em 24h',
      '🎁 [EXCLUSIVO] 70% OFF só para você',
      'Alex, descobrimos algo sobre seu concorrente...',
      '❌ Erro crítico detectado na sua estratégia',
      '⏰ Última chance: oferta acaba hoje às 23:59'
    ],
    'product-description': [
      '🚀 Revolucione seus resultados com nossa solução completa! Desenvolvida especialmente para o mercado brasileiro, nossa plataforma oferece tudo que você precisa para crescer. ✨ Interface intuitiva, suporte 24h e resultados garantidos. Usado por +1000 empresas no Brasil.',
      '💎 A ferramenta mais avançada do mercado finalmente no Brasil! Economize 5h por dia, aumente sua produtividade em 300% e veja resultados em 7 dias. 🏆 Premiada internacionalmente, aprovada pelos brasileiros.',
      '⚡ Pare de perder tempo e dinheiro! Nossa solução integrada resolve todos os seus problemas em uma única plataforma. 📊 Dashboard completo, relatórios em tempo real e automação inteligente. Teste grátis!',
      '🎯 Criado por brasileiros, para brasileiros! Entendemos suas necessidades e criamos a solução perfeita. 💪 Simples de usar, poderoso nos resultados. +5000 usuários já aprovaram.',
      '🔥 A revolução que você estava esperando! Combine poder, simplicidade e resultados em uma única ferramenta. ✅ Garantia de 30 dias, suporte nacional e preço especial de lançamento.'
    ],
    'blog-title': [
      '7 Segredos que 99% dos Brasileiros Não Sabem Sobre [Tópico]',
      'Como [Resultado Desejado] em 30 Dias (Método Comprovado)',
      '[Ano] Complete: O Guia Definitivo para [Tópico] no Brasil',
      'Por Que Você Está Fazendo [Tópico] Errado (E Como Corrigir)',
      'De Zero a [Resultado]: Minha Jornada de Transformação Real'
    ],
    'landing-headline': [
      '🚀 Transforme Seus Resultados em 30 Dias (Garantido!)',
      '💰 Como Ganhar R$ 10.000/Mês Trabalhando de Casa',
      '⚡ A Fórmula Secreta Que Mudou Minha Vida (Revelada)',
      '🔥 Descoberta: O Método Que 97% das Pessoas Desconhece',
      '✨ Finalmente! A Solução Que Você Estava Procurando'
    ]
  }
  
  return responses[request.template] || responses['facebook-ad']
}

// Função real da OpenAI API
async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo mais barato para começar
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.8,
      top_p: 1,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
    })

    const content = completion.choices[0]?.message?.content
    
    if (!content) {
      throw new Error('Resposta vazia da OpenAI')
    }

    // Processar resposta - separar por linhas e filtrar vazias
    const lines = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && /^\d+\./.test(line)) // Pegar apenas linhas numeradas
      .slice(0, 5) // Garantir máximo 5 variações

    if (lines.length === 0) {
      throw new Error('Formato de resposta inválido da OpenAI')
    }

    return lines
    
  } catch (error) {
    console.error('Erro na chamada OpenAI:', error)
    
    if (error instanceof Error) {
      // Erros específicos da OpenAI
      if (error.message.includes('insufficient_quota')) {
        throw new Error('Cota da API OpenAI esgotada. Verifique seu billing.')
      }
      if (error.message.includes('invalid_api_key')) {
        throw new Error('Chave da API OpenAI inválida. Verifique a configuração.')
      }
      if (error.message.includes('rate_limit')) {
        throw new Error('Limite de requisições atingido. Tente novamente em alguns minutos.')
      }
    }
    
    throw error
  }
}

// Função para gerar resposta de chat livre
export async function generateChatResponse(messages: ChatMessage[]): Promise<string> {
  const systemPrompt = `Você é um assistente especialista em copywriting brasileiro. Você ajuda pessoas a criar copies, textos publicitários, headlines, emails marketing e conteúdo persuasivo.

INSTRUÇÕES IMPORTANTES:
- Sempre responda em português brasileiro natural
- Seja útil, criativo e prático
- Dê exemplos concretos quando possível
- Use técnicas de copywriting quando apropriado
- Adapte sua resposta ao contexto brasileiro
- Seja conversacional mas profissional
- Inclua emojis quando apropriado para engajamento
- Foque em resultados práticos

Você pode ajudar com:
- Criação de copies para redes sociais
- Headlines e títulos impactantes
- Emails marketing
- Descrições de produtos
- Textos para landing pages
- Estratégias de copywriting
- Análise e melhoria de textos

Seja sempre construtivo, criativo e focado em gerar valor real para o usuário.`

  try {
    // Verificar se tem API key configurada
    if (!process.env.OPENAI_API_KEY) {
      console.log('🤖 Usando modo simulação para chat - configure OPENAI_API_KEY para usar API real')
      return await simulateChatResponse(messages)
    }

    // Chamada real da OpenAI API
    console.log('🚀 Usando OpenAI API real para chat')
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
    })

    const content = completion.choices[0]?.message?.content
    
    if (!content) {
      throw new Error('Resposta vazia da OpenAI')
    }

    return content.trim()
    
  } catch (error) {
    console.error('Erro na chamada OpenAI Chat:', error)
    
    if (error instanceof Error) {
      // Erros específicos da OpenAI
      if (error.message.includes('insufficient_quota')) {
        throw new Error('Cota da API OpenAI esgotada. Verifique seu billing.')
      }
      if (error.message.includes('invalid_api_key')) {
        throw new Error('Chave da API OpenAI inválida. Verifique a configuração.')
      }
      if (error.message.includes('rate_limit')) {
        throw new Error('Limite de requisições atingido. Tente novamente em alguns minutos.')
      }
    }
    
    // Fallback para simulação em caso de erro
    console.log('⚠️ Erro na API - usando fallback simulado para chat')
    return await simulateChatResponse(messages)
  }
}

// Simulação de resposta do chat para desenvolvimento
async function simulateChatResponse(messages: ChatMessage[]): Promise<string> {
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  
  // Respostas simuladas baseadas no contexto
  if (lastMessage.includes('instagram') || lastMessage.includes('redes sociais')) {
    return `🚀 Ótima pergunta sobre Instagram! Aqui estão algumas dicas para criar copies que convertem:

📝 **Estrutura ideal para posts:**
- Hook forte na primeira linha
- Storytelling ou problema relatable  
- Benefícios claros
- Call-to-action direto

💡 **Exemplo prático:**
"Você já perdeu uma venda por causa de um copy fraco? 😢

Ano passado eu descobri os 3 elementos que fazem QUALQUER copy vender mais:
✅ Urgência real (não fake)
✅ Prova social específica  
✅ CTA irresistível

Quer aprender a fórmula completa? 👆 Comenta 'QUERO' que eu te ensino!"`
  }
  
  if (lastMessage.includes('email') || lastMessage.includes('newsletter')) {
    return `📧 Email marketing é uma arte! Vou te dar uma estratégia que funciona:

🎯 **Assunto irresistível:**
- Use números: "5 erros que destroem suas vendas"
- Crie curiosidade: "O que descobri sobre seu concorrente..."
- Urgência real: "Só até amanhã: 50% OFF"

✍️ **Estrutura do email:**
1. Assunto que desperta curiosidade
2. Abertura pessoal/história
3. Problema + agitação
4. Solução (seu produto)
5. Call-to-action único e claro

💰 **Dica de ouro:** Escreva como se fosse para um amigo próximo. Emails pessoais convertem 3x mais!

Quer que eu crie um exemplo específico para seu nicho?`
  }
  
  if (lastMessage.includes('headline') || lastMessage.includes('título')) {
    return `🔥 Headlines são TUDO! Aqui está minha fórmula secreta:

📊 **Fórmula comprovada:**
[NÚMERO] + [ADJETIVO] + [BENEFÍCIO] + [TIMEFRAME] + [OBJEÇÃO]

💡 **Exemplos que funcionam:**
- "7 Estratégias Simples Para Dobrar Suas Vendas em 30 Dias (Mesmo Sem Experiência)"
- "Como Ganhar R$ 5.000/Mês Online em 60 Dias (Método Testado)"

🎯 **Gatilhos mentais poderosos:**
- Números ímpares (7, 5, 3)
- Timeframes específicos (30 dias, 2 semanas)
- Palavras de poder (segredo, descoberta, revolucionário)
- Benefícios claros (ganhar dinheiro, economizar tempo)

Qual o seu nicho? Posso criar headlines específicas para você! 🚀`
  }
  
  // Resposta genérica útil
  return `👋 Entendi! Como especialista em copywriting, posso te ajudar com isso.

🎯 **Algumas técnicas fundamentais:**
- **AIDA**: Atenção → Interesse → Desejo → Ação
- **PAS**: Problema → Agitação → Solução  
- **Storytelling**: Conecte emocionalmente com histórias
- **Prova social**: Use números, depoimentos, cases

💡 **Dicas práticas:**
✅ Foque nos benefícios, não características
✅ Use linguagem do seu público-alvo
✅ Crie urgência e escassez genuínas
✅ Tenha apenas 1 call-to-action por copy

Quer que eu seja mais específico? Me conta mais detalhes sobre o que você precisa criar! 🚀`
}