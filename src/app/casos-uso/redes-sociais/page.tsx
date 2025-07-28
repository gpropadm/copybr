import { Users, Heart, Share, Eye, ArrowRight, CheckCircle, Star, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function RedesSociaisPage() {
  const platforms = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
          <path d="m16 11.37-.5.74a6 6 0 1 1-3.1-3.1l.74-.5" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      types: ['Posts no Feed', 'Stories', 'Reels', 'Legendas'],
      audience: '113 milhões no Brasil',
      tip: 'Texto é TUDO! Visual atrai, mas legenda converte'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      types: ['Posts Profissionais', 'Artigos', 'Stories'],
      audience: '67 milhões no Brasil',
      tip: 'Conteúdo de valor + storytelling = autoridade'
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      types: ['Legendas de Vídeo', 'Descriptions', 'Hashtags'],
      audience: '82 milhões no Brasil',
      tip: 'Hook nos primeiros 3 segundos é vital'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      types: ['Posts', 'Anúncios', 'Stories'],
      audience: '109 milhões no Brasil',
      tip: 'Texto emocional gera mais compartilhamentos'
    }
  ]

  const beforeAfter = [
    {
      platform: 'Instagram',
      before: 'Produto novo disponível. Confira nossa loja.',
      after: '🔥 CHEGOU A NOVIDADE que você estava esperando! ✨\n\n👀 Desliza pra ver de pertinho\n💝 Corre que é por tempo limitado\n\n#novidade #imperdivel #vemver',
      engagement: '+450% curtidas'
    },
    {
      platform: 'LinkedIn',
      before: 'Dicas de produtividade para profissionais.',
      after: '💡 3 hábitos simples que mudaram minha produtividade:\n\n1️⃣ Regra dos 2 minutos\n2️⃣ Blocos de tempo focado  \n3️⃣ Review semanal\n\nQual você vai testar primeiro? 👇',
      engagement: '+320% comentários'
    }
  ]

  const templates = [
    'Post Engajamento Instagram',
    'Legenda que Viraliza',
    'Story Interativo',
    'Post LinkedIn Profissional',
    'Caption TikTok Trend',
    'Facebook Nostálgico',
    'Thread Twitter',
    'Post Educativo'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Users className="h-8 w-8 text-pink-600" />
                <span className="text-pink-600 font-semibold">Redes Sociais</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Posts que <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-black">VIRALIZAM</span> e Vendem
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                <strong>Pare de postar no vazio!</strong> Nossa IA cria conteúdo que as pessoas amam compartilhar, comentar e comprar. 
                Para Instagram, LinkedIn, TikTok e muito mais!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gerar">
                  <Button size="lg" className="flex items-center gap-2">
                    Criar Post Viral
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Ver Exemplos
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                📈 Resultados dos nossos usuários:
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">❤️</div>
                  <div>
                    <div className="text-2xl font-bold text-pink-600">+450%</div>
                    <div className="text-gray-600">Mais curtidas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">💬</div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">+320%</div>
                    <div className="text-gray-600">Mais comentários</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">🔄</div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">+280%</div>
                    <div className="text-gray-600">Mais compartilhamentos</div>
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
              🤷‍♂️ Por que o TEXTO é mais importante que a imagem nas redes sociais?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Erros que todo mundo comete:</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• <strong>Foca só na imagem:</strong> Foto linda, mas texto sem alma</li>
                  <li>• <strong>Não conta história:</strong> Só descreve produto, não emociona</li>
                  <li>• <strong>Sem gancho inicial:</strong> Primeiras palavras não prendem</li>
                  <li>• <strong>Não chama pra ação:</strong> Pessoas leem mas não interagem</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">✅ O que nossa IA faz diferente:</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Hook poderoso:</strong> Primeiras palavras que param o scroll</li>
                  <li>• <strong>Storytelling envolvente:</strong> Transforma produto em história</li>
                  <li>• <strong>Gatilhos emocionais:</strong> Desperta curiosidade, urgência, desejo</li>
                  <li>• <strong>CTA irresistível:</strong> "Comenta AÍ", "Salva que vai precisar"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Para Cada Rede Social, o Tom Certo
            </h2>
            <p className="text-xl text-gray-600">
              Nossa IA entende a "personalidade" de cada plataforma
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="text-center">
                    <div className="flex justify-center mb-4 text-gray-600">{platform.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{platform.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{platform.audience}</p>
                    
                    <div className="space-y-2 mb-4">
                      {platform.types.map((type, i) => (
                        <div key={i} className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700">
                          {type}
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                      <p className="text-sm font-bold text-purple-900">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-black">ESTRATÉGIA:</span> {platform.tip}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transformação Real: Antes x Depois
            </h2>
            <p className="text-xl text-gray-600">
              Veja como o mesmo conteúdo pode render muito mais
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
                        😴
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-red-900">
                        Post Chato (Não engaja)
                      </h3>
                    </div>
                    
                    {/* Post mockup */}
                    <div className="bg-white rounded-lg p-4 border border-red-200 mb-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                        <div className="font-medium text-gray-800">@minhaloja</div>
                      </div>
                      <p className="text-gray-700 mb-3">{example.before}</p>
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span className="flex items-center"><Heart className="h-4 w-4 mr-1" /> 12</span>
                        <span className="flex items-center"><Share className="h-4 w-4 mr-1" /> 1</span>
                        <span className="flex items-center"><Eye className="h-4 w-4 mr-1" /> 45</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-red-700">
                      <strong>Problema:</strong> Muito direto, sem emoção, não convida interação
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
                    
                    {/* Post mockup */}
                    <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full mr-3"></div>
                        <div className="font-medium text-gray-800">@minhaloja</div>
                      </div>
                      <p className="text-gray-700 mb-3 whitespace-pre-line">{example.after}</p>
                      <div className="flex items-center space-x-4 text-gray-600 text-sm">
                        <span className="flex items-center text-red-500"><Heart className="h-4 w-4 mr-1" /> 1.2k</span>
                        <span className="flex items-center"><Share className="h-4 w-4 mr-1" /> 89</span>
                        <span className="flex items-center"><Eye className="h-4 w-4 mr-1" /> 8.5k</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-green-700">
                      <strong>Resultado:</strong> {example.engagement} - Emocional, interativo, viral!
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Criar Posts Virais em 3 Passos
            </h2>
            <p className="text-xl text-gray-600">
              Mais fácil que postar uma selfie!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Escolha a Rede Social
                </h3>
                <p className="text-gray-600">
                  Instagram? LinkedIn? TikTok? Cada rede tem seu jeitinho. 
                  Selecione onde vai postar e nossa IA adapta o tom perfeito.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Conte o que Quer Falar
                </h3>
                <p className="text-gray-600">
                  "Produto novo", "dica de saúde", "motivação segunda-feira"... 
                  Só fale o assunto que nossa IA transforma em gold!
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Poste e Veja Bombar
                </h3>
                <p className="text-gray-600">
                  Copie o texto, cole na sua rede social favorita e veja os likes, 
                  comentários e compartilhamentos chegando! 🚀
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Templates para Cada Tipo de Post
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 30 tipos diferentes para todas as situações
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 border border-pink-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-pink-600" />
                  <span className="font-medium text-gray-900">{template}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
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
                  "Cara, que diferença! Meus posts no Instagram estão bombando desde que comecei a usar o CopyBR. 
                  Antes tinha 50 curtidas, agora passo de 1000 fácil. A IA realmente entende como escrever para redes sociais!"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Lucas Mendes</div>
                    <div className="text-gray-600">Influenciador Digital • 50k seguidores</div>
                  </div>
                  <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-bold">
                    +450% engajamento
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Viralizar?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Pare de postar no vazio! Crie conteúdo que as pessoas amam compartilhar.
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-gray-100">
              Criar Meu Primeiro Post Viral
            </Button>
          </Link>
          <p className="text-sm text-pink-200 mt-4">
            ✅ 7 dias grátis • ✅ Para todas as redes • ✅ Posts que realmente funcionam
          </p>
        </div>
      </section>
    </div>
  )
}