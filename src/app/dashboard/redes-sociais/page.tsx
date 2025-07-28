'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Zap, Users, BarChart3, Settings, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import SocialAccountsManager from '@/components/social/SocialAccountsManager'
import PublishingSettings from '@/components/social/PublishingSettings'
import PostsDashboard from '@/components/social/PostsDashboard'

export default function RedesSociaisPage() {
  const [activeTab, setActiveTab] = useState('contas')
  const [stats, setStats] = useState({
    connectedAccounts: 0,
    publishedPosts: 0,
    scheduledPosts: 0
  })
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    // Obter ID do usuário do localStorage
    const userData = localStorage.getItem('auth_user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserId(user.id)
    }
    
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const userData = localStorage.getItem('auth_user')
      if (!userData) return

      const user = JSON.parse(userData)

      // Carregar estatísticas
      const [accountsRes, postsRes] = await Promise.all([
        fetch('/api/social/accounts', {
          headers: { 'x-user-id': user.id }
        }),
        fetch('/api/social/publish?limit=1000', {
          headers: { 'x-user-id': user.id }
        })
      ])

      if (accountsRes.ok) {
        const accountsData = await accountsRes.json()
        if (accountsData.success) {
          setStats(prev => ({
            ...prev,
            connectedAccounts: accountsData.data.filter((acc: any) => acc.isActive).length
          }))
        }
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json()
        if (postsData.success) {
          const posts = postsData.data.posts
          setStats(prev => ({
            ...prev,
            publishedPosts: posts.filter((p: any) => p.status === 'PUBLISHED').length,
            scheduledPosts: posts.filter((p: any) => p.status === 'SCHEDULED').length
          }))
        }
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  const tabs = [
    { id: 'contas', label: 'Contas', icon: Users },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
    { id: 'posts', label: 'Posts', icon: TrendingUp }
  ]
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Redes Sociais
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Conecte suas redes sociais e publique automaticamente seus copies
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{stats.connectedAccounts}</div>
                    <div className="text-sm text-gray-600">Contas Conectadas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{stats.publishedPosts}</div>
                    <div className="text-sm text-gray-600">Posts Publicados</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{stats.scheduledPosts}</div>
                    <div className="text-sm text-gray-600">Agendados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="mb-8">
          <div className="border-b">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'contas' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {userId && <SocialAccountsManager userId={userId} />}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Benefícios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Publicação Automática</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Publique seus copies direto nas redes sociais sem sair da plataforma
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Múltiplas Contas</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Conecte várias contas de diferentes plataformas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Controle Total</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Ative/desative contas e escolha onde publicar
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle>🔒 Segurança</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>• <strong>Tokens criptografados:</strong> Suas credenciais são protegidas</p>
                  <p>• <strong>Permissões limitadas:</strong> Acesso apenas para publicação</p>
                  <p>• <strong>Revogação fácil:</strong> Desconecte a qualquer momento</p>
                  <p>• <strong>Conformidade:</strong> Seguimos as diretrizes oficiais das APIs</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'configuracoes' && (
          <div className="max-w-2xl">
            {userId && (
              <PublishingSettings 
                userId={userId} 
                onSettingsChange={() => {
                  loadStats() // Recarregar stats quando configurações mudarem
                }}
              />
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            {userId && <PostsDashboard userId={userId} />}
          </div>
        )}
      </div>
    </div>
  )
}