// Sistema de Monitoramento de Preços para Promoções IA
// Monitora preços de fornecedores e gera oportunidades de promoção

export interface ProductItem {
  id: string
  name: string
  category: 'bebidas' | 'ingredientes' | 'embalagens' | 'outros'
  unit: string // 'unidade', 'kg', 'litro'
  suppliers: Supplier[]
  lastUpdated: string
  createdAt: string
}

export interface Supplier {
  id: string
  name: string
  url?: string
  currentPrice: number
  lastPrice?: number
  priceHistory: PriceHistory[]
  availability: boolean
  lastChecked: string
}

export interface PriceHistory {
  price: number
  date: string
  source: string
}

export interface PriceAlert {
  id: string
  productId: string
  alertType: 'price_drop' | 'price_increase' | 'back_in_stock' | 'promotion'
  threshold?: number
  isActive: boolean
  notificationMethod: 'email' | 'whatsapp' | 'dashboard'
  createdAt: string
}

export interface PromotionOpportunity {
  id: string
  productId: string
  supplierId: string
  currentPrice: number
  previousPrice: number
  savingsPercent: number
  suggestedPromotion: string
  estimatedMargin: number
  generatedCopy: string
  priority: 'high' | 'medium' | 'low'
  createdAt: string
}

export class PriceMonitorService {
  private static readonly STORAGE_KEY = 'copybr_price_monitor'

  // Adicionar produto para monitoramento
  static async addProduct(product: Omit<ProductItem, 'id' | 'createdAt' | 'lastUpdated'>): Promise<string> {
    const id = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newProduct: ProductItem = {
      ...product,
      id,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }

    const products = await this.getAllProducts()
    products.push(newProduct)
    localStorage.setItem(this.STORAGE_KEY + '_products', JSON.stringify(products))
    
    return id
  }

  // Buscar todos os produtos
  static async getAllProducts(): Promise<ProductItem[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY + '_products')
    return stored ? JSON.parse(stored) : []
  }

  // Atualizar preço de um fornecedor
  static async updateSupplierPrice(
    productId: string, 
    supplierId: string, 
    newPrice: number, 
    source: string = 'manual'
  ): Promise<void> {
    const products = await this.getAllProducts()
    const productIndex = products.findIndex(p => p.id === productId)
    
    if (productIndex === -1) return

    const product = products[productIndex]
    const supplierIndex = product.suppliers.findIndex(s => s.id === supplierId)
    
    if (supplierIndex === -1) return

    const supplier = product.suppliers[supplierIndex]
    
    // Salva preço anterior
    supplier.lastPrice = supplier.currentPrice
    
    // Atualiza preço atual
    supplier.currentPrice = newPrice
    supplier.lastChecked = new Date().toISOString()
    
    // Adiciona ao histórico
    supplier.priceHistory.push({
      price: newPrice,
      date: new Date().toISOString(),
      source
    })

    // Mantém apenas últimos 50 registros
    if (supplier.priceHistory.length > 50) {
      supplier.priceHistory = supplier.priceHistory.slice(-50)
    }

    product.lastUpdated = new Date().toISOString()
    products[productIndex] = product

    localStorage.setItem(this.STORAGE_KEY + '_products', JSON.stringify(products))

    // Verifica se deve gerar alerta
    await this.checkPriceAlerts(productId, supplierId, newPrice)
  }

  // Simular scraping de preços (placeholder para implementação real)
  static async simulatePriceScraping(productId: string): Promise<void> {
    const products = await this.getAllProducts()
    const product = products.find(p => p.id === productId)
    
    if (!product) return

    // Simula variação de preço realista
    for (const supplier of product.suppliers) {
      if (supplier.url) {
        // Simula variação de -10% a +5%
        const variation = (Math.random() - 0.8) * 0.15
        const newPrice = Number((supplier.currentPrice * (1 + variation)).toFixed(2))
        
        await this.updateSupplierPrice(productId, supplier.id, newPrice, 'scraping')
      }
    }
  }

  // Verificar alertas de preço
  static async checkPriceAlerts(productId: string, supplierId: string, newPrice: number): Promise<void> {
    const alerts = await this.getActiveAlerts()
    const product = await this.getProductById(productId)
    
    if (!product) return

    const supplier = product.suppliers.find(s => s.id === supplierId)
    if (!supplier || !supplier.lastPrice) return

    const priceChange = ((newPrice - supplier.lastPrice) / supplier.lastPrice) * 100

    // Verifica alertas relevantes
    const relevantAlerts = alerts.filter(alert => alert.productId === productId && alert.isActive)

    for (const alert of relevantAlerts) {
      let shouldTrigger = false

      switch (alert.alertType) {
        case 'price_drop':
          shouldTrigger = priceChange <= -(alert.threshold || 5)
          break
        case 'price_increase':
          shouldTrigger = priceChange >= (alert.threshold || 10)
          break
        case 'promotion':
          shouldTrigger = priceChange <= -15 // 15% de desconto ou mais
          break
      }

      if (shouldTrigger) {
        await this.generatePromotionOpportunity(productId, supplierId, newPrice, supplier.lastPrice)
      }
    }
  }

  // Gerar oportunidade de promoção
  static async generatePromotionOpportunity(
    productId: string, 
    supplierId: string, 
    currentPrice: number, 
    previousPrice: number
  ): Promise<void> {
    const product = await this.getProductById(productId)
    if (!product) return

    const savingsPercent = Math.abs(((currentPrice - previousPrice) / previousPrice) * 100)
    
    // Calcula margem estimada (30% padrão + custos)
    const costMultiplier = 1.4 // 40% markup
    const sellingPrice = currentPrice * costMultiplier
    const estimatedMargin = ((sellingPrice - currentPrice) / sellingPrice) * 100

    // Gera copy automático baseado no produto e desconto
    const generatedCopy = this.generatePromotionalCopy(product, savingsPercent, sellingPrice)

    const opportunity: PromotionOpportunity = {
      id: `opp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId,
      supplierId,
      currentPrice,
      previousPrice,
      savingsPercent,
      suggestedPromotion: this.suggestPromotionType(savingsPercent),
      estimatedMargin,
      generatedCopy,
      priority: savingsPercent > 20 ? 'high' : savingsPercent > 10 ? 'medium' : 'low',
      createdAt: new Date().toISOString()
    }

    // Salva oportunidade
    const opportunities = await this.getAllOpportunities()
    opportunities.push(opportunity)
    localStorage.setItem(this.STORAGE_KEY + '_opportunities', JSON.stringify(opportunities))

    // Simula notificação
    console.log(`🚨 Nova oportunidade: ${product.name} - ${savingsPercent.toFixed(1)}% de economia!`)
  }

  // Gerar copy promocional
  static generatePromotionalCopy(product: ProductItem, savingsPercent: number, sellingPrice: number): string {
    const productName = product.name
    const discount = Math.round(savingsPercent)
    const price = sellingPrice.toFixed(2).replace('.', ',')

    const templates = [
      `🔥 OFERTA RELÂMPAGO! ${productName} com ${discount}% OFF por apenas R$ ${price}! Corre que é por tempo limitado! 🏃‍♂️💨`,
      `🎉 Aproveite! ${productName} em SUPER PROMOÇÃO! Economia de ${discount}% - Só R$ ${price}! Garante já o seu! ⚡`,
      `💥 ÚLTIMA CHANCE! ${productName} por R$ ${price} (${discount}% de desconto)! Não perca essa oportunidade! 🚨`,
      `🌟 PROMOÇÃO ESPECIAL: ${productName} saindo por apenas R$ ${price}! Desconto de ${discount}%! Vem garantir! 🔥`
    ]

    return templates[Math.floor(Math.random() * templates.length)]
  }

  // Sugerir tipo de promoção
  static suggestPromotionType(savingsPercent: number): string {
    if (savingsPercent > 25) return 'Promoção Relâmpago'
    if (savingsPercent > 15) return 'Oferta Especial'
    if (savingsPercent > 10) return 'Desconto Limitado'
    return 'Preço Promocional'
  }

  // Buscar produto por ID
  static async getProductById(productId: string): Promise<ProductItem | undefined> {
    const products = await this.getAllProducts()
    return products.find(p => p.id === productId)
  }

  // Buscar alertas ativos
  static async getActiveAlerts(): Promise<PriceAlert[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY + '_alerts')
    const alerts: PriceAlert[] = stored ? JSON.parse(stored) : []
    return alerts.filter(alert => alert.isActive)
  }

  // Buscar oportunidades
  static async getAllOpportunities(): Promise<PromotionOpportunity[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY + '_opportunities')
    return stored ? JSON.parse(stored) : []
  }

  // Criar alerta
  static async createAlert(alert: Omit<PriceAlert, 'id' | 'createdAt'>): Promise<string> {
    const id = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newAlert: PriceAlert = {
      ...alert,
      id,
      createdAt: new Date().toISOString()
    }

    const alerts = await this.getActiveAlerts()
    alerts.push(newAlert)
    localStorage.setItem(this.STORAGE_KEY + '_alerts', JSON.stringify(alerts))
    
    return id
  }

  // Produtos predefinidos para hamburgueria
  static getDefaultHamburgueriaProducts(): Omit<ProductItem, 'id' | 'createdAt' | 'lastUpdated'>[] {
    return [
      {
        name: 'Coca-Cola Lata 350ml',
        category: 'bebidas',
        unit: 'unidade',
        suppliers: [
          {
            id: 'atacadao_coca',
            name: 'Atacadão',
            currentPrice: 1.99,
            priceHistory: [],
            availability: true,
            lastChecked: new Date().toISOString()
          },
          {
            id: 'makro_coca',
            name: 'Makro',
            currentPrice: 2.10,
            priceHistory: [],
            availability: true,
            lastChecked: new Date().toISOString()
          }
        ]
      },
      {
        name: 'Pão de Hambúrguer (36 unidades)',
        category: 'ingredientes',
        unit: 'pacote',
        suppliers: [
          {
            id: 'atacadao_pao',
            name: 'Atacadão',
            currentPrice: 24.90,
            priceHistory: [],
            availability: true,
            lastChecked: new Date().toISOString()
          }
        ]
      },
      {
        name: 'Carne Bovina Moída (1kg)',
        category: 'ingredientes',
        unit: 'kg',
        suppliers: [
          {
            id: 'atacadao_carne',
            name: 'Atacadão',
            currentPrice: 18.90,
            priceHistory: [],
            availability: true,
            lastChecked: new Date().toISOString()
          }
        ]
      }
    ]
  }
}