'use client'

import { useState, useEffect } from 'react'
import { 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Settings,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Play,
  Shield,
  Crown,
  Star,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  Briefcase
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Client {
  id: string
  name: string
  logo?: string
  email: string
  phone: string
  website?: string
  address?: string
  industry: string
  status: 'active' | 'paused' | 'setup' | 'archived'
  tier: 'starter' | 'pro' | 'enterprise'
  monthlyBudget: number
  contractStart: Date
  contractEnd: Date
  
  // Métricas
  totalFollowers: number
  monthlyGrowth: number // %
  engagementRate: number // %
  monthlyROI: number // %
  totalRevenue: number
  
  // Plataformas conectadas
  platforms: {
    instagram?: { connected: boolean, handle: string, followers: number }
    facebook?: { connected: boolean, handle: string, followers: number }
    linkedin?: { connected: boolean, handle: string, followers: number }
    twitter?: { connected: boolean, handle: string, followers: number }
    youtube?: { connected: boolean, handle: string, followers: number }
    tiktok?: { connected: boolean, handle: string, followers: number }
  }
  
  // Equipe e acessos
  team: {
    manager: string // Gestor principal
    editors: string[] // Editores de conteúdo
    approvers: string[] // Aprovadores (cliente)
    viewers: string[] // Visualizadores (CEO, etc)
  }
  
  // Configurações
  settings: {
    autoApproval: boolean
    whiteLabel: boolean
    customBranding: boolean
    apiAccess: boolean
    prioritySupport: boolean
  }
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTier, setFilterTier] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Dados simulados - em produção viriam da API
  useEffect(() => {
    const mockClients: Client[] = [
      {
        id: '1',
        name: 'TechStartup Inc',
        email: 'contato@techstartup.com',
        phone: '+55 11 99999-9999',
        website: 'https://techstartup.com',
        address: 'São Paulo, SP',
        industry: 'Tecnologia',
        status: 'active',
        tier: 'pro',
        monthlyBudget: 15000,
        contractStart: new Date('2024-01-15'),
        contractEnd: new Date('2024-12-15'),
        totalFollowers: 125400,
        monthlyGrowth: 12.5,
        engagementRate: 6.8,
        monthlyROI: 340,
        totalRevenue: 89500,
        platforms: {
          instagram: { connected: true, handle: '@techstartup', followers: 45200 },
          linkedin: { connected: true, handle: 'techstartup-inc', followers: 28500 },
          twitter: { connected: true, handle: '@techstartup', followers: 51700 }
        },
        team: {
          manager: 'Alex Silva',
          editors: ['Maria Santos', 'João Costa'],
          approvers: ['CEO TechStartup', 'Marketing Director'],
          viewers: ['Investidor Principal']
        },
        settings: {
          autoApproval: false,
          whiteLabel: true,
          customBranding: true,
          apiAccess: true,
          prioritySupport: true
        }
      },
      {
        id: '2',
        name: 'Fashion Boutique',
        email: 'marketing@fashionboutique.com.br',
        phone: '+55 21 88888-8888',
        website: 'https://fashionboutique.com.br',
        address: 'Rio de Janeiro, RJ',
        industry: 'Moda e Beleza',
        status: 'active',
        tier: 'enterprise',
        monthlyBudget: 35000,
        contractStart: new Date('2023-06-01'),
        contractEnd: new Date('2025-06-01'),
        totalFollowers: 289600,
        monthlyGrowth: 18.2,
        engagementRate: 8.4,
        monthlyROI: 285,
        totalRevenue: 156800,
        platforms: {
          instagram: { connected: true, handle: '@fashionboutique', followers: 186400 },
          facebook: { connected: true, handle: 'fashionboutique', followers: 89200 },
          youtube: { connected: true, handle: 'FashionBoutiqueTV', followers: 14000 }
        },
        team: {
          manager: 'Ana Rodrigues',
          editors: ['Carlos Lima', 'Beatriz Ferreira', 'Lucas Oliveira'],
          approvers: ['Proprietária', 'Gerente de Marketing'],
          viewers: ['Contador', 'Sócio Investidor']
        },
        settings: {
          autoApproval: false,
          whiteLabel: true,
          customBranding: true,
          apiAccess: true,
          prioritySupport: true
        }
      },
      {
        id: '3',
        name: 'RestauranteBR',
        email: 'chef@restaurantebr.com',
        phone: '+55 11 77777-7777',
        address: 'São Paulo, SP',
        industry: 'Alimentação',
        status: 'paused',
        tier: 'starter',
        monthlyBudget: 3500,
        contractStart: new Date('2024-03-01'),
        contractEnd: new Date('2024-09-01'),
        totalFollowers: 28900,
        monthlyGrowth: -2.1,
        engagementRate: 4.2,
        monthlyROI: 180,
        totalRevenue: 12400,
        platforms: {
          instagram: { connected: true, handle: '@restaurantebr', followers: 18900 },
          facebook: { connected: true, handle: 'RestauranteBR', followers: 10000 }
        },
        team: {
          manager: 'Pedro Mendes',
          editors: ['Sofia Alves'],
          approvers: ['Chef Proprietário'],
          viewers: []
        },
        settings: {
          autoApproval: true,
          whiteLabel: false,
          customBranding: false,
          apiAccess: false,
          prioritySupport: false
        }
      },
      {
        id: '4',
        name: 'EcoLife Store',
        email: 'sustentabilidade@ecolife.com.br',
        phone: '+55 11 66666-6666',
        website: 'https://ecolife.com.br',
        address: 'Curitiba, PR',
        industry: 'E-commerce Sustentável',
        status: 'setup',
        tier: 'pro',
        monthlyBudget: 8500,
        contractStart: new Date('2024-11-01'),
        contractEnd: new Date('2025-11-01'),
        totalFollowers: 0,
        monthlyGrowth: 0,
        engagementRate: 0,
        monthlyROI: 0,
        totalRevenue: 0,
        platforms: {},
        team: {
          manager: 'Camila Souza',
          editors: [],
          approvers: ['Fundadora EcoLife'],
          viewers: []
        },
        settings: {
          autoApproval: false,
          whiteLabel: false,
          customBranding: false,
          apiAccess: false,
          prioritySupport: false
        }
      }
    ]
    
    setClients(mockClients)
  }, [])

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    const matchesTier = filterTier === 'all' || client.tier === filterTier
    
    return matchesSearch && matchesStatus && matchesTier
  })

  const getTierInfo = (tier: string) => {
    const tiers = {
      starter: { name: 'Starter', icon: Star, color: 'text-blue-600 bg-blue-100' },
      pro: { name: 'Pro', icon: Crown, color: 'text-purple-600 bg-purple-100' },
      enterprise: { name: 'Enterprise', icon: Building, color: 'text-orange-600 bg-orange-100' }
    }
    return tiers[tier as keyof typeof tiers] || tiers.starter
  }

  const getStatusInfo = (status: string) => {
    const statuses = {
      active: { name: 'Ativo', color: 'bg-green-100 text-green-800' },
      paused: { name: 'Pausado', color: 'bg-yellow-100 text-yellow-800' },
      setup: { name: 'Configuração', color: 'bg-blue-100 text-blue-800' },
      archived: { name: 'Arquivado', color: 'bg-gray-100 text-gray-800' }
    }
    return statuses[status as keyof typeof statuses] || statuses.active
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

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="h-6 w-6 text-[#693ee0]" />
              Gestão de Clientes
            </h1>
            <p className="text-gray-600 mt-1">Gerencie todos os seus clientes e suas campanhas</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Cliente
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar clientes..."
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
            <option value="setup">Configuração</option>
            <option value="archived">Arquivado</option>
          </select>
          
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
          >
            <option value="all">Todos os planos</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-[#693ee0] shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-[#693ee0] shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {clients.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(clients.reduce((sum, c) => sum + c.monthlyBudget, 0))}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Seguidores Totais</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(clients.reduce((sum, c) => sum + c.totalFollowers, 0))}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clients Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => {
              const tierInfo = getTierInfo(client.tier)
              const statusInfo = getStatusInfo(client.status)
              const TierIcon = tierInfo.icon
              
              return (
                <Card key={client.id} className="hover:shadow-lg transition-shadow duration-200 relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#693ee0] to-[#5a35c7] flex items-center justify-center text-white font-bold text-lg">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{client.name}</h3>
                          <p className="text-sm text-gray-600">{client.industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-lg ${tierInfo.color}`}>
                          <TierIcon className="h-4 w-4" />
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(client.monthlyBudget)}/mês
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Métricas */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">
                          {formatNumber(client.totalFollowers)}
                        </p>
                        <p className="text-xs text-gray-600">Seguidores</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-bold ${client.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {client.monthlyGrowth > 0 ? '+' : ''}{client.monthlyGrowth}%
                        </p>
                        <p className="text-xs text-gray-600">Crescimento</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-purple-600">
                          {client.engagementRate}%
                        </p>
                        <p className="text-xs text-gray-600">Engajamento</p>
                      </div>
                    </div>
                    
                    {/* Plataformas */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-600">Plataformas:</span>
                      <div className="flex gap-1">
                        {Object.entries(client.platforms).map(([platform, data]) => {
                          if (!data?.connected) return null
                          const PlatformIcon = getPlatformIcon(platform)
                          return (
                            <div 
                              key={platform} 
                              className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"
                              title={`${platform}: ${formatNumber(data.followers)} seguidores`}
                            >
                              <PlatformIcon className="h-3 w-3 text-gray-600" />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* ROI */}
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">ROI Mensal</span>
                        <span className="text-lg font-bold text-green-600">
                          {client.monthlyROI}%
                        </span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        Revenue: {formatCurrency(client.totalRevenue)}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedClient(client)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Editar
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
        ) : (
          // List View
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Plano</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Seguidores</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Crescimento</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => {
                      const tierInfo = getTierInfo(client.tier)
                      const statusInfo = getStatusInfo(client.status)
                      const TierIcon = tierInfo.icon
                      
                      return (
                        <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#693ee0] to-[#5a35c7] flex items-center justify-center text-white font-semibold text-sm">
                                {client.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{client.name}</p>
                                <p className="text-sm text-gray-600">{client.industry}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                              {statusInfo.name}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded ${tierInfo.color}`}>
                                <TierIcon className="h-3 w-3" />
                              </div>
                              <span className="text-sm font-medium">{tierInfo.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium">{formatNumber(client.totalFollowers)}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-medium ${client.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {client.monthlyGrowth > 0 ? '+' : ''}{client.monthlyGrowth}%
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-green-600">{client.monthlyROI}%</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium">{formatCurrency(client.monthlyBudget)}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <button 
                                className="p-1 hover:bg-gray-200 rounded"
                                onClick={() => setSelectedClient(client)}
                              >
                                <Eye className="h-4 w-4 text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-200 rounded">
                                <Edit className="h-4 w-4 text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-200 rounded">
                                <Settings className="h-4 w-4 text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-200 rounded">
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}