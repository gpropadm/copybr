import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  let userPrompt = 'App personalizado'
  
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt é obrigatório' }, { status: 400 })
    }
    
    userPrompt = prompt

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0.7,
      system: `Você é um especialista em design de interfaces de aplicativos móveis e web. Sua função é criar layouts profissionais, modernos e funcionais baseados nas solicitações dos clientes.

REGRAS IMPORTANTES:
1. SEMPRE retorne código HTML completo e válido
2. Use APENAS Tailwind CSS para estilização
3. Inclua JavaScript funcional quando necessário
4. Crie interfaces PROFISSIONAIS, não caricatas
5. Use cores modernas e harmoniosas
6. Implemente navegação e interações realistas
7. Foque em UX/UI de alta qualidade
8. Use ícones SVG inline (não bibliotecas externas)
9. Torne responsivo (mobile-first)
10. Inclua estados de hover, loading, etc.

ESTRUTURA OBRIGATÓRIA:
- DOCTYPE html completo
- Head com viewport e Tailwind CDN
- Body com conteúdo funcional
- JavaScript para interações
- Design system consistente
- Componentes reutilizáveis
- Acessibilidade básica

TIPOS DE APP QUE VOCÊ DOMINA:
- Aplicativos de gestão/admin
- E-commerce e marketplaces
- Apps financeiros e bancários
- Redes sociais e comunidades
- Produtividade e organização
- Saúde e fitness
- Educação e cursos
- Delivery e food tech
- Imobiliário e classificados
- Streaming e entretenimento

PADRÕES DE QUALIDADE:
- Layout grid moderno
- Tipografia clara e hierárquica
- Cores com contraste adequado
- Espaçamentos consistentes
- Botões com feedback visual
- Forms bem estruturados
- Loading states apropriados
- Error states considerados
- Empty states planejados

Analise o briefing do cliente e crie um layout que impressione pela qualidade profissional.`,
      messages: [
        {
          role: "user",
          content: `Crie um layout profissional para: ${userPrompt}

Por favor, gere um código HTML completo com Tailwind CSS que seja:
- Visualmente impressionante
- Funcionalmente completo
- Profissionalmente adequado para apresentar a um cliente
- Moderno e atual com as tendências de design
- Com interações JavaScript funcionais`
        }
      ]
    })

    const generatedCode = message.content[0]?.type === 'text' ? message.content[0].text : null

    if (!generatedCode) {
      return NextResponse.json({ error: 'Erro ao gerar código' }, { status: 500 })
    }

    return NextResponse.json({ code: generatedCode })

  } catch (error) {
    console.error('Erro na API:', error)
    
    // Fallback: gerar código profissional baseado no prompt
    const fallbackCode = generateFallbackCode(userPrompt)
    return NextResponse.json({ code: fallbackCode })
  }
}

function generateFallbackCode(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()
  
  if (lowerPrompt.includes('financ') || lowerPrompt.includes('gestão') || lowerPrompt.includes('admin')) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Financeiro</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-green-400">💰 FinanceApp</h1>
            <div class="flex items-center space-x-4">
                <span class="text-gray-300">João Silva</span>
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-sm font-bold">JS</span>
                </div>
            </div>
        </div>
    </header>

    <div class="flex h-screen">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-800 border-r border-gray-700">
            <nav class="p-4 space-y-2">
                <a href="#" class="flex items-center px-4 py-3 bg-green-600 rounded-lg text-white">
                    <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                    </svg>
                    Dashboard
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                    <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
                    </svg>
                    Receitas
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                    <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                    </svg>
                    Despesas
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                    <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                    Clientes
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg">
                    <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                    </svg>
                    Relatórios
                </a>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <div class="p-6">
                <h2 class="text-3xl font-bold mb-6">Dashboard Financeiro</h2>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">Receita Total</p>
                                <p class="text-2xl font-bold text-green-400">R$ 45.678</p>
                                <p class="text-green-400 text-sm">+12% este mês</p>
                            </div>
                            <div class="bg-green-600 p-3 rounded-lg">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">Despesas</p>
                                <p class="text-2xl font-bold text-red-400">R$ 23.456</p>
                                <p class="text-red-400 text-sm">-5% este mês</p>
                            </div>
                            <div class="bg-red-600 p-3 rounded-lg">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">Lucro Líquido</p>
                                <p class="text-2xl font-bold text-blue-400">R$ 22.222</p>
                                <p class="text-blue-400 text-sm">+18% este mês</p>
                            </div>
                            <div class="bg-blue-600 p-3 rounded-lg">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">Clientes Ativos</p>
                                <p class="text-2xl font-bold text-purple-400">127</p>
                                <p class="text-purple-400 text-sm">+8 novos</p>
                            </div>
                            <div class="bg-purple-600 p-3 rounded-lg">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 class="text-xl font-bold mb-4">Transações Recentes</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b border-gray-700">
                                    <th class="text-left py-3 text-gray-400">Cliente</th>
                                    <th class="text-left py-3 text-gray-400">Tipo</th>
                                    <th class="text-left py-3 text-gray-400">Valor</th>
                                    <th class="text-left py-3 text-gray-400">Data</th>
                                    <th class="text-left py-3 text-gray-400">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-700">
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                                <span class="text-sm font-bold">MS</span>
                                            </div>
                                            <span>Maria Silva</span>
                                        </div>
                                    </td>
                                    <td class="py-4">
                                        <span class="bg-green-600 px-2 py-1 rounded text-sm">Receita</span>
                                    </td>
                                    <td class="py-4 text-green-400 font-bold">+R$ 2.500</td>
                                    <td class="py-4 text-gray-400">02/08/2025</td>
                                    <td class="py-4">
                                        <span class="bg-green-600 px-2 py-1 rounded text-sm">Pago</span>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-700">
                                    <td class="py-4">
                                        <div class="flex items-center">
                                            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                                <span class="text-sm font-bold">JS</span>
                                            </div>
                                            <span>João Santos</span>
                                        </div>
                                    </td>
                                    <td class="py-4">
                                        <span class="bg-red-600 px-2 py-1 rounded text-sm">Despesa</span>
                                    </td>
                                    <td class="py-4 text-red-400 font-bold">-R$ 1.200</td>
                                    <td class="py-4 text-gray-400">01/08/2025</td>
                                    <td class="py-4">
                                        <span class="bg-yellow-600 px-2 py-1 rounded text-sm">Pendente</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Efeitos interativos
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('a').forEach(l => l.classList.remove('bg-green-600'));
                this.classList.add('bg-green-600');
                
                const section = this.textContent.trim();
                alert('Navegando para: ' + section);
            });
        });
    </script>
</body>
</html>`
  }
  
  // Código genérico profissional
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Profissional</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <h1 class="text-xl font-bold text-gray-900">🚀 ${prompt}</h1>
                    <div class="flex items-center space-x-4">
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            Começar
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                    Layout Profissional Gerado
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Baseado na sua solicitação: "${prompt}"
                </p>
            </div>

            <!-- Feature Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Rápido</h3>
                    <p class="text-gray-600">Interface otimizada para máxima performance.</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Confiável</h3>
                    <p class="text-gray-600">Sistema robusto e testado em produção.</p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Personalizável</h3>
                    <p class="text-gray-600">Adaptável às suas necessidades específicas.</p>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                <h3 class="text-3xl font-bold mb-4">Pronto para começar?</h3>
                <p class="text-xl mb-6 opacity-90">Transform sua ideia em realidade hoje mesmo.</p>
                <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
                    Começar Agora
                </button>
            </div>
        </main>
    </div>

    <script>
        document.querySelector('button').addEventListener('click', function() {
            alert('Funcionalidade implementada com sucesso!\\n\\nSua solicitação: "${prompt}"');
        });
    </script>
</body>
</html>`
}