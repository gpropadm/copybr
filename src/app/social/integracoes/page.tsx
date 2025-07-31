'use client'

import { useState, useEffect } from 'react'
import { 
  Link as LinkIcon,
  Zap,
  Settings,
  Check,
  X,
  AlertTriangle,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Copy,
  ExternalLink,
  Key,
  Globe,
  Database,
  ShoppingCart,
  MessageCircle,
  Mail,
  Calendar,
  BarChart3,
  Users,
  DollarSign,
  Smartphone,
  CreditCard,
  Package,
  Truck,
  Bell,
  Activity,
  TrendingUp,
  Target,
  FileText,
  Clock,
  Shield,
  Server,
  Webhook,
  Code,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Power,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle,
  X,
  MinusCircle,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Store,
  Phone,
  Hash,
  AtSign
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Integration {
  id: string
  name: string
  type: 'crm' | 'ecommerce' | 'whatsapp' | 'email' | 'analytics' | 'automation' | 'payment' | 'storage'
  category: 'sales' | 'marketing' | 'communication' | 'data' | 'finance' | 'operations'
  status: 'connected' | 'disconnected' | 'error' | 'pending' | 'limited'
  provider: string
  description: string
  features: string[]
  lastSync: Date
  dataPoints: {
    totalRecords: number
    synced: number
    errors: number
    lastActivity: Date
  }
  settings: {
    autoSync: boolean
    syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly'
    bidirectional: boolean
    fieldMapping: Record<string, string>
  }
  credentials: {
    hasApiKey: boolean
    hasWebhook: boolean
    hasOAuth: boolean
    expiresAt?: Date
  }
  performance: {
    successRate: number
    avgResponseTime: number
    uptime: number
  }
  pricing: {
    plan: 'free' | 'starter' | 'pro' | 'enterprise'
    monthlyQuota: number
    currentUsage: number
  }
}

interface WebhookEndpoint {
  id: string
  name: string
  url: string
  events: string[]
  status: 'active' | 'paused' | 'failed'
  lastTriggered: Date
  totalRequests: number
  successRate: number
  retryPolicy: {
    maxRetries: number
    backoffStrategy: string
  }
}

interface SyncJob {
  id: string
  integrationId: string
  integrationName: string
  type: 'full_sync' | 'incremental' | 'webhook'
  status: 'running' | 'completed' | 'failed' | 'queued'
  startedAt: Date
  completedAt?: Date
  recordsProcessed: number
  recordsTotal: number
  errors: string[]
  duration?: number
}

export default function IntegracoesPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([])
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([])
  const [selectedTab, setSelectedTab] = useState<'overview' | 'integrations' | 'webhooks' | 'logs'>('overview')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [showConfigModal, setShowConfigModal] = useState(false)

  // Dados simulados - em produção viriam da API
  useEffect(() => {
    const mockIntegrations: Integration[] = [
      {
        id: '1',
        name: 'HubSpot CRM',
        type: 'crm',
        category: 'sales',
        status: 'connected',
        provider: 'HubSpot',
        description: 'Sistema completo de CRM com automação de vendas e marketing',
        features: ['Lead Management', 'Contact Sync', 'Deal Pipeline', 'Email Marketing', 'Analytics'],
        lastSync: new Date('2024-11-30T14:30:00'),
        dataPoints: {
          totalRecords: 15847,
          synced: 15847,
          errors: 0,
          lastActivity: new Date('2024-11-30T14:30:00')
        },
        settings: {
          autoSync: true,
          syncFrequency: 'hourly',
          bidirectional: true,
          fieldMapping: {
            'social_lead': 'hubspot_contact',
            'engagement_score': 'lead_score'
          }
        },
        credentials: {
          hasApiKey: true,
          hasWebhook: true,
          hasOAuth: true,
          expiresAt: new Date('2025-06-30')
        },
        performance: {
          successRate: 99.8,
          avgResponseTime: 245,
          uptime: 99.9
        },
        pricing: {
          plan: 'pro',
          monthlyQuota: 50000,
          currentUsage: 23847
        }
      },
      {
        id: '2',
        name: 'Shopify Store',
        type: 'ecommerce',
        category: 'sales',
        status: 'connected',
        provider: 'Shopify',
        description: 'Plataforma de e-commerce com sincronização de produtos e pedidos',
        features: ['Product Sync', 'Order Management', 'Customer Data', 'Inventory Tracking', 'Sales Analytics'],
        lastSync: new Date('2024-11-30T13:45:00'),
        dataPoints: {
          totalRecords: 8956,
          synced: 8892,
          errors: 64,
          lastActivity: new Date('2024-11-30T13:45:00')
        },
        settings: {
          autoSync: true,
          syncFrequency: 'realtime',
          bidirectional: false,
          fieldMapping: {
            'customer_email': 'shopify_customer_email',
            'order_value': 'total_price'
          }
        },
        credentials: {
          hasApiKey: true,
          hasWebhook: true,
          hasOAuth: false
        },
        performance: {
          successRate: 99.3,
          avgResponseTime: 189,
          uptime: 99.7
        },
        pricing: {
          plan: 'enterprise',
          monthlyQuota: 100000,
          currentUsage: 8956
        }
      },
      {
        id: '3',
        name: 'WhatsApp Business API',
        type: 'whatsapp',
        category: 'communication',
        status: 'connected',
        provider: 'Meta',
        description: 'API oficial do WhatsApp para mensagens automatizadas e atendimento',
        features: ['Message Templates', 'Automated Responses', 'Media Sharing', 'Broadcast Lists', 'Analytics'],
        lastSync: new Date('2024-11-30T15:12:00'),
        dataPoints: {
          totalRecords: 3247,
          synced: 3247,
          errors: 0,
          lastActivity: new Date('2024-11-30T15:12:00')
        },
        settings: {
          autoSync: true,
          syncFrequency: 'realtime',
          bidirectional: true,
          fieldMapping: {
            'phone_number': 'whatsapp_number',
            'message_status': 'delivery_status'
          }
        },
        credentials: {
          hasApiKey: true,
          hasWebhook: true,
          hasOAuth: true,
          expiresAt: new Date('2025-03-15')
        },
        performance: {
          successRate: 99.9,
          avgResponseTime: 156,
          uptime: 99.8
        },
        pricing: {
          plan: 'pro',
          monthlyQuota: 10000,
          currentUsage: 3247
        }
      },
      {
        id: '4',
        name: 'Mailchimp',
        type: 'email',
        category: 'marketing',
        status: 'limited',
        provider: 'Mailchimp',
        description: 'Plataforma de email marketing com automação avançada',
        features: ['Email Campaigns', 'Audience Segmentation', 'A/B Testing', 'Automation', 'Reporting'],
        lastSync: new Date('2024-11-29T18:20:00'),
        dataPoints: {
          totalRecords: 12456,
          synced: 11234,
          errors: 1222,
          lastActivity: new Date('2024-11-29T18:20:00')
        },
        settings: {
          autoSync: false,
          syncFrequency: 'daily',
          bidirectional: false,
          fieldMapping: {
            'email': 'mailchimp_email',
            'engagement_score': 'mailchimp_rating'
          }
        },
        credentials: {
          hasApiKey: true,
          hasWebhook: false,
          hasOAuth: true,
          expiresAt: new Date('2024-12-15')
        },
        performance: {
          successRate: 89.8,
          avgResponseTime: 567,
          uptime: 98.2
        },
        pricing: {
          plan: 'starter',
          monthlyQuota: 15000,
          currentUsage: 12456
        }
      },
      {
        id: '5',
        name: 'Stripe Payments',
        type: 'ecommerce',
        category: 'finance',
        status: 'connected',
        provider: 'Stripe',
        description: 'Processamento de pagamentos com analytics financeiros detalhados',
        features: ['Payment Processing', 'Subscription Management', 'Revenue Analytics', 'Chargeback Handling'],
        lastSync: new Date('2024-11-30T12:00:00'),
        dataPoints: {
          totalRecords: 5678,
          synced: 5678,
          errors: 0,
          lastActivity: new Date('2024-11-30T12:00:00')
        },
        settings: {
          autoSync: true,
          syncFrequency: 'realtime',
          bidirectional: false,
          fieldMapping: {
            'customer_id': 'stripe_customer_id',
            'payment_amount': 'amount_paid'
          }
        },
        credentials: {
          hasApiKey: true,
          hasWebhook: true,
          hasOAuth: false
        },
        performance: {
          successRate: 99.9,
          avgResponseTime: 123,
          uptime: 99.9
        },
        pricing: {
          plan: 'enterprise',
          monthlyQuota: -1,
          currentUsage: 5678
        }
      },
      {
        id: '6',
        name: 'Google Analytics',
        type: 'analytics',
        category: 'data',
        status: 'error',
        provider: 'Google',
        description: 'Analytics avançado de website e comportamento de usuários',
        features: ['Website Analytics', 'Conversion Tracking', 'Audience Insights', 'Attribution Modeling'],
        lastSync: new Date('2024-11-28T09:30:00'),
        dataPoints: {
          totalRecords: 0,
          synced: 0,
          errors: 156,
          lastActivity: new Date('2024-11-28T09:30:00')
        },
        settings: {
          autoSync: true,
          syncFrequency: 'daily',
          bidirectional: false,
          fieldMapping: {}
        },
        credentials: {
          hasApiKey: false,
          hasWebhook: false,
          hasOAuth: true,
          expiresAt: new Date('2024-11-25')
        },
        performance: {
          successRate: 0,
          avgResponseTime: 0,
          uptime: 0
        },
        pricing: {
          plan: 'free',
          monthlyQuota: 1000000,
          currentUsage: 0
        }
      }
    ]

    const mockWebhooks: WebhookEndpoint[] = [
      {
        id: '1',
        name: 'HubSpot Contact Updates',
        url: 'https://socialmanagement.app/webhooks/hubspot/contacts',
        events: ['contact.created', 'contact.updated', 'deal.closed'],
        status: 'active',
        lastTriggered: new Date('2024-11-30T14:30:00'),
        totalRequests: 15847,
        successRate: 99.8,
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential'
        }
      },
      {
        id: '2',
        name: 'Shopify Order Events',
        url: 'https://socialmanagement.app/webhooks/shopify/orders',
        events: ['order.created', 'order.updated', 'order.paid'],
        status: 'active',
        lastTriggered: new Date('2024-11-30T13:45:00'),
        totalRequests: 8956,
        successRate: 99.3,
        retryPolicy: {
          maxRetries: 5,
          backoffStrategy: 'linear'
        }
      },
      {
        id: '3',
        name: 'WhatsApp Message Status',
        url: 'https://socialmanagement.app/webhooks/whatsapp/status',
        events: ['message.delivered', 'message.read', 'message.failed'],
        status: 'active',
        lastTriggered: new Date('2024-11-30T15:12:00'),
        totalRequests: 32470,
        successRate: 99.9,
        retryPolicy: {
          maxRetries: 2,
          backoffStrategy: 'exponential'
        }
      },
      {
        id: '4',
        name: 'Stripe Payment Events',
        url: 'https://socialmanagement.app/webhooks/stripe/payments',
        events: ['payment.succeeded', 'payment.failed', 'subscription.updated'],
        status: 'active',
        lastTriggered: new Date('2024-11-30T12:00:00'),
        totalRequests: 5678,
        successRate: 99.9,
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential'
        }
      }
    ]

    const mockSyncJobs: SyncJob[] = [
      {
        id: '1',
        integrationId: '1',
        integrationName: 'HubSpot CRM',
        type: 'incremental',
        status: 'completed',
        startedAt: new Date('2024-11-30T14:00:00'),
        completedAt: new Date('2024-11-30T14:30:00'),
        recordsProcessed: 234,
        recordsTotal: 234,
        errors: [],
        duration: 1800000
      },
      {
        id: '2',
        integrationId: '2',
        integrationName: 'Shopify Store',
        type: 'webhook',
        status: 'running',
        startedAt: new Date('2024-11-30T15:00:00'),
        recordsProcessed: 45,
        recordsTotal: 67,
        errors: []
      },
      {
        id: '3',
        integrationId: '4',
        integrationName: 'Mailchimp',
        type: 'full_sync',
        status: 'failed',
        startedAt: new Date('2024-11-29T18:00:00'),
        completedAt: new Date('2024-11-29T18:20:00'),
        recordsProcessed: 11234,
        recordsTotal: 12456,
        errors: ['API rate limit exceeded', 'Invalid email format in 45 records'],
        duration: 1200000
      }
    ]

    setIntegrations(mockIntegrations)
    setWebhooks(mockWebhooks)
    setSyncJobs(mockSyncJobs)
  }, [])

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || integration.type === filterType
    const matchesStatus = filterStatus === 'all' || integration.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusInfo = (status: string) => {
    const statuses = {
      connected: { name: 'Conectado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      disconnected: { name: 'Desconectado', color: 'bg-gray-100 text-gray-800', icon: X },
      error: { name: 'Erro', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      pending: { name: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      limited: { name: 'Limitado', color: 'bg-orange-100 text-orange-800', icon: MinusCircle }
    }
    return statuses[status as keyof typeof statuses] || statuses.disconnected
  }

  const getTypeInfo = (type: string) => {
    const types = {
      crm: { name: 'CRM', icon: Users, color: 'text-blue-600 bg-blue-100' },
      ecommerce: { name: 'E-commerce', icon: ShoppingCart, color: 'text-green-600 bg-green-100' },
      whatsapp: { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-600 bg-green-100' },
      email: { name: 'Email', icon: Mail, color: 'text-purple-600 bg-purple-100' },
      analytics: { name: 'Analytics', icon: BarChart3, color: 'text-orange-600 bg-orange-100' },
      automation: { name: 'Automação', icon: Zap, color: 'text-yellow-600 bg-yellow-100' },
      payment: { name: 'Pagamentos', icon: CreditCard, color: 'text-indigo-600 bg-indigo-100' },
      storage: { name: 'Armazenamento', icon: Database, color: 'text-gray-600 bg-gray-100' }
    }
    return types[type as keyof typeof types] || types.crm
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      sales: 'text-green-600 bg-green-100',
      marketing: 'text-purple-600 bg-purple-100',
      communication: 'text-blue-600 bg-blue-100',
      data: 'text-orange-600 bg-orange-100',
      finance: 'text-indigo-600 bg-indigo-100',
      operations: 'text-gray-600 bg-gray-100'
    }
    return colors[category as keyof typeof colors] || colors.operations
  }

  const getPlanColor = (plan: string) => {
    const colors = {
      free: 'text-gray-600 bg-gray-100',
      starter: 'text-blue-600 bg-blue-100',
      pro: 'text-purple-600 bg-purple-100',
      enterprise: 'text-orange-600 bg-orange-100'
    }
    return colors[plan as keyof typeof colors] || colors.free
  }

  const getJobStatusColor = (status: string) => {
    const colors = {
      running: 'text-blue-600 bg-blue-100',
      completed: 'text-green-600 bg-green-100',
      failed: 'text-red-600 bg-red-100',
      queued: 'text-yellow-600 bg-yellow-100'
    }
    return colors[status as keyof typeof colors] || colors.queued
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <LinkIcon className="h-6 w-6 text-[#693ee0]" />
              Integrações Poderosas
            </h1>
            <p className="text-gray-600 mt-1">CRM, E-commerce, WhatsApp API e muito mais</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Integração
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-8 mt-4">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'integrations', label: 'Integrações', icon: LinkIcon },
            { id: 'webhooks', label: 'Webhooks', icon: Zap },
            { id: 'logs', label: 'Logs & Sync', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                selectedTab === tab.id
                  ? 'border-[#693ee0] text-[#693ee0]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {selectedTab === 'overview' && (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Integrações</p>
                      <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
                    </div>
                    <LinkIcon className="h-8 w-8 text-[#693ee0]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conectadas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {integrations.filter(i => i.status === 'connected').length}
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
                      <p className="text-sm font-medium text-gray-600">Registros Sincronizados</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(integrations.reduce((sum, i) => sum + i.dataPoints.synced, 0))}
                      </p>
                    </div>
                    <Database className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Uptime Médio</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(integrations.reduce((sum, i) => sum + i.performance.uptime, 0) / integrations.length).toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integration Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#693ee0]" />
                    Integrações por Tipo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['crm', 'ecommerce', 'whatsapp', 'email', 'analytics'].map((type) => {
                      const count = integrations.filter(i => i.type === type).length
                      const typeInfo = getTypeInfo(type)
                      const TypeIcon = typeInfo.icon
                      
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                              <TypeIcon className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-gray-900">{typeInfo.name}</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">{count}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#693ee0]" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations.filter(i => i.status === 'connected').slice(0, 4).map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{integration.name}</p>
                          <p className="text-sm text-gray-600">
                            {integration.performance.avgResponseTime}ms avg
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {integration.performance.successRate}%
                          </div>
                          <div className="text-xs text-gray-500">success rate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#693ee0]" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncJobs.slice(0, 5).map((job) => {
                    const statusColor = getJobStatusColor(job.status)
                    
                    return (
                      <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            job.status === 'completed' ? 'bg-green-500' :
                            job.status === 'running' ? 'bg-blue-500' :
                            job.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{job.integrationName}</p>
                            <p className="text-sm text-gray-600">{job.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                            {job.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {job.recordsProcessed}/{job.recordsTotal} records
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedTab === 'integrations' && (
          <>
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar integrações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                    />
                  </div>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="crm">CRM</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="analytics">Analytics</option>
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                  >
                    <option value="all">Todos os status</option>
                    <option value="connected">Conectado</option>
                    <option value="disconnected">Desconectado</option>
                    <option value="error">Erro</option>
                    <option value="limited">Limitado</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredIntegrations.map((integration) => {
                const statusInfo = getStatusInfo(integration.status)
                const typeInfo = getTypeInfo(integration.type)
                const StatusIcon = statusInfo.icon
                const TypeIcon = typeInfo.icon
                
                return (
                  <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-lg ${typeInfo.color}`}>
                            <TypeIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                            <p className="text-sm text-gray-600">{integration.provider}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(integration.category)}`}>
                                {integration.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(integration.pricing.plan)}`}>
                                {integration.pricing.plan}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="h-3 w-3 inline mr-1" />
                            {statusInfo.name}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                      
                      {/* Data Points */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">
                            {formatNumber(integration.dataPoints.synced)}
                          </p>
                          <p className="text-xs text-gray-600">Sincronizados</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">
                            {integration.performance.successRate}%
                          </p>
                          <p className="text-xs text-gray-600">Taxa de Sucesso</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">
                            {integration.performance.avgResponseTime}ms
                          </p>
                          <p className="text-xs text-gray-600">Resposta Média</p>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">🚀 Recursos:</p>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                          {integration.features.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{integration.features.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Credentials Status */}
                      <div className="flex items-center gap-4 mb-4 text-xs">
                        <div className={`flex items-center gap-1 ${integration.credentials.hasApiKey ? 'text-green-600' : 'text-gray-400'}`}>
                          <Key className="h-3 w-3" />
                          API Key
                        </div>
                        <div className={`flex items-center gap-1 ${integration.credentials.hasWebhook ? 'text-green-600' : 'text-gray-400'}`}>
                          <Webhook className="h-3 w-3" />
                          Webhook
                        </div>
                        <div className={`flex items-center gap-1 ${integration.credentials.hasOAuth ? 'text-green-600' : 'text-gray-400'}`}>
                          <Shield className="h-3 w-3" />
                          OAuth
                        </div>
                      </div>
                      
                      {/* Usage */}
                      {integration.pricing.monthlyQuota > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Uso Mensal</span>
                            <span>{formatNumber(integration.pricing.currentUsage)} / {formatNumber(integration.pricing.monthlyQuota)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#693ee0] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((integration.pricing.currentUsage / integration.pricing.monthlyQuota) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {/* Last Sync */}
                      <div className="text-xs text-gray-500 mb-4">
                        Última sync: {integration.lastSync.toLocaleDateString('pt-BR')} às{' '}
                        {integration.lastSync.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedIntegration(integration)
                            setShowConfigModal(true)
                          }}
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Configurar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Sincronizar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {selectedTab === 'webhooks' && (
          <div className="space-y-6">
            {/* Webhooks Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Webhooks</p>
                      <p className="text-2xl font-bold text-gray-900">{webhooks.length}</p>
                    </div>
                    <Webhook className="h-8 w-8 text-[#693ee0]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Webhooks Ativos</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {webhooks.filter(w => w.status === 'active').length}
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
                      <p className="text-sm font-medium text-gray-600">Requests Hoje</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(webhooks.reduce((sum, w) => sum + Math.floor(w.totalRequests / 30), 0))}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Success Rate Médio</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length).toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Webhooks List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#693ee0]" />
                  Webhook Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <div key={webhook.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{webhook.name}</h4>
                          <p className="text-sm text-gray-600 font-mono">{webhook.url}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            webhook.status === 'active' ? 'bg-green-100 text-green-800' :
                            webhook.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {webhook.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Total Requests</p>
                          <p className="text-lg font-bold text-gray-900">{formatNumber(webhook.totalRequests)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Success Rate</p>
                          <p className="text-lg font-bold text-green-600">{webhook.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Max Retries</p>
                          <p className="text-lg font-bold text-blue-600">{webhook.retryPolicy.maxRetries}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Last Triggered</p>
                          <p className="text-sm text-gray-600">
                            {webhook.lastTriggered.toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Events:</p>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event) => (
                            <span key={event} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Configurar
                        </Button>
                        <Button variant="outline" size="sm">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Testar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Logs
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'logs' && (
          <div className="space-y-6">
            {/* Sync Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-[#693ee0]" />
                  Jobs de Sincronização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncJobs.map((job) => {
                    const statusColor = getJobStatusColor(job.status)
                    const progress = job.recordsTotal > 0 ? (job.recordsProcessed / job.recordsTotal) * 100 : 0
                    
                    return (
                      <div key={job.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{job.integrationName}</h4>
                            <p className="text-sm text-gray-600">{job.type} sync</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                            {job.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Started</p>
                            <p className="text-sm text-gray-600">
                              {job.startedAt.toLocaleString('pt-BR')}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Records</p>
                            <p className="text-sm text-gray-600">
                              {job.recordsProcessed} / {job.recordsTotal}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Duration</p>
                            <p className="text-sm text-gray-600">
                              {job.duration ? formatDuration(job.duration) : 'Running...'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Errors</p>
                            <p className="text-sm text-gray-600">{job.errors.length}</p>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{progress.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                job.status === 'completed' ? 'bg-green-500' :
                                job.status === 'running' ? 'bg-blue-500' :
                                job.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Errors */}
                        {job.errors.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm font-medium text-red-800 mb-2">Errors:</p>
                            <ul className="text-sm text-red-700 space-y-1">
                              {job.errors.map((error, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                  {error}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Configuration Modal */}
      {showConfigModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Configurar {selectedIntegration.name}
              </h3>
              <button
                onClick={() => {
                  setShowConfigModal(false)
                  setSelectedIntegration(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center py-8">
              <Settings className="h-16 w-16 text-[#693ee0] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Painel de Configuração
              </h3>
              <p className="text-gray-600 mb-6">
                Interface completa de configuração com API keys, webhooks, field mapping e sync settings
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setShowConfigModal(false)}>
                  Cancelar
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}