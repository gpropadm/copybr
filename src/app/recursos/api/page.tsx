import { Code, Puzzle, Zap, Cog, ArrowRight, CheckCircle, Star, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function APIPage() {
  const integrationExamples = [
    {
      platform: 'WordPress',
      icon: '🌐',
      description: 'Plugin para criar posts automaticamente no seu blog',
      useCase: 'Gerar artigos direto no painel do WordPress',
      difficulty: 'Fácil'
    },
    {
      platform: 'Zapier',
      icon: '⚡',
      description: 'Conecte com 5000+ ferramentas sem programar',
      useCase: 'Quando chega lead novo, cria email personalizado',
      difficulty: 'Sem código'
    },
    {
      platform: 'Seu Sistema',
      icon: '💻',
      description: 'Integre direto no seu software ou aplicativo',
      useCase: 'CRM que gera propostas automáticas',
      difficulty: 'Programação'
    },
    {
      platform: 'Google Sheets',
      icon: '📊',
      description: 'Planilha que gera textos automaticamente',
      useCase: 'Lista de produtos vira descrições prontas',
      difficulty: 'Médio'
    }
  ]

  const apiFeatures = [
    {
      feature: 'RESTful API Simples',
      description: 'Fácil de integrar em qualquer linguagem de programação',
      code: `curl -X POST "https://api.copybr.com/v1/generate"
  -H "Authorization: Bearer sua-chave-aqui"
  -H "Content-Type: application/json"
  -d '{
    "template": "facebook-ad",
    "input": "Curso de inglês online"
  }'`
    },
    {
      feature: 'Documentação Completa',
      description: 'Guias passo a passo, mesmo para quem não é programador',
      code: `{
  "success": true,
  "data": [
    {
      "id": "copy-123",
      "text": "🔥 Aprenda inglês em casa...",
      "confidence": 0.95
    }
  ]
}`
    },
    {
      feature: 'Rate Limits Generosos',
      description: 'Milhares de requisições por mês incluídas no seu plano',
      code: `Rate Limit: 1000 calls/hour
Monthly: Ilimitado no Premium
Response Time: < 2 segundos`
    }
  ]

  const useCases = [
    {
      title: 'E-commerce Automático',
      description: 'Suas descrições de produto se escrevem sozinhas',
      example: 'Você adiciona um produto → API gera descrição → Publica automaticamente',
      benefit: 'Economiza 5 horas por semana',
      icon: '🛒'
    },
    {
      title: 'CRM Inteligente',
      description: 'Emails personalizados para cada lead automaticamente',
      example: 'Lead se cadastra → API cria email personalizado → Dispara sequência',
      benefit: '+300% taxa de resposta',
      icon: '📧'
    },
    {
      title: 'Social Media Manager',
      description: 'Posts para redes sociais gerados automaticamente',
      example: 'Agenda posts → API cria conteúdo → Publica nas redes',
      benefit: '10x mais posts em menos tempo',
      icon: '📱'
    },
    {
      title: 'Sistema de Vendas',
      description: 'Propostas comerciais criadas na hora',
      example: 'Cliente pede orçamento → API gera proposta → Envia automaticamente',
      benefit: '+180% agilidade nas vendas',
      icon: '💼'
    }
  ]

  const pricingTiers = [
    {
      plan: 'Starter API',
      price: 47,
      requests: '10.000/mês',
      features: ['Todos os templates', 'Rate limit: 100/hora', 'Documentação completa', 'Suporte por email'],
      recommended: false
    },
    {
      plan: 'Business API',
      price: 97,
      requests: '50.000/mês',
      features: ['Todos os templates', 'Rate limit: 500/hora', 'Webhooks', 'Suporte prioritário', 'Métricas avançadas'],
      recommended: true
    },
    {
      plan: 'Enterprise API',
      price: 297,
      requests: 'Ilimitado',
      features: ['Todos os templates', 'Rate limit: 2000/hora', 'SLA 99.9%', 'Suporte 24/7', 'IP dedicado', 'Customizações'],
      recommended: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Code className="h-8 w-8 text-blue-600" />
                <span className="text-blue-600 font-semibold">API Integration</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Integre o CopyBR no <span className="text-blue-600">Seu Sistema</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Automação total é possível!</strong> Nossa API permite integrar a geração de copy direto 
                no seu site, aplicativo, CRM ou qualquer sistema. Textos profissionais sem sair da sua ferramenta.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/registro">
                  <Button size="lg" className="flex items-center gap-2">
                    Acessar API
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Documentação
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                🚀 O que você pode automatizar:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Descrições de produto automáticas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Emails personalizados em massa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Posts para redes sociais</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Propostas comerciais instantâneas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Conteúdo para blog automatizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explicação Simples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              🤔 O que é uma API? (Explicação para Leigos)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">🔌 Pense numa tomada elétrica:</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Tomada (API):</strong> Ponto de conexão</li>
                  <li>• <strong>Aparelho (Seu sistema):</strong> Plugue e use</li>
                  <li>• <strong>Energia (Nossos textos):</strong> Flui automaticamente</li>
                  <li>• <strong>Resultado:</strong> Seu sistema "ganha vida" com IA</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">⚡ Na prática, nossa API faz:</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• <strong>Recebe pedido:</strong> "Crie descrição para tênis Nike"</li>
                  <li>• <strong>Processa com IA:</strong> Análise + criação em 2 segundos</li>
                  <li>• <strong>Retorna texto:</strong> "🔥 Tênis Nike que vai..."</li>
                  <li>• <strong>Seu sistema usa:</strong> Automaticamente onde precisar</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
              <p className="text-yellow-800">
                <strong>💡 Resumindo:</strong> É como ter um copywriter robô trabalhando 24h dentro do seu sistema, 
                criando textos perfeitos sempre que precisar! 🤖✍️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Integrar (Mais Fácil que Parece!)
            </h2>
            <p className="text-xl text-gray-600">
              Do iniciante ao programador avançado, temos solução para todos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrationExamples.map((example, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{example.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {example.platform}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{example.description}</p>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-blue-800 text-xs">
                      <strong>Exemplo:</strong> {example.useCase}
                    </p>
                  </div>
                  
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    example.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                    example.difficulty === 'Sem código' ? 'bg-blue-100 text-blue-800' :
                    example.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {example.difficulty}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa API é Simples e Poderosa
            </h2>
            <p className="text-xl text-gray-600">
              Documentação clara, exemplos práticos e suporte completo
            </p>
          </div>
          
          <div className="space-y-8">
            {apiFeatures.map((feature, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.feature}
                    </h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <Button variant="outline">
                      Ver Documentação
                    </Button>
                  </div>
                  <div className="bg-gray-900 p-8">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{feature.code}</code>
                    </pre>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Casos de Uso Reais
            </h2>
            <p className="text-xl text-gray-600">
              Veja como empresas usam nossa API para automatizar tudo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{useCase.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{useCase.description}</p>
                      
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-blue-900 mb-2">🔄 Como funciona:</h4>
                        <p className="text-blue-800 text-sm">{useCase.example}</p>
                      </div>
                      
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                        📈 {useCase.benefit}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Planos de API
            </h2>
            <p className="text-xl text-gray-600">
              Preços justos para cada necessidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`p-6 ${tier.recommended ? 'border-2 border-blue-500 relative' : ''}`}>
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recomendado
                    </span>
                  </div>
                )}
                
                <CardContent className="text-center pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.plan}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">R$ {tier.price}</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <div className="text-blue-600 font-medium mb-6">{tier.requests}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${tier.recommended ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={tier.recommended ? 'primary' : 'outline'}
                  >
                    Escolher Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Começar com a API
            </h2>
            <p className="text-xl text-gray-600">
              Em 3 passos simples você está automatizando textos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Escolha seu Plano
                </h3>
                <p className="text-gray-600">
                  Starter para teste, Business para uso sério, Enterprise para grandes volumes. 
                  Comece com 7 dias grátis em qualquer plano.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Pegue sua Chave API
                </h3>
                <p className="text-gray-600">
                  No dashboard, gere sua chave de acesso. É como uma senha especial 
                  que identifica suas chamadas para a API.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Faça sua Primeira Chamada
                </h3>
                <p className="text-gray-600">
                  Use nossa documentação para fazer o primeiro teste. 
                  Em 5 minutos você terá textos sendo gerados automaticamente!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Automatizar sua Criação de Textos?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Pare de criar textos manualmente! Integre nossa API e tenha geração automática de copy profissional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registro">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Começar com API
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Ver Documentação
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            ✅ 7 dias grátis • ✅ Documentação completa • ✅ Suporte técnico incluído
          </p>
        </div>
      </section>
    </div>
  )
}