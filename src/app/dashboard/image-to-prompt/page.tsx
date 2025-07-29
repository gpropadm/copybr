'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Copy, Image as ImageIcon, Sparkles, Download, X, History, Heart, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface HistoryEntry {
  id: string
  image: string
  type: 'prompt' | 'copies'
  prompt?: string
  copies?: string[]
  createdAt: string
  isFavorite: boolean
}

export default function ImageToPromptPage() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [copy, setCopy] = useState('')
  const [copies, setCopies] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [analysisMode, setAnalysisMode] = useState<'prompt' | 'copy+prompt'>('prompt')
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Carregar histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('image_to_prompt_history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Salvar no histórico
  const saveToHistory = (type: 'prompt' | 'copies', generatedPrompt?: string, generatedCopies?: string[]) => {
    if (!image) return

    const entry: HistoryEntry = {
      id: Date.now().toString(),
      image,
      type,
      prompt: generatedPrompt,
      copies: generatedCopies,
      createdAt: new Date().toISOString(),
      isFavorite: false
    }

    const newHistory = [entry, ...history].slice(0, 50) // Manter apenas 50 entradas
    setHistory(newHistory)
    localStorage.setItem('image_to_prompt_history', JSON.stringify(newHistory))
  }

  // Toggle favorito
  const toggleFavorite = (id: string) => {
    const newHistory = history.map(entry => 
      entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
    )
    setHistory(newHistory)
    localStorage.setItem('image_to_prompt_history', JSON.stringify(newHistory))
  }

  // Limpar histórico
  const clearHistory = () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
      setHistory([])
      localStorage.removeItem('image_to_prompt_history')
    }
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

  const copyCopy = () => {
    navigator.clipboard.writeText(copy)
    alert('Copy copiada!')
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
          <div className="mt-4 flex gap-2 items-center justify-between">
            <div className="flex gap-2">
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
            
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                showHistory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <History className="h-4 w-4" />
              Histórico ({history.length})
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

        {/* History */}
        {showHistory && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Histórico de Gerações
                </span>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded border border-red-200 hover:bg-red-50"
                  >
                    Limpar Tudo
                  </button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>Nenhum histórico ainda</p>
                  <p className="text-sm">Gere prompts ou copies para começar seu histórico</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {history.map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={entry.image} 
                          alt="Generated"
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                entry.type === 'prompt' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {entry.type === 'prompt' ? 'Prompt' : `${entry.copies?.length || 0} Copies`}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {new Date(entry.createdAt).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>
                            <button
                              onClick={() => toggleFavorite(entry.id)}
                              className={`p-1 rounded transition-colors ${
                                entry.isFavorite 
                                  ? 'text-red-500 hover:text-red-600' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${entry.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                          
                          {entry.type === 'prompt' && entry.prompt ? (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-800" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical' as const,
                                overflow: 'hidden'
                              }}>
                                {entry.prompt}
                              </p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(entry.prompt!)
                                  alert('Prompt copiado!')
                                }}
                                className="text-xs text-blue-600 hover:text-blue-700"
                              >
                                Copiar prompt
                              </button>
                            </div>
                          ) : entry.copies ? (
                            <div className="space-y-2">
                              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                                {entry.copies.map((copyText, index) => (
                                  <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                                    <div className="flex justify-between items-start">
                                      <p className="flex-1" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical' as const,
                                        overflow: 'hidden'
                                      }}>{copyText}</p>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(copyText)
                                          alert(`Copy #${index + 1} copiada!`)
                                        }}
                                        className="ml-2 text-blue-600 hover:text-blue-700 flex-shrink-0"
                                      >
                                        <Copy className="h-3 w-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

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