import { Headphones, Clock, Users, Zap, ArrowRight, CheckCircle, Star, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function SuportePage() {
  const supportTiers = [
    {
      tier: 'Suporte Email',
      plan: 'Plano Gratuito',
      response: '24-48 horas',
      availability: 'Segunda a Sexta',
      features: ['FAQ completo', 'Tutoriais em vídeo', 'Documentação', 'Email suporte'],
      color: 'bg-gray-100 text-gray-800'
    },
    {
      tier: 'Suporte Prioritário',
      plan: 'Plano Pro',
      response: '2-4 horas',
      availability: 'Segunda a Sábado',
      features: ['Tudo do Email +', 'Chat ao vivo', 'Resposta prioritária', 'Suporte fins de semana'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      tier: 'Suporte VIP',
      plan: 'Plano Premium',
      response: '< 1 hora',
      availability: '24/7 todos os dias',
      features: ['Tudo do Prioritário +', 'WhatsApp direto', 'Consultoria personalizada', 'Treinamento individual'],
      color: 'bg-purple-100 text-purple-800'
    }
  ]

  const supportChannels = [
    {
      channel: 'Chat ao Vivo',
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      description: 'Fale conosco em tempo real durante horário comercial',
      availability: 'Seg-Sex 9h às 18h',
      responseTime: 'Imediato',
      bestFor: 'Dúvidas rápidas e problemas urgentes'
    },
    {
      channel: 'WhatsApp VIP',
      icon: <Zap className="h-8 w-8 text-green-600" />,
      description: 'Linha direta com nosso time para clientes Premium',
      availability: '24/7',
      responseTime: '< 30 minutos',
      bestFor: 'Suporte premium e consultoria'
    },
    {
      channel: 'Email Suporte',
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      description: 'Envie sua dúvida detalhada e receba resposta completa',
      availability: 'Sempre disponível',
      responseTime: '2-24 horas',
      bestFor: 'Problemas complexos e solicitações detalhadas'
    },
    {
      channel: 'Central de Ajuda',
      icon: <Users className="h-8 w-8 text-orange-600" />,
      description: 'Biblioteca completa de tutoriais e respostas',
      availability: '24/7',
      responseTime: 'Instantâneo',
      bestFor: 'Aprender a usar melhor a plataforma'
    }
  ]

  const commonQuestions = [
    {
      question: 'Como melhorar a qualidade dos meus copies?',
      category: 'Uso da Plataforma',
      answer: 'Seja específico na descrição, use exemplos do seu público e teste diferentes templates.'
    },
    {
      question: 'Posso usar os copies comercialmente?',
      category: 'Licença',
      answer: 'Sim! Todos os textos gerados são 100% seus para uso comercial sem restrições.'
    },
    {
      question: 'Como cancelar minha assinatura?',
      category: 'Billing',
      answer: 'No dashboard, vá em "Configurações" > "Assinatura" > "Cancelar". Processo super simples.'
    },
    {
      question: 'A IA entende meu nicho específico?',
      category: 'IA',
      answer: 'Sim! Nossa IA foi treinada em milhares de nichos. Quanto mais específico você for, melhor o resultado.'
    }
  ]

  const helpResources = [
    {
      resource: 'Video Tutoriais',
      description: 'Aprenda assistindo: passo a passo de todas as funcionalidades',
      count: '50+ vídeos',
      duration: '2-5 min cada'
    },
    {
      resource: 'Guias Escritos',
      description: 'Documentação completa com prints e exemplos práticos',
      count: '100+ guias',
      duration: 'Leitura rápida'
    },
    {
      resource: 'Templates de Exemplo',
      description: 'Veja como usar cada template com exemplos reais',
      count: '200+ exemplos',
      duration: 'Referência'
    },
    {
      resource: 'Webinars ao Vivo',
      description: 'Sessões semanais de perguntas e respostas',
      count: 'Toda quinta',
      duration: '1 hora'
    }
  ]

  const testimonials = [
    {
      name: 'João Silva',
      role: 'Empreendedor Digital',
      quote: 'O suporte do CopyBR é impressionante! Respondem super rápido e sempre com soluções práticas.',
      rating: 5,
      response: '15 minutos'
    },
    {
      name: 'Maria Santos',
      role: 'Agência de Marketing',
      quote: 'Nunca vi um suporte tão humanizado. Eles realmente se importam em resolver nossos problemas.',
      rating: 5,
      response: '30 minutos'
    },
    {
      name: 'Pedro Oliveira',
      role: 'E-commerce',
      quote: 'Suporte via WhatsApp é genial! Consigo resolver qualquer dúvida na hora, direto do celular.',
      rating: 5,
      response: '45 minutos'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Headphones className="h-8 w-8 text-indigo-600" />
                <span className="text-indigo-600 font-semibold">Suporte Premium</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Suporte que <span className="text-indigo-600">Realmente</span> te Ajuda
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Esquece aqueles suportes robôs!</strong> Nossa equipe brasileira está aqui para te ajudar de verdade. 
                Seja por chat, WhatsApp ou email - sempre com soluções rápidas e na linguagem que você entende.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex items-center gap-2">
                  Falar com Suporte
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Central de Ajuda
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                💯 Por que nosso suporte é diferente:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Equipe 100% brasileira</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Resposta em português claro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Horário comercial brasileiro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">WhatsApp direto (Premium)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Soluções práticas, não enrolação</span>
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
              🤯 Qual a diferença do nosso suporte para os outros?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Suporte tradicional (que você odeia):</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• <strong>Chatbot irritante:</strong> "Digite 1 para isso, 2 para aquilo"</li>
                  <li>• <strong>Respostas prontas:</strong> Copy e paste que não resolve nada</li>
                  <li>• <strong>Demora infinita:</strong> "Aguarde, você é o número 47 da fila"</li>
                  <li>• <strong>Não entende seu problema:</strong> Te transfere 5 vezes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Nosso suporte (que você vai amar):</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Pessoa real:</strong> Conversa normal, como se fosse um amigo</li>
                  <li>• <strong>Solução personalizada:</strong> Para o SEU problema específico</li>
                  <li>• <strong>Resposta rápida:</strong> Máximo 24h, geralmente em 2h</li>
                  <li>• <strong>Entende seu contexto:</strong> Sabe quem você é e seu histórico</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
              <p className="text-yellow-800">
                <strong>💡 Resumindo:</strong> Nosso suporte é como ter um amigo especialista que está sempre 
                disposto a te ajudar, sem enrolação e na linguagem que você entende! 🤝
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Suporte para Cada Plano
            </h2>
            <p className="text-xl text-gray-600">
              Quanto mais você investe, melhor é o atendimento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTiers.map((tier, index) => (
              <Card key={index} className={`p-6 ${index === 2 ? 'border-2 border-purple-200 relative' : ''}`}>
                {index === 2 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      👑 VIP
                    </span>
                  </div>
                )}
                
                <CardContent className="text-center pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.tier}</h3>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full mb-4 ${tier.color}`}>
                    {tier.plan}
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900">{tier.response}</div>
                    <div className="text-sm text-gray-600">Tempo de resposta</div>
                  </div>
                  
                  <div className="text-gray-600 mb-6">{tier.availability}</div>
                  
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4 Formas de Falar Conosco
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o canal que preferir - estamos em todos!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{channel.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {channel.channel}
                      </h3>
                      <p className="text-gray-600 mb-4">{channel.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700">Disponível:</div>
                          <div className="text-gray-600">{channel.availability}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Resposta:</div>
                          <div className="text-gray-600">{channel.responseTime}</div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>🎯 Ideal para:</strong> {channel.bestFor}
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

      {/* Common Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Mais Comuns
            </h2>
            <p className="text-xl text-gray-600">
              Talvez sua dúvida já tenha resposta aqui!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonQuestions.map((item, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex-1">{item.question}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-3">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Ver Todas as Perguntas
            </Button>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Central de Ajuda Completa
            </h2>
            <p className="text-xl text-gray-600">
              Aprenda a usar o CopyBR como um profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpResources.map((resource, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.resource}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-blue-600 font-medium">{resource.count}</div>
                    <div className="text-gray-500 text-xs">{resource.duration}</div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-4">
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que nossos usuários falam do suporte
            </h2>
            <p className="text-xl text-gray-600">
              Avaliação média: 4.9/5 ⭐ em mais de 1000 atendimentos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 italic mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                        <div className="text-gray-600 text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mt-3">
                      Resposta em {testimonial.response}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de Ajuda? Estamos Aqui!
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Nossa equipe brasileira está pronta para te ajudar. Sem robôs, sem enrolação, só soluções!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
              Falar com Suporte
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
              Central de Ajuda
            </Button>
          </div>
          <p className="text-sm text-indigo-200 mt-4">
            ✅ Resposta rápida • ✅ Equipe brasileira • ✅ Solução garantida
          </p>
        </div>
      </section>
    </div>
  )
}