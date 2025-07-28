'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Check, X, AlertTriangle, Eye, Trash2, Edit } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Post {
  id: string
  content: string
  platform: 'FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN' | 'TWITTER'
  status: 'PUBLISHED' | 'SCHEDULED' | 'FAILED' | 'DRAFT'
  scheduledFor?: string
  publishedAt?: string
  createdAt: string
  socialAccountId: string
  socialAccount?: {
    platform: string
    username: string
    isActive: boolean
  }
}

interface PostsDashboardProps {
  userId: string
}

export default function PostsDashboard({ userId }: PostsDashboardProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    fetchPosts()
  }, [userId])

  const fetchPosts = async () => {
    try {
      if (!userId) return

      const response = await fetch('/api/social/publish?limit=100', {
        headers: {
          'x-user-id': userId
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setPosts(result.data.posts || [])
        }
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return

    try {
      const response = await fetch(`/api/social/publish/${postId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': userId
        }
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId))
      }
    } catch (error) {
      console.error('Erro ao excluir post:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <Check className="h-4 w-4 text-green-600" />
      case 'SCHEDULED':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'FAILED':
        return <X className="h-4 w-4 text-red-600" />
      case 'DRAFT':
        return <Edit className="h-4 w-4 text-gray-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-orange-100 text-orange-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'Publicado'
      case 'SCHEDULED':
        return 'Agendado'
      case 'FAILED':
        return 'Falhou'
      case 'DRAFT':
        return 'Rascunho'
      default:
        return status
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return '📘'
      case 'instagram':
        return '📷'
      case 'linkedin':
        return '💼'
      case 'twitter':
        return '🐦'
      default:
        return '📱'
    }
  }

  const filteredPosts = selectedStatus === 'all' 
    ? posts 
    : posts.filter(post => post.status === selectedStatus)

  const statusOptions = [
    { value: 'all', label: 'Todos', count: posts.length },
    { value: 'PUBLISHED', label: 'Publicados', count: posts.filter(p => p.status === 'PUBLISHED').length },
    { value: 'SCHEDULED', label: 'Agendados', count: posts.filter(p => p.status === 'SCHEDULED').length },
    { value: 'FAILED', label: 'Falharam', count: posts.filter(p => p.status === 'FAILED').length },
    { value: 'DRAFT', label: 'Rascunhos', count: posts.filter(p => p.status === 'DRAFT').length }
  ]

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#693ee0]"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Histórico de Posts
          </CardTitle>
          <CardDescription>
            Gerencie todos os seus posts publicados e agendados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-6">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedStatus(option.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedStatus === option.value
                    ? 'bg-[#693ee0] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>

          {/* Lista de Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Nenhum post encontrado
              </h3>
              <p className="text-xs text-gray-500">
                {selectedStatus === 'all' 
                  ? 'Você ainda não publicou nenhum post'
                  : `Nenhum post com status "${getStatusLabel(selectedStatus)}"`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Header do Post */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">
                          {getPlatformIcon(post.platform)}
                        </span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(post.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                            {getStatusLabel(post.status)}
                          </span>
                        </div>
                        {post.socialAccount && (
                          <span className="text-sm text-gray-500">
                            @{post.socialAccount.username}
                          </span>
                        )}
                      </div>

                      {/* Conteúdo do Post */}
                      <div className="mb-3">
                        <p className="text-sm text-gray-900 line-clamp-3">
                          {post.content}
                        </p>
                      </div>

                      {/* Informações de Data */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Criado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        
                        {post.status === 'SCHEDULED' && post.scheduledFor && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              Agendado para {new Date(post.scheduledFor).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        )}
                        
                        {post.status === 'PUBLISHED' && post.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            <span>
                              Publicado em {new Date(post.publishedAt).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estatísticas Resumidas */}
      {posts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {posts.filter(p => p.status === 'PUBLISHED').length}
              </div>
              <div className="text-sm text-gray-600">Publicados</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {posts.filter(p => p.status === 'SCHEDULED').length}
              </div>
              <div className="text-sm text-gray-600">Agendados</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {posts.filter(p => p.status === 'FAILED').length}
              </div>
              <div className="text-sm text-gray-600">Falharam</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {posts.filter(p => p.status === 'DRAFT').length}
              </div>
              <div className="text-sm text-gray-600">Rascunhos</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}