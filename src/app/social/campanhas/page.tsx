'use client'

import { useState, useEffect } from 'react'
import { 
  Calendar,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Play,
  Image,
  Video,
  FileText,
  Globe,
  Target,
  Zap,
  Settings,
  BarChart3,
  Copy,
  RefreshCw,
  Download,
  Upload,
  Link as LinkIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Campaign {
  id: string
  title: string
  description: string
  clientId: string
  clientName: string
  status: 'scheduled' | 'published' | 'draft' | 'failed' | 'analyzing'
  platforms: {
    platform: string
    scheduled: boolean
    published: boolean
    scheduledTime?: Date
    postId?: string
    performance?: {
      views: number
      likes: number
      comments: number
      shares: number
      reach: number
      engagement: number
    }
  }[]
  contentType: 'image' | 'video' | 'carousel' | 'text' | 'story'
  mediaUrls: string[]
  caption: string
  hashtags: string[]
  mentions: string[]
  scheduledFor: Date
  createdAt: Date
  updatedAt: Date
  budget?: number
  targetAudience?: {
    ageRange: string
    location: string[]
    interests: string[]
    demographics: string
  }
  aiOptimizations?: {
    bestTimeToPost: string
    suggestedHashtags: string[]
    engagementPrediction: number
    reachPrediction: number
  }
}

interface PlatformConnection {
  platform: string
  connected: boolean
  accountName: string
  accountId: string
  followers: number
  permissions: string[]
  lastSync: Date
  apiStatus: 'active' | 'expired' | 'limited' | 'error'
}

export default function CampanhasPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [platforms, setPlatforms] = useState<PlatformConnection[]>([])
  const [selectedTab, setSelectedTab] = useState<'campaigns' | 'calendar' | 'platforms'>('campaigns')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Dados simulados - em produção viriam da API
  useEffect(() => {
    const mockPlatforms: PlatformConnection[] = [
      {
        platform: 'instagram',
        connected: true,
        accountName: '@techstartup',
        accountId: 'ig_12345',
        followers: 45200,
        permissions: ['publish_posts', 'read_insights', 'manage_comments'],
        lastSync: new Date('2024-11-30T10:00:00'),
        apiStatus: 'active'
      },
      {
        platform: 'facebook',
        connected: true,
        accountName: 'TechStartup Inc',
        accountId: 'fb_67890',
        followers: 28500,
        permissions: ['publish_posts', 'read_insights', 'manage_pages'],
        lastSync: new Date('2024-11-30T09:45:00'),
        apiStatus: 'active'
      },
      {
        platform: 'linkedin',
        connected: true,
        accountName: 'TechStartup Inc',
        accountId: 'li_54321',
        followers: 12800,
        permissions: ['publish_posts', 'read_analytics'],
        lastSync: new Date('2024-11-30T09:30:00'),
        apiStatus: 'active'
      },
      {
        platform: 'twitter',
        connected: false,
        accountName: '',
        accountId: '',
        followers: 0,
        permissions: [],
        lastSync: new Date(),
        apiStatus: 'error'
      },
      {
        platform: 'tiktok',
        connected: true,
        accountName: '@techstartup_official',
        accountId: 'tt_98765',
        followers: 89400,
        permissions: ['publish_videos', 'read_analytics'],
        lastSync: new Date('2024-11-29T16:20:00'),
        apiStatus: 'limited'
      },
      {
        platform: 'youtube',
        connected: false,
        accountName: '',
        accountId: '',
        followers: 0,
        permissions: [],
        lastSync: new Date(),
        apiStatus: 'error'
      }
    ]

    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        title: 'Black Friday Launch 2024',
        description: 'Campanha de lançamento da promoção Black Friday com desconto de até 70%',
        clientId: '1',
        clientName: 'TechStartup Inc',
        status: 'published',
        platforms: [
          {
            platform: 'instagram',
            scheduled: true,
            published: true,
            scheduledTime: new Date('2024-11-29T10:00:00'),
            postId: 'ig_post_123',
            performance: {
              views: 45200,
              likes: 2840,
              comments: 156,
              shares: 89,
              reach: 38600,
              engagement: 6.8
            }
          },
          {
            platform: 'facebook',
            scheduled: true,
            published: true,
            scheduledTime: new Date('2024-11-29T10:05:00'),
            postId: 'fb_post_456',
            performance: {
              views: 28900,
              likes: 1456,
              comments: 89,
              shares: 234,
              reach: 25400,
              engagement: 4.2
            }
          },
          {
            platform: 'linkedin',
            scheduled: true,
            published: true,
            scheduledTime: new Date('2024-11-29T11:00:00'),
            postId: 'li_post_789',
            performance: {
              views: 12800,
              likes: 856,
              comments: 45,
              shares: 67,
              reach: 10200,
              engagement: 8.1
            }
          }
        ],
        contentType: 'carousel',
        mediaUrls: ['/api/placeholder/600/600', '/api/placeholder/600/600', '/api/placeholder/600/600'],
        caption: '🔥 BLACK FRIDAY CHEGOU! Descontos imperdíveis de até 70% em toda nossa linha de produtos tech. Não perca essa oportunidade única!',
        hashtags: ['#BlackFriday', '#TechDeals', '#PromoçãoImperdível', '#TecnologiaAcessível'],
        mentions: ['@cliente1', '@parceiro_tech'],
        scheduledFor: new Date('2024-11-29T10:00:00'),
        createdAt: new Date('2024-11-25T14:30:00'),
        updatedAt: new Date('2024-11-29T10:05:00'),
        budget: 5000,
        targetAudience: {
          ageRange: '25-45',
          location: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
          interests: ['Tecnologia', 'Inovação', 'Startups'],
          demographics: 'Profissionais de TI e Empreendedores'
        },
        aiOptimizations: {
          bestTimeToPost: '10:00 - Sexta-feira',
          suggestedHashtags: ['#TechStartup', '#InovaçãoBrasil', '#DescontoTech'],
          engagementPrediction: 7.2,
          reachPrediction: 52000
        }
      },
      {
        id: '2',
        title: 'Novo Produto - AI Assistant Pro',
        description: 'Campanha de lançamento do novo produto AI Assistant Pro com demonstrações e cases de uso',
        clientId: '1',
        clientName: 'TechStartup Inc',
        status: 'scheduled',
        platforms: [
          {
            platform: 'instagram',
            scheduled: true,
            published: false,
            scheduledTime: new Date('2024-12-02T14:30:00')
          },
          {
            platform: 'linkedin',
            scheduled: true,
            published: false,
            scheduledTime: new Date('2024-12-02T15:00:00')
          },
          {
            platform: 'tiktok',
            scheduled: true,
            published: false,
            scheduledTime: new Date('2024-12-02T16:00:00')
          }
        ],
        contentType: 'video',
        mediaUrls: ['/api/placeholder/400/600'],
        caption: '🚀 Apresentamos o AI Assistant Pro! A próxima geração de assistente inteligente para empresas. Veja como pode revolucionar seu workflow.',
        hashtags: ['#AIAssistant', '#InteligênciaArtificial', '#Produtividade', '#Inovação'],
        mentions: ['@ai_community', '@tech_innovators'],
        scheduledFor: new Date('2024-12-02T14:30:00'),
        createdAt: new Date('2024-11-28T16:45:00'),
        updatedAt: new Date('2024-11-30T11:20:00'),
        budget: 3500,
        aiOptimizations: {
          bestTimeToPost: '14:30 - Segunda-feira',
          suggestedHashtags: ['#FuturoDoTrabalho', '#AutomaçãoInteligente'],
          engagementPrediction: 8.9,
          reachPrediction: 67000
        }
      },
      {
        id: '3',
        title: 'Case de Sucesso - Cliente Premium',
        description: 'Divulgação do case de sucesso com aumento de 300% na produtividade do cliente',
        clientId: '2',
        clientName: 'Fashion Boutique',
        status: 'draft',
        platforms: [
          {
            platform: 'instagram',
            scheduled: false,
            published: false
          },
          {
            platform: 'facebook',
            scheduled: false,
            published: false
          }
        ],
        contentType: 'image',
        mediaUrls: ['/api/placeholder/500/500'],
        caption: '📈 Case de Sucesso: Como nosso cliente aumentou a produtividade em 300% em apenas 3 meses! Conheça a história completa.',
        hashtags: ['#CaseDeSucesso', '#Resultados', '#ClienteSatisfeito'],
        mentions: [],
        scheduledFor: new Date('2024-12-05T09:00:00'),
        createdAt: new Date('2024-11-30T08:15:00'),
        updatedAt: new Date('2024-11-30T08:15:00')
      }
    ]

    setPlatforms(mockPlatforms)
    setCampaigns(mockCampaigns)
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    const matchesPlatform = filterPlatform === 'all' || 
                           campaign.platforms.some(p => p.platform === filterPlatform)
    
    return matchesSearch && matchesStatus && matchesPlatform
  })

  const getStatusInfo = (status: string) => {
    const statuses = {
      published: { name: 'Publicado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      scheduled: { name: 'Agendado', color: 'bg-blue-100 text-blue-800', icon: Clock },
      draft: { name: 'Rascunho', color: 'bg-gray-100 text-gray-800', icon: Edit },
      failed: { name: 'Falhou', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      analyzing: { name: 'Analisando', color: 'bg-purple-100 text-purple-800', icon: RefreshCw }
    }
    return statuses[status as keyof typeof statuses] || statuses.draft
  }

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: Instagram,
      facebook: Facebook,
      linkedin: Linkedin,
      twitter: Twitter,
      youtube: Youtube,
      tiktok: Play
    }
    return icons[platform as keyof typeof icons] || Globe
  }

  const getContentTypeIcon = (type: string) => {
    const types = {
      image: Image,
      video: Video,
      carousel: Copy,
      text: FileText,
      story: Instagram
    }
    return types[type as keyof typeof types] || FileText
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getApiStatusColor = (status: string) => {
    const colors = {
      active: 'text-green-600',
      expired: 'text-red-600',
      limited: 'text-yellow-600',
      error: 'text-red-600'
    }
    return colors[status as keyof typeof colors] || colors.error
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-[#693ee0]" />
              Campanhas Multi-Plataforma
            </h1>
            <p className="text-gray-600 mt-1">Gerencie e publique conteúdo em todas as redes sociais</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Campanha
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-8 mt-4">
          <button
            onClick={() => setSelectedTab('campaigns')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'campaigns'
                ? 'border-[#693ee0] text-[#693ee0]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Campanhas
          </button>
          <button
            onClick={() => setSelectedTab('calendar')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'calendar'
                ? 'border-[#693ee0] text-[#693ee0]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Calendário
          </button>
          <button
            onClick={() => setSelectedTab('platforms')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'platforms'
                ? 'border-[#693ee0] text-[#693ee0]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Integrações
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {selectedTab === 'campaigns' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Campanhas</p>
                      <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-[#693ee0]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Agendadas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {campaigns.filter(c => c.status === 'scheduled').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Publicadas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {campaigns.filter(c => c.status === 'published').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Alcance Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(campaigns.reduce((sum, c) => 
                          sum + c.platforms.reduce((pSum, p) => 
                            pSum + (p.performance?.reach || 0), 0
                          ), 0
                        ))}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar campanhas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                  >
                    <option value="all">Todos os status</option>
                    <option value="published">Publicado</option>
                    <option value="scheduled">Agendado</option>
                    <option value="draft">Rascunho</option>
                    <option value="failed">Falhou</option>
                  </select>
                  
                  <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                  >
                    <option value="all">Todas as plataformas</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Campaigns List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCampaigns.map((campaign) => {
                const statusInfo = getStatusInfo(campaign.status)
                const ContentIcon = getContentTypeIcon(campaign.contentType)
                const StatusIcon = statusInfo.icon
                
                return (
                  <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-[#693ee0]/10">
                            <ContentIcon className="h-5 w-5 text-[#693ee0]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 line-clamp-1">{campaign.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{campaign.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">{campaign.clientName}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{campaign.contentType}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="h-3 w-3 inline mr-1" />
                            {statusInfo.name}
                          </span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Platforms */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-medium text-gray-700">Plataformas:</span>
                        <div className="flex gap-1">
                          {campaign.platforms.map((platform, i) => {
                            const PlatformIcon = getPlatformIcon(platform.platform)
                            return (
                              <div 
                                key={i}
                                className={`w-6 h-6 rounded flex items-center justify-center ${
                                  platform.published 
                                    ? 'bg-green-100 text-green-600'
                                    : platform.scheduled 
                                      ? 'bg-blue-100 text-blue-600'
                                      : 'bg-gray-100 text-gray-400'
                                }`}
                                title={`${platform.platform}: ${
                                  platform.published ? 'Publicado' : 
                                  platform.scheduled ? 'Agendado' : 'Rascunho'
                                }`}
                              >
                                <PlatformIcon className="h-3 w-3" />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      
                      {/* Performance (if published) */}
                      {campaign.status === 'published' && (
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-sm font-bold text-gray-900">
                              {formatNumber(campaign.platforms.reduce((sum, p) => sum + (p.performance?.views || 0), 0))}
                            </p>
                            <p className="text-xs text-gray-600">Views</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-red-600">
                              {formatNumber(campaign.platforms.reduce((sum, p) => sum + (p.performance?.likes || 0), 0))}
                            </p>
                            <p className="text-xs text-gray-600">Likes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-blue-600">
                              {formatNumber(campaign.platforms.reduce((sum, p) => sum + (p.performance?.comments || 0), 0))}
                            </p>
                            <p className="text-xs text-gray-600">Comentários</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-green-600">
                              {formatNumber(campaign.platforms.reduce((sum, p) => sum + (p.performance?.shares || 0), 0))}
                            </p>
                            <p className="text-xs text-gray-600">Shares</p>
                          </div>
                        </div>
                      )}
                      
                      {/* AI Predictions (if scheduled) */}
                      {campaign.aiOptimizations && campaign.status === 'scheduled' && (
                        <div className="bg-purple-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">Previsões IA</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-purple-600">Engajamento: </span>
                              <span className="font-medium">{campaign.aiOptimizations.engagementPrediction}%</span>
                            </div>
                            <div>
                              <span className="text-purple-600">Alcance: </span>
                              <span className="font-medium">{formatNumber(campaign.aiOptimizations.reachPrediction)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Schedule info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>
                          {campaign.status === 'scheduled' ? 'Agendado para' : 'Criado em'}: {' '}
                          {(campaign.status === 'scheduled' ? campaign.scheduledFor : campaign.createdAt)
                            .toLocaleDateString('pt-BR')} às{' '}
                          {(campaign.status === 'scheduled' ? campaign.scheduledFor : campaign.createdAt)
                            .toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {campaign.budget && (
                          <span className="text-green-600 font-medium">
                            Budget: R$ {campaign.budget}
                          </span>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedCampaign(campaign)
                            setShowDetailsModal(true)
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver Detalhes
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        {campaign.status === 'draft' && (
                          <Button 
                            size="sm"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Publicar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {selectedTab === 'platforms' && (
          <div className="space-y-6">
            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Plataformas Conectadas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {platforms.filter(p => p.connected).length} / {platforms.length}
                      </p>
                    </div>
                    <LinkIcon className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Seguidores</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(platforms.reduce((sum, p) => sum + p.followers, 0))}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">APIs Ativas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {platforms.filter(p => p.apiStatus === 'active').length}
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platforms List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platforms.map((platform) => {
                const PlatformIcon = getPlatformIcon(platform.platform)
                
                return (
                  <Card key={platform.platform} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <PlatformIcon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 capitalize">{platform.platform}</h3>
                            <p className="text-sm text-gray-600">
                              {platform.connected ? platform.accountName : 'Não conectado'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${
                            platform.connected ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          <span className={`text-sm font-medium ${getApiStatusColor(platform.apiStatus)}`}>
                            {platform.apiStatus}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {platform.connected ? (
                        <>
                          {/* Account Info */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Seguidores</p>
                              <p className="text-lg font-bold text-gray-900">
                                {formatNumber(platform.followers)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Última Sync</p>
                              <p className="text-sm text-gray-600">
                                {platform.lastSync.toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          
                          {/* Permissions */}
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Permissões:</p>
                            <div className="flex flex-wrap gap-1">
                              {platform.permissions.map((permission) => (
                                <span 
                                  key={permission}
                                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                                >
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Sincronizar
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Settings className="h-3 w-3 mr-1" />
                              Configurar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Conecte sua conta {platform.platform} para começar a publicar
                          </p>
                          <Button className="w-full">
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Conectar {platform.platform}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {selectedTab === 'calendar' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#693ee0]" />
                Calendário de Publicações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-[#693ee0]/5 to-[#5a35c7]/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-[#693ee0] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendário Interativo</h3>
                  <p className="text-gray-600">Visualização de calendário com todas as campanhas agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Campaign Details Modal */}
      {showDetailsModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{selectedCampaign.title}</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false)
                  setSelectedCampaign(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center py-8">
              <Eye className="h-16 w-16 text-[#693ee0] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Detalhes da Campanha
              </h3>
              <p className="text-gray-600 mb-4">
                Interface completa de detalhes com métricas, performance e edição inline
              </p>
              <Button onClick={() => setShowDetailsModal(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nova Campanha Multi-Plataforma</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center py-8">
              <Plus className="h-16 w-16 text-[#693ee0] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Criador de Campanhas
              </h3>
              <p className="text-gray-600 mb-4">
                Interface completa de criação com seleção de plataformas, agendamento e IA
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </Button>
                <Button>
                  Criar Campanha
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}