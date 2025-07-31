'use client'

import { useState, useEffect } from 'react'
import { 
  Bot,
  Zap,
  MessageCircle,
  Shield,
  RefreshCw,
  Clock,
  Target,
  Heart,
  Users,
  TrendingUp,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Eye,
  Share2,
  Bell,
  Save,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Automation {
  id: string
  name: string
  type: 'auto_reply' | 'auto_repost' | 'auto_stories' | 'lead_capture' | 'follow_unfollow' | 'moderation'
  status: 'active' | 'paused' | 'draft'
  platform: string
  clientId: string
  clientName: string
  triggers: string[]
  actions: string[]
  performance: {
    executions: number
    successRate: number
    leadsGenerated?: number
    engagementIncrease?: number
  }
  schedule?: {
    enabled: boolean
    frequency: 'hourly' | 'daily' | 'weekly'
    time?: string
    days?: string[]
  }
  settings: {
    keywords?: string[]
    responseTemplate?: string
    cooldownMinutes?: number
    maxActionsPerDay?: number
    targetAudience?: string
  }
  createdAt: Date
  lastExecution?: Date
}

interface AutomationTemplate {
  id: string
  name: string
  description: string
  type: string
  category: 'engagement' | 'growth' | 'moderation' | 'content' | 'leads'
  platforms: string[]
  complexity: 'basic' | 'intermediate' | 'advanced'
  estimatedResults: {
    metric: string
    increase: string
  }
}

export default function AutomacoesPage() {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [templates, setTemplates] = useState<AutomationTemplate[]>([])
  const [selectedTab, setSelectedTab] = useState<'active' | 'templates' | 'analytics'>('active')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  // Dados simulados - em produção viriam da API
  useEffect(() => {
    const mockAutomations: Automation[] = [
      {
        id: '1',
        name: 'Auto-resposta para Comentários',
        type: 'auto_reply',
        status: 'active',
        platform: 'instagram',
        clientId: '1',
        clientName: 'TechStartup Inc',
        triggers: ['obrigado', 'thanks', 'info', 'preço'],
        actions: ['Responder com template personalizado', 'Marcar como lead quente'],
        performance: {
          executions: 1247,
          successRate: 94.2,
          leadsGenerated: 89
        },
        schedule: {
          enabled: true,
          frequency: 'hourly'
        },
        settings: {
          keywords: ['obrigado', 'thanks', 'info', 'preço', 'quanto custa'],
          responseTemplate: 'Olá! 😊 Obrigado pelo interesse! Vou te enviar mais informações por DM.',
          cooldownMinutes: 30,
          maxActionsPerDay: 50
        },
        createdAt: new Date('2024-10-15'),
        lastExecution: new Date('2024-11-30T14:30:00')
      },
      {
        id: '2',
        name: 'Repostagem Automática de Conteúdo TOP',
        type: 'auto_repost',
        status: 'active',
        platform: 'instagram',
        clientId: '2',
        clientName: 'Fashion Boutique',
        triggers: ['Alto engajamento', 'Mais de 100 likes', 'Comentários positivos'],
        actions: ['Repostar nos Stories', 'Agendar repost em 7 dias'],
        performance: {
          executions: 45,
          successRate: 100,
          engagementIncrease: 23.5
        },
        schedule: {
          enabled: true,
          frequency: 'daily',
          time: '18:00'
        },
        settings: {
          maxActionsPerDay: 3,
          targetAudience: 'Seguidores ativos'
        },
        createdAt: new Date('2024-11-01'),
        lastExecution: new Date('2024-11-29T18:00:00')
      },
      {
        id: '3',
        name: 'Stories Automáticos com Template',
        type: 'auto_stories',
        status: 'paused',
        platform: 'instagram',
        clientId: '1',
        clientName: 'TechStartup Inc',
        triggers: ['Nova postagem no feed', 'Milestone atingido'],
        actions: ['Criar Stories com template', 'Adicionar swipe up'],
        performance: {
          executions: 28,
          successRate: 89.3,
          engagementIncrease: 15.8
        },
        schedule: {
          enabled: false,
          frequency: 'daily'
        },
        settings: {
          maxActionsPerDay: 5
        },
        createdAt: new Date('2024-10-20'),
        lastExecution: new Date('2024-11-25T10:00:00')
      },
      {
        id: '4',
        name: 'Moderação Inteligente de Comentários',
        type: 'moderation',
        status: 'active',
        platform: 'instagram',
        clientId: '2',
        clientName: 'Fashion Boutique',
        triggers: ['Palavras ofensivas', 'Spam detectado', 'Links suspeitos'],
        actions: ['Ocultar comentário', 'Bloquear usuário', 'Notificar admin'],
        performance: {
          executions: 156,
          successRate: 97.4
        },
        schedule: {
          enabled: true,
          frequency: 'hourly'
        },
        settings: {
          keywords: ['spam', 'hack', 'free money', 'clique aqui'],
          maxActionsPerDay: 100
        },
        createdAt: new Date('2024-11-10'),
        lastExecution: new Date('2024-11-30T15:45:00')
      }
    ]

    const mockTemplates: AutomationTemplate[] = [
      {
        id: 't1',
        name: 'Lead Capture via DM',
        description: 'Captura leads automaticamente quando usuários comentam palavras-chave específicas',
        type: 'lead_capture',
        category: 'leads',
        platforms: ['instagram', 'facebook'],
        complexity: 'intermediate',
        estimatedResults: {
          metric: 'Leads capturados',
          increase: '+150% por mês'
        }
      },
      {
        id: 't2',
        name: 'Follow/Unfollow Estratégico',
        description: 'Segue e dessegue contas estratégicas baseado em critérios inteligentes',
        type: 'follow_unfollow',
        category: 'growth',
        platforms: ['instagram'],
        complexity: 'advanced',
        estimatedResults: {
          metric: 'Seguidores orgânicos',
          increase: '+25% por mês'
        }
      },
      {
        id: 't3',
        name: 'Engajamento Automático',
        description: 'Curte e comenta automaticamente em posts de contas relevantes',
        type: 'auto_reply',
        category: 'engagement',
        platforms: ['instagram', 'linkedin'],
        complexity: 'basic',
        estimatedResults: {
          metric: 'Taxa de engajamento',
          increase: '+40% por semana'
        }
      },
      {
        id: 't4',
        name: 'Stories Interativos Automáticos',
        description: 'Cria stories automáticos com enquetes, perguntas e CTAs baseados em performance',
        type: 'auto_stories',
        category: 'content',
        platforms: ['instagram', 'facebook'],
        complexity: 'intermediate',
        estimatedResults: {
          metric: 'Visualizações de Stories',
          increase: '+80% por semana'
        }
      }
    ]

    setAutomations(mockAutomations)
    setTemplates(mockTemplates)
  }, [])

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || automation.status === filterStatus
    const matchesPlatform = filterPlatform === 'all' || automation.platform === filterPlatform
    
    return matchesSearch && matchesStatus && matchesPlatform
  })

  const getAutomationTypeInfo = (type: string) => {
    const types = {
      auto_reply: { name: 'Auto-resposta', icon: MessageCircle, color: 'text-blue-600 bg-blue-100' },
      auto_repost: { name: 'Auto-repost', icon: RefreshCw, color: 'text-green-600 bg-green-100' },
      auto_stories: { name: 'Auto Stories', icon: Calendar, color: 'text-purple-600 bg-purple-100' },
      lead_capture: { name: 'Captura de Leads', icon: Target, color: 'text-orange-600 bg-orange-100' },
      follow_unfollow: { name: 'Follow/Unfollow', icon: Users, color: 'text-pink-600 bg-pink-100' },
      moderation: { name: 'Moderação', icon: Shield, color: 'text-red-600 bg-red-100' }
    }
    return types[type as keyof typeof types] || types.auto_reply
  }

  const getStatusInfo = (status: string) => {
    const statuses = {
      active: { name: 'Ativo', color: 'bg-green-100 text-green-800' },
      paused: { name: 'Pausado', color: 'bg-yellow-100 text-yellow-800' },
      draft: { name: 'Rascunho', color: 'bg-gray-100 text-gray-800' }
    }
    return statuses[status as keyof typeof statuses] || statuses.draft
  }

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: Instagram,
      facebook: Facebook,
      linkedin: Linkedin,
      twitter: Twitter,
      youtube: Youtube
    }
    return icons[platform as keyof typeof icons] || Activity
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const toggleAutomationStatus = (automationId: string) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === automationId 
        ? { ...automation, status: automation.status === 'active' ? 'paused' : 'active' }
        : automation
    ))
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      engagement: 'text-blue-600 bg-blue-100',
      growth: 'text-green-600 bg-green-100',
      moderation: 'text-red-600 bg-red-100',
      content: 'text-purple-600 bg-purple-100',
      leads: 'text-orange-600 bg-orange-100'
    }
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Bot className="h-6 w-6 text-[#693ee0]" />
              Automações Avançadas
            </h1>
            <p className="text-gray-600 mt-1">Configure automações inteligentes para otimizar seus resultados</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Automação
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-8 mt-4">
          <button
            onClick={() => setSelectedTab('active')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'active'
                ? 'border-[#693ee0] text-[#693ee0]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Automações Ativas
          </button>
          <button
            onClick={() => setSelectedTab('templates')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'templates'
                ? 'border-[#693ee0] text-[#693ee0]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'analytics'
                ? 'border-[#693ee0] text-[#693ee0]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {selectedTab === 'active' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Automações</p>
                      <p className="text-2xl font-bold text-gray-900">{automations.length}</p>
                    </div>
                    <Bot className="h-8 w-8 text-[#693ee0]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Automações Ativas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {automations.filter(a => a.status === 'active').length}
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
                      <p className="text-sm font-medium text-gray-600">Execuções Hoje</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(automations.reduce((sum, a) => sum + a.performance.executions, 0))}
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(automations.reduce((sum, a) => sum + a.performance.successRate, 0) / automations.length).toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
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
                      placeholder="Buscar automações..."
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
                    <option value="active">Ativo</option>
                    <option value="paused">Pausado</option>
                    <option value="draft">Rascunho</option>
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
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Automations List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAutomations.map((automation) => {
                const typeInfo = getAutomationTypeInfo(automation.type)
                const statusInfo = getStatusInfo(automation.status)
                const PlatformIcon = getPlatformIcon(automation.platform)
                const TypeIcon = typeInfo.icon
                
                return (
                  <Card key={automation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{automation.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <PlatformIcon className="h-3 w-3" />
                              <span>{automation.clientName}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.name}
                          </span>
                          <button
                            onClick={() => toggleAutomationStatus(automation.id)}
                            className={`p-1 rounded ${
                              automation.status === 'active' 
                                ? 'text-yellow-600 hover:bg-yellow-100' 
                                : 'text-green-600 hover:bg-green-100'
                            }`}
                          >
                            {automation.status === 'active' ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">
                            {formatNumber(automation.performance.executions)}
                          </p>
                          <p className="text-xs text-gray-600">Execuções</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">
                            {automation.performance.successRate}%
                          </p>
                          <p className="text-xs text-gray-600">Taxa de Sucesso</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-purple-600">
                            {automation.performance.leadsGenerated || automation.performance.engagementIncrease || 0}
                            {automation.performance.leadsGenerated ? '' : '%'}
                          </p>
                          <p className="text-xs text-gray-600">
                            {automation.performance.leadsGenerated ? 'Leads' : 'Aumento Eng.'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Triggers & Actions */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">🎯 Gatilhos:</h5>
                          <div className="flex flex-wrap gap-1">
                            {automation.triggers.slice(0, 2).map((trigger, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {trigger}
                              </span>
                            ))}
                            {automation.triggers.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{automation.triggers.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-1">⚡ Ações:</h5>
                          <div className="flex flex-wrap gap-1">
                            {automation.actions.slice(0, 2).map((action, i) => (
                              <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                {action}
                              </span>
                            ))}
                            {automation.actions.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{automation.actions.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Last Execution */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>
                          Última execução: {automation.lastExecution?.toLocaleDateString('pt-BR')} às{' '}
                          {automation.lastExecution?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {automation.schedule?.enabled && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {automation.schedule.frequency}
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
                            setSelectedAutomation(automation)
                            setShowEditModal(true)
                          }}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                        >
                          <Activity className="h-3 w-3 mr-1" />
                          Ver Logs
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {selectedTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow border-2 border-dashed border-gray-200 hover:border-[#693ee0]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                          {template.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          template.complexity === 'basic' ? 'bg-green-100 text-green-800' :
                          template.complexity === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {template.complexity}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">Plataformas:</span>
                    <div className="flex gap-1">
                      {template.platforms.map((platform) => {
                        const PlatformIcon = getPlatformIcon(platform)
                        return (
                          <div key={platform} className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
                            <PlatformIcon className="h-3 w-3 text-gray-600" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Resultado Estimado</span>
                    </div>
                    <p className="text-sm text-green-700">
                      {template.estimatedResults.metric}: <strong>{template.estimatedResults.increase}</strong>
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button className="w-full" onClick={() => setShowCreateModal(true)}>
                    Usar Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Economia de Tempo</p>
                      <p className="text-2xl font-bold text-gray-900">127h</p>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>+23% este mês</span>
                      </div>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Leads Capturados</p>
                      <p className="text-2xl font-bold text-gray-900">1.456</p>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>+89% este mês</span>
                      </div>
                    </div>
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Engajamento Médio</p>
                      <p className="text-2xl font-bold text-gray-900">+47%</p>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>vs período anterior</span>
                      </div>
                    </div>
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">ROI das Automações</p>
                      <p className="text-2xl font-bold text-gray-900">890%</p>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>retorno garantido</span>
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#693ee0]" />
                  Performance das Automações (Últimos 30 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-[#693ee0]/5 to-[#5a35c7]/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-[#693ee0] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Gráfico de Performance</h3>
                    <p className="text-gray-600">Métricas detalhadas de execução das automações</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Create/Edit Modal (Simplified) */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {showEditModal ? 'Editar Automação' : 'Nova Automação'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setShowEditModal(false)
                  setSelectedAutomation(null)
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center py-8">
              <Bot className="h-16 w-16 text-[#693ee0] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Configuração de Automação
              </h3>
              <p className="text-gray-600 mb-4">
                Interface completa de configuração será implementada aqui
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false)
                    setShowEditModal(false)
                    setSelectedAutomation(null)
                  }}
                >
                  Cancelar
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Automação
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}