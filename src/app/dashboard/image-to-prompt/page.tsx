'use client'

import { useState, useRef } from 'react'
import { Upload, Copy, Image as ImageIcon, Sparkles, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function ImageToPromptPage() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [copy, setCopy] = useState('')
  const [copies, setCopies] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [analysisMode, setAnalysisMode] = useState<'prompt' | 'copy+prompt'>('prompt')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Salvar no histórico (para Meus Copies)
  const saveToHistory = (type: 'prompt' | 'copies', generatedPrompt?: string, generatedCopies?: string[]) => {
    if (!image) return

    const entry = {
      id: Date.now().toString(),
      image,
      type,
      prompt: generatedPrompt,
      copies: generatedCopies,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      title: `${type === 'prompt' ? 'Prompt' : 'Copies'} - ${new Date().toLocaleDateString('pt-BR')}`
    }

    const savedEntries = localStorage.getItem('image_to_prompt_history')
    const currentEntries = savedEntries ? JSON.parse(savedEntries) : []
    const newEntries = [entry, ...currentEntries].slice(0, 50) // Manter apenas 50 entradas
    localStorage.setItem('image_to_prompt_history', JSON.stringify(newEntries))
  }

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
      setCopy('')
      setCopies([])
    }
    reader.readAsDataURL(file)
  }

  const generatePrompt = async () => {
    if (!image) return

    setLoading(true)
    try {
      const base64Data = image.split(',')[1]
      
      if (analysisMode === 'prompt') {
        // Gerar apenas prompt como antes
        const response = await fetch('/api/gemini-vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64Data,
            prompt: 'INSTRUÇÕES: Você deve responder EXCLUSIVAMENTE em português brasileiro. Analise esta imagem em detalhes e crie uma descrição completa em português que serve como prompt para gerar uma imagem similar com IA. Inclua: estilo artístico, cores predominantes, composição, iluminação, atmosfera, elementos principais e secundários. Seja muito específico e detalhado. IMPORTANTE: Toda sua resposta deve estar em português do Brasil, sem nenhuma palavra em inglês.'
          })
        })

        const result = await response.json()
        
        if (result.success) {
          setPrompt(result.text)
          setCopy('')
          saveToHistory('prompt', result.text)
        } else {
          alert('Erro ao gerar prompt: ' + result.error)
        }
      } else {
        // Gerar 5 copies para redes sociais
        const copyPromises = Array.from({ length: 5 }, (_, i) => 
          fetch('/api/gemini-vision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              image: base64Data,
              prompt: `INSTRUÇÕES: Você deve responder EXCLUSIVAMENTE em português brasileiro. Analise esta imagem e crie uma copy promocional para redes sociais. A copy deve ser: PERSUASIVA, ENVOLVENTE e PRONTA PARA USAR. 

VARIAÇÃO ${i + 1}: ${i === 0 ? 'Foque em URGÊNCIA e escassez' : i === 1 ? 'Foque em BENEFÍCIOS e valor' : i === 2 ? 'Foque em EMOÇÃO e desejo' : i === 3 ? 'Foque em AUTORIDADE e qualidade' : 'Foque em CURIOSIDADE e mistério'}

Inclua: gancho inicial impactante, benefícios do produto, call-to-action forte, emojis estratégicos, hashtags relevantes. Máximo 280 caracteres. IMPORTANTE: Responda apenas a copy final, sem explicações adicionais.`
            })
          })
        )

        const copyResponses = await Promise.all(copyPromises)
        const copyResults = await Promise.all(copyResponses.map(r => r.json()))
        
        const successfulCopies = copyResults
          .filter(result => result.success)
          .map(result => result.text)
        
        if (successfulCopies.length > 0) {
          setCopies(successfulCopies)
          setPrompt('') // Limpar prompt no modo copy
          saveToHistory('copies', undefined, successfulCopies)
        } else {
          alert('Erro ao gerar copies: ' + copyResults[0]?.error)
        }
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
    setCopy('')
    setCopies([])
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
          
          {/* Mode Toggle */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setAnalysisMode('prompt')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                analysisMode === 'prompt'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Quero um Prompt
            </button>
            <button
              onClick={() => setAnalysisMode('copy+prompt')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                analysisMode === 'copy+prompt'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Quero uma Copy
            </button>
          </div>
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
                        {analysisMode === 'prompt' ? 'Gerar Prompt' : 'Gerar Copies'}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Area */}
          <div className="space-y-6">
            {/* Copy Mode - 5 Copies */}
            {analysisMode === 'copy+prompt' ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copies para Redes Sociais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {copies.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                      <Copy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p>Faça upload de uma imagem para gerar copies promocionais</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {copies.map((copyText, index) => (
                        <div key={index} className="border border-blue-200 rounded-lg overflow-hidden">
                          <div className="bg-blue-50 px-4 py-2 border-b border-blue-200">
                            <h4 className="font-medium text-blue-900 text-sm">
                              Copy #{index + 1} - {
                                index === 0 ? 'Urgência' : 
                                index === 1 ? 'Benefícios' : 
                                index === 2 ? 'Emoção' : 
                                index === 3 ? 'Autoridade' : 'Curiosidade'
                              }
                            </h4>
                          </div>
                          <div className="p-4 bg-white">
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-3">
                              {copyText}
                            </p>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(copyText)
                                alert(`Copy #${index + 1} copiada!`)
                              }}
                              className="flex items-center justify-center w-full px-3 py-3 text-sm bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900 rounded-lg border transition-colors"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copiar Copy #{index + 1}
                            </button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" onClick={clearAll} className="w-full mt-4">
                        Nova Imagem
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Prompt Mode */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
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
            )}
          </div>
        </div>

        {/* Tips */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">💡 Dicas para melhores resultados:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📸 Qualidade da Imagem:</h4>
                <ul className="space-y-1">
                  <li>• Use imagens com boa qualidade e iluminação</li>
                  <li>• Evite imagens muito pequenas ou borradas</li>
                  <li>• Funciona melhor com produtos bem visíveis</li>
                  <li>• Prefira fundos limpos para produtos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🎯 Modos de Análise:</h4>
                <ul className="space-y-1">
                  <li>• <strong>Apenas Prompt:</strong> Para usar em DALL-E, Midjourney, etc.</li>
                  <li>• <strong>Copy + Prompt:</strong> Gera copy de vendas + prompt</li>
                  <li>• Copy ideal para Instagram, Facebook, LinkedIn</li>
                  <li>• Funciona bem com produtos, comida, tecnologia</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}