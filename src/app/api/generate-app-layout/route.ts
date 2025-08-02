import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json()

    if (!idea) {
      return NextResponse.json({ error: 'Ideia é obrigatória' }, { status: 400 })
    }

    // Prompt especializado em layouts de apps
    const prompt = `Você é um especialista em design de interfaces de aplicativos móveis e web. Sua tarefa é criar um LAYOUT VISUAL baseado na ideia fornecida.

IMPORTANTE: Crie apenas o LAYOUT VISUAL - não adicione funcionalidades complexas ainda. Foque no design e estrutura.

REGRAS OBRIGATÓRIAS:
- Use HTML + Tailwind CSS (via CDN)
- Design responsivo e profissional
- Cores modernas e atrativas
- Inclua apenas elementos visuais e estrutura básica
- Use ícones SVG inline (não imagens externas)
- Adicione transições suaves
- Simule dados de exemplo para mostrar como ficará
- Foque na experiência do usuário (UX)

ESTRUTURA DO LAYOUT:
- Header/Navigation
- Seções principais do app
- Elementos visuais apropriados
- Footer (se necessário)
- Estados vazios ou com dados de exemplo

Ideia do usuário: "${idea}"

Crie um HTML completo com layout visual profissional para esta ideia. Mostre como o app vai parecer visualmente.`

    // Aqui você integraria com a API do Claude
    // Por enquanto, vou simular uma resposta
    const mockLayout = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout do App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-md mx-auto px-4 py-3">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold text-gray-900">Meu App</h1>
                    <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-md mx-auto px-4 py-6 space-y-6">
            <!-- Feature Cards -->
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl shadow-sm border">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 text-sm">Funcionalidade 1</h3>
                    <p class="text-xs text-gray-600 mt-1">Descrição da feature</p>
                </div>
                
                <div class="bg-white p-4 rounded-xl shadow-sm border">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 text-sm">Funcionalidade 2</h3>
                    <p class="text-xs text-gray-600 mt-1">Descrição da feature</p>
                </div>
            </div>

            <!-- List Section -->
            <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div class="px-4 py-3 border-b">
                    <h3 class="font-semibold text-gray-900">Seção Principal</h3>
                </div>
                <div class="divide-y">
                    <div class="px-4 py-3 flex items-center space-x-3">
                        <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span class="text-sm font-semibold text-purple-600">1</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-900 text-sm">Item de Exemplo</h4>
                            <p class="text-xs text-gray-600">Descrição do item</p>
                        </div>
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    
                    <div class="px-4 py-3 flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-sm font-semibold text-blue-600">2</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-900 text-sm">Outro Item</h4>
                            <p class="text-xs text-gray-600">Mais informações</p>
                        </div>
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </main>

        <!-- Bottom Navigation -->
        <nav class="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div class="max-w-md mx-auto px-4">
                <div class="flex justify-around py-2">
                    <button class="flex flex-col items-center py-2 px-3 rounded-lg text-purple-600 bg-purple-50">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span class="text-xs mt-1 font-medium">Início</span>
                    </button>
                    
                    <button class="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-xs mt-1">Buscar</span>
                    </button>
                    
                    <button class="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span class="text-xs mt-1">Favoritos</span>
                    </button>
                    
                    <button class="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span class="text-xs mt-1">Perfil</span>
                    </button>
                </div>
            </div>
        </nav>
        
        <!-- Spacer for bottom nav -->
        <div class="h-20"></div>
    </div>
</body>
</html>`

    return NextResponse.json({ layout: mockLayout })

  } catch (error) {
    console.error('Erro ao gerar layout:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}