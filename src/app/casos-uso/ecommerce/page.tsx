import { ShoppingCart, TrendingUp, Target, Users, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function EcommercePage() {
  const beforeAfter = [
    {
      before: "Camiseta básica de algodão, disponível em várias cores.",
      after: "🔥 Camiseta Premium que você vai AMAR usar! Algodão 100% macio, corte perfeito que valoriza seu corpo. Disponível em 12 cores lindas. Frete GRÁTIS + 30 dias para trocar!"
    },
    {
      before: "Tênis esportivo para corrida, solado antiderrapante.",
      after: "⚡ O tênis que vai TRANSFORMAR sua corrida! Tecnologia anti-impacto que protege seus joelhos + solado que nunca escorrega. Usado por atletas profissionais. Seus pés merecem o melhor!"
    }
  ]

  const templates = [
    'Descrição de Produto que Vende',
    'Título que Chama Atenção',
    'Email de Carrinho Abandonado',
    'Página de Produto Completa',
    'Anúncio para Produto',
    'Review Falso Positivo',
    'Oferta por Tempo Limitado',
    'Descrição de Categoria'
  ]

  const results = [
    {
      metric: '+340%',
      description: 'Aumento nas vendas',
      detail: 'Loja de cosméticos'
    },
    {
      metric: '+180%',
      description: 'Taxa de conversão',
      detail: 'E-commerce de eletrônicos'
    },
    {
      metric: '-60%',
      description: 'Carrinho abandonado',
      detail: 'Loja de roupas'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <span className="text-blue-600 font-semibold">E-commerce</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Descrições que <span className="text-blue-600">Vendem</span> Sozinhas
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Pare de perder vendas por causa de descrições ruins!</strong> Nossa IA cria textos que fazem seus produtos se destacarem e convertem visitantes em compradores fiéis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gerar">
                  <Button size="lg" className="flex items-center gap-2">
                    Criar Descrição Agora
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Exemplos
                </Button>
              </div>
            </div>
            
            {/* Results Card */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Resultados Reais de E-commerces
              </h3>
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-green-600">{result.metric}</div>
                    <div>
                      <div className="font-medium text-gray-900">{result.description}</div>
                      <div className="text-sm text-gray-600">{result.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explicação Simples */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4">
              🤔 Por que sua loja não vende mais?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">❌ Problema Comum:</h3>
                <ul className="text-yellow-800 space-y-2">
                  <li>• Descrições técnicas e chatas</li>
                  <li>• Sem gatilhos mentais</li>
                  <li>• Não fala a linguagem do cliente</li>
                  <li>• Não cria desejo de compra</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Nossa Solução:</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• Descrições que emocionam</li>
                  <li>• Gatilhos de urgência e escassez</li>
                  <li>• Linguagem que o brasileiro entende</li>
                  <li>• Foco nos benefícios, não características</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Veja a Diferença na Prática
            </h2>
            <p className="text-xl text-gray-600">
              Comparação: descrição comum vs descrição que vende
            </p>
          </div>
          
          <div className="space-y-8">
            {beforeAfter.map((example, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Before */}
                  <div className="p-8 bg-red-50">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ❌
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-red-900">
                        Descrição Normal (Não vende)
                      </h3>
                    </div>
                    <p className="text-red-800 italic">"{example.before}"</p>
                    <div className="mt-4 text-sm text-red-700">
                      <strong>Problema:</strong> Fria, técnica, não desperta emoção
                    </div>
                  </div>
                  
                  {/* After */}
                  <div className="p-8 bg-green-50">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        ✅
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-green-900">
                        Com CopyBR (Que vende!)
                      </h3>
                    </div>
                    <p className="text-green-800 font-medium">"{example.after}"</p>
                    <div className="mt-4 text-sm text-green-700">
                      <strong>Vantagens:</strong> Emocional, benefícios claros, urgência
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona? (Super Simples!)
            </h2>
            <p className="text-xl text-gray-600">
              Em 3 passos você tem descrições profissionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Descreva seu Produto
                </h3>
                <p className="text-gray-600">
                  Digite as informações básicas: nome, características principais, público-alvo. 
                  <strong>Exemplo:</strong> "Tênis de corrida, solado antiderrapante, para atletas"
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  IA Cria a Magia
                </h3>
                <p className="text-gray-600">
                  Nossa IA analisa seus dados e cria várias versões de descrições persuasivas, 
                  com gatilhos mentais e linguagem que o brasileiro adora.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Copie e Use
                </h3>
                <p className="text-gray-600">
                  Escolha a descrição que mais gostou, copie e cole na sua loja. 
                  <strong>Pronto!</strong> Agora é só aguardar as vendas chegarem.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Templates para E-commerce
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para vender mais online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-gray-900">{template}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardContent>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  "Nossas vendas online triplicaram depois que começamos a usar o CopyBR! 
                  As descrições ficaram muito mais atrativas e os clientes compram mais. 
                  Recomendo para qualquer loja virtual!"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Ana Carolina</div>
                    <div className="text-gray-600">Dona da Loja Moda & Estilo</div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    +340% vendas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Vender Mais?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece hoje mesmo a criar descrições que vendem. 
            Teste grátis por 7 dias - sem compromisso!
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Começar Teste Grátis
            </Button>
          </Link>
          <p className="text-sm text-blue-200 mt-4">
            ✅ 7 dias grátis • ✅ Sem cartão de crédito • ✅ Cancele quando quiser
          </p>
        </div>
      </section>
    </div>
  )
}