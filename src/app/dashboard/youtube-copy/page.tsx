'use client'

import React, { useState } from 'react'
import { Play, Youtube, Loader2, FileText, Target, CheckCircle } from 'lucide-react'

interface VideoInfo {
  title: string
  duration: string
  url: string
}

interface TranscriptionData {
  fullText: string
  summary: string
  keyPoints: string[]
}

interface CopyResult {
  id: string
  text: string
  template: string
  score: number
}

interface TranscriptionResult {
  video: VideoInfo
  transcription: TranscriptionData
  copies: CopyResult[]
  usage: {
    current: number
    limit: number
    remaining: number
  }
}

const templates = [
  { id: 'facebook-ad', name: 'Anúncio Facebook/Instagram', icon: '📱' },
  { id: 'email-subject', name: 'Assunto de Email', icon: '📧' },
  { id: 'product-description', name: 'Descrição de Produto', icon: '🛍️' },
  { id: 'blog-title', name: 'Título de Blog', icon: '📝' },
  { id: 'landing-headline', name: 'Headline de Landing Page', icon: '🎯' }
]

export default function YouTubeCopyPage() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('facebook-ad')
  const [isLoading, setIsLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [result, setResult] = useState<TranscriptionResult | null>(null)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 1: Input, 2: Processing, 3: Results

  // Validar URL do YouTube
  const isValidYouTubeURL = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return youtubeRegex.test(url)
  }

  // Obter informações do vídeo
  const fetchVideoInfo = async () => {
    if (!youtubeUrl || !isValidYouTubeURL(youtubeUrl)) {
      setError('Por favor, insira uma URL válida do YouTube')
      return
    }

    try {
      setError('')
      setIsLoading(true)

      const response = await fetch(`/api/youtube-transcription?url=${encodeURIComponent(youtubeUrl)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao obter informações do vídeo')
      }

      setVideoInfo(data.data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  // Processar vídeo e gerar copies
  const processVideo = async () => {
    if (!videoInfo) return

    try {
      setIsLoading(true)
      setStep(2)
      setError('')

      const response = await fetch('/api/youtube-transcription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          youtubeUrl: videoInfo.url,
          template: selectedTemplate
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar vídeo')
      }

      setResult(data.data)
      setStep(3)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
      setStep(1)
    } finally {
      setIsLoading(false)
    }
  }

  // Reset para nova busca
  const resetForm = () => {
    setYoutubeUrl('')
    setVideoInfo(null)
    setResult(null)
    setError('')
    setStep(1)
  }

  // Copiar texto para clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copy copiado para a área de transferência!')
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Youtube className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Copy do YouTube</h1>
            <p className="text-gray-600">Transforme qualquer vídeo do YouTube em copies persuasivos</p>
          </div>
        </div>
      </div>

      {/* Etapa 1: Input da URL */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Input URL */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-600" />
              URL do Vídeo
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cole aqui a URL do vídeo do YouTube
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={fetchVideoInfo}
                    disabled={isLoading || !youtubeUrl}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    Analisar
                  </button>
                </div>
                
                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
              </div>
            </div>
          </div>

          {/* Informações do Vídeo */}
          {videoInfo && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Vídeo Encontrado
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Título:</span>
                  <p className="text-gray-900">{videoInfo.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Duração:</span>
                  <p className="text-gray-900">{videoInfo.duration}</p>
                </div>
              </div>
            </div>
          )}

          {/* Seleção de Template */}
          {videoInfo && (
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Tipo de Copy
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{template.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={processVideo}
                disabled={isLoading}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                Gerar Copies
              </button>
            </div>
          )}
        </div>
      )}

      {/* Etapa 2: Processamento */}
      {step === 2 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Processando seu vídeo...
          </h2>
          
          <p className="text-gray-600 max-w-md mx-auto">
            Estamos transcrevendo o áudio e gerando copies personalizados baseados no conteúdo. 
            Isso pode levar alguns minutos.
          </p>
          
          <div className="mt-8 space-y-2 max-w-sm mx-auto">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Download do áudio concluído
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              Transcrevendo com IA...
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
              Gerando copies
            </div>
          </div>
        </div>
      )}

      {/* Etapa 3: Resultados */}
      {step === 3 && result && (
        <div className="space-y-6">
          {/* Header dos Resultados */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Copies Gerados
                </h2>
                <p className="text-gray-600">
                  Baseado no vídeo: <strong>{result.video.title}</strong>
                </p>
              </div>
              
              <button
                onClick={resetForm}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Novo Vídeo
              </button>
            </div>

            {/* Uso da API */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Uso atual:</strong> {result.usage.current}/{result.usage.limit === -1 ? '∞' : result.usage.limit} copies este mês
              </p>
            </div>
          </div>

          {/* Resumo do Vídeo */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Resumo do Conteúdo</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Resumo:</h4>
                <p className="text-gray-700 leading-relaxed">
                  {result.transcription.summary}
                </p>
              </div>
              
              {result.transcription.keyPoints && result.transcription.keyPoints.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pontos-chave:</h4>
                  <ul className="space-y-1">
                    {result.transcription.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Copies Gerados */}
          <div className="space-y-4">
            {result.copies.map((copy, index) => (
              <div key={copy.id} className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Variação {index + 1}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Score: {copy.score}/100
                    </p>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(copy.text)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Copiar
                  </button>
                </div>
                
                <p className="text-gray-800 leading-relaxed">
                  {copy.text}
                </p>
              </div>
            ))}
          </div>

          {/* Transcrição Completa */}
          <details className="bg-white rounded-xl shadow-sm border">
            <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
              Ver Transcrição Completa
            </summary>
            <div className="px-6 pb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {result.transcription.fullText}
              </p>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}