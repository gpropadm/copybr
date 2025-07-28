import { Target, Phone, Mail, MessageCircle, ArrowRight, CheckCircle, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function VendasPage() {
  const salesTypes = [
    {
      title: 'Scripts de Vendas por Telefone',
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      description: 'Scripts que convertem ligações em vendas',
      techniques: ['Abertura que prende', 'Objeções pré-programadas', 'Fechamento assertivo'],
      result: '+180% conversão em calls'
    },
    {
      title: 'Emails de Vendas',
      icon: <Mail className="h-8 w-8 text-green-600" />,
      description: 'Sequências que educam e vendem',
      techniques: ['Subject lines irresistíveis', 'Storytelling vendedor', 'CTAs persuasivos'],
      result: '+250% taxa de resposta'
    },
    {
      title: 'Mensagens WhatsApp',
      icon: <MessageCircle className="h-8 w-8 text-purple-600" />,
      description: 'Conversas que fluem naturalmente para venda',
      techniques: ['Abordagem não invasiva', 'Rapport via texto', 'Fechamento casual'],
      result: '+320% conversão WhatsApp'
    },
    {
      title: 'Propostas Comerciais',
      icon: <Target className="h-8 w-8 text-red-600" />,
      description: 'Documentos que vendem sozinhos',
      techniques: ['Diagnóstico do problema', 'Solução irrefutável', 'Valor justificado'],
      result: '+150% aprovação propostas'
    }
  ]

  const salesFunnel = [
    {
      stage: 'Atenção',
      description: 'Chamar atenção do prospect',
      example: '"João, descobri algo que pode resolver definitivamente o problema X da sua empresa..."',
      goal: 'Fazer parar e ouvir'
    },
    {
      stage: 'Interesse',
      description: 'Despertar curiosidade e interesse',
      example: '"Sabe por que 97% das empresas do seu setor falham nisso? Tem 3 erros principais que..."',
      goal: 'Criar curiosidade'
    },
    {
      stage: 'Desejo',
      description: 'Mostrar benefícios e criar desejo',
      example: '"Imagine economizar 40% do tempo que você gasta com X, tendo resultados 200% melhores..."',
      goal: 'Plantar o sonho'
    },
    {
      stage: 'Ação',
      description: 'Guiar para decisão de compra',
      example: '"O que precisa acontecer para começarmos ainda esta semana?"',
      goal: 'Fechar a venda'
    }
  ]

  const beforeAfter = {
    before: {
      approach: 'Oi, tudo bem? Somos da empresa X e gostaríamos de apresentar nossa solução Y para sua empresa...',
      problems: ['Muito comercial', 'Foco no produto', 'Não desperta interesse', 'Soa como spam']
    },
    after: {
      approach: 'João, vi que vocês cresceram 150% este ano (parabéns! 🎉). Uma dúvida: como vocês estão lidando com [problema específico do setor]? Pergunto porque ajudei 3 empresas similares a resolver isso...',
      benefits: ['Personalizado', 'Foco no cliente', 'Cria curiosidade', 'Estabelece autoridade']
    }
  }

  const objections = [
    {
      objection: '"Não tenho orçamento"',
      response: '"Entendo perfeitamente. Também pensei assim até descobrir que estava PERDENDO dinheiro por não ter isso. Posso te mostrar como em 2 minutos?"'
    },
    {
      objection: '"Preciso pensar"',
      response: '"Claro! Qual parte específica você gostaria de analisar melhor? O investimento, a implementação ou os resultados esperados?"'
    },
    {
      objection: '"Já temos um fornecedor"',
      response: '"Perfeito! Significa que você conhece a importância disso. Me permite uma pergunta: se eu conseguisse te entregar 50% mais resultado pelo mesmo investimento, valeria uma conversa?"'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Target className="h-8 w-8 text-red-600" />
                <span className="text-red-600 font-semibold">Scripts de Vendas</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Scripts que <span className="text-red-600">Fecham Vendas</span> de Verdade
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Chega de ficar sem palavras na hora de vender!</strong> Nossa IA cria scripts profissionais 
                que sabem exatamente o que falar para converter prospects em clientes pagantes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gerar">
                  <Button size="lg" className="flex items-center gap-2">
                    Criar Script de Vendas
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Scripts Prontos
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                💰 Resultados dos nossos vendedores:
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">+180%</div>
                    <div className="text-gray-600">Conversão em calls</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">💌</div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">+250%</div>
                    <div className="text-gray-600">Resposta em emails</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">+320%</div>
                    <div className="text-gray-600">Fechamento WhatsApp</div>
                  </div>
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
              🤷‍♂️ Por que você perde vendas mesmo tendo um bom produto?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Problemas que sabotam suas vendas:</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• <strong>Não sabe como começar:</strong> "Oi, tudo bem?" não vende nada</li>
                  <li>• <strong>Fala só do produto:</strong> Cliente quer saber o que ganha, não o que é</li>
                  <li>• <strong>Não trata objeções:</strong> "Vou pensar" = venda perdida</li>
                  <li>• <strong>Não fecha a venda:</strong> Fica "enrolando" e não pede o sim</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Como nossos scripts resolvem:</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Aberturas magnéticas:</strong> Prendem atenção nos primeiros 10 segundos</li>
                  <li>• <strong>Foco em benefícios:</strong> "Isso vai te economizar 5 horas por semana"</li>
                  <li>• <strong>Objeções pré-programadas:</strong> Resposta pronta para cada "não"</li>
                  <li>• <strong>Fechamentos assertivos:</strong> Técnicas que levam ao "sim"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Scripts para Cada Canal de Vendas
            </h2>
            <p className="text-xl text-gray-600">
              Telefone, email, WhatsApp ou presencial - temos o script perfeito
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {salesTypes.map((type, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{type.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{type.description}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Inclui:</p>
                        <div className="space-y-1">
                          {type.techniques.map((technique, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {technique}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                        📈 {type.result}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Example */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A Diferença Entre Abordagem Amadora e Profissional
            </h2>
            <p className="text-xl text-gray-600">
              Veja por que uns vendem e outros não
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Before */}
              <div className="p-8 bg-red-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ❌
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-red-900">
                    Abordagem Amadora (Não vende)
                  </h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-red-200 mb-4">
                  <div className="mb-2 text-sm text-gray-500">📞 Ligação de vendas:</div>
                  <p className="text-gray-700 italic">"{beforeAfter.before.approach}"</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-red-800">Por que não funciona:</p>
                  {beforeAfter.before.problems.map((problem, i) => (
                    <div key={i} className="text-sm text-red-700">• {problem}</div>
                  ))}
                </div>
              </div>
              
              {/* After */}
              <div className="p-8 bg-green-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ✅
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-green-900">
                    Script Profissional (Que fecha!)
                  </h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                  <div className="mb-2 text-sm text-gray-500">📞 Com script CopyBR:</div>
                  <p className="text-gray-700">{beforeAfter.after.approach}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-800">Por que funciona:</p>
                  {beforeAfter.after.benefits.map((benefit, i) => (
                    <div key={i} className="text-sm text-green-700">• {benefit}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Funnel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Os 4 Passos de Todo Script que Vende
            </h2>
            <p className="text-xl text-gray-600">
              Fórmula AIDA adaptada para o mercado brasileiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {salesFunnel.map((step, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.stage}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{step.description}</p>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-blue-800 italic">
                      "{step.example}"
                    </p>
                  </div>
                  
                  <div className="text-sm font-medium text-red-600">
                    🎯 {step.goal}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Objections Handling */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Responder as 3 Objeções Mais Comuns
            </h2>
            <p className="text-xl text-gray-600">
              Transforme cada "não" em uma oportunidade de venda
            </p>
          </div>
          
          <div className="space-y-6">
            {objections.map((item, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">
                        😕 Objeção do Cliente:
                      </h4>
                      <p className="text-red-800 italic">{item.objection}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">
                        💡 Resposta que Funciona:
                      </h4>
                      <p className="text-green-800">{item.response}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Criar Seu Script de Vendas Perfeito
            </h2>
            <p className="text-xl text-gray-600">
              Em 3 passos simples você tem um script profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Descreva seu Produto/Serviço
                </h3>
                <p className="text-gray-600">
                  Conte o que você vende, qual problema resolve e para quem. 
                  <strong>Exemplo:</strong> "Curso de inglês online para profissionais"
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Escolha o Canal de Vendas
                </h3>
                <p className="text-gray-600">
                  WhatsApp? Telefone? Email? Presencial? 
                  Cada canal tem técnicas específicas que nossa IA domina.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Use e Feche Mais Vendas
                </h3>
                <p className="text-gray-600">
                  Script completo com abertura, desenvolvimento, tratamento de objeções 
                  e fechamento. Só seguir o roteiro! 🎯
                </p>
              </CardContent>
            </Card>
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
                  "Eu era péssimo em vendas. Com os scripts do CopyBR, minha conversão subiu de 5% para 35%! 
                  Agora tenho confiança para ligar para qualquer prospect. Os scripts realmente funcionam!"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Roberto Lima</div>
                    <div className="text-gray-600">Vendedor de Software B2B</div>
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    5% → 35% conversão
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Fechar Mais Vendas?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Pare de perder vendas por falta de argumentos. Tenha scripts profissionais que realmente convertem!
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Criar Meu Script de Vendas
            </Button>
          </Link>
          <p className="text-sm text-red-200 mt-4">
            ✅ 7 dias grátis • ✅ Scripts para todos os canais • ✅ Resultados garantidos
          </p>
        </div>
      </section>
    </div>
  )
}