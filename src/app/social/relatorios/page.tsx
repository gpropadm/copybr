'use client'

import { useState, useEffect } from 'react'
import { 
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Mail,
  Clock,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Share2,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Layers,
  Brain,
  Star,
  Crown,
  Building,
  Send,
  Save,
  X,
  Copy,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Report {
  id: string
  name: string
  type: 'executive_summary' | 'performance_deep_dive' | 'roi_analysis' | 'competitive_analysis' | 'custom'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'on_demand'
  status: 'active' | 'paused' | 'draft'
  lastGenerated: Date
  nextScheduled?: Date
  recipients: string[]
  clientIds: string[]
  sections: string[]
  format: 'pdf' | 'excel' | 'powerpoint' | 'web'
  branding: {
    logo?: string
    colors: string[]
    companyName: string
  }
  metrics: {
    totalViews: number
    avgRating: number
    downloadCount: number
  }
  createdAt: Date
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: string
  category: 'executive' | 'operational' | 'analytical' | 'client_facing'
  sections: string[]
  estimatedTime: string
  complexity: 'basic' | 'intermediate' | 'advanced'
  popularity: number
  preview: string
}

interface ExecutiveInsight {
  id: string
  title: string
  description: string
  type: 'success' | 'warning' | 'opportunity' | 'threat'
  priority: 'high' | 'medium' | 'low'
  metric: string
  value: string
  change: number
  recommendation: string
  impact: 'high' | 'medium' | 'low'
}

export default function RelatoriosPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [templates, setTemplates] = useState<ReportTemplate[]>([])
  const [insights, setInsights] = useState<ExecutiveInsight[]>([])
  const [selectedTab, setSelectedTab] = useState<'reports' | 'templates' | 'insights' | 'analytics'>('reports')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  // Dados simulados - em produção viriam da API
  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: '1',
        name: 'Relatório Executivo Mensal - TechStartup Inc',
        type: 'executive_summary',
        frequency: 'monthly',
        status: 'active',
        lastGenerated: new Date('2024-11-30T09:00:00'),
        nextScheduled: new Date('2024-12-30T09:00:00'),
        recipients: ['ceo@techstartup.com', 'marketing@techstartup.com', 'alex@socialagency.com'],
        clientIds: ['1'],
        sections: ['Executive Summary', 'ROI Analysis', 'Performance Metrics', 'Competitive Analysis', 'Recommendations'],
        format: 'pdf',
        branding: {
          colors: ['#693ee0', '#5a35c7'],
          companyName: 'TechStartup Inc'
        },
        metrics: {
          totalViews: 247,
          avgRating: 4.8,
          downloadCount: 89
        },
        createdAt: new Date('2024-09-15')
      },
      {
        id: '2',
        name: 'Performance Deep Dive - Q4 2024',
        type: 'performance_deep_dive',
        frequency: 'quarterly',
        status: 'active',
        lastGenerated: new Date('2024-11-01T14:30:00'),
        nextScheduled: new Date('2025-01-01T14:30:00'),
        recipients: ['team@fashionboutique.com', 'director@fashionboutique.com'],
        clientIds: ['2'],
        sections: ['Campaign Performance', 'Audience Analysis', 'Content Performance', 'Platform Breakdown', 'Growth Metrics'],
        format: 'powerpoint',
        branding: {
          colors: ['#ff6b9d', '#c44569'],
          companyName: 'Fashion Boutique'
        },
        metrics: {
          totalViews: 156,
          avgRating: 4.9,
          downloadCount: 67
        },
        createdAt: new Date('2024-08-01')
      },
      {
        id: '3',
        name: 'ROI & Attribution Analysis - Multi-Client',
        type: 'roi_analysis',
        frequency: 'weekly',
        status: 'active',
        lastGenerated: new Date('2024-11-28T16:00:00'),
        nextScheduled: new Date('2024-12-05T16:00:00'),
        recipients: ['agency@socialmanagement.com', 'finance@socialmanagement.com'],
        clientIds: ['1', '2', '3'],
        sections: ['ROI Overview', 'Attribution Models', 'Cost Analysis', 'Revenue Tracking', 'Optimization Opportunities'],
        format: 'excel',
        branding: {
          colors: ['#4834d4', '#686de0'],
          companyName: 'Social Management Agency'
        },
        metrics: {
          totalViews: 89,
          avgRating: 4.6,
          downloadCount: 34
        },
        createdAt: new Date('2024-10-10')
      },
      {
        id: '4',
        name: 'Análise Competitiva - Setor Fashion',
        type: 'competitive_analysis',
        frequency: 'monthly',
        status: 'draft',
        lastGenerated: new Date('2024-10-30T11:00:00'),
        recipients: ['strategy@fashionboutique.com'],
        clientIds: ['2'],
        sections: ['Market Overview', 'Competitor Performance', 'Share of Voice', 'Trend Analysis', 'Strategic Recommendations'],
        format: 'pdf',
        branding: {
          colors: ['#ff6b9d', '#c44569'],
          companyName: 'Fashion Boutique'
        },
        metrics: {
          totalViews: 23,
          avgRating: 4.7,
          downloadCount: 12
        },
        createdAt: new Date('2024-10-01')
      }
    ]

    const mockTemplates: ReportTemplate[] = [
      {
        id: 't1',
        name: 'Executive Dashboard - CEO Ready',
        description: 'Relatório executivo completo com métricas de alto nível, ROI e insights estratégicos',
        type: 'executive_summary',
        category: 'executive',
        sections: ['Executive Summary', 'Key Performance Indicators', 'ROI Analysis', 'Strategic Recommendations'],
        estimatedTime: '2-3 horas',
        complexity: 'advanced',
        popularity: 95,
        preview: 'Visão geral estratégica com foco em resultados de negócio'
      },
      {
        id: 't2',
        name: 'Performance Deep Dive',
        description: 'Análise detalhada de performance com métricas granulares e insights operacionais',
        type: 'performance_deep_dive',
        category: 'operational',
        sections: ['Campaign Analysis', 'Audience Insights', 'Content Performance', 'Platform Breakdown'],
        estimatedTime: '4-5 horas',
        complexity: 'intermediate',
        popularity: 87,
        preview: 'Análise operacional detalhada para otimização contínua'
      },
      {
        id: 't3',
        name: 'Client Success Report',
        description: 'Relatório focado no cliente com resultados, conquistas e próximos passos',
        type: 'custom',
        category: 'client_facing',
        sections: ['Achievements', 'Performance Highlights', 'Case Studies', 'Future Roadmap'],
        estimatedTime: '1-2 horas',
        complexity: 'basic',
        popularity: 78,
        preview: 'Relatório otimizado para apresentação ao cliente'
      },
      {
        id: 't4',
        name: 'Competitive Intelligence',
        description: 'Análise competitiva com benchmarking e oportunidades de mercado',
        type: 'competitive_analysis',
        category: 'analytical',
        sections: ['Market Analysis', 'Competitor Benchmarking', 'SWOT Analysis', 'Market Opportunities'],
        estimatedTime: '3-4 horas',
        complexity: 'advanced',
        popularity: 72,
        preview: 'Intelligence competitiva para decisões estratégicas'
      }
    ]

    const mockInsights: ExecutiveInsight[] = [
      {
        id: '1',
        title: 'ROI Excepcional em Campanhas Instagram',
        description: 'Campanhas do Instagram estão gerando 380% de ROI, 45% acima da meta trimestral',
        type: 'success',
        priority: 'high',
        metric: 'ROI Instagram',
        value: '380%',
        change: 45.2,
        recommendation: 'Aumentar investimento em Instagram Ads em 25% para maximizar retornos',
        impact: 'high'
      },
      {
        id: '2',
        title: 'Oportunidade no LinkedIn B2B',
        description: 'LinkedIn apresenta baixo volume mas alta conversão. Potencial de escala identificado',
        type: 'opportunity',
        priority: 'medium',
        metric: 'Conversão LinkedIn',
        value: '8.9%',
        change: 23.1,
        recommendation: 'Dobrar budget do LinkedIn para capturar leads B2B premium',
        impact: 'high'
      },
      {
        id: '3',
        title: 'Queda na Retenção de Audience',
        description: 'Taxa de retenção caiu 12% no último mês. Necessário revisar estratégia de conteúdo',
        type: 'warning',
        priority: 'high',
        metric: 'Retenção de Audiência',
        value: '67.8%',
        change: -12.3,
        recommendation: 'Implementar série de conteúdo educacional e aumentar frequência de posts',
        impact: 'medium'
      },
      {
        id: '4',
        title: 'Concorrente Ganhando Share of Voice',
        description: 'Competitor X aumentou share of voice em 15% no último trimestre',
        type: 'threat',
        priority: 'medium',
        metric: 'Share of Voice',
        value: '18.5%',
        change: -15.2,
        recommendation: 'Acelerar estratégia de thought leadership e partnerships',
        impact: 'medium'
      }
    ]

    setReports(mockReports)
    setTemplates(mockTemplates)
    setInsights(mockInsights)
  }, [])

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.branding.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    const matchesType = filterType === 'all' || report.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusInfo = (status: string) => {
    const statuses = {
      active: { name: 'Ativo', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      paused: { name: 'Pausado', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      draft: { name: 'Rascunho', color: 'bg-gray-100 text-gray-800', icon: Edit }
    }
    return statuses[status as keyof typeof statuses] || statuses.draft
  }

  const getTypeInfo = (type: string) => {
    const types = {
      executive_summary: { name: 'Executive Summary', icon: Crown, color: 'text-purple-600 bg-purple-100' },
      performance_deep_dive: { name: 'Performance Deep Dive', icon: BarChart3, color: 'text-blue-600 bg-blue-100' },
      roi_analysis: { name: 'ROI Analysis', icon: DollarSign, color: 'text-green-600 bg-green-100' },
      competitive_analysis: { name: 'Competitive Analysis', icon: Target, color: 'text-orange-600 bg-orange-100' },
      custom: { name: 'Custom Report', icon: Settings, color: 'text-gray-600 bg-gray-100' }
    }
    return types[type as keyof typeof types] || types.custom
  }

  const getFrequencyInfo = (frequency: string) => {
    const frequencies = {
      daily: 'Diário',
      weekly: 'Semanal', 
      monthly: 'Mensal',
      quarterly: 'Trimestral',
      on_demand: 'Sob Demanda'
    }
    return frequencies[frequency as keyof typeof frequencies] || frequency
  }

  const getInsightTypeColor = (type: string) => {
    const colors = {
      success: 'border-green-200 bg-green-50 text-green-800',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      opportunity: 'border-blue-200 bg-blue-50 text-blue-800',
      threat: 'border-red-200 bg-red-50 text-red-800'
    }
    return colors[type as keyof typeof colors] || colors.success
  }

  const getInsightIcon = (type: string) => {
    const icons = {
      success: CheckCircle,
      warning: AlertTriangle,
      opportunity: TrendingUp,
      threat: ArrowDownRight
    }
    return icons[type as keyof typeof icons] || CheckCircle
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600 bg-red-100',
      medium: 'text-yellow-600 bg-yellow-100',
      low: 'text-green-600 bg-green-100'
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      executive: 'text-purple-600 bg-purple-100',
      operational: 'text-blue-600 bg-blue-100',
      analytical: 'text-green-600 bg-green-100',
      client_facing: 'text-orange-600 bg-orange-100'
    }
    return colors[category as keyof typeof colors] || colors.executive
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
              <FileText className="h-6 w-6 text-[#693ee0]" />
              Relatórios Executivos
            </h1>
            <p className="text-gray-600 mt-1">PDFs automáticos e dashboards executivos personalizados</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Relatório
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-8 mt-4">
          {[
            { id: 'reports', label: 'Relatórios', icon: FileText },
            { id: 'templates', label: 'Templates', icon: Layers },
            { id: 'insights', label: 'Executive Insights', icon: Brain },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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
        {selectedTab === 'reports' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total de Relatórios</p>
                      <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-[#693ee0]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Relatórios Ativos</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {reports.filter(r => r.status === 'active').length}
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
                      <p className="text-sm font-medium text-gray-600">Downloads Este Mês</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(reports.reduce((sum, r) => sum + r.metrics.downloadCount, 0))}
                      </p>
                    </div>
                    <Download className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rating Médio</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(reports.reduce((sum, r) => sum + r.metrics.avgRating, 0) / reports.length).toFixed(1)}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
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
                      placeholder="Buscar relatórios..."
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
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="executive_summary">Executive Summary</option>
                    <option value="performance_deep_dive">Performance Deep Dive</option>
                    <option value="roi_analysis">ROI Analysis</option>
                    <option value="competitive_analysis">Competitive Analysis</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReports.map((report) => {
                const statusInfo = getStatusInfo(report.status)
                const typeInfo = getTypeInfo(report.type)
                const StatusIcon = statusInfo.icon
                const TypeIcon = typeInfo.icon
                
                return (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 line-clamp-1">{report.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{report.branding.companyName}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">{typeInfo.name}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{getFrequencyInfo(report.frequency)}</span>
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
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-900">
                            {formatNumber(report.metrics.totalViews)}
                          </p>
                          <p className="text-xs text-gray-600">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-yellow-600">
                            {report.metrics.avgRating.toFixed(1)}★
                          </p>
                          <p className="text-xs text-gray-600">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-blue-600">
                            {report.metrics.downloadCount}
                          </p>
                          <p className="text-xs text-gray-600">Downloads</p>
                        </div>
                      </div>
                      
                      {/* Sections */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">📋 Seções:</p>
                        <div className="flex flex-wrap gap-1">
                          {report.sections.slice(0, 3).map((section, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {section}
                            </span>
                          ))}
                          {report.sections.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{report.sections.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Recipients */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">📧 Destinatários:</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{report.recipients.length} pessoas</span>
                        </div>
                      </div>
                      
                      {/* Schedule info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>
                          Último: {report.lastGenerated.toLocaleDateString('pt-BR')}
                        </span>
                        {report.nextScheduled && (
                          <span className="text-green-600">
                            Próximo: {report.nextScheduled.toLocaleDateString('pt-BR')}
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
                            setSelectedReport(report)
                            setShowPreviewModal(true)
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Visualizar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
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
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-gray-600">{template.popularity}% popularidade</span>
                        <span className="text-xs text-gray-400">•</span>
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{template.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <p className="text-xs text-gray-500 italic">{template.preview}</p>
                  
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Seções incluídas:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section) => (
                        <span key={section} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {section}
                        </span>
                      ))}
                    </div>
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

        {selectedTab === 'insights' && (
          <div className="space-y-6">
            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#693ee0]" />
                  Executive Summary - Insights de IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">8/10</div>
                    <div className="text-sm text-green-700">Performance Score</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
                    <div className="text-sm text-blue-700">Ações Recomendadas</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">+45%</div>
                    <div className="text-sm text-purple-700">Potencial de Melhoria</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
                    <div className="text-sm text-orange-700">Riscos Identificados</div>
                  </div>
                </div>
                
                <div className="text-center py-4 border border-gray-200 rounded-lg bg-gray-50">
                  <Brain className="h-12 w-12 text-[#693ee0] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">IA Executive Summary</h3>
                  <p className="text-gray-600">
                    "Suas campanhas estão performando 23% acima da média do setor. 
                    Recomendo focar no LinkedIn B2B e otimizar retenção para maximizar ROI."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight) => {
                const InsightIcon = getInsightIcon(insight.type)
                const TrendIcon = insight.change > 0 ? ArrowUpRight : ArrowDownRight
                
                return (
                  <Card key={insight.id} className={`border-l-4 ${getInsightTypeColor(insight.type)}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <InsightIcon className="h-5 w-5 mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                                {insight.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">{insight.metric}</span>
                          <div className="text-2xl font-bold text-gray-900">{insight.value}</div>
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-medium ${
                          insight.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendIcon className="h-4 w-4" />
                          {Math.abs(insight.change)}%
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">💡 Recomendação:</h5>
                        <p className="text-sm text-gray-700">{insight.recommendation}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Impacto Estimado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.impact === 'high' ? 'bg-green-100 text-green-800' :
                          insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {insight.impact}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                      <p className="text-2xl font-bold text-gray-900">247</p>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>+18% este mês</span>
                      </div>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Generation Time</p>
                      <p className="text-2xl font-bold text-gray-900">2.4min</p>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>-15% mais rápido</span>
                      </div>
                    </div>
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">User Satisfaction</p>
                      <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>+0.3 este mês</span>
                      </div>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Analytics Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#693ee0]" />
                  Usage Analytics (Últimos 30 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-[#693ee0]/5 to-[#5a35c7]/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-[#693ee0] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Gráfico de Uso</h3>
                    <p className="text-gray-600">Analytics detalhado de geração e consumo de relatórios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreviewModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{selectedReport.name}</h3>
              <button
                onClick={() => {
                  setShowPreviewModal(false)
                  setSelectedReport(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-[#693ee0] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Preview do Relatório
              </h3>
              <p className="text-gray-600 mb-6">
                Visualização completa com dados reais e formatação executiva
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar PDF
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Novo Relatório Executivo</h3>
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
                Report Builder
              </h3>
              <p className="text-gray-600 mb-4">
                Interface completa de criação com templates, customização e agendamento
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Criar Relatório
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}