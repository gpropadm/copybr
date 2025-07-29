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
  const [debugLogs, setDebugLogs] = useState<string[]>([])
  const [useGemini, setUseGemini] = useState(false) // Toggle para escolher API
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

  const addDebugLog = (message: string) => {
    setDebugLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const processImageWithOCR = async (imageFile: File): Promise<ScannedProduct> => {
    setLoading(true)
    setDebugLogs([]) // Limpar logs anteriores
    
    try {
      const base64Image = await convertFileToBase64(imageFile)
      
      if (useGemini) {
        // Tentar Gemini Vision primeiro
        addDebugLog('🔮 USANDO GEMINI VISION COMO PRINCIPAL')
        console.log('🔮 TESTANDO GEMINI VISION COMO MÉTODO PRINCIPAL')
        
        addDebugLog('🔍 Chamando Gemini Vision API...')
        
        const response = await fetch('/api/gemini-vision', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            prompt: `Você é um especialista em OCR de etiquetas de preço no Brasil.

Analise esta imagem de etiqueta de preço e extraia EXATAMENTE o que vê:
- PRODUTO: Nome do produto (sem inventar)  
- PREÇO: Valor em reais (formato: número)

REGRAS CRÍTICAS:
1. APENAS leia texto que está CLARAMENTE visível
2. Se não conseguir ler, responda "Não identificado" 
3. NÃO invente nomes ou preços
4. Preços devem ser realistas para o tipo de produto
5. Ignore textos borrados ou ilegíveis

Responda em JSON puro:
{
  "product": "nome_real_ou_Não_identificado",
  "price": numero_sem_simbolos,
  "confidence": 0.0_a_1.0,
  "rawText": "texto_que_conseguiu_ler"
}`
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          addDebugLog(`🎯 Gemini Vision: ${data.confidence?.toFixed(2) || '0.00'}`)
          console.log('🎯 Resultado Gemini Vision:', data)
          
          // Se Gemini teve boa confiança, usar resultado
          if (data.confidence >= 0.5 && !data.error) {
            addDebugLog('✅ Gemini Vision funcionou!')
            return {
              productName: data.product || 'Produto Não Identificado',
              price: data.price || 0,
              confidence: data.confidence || 0.1,
              rawText: data.rawText || 'Análise via Gemini Vision',
              store: currentStore
            }
          }
        }
        
        addDebugLog('⚠️ Gemini falhou, tentando GPT-4 Vision...')
      } else {
        // Usar GPT-4 Vision PRIMEIRO (método padrão)
        addDebugLog('🚀 USANDO GPT-4 VISION COMO PRINCIPAL')
        console.log('🚀 TESTANDO GPT-4 VISION COMO MÉTODO PRINCIPAL')
        
        addDebugLog('🔍 Chamando GPT-4 Vision API...')
        
        const response = await fetch('/api/vision', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            prompt: `VOCÊ É UM OCR ESPECIALISTA EM ETIQUETAS DE PREÇO.

Analise esta imagem de etiqueta de preço e extraia:
- PRODUTO: Nome exato do produto
- PREÇO: Valor em reais (R$)

REGRAS RIGOROSAS:
1. APENAS leia o que REALMENTE vê na imagem
2. Se não conseguir ler claramente, diga "Não identificado"
3. NÃO invente produtos ou preços
4. NÃO use palavras como "SONO EME" ou nomes estranhos
5. Preços de celular/smartphone devem ser realistas (R$ 200+)

Responda APENAS em JSON:
{
  "product": "nome do produto ou Não identificado",
  "price": valor_numerico_ou_0,
  "confidence": 0.0_a_1.0,
  "rawText": "texto_original_da_imagem"
}`
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          addDebugLog(`🎯 GPT-4 Vision: ${data.confidence?.toFixed(2) || '0.00'}`)
          console.log('🎯 Resultado GPT-4 Vision:', data)
          
          // Se GPT-4 Vision teve boa confiança E não detectou alucinação, usar resultado
          if (data.confidence >= 0.5 && !data.error) {
            addDebugLog('✅ GPT-4 Vision funcionou!')
            return {
              productName: data.product || 'Produto Não Identificado',
              price: data.price || 0,
              confidence: data.confidence || 0.1,
              rawText: data.rawText || 'Análise via GPT-4 Vision',
              store: currentStore
            }
          }
        }
        
        addDebugLog('⚠️ GPT-4 Vision falhou, tentando Gemini...')
      }
      
      // Fallback para Tesseract se ambos falharem
      addDebugLog('⚠️ IAs falharam, tentando Tesseract OCR...')
      console.log('⚠️ Ambas IAs falharam ou baixa confiança, usando Tesseract como backup...')
      
      const tesseractResult = await processWithTesseract(imageFile)
      addDebugLog(`🔧 Tesseract backup: ${tesseractResult.confidence.toFixed(2)}`)
      
      return tesseractResult
      
    } catch (error) {
      console.error('❌ Erro em todo o processo:', error)
      
      // Se tudo falhar, retornar erro padrão
      return {
        productName: 'Erro na análise',
        price: 0,
        confidence: 0.1,
        rawText: 'Não foi possível processar a imagem',
        store: currentStore
      }
    } finally {
      setLoading(false)
    }
  }

  // Converte arquivo para base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Remove o prefixo data:image/...;base64,
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Fallback Tesseract (caso GPT-4 falhe)
  const processWithTesseract = async (imageFile: File): Promise<ScannedProduct> => {
    try {
      const Tesseract = await import('tesseract.js')
      
      const { data: { text, confidence } } = await Tesseract.recognize(
        imageFile,
        'por+eng',
        {
          logger: (m: any) => console.log('OCR Progress:', m),
        }
      )
      
      const extractedData = extractProductAndPrice(text)
      
      return {
        productName: extractedData.product || 'Produto Detectado',
        price: extractedData.price || 0,
        confidence: confidence / 100,
        rawText: text,
        store: currentStore
      }
    } catch (error) {
      throw new Error('Erro no fallback OCR')
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
            
            {/* Toggle para escolher API */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Método de análise:</p>
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => setUseGemini(false)}
                  className={`px-3 py-1 rounded ${!useGemini ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  GPT-4 Vision
                </button>
                <button
                  onClick={() => setUseGemini(true)}
                  className={`px-3 py-1 rounded ${useGemini ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  🔮 Gemini Vision (TESTE)
                </button>
              </div>
            </div>
            
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
                  Escanear com {useGemini ? 'Gemini' : 'GPT-4'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Debug Logs - só aparece se tiver logs */}
      {debugLogs.length > 0 && (
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 text-sm">
              🔍 Debug (mostrar para Alex)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {debugLogs.map((log, index) => (
                <p key={index} className="text-xs font-mono text-blue-700">
                  {log}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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