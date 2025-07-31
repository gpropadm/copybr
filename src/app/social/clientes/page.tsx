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
  Briefcase,
  X
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
  const [editingClient, setEditingClient] = useState<Client | null>(null)
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
                        onClick={() => setEditingClient(client)}
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
                              <button 
                                className="p-1 hover:bg-gray-200 rounded"
                                onClick={() => setEditingClient(client)}
                              >
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

      {/* Modal Ver Detalhes */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#693ee0] to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h2>
                    <p className="text-gray-600">{selectedClient.industry}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedClient.status === 'active' ? 'bg-green-100 text-green-800' :
                        selectedClient.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        selectedClient.status === 'setup' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedClient.status === 'active' ? 'Ativo' :
                         selectedClient.status === 'paused' ? 'Pausado' :
                         selectedClient.status === 'setup' ? 'Setup' : 'Arquivado'}
                      </span>
                      <span className="text-sm text-gray-600">• {selectedClient.tier}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
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
                        <p className="text-sm text-blue-600">Total Seguidores</p>
                        <p className="text-xl font-bold text-blue-900">{formatNumber(selectedClient.totalFollowers)}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600">Crescimento Mensal</p>
                        <p className="text-xl font-bold text-green-900">+{selectedClient.monthlyGrowth}%</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-600">ROI Mensal</p>
                        <p className="text-xl font-bold text-purple-900">{selectedClient.monthlyROI}%</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-yellow-600">Orçamento Mensal</p>
                        <p className="text-xl font-bold text-yellow-900">{formatCurrency(selectedClient.monthlyBudget)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Plataformas Conectadas</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedClient.platforms).map(([platformKey, platformData]) => {
                        if (!platformData?.connected) return null
                        const PlatformIcon = getPlatformIcon(platformKey)
                        return (
                          <div key={platformKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <PlatformIcon className="h-5 w-5 text-gray-600" />
                              <div>
                                <p className="font-medium text-gray-900 capitalize">{platformKey}</p>
                                <p className="text-sm text-gray-600">{formatNumber(platformData.followers)} seguidores</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-green-600">+{selectedClient.monthlyGrowth}%</p>
                              <p className="text-xs text-gray-500">este mês</p>
                            </div>
                          </div>
                        )
                      }).filter(Boolean)}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Equipe</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#693ee0] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {selectedClient.team.manager.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{selectedClient.team.manager}</p>
                            <p className="text-sm text-gray-600">Manager Principal</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 mb-2">Editores ({selectedClient.team.editors.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedClient.team.editors.map((editor, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {editor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Configurações</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">Auto-aprovação</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedClient.settings.autoApproval ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedClient.settings.autoApproval ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">White Label</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedClient.settings.whiteLabel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedClient.settings.whiteLabel ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">Timezone</span>
                        <span className="text-sm text-gray-600">América/São_Paulo</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Performance Recente</h3>
                    <div className="bg-gradient-to-br from-[#693ee0] to-purple-600 p-4 rounded-lg text-white">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm opacity-90">Posts este mês</p>
                          <p className="text-xl font-bold">47</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Engajamento médio</p>
                          <p className="text-xl font-bold">8.4%</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Alcance total</p>
                          <p className="text-xl font-bold">2.1M</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Conversões</p>
                          <p className="text-xl font-bold">89</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-[#693ee0] text-white px-6 py-3 rounded-lg hover:bg-[#5a32d1] transition-colors font-medium">
                  Editar Cliente
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Ver Relatórios
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Configurações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Cliente */}
      {editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Editar Cliente</h2>
                  <p className="text-gray-600">{editingClient.name}</p>
                </div>
                <button
                  onClick={() => setEditingClient(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form className="space-y-6">
                {/* Informações Básicas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        defaultValue={editingClient.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Setor
                      </label>
                      <input
                        type="text"
                        defaultValue={editingClient.industry}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={editingClient.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        defaultValue={editingClient.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Configurações da Conta */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações da Conta</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        defaultValue={editingClient.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      >
                        <option value="active">Ativo</option>
                        <option value="paused">Pausado</option>
                        <option value="setup">Setup</option>
                        <option value="archived">Arquivado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plano
                      </label>
                      <select
                        defaultValue={editingClient.tier}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      >
                        <option value="starter">Starter</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Orçamento Mensal
                      </label>
                      <input
                        type="number"
                        defaultValue={editingClient.monthlyBudget}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                        placeholder="15000"
                      />
                    </div>
                  </div>
                </div>

                {/* Equipe */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipe</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manager Principal
                      </label>
                      <input
                        type="text"
                        defaultValue={editingClient.team.manager}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Editores (separados por vírgula)
                      </label>
                      <input
                        type="text"
                        defaultValue={editingClient.team.editors.join(', ')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                        placeholder="Editor 1, Editor 2, Editor 3"
                      />
                    </div>
                  </div>
                </div>

                {/* Configurações Avançadas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações Avançadas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Auto-aprovação</h4>
                        <p className="text-sm text-gray-600">Posts são publicados automaticamente sem aprovação manual</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={editingClient.settings.autoApproval}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#693ee0]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">White Label</h4>
                        <p className="text-sm text-gray-600">Interface personalizada com a marca do cliente</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={editingClient.settings.whiteLabel}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#693ee0]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Plataformas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Plataformas Conectadas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(editingClient.platforms).map(([platformKey, platformData]) => {
                      const PlatformIcon = getPlatformIcon(platformKey)
                      return (
                        <div key={platformKey} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <PlatformIcon className="h-5 w-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-900 capitalize">{platformKey}</p>
                              {platformData?.connected && (
                                <p className="text-sm text-gray-600">{formatNumber(platformData.followers)} seguidores</p>
                              )}
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={platformData?.connected || false}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#693ee0]"></div>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </form>

              {/* Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Aqui seria implementada a lógica de salvar
                    alert('Alterações salvas com sucesso!')
                    setEditingClient(null)
                  }}
                  className="flex-1 bg-[#693ee0] text-white px-6 py-3 rounded-lg hover:bg-[#5a32d1] transition-colors font-medium"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={() => setEditingClient(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Cliente */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Novo Cliente</h2>
                  <p className="text-gray-600">Adicionar um novo cliente ao sistema</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form className="space-y-6">
                {/* Informações Básicas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Empresa *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: MinhaEmpresa Ltda"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Setor *
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      >
                        <option value="">Selecione o setor</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Moda">Moda</option>
                        <option value="Educação">Educação</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Imobiliário">Imobiliário</option>
                        <option value="Consultoria">Consultoria</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contato@empresa.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.empresa.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Configurações Iniciais */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações Iniciais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plano *
                      </label>
                      <select
                        required
                        defaultValue="starter"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      >
                        <option value="starter">Starter - R$ 5.000/mês</option>
                        <option value="pro">Pro - R$ 15.000/mês</option>
                        <option value="enterprise">Enterprise - R$ 35.000/mês</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status Inicial
                      </label>
                      <select
                        defaultValue="setup"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      >
                        <option value="setup">Setup (Configurando)</option>
                        <option value="active">Ativo</option>
                        <option value="paused">Pausado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Orçamento Mensal *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="5000"
                        min="1000"
                        step="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Equipe */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipe Responsável</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manager Principal *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nome do responsável principal"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Editores (separados por vírgula)
                      </label>
                      <input
                        type="text"
                        placeholder="Editor 1, Editor 2, Editor 3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Deixe em branco se ainda não tiver editores definidos</p>
                    </div>
                  </div>
                </div>

                {/* Plataformas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Plataformas a Conectar</h3>
                  <p className="text-sm text-gray-600 mb-4">Selecione as redes sociais que serão gerenciadas para este cliente:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['instagram', 'facebook', 'linkedin', 'twitter', 'youtube', 'tiktok'].map((platform) => {
                      const PlatformIcon = getPlatformIcon(platform)
                      return (
                        <div key={platform} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <PlatformIcon className="h-5 w-5 text-gray-600" />
                            <span className="font-medium text-gray-900 capitalize">{platform}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#693ee0]"></div>
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Configurações Avançadas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações Avançadas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Auto-aprovação</h4>
                        <p className="text-sm text-gray-600">Posts são publicados automaticamente sem aprovação manual</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#693ee0]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">White Label</h4>
                        <p className="text-sm text-gray-600">Interface personalizada com a marca do cliente</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#693ee0]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </form>

              {/* Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Aqui seria implementada a lógica de criar cliente
                    alert('Cliente criado com sucesso! 🎉')
                    setShowAddModal(false)
                  }}
                  className="flex-1 bg-[#693ee0] text-white px-6 py-3 rounded-lg hover:bg-[#5a32d1] transition-colors font-medium"
                >
                  Criar Cliente
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}