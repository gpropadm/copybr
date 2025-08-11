import { promises as fs } from 'fs'
import path from 'path'
import ytdl from '@distube/ytdl-core'

export interface AssemblyTranscriptionResult {
  title: string
  transcription: string
  wordCount: number
  duration: string
  confidence: number
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
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const response = await fetch(oembedUrl)
    
    let title = 'Vídeo do YouTube'
    if (response.ok) {
      const data = await response.json()
      title = data.title || title
    }
    
    return { title, duration: 'Extraindo...' }
  } catch (error) {
    console.error('Erro ao obter informações do vídeo:', error)
    return { title: 'Vídeo do YouTube', duration: 'Desconhecido' }
  }
}

// Baixar áudio do YouTube
export async function downloadYouTubeAudio(url: string): Promise<string> {
  try {
    const videoId = extractVideoId(url)
    if (!videoId) throw new Error('URL inválida do YouTube')
    
    // Usar diretório temporário do sistema
    const tempDir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'temp')
    if (!process.env.VERCEL) {
      await fs.mkdir(tempDir, { recursive: true })
    }
    
    const audioPath = path.join(tempDir, `${videoId}.mp3`)
    
    // Verificar se arquivo já existe
    try {
      await fs.access(audioPath)
      console.log(`📁 Áudio já existe: ${audioPath}`)
      return audioPath
    } catch {
      // Arquivo não existe, vamos baixar
    }
    
    console.log(`⬇️ Baixando áudio: ${url}`)
    
    // Verificar se vídeo é acessível
    const info = await ytdl.getInfo(url)
    console.log(`📺 Duração: ${info.videoDetails.lengthSeconds}s`)
    
    // Verificar duração (máximo 1 hora)
    if (parseInt(info.videoDetails.lengthSeconds) > 3600) {
      throw new Error('Vídeo muito longo (máximo 1 hora)')
    }
    
    // Stream de áudio
    const audioStream = ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly'
    })
    
    // Salvar para arquivo
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

// Upload de áudio para AssemblyAI
async function uploadAudioToAssembly(audioPath: string): Promise<string> {
  try {
    const apiKey = process.env.ASSEMBLYAI_API_KEY
    if (!apiKey) {
      throw new Error('ASSEMBLYAI_API_KEY não configurada')
    }
    
    console.log(`⬆️ Fazendo upload do áudio para AssemblyAI...`)
    
    // Ler arquivo de áudio
    const audioData = await fs.readFile(audioPath)
    
    // Upload para AssemblyAI
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'content-type': 'application/octet-stream'
      },
      body: audioData
    })
    
    if (!uploadResponse.ok) {
      throw new Error(`Erro no upload: ${uploadResponse.statusText}`)
    }
    
    const uploadResult = await uploadResponse.json()
    console.log(`✅ Upload concluído: ${uploadResult.upload_url}`)
    
    return uploadResult.upload_url
    
  } catch (error) {
    console.error('Erro no upload:', error)
    throw new Error(`Erro no upload: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
}

// Transcrever áudio usando AssemblyAI
async function transcribeWithAssemblyAI(audioUrl: string): Promise<string> {
  try {
    const apiKey = process.env.ASSEMBLYAI_API_KEY
    if (!apiKey) {
      throw new Error('ASSEMBLYAI_API_KEY não configurada')
    }
    
    console.log(`🎙️ Iniciando transcrição com AssemblyAI...`)
    
    // Solicitar transcrição
    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        audio_url: audioUrl,
        language_detection: true,
        punctuate: true,
        format_text: true,
        speaker_labels: false
      })
    })
    
    if (!transcriptResponse.ok) {
      throw new Error(`Erro na transcrição: ${transcriptResponse.statusText}`)
    }
    
    const transcript = await transcriptResponse.json()
    const transcriptId = transcript.id
    
    console.log(`⏳ Aguardando processamento: ${transcriptId}`)
    
    // Aguardar processamento
    let result
    let attempts = 0
    const maxAttempts = 60 // 5 minutos máximo
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)) // Aguardar 5 segundos
      
      const statusResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: { 'authorization': apiKey }
      })
      
      if (!statusResponse.ok) {
        throw new Error(`Erro ao verificar status: ${statusResponse.statusText}`)
      }
      
      result = await statusResponse.json()
      
      console.log(`📊 Status: ${result.status}`)
      
      if (result.status === 'completed') {
        console.log(`✅ Transcrição concluída: ${result.text.length} caracteres`)
        return result.text
      }
      
      if (result.status === 'error') {
        throw new Error(`Erro na transcrição: ${result.error}`)
      }
      
      attempts++
    }
    
    throw new Error('Timeout na transcrição')
    
  } catch (error) {
    console.error('Erro na transcrição AssemblyAI:', error)
    throw new Error(`Erro na transcrição: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
}

// Limpar arquivo temporário
export async function cleanupTempFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath)
    console.log(`🗑️ Arquivo removido: ${filePath}`)
  } catch (error) {
    console.log(`⚠️ Não foi possível remover: ${filePath}`)
  }
}

// Função principal: transcrever vídeo com AssemblyAI
export async function transcribeYouTubeVideoWithAssembly(url: string): Promise<AssemblyTranscriptionResult> {
  let audioPath = ''
  
  try {
    console.log(`🎬 Iniciando transcrição AssemblyAI: ${url}`)
    
    if (!isValidYouTubeURL(url)) {
      throw new Error('URL do YouTube inválida')
    }
    
    // Obter informações do vídeo
    const { title } = await getVideoInfo(url)
    console.log(`📺 Título: ${title}`)
    
    // Baixar áudio
    audioPath = await downloadYouTubeAudio(url)
    
    // Upload para AssemblyAI
    const audioUrl = await uploadAudioToAssembly(audioPath)
    
    // Transcrever
    const transcription = await transcribeWithAssemblyAI(audioUrl)
    
    // Contar palavras
    const wordCount = transcription.split(/\s+/).filter(word => word.length > 0).length
    
    // Limpar arquivo temporário
    await cleanupTempFile(audioPath)
    
    return {
      title,
      transcription,
      wordCount,
      duration: 'Concluído',
      confidence: 95, // AssemblyAI tem alta confiança
    }
    
  } catch (error) {
    console.error('❌ Erro na transcrição AssemblyAI:', error)
    
    if (audioPath) {
      await cleanupTempFile(audioPath).catch(() => {})
    }
    
    return {
      title: 'Erro na transcrição',
      transcription: '',
      wordCount: 0,
      duration: 'Falhou',
      confidence: 0,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }
  }
}