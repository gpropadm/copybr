'use client'

import { useState } from 'react'
import { Smartphone, Layout, Code, Sparkles, ArrowRight, Eye, Download, Copy } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function AppBuilder() {
  const [step, setStep] = useState<'idea' | 'layout' | 'app'>('idea')
  const [idea, setIdea] = useState('')
  const [layoutCode, setLayoutCode] = useState('')
  const [appCode, setAppCode] = useState('')
  const [loading, setLoading] = useState(false)

  const generateLayout = async () => {
    if (!idea.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/generate-app-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      })
      
      const data = await response.json()
      setLayoutCode(data.layout)
      setStep('layout')
    } catch (error) {
      console.error('Erro ao gerar layout:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateApp = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-app-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, layout: layoutCode })
      })
      
      const data = await response.json()
      setAppCode(data.app)
      setStep('app')
    } catch (error) {
      console.error('Erro ao gerar app:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    alert('Código copiado!')
  }

  const downloadFile = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            App Builder IA
          </h1>
          <p className="text-xl text-gray-600">
            Especialista em desenvolvimento de apps • Layout → Código
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              step === 'idea' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'
            }`}>
              <Sparkles className="h-4 w-4" />
              <span>1. Descreva sua ideia</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              step === 'layout' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
            }`}>
              <Layout className="h-4 w-4" />
              <span>2. Layout Visual</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              step === 'app' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
            }`}>
              <Code className="h-4 w-4" />
              <span>3. App Funcional</span>
            </div>
          </div>
        </div>

        {/* Step 1: Idea Input */}
        {step === 'idea' && (
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Qual app você quer criar?
                </h2>
                <p className="text-gray-600">
                  Descreva sua ideia em detalhes. Quanto mais específico, melhor o resultado!
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Ex: Um app de delivery de comida com carrinho de compras, sistema de pagamento PIX, avaliações de restaurantes, rastreamento de pedidos em tempo real..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Dicas para uma boa descrição:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Mencione o tipo de app (e-commerce, social, produtividade, etc.)</li>
                    <li>• Descreva as principais funcionalidades</li>
                    <li>• Inclua detalhes sobre design e cores preferidas</li>
                    <li>• Fale sobre o público-alvo</li>
                  </ul>
                </div>

                <Button 
                  onClick={generateLayout}
                  disabled={loading || !idea.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Gerando Layout...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Layout className="h-5 w-5" />
                      <span>Gerar Layout Visual</span>
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Layout Preview */}
        {step === 'layout' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Layout Preview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Layout Gerado</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(layoutCode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(layoutCode, 'layout.html')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={layoutCode}
                    className="w-full h-96 border-0"
                    title="Layout Preview"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Próximos Passos</h3>
                
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Layout Criado!</h4>
                    <p className="text-sm text-green-800">
                      Seu layout visual está pronto. Agora você pode gerar o app funcional completo.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={generateApp}
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Gerando App...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Code className="h-5 w-5" />
                          <span>Gerar App Funcional</span>
                        </div>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setStep('idea')}
                      className="w-full"
                    >
                      Refazer Layout
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p><strong>Sua ideia:</strong> {idea}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: App Code */}
        {step === 'app' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* App Preview */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">App Funcional</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(appCode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(appCode, 'app.html')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={appCode}
                    className="w-full h-96 border-0"
                    title="App Preview"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Success & Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎉 App Criado!</h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Seu app está pronto!</h4>
                    <p className="text-sm text-blue-800">
                      Código HTML completo e funcional com todas as interações.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => downloadFile(appCode, 'meu-app.html')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Baixar App
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep('idea')
                        setIdea('')
                        setLayoutCode('')
                        setAppCode('')
                      }}
                      className="w-full"
                    >
                      Criar Novo App
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Sua ideia:</strong> {idea}</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-semibold mb-1">Recursos incluídos:</p>
                      <ul className="text-xs space-y-1">
                        <li>• HTML5 + CSS3 + JavaScript</li>
                        <li>• Design responsivo</li>
                        <li>• Interações funcionais</li>
                        <li>• Tailwind CSS</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}