'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Play
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface MetricCard {
  title: string
  value: string | number
  change: number
  icon: any
  color: string
  prefix?: string
  suffix?: string
}

interface Client {
  id: string
  name: string
  avatar: string
  status: 'active' | 'paused' | 'setup'
  followers: number
  engagement: number
  roi: number
  platforms: string[]
}

interface Campaign {
  id: string
  title: string
  client: string
  status: 'scheduled' | 'posted' | 'draft'
  platform: string
  scheduledFor: Date
  performance?: {
    views: number
    likes: number
    comments: number
    shares: number
  }
}

export default function SocialDashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('overview')

  // Dados simulados - em produção viriam da API
  const metrics: MetricCard[] = [
    {
      title: 'Total de Seguidores',
      value: '847.2K',
      change: 12.5,
      icon: Users,
      color: 'blue',
      suffix: ''
    },
    {
      title: 'Engajamento Médio',
      value: '4.8%',
      change: 2.3,
      icon: Heart,
      color: 'red'
    },
    {
      title: 'Alcance Total',
      value: '2.1M',
      change: 18.7,
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'ROI Gerado',
      value: '287%',
      change: 45.2,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Leads Capturados',
      value: '1.284',
      change: 34.1,
      icon: Target,
      color: 'orange'
    },
    {
      title: 'Posts Publicados',
      value: '156',
      change: 8.9,
      icon: Calendar,
      color: 'indigo'
    }
  ]

  const clients: Client[] = [
    {
      id: '1',
      name: 'TechStartup Inc',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      followers: 45200,
      engagement: 6.8,
      roi: 340,
      platforms: ['instagram', 'linkedin', 'twitter']
    },
    {
      id: '2', 
      name: 'Fashion Brand',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      followers: 128500,
      engagement: 8.2,
      roi: 280,
      platforms: ['instagram', 'facebook', 'tiktok']
    },
    {
      id: '3',
      name: 'Local Restaurant',
      avatar: '/api/placeholder/40/40', 
      status: 'paused',
      followers: 12800,
      engagement: 4.1,
      roi: 180,
      platforms: ['instagram', 'facebook']
    },
    {
      id: '4',
      name: 'E-commerce Store', 
      avatar: '/api/placeholder/40/40',
      status: 'setup',
      followers: 89200,
      engagement: 5.9,
      roi: 420,
      platforms: ['instagram', 'facebook', 'youtube']
    }
  ]

  const recentCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'Black Friday Launch Campaign',
      client: 'E-commerce Store',
      status: 'posted',
      platform: 'instagram',
      scheduledFor: new Date('2024-11-29T10:00:00'),
      performance: { views: 45200, likes: 2840, comments: 156, shares: 89 }
    },
    {
      id: '2',
      title: 'New Product Teaser',
      client: 'TechStartup Inc',
      status: 'scheduled', 
      platform: 'linkedin',
      scheduledFor: new Date('2024-12-02T14:30:00')
    },
    {
      id: '3',
      title: 'Weekend Special Menu',
      client: 'Local Restaurant',
      status: 'draft',
      platform: 'facebook',
      scheduledFor: new Date('2024-12-01T18:00:00')
    }
  ]

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: Instagram,
      facebook: Facebook,
      linkedin: Linkedin,
      twitter: Twitter,
      youtube: Youtube,
      tiktok: Play
    }
    return icons[platform as keyof typeof icons] || Activity
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800', 
      setup: 'bg-blue-100 text-blue-800',
      posted: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#693ee0]" />
              Social Media Management
            </h1>
            <p className="text-gray-600 mt-1">Gerencie todas as suas campanhas e clientes em um só lugar</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setSelectedMetric('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === 'overview' 
                    ? 'bg-white text-[#693ee0] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setSelectedMetric('analytics')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === 'analytics' 
                    ? 'bg-white text-[#693ee0] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                      <Icon className={`h-5 w-5 text-${metric.color}-600`} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      metric.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {metric.prefix}{metric.value}{metric.suffix}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{metric.title}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clientes Ativos */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#693ee0]" />
                Clientes Ativos
              </CardTitle>
              <button className="text-[#693ee0] hover:text-[#5a35c7] text-sm font-medium">
                Ver todos
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-[#693ee0]/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#693ee0] to-[#5a35c7] flex items-center justify-center text-white font-semibold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{client.name}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{formatNumber(client.followers)} seguidores</span>
                          <span>{client.engagement}% engajamento</span>
                          <span className="text-green-600 font-medium">{client.roi}% ROI</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {client.platforms.map((platform) => {
                          const PlatformIcon = getPlatformIcon(platform)
                          return (
                            <div key={platform} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                              <PlatformIcon className="h-3 w-3 text-gray-600" />
                            </div>
                          )
                        })}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status === 'active' ? 'Ativo' : client.status === 'paused' ? 'Pausado' : 'Setup'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campanhas Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#693ee0]" />
                Campanhas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => {
                  const PlatformIcon = getPlatformIcon(campaign.platform)
                  return (
                    <div key={campaign.id} className="border-l-4 border-[#693ee0] pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm line-clamp-2">
                            {campaign.title}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {campaign.client}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <PlatformIcon className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              {campaign.scheduledFor.toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status === 'posted' ? 'Publicado' : 
                           campaign.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                        </span>
                      </div>
                      
                      {campaign.performance && (
                        <div className="flex gap-4 mt-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {formatNumber(campaign.performance.views)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {formatNumber(campaign.performance.likes)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {campaign.performance.comments}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#693ee0]" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-[#693ee0]/5 to-[#5a35c7]/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-[#693ee0] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gráfico de Performance</h3>
                <p className="text-gray-600">Visualização detalhada de métricas será implementada aqui</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#693ee0]">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#693ee0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Novo Cliente</h3>
              <p className="text-sm text-gray-600">Adicionar uma nova empresa</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#693ee0]">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#693ee0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nova Campanha</h3>
              <p className="text-sm text-gray-600">Criar conteúdo agendado</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#693ee0]">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#693ee0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Relatório</h3>
              <p className="text-sm text-gray-600">Gerar análise detalhada</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#693ee0]">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#693ee0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automação</h3>
              <p className="text-sm text-gray-600">Configurar workflows</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}