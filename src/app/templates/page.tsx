import { Search, Filter, Star, Clock, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function TemplatesPage() {
  const categories = [
    'Todos',
    'Marketing Digital',
    'E-commerce',
    'Redes Sociais',
    'Email Marketing',
    'Vendas',
    'Blog',
    'Landing Pages'
  ]

  const templates = [
    {
      id: 1,
      name: 'Anúncio Facebook/Instagram',
      description: 'Copy persuasivo para anúncios em redes sociais com gatilhos mentais',
      category: 'Marketing Digital',
      uses: 1250,
      rating: 4.9,
      premium: false,
      time: '30s'
    },
    {
      id: 2,
      name: 'Descrição de Produto E-commerce',
      description: 'Descrições que convertem visitantes em compradores',
      category: 'E-commerce',
      uses: 980,
      rating: 4.8,
      premium: false,
      time: '45s'
    },
    {
      id: 3,
      name: 'Email de Carrinho Abandonado',
      description: 'Recupere vendas perdidas com emails persuasivos',
      category: 'Email Marketing',
      uses: 750,
      rating: 4.9,
      premium: true,
      time: '1min'
    },
    {
      id: 4,
      name: 'Headline de Landing Page',
      description: 'Primeiras impressões que capturam atenção imediatamente',
      category: 'Landing Pages',
      uses: 1100,
      rating: 4.7,
      premium: false,
      time: '20s'
    },
    {
      id: 5,
      name: 'Post Instagram Stories',
      description: 'Stories que engajam e direcionam tráfego',
      category: 'Redes Sociais',
      uses: 890,
      rating: 4.6,
      premium: false,
      time: '25s'
    },
    {
      id: 6,
      name: 'Script de Vendas Telefônicas',
      description: 'Scripts que convertem leads em clientes',
      category: 'Vendas',
      uses: 650,
      rating: 4.8,
      premium: true,
      time: '2min'
    },
    {
      id: 7,
      name: 'Título de Blog SEO',
      description: 'Títulos irresistíveis otimizados para buscadores',
      category: 'Blog',
      uses: 1350,
      rating: 4.9,
      premium: false,
      time: '15s'
    },
    {
      id: 8,
      name: 'Email Newsletter',
      description: 'Newsletters que seus leitores aguardam ansiosamente',
      category: 'Email Marketing',
      uses: 720,
      rating: 4.7,
      premium: false,
      time: '1min'
    },
    {
      id: 9,
      name: 'Proposta Comercial B2B',
      description: 'Propostas que fecham negócios empresariais',
      category: 'Vendas',
      uses: 480,
      rating: 4.9,
      premium: true,
      time: '3min'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Templates de Copy que Convertem
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Mais de 50 templates testados e aprovados por profissionais de marketing. 
            Adaptados para o mercado brasileiro com linguagem que conecta.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar templates... (ex: anúncio facebook, email, vendas)"
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filtrar por:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      category === 'Todos'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {template.name}
                        {template.premium && (
                          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            Premium
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {template.category}
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span>{template.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {template.uses.toLocaleString('pt-BR')} usos
                    </span>
                    <Button size="sm" className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Usar Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Não encontrou o template ideal?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Nossa IA pode criar templates personalizados para suas necessidades específicas
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Criar Template Personalizado
          </Button>
        </div>
      </section>
    </div>
  )
}