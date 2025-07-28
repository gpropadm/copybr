import { BarChart3, TrendingUp, Eye, Target, ArrowRight, CheckCircle, Star, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'Performance dos Copies',
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      description: 'Veja quais textos performam melhor',
      features: ['Taxa de cliques', 'Conversões', 'Tempo de leitura', 'Compartilhamentos'],
      benefit: 'Foque nos copies que realmente vendem'
    },
    {
      title: 'Análise de Engajamento',
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      description: 'Métricas de como seu público interage',
      features: ['Curtidas', 'Comentários', 'Saves', 'Shares'],
      benefit: 'Entenda o que seu público ama'
    },
    {
      title: 'ROI dos Templates',
      icon: <Target className="h-8 w-8 text-purple-600" />,
      description: 'Quais templates geram mais resultado',
      features: ['Vendas por template', 'Custo por conversão', 'Lifetime value', 'ROAS'],
      benefit: 'Invista nos templates certos'
    },
    {
      title: 'Tendências e Insights',
      icon: <Activity className="h-8 w-8 text-orange-600" />,
      description: 'Padrões e oportunidades de melhoria',
      features: ['Palavras-chave top', 'Horários ideais', 'Formatos que funcionam', 'Previsões'],
      benefit: 'Antecipe-se às tendências'
    }
  ]

  const dashboardFeatures = [
    {
      feature: 'Dashboard em Tempo Real',
      description: 'Veja resultados dos seus copies ao vivo',
      example: 'Post publicado há 1 hora já mostra 127 curtidas e 15 comentários'
    },
    {
      feature: 'Relatórios Automáticos',
      description: 'Receba resumos semanais e mensais por email',
      example: 'Todo domingo você recebe: "Seus 3 melhores copies da semana"'
    },
    {
      feature: 'Comparação A/B',
      description: 'Compare diferentes versões do mesmo copy',
      example: 'Versão A: 2.3% cliques / Versão B: 4.7% cliques - B ganhou!'
    },
    {
      feature: 'Alertas Inteligentes',
      description: 'Notificações quando algo importante acontece',
      example: 'Seu copy está bombando! +500% de engajamento nas últimas 2h'
    }
  ]

  const beforeAfter = {
    before: {
      situation: 'Sem Analytics (No escuro)',
      problems: [
        'Não sabe qual copy funciona melhor',
        'Posta e torce para dar certo',
        'Repete os mesmos erros',
        'Desperdiça tempo com textos ruins'
      ],
      result: 'Resultado: Crescimento lento e inconsistente'
    },
    after: {
      situation: 'Com Analytics CopyBR (Decisões baseadas em dados)',
      benefits: [
        'Sabe exatamente o que funciona',
        'Posta com confiança baseada em dados',
        'Melhora continuamente',
        'Foca só no que dá resultado'
      ],
      result: 'Resultado: Crescimento acelerado e previsível'
    }
  }

  const reportTypes = [
    {
      type: 'Relatório de Performance',
      frequency: 'Semanal',
      content: 'Top 5 copies, métricas de engajamento, sugestões de melhoria',
      audience: 'Criadores de conteúdo'
    },
    {
      type: 'Análise de ROI',
      frequency: 'Mensal',
      content: 'Retorno sobre investimento, custo por conversão, lifetime value',
      audience: 'Gestores e empreendedores'
    },
    {
      type: 'Insights de Tendências',
      frequency: 'Quinzenal',
      content: 'Palavras em alta, formatos populares, oportunidades de mercado',
      audience: 'Estrategistas de marketing'
    },
    {
      type: 'Relatório Executivo',
      frequency: 'Trimestral',
      content: 'Visão estratégica, crescimento, comparação com mercado',
      audience: 'Diretores e C-level'
    }
  ]

  const integrations = [
    { platform: 'Google Analytics', icon: '📊', status: 'Conectado' },
    { platform: 'Facebook Ads', icon: '📘', status: 'Conectado' },
    { platform: 'Instagram Insights', icon: '📸', status: 'Conectado' },
    { platform: 'LinkedIn Analytics', icon: '💼', status: 'Conectado' },
    { platform: 'Google Ads', icon: '🎯', status: 'Conectado' },
    { platform: 'Email Marketing', icon: '📧', status: 'Conectado' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <span className="text-green-600 font-semibold">Analytics & Métricas</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Descubra <span className="text-green-600">Quais Copies</span> Realmente Funcionam
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Pare de adivinhar!</strong> Nosso sistema de analytics mostra exatamente quais textos geram mais 
                resultado, quando postar e como melhorar. Decisões baseadas em dados, não no "achismo".
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/registro">
                  <Button size="lg" className="flex items-center gap-2">
                    Ver Meus Analytics
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Demo Gratuita
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                📊 Com Analytics você descobre:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Qual copy teve 300% mais cliques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Melhor horário para postar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Palavras que mais convertem</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">ROI real de cada template</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Tendências do seu nicho</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explicação Simples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">
              🤷‍♂️ Por que você precisa de Analytics no seu Copy?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ {beforeAfter.before.situation}:</h3>
                <ul className="text-red-800 space-y-2">
                  {beforeAfter.before.problems.map((problem, i) => (
                    <li key={i}>• {problem}</li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-red-100 rounded">
                  <p className="text-red-800 font-medium">{beforeAfter.before.result}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ {beforeAfter.after.situation}:</h3>
                <ul className="text-green-800 space-y-2">
                  {beforeAfter.after.benefits.map((benefit, i) => (
                    <li key={i}>• {benefit}</li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-green-800 font-medium">{beforeAfter.after.result}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-blue-800">
                <strong>💡 Resumindo:</strong> Analytics é como ter um GPS para seus textos - em vez de andar perdido, 
                você sabe exatamente qual caminho te leva ao sucesso! 🗺️✨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4 Tipos de Métricas que Mudaram o Jogo
            </h2>
            <p className="text-xl text-gray-600">
              Cada métrica te conta uma história diferente sobre seus copies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{metric.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {metric.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{metric.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Inclui:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {metric.features.map((feature, i) => (
                            <div key={i} className="text-sm text-gray-600 bg-gray-100 rounded px-2 py-1">
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>🎯 Resultado:</strong> {metric.benefit}
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

      {/* Dashboard Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dashboard que Realmente Ajuda
            </h2>
            <p className="text-xl text-gray-600">
              Informações claras e acionáveis, não números confusos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dashboardFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.feature}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-green-800 text-sm">
                      <strong>💡 Exemplo:</strong> {feature.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Relatórios Personalizados por Perfil
            </h2>
            <p className="text-xl text-gray-600">
              Cada pessoa precisa de informações diferentes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportTypes.map((report, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {report.type}
                  </h3>
                  <div className="text-blue-600 font-medium mb-3">{report.frequency}</div>
                  <p className="text-gray-600 text-sm mb-4">{report.content}</p>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                    Para: {report.audience}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Integração com Suas Ferramentas Favoritas
            </h2>
            <p className="text-xl text-gray-600">
              Dados de todas as plataformas em um só lugar
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {integrations.map((integration, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{integration.icon}</div>
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{integration.platform}</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {integration.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Conectamos automaticamente com suas plataformas para trazer todos os dados em tempo real
              </p>
              <Button variant="outline">
                Ver Todas as Integrações
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Começar com Analytics
            </h2>
            <p className="text-xl text-gray-600">
              3 passos simples para decisões baseadas em dados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Conecte suas Contas
                </h3>
                <p className="text-gray-600">
                  Facebook, Instagram, Google Ads... Conectamos com todas suas plataformas 
                  em poucos cliques. Processo super simples.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Aguarde a Mágica
                </h3>
                <p className="text-gray-600">
                  Nossa IA analisa todos os seus dados e identifica padrões, 
                  tendências e oportunidades que você não viu.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Receba Insights Acionáveis
                </h3>
                <p className="text-gray-600">
                  Relatórios claros, sugestões práticas e alertas importantes. 
                  Você sabe exatamente o que fazer para melhorar! 🎯
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
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
                  "Com o Analytics do CopyBR descobri que meus posts funcionavam 3x melhor às 19h do que às 9h. 
                  Mudei minha estratégia e o engajamento explodiu! Agora sei exatamente quando e o que postar."
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Paula Marketing</div>
                    <div className="text-gray-600">Gestora de Redes Sociais</div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    +300% engajamento
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Decisões Baseadas em Dados?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Pare de adivinhar! Descubra exatamente o que funciona e multiplique seus resultados.
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Ver Meus Analytics
            </Button>
          </Link>
          <p className="text-sm text-green-200 mt-4">
            ✅ 7 dias grátis • ✅ Integração automática • ✅ Relatórios personalizados
          </p>
        </div>
      </section>
    </div>
  )
}