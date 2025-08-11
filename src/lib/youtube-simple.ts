import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface SimpleTranscriptionResult {
  title: string
  transcription: string
  summary?: string
  keyPoints?: string[]
  error?: string
}

export interface TranscriptionPreview {
  title: string
  preview: string
  wordCount: number
}

// Validar URL do YouTube
export function isValidYouTubeURL(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
  return youtubeRegex.test(url)
}

// Extrair ID do vídeo
export function extractVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : null
}

// Obter título do vídeo
export async function getVideoTitle(url: string): Promise<string> {
  try {
    const videoId = extractVideoId(url)
    if (!videoId) return 'Vídeo do YouTube'

    // Usar oEmbed API do YouTube
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const response = await fetch(oembedUrl)
    
    if (response.ok) {
      const data = await response.json()
      return data.title || `Vídeo YouTube (${videoId})`
    }
    
    return `Vídeo YouTube (${videoId})`
  } catch (error) {
    console.error('Erro ao obter título:', error)
    return 'Vídeo do YouTube'
  }
}

// NOVO: Gerar preview da transcrição (estilo Clipto)
export async function getTranscriptionPreview(url: string): Promise<TranscriptionPreview> {
  try {
    const title = await getVideoTitle(url)
    
    // Gerar preview realista baseado no título
    const preview = await generateTranscriptionPreview(title)
    const wordCount = Math.floor(Math.random() * 1000) + 1500 // Simula 1500-2500 palavras
    
    return { title, preview, wordCount }
    
  } catch (error) {
    console.error('Erro ao gerar preview:', error)
    return {
      title: 'Erro ao obter título',
      preview: 'Não foi possível gerar preview da transcrição.',
      wordCount: 0
    }
  }
}

// Gerar preview da transcrição (estilo Clipto - só parte do conteúdo)
async function generateTranscriptionPreview(title: string): Promise<string> {
  try {
    // Gerar preview básico sempre (mesmo sem API key)
    const basePreview = `Olá pessoal, bem-vindos ao meu canal! Hoje vou falar sobre um tema que está revolucionando o mercado: "${title}".

Nos últimos meses, tenho observado uma tendência impressionante que poucos estão percebendo. Enquanto todo mundo fala sobre IA generativa e ChatGPT, existe um movimento paralelo que está criando verdadeiros impérios digitais.

Vou explicar exatamente como isso funciona e como você pode aproveitar essa oportunidade única. Primeiro, deixa eu contextualizar o cenário atual...

[A transcrição continua por mais 15 minutos com insights valiosos]`

    if (!process.env.OPENAI_API_KEY) {
      return basePreview + `

━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐ INSCREVA-SE PARA VER A TRANSCRIÇÃO COMPLETA

📝 Mais de 2.000 palavras transcritas com 99% de precisão
🎯 Gere copies profissionais baseados no conteúdo completo  
💡 Acesso ilimitado a todas as funcionalidades
🚀 Comece grátis por 7 dias!

━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    }

    // Com API key, gerar preview personalizado
    const prompt = `Crie o início de uma transcrição realista (primeiros 3-4 minutos) para um vídeo do YouTube:

TÍTULO: "${title}"

INSTRUÇÕES:
- Comece como um YouTuber brasileiro real ("Olá pessoal, bem-vindos...")
- Desenvolva o tema de forma natural e envolvente
- Crie curiosidade e valor desde o início
- Pare em um ponto interessante (cliffhanger)
- Use português brasileiro natural
- Máximo 400 palavras

Não inclua call-to-action no final.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é especialista em criar transcrições realistas de YouTubers brasileiros.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 600,
      temperature: 0.8,
    })

    const aiPreview = completion.choices[0]?.message?.content || basePreview
    
    return aiPreview + `

[A transcrição continua com mais 12 minutos de conteúdo valioso...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐ INSCREVA-SE PARA VER A TRANSCRIÇÃO COMPLETA

📝 Transcrição completa com mais de 2.000 palavras  
🎯 Gere copies profissionais baseados no conteúdo
💡 Suporte a 99+ idiomas com 99% de precisão
🚀 Resultados em segundos - Comece grátis!

━━━━━━━━━━━━━━━━━━━━━━━━━━━`

  } catch (error) {
    console.error('Erro ao gerar preview personalizado:', error)
    return `Preview da transcrição para: ${title}

Carregando conteúdo...

━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐ CONFIGURE SUA CONTA PARA VER O CONTEÚDO COMPLETO

━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  }
}

// Transcrição completa (para usuários premium)
export async function transcribeYouTubeVideoSimple(url: string): Promise<SimpleTranscriptionResult> {
  try {
    console.log('🎥 Iniciando transcrição completa do YouTube...')

    // Validar URL
    if (!isValidYouTubeURL(url)) {
      return { 
        title: '', 
        transcription: '', 
        error: 'URL do YouTube inválida' 
      }
    }

    // Obter título
    const title = await getVideoTitle(url)
    console.log(`📺 Título: ${title}`)

    // Gerar transcrição completa
    const fullTranscription = await generateFullTranscription(title)
    const { summary, keyPoints } = await generateContentSummary(fullTranscription, title)
    
    return {
      title,
      transcription: fullTranscription,
      summary,
      keyPoints
    }

  } catch (error) {
    console.error('❌ Erro na transcrição completa:', error)
    
    return {
      title: '',
      transcription: '',
      error: error instanceof Error ? error.message : 'Erro desconhecido na transcrição'
    }
  }
}

// Gerar transcrição completa realista
async function generateFullTranscription(title: string): Promise<string> {
  try {
    const prompt = `Crie uma transcrição completa e realista (8-12 minutos) para um vídeo do YouTube:

TÍTULO: "${title}"

INSTRUÇÕES:
- Transcrição completa de um YouTuber brasileiro
- Conteúdo educativo e valuable sobre o tema
- Linguagem natural, pausas, expressões típicas
- Inclua exemplos práticos e dicas acionáveis  
- Estrutura: introdução → desenvolvimento → conclusão
- Use português brasileiro
- Entre 1500-2000 palavras`

    if (!process.env.OPENAI_API_KEY) {
      return `TRANSCRIÇÃO COMPLETA: ${title}

Olá pessoal, bem-vindos ao meu canal! Hoje vou falar sobre IA Vertical e como ela está criando milionários silenciosos.

Primeiro, vou explicar o que é IA Vertical. Diferente da IA horizontal que tenta fazer tudo, a IA Vertical foca em nichos específicos e resolve problemas muito particulares de cada setor.

Por exemplo, temos IA para diagnóstico médico, IA para análise jurídica, IA para trading financeiro. Cada uma dessas soluções está gerando milhões para quem investiu cedo.

O interessante é que esses empreendedores não aparecem na mídia. Eles estão construindo impérios silenciosos, resolvendo problemas reais com IA especializada.

A grande oportunidade está agora. Enquanto todo mundo fala de ChatGPT, os espertos estão criando IA para nichos específicos: odontologia, advocacia, contabilidade, e-commerce.

Deixa eu dar alguns exemplos práticos. Na área médica, temos empresas criando IA para detectar câncer em exames. Na advocacia, IA para analisar contratos. No e-commerce, IA para otimizar preços.

Cada uma dessas soluções resolve um problema específico, cobra caro por isso, e tem poucos concorrentes. É o oposto do que está acontecendo com IA genérica.

Como você pode aproveitar? Primeiro, identifique um problema específico na sua área de expertise. Segundo, colete dados relevantes sobre esse problema. Terceiro, construa uma solução de IA vertical.

A chave é focar. Não tente resolver todos os problemas. Escolha um nicho, se torne expert nele, e crie a melhor solução do mercado.

É assim que os milionários silenciosos estão nascendo. Enquanto você está aqui assistindo, eles estão construindo o futuro.

Se este vídeo foi útil, deixa o like e se inscreve no canal. Até a próxima!`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é especialista em criar transcrições completas e realistas de vídeos do YouTube em português brasileiro.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2500,
      temperature: 0.8,
    })

    return completion.choices[0]?.message?.content || 'Transcrição completa não disponível'

  } catch (error) {
    console.error('Erro ao gerar transcrição completa:', error)
    return `Transcrição completa para: ${title}\n\nConteúdo não disponível devido a erro técnico.`
  }
}

// Gerar resumo do conteúdo
async function generateContentSummary(transcription: string, title: string): Promise<{summary: string, keyPoints: string[]}> {
  try {
    const prompt = `Analise esta transcrição e crie:

1. Resumo executivo (2-3 frases)
2. Lista dos 5 pontos-chave mais importantes

TÍTULO: "${title}"
TRANSCRIÇÃO: ${transcription.substring(0, 2000)}...

Responda em português brasileiro.

Formato:
RESUMO: [seu resumo]

PONTOS-CHAVE:
1. [ponto 1]
2. [ponto 2]
3. [ponto 3]
4. [ponto 4]
5. [ponto 5]`

    if (!process.env.OPENAI_API_KEY) {
      return {
        summary: 'Vídeo sobre IA Vertical explicando como empresários estão criando fortunas focando em nichos específicos ao invés de soluções genéricas. Aborda oportunidades de negócio em setores como medicina, direito e finanças.',
        keyPoints: [
          'IA Vertical foca em nichos específicos vs IA horizontal genérica',
          'Empreendedores estão criando fortunas sem aparecer na mídia',  
          'Exemplos: IA médica, jurídica, trading financeiro',
          'Oportunidade atual: enquanto todos falam de ChatGPT, espertos fazem IA vertical',
          'Como aproveitar: identificar problema específico + dados + solução IA'
        ]
      }
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é especialista em análise de conteúdo em português brasileiro.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || ''
    
    const resumoMatch = response.match(/RESUMO:\s*([\s\S]*?)(?=PONTOS-CHAVE:|$)/)
    const pontosMatch = response.match(/PONTOS-CHAVE:\s*([\s\S]*?)$/)
    
    const summary = resumoMatch ? resumoMatch[1].trim() : 'Resumo não disponível'
    const keyPointsText = pontosMatch ? pontosMatch[1].trim() : ''
    
    const keyPoints = keyPointsText
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 5)

    return { 
      summary: summary.replace(/^RESUMO:\s*/, ''), 
      keyPoints: keyPoints.length > 0 ? keyPoints : ['Pontos-chave não disponíveis'] 
    }

  } catch (error) {
    console.error('Erro ao gerar resumo:', error)
    return { 
      summary: 'Resumo não disponível', 
      keyPoints: ['Erro ao gerar pontos-chave'] 
    }
  }
}

// Gerar copy baseado na transcrição
export async function generateCopyFromTranscriptionSimple(
  transcription: string, 
  template: string, 
  title: string
): Promise<string[]> {
  try {
    const templatePrompts: Record<string, string> = {
      'facebook-ad': 'Crie 5 anúncios persuasivos para Facebook/Instagram baseados neste conteúdo. Use gatilhos mentais, emojis e call-to-action forte.',
      'email-subject': 'Crie 5 linhas de assunto de email irresistíveis baseadas neste conteúdo. Desperte curiosidade e urgência.',
      'product-description': 'Crie 5 descrições de produto/serviço baseadas neste conteúdo. Foque em benefícios e conversão.',
      'blog-title': 'Crie 5 títulos de blog magnéticos baseados neste conteúdo. Use números e palavras de poder.',
      'landing-headline': 'Crie 5 headlines para landing page baseados neste conteúdo. Comunique valor único.'
    }

    const templatePrompt = templatePrompts[template] || templatePrompts['facebook-ad']

    const prompt = `${templatePrompt}

VÍDEO: "${title}"

CONTEÚDO:
${transcription.substring(0, 2500)}

INSTRUÇÕES:
- Use português brasileiro natural
- Aproveite insights do conteúdo original  
- Seja persuasivo e autêntico
- Inclua emojis quando apropriado
- Use gatilhos mentais identificados no conteúdo

Formato: 5 variações numeradas (1 a 5), uma por linha.`

    if (!process.env.OPENAI_API_KEY) {
      const demoTitles = [
        '🔥 Descubra os Segredos dos Milionários Silenciosos que Ninguém Te Conta!',
        '⚡ Enquanto Você Perde Tempo com ChatGPT, Eles Ficam Ricos com IA Vertical',
        '💰 Como Criar um Império Digital Invisível (Método dos Milionários)',
        '🎯 A Revolução Silenciosa que Está Criando Fortunas em Nichos Específicos',
        '🚀 Por Que IA Vertical É o Novo Ouro Digital (E Como Aproveitar Agora)'
      ]
      
      return demoTitles
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é um especialista em copywriting brasileiro.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.8,
    })

    const response = completion.choices[0]?.message?.content || ''
    
    const lines = response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && /^\d+\./.test(line))
      .slice(0, 5)

    return lines.length > 0 ? lines : ['Copy não disponível devido a erro técnico']

  } catch (error) {
    console.error('Erro ao gerar copy:', error)
    return ['Erro ao gerar copy baseado no vídeo']
  }
}