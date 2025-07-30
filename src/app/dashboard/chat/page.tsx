'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Trash2, Edit3, Zap, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  wordCount?: number
}

interface UsageInfo {
  wordsUsed: number
  wordsLimit: number
  planType: string
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<string>('')
  const [newMessage, setNewMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [usage, setUsage] = useState<UsageInfo | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chats.find(chat => chat.id === selectedChat)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  useEffect(() => {
    fetchUsage()
    initializeChat()
  }, [])

  const fetchUsage = async () => {
    try {
      const userData = localStorage.getItem('auth_user')
      let headers: Record<string, string> = {}
      
      if (userData) {
        const user = JSON.parse(userData)
        headers = { 'x-user-id': user.id }
      }
      
      const response = await fetch('/api/user/subscription', { headers })
      const data = await response.json()
      
      if (response.ok) {
        setUsage({
          wordsUsed: data.wordsUsed || 0,
          wordsLimit: data.planType === 'free' ? 2000 : -1,
          planType: data.planType
        })
      }
    } catch (error) {
      console.error('Erro ao buscar dados de uso:', error)
    }
  }

  const initializeChat = () => {
    if (chats.length === 0) {
      createNewChat(true) // true = primeiro chat com mensagem de boas-vindas
    }
  }

  const canSendMessage = () => {
    if (!usage) return false
    if (usage.wordsLimit === -1) return true // Plano ilimitado
    return usage.wordsUsed < usage.wordsLimit
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || isLoading) return

    // Verificar limite de palavras
    if (!canSendMessage()) {
      alert('Você atingiu o limite de palavras do seu plano. Faça upgrade para continuar!')
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage.trim(),
      timestamp: new Date()
    }

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ))

    const messageToSend = newMessage.trim()
    setNewMessage('')
    setIsLoading(true)

    try {
      const userData = localStorage.getItem('auth_user')
      let headers: Record<string, string> = { 'Content-Type': 'application/json' }
      
      if (userData) {
        const user = JSON.parse(userData)
        headers = { ...headers, 'x-user-id': user.id }
      }

      const currentChatMessages = chats.find(c => c.id === selectedChat)?.messages || []

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: messageToSend,
          history: [...currentChatMessages, userMessage].slice(-10) // Últimas 10 mensagens para contexto
        })
      })

      const data = await response.json()

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          wordCount: data.wordCount
        }

        setChats(prev => prev.map(chat => 
          chat.id === selectedChat 
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat
        ))
        
        // Atualizar contador de uso
        if (usage) {
          setUsage(prev => prev ? {
            ...prev,
            wordsUsed: prev.wordsUsed + (data.wordCount || 0)
          } : null)
        }
      } else {
        throw new Error(data.error || 'Erro ao processar mensagem')
      }
    } catch (error) {
      console.error('Erro no chat:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Desculpe, ocorreu um erro. Tente novamente.',
        timestamp: new Date()
      }
      
      setChats(prev => prev.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, messages: [...chat.messages, errorMessage] }
          : chat
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    if (selectedChat === chatId) {
      setSelectedChat(chats[0]?.id || '')
    }
    setShowDeleteConfirm(null)
  }

  const createNewChat = (isFirst = false) => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! 👋 Sou seu assistente de copywriting.\n\nPode me pedir qualquer coisa:\n• "Crie um copy para Instagram sobre meu produto"\n• "Escreva um email de follow-up"\n• "Gere headlines para minha landing page"\n\nO que você gostaria de criar hoje?',
      timestamp: new Date()
    }

    const newChat: Chat = {
      id: Date.now().toString(),
      title: isFirst ? 'Chat de Boas-vindas' : 'Novo Chat',
      messages: isFirst ? [welcomeMessage] : [],
      createdAt: new Date()
    }
    
    setChats(prev => [newChat, ...prev])
    setSelectedChat(newChat.id)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Lista de Chats */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button onClick={() => createNewChat()} className="w-full mb-3">
            Novo Chat
          </Button>
          
          {/* Usage Info */}
          {usage && (
            <Card className="mb-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">
                      Palavras
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {usage.wordsUsed} / {usage.wordsLimit === -1 ? '∞' : usage.wordsLimit}
                  </div>
                </div>
                
                {usage.planType === 'free' && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        usage.wordsUsed >= usage.wordsLimit ? 'bg-red-500' :
                        usage.wordsUsed >= usage.wordsLimit * 0.8 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((usage.wordsUsed / usage.wordsLimit) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div key={chat.id} className="relative group">
              <button
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  selectedChat === chat.id ? 'bg-blue-50 border-l-4 border-l-[#693ee0]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {chat.messages.length > 0 
                        ? chat.messages[chat.messages.length - 1].content.substring(0, 60) + '...'
                        : 'Chat vazio'
                      }
                    </p>
                  </div>
                </div>
              </button>
              
              {/* Botões de ação */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Edit3 className="h-3 w-3 text-gray-500" />
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(chat.id)}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área do Chat */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Header do Chat */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">
                {currentChat.title}
              </h2>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentChat.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#693ee0] text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-purple-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                      {message.wordCount && (
                        <span className="ml-2">• {message.wordCount} palavras</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-gray-600">Gerando resposta...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder={
                    canSendMessage() 
                      ? "Digite sua mensagem..." 
                      : "Limite de palavras atingido"
                  }
                  disabled={isLoading || !canSendMessage()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0] disabled:bg-gray-100"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim() || isLoading || !canSendMessage()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {!canSendMessage() && usage?.planType === 'free' && (
                <div className="mt-2 text-center">
                  <p className="text-sm text-red-600 mb-2">
                    Você atingiu o limite de {usage.wordsLimit} palavras do plano FREE
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => window.location.href = '/dashboard/planos'}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Fazer Upgrade
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecione um chat
              </h3>
              <p className="text-gray-500">
                Escolha um chat existente ou crie um novo
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Excluir chat?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Esta ação não pode ser desfeita. O chat será excluído permanentemente.
            </p>
            <div className="flex space-x-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => handleDeleteChat(showDeleteConfirm)}
                className="bg-red-600 hover:bg-red-700"
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}