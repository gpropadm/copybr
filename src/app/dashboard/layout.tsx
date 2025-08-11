'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  MessageSquare, 
  Plus, 
  FolderOpen, 
  Layout, 
  Settings, 
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  Wrench,
  BarChart3,
  FileText,
  Palette,
  Code,
  Zap,
  Moon,
  Sun,
  MoreHorizontal,
  Menu,
  X,
  Users,
  Camera,
  TrendingUp,
  Home,
  Sparkles,
  BookOpen,
  Copy,
  Activity,
  Video
} from 'lucide-react'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'

function DashboardContent({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, logout, isLoading, isAuthenticated } = useAuth()
  const [isToolsExpanded, setIsToolsExpanded] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { isDarkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  const handleLogout = () => {
    logout()
  }

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      href: '/dashboard',
      color: 'text-indigo-600'
    },
    {
      icon: MessageSquare,
      label: 'Chat',
      href: '/dashboard/chat',
      color: 'text-blue-600'
    },
    {
      icon: Activity,
      label: 'Social Media',
      href: '/social',
      color: 'text-pink-600'
    },
    {
      icon: Plus,
      label: 'Novo Projeto',
      href: '/dashboard/novo-projeto',
      color: 'text-green-600'
    },
    {
      icon: FolderOpen,
      label: 'Meus Projetos',
      href: '/dashboard/projetos',
      color: 'text-purple-600'
    },
    {
      icon: Layout,
      label: 'Templates',
      href: '/dashboard/templates',
      color: 'text-orange-600'
    },
    {
      icon: Users,
      label: 'Redes Sociais',
      href: '/dashboard/redes-sociais',
      color: 'text-pink-600'
    },
    {
      icon: Camera,
      label: 'Scanner de Preços',
      href: '/dashboard/price-scanner',
      color: 'text-cyan-600'
    },
    {
      icon: Sparkles,
      label: 'Imagem para Prompt',
      href: '/dashboard/image-to-prompt',
      color: 'text-purple-600'
    },
    {
      icon: Video,
      label: 'Copy do YouTube',
      href: '/dashboard/youtube-copy',
      color: 'text-red-600'
    },
    {
      icon: Code,
      label: 'Code Generator',
      href: '/dashboard/app-builder',
      color: 'text-gradient-purple'
    },
    {
      icon: BookOpen,
      label: 'Leitura',
      href: '/dashboard/knowledge-base',
      color: 'text-indigo-600'
    },
    {
      icon: Copy,
      label: 'Meus Copies',
      href: '/dashboard/meus-copies',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Oportunidades',
      href: '/dashboard/opportunities',
      color: 'text-amber-600'
    }
  ]

  const toolsItems = [
    {
      icon: BarChart3,
      label: 'Analytics',
      href: '/dashboard/analytics'
    },
    {
      icon: FileText,
      label: 'Editor de Texto',
      href: '/dashboard/editor'
    },
    {
      icon: Palette,
      label: 'Gerador de Cores',
      href: '/dashboard/cores'
    },
    {
      icon: Code,
      label: 'HTML/CSS',
      href: '/dashboard/codigo'
    }
  ]

  if (isLoading || !isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#693ee0]"></div>
    </div>
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#212121]' : 'bg-gray-50'}`}>
      {/* Mobile menu overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 ${isDarkMode ? 'bg-black' : 'bg-gray-900'} bg-opacity-50 ${showMobileMenu ? '' : 'hidden'}`} onClick={() => setShowMobileMenu(false)} />
      
      {/* Desktop layout wrapper */}
      <div className="hidden lg:flex min-h-screen">
        {/* Sidebar estilo ChatGPT - APENAS DESKTOP */}
        <div className={`w-64 ${isDarkMode ? 'bg-[#181818]' : 'bg-white border-r border-gray-200'} ${isDarkMode ? 'text-white' : 'text-gray-900'} flex flex-col`}>
          {/* Header com botão novo chat */}
          <div className="p-3">
            <Link
              href="/dashboard/chat"
              className={`flex items-center justify-center w-full px-3 py-3 text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900'} rounded-lg border transition-colors`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo chat
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 pb-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors group`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}

            {/* Ferramentas com submenu */}
            <div>
              <button
                onClick={() => setIsToolsExpanded(!isToolsExpanded)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
              >
                <div className="flex items-center space-x-3">
                  <Wrench className="h-4 w-4" />
                  <span className="text-sm">Ferramentas</span>
                </div>
                {isToolsExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>

              {/* Submenu */}
              {isToolsExpanded && (
                <div className="mt-1 ml-6 space-y-1">
                  {toolsItems.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} transition-colors text-sm`}
                    >
                      <tool.icon className="h-3 w-3" />
                      <span className="text-xs">{tool.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User section */}
          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-3`}>
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors group`}
              >
                <div className="w-8 h-8 bg-[#693ee0] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} truncate`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                    {user?.plan}
                  </p>
                </div>
                <MoreHorizontal className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className={`absolute bottom-full left-0 right-0 mb-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-50`}>
                  <div className="p-2 space-y-1">
                    {/* Dark Mode Toggle */}
                    <button
                      onClick={() => {
                        toggleDarkMode()
                        setShowUserMenu(false)
                      }}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'} transition-colors text-left`}
                    >
                      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      <span className="text-sm">{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
                    </button>

                    {/* Placeholder menus */}
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'} transition-colors text-left`}
                    >
                      <Settings className="h-4 w-4" />
                      <span className="text-sm">Configurações</span>
                    </button>
                    
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'} transition-colors text-left`}
                    >
                      <User className="h-4 w-4" />
                      <span className="text-sm">Perfil</span>
                    </button>
                    
                    <Link
                      href="/dashboard/meu-consumo"
                      onClick={() => setShowUserMenu(false)}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'} transition-colors text-left`}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm">Meu Consumo</span>
                    </Link>
                    
                    <Link
                      href="/dashboard/planos"
                      onClick={() => setShowUserMenu(false)}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'} transition-colors text-left`}
                    >
                      <Zap className="h-4 w-4" />
                      <span className="text-sm">Planos</span>
                    </Link>

                    {/* Separador */}
                    <div className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} my-1`}></div>
                    
                    {/* Sair - movido para o final */}
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg ${isDarkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} transition-colors text-left`}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden ${isDarkMode ? 'bg-[#212121] text-white' : 'bg-gray-50 text-gray-900'}`}>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Overlay apenas */}
      <div className={`lg:hidden ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 ${isDarkMode ? 'bg-[#181818]' : 'bg-white border-r border-gray-200'} ${isDarkMode ? 'text-white' : 'text-gray-900'} flex flex-col transition-transform duration-300 ease-in-out`}>
        {/* Mobile close button and header */}
        <div className={`flex items-center justify-between p-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <h2 className="text-lg font-semibold">CopyBR</h2>
          <button
            onClick={() => setShowMobileMenu(false)}
            className={`p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Mobile Header com botão novo chat */}
        <div className="p-3">
          <Link
            href="/dashboard/chat"
            className={`flex items-center justify-center w-full px-3 py-3 text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900'} rounded-lg border transition-colors`}
            onClick={() => setShowMobileMenu(false)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo chat
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex-1 px-3 pb-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors group`}
              onClick={() => setShowMobileMenu(false)}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Main Content */}
      <div className={`lg:hidden min-h-screen ${isDarkMode ? 'bg-[#212121] text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Mobile header */}
        <div className={`flex items-center justify-between p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
          <button
            onClick={() => setShowMobileMenu(true)}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">CopyBR</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </ThemeProvider>
  )
}