import { Briefcase, Users, FileText, BarChart3, ArrowRight, CheckCircle, Star, Building } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function EmpresarialPage() {
  const businessTypes = [
    {
      title: 'Comunicação Interna',
      icon: <Users className="h-8 w-8 text-blue-600" />,
      description: 'Emails, avisos e comunicados que os funcionários realmente leem',
      examples: ['Email de mudança de processo', 'Aviso de reunião', 'Comunicado da direção'],
      result: '+200% engajamento interno'
    },
    {
      title: 'Relatórios Executivos',
      icon: <FileText className="h-8 w-8 text-green-600" />,
      description: 'Relatórios claros que facilitam tomada de decisão',
      examples: ['Relatório mensal de vendas', 'Análise de performance', 'Status de projeto'],
      result: '+150% agilidade nas decisões'
    },
    {
      title: 'Apresentações Corporativas',
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      description: 'Slides que mantêm a audiência acordada e engajada',
      examples: ['Pitch para investidores', 'Reunião de resultados', 'Treinamento de equipe'],
      result: '+180% aprovação de projetos'
    },
    {
      title: 'Comunicação Externa',
      icon: <Building className="h-8 w-8 text-red-600" />,
      description: 'Mensagens profissionais para clientes e parceiros',
      examples: ['Email para cliente', 'Proposta de parceria', 'Comunicado de imprensa'],
      result: '+120% resposta positiva'
    }
  ]

  const beforeAfter = {
    before: {
      title: 'Comunicado: Nova Política de Home Office',
      content: 'Informamos que a partir de segunda-feira, dia 15/01, haverá mudanças na política de trabalho remoto conforme diretrizes da diretoria...',
      problems: ['Linguagem muito formal', 'Começo chato', 'Não explica o \"porquê\"', 'Funcionários não se importam']
    },
    after: {
      title: '🏠 Novidade que vocês pediram: Home Office mais flexível!',
      content: 'Pessoal, vocês pediram e a gente ouviu! 🎉\n\nLembram da pesquisa onde 87% de vocês queriam mais flexibilidade? Pois então...\n\nA partir de segunda (15/01), teremos uma nova política de home office que vai facilitar muito a vida de todo mundo:\n\n✅ 3 dias de home office por semana\n✅ Horário flexível entre 7h e 19h\n✅ Apenas 2 dias obrigatórios no escritório\n\nPor que isso agora? Porque vocês merecem um equilíbrio melhor entre trabalho e vida pessoal, e os resultados do último trimestre mostraram que somos MAIS produtivos assim! 📈',
      benefits: ['Linguagem amigável', 'Conecta com pedidos anteriores', 'Explica os benefícios', 'Tom positivo e humano']
    }
  }

  const communicationTips = [
    {
      tip: 'Seja Humano',
      description: 'Escreva como você falaria pessoalmente',
      example: 'Ao invés de \"Comunicamos que...\" use \"Pessoal, uma novidade...\"'
    },
    {
      tip: 'Explique o Porquê',
      description: 'Pessoas aceitam melhor quando entendem a razão',
      example: 'Por que mudou? Por que agora? Como isso ajuda?'
    },
    {
      tip: 'Use Dados Simples',
      description: 'Números que qualquer um entende',
      example: 'Ao invés de \"ROI de 23,7%\" use \"Economizamos R$ 50 mil\"'
    },
    {
      tip: 'Call-to-Action Claro',
      description: 'Diga exatamente o que espera de retorno',
      example: 'Respondam até sexta se têm dúvidas, ok?'
    }
  ]

  const templates = [
    'Email Corporativo Eficaz',
    'Relatório Executivo Claro',
    'Apresentação Persuasiva',
    'Comunicado Interno',
    'Proposta B2B',
    'Ata de Reunião',
    'Plano de Projeto',
    'Análise de Performance'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Briefcase className="h-8 w-8 text-gray-600" />
                <span className="text-gray-600 font-semibold">Comunicação Empresarial</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Comunicação <span className="text-blue-600">Profissional</span> que Funciona
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Chega de emails que ninguém lê e relatórios que confundem!</strong> Nossa IA cria comunicação empresarial 
                clara, objetiva e que realmente gera resultados dentro da sua empresa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gerar">
                  <Button size="lg" className="flex items-center gap-2">
                    Criar Comunicação Profissional
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
                📊 Resultados em empresas que usam:
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">+200%</div>
                    <div className="text-gray-600">Engajamento interno</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">+150%</div>
                    <div className="text-gray-600">Agilidade nas decisões</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">+180%</div>
                    <div className="text-gray-600">Aprovação de projetos</div>
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
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">
              🤦‍♂️ Por que a comunicação da sua empresa não funciona?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Erros que toda empresa comete:</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• <strong>Muito formal:</strong> &quot;Comunicamos que...&quot; - ninguém se conecta</li>
                  <li>• <strong>Informação demais:</strong> Emails gigantes que ninguém lê até o fim</li>
                  <li>• <strong>Sem contexto:</strong> Não explica por que é importante</li>
                  <li>• <strong>Linguagem difícil:</strong> Jargões que só a diretoria entende</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Como nossa IA corrige:</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Tom humano:</strong> &quot;Pessoal, novidade boa aqui!&quot;</li>
                  <li>• <strong>Direto ao ponto:</strong> Informação importante primeiro</li>
                  <li>• <strong>Explica o &quot;porquê&quot;:</strong> Conecta com impacto real</li>
                  <li>• <strong>Linguagem simples:</strong> Todo mundo entende</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Para Cada Tipo de Comunicação Empresarial
            </h2>
            <p className="text-xl text-gray-600">
              Do email interno à apresentação para investidores
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessTypes.map((type, index) => (
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
                            <div key={i} className="text-sm text-gray-600 bg-gray-100 rounded px-2 py-1 inline-block mr-2 mb-1">
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
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
              Transformação Real: Comunicado Empresarial
            </h2>
            <p className="text-xl text-gray-600">
              Veja como o mesmo assunto pode ter impactos completamente diferentes
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
                    Comunicação &quot;Normal&quot; (Que ninguém lê)
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
                    Com CopyBR (Que engaja!)
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

      {/* Communication Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4 Regras de Ouro da Comunicação Empresarial
            </h2>
            <p className="text-xl text-gray-600">
              Princípios que nossa IA aplica automaticamente
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationTips.map((tip, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {tip.tip}
                      </h3>
                      <p className="text-gray-600 mb-3">{tip.description}</p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          <strong>💡 Exemplo:</strong> {tip.example}
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

      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Criar Comunicação Empresarial Eficaz
            </h2>
            <p className="text-xl text-gray-600">
              3 passos simples para comunicação que realmente funciona
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Escolha o Tipo de Comunicação
                </h3>
                <p className="text-gray-600">
                  Email interno? Relatório? Apresentação? Nossa IA adapta o tom 
                  e estrutura para cada situação profissional.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Informe o Contexto
                </h3>
                <p className="text-gray-600">
                  &quot;Mudança de política&quot;, &quot;resultado do trimestre&quot;, &quot;novo projeto&quot;... 
                  Conte o assunto e nossa IA cria a mensagem perfeita.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Envie e Obtenha Resultados
                </h3>
                <p className="text-gray-600">
                  Comunicação clara, objetiva e que realmente conecta com sua equipe. 
                  Maior engajamento e melhores resultados! 🎯
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
              Templates para Cada Situação Empresarial
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 20 modelos prontos para usar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-gray-600" />
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
                  "Nossa comunicação interna mudou completamente! Antes os funcionários ignoravam nossos emails, 
                  agora todos leem e participam. O CopyBR tornou nossa empresa mais unida e produtiva."
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Amanda Rodrigues</div>
                    <div className="text-gray-600">Diretora de RH • Empresa 200 funcionários</div>
                  </div>
                  <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                    +200% engajamento
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Melhorar a Comunicação da sua Empresa?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Pare de mandar emails que ninguém lê. Crie comunicação que realmente conecta e gera resultados!
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-gray-600 hover:bg-gray-100">
              Começar a Comunicar Melhor
            </Button>
          </Link>
          <p className="text-sm text-gray-200 mt-4">
            ✅ 7 dias grátis • ✅ Templates profissionais • ✅ Comunicação que funciona
          </p>
        </div>
      </section>
    </div>
  )
}