'use client'

import { useState } from 'react'
import { Send, Trash2, Edit3 } from 'lucide-react'
import Button from '@/components/ui/Button'

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
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Copy para E-commerce',
      messages: [
        {
          id: '1',
          role: 'user',
          content: 'Preciso criar um copy para vender tênis esportivos',
          timestamp: new Date()
        },
        {
          id: '2',
          role: 'assistant',
          content: '🏃‍♂️ **CORRA ATRÁS DOS SEUS SONHOS!**\n\nTênis Ultra Performance - O que você estava esperando para dar o próximo passo?\n\n✅ Tecnologia anti-impacto\n✅ Design moderno e confortável\n✅ Durabilidade comprovada\n\n*Frete GRÁTIS para todo Brasil*\n💥 **OFERTA RELÂMPAGO: 30% OFF até meia-noite!**',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Email Marketing',
      messages: [
        {
          id: '3',
          role: 'user',
          content: 'Como criar um email de Black Friday que converta?',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    }
  ])

  const [selectedChat, setSelectedChat] = useState<string>('1')
  const [newMessage, setNewMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const currentChat = chats.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const message: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    }

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? { ...chat, messages: [...chat.messages, message] }
        : chat
    ))

    setNewMessage('')

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Essa é uma resposta simulada da IA. Em breve teremos integração real com modelos de linguagem para gerar copies incríveis!',
        timestamp: new Date()
      }

      setChats(prev => prev.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, messages: [...chat.messages, aiResponse] }
          : chat
      ))
    }, 1000)
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    if (selectedChat === chatId) {
      setSelectedChat(chats[0]?.id || '')
    }
    setShowDeleteConfirm(null)
  }

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'Novo Chat',
      messages: [],
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
          <Button onClick={createNewChat} className="w-full">
            Novo Chat
          </Button>
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
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#693ee0] focus:border-[#693ee0]"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
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