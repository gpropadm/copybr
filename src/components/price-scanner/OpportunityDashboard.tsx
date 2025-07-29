'use client'

import { useState, useEffect } from 'react'
import { TrendingDown, TrendingUp, Zap, Copy, Eye, DollarSign } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PriceMonitorService, PromotionOpportunity } from '@/services/price-monitor'

export default function OpportunityDashboard() {
  const [opportunities, setOpportunities] = useState<PromotionOpportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOpportunities()
    
    // Simula verificação de novas oportunidades
    const interval = setInterval(() => {
      simulateNewOpportunities()
    }, 30000) // Verifica a cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const loadOpportunities = async () => {
    try {
      const allOpportunities = await PriceMonitorService.getAllOpportunities()
      // Ordena por prioridade e data
      const sorted = allOpportunities.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      setOpportunities(sorted)
    } catch (error) {
      console.error('Erro ao carregar oportunidades:', error)
    } finally {
      setLoading(false)
    }
  }

  const simulateNewOpportunities = async () => {
    // Simula variação de preços e geração de novas oportunidades
    const products = await PriceMonitorService.getAllProducts()
    
    for (const product of products) {
      if (Math.random() < 0.1) { // 10% chance de gerar oportunidade
        for (const supplier of product.suppliers) {
          await PriceMonitorService.simulatePriceScraping(product.id)
        }
      }
    }
    
    // Recarrega oportunidades
    loadOpportunities()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('📋 Copy copiado para área de transferência!')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta'
      case 'medium': return 'Média'
      case 'low': return 'Baixa'
      default: return 'Normal'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ⚡ Oportunidades de Promoção
        </h2>
        <p className="text-gray-600">
          Alertas automáticos baseados em variações de preço
        </p>
      </div>

      {opportunities.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma oportunidade no momento
            </h3>
            <p className="text-gray-600 mb-6">
              Continue escaneando produtos para monitorar mudanças de preço
            </p>
            <Button onClick={() => window.location.href = '/dashboard/price-scanner'}>
              Escanear Produtos
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(opportunity.priority)}`}>
                        {getPriorityLabel(opportunity.priority)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(opportunity.createdAt)}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {opportunity.suggestedPromotion}
                    </h3>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <TrendingDown className="h-4 w-4" />
                      {opportunity.savingsPercent.toFixed(1)}% economia
                    </div>
                  </div>
                </div>

                {/* Detalhes de Preço */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Preço Anterior:</span>
                    <span className="font-medium">R$ {opportunity.previousPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Preço Atual:</span>
                    <span className="font-medium text-green-600">R$ {opportunity.currentPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Margem Estimada:</span>
                    <span className="font-medium">{opportunity.estimatedMargin.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Preço Sugerido:</span>
                    <span className="font-medium text-blue-600">
                      R$ {(opportunity.currentPrice * 1.4).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Copy Gerado */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Copy Gerado:</span>
                  </div>
                  <p className="text-gray-900 leading-relaxed">
                    {opportunity.generatedCopy}
                  </p>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => copyToClipboard(opportunity.generatedCopy)}
                    size="sm"
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Copy
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const whatsappText = encodeURIComponent(opportunity.generatedCopy)
                      window.open(`https://wa.me/?text=${whatsappText}`, '_blank')
                    }}
                  >
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const earnings = (opportunity.currentPrice * 1.4 - opportunity.currentPrice).toFixed(2)
                      alert(`💰 Potencial de Lucro:\n\nCusto: R$ ${opportunity.currentPrice.toFixed(2)}\nVenda: R$ ${(opportunity.currentPrice * 1.4).toFixed(2)}\nLucro: R$ ${earnings}\nMargem: ${opportunity.estimatedMargin.toFixed(1)}%`)
                    }}
                  >
                    <DollarSign className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Botão para simular nova verificação */}
      <div className="mt-6 text-center">
        <Button 
          variant="outline"
          onClick={simulateNewOpportunities}
          disabled={loading}
        >
          🔄 Verificar Novos Preços
        </Button>
      </div>
    </div>
  )
}