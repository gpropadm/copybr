'use client'

import { useState, useRef } from 'react'
import { Upload, Copy, Image as ImageIcon, Sparkles, Download, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function ImageToPromptPage() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setPrompt('')
    }
    reader.readAsDataURL(file)
  }

  const generatePrompt = async () => {
    if (!image) return

    setLoading(true)
    try {
      const base64Data = image.split(',')[1]
      
      const response = await fetch('/api/gemini-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Data,
          prompt: 'Analise esta imagem em detalhes e crie um prompt de texto abrangente e preciso que poderia ser usado para gerar uma imagem similar usando IA. Inclua estilo, cores, composição, humor, iluminação e qualquer outros elementos visuais relevantes. Seja específico e detalhado. Responda SEMPRE em português brasileiro.'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setPrompt(result.text)
      } else {
        alert('Erro ao gerar prompt: ' + result.error)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao processar imagem')
    } finally {
      setLoading(false)
    }
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    alert('Prompt copiado!')
  }

  const clearAll = () => {
    setImage(null)
    setPrompt('')
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-purple-600" />
            Imagem para Prompt
          </h1>
          <p className="text-gray-600">
            Faça upload de uma imagem e gere um prompt detalhado com IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Sua Imagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!image ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Arraste uma imagem aqui ou clique para selecionar
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Selecionar Arquivo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={image} 
                      alt="Upload" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={clearAll}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <Button 
                    onClick={generatePrompt} 
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Gerar Prompt
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Copy className="h-5 w-5" />
                  Prompt Gerado
                </span>
                {prompt && (
                  <Button size="sm" variant="outline" onClick={copyPrompt}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!prompt ? (
                <div className="text-center text-gray-500 py-12">
                  <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>Faça upload de uma imagem para gerar o prompt</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {prompt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={copyPrompt} className="flex-1">
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Prompt
                    </Button>
                    <Button variant="outline" onClick={clearAll}>
                      Nova Imagem
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">💡 Dicas para melhores resultados:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use imagens com boa qualidade e iluminação</li>
              <li>• Evite imagens muito pequenas ou borradas</li>
              <li>• Funciona melhor com imagens artísticas, fotografias e ilustrações</li>
              <li>• O prompt gerado pode ser usado em ferramentas como DALL-E, Midjourney, Stable Diffusion</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}