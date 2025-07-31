'use client'

import { useState, useEffect } from 'react'
import { 
  Palette,
  Wand2,
  Image,
  Video,
  Type,
  Layers,
  Download,
  Save,
  Share2,
  Copy,
  RefreshCw,
  Sparkles,
  Zap,
  Eye,
  Settings,
  Plus,
  Minus,
  RotateCcw,
  RotateCw,
  Crop,
  Filter,
  Sliders,
  Grid3x3,
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Upload,
  FileText,
  PieChart,
  BarChart3,
  TrendingUp,
  Users,
  MessageCircle,
  Calendar,
  Clock,
  Target,
  Brain,
  Lightbulb,
  Camera,
  Mic,
  Music,
  Hash,
  AtSign,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Edit,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Layout
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface ContentTemplate {
  id: string
  name: string
  type: 'carousel' | 'single_post' | 'story' | 'video' | 'infographic'
  category: 'business' | 'fashion' | 'tech' | 'food' | 'education' | 'lifestyle'
  thumbnail: string
  slides?: number
  dimensions: {
    width: number
    height: number
  }
  elements: ContentElement[]
  aiSuggestions?: string[]
  popularity: number
  difficulty: 'easy' | 'medium' | 'hard'
}

interface ContentElement {
  id: string
  type: 'text' | 'image' | 'shape' | 'icon' | 'chart' | 'logo'
  position: { x: number, y: number }
  size: { width: number, height: number }
  rotation?: number
  properties: {
    text?: string
    fontSize?: number
    fontFamily?: string
    color?: string
    backgroundColor?: string
    borderRadius?: number
    opacity?: number
    imageUrl?: string
    iconName?: string
    chartType?: string
    chartData?: any
  }
}

interface AIInsight {
  type: 'color_palette' | 'text_suggestion' | 'layout_optimization' | 'engagement_tip'
  title: string
  description: string
  action?: string
  impact?: 'high' | 'medium' | 'low'
}

interface CreatedContent {
  id: string
  name: string
  type: string
  createdAt: Date
  lastModified: Date
  status: 'draft' | 'ready' | 'published'
  platform: string[]
  performance?: {
    views: number
    likes: number
    shares: number
    engagement: number
  }
  aiScore: number
  thumbnail: string
}

export default function CriacaoPage() {
  const [templates, setTemplates] = useState<ContentTemplate[]>([])
  const [createdContent, setCreatedContent] = useState<CreatedContent[]>([])
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])
  const [selectedTab, setSelectedTab] = useState<'templates' | 'editor' | 'gallery' | 'ai_tools'>('templates')
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Dados simulados - em produção viriam da API
  useEffect(() => {
    const mockTemplates: ContentTemplate[] = [
      {
        id: '1',
        name: 'Tech Product Launch Carousel',
        type: 'carousel',
        category: 'tech',
        thumbnail: '/api/placeholder/300/300',
        slides: 5,
        dimensions: { width: 1080, height: 1080 },
        elements: [],
        aiSuggestions: [
          'Use cores vibrantes para destacar o produto',
          'Adicione estatísticas de performance',
          'Inclua call-to-action no último slide'
        ],
        popularity: 92,
        difficulty: 'medium'
      },
      {
        id: '2',
        name: 'Fashion Collection Showcase',
        type: 'carousel',
        category: 'fashion',
        thumbnail: '/api/placeholder/300/300',
        slides: 7,
        dimensions: { width: 1080, height: 1080 },
        elements: [],
        aiSuggestions: [
          'Use paleta de cores da estação',
          'Adicione preços de forma elegante',
          'Inclua modelo usando as peças'
        ],
        popularity: 88,
        difficulty: 'easy'
      },
      {
        id: '3',
        name: 'Business Infographic',
        type: 'infographic',
        category: 'business',
        thumbnail: '/api/placeholder/300/300',
        slides: 1,
        dimensions: { width: 1080, height: 1350 },
        elements: [],
        aiSuggestions: [
          'Use gráficos para dados complexos',
          'Mantenha hierarquia visual clara',
          'Adicione fonte dos dados'
        ],
        popularity: 85,
        difficulty: 'hard'
      },
      {
        id: '4',
        name: 'Recipe Story Template',
        type: 'story',
        category: 'food',
        thumbnail: '/api/placeholder/300/300',
        slides: 3,
        dimensions: { width: 1080, height: 1920 },
        elements: [],
        aiSuggestions: [
          'Use timer para etapas do preparo',
          'Mostre ingredientes visualmente',
          'Adicione dicas de chef'
        ],
        popularity: 79,
        difficulty: 'easy'
      },
      {
        id: '5',
        name: 'Educational Content Series',
        type: 'carousel',
        category: 'education',
        thumbnail: '/api/placeholder/300/300',
        slides: 6,
        dimensions: { width: 1080, height: 1080 },
        elements: [],
        aiSuggestions: [
          'Use icons para conceitos abstratos',
          'Crie progressão lógica entre slides',
          'Adicione quiz no final'
        ],
        popularity: 76,
        difficulty: 'medium'
      }
    ]

    const mockCreatedContent: CreatedContent[] = [
      {
        id: '1',
        name: 'Black Friday Campaign 2024',
        type: 'carousel',
        createdAt: new Date('2024-11-25T14:30:00'),
        lastModified: new Date('2024-11-28T09:15:00'),
        status: 'published',
        platform: ['instagram', 'facebook'],
        performance: {
          views: 45200,
          likes: 2840,
          shares: 156,
          engagement: 6.8
        },
        aiScore: 94,
        thumbnail: '/api/placeholder/200/200'
      },
      {
        id: '2',
        name: 'AI Product Demo Video',
        type: 'video',
        createdAt: new Date('2024-11-20T16:45:00'),
        lastModified: new Date('2024-11-22T11:30:00'),
        status: 'ready',
        platform: ['linkedin', 'youtube'],
        aiScore: 87,
        thumbnail: '/api/placeholder/200/200'
      },
      {
        id: '3',
        name: 'Holiday Collection Stories',
        type: 'story',
        createdAt: new Date('2024-12-01T10:00:00'),
        lastModified: new Date('2024-12-01T10:00:00'),
        status: 'draft',
        platform: ['instagram'],
        aiScore: 72,
        thumbnail: '/api/placeholder/200/200'
      }
    ]

    const mockAIInsights: AIInsight[] = [
      {
        type: 'color_palette',
        title: 'Paleta de Cores Otimizada',
        description: 'A IA sugere usar tons de azul e laranja para maximizar engajamento nesta categoria',
        action: 'Aplicar paleta sugerida',
        impact: 'high'
      },
      {
        type: 'text_suggestion',
        title: 'Copy Mais Persuasivo',
        description: 'Substituir "Conheça nosso produto" por "Transforme seu negócio hoje"',
        action: 'Aplicar sugestão',
        impact: 'medium'
      },
      {
        type: 'layout_optimization',
        title: 'Layout Mais Eficiente',
        description: 'Mover CTA para posição mais visível pode aumentar conversões em 23%',
        action: 'Otimizar layout',
        impact: 'high'
      },
      {
        type: 'engagement_tip',
        title: 'Maximize o Engajamento',
        description: 'Adicionar pergunta no primeiro slide pode aumentar comentários em 45%',
        action: 'Adicionar pergunta',
        impact: 'medium'
      }
    ]

    setTemplates(mockTemplates)
    setCreatedContent(mockCreatedContent)
    setAIInsights(mockAIInsights)
  }, [])

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory
    const matchesType = filterType === 'all' || template.type === filterType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const getCategoryInfo = (category: string) => {
    const categories = {
      business: { name: 'Business', color: 'text-blue-600 bg-blue-100', icon: BarChart3 },
      fashion: { name: 'Fashion', color: 'text-pink-600 bg-pink-100', icon: Heart },
      tech: { name: 'Tech', color: 'text-purple-600 bg-purple-100', icon: Zap },
      food: { name: 'Food', color: 'text-orange-600 bg-orange-100', icon: Circle },
      education: { name: 'Education', color: 'text-green-600 bg-green-100', icon: FileText },
      lifestyle: { name: 'Lifestyle', color: 'text-indigo-600 bg-indigo-100', icon: Star }
    }
    return categories[category as keyof typeof categories] || categories.business
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      carousel: Layers,
      single_post: Square,
      story: Smartphone,
      video: Video,
      infographic: PieChart
    }
    return icons[type as keyof typeof icons] || Square
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      ready: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800'
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      hard: 'text-red-600 bg-red-100'
    }
    return colors[difficulty as keyof typeof colors] || colors.medium
  }

  const getInsightIcon = (type: string) => {
    const icons = {
      color_palette: Palette,
      text_suggestion: Type,
      layout_optimization: Layout,
      engagement_tip: Users
    }
    return icons[type as keyof typeof icons] || Lightbulb
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const startEditing = (template: ContentTemplate) => {
    setSelectedTemplate(template)
    setShowEditor(true)
    setCurrentSlide(1)
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {!showEditor ? (
        <>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Palette className="h-6 w-6 text-[#693ee0]" />
                  Criação de Conteúdo IA
                </h1>
                <p className="text-gray-600 mt-1">Gerador de carrosséis, posts e stories com inteligência artificial</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Mídia
                </Button>
                <Button className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  IA Creator
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-8 mt-4">
              {[
                { id: 'templates', label: 'Templates', icon: Grid3x3 },
                { id: 'editor', label: 'Editor IA', icon: Wand2 },
                { id: 'gallery', label: 'Meus Conteúdos', icon: Image },
                { id: 'ai_tools', label: 'Ferramentas IA', icon: Brain }
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
            {selectedTab === 'templates' && (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Templates Disponíveis</p>
                          <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
                        </div>
                        <Grid3x3 className="h-8 w-8 text-[#693ee0]" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">IA Powered</p>
                          <p className="text-2xl font-bold text-gray-900">100%</p>
                        </div>
                        <Brain className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Criações Este Mês</p>
                          <p className="text-2xl font-bold text-gray-900">47</p>
                        </div>
                        <Sparkles className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Tempo Economizado</p>
                          <p className="text-2xl font-bold text-gray-900">89h</p>
                        </div>
                        <Clock className="h-8 w-8 text-green-600" />
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
                          placeholder="Buscar templates..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                        />
                      </div>
                      
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                      >
                        <option value="all">Todas as categorias</option>
                        <option value="business">Business</option>
                        <option value="fashion">Fashion</option>
                        <option value="tech">Tech</option>
                        <option value="food">Food</option>
                        <option value="education">Education</option>
                        <option value="lifestyle">Lifestyle</option>
                      </select>
                      
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                      >
                        <option value="all">Todos os tipos</option>
                        <option value="carousel">Carrossel</option>
                        <option value="single_post">Post Único</option>
                        <option value="story">Story</option>
                        <option value="video">Vídeo</option>
                        <option value="infographic">Infográfico</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTemplates.map((template) => {
                    const categoryInfo = getCategoryInfo(template.category)
                    const TypeIcon = getTypeIcon(template.type)
                    const CategoryIcon = categoryInfo.icon
                    
                    return (
                      <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#693ee0]/20">
                        <CardContent className="p-0">
                          {/* Template Preview */}
                          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#693ee0]/10 to-[#5a35c7]/10"></div>
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                                <CategoryIcon className="h-3 w-3 inline mr-1" />
                                {categoryInfo.name}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                                {template.difficulty}
                              </span>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <TypeIcon className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-900">
                                      {template.slides ? `${template.slides} slides` : template.type}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-500" />
                                    <span className="text-xs text-gray-600">{template.popularity}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Template Info */}
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{template.name}</h3>
                            
                            {/* AI Suggestions Preview */}
                            {template.aiSuggestions && (
                              <div className="mb-3">
                                <div className="flex items-center gap-1 mb-1">
                                  <Brain className="h-3 w-3 text-purple-600" />
                                  <span className="text-xs font-medium text-purple-600">IA Suggestions</span>
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {template.aiSuggestions[0]}
                                </p>
                              </div>
                            )}
                            
                            {/* Dimensions */}
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                              <span>{template.dimensions.width}x{template.dimensions.height}px</span>
                              <span>ID: {template.id}</span>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button 
                                className="flex-1" 
                                size="sm"
                                onClick={() => startEditing(template)}
                              >
                                <Wand2 className="h-3 w-3 mr-1" />
                                Usar Template
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}

            {selectedTab === 'gallery' && (
              <div className="space-y-6">
                {/* Gallery Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Conteúdos Criados</p>
                          <p className="text-2xl font-bold text-gray-900">{createdContent.length}</p>
                        </div>
                        <Image className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Publicados</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {createdContent.filter(c => c.status === 'published').length}
                          </p>
                        </div>
                        <Share2 className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Score IA Médio</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {Math.round(createdContent.reduce((sum, c) => sum + c.aiScore, 0) / createdContent.length)}
                          </p>
                        </div>
                        <Brain className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Engajamento Total</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatNumber(createdContent.reduce((sum, c) => 
                              sum + (c.performance?.likes || 0), 0
                            ))}
                          </p>
                        </div>
                        <Heart className="h-8 w-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Content Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {createdContent.map((content) => (
                    <Card key={content.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        {/* Content Preview */}
                        <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg">
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                              {content.status}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                              <Brain className="h-3 w-3 text-purple-600" />
                              <span className="text-xs font-medium text-purple-600">{content.aiScore}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{content.name}</h3>
                          
                          {/* Performance Metrics */}
                          {content.performance && (
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              <div className="text-center">
                                <p className="text-sm font-bold text-gray-900">
                                  {formatNumber(content.performance.views)}
                                </p>
                                <p className="text-xs text-gray-600">Views</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-bold text-red-600">
                                  {formatNumber(content.performance.likes)}
                                </p>
                                <p className="text-xs text-gray-600">Likes</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-bold text-purple-600">
                                  {content.performance.engagement}%
                                </p>
                                <p className="text-xs text-gray-600">Engagement</p>
                              </div>
                            </div>
                          )}
                          
                          {/* Platforms */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-gray-500">Plataformas:</span>
                            <div className="flex gap-1">
                              {content.platform.map((platform) => (
                                <span key={platform} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Dates */}
                          <div className="text-xs text-gray-500 mb-3">
                            Criado: {content.createdAt.toLocaleDateString('pt-BR')}
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-3 w-3 mr-1" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Copy className="h-3 w-3 mr-1" />
                              Duplicar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'ai_tools' && (
              <div className="space-y-6">
                {/* AI Tools Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Wand2 className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">AI Content Generator</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Gere posts completos a partir de uma descrição simples
                      </p>
                      <Button className="w-full">
                        Gerar Conteúdo
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Palette className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Smart Color Palette</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Paletas de cores otimizadas para cada tipo de conteúdo
                      </p>
                      <Button className="w-full">
                        Gerar Paleta
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Type className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">AI Copywriter</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Headlines, CTAs e copy persuasivos automaticamente
                      </p>
                      <Button className="w-full">
                        Gerar Copy
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-[#693ee0]" />
                      Insights de IA para Seu Conteúdo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => {
                        const InsightIcon = getInsightIcon(insight.type)
                        
                        return (
                          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-white rounded-lg">
                              <InsightIcon className="h-5 w-5 text-[#693ee0]" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                                {insight.impact && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    insight.impact === 'high' ? 'bg-green-100 text-green-800' :
                                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {insight.impact} impact
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                              {insight.action && (
                                <Button size="sm" variant="outline">
                                  {insight.action}
                                </Button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Background Remover', icon: Crop, description: 'Remove fundos automaticamente com IA' },
                    { name: 'Smart Resize', icon: Square, description: 'Redimensiona para todas as plataformas' },
                    { name: 'Text Overlay', icon: Type, description: 'Adiciona texto com tipografia inteligente' },
                    { name: 'Style Transfer', icon: Sparkles, description: 'Aplica estilos artísticos com IA' },
                    { name: 'Content Optimizer', icon: TrendingUp, description: 'Otimiza para máximo engajamento' },
                    { name: 'Trend Analyzer', icon: Target, description: 'Analisa tendências em tempo real' }
                  ].map((tool, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-[#693ee0]/10 rounded-lg">
                            <tool.icon className="h-5 w-5 text-[#693ee0]" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                        <Button size="sm" className="w-full">
                          Usar Ferramenta
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        // Editor Interface
        <div className="min-h-screen bg-gray-900 text-white">
          {/* Editor Header */}
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowEditor(false)}
                  className="text-gray-300 border-gray-600 hover:bg-gray-700"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Voltar
                </Button>
                <div>
                  <h2 className="text-lg font-semibold text-white">{selectedTemplate?.name}</h2>
                  <p className="text-sm text-gray-400">Editor IA - Slide {currentSlide} de {selectedTemplate?.slides || 1}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700">
                  <Save className="h-4 w-4 mr-1" />
                  Salvar
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>
          </div>

          <div className="flex h-[calc(100vh-80px)]">
            {/* Left Sidebar - Tools */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Elementos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Type, label: 'Texto' },
                      { icon: Image, label: 'Imagem' },
                      { icon: Square, label: 'Forma' },
                      { icon: PieChart, label: 'Gráfico' }
                    ].map((tool) => (
                      <button 
                        key={tool.label}
                        className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center gap-1 text-xs text-gray-300 transition-colors"
                      >
                        <tool.icon className="h-4 w-4" />
                        {tool.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">IA Tools</h3>
                  <div className="space-y-2">
                    {[
                      { icon: Wand2, label: 'Auto Layout' },
                      { icon: Palette, label: 'Smart Colors' },
                      { icon: Brain, label: 'Optimize' }
                    ].map((tool) => (
                      <button 
                        key={tool.label}
                        className="w-full p-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 rounded-lg flex items-center gap-2 text-xs text-purple-300 transition-colors"
                      >
                        <tool.icon className="h-3 w-3" />
                        {tool.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Canvas */}
            <div className="flex-1 flex items-center justify-center bg-gray-900 p-8">
              <div className="bg-white rounded-lg shadow-2xl" style={{ width: '400px', height: '400px' }}>
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 text-[#693ee0]" />
                    <h3 className="text-lg font-semibold mb-2">Canvas de Edição</h3>
                    <p className="text-sm">Interface completa de edição com drag & drop</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="w-64 bg-gray-800 border-l border-gray-700 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Propriedades</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400">Texto</label>
                      <input 
                        type="text" 
                        placeholder="Digite o texto..."
                        className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Cor</label>
                      <div className="flex gap-2 mt-1">
                        {['#693ee0', '#5a35c7', '#ff6b9d', '#4834d4'].map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded border-2 border-gray-600 hover:border-gray-400"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Slides</h3>
                  <div className="space-y-2">
                    {Array.from({ length: selectedTemplate?.slides || 1 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i + 1)}
                        className={`w-full p-2 rounded text-left text-sm transition-colors ${
                          currentSlide === i + 1 
                            ? 'bg-[#693ee0] text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        Slide {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}