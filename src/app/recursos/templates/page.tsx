import { FileText, Crown, Zap, Target, ArrowRight, CheckCircle, Star, Gift } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function TemplatesPage() {
  const templateCategories = [
    {
      title: 'Marketing Digital',
      icon: <Target className="h-8 w-8 text-red-600" />,
      count: '15 templates',
      description: 'Anúncios que convertem para Facebook, Google, Instagram',
      templates: ['Facebook Ads', 'Google Ads', 'Instagram Stories', 'LinkedIn Ads'],
      level: 'Gratuito + Premium'
    },
    {
      title: 'E-commerce',
      icon: <Gift className="h-8 w-8 text-blue-600" />,
      count: '12 templates',
      description: 'Descrições e páginas que vendem produtos online',
      templates: ['Descrição de Produto', 'Página de Vendas', 'Email Carrinho', 'Reviews'],
      level: 'Premium'
    },
    {
      title: 'Vendas',
      icon: <Zap className="h-8 w-8 text-green-600" />,
      count: '18 templates',
      description: 'Scripts profissionais para fechar mais negócios',
      templates: ['Cold Call', 'Email Vendas', 'WhatsApp B2B', 'Proposta Comercial'],
      level: 'Premium'
    },
    {
      title: 'Conteúdo',
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      count: '20 templates',
      description: 'Artigos, newsletters e materiais que educam',
      templates: ['Blog Post', 'Newsletter', 'E-book', 'Roteiro YouTube'],
      level: 'Gratuito + Premium'
    }
  ]

  const premiumFeatures = [
    {
      feature: 'Templates Exclusivos',
      description: 'Modelos únicos que só assinantes têm acesso',
      example: 'Scripts de vendas de consultores que faturam R$ 1M+/ano'
    },
    {
      feature: 'Variações Avançadas',
      description: 'Múltiplas versões do mesmo template',
      example: '5 versões diferentes de email de vendas para testar'
    },
    {
      feature: 'Templates Personalizáveis',
      description: 'Adapte templates para seu nicho específico',
      example: 'Template de anúncio especial para "academia feminina"'
    },
    {
      feature: 'Atualizações Semanais',
      description: 'Novos templates toda semana baseados em tendências',
      example: 'Template especial para Black Friday 2025'
    }
  ]

  const freeVsPremium = {
    free: [
      'Facebook Ads Básico',
      'Email Marketing Simples',
      'Post Instagram',
      'Título de Blog',
      'Descrição Produto Básica'
    ],
    premium: [
      'Scripts de Vendas Completos',
      'Sequência Email Avançada',
      'Funil de Vendas Completo',
      'Proposta B2B Profissional',
      'Landing Page Converter',
      'Email Carrinho Abandonado',
      'Roteiro YouTube Viral',
      'Newsletter Premium',
      'Cold Email que Funciona',
      'WhatsApp Business Pro'
    ]
  }

  const successStories = [
    {
      template: 'Script de Vendas Premium',
      user: 'Carlos Vendedor',
      result: 'Aumentou conversão de 15% para 45%',
      quote: '"O script premium me ensinou exatamente o que falar em cada etapa da venda"'
    },
    {
      template: 'Sequência Email Marketing',
      user: 'Ana Empreendedora',
      result: 'De 200 para 2.000 leads em 30 dias',
      quote: '"A sequência de emails premium é ouro puro! Meus leitores não conseguem parar de ler"'
    },
    {
      template: 'Landing Page Converter',
      user: 'Rafael Coach',
      result: 'Conversão subiu de 2% para 18%',
      quote: '"Minha landing page ficou profissional e agora converte absurdamente bem"'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Crown className="h-8 w-8 text-purple-600" />
                <span className="text-purple-600 font-semibold">Templates Premium</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Templates <span className="text-purple-600">Exclusivos</span> que Realmente Funcionam
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Não perca tempo criando do zero!</strong> Acesse mais de 65 templates testados por profissionais 
                que já geraram milhões em vendas. Templates que só assinantes premium têm acesso.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/registro">
                  <Button size="lg" className="flex items-center gap-2">
                    Acessar Templates Premium
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Templates Grátis
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                👑 O que você ganha com Premium:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">65+ templates exclusivos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Scripts de vendas profissionais</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Funis completos de conversão</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Templates atualizados semanalmente</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">Acesso antecipado a novidades</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explicação Simples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              🤔 Qual a diferença entre Templates Grátis e Premium?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">✅ Templates Grátis (Básicos):</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Para começar:</strong> Templates simples e fundamentais</li>
                  <li>• <strong>Estrutura básica:</strong> Funcionam, mas são genéricos</li>
                  <li>• <strong>5 templates principais:</strong> O suficiente para testar</li>
                  <li>• <strong>Atualizações mensais:</strong> Novidades de vez em quando</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-3">👑 Templates Premium (Profissionais):</h3>
                <ul className="text-purple-600 space-y-2">
                  <li>• <strong>Para vender sério:</strong> Templates de consultores top</li>
                  <li>• <strong>Altamente específicos:</strong> Para cada nicho e situação</li>
                  <li>• <strong>65+ templates únicos:</strong> Que só assinantes têm</li>
                  <li>• <strong>Atualizações semanais:</strong> Sempre com novidades</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
              <p className="text-yellow-800">
                <strong>💡 Resumindo:</strong> Templates grátis são como uma bicicleta - te levam ao destino. 
                Templates premium são como uma Ferrari - te levam muito mais rápido e com estilo! 🚗💨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Templates por Categoria
            </h2>
            <p className="text-xl text-gray-600">
              Para cada objetivo, temos o template perfeito
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templateCategories.map((category, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{category.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {category.title}
                        </h3>
                        <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Inclui:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {category.templates.map((template, i) => (
                            <div key={i} className="text-sm text-gray-600 bg-gray-100 rounded px-2 py-1">
                              {template}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          category.level.includes('Premium') 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {category.level}
                        </span>
                        <Button size="sm" variant="outline">
                          Ver Templates
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comparação: Grátis vs Premium
            </h2>
            <p className="text-xl text-gray-600">
              Veja exatamente o que você ganha em cada plano
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Templates */}
            <Card className="p-6">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-700">Templates Grátis</CardTitle>
                <CardDescription>Para começar e testar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {freeVsPremium.free.map((template, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-800 text-sm">{template}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full">
                    Usar Templates Grátis
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Premium Templates */}
            <Card className="p-6 border-2 border-purple-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  👑 Mais Popular
                </span>
              </div>
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-purple-700">Templates Premium</CardTitle>
                <CardDescription>Para quem quer resultados sérios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {freeVsPremium.premium.map((template, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
                      <Crown className="h-4 w-4 text-purple-500" />
                      <span className="text-purple-800 text-sm">{template}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Acessar Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que Torna os Templates Premium Especiais
            </h2>
            <p className="text-xl text-gray-600">
              Não é só quantidade, é qualidade e exclusividade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.feature}
                      </h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-sm text-purple-800">
                          <strong>💎 Exemplo:</strong> {feature.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados Reais com Templates Premium
            </h2>
            <p className="text-xl text-gray-600">
              Veja como nossos templates transformaram negócios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                      {story.user.charAt(0)}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">{story.user}</h3>
                    <p className="text-sm text-purple-600 mb-3">{story.template}</p>
                    
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-bold mb-4">
                      📈 {story.result}
                    </div>
                    
                    <blockquote className="text-gray-700 italic text-sm">
                      {story.quote}
                    </blockquote>
                    
                    <div className="flex justify-center mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Acessar Templates que Realmente Funcionam?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Pare de reinventar a roda! Use templates testados por profissionais que já geraram milhões.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registro">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Acessar Templates Premium
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Ver Templates Grátis
            </Button>
          </div>
          <p className="text-sm text-purple-200 mt-4">
            ✅ 7 dias grátis • ✅ 65+ templates exclusivos • ✅ Atualizações semanais
          </p>
        </div>
      </section>
    </div>
  )
}