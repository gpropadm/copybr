'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Calendar, User, Tag, FileText, Plus, Copy, Eye, Edit, Trash2, MessageSquare } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import CopyGenerator from '@/components/copy/CopyGenerator'
import ABTestButton from '@/components/ab-testing/ABTestButton'

interface Project {
  id: string
  name: string
  type: string
  description: string
  createdAt: string
  status: string
}

interface CopyItem {
  id: string
  text: string
  template: string
  createdAt: string
  score?: number
}

const projectTypeLabels: {[key: string]: string} = {
  'vendas': 'Vendas',
  'marketing': 'Marketing Digital',
  'redes-sociais': 'Redes Sociais',
  'empresarial': 'Empresarial',
  'ecommerce': 'E-commerce',
  'conteudo': 'Conteúdo'
}

const projectTypeColors: {[key: string]: string} = {
  'vendas': 'bg-green-100 text-green-800',
  'marketing': 'bg-blue-100 text-blue-800',
  'redes-sociais': 'bg-purple-100 text-purple-800',
  'empresarial': 'bg-gray-100 text-gray-800',
  'ecommerce': 'bg-orange-100 text-orange-800',
  'conteudo': 'bg-indigo-100 text-indigo-800'
}

export default function ProjetoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = params.id as string
  
  // Verificar se existe parâmetro de tab na URL
  const initialTab = searchParams.get('tab') as 'overview' | 'generate' | 'copies' || 'overview'
  
  const [project, setProject] = useState<Project | null>(null)
  const [copies, setCopies] = useState<CopyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'generate' | 'copies'>(initialTab)

  useEffect(() => {
    const loadProject = async () => {
      try {
        // Obter dados do usuário logado
        const userData = localStorage.getItem('auth_user')
        if (!userData) {
          router.push('/login')
          return
        }
        
        const user = JSON.parse(userData)
        
        // Carregar projeto da API
        const response = await fetch(`/api/projects/${projectId}`, {
          headers: {
            'x-user-id': user.id
          }
        })
        
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setProject(result.data)
            
            // Se há copies na resposta da API, usar eles
            if (result.data.copies) {
              setCopies(result.data.copies)
            }
          } else {
            router.push('/dashboard')
            return
          }
        } else {
          router.push('/dashboard')
          return
        }

        // Fallback: carregar copies do localStorage
        const savedCopies = localStorage.getItem(`copies-${projectId}`)
        if (savedCopies) {
          const localCopies = JSON.parse(savedCopies)
          setCopies(prev => prev.length > 0 ? prev : localCopies)
        }
      } catch (error) {
        console.error('Erro ao carregar projeto:', error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [projectId, router])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleCopyGenerated = (newCopies: any[]) => {
    const copyItems: CopyItem[] = newCopies.map(copy => ({
      id: copy.id,
      text: copy.text,
      template: 'facebook-ad', // TODO: Pegar template usado
      createdAt: new Date().toISOString(),
      score: copy.score
    }))
    
    const updatedCopies = [...copyItems, ...copies]
    setCopies(updatedCopies)
    
    // Salvar no localStorage
    localStorage.setItem(`copies-${projectId}`, JSON.stringify(updatedCopies))
    
    // Mudar para aba de copies
    setActiveTab('copies')
  }

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
    // TODO: Mostrar toast de sucesso
  }

  const handleDeleteCopy = (copyId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este copy?')) {
      const updatedCopies = copies.filter(c => c.id !== copyId)
      setCopies(updatedCopies)
      localStorage.setItem(`copies-${projectId}`, JSON.stringify(updatedCopies))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#693ee0]"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Projeto não encontrado</h2>
          <p className="text-gray-600 mb-4">O projeto que você está procurando não existe ou foi removido.</p>
          <Link href="/dashboard/projetos">
            <Button>Voltar aos Projetos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/dashboard/projetos" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Projetos
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {project.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className={`px-2 py-1 rounded-full text-xs ${projectTypeColors[project.type]}`}>
                  {projectTypeLabels[project.type]}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Criado em {formatDate(project.createdAt)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
          
          {project.description && (
            <p className="text-gray-600 mt-3 max-w-3xl">
              {project.description}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-[#693ee0] text-[#693ee0]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'generate'
                    ? 'border-[#693ee0] text-[#693ee0]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Gerar Copy
              </button>
              <button
                onClick={() => setActiveTab('copies')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'copies'
                    ? 'border-[#693ee0] text-[#693ee0]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Copies ({copies.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Stats */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas do Projeto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#693ee0]">{copies.length}</div>
                      <div className="text-sm text-gray-600">Copies Gerados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {copies.filter(c => (c.score || 0) > 70).length}
                      </div>
                      <div className="text-sm text-gray-600">Alta Qualidade</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {new Set(copies.map(c => c.template)).size}
                      </div>
                      <div className="text-sm text-gray-600">Templates Usados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {copies.filter(c => 
                          new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                        ).length}
                      </div>
                      <div className="text-sm text-gray-600">Esta Semana</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Copies */}
              <Card>
                <CardHeader>
                  <CardTitle>Copies Recentes</CardTitle>
                  <CardDescription>Últimos copies gerados para este projeto</CardDescription>
                </CardHeader>
                <CardContent>
                  {copies.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Nenhum copy gerado ainda</p>
                      <Button onClick={() => setActiveTab('generate')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Gerar Primeiro Copy
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {copies.slice(0, 3).map((copy) => (
                        <div key={copy.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-sm text-gray-900 line-clamp-2">{copy.text}</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                <span>{formatDate(copy.createdAt)}</span>
                                {copy.score && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                    Score: {Math.round(copy.score)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleCopyText(copy.text)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                              title="Copiar texto"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {copies.length > 3 && (
                        <div className="text-center">
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab('copies')}
                          >
                            Ver Todos ({copies.length})
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Projeto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nome</label>
                    <p className="text-sm text-gray-900 mt-1">{project.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tipo</label>
                    <p className="text-sm text-gray-900 mt-1">{projectTypeLabels[project.type]}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{project.status}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Criado em</label>
                    <p className="text-sm text-gray-900 mt-1">{formatDate(project.createdAt)}</p>
                  </div>
                  
                  {project.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Descrição</label>
                      <p className="text-sm text-gray-900 mt-1">{project.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => setActiveTab('generate')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Gerar Novo Copy
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('copies')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Todos os Copies
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Projeto
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Gerar Novo Copy</CardTitle>
                <CardDescription>
                  Use a IA para gerar copies personalizados para {project.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CopyGenerator onCopyGenerated={handleCopyGenerated} />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'copies' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Todos os Copies ({copies.length})
              </h2>
              <Button onClick={() => setActiveTab('generate')}>
                <Plus className="h-4 w-4 mr-2" />
                Gerar Novo
              </Button>
            </div>

            {copies.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum copy gerado ainda
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Comece gerando seu primeiro copy com IA para este projeto
                  </p>
                  <Button onClick={() => setActiveTab('generate')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Gerar Primeiro Copy
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {copies.map((copy) => (
                  <Card key={copy.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-gray-900 mb-3 leading-relaxed">{copy.text}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(copy.createdAt)}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {copy.template}
                            </span>
                            {copy.score && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                Score: {Math.round(copy.score)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ABTestButton 
                            copyId={copy.id}
                            aiScore={copy.score || 0}
                            copyContent={copy.text}
                          />
                          <button
                            onClick={() => handleCopyText(copy.text)}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                            title="Copiar texto"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCopy(copy.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Excluir copy"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}