'use client'

import { useState, useEffect } from 'react'
import { Book, Plus, Search, Calendar, User, Edit, Trash2, Save, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface KnowledgeEntry {
  id: string
  question: string
  answer: string
  tags: string[]
  createdAt: string
  category: string
}

export default function KnowledgeBasePage() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form states
  const [formQuestion, setFormQuestion] = useState('')
  const [formAnswer, setFormAnswer] = useState('')
  const [formCategory, setFormCategory] = useState('desenvolvimento')
  const [formTags, setFormTags] = useState('')

  const categories = [
    { value: 'desenvolvimento', label: 'Desenvolvimento' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'copywriting', label: 'Copywriting' },
    { value: 'ia', label: 'Inteligência Artificial' },
    { value: 'negocio', label: 'Negócio' },
    { value: 'tecnico', label: 'Técnico' },
    { value: 'outros', label: 'Outros' }
  ]

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = () => {
    const saved = localStorage.getItem('knowledge_base_entries')
    if (saved) {
      setEntries(JSON.parse(saved))
    } else {
      // Primeira entrada de exemplo
      const defaultEntry: KnowledgeEntry = {
        id: '1',
        question: 'Em que a funcionalidade "Imagem para Prompt" seria útil para agregar produção aos assinantes do CopyBR?',
        answer: `A funcionalidade "Imagem para Prompt" tem várias aplicações práticas:

🎯 **Casos de Uso Reais:**

**1. Análise de Concorrência**
- Pegar anúncios dos concorrentes e gerar prompts
- Entender o estilo visual que funciona no nicho
- Recriar conceitos similares sem copiar

**2. Recriação de Imagens para Campanhas**
- Cliente tem uma foto/arte que quer replicar
- Gerar prompt → usar no Midjourney/DALL-E
- Criar variações do mesmo conceito

**3. Inspiração para Criação de Conteúdo**
- Ver uma imagem inspiradora na internet
- Extrair elementos visuais para seus projetos
- Adaptar estilos para diferentes nichos

**4. Otimização de Posts Visuais**
- Analisar posts que performaram bem
- Entender os elementos que funcionam
- Replicar a "fórmula" visual

**5. Briefing para Designers**
- Cliente não sabe explicar o que quer
- Mostra uma referência → gera descrição detalhada
- Designer entende exatamente o que fazer

💡 **Valor Agregado:**
- **Economiza tempo** de análise manual
- **Padroniza comunicação** visual
- **Escala criação** de conteúdo
- **Melhora briefings** para terceiros`,
        tags: ['imagem-para-prompt', 'funcionalidades', 'casos-de-uso'],
        createdAt: new Date().toISOString(),
        category: 'desenvolvimento'
      }
      const initialEntries = [defaultEntry]
      setEntries(initialEntries)
      localStorage.setItem('knowledge_base_entries', JSON.stringify(initialEntries))
    }
  }

  const saveEntries = (newEntries: KnowledgeEntry[]) => {
    setEntries(newEntries)
    localStorage.setItem('knowledge_base_entries', JSON.stringify(newEntries))
  }

  const handleAddEntry = () => {
    if (!formQuestion.trim() || !formAnswer.trim()) {
      alert('Pergunta e resposta são obrigatórias!')
      return
    }

    const newEntry: KnowledgeEntry = {
      id: Date.now().toString(),
      question: formQuestion,
      answer: formAnswer,
      category: formCategory,
      tags: formTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString()
    }

    const newEntries = [newEntry, ...entries]
    saveEntries(newEntries)
    
    // Reset form
    setFormQuestion('')
    setFormAnswer('')
    setFormCategory('desenvolvimento')
    setFormTags('')
    setShowAddForm(false)
  }

  const handleEditEntry = (id: string) => {
    const entry = entries.find(e => e.id === id)
    if (entry) {
      setFormQuestion(entry.question)
      setFormAnswer(entry.answer)
      setFormCategory(entry.category)
      setFormTags(entry.tags.join(', '))
      setEditingId(id)
      setShowAddForm(true)
    }
  }

  const handleUpdateEntry = () => {
    if (!formQuestion.trim() || !formAnswer.trim() || !editingId) return

    const updatedEntries = entries.map(entry => 
      entry.id === editingId 
        ? {
            ...entry,
            question: formQuestion,
            answer: formAnswer,
            category: formCategory,
            tags: formTags.split(',').map(tag => tag.trim()).filter(tag => tag)
          }
        : entry
    )

    saveEntries(updatedEntries)
    
    // Reset form
    setFormQuestion('')
    setFormAnswer('')
    setFormCategory('desenvolvimento')
    setFormTags('')
    setShowAddForm(false)
    setEditingId(null)
  }

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta entrada?')) {
      const newEntries = entries.filter(e => e.id !== id)
      saveEntries(newEntries)
    }
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Book className="h-7 w-7 text-blue-600" />
            Leitura
          </h1>
          <p className="text-gray-600">
            Seu livro pessoal de perguntas e respostas para estudos
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar perguntas, respostas ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Entrada
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingId ? 'Editar Entrada' : 'Nova Entrada'}
                <Button variant="outline" size="sm" onClick={() => {
                  setShowAddForm(false)
                  setEditingId(null)
                  setFormQuestion('')
                  setFormAnswer('')
                  setFormCategory('desenvolvimento')
                  setFormTags('')
                }}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pergunta *
                </label>
                <input
                  type="text"
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Qual foi sua pergunta?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resposta *
                </label>
                <textarea
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  placeholder="Cole aqui a resposta completa..."
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="tag1, tag2, tag3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={editingId ? handleUpdateEntry : handleAddEntry}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? 'Atualizar' : 'Salvar'}
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowAddForm(false)
                  setEditingId(null)
                  setFormQuestion('')
                  setFormAnswer('')
                  setFormCategory('desenvolvimento')
                  setFormTags('')
                }}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Entries List */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {entries.length === 0 ? 'Nenhuma entrada ainda' : 'Nenhuma entrada encontrada'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {entries.length === 0 
                    ? 'Comece adicionando sua primeira pergunta e resposta'
                    : 'Tente ajustar os filtros ou termo de busca'
                  }
                </p>
                {entries.length === 0 && (
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Primeira Entrada
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">
                        {entry.question}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(entry.createdAt)}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {categories.find(c => c.value === entry.category)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditEntry(entry.id)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteEntry(entry.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {entry.answer}
                    </div>
                  </div>
                  
                  {entry.tags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Stats */}
        {entries.length > 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
                  <div className="text-sm text-gray-600">Total de Entradas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {new Set(entries.map(e => e.category)).size}
                  </div>
                  <div className="text-sm text-gray-600">Categorias</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {entries.flatMap(e => e.tags).length}
                  </div>
                  <div className="text-sm text-gray-600">Total de Tags</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {entries.filter(e => 
                      new Date(e.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length}
                  </div>
                  <div className="text-sm text-gray-600">Esta Semana</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}