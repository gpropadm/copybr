'use client'
import { TrendingUp, Clock, Zap, Copy, Star, Calendar, Plus, Layout, FolderOpen, Folder, Edit3, Building, Users, Target, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Project {
  id: string
  name: string
  type: string
  description?: string
  status: string
  createdAt: string
  _count: {
    copies: number
  }
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCopies: 0,
    thisMonth: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // Obter dados do usuário logado
      const userData = localStorage.getItem('auth_user')
      if (!userData) {
        console.error('Usuário não autenticado')
        return
      }
      
      const user = JSON.parse(userData)
      
      const response = await fetch('/api/projects', {
        headers: {
          'x-user-id': user.id
        }
      })
      const result = await response.json()
      
      if (result.success) {
        setProjects(result.data)
        
        // Calcular estatísticas
        const totalProjects = result.data.length
        const totalCopies = result.data.reduce((sum: number, project: Project) => sum + project._count.copies, 0)
        const thisMonth = result.data.filter((project: Project) => {
          const projectDate = new Date(project.createdAt)
          const now = new Date()
          return projectDate.getMonth() === now.getMonth() && projectDate.getFullYear() === now.getFullYear()
        }).length
        
        setStats({ totalProjects, totalCopies, thisMonth })
      }
    } catch (error) {
      console.error('Erro ao buscar projetos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProjectTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'vendas': 'Vendas',
      'marketing': 'Marketing Digital',
      'redes-sociais': 'Redes Sociais',
      'empresarial': 'Empresarial',
      'ecommerce': 'E-commerce',
      'conteudo': 'Conteúdo'
    }
    return types[type] || type
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) {
      return 'Hoje'
    } else if (diffInDays === 1) {
      return 'Ontem'
    } else if (diffInDays < 7) {
      return `${diffInDays} dias atrás`
    } else {
      return date.toLocaleDateString('pt-BR')
    }
  }
  return (
    <div className="min-h-screen">
      {/* Welcome section - hidden on larger screens where we show full dashboard */}
      <div className="lg:hidden flex items-center justify-center min-h-[40vh] px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bem-vindo ao CopyBR
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Use o menu lateral para acessar suas ferramentas de criação de conteúdo
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Projetos Ativos</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{loading ? '...' : stats.totalProjects}</p>
                  <p className="text-xs text-green-600">+{stats.thisMonth} este mês</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <Folder className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Copies Criados</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{loading ? '...' : stats.totalCopies}</p>
                  <p className="text-xs text-blue-600">em todos os projetos</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <Copy className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Tipo Mais Usado</p>
                  <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate">
                    {loading ? '...' : (projects.length > 0 ? getProjectTypeLabel(projects[0]?.type) : 'Nenhum')}
                  </p>
                  <p className="text-xs text-purple-600">projeto principal</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Economia de Tempo</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{Math.floor(stats.totalCopies * 0.5)}h</p>
                  <p className="text-xs text-orange-600">vs criação manual</p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Dashboard Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  Resumo
                </CardTitle>
                <CardDescription>
                  Visão geral da sua conta CopyBR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard CopyBR</h3>
                  <p className="text-gray-600 mb-6">
                    {projects.length === 0 
                      ? 'Crie seu primeiro projeto para começar a gerar copies incríveis!'
                      : `Você tem ${projects.length} projeto${projects.length > 1 ? 's' : ''} ativo${projects.length > 1 ? 's' : ''}`
                    }
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <Link href="/dashboard/novo-projeto">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Projeto
                      </Button>
                    </Link>
                    <Link href="/dashboard/projetos">
                      <Button variant="outline">
                        <Folder className="h-4 w-4 mr-2" />
                        Ver Projetos
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 lg:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription>
                  O que você quer fazer agora?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/novo-projeto">
                  <Button className="w-full justify-start text-sm h-10 sm:h-11">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Projeto
                  </Button>
                </Link>
                <Link href="/gerar">
                  <Button variant="outline" className="w-full justify-start text-sm h-10 sm:h-11">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Criar Copy
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" className="w-full justify-start text-sm h-10 sm:h-11">
                    <Layout className="h-4 w-4 mr-2" />
                    Ver Templates
                  </Button>
                </Link>
                <Link href="/historico">
                  <Button variant="outline" className="w-full justify-start text-sm h-10 sm:h-11">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Meus Copies
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Seu Progresso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Projetos este mês</span>
                      <span>{stats.thisMonth}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${Math.min((stats.thisMonth / 10) * 100, 100)}%`}}></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {stats.thisMonth < 10 
                      ? `Você ainda pode criar ${10 - stats.thisMonth} projetos este mês.`
                      : 'Você atingiu o limite de projetos este mês!'
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Dica do Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>💡 Use números nos seus títulos!</strong> 
                  Títulos como "5 dicas" ou "3 segredos" chamam mais atenção que títulos genéricos.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Mais Dicas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}