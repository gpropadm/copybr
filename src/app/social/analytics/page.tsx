'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Target,
  DollarSign,
  Clock,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Brain,
  Search,
  Hash,
  Globe,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckCircle,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Play
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface AnalyticsMetric {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: any
  color: string
}

interface CompetitorAnalysis {
  id: string
  name: string
  handle: string
  platform: string
  followers: number
  engagement: number
  growth: number
  topContent: string[]
  threats: string[]
  opportunities: string[]
}

interface TrendingTopic {
  id: string
  hashtag: string
  volume: number
  growth: number
  sentiment: 'positive' | 'negative' | 'neutral'
  category: string
  relevanceScore: number
}

interface BestTime {
  platform: string
  days: string[]
  hours: number[]
  engagement: number
  audience: string
}

interface SentimentAnalysis {
  platform: string
  positive: number
  neutral: number
  negative: number
  totalComments: number
  keyPhrases: { phrase: string, sentiment: string, count: number }[]
}

interface PerformancePrediction {
  content: string
  predictedEngagement: number
  predictedReach: number
  confidenceScore: number
  suggestions: string[]
}

export default function AnalyticsPage() {
  const [selectedClient, setSelectedClient] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Dados simulados - em produção viriam da API
  const metrics: AnalyticsMetric[] = [
    {
      title: 'Alcance Total',
      value: '2.4M',
      change: 15.3,
      trend: 'up',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Engajamento Médio',
      value: '6.8%',
      change: 2.1,
      trend: 'up',
      icon: Heart,
      color: 'red'
    },
    {
      title: 'Share of Voice',
      value: '23.5%',
      change: 8.7,
      trend: 'up',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Sentiment Score',
      value: '87%',
      change: -3.2,
      trend: 'down',
      icon: ThumbsUp,
      color: 'purple'
    }
  ]

  const competitors: CompetitorAnalysis[] = [
    {
      id: '1',
      name: 'TechRival Corp',
      handle: '@techrival',
      platform: 'instagram',
      followers: 89500,
      engagement: 4.2,
      growth: 8.9,
      topContent: ['Carrosséis técnicos', 'Stories interativos', 'Reels educacionais'],
      threats: ['Maior budget de ads', 'Parcerias com influenciadores'],
      opportunities: ['Fraco em video content', 'Baixo engajamento em stories']
    },
    {
      id: '2',
      name: 'Innovation Labs',
      handle: '@innovationlabs',
      platform: 'linkedin',
      followers: 156200,
      engagement: 7.8,
      growth: 12.4,
      topContent: ['Artigos longos', 'Casos de sucesso', 'Webinars'],
      threats: ['Thought leadership forte', 'Rede de executivos'],
      opportunities: ['Pouco visual content', 'Falta presença em outras redes']
    }
  ]

  const trendingTopics: TrendingTopic[] = [
    {
      id: '1',
      hashtag: '#IAGenerativa',
      volume: 45600,
      growth: 127.5,
      sentiment: 'positive',
      category: 'Tecnologia',
      relevanceScore: 92
    },
    {
      id: '2',
      hashtag: '#SustentabilidadeTech',
      volume: 23400,
      growth: 89.2,
      sentiment: 'positive',
      category: 'Sustentabilidade',
      relevanceScore: 78
    },
    {
      id: '3',
      hashtag: '#StartupBrasil',
      volume: 18900,
      growth: 56.7,
      sentiment: 'neutral',
      category: 'Negócios',
      relevanceScore: 85
    }
  ]

  const bestTimes: BestTime[] = [
    {
      platform: 'Instagram',
      days: ['Terça', 'Quarta', 'Quinta'],
      hours: [9, 14, 19],
      engagement: 8.4,
      audience: 'Jovens profissionais'
    },
    {
      platform: 'LinkedIn',
      days: ['Terça', 'Quarta', 'Quinta'],
      hours: [8, 12, 17],
      engagement: 12.1,
      audience: 'Executivos C-Level'
    },
    {
      platform: 'Facebook',
      days: ['Sábado', 'Domingo'],
      hours: [10, 15, 20],
      engagement: 5.9,
      audience: 'Público geral 35+'
    }
  ]

  const sentimentData: SentimentAnalysis[] = [
    {
      platform: 'Instagram',
      positive: 68,
      neutral: 24,
      negative: 8,
      totalComments: 2847,
      keyPhrases: [
        { phrase: 'produto incrível', sentiment: 'positive', count: 156 },
        { phrase: 'muito útil', sentiment: 'positive', count: 134 },
        { phrase: 'preço alto', sentiment: 'negative', count: 89 }
      ]
    },
    {
      platform: 'LinkedIn',
      positive: 82,
      neutral: 15,
      negative: 3,
      totalComments: 1234,
      keyPhrases: [
        { phrase: 'solução inovadora', sentiment: 'positive', count: 87 },
        { phrase: 'excelente qualidade', sentiment: 'positive', count: 76 }
      ]
    }
  ]

  const predictions: PerformancePrediction[] = [
    {
      content: 'Carrossel sobre IA no e-commerce',
      predictedEngagement: 7.2,
      predictedReach: 45600,
      confidenceScore: 89,
      suggestions: [
        'Postar às 14h de terça-feira',
        'Usar hashtag #IAGenerativa',
        'Incluir CTA no primeiro slide'
      ]
    },
    {
      content: 'Video explicativo sobre sustentabilidade',
      predictedEngagement: 9.8,
      predictedReach: 67800,
      confidenceScore: 94,
      suggestions: [
        'Formato ideal: Reels de 30s',
        'Usar trending audio',
        'Hashtag #SustentabilidadeTech'
      ]
    }
  ]

  const runCompetitorAnalysis = async () => {
    setIsAnalyzing(true)
    // Simular análise de concorrentes
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      positive: 'text-green-600 bg-green-100',
      negative: 'text-red-600 bg-red-100',
      neutral: 'text-gray-600 bg-gray-100'
    }
    return colors[sentiment as keyof typeof colors] || colors.neutral
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
    return icons[platform as keyof typeof icons] || Activity
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="h-6 w-6 text-[#693ee0]" />
              Analytics & Inteligência
            </h1>
            <p className="text-gray-600 mt-1">Insights avançados com IA para otimizar sua estratégia</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={runCompetitorAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              {isAnalyzing ? 'Analisando...' : 'Análise IA'}
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
          >
            <option value="all">Todos os clientes</option>
            <option value="techstartup">TechStartup Inc</option>
            <option value="fashion">Fashion Boutique</option>
            <option value="restaurant">RestauranteBR</option>
          </select>
          
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
          
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
          >
            <option value="all">Todas as plataformas</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === 'up' ? ArrowUpRight : 
                            metric.trend === 'down' ? ArrowDownRight : Activity
            
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                      <Icon className={`h-5 w-5 text-${metric.color}-600`} />
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
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {metric.title}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Competitor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-[#693ee0]" />
                Análise de Concorrentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((competitor) => {
                  const PlatformIcon = getPlatformIcon(competitor.platform)
                  return (
                    <div key={competitor.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
                            {competitor.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{competitor.name}</h4>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <PlatformIcon className="h-3 w-3" />
                              {competitor.handle}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatNumber(competitor.followers)}
                          </div>
                          <div className="text-xs text-gray-600">seguidores</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {competitor.engagement}%
                          </div>
                          <div className="text-xs text-gray-600">Engajamento</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            +{competitor.growth}%
                          </div>
                          <div className="text-xs text-gray-600">Crescimento</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-xs font-medium text-red-600 mb-1">🚨 Ameaças:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {competitor.threats.map((threat, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-red-500">•</span>
                                {threat}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-medium text-green-600 mb-1">💡 Oportunidades:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {competitor.opportunities.map((opp, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-green-500">•</span>
                                {opp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-[#693ee0]" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#693ee0]">{topic.hashtag}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(topic.sentiment)}`}>
                          {topic.sentiment}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{topic.category}</div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{formatNumber(topic.volume)} posts</span>
                        <span className="text-green-600">+{topic.growth}%</span>
                        <span>Score: {topic.relevanceScore}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-12 rounded-full bg-[#693ee0] flex items-center justify-center text-white font-bold">
                        {topic.relevanceScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Best Times & Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Best Times to Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#693ee0]" />
                Melhores Horários para Postar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bestTimes.map((time, index) => {
                  const PlatformIcon = getPlatformIcon(time.platform.toLowerCase())
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <PlatformIcon className="h-5 w-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">{time.platform}</h4>
                        <span className="text-sm text-green-600 font-medium">
                          {time.engagement}% eng.
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-2">Melhores dias:</h5>
                          <div className="flex flex-wrap gap-1">
                            {time.days.map((day) => (
                              <span key={day} className="px-2 py-1 bg-[#693ee0] text-white text-xs rounded">
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-medium text-gray-700 mb-2">Melhores horários:</h5>
                          <div className="flex flex-wrap gap-1">
                            {time.hours.map((hour) => (
                              <span key={hour} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                {hour}h
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-600">
                        Audiência: {time.audience}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-[#693ee0]" />
                Análise de Sentimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentData.map((sentiment, index) => {
                  const PlatformIcon = getPlatformIcon(sentiment.platform.toLowerCase())
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <PlatformIcon className="h-5 w-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">{sentiment.platform}</h4>
                        <span className="text-sm text-gray-600">
                          {formatNumber(sentiment.totalComments)} comentários
                        </span>
                      </div>
                      
                      {/* Sentiment Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                        <div className="h-full flex">
                          <div 
                            className="bg-green-500" 
                            style={{ width: `${sentiment.positive}%` }}
                          ></div>
                          <div 
                            className="bg-gray-400" 
                            style={{ width: `${sentiment.neutral}%` }}
                          ></div>
                          <div 
                            className="bg-red-500" 
                            style={{ width: `${sentiment.negative}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-green-600">{sentiment.positive}% Positivo</span>
                        <span className="text-gray-600">{sentiment.neutral}% Neutro</span>
                        <span className="text-red-600">{sentiment.negative}% Negativo</span>
                      </div>
                      
                      {/* Key Phrases */}
                      <div>
                        <h5 className="text-xs font-medium text-gray-700 mb-2">Frases-chave:</h5>
                        <div className="space-y-1">
                          {sentiment.keyPhrases.slice(0, 3).map((phrase, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">"{phrase.phrase}"</span>
                              <span className={`px-1 py-0.5 rounded text-xs ${getSentimentColor(phrase.sentiment)}`}>
                                {phrase.count}x
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#693ee0]" />
              Previsões de Performance com IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predictions.map((prediction, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gradient-to-br from-[#693ee0]/5 to-[#5a35c7]/5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{prediction.content}</h4>
                    <div className="text-sm font-medium text-[#693ee0]">
                      {prediction.confidenceScore}% confiança
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {prediction.predictedEngagement}%
                      </div>
                      <div className="text-xs text-gray-600">Engajamento previsto</div>
                    </div>
                    
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {formatNumber(prediction.predictedReach)}
                      </div>
                      <div className="text-xs text-gray-600">Alcance previsto</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">💡 Sugestões da IA:</h5>
                    <ul className="space-y-1">
                      {prediction.suggestions.map((suggestion, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}