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

  // Função removida - agora usando Claude API
  const generateMockCode_unused = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('delivery') || lowerMessage.includes('restaurante') || lowerMessage.includes('comida')) {
      return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Header Colorido -->
    <header class="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 shadow-lg">
        <div class="max-w-6xl mx-auto flex items-center justify-between">
            <h1 class="text-2xl font-bold">🍕 DeliveryApp</h1>
            <div class="flex items-center space-x-4">
                <span class="text-sm">📍 São Paulo, SP</span>
                <div class="bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-semibold">🛒 3 itens</div>
            </div>
        </div>
    </header>

    <!-- Barra de Pesquisa -->
    <div class="max-w-6xl mx-auto p-4">
        <div class="relative mb-6">
            <input type="text" placeholder="Buscar restaurantes ou pratos..." class="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm">
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>

        <!-- Categorias -->
        <div class="flex space-x-4 mb-8 overflow-x-auto pb-2">
            <button class="bg-orange-500 text-white px-6 py-3 rounded-full whitespace-nowrap font-medium shadow-sm">🍕 Pizza</button>
            <button class="bg-white text-gray-700 px-6 py-3 rounded-full whitespace-nowrap font-medium shadow-sm border">🍔 Burgers</button>
            <button class="bg-white text-gray-700 px-6 py-3 rounded-full whitespace-nowrap font-medium shadow-sm border">🍜 Asiática</button>
            <button class="bg-white text-gray-700 px-6 py-3 rounded-full whitespace-nowrap font-medium shadow-sm border">🥗 Saudável</button>
            <button class="bg-white text-gray-700 px-6 py-3 rounded-full whitespace-nowrap font-medium shadow-sm border">🍰 Sobremesas</button>
        </div>

        <!-- Restaurantes -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Restaurante 1 -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center">
                    <span class="text-6xl">🍕</span>
                </div>
                <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Pizza Express</h3>
                    <div class="flex items-center mb-2">
                        <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
                        <span class="text-gray-600 text-sm ml-2">4.8 (127 avaliações)</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">Pizzas artesanais • 25-35 min • R$ 8,90 entrega</p>
                    <button class="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">Ver Cardápio</button>
                </div>
            </div>

            <!-- Restaurante 2 -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                    <span class="text-6xl">🍔</span>
                </div>
                <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Burger King</h3>
                    <div class="flex items-center mb-2">
                        <span class="text-yellow-400">⭐⭐⭐⭐</span>
                        <span class="text-gray-600 text-sm ml-2">4.2 (89 avaliações)</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">Hamburguers gourmet • 15-25 min • R$ 5,90 entrega</p>
                    <button class="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">Ver Cardápio</button>
                </div>
            </div>

            <!-- Restaurante 3 -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                    <span class="text-6xl">🍜</span>
                </div>
                <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Sushi Zen</h3>
                    <div class="flex items-center mb-2">
                        <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
                        <span class="text-gray-600 text-sm ml-2">4.9 (203 avaliações)</span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">Comida japonesa • 30-40 min • R$ 12,90 entrega</p>
                    <button class="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">Ver Cardápio</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Carrinho Flutuante -->
    <div class="fixed bottom-6 right-6 bg-orange-500 text-white px-6 py-4 rounded-xl shadow-xl hover:bg-orange-600 transition-colors cursor-pointer">
        <div class="flex items-center space-x-3">
            <div class="bg-white text-orange-500 px-2 py-1 rounded-full text-sm font-bold">3</div>
            <div>
                <p class="font-semibold">Ver Carrinho</p>
                <p class="text-sm opacity-90">R$ 47,90</p>
            </div>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </div>
    </div>

    <!-- Botão Finalizar (Mobile) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button class="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors">
            Finalizar Pedido - R$ 47,90
        </button>
    </div>

    <script>
        // Funcionalidade básica
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.textContent.includes('Ver Cardápio')) {
                    alert('Abrindo cardápio do ' + this.closest('.bg-white').querySelector('h3').textContent + '!');
                } else if (this.textContent.includes('Finalizar') || this.textContent.includes('Carrinho')) {
                    alert('Redirecionando para o checkout...');
                }
            });
        });
    </script>
</body>
</html>`
    }
    
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
    
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('admin')) {
      return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-800 text-white">
            <div class="p-6">
                <h1 class="text-2xl font-bold">📊 Dashboard</h1>
            </div>
            <nav class="mt-6">
                <a href="#" class="block px-6 py-3 bg-gray-700 text-white">🏠 Dashboard</a>
                <a href="#" class="block px-6 py-3 hover:bg-gray-700">👥 Usuários</a>
                <a href="#" class="block px-6 py-3 hover:bg-gray-700">📈 Relatórios</a>
                <a href="#" class="block px-6 py-3 hover:bg-gray-700">⚙️ Configurações</a>
            </nav>
        </div>
        
        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto">
            <header class="bg-white shadow-sm border-b px-6 py-4">
                <h2 class="text-2xl font-bold text-gray-800">Dashboard Administrativo</h2>
            </header>
            
            <main class="p-6">
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-sm font-medium text-gray-500">Total Usuários</h3>
                        <p class="text-3xl font-bold text-blue-600">1,234</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-sm font-medium text-gray-500">Vendas</h3>
                        <p class="text-3xl font-bold text-green-600">R$ 45,678</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-sm font-medium text-gray-500">Pedidos</h3>
                        <p class="text-3xl font-bold text-purple-600">567</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-sm font-medium text-gray-500">Conversão</h3>
                        <p class="text-3xl font-bold text-orange-600">23.5%</p>
                    </div>
                </div>
                
                <!-- Table -->
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="px-6 py-4 border-b">
                        <h3 class="text-lg font-semibold">Usuários Recentes</h3>
                    </div>
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr><td class="px-6 py-4">João Silva</td><td class="px-6 py-4">joao@email.com</td><td class="px-6 py-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Ativo</span></td></tr>
                            <tr><td class="px-6 py-4">Maria Santos</td><td class="px-6 py-4">maria@email.com</td><td class="px-6 py-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Ativo</span></td></tr>
                            <tr><td class="px-6 py-4">Pedro Costa</td><td class="px-6 py-4">pedro@email.com</td><td class="px-6 py-4"><span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Inativo</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
</body>
</html>`
    }
    
    if (lowerMessage.includes('landing') || lowerMessage.includes('hero')) {
      return `<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="font-bold text-xl text-gray-900">🚀 StartupApp</div>
                <div class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-600 hover:text-gray-900">Recursos</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">Preços</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">Sobre</a>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Começar</button>
                </div>
            </div>
        </nav>
    </header>
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-5xl font-bold mb-6">Transforme sua ideia em realidade</h1>
            <p class="text-xl mb-8 max-w-2xl mx-auto">A plataforma mais fácil para criar, gerenciar e escalar seu negócio digital.</p>
            <div class="space-x-4">
                <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100">Começar Grátis</button>
                <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600">Ver Demo</button>
            </div>
        </div>
    </section>
    
    <!-- Depoimentos -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <p class="text-gray-600 mb-4">"Incrível! Consegui lançar meu produto em 2 semanas."</p>
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">JS</div>
                        <div class="ml-3">
                            <p class="font-semibold">João Silva</p>
                            <p class="text-gray-500 text-sm">CEO, TechStart</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <p class="text-gray-600 mb-4">"A melhor plataforma que já usei. Recomendo!"</p>
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">MS</div>
                        <div class="ml-3">
                            <p class="font-semibold">Maria Santos</p>
                            <p class="text-gray-500 text-sm">Fundadora, InnovaCorp</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <p class="text-gray-600 mb-4">"Suporte excepcional e resultados fantásticos."</p>
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">PC</div>
                        <div class="ml-3">
                            <p class="font-semibold">Pedro Costa</p>
                            <p class="text-gray-500 text-sm">CTO, DigitalPro</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Pricing -->
    <section class="py-16">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Escolha seu plano</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="border rounded-lg p-6 text-center">
                    <h3 class="text-xl font-bold mb-4">Básico</h3>
                    <p class="text-3xl font-bold mb-4">R$ 29<span class="text-lg text-gray-500">/mês</span></p>
                    <ul class="text-gray-600 mb-6 space-y-2">
                        <li>✅ 5 projetos</li>
                        <li>✅ Suporte básico</li>
                        <li>✅ 10GB storage</li>
                    </ul>
                    <button class="w-full bg-gray-900 text-white py-2 rounded-lg">Escolher</button>
                </div>
                <div class="border-2 border-blue-600 rounded-lg p-6 text-center relative">
                    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Popular</div>
                    <h3 class="text-xl font-bold mb-4">Pro</h3>
                    <p class="text-3xl font-bold mb-4">R$ 99<span class="text-lg text-gray-500">/mês</span></p>
                    <ul class="text-gray-600 mb-6 space-y-2">
                        <li>✅ Projetos ilimitados</li>
                        <li>✅ Suporte prioritário</li>
                        <li>✅ 100GB storage</li>
                    </ul>
                    <button class="w-full bg-blue-600 text-white py-2 rounded-lg">Escolher</button>
                </div>
                <div class="border rounded-lg p-6 text-center">
                    <h3 class="text-xl font-bold mb-4">Enterprise</h3>
                    <p class="text-3xl font-bold mb-4">R$ 299<span class="text-lg text-gray-500">/mês</span></p>
                    <ul class="text-gray-600 mb-6 space-y-2">
                        <li>✅ Tudo do Pro</li>
                        <li>✅ Suporte dedicado</li>
                        <li>✅ Storage ilimitado</li>
                    </ul>
                    <button class="w-full bg-gray-900 text-white py-2 rounded-lg">Escolher</button>
                </div>
            </div>
        </div>
    </section>
    
    <!-- CTA Final -->
    <section class="bg-blue-600 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p class="text-xl mb-8">Junte-se a milhares de empresas que já transformaram seus negócios.</p>
            <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100">Começar Grátis Agora</button>
        </div>
    </section>
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
    
    try {
      const response = await fetch('/api/generate-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage })
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar código')
      }

      const data = await response.json()
      const generatedCode = data.code
      
      const aiMessage: ChatMessage = {
        message: 'Layout profissional gerado com Claude AI! 🎉',
        type: 'ai',
        code: generatedCode
      }
      
      const updatedHistory = [...newHistory, aiMessage]
      setChatHistory(updatedHistory)
      setCurrentCode(generatedCode)
      setIsLoading(false)
      
      // Salvar no localStorage
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory))
      
    } catch (error) {
      console.error('Erro:', error)
      const errorMessage: ChatMessage = {
        message: 'Erro ao gerar código. Tente novamente.',
        type: 'ai'
      }
      
      const updatedHistory = [...newHistory, errorMessage]
      setChatHistory(updatedHistory)
      setIsLoading(false)
    }
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