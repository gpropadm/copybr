import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { idea, layout } = await request.json()

    if (!idea || !layout) {
      return NextResponse.json({ error: 'Ideia e layout são obrigatórios' }, { status: 400 })
    }

    // Prompt especializado em transformar layout em app funcional
    const prompt = `Você é um desenvolvedor frontend expert especializado em criar aplicativos funcionais. Sua tarefa é transformar um LAYOUT VISUAL em um APP TOTALMENTE FUNCIONAL.

IMPORTANTE: Agora você deve adicionar TODAS as funcionalidades e interações.

REGRAS OBRIGATÓRIAS:
- Use HTML + CSS + JavaScript (inline)
- Todos os botões DEVEM funcionar
- Adicione localStorage para persistir dados
- Implemente formulários com validação
- Crie notificações visuais (alerts, toasts)
- Adicione animações e transições
- Estados de loading quando necessário
- Funcionalidades completas baseadas na ideia
- Use dados mockados realistas
- Implemente navegação entre telas (se aplicável)

FUNCIONALIDADES A IMPLEMENTAR:
- Sistema de CRUD (criar, ler, editar, deletar)
- Validação de formulários
- Feedback visual para ações
- Pesquisa/filtros (se aplicável)
- Sistema de favoritos/likes
- Persistência com localStorage
- Responsividade completa
- Estados vazios e com dados

IDEIA ORIGINAL: "${idea}"

LAYOUT ATUAL: ${layout}

Transforme este layout em um app TOTALMENTE FUNCIONAL com todas as interações funcionando perfeitamente. Mantenha o design visual mas adicione todas as funcionalidades.`

    // Aqui integraria com API do Claude
    // Mock de app funcional baseado na ideia
    const mockApp = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Funcional</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .toast {
            transform: translateY(-100px);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .toast.show {
            transform: translateY(0);
            opacity: 1;
        }
        .fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Toast Notification -->
    <div id="toast" class="toast fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        <span id="toast-message">Ação realizada com sucesso!</span>
    </div>

    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-md mx-auto px-4 py-3">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold text-gray-900">Meu App</h1>
                    <button onclick="toggleProfile()" class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- Search Bar -->
        <div class="max-w-md mx-auto px-4 py-4">
            <div class="relative">
                <input 
                    type="text" 
                    id="searchInput"
                    placeholder="Pesquisar..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onkeyup="filterItems()"
                >
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-md mx-auto px-4 pb-24 space-y-6">
            <!-- Quick Actions -->
            <div class="grid grid-cols-2 gap-4">
                <button onclick="addNewItem()" class="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 text-sm">Adicionar Item</h3>
                    <p class="text-xs text-gray-600 mt-1">Criar novo</p>
                </button>
                
                <button onclick="showFavorites()" class="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 text-sm">Favoritos</h3>
                    <p class="text-xs text-gray-600 mt-1">Seus preferidos</p>
                </button>
            </div>

            <!-- Items List -->
            <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div class="px-4 py-3 border-b flex items-center justify-between">
                    <h3 class="font-semibold text-gray-900">Meus Itens</h3>
                    <span id="itemCount" class="text-sm text-gray-500">0 itens</span>
                </div>
                <div id="itemsList" class="divide-y">
                    <!-- Items will be loaded here -->
                </div>
                <div id="emptyState" class="px-4 py-8 text-center text-gray-500 hidden">
                    <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p class="text-sm">Nenhum item encontrado</p>
                    <button onclick="addNewItem()" class="mt-2 text-purple-600 text-sm hover:text-purple-700">
                        Adicionar primeiro item
                    </button>
                </div>
            </div>
        </main>

        <!-- Bottom Navigation -->
        <nav class="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div class="max-w-md mx-auto px-4">
                <div class="flex justify-around py-2">
                    <button onclick="setActiveTab('home')" id="tab-home" class="flex flex-col items-center py-2 px-3 rounded-lg text-purple-600 bg-purple-50">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span class="text-xs mt-1 font-medium">Início</span>
                    </button>
                    
                    <button onclick="setActiveTab('search')" id="tab-search" class="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-xs mt-1">Buscar</span>
                    </button>
                    
                    <button onclick="setActiveTab('favorites')" id="tab-favorites" class="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span class="text-xs mt-1">Favoritos</span>
                    </button>
                    
                    <button onclick="setActiveTab('profile')" id="tab-profile" class="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span class="text-xs mt-1">Perfil</span>
                    </button>
                </div>
            </div>
        </nav>
    </div>

    <script>
        // App Data Management
        let items = JSON.parse(localStorage.getItem('appItems')) || [
            { id: 1, title: 'Item de Exemplo 1', description: 'Descrição do primeiro item', favorite: false, created: new Date().toISOString() },
            { id: 2, title: 'Item de Exemplo 2', description: 'Descrição do segundo item', favorite: true, created: new Date().toISOString() },
            { id: 3, title: 'Meu Terceiro Item', description: 'Mais um item para demonstrar', favorite: false, created: new Date().toISOString() }
        ];

        let filteredItems = [...items];
        let currentFilter = 'all';

        // Save items to localStorage
        function saveItems() {
            localStorage.setItem('appItems', JSON.stringify(items));
        }

        // Show toast notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            
            toastMessage.textContent = message;
            toast.className = 'toast fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 show';
            
            if (type === 'success') {
                toast.classList.add('bg-green-500', 'text-white');
            } else if (type === 'error') {
                toast.classList.add('bg-red-500', 'text-white');
            }
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Render items list
        function renderItems() {
            const itemsList = document.getElementById('itemsList');
            const emptyState = document.getElementById('emptyState');
            const itemCount = document.getElementById('itemCount');
            
            if (filteredItems.length === 0) {
                itemsList.innerHTML = '';
                emptyState.classList.remove('hidden');
                itemCount.textContent = '0 itens';
                return;
            }
            
            emptyState.classList.add('hidden');
            itemCount.textContent = filteredItems.length + ' ' + (filteredItems.length === 1 ? 'item' : 'itens');
            
            itemsList.innerHTML = filteredItems.map(item => 
                '<div class="px-4 py-3 flex items-center space-x-3 fade-in" data-id="' + item.id + '">' +
                    '<div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">' +
                        '<span class="text-sm font-semibold text-purple-600">' + item.id + '</span>' +
                    '</div>' +
                    '<div class="flex-1">' +
                        '<h4 class="font-medium text-gray-900 text-sm">' + item.title + '</h4>' +
                        '<p class="text-xs text-gray-600">' + item.description + '</p>' +
                    '</div>' +
                    '<div class="flex items-center space-x-2">' +
                        '<button onclick="toggleFavorite(' + item.id + ')" class="p-1 rounded-full hover:bg-gray-100">' +
                            '<svg class="w-4 h-4 ' + (item.favorite ? 'text-red-500 fill-current' : 'text-gray-400') + '" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>' +
                            '</svg>' +
                        '</button>' +
                        '<button onclick="deleteItem(' + item.id + ')" class="p-1 rounded-full hover:bg-gray-100">' +
                            '<svg class="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>' +
                            '</svg>' +
                        '</button>' +
                    '</div>' +
                '</div>'
            ).join('');
        }

        // Add new item
        function addNewItem() {
            const title = prompt('Digite o título do novo item:');
            if (!title || title.trim() === '') return;
            
            const description = prompt('Digite uma descrição (opcional):') || 'Sem descrição';
            
            const newItem = {
                id: Date.now(),
                title: title.trim(),
                description: description.trim(),
                favorite: false,
                created: new Date().toISOString()
            };
            
            items.unshift(newItem);
            applyFilter();
            saveItems();
            showToast('Item adicionado com sucesso!');
        }

        // Toggle favorite
        function toggleFavorite(id) {
            const item = items.find(item => item.id === id);
            if (item) {
                item.favorite = !item.favorite;
                applyFilter();
                saveItems();
                showToast(item.favorite ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
            }
        }

        // Delete item
        function deleteItem(id) {
            if (confirm('Tem certeza que deseja excluir este item?')) {
                items = items.filter(item => item.id !== id);
                applyFilter();
                saveItems();
                showToast('Item excluído com sucesso!');
            }
        }

        // Filter items
        function filterItems() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            applyFilter(searchTerm);
        }

        function applyFilter(searchTerm = '') {
            filteredItems = items.filter(item => {
                const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                                    item.description.toLowerCase().includes(searchTerm);
                const matchesFilter = currentFilter === 'all' || 
                                    (currentFilter === 'favorites' && item.favorite);
                return matchesSearch && matchesFilter;
            });
            renderItems();
        }

        // Show favorites
        function showFavorites() {
            currentFilter = currentFilter === 'favorites' ? 'all' : 'favorites';
            applyFilter();
            setActiveTab('favorites');
            showToast(currentFilter === 'favorites' ? 'Mostrando apenas favoritos' : 'Mostrando todos os itens');
        }

        // Set active tab
        function setActiveTab(tab) {
            // Remove active class from all tabs
            document.querySelectorAll('[id^="tab-"]').forEach(el => {
                el.className = 'flex flex-col items-center py-2 px-3 rounded-lg text-gray-600';
            });
            
            // Add active class to selected tab
            const activeTab = document.getElementById('tab-' + tab);
            if (activeTab) {
                activeTab.className = 'flex flex-col items-center py-2 px-3 rounded-lg text-purple-600 bg-purple-50';
            }
            
            // Handle tab actions
            if (tab === 'search') {
                document.getElementById('searchInput').focus();
            } else if (tab === 'favorites') {
                showFavorites();
            }
        }

        // Toggle profile
        function toggleProfile() {
            alert('Funcionalidade de perfil - aqui você implementaria a tela de perfil do usuário!');
        }

        // Initialize app
        function initApp() {
            applyFilter();
            showToast('App carregado com sucesso!');
            
            // Auto-save every 30 seconds
            setInterval(saveItems, 30000);
        }

        // Load app when DOM is ready
        document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>`

    return NextResponse.json({ app: mockApp })

  } catch (error) {
    console.error('Erro ao gerar app:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}