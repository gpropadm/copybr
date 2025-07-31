'use client'
import { useState, useEffect } from 'react'
import {
  Crown,
  Star,
  Zap,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  X,
  Users,
  Brain,
  Target,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageCircle,
  Heart,
  Share,
  Calendar,
  DollarSign,
  UserCheck,
  UserPlus,
  Activity,
  Award,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  ThumbsUp,
  ThumbsDown,
  AlertCircle
} from 'lucide-react'

interface InfluencerData {
  id: string
  name: string
  handle: string
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter'
  followers: number
  engagement: number
  averageViews: number
  niche: string
  location: string
  priceRange: string
  contactInfo: {
    email?: string
    phone?: string
    agency?: string
  }
  recentPosts: {
    id: string
    content: string
    engagement: number
    views: number
    date: string
  }[]
  audienceInsights: {
    ageRange: string
    genderSplit: string
    topLocations: string[]
    interests: string[]
  }
  collaborationHistory: {
    brand: string
    campaign: string
    performance: 'excellent' | 'good' | 'average' | 'poor'
    roi: number
  }[]
  aiScore: number
  riskLevel: 'low' | 'medium' | 'high'
  predicted_performance: {
    expectedEngagement: number
    expectedReach: number
    expectedConversions: number
    confidence: number
  }
}

interface CrisisAlert {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: 'negative_sentiment' | 'viral_negative' | 'competitor_attack' | 'fake_news' | 'customer_complaint'
  title: string
  description: string
  platform: string
  mentions: number
  sentiment: number
  trending: boolean
  timestamp: string
  suggestedActions: string[]
  autoActions: string[]
  status: 'active' | 'monitoring' | 'resolved'
  impactScore: number
}

interface CompetitorIntel {
  id: string
  name: string
  handle: string
  platform: string
  followers: number
  growth: number
  recentCampaigns: {
    type: string
    performance: number
    engagement: number
  }[]
  threats: string[]
  opportunities: string[]
  aiInsights: string[]
}

export default function PremiumPage() {
  const [activeTab, setActiveTab] = useState<'influencers' | 'crisis' | 'intelligence' | 'compliance'>('influencers')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerData | null>(null)
  const [filterNiche, setFilterNiche] = useState('')
  const [filterPlatform, setFilterPlatform] = useState('')
  const [crisisAlerts, setCrisisAlerts] = useState<CrisisAlert[]>([])
  const [competitorIntel, setCompetitorIntel] = useState<CompetitorIntel[]>([])

  // Mock data - Influencer Discovery
  const [influencers, setInfluencers] = useState<InfluencerData[]>([
    {
      id: '1',
      name: 'Ana Silva',
      handle: '@anasilvafit',
      platform: 'instagram',
      followers: 850000,
      engagement: 6.8,
      averageViews: 120000,
      niche: 'Fitness & Wellness',
      location: 'São Paulo, SP',
      priceRange: 'R$ 15.000 - R$ 30.000',
      contactInfo: {
        email: 'contato@anasilvafit.com',
        phone: '+55 11 99999-9999',
        agency: 'Influence Marketing Agency'
      },
      recentPosts: [
        {
          id: '1',
          content: 'Treino HIIT de 20 minutos para queimar gordura 🔥',
          engagement: 45600,
          views: 180000,
          date: '2024-01-30'
        },
        {
          id: '2',
          content: 'Receita de smoothie pós-treino 💪',
          engagement: 38900,
          views: 145000,
          date: '2024-01-28'
        }
      ],
      audienceInsights: {
        ageRange: '25-34 (45%), 18-24 (35%)',
        genderSplit: '70% Feminino, 30% Masculino',
        topLocations: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
        interests: ['Fitness', 'Nutrição', 'Lifestyle', 'Saúde']
      },
      collaborationHistory: [
        {
          brand: 'Whey Protein X',
          campaign: 'Lançamento Sabor Chocolate',
          performance: 'excellent',
          roi: 450
        },
        {
          brand: 'Academia Y',
          campaign: 'Planos Anuais',
          performance: 'good',
          roi: 280
        }
      ],
      aiScore: 94,
      riskLevel: 'low',
      predicted_performance: {
        expectedEngagement: 7.2,
        expectedReach: 920000,
        expectedConversions: 1450,
        confidence: 91
      }
    },
    {
      id: '2',
      name: 'Carlos Tech',
      handle: '@carlostechbr',
      platform: 'youtube',
      followers: 2400000,
      engagement: 4.2,
      averageViews: 450000,
      niche: 'Tecnologia',
      location: 'Florianópolis, SC',
      priceRange: 'R$ 45.000 - R$ 80.000',
      contactInfo: {
        email: 'business@carlostech.com.br',
        agency: 'TechInfluence Media'
      },
      recentPosts: [
        {
          id: '1',
          content: 'Review completo do iPhone 15 Pro Max 📱',
          engagement: 89000,
          views: 680000,
          date: '2024-01-29'
        }
      ],
      audienceInsights: {
        ageRange: '18-24 (40%), 25-34 (35%)',
        genderSplit: '65% Masculino, 35% Feminino',
        topLocations: ['São Paulo', 'Rio de Janeiro', 'Brasília'],
        interests: ['Tecnologia', 'Games', 'Gadgets', 'Inovação']
      },
      collaborationHistory: [
        {
          brand: 'Samsung',
          campaign: 'Galaxy S24 Launch',
          performance: 'excellent',
          roi: 650
        }
      ],
      aiScore: 89,
      riskLevel: 'low',
      predicted_performance: {
        expectedEngagement: 4.8,
        expectedReach: 2100000,
        expectedConversions: 3200,
        confidence: 87
      }
    },
    {
      id: '3',
      name: 'Bianca Gourmet',
      handle: '@biancagourmet',
      platform: 'instagram',
      followers: 450000,
      engagement: 8.9,
      averageViews: 85000,
      niche: 'Culinária',
      location: 'Rio de Janeiro, RJ',
      priceRange: 'R$ 8.000 - R$ 18.000',
      contactInfo: {
        email: 'parceria@biancagourmet.com.br',
        phone: '+55 21 98888-8888'
      },
      recentPosts: [
        {
          id: '1',
          content: 'Bolo de chocolate sem açúcar 🍰',
          engagement: 56700,
          views: 125000,
          date: '2024-01-30'
        }
      ],
      audienceInsights: {
        ageRange: '25-34 (50%), 35-44 (30%)',
        genderSplit: '80% Feminino, 20% Masculino',
        topLocations: ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte'],
        interests: ['Culinária', 'Receitas', 'Lifestyle', 'Família']
      },
      collaborationHistory: [
        {
          brand: 'Açúcar Crystal',
          campaign: 'Receitas Saudáveis',
          performance: 'good',
          roi: 320
        }
      ],
      aiScore: 92,
      riskLevel: 'low',
      predicted_performance: {
        expectedEngagement: 9.1,
        expectedReach: 480000,
        expectedConversions: 890,
        confidence: 89
      }
    }
  ])

  // Mock data - Crisis Management
  useEffect(() => {
    setCrisisAlerts([
      {
        id: '1',
        severity: 'high',
        type: 'negative_sentiment',
        title: 'Sentimento negativo em alta - Cliente XYZ',
        description: 'Aumento de 340% em menções negativas sobre atendimento ao cliente nas últimas 6 horas',
        platform: 'Twitter',
        mentions: 1247,
        sentiment: -0.7,
        trending: true,
        timestamp: '2024-01-31T10:30:00Z',
        suggestedActions: [
          'Resposta oficial imediata da empresa',
          'Contato direto com clientes insatisfeitos',
          'Post explicativo no blog corporativo',
          'Campanha de testimonials positivos'
        ],
        autoActions: [
          'Notificação enviada para CEO via WhatsApp',
          'Relatório de crise gerado automaticamente',
          'Monitoramento intensivo ativado'
        ],
        status: 'active',
        impactScore: 85
      },
      {
        id: '2',
        severity: 'medium',
        type: 'competitor_attack',
        title: 'Concorrente ABC lança campanha comparativa',
        description: 'Campanha publicitária comparando preços e benefícios, mencionando nossa marca',
        platform: 'Instagram/Facebook',
        mentions: 456,
        sentiment: -0.3,
        trending: false,
        timestamp: '2024-01-31T08:15:00Z',
        suggestedActions: [
          'Análise jurídica da campanha',
          'Contra-campanha com nossos diferenciais',
          'Posts orgânicos destacando vantagens únicas'
        ],
        autoActions: [
          'Screenshot automático da campanha salvo',
          'Análise de sentiment ativada',
          'Alertas para equipe jurídica'
        ],
        status: 'monitoring',
        impactScore: 62
      },
      {
        id: '3',
        severity: 'critical',
        type: 'viral_negative',
        title: 'Vídeo viral negativo - Influenciador DEF',
        description: 'Vídeo crítico sobre produto atingiu 2M de visualizações em 12 horas',
        platform: 'TikTok',
        mentions: 8930,
        sentiment: -0.9,
        trending: true,
        timestamp: '2024-01-31T06:00:00Z',
        suggestedActions: [
          'Resposta em vídeo do CEO',
          'Demonstração técnica do produto',
          'Parceria com influenciadores de defesa',
          'Campanha de esclarecimento massiva'
        ],
        autoActions: [
          'Alerta vermelho para todos os executivos',
          'Coleta automática de dados do vídeo',
          'Ativação do plano de contingência',
          'Preparação de press release automático'
        ],
        status: 'active',
        impactScore: 96
      }
    ])

    setCompetitorIntel([
      {
        id: '1',
        name: 'Concorrente Alpha',
        handle: '@alpha_oficial',
        platform: 'Instagram',
        followers: 2100000,
        growth: 12.5,
        recentCampaigns: [
          {
            type: 'Influencer Marketing',
            performance: 89,
            engagement: 6.8
          },
          {
            type: 'Paid Ads',
            performance: 72,
            engagement: 3.2
          }
        ],
        threats: [
          'Lançamento de produto similar ao nosso',
          'Parcerias com top influencers do nosso nicho',
          'Campanha de preços agressiva'
        ],
        opportunities: [
          'Influencer que não renovou contrato com eles',
          'Falha na estratégia de Stories',
          'Baixo engajamento em conteúdo técnico'
        ],
        aiInsights: [
          'Estão investindo 40% mais em mídia paga',
          'Mudança de agência criativa detectada',
          'Padrão de postagem alterado - possível nova estratégia'
        ]
      }
    ])
  }, [])

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.niche.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNiche = !filterNiche || influencer.niche === filterNiche
    const matchesPlatform = !filterPlatform || influencer.platform === filterPlatform
    
    return matchesSearch && matchesNiche && matchesPlatform
  })

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-4 w-4" />
      case 'youtube': return <Youtube className="h-4 w-4" />
      case 'tiktok': return <Activity className="h-4 w-4" />
      case 'twitter': return <Twitter className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-xl">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recursos Premium</h1>
            <p className="text-gray-600">IA para influenciadores, gestão de crises e inteligência competitiva</p>
          </div>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Influencers Descobertos</p>
                <p className="text-2xl font-bold text-gray-900">12,847</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+28% este mês</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Crises Detectadas</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm text-red-600">-50% vs. semana passada</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ROI Médio Parcerias</p>
                <p className="text-2xl font-bold text-gray-900">485%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% último trimestre</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Score IA Premium</p>
                <p className="text-2xl font-bold text-gray-900">94/100</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">Nível Elite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'influencers', label: 'Discovery IA', icon: UserCheck },
            { key: 'crisis', label: 'Gestão de Crises', icon: AlertTriangle },
            { key: 'intelligence', label: 'Inteligência Competitiva', icon: Brain },
            { key: 'compliance', label: 'Compliance & API', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-[#693ee0] text-[#693ee0]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'influencers' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar influenciadores por nome, handle ou nicho..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                value={filterNiche}
                onChange={(e) => setFilterNiche(e.target.value)}
              >
                <option value="">Todos os nichos</option>
                <option value="Fitness & Wellness">Fitness & Wellness</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Culinária">Culinária</option>
                <option value="Moda">Moda</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
              >
                <option value="">Todas as plataformas</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="twitter">Twitter</option>
              </select>
            </div>
          </div>

          {/* Influencers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredInfluencers.map((influencer) => (
              <div key={influencer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#693ee0] to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {influencer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{influencer.name}</h3>
                      <p className="text-sm text-gray-600">{influencer.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(influencer.platform)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      influencer.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      influencer.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Risk: {influencer.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Seguidores</span>
                    <span className="font-medium">{(influencer.followers / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Engajamento</span>
                    <span className="font-medium">{influencer.engagement}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Nicho</span>
                    <span className="font-medium text-sm">{influencer.niche}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">AI Score</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#693ee0]">{influencer.aiScore}/100</span>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Previsão de Performance</span>
                    <span className="text-xs text-gray-500">{influencer.predicted_performance.confidence}% confiança</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-600">Engajamento</p>
                      <p className="font-medium text-green-600">+{influencer.predicted_performance.expectedEngagement}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Conversões</p>
                      <p className="font-medium text-blue-600">{influencer.predicted_performance.expectedConversions}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedInfluencer(influencer)}
                    className="flex-1 bg-[#693ee0] text-white px-4 py-2 rounded-lg hover:bg-[#5a32d1] transition-colors"
                  >
                    Ver Detalhes
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'crisis' && (
        <div className="space-y-6">
          {/* Crisis Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alertas Ativos</p>
                  <p className="text-3xl font-bold text-red-600">
                    {crisisAlerts.filter(alert => alert.status === 'active').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Monitoramento</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {crisisAlerts.filter(alert => alert.status === 'monitoring').length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolvidos (24h)</p>
                  <p className="text-3xl font-bold text-green-600">7</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Crisis Alerts */}
          <div className="space-y-4">
            {crisisAlerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      alert.severity === 'critical' ? 'bg-red-100' :
                      alert.severity === 'high' ? 'bg-orange-100' :
                      alert.severity === 'medium' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.severity === 'critical' ? 'text-red-600' :
                        alert.severity === 'high' ? 'text-orange-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        {alert.trending && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            TRENDING
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{alert.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Plataforma</p>
                          <p className="font-medium">{alert.platform}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Menções</p>
                          <p className="font-medium">{alert.mentions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Sentimento</p>
                          <div className="flex items-center gap-1">
                            {alert.sentiment < -0.5 ? (
                              <ThumbsDown className="h-4 w-4 text-red-500" />
                            ) : (
                              <ThumbsUp className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className={`font-medium ${alert.sentiment < -0.5 ? 'text-red-600' : 'text-yellow-600'}`}>
                              {Math.abs(alert.sentiment * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Impacto</p>
                          <p className="font-medium">{alert.impactScore}/100</p>
                        </div>
                      </div>

                      {/* Suggested Actions */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Ações Sugeridas pela IA:</h4>
                        <ul className="space-y-1">
                          {alert.suggestedActions.map((action, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <Target className="h-3 w-3 text-[#693ee0]" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Auto Actions */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Ações Automáticas Executadas:</h4>
                        <ul className="space-y-1">
                          {alert.autoActions.map((action, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(alert.timestamp).toLocaleString('pt-BR')}
                    </p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-[#693ee0] text-white rounded-lg text-sm hover:bg-[#5a32d1] transition-colors">
                        Ações
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        Resolver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          {/* Competitor Intelligence */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inteligência Competitiva</h3>
            
            {competitorIntel.map((competitor) => (
              <div key={competitor.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{competitor.name}</h4>
                    <p className="text-sm text-gray-600">{competitor.handle} • {competitor.platform}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm"><strong>{(competitor.followers / 1000).toFixed(0)}K</strong> seguidores</span>
                      <span className="text-sm flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <strong>{competitor.growth}%</strong> crescimento
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Campanhas Recentes</h5>
                    <div className="space-y-2">
                      {competitor.recentCampaigns.map((campaign, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex justify-between">
                            <span>{campaign.type}</span>
                            <span className="font-medium">{campaign.performance}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-[#693ee0] h-1 rounded-full" 
                              style={{width: `${campaign.performance}%`}}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Ameaças Detectadas</h5>
                    <ul className="space-y-1">
                      {competitor.threats.map((threat, index) => (
                        <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {threat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Oportunidades</h5>
                    <ul className="space-y-1">
                      {competitor.opportunities.map((opportunity, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2">Insights da IA</h5>
                  <ul className="space-y-1">
                    {competitor.aiInsights.map((insight, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <Brain className="h-3 w-3 mt-0.5 text-[#693ee0] flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          {/* Compliance Dashboard */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance & API Premium</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Conformidade Regulatória</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">LGPD Compliance</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">ATIVO</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Marco Civil da Internet</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">ATIVO</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">CDC - Código do Consumidor</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">ATIVO</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">CONAR Guidelines</span>
                    </div>
                    <span className="text-xs text-yellow-600 font-medium">EM ANÁLISE</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">API Premium</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Rate Limit</span>
                      <span className="text-xs text-gray-600">10,000 req/h</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#693ee0] h-2 rounded-full" style={{width: '34%'}}></div>
                    </div>
                    <span className="text-xs text-gray-600">3,400 / 10,000 requests usadas</span>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Uptime</span>
                      <span className="text-xs text-green-600">99.98%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Todos os sistemas operacionais</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Webhooks</span>
                      <span className="text-xs text-blue-600">47 ativos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Última entrega: 2min atrás</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Documentação API</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-[#693ee0] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Guia de Início</p>
                      <p className="text-xs text-gray-600">Setup inicial da API</p>
                    </div>
                  </div>
                </a>
                
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-[#693ee0] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Autenticação</p>
                      <p className="text-xs text-gray-600">JWT, OAuth, API Keys</p>
                    </div>
                  </div>
                </a>
                
                <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-[#693ee0] transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <Zap className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Webhooks</p>
                      <p className="text-xs text-gray-600">Eventos em tempo real</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Influencer Detail Modal */}
      {selectedInfluencer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#693ee0] to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedInfluencer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedInfluencer.name}</h2>
                    <p className="text-gray-600">{selectedInfluencer.handle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getPlatformIcon(selectedInfluencer.platform)}
                      <span className="text-sm text-gray-600">{selectedInfluencer.niche}</span>
                      <span className="text-sm text-gray-600">• {selectedInfluencer.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInfluencer(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Métricas Principais</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600">Seguidores</p>
                        <p className="text-xl font-bold text-blue-900">{(selectedInfluencer.followers / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600">Engajamento</p>
                        <p className="text-xl font-bold text-green-900">{selectedInfluencer.engagement}%</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-600">Visualizações Médias</p>
                        <p className="text-xl font-bold text-purple-900">{(selectedInfluencer.averageViews / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-yellow-600">AI Score</p>
                        <p className="text-xl font-bold text-yellow-900">{selectedInfluencer.aiScore}/100</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Informações de Contato</h3>
                    <div className="space-y-2">
                      {selectedInfluencer.contactInfo.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedInfluencer.contactInfo.email}</span>
                        </div>
                      )}
                      {selectedInfluencer.contactInfo.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedInfluencer.contactInfo.phone}</span>
                        </div>
                      )}
                      {selectedInfluencer.contactInfo.agency && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedInfluencer.contactInfo.agency}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedInfluencer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedInfluencer.priceRange}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Insights da Audiência</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Faixa Etária</p>
                        <p className="font-medium">{selectedInfluencer.audienceInsights.ageRange}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Divisão por Gênero</p>
                        <p className="font-medium">{selectedInfluencer.audienceInsights.genderSplit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Principais Localizações</p>
                        <p className="font-medium">{selectedInfluencer.audienceInsights.topLocations.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Interesses</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedInfluencer.audienceInsights.interests.map((interest) => (
                            <span key={interest} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Previsão de Performance</h3>
                    <div className="bg-gradient-to-br from-[#693ee0] to-purple-600 p-4 rounded-lg text-white">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm opacity-90">Engajamento Esperado</p>
                          <p className="text-xl font-bold">+{selectedInfluencer.predicted_performance.expectedEngagement}%</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Alcance Esperado</p>
                          <p className="text-xl font-bold">{(selectedInfluencer.predicted_performance.expectedReach / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Conversões</p>
                          <p className="text-xl font-bold">{selectedInfluencer.predicted_performance.expectedConversions}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Confiança IA</p>
                          <p className="text-xl font-bold">{selectedInfluencer.predicted_performance.confidence}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Posts Recentes</h3>
                    <div className="space-y-3">
                      {selectedInfluencer.recentPosts.map((post) => (
                        <div key={post.id} className="border border-gray-200 rounded-lg p-3">
                          <p className="text-sm text-gray-900 mb-2">{post.content}</p>
                          <div className="flex justify-between items-center text-xs text-gray-600">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {(post.engagement / 1000).toFixed(1)}K
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {(post.views / 1000).toFixed(0)}K
                              </div>
                            </div>
                            <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Histórico de Colaborações</h3>
                    <div className="space-y-3">
                      {selectedInfluencer.collaborationHistory.map((collab, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-sm">{collab.brand}</p>
                              <p className="text-xs text-gray-600">{collab.campaign}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                collab.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                                collab.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                                collab.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {collab.performance}
                              </span>
                              <p className="text-xs text-gray-600 mt-1">ROI: {collab.roi}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-[#693ee0] text-white px-6 py-3 rounded-lg hover:bg-[#5a32d1] transition-colors font-medium">
                  Iniciar Parceria
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Salvar na Lista
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Exportar Dados
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}