'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera, MapPin, Check, X, Zap, ShoppingCart } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PriceMonitorService } from '@/services/price-monitor'

interface ScannedProduct {
  productName: string
  price: number
  store: string
  confidence: number
  rawText: string
}

export default function PriceScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<ScannedProduct | null>(null)
  const [currentStore, setCurrentStore] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [savedProducts, setSavedProducts] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    detectCurrentStore()
    loadSavedProducts()
  }, [])

  const detectCurrentStore = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simula detecção de loja baseada em GPS
          // Em produção, usaria API do Google Places ou base de dados de lojas
          const stores = ['Atacadão', 'Makro', 'Assaí', 'Extra', 'Carrefour']
          const randomStore = stores[Math.floor(Math.random() * stores.length)]
          setCurrentStore(randomStore)
        },
        (error) => {
          console.log('GPS não disponível, usando loja padrão')
          setCurrentStore('Atacadão')
        }
      )
    } else {
      setCurrentStore('Atacadão')
    }
  }

  const loadSavedProducts = async () => {
    try {
      const products = await PriceMonitorService.getAllProducts()
      setSavedProducts(products)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
  }

  const processImageWithOCR = async (imageFile: File): Promise<ScannedProduct> => {
    setLoading(true)
    
    try {
      // Importa Tesseract.js dinamicamente
      const Tesseract = await import('tesseract.js')
      
      console.log('🔍 Iniciando OCR REAL...')
      
      // Processa imagem com Tesseract OCR
      const { data: { text, confidence } } = await Tesseract.recognize(
        imageFile,
        'por', // Português
        {
          logger: (m: any) => console.log('OCR Progress:', m)
        }
      )
      
      console.log('📄 Texto extraído:', text)
      console.log('🎯 Confiança:', confidence)
      
      // IA para extrair produto e preço do texto
      const extractedData = extractProductAndPrice(text)
      
      return {
        productName: extractedData.product || 'Produto Não Identificado',
        price: extractedData.price || 0,
        confidence: confidence / 100,
        rawText: text,
        store: currentStore
      }
      
    } catch (error) {
      console.error('❌ Erro OCR:', error)
      throw new Error('Erro ao processar imagem com OCR')
    } finally {
      setLoading(false)
    }
  }

  // IA para extrair produto e preço do texto OCR
  const extractProductAndPrice = (text: string) => {
    console.log('🤖 Analisando texto:', text)
    
    const cleanText = text.toUpperCase().replace(/\n/g, ' ')
    
    // Regex para encontrar preços (R$ X,XX ou X,XX)
    const priceRegex = /R?\$?\s*(\d{1,3}(?:[.,]\d{2})?)/g
    const priceMatches = cleanText.match(priceRegex)
    
    console.log('💰 Preços encontrados:', priceMatches)
    
    let price = 0
    if (priceMatches && priceMatches.length > 0) {
      // Pega o último preço encontrado (geralmente é o preço de venda)
      const lastPrice = priceMatches[priceMatches.length - 1]
      const numericPrice = lastPrice.replace(/[R$\s]/g, '').replace(',', '.')
      price = parseFloat(numericPrice) || 0
    }
    
    // IA simples para detectar produtos comuns
    let product = ''
    
    if (cleanText.includes('COCA') || cleanText.includes('COLA')) {
      product = 'Coca-Cola'
      if (cleanText.includes('350') || cleanText.includes('LATA')) product += ' Lata 350ml'
      if (cleanText.includes('2L') || cleanText.includes('2 L')) product += ' 2L'
    } else if (cleanText.includes('PÃO') && cleanText.includes('HAMBUR')) {
      product = 'Pão de Hambúrguer'
      if (cleanText.includes('36')) product += ' (36 unidades)'
    } else if (cleanText.includes('CARNE')) {
      product = 'Carne'
      if (cleanText.includes('MOIDA') || cleanText.includes('MOÍDA')) product += ' Moída'
      if (cleanText.includes('KG')) product += ' (kg)'
    } else if (cleanText.includes('QUEIJO')) {
      product = 'Queijo'
      if (cleanText.includes('MUSSARELA')) product += ' Mussarela'
      if (cleanText.includes('FATIADO')) product += ' Fatiado'
    } else if (cleanText.includes('BATATA')) {
      product = 'Batata'
      if (cleanText.includes('PALHA')) product += ' Palha'
    } else if (cleanText.includes('LEITE')) {
      product = 'Leite'
      if (cleanText.includes('1L')) product += ' 1L'
    } else if (cleanText.includes('AÇÚCAR') || cleanText.includes('ACUCAR')) {
      product = 'Açúcar'
      if (cleanText.includes('1KG')) product += ' 1kg'
    } else if (cleanText.includes('ÓLEO') || cleanText.includes('OLEO')) {
      product = 'Óleo'
      if (cleanText.includes('900') || cleanText.includes('ML')) product += ' 900ml'
    } else {
      // Tenta extrair primeira palavra que parece ser produto
      const words = cleanText.split(' ').filter(w => w.length > 2 && !w.includes('R$'))
      product = words.slice(0, 2).join(' ') || 'Produto Detectado'
    }
    
    console.log('🎯 Produto extraído:', product)
    console.log('💵 Preço extraído:', price)
    
    return { product, price }
  }

  const handleImageCapture = async (file: File) => {
    if (!file) return

    try {
      const result = await processImageWithOCR(file)
      setScannedData(result)
      setIsScanning(false)
    } catch (error) {
      console.error('Erro ao processar imagem:', error)
      alert('❌ Erro ao processar imagem. Tente novamente!')
      setIsScanning(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageCapture(file)
    }
  }

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const confirmScan = async () => {
    if (!scannedData) return

    try {
      setLoading(true)
      
      // Determina categoria baseada no nome do produto
      let category: 'bebidas' | 'ingredientes' | 'embalagens' | 'outros' = 'outros'
      const productLower = scannedData.productName.toLowerCase()
      
      if (productLower.includes('coca') || productLower.includes('refrigerante') || productLower.includes('bebida')) {
        category = 'bebidas'
      } else if (productLower.includes('pão') || productLower.includes('carne') || productLower.includes('queijo')) {
        category = 'ingredientes'
      }

      // Determina unidade
      let unit = 'unidade'
      if (productLower.includes('kg')) unit = 'kg'
      if (productLower.includes('litro') || productLower.includes('ml')) unit = 'litro'

      // Cria produto no sistema
      await PriceMonitorService.addProduct({
        name: scannedData.productName,
        category,
        unit,
        suppliers: [{
          id: `${currentStore.toLowerCase()}_${Date.now()}`,
          name: scannedData.store,
          currentPrice: scannedData.price,
          priceHistory: [{
            price: scannedData.price,
            date: new Date().toISOString(),
            source: 'scanner'
          }],
          availability: true,
          lastChecked: new Date().toISOString()
        }]
      })

      // Atualiza lista de produtos
      await loadSavedProducts()
      
      // Reset
      setScannedData(null)
      
      alert(`✅ ${scannedData.productName} salvo com sucesso!\nPreço: R$ ${scannedData.price.toFixed(2)}\nLoja: ${scannedData.store}`)
      
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      alert('❌ Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  const cancelScan = () => {
    setScannedData(null)
    setIsScanning(false)
  }

  return (
    <div className="p-2 md:p-4 w-full max-w-md mx-auto">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Scanner de Preços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <MapPin className="h-4 w-4" />
            <span>Detectado: <strong>{currentStore}</strong></span>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Tire uma foto da etiqueta de preço para adicionar automaticamente ao sistema
            </p>
            
            <Button 
              onClick={openCamera}
              disabled={loading}
              className="w-full text-sm md:text-base"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Escanear Produto
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input oculto para captura de imagem */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Resultado do scan */}
      {scannedData && (
        <Card className="mb-4 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Check className="h-5 w-5" />
              Produto Detectado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-green-700">Produto:</label>
                <p className="font-semibold">{scannedData.productName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-green-700">Preço:</label>
                <p className="font-semibold text-lg">R$ {scannedData.price.toFixed(2)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-green-700">Loja:</label>
                <p className="font-semibold">{scannedData.store}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-green-700">Confiança:</label>
                <p className="text-sm">{(scannedData.confidence * 100).toFixed(0)}%</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={confirmScan}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Salvando...' : 'Confirmar e Salvar'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={cancelScan}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Produtos salvos recentemente */}
      {savedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Produtos Monitorados ({savedProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedProducts.slice(-5).reverse().map((product) => (
                <div key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">
                      {product.suppliers[0]?.name} - R$ {product.suppliers[0]?.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <Zap className="h-4 w-4 text-yellow-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}