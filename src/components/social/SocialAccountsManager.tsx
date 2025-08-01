'use client'

import { useState, useEffect } from 'react'
import { Plus, X, Check, AlertTriangle, Settings, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { SOCIAL_PLATFORMS } from '@/lib/social-apis'
import { socialPostingService } from '@/services/social-posting'

interface SocialAccount {
  id: string
  platform: 'FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN' | 'TWITTER'
  username: string
  isActive: boolean
  createdAt: string
}

interface SocialAccountsManagerProps {
  userId: string
  onAccountChange?: () => void
}

export default function SocialAccountsManager({ userId, onAccountChange }: SocialAccountsManagerProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)

  useEffect(() => {
    fetchAccounts()
    
    // Verificar se voltou da autenticação do Facebook
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    const error = urlParams.get('error')
    
    if (success === 'facebook_connected') {
      alert('✅ Facebook conectado com sucesso!')
      // Limpar parâmetros da URL
      window.history.replaceState({}, document.title, window.location.pathname)
      fetchAccounts()
    } else if (error) {
      alert(`❌ Erro ao conectar: ${error}`)
      // Limpar parâmetros da URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [userId])

  const fetchAccounts = async () => {
    try {
      if (!userId) return

      const response = await fetch('/api/social/accounts', {
        headers: {
          'x-user-id': userId
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setAccounts(result.data)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar contas sociais:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (platform: string) => {
    setConnecting(platform)
    
    try {
      if (platform.toLowerCase() === 'facebook') {
        // OAuth real para Facebook
        await connectFacebook()
      } else {
        // Simulação para outras plataformas
        alert(`Conectando ${platform}... (simulação)`)
        await simulateOAuthConnection(platform)
        await fetchAccounts()
        if (onAccountChange) onAccountChange()
      }
    } catch (error) {
      console.error('Erro ao conectar conta:', error)
      alert('Erro ao conectar conta. Tente novamente.')
    } finally {
      setConnecting(null)
    }
  }

  const connectFacebook = async () => {
    const userData = localStorage.getItem('auth_user')
    if (!userData) {
      throw new Error('Usuário não autenticado')
    }
    
    const user = JSON.parse(userData)
    
    // Redirecionar para OAuth do Facebook
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || 'test-app-id'}` +
      `&redirect_uri=${encodeURIComponent(window.location.origin + '/api/auth/facebook/callback')}` +
      `&scope=email,public_profile` +
      `&state=${user.id}` + // Passar userId como state
      `&response_type=code`
    
    // Abrir popup ou redirecionar
    window.location.href = facebookAuthUrl
  }

  const testPosting = async () => {
    try {
      const result = await socialPostingService.createPost({
        content: '🚀 Testando publicação via CopyBR!\n\nEste é um teste de integração com redes sociais.',
        platforms: ['facebook', 'instagram', 'linkedin'],
        scheduleDate: new Date().toISOString()
      })

      if (result.success) {
        alert(`✅ ${result.message}`)
        if (result.postId?.startsWith('manual_')) {
          // Mostra instruções para publicação manual
          const instructions = socialPostingService.getPostInstructions(result.postId)
          if (instructions) {
            const instructionText = instructions.instructions.join('\n')
            if (confirm(`${result.message}\n\n${instructionText}\n\nDeseja marcar como publicado?`)) {
              socialPostingService.markPostAsCompleted(result.postId)
            }
          }
        }
      } else {
        alert(`❌ ${result.message}`)
      }
    } catch (error) {
      console.error('Erro no teste:', error)
      alert('Erro ao testar publicação')
    }
  }

  const handleDisconnect = async (accountId: string) => {
    if (!confirm('Tem certeza que deseja desconectar esta conta?')) return

    try {
      const userData = localStorage.getItem('auth_user')
      if (!userData) return

      const user = JSON.parse(userData)

      const response = await fetch(`/api/social/accounts/${accountId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user.id
        }
      })

      if (response.ok) {
        await fetchAccounts()
        if (onAccountChange) onAccountChange()
      }
    } catch (error) {
      console.error('Erro ao desconectar conta:', error)
    }
  }

  const handleToggleActive = async (accountId: string, isActive: boolean) => {
    try {
      const userData = localStorage.getItem('auth_user')
      if (!userData) return

      const user = JSON.parse(userData)

      const response = await fetch(`/api/social/accounts/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id
        },
        body: JSON.stringify({ isActive })
      })

      if (response.ok) {
        await fetchAccounts()
        if (onAccountChange) onAccountChange()
      }
    } catch (error) {
      console.error('Erro ao atualizar conta:', error)
    }
  }

  // Simulação de conexão OAuth (substituir por implementação real)
  const simulateOAuthConnection = async (platform: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        const userData = localStorage.getItem('auth_user')
        if (!userData) return

        const user = JSON.parse(userData)

        // Simular dados da conexão
        const mockData = {
          platform: platform.toUpperCase(),
          username: `user_${platform.toLowerCase()}`,
          accessToken: `mock_token_${Date.now()}`,
          refreshToken: `refresh_${Date.now()}`,
          expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() // 60 dias
        }

        await fetch('/api/social/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user.id
          },
          body: JSON.stringify(mockData)
        })

        resolve()
      }, 2000) // Simular delay de conexão
    })
  }

  const getPlatformInfo = (platform: string) => {
    const platformKey = platform.toLowerCase() as keyof typeof SOCIAL_PLATFORMS
    return SOCIAL_PLATFORMS[platformKey] || {
      name: platform,
      icon: '📱',
      color: 'bg-gray-600'
    }
  }

  const getConnectedAccount = (platform: string) => {
    return accounts.find(acc => acc.platform === platform.toUpperCase())
  }

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
      {/* Social Media Publishing Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Publicação em Redes Sociais
          </CardTitle>
          <CardDescription>
            Gere instruções claras para publicar seu conteúdo em todas as redes sociais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 mb-2">
                <strong>Como funciona:</strong>
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Clique "Gerar Post" para criar instruções</li>
                <li>• Copie o conteúdo otimizado</li>
                <li>• Publique manualmente em cada rede</li>
                <li>• Simples, rápido e funciona sempre!</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={testPosting}>
                📝 Gerar Post para Redes Sociais
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Contas Sociais Conectadas
          </CardTitle>
          <CardDescription>
            Conecte suas redes sociais para publicar automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(SOCIAL_PLATFORMS).map(([key, platform]) => {
              const connectedAccount = getConnectedAccount(key)
              const isConnecting = connecting === key

              return (
                <div
                  key={key}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    connectedAccount
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white text-lg`}>
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{platform.name}</h3>
                        {connectedAccount ? (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">@{connectedAccount.username}</span>
                            {connectedAccount.isActive ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Não conectado</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {connectedAccount ? (
                        <>
                          <button
                            onClick={() => handleToggleActive(connectedAccount.id, !connectedAccount.isActive)}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              connectedAccount.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {connectedAccount.isActive ? 'Ativo' : 'Inativo'}
                          </button>
                          <button
                            onClick={() => handleDisconnect(connectedAccount.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Desconectar"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleConnect(key)}
                          disabled={isConnecting}
                          className="h-8"
                        >
                          {isConnecting ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                          ) : (
                            <>
                              <Plus className="h-3 w-3 mr-1" />
                              Conectar
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {connectedAccount && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Conectado em {new Date(connectedAccount.createdAt).toLocaleDateString('pt-BR')}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {accounts.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg mt-4">
              <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Nenhuma conta conectada
              </h3>
              <p className="text-xs text-gray-500">
                Conecte suas redes sociais para começar a publicar automaticamente
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {accounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Como funciona</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>• ✅ <strong>Contas ativas:</strong> Permitem publicação automática</p>
            <p>• ⏸️ <strong>Contas inativas:</strong> Mantém conexão mas não publica</p>
            <p>• 🔄 <strong>Reconexão:</strong> Clique em "Conectar" novamente se houver problemas</p>
            <p>• 🔒 <strong>Segurança:</strong> Tokens são criptografados e podem ser revogados a qualquer momento</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}