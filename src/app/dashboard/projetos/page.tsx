'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Calendar, User, MoreVertical, Eye, Edit, Trash2, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  name: string
  type: string
  description: string
  createdAt: string
  status: string
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

export default function ProjetosPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [loading, setLoading] = useState(true)

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // Carregar projetos do localStorage específicos do usuário
    const loadProjects = () => {
      if (!user?.id) {
        setLoading(false)
        return
      }

      try {
        const userProjectsKey = `projects_${user.id}`
        const savedProjects = localStorage.getItem(userProjectsKey)
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects))
        }
      } catch (error) {
        console.error('Erro ao carregar projetos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [user])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || project.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId)
      setProjects(updatedProjects)
      
      // Salvar com chave específica do usuário
      if (user?.id) {
        const userProjectsKey = `projects_${user.id}`
        localStorage.setItem(userProjectsKey, JSON.stringify(updatedProjects))
        
        // Limpar copies deste projeto também
        localStorage.removeItem(`copies-${projectId}`)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#693ee0]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Meus Projetos
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Gerencie todos os seus projetos de copy
              </p>
            </div>
            
            <Link href="/dashboard/novo-projeto">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Projeto
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent outline-none"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent outline-none"
          >
            <option value="all">Todos os tipos</option>
            {Object.entries(projectTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {projects.length === 0 ? 'Nenhum projeto criado' : 'Nenhum projeto encontrado'}
              </h3>
              <p className="text-gray-600 mb-6">
                {projects.length === 0 
                  ? 'Crie seu primeiro projeto para começar a gerar copy com IA'
                  : 'Tente ajustar os filtros ou termo de busca'
                }
              </p>
              {projects.length === 0 && (
                <Link href="/dashboard/novo-projeto">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Projeto
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${projectTypeColors[project.type] || 'bg-gray-100 text-gray-800'}`}>
                          {projectTypeLabels[project.type] || project.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(project.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                      
                      {/* Dropdown menu - simplified for now */}
                      <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                          onClick={() => router.push(`/dashboard/projeto/${project.id}`)}
                        >
                          <Eye className="h-3 w-3" />
                          Ver
                        </button>
                        <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                          <Edit className="h-3 w-3" />
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {project.description || 'Nenhuma descrição fornecida'}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(project.createdAt)}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      project.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Botão ATUALIZADO - estilo novo chat */}
                  <Link href={`/dashboard/projeto/${project.id}`} className="block w-full">
                    <button className="flex items-center justify-center w-full px-3 py-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg border transition-colors">
                      <Eye className="h-4 w-4 mr-2" />
                      🚀 ABRIR PROJETO AGORA
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        {projects.length > 0 && (
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
                <div className="text-sm text-gray-600">Total de Projetos</div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'ativo').length}
                </div>
                <div className="text-sm text-gray-600">Projetos Ativos</div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {new Set(projects.map(p => p.type)).size}
                </div>
                <div className="text-sm text-gray-600">Tipos Diferentes</div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {projects.filter(p => 
                    new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length}
                </div>
                <div className="text-sm text-gray-600">Última Semana</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}