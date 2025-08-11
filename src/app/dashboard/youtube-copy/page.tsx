'use client'

import React, { useState } from 'react'
import { Play, Youtube, Loader2, FileText, Target, CheckCircle } from 'lucide-react'

interface VideoInfo {
  title: string
  duration: string
  url: string
}

interface PreviewResult {
  title: string
  preview: string
  wordCount: number
  url: string
}

interface FullTranscriptionResult {
  title: string
  fullText: string
  wordCount: number
  url: string
}


export default function YouTubeCopyPage() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [previewResult, setPreviewResult] = useState<PreviewResult | null>(null)
  const [fullResult, setFullResult] = useState<FullTranscriptionResult | null>(null)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 1: Input, 2: Preview, 3: Processing, 4: Full Transcription

  // Validar URL do YouTube
  const isValidYouTubeURL = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return youtubeRegex.test(url)
  }

  // Obter preview do vídeo (estilo Clipto)
  const fetchVideoPreview = async () => {
    if (!youtubeUrl || !isValidYouTubeURL(youtubeUrl)) {
      setError('Por favor, insira uma URL válida do YouTube')
      return
    }

    try {
      setError('')
      setIsLoading(true)

      const response = await fetch('/api/youtube-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeUrl })
      })
      
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao obter preview do vídeo')
      }

      setPreviewResult(data.data)
      setStep(2) // Ir para step de preview
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  // Obter transcrição completa (estilo Clipto)
  const getFullTranscription = async () => {
    if (!previewResult) return

    try {
      setIsLoading(true)
      setStep(3) // Processing
      setError('')

      const response = await fetch('/api/youtube-transcription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          youtubeUrl: previewResult.url,
          template: 'transcription-only' // Apenas transcrição
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar vídeo')
      }

      // Extrair a transcrição completa
      setFullResult({
        title: data.data.video.title,
        fullText: data.data.transcription.fullText,
        wordCount: data.data.transcription.fullText.split(' ').length,
        url: previewResult.url
      })
      setStep(4) // Full transcription results
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
      setStep(2) // Back to preview
    } finally {
      setIsLoading(false)
    }
  }

  // Reset para nova busca
  const resetForm = () => {
    setYoutubeUrl('')
    setPreviewResult(null)
    setFullResult(null)
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
            <h1 className="text-3xl font-bold text-gray-900">Transcrição do YouTube</h1>
            <p className="text-gray-600">Extraia toda a fala de qualquer vídeo do YouTube em texto</p>
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
                    onClick={fetchVideoPreview}
                    disabled={isLoading || !youtubeUrl}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    Ver Preview
                  </button>
                </div>
                
                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Etapa 2: Preview (estilo Clipto) */}
      {step === 2 && previewResult && (
        <div className="space-y-6">
          {/* Header do Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Preview da Transcrição
                </h2>
                <p className="text-gray-600">
                  <strong>{previewResult.title}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  {previewResult.wordCount} palavras transcritas
                </p>
              </div>
              
              <button
                onClick={resetForm}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Novo Vídeo
              </button>
            </div>
          </div>

          {/* Preview da Transcrição (estilo Clipto) */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                {previewResult.preview}
              </pre>
            </div>
          </div>

          {/* Upgrade para Transcrição Completa */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Transcrição Completa
            </h3>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">🔓 Desbloqueie o Texto Completo!</h4>
              <div className="space-y-2 text-blue-800">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Transcrição completa com mais de {previewResult.wordCount} palavras
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Todo o texto falado no vídeo com 99% de precisão
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Texto copiável e pesquisável
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Processamento em segundos
                </p>
              </div>
            </div>

            <button
              onClick={getFullTranscription}
              disabled={isLoading}
              className="w-full px-6 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
              Ver Transcrição Completa - Usar 1 Credit
            </button>
          </div>
        </div>
      )}

      {/* Etapa 3: Processamento */}
      {step === 3 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Transcrevendo o vídeo...
          </h2>
          
          <p className="text-gray-600 max-w-md mx-auto">
            Estamos extraindo todo o texto falado no vídeo. 
            Isso pode levar alguns minutos.
          </p>
          
          <div className="mt-8 space-y-2 max-w-sm mx-auto">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Vídeo analisado com sucesso
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              Transcrevendo áudio com IA...
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
              Finalizando texto
            </div>
          </div>
        </div>
      )}

      {/* Etapa 4: Transcrição Completa */}
      {step === 4 && fullResult && (
        <div className="space-y-6">
          {/* Header dos Resultados */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Transcrição Completa
                </h2>
                <p className="text-gray-600">
                  <strong>{fullResult.title}</strong>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {fullResult.wordCount} palavras transcritas
                </p>
              </div>
              
              <button
                onClick={resetForm}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Nova Transcrição
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <strong>Sucesso!</strong> Todo o texto falado no vídeo foi extraído com precisão.
              </p>
            </div>
          </div>

          {/* Transcrição Completa */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Texto Completo</h3>
              <button
                onClick={() => copyToClipboard(fullResult.fullText)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar Texto
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                {fullResult.fullText}
              </p>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-900 font-medium mb-2">💡 Dicas para usar sua transcrição:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Use Ctrl+F (ou Cmd+F) para pesquisar palavras específicas</li>
              <li>• Copie trechos importantes para suas anotações</li>
              <li>• Use o texto para criar resumos e extrair insights</li>
              <li>• Ideal para acessibilidade e revisão de conteúdo</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}