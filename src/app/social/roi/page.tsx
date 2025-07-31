'use client'

import { useState, useEffect } from 'react'
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  ShoppingCart,
  Users,
  Activity,
  BarChart3,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Zap,
  Layers,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Settings,
  Link as LinkIcon,
  Tag,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface ROIMetric {
  id: string
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  period: string
  format: 'currency' | 'percentage' | 'number'
  description?: string
}

interface ConversionFunnel {
  stage: string
  users: number
  conversionRate: number
  value: number
  dropOffRate: number
}

interface AttributionModel {
  id: string
  name: string
  type: 'first_click' | 'last_click' | 'linear' | 'time_decay' | 'position_based' | 'data_driven'
  conversions: number
  revenue: number
  cost: number
  roi: number
  isActive: boolean
}

interface Campaign {
  id: string
  name: string
  platform: string
  status: 'active' | 'paused' | 'completed'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  roi: number
  cpc: number
  ctr: number
  conversionRate: number
  startDate: Date
  endDate?: Date
}

interface CustomerJourney {
  touchpoint: string
  platform: string
  users: number
  conversions: number
  revenue: number
  position: number
  influence: number
}

export default function ROIPage() {
  const [roiMetrics, setROIMetrics] = useState<ROIMetric[]>([])
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel[]>([])
  const [attributionModels, setAttributionModels] = useState<AttributionModel[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [customerJourney, setCustomerJourney] = useState<CustomerJourney[]>([])
  const [selectedTab, setSelectedTab] = useState<'overview' | 'attribution' | 'campaigns' | 'funnel' | 'journey'>('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedClient, setSelectedClient] = useState('all')

  // Dados simulados - em produção viriam da API
  useEffect(() => {
    const mockROIMetrics: ROIMetric[] = [
      {
        id: '1',
        name: 'ROI Total',
        value: 380,
        change: 23.5,
        trend: 'up',
        period: 'Últimos 30 dias',
        format: 'percentage',
        description: 'Retorno sobre investimento total de todas as campanhas'
      },
      {
        id: '2',
        name: 'Revenue Generated',
        value: 287500,
        change: 45.2,
        trend: 'up',
        period: 'Últimos 30 dias',
        format: 'currency'
      },
      {
        id: '3',
        name: 'Cost per Acquisition',
        value: 89.50,
        change: -12.3,
        trend: 'up',
        period: 'Últimos 30 dias',
        format: 'currency'
      },
      {
        id: '4',
        name: 'Customer Lifetime Value',
        value: 1250,
        change: 18.7,
        trend: 'up',
        period: 'Média do período',
        format: 'currency'
      },
      {
        id: '5',
        name: 'Conversion Rate',
        value: 4.8,
        change: 0.9,
        trend: 'up',
        period: 'Últimos 30 dias',
        format: 'percentage'
      },
      {
        id: '6',
        name: 'Marketing Efficiency Ratio',
        value: 2.4,
        change: 15.6,
        trend: 'up',
        period: 'Últimos 30 dias',
        format: 'number'
      }
    ]

    const mockConversionFunnel: ConversionFunnel[] = [
      { stage: 'Awareness', users: 125400, conversionRate: 100, value: 0, dropOffRate: 0 },
      { stage: 'Interest', users: 89600, conversionRate: 71.5, value: 0, dropOffRate: 28.5 },
      { stage: 'Consideration', users: 45200, conversionRate: 36.1, value: 0, dropOffRate: 35.4 },
      { stage: 'Intent', users: 18900, conversionRate: 15.1, value: 0, dropOffRate: 21.0 },
      { stage: 'Purchase', users: 6750, conversionRate: 5.4, value: 287500, dropOffRate: 9.7 },
      { stage: 'Retention', users: 4560, conversionRate: 3.6, value: 156800, dropOffRate: 1.8 }
    ]

    const mockAttributionModels: AttributionModel[] = [
      {
        id: '1',
        name: 'First Click Attribution',
        type: 'first_click',
        conversions: 1247,
        revenue: 156800,
        cost: 45600,
        roi: 244,
        isActive: false
      },
      {
        id: '2',
        name: 'Last Click Attribution',
        type: 'last_click',
        conversions: 987,
        revenue: 189500,
        cost: 52300,
        roi: 262,
        isActive: false
      },
      {
        id: '3',
        name: 'Linear Attribution',
        type: 'linear',
        conversions: 1456,
        revenue: 287500,
        cost: 67800,
        roi: 324,
        isActive: false
      },
      {
        id: '4',
        name: 'Time Decay Attribution',
        type: 'time_decay',
        conversions: 1234,
        revenue: 245600,
        cost: 58900,
        roi: 317,
        isActive: false
      },
      {
        id: '5',
        name: 'Data-Driven Attribution',
        type: 'data_driven',
        conversions: 1678,
        revenue: 345200,
        cost: 75600,
        roi: 356,
        isActive: true
      }
    ]

    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Black Friday 2024',
        platform: 'instagram',
        status: 'completed',
        budget: 15000,
        spent: 14850,
        impressions: 245600,
        clicks: 12800,
        conversions: 456,
        revenue: 89500,
        roi: 503,
        cpc: 1.16,
        ctr: 5.2,
        conversionRate: 3.6,
        startDate: new Date('2024-11-25'),
        endDate: new Date('2024-11-30')
      },
      {
        id: '2',
        name: 'AI Product Launch',
        platform: 'linkedin',
        status: 'active',
        budget: 8500,
        spent: 6750,
        impressions: 156900,
        clicks: 8900,
        conversions: 234,
        revenue: 67800,
        roi: 904,
        cpc: 0.76,
        ctr: 5.7,
        conversionRate: 2.6,
        startDate: new Date('2024-11-15')
      },
      {
        id: '3',
        name: 'Holiday Fashion Collection',
        platform: 'facebook',
        status: 'active',
        budget: 12000,
        spent: 9800,
        impressions: 334500,
        clicks: 15600,
        conversions: 678,
        revenue: 125600,
        roi: 182,
        cpc: 0.63,
        ctr: 4.7,
        conversionRate: 4.3,
        startDate: new Date('2024-12-01')
      }
    ]

    const mockCustomerJourney: CustomerJourney[] = [
      {
        touchpoint: 'Instagram Ad',
        platform: 'instagram',
        users: 45600,
        conversions: 234,
        revenue: 67800,
        position: 1,
        influence: 25.5
      },
      {
        touchpoint: 'Facebook Organic',
        platform: 'facebook',
        users: 32400,
        conversions: 156,
        revenue: 45200,
        position: 2,
        influence: 18.3
      },
      {
        touchpoint: 'LinkedIn Content',
        platform: 'linkedin',
        users: 28900,
        conversions: 189,
        revenue: 89600,
        position: 3,
        influence: 22.1
      },
      {
        touchpoint: 'Email Marketing',
        platform: 'email',
        users: 18700,
        conversions: 345,
        revenue: 156800,
        position: 4,
        influence: 34.1
      }
    ]

    setROIMetrics(mockROIMetrics)
    setConversionFunnel(mockConversionFunnel)
    setAttributionModels(mockAttributionModels)
    setCampaigns(mockCampaigns)
    setCustomerJourney(mockCustomerJourney)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatMetricValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value)
      case 'percentage':
        return `${value}%`
      case 'number':
        return value.toFixed(1)
      default:
        return value.toString()
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800'
    }
    return colors[status as keyof typeof colors] || colors.active
  }

  const getAttributionTypeColor = (type: string) => {
    const colors = {
      first_click: 'text-blue-600 bg-blue-100',
      last_click: 'text-green-600 bg-green-100',
      linear: 'text-purple-600 bg-purple-100',
      time_decay: 'text-orange-600 bg-orange-100',
      position_based: 'text-pink-600 bg-pink-100',
      data_driven: 'text-indigo-600 bg-indigo-100'
    }
    return colors[type as keyof typeof colors] || colors.linear
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-[#693ee0]" />
              ROI & Attribution Modeling
            </h1>
            <p className="text-gray-600 mt-1">Tracking completo de retorno e atribuição multi-canal</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
            
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Relatório
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-8 mt-4">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'attribution', label: 'Attribution', icon: Target },
            { id: 'campaigns', label: 'Campanhas', icon: Activity },
            { id: 'funnel', label: 'Funil', icon: Layers },
            { id: 'journey', label: 'Jornada', icon: Users }
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
            {/* Main ROI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roiMetrics.map((metric) => {
                const TrendIcon = metric.trend === 'up' ? ArrowUpRight : 
                                metric.trend === 'down' ? ArrowDownRight : Activity
                
                return (
                  <Card key={metric.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-[#693ee0]/10">
                          <DollarSign className="h-5 w-5 text-[#693ee0]" />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 
                          metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          <TrendIcon className="h-3 w-3" />
                          {Math.abs(metric.change)}%
                        </div>
                      </div>
                      
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {formatMetricValue(metric.value, metric.format)}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{metric.name}</div>
                      <div className="text-xs text-gray-500">{metric.period}</div>
                      
                      {metric.description && (
                        <div className="text-xs text-gray-500 mt-2 border-t pt-2">
                          {metric.description}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-[#693ee0]" />
                    Revenue por Plataforma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { platform: 'Instagram', revenue: 156800, percentage: 38.2, color: 'bg-pink-500' },
                      { platform: 'Facebook', revenue: 125600, percentage: 30.6, color: 'bg-blue-500' },
                      { platform: 'LinkedIn', revenue: 89600, percentage: 21.8, color: 'bg-indigo-500' },
                      { platform: 'Email', revenue: 38400, percentage: 9.4, color: 'bg-green-500' }
                    ].map((item) => (
                      <div key={item.platform} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm font-medium text-gray-900">{item.platform}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatCurrency(item.revenue)}
                          </div>
                          <div className="text-xs text-gray-500">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-[#693ee0]" />
                    ROI Trend (30 dias)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gradient-to-br from-[#693ee0]/5 to-[#5a35c7]/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-[#693ee0] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Gráfico de ROI</h3>
                      <p className="text-gray-600">Evolução do ROI ao longo do tempo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#693ee0]" />
                  Top Campanhas por ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Campanha</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Gasto</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.sort((a, b) => b.roi - a.roi).map((campaign) => (
                        <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{campaign.name}</p>
                              <p className="text-sm text-gray-600 capitalize">{campaign.platform}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium">
                            {formatCurrency(campaign.budget)}
                          </td>
                          <td className="py-4 px-4">
                            {formatCurrency(campaign.spent)}
                          </td>
                          <td className="py-4 px-4 font-medium text-green-600">
                            {formatCurrency(campaign.revenue)}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-purple-600">{campaign.roi}%</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status === 'active' ? 'Ativo' : 
                               campaign.status === 'paused' ? 'Pausado' : 'Finalizado'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedTab === 'attribution' && (
          <div className="space-y-6">
            {/* Attribution Models Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#693ee0]" />
                  Modelos de Atribuição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {attributionModels.map((model) => (
                    <div 
                      key={model.id} 
                      className={`border rounded-lg p-4 relative ${
                        model.isActive ? 'border-[#693ee0] bg-[#693ee0]/5' : 'border-gray-200'
                      }`}
                    >
                      {model.isActive && (
                        <div className="absolute -top-2 -right-2">
                          <div className="bg-[#693ee0] text-white px-2 py-1 rounded-full text-xs font-medium">
                            Ativo
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${getAttributionTypeColor(model.type)}`}>
                          <Target className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{model.name}</h4>
                          <p className="text-xs text-gray-600 capitalize">{model.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Conversões</p>
                          <p className="text-lg font-bold text-gray-900">{formatNumber(model.conversions)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Revenue</p>
                          <p className="text-sm font-semibold text-green-600">{formatCurrency(model.revenue)}</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800">ROI</span>
                          <span className="text-lg font-bold text-green-600">{model.roi}%</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant={model.isActive ? "outline" : "default"} 
                          size="sm" 
                          className="flex-1"
                        >
                          {model.isActive ? 'Configurar' : 'Ativar'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attribution Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#693ee0]" />
                    Insights de Atribuição
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-blue-900">Data-Driven Attribution Recomendado</h5>
                        <p className="text-sm text-blue-700">
                          O modelo data-driven está gerando 356% de ROI, 12% superior ao linear.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-yellow-900">Oportunidade de Otimização</h5>
                        <p className="text-sm text-yellow-700">
                          Instagram shows higher first-click attribution value. Consider increasing budget.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-green-900">Performance Crescente</h5>
                        <p className="text-sm text-green-700">
                          Multi-touch attribution showing 23% improvement over single-touch models.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#693ee0]" />
                    Cross-Platform Attribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-[#693ee0]/5 to-[#5a35c7]/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Target className="h-12 w-12 text-[#693ee0] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Attribution Flow</h3>
                      <p className="text-gray-600">Visualização do fluxo de atribuição entre plataformas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'funnel' && (
          <div className="space-y-6">
            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#693ee0]" />
                  Funil de Conversão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnel.map((stage, index) => (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-[#693ee0] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                            <p className="text-sm text-gray-600">
                              {formatNumber(stage.users)} usuários
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {stage.conversionRate.toFixed(1)}%
                          </div>
                          {stage.dropOffRate > 0 && (
                            <div className="text-sm text-red-600">
                              -{stage.dropOffRate.toFixed(1)}% drop
                            </div>
                          )}
                          {stage.value > 0 && (
                            <div className="text-sm text-green-600 font-medium">
                              {formatCurrency(stage.value)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#693ee0] to-[#5a35c7] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stage.conversionRate}%` }}
                        ></div>
                      </div>
                      
                      {/* Connector */}
                      {index < conversionFunnel.length - 1 && (
                        <div className="flex justify-center my-2">
                          <ArrowDownRight className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Funnel Optimization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#693ee0]" />
                    Oportunidades de Otimização
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="font-medium text-gray-900">Maior Drop-off: Interest → Consideration</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        35.4% de usuários saem nesta etapa. Melhore o conteúdo de consideração.
                      </p>
                      <div className="text-xs text-red-600 mt-2">Perda potencial: R$ 67.400</div>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h5 className="font-medium text-gray-900">Conversão Intent → Purchase</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        9.7% de drop na etapa final. Otimize checkout e ofertas de última hora.
                      </p>
                      <div className="text-xs text-yellow-600 mt-2">Melhoria potencial: +15%</div>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-medium text-gray-900">Excelente Retenção</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        67.6% dos compradores se tornam clientes recorrentes.
                      </p>
                      <div className="text-xs text-green-600 mt-2">Continue estratégia atual</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#693ee0]" />
                    Funil por Dispositivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <div>
                          <span className="font-medium text-gray-900">Mobile</span>
                          <p className="text-sm text-gray-600">78.4% do tráfego</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">4.2%</div>
                        <div className="text-xs text-gray-600">Conv. Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium text-gray-900">Desktop</span>
                          <p className="text-sm text-gray-600">21.6% do tráfego</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">6.8%</div>
                        <div className="text-xs text-gray-600">Conv. Rate</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'journey' && (
          <div className="space-y-6">
            {/* Customer Journey */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#693ee0]" />
                  Jornada do Cliente Multi-Touchpoint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                  {customerJourney.map((touchpoint, index) => (
                    <div key={touchpoint.touchpoint} className="relative">
                      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-[#693ee0] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {touchpoint.position}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{touchpoint.touchpoint}</h4>
                            <p className="text-xs text-gray-600 capitalize">{touchpoint.platform}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Usuários</span>
                            <span className="font-medium">{formatNumber(touchpoint.users)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Conversões</span>
                            <span className="font-medium text-green-600">{touchpoint.conversions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Revenue</span>
                            <span className="font-medium text-green-600">{formatCurrency(touchpoint.revenue)}</span>
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-purple-800">Influência</span>
                            <span className="text-lg font-bold text-purple-600">{touchpoint.influence}%</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Connector arrow */}
                      {index < customerJourney.length - 1 && (
                        <div className="hidden xl:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                          <ArrowUpRight className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Journey Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#693ee0]" />
                    Journey Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-2">🎯 Maior Influenciador</h5>
                      <p className="text-sm text-green-700">
                        Email Marketing tem 34.1% de influência na conversão final, 
                        apesar de aparecer no 4º touchpoint.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">🚀 Melhor Primeiro Contato</h5>
                      <p className="text-sm text-blue-700">
                        Instagram Ads gera 25.5% de primeira impressão positiva,
                        alimentando todo o funil.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h5 className="font-medium text-orange-900 mb-2">💡 Oportunidade</h5>
                      <p className="text-sm text-orange-700">
                        LinkedIn Content tem alta conversão (189) mas baixo volume.
                        Considere aumentar investimento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#693ee0]" />
                    Tempo Médio de Conversão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">7.2 dias</div>
                      <div className="text-sm text-purple-700">Tempo médio até conversão</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-gray-900">3.4</div>
                        <div className="text-xs text-gray-600">Touchpoints médios</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-gray-900">89%</div>
                        <div className="text-xs text-gray-600">Multi-touch</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Campaign Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#693ee0]" />
                  Performance Detalhada por Campanha
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Campanha</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Impressões</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">CTR</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">CPC</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Conversões</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Conv. Rate</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{campaign.name}</p>
                              <p className="text-sm text-gray-600 capitalize">{campaign.platform}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">{formatNumber(campaign.impressions)}</td>
                          <td className="py-4 px-4">{formatNumber(campaign.clicks)}</td>
                          <td className="py-4 px-4">{campaign.ctr.toFixed(1)}%</td>
                          <td className="py-4 px-4">R$ {campaign.cpc.toFixed(2)}</td>
                          <td className="py-4 px-4 font-medium">{campaign.conversions}</td>
                          <td className="py-4 px-4">{campaign.conversionRate.toFixed(1)}%</td>
                          <td className="py-4 px-4 font-medium text-green-600">
                            {formatCurrency(campaign.revenue)}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-purple-600">{campaign.roi}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}