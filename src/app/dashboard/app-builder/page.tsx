'use client'

import { useState, useEffect } from 'react'

interface ChatMessage {
  message: string
  type: 'user' | 'ai'
  code?: string
}

export default function CodeGenerator() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [currentCode, setCurrentCode] = useState('')
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Carregar histórico do localStorage
    const savedHistory = localStorage.getItem('chatHistory')
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory)
      setChatHistory(parsed)
      // Pegar o último código gerado
      const lastCodeMessage = parsed.find((msg: ChatMessage) => msg.code)
      if (lastCodeMessage) {
        setCurrentCode(lastCodeMessage.code)
      }
    } else {
      // Mensagem inicial
      setChatHistory([{
        message: 'Olá! Eu sou seu assistente de código. Descreva o que você quer criar e eu vou gerar o HTML para você!',
        type: 'ai'
      }])
    }
  }, [])

  const generateMockCode = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('botão') || lowerMessage.includes('button')) {
      return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">${message}</h1>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">
            Clique Aqui
        </button>
    </div>
</body>
</html>`
    }
    
    if (lowerMessage.includes('formulário') || lowerMessage.includes('form')) {
      return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">${message}</h2>
        <form class="space-y-4">
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
            </div>
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Enviar
            </button>
        </form>
    </div>
</body>
</html>`
    }
    
    if (lowerMessage.includes('card') || lowerMessage.includes('cartão')) {
      return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">${message}</h3>
        <p class="text-gray-600 mb-4">Este é um exemplo de card criado com base na sua solicitação.</p>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Ver mais
        </button>
    </div>
</body>
</html>`
    }
    
    // Código padrão
    return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Resultado para:</h1>
        <p class="text-xl text-gray-600 mb-8">"${message}"</p>
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Código Gerado!</h3>
            <p class="text-gray-600">Sua solicitação foi processada com sucesso.</p>
        </div>
    </div>
</body>
</html>`
  }

  const generateCode = async () => {
    if (!inputMessage.trim()) return
    
    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // Adicionar mensagem do usuário
    const newHistory = [...chatHistory, { message: userMessage, type: 'user' as const }]
    setChatHistory(newHistory)
    
    setIsLoading(true)
    
    // Simular delay da IA
    setTimeout(() => {
      const generatedCode = generateMockCode(userMessage)
      const aiMessage: ChatMessage = {
        message: 'Código gerado! Veja o resultado no preview.',
        type: 'ai',
        code: generatedCode
      }
      
      const updatedHistory = [...newHistory, aiMessage]
      setChatHistory(updatedHistory)
      setCurrentCode(generatedCode)
      setIsLoading(false)
      
      // Salvar no localStorage
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory))
    }, 2000)
  }

  const copyCode = () => {
    if (!currentCode) {
      alert('Nenhum código para copiar!')
      return
    }
    
    navigator.clipboard.writeText(currentCode).then(() => {
      alert('Código copiado para a área de transferência!')
    })
  }

  const downloadHTML = () => {
    if (!currentCode) {
      alert('Nenhum código para baixar!')
      return
    }
    
    const blob = new Blob([currentCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'codigo-gerado.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateCode()
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="flex h-full">
        {/* COLUNA ESQUERDA - CHAT */}
        <div className="w-1/2 flex flex-col bg-gray-900 border-r border-gray-700">
          {/* Header */}
          <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3"></path>
              </svg>
              Code Generator IA
            </h1>
            <p className="text-gray-400 text-sm">Descreva o que você quer criar</p>
          </div>

          {/* Mensagens do Chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : ''}`}>
                <div className={`${msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-700'} text-white p-3 rounded-lg max-w-xs`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex">
                <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                  <p className="text-sm">Gerando código<span className="animate-pulse">...</span></p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-gray-800 p-4 border-t border-gray-700">
            <div className="flex space-x-3">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Descreva o que você quer criar..."
                className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                disabled={isLoading}
              />
              <button 
                onClick={generateCode}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA - PREVIEW */}
        <div className="w-1/2 flex flex-col bg-white">
          {/* Header do Preview */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Preview
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={copyCode}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Copiar
              </button>
              <button 
                onClick={downloadHTML}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293L16 6.586A1 1 0 0116.293 7.293L16 7.586V19a2 2 0 01-2 2z"></path>
                </svg>
                Baixar
              </button>
            </div>
          </div>

          {/* Iframe Preview */}
          <div className="flex-1 p-4">
            <iframe 
              className="w-full h-full border-2 border-gray-200 rounded-lg shadow-lg bg-white"
              srcDoc={currentCode || "<div style='display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial; color: #6b7280;'><div style='text-align: center;'><svg style='width: 64px; height: 64px; margin: 0 auto 16px; color: #d1d5db;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M8 9l3 3-3 3m5 0h3'></path></svg><p>Seu código aparecerá aqui</p><p style='font-size: 14px; margin-top: 8px;'>Descreva o que você quer criar no chat</p></div></div>"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}