import { Globe, Brain, Target, Zap, CheckCircle, Users, ArrowRight, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function IABrasileiraPage() {
  const comparisons = [
    {
      feature: 'Linguagem',
      other: 'Traduzida do inglês, soa artificial',
      copybr: 'Português brasileiro nativo, natural'
    },
    {
      feature: 'Cultura',
      other: 'Referências americanas/europeias',
      copybr: 'Black Friday, Dia das Mães, Copa do Mundo'
    },
    {
      feature: 'Gatilhos',
      other: 'Genéricos, não funcionam no Brasil',
      copybr: 'Específicos para o comportamento brasileiro'
    },
    {
      feature: 'Gírias',
      other: 'Não entende expressões brasileiras',
      copybr: '"Massa", "Top", "Arrasou" - como falamos'
    }
  ]

  const examples = [
    {
      title: 'IA Gringa (Traduzida)',
      text: 'Experimente nosso produto premium com desconto limitado.',
      problems: ['Formal demais', 'Sem emoção', 'Não conecta']
    },
    {
      title: 'Nossa IA Brasileira',
      text: '🔥 Testa aí nosso produto TOP! Desconto INSANO só hoje, meu amigo!',
      benefits: ['Natural', 'Emocional', 'Jeito brasileiro']
    }
  ]

  const features = [
    {
      title: 'Treinamento Brasileiro',
      description: 'Nossa IA foi alimentada com milhões de textos brasileiros reais: anúncios, emails, posts que realmente converteram no Brasil.',
      icon: <Brain className="h-8 w-8 text-purple-600" />
    },
    {
      title: 'Cultura Local',
      description: 'Entende nossas datas comemorativas, referencias culturais, way of life brasileiro. Não é só tradução!',
      icon: <Globe className="h-8 w-8 text-green-600" />
    },
    {
      title: 'Gatilhos Nacionais',
      description: 'Sabe o que faz o brasileiro comprar: urgência, prova social, autoridade - do jeito que funciona aqui.',
      icon: <Target className="h-8 w-8 text-red-600" />
    },
    {
      title: 'Linguagem Natural',
      description: 'Escreve como um copywriter brasileiro experiente. Com gírias, expressões e tom que o povo entende.',
      icon: <Users className="h-8 w-8 text-blue-600" />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="h-8 w-8 text-green-600" />
                <span className="text-green-600 font-semibold">IA Brasileira</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                A Primeira IA que <span className="text-green-600">Fala Brasileiro</span> de Verdade
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Chega de textos traduzidos que soam estranhos!</strong> Nossa IA foi criada do zero para entender a alma brasileira. 
                Ela escreve como um copywriter carioca, gaúcho, nordestino - como você quiser!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gerar">
                  <Button size="lg" className="flex items-center gap-2">
                    Testar IA Brasileira
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Comparação
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                🇧🇷 O que nossa IA entende sobre o Brasil:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Linguagem de cada região do país</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Datas comemorativas brasileiras</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Comportamento do consumidor nacional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Gírias e expressões populares</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Gatilhos mentais que funcionam aqui</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explicação Simples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4">
              🤔 Por que IA "Gringa" não funciona no Brasil?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">❌ Problemas das IAs Estrangeiras:</h3>
                <ul className="text-yellow-800 space-y-2">
                  <li>• <strong>Tradução literal:</strong> "Buy now" vira "Compre agora" (muito formal)</li>
                  <li>• <strong>Cultura diferente:</strong> Fala de Thanksgiving, não de Festa Junina</li>
                  <li>• <strong>Não entende gírias:</strong> Nunca vai falar "show de bola" natural</li>
                  <li>• <strong>Gatilhos errados:</strong> O que funciona nos EUA pode não funcionar aqui</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Nossa IA 100% Brasileira:</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Linguagem nativa:</strong> "Bora comprar" soa natural</li>
                  <li>• <strong>Cultura nacional:</strong> Black Friday, Copa, Carnaval</li>
                  <li>• <strong>Gírias regionais:</strong> "Massa" (NE), "Irado" (SP), "Barbaridade" (RS)</li>
                  <li>• <strong>Gatilhos brasileiros:</strong> O que realmente faz nosso povo comprar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Examples */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Veja a Diferença na Prática
            </h2>
            <p className="text-xl text-gray-600">
              Mesmo produto, duas abordagens completamente diferentes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {examples.map((example, index) => (
              <Card key={index} className={`p-6 ${index === 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <CardContent>
                  <h3 className={`text-lg font-semibold mb-4 ${index === 0 ? 'text-red-900' : 'text-green-900'}`}>
                    {example.title}
                  </h3>
                  <div className={`p-4 rounded-lg mb-4 ${index === 0 ? 'bg-white border border-red-200' : 'bg-white border border-green-200'}`}>
                    <p className="text-gray-800 font-medium italic">"{example.text}"</p>
                  </div>
                  {'problems' in example && (
                    <div>
                      <p className="text-red-800 font-medium mb-2">Problemas:</p>
                      <ul className="text-red-700 text-sm space-y-1">
                        {example.problems.map((problem, i) => (
                          <li key={i}>• {problem}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {'benefits' in example && (
                    <div>
                      <p className="text-green-800 font-medium mb-2">Por que funciona:</p>
                      <ul className="text-green-700 text-sm space-y-1">
                        {example.benefits.map((benefit, i) => (
                          <li key={i}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Comparação Detalhada: IA Gringa vs IA Brasileira
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Aspecto</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-red-700">❌ IA Gringa</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-green-700">✅ CopyBR</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comparison, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{comparison.feature}</td>
                      <td className="px-6 py-4 text-red-700">{comparison.other}</td>
                      <td className="px-6 py-4 text-green-700">{comparison.copybr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Criamos a IA Brasileira
            </h2>
            <p className="text-xl text-gray-600">
              Anos de pesquisa e desenvolvimento para entender o jeitinho brasileiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que dizem nossos usuários
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Impressionante como o CopyBR escreve natural! Meus anúncios ficaram com a cara do Brasil. 
                  Antes usava outras IAs e o texto parecia traduzido, agora parece que eu mesmo escrevi."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Rafael Silva</div>
                    <div className="text-gray-600 text-sm">Agência de Marketing, SP</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Nossa! Que diferença! A IA entende nossa cultura, usa gírias que fazem sentido, 
                  fala de Black Friday do jeito certo. Minhas vendas aumentaram muito!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Mariana Costa</div>
                    <div className="text-gray-600 text-sm">E-commerce de Moda, RJ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experimente a Diferença da IA Brasileira
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Teste grátis por 7 dias e veja como textos naturais convertem mais!
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Testar IA Brasileira Grátis
            </Button>
          </Link>
          <p className="text-sm text-green-200 mt-4">
            ✅ 7 dias grátis • ✅ Sem cartão • ✅ Textos 100% brasileiros
          </p>
        </div>
      </section>
    </div>
  )
}