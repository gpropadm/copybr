import OpenAI from 'openai'
import { promises as fs } from 'fs'
import path from 'path'
import ytdl from '@distube/ytdl-core'

// Inicialização do OpenAI será feita dentro da função para usar a chave validada

export interface RealTranscriptionResult {
  title: string
  transcription: string
  wordCount: number
  duration: string
  error?: string
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

// Obter informações do vídeo
export async function getVideoInfo(url: string): Promise<{title: string, duration: string}> {
  try {
    // Usar oEmbed API do YouTube para título
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const response = await fetch(oembedUrl)
    
    let title = 'Vídeo do YouTube'
    if (response.ok) {
      const data = await response.json()
      title = data.title || title
    }
    
    return { 
      title, 
      duration: 'Extraindo...' 
    }
  } catch (error) {
    console.error('Erro ao obter informações do vídeo:', error)
    return { 
      title: 'Vídeo do YouTube', 
      duration: 'Desconhecido' 
    }
  }
}

// Baixar áudio do YouTube usando ytdl-core
export async function downloadYouTubeAudio(url: string): Promise<string> {
  try {
    const videoId = extractVideoId(url)
    if (!videoId) throw new Error('URL inválida do YouTube')
    
    // Usar diretório temporário do sistema (compatível com Vercel)
    const tempDir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'temp')
    if (!process.env.VERCEL) {
      await fs.mkdir(tempDir, { recursive: true })
    }
    
    // Nome do arquivo temporário
    const audioPath = path.join(tempDir, `${videoId}.mp3`)
    
    // Verificar se o arquivo já existe
    try {
      await fs.access(audioPath)
      console.log(`📁 Áudio já existe: ${audioPath}`)
      return audioPath
    } catch {
      // Arquivo não existe, vamos baixar
    }
    
    console.log(`⬇️ Baixando áudio: ${url}`)
    
    // Verificar se o vídeo é válido e acessível
    const info = await ytdl.getInfo(url)
    console.log(`📺 Duração: ${info.videoDetails.lengthSeconds}s`)
    
    // Verificar duração (máximo 1 hora)
    if (parseInt(info.videoDetails.lengthSeconds) > 3600) {
      throw new Error('Vídeo muito longo (máximo 1 hora)')
    }
    
    // Stream de áudio apenas
    const audioStream = ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly'
    })
    
    // Salvar stream para arquivo
    const writeStream = require('fs').createWriteStream(audioPath)
    
    await new Promise((resolve, reject) => {
      audioStream.pipe(writeStream)
      
      audioStream.on('error', reject)
      writeStream.on('error', reject)
      writeStream.on('finish', resolve)
    })
    
    console.log(`✅ Áudio baixado: ${audioPath}`)
    return audioPath
    
  } catch (error) {
    console.error('Erro ao baixar áudio:', error)
    throw new Error(`Erro ao baixar áudio: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
}

// Transcrever áudio usando Whisper
export async function transcribeAudioWithWhisper(audioPath: string): Promise<string> {
  try {
    const apiKey = process.env.OPENAI_API_KEY?.trim()
    console.log(`🔑 API Key status: ${apiKey ? 'CONFIGURADA (' + apiKey.substring(0, 10) + '...)' : 'NÃO CONFIGURADA'}`)
    console.log(`🌍 Environment: ${process.env.VERCEL ? 'VERCEL' : 'LOCAL'}`)
    
    if (!apiKey || apiKey.length < 20) {
      throw new Error('OpenAI API Key não configurada corretamente. Verifique as variáveis de ambiente no Vercel.')
    }
    
    // Criar cliente OpenAI com a chave validada
    const openai = new OpenAI({
      apiKey: apiKey,
    })
    
    console.log(`🎙️ Transcrevendo áudio: ${audioPath}`)
    
    // Verificar se arquivo existe
    console.log(`📁 Verificando se arquivo existe...`)
    await fs.access(audioPath)
    console.log(`✅ Arquivo encontrado`)
    
    // Ler arquivo de áudio
    console.log(`📖 Lendo arquivo de áudio...`)
    const audioBuffer = await fs.readFile(audioPath)
    console.log(`✅ Arquivo lido: ${audioBuffer.length} bytes`)
    
    // Criar objeto File para a API
    console.log(`📦 Preparando arquivo para upload...`)
    const audioFile = new File([new Uint8Array(audioBuffer)], path.basename(audioPath), {
      type: 'audio/mp3'
    })
    console.log(`✅ Arquivo preparado: ${audioFile.size} bytes`)
    
    // Transcrever com Whisper
    console.log(`🚀 Enviando para Whisper API...`)
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'pt', // Português
      response_format: 'text'
    })
    
    console.log(`✅ Transcrição concluída: ${transcription.length} caracteres`)
    console.log(`📝 Primeiros 100 chars: ${transcription.substring(0, 100)}...`)
    
    return transcription
    
  } catch (error) {
    console.error('Erro na transcrição Whisper:', error)
    throw new Error(`Erro na transcrição: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
}

// Limpar arquivo temporário
export async function cleanupTempFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath)
    console.log(`🗑️ Arquivo temporário removido: ${filePath}`)
  } catch (error) {
    console.log(`⚠️ Não foi possível remover arquivo temporário: ${filePath}`)
  }
}

// Função principal: transcrever vídeo do YouTube
export async function transcribeYouTubeVideo(url: string): Promise<RealTranscriptionResult> {
  let audioPath = ''
  
  try {
    console.log(`🎬 Iniciando transcrição real de: ${url}`)
    
    // Validar URL
    if (!isValidYouTubeURL(url)) {
      throw new Error('URL do YouTube inválida')
    }
    
    // Obter informações do vídeo
    const { title } = await getVideoInfo(url)
    console.log(`📺 Título: ${title}`)
    
    // Baixar áudio
    audioPath = await downloadYouTubeAudio(url)
    
    // Transcrever áudio
    const transcription = await transcribeAudioWithWhisper(audioPath)
    
    // Contar palavras
    const wordCount = transcription.split(/\s+/).filter(word => word.length > 0).length
    
    // Limpar arquivo temporário
    await cleanupTempFile(audioPath)
    
    return {
      title,
      transcription,
      wordCount,
      duration: 'Concluído',
    }
    
  } catch (error) {
    console.error('❌ Erro na transcrição:', error)
    
    // Tentar limpar arquivo em caso de erro
    if (audioPath) {
      await cleanupTempFile(audioPath).catch(() => {})
    }
    
    return {
      title: 'Erro na transcrição',
      transcription: '',
      wordCount: 0,
      duration: 'Falhou',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}