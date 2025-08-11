import { promises as fs } from 'fs'
import path from 'path'
import ytdl from '@distube/ytdl-core'

export interface SimpleTranscriptionResult {
  title: string
  transcription: string
  wordCount: number
  error?: string
}

// Validar URL do YouTube
export function isValidYouTubeURL(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
  return youtubeRegex.test(url)
}

// Extrair ID do vídeo
function extractVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : null
}

// Obter título do vídeo
async function getVideoTitle(url: string): Promise<string> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const response = await fetch(oembedUrl)
    
    if (response.ok) {
      const data = await response.json()
      return data.title || 'Vídeo do YouTube'
    }
    return 'Vídeo do YouTube'
  } catch (error) {
    console.error('Erro ao obter título:', error)
    return 'Vídeo do YouTube'
  }
}

// Baixar áudio do YouTube
async function downloadYouTubeAudio(url: string): Promise<string> {
  const videoId = extractVideoId(url)
  if (!videoId) throw new Error('URL inválida')
  
  const tempDir = process.env.VERCEL ? '/tmp' : './temp'
  const audioPath = path.join(tempDir, `${videoId}.webm`)
  
  console.log(`⬇️ Baixando áudio: ${videoId}`)
  
  // Verificar se já existe
  try {
    await fs.access(audioPath)
    console.log(`📁 Áudio já existe`)
    return audioPath
  } catch {}
  
  // Criar diretório se necessário  
  if (!process.env.VERCEL) {
    await fs.mkdir(tempDir, { recursive: true })
  }
  
  // Baixar áudio
  const info = await ytdl.getInfo(url)
  const audioFormat = ytdl.chooseFormat(info.formats, { 
    quality: 'highestaudio',
    filter: 'audioonly'
  })
  
  if (!audioFormat) {
    throw new Error('Formato de áudio não encontrado')
  }
  
  console.log(`📺 Formato: ${audioFormat.container}, ${audioFormat.audioBitrate}kbps`)
  
  const audioStream = ytdl(url, { format: audioFormat })
  const writeStream = require('fs').createWriteStream(audioPath)
  
  await new Promise((resolve, reject) => {
    audioStream.pipe(writeStream)
    audioStream.on('error', reject)
    writeStream.on('error', reject) 
    writeStream.on('finish', resolve)
  })
  
  console.log(`✅ Áudio baixado: ${audioPath}`)
  return audioPath
}

// Transcrever com Whisper
async function transcribeWithWhisper(audioPath: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  
  if (!apiKey) {
    throw new Error('Chave OpenAI não configurada')
  }
  
  console.log(`🎙️ Iniciando transcrição...`)
  
  // Ler arquivo
  const audioData = await fs.readFile(audioPath)
  console.log(`📖 Arquivo lido: ${Math.round(audioData.length / 1024)}KB`)
  
  // Preparar FormData
  const formData = new FormData()
  formData.append('file', new Blob([audioData], { type: 'audio/webm' }), path.basename(audioPath))
  formData.append('model', 'whisper-1')
  formData.append('language', 'pt')
  formData.append('response_format', 'text')
  
  console.log(`🚀 Enviando para Whisper...`)
  
  // Fazer requisição para Whisper
  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    body: formData
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Whisper API error: ${response.status} - ${error}`)
  }
  
  const transcription = await response.text()
  console.log(`✅ Transcrição: ${transcription.length} caracteres`)
  
  return transcription
}

// Limpar arquivo temporário
async function cleanup(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath)
    console.log(`🗑️ Arquivo removido`)
  } catch {
    console.log(`⚠️ Não foi possível remover arquivo`)
  }
}

// Função principal
export async function transcribeYouTubeSimple(url: string): Promise<SimpleTranscriptionResult> {
  let audioPath = ''
  
  try {
    console.log(`🎬 Transcrevendo: ${url}`)
    
    if (!isValidYouTubeURL(url)) {
      throw new Error('URL inválida')
    }
    
    // Obter título
    const title = await getVideoTitle(url)
    console.log(`📺 ${title}`)
    
    // Baixar áudio
    audioPath = await downloadYouTubeAudio(url)
    
    // Transcrever
    const transcription = await transcribeWithWhisper(audioPath)
    
    // Limpar arquivo
    await cleanup(audioPath)
    
    return {
      title,
      transcription,
      wordCount: transcription.split(/\s+/).length
    }
    
  } catch (error) {
    console.error('❌ Erro:', error)
    
    if (audioPath) {
      await cleanup(audioPath)
    }
    
    return {
      title: 'Erro',
      transcription: '',
      wordCount: 0,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}