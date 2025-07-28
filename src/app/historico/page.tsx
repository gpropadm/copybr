import { Search, Filter, Calendar, Download, Copy, Star, Trash2, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function HistoricoPage() {
  const copies = [
    {
      id: 1,
      title: 'Anúncio Black Friday - Eletrônicos',
      template: 'Facebook Ads',
      date: '27 Jan 2025, 14:30',
      views: 1250,
      favorite: true,
      preview: '🔥 BLACK FRIDAY CHEGOU! Até 70% OFF em eletrônicos + Frete GRÁTIS para todo Brasil. Não perca...',
      category: 'Marketing Digital'
    },
    {
      id: 2,
      title: 'Email Carrinho Abandonado - Moda',
      template: 'Email Marketing',
      date: '26 Jan 2025, 16:45',
      views: 890,
      favorite: false,
      preview: 'Oi Maria! 👋 Você esqueceu alguns itens incríveis no seu carrinho. Que tal finalizar sua compra...',
      category: 'E-commerce'
    },
    {
      id: 3,
      title: 'Post Instagram - Dicas Fitness',
      template: 'Redes Sociais',
      date: '25 Jan 2025, 09:15',
      views: 2340,
      favorite: true,
      preview: '💪 3 exercícios que vão mudar seu corpo em 30 dias! Salva esse post e me marca quando...',
      category: 'Conteúdo'
    },
    {
      id: 4,
      title: 'Script Vendas - Curso Online',
      template: 'Vendas',
      date: '24 Jan 2025, 11:20',
      views: 456,
      favorite: false,
      preview: 'Olá! Você demonstrou interesse no nosso curso de marketing digital. Imagino que...',
      category: 'Vendas'
    },
    {
      id: 5,
      title: 'Newsletter Janeiro - Empresa',
      template: 'Email Marketing',
      date: '23 Jan 2025, 08:00',
      views: 678,
      favorite: false,
      preview: 'Janeiro chegou com tudo! Confira as novidades que preparamos para você este mês...',
      category: 'Empresarial'
    }
  ]

  const categories = ['Todos', 'Marketing Digital', 'E-commerce', 'Redes Sociais', 'Vendas', 'Conteúdo', 'Empresarial']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Meus Copies Salvos</h1>
          <p className="text-gray-600">Todos os textos que você criou, organizados e prontos para usar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Explicação simples */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-2">
            📚 O que é o Histórico?
          </h2>
          <p className="text-green-800">
            <strong>Pense como uma pasta de documentos no seu computador.</strong> Aqui ficam salvos todos os textos que você criou com o CopyBR. 
            Você pode buscar, organizar, copiar para usar novamente ou até mesmo favoritar os melhores!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar nos seus copies... (ex: black friday, email, anúncio)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500">
                <option>Todos os tipos</option>
                <option>Favoritos</option>
                <option>Mais visualizados</option>
                <option>Recentes</option>
              </select>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-4">
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Copy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">47</div>
              <div className="text-sm text-gray-600">Total de Copies</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Favoritos</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">8.4k</div>
              <div className="text-sm text-gray-600">Total de Visualizações</div>
            </CardContent>
          </Card>
        </div>

        {/* Copies List */}
        <div className="space-y-4">
          {copies.map((copy) => (
            <Card key={copy.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{copy.title}</h3>
                      {copy.favorite && (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      )}
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {copy.template}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{copy.preview}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {copy.date}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {copy.views.toLocaleString()} visualizações
                      </div>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {copy.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Copy className="h-4 w-4" />
                      Copiar
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Baixar
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {copy.favorite ? 'Desfavoritar' : 'Favoritar'}
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Carregar Mais Copies
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Dicas para organizar seus copies:
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li><strong>• Favorite os melhores:</strong> Clique na estrela para marcar copies que deram resultado</li>
            <li><strong>• Use a busca:</strong> Digite palavras-chave para encontrar rapidamente o que precisa</li>
            <li><strong>• Baixe importantes:</strong> Salve no seu computador os copies mais usados</li>
            <li><strong>• Copie e adapte:</strong> Use copies antigos como base para criar novos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}