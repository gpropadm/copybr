'use client'

import { useState, useEffect } from 'react'
import { Copy, Heart, Edit, Trash2, Clock, Image as ImageIcon, Sparkles, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface CopyEntry {
  id: string
  image: string
  type: 'prompt' | 'copies'
  prompt?: string
  copies?: string[]
  createdAt: string
  isFavorite: boolean
  title?: string
}

export default function MeusCopiesPage() {
  const [entries, setEntries] = useState<CopyEntry[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null)

  // Carregar copies do localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('image_to_prompt_history')
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries)
      // Migrar dados antigos e adicionar título se não existir
      const migratedEntries = parsedEntries.map((entry: CopyEntry) => ({
        ...entry,
        title: entry.title || `${entry.type === 'prompt' ? 'Prompt' : 'Copies'} - ${new Date(entry.createdAt).toLocaleDateString('pt-BR')}`
      }))
      setEntries(migratedEntries)
    }
  }, [])

  // Salvar no localStorage
  const saveEntries = (newEntries: CopyEntry[]) => {
    setEntries(newEntries)
    localStorage.setItem('image_to_prompt_history', JSON.stringify(newEntries))
  }

  // Toggle favorito
  const toggleFavorite = (id: string) => {
    const newEntries = entries.map(entry => 
      entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
    )
    saveEntries(newEntries)
  }

  // Iniciar edição
  const startEdit = (id: string, currentTitle: string) => {
    setEditingId(id)
    setEditTitle(currentTitle)
  }

  // Salvar edição
  const saveEdit = () => {
    if (!editingId || !editTitle.trim()) return
    
    const newEntries = entries.map(entry => 
      entry.id === editingId ? { ...entry, title: editTitle.trim() } : entry
    )
    saveEntries(newEntries)
    setEditingId(null)
    setEditTitle('')
  }

  // Cancelar edição
  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
  }

  // Excluir entry
  const handleDelete = (id: string) => {
    setEntryToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (entryToDelete) {
      const newEntries = entries.filter(e => e.id !== entryToDelete)
      saveEntries(newEntries)
      setShowDeleteModal(false)
      setEntryToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setEntryToDelete(null)
  }

  // Ordenar: favoritos primeiro, depois por data
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1
    if (!a.isFavorite && b.isFavorite) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
            <Copy className="h-7 w-7 text-blue-600" />
            Meus Copies
          </h1>
          <p className="text-gray-600">
            Sua biblioteca pessoal de copies e prompts gerados
          </p>
        </div>

        {/* Stats */}
        {entries.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-red-600">
                {entries.filter(e => e.isFavorite).length}
              </div>
              <div className="text-sm text-gray-600">Favoritos</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">
                {entries.filter(e => e.type === 'prompt').length}
              </div>
              <div className="text-sm text-gray-600">Prompts</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">
                {entries.filter(e => e.type === 'copies').length}
              </div>
              <div className="text-sm text-gray-600">Copies</div>
            </div>
          </div>
        )}

        {/* Entries Grid */}
        {entries.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Copy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma copy ainda
              </h3>
              <p className="text-gray-600 mb-6">
                Gere copies ou prompts na página "Imagem para Prompt" para começar sua biblioteca
              </p>
              <Button onClick={() => window.location.href = '/dashboard/image-to-prompt'}>
                <Plus className="h-4 w-4 mr-2" />
                Gerar Primeira Copy
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEntries.map((entry) => (
              <Card key={entry.id} className={`relative ${entry.isFavorite ? 'ring-2 ring-red-200' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {editingId === entry.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            autoFocus
                          />
                          <div className="flex gap-1">
                            <button
                              onClick={saveEdit}
                              className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Salvar
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <CardTitle className="text-base leading-tight">
                          {entry.title}
                        </CardTitle>
                      )}
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          entry.type === 'prompt' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {entry.type === 'prompt' ? 'Prompt' : `${entry.copies?.length || 0} Copies`}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatDate(entry.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Favorito */}
                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      className={`p-1 rounded transition-colors ${
                        entry.isFavorite 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${entry.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Imagem */}
                  <img 
                    src={entry.image} 
                    alt="Generated"
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  {/* Conteúdo */}
                  {entry.type === 'prompt' && entry.prompt ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-800 line-clamp-3">
                        {entry.prompt}
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(entry.prompt!)
                          alert('Prompt copiado!')
                        }}
                        className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900 rounded-lg border transition-colors flex items-center justify-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copiar Prompt
                      </button>
                    </div>
                  ) : entry.copies ? (
                    <div className="space-y-2">
                      <div className="max-h-24 overflow-y-auto space-y-1">
                        {entry.copies.map((copyText, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                            <p className="line-clamp-2">{copyText}</p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(copyText)
                                alert(`Copy #${index + 1} copiada!`)
                              }}
                              className="mt-1 text-blue-600 hover:text-blue-700 text-xs"
                            >
                              Copiar #{index + 1}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Ações */}
                  <div className="flex gap-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => startEdit(entry.id, entry.title || '')}
                      className="flex-1 px-2 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900 rounded border transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="flex-1 px-2 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900 rounded border transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Excluir
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Excluir copy</h3>
                  <p className="text-sm text-gray-500">Esta ação não pode ser desfeita</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Tem certeza que deseja excluir esta copy? Esta ação é permanente e não pode ser desfeita.
              </p>
              
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={cancelDelete}
                  className="px-4 py-2"
                >
                  Cancelar
                </Button>
                <button 
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}