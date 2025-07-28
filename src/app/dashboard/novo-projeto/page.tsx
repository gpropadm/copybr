'use client'
import { useState } from 'react'
import { Save, FileText, Target, Lightbulb, Users, Briefcase, ShoppingCart, Heart, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

const projectTypes = [
  {
    id: 'vendas',
    name: 'Vendas',
    icon: Target,
    description: 'Crie textos persuasivos para vendas e conversões',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 'marketing',
    name: 'Marketing Digital',
    icon: Lightbulb,
    description: 'Conteúdo para campanhas e estratégias digitais',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'redes-sociais',
    name: 'Redes Sociais',
    icon: Users,
    description: 'Posts e conteúdo para redes sociais',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    icon: Briefcase,
    description: 'Comunicação corporativa e institucional',
    color: 'bg-gray-100 text-gray-700'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingCart,
    description: 'Descrições de produtos e copy para lojas online',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'conteudo',
    name: 'Conteúdo',
    icon: FileText,
    description: 'Artigos, blogs e materiais educativos',
    color: 'bg-indigo-100 text-indigo-700'
  }
]

export default function NovoProjetoPage() {
  const [projectName, setProjectName] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!projectName.trim()) {
      newErrors.projectName = 'Nome do projeto é obrigatório'
    } else if (projectName.trim().length < 3) {
      newErrors.projectName = 'Nome deve ter pelo menos 3 caracteres'
    }
    
    if (!selectedType) {
      newErrors.selectedType = 'Selecione um tipo de projeto'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateProject = async () => {
    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    try {
      // Obter dados do usuário logado
      const userData = localStorage.getItem('auth_user')
      if (!userData) {
        setErrors({ general: 'Usuário não autenticado' })
        return
      }
      
      const user = JSON.parse(userData)
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id
        },
        body: JSON.stringify({
          name: projectName.trim(),
          type: selectedType,
          description: description.trim() || undefined
        })
      })

      const result = await response.json()

      if (!result.success) {
        setErrors({ general: result.error || 'Erro ao criar projeto' })
        return
      }
      
      setSuccess(true)
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
      
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
      setErrors({ general: 'Erro ao criar projeto. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Criar Novo Projeto
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Configure seu projeto e comece a criar copy com IA
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Nome do Projeto */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Informações Básicas
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Projeto *
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value)
                      if (errors.projectName) {
                        setErrors(prev => ({ ...prev, projectName: '' }))
                      }
                    }}
                    placeholder="Ex: Campanha Black Friday 2024"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
                      errors.projectName 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-[#693ee0]'
                    }`}
                  />
                  {errors.projectName && (
                    <div className="flex items-center mt-1 text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">{errors.projectName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva brevemente o objetivo deste projeto..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Tipo de Projeto */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Tipo de Projeto *
              </h2>
              
              {errors.selectedType && (
                <div className="flex items-center mb-4 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">{errors.selectedType}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {projectTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id)
                        if (errors.selectedType) {
                          setErrors(prev => ({ ...prev, selectedType: '' }))
                        }
                      }}
                      className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedType === type.id
                          ? 'border-[#693ee0] bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${type.color} flex-shrink-0`}>
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                            {type.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Resumo */}
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Resumo do Projeto
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Nome:</span>
                  <p className="font-medium text-gray-900">
                    {projectName || 'Não definido'}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Tipo:</span>
                  <p className="font-medium text-gray-900">
                    {selectedType ? projectTypes.find(t => t.id === selectedType)?.name : 'Não selecionado'}
                  </p>
                </div>
                
                {description && (
                  <div>
                    <span className="text-sm text-gray-600">Descrição:</span>
                    <p className="text-sm text-gray-900 mt-1">
                      {description}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Ação */}
            <Card className="p-6">
              <Button
                onClick={handleCreateProject}
                disabled={!projectName.trim() || !selectedType || loading}
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Criando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Criar Projeto
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                Você poderá editar essas informações depois
              </p>
            </Card>

            {/* Dica */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-purple-900 mb-1">
                    Dica Pro
                  </h4>
                  <p className="text-xs text-purple-700">
                    Escolha o tipo certo para seu projeto. Isso ajuda a IA a gerar textos mais precisos e adequados ao seu objetivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Projeto Criado!
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Seu projeto foi criado com sucesso. Redirecionando para o dashboard...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#693ee0] h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{errors.general}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}