import { Megaphone, Target, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function MarketingDigitalPage() {
  const useCases = [
    {
      title: 'Anúncios Facebook e Instagram',
      description: 'Copies que convertem em campanhas pagas',
      results: '+300% CTR médio',
      icon: <Target className="h-8 w-8 text-blue-600" />
    },
    {
      title: 'Google Ads',
      description: 'Headlines e descrições que reduzem CPC',
      results: '-40% custo por clique',
      icon: <TrendingUp className="h-8 w-8 text-green-600" />
    },
    {
      title: 'Email Marketing',
      description: 'Campanhas que aumentam engajamento',
      results: '+250% taxa de abertura',
      icon: <Users className="h-8 w-8 text-purple-600" />
    }
  ]

  const templates = [
    'Anúncio Facebook/Instagram',
    'Google Ads Headlines',
    'Email de Promoção',
    'Copy para LinkedIn Ads',
    'Anúncio YouTube',
    'Email de Carrinho Abandonado',
    'Retargeting Ads',
    'Copy para Stories'
  ]

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Gerente de Marketing Digital',
      company: 'E-commerce Fashion',
      quote: 'O CopyBR revolucionou nossa estratégia de anúncios. Nosso ROAS aumentou 180% em 3 meses.',
      results: '+180% ROAS'
    },
    {
      name: 'Carlos Santos',
      role: 'Fundador',
      company: 'Agência Growth',
      quote: 'Conseguimos reduzir o tempo de criação de copies em 70% mantendo a qualidade alta.',
      results: '-70% tempo'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Megaphone className="h-8 w-8 text-red-600" />
                <span className="text-red-600 font-semibold">Marketing Digital</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Copies que <span className="text-red-600">Convertem</span> em Vendas
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Crie anúncios, emails e campanhas que realmente vendem. 
                Nossa IA especializada em marketing brasileiro entende seu público e gera textos que convertem.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gerar">
                  <Button size="lg" className="flex items-center gap-2">
                    Criar Copy Agora
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Templates
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Resultados Reais de Clientes
              </h3>
              <div className="space-y-4">
                {useCases.map((useCase, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{useCase.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{useCase.title}</h4>
                      <p className="text-gray-600 text-sm">{useCase.description}</p>
                      <p className="text-green-600 font-semibold text-sm">{useCase.results}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que usar IA para Marketing Digital?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa IA foi treinada com milhares de campanhas brasileiras de sucesso
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Foco no Brasileiro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Linguagem, cultura e gatilhos mentais específicos do público brasileiro. 
                  Não é tradução, é criação nativa.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Performance Comprovada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Baseado em campanhas reais que geraram milhões em vendas. 
                  Cada template é testado e otimizado.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Para Todos os Nichos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  E-commerce, serviços, infoprodutos, B2B. 
                  Templates específicos para cada segmento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Templates de Marketing Digital
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 25 templates específicos para suas campanhas
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
          
          <div className="text-center mt-8">
            <Link href="/templates">
              <Button size="lg" variant="outline">
                Ver Todos os Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados dos Nossos Clientes
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role} • {testimonial.company}</div>
                    </div>
                    <div className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      {testimonial.results}
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para revolucionar seu marketing?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Comece a criar copies que convertem em segundos. Teste grátis por 7 dias.
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Começar Teste Grátis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}