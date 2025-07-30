'use client'

import { useState } from 'react'
import { Copy, RefreshCw, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface CopyResult {
  id: string
  text: string
  score?: number
}

interface CopyGeneratorProps {
  onCopyGenerated?: (copies: CopyResult[]) => void
}

export default function CopyGenerator({ onCopyGenerated }: CopyGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('facebook-ad')
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CopyResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const templates = [
    { id: 'facebook-ad', name: 'Anúncio Facebook/Instagram', description: 'Copy persuasivo para redes sociais' },
    { id: 'email-subject', name: 'Assunto de Email', description: 'Linhas de assunto que convertem' },
    { id: 'product-description', name: 'Descrição de Produto', description: 'Descrições que vendem' },
    { id: 'blog-title', name: 'Título de Blog', description: 'Títulos que atraem cliques' },
    { id: 'landing-headline', name: 'Headline de Landing Page', description: 'Primeiras impressões que convertem' }
  ]

  const generateCopy = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    
    try {
      // Obter dados do usuário logado
      const userData = localStorage.getItem('auth_user')
      if (!userData) {
        console.error('Usuário não autenticado')
        return
      }
      
      const user = JSON.parse(userData)
      console.log('🔍 User data from localStorage:', user)
      console.log('🔍 User ID being sent:', user.id)
      
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id || 'fallback-user'
        },
        body: JSON.stringify({
          template: selectedTemplate,
          input: input.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Erro na geração do copy')
      }

      const data = await response.json()
      
      if (data.success) {
        setResults(data.data)
        // Notificar componente pai se callback foi fornecido
        if (onCopyGenerated) {
          onCopyGenerated(data.data)
        }
      } else {
        console.error('Erro:', data.error)
        // Aqui você pode mostrar um toast de erro
      }
    } catch (error) {
      console.error('Erro ao gerar copy:', error)
      // Aqui você pode mostrar um toast de erro
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Adicionar toast de sucesso aqui
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Escolha seu Template
          </CardTitle>
          <CardDescription>
            Selecione o tipo de copy que você deseja gerar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Descreva seu produto/serviço</CardTitle>
          <CardDescription>
            Quanto mais detalhes, melhor será o resultado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Curso online de marketing digital para empreendedores iniciantes, com 40 aulas práticas, certificado e suporte..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {input.length}/500 caracteres
            </span>
            <Button
              onClick={generateCopy}
              isLoading={isLoading}
              disabled={!input.trim() || isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Gerar Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Seus copies gerados</CardTitle>
            <CardDescription>
              Clique no ícone para copiar o texto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-gray-900 flex-1">{result.text}</p>
                    <button
                      onClick={() => copyToClipboard(result.text)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}