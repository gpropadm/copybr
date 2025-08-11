import ytdl from 'ytdl-core'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface YouTubeTranscriptionResult {
  title: string
  duration: string
  transcription: string
  summary?: string
  keyPoints?: string[]
  error?: string
}

// Validar URL do YouTube
export function isValidYouTubeURL(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
  return youtubeRegex.test(url)
}

// Extrair ID do vídeo da URL
export function extractVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : null
}

// Obter informações do vídeo usando oEmbed (mais confiável)
export async function getVideoInfo(url: string): Promise<{title: string, duration: string} | null> {
  try {
    console.log('🔍 Obtendo informações do vídeo:', url)
    
    const videoId = extractVideoId(url)
    if (!videoId) {
      console.error('❌ ID do vídeo não encontrado')
      return null
    }

    // Tentar usar oEmbed do YouTube (mais estável)
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
      const response = await fetch(oembedUrl)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Informações obtidas via oEmbed:', data.title)
        
        return {
          title: data.title || `Vídeo YouTube (${videoId})`,
          duration: "Duração disponível após processamento"
        }
      }
    } catch (oembedError) {
      console.warn('⚠️ oEmbed falhou:', oembedError)
    }

    // Fallback: usar ytdl-core se oEmbed falhar
    try {
      console.log('🔄 Tentando ytdl-core como fallback...')
      
      const options = {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }
      }
      
      const info = await ytdl.getInfo(url, options)
      const title = info.videoDetails.title
      const duration = formatDuration(parseInt(info.videoDetails.lengthSeconds))
      
      console.log('✅ Informações obtidas via ytdl-core:', { title, duration })
      return { title, duration }
      
    } catch (ytdlError) {
      console.warn('⚠️ ytdl-core também falhou:', ytdlError)
    }
    
    // Último fallback: informações básicas
    console.log('🔧 Usando informações básicas como último recurso')
    return {
      title: `Vídeo YouTube (ID: ${videoId})`,
      duration: "Duração será determinada durante processamento"
    }
    
  } catch (error) {
    console.error('❌ Erro geral ao obter informações do vídeo:', error)
    return null
  }
}

// Formatar duração
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

// Download de áudio do vídeo
async function downloadAudio(url: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const audioPath = path.join(outputPath, `audio_${Date.now()}.wav`)
    
    try {
      const stream = ytdl(url, {
        quality: 'lowestaudio',
        filter: 'audioonly',
      })
      
      const writeStream = fs.createWriteStream(audioPath)
      
      stream.pipe(writeStream)
      
      writeStream.on('finish', () => {
        resolve(audioPath)
      })
      
      writeStream.on('error', (error) => {
        reject(error)
      })
      
      stream.on('error', (error) => {
        reject(error)
      })
      
    } catch (error) {
      reject(error)
    }
  })
}

// Transcrever áudio usando Whisper
async function transcribeAudio(audioPath: string): Promise<string> {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: 'whisper-1',
      language: 'pt', // Português brasileiro
      response_format: 'text'
    })
    
    return transcription
  } catch (error) {
    console.error('Erro na transcrição:', error)
    throw new Error('Falha na transcrição do áudio')
  }
}

// Gerar resumo do conteúdo
async function generateContentSummary(transcription: string, title: string): Promise<{summary: string, keyPoints: string[]}> {
  try {
    const prompt = `
Analise a transcrição deste vídeo do YouTube e crie:

1. Um resumo executivo em português brasileiro (2-3 parágrafos)
2. Uma lista dos 5 pontos-chave mais importantes

Título do vídeo: "${title}"

Transcrição:
${transcription}

Instruções:
- Use linguagem brasileira natural
- Seja conciso mas informativo
- Foque nos insights mais valiosos
- Identifique oportunidades de copywriting/marketing se aplicável

Formato da resposta:
RESUMO:
[Seu resumo aqui]

PONTOS-CHAVE:
1. [Ponto 1]
2. [Ponto 2]
3. [Ponto 3]
4. [Ponto 4]
5. [Ponto 5]
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é um especialista em análise de conteúdo e copywriting brasileiro.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || ''
    
    // Extrair resumo e pontos-chave
    const resumoMatch = response.match(/RESUMO:\s*([\s\S]*?)(?=PONTOS-CHAVE:|$)/i)
    const pontosMatch = response.match(/PONTOS-CHAVE:\s*([\s\S]*?)$/i)
    
    const summary = resumoMatch ? resumoMatch[1].trim() : 'Resumo não disponível'
    const keyPointsText = pontosMatch ? pontosMatch[1].trim() : ''
    
    const keyPoints = keyPointsText
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 5)

    return { summary, keyPoints }
  } catch (error) {
    console.error('Erro ao gerar resumo:', error)
    return { 
      summary: 'Não foi possível gerar o resumo', 
      keyPoints: ['Resumo indisponível devido a erro técnico'] 
    }
  }
}

// Função principal para transcrever vídeo do YouTube
export async function transcribeYouTubeVideo(url: string): Promise<YouTubeTranscriptionResult> {
  try {
    // Validar URL
    if (!isValidYouTubeURL(url)) {
      return { 
        title: '', 
        duration: '', 
        transcription: '', 
        error: 'URL do YouTube inválida' 
      }
    }

    // Verificar se API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      const videoId = extractVideoId(url)
      return {
        title: `Vídeo de Demonstração (ID: ${videoId || 'desconhecido'})`,
        duration: '5:30',
        transcription: `Esta é uma transcrição de demonstração para o vídeo: ${url}

Olá pessoal, bem-vindos ao meu canal! Hoje vou falar sobre como criar copies incríveis que realmente convertem.

Primeiro ponto importante: sempre foque no benefício, não na característica. Seus clientes não querem saber sobre recursos técnicos, eles querem saber como isso vai resolver o problema deles.

Segundo ponto: use storytelling. Conte uma história que conecte emocionalmente com seu público. As pessoas compram por emoção e justificam com lógica.

Terceiro ponto: tenha um call-to-action claro e único. Não deixe seu cliente em dúvida sobre o que fazer next.

Configure OPENAI_API_KEY para usar a funcionalidade real de transcrição.`,
        summary: 'Vídeo demonstrativo sobre técnicas de copywriting, abordando a importância de focar em benefícios, usar storytelling e ter calls-to-action claros. O conteúdo ensina estratégias práticas para criar textos persuasivos que convertem melhor.',
        keyPoints: [
          'Foque sempre nos benefícios, não nas características técnicas',
          'Use storytelling para conectar emocionalmente com o público',
          'Tenha um call-to-action claro e único por copy',
          'Pessoas compram por emoção e justificam com lógica',
          'Configure OPENAI_API_KEY para transcrição real'
        ]
      }
    }

    // Obter informações do vídeo
    console.log('🔍 Obtendo informações do vídeo...')
    const videoInfo = await getVideoInfo(url)
    
    if (!videoInfo) {
      return { 
        title: '', 
        duration: '', 
        transcription: '', 
        error: 'Não foi possível obter informações do vídeo' 
      }
    }

    // Criar diretório temporário
    const tempDir = path.join(process.cwd(), 'temp')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    console.log('⬇️ Fazendo download do áudio...')
    const audioPath = await downloadAudio(url, tempDir)

    console.log('🎵 Transcrevendo áudio...')
    const transcription = await transcribeAudio(audioPath)

    console.log('📝 Gerando resumo...')
    const { summary, keyPoints } = await generateContentSummary(transcription, videoInfo.title)

    // Limpar arquivo temporário
    try {
      fs.unlinkSync(audioPath)
    } catch (error) {
      console.warn('Não foi possível deletar arquivo temporário:', error)
    }

    return {
      title: videoInfo.title,
      duration: videoInfo.duration,
      transcription,
      summary,
      keyPoints
    }

  } catch (error) {
    console.error('Erro na transcrição do YouTube:', error)
    
    return {
      title: '',
      duration: '',
      transcription: '',
      error: error instanceof Error ? error.message : 'Erro desconhecido na transcrição'
    }
  }
}

// Gerar copy baseado na transcrição
export async function generateCopyFromTranscription(
  transcription: string, 
  template: string, 
  title: string
): Promise<string[]> {
  try {
    const templatePrompts: Record<string, string> = {
      'facebook-ad': 'Crie 5 anúncios para Facebook/Instagram baseados neste conteúdo. Use linguagem brasileira, gatilhos mentais e call-to-action forte.',
      'email-subject': 'Crie 5 linhas de assunto de email baseadas neste conteúdo. Desperte curiosidade e urgência.',
      'product-description': 'Crie 5 descrições de produto/serviço baseadas neste conteúdo. Foque em benefícios e conversão.',
      'blog-title': 'Crie 5 títulos de blog irresistíveis baseados neste conteúdo. Use números e palavras de poder.',
      'landing-headline': 'Crie 5 headlines para landing page baseados neste conteúdo. Comunique valor único e incentive ação.'
    }

    const templatePrompt = templatePrompts[template] || templatePrompts['facebook-ad']

    const prompt = `
${templatePrompt}

TÍTULO DO VÍDEO: "${title}"

CONTEÚDO TRANSCRITO:
${transcription.substring(0, 3000)}... // Limitar para não exceder tokens

INSTRUÇÕES:
- Use linguagem brasileira natural
- Aproveite os insights e informações do vídeo
- Inclua emojis quando apropriado
- Seja persuasivo mas autêntico
- Foque em benefícios práticos
- Use gatilhos mentais do conteúdo original

Formato: Retorne exatamente 5 variações numeradas de 1 a 5, cada uma em uma linha separada.
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Você é um especialista em copywriting brasileiro que cria textos persuasivos baseados em conteúdo de vídeos.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.8,
    })

    const response = completion.choices[0]?.message?.content || ''
    
    // Processar resposta
    const lines = response
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && /^\d+\./.test(line))
      .slice(0, 5)

    return lines.length > 0 ? lines : ['Não foi possível gerar copies baseadas no conteúdo']

  } catch (error) {
    console.error('Erro ao gerar copy da transcrição:', error)
    return ['Erro ao gerar copy baseado no vídeo']
  }
}