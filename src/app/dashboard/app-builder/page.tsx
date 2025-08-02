'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  code?: string
  timestamp: Date
}

export default function CanvaCode() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Olá! Sou o Code Assistant, especialista em criar experiências web incríveis. Posso construir qualquer coisa que você imaginar - desde dashboards complexos até jogos interativos. O que vamos criar hoje?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentCode, setCurrentCode] = useState('')
  const [showCodePanel, setShowCodePanel] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
    
    // Auto-resize
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px'
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      const response = await fetch('/api/generate-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage.content })
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar código')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Vou criar um layout profissional para você!',
        code: data.code,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setCurrentCode(data.code)
      setShowCodePanel(true)
      
    } catch (error) {
      console.error('Erro:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Desculpe, ocorreu um erro. Tente novamente.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
    
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const copyCode = () => {
    if (!currentCode) return
    
    navigator.clipboard.writeText(currentCode).then(() => {
      const btn = document.getElementById('copy-code-btn')
      if (btn) {
        const originalText = btn.textContent
        btn.textContent = 'Copiado!'
        setTimeout(() => {
          btn.textContent = originalText
        }, 2000)
      }
    })
  }

  const useInDesign = () => {
    // Placeholder for Canva integration
    alert('Esta funcionalidade seria integrada com a API da Canva para criar um design.')
  }

  const newConversation = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Olá! Sou o Code Assistant, especialista em criar experiências web incríveis. Posso construir qualquer coisa que você imaginar - desde dashboards complexos até jogos interativos. O que vamos criar hoje?',
        timestamp: new Date()
      }
    ])
    setCurrentCode('')
    setShowCodePanel(false)
  }

  return (
    <>
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .message-fade-in {
          animation: fadeInUp 0.3s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .typing-indicator {
          animation: pulse 1.5s infinite;
        }
        .code-block {
          background: #1e1e1e;
          border-radius: 8px;
          overflow: hidden;
        }
        .code-header {
          background: #2d2d2d;
          padding: 8px 16px;
          border-bottom: 1px solid #404040;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>

      <div className="bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Code Assistant</h1>
              <p className="text-xs text-gray-500">Powered by Claude 3.5 Sonnet</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Histórico
            </button>
            <button 
              onClick={newConversation}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              Nova Conversa
            </button>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 flex">
          {/* Chat Messages */}
          <div className={`${showCodePanel ? 'flex-1' : 'w-full'} flex flex-col`}>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="message-fade-in">
                  {message.type === 'assistant' ? (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-medium">C</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3">
                          <p className="text-gray-900">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-4">
                          {message.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="flex-1 max-w-2xl">
                        <div className="bg-purple-600 text-white rounded-2xl rounded-tr-md px-4 py-3">
                          <p>{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mr-4 text-right">
                          {message.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-sm font-medium">U</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="message-fade-in">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">C</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="typing-indicator w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-gray-700">Code Assistant está pensando...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea 
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Descreva o que você quer criar..."
                    className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent max-h-32"
                    rows={1}
                    disabled={isLoading}
                  />
                </div>
                <button 
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 px-4">
                Pressione Enter para enviar, Shift+Enter para nova linha
              </p>
            </div>
          </div>

          {/* Code Preview Panel */}
          {showCodePanel && (
            <div className="w-1/2 border-l border-gray-200 bg-gray-50">
              <div className="h-full flex flex-col">
                {/* Panel Header */}
                <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Código Gerado</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      id="copy-code-btn"
                      onClick={copyCode}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Copiar
                    </button>
                    <button 
                      onClick={useInDesign}
                      className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      Use in a design
                    </button>
                    <button 
                      onClick={() => setShowCodePanel(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Code Content */}
                <div className="flex-1 overflow-hidden">
                  <div className="code-block h-full">
                    <div className="code-header">
                      <span className="text-gray-300 text-sm">HTML</span>
                    </div>
                    <pre className="text-gray-300 text-sm h-full overflow-auto p-4">
                      <code>{currentCode || '// Seu código aparecerá aqui...'}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}