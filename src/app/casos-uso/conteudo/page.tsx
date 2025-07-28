import { FileText, BookOpen, Users, TrendingUp, ArrowRight, CheckCircle, Star, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function ConteudoPage() {
  const contentTypes = [
    {
      title: 'Artigos de Blog',
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      description: 'Posts que educam e vendem ao mesmo tempo',
      examples: ['Como fazer...', 'X dicas para...', 'Guia completo de...'],
      result: '+300% tráfego orgânico'
    },
    {
      title: 'Newsletters',
      icon: <FileText className="h-8 w-8 text-green-600" />,
      description: 'Emails que seus leitores aguardam ansiosamente',
      examples: ['Novidades da semana', 'Dicas exclusivas', 'Bastidores'],
      result: '+180% taxa de abertura'
    },
    {
      title: 'Roteiros YouTube',
      icon: <Eye className="h-8 w-8 text-red-600" />,
      description: 'Scripts que prendem atenção do início ao fim',
      examples: ['Introduções marcantes', 'Narrativa envolvente', 'CTAs que convertem'],
      result: '+250% tempo de visualização'
    },
    {
      title: 'E-books Gratuitos',
      icon: <Users className="h-8 w-8 text-purple-600" />,
      description: 'Materiais ricos que captam milhares de leads',
      examples: ['Guias práticos', 'Checklists', 'Passo a passo'],
      result: '+400% captação de leads'
    }
  ]

  const beforeAfter = {
    before: {
      title: 'Dicas de Produtividade',
      content: 'Neste artigo, vamos abordar algumas estratégias de produtividade que podem ajudar profissionais a otimizar seu tempo e melhorar seus resultados...',
      problems: ['Chato', 'Genérico', 'Não prende atenção']
    },
    after: {
      title: '7 Segredos de Produtividade que Mudaram Minha Vida (O #4 Vai Te Chocar!)',
      content: 'Era 2h da manhã e eu ainda estava trabalhando... 😴\n\nSe você já passou por isso, este post vai TRANSFORMAR sua vida!\n\nDescobri 7 técnicas simples que me fizeram trabalhar 4 horas a menos e DOBRAR meus resultados...',
      benefits: ['Hook forte', 'Pessoal', 'Cria curiosidade', 'Promete transformação']
    }
  }

  const templates = [
    'Artigo de Blog Viral',
    'Newsletter Semanal',
    'Roteiro YouTube',
    'E-book Lead Magnet',
    'Post Educativo LinkedIn',
    'Thread Twitter',
    'Guia Passo a Passo',
    'Case Study Completo'
  ]

  const contentPillars = [
    {
      pillar: 'Educar',
      description: 'Ensine algo útil e valioso',
      example: '"Como fazer X em 5 passos"',
      icon: '🎓'
    },
    {
      pillar: 'Entreter',
      description: 'Divirta e prenda a atenção',
      example: '"A história hilária de quando..."',
      icon: '😄'
    },
    {
      pillar: 'Inspirar',
      description: 'Motive e emocione seu público',
      example: '"Como superei X e você também pode"',
      icon: '✨'
    },
    {
      pillar: 'Vender',
      description: 'Mostre valor e gere interesse',
      example: '"Por que nosso produto é diferente"',
      icon: '💰'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="h-8 w-8 text-orange-600" />
                <span className="text-orange-600 font-semibold">Criação de Conteúdo</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Conteúdo que <span className="text-orange-600">Educa</span> e Vende
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Pare de criar conteúdo que ninguém lê!</strong> Nossa IA cria artigos, newsletters, roteiros e materiais 
                que educam seu público e transformam leitores em clientes fiéis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gerar">
                  <Button size="lg" className="flex items-center gap-2">
                    Criar Conteúdo Agora
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Templates
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                📊 Resultados com Conteúdo de Qualidade:
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📈</div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">+400%</div>
                    <div className="text-gray-600">Mais leads qualificados</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">👀</div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">+300%</div>
                    <div className="text-gray-600">Tempo de leitura</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">+250%</div>
                    <div className="text-gray-600">Conversão em vendas</div>
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              🤔 Por que seu conteúdo não traz resultados?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Problemas comuns do conteúdo "normal":</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• <strong>Títulos chatos:</strong> "Dicas de marketing" não chama atenção</li>
                  <li>• <strong>Começo fraco:</strong> Leitores abandonam nos primeiros 10 segundos</li>
                  <li>• <strong>Muito técnico:</strong> Linguagem difícil que afasta pessoas</li>
                  <li>• <strong>Sem direcionamento:</strong> Não leva o leitor a nenhuma ação</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ O que nossa IA faz diferente:</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Títulos irresistíveis:</strong> "7 segredos que NINGUÉM conta"</li>
                  <li>• <strong>Hooks poderosos:</strong> Primeiras frases que prendem</li>
                  <li>• <strong>Linguagem simples:</strong> Qualquer pessoa entende</li>
                  <li>• <strong>CTAs estratégicos:</strong> Guia para a próxima ação</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tipos de Conteúdo que Realmente Funcionam
            </h2>
            <p className="text-xl text-gray-600">
              Para cada objetivo, o formato perfeito
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contentTypes.map((type, index) => (
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
                        <p className="text-sm font-medium text-gray-700 mb-2">Exemplos:</p>
                        <div className="space-y-1">
                          {type.examples.map((example, i) => (
                            <div key={i} className="text-sm text-gray-600 bg-gray-100 rounded px-2 py-1 inline-block mr-2">
                              {example}
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
              A Diferença Entre Conteúdo Comum e Conteúdo que Vende
            </h2>
            <p className="text-xl text-gray-600">
              Mesmo assunto, resultados completamente diferentes
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Before */}
              <div className="p-8 bg-red-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    😴
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-red-900">
                    Conteúdo "Normal" (Que Ninguém Lê)
                  </h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-red-200 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{beforeAfter.before.title}</h4>
                  <p className="text-gray-700 text-sm">{beforeAfter.before.content}</p>
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
                    🔥
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-green-900">
                    Com CopyBR (Que Viraliza!)
                  </h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{beforeAfter.after.title}</h4>
                  <p className="text-gray-700 text-sm whitespace-pre-line">{beforeAfter.after.content}</p>
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

      {/* Content Pillars */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Os 4 Pilares do Conteúdo de Sucesso
            </h2>
            <p className="text-xl text-gray-600">
              Todo bom conteúdo deve fazer pelo menos uma dessas coisas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentPillars.map((pillar, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {pillar.pillar}
                  </h3>
                  <p className="text-gray-600 mb-4">{pillar.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800 italic">
                      {pillar.example}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Criar Conteúdo Profissional em Minutos
            </h2>
            <p className="text-xl text-gray-600">
              Mesmo sem experiência em escrita
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Escolha o Tipo de Conteúdo
                </h3>
                <p className="text-gray-600">
                  Artigo de blog? Newsletter? Roteiro de vídeo? 
                  Cada tipo tem seu template específico otimizado para resultados.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Diga o Assunto Principal
                </h3>
                <p className="text-gray-600">
                  "Dicas de produtividade", "Como economizar dinheiro", "Tendências de moda"... 
                  Nossa IA transforma qualquer assunto em conteúdo viral.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Publique e Colha Resultados
                </h3>
                <p className="text-gray-600">
                  Conteúdo pronto com título irresistível, introdução que prende 
                  e chamadas para ação que convertem. Só publicar!
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
              Templates para Cada Tipo de Conteúdo
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 25 modelos testados e aprovados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
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
                  "Meu blog estava parado há meses. Com o CopyBR, criei 10 artigos em uma semana! 
                  O tráfego orgânico aumentou 400% e já captei mais de 500 leads novos. Incrível!"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Thiago Oliveira</div>
                    <div className="text-gray-600">Coach de Produtividade</div>
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">
                    +400% tráfego
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Criar Conteúdo que Converte?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Pare de lutar para escrever. Nossa IA cria conteúdo profissional em minutos!
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Começar a Criar Conteúdo
            </Button>
          </Link>
          <p className="text-sm text-orange-200 mt-4">
            ✅ 7 dias grátis • ✅ Todos os templates • ✅ Conteúdo que realmente funciona
          </p>
        </div>
      </section>
    </div>
  )
}